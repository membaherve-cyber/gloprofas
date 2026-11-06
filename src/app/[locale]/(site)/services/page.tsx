import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  GraduationCap,
  Landmark,
  User,
} from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import {
  Btn,
  IconTile,
  L,
  PageHero,
  R,
  Reveal,
} from "@/components/zite/shared";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "fr" ? "Services professionnels" : "Professional services",
    description: R(L.services.h2, locale),
    alternates: {
      canonical: `/${locale}/services`,
      languages: { en: "/en/services", fr: "/fr/services" },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;

  const groupImages = [
    "/images/context/person-phone-desk.jpg",
    "/images/context/executive-phone-laptop.jpg",
    "/images/context/team-laptops-office.jpg",
    "/images/context/university-seminar-hall.jpg",
  ] as const;

  const groups = [
    {
      Icon: User,
      t: fr ? "Protection des particuliers" : "Individual protection",
      items: fr
        ? [
            "Évaluations de sécurité numérique personnelle",
            "Évaluations d’exposition aux arnaques",
            "Conseils de sécurisation des comptes",
            "Consultations de prévention de la fraude",
            "Aide à comprendre une activité suspecte",
            "Éducation à la sécurité numérique",
          ]
        : [
            "Personal digital safety assessments",
            "Online scam exposure assessments",
            "Digital account security guidance",
            "Fraud prevention consultations",
            "Help understanding suspicious online activity",
            "Digital safety education",
          ],
    },
    {
      Icon: Building2,
      t: fr ? "Protection des entreprises" : "Business protection",
      items: fr
        ? [
            "Évaluations des risques de fraude",
            "Sensibilisation à la compromission de messagerie",
            "Programmes de sensibilisation à l’hameçonnage",
            "Sensibilisation des employés",
            "Politiques de prévention de la fraude",
            "Surveillance de l’usurpation de marque",
          ]
        : [
            "Business fraud risk assessments",
            "Business email compromise awareness",
            "Phishing awareness programmes",
            "Employee security awareness",
            "Fraud prevention policies",
            "Business impersonation monitoring",
          ],
    },
    {
      Icon: Landmark,
      t: fr ? "Entreprises et institutions" : "Enterprise and institutional",
      items: fr
        ? [
            "Programmes anti-fraude d’entreprise",
            "Formation à la cybersécurité",
            "Évaluations des risques numériques",
            "Programmes pour dirigeants",
            "Ateliers sur mesure",
            "Conseil en gestion des risques numériques",
          ]
        : [
            "Corporate anti-fraud awareness programmes",
            "Cybersecurity awareness training",
            "Digital fraud risk assessments",
            "Executive awareness programmes",
            "Customised fraud prevention workshops",
            "Digital risk management advisory",
          ],
    },
    {
      Icon: GraduationCap,
      t: fr
        ? "Formation et renforcement des capacités"
        : "Training and capacity building",
      items: fr
        ? [
            "Formation individuelle",
            "Formation en entreprise",
            "Ateliers institutionnels",
            "Sessions en ligne",
            "Programmes éducatifs",
            "Formules sur mesure",
          ]
        : [
            "Individual training",
            "Corporate training",
            "Institutional workshops",
            "Online awareness sessions",
            "Educational programmes",
            "Customised training packages",
          ],
    },
  ];

  return (
    <>
      <PageHero
        title={fr ? "Services professionnels" : "Professional services"}
        eyebrow={R(L.nav.services, locale)}
        lead={R(L.services.h2, locale)}
        image={PAGE_AERIAL_HEROES.servicesIndex.image}
        cityBadge={formatAerialBadge(PAGE_AERIAL_HEROES.servicesIndex.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: R(L.nav.services, locale) },
        ]}
      />

      <section className="bg-white pt-16">
        <div className="container-g">
          <div className="flex flex-col gap-4 rounded-[22px] border border-risk-low/40 bg-risk-low/5 p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-ink">
              <strong>{R(L.services.freeTag, locale)} :</strong>{" "}
              {fr
                ? "guides, alertes, signalement et ressources restent gratuits pour le public. Les services ci-dessous sont payants ou sur devis ; aucun tarif n’est fixé sans échange préalable."
                : "guides, alerts, reporting and resources stay free for the public. The services below are paid or by quotation; no price is set without a conversation first."}
            </p>
            <Btn href={l("/resources")} variant="outline">
              {R(L.services.freeCta, locale)}
            </Btn>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-g grid gap-6 md:grid-cols-2">
          {groups.map((g, idx) => (
            <Reveal
              key={g.t}
              delay={(idx % 2) * 60}
              className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-mist"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={groupImages[idx]}
                  alt={g.t}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <IconTile>
                  <g.Icon className="h-6 w-6" strokeWidth={1.5} />
                </IconTile>
                <h2 className="h3 mt-5 text-ink">{g.t}</h2>
                <ul className="mt-5 flex-1 space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="flex gap-3 text-slatex-600">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Btn href={`${l("/contact")}?topic=services`} variant="primary">
                    {fr ? "Demander un devis" : "Request a quotation"}
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
