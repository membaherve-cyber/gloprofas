/**
 * Admin authentication helpers — scrypt hashing, DB sessions.
 * Shared by /api/admin/* routes.
 */

import { NextRequest } from "next/server";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { db } from "@/lib/db";

export const SESSION_COOKIE = "gloprofas_session";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [scheme, salt, hash] = stored.split("$");
    if (scheme !== "scrypt" || !salt || !hash) return false;
    const candidate = scryptSync(password, salt, 64);
    const expected = Buffer.from(hash, "hex");
    return candidate.length === expected.length && timingSafeEqual(candidate, expected);
  } catch {
    return false;
  }
}

const DEFAULT_ADMIN_EMAIL = "admin@gloprofas.org";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD || "Gloprofas#2026";

/** Ensure the default administrator exists (idempotent). */
export async function ensureAdminSeed() {
  const count = await db.adminUser.count();
  if (count === 0) {
    await db.adminUser.create({
      data: {
        email: DEFAULT_ADMIN_EMAIL,
        name: "Administrator",
        passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
        role: "super-administrator",
      },
    });
  }
}

export async function currentSession(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await db.adminSession.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date() || !session.user.isActive) return null;
  return session;
}
