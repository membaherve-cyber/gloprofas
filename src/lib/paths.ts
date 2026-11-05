import type { Locale } from "@/lib/types";

export const SECTIONS = {
  about: { en: "about", fr: "a-propos" },
  awareness: { en: "awareness", fr: "sensibilisation" },
  resources: { en: "resources", fr: "ressources" },
  services: { en: "services", fr: "services" },
  news: { en: "news", fr: "actualites" },
  involved: { en: "get-involved", fr: "simpliquer" },
  contact: { en: "contact", fr: "contact" },
  alerts: { en: "alerts", fr: "alertes" },
  support: { en: "support", fr: "soutien" },
  report: { en: "report", fr: "signaler" },
  search: { en: "search", fr: "recherche" },
  legal: { en: "legal", fr: "informations" },
} as const;

export type SectionKey = keyof typeof SECTIONS;

export const ABOUT_KEYS = [
  "who-we-are",
  "mission",
  "vision",
  "objectives",
  "approach",
  "geographic-focus",
  "governance",
] as const;

export const INVOLVED_KEYS = ["volunteer", "partner", "support"] as const;

export const LEGAL_KEYS = [
  "privacy",
  "terms",
  "cookies",
  "disclaimer",
  "reporting-disclaimer",
  "ai-disclaimer",
] as const;

export const SERVICE_GROUPS = ["individuals", "businesses", "institutions", "training"] as const;
export type ServiceGroup = (typeof SERVICE_GROUPS)[number];

export function pathFor(locale: Locale, section: SectionKey, ...slug: string[]) {
  const base = `/${locale}/${SECTIONS[section][locale]}`;
  return slug.length ? `${base}/${slug.join("/")}` : base;
}

export function matchSection(locale: Locale, segment: string): SectionKey | null {
  const found = (Object.keys(SECTIONS) as SectionKey[]).find((key) => SECTIONS[key][locale] === segment);
  return found ?? null;
}

export function sectionFromPath(pathname: string): { locale: Locale; section: SectionKey | "home" } | null {
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0];
  if (locale !== "en" && locale !== "fr") return null;
  if (!parts[1]) return { locale, section: "home" };
  const section = matchSection(locale, parts[1]);
  if (!section) return null;
  return { locale, section };
}
