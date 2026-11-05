"use server";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { db, hasDatabase } from "@/db";
import {
  contactMessages,
  newsletterSubscribers,
  partnershipApplications,
  serviceEnquiries,
  volunteerApplications,
} from "@/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { queueMail, confirmUrl, unsubscribeUrl } from "@/server/mail";
import {
  contactSchema,
  newsletterSchema,
  partnershipSchema,
  serviceEnquirySchema,
  volunteerSchema,
  flattenErrors,
} from "@/lib/validation";
import type { FormState } from "@/lib/form-state";
import type { Locale } from "@/lib/i18n";

async function requestIp(): Promise<string> {
  const store = await headers();
  const forwarded = store.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || store.get("x-real-ip") || "local";
}

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

const MESSAGES = {
  en: {
    contact: "Thank you. Your message has been received and our team will reply by email.",
    enquiry: "Thank you. Your enquiry has been received and our team will reply with next steps.",
    volunteer: "Thank you. Your volunteer application has been received.",
    partnership: "Thank you. Your partnership enquiry has been received.",
    newsletter: "Thank you. Check your inbox to confirm your subscription.",
    duplicate: "This email address is already subscribed or awaiting confirmation.",
    rate: "Too many submissions from this connection. Please try again later.",
    error: "The form could not be submitted. Please check the fields and try again.",
  },
  fr: {
    contact: "Merci. Votre message a bien été reçu et notre équipe répondra par courriel.",
    enquiry: "Merci. Votre demande a bien été reçue et notre équipe reviendra vers vous.",
    volunteer: "Merci. Votre candidature bénévole a bien été reçue.",
    partnership: "Merci. Votre demande de partenariat a bien été reçue.",
    newsletter: "Merci. Consultez votre boîte de réception pour confirmer votre abonnement.",
    duplicate: "Cette adresse est déjà inscrite ou en attente de confirmation.",
    rate: "Trop d’envois depuis cette connexion. Veuillez réessayer plus tard.",
    error: "Le formulaire n’a pas pu être envoyé. Vérifiez les champs et réessayez.",
  },
} as const;

export async function subscribeNewsletter(
  locale: Locale,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const t = MESSAGES[locale];
  if (field(formData, "website")) return { status: "success", message: t.newsletter };

  const parsed = newsletterSchema.safeParse({
    name: field(formData, "name"),
    email: field(formData, "email"),
    country: field(formData, "country"),
    language: field(formData, "language") || locale,
    consent: formData.get("consent") === "on" ? true : undefined,
    website: "",
  });
  if (!parsed.success) {
    return { status: "error", message: t.error, errors: flattenErrors(parsed.error) };
  }

  const limit = await rateLimit(`newsletter:${await requestIp()}`, 6, 3600);
  if (!limit.allowed) return { status: "error", message: t.rate };
  if (!hasDatabase) return { status: "success", message: t.newsletter };

  try {
    const existing = await db
      .select({ id: newsletterSubscribers.id })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, parsed.data.email.toLowerCase()))
      .limit(1);
    if (existing.length > 0) return { status: "error", message: t.duplicate };

    await db.insert(newsletterSubscribers).values({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      country: parsed.data.country,
      language: parsed.data.language,
      status: "pending",
    });
    await queueMail({
      to: parsed.data.email,
      kind: "newsletter-confirmation",
      subject: locale === "fr" ? "Confirmez votre abonnement GLOPROFAS" : "Confirm your GLOPROFAS subscription",
      text:
        locale === "fr"
          ? `Merci de confirmer votre abonnement en ouvrant ce lien : ${confirmUrl(parsed.data.email)}\n\nPour vous désabonner à tout moment : ${unsubscribeUrl(parsed.data.email)}`
          : `Please confirm your subscription by opening this link: ${confirmUrl(parsed.data.email)}\n\nTo unsubscribe at any time: ${unsubscribeUrl(parsed.data.email)}`,
    });
    return { status: "success", message: t.newsletter };
  } catch {
    return { status: "error", message: t.error };
  }
}

export async function sendContactMessage(
  locale: Locale,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const t = MESSAGES[locale];
  if (field(formData, "website")) return { status: "success", message: t.contact };

  const parsed = contactSchema.safeParse({
    name: field(formData, "name"),
    email: field(formData, "email"),
    subject: field(formData, "subject"),
    category: field(formData, "category") || "general",
    message: field(formData, "message"),
    language: field(formData, "language") || locale,
    website: "",
  });
  if (!parsed.success) {
    return { status: "error", message: t.error, errors: flattenErrors(parsed.error) };
  }

  const limit = await rateLimit(`contact:${await requestIp()}`, 5, 3600);
  if (!limit.allowed) return { status: "error", message: t.rate };
  if (!hasDatabase) return { status: "success", message: t.contact };

  try {
    await db.insert(contactMessages).values({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      subject: parsed.data.subject,
      category: parsed.data.category,
      message: parsed.data.message,
      language: parsed.data.language,
    });
    await queueMail({
      to: parsed.data.email,
      kind: "contact-acknowledgement",
      subject: locale === "fr" ? "Nous avons reçu votre message" : "We have received your message",
      text:
        locale === "fr"
          ? `Bonjour ${parsed.data.name},\n\nNous avons reçu votre message et notre équipe vous répondra par courriel.\n\nNe transmettez jamais de mots de passe, codes ou documents d’identité par courriel.`
          : `Hello ${parsed.data.name},\n\nWe have received your message and our team will reply by email.\n\nNever send passwords, codes or identity documents by email.`,
    });
    return { status: "success", message: t.contact };
  } catch {
    return { status: "error", message: t.error };
  }
}

