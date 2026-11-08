import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZiteAlertsView } from "@/components/zite/alerts-view";
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
    path: "/alerts",
    title: locale === "fr" ? "Alertes aux arnaques" : "Scam alerts",
    description: SITE_DESCRIPTION[locale],
    ogType: "article",
  });
}

export default async function AlertsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  return <ZiteAlertsView locale={locale} />;
}
