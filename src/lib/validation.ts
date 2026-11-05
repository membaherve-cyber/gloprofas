import { z } from "zod";

const email = z.string().trim().min(5).max(180).email();
const shortText = z.string().trim().min(2).max(180);
const longText = z.string().trim().min(20).max(6000);

export const contactSchema = z.object({
  name: shortText,
  email,
  subject: z.string().trim().min(3).max(200),
  category: z.enum(["general", "partnership", "media", "services"]),
  message: z.string().trim().min(20).max(4000),
  language: z.enum(["en", "fr"]),
  website: z.string().max(0).optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const serviceEnquirySchema = z.object({
  name: shortText,
  organisation: z.string().trim().max(180).optional(),
  email,
  phone: z.string().trim().max(40).optional(),
  country: shortText,
  serviceSlug: z.string().trim().max(120).optional(),
  requirements: z.string().trim().min(20).max(4000),
  contactMethod: z.enum(["email", "phone"]),
  language: z.enum(["en", "fr"]),
  website: z.string().max(0).optional(),
});
export type ServiceEnquiryInput = z.infer<typeof serviceEnquirySchema>;

export const volunteerSchema = z.object({
  fullName: shortText,
  email,
  country: shortText,
  background: z.string().trim().min(5).max(2000),
  skills: z.string().trim().min(2).max(2000),
  languages: z.string().trim().min(2).max(400),
  motivation: z.string().trim().min(20).max(3000),
  website: z.string().max(0).optional(),
});
export type VolunteerInput = z.infer<typeof volunteerSchema>;

export const partnershipSchema = z.object({
  organisationName: shortText,
  organisationType: shortText,
  contactPerson: shortText,
  email,
  country: shortText,
  proposal: z.string().trim().min(20).max(4000),
  website: z.string().max(0).optional(),
});
export type PartnershipInput = z.infer<typeof partnershipSchema>;

export const newsletterSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email,
  country: shortText,
  language: z.enum(["en", "fr"]),
  consent: z.literal(true, { message: "Consent is required." }),
  website: z.string().max(0).optional(),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const reportStepOneSchema = z.object({
  categorySlug: z.string().trim().min(1).max(120),
  description: z.string().trim().min(30).max(5000),
  incidentDate: z
    .string()
    .trim()
    .min(4)
    .refine((value) => {
      const parsed = new Date(value);
      return !Number.isNaN(parsed.getTime()) && parsed.getTime() <= Date.now() + 86_400_000;
    }, "Invalid date"),
});

export const reportStepTwoSchema = z.object({
  channel: z.string().trim().min(1).max(80),
  country: z.string().trim().min(2).max(120),
  city: z.string().trim().max(120).optional(),
  suspiciousUrl: z.string().trim().max(500).optional(),
  phoneInvolved: z.string().trim().max(60).optional(),
  emailInvolved: z.string().trim().max(180).optional(),
  moneyLost: z.boolean(),
  amount: z.string().trim().max(40).optional(),
  currency: z.string().trim().max(10).optional(),
  ongoing: z.boolean(),
});

export const reportStepFourSchema = z.object({
  reporterName: z.string().trim().max(120).optional(),
  reporterEmail: email,
  language: z.enum(["en", "fr"]),
});

export const reportSubmitSchema = reportStepOneSchema
  .merge(reportStepTwoSchema)
  .merge(reportStepFourSchema)
  .extend({
    consent: z.literal(true, { message: "Consent is required." }),
  });
export type ReportSubmitInput = z.infer<typeof reportSubmitSchema>;

export const loginSchema = z.object({
  email,
  password: z.string().min(8).max(200),
});

export const reportStatuses = [
  "new",
  "under-review",
  "info-required",
  "reviewed",
  "closed",
] as const;
export type ReportStatus = (typeof reportStatuses)[number];

export function flattenErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!result[key]) result[key] = issue.message;
  }
  return result;
}
