import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { and, eq, gt } from "drizzle-orm";
import { db, hasDatabase } from "@/db";
import { activityLogs, sessions, users } from "@/db/schema";
import { STAFF_CREDENTIALS } from "@/lib/admin-credentials";
import { randomToken, verifyPassword } from "@/lib/password";

export const SESSION_COOKIE = "gloprofas_session";
const SESSION_DAYS = 7;

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

function sessionSecret(): string {
  return process.env.SESSION_SECRET || "gloprofas-session-secret-2026";
}

function encodeSignedSession(user: SessionUser, expiresAtMs: number): string {
  const payload = Buffer.from(
    JSON.stringify({ ...user, exp: expiresAtMs }),
  ).toString("base64url");
  const sig = createHmac("sha256", sessionSecret())
    .update(payload)
    .digest("base64url");
  return `signed.${payload}.${sig}`;
}

function decodeSignedSession(token: string): SessionUser | null {
  if (!token.startsWith("signed.")) return null;
  const [, payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = createHmac("sha256", sessionSecret())
    .update(payload)
    .digest("base64url");
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as SessionUser & { exp: number };
    if (!data.exp || Date.now() > data.exp) return null;
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
  } catch {
    return null;
  }
}

export async function createSession(
  userId: number,
  fallbackUser?: SessionUser,
): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86_400_000);
  let token = randomToken(32);

  if (hasDatabase) {
    try {
      await db.insert(sessions).values({ token, userId, expiresAt });
    } catch {
      if (fallbackUser) {
        token = encodeSignedSession(fallbackUser, expiresAt.getTime());
      }
    }
  } else if (fallbackUser) {
    token = encodeSignedSession(fallbackUser, expiresAt.getTime());
  }

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

  const signed = decodeSignedSession(token);
  if (signed) return signed;

  if (!hasDatabase) return null;

  try {
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
  } catch {
    return null;
  }
});

export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token && hasDatabase && !token.startsWith("signed.")) {
    await db.delete(sessions).where(eq(sessions.token, token)).catch(() => null);
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
  if (!hasDatabase) return;
  await db.insert(activityLogs).values({ actor, action, entity, entityId, meta }).catch(() => null);
}

export async function authenticate(email: string, password: string): Promise<SessionUser | null> {
  const normalizedEmail = email.toLowerCase().trim();

  if (hasDatabase) {
    try {
      const { seedDatabase } = await import("@/db/seed");
      await seedDatabase().catch(() => null);
      const rows = await db
        .select()
        .from(users)
        .where(eq(users.email, normalizedEmail))
        .limit(1);
      const user = rows[0];
      if (user && user.isActive) {
        const valid = await verifyPassword(password, user.passwordHash);
        if (valid) {
          await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id)).catch(() => null);
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        }
      }
    } catch {
      // Fall back to STAFF_CREDENTIALS check when DB is not reachable
    }
  }

  const staffIndex = STAFF_CREDENTIALS.findIndex(
    (c) => c.email.toLowerCase() === normalizedEmail && c.password === password,
  );
  if (staffIndex !== -1) {
    const staff = STAFF_CREDENTIALS[staffIndex];
    return {
      id: staffIndex + 1,
      name: staff.name,
      email: staff.email,
      role: staff.role,
    };
  }

  return null;
}
