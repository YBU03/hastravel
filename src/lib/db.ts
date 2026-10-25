import { SCHEMA_SQL, SEED_SQL } from "./schema";

export type Queryable = {
  query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<{ rows: T[] }>;
};

type Db = Queryable & {
  tx<R>(fn: (q: Queryable) => Promise<R>): Promise<R>;
};

async function connect(): Promise<Db> {
  const url = process.env.DATABASE_URL;
  if (url) {
    const { Pool } = await import("pg");
    const local = /localhost|127\.0\.0\.1/.test(url);
    const pool = new Pool({
      connectionString: url,
      ssl: local ? undefined : { rejectUnauthorized: false },
      max: 5,
    });
    await pool.query(SCHEMA_SQL);
    await pool.query(SEED_SQL);
    return {
      query: (sql, params) => pool.query(sql, params) as never,
      async tx(fn) {
        const client = await pool.connect();
        try {
          await client.query("BEGIN");
          const result = await fn({ query: (sql, params) => client.query(sql, params) as never });
          await client.query("COMMIT");
          return result;
        } catch (e) {
          await client.query("ROLLBACK");
          throw e;
        } finally {
          client.release();
        }
      },
    };
  }

  // Tanpa DATABASE_URL: Postgres tertanam (PGlite), data disimpan di folder .data/
  const { PGlite } = await import("@electric-sql/pglite");
  const { mkdirSync } = await import("node:fs");
  const dir = process.env.PGLITE_DIR ?? ".data/pglite";
  mkdirSync(dir, { recursive: true });
  const pg = new PGlite(dir);
  await pg.exec(SCHEMA_SQL);
  await pg.exec(SEED_SQL);
  return {
    query: (sql, params) => pg.query(sql, params) as never,
    tx: (fn) => pg.transaction((t) => fn({ query: (sql, params) => t.query(sql, params) as never })),
  };
}

const g = globalThis as unknown as { __hastransDb?: Promise<Db> };

export function db(): Promise<Db> {
  if (!g.__hastransDb) {
    g.__hastransDb = connect().catch((e) => {
      g.__hastransDb = undefined;
      throw e;
    });
  }
  return g.__hastransDb;
}
