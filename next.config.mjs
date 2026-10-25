/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@electric-sql/pglite", "pg"],
  // PGlite memuat file .wasm/.data saat runtime; pastikan ikut dibundel di Vercel.
  outputFileTracingIncludes: {
    "/**": ["./node_modules/@electric-sql/pglite/dist/**/*"],
  },
};

export default nextConfig;
