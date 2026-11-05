import { z } from "zod";

export const localeSchema = z.enum(["en", "fr"]);

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  subject: z.string().trim().min(3).max(160),
  category: z.enum(["general", "partnership", "media", "professional", "volunteer"]),
  message: z.string().trim().min(10).max(5000),
  language: localeSchema,
});

export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  organisation: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().max(40).optional().default(""),
  country: z.string().trim().max(80).optional().default(""),
  serviceId: z.string().trim().max(80).optional().default(""),
  serviceLabel: z.string().trim().max(180).optional().default(""),
  requirements: z.string().trim().min(10).max(5000),
  contactMethod: z.string().trim().max(40).optional().default("email"),
  language: localeSchema,
});

export const volunteerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  country: z.string().trim().max(80).optional().default(""),
  background: z.string().trim().max(1000).optional().default(""),
  skills: z.string().trim().max(1000).optional().default(""),
  languages: z.string().trim().max(200).optional().default(""),
  interests: z.string().trim().max(500).optional().default(""),
  motivation: z.string().trim().min(10).max(4000),
});

export const partnershipSchema = z.object({
  organisation: z.string().trim().min(2).max(180),
  orgType: z.string().trim().max(80).optional().default(""),
  contactName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  country: z.string().trim().max(80).optional().default(""),
  proposal: z.string().trim().min(10).max(5000),
});

export const newsletterSchema = z.object({
  name: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email().max(180),
  country: z.string().trim().max(80).optional().default(""),
  language: localeSchema,
  consent: z.literal("yes"),
});

export const reportStep1 = z.object({
  categoryId: z.string().max(80).optional().default(""),
  unsure: z.boolean().optional().default(false),
  description: z.string().trim().min(20).max(8000),
  incidentDate: z.string().max(20).optional().default(""),
});

export const reportStep2 = z.object({
  channel: z.string().max(40).optional().default(""),
  country: z.string().max(80).optional().default(""),
  city: z.string().max(80).optional().default(""),
  url: z.string().max(500).optional().default(""),
  phone: z.string().max(40).optional().default(""),
  emailInvolved: z.string().max(180).optional().default(""),
  moneyLost: z.boolean(),
  amount: z.string().max(40).optional().default(""),
  currency: z.string().max(12).optional().default(""),
  ongoing: z.boolean(),
});

export const reportStep4 = z.object({
  name: z.string().max(120).optional().default(""),
  email: z.string().trim().email().max(180),
  language: localeSchema,
});

export const assistantSchema = z.object({
  message: z.string().trim().min(2).max(2000),
  locale: localeSchema,
  history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) })).max(8).optional().default([]),
});
