import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZITE_CONTENT } from "@/lib/zite-data";
import { PageHero, Reveal } from "@/components/zite/shared";
import { getCategoryIcon, L, R } from "@/components/zite/copy";
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

      <section className="section-y bg-white">
        <div className="container-g">
          <div className="ed-list">
            {categories.map((cat, idx) => {
              const Icon = getCategoryIcon(cat.icon);
              return (
                <Reveal key={cat.id} delay={Math.min(idx, 5) * 40}>
                  <Link href={l(`/scams/${cat.slug}`)} className="ed-item group">
                    <div className="grid gap-5 sm:grid-cols-12 sm:items-start">
                      <div className="sm:col-span-3">
                        <div className="ed-media ed-media-hover aspect-[3/2]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img width={1500} height={1000} src={cat.imageUrl} alt="" loading="lazy" />
                        </div>
                      </div>
                      <div className="sm:col-span-9">
                        <div className="flex items-center gap-3">
                          <span className="ed-num text-xs">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <Icon
                            aria-hidden="true"
                            className="h-4 w-4 text-brand-600"
                            strokeWidth={1.5}
                          />
                        </div>
                        <h2 className="h3 mt-2 max-w-[34ch] text-ink">
                          <span className="ed-link">{R(cat.title, locale)}</span>
                        </h2>
                        <p className="mt-2.5 max-w-[68ch] text-body leading-relaxed text-slatex-600">
                          {R(cat.summary, locale)}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-2 text-small font-semibold text-brand-600">
                          {fr ? "Lire le guide" : "Read the guide"}
                          <ArrowRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                            strokeWidth={1.5}
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
