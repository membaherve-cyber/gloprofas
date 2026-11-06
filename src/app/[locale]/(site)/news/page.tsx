import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZITE_CONTENT } from "@/lib/zite-data";
import {
  PageHero,
  Reveal,
} from "@/components/zite/shared";
import { L } from "@/lib/zite-copy";

import { formatZiteDate, R } from "@/lib/zite-copy";

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
        ? "Actualités et publications"
        : "News and publications",
    alternates: {
      canonical: `/${locale}/news`,
      languages: { en: "/en/news", fr: "/fr/news" },
    },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;
  const [featured, ...rest] = ZITE_CONTENT.articles;

  return (
    <>
      <PageHero
        title={fr ? "Actualités et publications" : "News and publications"}
        eyebrow={R(L.nav.news, locale)}
        lead={
          fr
            ? "Conseils, analyses et annonces de GLOPROFAS."
            : "Guidance, analysis and announcements from GLOPROFAS."
        }
        image={PAGE_AERIAL_HEROES.newsIndex.image}
        cityBadge={formatAerialBadge(PAGE_AERIAL_HEROES.newsIndex.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: R(L.nav.news, locale) },
        ]}
      />

      <section className="section-y bg-white">
        <div className="container-g">
          {featured ? (
            <Link
              href={l(`/news/${featured.id}`)}
              className="group grid items-center gap-10 lg:grid-cols-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.imageUrl}
                alt=""
                className="aspect-[4/3] w-full rounded-[22px] object-cover shadow-e2"
              />
              <div>
                <p className="eyebrow text-brand-600">
                  {R(featured.tag, locale)}
                </p>
                <h2 className="h2 mt-3 text-ink group-hover:text-brand-600">
                  {R(featured.title, locale)}
                </h2>
                <p className="lead mt-4 text-slatex-600">
                  {R(featured.summary, locale)}
                </p>
                <p className="mt-5 text-sm text-slatex-600">
                  {featured.author} · {formatZiteDate(featured.date, locale)}
                </p>
              </div>
            </Link>
          ) : null}

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((art, idx) => (
              <Reveal key={art.id} delay={idx * 60}>
                <Link href={l(`/news/${art.id}`)} className="group block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={art.imageUrl}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-[22px] object-cover"
                  />
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-brand-600">
                    {R(art.tag, locale)}
                  </p>
                  <h3 className="h4 mt-2 line-clamp-2 text-ink group-hover:text-brand-600">
                    {R(art.title, locale)}
                  </h3>
                  <p className="mt-3 text-sm text-slatex-600">
                    {art.author} · {formatZiteDate(art.date, locale)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 rounded-[22px] bg-mist p-8">
            <Link
              href={l("/alerts")}
              className="font-[family-name:var(--font-heading)] text-xl font-semibold text-ink hover:text-brand-600"
            >
              {fr
                ? "Voir toutes les alertes aux arnaques →"
                : "See all scam alerts →"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
