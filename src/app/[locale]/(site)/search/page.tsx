import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { getDictionary, isLocale, pick, routes, type Locale } from "@/lib/i18n";
import { searchContent } from "@/lib/queries";
import { EmptyState } from "@/components/ui";
import { PageHero } from "@/components/zite/shared";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.search.h1,
    description: dict.search.lead,
    alternates: { canonical: `/${locale}/search`, languages: { en: "/en/search", fr: "/fr/search" } },
    robots: { index: false, follow: true },
  };
}

function hrefFor(locale: Locale, result: { type: string; slugEn: string; slugFr: string }): string {
  const slug = locale === "fr" ? result.slugFr : result.slugEn;
  if (result.type === "category") return routes.scam(locale, slug);
  if (result.type === "alert") return routes.alert(locale, slug);
  if (result.type === "article") return routes.article(locale, slug);
  return routes.resources(locale);
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const { locale: raw } = await params;
  const { q, type } = await searchParams;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const term = (q ?? "").trim();
  const results = term ? await searchContent(term, type ?? "all") : [];
  const hero = PAGE_AERIAL_HEROES.search;
  const filters = [
    { value: "all", label: dict.search.allTypes },
    { value: "category", label: dict.search.types.category },
    { value: "alert", label: dict.search.types.alert },
    { value: "resource", label: dict.search.types.resource },
    { value: "article", label: dict.search.types.article },
  ];

  return (
    <>
      <PageHero
        title={dict.search.h1}
        eyebrow={dict.search.h1}
        lead={dict.search.lead}
        image={hero.image}
        cityBadge={formatAerialBadge(hero.city, locale)}
        crumbs={[
          { label: locale === "fr" ? "Accueil" : "Home", to: routes.home(locale) },
          { label: dict.search.h1 },
        ]}
      />

      <section className="section bg-mist-50">
        <div className="container-page max-w-3xl">
          <form action={routes.search(locale)} role="search" className="mb-6 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="q" className="sr-only">
              {dict.search.h1}
            </label>
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={term}
              placeholder={dict.search.placeholder}
              className="field bg-white"
            />
            <button type="submit" className="btn btn-signal shrink-0">
              <Search size={17} aria-hidden="true" /> {dict.nav.search}
            </button>
          </form>

          <div className="flex flex-wrap gap-2" role="navigation" aria-label={dict.common.filters}>
            {filters.map((filter) => (
              <Link
                key={filter.value}
                href={`${routes.search(locale)}?q=${encodeURIComponent(term)}${filter.value === "all" ? "" : `&type=${filter.value}`}`}
                className={`chip ${(type ?? "all") === filter.value ? "border-blue-600 bg-blue-600 text-white" : ""}`}
              >
                {filter.label}
              </Link>
            ))}
          </div>

          <p className="mt-5 text-[0.85rem] font-medium text-slate-600">
            {term
              ? `${results.length} ${dict.common.results} — “${term}”`
              : locale === "fr"
                ? "Saisissez un mot-clé pour rechercher."
                : "Enter a keyword to search."}
          </p>

          {term && results.length === 0 ? (
            <div className="mt-4">
              <EmptyState message={dict.common.noResults} />
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {results.map((result) => (
                <li key={`${result.type}-${result.slugEn}`}>
                  <Link href={hrefFor(locale, result)} className="card card-hover flex flex-col gap-2 p-5">
                    <span className="chip w-fit border-blue-600/25 text-blue-600">
                      {locale === "fr" ? result.metaFr : result.metaEn}
                    </span>
                    <h2 className="text-[1.05rem] font-semibold text-ink-900">
                      {pick(locale, result.titleEn, result.titleFr)}
                    </h2>
                    <p className="text-[0.88rem] leading-relaxed text-slate-600">{pick(locale, result.excerptEn, result.excerptFr)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
