"use client";

/**
 * Our Team — GLOPROFAS leadership and professional team presentation.
 *
 * Institutional team page built on the site's design system:
 *   · PageHero introduction ("Meet Our Team")
 *   · Leadership tier — CEO featured prominently, Vice President and
 *     Secretary General as large portrait cards
 *   · Professional tier — officers in a balanced, constrained grid
 *   · Closing statement band
 *
 * Names and official designations are carried verbatim from the
 * member photographs' filenames. Portraits are the actual uploaded
 * photographs (public/images/team/), uniformly cropped 4:5.
 */

import React from "react";
import { ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal, Btn, PageHero, Masthead, SectionHeading } from "@/components/shared/ui";

/* ---------------- Team data (verbatim names & designations) ---------------- */

interface Member {
  name: string;
  role: string;
  img: string;
}

const CEO: Member = {
  name: "Oscar Munimang",
  role: "CEO",
  img: "/images/team/oscar-munimang.jpg",
};

const LEADERSHIP: Member[] = [
  { name: "Stephanie Tum", role: "Vice President", img: "/images/team/stephanie-tum.jpg" },
  { name: "Musing Derick Tenn", role: "Secretary General", img: "/images/team/musing-derick-tenn.jpg" },
];

const PROFESSIONALS: Member[] = [
  { name: "Njaha Herve", role: "Information and Technology Officer", img: "/images/team/njaha-herve.jpg" },
  { name: "Afongang Vivian", role: "Public Relations Officer", img: "/images/team/afongang-vivian.jpg" },
];

const alt = (m: Member) => `${m.name}, ${m.role}, GLOPROFAS`;

/* ---------------- Portrait cards ---------------- */

