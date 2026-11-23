"use client";

/**
 * News & Publications — organisational news, articles, press content and the
 * "Famous scams and frauds worldwide" case library: one documented landmark
 * case per scam category covered on the site.
 */

import React, { useState } from "react";
import { ArrowLeft, BookOpenCheck, ChevronRight, ExternalLink, Globe2, Scale, ShieldCheck, Siren } from "lucide-react";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R } from "@/lib/content/copy";
import { ZITE_CONTENT, type ZiteArticle } from "@/lib/content/zite-data";
import { FAMOUS_SCAMS, type FamousScam } from "@/lib/content/famous-scams";
import { categoryImage } from "@/lib/site";
import { Btn, EmptyState, PageHero, Reveal, Masthead } from "@/components/shared/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/* Category labels for the twelve site scam categories. */
function scamCategoryLabel(slug: string, locale: string): string {
  const cat = ZITE_CONTENT.categories.find((c) => c.slug === slug);
  return cat ? R(cat.title, locale) : slug;
}

export function NewsView() {
  const { locale, t, formatDate } = useI18n();
  const fr = locale === "fr";
  const articles = [...ZITE_CONTENT.articles].sort(
    (a: ZiteArticle, b: ZiteArticle) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <PageHero
        eyebrow={fr ? "Publications" : "Publications"}
        title={t("news.h1")}
        lead={t("news.lead")}
        image="/images/context/article-reporting.jpg"
        imageAlt={fr ? "Signalement et documentation" : "Reporting and documentation"}
      />

      <section className="section-y bg-white">
        <div className="container-g">
          {/* Lead article */}
          {articles[0] ? (
            <Reveal>
              <A href={`/news/${articles[0].id}`} className="group block">
                <article className="card-g hoverable overflow-hidden lg:grid lg:grid-cols-2">
                  <img
                    src={articles[0].imageUrl}
                    alt={fr ? "Illustration de l'article principal" : "Lead article illustration"}
                    width={1200}
                    height={896}
                    loading="lazy"
                    className="img-editorial aspect-[16/10] h-full w-full object-cover"
                  />
                  <div className="flex flex-col justify-center p-7 lg:p-10">
                    <div className="flex items-center gap-3">
                      <span className="chip-g bg-brand-50 text-brand-600">{R(articles[0].tag, locale)}</span>
                      <span className="text-[12.5px] text-slatex-400">{formatDate(articles[0].date)}</span>
                    </div>
                    <h2 className="h2-g mt-4 text-[clamp(1.4rem,1.1rem+1.4vw,2rem)]">
                      {R(articles[0].title, locale)}
                    </h2>
                    <p className="mt-4 text-[14.5px] leading-relaxed text-slatex-600">
                      {R(articles[0].summary, locale)}
                    </p>
                    <span className="link-g mt-6 !text-brand-600">
                      {fr ? "Lire l'article" : "Read article"}
                      <ChevronRight size={14} aria-hidden />
                    </span>
                  </div>
                </article>
              </A>
            </Reveal>
          ) : null}

          {/* Remaining articles */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {articles.slice(1).map((art: ZiteArticle, i: number) => (
              <Reveal key={art.id} delay={(i % 2) * 90}>
                <A href={`/news/${art.id}`} className="group block h-full">
                  <article className="card-g hoverable flex h-full flex-col overflow-hidden">
                    <img
                      src={art.imageUrl}
                      alt={fr ? "Illustration de l'article" : "Article illustration"}
                      width={1200}
                      height={896}
                      loading="lazy"
                      className="img-editorial aspect-[16/9] w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-3">
                        <span className="chip-g bg-brand-50 text-brand-600">{R(art.tag, locale)}</span>
                        <span className="text-[12px] text-slatex-400">{formatDate(art.date)}</span>
                      </div>
                      <h2 className="mt-3 font-heading text-[16px] font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
                        {R(art.title, locale)}
                      </h2>
                      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slatex-600">
                        {R(art.summary, locale)}
                      </p>
                    </div>
                  </article>
                </A>
              </Reveal>
            ))}
          </div>

          {articles.length === 0 ? (
            <EmptyState>{fr ? "Aucun article publié." : "No published articles."}</EmptyState>
          ) : null}
        </div>
      </section>

      {/* Famous scams and frauds worldwide */}
      <FamousScamsSection />
    </>
  );
}

/* ================= Famous scams case library ================= */

function FamousScamsSection() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [openCase, setOpenCase] = useState<FamousScam | null>(null);

  return (
    <>
      <section className="section-y border-t border-line-200 bg-mist-50">
        <div className="container-g">
          <Reveal>
            <Masthead
              num="01"
              eyebrow={fr ? "Dossiers spéciaux" : "Special reports"}
            />
          </Reveal>
          <Reveal delay={70}>
            <div className="mt-6 max-w-3xl">
              <h2 className="h2-g">
                {fr ? "Les arnaques et fraudes les plus célèbres du monde." : "The most famous scams and frauds in the world."}
              </h2>
              <p className="lead-g mt-4">
                {fr
                  ? "Un dossier documenté pour chaque type d’arnaque couvert sur ce site : la nature du schéma, son impact, ses conséquences et les conseils pratiques pour ne jamais en devenir la victime."
                  : "A documented case file for every type of scam covered on this site: the nature of the scheme, its impact, its consequences and the practical advice that keeps you from becoming its next victim."}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FAMOUS_SCAMS.map((scam, i) => (
              <Reveal key={scam.id} delay={Math.min(i, 5) * 60}>
                <article className="card-g hoverable flex h-full flex-col overflow-hidden">
                  <div className="relative">
                    <img
                      src={categoryImage(scam.categorySlug, "/images/gen/scam-phishing.jpg")}
                      alt={fr ? R(scam.title, locale) : R(scam.title, locale)}
                      width={1200}
                      height={896}
                      loading="lazy"
                      className="img-editorial aspect-[16/9] w-full object-cover"
                    />
                    <span className="chip-g absolute left-3 top-3 bg-white/95 text-brand-600 shadow-sm">
                      {scamCategoryLabel(scam.categorySlug, locale)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[12px] font-semibold uppercase tracking-wide text-signal-600">
                      {R(scam.caseName, locale)}
                    </p>
                    <h3 className="mt-2 font-heading text-[15.5px] font-semibold leading-snug text-ink-900">
                      {R(scam.title, locale)}
                    </h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slatex-600">
                      {R(scam.summary, locale)}
                    </p>
                    <div className="mt-4 flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setOpenCase(scam)}
                        className="btn-g btn-primary-g btn-sm-g"
                      >
                        <BookOpenCheck size={14} aria-hidden />
                        {fr ? "Lire le dossier" : "Read the case file"}
                      </button>
                      <A href={`/scams/${scam.categorySlug}`} className="link-g !text-[12.5px]">
                        {fr ? "Voir la catégorie" : "See category"}
                      </A>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case file dialog */}
      <Dialog open={Boolean(openCase)} onOpenChange={(o) => !o && setOpenCase(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl gap-0 overflow-y-auto p-0">
          {openCase ? (
            <>
              <div className="px-6 pt-6">
                <DialogHeader>
                  <DialogTitle className="text-left font-heading text-[1.12rem] font-bold leading-snug text-ink-900">
                    {R(openCase.title, locale)}
                  </DialogTitle>
                  <DialogDescription className="text-left">
                    {R(openCase.caseName, locale)} · {scamCategoryLabel(openCase.categorySlug, locale)}
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="px-6 pb-6">
                <CaseBlock icon={BookOpenCheck} t={fr ? "La nature de l’arnaque" : "The nature of the scam"}>
                  <p>{R(openCase.nature, locale)}</p>
                </CaseBlock>
                <CaseBlock icon={Globe2} t={fr ? "L’impact" : "The impact"}>
                  <p>{R(openCase.impact, locale)}</p>
                </CaseBlock>
                <CaseBlock icon={Scale} t={fr ? "Les conséquences" : "The consequences"}>
                  <p>{R(openCase.consequences, locale)}</p>
                </CaseBlock>
                <CaseBlock icon={ShieldCheck} t={fr ? "Comment éviter ce type d’arnaque" : "How to avoid this type of scam"}>
                  <ul className="space-y-2.5">
                    {openCase.advice.map((a, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink-800">
                        <ShieldCheck size={14} className="mt-1 shrink-0 text-risk-low" aria-hidden />
                        <span>{R(a, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </CaseBlock>

                {openCase.sources?.length ? (
                  <div className="mt-6 rounded-xl bg-mist-30 p-4">
                    <p className="text-[11.5px] font-bold uppercase tracking-wide text-slatex-500">
                      {fr ? "Sources publiques" : "Public sources"}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {openCase.sources.map((s, i) => (
                        <li key={i}>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-1.5 text-[12.5px] font-medium text-brand-600 hover:underline"
                          >
                            <ExternalLink size={11} className="mt-0.5 shrink-0" aria-hidden />
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line-200 pt-4">
                  <Btn href={`/scams/${openCase.categorySlug}`} variant="outline" size="sm">
                    {fr ? "Tous les guides de cette catégorie" : "All guides in this category"}
                    <ChevronRight size={14} aria-hidden />
                  </Btn>
                  <Btn href="/report" variant="signal" size="sm">
                    <Siren size={14} aria-hidden />
                    {fr ? "Signaler une arnaque" : "Report a scam"}
                  </Btn>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

function CaseBlock({
  icon: Icon,
  t,
  children,
}: {
  icon: typeof ShieldCheck;
  t: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <h3 className="flex items-center gap-2 font-heading text-[0.95rem] font-bold text-ink-900">
        <Icon size={16} className="text-brand-600" aria-hidden />
        {t}
      </h3>
      <div className="mt-2 text-[13.5px] leading-relaxed text-ink-800">{children}</div>
    </div>
  );
}

/* ================= Detail view ================= */

export function NewsDetailView({ id }: { id: string }) {
  const { locale, formatDate } = useI18n();
  const fr = locale === "fr";
  const art = ZITE_CONTENT.articles.find((a: ZiteArticle) => a.id === id);

  if (!art) {
    return (
      <section className="bg-white pt-32 pb-24">
        <div className="container-g">
          <EmptyState>
            <div className="space-y-4 text-center">
              <p>{fr ? "Article introuvable." : "Article not found."}</p>
              <Btn href="/news" variant="outline">
                <ArrowLeft size={15} aria-hidden />
                {fr ? "Retour aux actualités" : "Back to news"}
              </Btn>
            </div>
          </EmptyState>
        </div>
      </section>
    );
  }

  const paragraphs = R(art.body, locale).split("\n").filter((p) => p.trim().length > 0);

  return (
    <>
      <PageHero
        eyebrow={R(art.tag, locale)}
        title={R(art.title, locale)}
        lead={R(art.summary, locale)}
        image={art.imageUrl}
        imageAlt={fr ? "Illustration de l'article" : "Article illustration"}
        breadcrumb={[{ label: fr ? "Actualités" : "News", href: "/news" }]}
      >
        <p className="text-[13px] text-white">
          {art.author} · {formatDate(art.date)}
        </p>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-g max-w-3xl">
          <Reveal>
            <div className="card-g overflow-hidden">
              <img
                src={art.imageUrl}
                alt={fr ? "Illustration principale de l'article" : "Article lead illustration"}
                width={1200}
                height={896}
                loading="lazy"
                className="img-editorial aspect-[16/9] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="prose-g mt-10">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line-200 pt-8">
              <Btn href="/news" variant="outline">
                <ArrowLeft size={15} aria-hidden />
                {fr ? "Toutes les actualités" : "All news"}
              </Btn>
              <Btn href="/report" variant="signal">
                {fr ? "Signaler une arnaque" : "Report a scam"}
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
