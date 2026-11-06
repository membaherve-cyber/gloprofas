import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZITE_CONTENT, type ZiteArticle } from "@/lib/zite-data";
import {
  PageHero,
  Reveal,
} from "@/components/zite/shared";
import { L } from "@/lib/zite-copy";

import { formatZiteDate, R } from "@/lib/zite-copy";

import { CopyButton } from "@/components/ui/motion";
import {
  ARTICLE_AERIAL_HEROES,
  ARTICLE_CONTEXT_VISUALS,
  formatAerialBadge,
  PAGE_AERIAL_HEROES,
} from "@/lib/african-cities";
import { getArticle } from "@/lib/queries";

async function findArticle(locale: Locale, slugOrId: string): Promise<ZiteArticle | undefined> {
  const list = ZITE_CONTENT.articles as unknown as ZiteArticle[];
  const found = list.find((a) => a.id === slugOrId);
  if (found) return found;
  const dbRow = await getArticle(locale, slugOrId);
  if (!dbRow) return undefined;
  return {
    id: dbRow.article.slugEn,
    title: { en: dbRow.article.titleEn, fr: dbRow.article.titleFr },
    tag: { en: dbRow.article.tag, fr: dbRow.article.tag },
    summary: { en: dbRow.article.excerptEn, fr: dbRow.article.excerptFr },
    body: {
      en: dbRow.article.bodyEn.join("\n\n"),
      fr: dbRow.article.bodyFr.join("\n\n"),
    },
    author: dbRow.article.authorName,
    date: dbRow.article.publishedAt.toISOString().slice(0, 10),
    imageUrl: dbRow.article.imageUrl ?? "/images/zite/img_9FEr6sokBRFWKAW9.jpg",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const art = await findArticle(locale, slug);
  if (!art) return {};
  return {
    title: R(art.title, locale),
    description: R(art.summary, locale),
    alternates: {
      canonical: `/${locale}/news/${art.id}`,
      languages: {
        en: `/en/news/${art.id}`,
        fr: `/fr/news/${art.id}`,
      },
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;

  const article = await findArticle(locale, slug);
  if (!article) notFound();

  const title = R(article.title, locale);
  const shareUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gloprofas.zite.so"
  }/${locale}/news/${article.id}`;
  const related = (ZITE_CONTENT.articles as unknown as ZiteArticle[])
    .filter((a) => a.id !== article.id)
    .slice(0, 2);
  const aerialHero =
    ARTICLE_AERIAL_HEROES[article.id] ?? PAGE_AERIAL_HEROES.newsIndex;
  const visuals =
    ARTICLE_CONTEXT_VISUALS[article.id] ??
    ARTICLE_CONTEXT_VISUALS["84b3aae8-32a2-40eb-9c90-c414846fbc8a"];

  return (
    <>
      <PageHero
        title={title}
        eyebrow={R(article.tag, locale)}
        image={aerialHero.image}
        cityBadge={formatAerialBadge(aerialHero.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: R(L.nav.news, locale), to: l("/news") },
          { label: R(article.tag, locale) },
        ]}
      />

      <article className="section-y bg-white">
        <div className="container-g grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-sm font-semibold text-slatex-600">
              {article.author} · {formatZiteDate(article.date, locale)}
            </p>
            <p className="lead mt-6 font-semibold text-ink">
              {R(article.summary, locale)}
            </p>

            {article.imageUrl ? (
              <Reveal className="mt-8 overflow-hidden rounded-[22px] border border-line bg-mist shadow-e2">
                <div className="group relative aspect-[16/9] w-full overflow-hidden bg-navy-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                  <span className="float-chip absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy-950/85 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    <span className="animate-dot h-2 w-2 rounded-full bg-cyanx" />
                    {R(article.tag, locale)}
                  </span>
                </div>
                <p className="px-6 py-4 text-sm font-medium text-slatex-600">
                  {R(visuals.leadCaption, locale)}
                </p>
              </Reveal>
            ) : null}

            <div
              className="mt-8 space-y-5 text-[1.0625rem] text-slatex-600"
              style={{ maxWidth: "68ch" }}
            >
              {R(article.body, locale)
                .split("\n\n")
                .map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
            </div>

            {visuals.gallery.length > 0 ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {visuals.gallery.map((item, idx) => (
                  <Reveal
                    key={item.image}
                    delay={idx * 90}
                    className="group overflow-hidden rounded-[18px] border border-line bg-mist shadow-e1"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={R(item.tag, locale)}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyanx backdrop-blur-sm">
                        {R(item.tag, locale)}
                      </span>
                    </div>
                    <p className="p-4 text-sm leading-relaxed text-slatex-600">
                      {R(item.caption, locale)}
                    </p>
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-[22px] border border-line p-6">
              <p className="eyebrow text-brand-600">
                {fr ? "Partager" : "Share"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
                <a
                  className="rounded-full border border-line px-4 py-2 hover:border-brand-600"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${title} ${shareUrl}`,
                  )}`}
                >
                  WhatsApp
                </a>
                <a
                  className="rounded-full border border-line px-4 py-2 hover:border-brand-600"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl,
                  )}`}
                >
                  Facebook
                </a>
                <a
                  className="rounded-full border border-line px-4 py-2 hover:border-brand-600"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    shareUrl,
                  )}`}
                >
                  LinkedIn
                </a>
                <CopyButton
                  value={shareUrl}
                  labels={{
                    copy: fr ? "Copier" : "Copy",
                    copied: fr ? "Lien copié" : "Link copied",
                  }}
                />
              </div>
            </div>

            {related.map((rel) => (
              <Link
                key={rel.id}
                href={l(`/news/${rel.id}`)}
                className="flex gap-4 rounded-[14px] p-2 hover:bg-mist"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={rel.imageUrl}
                  alt=""
                  className="h-20 w-24 shrink-0 rounded-[8px] object-cover"
                />
                <span className="font-[family-name:var(--font-heading)] font-semibold leading-snug text-ink">
                  {R(rel.title, locale)}
                </span>
              </Link>
            ))}
          </aside>
        </div>
      </article>
    </>
  );
}
