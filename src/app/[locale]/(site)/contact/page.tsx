import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZiteContactView } from "@/components/zite/contact-view";
import { buildMetadata, SITE_DESCRIPTION } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({
    locale,
    path: "/contact",
    title: locale === "fr" ? "Contacter GLOPROFAS" : "Contact GLOPROFAS",
    description: SITE_DESCRIPTION[locale],
  });
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
