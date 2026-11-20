/**
 * Server-side helpers for GLOPROFAS API routes:
 * in-memory rate limiting, report references, secret detection,
 * simple input sanitisation. Shared across endpoints.
 */

import { NextRequest, NextResponse } from "next/server";

/* ---------------- Rate limiting (in-memory sliding window) ---------------- */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

// Periodic cleanup to avoid unbounded growth.
let lastSweep = Date.now();
function sweep() {
  const now = Date.now();
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [k, b] of buckets) {
    if (b.resetAt < now) buckets.delete(k);
  }
}

export function clientKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || req.headers.get("x-real-ip") || "local";
}

export function rateLimit(
  req: NextRequest,
  scope: string,
  limit: number,
  windowMs: number
): { ok: true } | { ok: false; retryAfterSec: number } {
  sweep();
  const key = `${scope}:${clientKey(req)}`;
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (b.count >= limit) {
    return { ok: false, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { ok: true };
}

export function limited(retryAfterSec: number) {
  return NextResponse.json(
    { error: "rate_limited", retryAfter: retryAfterSec },
    { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
  );
}

/* ---------------- Report reference ---------------- */

const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateReference(): string {
  const year = new Date().getFullYear();
  let code = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (const b of bytes) code += REF_ALPHABET[b % REF_ALPHABET.length];
  return `GLP-${year}-${code}`;
}

/* ---------------- Secret detection ----------------
   Detect PIN/OTP/password mentions followed by digits, Luhn-valid card-like
   numbers and recovery-phrase-like sequences. Client + server enforced. */

const SECRET_KEYWORDS =
  /\b(pin|otp|one[-\s]?time|cvv|cvc|password|passcode|mot\s+de\s+passe|code\s+secret|code\s+pin|secret\s+code|seed\s+phrase|recovery\s+phrase|private\s+key)\b/i;

function luhnValid(digits: string): boolean {
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let dbl = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48;
    if (dbl) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

export function containsSecrets(text: string): boolean {
  // keyword followed (within ~15 chars) by a 4-8 digit sequence
  const kw = new RegExp(SECRET_KEYWORDS.source + "[^\\d]{0,15}(\\d{4,8})", "i");
  if (kw.test(text)) return true;
  // Luhn-valid card-like runs
  const runs = text.replace(/[\s-]/g, "").match(/\d{13,19}/g) ?? [];
  for (const r of runs) if (luhnValid(r)) return true;
  // recovery-phrase-like: 12+ consecutive lowercase words
  const words = text.toLowerCase().match(/[a-zà-ÿ']+/g) ?? [];
  let run = 0;
  for (const w of words) {
    run = w.length >= 3 ? run + 1 : 0;
    if (run >= 12) return true;
  }
  return false;
}

/* ---------------- Basic text sanitisation ---------------- */

export function cleanText(v: unknown, maxLen: number): string {
  if (typeof v !== "string") return "";
  return v
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLen);
}

export function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 254;
}

/* ---------------- JSON error helper ---------------- */

export function badRequest(fields: Record<string, string>) {
  return NextResponse.json({ error: "validation", fields }, { status: 400 });
}

export function serverError() {
  return NextResponse.json({ error: "server_error" }, { status: 500 });
}
