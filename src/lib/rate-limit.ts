import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/db";

export async function rateLimit(key: string, limit: number, windowSeconds: number) {
  const now = new Date();
  const windowStart = new Date(Math.floor(now.getTime() / (windowSeconds * 1000)) * windowSeconds * 1000);
  const id = `${key}:${windowStart.toISOString()}`;
  await db.execute(sql`
    insert into rate_limits (key, window_start, count)
    values (${id}, ${windowStart}, 1)
    on conflict (key) do update set count = rate_limits.count + 1
  `);
  const result = await db.execute(sql`select count from rate_limits where key = ${id}`);
  const count = Number((result.rows[0] as { count?: number } | undefined)?.count ?? 1);
  return { ok: count <= limit, count, limit, reset: new Date(windowStart.getTime() + windowSeconds * 1000) };
}
