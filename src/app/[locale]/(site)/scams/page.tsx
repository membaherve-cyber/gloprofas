import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZITE_CONTENT } from "@/lib/zite-data";
import {
  getCategoryIcon,
  IconTile,
  L,
  PageHero,
  R,
  Reveal,
} from "@/components/zite/shared";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";

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
        ? "Centre de sensibilisation aux arnaques"
        : "Scam Awareness Centre",
    description: R(L.scams.lead, locale),
    alternates: {
      canonical: `/${locale}/scams`,
      languages: { en: "/en/scams", fr: "/fr/scams" },
    },
  };
}

export default async function ScamsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;
  const categories = ZITE_CONTENT.categories;

  return (
    <>
      <PageHero
        title={
          fr ? "Centre de sensibilisation aux arnaques" : "Scam Awareness Centre"
        }
        lead={R(L.scams.lead, locale)}
        eyebrow={R(L.nav.awareness, locale)}
        image={PAGE_AERIAL_HEROES.scamsIndex.image}
        cityBadge={formatAerialBadge(PAGE_AERIAL_HEROES.scamsIndex.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: R(L.nav.awareness, locale) },
        ]}
      />

      <section className="section-y bg-mist">
        <div className="container-g grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => {
            const Icon = getCategoryIcon(cat.icon);
            return (
              <Reveal key={cat.id} delay={(idx % 3) * 60}>
                <Link
                  href={l(`/scams/${cat.slug}`)}
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-e1 transition-all duration-150 hover:-translate-y-1 hover:shadow-e2"
                >
                  {cat.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cat.imageUrl}
                      alt=""
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover"
                    />
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <IconTile>
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </IconTile>
                    <h2 className="h4 mt-5 text-ink">{R(cat.title, locale)}</h2>
                    <p className="mt-2 flex-1 text-slatex-600">
                      {R(cat.summary, locale)}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                      {fr ? "Lire le guide" : "Read the guide"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
