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
import { IconTile, L, PageHero, R, Reveal } from "@/components/zite/shared";
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
        image="/images/zite/img_k_g-Bue4ibKanRTu.jpg"
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: R(L.nav.resources, locale) },
        ]}
      />

      <section className="section-y bg-mist">
        <div className="container-g">
          <div className="flex flex-wrap gap-2" role="tablist">
            {["", ...types].map((t) => (
              <button
                key={t || "all"}
                type="button"
                role="tab"
                aria-selected={selectedType === t}
                onClick={() => setSelectedType(t)}
                className={`h-11 rounded-full px-5 text-sm font-semibold transition-colors ${
                  selectedType === t
                    ? "bg-navy-900 text-white"
                    : "border border-line bg-white text-ink hover:border-brand-600"
                }`}
              >
                {t || (fr ? "Tout" : "All")}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((res, idx) => {
              const Icon = TYPE_ICONS[res.type] ?? FileText;
              const desc = R(res.description, locale);
              return (
                <Reveal key={res.id} delay={(idx % 3) * 60}>
                  <article className="flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-e1">
                    {res.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={res.imageUrl}
                        alt=""
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover"
                      />
                    ) : null}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3">
                        <IconTile>
                          <Icon className="h-6 w-6" strokeWidth={1.5} />
                        </IconTile>
                        <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
                          <span className="rounded-full bg-mist px-3 py-1 text-ink">
                            {res.type}
                          </span>
                          <span className="rounded-full border border-line px-3 py-1 text-slatex-600">
                            {res.language}
                          </span>
                        </div>
                      </div>
                      <h2 className="h4 mt-5 text-ink">{R(res.title, locale)}</h2>
                      {desc ? (
                        <p className="mt-2 text-slatex-600">{desc}</p>
                      ) : null}
                      <p className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-slatex-600">
                        <Download className="h-4 w-4" />
                        {fr
                          ? "Téléchargement bientôt disponible"
                          : "Download available soon"}
                        {res.fileSize ? ` · ${res.fileSize}` : ""}
                      </p>
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
