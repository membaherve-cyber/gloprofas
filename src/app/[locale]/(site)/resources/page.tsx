import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZiteResourcesView } from "@/components/zite/resources-view";
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
    path: "/resources",
    title: locale === "fr" ? "Centre de ressources" : "Resource centre",
    description: SITE_DESCRIPTION[locale],
  });
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  return <ZiteResourcesView locale={locale} />;
}
