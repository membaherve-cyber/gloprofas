import { en, type Dictionary } from "@/messages/en";
import { fr } from "@/messages/fr";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "fr";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "fr" : "en";
}

/** Pick the locale-specific column from a bilingual database row. */
export function pick<T>(locale: Locale, enValue: T, frValue: T): T {
  return locale === "fr" && frValue !== null && frValue !== undefined ? frValue : enValue;
}

export type LocalizedSlugRow = { slugEn: string; slugFr: string };

export function slugFor(locale: Locale, row: LocalizedSlugRow): string {
  return locale === "fr" ? row.slugFr : row.slugEn;
}

export const routes = {
  home: (l: Locale) => `/${l}`,
  about: (l: Locale) => `/${l}/about`,
  campaigns: (l: Locale) => `/${l}/campaigns`,
  scams: (l: Locale) => `/${l}/scams`,
  scam: (l: Locale, slug: string) => `/${l}/scams/${slug}`,
  alerts: (l: Locale) => `/${l}/alerts`,
  alert: (l: Locale, slug: string) => `/${l}/alerts/${slug}`,
  resources: (l: Locale) => `/${l}/resources`,
  news: (l: Locale) => `/${l}/news`,
  article: (l: Locale, slug: string) => `/${l}/news/${slug}`,
  services: (l: Locale) => `/${l}/services`,
  service: (l: Locale, slug: string) => `/${l}/services/${slug}`,
  report: (l: Locale) => `/${l}/report`,
  contact: (l: Locale) => `/${l}/contact`,
  involved: (l: Locale) => `/${l}/get-involved`,
  search: (l: Locale) => `/${l}/search`,
  privacy: (l: Locale) => `/${l}/legal/privacy`,
  legal: (l: Locale, slug: string) => `/${l}/legal/${slug}`,
  admin: (l: Locale) => `/${l}/admin`,
};

export const localeLabels: Record<Locale, string> = { en: "English", fr: "Français" };
export const localeShort: Record<Locale, string> = { en: "EN", fr: "FR" };
