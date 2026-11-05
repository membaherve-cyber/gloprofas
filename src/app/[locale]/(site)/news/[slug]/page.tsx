import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZITE_CONTENT, type ZiteArticle } from "@/lib/zite-data";
import { formatZiteDate, L, PageHero, R } from "@/components/zite/shared";
import { CopyButton } from "@/components/ui/motion";

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

  return (
    <>
      <PageHero
        title={title}
        eyebrow={R(article.tag, locale)}
        image={article.imageUrl}
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
