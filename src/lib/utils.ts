import { createHash, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import type { Locale, Localized } from "@/lib/types";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "fr";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "fr" : "en";
}

export function uid(prefix = ""): string {
  const id = randomBytes(12).toString("hex");
  return prefix ? `${prefix}_${id}` : id;
}

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function hmacSign(value: string, secret: string) {
  return createHash("sha256").update(`${secret}:${value}`).digest("hex");
}

export function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function makeReference(year = new Date().getUTCFullYear()) {
  let tail = "";
  for (let i = 0; i < 6; i += 1) {
    tail += REF_ALPHABET[randomInt(REF_ALPHABET.length)];
  }
  return `GLP-${year}-${tail}`;
}

export function pickLocale<T>(map: Localized<T> | null | undefined, locale: Locale): { value: T; fallback: boolean } | null {
  if (!map) return null;
  if (map[locale]) return { value: map[locale] as T, fallback: false };
  if (map.en) return { value: map.en, fallback: locale !== "en" };
  const first = Object.values(map)[0];
  if (!first) return null;
  return { value: first as T, fallback: true };
}

export function formatDate(input: Date | string | null | undefined, locale: Locale) {
  if (!input) return "";
  const date = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) return "";
  const months = locale === "fr"
    ? ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function excerpt(text: string, max = 180) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export function clientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "0.0.0.0";
  return headers.get("x-real-ip") || "0.0.0.0";
}

export function hashIp(ip: string) {
  return sha256(ip).slice(0, 16);
}

export function escapeCsv(value: string) {
  let cell = value.replaceAll('"', '""');
  if (/^[=+\-@]/.test(cell)) cell = `'${cell}`;
  return `"${cell}"`;
}

export function redactSensitive(input: string) {
  return input
    .replace(/\b(?:\d[ -]*?){13,19}\b/g, "[redacted-number]")
    .replace(/\b\d{6,}\b/g, "[redacted-digits]")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]")
    .replace(/\+?\d[\d\s().-]{8,}\d/g, "[redacted-phone]");
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function daysFromNow(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

export function daysAgo(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}
