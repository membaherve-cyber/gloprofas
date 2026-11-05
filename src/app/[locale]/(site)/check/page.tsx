import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZiteCheckView } from "@/components/zite/check-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title:
      locale === "fr"
        ? "Vérifier un numéro, un lien ou un message"
        : "Check a number, link or message",
    alternates: {
      canonical: `/${locale}/check`,
      languages: { en: "/en/check", fr: "/fr/check" },
    },
  };
}

export default async function CheckPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  return <ZiteCheckView locale={locale} />;
}
