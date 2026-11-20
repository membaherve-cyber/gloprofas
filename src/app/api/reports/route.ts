import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  rateLimit,
  limited,
  cleanText,
  isEmail,
  badRequest,
  serverError,
  generateReference,
  containsSecrets,
} from "@/lib/server/api-helpers";

/**
 * POST /api/reports — confidential scam report submission.
 * Mirrors the original workflow: category, description, channel, evidence
 * metadata, reporter contact, consent. Evidence files are accepted as
 * base64 payloads (max 5, 2MB each) with magic-byte validation.
 */

const CHANNELS = [
  "sms",
  "phone",
  "whatsapp",
  "social",
  "email",
  "web",
  "inperson",
  "other",
] as const;

interface EvidenceFile {
  name?: string;
  dataBase64?: string;
}

function sniffType(bytes: Uint8Array): string | null {
  if (bytes.length < 4) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47)
    return "png";
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46)
    return "webp";
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x2d)
    return "pdf";
  return null;
}

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, "reports", 5, 60 * 60 * 1000);
  if (!rl.ok) return limited(rl.retryAfterSec);

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return badRequest({ description: "invalid" });

    const categorySlug = cleanText(body.categorySlug, 64) || null;
    const description = cleanText(body.description, 4000);
    const incidentDate = cleanText(body.incidentDate, 20) || null;
    const channel = CHANNELS.includes(body.channel) ? body.channel : null;
    const country = cleanText(body.country, 80) || null;
    const city = cleanText(body.city, 80) || null;
    const suspiciousUrl = cleanText(body.suspiciousUrl, 300) || null;
    const phoneInvolved = cleanText(body.phoneInvolved, 60) || null;
    const emailInvolved = cleanText(body.emailInvolved, 254) || null;
    const moneyLost = body.moneyLost === true;
    const amount = cleanText(body.amount, 40) || null;
    const ongoing = body.ongoing === true;
    const reporterName = cleanText(body.reporterName, 80) || null;
    const reporterEmail = cleanText(body.reporterEmail, 254).toLowerCase();
    const language = body.language === "fr" ? "fr" : "en";
    const consent = body.consent === true;

    /* Server-side validation (authoritative) */
    const fields: Record<string, string> = {};
    if (description.length < 20)
      fields.description = body.language === "fr" ? "too_short" : "too_short";
    if (containsSecrets(description)) fields.description = "secrets";
    if (!isEmail(reporterEmail)) fields.reporterEmail = "invalid";
    if (!consent) fields.consent = "required";
    if (incidentDate) {
      const d = new Date(incidentDate);
      if (Number.isNaN(d.getTime()) || d.getTime() > Date.now() + 86400000)
        fields.incidentDate = "invalid";
    }
    if (Object.keys(fields).length > 0) return badRequest(fields);

    /* Evidence handling: base64 payloads, magic-byte sniff, size caps */
    const rawEvidence = Array.isArray(body.evidence) ? (body.evidence as EvidenceFile[]) : [];
    const evidence = rawEvidence.slice(0, 5);
    let evidenceCount = 0;
    for (const f of evidence) {
      if (typeof f?.dataBase64 !== "string" || !f.dataBase64) continue;
      if (f.dataBase64.length > 2_800_000) continue; // ~2MB cap
      try {
        const buf = Uint8Array.from(Buffer.from(f.dataBase64.split(",").pop() ?? "", "base64"));
        if (buf.length > 2_200_000) continue;
        if (sniffType(buf)) evidenceCount += 1;
      } catch {
        /* skip invalid file */
      }
    }

    const reference = generateReference();

    await db.scamReport.create({
      data: {
        reference,
        categorySlug,
        description,
        incidentDate,
        channel,
        country,
        city,
        suspiciousUrl,
        phoneInvolved,
        emailInvolved,
        moneyLost,
        amount,
        ongoing,
        reporterName,
        reporterEmail,
        evidenceCount,
        language,
        status: "new",
      },
    });

    await db.reportNote.create({
      data: {
        report: { connect: { reference } },
        author: "system",
        note: `Report received${evidenceCount > 0 ? ` with ${evidenceCount} attachment(s)` : ""}.`,
      },
    });

    await db.activityLog.create({
      data: {
        actor: "public",
        action: "report.submitted",
        entity: "ScamReport",
        entityId: reference,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        reference,
        status: "received",
      },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    console.error("[api/reports]", e);
    return serverError();
  }
}