/** Standard member card — portrait, name, verbatim designation. */
function MemberCard({ member, delay = 0 }: { member: Member; delay?: number }) {
  return (
    <Reveal delay={delay} className="mx-auto w-full max-w-[360px] sm:max-w-none">
      <article className="card-g hoverable group h-full overflow-hidden">
        <div className="overflow-hidden">
          <img
            src={member.img}
            alt={alt(member)}
            width={880}
            height={1100}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          />
        </div>
        <div className="p-6">
          <h3 className="font-heading text-[19px] font-semibold leading-tight text-ink-900">
            {member.name}
          </h3>
          <p className="mt-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-cyanx-600">
            {member.role}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------------- View ---------------- */

export function TeamView() {
  const { locale } = useI18n();
  const fr = locale === "fr";

  return (
    <>
      {/* ═══ A · PAGE INTRODUCTION ═══ */}
      <PageHero
        eyebrow={fr ? "Notre équipe" : "Our Team"}
        title={fr ? "Rencontrez notre équipe" : "Meet Our Team"}
        lead={
          fr
            ? "Derrière GLOPROFAS se trouve une équipe engagée à bâtir un environnement numérique plus sûr par la sensibilisation, la collaboration, la recherche et l’action contre les arnaques et la fraude en ligne."
            : "Behind GLOPROFAS is a team committed to building a safer digital environment through awareness, collaboration, research and action against scams and online fraud."
        }
        image="/images/context/urban-professional.jpg"
        imageAlt={
          fr
            ? "Professionnelle africaine en tenue de travail marchant en ville au crépuscule"
            : "African professional in work attire walking through a city at dusk"
        }
        breadcrumb={[
          { label: fr ? "À propos" : "About", href: "/about" },
          { label: fr ? "Notre équipe" : "Our Team" },
        ]}
      />

      {/* ═══ B · LEADERSHIP TEAM ═══ */}
      <section className="section-y bg-white">
        <div className="container-g">
          <Masthead
            num="01"
            eyebrow={fr ? "Équipe de direction" : "Leadership Team"}
          />
          <SectionHeading
            className="mt-6"
            title={fr ? "La direction" : "Senior leadership"}
            lead={
              fr
                ? "L’équipe de direction définit l’orientation stratégique de GLOPROFAS et garantit l’intégrité de sa mission auprès des institutions et des partenaires."
                : "The leadership team sets GLOPROFAS’ strategic direction and safeguards the integrity of its mission with institutions and partners."
            }
          />

          {/* Chief Executive Officer — featured */}
          <Reveal className="mt-10">
            <article className="card-g hoverable group overflow-hidden">
              <div className="grid md:grid-cols-12">
                <div className="overflow-hidden md:col-span-4">
                  <img
                    src={CEO.img}
                    alt={alt(CEO)}
                    width={880}
                    height={1100}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] md:aspect-auto md:h-full md:min-h-[440px]"
                  />
                </div>
                <div className="on-dark flex flex-col justify-center bg-navy-950 p-8 md:col-span-8 md:p-12 lg:p-14">
                  <p className="eyebrow flex items-center gap-2.5 text-cyanx-500">
                    <ShieldCheck size={14} strokeWidth={2.2} aria-hidden />
                    {fr ? "Direction exécutive" : "Executive leadership"}
                  </p>
                  <h3 className="h2-g mt-4 max-w-[14ch] text-white">{CEO.name}</h3>
                  <p className="mt-3 text-[clamp(1.05rem,1rem+0.35vw,1.3rem)] font-semibold text-cyanx-500">
                    {CEO.role}
                  </p>
                  <div className="mt-7 h-px w-16 bg-white/20" aria-hidden />
                  <p className="mt-5 max-w-md text-[13.5px] leading-relaxed text-white/75">
                    {fr
                      ? "Global Programme for the Fight Against Scams — un programme international de lutte contre les arnaques, la fraude et la cybercriminalité."
                      : "Global Programme for the Fight Against Scams — an international programme against scams, fraud and cybercrime."}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Vice President & Secretary General */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {LEADERSHIP.map((m, i) => (
              <MemberCard key={m.name} member={m} delay={80 + i * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ C · OUR PROFESSIONAL TEAM ═══ */}
      <section className="section-y bg-mist-50">
        <div className="container-g">
          <Masthead
            num="02"
            eyebrow={fr ? "Notre équipe professionnelle" : "Our Professional Team"}
          />
          <SectionHeading
            className="mt-6"
            title={fr ? "Expertise spécialisée" : "Specialist expertise"}
            lead={
              fr
                ? "Des spécialistes pilotent les travaux techniques et de communication du programme, au service du public et des institutions."
                : "Specialists lead the programme’s technical and communication work, in service of the public and institutions."
            }
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {PROFESSIONALS.map((m, i) => (
              <MemberCard key={m.name} member={m} delay={i * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ D · CLOSING ═══ */}
      <section className="on-dark bg-navy-900">
        <div className="container-g flex flex-col items-center py-16 text-center sm:py-20">
          <Reveal>
            <h2 className="h2-g mx-auto max-w-2xl text-white">
              {fr
                ? "Ensemble, nous pouvons bâtir un monde numérique plus sûr."
                : "Together, We Can Build a Safer Digital World."}
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/85">
              {fr
                ? "La lutte contre les arnaques exige une responsabilité collective, des connaissances et une action coordonnée. Notre équipe œuvre pour donner aux individus, aux communautés et aux institutions les moyens de reconnaître, de prévenir et de répondre aux activités frauduleuses."
                : "Fighting scams requires collective responsibility, knowledge and coordinated action. Our team works towards empowering individuals, communities and institutions to recognise, prevent and respond to fraudulent activities."}
            </p>
          </Reveal>
          <Reveal delay={200} className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn href="/report" variant="signal">
              {fr ? "Signaler une arnaque" : "Report a Scam"}
            </Btn>
            <Btn href="/contact" variant="outlineDark">
              {fr ? "Nous contacter" : "Contact Us"}
            </Btn>
          </Reveal>
        </div>
      </section>
    </>
  );
}
