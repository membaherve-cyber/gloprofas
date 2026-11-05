import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { db, hasDatabase } from "@/db";
import { scamReportNotes, scamReports } from "@/db/schema";
import { generateReference } from "@/lib/password";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { reportSubmitSchema, flattenErrors } from "@/lib/validation";
import { queueMail } from "@/server/mail";
import { logActivity } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILES = 5;
const MAX_BYTES = 10 * 1024 * 1024;
const PRIVATE_ROOT = process.env.PRIVATE_STORAGE_PATH ?? "./storage/private";

/** Sniff a small set of allowed file types from magic bytes. */
function sniff(buffer: Buffer): { ext: string; mime: string } | null {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return { ext: "jpg", mime: "image/jpeg" };
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { ext: "png", mime: "image/png" };
  }
  if (buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP") {
    return { ext: "webp", mime: "image/webp" };
  }
  if (buffer.subarray(0, 5).toString() === "%PDF-") return { ext: "pdf", mime: "application/pdf" };
  return null;
}

function formValue(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const limit = await rateLimit(clientKey(request, "report-submit"), 5, 3600);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const parsed = reportSubmitSchema.safeParse({
    categorySlug: formValue(form, "categorySlug"),
    description: formValue(form, "description"),
    incidentDate: formValue(form, "incidentDate"),
    channel: formValue(form, "channel"),
    country: formValue(form, "country"),
    city: formValue(form, "city") || undefined,
    suspiciousUrl: formValue(form, "suspiciousUrl") || undefined,
    phoneInvolved: formValue(form, "phoneInvolved") || undefined,
    emailInvolved: formValue(form, "emailInvolved") || undefined,
    moneyLost: formValue(form, "moneyLost") === "yes",
    amount: formValue(form, "amount") || undefined,
    currency: formValue(form, "currency") || undefined,
    ongoing: formValue(form, "ongoing") === "yes",
    reporterName: formValue(form, "reporterName") || undefined,
    reporterEmail: formValue(form, "reporterEmail"),
    language: formValue(form, "language") === "fr" ? "fr" : "en",
    consent: form.get("consent") === "on" || formValue(form, "consent") === "true" ? true : undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the fields.", fields: flattenErrors(parsed.error) },
      { status: 400 },
    );
  }

  const files = form.getAll("evidence").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: "At most 5 files are allowed." }, { status: 400 });
  }
  const prepared: { name: string; buffer: Buffer; mime: string }[] = [];
  for (const file of files) {
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Each file must be 10 MB or smaller." }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const type = sniff(buffer);
    if (!type) {
      return NextResponse.json({ error: "Only JPG, PNG, WebP and PDF files are accepted." }, { status: 400 });
    }
    prepared.push({ name: `${randomUUID()}.${type.ext}`, buffer, mime: type.mime });
  }

  const reference = generateReference();
  const folder = path.join(PRIVATE_ROOT, "reports", reference);

  try {
    if (prepared.length > 0) {
      await mkdir(folder, { recursive: true, mode: 0o700 }).catch(() => null);
      for (const file of prepared) {
        await writeFile(path.join(folder, file.name), file.buffer, { mode: 0o600 }).catch(() => null);
      }
    }

    if (hasDatabase) {
      await db
        .transaction(async (tx) => {
          const [created] = await tx
            .insert(scamReports)
            .values({
              reference,
              categorySlug: parsed.data.categorySlug,
              description: parsed.data.description,
              incidentDate: parsed.data.incidentDate,
              channel: parsed.data.channel,
              country: parsed.data.country,
              city: parsed.data.city ?? null,
              suspiciousUrl: parsed.data.suspiciousUrl ?? null,
              phoneInvolved: parsed.data.phoneInvolved ?? null,
              emailInvolved: parsed.data.emailInvolved ?? null,
              moneyLost: parsed.data.moneyLost,
              amount: parsed.data.amount ?? null,
              currency: parsed.data.currency ?? null,
              ongoing: parsed.data.ongoing,
              reporterName: parsed.data.reporterName ?? null,
              reporterEmail: parsed.data.reporterEmail.toLowerCase(),
              language: parsed.data.language,
              status: "new",
            })
            .returning({ id: scamReports.id });
          if (created) {
            await tx.insert(scamReportNotes).values({
              reportId: created.id,
              author: "system",
              note:
                prepared.length > 0
                  ? `Report received with ${prepared.length} attachment(s).`
                  : "Report received without attachments.",
            });
          }
        })
        .catch(() => null);
    }

    await queueMail({
      to: parsed.data.reporterEmail,
      kind: "report-acknowledgement",
      subject:
        parsed.data.language === "fr"
          ? `Accusé de réception — ${reference}`
          : `Acknowledgement of receipt — ${reference}`,
      text:
        parsed.data.language === "fr"
          ? `Nous avons reçu votre signalement sous la référence ${reference}.\n\nCe signalement n’est pas une plainte officielle et ne garantit pas la récupération des fonds. Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de monnaie électronique via son canal officiel.\n\nConservez cette référence pour tout échange avec nous.`
          : `We have received your report under reference ${reference}.\n\nThis report is not an official police complaint and does not guarantee recovery of funds. If you sent money, contact your bank or mobile money provider immediately through its official channel.\n\nKeep this reference for any correspondence with us.`,
    });
    await logActivity(parsed.data.reporterEmail, "report.created", "scam_report", reference, {
      category: parsed.data.categorySlug,
      attachments: prepared.length,
    });

    return NextResponse.json({ reference }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "The report could not be stored. Please try again." },
      { status: 500 },
    );
  }
}
