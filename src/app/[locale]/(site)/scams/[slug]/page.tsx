import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LifeBuoy,
  ShieldCheck,
  TriangleAlert,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZITE_CONTENT, type ZiteCategory } from "@/lib/zite-data";
import { Btn, IconTile, PageHero, Reveal, SectionHeading, ZiteRiskBadge } from "@/components/zite/shared";
import { formatZiteDate, getCategoryIcon, L, R } from "@/components/zite/copy";
import {
  formatAerialBadge,
  PAGE_AERIAL_HEROES,
  SCAM_CATEGORY_AERIAL_HEROES,
} from "@/lib/african-cities";

function findCategory(slug: string): ZiteCategory | undefined {
  const list = ZITE_CONTENT.categories as unknown as ZiteCategory[];
  return list.find((c) => c.slug === slug || c.id === slug);
}

function ListBlock({
  title,
  items,
  Icon,
  tone,
}: {
  title: string;
  items: readonly string[];
  Icon: LucideIcon;
  tone: string;
}) {
  return (
    <Reveal className="rounded-none border-t border-line bg-white pt-6 shadow-e1">
      <h2 className="h3 flex items-center gap-3 text-ink">
        <Icon className={`h-7 w-7 ${tone}`} strokeWidth={1.5} />
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-slatex-600">
            <span
              className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${tone.replace(
                "text-",
                "bg-",
              )}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const cat = findCategory(slug);
  if (!cat) return {};
  return {
    title: R(cat.title, locale),
    description: R(cat.summary, locale),
    alternates: {
      canonical: `/${locale}/scams/${cat.slug}`,
      languages: {
        en: `/en/scams/${cat.slug}`,
        fr: `/fr/scams/${cat.slug}`,
      },
    },
  };
}

export default async function ScamDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;

  const category = findCategory(slug);
  if (!category) notFound();

  const content = category.parsedContent[locale];
  const relatedScams = (ZITE_CONTENT.categories as unknown as ZiteCategory[])
    .filter((c) => c.id !== category.id)
    .slice(0, 3);
  const relatedAlerts = ZITE_CONTENT.alerts.filter(
    (a) => a.categorySlug === category.slug,
  );

  return (
    <>
      {(() => {
        const aerialHero =
          SCAM_CATEGORY_AERIAL_HEROES[category.slug] ??
          PAGE_AERIAL_HEROES.scamsIndex;
        return (
          <PageHero
            title={R(category.title, locale)}
            lead={R(category.summary, locale)}
            eyebrow={R(L.nav.awareness, locale)}
            image={aerialHero.image}
            cityBadge={formatAerialBadge(aerialHero.city, locale)}
            crumbs={[
              { label: fr ? "Accueil" : "Home", to: l() },
              { label: R(L.nav.awareness, locale), to: l("/scams") },
              { label: R(category.title, locale) },
            ]}
          />
        );
      })()}

      <section className="section-y bg-mist">
        <div className="container-g grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <Reveal className="overflow-hidden rounded-none bg-white shadow-e1">
              {category.imageUrl ? (
                <div className="group relative aspect-[16/9] w-full overflow-hidden bg-navy-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img width={1600} height={900}
                    src={category.imageUrl}
                    alt={R(category.title, locale)}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 border-l-2 border-cyanx bg-navy-950/85 px-3 py-1.5 text-micro font-bold uppercase tracking-[0.14em] text-white">
                    <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
                    {R(category.title, locale)} —{" "}
                    {fr ? "Scénario de terrain" : "Real-world context"}
                  </span>
                </div>
              ) : null}
              <div className="p-8">
                <p className="ed-label text-brand-600">
                  {fr ? "Définition" : "Definition"}
                </p>
                <p className="lead mt-3 text-ink">{content.definition}</p>
                <h2 className="h3 mt-8 flex items-center gap-3 text-ink">
                  <Workflow className="h-7 w-7 text-brand-600" strokeWidth={1.5} />
                  {fr ? "Comment ça fonctionne" : "How it works"}
                </h2>
                <p className="mt-3 text-slatex-600">{content.how}</p>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              <ListBlock
                title={fr ? "Signaux d’alerte" : "Warning signs"}
                items={content.signs}
                Icon={TriangleAlert}
                tone="text-risk-high"
              />
              <ListBlock
                title={fr ? "Comment vous protéger" : "How to protect yourself"}
                items={content.protect}
                Icon={ShieldCheck}
                tone="text-risk-low"
              />
            </div>

            <Reveal className="rounded-none border-l-4 border-brand-600 bg-white p-7 shadow-e1">
              <p className="ed-label text-brand-600">
                {fr ? "Exemple illustratif" : "Illustrative example"}
              </p>
              <p className="mt-3 italic text-ink">
                {content.example.replace(
                  /^(Illustrative example|Exemple illustratif)\s*:\s*/,
                  "",
                )}
              </p>
              <p className="mt-3 text-xs text-slatex-600">
                {fr
                  ? "Situation fictive, sans lien avec une personne ou une entreprise réelle."
                  : "Fictional scenario involving no real person or business."}
              </p>
            </Reveal>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="on-dark rounded-none bg-navy-900 p-7 lg:sticky lg:top-28">
              <h2 className="h4 flex items-center gap-3 text-white">
                <LifeBuoy className="h-6 w-6 text-signal" strokeWidth={1.5} />
                {fr ? "Si cela vous arrive" : "If this happens to you"}
              </h2>
              <ol className="mt-5 space-y-4">
                {content.todo.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slatex-300">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-7">
                <Btn href={l("/report")} variant="signal" className="w-full">
                  {R(L.report, locale)}
                </Btn>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedAlerts.length > 0 ? (
        <section className="bg-white py-16">
          <div className="container-g">
            <h2 className="h3 text-ink">
              {fr ? "Alertes liées" : "Related alerts"}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedAlerts.map((alert) => (
                <Link
                  key={alert.id}
                  href={l(`/alerts/${alert.id}`)}
                  className="rounded-sm border border-line p-5 hover:shadow-none"
                >
                  <ZiteRiskBadge level={alert.risk} lang={locale} />
                  <p className="mt-3 font-[family-name:var(--font-heading)] font-semibold text-ink">
                    {R(alert.title, locale)}
                  </p>
                  <p className="mt-2 text-sm text-slatex-600">
                    {alert.country} · {formatZiteDate(alert.date, locale)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-16">
        <div className="container-g">
          <SectionHeading
            eyebrow={fr ? "À lire aussi" : "Keep reading"}
            title={fr ? "Arnaques apparentées" : "Related scams"}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {relatedScams.map((scam) => {
              const Icon = getCategoryIcon(scam.icon);
              return (
                <Link
                  key={scam.id}
                  href={l(`/scams/${scam.slug}`)}
                  className="flex items-center gap-4 rounded-sm border border-line p-5 transition-all hover:shadow-none"
                >
                  <IconTile>
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </IconTile>
                  <span className="font-[family-name:var(--font-heading)] font-semibold text-ink">
                    {R(scam.title, locale)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
