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

const CATEGORIES = ["general", "partnership", "volunteer", "media", "services"];

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, "contact", 5, 60 * 60 * 1000);
  if (!rl.ok) return limited(rl.retryAfterSec);

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return badRequest({ message: "invalid" });

    const name = cleanText(body.name, 80);
    const email = cleanText(body.email, 254).toLowerCase();
    const subject = cleanText(body.subject, 160) || null;
    const category = CATEGORIES.includes(body.category) ? body.category : "general";
    const message = cleanText(body.message, 4000);
    const language = body.language === "fr" ? "fr" : "en";

    const fields: Record<string, string> = {};
    if (!name) fields.name = "required";
    if (!isEmail(email)) fields.email = "invalid";
    if (message.length < 10) fields.message = "too_short";
    if (Object.keys(fields).length > 0) return badRequest(fields);

    await db.contactMessage.create({
      data: { name, email, subject, category, message, language },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("[api/contact]", e);
    return serverError();
  }
}
