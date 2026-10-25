// Dipakai di middleware (edge) dan server, jadi hanya memakai Web Crypto.
export const ADMIN_COOKIE = "ht_admin";
const SESSION_DAYS = 7;

const enc = new TextEncoder();

function secret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "hastrans-dev-secret";
}

/** Password admin. Di development default "admin123"; di production wajib di-set lewat ADMIN_PASSWORD. */
export function adminPassword(): string | null {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  return process.env.NODE_ENV === "production" ? null : "admin123";
}

async function sign(message: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(): Promise<{ token: string; maxAge: number }> {
  const maxAge = SESSION_DAYS * 86400;
  const exp = String(Date.now() + maxAge * 1000);
  return { token: `${exp}.${await sign(exp)}`, maxAge };
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await sign(exp));
}

export async function checkPassword(input: string): Promise<boolean> {
  const pw = adminPassword();
  if (!pw) return false;
  // Bandingkan hash supaya panjang string tidak bocor.
  return safeEqual(await sign("pw:" + input), await sign("pw:" + pw));
}
