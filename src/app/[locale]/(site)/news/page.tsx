import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZITE_CONTENT } from "@/lib/zite-data";
import { PageHero, Reveal } from "@/components/zite/shared";
import { formatZiteDate, L, R } from "@/components/zite/copy";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";
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
    path: "/news",
    title: locale === "fr"
        ? "Actualités et publications"
        : "News and publications",
    description: SITE_DESCRIPTION[locale],
    ogType: "article",
  });
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
              <img width={1600} height={900}
                src={featured.imageUrl}
                alt=""
                className="aspect-[4/3] w-full rounded-none object-cover shadow-none"
              />
              <div>
                <p className="ed-label text-brand-600">
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

          <div className="mt-14 ed-list">
            {rest.map((art, idx) => (
              <Reveal key={art.id} delay={idx * 50}>
                <Link href={l(`/news/${art.id}`)} className="ed-item group">
                  <div className="grid gap-5 sm:grid-cols-12 sm:items-start">
                    <div className="sm:col-span-3">
                      <div className="ed-media ed-media-hover aspect-[3/2]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img width={1500} height={1000} src={art.imageUrl} alt="" loading="lazy" />
                      </div>
                    </div>
                    <div className="sm:col-span-9">
                      <span className="border-l-2 border-brand-600 pl-2 text-micro font-bold uppercase tracking-[0.16em] text-brand-600">
                        {R(art.tag, locale)}
                      </span>
                      <h2 className="h3 mt-2 max-w-[36ch] text-ink">
                        <span className="ed-link">{R(art.title, locale)}</span>
                      </h2>
                      <p className="mt-2 max-w-[64ch] text-sm text-slatex-600">
                        {art.author} · {formatZiteDate(art.date, locale)}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 border-t border-line pt-6">
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