export async function submitServiceEnquiry(
  locale: Locale,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const t = MESSAGES[locale];
  if (field(formData, "website")) return { status: "success", message: t.enquiry };

  const parsed = serviceEnquirySchema.safeParse({
    name: field(formData, "name"),
    organisation: field(formData, "organisation") || undefined,
    email: field(formData, "email"),
    phone: field(formData, "phone") || undefined,
    country: field(formData, "country"),
    serviceSlug: field(formData, "serviceSlug") || undefined,
    requirements: field(formData, "requirements"),
    contactMethod: field(formData, "contactMethod") || "email",
    language: field(formData, "language") || locale,
    website: "",
  });
  if (!parsed.success) {
    return { status: "error", message: t.error, errors: flattenErrors(parsed.error) };
  }

  const limit = await rateLimit(`enquiry:${await requestIp()}`, 5, 3600);
  if (!limit.allowed) return { status: "error", message: t.rate };
  if (!hasDatabase) return { status: "success", message: t.enquiry };

  try {
    await db.insert(serviceEnquiries).values({
      name: parsed.data.name,
      organisation: parsed.data.organisation ?? null,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone ?? null,
      country: parsed.data.country,
      serviceSlug: parsed.data.serviceSlug ?? null,
      requirements: parsed.data.requirements,
      contactMethod: parsed.data.contactMethod,
      language: parsed.data.language,
    });
    await queueMail({
      to: parsed.data.email,
      kind: "service-enquiry-acknowledgement",
      subject: locale === "fr" ? "Votre demande de service GLOPROFAS" : "Your GLOPROFAS service enquiry",
      text:
        locale === "fr"
          ? `Bonjour ${parsed.data.name},\n\nNous avons reçu votre demande. Notre équipe reviendra vers vous avec le périmètre et les prochaines étapes. Aucun paiement n’est effectué sur le site.`
          : `Hello ${parsed.data.name},\n\nWe have received your enquiry. Our team will reply with scope and next steps. No payment is taken on the website.`,
    });
    return { status: "success", message: t.enquiry };
  } catch {
    return { status: "error", message: t.error };
  }
}

export async function submitVolunteerApplication(
  locale: Locale,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const t = MESSAGES[locale];
  if (field(formData, "website")) return { status: "success", message: t.volunteer };

  const parsed = volunteerSchema.safeParse({
    fullName: field(formData, "fullName"),
    email: field(formData, "email"),
    country: field(formData, "country"),
    background: field(formData, "background"),
    skills: field(formData, "skills"),
    languages: field(formData, "languages"),
    motivation: field(formData, "motivation"),
    website: "",
  });
  if (!parsed.success) {
    return { status: "error", message: t.error, errors: flattenErrors(parsed.error) };
  }

  const limit = await rateLimit(`volunteer:${await requestIp()}`, 4, 3600);
  if (!limit.allowed) return { status: "error", message: t.rate };
  if (!hasDatabase) return { status: "success", message: t.volunteer };

  try {
    await db.insert(volunteerApplications).values({
      fullName: parsed.data.fullName,
      email: parsed.data.email.toLowerCase(),
      country: parsed.data.country,
      background: parsed.data.background,
      skills: parsed.data.skills,
      languages: parsed.data.languages,
      motivation: parsed.data.motivation,
    });
    return { status: "success", message: t.volunteer };
  } catch {
    return { status: "error", message: t.error };
  }
}

export async function submitPartnership(
  locale: Locale,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const t = MESSAGES[locale];
  if (field(formData, "website")) return { status: "success", message: t.partnership };

  const parsed = partnershipSchema.safeParse({
    organisationName: field(formData, "organisationName"),
    organisationType: field(formData, "organisationType"),
    contactPerson: field(formData, "contactPerson"),
    email: field(formData, "email"),
    country: field(formData, "country"),
    proposal: field(formData, "proposal"),
    website: "",
  });
  if (!parsed.success) {
    return { status: "error", message: t.error, errors: flattenErrors(parsed.error) };
  }

  const limit = await rateLimit(`partnership:${await requestIp()}`, 4, 3600);
  if (!limit.allowed) return { status: "error", message: t.rate };
  if (!hasDatabase) return { status: "success", message: t.partnership };

  try {
    await db.insert(partnershipApplications).values({
      organisationName: parsed.data.organisationName,
      organisationType: parsed.data.organisationType,
      contactPerson: parsed.data.contactPerson,
      email: parsed.data.email.toLowerCase(),
      country: parsed.data.country,
      proposal: parsed.data.proposal,
    });
    return { status: "success", message: t.partnership };
  } catch {
    return { status: "error", message: t.error };
  }
}
