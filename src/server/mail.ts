import "server-only";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";
import { db } from "@/db";
import { emailMessages } from "@/db/schema";
import { env } from "@/lib/env";
import { uid } from "@/lib/utils";

export async function queueEmail(input: { to: string; subject: string; text: string; html: string }) {
  const id = uid("mail");
  await db.insert(emailMessages).values({
    id,
    toAddress: input.to,
    subject: input.subject,
    textBody: input.text,
    htmlBody: input.html,
    status: "queued",
  });
  await deliverEmail(id, input).catch(() => undefined);
  return id;
}

export async function deliverEmail(id: string, input: { to: string; subject: string; text: string; html: string }) {
  const cfg = env();
  if (!cfg.SMTP_HOST || !cfg.MAIL_FROM_ADDRESS) {
    await db.update(emailMessages).set({ status: "logged" }).where(eq(emailMessages.id, id));
    return;
  }
  try {
    const transport = nodemailer.createTransport({
      host: cfg.SMTP_HOST,
      port: Number(cfg.SMTP_PORT || 587),
      secure: cfg.SMTP_SECURE === "true",
      auth: cfg.SMTP_USERNAME ? { user: cfg.SMTP_USERNAME, pass: cfg.SMTP_PASSWORD } : undefined,
    });
    await transport.sendMail({
      from: `${cfg.MAIL_FROM_NAME} <${cfg.MAIL_FROM_ADDRESS}>`,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });
    await db.update(emailMessages).set({ status: "sent" }).where(eq(emailMessages.id, id));
  } catch (error) {
    await db.update(emailMessages).set({ status: "failed", error: error instanceof Error ? error.message : "send failed" }).where(eq(emailMessages.id, id));
  }
}

export function emailHtml(title: string, paragraphs: string[]) {
  const body = paragraphs.map((p) => `<p style="margin:0 0 14px;line-height:1.6;color:#0B1220">${escapeHtml(p)}</p>`).join("");
  return `<div style="background:#F4F7FB;padding:28px;font-family:Manrope,Arial,sans-serif"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:22px;padding:28px"><p style="letter-spacing:.14em;text-transform:uppercase;font-size:12px;color:#2A62F5;font-weight:700">GLOPROFAS</p><h1 style="font-size:28px;line-height:1.15;color:#0A1631;margin:8px 0 16px">${escapeHtml(title)}</h1>${body}<p style="color:#4B5870;font-size:13px">This message is informational. GLOPROFAS is not a law-enforcement authority and cannot guarantee recovery of funds.</p></div></div>`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] || char);
}
