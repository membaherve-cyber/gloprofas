"use client";

/**
 * Scam Awareness Centre — index of the 12 bilingual guides + detail view
 * with definition, how it works, warning signs, protection, "do this now"
 * and an illustrative example (ScamAnatomy-style steps preserved).
 */

import React, { useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronRight, Search, ShieldQuestion, TriangleAlert } from "lucide-react";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R, L, getCategoryIcon, ICON_MAP } from "@/lib/content/copy";
import { ZITE_CONTENT, type ZiteCategory } from "@/lib/content/zite-data";
import { categoryImage } from "@/lib/site";
import {
  Reveal,
  Btn,
  LinkG,
  PageHero,
  Masthead,
  RiskBadge,
  EmptyState,
} from "@/components/shared/ui";

export function ScamsView() {
  const { locale, t } = useI18n();
  const fr = locale === "fr";
  const [query, setQuery] = useState("");
  const cats = ZITE_CONTENT.categories;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cats;
    return cats.filter(
      (c: ZiteCategory) =>
        c.title.en.toLowerCase().includes(q) ||
        c.title.fr.toLowerCase().includes(q) ||
        c.summary.en.toLowerCase().includes(q) ||
        c.summary.fr.toLowerCase().includes(q)
    );
  }, [query, cats]);

  return (
    <>
      <PageHero
        eyebrow={fr ? "Sensibilisation" : "Awareness"}
        title={fr ? "Centre de sensibilisation aux arnaques" : "Scam Awareness Centre"}
        lead={
          fr
            ? "Douze guides pas à pas : fonctionnement de l'arnaque, signaux d'alerte, protection et gestes immédiats."
            : "Twelve step-by-step guides: how the scam works, warning signs, protection and immediate steps."
        }
        image="/images/gen/scam-phishing.jpg"
        imageAlt={fr ? "Personne examinant un message suspect sur son téléphone" : "Person examining a suspicious message on their phone"}
      />

      <section className="section-y bg-white">
        <div className="container-g">
          {/* Search */}
          <Reveal>
            <div className="relative mx-auto max-w-xl">
              <Search
                size={17}
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slatex-400"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={fr ? "Rechercher un type d'arnaque…" : "Search a scam type…"}
                aria-label={fr ? "Rechercher un type d'arnaque" : "Search a scam type"}
                className="field-g !rounded-full !py-3 !pl-11"
              />
            </div>
          </Reveal>

          {/* Grid */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cat: ZiteCategory, i: number) => {
              const Icon = getCategoryIcon(cat.icon);
              return (
                <Reveal key={cat.id} delay={(i % 3) * 70}>
                  <A href={`/scams/${cat.slug}`} className="group block h-full">
                    <article className="card-g hoverable flex h-full flex-col overflow-hidden">
                      <div className="relative">
                        <img
                          src={categoryImage(cat.slug, cat.imageUrl)}
                          alt={
                            fr
                              ? `Illustration éditoriale : ${cat.title.fr}`
                              : `Editorial illustration: ${cat.title.en}`
                          }
                          width={1344}
                          height={768}
                          loading="lazy"
                          className="img-editorial aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        {cat.featured ? (
                          <span className="absolute right-3 top-3 rounded-md bg-navy-950/85 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-cyanx-500 backdrop-blur-[2px]">
                            {fr ? "Vedette" : "Featured"}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <Icon size={16} strokeWidth={1.9} aria-hidden />
                          </span>
                          <h2 className="font-heading text-[15.5px] font-semibold leading-tight text-ink-900 group-hover:text-brand-600">
                            {R(cat.title, locale)}
                          </h2>
                        </div>
                        <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slatex-600">
                          {R(cat.summary, locale)}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600">
                          {fr ? "Lire le guide" : "Read the guide"}
                          <ChevronRight size={14} aria-hidden />
                        </span>
                      </div>
                    </article>
                  </A>
                </Reveal>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <EmptyState>
              {fr ? "Aucun guide ne correspond à cette recherche." : "No guide matches this search."}
            </EmptyState>
          ) : null}

          <Reveal delay={140} className="mt-12">
            <div className="on-dark rounded-2xl bg-navy-950 px-7 py-9 text-center lg:px-10">
              <h2 className="h3-g text-white">{R(L.final.h2, locale)}</h2>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Btn href="/report" variant="signal">{R(L.report, locale)}</Btn>
                <Btn href="/check" variant="outlineDark">
                  {fr ? "Vérifier un message" : "Check a message"}
                </Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ================= Detail view ================= */

export function ScamDetailView({ slug }: { slug: string }) {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const cat = ZITE_CONTENT.categories.find((c: ZiteCategory) => c.slug === slug);

  if (!cat) {
    return (
      <section className="bg-white pt-32 pb-24">
        <div className="container-g">
          <EmptyState>
            <div className="space-y-4 text-center">
              <p>{fr ? "Guide introuvable." : "Guide not found."}</p>
              <Btn href="/scams" variant="outline">
                <ArrowLeft size={15} aria-hidden />
                {fr ? "Retour au centre" : "Back to the centre"}
              </Btn>
            </div>
          </EmptyState>
        </div>
      </section>
    );
  }

  const content = cat.parsedContent[locale] ?? cat.parsedContent.en;
  const Icon = ICON_MAP[cat.icon] ?? ShieldQuestion;
  const related = ZITE_CONTENT.categories
    .filter((c: ZiteCategory) => c.slug !== cat.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={fr ? "Guide d'arnaque" : "Scam guide"}
        title={R(cat.title, locale)}
        lead={R(cat.summary, locale)}
        image={categoryImage(cat.slug, cat.imageUrl)}
        imageAlt={
          fr
            ? `Illustration éditoriale : ${cat.title.fr}`
            : `Editorial illustration: ${cat.title.en}`
        }
        breadcrumb={[
          { label: fr ? "Sensibilisation" : "Awareness", href: "/scams" },
          { label: R(cat.title, locale) },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <span className="chip-g border-white/20 bg-white/10 text-white">
            <Icon size={14} strokeWidth={2} aria-hidden />
            {fr ? "Guide pas à pas" : "Step-by-step guide"}
          </span>
        </div>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-g grid gap-12 lg:grid-cols-12">
          {/* Body */}
          <div className="lg:col-span-8">
            {/* Definition */}
            <Reveal>
              <Masthead num="01" eyebrow={fr ? "Définition" : "Definition"} />
              <p className="lead-g mt-5 text-[1.05rem]">{content.definition}</p>
            </Reveal>

            {/* How it works */}
            <Reveal delay={70}>
              <div className="mt-12">
                <Masthead num="02" eyebrow={fr ? "Comment ça marche" : "How it works"} />
                <p className="mt-5 text-[15px] leading-relaxed text-ink-700">{content.how}</p>
              </div>
            </Reveal>

            {/* Warning signs */}
            <Reveal delay={90}>
              <div className="mt-12">
                <Masthead num="03" eyebrow={fr ? "Signaux d'alerte" : "Warning signs"} />
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {content.signs.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-line-200 bg-mist-50 px-4 py-3.5"
                    >
                      <TriangleAlert size={15} className="mt-1 shrink-0 text-risk-medium" aria-hidden />
                      <span className="text-[13.5px] leading-relaxed text-ink-700">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Protect yourself */}
            <Reveal delay={110}>
              <div className="mt-12">
                <Masthead num="04" eyebrow={fr ? "Se protéger" : "Protect yourself"} />
                <ul className="mt-5 space-y-2.5">
                  {content.protect.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 py-1">
                      <Check size={16} className="mt-1 shrink-0 text-risk-low" aria-hidden />
                      <span className="text-[14.5px] leading-relaxed text-ink-700">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Do this now */}
            <Reveal delay={130}>
              <div className="mt-12">
                <div className="on-dark rounded-2xl bg-navy-950 p-7">
                  <p className="eyebrow mb-4">{fr ? "À faire maintenant" : "Do this now"}</p>
                  <ol className="space-y-4">
                    {content.todo.map((todo, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="mast-num text-[16px]">{String(i + 1).padStart(2, "0")}</span>
                        <p className="text-[14px] leading-relaxed text-slatex-300">{todo}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <Btn href="/report" variant="signal" size="sm">
                      {R(L.report, locale)}
                    </Btn>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Example */}
            <Reveal delay={150}>
              <div className="mt-12">
                <Masthead num="05" eyebrow={fr ? "Exemple illustratif" : "Illustrative example"} />
                <div className="card-g mt-5 border-l-4 !border-l-brand-600 p-6">
                  <p className="text-[14px] italic leading-relaxed text-ink-700">{content.example}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <Reveal delay={80}>
              <div className="card-g sticky top-28 overflow-hidden">
                <img
                  src={categoryImage(cat.slug, cat.imageUrl)}
                  alt={
                    fr
                      ? `Illustration : scène associée à ${cat.title.fr}`
                      : `Illustration: scene related to ${cat.title.en}`
                  }
                  width={1344}
                  height={768}
                  loading="lazy"
                  className="img-editorial aspect-[4/3] w-full object-cover"
                />
                <div className="p-5">
                  <p className="eyebrow mb-3">{fr ? "Aide rapide" : "Quick help"}</p>
                  <div className="flex flex-col gap-2.5">
                    <Btn href="/check" variant="outline" size="sm" className="w-full">
                      {fr ? "Vérifier un message" : "Check a message"}
                    </Btn>
                    <Btn href="/victim-support" variant="outline" size="sm" className="w-full">
                      {fr ? "J'ai été victime" : "I was scammed"}
                    </Btn>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-6">
                <p className="eyebrow mb-4">{fr ? "Autres guides" : "Other guides"}</p>
                <ul className="divide-y divide-line-200">
                  {related.map((c: ZiteCategory) => {
                    const RIcon = getCategoryIcon(c.icon);
                    return (
                      <li key={c.id}>
                        <A href={`/scams/${c.slug}`} className="group flex items-center gap-3 py-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mist-50 text-brand-600">
                            <RIcon size={14} strokeWidth={1.9} aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-heading text-[13.5px] font-semibold text-ink-900 group-hover:text-brand-600">
                              {R(c.title, locale)}
                            </span>
                          </span>
                          <ChevronRight size={14} aria-hidden className="text-slatex-400" />
                        </A>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4">
                  <LinkG href="/scams">{fr ? "Tous les guides" : "All guides"}</LinkG>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
