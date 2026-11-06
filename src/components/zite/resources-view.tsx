"use client";

import { useState } from "react";
import {
  BookOpen,
  Download,
  FileText,
  Film,
  Image as ImageIcon,
  ListChecks,
  type LucideIcon,
} from "lucide-react";
import { IconTile, PageHero, Reveal } from "@/components/zite/shared";
import { L, R } from "@/components/zite/copy";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";
import { ZITE_CONTENT, type ZiteResource } from "@/lib/zite-data";
import type { Locale } from "@/lib/i18n";

const TYPE_ICONS: Record<string, LucideIcon> = {
  Guide: BookOpen,
  Checklist: ListChecks,
  PDF: FileText,
  Video: Film,
  Infographic: ImageIcon,
};

export function ZiteResourcesView({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;
  const resources = ZITE_CONTENT.resources as unknown as ZiteResource[];
  const types = Array.from(new Set(resources.map((r) => r.type)));
  const [selectedType, setSelectedType] = useState("");
  const filtered = resources.filter(
    (r) => !selectedType || r.type === selectedType,
  );

  return (
    <>
      <PageHero
        title={fr ? "Centre de ressources" : "Resource centre"}
        eyebrow={R(L.nav.resources, locale)}
        lead={R(L.res.h2, locale)}
        image={PAGE_AERIAL_HEROES.resourcesIndex.image}
        cityBadge={formatAerialBadge(PAGE_AERIAL_HEROES.resourcesIndex.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: R(L.nav.resources, locale) },
        ]}
      />

      <section className="section-y bg-mist">
        <div className="container-g">
          <div className="flex flex-wrap gap-1 border-b border-line" role="tablist">
            {["", ...types].map((t) => (
              <button
                key={t || "all"}
                type="button"
                role="tab"
                aria-selected={selectedType === t}
                onClick={() => setSelectedType(t)}
                className={`h-10 border-b-2 px-4 text-[0.8125rem] font-semibold transition-colors ${
                  selectedType === t
                    ? "border-brand-600 text-brand-600"
                    : "border-transparent text-slatex-600 hover:text-ink"
                }`}
              >
                {t || (fr ? "Tout" : "All")}
              </button>
            ))}
          </div>

          <div className="mt-10 ed-list">
            {filtered.map((res, idx) => {
              const Icon = TYPE_ICONS[res.type] ?? FileText;
              const desc = R(res.description, locale);
              return (
                <Reveal key={res.id} delay={Math.min(idx, 4) * 45}>
                  <article className="ed-item">
                    <div className="grid gap-5 sm:grid-cols-12 sm:items-start">
                      {res.imageUrl ? (
                        <div className="ed-media ed-media-hover aspect-[3/2] sm:col-span-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={res.imageUrl} alt="" loading="lazy" />
                        </div>
                      ) : (
                        <div className="sm:col-span-3">
                          <div className="flex h-full min-h-20 items-center justify-center border border-line bg-mist">
                            <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
                          </div>
                        </div>
                      )}
                      <div className="sm:col-span-9">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="ed-num text-xs">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="border-l-2 border-brand-600 pl-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                            {res.type}
                          </span>
                          <span className="text-xs uppercase tracking-[0.16em] text-slatex-600">
                            {res.language}
                            {res.fileSize ? ` · ${res.fileSize}` : ""}
                          </span>
                        </div>
                        <h2 className="h4 mt-2 max-w-[46ch] text-ink">
                          {R(res.title, locale)}
                        </h2>
                        {desc ? (
                          <p className="mt-2 max-w-[64ch] text-sm leading-relaxed text-slatex-600">
                            {desc}
                          </p>
                        ) : null}
                        <p className="mt-3 flex items-center gap-2 text-[0.8125rem] font-medium text-slatex-600">
                          <Download className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                          {fr ? "Téléchargement bientôt disponible" : "Download available soon"}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
