import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeView } from "@/components/home-view";
import { m } from "@/lib/i18n";
import { isLocale } from "@/lib/utils";
import { homepageData } from "@/server/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = m(locale);
  return {
    title: t.h1,
    description: t.lead,
    alternates: { canonical: `/${locale}`, languages: { en: "/en", fr: "/fr" } },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const data = await homepageData();
  return <HomeView locale={locale} categories={data.categories} alerts={data.alerts} articles={data.articles} resources={data.resources} />;
}
