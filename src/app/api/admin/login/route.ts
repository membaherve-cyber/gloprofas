import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { db } from "@/lib/db";
import { rateLimit, limited, cleanText } from "@/lib/server/api-helpers";
import {
  verifyPassword,
  ensureAdminSeed,
  SESSION_COOKIE,
} from "@/lib/server/admin-auth";

/** POST /api/admin/login — rate-limited credential login, DB-backed session. */

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, "admin-login", 12, 15 * 60 * 1000);
  if (!rl.ok) return limited(rl.retryAfterSec);

  try {
    await ensureAdminSeed();

    const body = await req.json().catch(() => null);
    const email = cleanText(body?.email, 254).toLowerCase();
    const password = typeof body?.password === "string" ? body.password.slice(0, 200) : "";

    if (!email || !password) {
      return NextResponse.json({ error: "validation" }, { status: 400 });
    }

    const user = await db.adminUser.findUnique({ where: { email } });
    if (!user || !user.isActive || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.adminSession.create({
      data: { token, userId: user.id, expiresAt },
    });

    await db.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    await db.activityLog.create({
      data: { actor: user.email, action: "admin.login", entity: "AdminUser", entityId: user.id },
    });

    const res = NextResponse.json({ ok: true, name: user.name, email: user.email });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
    });
    return res;
  } catch (e) {
    console.error("[api/admin/login]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
