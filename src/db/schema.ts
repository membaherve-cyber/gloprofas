import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import type {
  AlertCopy,
  ArticleCopy,
  CategoryCopy,
  ChatbotSettings,
  FaqCopy,
  Localized,
  PageCopy,
  ReportDraftData,
  ResourceCopy,
  ServiceCopy,
  WebsiteSettings,
} from "@/lib/types";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
};

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  totpSecret: text("totp_secret"),
  totpEnabled: boolean("totp_enabled").notNull().default(false),
  recoveryCodes: jsonb("recovery_codes").$type<string[]>().notNull().default([]),
  failedLogins: integer("failed_logins").notNull().default(0),
  lockedUntil: timestamp("locked_until", { withTimezone: true }),
  active: boolean("active").notNull().default(true),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
}, (t) => [uniqueIndex("users_email_unique").on(t.email)]);

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  userAgent: text("user_agent"),
  ipHash: text("ip_hash"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [uniqueIndex("sessions_token_unique").on(t.tokenHash), index("sessions_user_idx").on(t.userId)]);

export const passwordResets = pgTable("password_resets", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const roles = pgTable("roles", {
  id: text("id").primaryKey(),
  key: text("key").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
}, (t) => [uniqueIndex("roles_key_unique").on(t.key)]);

export const permissions = pgTable("permissions", {
  id: text("id").primaryKey(),
  key: text("key").notNull(),
  description: text("description").notNull().default(""),
}, (t) => [uniqueIndex("permissions_key_unique").on(t.key)]);

export const rolePermissions = pgTable("role_permissions", {
  roleId: text("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
  permissionId: text("permission_id").notNull().references(() => permissions.id, { onDelete: "cascade" }),
}, (t) => [primaryKey({ columns: [t.roleId, t.permissionId] })]);

export const userRoles = pgTable("user_roles", {
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  roleId: text("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
}, (t) => [primaryKey({ columns: [t.userId, t.roleId] })]);

export const scamCategories = pgTable("scam_categories", {
  id: text("id").primaryKey(),
  icon: text("icon").notNull(),
  homepage: boolean("homepage").notNull().default(false),
  tileSize: text("tile_size").notNull().default("compact"),
  sortOrder: integer("sort_order").notNull().default(0),
  related: jsonb("related").$type<string[]>().notNull().default([]),
  translations: jsonb("translations").$type<Localized<CategoryCopy>>().notNull(),
  status: text("status").notNull().default("published"),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
}, (t) => [index("scam_categories_status_idx").on(t.status)]);

export const articleCategories = pgTable("article_categories", {
  id: text("id").primaryKey(),
  key: text("key").notNull(),
  translations: jsonb("translations").$type<Localized<{ name: string; slug: string }>>().notNull(),
}, (t) => [uniqueIndex("article_categories_key_unique").on(t.key)]);

export const articleTags = pgTable("article_tags", {
  id: text("id").primaryKey(),
  articleId: text("article_id").notNull(),
  slug: text("slug").notNull(),
  translations: jsonb("translations").$type<Localized<{ name: string }>>().notNull(),
});

export const articles = pgTable("articles", {
  id: text("id").primaryKey(),
  categoryId: text("category_id").references(() => articleCategories.id),
  kind: text("kind").notNull().default("article"),
  author: text("author").notNull().default("GLOPROFAS"),
  image: text("image"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  translations: jsonb("translations").$type<Localized<ArticleCopy>>().notNull(),
  status: text("status").notNull().default("draft"),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
}, (t) => [index("articles_status_idx").on(t.status)]);

export const resourceCategories = pgTable("resource_categories", {
  id: text("id").primaryKey(),
  key: text("key").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  translations: jsonb("translations").$type<Localized<{ name: string; slug: string; summary: string }>>().notNull(),
}, (t) => [uniqueIndex("resource_categories_key_unique").on(t.key)]);

export const resources = pgTable("resources", {
  id: text("id").primaryKey(),
  categoryId: text("category_id").references(() => resourceCategories.id),
  format: text("format").notNull().default("guide"),
  language: text("language").notNull().default("both"),
  image: text("image"),
  fileSize: text("file_size"),
  featured: boolean("featured").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  translations: jsonb("translations").$type<Localized<ResourceCopy>>().notNull(),
  status: text("status").notNull().default("draft"),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
});

export const scamAlerts = pgTable("scam_alerts", {
  id: text("id").primaryKey(),
  categoryId: text("category_id").references(() => scamCategories.id),
  country: text("country").notNull(),
  risk: text("risk").notNull().default("medium"),
  image: text("image"),
  links: jsonb("links").$type<{ label: string; href: string }[]>().notNull().default([]),
  pinned: boolean("pinned").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  translations: jsonb("translations").$type<Localized<AlertCopy>>().notNull(),
  status: text("status").notNull().default("draft"),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
}, (t) => [index("scam_alerts_status_idx").on(t.status), index("scam_alerts_risk_idx").on(t.risk)]);

export const pages = pgTable("pages", {
  id: text("id").primaryKey(),
  section: text("section").notNull(),
  key: text("key").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  translations: jsonb("translations").$type<Localized<PageCopy>>().notNull(),
  status: text("status").notNull().default("published"),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
}, (t) => [uniqueIndex("pages_section_key").on(t.section, t.key)]);

export const services = pgTable("services", {
  id: text("id").primaryKey(),
  groupKey: text("group_key").notNull(),
  pricingMode: text("pricing_mode").notNull().default("consultation"),
  priceLabel: text("price_label"),
  sortOrder: integer("sort_order").notNull().default(0),
  translations: jsonb("translations").$type<Localized<ServiceCopy>>().notNull(),
  status: text("status").notNull().default("published"),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
});

export const faqs = pgTable("faqs", {
  id: text("id").primaryKey(),
  scope: text("scope").notNull().default("general"),
  sortOrder: integer("sort_order").notNull().default(0),
  translations: jsonb("translations").$type<Localized<FaqCopy>>().notNull(),
  status: text("status").notNull().default("published"),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
});

export const scamReports = pgTable("scam_reports", {
  id: text("id").primaryKey(),
  reference: text("reference").notNull(),
  categoryId: text("category_id"),
  description: text("description").notNull(),
  incidentDate: text("incident_date"),
  channel: text("channel"),
  country: text("country"),
  city: text("city"),
  suspiciousUrl: text("suspicious_url"),
  phone: text("phone"),
  emailInvolved: text("email_involved"),
  moneyLost: boolean("money_lost").notNull().default(false),
  amount: text("amount"),
  currency: text("currency"),
  ongoing: boolean("ongoing").notNull().default(false),
  reporterName: text("reporter_name"),
  reporterEmail: text("reporter_email").notNull(),
  contactLanguage: text("contact_language").notNull().default("en"),
  consentAt: timestamp("consent_at", { withTimezone: true }),
  policyVersion: text("policy_version").notNull().default("2026-11"),
  status: text("status").notNull().default("new"),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
}, (t) => [uniqueIndex("scam_reports_reference_unique").on(t.reference), index("scam_reports_status_idx").on(t.status)]);

export const scamReportAttachments = pgTable("scam_report_attachments", {
  id: text("id").primaryKey(),
  reportId: text("report_id").references(() => scamReports.id, { onDelete: "cascade" }),
  draftId: text("draft_id"),
  storageKey: text("storage_key").notNull(),
  originalName: text("original_name").notNull(),
  mime: text("mime").notNull(),
  size: integer("size").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const scamReportNotes = pgTable("scam_report_notes", {
  id: text("id").primaryKey(),
  reportId: text("report_id").notNull().references(() => scamReports.id, { onDelete: "cascade" }),
  authorId: text("author_id"),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const reportDrafts = pgTable("report_drafts", {
  id: text("id").primaryKey(),
  tokenHash: text("token_hash").notNull(),
  step: integer("step").notNull().default(1),
  data: jsonb("data").$type<ReportDraftData>().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [uniqueIndex("report_drafts_token_unique").on(t.tokenHash)]);

export const serviceEnquiries = pgTable("service_enquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  organisation: text("organisation"),
  email: text("email").notNull(),
  phone: text("phone"),
  country: text("country"),
  serviceId: text("service_id"),
  serviceLabel: text("service_label"),
  requirements: text("requirements").notNull(),
  contactMethod: text("contact_method"),
  language: text("language").notNull().default("en"),
  status: text("status").notNull().default("new"),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
});

export const contactMessages = pgTable("contact_messages", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  category: text("category").notNull(),
  message: text("message").notNull(),
  language: text("language").notNull().default("en"),
  status: text("status").notNull().default("new"),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
});

export const volunteerApplications = pgTable("volunteer_applications", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  country: text("country"),
  background: text("background"),
  skills: text("skills"),
  languages: text("languages"),
  interests: text("interests"),
  motivation: text("motivation").notNull(),
  status: text("status").notNull().default("new"),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
});

export const partnershipApplications = pgTable("partnership_applications", {
  id: text("id").primaryKey(),
  organisation: text("organisation").notNull(),
  orgType: text("org_type"),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  country: text("country"),
  proposal: text("proposal").notNull(),
  status: text("status").notNull().default("new"),
  isDemo: boolean("is_demo").notNull().default(false),
  ...timestamps,
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  country: text("country"),
  language: text("language").notNull().default("en"),
  status: text("status").notNull().default("pending"),
  consentAt: timestamp("consent_at", { withTimezone: true }),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [uniqueIndex("newsletter_email_unique").on(t.email)]);

export const media = pgTable("media", {
  id: text("id").primaryKey(),
  filename: text("filename").notNull(),
  storageKey: text("storage_key"),
  publicPath: text("public_path"),
  mime: text("mime").notNull(),
  size: integer("size").notNull().default(0),
  alt: jsonb("alt").$type<Localized<string>>().notNull(),
  isDemo: boolean("is_demo").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const chatbotSettings = pgTable("chatbot_settings", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<ChatbotSettings>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const chatbotConversations = pgTable("chatbot_conversations", {
  id: text("id").primaryKey(),
  locale: text("locale").notNull().default("en"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
});

export const chatbotMessages = pgTable("chatbot_messages", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id").notNull().references(() => chatbotConversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const websiteSettings = pgTable("website_settings", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<WebsiteSettings>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const activityLogs = pgTable("activity_logs", {
  id: text("id").primaryKey(),
  userId: text("user_id"),
  action: text("action").notNull(),
  entity: text("entity"),
  entityId: text("entity_id"),
  meta: jsonb("meta").$type<Record<string, string | number | boolean | null>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index("activity_logs_created_idx").on(t.createdAt)]);

export const translations = pgTable("translations", {
  id: text("id").primaryKey(),
  namespace: text("namespace").notNull(),
  key: text("key").notNull(),
  locale: text("locale").notNull(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [uniqueIndex("translations_unique").on(t.namespace, t.key, t.locale)]);

export const jobs = pgTable("jobs", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
  status: text("status").notNull().default("pending"),
  runAt: timestamp("run_at", { withTimezone: true }).notNull().defaultNow(),
  attempts: integer("attempts").notNull().default(0),
  maxAttempts: integer("max_attempts").notNull().default(5),
  lockedAt: timestamp("locked_at", { withTimezone: true }),
  lockedBy: text("locked_by"),
  lastError: text("last_error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index("jobs_status_run_idx").on(t.status, t.runAt)]);

export const failedJobs = pgTable("failed_jobs", {
  id: text("id").primaryKey(),
  jobId: text("job_id"),
  type: text("type").notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
  error: text("error").notNull(),
  failedAt: timestamp("failed_at", { withTimezone: true }).notNull().defaultNow(),
});

export const rateLimits = pgTable("rate_limits", {
  key: text("key").primaryKey(),
  windowStart: timestamp("window_start", { withTimezone: true }).notNull(),
  count: integer("count").notNull().default(0),
});

export const emailMessages = pgTable("email_messages", {
  id: text("id").primaryKey(),
  toAddress: text("to_address").notNull(),
  subject: text("subject").notNull(),
  textBody: text("text_body").notNull(),
  htmlBody: text("html_body").notNull(),
  status: text("status").notNull().default("queued"),
  error: text("error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
