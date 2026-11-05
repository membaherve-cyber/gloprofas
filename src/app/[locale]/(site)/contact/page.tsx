import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZiteContactView } from "@/components/zite/contact-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "fr" ? "Contacter GLOPROFAS" : "Contact GLOPROFAS",
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: "/en/contact", fr: "/fr/contact" },
    },
  };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ topic?: string }>;
}) {
  const { locale: raw } = await params;
  const { topic } = await searchParams;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  return <ZiteContactView locale={locale} initialTopic={topic} />;
}
