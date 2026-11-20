"use client";

/**
 * Resource Centre — guides, checklists, infographics, PDFs and videos
 * with format filters.
 */

import React, { useMemo, useState } from "react";
import { Check, FileText, CirclePlay, ImageIcon, ListChecks, FileBadge } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { R } from "@/lib/content/copy";
import { ZITE_CONTENT, type ZiteResource } from "@/lib/content/zite-data";
import { Btn, EmptyState, PageHero, Reveal } from "@/components/shared/ui";

const TYPE_ICONS: Record<string, typeof FileText> = {
  Guide: FileText,
  Checklist: ListChecks,
  Infographic: ImageIcon,
  PDF: FileBadge,
  Video: CirclePlay,
};

export function ResourcesView() {
  const { locale, t } = useI18n();
  const fr = locale === "fr";
  const [type, setType] = useState<string>("All");

  const resources = ZITE_CONTENT.resources;
  const types = useMemo(
    () => ["All", ...Array.from(new Set(resources.map((r: ZiteResource) => r.type)))],
    [resources]
  );
  const filtered = type === "All" ? resources : resources.filter((r: ZiteResource) => r.type === type);
  const featured = filtered.find((r: ZiteResource) => r.featured) ?? filtered[0];
  const rest = filtered.filter((r: ZiteResource) => r.id !== featured?.id);

  return (
    <>
      <PageHero
        eyebrow={fr ? "Ressources" : "Resources"}
        title={t("resources.h1")}
        lead={t("resources.lead")}
        image="/images/context/notebook-smartphone-notes.jpg"
        imageAlt={fr ? "Carnet et smartphone pour la vérification avant paiement" : "Notebook and smartphone for pre-payment verification"}
      />

      <section className="section-y bg-white">
        <div className="container-g">
          {/* Filters */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label={fr ? "Filtrer par format" : "Filter by format"}>
              {types.map((ty) => (
                <button
                  key={ty}
                  type="button"
                  onClick={() => setType(ty)}
                  aria-pressed={type === ty}
                  className={`h-10 rounded-full border px-4 font-heading text-[13px] font-semibold capitalize transition-colors ${
                    type === ty
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-line-200 text-slatex-600 hover:border-brand-500/60 hover:text-brand-600"
                  }`}
                >
                  {ty === "All" ? (fr ? "Tous" : "All") : ty}
                </button>
              ))}
            </div>
          </Reveal>

          {featured ? (
            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              {/* Featured */}
              <Reveal className="lg:col-span-5">
                <article className="card-g hoverable h-full overflow-hidden">
                  <img
                    src={featured.imageUrl}
                    alt={fr ? `Ressource : ${R(featured.title, "fr")}` : `Resource: ${R(featured.title, "en")}`}
                    width={1344}
                    height={768}
                    loading="lazy"
                    className="img-editorial aspect-video w-full object-cover"
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="chip-g bg-brand-50 text-brand-600">{featured.type}</span>
                      <span className="text-[12px] font-semibold uppercase tracking-wide text-signal-600">
                        {fr ? "À la une" : "Featured"}
                      </span>
                    </div>
                    <h2 className="h3-g mt-3">{R(featured.title, locale)}</h2>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-slatex-600">
                      {R(featured.description, locale)}
                    </p>
                    <p className="mt-4 text-[12.5px] text-slatex-400">
                      {featured.language}
                      {featured.fileSize ? ` · ${featured.fileSize}` : ""}
                    </p>
                  </div>
                </article>
              </Reveal>

              {/* List */}
              <div className="lg:col-span-7">
                <ul className="divide-y divide-line-200">
                  {rest.map((r: ZiteResource, i: number) => {
                    const Icon = TYPE_ICONS[r.type] ?? FileText;
                    return (
                      <Reveal key={r.id} delay={i * 60}>
                        <li>
                          <article className="group flex items-start gap-4 py-5">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist-50 text-brand-600 ring-1 ring-line-200">
                              <Icon size={18} strokeWidth={1.9} aria-hidden />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <span className="chip-g bg-mist-50 text-slatex-600">{r.type}</span>
                                <span className="text-[12px] text-slatex-400">
                                  {r.language}
                                  {r.fileSize ? ` · ${r.fileSize}` : ""}
                                </span>
                              </div>
                              <h3 className="mt-1.5 font-heading text-[15px] font-semibold text-ink-900">
                                {R(r.title, locale)}
                              </h3>
                              <p className="mt-1 text-[13.5px] leading-relaxed text-slatex-600">
                                {R(r.description, locale)}
                              </p>
                            </div>
                          </article>
                        </li>
                      </Reveal>
                    );
                  })}
                </ul>

                <Reveal delay={280}>
                  <div className="on-dark mt-6 rounded-2xl bg-navy-950 p-7">
                    <p className="eyebrow mb-3">{fr ? "Accès libre" : "Open access"}</p>
                    <h3 className="h3-g text-white">
                      {fr ? "Gratuit, bilingue, sans inscription." : "Free, bilingual, no account required."}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {[
                        {
                          en: "Every guide, checklist and alert is free to read and share",
                          fr: "Chaque guide, liste et alerte est libre d'accès et de partage",
                        },
                        {
                          en: "Available in English and French",
                          fr: "Disponible en anglais et en français",
                        },
                        {
                          en: "Written for everyday readers, not specialists",
                          fr: "Écrit pour tous, pas pour les spécialistes",
                        },
                      ].map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[14px] text-slatex-300">
                          <Check size={15} className="mt-1 shrink-0 text-cyanx-500" aria-hidden />
                          {R(f, locale)}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Btn href="/scams" variant="outlineDark" size="sm">
                        {fr ? "Explorer les guides" : "Explore the guides"}
                      </Btn>
                      <Btn href="/get-involved" variant="outlineDark" size="sm">
                        {fr ? "Aider la mission" : "Support the mission"}
                      </Btn>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState>
                {fr ? "Aucune ressource pour ce format." : "No resources for this format."}
              </EmptyState>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
