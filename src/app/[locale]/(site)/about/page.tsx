import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  Compass,
  Eye,
  GraduationCap,
  Handshake,
  Megaphone,
  Scale,
  Target,
} from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { IconTile, PageHero, Reveal, SectionHeading } from "@/components/zite/shared";
import { L, R } from "@/components/zite/copy";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "fr" ? "À propos de GLOPROFAS" : "About GLOPROFAS",
    description: R(L.intro.body, locale),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: "/en/about", fr: "/fr/about" },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;

  const objectives = fr
    ? [
        "Sensibiliser le public",
        "Éduquer les communautés",
        "Améliorer la détection des arnaques",
        "Promouvoir un comportement numérique responsable",
        "Orienter les victimes de façon appropriée",
        "Encourager le signalement des activités suspectes",
        "Aider les entreprises à comprendre les risques de fraude",
        "Promouvoir les bonnes pratiques de sécurité numérique",
        "Faciliter un partage d’informations responsable",
      ]
    : [
        "Increase public awareness",
        "Educate communities",
        "Improve scam detection",
        "Promote responsible digital behaviour",
        "Support victims with appropriate guidance",
        "Encourage reporting of suspicious activity",
        "Help businesses understand fraud risks",
        "Promote digital safety practices",
        "Facilitate responsible information sharing",
      ];

  const approach = [
    [Megaphone, fr ? "Sensibilisation" : "Awareness"],
    [GraduationCap, fr ? "Éducation" : "Education"],
    [Eye, fr ? "Prévention" : "Prevention"],
    [AlertCircle, fr ? "Signalement" : "Reporting"],
    [Compass, fr ? "Orientation" : "Guidance"],
    [Handshake, "Collaboration"],
    [Briefcase, fr ? "Assistance professionnelle" : "Professional assistance"],
  ] as const;

  const campaigns = [
    ["/images/context/lagos-lecture-hall.jpg", fr ? "Écoles & universités" : "Schools & universities"],
    ["/images/context/university-seminar-hall.jpg", fr ? "Églises & communautés" : "Churches & faith communities"],
    [
      "/images/context/accra-outdoor-phone.jpg",
      fr ? "Centres de jeunesse" : "Youth centres",
    ],
    ["/images/context/team-laptops-office.jpg", fr ? "Entreprises & PME" : "Companies & SMEs"],
  ] as const;

  return (
    <>
      <PageHero
        title={fr ? "À propos de GLOPROFAS" : "About GLOPROFAS"}
        eyebrow={fr ? "Qui sommes-nous" : "Who we are"}
        lead={R(L.intro.body, locale)}
        image={PAGE_AERIAL_HEROES.about.image}
        cityBadge={formatAerialBadge(PAGE_AERIAL_HEROES.about.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: R(L.nav.about, locale) },
        ]}
      />

      <section className="section-y bg-white">
        <div className="container-g grid items-center gap-14 lg:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width={1600} height={900}
            src="/images/zite/img_rV5DNdwu0nwwIUqR.jpg"
            alt=""
            loading="lazy"
            className="aspect-square w-full rounded-none object-cover shadow-none"
          />
          <div className="space-y-10">
            <Reveal>
              <IconTile>
                <Target className="h-6 w-6" strokeWidth={1.5} />
              </IconTile>
              <h2 className="h3 mt-4 text-ink">Mission</h2>
              <p className="mt-3 text-slatex-600">
                {fr
                  ? "Prévenir les arnaques, protéger les particuliers et les entreprises, promouvoir la sécurité numérique, éduquer les communautés et soutenir une action coordonnée contre la fraude en ligne."
                  : "Prevent scams, protect individuals and businesses, promote digital safety, educate communities and support coordinated action against online fraud."}
              </p>
            </Reveal>

            <Reveal>
              <IconTile>
                <Eye className="h-6 w-6" strokeWidth={1.5} />
              </IconTile>
              <h2 className="h3 mt-4 text-ink">Vision</h2>
              <p className="mt-3 text-slatex-600">
                {fr
                  ? "Un environnement numérique plus sûr, où particuliers et organisations participent à la vie numérique avec davantage de vigilance et de confiance."
                  : "A safer digital environment where individuals and organisations can take part in digital life with greater awareness and confidence."}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y bg-mist">
        <div className="container-g">
          <SectionHeading
            eyebrow={fr ? "Campagnes et séminaires" : "Campaigns and seminars"}
            title={
              fr
                ? "Sur le terrain, au cœur des communautés."
                : "On the ground, in the heart of communities."
            }
          />
          <Reveal>
            <p className="mt-5 max-w-3xl text-lg text-slatex-600">
              {fr
                ? "GLOPROFAS mène des campagnes anti-arnaque, des séminaires et des forums dans diverses organisations — écoles, églises, centres de jeunesse et entreprises — afin de sensibiliser le public aux menaces, aux risques et aux conséquences de toutes les formes de fraude, avec une attention particulière aux escroqueries modernes."
                : "GLOPROFAS leads anti-scam campaigns, seminars and forums in various organisations — including schools, churches, youth centres and companies — to sensitise the public on the threats, risks and consequences associated with all manners of fraud, with a particular focus on modern-day scamming schemes."}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {campaigns.map(([src, label], idx) => (
              <Reveal key={label} delay={idx * 60}>
                <figure className="bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img width={1600} height={900}
                    src={src}
                    alt={label}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <figcaption className="ed-caption font-[family-name:var(--font-heading)] font-medium text-ink">
                    {label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark section-y bg-navy-900">
        <div className="container-g">
          <SectionHeading
            dark
            eyebrow={fr ? "Objectifs" : "Objectives"}
            title={
              fr
                ? "Ce que nous voulons accomplir."
                : "What we set out to achieve."
            }
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {objectives.map((item, idx) => (
              <Reveal key={idx} delay={(idx % 3) * 60}>
                <li className="dark-surface flex h-full gap-3 rounded-sm bg-navy-800 p-5 text-white">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyanx" />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-mist">
        <div className="container-g">
          <SectionHeading
            eyebrow={fr ? "Approche" : "Approach"}
            title={
              fr
                ? "Sept leviers, une même exigence."
                : "Seven levers, one standard."
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map(([Icon, label], idx) => (
              <Reveal key={label} delay={(idx % 4) * 60}>
                <div className="flex h-full items-center gap-4 rounded-sm border border-line bg-white p-5">
                  <IconTile>
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </IconTile>
                  <span className="font-[family-name:var(--font-heading)] font-semibold text-ink">
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-g grid gap-10 lg:grid-cols-2">
          <Reveal className="rounded-none bg-mist p-8">
            <Compass className="h-8 w-8 text-brand-600" strokeWidth={1.5} />
            <h2 className="h3 mt-4 text-ink">
              {fr ? "Zone géographique" : "Geographic focus"}
            </h2>
            <p className="mt-3 text-slatex-600">
              {fr
                ? "Une initiative mondiale portant une attention particulière aux marchés africains, notamment l’Afrique centrale, l’Afrique de l’Ouest et le Cameroun. Cette orientation ne signifie pas une présence physique dans ces pays."
                : "A global initiative with particular attention to African markets, especially Central Africa, West Africa and Cameroon. This focus does not imply offices or operations in any specific country."}
            </p>
          </Reveal>

          <Reveal className="rounded-none bg-mist p-8">
            <Scale className="h-8 w-8 text-brand-600" strokeWidth={1.5} />
            <h2 className="h3 mt-4 text-ink">
              {fr ? "Gouvernance et transparence" : "Governance and transparency"}
            </h2>
            <p className="mt-3 text-slatex-600">
              {fr
                ? "Les informations sur la direction, la gouvernance, les politiques et les rapports annuels seront publiées ici dès qu’elles seront confirmées. GLOPROFAS n’est affilié à aucun gouvernement ni à aucune autorité policière."
                : "Information on leadership, governance, policies and annual reports will be published here once confirmed. GLOPROFAS is not affiliated with any government or law enforcement authority."}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
