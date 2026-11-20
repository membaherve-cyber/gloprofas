"use client";

/**
 * Knowledge & Tools — searchable knowledge library (GLOPROFAS resources +
 * curated external guides from official institutions) and the printable
 * checklist library (bilingual PDFs, free access without registration).
 */

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  FileDown,
  Globe,
  ListChecks,
  Search,
  ShieldCheck,
} from "lucide-react";
import { A, useRouter } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R } from "@/lib/content/copy";
import { EXTERNAL_RESOURCES } from "@/lib/content/resource-centre";
import { PageHero, Reveal, SectionHeading } from "@/components/shared/ui";
import {
  ChecklistCard,
  LoadError,
  categoryLabel,
  checklistCategoryLabel,
  useApiData,
  type ArticleSummaryDTO,
  type ChecklistDTO,
} from "./resources-parts";

export function KnowledgeToolsView() {
  const { locale, formatDate } = useI18n();
  const fr = locale === "fr";
  const router = useRouter();
  const [tab, setTab] = useState<"library" | "checklists">(() =>
    typeof window !== "undefined" && window.location.hash.includes("tab=checklists") ? "checklists" : "library"
  );
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState("all");

  const { data: articlesData, loading: articlesLoading, error: articlesError, retry } = useApiData<{ articles: ArticleSummaryDTO[] }>(
    "/api/resources/articles"
  );
  const { data: checklistsData } = useApiData<{ checklists: ChecklistDTO[] }>("/api/resources/checklists");

  useEffect(() => {
    const t = setTimeout(() => setQuery(q.trim().toLowerCase()), 280);
    return () => clearTimeout(t);
  }, [q]);

  const internalResults = useMemo(() => {
    if (query.length < 2 || !articlesData) return [];
    return articlesData.articles.filter((a) =>
      `${a.title.en} ${a.title.fr} ${a.summary.en} ${a.summary.fr}`.toLowerCase().includes(query)
    );
  }, [articlesData, query]);

  const externalResults = useMemo(() => {
    const base = query.length < 2 ? EXTERNAL_RESOURCES : EXTERNAL_RESOURCES.filter((r) =>
      `${r.title.en} ${r.title.fr} ${r.org} ${r.topics.join(" ")} ${r.region}`.toLowerCase().includes(query)
    );
    return format === "all" ? base : base.filter((r) => r.format.toLowerCase().includes(format));
  }, [query, format]);

  const FORMATS = useMemo(() => ["all", ...new Set(EXTERNAL_RESOURCES.map((r) => r.format))], []);

  return (
    <>
      <PageHero
        eyebrow={fr ? "Savoir et outils" : "Knowledge & Tools"}
        title={fr ? "Une bibliothèque de recherche, des outils et des listes à imprimer." : "A searchable library, tools and printable checklists."}
        lead={
          fr
            ? "Cherchez parmi les ressources GLOPROFAS et les guides officiels d’institutions reconnues — FTC, FBI IC3, INTERPOL, CISA, NCSC, Scamwatch et autorités africaines. Tout est gratuit et sans inscription."
            : "Search GLOPROFAS resources and official guides from recognised institutions — FTC, FBI IC3, INTERPOL, CISA, NCSC, Scamwatch and African authorities. Everything is free and registration-free."
        }
        image="/images/gen/knowledge-tools.jpg"
        imageAlt={fr ? "Listes de vérification imprimées avec stylo et lunettes sur un bureau" : "Printed checklists with pen and glasses on a desk"}
        breadcrumb={[{ label: fr ? "Centre de ressources" : "Resource Centre", href: "/resources" }, { label: fr ? "Savoir et outils" : "Knowledge & Tools" }]}
      >
        <div className="flex flex-wrap gap-2.5" role="tablist" aria-label={fr ? "Sections" : "Sections"}>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "library"}
            onClick={() => setTab("library")}
            className={`h-11 rounded-xl px-5 font-heading text-[13.5px] font-semibold transition-colors ${
              tab === "library" ? "bg-white text-navy-950" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <BookOpen size={15} className="mr-2 inline" aria-hidden />
            {fr ? "Bibliothèque de recherche" : "Searchable library"}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "checklists"}
            onClick={() => setTab("checklists")}
            className={`h-11 rounded-xl px-5 font-heading text-[13.5px] font-semibold transition-colors ${
              tab === "checklists" ? "bg-white text-navy-950" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <ListChecks size={15} className="mr-2 inline" aria-hidden />
            {fr ? "Listes imprimables" : "Printable checklists"}
          </button>
        </div>
      </PageHero>

      {tab === "library" ? (
        <section className="section-y bg-white">
          <div className="container-g">
            <Reveal>
              <form role="search" onSubmit={(e) => e.preventDefault()} className="relative max-w-xl">
                <label htmlFor="kt-search" className="sr-only">
                  {fr ? "Rechercher une ressource" : "Search a resource"}
                </label>
                <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slatex-400" aria-hidden />
                <input
                  id="kt-search"
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  maxLength={90}
                  placeholder={fr ? "Rechercher : mobile money, identité, phishing…" : "Search: mobile money, identity, phishing…"}
                  className="field-g !h-12 !pl-11"
                />
              </form>
            </Reveal>

            {query.length >= 2 && internalResults.length > 0 ? (
              <Reveal className="mt-8">
                <h2 className="eyebrow mb-4">
                  {fr ? "Guides GLOPROFAS correspondants" : "Matching GLOPROFAS guides"} ({internalResults.length})
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {internalResults.slice(0, 6).map((a) => (
                    <li key={a.slug}>
                      <A href={`/resources/practical-tools/${a.slug}`} className="group block">
                        <span className="card-g hoverable flex h-full flex-col p-5">
                          <span className="chip-g w-fit bg-brand-50 text-brand-600">{categoryLabel(a.categorySlug, locale)}</span>
                          <span className="mt-3 font-heading text-[14.5px] font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
                            {R(a.title, locale)}
                          </span>
                          <span className="mt-1.5 line-clamp-2 text-[13px] text-slatex-600">{R(a.summary, locale)}</span>
                          <span className="mt-auto pt-3 text-[12px] text-slatex-400">
                            {formatDate(a.publishedAt)} · {a.readingMinutes} min
                          </span>
                        </span>
                      </A>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            <Reveal className="mt-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeading
                  eyebrow={fr ? "Ressources externes officielles" : "Official external resources"}
                  title={fr ? "Guides d’autorités reconnues." : "Guides from recognised authorities."}
                  lead={
                    fr
                      ? "Liens vérifiés vers des conseils officiels. Les liens externes s’ouvrent dans un nouvel onglet et sont clairement identifiés."
                      : "Verified links to official advice. External links open in a new tab and are clearly identified."
                  }
                />
              </div>
            </Reveal>

            <Reveal className="mt-5">
              <div className="flex flex-wrap gap-2" role="group" aria-label={fr ? "Filtrer par format" : "Filter by format"}>
                {FORMATS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormat(f)}
                    aria-pressed={format === f}
                    className={`h-9 rounded-full border px-3.5 text-[12.5px] font-semibold transition-colors ${
                      format === f
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-line-200 text-slatex-600 hover:border-brand-500/60 hover:text-brand-600"
                    }`}
                  >
                    {f === "all" ? (fr ? "Tous" : "All") : f}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {externalResults.map((r, i) => (
                <Reveal key={r.url} delay={Math.min(i, 8) * 40}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col card-g hoverable p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="chip-g bg-mist-50 text-slatex-600">{r.format}</span>
                      <ExternalLink size={14} className="text-slatex-300 group-hover:text-brand-600" aria-hidden />
                    </div>
                    <h3 className="mt-3 font-heading text-[14.5px] font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
                      {R(r.title, locale)}
                    </h3>
                    <p className="mt-1 text-[12.5px] font-semibold text-brand-600/90">{r.org}</p>
                    <p className="mt-auto flex items-center gap-1.5 pt-3 text-[12px] text-slatex-400">
                      <Globe size={12} aria-hidden />
                      {r.region}
                    </p>
                  </a>
                </Reveal>
              ))}
            </div>

            {externalResults.length === 0 ? (
              <p className="mt-6 text-[14px] text-slatex-600">
                {fr ? "Aucune ressource externe pour cette recherche." : "No external resource for this search."}
              </p>
            ) : null}

            {articlesLoading && query.length >= 2 ? (
              <p className="mt-6 text-[13px] text-slatex-400">{fr ? "Recherche en cours…" : "Searching…"}</p>
            ) : null}
            {articlesError ? (
              <div className="mt-6"><LoadError onRetry={retry} /></div>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="section-y bg-white">
          <div className="container-g">
            <Reveal>
              <SectionHeading
                eyebrow={fr ? "Listes de vérification" : "Prevention checklists"}
                title={fr ? "Des listes bilingues à consulter, imprimer et partager." : "Bilingual checklists to view, print and share."}
                lead={
                  fr
                    ? "Chaque liste inclut la marque GLOPROFAS, des cases à cocher, les signaux d’alerte importants, les actions d’urgence et les références officielles. Gratuit, sans inscription, en anglais et en français."
                    : "Every checklist includes GLOPROFAS branding, tick boxes, important warning signs, emergency actions and official references. Free, no registration, in English and French."
                }
              />
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(checklistsData?.checklists ?? []).map((c, i) => (
                <Reveal key={c.slug} delay={Math.min(i, 8) * 50}>
                  <ChecklistCard checklist={c} />
                </Reveal>
              ))}
            </div>

            {(checklistsData?.checklists ?? []).length === 0 ? (
              <div className="mt-8">
                <LoadError onRetry={() => router.navigate("/resources/knowledge-tools?tab=checklists")} />
              </div>
            ) : null}

            <Reveal className="mt-10">
              <div className="on-dark rounded-2xl bg-navy-950 p-7 sm:p-8">
                <p className="eyebrow mb-3 !text-cyanx-500">{fr ? "Utilisation libre" : "Open use"}</p>
                <h3 className="h3-g text-white">
                  {fr ? "Imprimez, partagez, affichez — à la maison, à l’école, à l’église ou au bureau." : "Print, share, display — at home, at school, at church or at the office."}
                </h3>
                <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-slatex-300">
                  {fr
                    ? "Ces listes sont conçues pour être utilisées : dans les familles, les écoles, les églises, les groupes communautaires, les coopératives et les entreprises. Aucune inscription n’est requise ; chaque téléchargement compte les usages."
                    : "These checklists are made to be used: in families, schools, churches, community groups, cooperatives and businesses. No registration required; every download is counted to measure use."}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="/checklists/general-scam-prevention-en.pdf" download className="btn-g btn-outline-dark-g btn-sm-g">
                    <FileDown size={14} aria-hidden />
                    {fr ? "Exemple : liste générale (EN)" : "Sample: general checklist (EN)"}
                  </a>
                  <a href="/checklists/mobile-money-security-fr.pdf" download className="btn-g btn-outline-dark-g btn-sm-g">
                    <FileDown size={14} aria-hidden />
                    {fr ? "Exemple : mobile money (FR)" : "Sample: mobile money (FR)"}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
