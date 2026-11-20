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

/** POST /api/get-involved — volunteer applications and partnership enquiries. */

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, "getinvolved", 5, 60 * 60 * 1000);
  if (!rl.ok) return limited(rl.retryAfterSec);

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return badRequest({ form: "invalid" });

    const kind = body.kind === "partner" ? "partner" : "volunteer";
    const language = body.language === "fr" ? "fr" : "en";

    if (kind === "volunteer") {
      const name = cleanText(body.name, 80);
      const email = cleanText(body.email, 254).toLowerCase();
      const background = cleanText(body.background, 500) || null;
      const skills = cleanText(body.skills, 500) || null;
      const languages = cleanText(body.languages, 200) || null;
      const interests = cleanText(body.interests, 300) || null;
      const motivation = cleanText(body.motivation, 2000) || null;

      const fields: Record<string, string> = {};
      if (!name) fields.name = "required";
      if (!isEmail(email)) fields.email = "invalid";
      if (Object.keys(fields).length > 0) return badRequest(fields);

      await db.volunteerApplication.create({
        data: { name, email, background, skills, languages, interests, motivation, language },
      });
      return NextResponse.json({ ok: true, kind }, { status: 201 });
    }

    // partnership
    const organisation = cleanText(body.organisation, 160);
    const organisationType = cleanText(body.organisationType, 80) || null;
    const contactPerson = cleanText(body.contactPerson, 80);
    const email = cleanText(body.email, 254).toLowerCase();
    const phone = cleanText(body.phone, 60) || null;
    const country = cleanText(body.country, 80) || null;
    const proposal = cleanText(body.proposal, 3000);

    const fields: Record<string, string> = {};
    if (!organisation) fields.organisation = "required";
    if (!contactPerson) fields.contactPerson = "required";
    if (!isEmail(email)) fields.email = "invalid";
    if (proposal.length < 20) fields.proposal = "too_short";
    if (Object.keys(fields).length > 0) return badRequest(fields);

    await db.partnershipApplication.create({
      data: { organisation, organisationType, contactPerson, email, phone, country, proposal, language },
    });
    return NextResponse.json({ ok: true, kind }, { status: 201 });
  } catch (e) {
    console.error("[api/get-involved]", e);
    return serverError();
  }
}
