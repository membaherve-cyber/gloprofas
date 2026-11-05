import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { enqueue } from "./jobs";

function secret(): string {
  return process.env.SESSION_SECRET || "development-only-secret-change-me";
}

export function signToken(purpose: string, email: string): string {
  const payload = Buffer.from(`${purpose}:${email.toLowerCase()}`).toString("base64url");
  const signature = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyToken(purpose: string, token: string): string | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
  try {
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  const decoded = Buffer.from(payload, "base64url").toString("utf8");
  const [tokenPurpose, email] = decoded.split(":");
  if (tokenPurpose !== purpose || !email) return null;
  return email;
}

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function queueMail(options: {
  to: string;
  subject: string;
  text: string;
  kind: string;
}): Promise<void> {
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#0b1220;line-height:1.6;max-width:560px">
  <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#2a62f5;font-weight:700">GLOPROFAS</p>
  <h1 style="font-size:22px;margin:0 0 12px">${escapeHtml(options.subject)}</h1>
  ${options.text
    .split("\n\n")
    .map((p) => `<p style="margin:0 0 12px">${escapeHtml(p)}</p>`)
    .join("")}
  <hr style="border:none;border-top:1px solid #dce3ee;margin:24px 0" />
  <p style="font-size:12px;color:#4b5870">This message was sent by the GLOPROFAS platform. GLOPROFAS is not a law enforcement authority and cannot recover funds.</p>
</div>`;
  await enqueue("email.send", {
    to: options.to,
    subject: options.subject,
    text: options.text,
    html,
    kind: options.kind,
  });
}

export function unsubscribeUrl(email: string): string {
  return `${siteUrl()}/api/newsletter/unsubscribe?token=${encodeURIComponent(signToken("unsubscribe", email))}`;
}

export function confirmUrl(email: string): string {
  return `${siteUrl()}/api/newsletter/confirm?token=${encodeURIComponent(signToken("confirm", email))}`;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
