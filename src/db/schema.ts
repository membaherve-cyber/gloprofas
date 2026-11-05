import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * GLOPROFAS database model.
 * Storage note: the brief specifies MySQL 8. This sandbox provides a managed
 * PostgreSQL 16 instance, so the same relational model is expressed with
 * drizzle-orm/pg-core. Every query is parameterised through Drizzle.
 */

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    role: text("role").notNull().default("administrator"),
    isActive: boolean("is_active").notNull().default(true),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("users_email_unique").on(t.email)],
);

export const sessions = pgTable(
  "sessions",
  {
    token: text("token").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("sessions_user_idx").on(t.userId)],
);

export const scamCategories = pgTable(
  "scam_categories",
  {
    id: serial("id").primaryKey(),
    slugEn: text("slug_en").notNull(),
    slugFr: text("slug_fr").notNull(),
    nameEn: text("name_en").notNull(),
    nameFr: text("name_fr").notNull(),
    summaryEn: text("summary_en").notNull(),
    summaryFr: text("summary_fr").notNull(),
    definitionEn: text("definition_en").notNull(),
    definitionFr: text("definition_fr").notNull(),
    stepsEn: jsonb("steps_en").$type<string[]>().notNull().default([]),
    stepsFr: jsonb("steps_fr").$type<string[]>().notNull().default([]),
    signsEn: jsonb("signs_en").$type<string[]>().notNull().default([]),
    signsFr: jsonb("signs_fr").$type<string[]>().notNull().default([]),
    techniquesEn: jsonb("techniques_en").$type<string[]>().notNull().default([]),
    techniquesFr: jsonb("techniques_fr").$type<string[]>().notNull().default([]),
    protectEn: jsonb("protect_en").$type<string[]>().notNull().default([]),
    protectFr: jsonb("protect_fr").$type<string[]>().notNull().default([]),
    affectedEn: jsonb("affected_en").$type<string[]>().notNull().default([]),
    affectedFr: jsonb("affected_fr").$type<string[]>().notNull().default([]),
    icon: text("icon").notNull().default("shield-alert"),
    featured: boolean("featured").notNull().default(false),
    tileSize: text("tile_size").notNull().default("compact"),
    position: integer("position").notNull().default(0),
    isPublished: boolean("is_published").notNull().default(true),
    isDemo: boolean("is_demo").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("scam_categories_slug_en").on(t.slugEn),
    uniqueIndex("scam_categories_slug_fr").on(t.slugFr),
  ],
);

export const scamAlerts = pgTable(
  "scam_alerts",
  {
    id: serial("id").primaryKey(),
    slugEn: text("slug_en").notNull(),
    slugFr: text("slug_fr").notNull(),
    titleEn: text("title_en").notNull(),
    titleFr: text("title_fr").notNull(),
    summaryEn: text("summary_en").notNull(),
    summaryFr: text("summary_fr").notNull(),
    bodyEn: jsonb("body_en").$type<string[]>().notNull().default([]),
    bodyFr: jsonb("body_fr").$type<string[]>().notNull().default([]),
    actionsEn: jsonb("actions_en").$type<string[]>().notNull().default([]),
    actionsFr: jsonb("actions_fr").$type<string[]>().notNull().default([]),
    categoryId: integer("category_id").references(() => scamCategories.id, {
      onDelete: "set null",
    }),
    country: text("country").notNull().default("Global"),
    riskLevel: text("risk_level").notNull().default("medium"),
    imageUrl: text("image_url"),
    status: text("status").notNull().default("published"),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
    isDemo: boolean("is_demo").notNull().default(true),
  },
  (t) => [
    uniqueIndex("scam_alerts_slug_en").on(t.slugEn),
    uniqueIndex("scam_alerts_slug_fr").on(t.slugFr),
    index("scam_alerts_published_idx").on(t.publishedAt),
  ],
);

export const articles = pgTable(
  "articles",
  {
    id: serial("id").primaryKey(),
    slugEn: text("slug_en").notNull(),
    slugFr: text("slug_fr").notNull(),
    titleEn: text("title_en").notNull(),
    titleFr: text("title_fr").notNull(),
    excerptEn: text("excerpt_en").notNull(),
    excerptFr: text("excerpt_fr").notNull(),
    bodyEn: jsonb("body_en").$type<string[]>().notNull().default([]),
    bodyFr: jsonb("body_fr").$type<string[]>().notNull().default([]),
    kind: text("kind").notNull().default("news"),
    tag: text("tag").notNull().default("News"),
    authorName: text("author_name").notNull().default("GLOPROFAS"),
    imageUrl: text("image_url"),
    status: text("status").notNull().default("published"),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
    isDemo: boolean("is_demo").notNull().default(true),
  },
  (t) => [
    uniqueIndex("articles_slug_en").on(t.slugEn),
    uniqueIndex("articles_slug_fr").on(t.slugFr),
  ],
);

export const resources = pgTable(
  "resources",
  {
    id: serial("id").primaryKey(),
    slugEn: text("slug_en").notNull(),
    slugFr: text("slug_fr").notNull(),
    titleEn: text("title_en").notNull(),
    titleFr: text("title_fr").notNull(),
    descriptionEn: text("description_en").notNull(),
    descriptionFr: text("description_fr").notNull(),
    type: text("type").notNull().default("guide"),
    category: text("category").notNull().default("personal-security"),
    language: text("language").notNull().default("English"),
    fileSizeKb: integer("file_size_kb"),
    featured: boolean("featured").notNull().default(false),
    status: text("status").notNull().default("published"),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
    isDemo: boolean("is_demo").notNull().default(true),
  },
  (t) => [
    uniqueIndex("resources_slug_en").on(t.slugEn),
    uniqueIndex("resources_slug_fr").on(t.slugFr),
  ],
);

