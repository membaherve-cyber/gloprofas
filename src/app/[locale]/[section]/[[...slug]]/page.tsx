import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { SectionView } from "@/components/section-view";
import { matchSection } from "@/lib/paths";
import { isLocale } from "@/lib/utils";
import { getSettings } from "@/server/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; section: string; slug?: string[] }> }): Promise<Metadata> {
  const { locale, section, slug = [] } = await params;
  if (!isLocale(locale) || !matchSection(locale, section)) return {};
  const title = slug[0]?.replaceAll("-", " ") || section;
  return { title, alternates: { canonical: `/${locale}/${section}${slug.length ? `/${slug.join("/")}` : ""}` } };
}

export default async function SectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; section: string; slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, section, slug = [] } = await params;
  if (!isLocale(locale)) notFound();
  const key = matchSection(locale, section);
  if (!key) notFound();
  const sp = await searchParams;
  const query = Object.fromEntries(Object.entries(sp).map(([name, value]) => [name, Array.isArray(value) ? value[0] : value]));
  const jar = await cookies();
  const settings = await getSettings();
  return (
    <SectionView
      locale={locale}
      section={key}
      slug={slug}
      query={query}
      settings={settings}
      draftToken={jar.get("glp_draft")?.value}
      confirmRef={jar.get("glp_confirm")?.value}
      moneyLost={jar.get("glp_money")?.value === "1"}
    />
  );
}
