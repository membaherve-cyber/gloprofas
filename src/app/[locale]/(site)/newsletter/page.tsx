import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { Breadcrumbs, Eyebrow } from "@/components/ui";

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
  const notice =
    status === "confirmed" ? dict.newsletter.confirmed : status === "unsubscribed" ? dict.newsletter.unsubscribed : status === "invalid" ? dict.newsletter.invalidToken : null;

  return (
    <>
      <section className="on-dark bg-navy-900 py-14">
        <div className="container-page max-w-2xl">
          <Breadcrumbs items={[{ href: `/${locale}`, label: "GLOPROFAS" }, { label: dict.newsletter.h1 }]} />
          <Eyebrow dark>{dict.home.newsletter.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-white">{dict.newsletter.h1}</h1>
          <p className="lead mt-4 text-slate-300">{dict.newsletter.lead}</p>
        </div>
      </section>
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
