import { notFound } from "next/navigation";
import { getDictionary, isLocale, routes, type Locale } from "@/lib/i18n";
import { AlertCard, ButtonLink, CategoryTile, CheckList, Eyebrow, EmptyState, RiskBadge, SectionHeading } from "@/components/ui";
export const metadata = {
  title: "Style guide",
  robots: { index: false, follow: false, nocache: true },
};


export default async function StyleguidePage({ params }: { params: Promise<{ locale: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <div className="section bg-white">
      <div className="container-page space-y-12">
        <div>
          <Eyebrow>{locale === "fr" ? "Guide de style (développement)" : "Style guide (development)"}</Eyebrow>
          <h1 className="mt-4">{locale === "fr" ? "Système de conception" : "Design system"}</h1>
          <p className="lead mt-3">
            {locale === "fr" ? "Jetons, typographie et composants." : "Tokens, typography and components."}
          </p>
        </div>

        <section>
          <h2>{locale === "fr" ? "Couleurs" : "Colours"}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["navy-950", "#050B1A"],
              ["navy-900", "#0A1631"],
              ["navy-800", "#10244D"],
              ["blue-600", "#3467eb"],
              ["blue-500", "#5586f6"],
              ["cyan-400", "#40c4d3"],
              ["signal-400", "#f0ac3d"],
              ["ink-900", "#0B1220"],
              ["slate-600", "#4B5870"],
              ["line-200", "#DCE3EE"],
              ["mist-50", "#F4F7FB"],
              ["risk-critical", "#d23434"],
            ].map(([name, hex]) => (
              <div key={name} className="rounded-sm border border-line-200 p-3">
                <div className="h-14 w-full rounded-[8px]" style={{ background: hex }} />
                <p className="mt-2 text-caption font-semibold">{name}</p>
                <p className="text-micro text-slate-600">{hex}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>{locale === "fr" ? "Typographie" : "Typography"}</h2>
          <div className="mt-4 space-y-3">
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <p className="lead">Body large — une phrase de démonstration pour vérifier la mesure des lignes.</p>
            <p>Body — GLOPROFAS helps people recognise fraud and know what to do next.</p>
            <p className="text-base font-medium text-slate-600">Small — 0.875rem, weight 500.</p>
          </div>
        </section>

        <section>
          <h2>{locale === "fr" ? "Boutons" : "Buttons"}</h2>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <ButtonLink href={routes.report(locale)} variant="signal">Signal</ButtonLink>
            <ButtonLink href={routes.scams(locale)} variant="primary">Primary</ButtonLink>
            <ButtonLink href={routes.about(locale)} variant="outline">Outline</ButtonLink>
            <ButtonLink href={routes.contact(locale)} variant="ghost">Ghost</ButtonLink>
            <ButtonLink href={routes.resources(locale)} variant="primary" size="sm" arrow>Small</ButtonLink>
          </div>
        </section>

        <section className="rounded-none bg-navy-900 p-6">
          <SectionHeading eyebrow="Eyebrow" title="Section heading on dark" lead={dict.home.scams.lead} dark />
          <div className="mt-5 flex gap-2">
            <RiskBadge level="low" dict={dict} />
            <RiskBadge level="medium" dict={dict} />
            <RiskBadge level="high" dict={dict} />
            <RiskBadge level="critical" dict={dict} />
          </div>
        </section>

        <section>
          <h2>{locale === "fr" ? "Cartes" : "Cards"}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <CategoryTile href={routes.scams(locale)} name="Mobile money scams" summary="Fraud built around transfers and one-time codes." icon="smartphone" />
            <CategoryTile href={routes.scams(locale)} name="Phishing" summary="Messages that imitate a service you trust." icon="mail-warning" size="medium" />
            <AlertCard
              href={routes.alerts(locale)}
              title="Reported spike in fake refund calls"
              summary="Callers ask for a one-time code to reverse a transfer."
              locale={locale}
              riskLevel="critical"
              country="Cameroon"
              publishedAt={new Date()}
              dict={dict}
            />
          </div>
        </section>

        <section>
          <h2>{locale === "fr" ? "Listes et états" : "Lists and states"}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-sm border border-line-200 p-5">
              <CheckList items={["Consistent icon family", "Sentence case headings", "44 px touch targets"]} />
            </div>
            <EmptyState message={dict.common.noResults} />
          </div>
        </section>
      </div>
    </div>
  );
}
