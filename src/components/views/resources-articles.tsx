"use client";

/**
 * Practical Tools to Protect Yourself — searchable article library (36+ guides
 * in five categories) and the full article reading view with the mandated
 * editorial structure, checklists and references.
 */

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Check,
  CirclePlay,
  ExternalLink,
  FileDown,
  ListChecks,
  Search,
  ShieldAlert,
  ShieldCheck,
  Siren,
  TriangleAlert,
} from "lucide-react";
import { A, useRouter } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R } from "@/lib/content/copy";
import { Btn, PageHero, Reveal, SectionHeading } from "@/components/shared/ui";
import {
  ArticleCard,
  LoadError,
  LoadingGrid,
  categoryLabel,
  useApiData,
  useJsonLd,
  type ArticleFullDTO,
  type ArticleSummaryDTO,
} from "./resources-parts";

const CATEGORY_ORDER = [
  "online-digital",
  "money-banking",
  "social-engineering",
  "business-fraud",
  "emerging-specialised",
] as const;

const CATEGORY_LETTER: Record<string, string> = {
  "online-digital": "A",
  "money-banking": "B",
  "social-engineering": "C",
  "business-fraud": "D",
  "emerging-specialised": "E",
};

const CATEGORY_DESC: Record<string, { en: string; fr: string }> = {
  "online-digital": {
    en: "Fake websites, phishing, smishing, QR codes, fake support and marketplace fraud.",
    fr: "Faux sites, hameçonnage, smishing, QR codes, faux supports et fraudes de marketplace.",
  },
  "money-banking": {
    en: "Mobile money, banks, SIM swap, cards, investments, crypto and loan scams.",
    fr: "Mobile money, banques, échange de SIM, cartes, investissements, crypto et faux prêts.",
  },
  "social-engineering": {
    en: "Romance, impersonation, family emergencies, WhatsApp, social media, jobs and prizes.",
    fr: "Amour trompeur, usurpation, urgences familiales, WhatsApp, réseaux sociaux, emplois et gains.",
  },
  "business-fraud": {
    en: "Business email compromise, invoice redirection, CEO fraud, procurement fraud.",
    fr: "Courriels d’entreprise détournés, fausses factures, faux PDG, fraude à l’achat.",
  },
  "emerging-specialised": {
    en: "AI and deepfakes, identity theft, extortion, recovery scams, fake charities, travel fraud.",
    fr: "IA et deepfakes, vol d’identité, chantage, arnaques au recouvrement, faux appels, voyages.",
  },
};

/* ------------------------------------------------------------------ */
/* Library                                                             */
/* ------------------------------------------------------------------ */

