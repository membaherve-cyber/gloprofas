"use client";

/**
 * About GLOPROFAS — who we are, mission, vision, objectives, approach,
 * campaigns overview, geography, governance, what we do not do.
 */

import React from "react";
import { Compass, Eye, HeartHandshake, Megaphone, ShieldCheck, Ban } from "lucide-react";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { Reveal, Btn, LinkG, PageHero, Masthead } from "@/components/shared/ui";

interface ApproachItem {
  title: string;
  body: string;
}

export function AboutView() {
  const { t, tArr, tRaw, locale } = useI18n();
  const fr = locale === "fr";

  const approach = (tRaw("about.approach") as ApproachItem[]) ?? [];
  const objectives = tArr("about.objectives");
  const disclaimers = tArr("about.disclaimer");

  return (
    <>
      <PageHero
        eyebrow={fr ? "À propos" : "About"}
        title={t("about.h1")}
        lead={t("about.lead")}
        image="/images/gen/about-workshop.jpg"
        imageAlt={fr ? "Atelier de sensibilisation GLOPROFAS" : "GLOPROFAS awareness workshop"}
      />

      {/* Who we are */}
      <section className="section-y bg-white">
        <div className="container-g grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Masthead num="01" eyebrow={t("about.whoTitle")} />
              <p className="lead-g mt-6 text-[1.05rem] leading-relaxed">{t("about.whoBody")}</p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <Reveal delay={80}>
                <div className="card-g h-full p-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Compass size={20} strokeWidth={1.9} aria-hidden />
                  </span>
                  <h2 className="h3-g text-[1.1rem]">{t("about.missionTitle")}</h2>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-slatex-600">
                    {t("about.missionBody")}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="card-g h-full p-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Eye size={20} strokeWidth={1.9} aria-hidden />
                  </span>
                  <h2 className="h3-g text-[1.1rem]">{t("about.visionTitle")}</h2>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-slatex-600">
                    {t("about.visionBody")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="card-g overflow-hidden">
                <img
                  src="/images/gen/campaign-school.jpg"
                  alt={fr ? "Un animateur sensibilise des jeunes à la sécurité en ligne dans une école" : "A speaker educates young people about online safety in a school"}
                  width={1344}
                  height={768}
                  loading="lazy"
                  className="img-editorial aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-y bg-mist-50">
        <div className="container-g">
          <Reveal>
            <Masthead num="02" eyebrow={t("about.objectivesTitle")} />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {objectives.map((obj, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card-g hoverable flex h-full items-start gap-4 p-5">
                  <span className="mast-num pt-0.5 text-[15px]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[14.5px] font-medium leading-snug text-ink-900">{obj}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-y bg-white">
        <div className="container-g">
          <Reveal>
            <Masthead num="03" eyebrow={t("about.approachTitle")} />
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {approach.map((a, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card-g hoverable h-full p-6">
                  <span className="mast-num text-[22px]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h3-g mt-3 text-[1.05rem]">{a.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slatex-600">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns overview */}
      <section className="on-dark section-y bg-navy-950">
        <div className="container-g grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Masthead num="04" eyebrow={t("about.campaignsTitle")} dark />
              <h2 className="h2-g mt-6 text-white">{t("campaigns.h1")}</h2>
              <p className="lead-g mt-4">{t("about.campaignsBody")}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn href="/activities" variant="signal">
                  <Megaphone size={16} aria-hidden />
                  {t("about.campaignsCta")}
                </Btn>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { img: "/images/gen/campaign-school.jpg", alt: fr ? "Sensibilisation en milieu scolaire" : "School awareness session" },
                  { img: "/images/gen/campaign-seminar.jpg", alt: fr ? "Séminaire professionnel de prévention de la fraude" : "Professional fraud prevention seminar" },
                  { img: "/images/context/campaign-community.jpg", alt: fr ? "Forum communautaire" : "Community forum" },
                  { img: "/images/context/campaign-corporate.jpg", alt: fr ? "Formation en entreprise" : "Corporate training" },
                ].map((im, i) => (
                   
                  <img
                    key={i}
                    src={im.img}
                    alt={im.alt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="img-editorial aspect-[4/3] w-full rounded-xl object-cover ring-1 ring-white/10"
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Geography + governance */}
      <section className="section-y bg-white">
        <div className="container-g grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="card-g h-full p-7">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <ShieldCheck size={20} strokeWidth={1.9} aria-hidden />
              </span>
              <h2 className="h3-g">{t("about.geographyTitle")}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-slatex-600">
                {t("about.geographyBody")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card-g h-full p-7">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <HeartHandshake size={20} strokeWidth={1.9} aria-hidden />
              </span>
              <h2 className="h3-g">{t("about.governanceTitle")}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-slatex-600">
                {t("about.governanceBody")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we do not do */}
      <section className="section-y bg-mist-50">
        <div className="container-g">
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-2xl border-l-4 border-risk-critical/70 bg-white p-7 shadow-e1 lg:p-9">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d23434]/10 text-[#a52222]">
                  <Ban size={19} strokeWidth={2} aria-hidden />
                </span>
                <h2 className="h3-g">{t("about.disclaimerTitle")}</h2>
              </div>
              <ul className="mt-5 space-y-3">
                {disclaimers.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-700">
                    <Ban size={15} className="mt-1 shrink-0 text-[#a52222]" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-10 text-center">
            <LinkG href="/activities">{t("about.campaignsCta")}</LinkG>
          </Reveal>
        </div>
      </section>
    </>
  );
}
