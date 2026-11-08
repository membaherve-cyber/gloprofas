import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

/**
 * Canonical site origin.
 * Priority: explicit env → Vercel production host → brand domain.
 * Never falls back to localhost, which would poison canonicals in production.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://gloprofas.org")
).replace(/\/$/, "");

export const SITE_NAME = "GLOPROFAS";
export const LEGAL_NAME = {
  en: "Global Programme for the Fight Against Scams",
  fr: "Programme mondial de lutte contre les arnaques",
} as const;

export const OG_LOCALE: Record<Locale, string> = { en: "en_GB", fr: "fr_FR" };
export const DEFAULT_OG_IMAGE = "/images/gloprofas-logo.png";

export const SITE_DESCRIPTION: Record<Locale, string> = {
  en: "GLOPROFAS is an independent, not-for-profit programme helping people and organisations recognise, prevent, report and respond to scams through practical guidance and public alerts.",
  fr: "GLOPROFAS est un programme indépendant à but non lucratif qui aide les particuliers et les organisations à reconnaître, prévenir, signaler et contrer les arnaques grâce à des conseils pratiques et des alertes publiques.",
};

/** Path without locale prefix, e.g. "/scams/phishing". */
export function stripLocale(path: string): string {
  return path.replace(/^\/(en|fr)(?=\/|$)/, "") || "/";
}

export function localeUrl(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}/${locale}${clean}`;
}

type BuildArgs = {
  locale: Locale;
  /** Locale-free path, e.g. "/about" or "/scams/phishing". "/" for home. */
  path: string;
  title: string;
  description: string;
  /** Absolute or root-relative share image. */
  image?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
  /** Set false for pages with no translated counterpart. */
  bilingual?: boolean;
};

/**
 * Produces complete, industry-standard metadata:
 * canonical, reciprocal hreflang + x-default, Open Graph (locale-aware),
 * Twitter summary card, and robots directives.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  ogType = "website",
  publishedTime,
  modifiedTime,
  author,
  noindex = false,
  bilingual = true,
}: BuildArgs): Metadata {
  const norm = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const canonical = localeUrl(locale, norm);
  const other: Locale = locale === "en" ? "fr" : "en";
  const shareImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const fullTitle = path === "/" || norm === "" ? title : `${title} · ${SITE_NAME}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: {
      canonical,
      ...(bilingual
        ? {
            languages: {
              en: localeUrl("en", norm),
              fr: localeUrl("fr", norm),
              "x-default": localeUrl("en", norm),
            },
          }
        : {}),
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: [OG_LOCALE[other]],
      type: ogType,
      images: [{ url: shareImage, width: 1132, height: 350, alt: `${SITE_NAME} — ${LEGAL_NAME[locale]}` }],
      ...(ogType === "article"
        ? { publishedTime, modifiedTime, authors: author ? [author] : undefined }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
        },
  };
}

/* ── JSON-LD builders (schema.org) ───────────────────────────── */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME.en,
    alternateName: LEGAL_NAME.fr,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      width: 1132,
      height: 350,
    },
    description: SITE_DESCRIPTION.en,
    nonprofitStatus: "NonprofitType",
    areaServed: "Worldwide",
    knowsLanguage: ["en", "fr"],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION.en,
    inLanguage: ["en", "fr"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: localeUrl(locale, item.path),
    })),
  };
}

export function articleLd(a: {
  headline: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  const img = a.image ?? DEFAULT_OG_IMAGE;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline.slice(0, 110),
    description: a.description,
    url: localeUrl(a.locale, a.path),
    mainEntityOfPage: { "@type": "WebPage", "@id": localeUrl(a.locale, a.path) },
    image: [img.startsWith("http") ? img : `${SITE_URL}${img}`],
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    inLanguage: a.locale === "fr" ? "fr-FR" : "en-GB",
    author: { "@type": "Organization", name: a.author ?? SITE_NAME },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isAccessibleForFree: true,
  };
}

export function webPageLd(p: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: p.name,
    description: p.description,
    url: localeUrl(p.locale, p.path),
    inLanguage: p.locale === "fr" ? "fr-FR" : "en-GB",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
