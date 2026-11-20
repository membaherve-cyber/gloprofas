/**
 * GLOPROFAS Resource Centre — shared content types.
 * These types define the contract between content data files (articles,
 * checklists, videos, reporting directory), the Prisma-backed CMS and the
 * public API routes. All user-facing text is bilingual (EN/FR).
 */

export type BiText = { en: string; fr: string };

/* ------------------------------------------------------------------ */
/* Educational articles — "Practical Tools to Protect Yourself"        */
/* ------------------------------------------------------------------ */

export type ArticleCategorySlug =
  | "online-digital"
  | "money-banking"
  | "social-engineering"
  | "business-fraud"
  | "emerging-specialised";

export const ARTICLE_CATEGORIES: {
  slug: ArticleCategorySlug;
  key: string;
  letter: string;
}[] = [
  { slug: "online-digital", key: "onlineDigital", letter: "A" },
  { slug: "money-banking", key: "moneyBanking", letter: "B" },
  { slug: "social-engineering", key: "socialEngineering", letter: "C" },
  { slug: "business-fraud", key: "businessFraud", letter: "D" },
  { slug: "emerging-specialised", key: "emergingSpecialised", letter: "E" },
];

export type ArticleReference = { label: string; url: string };

export type Article = {
  /** kebab-case URL slug, unique, English-led (e.g. "phishing-messages") */
  slug: string;
  categorySlug: ArticleCategorySlug;
  /** SEO-optimised bilingual title */
  title: BiText;
  metaDescription: BiText;
  /** short introduction (2–3 sentences) */
  summary: BiText;
  /** what the scam is (1 paragraph) */
  what: BiText;
  /** how the scam works (1–2 paragraphs) */
  how: BiText;
  /** common warning signs (5–8 bullets) */
  warningSigns: BiText[];
  /** realistic illustrative example, clearly labelled as illustrative */
  example: BiText;
  /** how to protect yourself (5–8 bullets) */
  protect: BiText[];
  /** what to do if you become a victim (4–6 bullets) */
  ifVictim: BiText[];
  /** where to report the incident (3–5 bullets, bilingual) */
  reportTo: BiText[];
  /** clearly visible key takeaway / warning box */
  keyTakeaway: BiText;
  /** related article slugs (2–4) */
  relatedSlugs: string[];
  /** related downloadable checklist slug */
  checklistSlug: string;
  /** authoritative external references (2–4) */
  references: ArticleReference[];
  readingMinutes: number;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date — last reviewed
  featured?: boolean;
  popular?: boolean;
  imageUrl: string;
};

/* ------------------------------------------------------------------ */
/* Printable checklists                                                */
/* ------------------------------------------------------------------ */

export type ChecklistSection = {
  heading: BiText;
  items: BiText[];
};

export type Checklist = {
  slug: string;
  title: BiText;
  subtitle: BiText;
  category: string; // see CHECKLIST_CATEGORIES
  intro: BiText;
  /** important warning signs box */
  warning: BiText;
  /** emergency actions where relevant */
  emergency?: BiText;
  sections: ChecklistSection[];
  references: ArticleReference[];
  version: string;
  publishedAt: string;
  featured?: boolean;
  pdfEn: string;
  pdfFr: string;
};

export const CHECKLIST_CATEGORIES = [
  "general",
  "money",
  "shopping",
  "social",
  "business",
  "family",
  "crisis",
] as const;

/* ------------------------------------------------------------------ */
/* Video learning centre                                               */
/* ------------------------------------------------------------------ */

export type VideoResource = {
  /** real YouTube video id — must be verified before inclusion */
  youtubeId: string;
  title: BiText;
  description: BiText;
  /** publisher as shown on YouTube */
  publisher: string;
  publisherUrl: string;
  duration: string; // e.g. "3:07"
  topicSlug: string;
  verified: boolean;
  verifiedAt: string;
  displayOrder: number;
};

export const VIDEO_TOPICS = [
  "online-scams",
  "phishing",
  "mobile-money",
  "romance-impersonation",
  "investment-crypto",
  "social-whatsapp",
  "fake-websites",
  "identity-theft",
  "ai-deepfakes",
  "after-scam",
] as const;

/* ------------------------------------------------------------------ */
/* Global reporting directory                                          */
/* ------------------------------------------------------------------ */

export type AgencyRole =
  | "police"
  | "cybercrime-unit"
  | "cert"
  | "consumer-protection"
  | "financial-regulator"
  | "reporting-portal";

export type DirectoryAgency = {
  /** official authority name */
  name: string;
  role: AgencyRole;
  website: string;
  /** direct online reporting portal when it exists */
  reportingUrl?: string;
  phone?: string;
  email?: string;
  /** fraud-type slugs this authority handles */
  handles: string[];
  note?: BiText;
};

export type DirectoryCountry = {
  /** ISO 3166-1 alpha-2 */
  code: string;
  name: string;
  nameFr: string;
  continent:
    | "africa"
    | "europe"
    | "north-america"
    | "south-america"
    | "asia"
    | "middle-east"
    | "oceania";
  priority?: boolean;
  agencies: DirectoryAgency[];
  /** general police emergency number where widely published */
  emergency?: string;
  physicalReporting?: BiText;
  sources: ArticleReference[];
  status: "verified" | "pending-verification" | "requires-review";
  lastVerified: string;
};

export const FRAUD_TYPES = [
  { slug: "online-scams", key: "onlineScams" },
  { slug: "financial-fraud", key: "financialFraud" },
  { slug: "mobile-money", key: "mobileMoney" },
  { slug: "bank-transfer", key: "bankTransfer" },
  { slug: "identity-theft", key: "identityTheft" },
  { slug: "phishing", key: "phishing" },
  { slug: "crypto", key: "crypto" },
  { slug: "investment", key: "investment" },
  { slug: "romance", key: "romance" },
  { slug: "shopping", key: "shopping" },
  { slug: "cybercrime", key: "cybercrime" },
  { slug: "bec", key: "bec" },
  { slug: "impersonation", key: "impersonation" },
  { slug: "child-exploitation", key: "childExploitation" },
] as const;

export const CONTINENTS = [
  { slug: "africa", key: "africa" },
  { slug: "europe", key: "europe" },
  { slug: "north-america", key: "northAmerica" },
  { slug: "south-america", key: "southAmerica" },
  { slug: "asia", key: "asia" },
  { slug: "middle-east", key: "middleEast" },
  { slug: "oceania", key: "oceania" },
] as const;

/* ------------------------------------------------------------------ */
/* Scam Checker                                                        */
/* ------------------------------------------------------------------ */

export type CheckerIndicator = {
  /** stable id */
  id: string;
  /** category: urgency | manipulation | financial | advance-fee | impersonation | credentials | payment | promises | confidential | urls | attachments | unusual */
  category: string;
  weight: number; // 1 (weak) – 3 (strong)
  /** what the user sees when detected */
  label: BiText;
  explanation: BiText;
  /** regex or keyword list applied to normalised text */
  patterns: string[]; // lowercase regex source strings
};

export type WarningSignOption = {
  id: string;
  label: BiText;
  weight: number;
  explanation: BiText;
};
