import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("gloprofas_session")?.value;
  if (token) {
    await db.adminSession.deleteMany({ where: { token } }).catch(() => {});
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("gloprofas_session", "", { httpOnly: true, maxAge: 0, path: "/" });
  return res;
}