export const services = pgTable(
  "services",
  {
    id: serial("id").primaryKey(),
    slugEn: text("slug_en").notNull(),
    slugFr: text("slug_fr").notNull(),
    nameEn: text("name_en").notNull(),
    nameFr: text("name_fr").notNull(),
    descriptionEn: text("description_en").notNull(),
    descriptionFr: text("description_fr").notNull(),
    groupKey: text("group_key").notNull().default("individual"),
    pricingMode: text("pricing_mode").notNull().default("custom-quotation"),
    priceLabelEn: text("price_label_en"),
    priceLabelFr: text("price_label_fr"),
    bulletsEn: jsonb("bullets_en").$type<string[]>().notNull().default([]),
    bulletsFr: jsonb("bullets_fr").$type<string[]>().notNull().default([]),
    position: integer("position").notNull().default(0),
    isPublished: boolean("is_published").notNull().default(true),
    isDemo: boolean("is_demo").notNull().default(true),
  },
  (t) => [
    uniqueIndex("services_slug_en").on(t.slugEn),
    uniqueIndex("services_slug_fr").on(t.slugFr),
  ],
);

export const websiteSettings = pgTable("website_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").$type<Record<string, unknown>>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const scamReports = pgTable(
  "scam_reports",
  {
    id: serial("id").primaryKey(),
    reference: text("reference").notNull(),
    categorySlug: text("category_slug"),
    description: text("description").notNull(),
    incidentDate: text("incident_date").notNull(),
    channel: text("channel").notNull(),
    country: text("country").notNull(),
    city: text("city"),
    suspiciousUrl: text("suspicious_url"),
    phoneInvolved: text("phone_involved"),
    emailInvolved: text("email_involved"),
    moneyLost: boolean("money_lost").notNull().default(false),
    amount: text("amount"),
    currency: text("currency"),
    ongoing: boolean("ongoing").notNull().default(false),
    reporterName: text("reporter_name"),
    reporterEmail: text("reporter_email").notNull(),
    language: text("language").notNull().default("en"),
    consentAt: timestamp("consent_at", { withTimezone: true }).notNull().defaultNow(),
    policyVersion: text("policy_version").notNull().default("2026-11"),
    status: text("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("scam_reports_reference_unique").on(t.reference),
    index("scam_reports_status_idx").on(t.status),
  ],
);

export const scamReportNotes = pgTable(
  "scam_report_notes",
  {
    id: serial("id").primaryKey(),
    reportId: integer("report_id")
      .notNull()
      .references(() => scamReports.id, { onDelete: "cascade" }),
    author: text("author").notNull(),
    note: text("note").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("scam_report_notes_report_idx").on(t.reportId)],
);

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    country: text("country").notNull(),
    language: text("language").notNull().default("en"),
    status: text("status").notNull().default("pending"),
    consentAt: timestamp("consent_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("newsletter_email_unique").on(t.email)],
);

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  category: text("category").notNull().default("general"),
  message: text("message").notNull(),
  language: text("language").notNull().default("en"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const serviceEnquiries = pgTable("service_enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  organisation: text("organisation"),
  email: text("email").notNull(),
  phone: text("phone"),
  country: text("country").notNull(),
  serviceSlug: text("service_slug"),
  requirements: text("requirements").notNull(),
  contactMethod: text("contact_method").notNull().default("email"),
  language: text("language").notNull().default("en"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const volunteerApplications = pgTable("volunteer_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  country: text("country").notNull(),
  background: text("background").notNull(),
  skills: text("skills").notNull(),
  languages: text("languages").notNull(),
  motivation: text("motivation").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const partnershipApplications = pgTable("partnership_applications", {
  id: serial("id").primaryKey(),
  organisationName: text("organisation_name").notNull(),
  organisationType: text("organisation_type").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  country: text("country").notNull(),
  proposal: text("proposal").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const rateLimits = pgTable(
  "rate_limits",
  {
    key: text("key").notNull(),
    windowStart: timestamp("window_start", { withTimezone: true }).notNull(),
    count: integer("count").notNull().default(0),
  },
  (t) => [uniqueIndex("rate_limits_key_window").on(t.key, t.windowStart)],
);

export const jobs = pgTable(
  "jobs",
  {
    id: serial("id").primaryKey(),
    type: text("type").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default({}),
    status: text("status").notNull().default("queued"),
    attempts: integer("attempts").notNull().default(0),
    availableAt: timestamp("available_at", { withTimezone: true }).notNull().defaultNow(),
    lastError: text("last_error"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("jobs_status_idx").on(t.status, t.availableAt)],
);

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  actor: text("actor").notNull(),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: text("entity_id"),
  meta: jsonb("meta").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ScamCategory = typeof scamCategories.$inferSelect;
export type ScamAlert = typeof scamAlerts.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Resource = typeof resources.$inferSelect;
export type Service = typeof services.$inferSelect;
export type ScamReport = typeof scamReports.$inferSelect;
