export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export type Localized<T> = Partial<Record<Locale, T>>;

export type CategoryCopy = {
  title: string;
  slug: string;
  summary: string;
  definition: string;
  howItWorks: string;
  warningSigns: string[];
  techniques: string[];
  example: string;
  protection: string[];
  ifAffected: string[];
  seoTitle: string;
  seoDescription: string;
};

export type ArticleCopy = {
  title: string;
  slug: string;
  summary: string;
  body: string[];
  seoTitle: string;
  seoDescription: string;
};

export type AlertCopy = {
  title: string;
  slug: string;
  summary: string;
  body: string[];
  recommended: string[];
  seoTitle: string;
  seoDescription: string;
};

export type ResourceCopy = {
  title: string;
  slug: string;
  summary: string;
  body: string[];
  seoTitle: string;
  seoDescription: string;
};

export type PageCopy = {
  title: string;
  slug: string;
  summary: string;
  body: string[];
  seoTitle: string;
  seoDescription: string;
};

export type ServiceCopy = {
  title: string;
  slug: string;
  summary: string;
  body: string[];
  audience: string;
  seoTitle: string;
  seoDescription: string;
};

export type FaqCopy = {
  question: string;
  answer: string;
};

export type RiskLevel = "low" | "medium" | "high" | "critical";
export type ContentStatus = "draft" | "published" | "scheduled" | "archived";
export type ReportStatus = "new" | "under_review" | "info_required" | "reviewed" | "closed";
export type EnquiryStatus =
  | "new"
  | "contacted"
  | "quotation_requested"
  | "quotation_sent"
  | "accepted"
  | "declined"
  | "closed";
export type PricingMode = "free" | "paid" | "quotation" | "consultation" | "training";
export type RoleKey =
  | "super_admin"
  | "administrator"
  | "report_officer"
  | "content_editor"
  | "customer_support"
  | "ai_manager"
  | "volunteer_manager";

export type WebsiteSettings = {
  seedVersion: number;
  orgName: string;
  legalName: string;
  email: string;
  emailPublic: boolean;
  phone: string;
  phonePublic: boolean;
  location: string;
  locationPublic: boolean;
  socials: { label: string; href: string }[];
  notificationEmails: string[];
  donationUrl: string;
  donationNote: Localized<string>;
  verifiedStats: { label: Localized<string>; value: string; suffix?: string }[];
  disclaimer: Localized<string>;
  seoTitle: Localized<string>;
  seoDescription: Localized<string>;
  retentionReportDays: number;
  retentionChatDays: number;
};

export type ChatbotSettings = {
  enabled: boolean;
  storeConversations: boolean;
  dailyCap: number;
  perHour: number;
  model: string;
  welcome: Localized<string>;
  suggestions: Localized<string[]>;
  instructions: Localized<string>;
  usage: { conversations: number; messages: number; errors: number };
};

export type ReportDraftData = {
  categoryId?: string;
  unsure?: boolean;
  description?: string;
  incidentDate?: string;
  channel?: string;
  country?: string;
  city?: string;
  url?: string;
  phone?: string;
  emailInvolved?: string;
  moneyLost?: boolean;
  amount?: string;
  currency?: string;
  ongoing?: boolean;
  name?: string;
  email?: string;
  language?: Locale;
  consent?: boolean;
};

export type SearchHit = {
  type: string;
  title: string;
  summary: string;
  href: string;
  category?: string;
};

export type SourceChip = { title: string; href: string };

export type AssistantReply = {
  answer: string;
  sources: SourceChip[];
  action?: { type: "report"; label: string; href: string };
  disclaimer: string;
  blocked?: boolean;
};
