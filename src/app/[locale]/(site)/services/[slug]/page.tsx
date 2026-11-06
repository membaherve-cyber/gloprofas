import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, pick, routes, type Locale } from "@/lib/i18n";
import { getService } from "@/lib/queries";
import { ButtonLink, CheckList } from "@/components/ui";
import { ServiceEnquiryForm } from "@/components/site/forms";
import { PageHero } from "@/components/zite/shared";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";

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
  const hero = PAGE_AERIAL_HEROES.serviceDetail;

  return (
    <>
      <PageHero
        title={name}
        eyebrow={dict.services.groups[service.groupKey as keyof typeof dict.services.groups] ?? dict.services.h1}
        lead={pick(locale, service.descriptionEn, service.descriptionFr)}
        image={hero.image}
        cityBadge={formatAerialBadge(hero.city, locale)}
        crumbs={[
          { label: locale === "fr" ? "Accueil" : "Home", to: routes.home(locale) },
          { label: dict.services.h1, to: routes.services(locale) },
          { label: name },
        ]}
      />

      <section className="section bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-6 overflow-hidden rounded-sm border border-line-200 shadow-e1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/context/team-laptops-office.jpg"
                alt={name}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="chip">{pricing}</span>
              <ButtonLink href="#enquiry" variant="signal" size="sm">
                {dict.services.enquire}
              </ButtonLink>
            </div>
            <h2>{locale === "fr" ? "Ce que couvre ce service" : "What this service covers"}</h2>
            <div className="mt-4">
              <CheckList items={pick(locale, service.bulletsEn, service.bulletsFr)} />
            </div>
            <p className="mt-6 rounded-sm border border-line-200 bg-mist-50 p-4 text-[0.82rem] leading-relaxed text-slate-600">
              {dict.home.services.pricingNote}
            </p>
            <p className="mt-3 rounded-sm border border-signal-400/50 bg-signal-400/10 p-4 text-[0.82rem] leading-relaxed text-ink-900">
              {dict.common.notPolice}
            </p>
          </div>
          <div id="enquiry" className="rounded-none border border-line-200 bg-mist-50 p-5 sm:p-7">
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
