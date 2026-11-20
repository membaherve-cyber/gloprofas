import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  rateLimit,
  limited,
  cleanText,
  isEmail,
  badRequest,
  serverError,
} from "@/lib/server/api-helpers";

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, "newsletter", 6, 60 * 60 * 1000);
  if (!rl.ok) return limited(rl.retryAfterSec);

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return badRequest({ email: "invalid" });

    const name = cleanText(body.name, 80);
    const email = cleanText(body.email, 254).toLowerCase();
    const country = cleanText(body.country, 80);
    const language = body.language === "fr" ? "fr" : "en";

    const fields: Record<string, string> = {};
    if (!name) fields.name = "required";
    if (!isEmail(email)) fields.email = "invalid";
    if (Object.keys(fields).length > 0) return badRequest(fields);

    const existing = await db.newsletterSubscriber.findUnique({
      where: { email },
    });
    if (existing) {
      await db.newsletterSubscriber.update({
        where: { email },
        data: { status: "pending", country: country || existing.country },
      });
      return NextResponse.json({ ok: true, status: "updated" }, { status: 200 });
    }

    await db.newsletterSubscriber.create({
      data: { name, email, country, language, status: "pending" },
    });

    return NextResponse.json({ ok: true, status: "created" }, { status: 201 });
  } catch (e) {
    console.error("[api/newsletter]", e);
    return serverError();
  }
}
