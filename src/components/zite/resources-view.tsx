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
import {
  IconTile,
  PageHero,
  Reveal,
} from "@/components/zite/shared";
import { L } from "@/lib/zite-copy";

import { R } from "@/lib/zite-copy";

import { EditorialSectionIndex } from "@/components/zite/editorial-graphics";
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

function ResourceMeta({ resource, locale }: { resource: ZiteResource; locale: Locale }) {
  return (
    <p className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-slatex-600">
      <Download className="h-4 w-4" aria-hidden="true" />
      {locale === "fr" ? "Téléchargement bientôt disponible" : "Download available soon"}
      {resource.fileSize ? ` · ${resource.fileSize}` : ""}
    </p>
  );
}

export function ZiteResourcesView({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;
  const resources = [...(ZITE_CONTENT.resources as unknown as ZiteResource[])].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );
  const types = Array.from(new Set(resources.map((r) => r.type)));
  const [selectedType, setSelectedType] = useState("");
  const filtered = resources.filter(
    (resource) => !selectedType || resource.type === selectedType,
  );
  const [lead, ...others] = filtered;

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
          <EditorialSectionIndex
            index="RES"
            code={fr ? "MANUELS DE TERRAIN & RÉFÉRENTIEL" : "FIELD MANUALS & REFERENCE LIBRARY"}
          />

          <div className="flex flex-wrap gap-2" role="tablist" aria-label={fr ? "Formats" : "Formats"}>
            {["", ...types].map((type) => (
              <button
                key={type || "all"}
                type="button"
                role="tab"
                aria-selected={selectedType === type}
                onClick={() => setSelectedType(type)}
                className={`h-11 rounded-full px-5 text-sm font-semibold transition-colors ${
                  selectedType === type
                    ? "bg-navy-900 text-white"
                    : "border border-line bg-white text-ink hover:border-brand-600"
                }`}
              >
                {type || (fr ? "Tout" : "All")}
              </button>
            ))}
          </div>

          {lead ? (
            <Reveal className="mt-10">
              <article className="grid overflow-hidden border-y border-line bg-white lg:grid-cols-[1.05fr_0.95fr]">
                {lead.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={lead.imageUrl}
                    alt={R(lead.title, locale)}
                    loading="lazy"
                    className="h-full min-h-[300px] w-full object-cover"
                  />
                ) : null}
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <span className="rounded-full bg-brand-600 px-3 py-1 text-white">
                      {fr ? "À la une" : "Featured"}
                    </span>
                    <span className="rounded-full bg-mist px-3 py-1 text-ink">{lead.type}</span>
                    <span className="rounded-full border border-line px-3 py-1 text-slatex-600">
                      {lead.language}
                    </span>
                  </div>
                  <h2 className="h3 mt-5 text-ink">{R(lead.title, locale)}</h2>
                  <p className="lead mt-3 text-slatex-600">{R(lead.description, locale)}</p>
                  <ResourceMeta resource={lead} locale={locale} />
                </div>
              </article>
            </Reveal>
          ) : null}

          {others.length > 0 ? (
            <div className="mt-8 border-t border-line">
              {others.map((resource, index) => {
                const Icon = TYPE_ICONS[resource.type] ?? FileText;
                const description = R(resource.description, locale);
                return (
                  <Reveal key={resource.id} delay={(index % 3) * 60}>
                    <article className="group grid gap-5 border-b border-line bg-white/45 p-5 transition-colors hover:bg-white sm:grid-cols-[180px_1fr] sm:p-6">
                      {resource.imageUrl ? (
                        <div className="overflow-hidden rounded-[12px] bg-navy-900">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={resource.imageUrl}
                            alt=""
                            loading="lazy"
                            className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:aspect-[4/3]"
                          />
                        </div>
                      ) : null}
                      <div className="flex min-w-0 flex-col">
                        <div className="flex items-center gap-3">
                          <IconTile>
                            <Icon className="h-6 w-6" strokeWidth={1.5} />
                          </IconTile>
                          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
                            <span className="rounded-full bg-mist px-3 py-1 text-ink">
                              {resource.type}
                            </span>
                            <span className="rounded-full border border-line px-3 py-1 text-slatex-600">
                              {resource.language}
                            </span>
                          </div>
                        </div>
                        <h3 className="h4 mt-4 text-ink">{R(resource.title, locale)}</h3>
                        {description ? (
                          <p className="mt-2 max-w-3xl text-slatex-600">{description}</p>
                        ) : null}
                        <ResourceMeta resource={resource} locale={locale} />
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          ) : null}

          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-slatex-600">
              {fr ? "Aucune ressource dans ce format." : "No resources in this format."}
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
