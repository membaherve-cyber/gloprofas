import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* Bundle the committed SQLite demo database with the API routes so it is
     available at runtime on serverless hosts (Vercel) — src/lib/db.ts copies
     it to /tmp on first use. */
  outputFileTracingIncludes: {
    "/api/**": ["./db/**"],
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
