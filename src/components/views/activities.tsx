"use client";

/**
 * Activities and programmes — campaigns, seminars and forums.
 * Audiences, topics, session format, invitation request.
 */

import React, { useState } from "react";
import { Building2, CalendarClock, Check, Church, GraduationCap, Megaphone, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal, Btn, LinkG, PageHero, Masthead } from "@/components/shared/ui";

interface Titled {
  title: string;
  body: string;
}

const AUDIENCE_ICONS = [GraduationCap, Church, Users, Building2];

export function ActivitiesView() {
  const { t, tArr, tRaw, locale } = useI18n();
  const fr = locale === "fr";

  const audiences = (tRaw("campaigns.audiences") as Titled[]) ?? [];
  const topics = tArr("campaigns.topics");
  const formats = (tRaw("campaigns.formats") as Titled[]) ?? [];

  const images = [
    { img: "/images/gen/campaign-school.jpg", key: "school" },
    { img: "/images/gen/about-workshop.jpg", key: "community" },
    { img: "/images/context/campaign-youth.jpg", key: "youth" },
    { img: "/images/context/campaign-corporate.jpg", key: "corporate" },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("campaigns.eyebrow")}
        title={t("campaigns.h1")}
        lead={t("campaigns.lead")}
        image="/images/gen/campaign-seminar.jpg"
        imageAlt={fr ? "Séminaire de prévention de la fraude financière" : "Financial fraud prevention seminar"}
      >
        <div className="flex flex-wrap gap-3">
          <Btn href="/contact" variant="signal">
            <CalendarClock size={16} aria-hidden />
            {t("campaigns.cta")}
          </Btn>
          <Btn href="/scams" variant="outlineDark">
            {t("campaigns.ctaSecondary")}
          </Btn>
        </div>
      </PageHero>

      {/* Intro */}
      <section className="section-y bg-white">
        <div className="container-g grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Masthead num="01" eyebrow={t("campaigns.introTitle")} />
              <p className="lead-g mt-6 text-[1.02rem] leading-relaxed">{t("campaigns.introBody")}</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-8 rounded-xl border-l-4 border-signal-500 bg-signal-100/60 px-5 py-4 text-[13.5px] leading-relaxed text-ink-700">
                {t("campaigns.note")}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="card-g overflow-hidden">
                <img
                  src="/images/gen/about-workshop.jpg"
                  alt={fr ? "Animateur communal an atelier de sensibilisation aux arnaques au Cameroun" : "Community facilitator at an anti-scam awareness workshop in Cameroon"}
                  width={1344}
                  height={768}
                  loading="lazy"
                  className="img-editorial aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="section-y bg-mist-50">
        <div className="container-g">
          <Reveal>
            <Masthead num="02" eyebrow={t("campaigns.audiencesTitle")} />
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {audiences.map((a, i) => {
              const Icon = AUDIENCE_ICONS[i % AUDIENCE_ICONS.length];
              const im = images[i % images.length];
              return (
                <Reveal key={i} delay={i * 80}>
                  <article className="card-g hoverable h-full overflow-hidden">
                    <div className="relative">
                      <img
                        src={im.img}
                        alt={fr ? `Session de sensibilisation : ${a.title}` : `Awareness session: ${a.title}`}
                        width={1200}
                        height={900}
                        loading="lazy"
                        className="img-editorial aspect-[16/9] w-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                          <Icon size={18} strokeWidth={1.9} aria-hidden />
                        </span>
                        <h3 className="h3-g text-[1.08rem]">{a.title}</h3>
                      </div>
                      <p className="mt-3 text-[14px] leading-relaxed text-slatex-600">{a.body}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="on-dark section-y bg-navy-950">
        <div className="container-g grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Masthead num="03" eyebrow={t("campaigns.topicsTitle")} dark />
              <h2 className="h2-g mt-6 text-white">
                {fr ? "Des thèmes concrets, adaptés à chaque public." : "Concrete themes, adapted to each audience."}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-1">
              {topics.map((topic, i) => (
                <Reveal key={i} delay={i * 50}>
                  <li className="flex items-start gap-4 border-b border-white/10 py-4 last:border-0">
                    <span className="mast-num pt-0.5 text-[14px]">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[14.5px] leading-relaxed text-slatex-300">{topic}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Format */}
      <section className="section-y bg-white">
        <div className="container-g">
          <Reveal>
            <Masthead num="04" eyebrow={t("campaigns.formatTitle")} />
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((f, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="card-g hoverable h-full p-6">
                  <span className="mast-num text-[22px]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h3-g mt-3 text-[1.02rem]">{f.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slatex-600">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Invitation */}
      <section className="section-y bg-mist-50">
        <div className="container-g">
          <Reveal>
            <div className="on-dark relative overflow-hidden rounded-2xl bg-navy-950 px-7 py-12 lg:px-14 lg:py-16">
              <div className="absolute inset-0" aria-hidden>
                <img
                  src="/images/gen/campaign-seminar.jpg"
                  alt=""
                  className="img-editorial h-full w-full object-cover opacity-20"
                />
                <div className="absolute inset-0 hero-scrim" />
              </div>
              <div className="relative max-w-2xl">
                <p className="eyebrow mb-4">{t("campaigns.inviteTitle")}</p>
                <h2 className="h2-g text-white">
                  {fr ? "Faites venir la sensibilisation chez vous." : "Bring awareness to where you are."}
                </h2>
                <p className="lead-g mt-4">{t("campaigns.inviteBody")}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Btn href="/contact" variant="signal">
                    <Megaphone size={16} aria-hidden />
                    {t("campaigns.cta")}
                  </Btn>
                  <Btn href="/get-involved" variant="outlineDark">
                    {fr ? "S'impliquer" : "Get involved"}
                  </Btn>
                </div>
                <p className="mt-6 flex items-start gap-2 text-[12.5px] text-slatex-400">
                  <Check size={14} className="mt-0.5 shrink-0 text-cyanx-500" aria-hidden />
                  {fr
                    ? "Aucun frais n'est demandé pour assister à une session publique."
                    : "No fee is ever charged to attend a public session."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
