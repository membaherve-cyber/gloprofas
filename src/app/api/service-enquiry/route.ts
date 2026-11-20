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

/** POST /api/service-enquiry — professional service enquiries. */

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, "enquiry", 5, 60 * 60 * 1000);
  if (!rl.ok) return limited(rl.retryAfterSec);

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return badRequest({ requirements: "invalid" });

    const name = cleanText(body.name, 80);
    const organisation = cleanText(body.organisation, 160) || null;
    const email = cleanText(body.email, 254).toLowerCase();
    const phone = cleanText(body.phone, 60) || null;
    const country = cleanText(body.country, 80) || null;
    const serviceSlug = cleanText(body.serviceSlug, 80) || "general";
    const requirements = cleanText(body.requirements, 3000);
    const contactMethod = ["email", "phone"].includes(body.contactMethod)
      ? body.contactMethod
      : "email";
    const language = body.language === "fr" ? "fr" : "en";

    const fields: Record<string, string> = {};
    if (!name) fields.name = "required";
    if (!isEmail(email)) fields.email = "invalid";
    if (requirements.length < 20) fields.requirements = "too_short";
    if (Object.keys(fields).length > 0) return badRequest(fields);

    await db.serviceEnquiry.create({
      data: {
        name,
        organisation,
        email,
        phone,
        country,
        serviceSlug,
        requirements,
        contactMethod,
        language,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("[api/service-enquiry]", e);
    return serverError();
  }
}
