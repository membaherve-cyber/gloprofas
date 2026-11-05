import "server-only";
import { sql } from "drizzle-orm";
import { db, hasDatabase } from "@/db";
import { rateLimits } from "@/db/schema";

export type RateLimitResult = { allowed: boolean; remaining: number; resetAt: Date };

const memoryLimits = new Map<string, number>();

export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const windowMs = windowSeconds * 1000;
  const windowStart = new Date(Math.floor(Date.now() / windowMs) * windowMs);
  const resetAt = new Date(windowStart.getTime() + windowMs);

  if (hasDatabase) {
    try {
      const [row] = await db
        .insert(rateLimits)
        .values({ key, windowStart, count: 1 })
        .onConflictDoUpdate({
          target: [rateLimits.key, rateLimits.windowStart],
          set: { count: sql`${rateLimits.count} + 1` },
        })
        .returning({ count: rateLimits.count });

      const used = row?.count ?? 1;
      return { allowed: used <= limit, remaining: Math.max(0, limit - used), resetAt };
    } catch {
      // Fall back to in-memory limiter if DB is unreachable
    }
  }

  const bucketKey = `${key}:${windowStart.getTime()}`;
  const used = (memoryLimits.get(bucketKey) ?? 0) + 1;
  memoryLimits.set(bucketKey, used);
  return { allowed: used <= limit, remaining: Math.max(0, limit - used), resetAt };
}

export function clientKey(request: Request, scope: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
  return `${scope}:${ip}`;
}
