/**
 * GLOPROFAS site configuration — confirmed facts only.
 * Unknown facts remain explicitly marked and hidden from the public interface.
 */

export const SITE = {
  name: "GLOPROFAS",
  fullName: "Global Programme for the Fight Against Scams",
  fullNameFr: "Programme mondial de lutte contre les arnaques",
  tagline: {
    en: "Spot the scam before it costs you.",
    fr: "Repérez l'arnaque avant qu'elle ne vous coûte cher.",
  },
  description: {
    en: "GLOPROFAS helps people recognise fraud, protect their money and know what to do next. Free bilingual scam awareness guides, alerts, victim support and confidential reporting for Cameroon, Africa and international audiences.",
    fr: "GLOPROFAS aide les particuliers, les familles et les entreprises à reconnaître la fraude, protéger leur argent et savoir quoi faire ensuite. Guides bilingues gratuits, alertes, aide aux victimes et signalement confidentiel pour le Cameroun, l'Afrique et le public international.",
  },
  url: "https://gloprofas.org",
  email: "contact@gloprofas.org",
  location: {
    en: "Yaoundé, Cameroon · International initiative",
    fr: "Yaoundé, Cameroun · Initiative internationale",
  },
  policyVersion: "2026-11",
} as const;

/** Routes of the application (hash-based). */
export const ROUTES = {
  home: "/",
  about: "/about",
  activities: "/activities",
  scams: "/scams",
  alerts: "/alerts",
  victimSupport: "/victim-support",
  news: "/news",
  resources: "/resources",
  services: "/services",
  involved: "/get-involved",
  contact: "/contact",
  report: "/report",
  check: "/check",
  legal: "/legal",
  admin: "/admin",
} as const;

/** Primary navigation (bilingual labels come from the dictionary). */
export const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "awareness", href: "/scams" },
  { key: "activities", href: "/activities" },
  { key: "resources", href: "/resources" },
  { key: "services", href: "/services" },
  { key: "news", href: "/news" },
  { key: "involved", href: "/get-involved" },
  { key: "contact", href: "/contact" },
] as const;

/** Mapped generated topical images for the 12 scam categories. */
export const CATEGORY_IMAGES: Record<string, string> = {
  phishing: "/images/gen/scam-phishing.jpg",
  "mobile-money-scams": "/images/gen/scam-mobile-money.jpg",
  "investment-scams": "/images/gen/scam-investment.jpg",
  "employment-scams": "/images/gen/scam-job.jpg",
  "romance-scams": "/images/gen/scam-romance.jpg",
  "online-shopping-scams": "/images/gen/scam-shopping.jpg",
  "cryptocurrency-scams": "/images/gen/scam-crypto.jpg",
  "impersonation-scams": "/images/gen/scam-impersonation.jpg",
  "advance-fee-scams": "/images/gen/scam-advance-fee.jpg",
  "fake-loan-scams": "/images/gen/scam-loan.jpg",
  "business-email-compromise": "/images/gen/scam-business.jpg",
  "fake-websites": "/images/gen/scam-shopping.jpg",
};

export function categoryImage(slug: string, fallback: string): string {
  return CATEGORY_IMAGES[slug] ?? fallback;
}
