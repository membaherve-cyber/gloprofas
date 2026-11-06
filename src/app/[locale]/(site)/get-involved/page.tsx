import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Handshake, HeartHandshake, Users } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import {
  Btn,
  IconTile,
  PageHero,
  Reveal,
} from "@/components/zite/shared";
import { L } from "@/lib/zite-copy";

import { R } from "@/lib/zite-copy";

import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "fr" ? "S’impliquer" : "Get involved",
    description: R(L.final.h2, locale),
    alternates: {
      canonical: `/${locale}/get-involved`,
      languages: { en: "/en/get-involved", fr: "/fr/get-involved" },
    },
  };
}

export default async function GetInvolvedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;

  const cards = [
    {
      Icon: Users,
      image: "/images/context/accra-outdoor-phone.jpg",
      t: fr ? "Devenir bénévole" : "Volunteer",
      d: fr
        ? "Partagez vos compétences en communication, technologie, droit ou éducation pour aider à prévenir les arnaques."
        : "Share your skills in communications, technology, law or education to help prevent scams.",
      topic: "volunteer",
    },
    {
      Icon: Handshake,
      image: "/images/context/team-laptops-office.jpg",
      t: fr ? "Devenir partenaire" : "Partner with us",
      d: fr
        ? "ONG, établissements d’enseignement, entreprises, institutions financières, entreprises technologiques et organisations communautaires."
        : "NGOs, educational institutions, businesses, financial institutions, technology companies and community organisations.",
      topic: "partnership",
    },
    {
      Icon: HeartHandshake,
      image: "/images/context/lagos-lecture-hall.jpg",
      t: fr ? "Soutenir notre mission" : "Support our mission",
      d: fr
        ? "Les modalités de soutien seront publiées ici une fois confirmées. Contactez-nous pour en discuter."
        : "Ways to support will be published here once confirmed. Contact us to discuss how you can help.",
      topic: "general",
    },
  ];

  return (
    <>
      <PageHero
        title={fr ? "S’impliquer" : "Get involved"}
        eyebrow={R(L.nav.involved, locale)}
        lead={R(L.final.h2, locale)}
        image={PAGE_AERIAL_HEROES.getInvolved.image}
        cityBadge={formatAerialBadge(PAGE_AERIAL_HEROES.getInvolved.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: R(L.nav.involved, locale) },
        ]}
      />

      <section className="section-y bg-white">
        <div className="container-g grid gap-6 md:grid-cols-3">
          {cards.map((c, idx) => (
            <Reveal
              key={c.t}
              delay={idx * 60}
              className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-mist"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.t}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/65 via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <IconTile>
                  <c.Icon className="h-6 w-6" strokeWidth={1.5} />
                </IconTile>
                <h2 className="h3 mt-5 text-ink">{c.t}</h2>
                <p className="mt-3 flex-1 text-slatex-600">{c.d}</p>
                <div className="mt-7">
                  <Btn href={`${l("/contact")}?topic=${c.topic}`} variant="primary">
                    {R(L.nav.contact, locale)}
                  </Btn>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
