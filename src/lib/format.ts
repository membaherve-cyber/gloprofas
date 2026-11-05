import type { Locale } from "@/lib/i18n";

export function formatDate(value: Date | string, locale: Locale): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatSize(kb: number | null): string | null {
  if (!kb) return null;
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

export function readingTime(paragraphs: string[]): number {
  const words = paragraphs.join(" ").split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
}
