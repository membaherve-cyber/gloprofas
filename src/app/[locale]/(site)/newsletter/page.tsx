import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe, Lock, Mail, ShieldAlert } from "lucide-react";
import { getDictionary, isLocale, routes, type Locale } from "@/lib/i18n";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { Btn, PageHero } from "@/components/zite/shared";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";
import { buildMetadata, SITE_DESCRIPTION } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/newsletter",
    title: dict.newsletter.h1,
    description: dict.newsletter.lead,
  });
}

export default async function NewsletterPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale: raw } = await params;
  const { status } = await searchParams;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const fr = locale === "fr";
  const dict = getDictionary(locale);
  const hero = PAGE_AERIAL_HEROES.newsletter;
  const notice =
    status === "confirmed"
      ? dict.newsletter.confirmed
      : status === "unsubscribed"
        ? dict.newsletter.unsubscribed
        : status === "invalid"
          ? dict.newsletter.invalidToken
          : null;

  return (
    <>
      <PageHero
        title={dict.newsletter.h1}
        eyebrow={dict.home.newsletter.eyebrow}
        lead={dict.newsletter.lead}
        image={hero.image}
        cityBadge={formatAerialBadge(hero.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: `/${locale}` },
          { label: dict.newsletter.h1 },
        ]}
      />
      <section className="section bg-mist-50">
        <div className="container-g grid gap-8 lg:grid-cols-12 lg:items-stretch">
          <div className="on-dark flex flex-col justify-between border border-white/12 bg-navy-950 p-7 sm:p-9 lg:col-span-7">
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center border border-white/20 text-cyanx">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white">
                      {fr ? "Bulletin d’alerte GLOPROFAS" : "GLOPROFAS Alert Briefing"}
                    </h2>
                    <p className="text-xs text-slatex-300">
                      {fr
                        ? "Un court courriel quand une nouvelle arnaque circule."
                        : "One short email when something new is spreading."}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 border-l-2 border-cyanx pl-2 py-0.5 text-xs font-semibold text-cyanx">
                  <Globe className="h-3.5 w-3.5" />
                  EN / FR
                </span>
              </div>
              {notice ? (
                <p
                  className="mb-5 rounded-sm border border-cyan-400/40 bg-cyan-400/10 p-4 text-base text-white"
                  role="status"
                >
                  {notice}
                </p>
              ) : null}
              <NewsletterForm locale={locale} dict={dict} />
            </div>
          </div>

          <aside className="on-dark flex flex-col justify-between border-l-2 border-signal bg-navy-900 p-7 text-white sm:p-9 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 border-l-2 border-signal pl-2 py-0.5 text-xs font-bold uppercase tracking-label text-signal">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  {fr ? "Signalement d’incident" : "Incident Reporting"}
                </span>
                <span className="inline-flex items-center gap-2 border-l-2 border-white/25 pl-2 py-0.5 text-xs font-semibold text-slatex-300">
                  <Lock className="h-3 w-3 text-cyanx" />
                  {fr ? "Privé" : "Private"}
                </span>
              </div>
              <h2 className="mt-5 font-[family-name:var(--font-heading)] text-2xl font-bold text-white">
                {fr ? "Avez-vous été confronté à une arnaque ?" : "Have you encountered a scam?"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slatex-300">
                {fr
                  ? "Signalez un numéro, un SMS, une fausse offre d’emploi ou une demande de paiement suspecte en 5 minutes. Aucun compte requis."
                  : "Report a suspicious phone number, SMS, fake job offer or payment request in 5 minutes. No account required."}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={routes.report(locale)} variant="signal" className="w-full">
                {dict.nav.report}
              </Btn>
              <Btn href={`/${locale}/check`} variant="outlineDark" className="w-full">
                {fr ? "Vérifier un message suspect" : "Verify a suspicious message"}
              </Btn>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
