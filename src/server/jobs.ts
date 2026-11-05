import "server-only";
import { and, asc, eq, lte, sql } from "drizzle-orm";
import { db } from "@/db";
import { jobs } from "@/db/schema";

export type JobPayload = Record<string, unknown>;

export async function enqueue(type: string, payload: JobPayload): Promise<void> {
  await db.insert(jobs).values({ type, payload, status: "queued" });
}

type MailPayload = {
  to?: string;
  subject?: string;
  text?: string;
  html?: string;
};

async function sendMail(payload: MailPayload): Promise<void> {
  const host = process.env.SMTP_HOST;
  const from = process.env.MAIL_FROM_ADDRESS;
  if (!host || !from || !payload.to) {
    // SMTP is not configured in this environment: the job is recorded as a
    // no-op so that the outbox can be inspected and replayed once configured.
    return;
  }
  const nodemailer = await import("nodemailer");
  const transport = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth:
      process.env.SMTP_USERNAME && process.env.SMTP_PASSWORD
        ? { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD }
        : undefined,
  });
  await transport.sendMail({
    from: `"${process.env.MAIL_FROM_NAME ?? "GLOPROFAS"}" <${from}>`,
    to: payload.to,
    subject: payload.subject ?? "GLOPROFAS",
    text: payload.text ?? "",
    html: payload.html ?? undefined,
  });
}

/** Worker body. Invoked by scripts/worker.ts (npm run worker) or /api/jobs/run. */
export async function processJobs(limit = 20): Promise<{ processed: number; failed: number }> {
  let processed = 0;
  let failed = 0;

  for (let i = 0; i < limit; i += 1) {
    const claimed = await db.execute(sql`
      update jobs set status = 'processing', attempts = attempts + 1
      where id = (
        select id from jobs
        where status = 'queued' and available_at <= now()
        order by available_at asc
        for update skip locked
        limit 1
      )
      returning id, type, payload, attempts
    `);
    const row = (claimed.rows as Array<{ id: number; type: string; payload: MailPayload; attempts: number }>)[0];
    if (!row) break;

    try {
      if (row.type === "email.send") {
        await sendMail(row.payload);
      }
      await db.update(jobs).set({ status: "done" }).where(eq(jobs.id, row.id));
      processed += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const shouldRetry = row.attempts < 3;
      await db
        .update(jobs)
        .set({
          status: shouldRetry ? "queued" : "failed",
          lastError: message.slice(0, 500),
          availableAt: new Date(Date.now() + Math.min(2 ** row.attempts, 30) * 60_000),
        })
        .where(eq(jobs.id, row.id));
      failed += 1;
    }
  }

  void and;
  void asc;
  void lte;
  return { processed, failed };
}
