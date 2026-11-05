import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { and, eq, gt } from "drizzle-orm";
import { db } from "@/db";
import { activityLogs, sessions, users } from "@/db/schema";
import { randomToken, verifyPassword } from "@/lib/password";

export const SESSION_COOKIE = "gloprofas_session";
const SESSION_DAYS = 7;

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export async function createSession(userId: number): Promise<string> {
  const token = randomToken(32);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86_400_000);
  await db.insert(sessions).values({ token, userId, expiresAt });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
  return token;
}

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      isActive: users.isActive,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())))
    .limit(1);
  const user = rows[0];
  if (!user || !user.isActive) return null;
  return { id: user.id, name: user.name, email: user.email, role: user.role };
});

export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await db.delete(sessions).where(eq(sessions.token, token));
  }
  store.delete(SESSION_COOKIE);
}

const STAFF_ROLES = new Set([
  "super-administrator",
  "administrator",
  "scam-report-officer",
  "content-editor",
  "customer-support",
  "ai-manager",
  "volunteer-manager",
]);

export function can(user: SessionUser | null, ability: string): boolean {
  if (!user || !STAFF_ROLES.has(user.role)) return false;
  if (user.role === "super-administrator" || user.role === "administrator") return true;
  const map: Record<string, string[]> = {
    "scam-report-officer": ["reports:read", "reports:write"],
    "content-editor": ["content:read", "content:write"],
    "customer-support": ["messages:read", "messages:write", "enquiries:read", "enquiries:write"],
    "ai-manager": ["assistant:read", "assistant:write"],
    "volunteer-manager": ["volunteers:read", "volunteers:write"],
  };
  return (map[user.role] ?? []).includes(ability);
}

export async function requireUser(): Promise<SessionUser | null> {
  return getCurrentUser();
}

export async function logActivity(
  actor: string,
  action: string,
  entity: string,
  entityId?: string,
  meta: Record<string, unknown> = {},
): Promise<void> {
  await db.insert(activityLogs).values({ actor, action, entity, entityId, meta });
}

export async function authenticate(email: string, password: string): Promise<SessionUser | null> {
  const { seedDatabase } = await import("@/db/seed");
  await seedDatabase().catch(() => null);
  const rows = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase().trim()))
    .limit(1);
  const user = rows[0];
  if (!user || !user.isActive) return null;
  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;
  await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