export function ArticleLibraryView() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [category, setCategory] = useState<string>("all");
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");

  const { data, error, loading, retry } = useApiData<{ count: number; articles: ArticleSummaryDTO[] }>(
    `/api/resources/articles${query ? `?q=${encodeURIComponent(query)}` : ""}`
  );

  useEffect(() => {
    const t = setTimeout(() => setQuery(q.trim().toLowerCase()), 280);
    return () => clearTimeout(t);
  }, [q]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const a of data?.articles ?? []) map[a.categorySlug] = (map[a.categorySlug] ?? 0) + 1;
    return map;
  }, [data]);

  const filtered = useMemo(
    () => (data?.articles ?? []).filter((a) => category === "all" || a.categorySlug === category),
    [data, category]
  );

  return (
    <>
      <PageHero
        eyebrow={fr ? "Outils pratiques pour vous protéger" : "Practical Tools to Protect Yourself"}
        title={fr ? "36 guides pour reconnaître, éviter et signaler les arnaques." : "36 guides to recognise, avoid and report scams."}
        lead={
          fr
            ? "Des conseils concrets pour l’Afrique, le Cameroun et le monde entier : chaque guide explique le schéma, les signaux d’alerte, la protection, les réflexes de victime et où signaler."
            : "Concrete advice for Africa, Cameroon and the world: every guide explains the scheme, the warning signs, protection, victim steps and where to report."
        }
        image="/images/gen/article-cat-online.jpg"
        imageAlt={fr ? "Jeune homme examinant son téléphone avec prudence" : "Young man examining his phone with caution"}
        breadcrumb={[{ label: fr ? "Centre de ressources" : "Resource Centre", href: "/resources" }, { label: fr ? "Outils pratiques" : "Practical Tools" }]}
      />

      <section className="section-y bg-white">
        <div className="container-g">
          {/* Search */}
          <Reveal>
            <form role="search" onSubmit={(e) => e.preventDefault()} className="relative max-w-xl">
              <label htmlFor="pt-search" className="sr-only">
                {fr ? "Rechercher un guide" : "Search a guide"}
              </label>
              <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slatex-400" aria-hidden />
              <input
                id="pt-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                maxLength={90}
                placeholder={fr ? "Rechercher : mobile money, phishing, deepfake…" : "Search: mobile money, phishing, deepfake…"}
                className="field-g !h-12 !pl-11"
              />
            </form>
          </Reveal>

          {/* Category filters */}
          <Reveal className="mt-6">
            <div className="flex flex-wrap gap-2" role="group" aria-label={fr ? "Filtrer par catégorie" : "Filter by category"}>
              <button
                type="button"
                onClick={() => setCategory("all")}
                aria-pressed={category === "all"}
                className={`h-10 rounded-full border px-4 font-heading text-[13px] font-semibold transition-colors ${
                  category === "all"
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-line-200 text-slatex-600 hover:border-brand-500/60 hover:text-brand-600"
                }`}
              >
                {fr ? "Tous les guides" : "All guides"}
                <span className="ml-1.5 opacity-70">{data?.count ?? ""}</span>
              </button>
              {CATEGORY_ORDER.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`h-10 rounded-full border px-4 font-heading text-[13px] font-semibold transition-colors ${
                    category === c
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-line-200 text-slatex-600 hover:border-brand-500/60 hover:text-brand-600"
                  }`}
                >
                  <span className="mr-1.5 font-mono text-[11px] opacity-60">{CATEGORY_LETTER[c]}</span>
                  {categoryLabel(c, locale)}
                  <span className="ml-1.5 opacity-70">{counts[c] ?? ""}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Category description */}
          {category !== "all" ? (
            <Reveal className="mt-4">
              <p className="rounded-xl bg-mist-30 px-4 py-3 text-[13.5px] text-slatex-600">{R(CATEGORY_DESC[category], locale)}</p>
            </Reveal>
          ) : null}

          {/* Grid */}
          <div className="mt-8">
            {loading ? (
              <LoadingGrid count={6} />
            ) : error ? (
              <LoadError onRetry={retry} />
            ) : filtered.length === 0 ? (
              <div className="card-g px-6 py-12 text-center text-[14px] text-slatex-600">
                {fr ? "Aucun guide ne correspond à cette recherche." : "No guide matches this search."}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((a, i) => (
                  <Reveal key={a.slug} delay={Math.min(i, 8) * 50}>
                    <ArticleCard article={a} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Article detail                                                      */
/* ------------------------------------------------------------------ */

export function ArticleDetailView({ slug }: { slug: string }) {
  const { locale, formatDate } = useI18n();
  const fr = locale === "fr";
  const { data, error, loading, retry } = useApiData<{ article: ArticleFullDTO; related: ArticleSummaryDTO[] }>(
    `/api/resources/articles/${encodeURIComponent(slug)}`
  );

  useEffect(() => {
    if (data?.article) {
      document.title = `${fr ? data.article.title.fr : data.article.title.en} · GLOPROFAS`;
    }
  }, [data, fr]);

  const a = data?.article;

  useJsonLd(
    `article-${slug}`,
    a
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title.en,
            description: a.metaDescription?.en ?? a.summary.en,
            inLanguage: ["en", "fr"],
            datePublished: a.publishedAt,
            dateModified: a.updatedAt,
            author: { "@type": "Organization", name: "GLOPROFAS", url: "https://gloprofas.org" },
            publisher: { "@type": "Organization", name: "GLOPROFAS", url: "https://gloprofas.org" },
            image: a.imageUrl ? `https://gloprofas.org${a.imageUrl}` : undefined,
            mainEntityOfPage: `https://gloprofas.org/#/resources/practical-tools/${a.slug}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://gloprofas.org/" },
              { "@type": "ListItem", position: 2, name: "Resource Centre", item: "https://gloprofas.org/#/resources" },
              { "@type": "ListItem", position: 3, name: "Practical Tools", item: "https://gloprofas.org/#/resources/practical-tools" },
              { "@type": "ListItem", position: 4, name: a.title.en },
            ],
          },
        ]
      : null
  );

  return (
    <>
      <PageHero
        eyebrow={a ? `${fr ? "Catégorie" : "Category"} ${CATEGORY_LETTER[a.categorySlug] ?? ""} · ${categoryLabel(a.categorySlug, locale)}` : fr ? "Guide" : "Guide"}
        title={a ? R(a.title, locale) : "…"}
        lead={a ? R(a.summary, locale) : undefined}
        image={a?.imageUrl || "/images/gen/article-cat-online.jpg"}
        imageAlt={a ? R(a.title, locale) : ""}
        breadcrumb={[
          { label: fr ? "Centre de ressources" : "Resource Centre", href: "/resources" },
          { label: fr ? "Outils pratiques" : "Practical Tools", href: "/resources/practical-tools" },
          { label: a ? R(a.title, locale) : "…" },
        ]}
      >
        {a ? (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slatex-300">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen size={14} aria-hidden />
              {a.readingMinutes} {fr ? "min de lecture" : "min read"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarCheck size={14} aria-hidden />
              {fr ? "Publié le" : "Published"} {formatDate(a.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={14} aria-hidden />
              {fr ? "Dernière révision" : "Last reviewed"} {formatDate(a.updatedAt)}
            </span>
          </div>
        ) : null}
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-g max-w-3xl">
          <Reveal>
            <A href="/resources/practical-tools" className="link-g !text-[13px]">
              <ArrowLeft size={14} strokeWidth={2.2} aria-hidden />
              {fr ? "Tous les guides" : "All guides"}
            </A>
          </Reveal>

          {loading ? (
            <div className="mt-8"><LoadingGrid count={1} /></div>
          ) : error || !a ? (
            <div className="mt-8">
              <LoadError onRetry={retry} />
              <p className="mt-4 text-center text-[13px] text-slatex-500">
                {fr ? "Ce guide n’existe peut-être plus ou l’adresse est incorrecte." : "This guide may no longer exist or the address is wrong."}
              </p>
            </div>
          ) : (
            <article className="prose-g mt-8">
              {/* Key takeaway box */}
              <div className="!mt-0 mb-8 rounded-xl border-l-4 border-signal-500 bg-signal-100/50 p-5">
                <p className="flex items-start gap-2.5 !mt-0 text-[14px] font-semibold leading-relaxed text-ink-900">
                  <TriangleAlert size={17} className="mt-0.5 shrink-0 text-signal-600" aria-hidden />
                  {R(a.keyTakeaway, locale)}
                </p>
              </div>

              <Section t={fr ? "Qu’est-ce que c’est ?" : "What is it?"}>
                <p>{R(a.what, locale)}</p>
              </Section>

              <Section t={fr ? "Comment fonctionne cette arnaque" : "How the scam works"}>
                <p>{R(a.how, locale)}</p>
              </Section>

              <Section t={fr ? "Signaux d’alerte courants" : "Common warning signs"} icon={TriangleAlert}>
                <ul>
                  {a.warningSigns.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <TriangleAlert size={14} className="mt-1 shrink-0 text-signal-600" aria-hidden />
                      <span>{R(s, locale)}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section t={fr ? "Exemple illustratif" : "Illustrative example"}>
                <p className="rounded-xl bg-mist-30 p-4 !mb-0">{R(a.example, locale)}</p>
              </Section>

              <Section t={fr ? "Comment vous protéger" : "How to protect yourself"} icon={ShieldCheck}>
                <ul>
                  {a.protect.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check size={14} className="mt-1 shrink-0 text-risk-low" aria-hidden />
                      <span>{R(s, locale)}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section t={fr ? "Si vous êtes victime" : "If you become a victim"} icon={Siren}>
                <ul>
                  {a.ifVictim.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ArrowRight size={14} className="mt-1 shrink-0 text-brand-600" aria-hidden />
                      <span>{R(s, locale)}</span>
                    </li>
                  ))}
                </ul>
                <Btn href="/resources/reporting-channels/victim-guide" variant="signal" size="sm" className="mt-4">
                  <Siren size={14} aria-hidden />
                  {fr ? "Guide d’urgence : les 5 étapes" : "Emergency guide: the 5 steps"}
                </Btn>
              </Section>

              <Section t={fr ? "Où signaler" : "Where to report"}>
                <ul>
                  {a.reportTo.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Siren size={14} className="mt-1 shrink-0 text-signal-600" aria-hidden />
                      <span>{R(s, locale)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Btn href="/report" variant="signal" size="sm">
                    <Siren size={14} aria-hidden />
                    {fr ? "Signaler à GLOPROFAS" : "Report to GLOPROFAS"}
                  </Btn>
                  <Btn href="/resources/reporting-channels" variant="outline" size="sm">
                    {fr ? "Autorités officielles par pays" : "Official authorities by country"}
                    <ArrowRight size={14} aria-hidden />
                  </Btn>
                </div>
              </Section>

              {/* Checklist + references */}
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <A href="/resources/knowledge-tools?tab=checklists" className="card-g hoverable flex flex-col p-5">
                  <span className="chip-g w-fit bg-brand-50 text-brand-600">
                    <ListChecks size={13} aria-hidden />
                    {fr ? "Liste à imprimer" : "Printable checklist"}
                  </span>
                  <p className="mt-3 font-heading text-[14.5px] font-semibold text-ink-900">
                    {fr ? "Vérifiez chaque point avec la liste associée à ce guide." : "Verify every point with the checklist attached to this guide."}
                  </p>
                  <span className="link-g mt-auto pt-3 !text-[13px]">
                    <FileDown size={14} aria-hidden />
                    {fr ? "Voir les listes" : "View checklists"}
                  </span>
                </A>
                <div className="card-g p-5">
                  <span className="eyebrow">{fr ? "Références officielles" : "Authoritative references"}</span>
                  <ul className="mt-3 space-y-2">
                    {a.references.map((r, i) => (
                      <li key={i}>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-start gap-1.5 text-[13px] font-medium text-brand-600 hover:underline"
                        >
                          <ExternalLink size={12} className="mt-0.5 shrink-0" aria-hidden />
                          {r.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Related */}
              {data?.related && data.related.length > 0 ? (
                <div className="mt-12">
                  <SectionHeading
                    eyebrow={fr ? "Pour aller plus loin" : "Keep learning"}
                    title={fr ? "Guides liés." : "Related guides."}
                  />
                  <div className="mt-6 grid gap-6 sm:grid-cols-3">
                    {data.related.map((r) => (
                      <ArticleCard key={r.slug} article={r} />
                    ))}
                  </div>
                </div>
              ) : null}
            </article>
          )}
        </div>
      </section>
    </>
  );
}

function Section({
  t,
  icon: Icon,
  children,
}: {
  t: string;
  icon?: typeof ShieldCheck;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="mt-8">
        <h2 className="flex items-center gap-2.5 font-heading text-[1.15rem] font-bold text-ink-900">
          {Icon ? <Icon size={18} className="text-brand-600" aria-hidden /> : null}
          {t}
        </h2>
        <div className="mt-3">{children}</div>
      </div>
    </Reveal>
  );
}
