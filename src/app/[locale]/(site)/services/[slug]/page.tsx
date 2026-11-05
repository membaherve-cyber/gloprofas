import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, pick, routes, type Locale } from "@/lib/i18n";
import { getService } from "@/lib/queries";
import { Breadcrumbs, ButtonLink, CheckList, Eyebrow } from "@/components/ui";
import { ServiceEnquiryForm } from "@/components/site/forms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const service = await getService(locale, slug);
  if (!service) return {};
  return {
    title: pick(locale, service.nameEn, service.nameFr),
    description: pick(locale, service.descriptionEn, service.descriptionFr),
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: { en: `/en/services/${service.slugEn}`, fr: `/fr/services/${service.slugFr}` },
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const service = await getService(locale, slug);
  if (!service) notFound();
  const name = pick(locale, service.nameEn, service.nameFr);
  const pricing = dict.services.pricing[service.pricingMode as keyof typeof dict.services.pricing] ?? service.pricingMode;

  return (
    <>
      <section className="on-dark bg-navy-900 py-12">
        <div className="container-page">
          <Breadcrumbs
            items={[
              { href: routes.home(locale), label: "GLOPROFAS" },
              { href: routes.services(locale), label: dict.services.h1 },
              { label: name },
            ]}
          />
          <Eyebrow dark>{dict.services.groups[service.groupKey as keyof typeof dict.services.groups] ?? dict.services.h1}</Eyebrow>
          <h1 className="mt-5 max-w-[24ch] text-white">{name}</h1>
          <p className="lead mt-4 max-w-2xl text-slate-300">{pick(locale, service.descriptionEn, service.descriptionFr)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="chip border-white/20 text-white">{pricing}</span>
            <ButtonLink href="#enquiry" variant="signal" size="sm">
              {dict.services.enquire}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2>{locale === "fr" ? "Ce que couvre ce service" : "What this service covers"}</h2>
            <div className="mt-4">
              <CheckList items={pick(locale, service.bulletsEn, service.bulletsFr)} />
            </div>
            <p className="mt-6 rounded-[var(--radius-md)] border border-line-200 bg-mist-50 p-4 text-[0.82rem] leading-relaxed text-slate-600">
              {dict.home.services.pricingNote}
            </p>
            <p className="mt-3 rounded-[var(--radius-md)] border border-signal-400/50 bg-signal-400/10 p-4 text-[0.82rem] leading-relaxed text-ink-900">
              {dict.common.notPolice}
            </p>
          </div>
          <div id="enquiry" className="rounded-[var(--radius-lg)] border border-line-200 bg-mist-50 p-5 sm:p-7">
            <h2 className="text-[1.4rem]">{dict.services.enquiryTitle}</h2>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-slate-600">{dict.services.enquiryBody}</p>
            <div className="mt-5">
              <ServiceEnquiryForm locale={locale} dict={dict} serviceSlug={pick(locale, service.slugEn, service.slugFr)} serviceName={name} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
