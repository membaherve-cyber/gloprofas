/** Shared helpers for the public resource API routes. */

/** Request-based rate limiting for GET routes (best-effort, in-memory). */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimitHelper(req: Request, scope: string, limit: number): boolean {
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const key = `${scope}:${fwd}`;
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (b.count >= limit) return false;
  b.count += 1;
  return true;
}
