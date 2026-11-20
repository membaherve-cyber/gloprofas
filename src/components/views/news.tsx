"use client";

/**
 * News & Publications — organisational news, articles and press content.
 */

import React from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R } from "@/lib/content/copy";
import { ZITE_CONTENT, type ZiteArticle } from "@/lib/content/zite-data";
import { Btn, EmptyState, PageHero, Reveal, Masthead } from "@/components/shared/ui";

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
    </>
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
        <p className="text-[13px] text-slatex-300">
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
