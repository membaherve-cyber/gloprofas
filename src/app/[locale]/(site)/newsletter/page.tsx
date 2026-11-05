import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { PageHero } from "@/components/zite/shared";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.newsletter.h1,
    description: dict.newsletter.lead,
    alternates: { canonical: `/${locale}/newsletter`, languages: { en: "/en/newsletter", fr: "/fr/newsletter" } },
  };
}

export default async function NewsletterPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale: raw } = await params;
  const { status } = await searchParams;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const hero = PAGE_AERIAL_HEROES.newsletter;
  const notice =
    status === "confirmed" ? dict.newsletter.confirmed : status === "unsubscribed" ? dict.newsletter.unsubscribed : status === "invalid" ? dict.newsletter.invalidToken : null;

  return (
    <>
      <PageHero
        title={dict.newsletter.h1}
        eyebrow={dict.home.newsletter.eyebrow}
        lead={dict.newsletter.lead}
        image={hero.image}
        cityBadge={formatAerialBadge(hero.city, locale)}
        crumbs={[
          { label: locale === "fr" ? "Accueil" : "Home", to: `/${locale}` },
          { label: dict.newsletter.h1 },
        ]}
      />
      <section className="section bg-mist-50">
        <div className="container-page max-w-2xl">
          <div className="on-dark rounded-[var(--radius-lg)] bg-navy-900 p-5 sm:p-7">
            {notice ? (
              <p className="mb-4 rounded-[var(--radius-md)] border border-cyan-400/40 bg-cyan-400/10 p-3 text-[0.88rem] text-white" role="status">
                {notice}
              </p>
            ) : null}
            <NewsletterForm locale={locale} dict={dict} />
          </div>
        </div>
      </section>
    </>
  );
}
