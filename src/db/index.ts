import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// The pool is created lazily on first query. Importing this module must never
// throw, because hosting platforms (Vercel, Next build) import route modules
// at build time when environment variables are not yet available.

type Db = NodePgDatabase<typeof schema>;

const globalForDb = globalThis as typeof globalThis & {
  __gloprofasPool?: Pool;
  __gloprofasDb?: Db;
};

function resolveDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add a PostgreSQL connection string to the server environment before serving pages that use the database.",
    );
  }
  return url;
}

function getPool(): Pool {
  if (!globalForDb.__gloprofasPool) {
    globalForDb.__gloprofasPool = new Pool({
      connectionString: resolveDatabaseUrl(),
      max: 5,
    });
  }
  return globalForDb.__gloprofasPool;
}

function makeDb(): Db {
  if (!globalForDb.__gloprofasDb) {
    globalForDb.__gloprofasDb = drizzle(getPool(), { schema });
  }
  return globalForDb.__gloprofasDb;
}

export const db: Db = new Proxy({} as Db, {
  get(_target, prop) {
    const value = (makeDb() as unknown as Record<PropertyKey, unknown>)[prop];
    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(makeDb());
    }
    return value;
  },
}) as Db;

export const pool: Pool = new Proxy({} as Pool, {
  get(_target, prop) {
    const value = (getPool() as unknown as Record<PropertyKey, unknown>)[prop];
    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(getPool());
    }
    return value;
  },
}) as Pool;

export { schema };
