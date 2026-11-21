import fs from "fs";
import path from "path";
import { PrismaClient } from '@prisma/client'

/**
 * Serverless (Vercel) SQLite bootstrap.
 *
 * The committed demo database (db/custom.db) ships inside the serverless
 * function bundle, whose filesystem is read-only. Prisma needs a writable
 * SQLite file, so on first use we copy the bundled database to the ephemeral
 * /tmp volume (atomic rename to avoid partial reads across cold starts) and
 * point DATABASE_URL there. Writes live for the lifetime of the instance —
 * fine for a demo deployment; use a hosted database for durable data.
 *
 * On the dev sandbox (or any machine with DATABASE_URL already set, e.g. in
 * .env) this block is a no-op and the existing URL is used untouched.
 */
const TMP_DB = "/tmp/gloprofas-demo.db";
if (process.env.VERCEL && !process.env.DATABASE_URL) {
  try {
    if (!fs.existsSync(TMP_DB)) {
      const bundled = [
        path.join(process.cwd(), "db", "custom.db"),
        path.join(process.cwd(), "../db", "custom.db"),
      ].find((p) => fs.existsSync(p));
      if (bundled) {
        fs.copyFileSync(bundled, `${TMP_DB}.seed`);
        fs.renameSync(`${TMP_DB}.seed`, TMP_DB);
      }
    }
  } catch {
    /* best effort — Prisma will surface a clear error if the file is missing */
  }
  process.env.DATABASE_URL = `file:${TMP_DB}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
