import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, GraduationCap, Handshake } from "lucide-react";
import { getDictionary, isLocale, routes, type Locale } from "@/lib/i18n";
import { ButtonLink, CheckList, SectionHeading } from "@/components/ui";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/motion";
import { PageHero } from "@/components/zite/shared";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";
import { buildMetadata, SITE_DESCRIPTION } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/campaigns",
    title: dict.campaigns.h1,
    description: dict.campaigns.lead,
  });
}

const AUDIENCE_IMAGES = [
  "/images/context/lagos-lecture-hall.jpg",
  "/images/context/university-seminar-hall.jpg",
  "/images/context/accra-outdoor-phone.jpg",
  "/images/context/team-laptops-office.jpg",
] as const;

export default async function CampaignsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const hero = PAGE_AERIAL_HEROES.campaigns;

  return (
    <>
      <PageHero
        title={dict.campaigns.h1}
        eyebrow={dict.campaigns.eyebrow}
        lead={dict.campaigns.lead}
        image={hero.image}
        cityBadge={formatAerialBadge(hero.city, locale)}
        crumbs={[
          { label: locale === "fr" ? "Accueil" : "Home", to: routes.home(locale) },
          { label: dict.nav.about, to: routes.about(locale) },
          { label: dict.campaigns.eyebrow },
        ]}
      />

      <section className="section bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <h2 className="max-w-[24ch]">{dict.campaigns.introTitle}</h2>
            <p className="lead mt-4">{dict.campaigns.introBody}</p>
            <div className="mt-6 rounded-sm border border-line-200 bg-mist-50 p-5">
              <h3 className="flex items-center gap-2 text-lead">
                <CalendarClock size={18} className="text-blue-600" aria-hidden="true" />
                {dict.campaigns.topicsTitle}
              </h3>
              <div className="mt-3">
                <CheckList items={dict.campaigns.topics} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="grid gap-3 sm:grid-cols-2">
              {dict.campaigns.formats.map((format) => (
                <div key={format.title} className="rounded-sm border border-line-200 bg-white p-4">
                  <p className="flex items-center gap-2 text-body font-semibold text-ink-900">
                    <CheckCircle2 size={16} className="text-risk-low" aria-hidden="true" />
                    {format.title}
                  </p>
                  <p className="mt-1 text-small leading-relaxed text-slate-600">{format.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-sm bg-navy-900 p-5 text-white">
              <h3 className="flex items-center gap-2 text-lead text-white">
                <Handshake size={18} className="text-cyan-400" aria-hidden="true" />
                {dict.campaigns.inviteTitle}
              </h3>
              <p className="mt-2 text-small leading-relaxed text-slate-300">{dict.campaigns.inviteBody}</p>
              <ButtonLink href={routes.contact(locale)} variant="signal" size="sm" className="mt-4">
                {dict.campaigns.cta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-mist-50">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={dict.home.campaigns.audiencesLabel}
              title={dict.campaigns.audiencesTitle}
              lead={dict.campaigns.inviteBody}
            />
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {dict.campaigns.audiences.map((audience, index) => (
              <Reveal key={audience.title} delay={(index % 2) * 70}>
                <article className="group flex h-full flex-col border-t border-line pt-5">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-900">
                    <Media
                      src={AUDIENCE_IMAGES[index] ?? "/images/campaign-school.jpg"}
                      alt={audience.title}
                      width={900}
                      height={600}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      rounded="0"
                      className="h-full w-full transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-blue-600/10 text-blue-600">
                        <GraduationCap size={17} aria-hidden="true" />
                      </span>
                      <h3 className="text-title leading-snug text-ink-900">{audience.title}</h3>
                    </div>
                    <p className="text-base leading-relaxed text-slate-600">{audience.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 max-w-3xl rounded-sm border border-signal-400/50 bg-signal-400/10 p-4 text-small leading-relaxed text-ink-900">
            {dict.campaigns.note}
          </p>
        </div>
      </section>

      <section className="on-dark bg-band-dark py-14">
        <div className="container-page flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="max-w-[26ch] text-white">{dict.campaigns.inviteTitle}</h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300">{dict.campaigns.note}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={routes.contact(locale)} variant="signal">
              {dict.campaigns.cta}
            </ButtonLink>
            <ButtonLink href={routes.involved(locale)} variant="outline">
              {dict.nav.involved}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-page">
          <p className="text-small text-slate-600">
            {locale === "fr"
              ? "Vous cherchez une fiche à utiliser pendant une séance ? "
              : "Looking for a guide to use during a session? "}
            <Link href={routes.resources(locale)} className="link-arrow text-small">
              {dict.resources.h1} <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
