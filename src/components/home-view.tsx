import Link from "next/link";
import { Check } from "lucide-react";
import { NewsletterForm } from "@/components/forms";
import { Button, IconTile, Photo, RiskBadge, SectionHeading } from "@/components/ui";
import { Counter, OpenAssistant } from "@/components/widgets";
import { m } from "@/lib/i18n";
import { pathFor } from "@/lib/paths";
import type { Locale } from "@/lib/types";
import { pickLocale } from "@/lib/utils";

type Copy = { title: string; slug: string; summary: string };
function copyOf(translations: unknown, locale: Locale) {
  return pickLocale(translations as Partial<Record<Locale, Copy>>, locale);
}

type Cat = { id: string; icon: string; homepage: boolean; tileSize: string; translations: unknown };
type Alert = { id: string; risk: string; country: string; image: string | null; publishedAt: Date | null; translations: unknown };
type Article = { id: string; image: string | null; author: string; publishedAt: Date | null; kind: string; translations: unknown };
type Resource = { id: string; format: string; image: string | null; featured: boolean; translations: unknown };

export function HomeView({
  locale,
  categories,
  alerts,
  articles,
  resources,
}: {
  locale: Locale;
  categories: Cat[];
  alerts: Alert[];
  articles: Article[];
  resources: Resource[];
}) {
  const t = m(locale);
  const homeCats = categories.filter((item) => item.homepage);
  const chips = homeCats.slice(0, 4);
  const featuredResource = resources.find((item) => item.featured) || resources[0];
  const moreResources = resources.filter((item) => item.id !== featuredResource?.id).slice(0, 4);
  const topAlerts = [...alerts].sort((a, b) => Number(b.risk === "critical") - Number(a.risk === "critical")).slice(0, 3);
  const topArticles = articles.slice(0, 3);
  const alt = locale === "fr"
    ? { hero: "Vue aérienne de Douala, au Cameroun.", portrait: "Un séminaire dans une salle communautaire.", contact: "Un homme au téléphone dans un taxi partagé.", pressure: "Un jeune homme lit son téléphone sur un banc, le soir.", payment: "Un kiosque de mobile money dans un marché animé.", gone: "Une femme lit son téléphone au comptoir d’une boutique, au crépuscule." }
    : { hero: "Aerial view of Douala, Cameroon.", portrait: "A seminar in a community classroom.", contact: "A man on the phone in a shared taxi.", pressure: "A young man reading his phone on a bench at night.", payment: "A street-side mobile-money kiosk in a busy market.", gone: "A woman reading her phone at a shop counter at dusk." };

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-poster.jpg"
            preload="metadata"
            aria-label={alt.hero}
          >
            <source src="/videos/hero-douala.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-shade" />
        <div className="hero-grid" />
        <div className="container hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.h1}</h1>
          <p className="lead measure" style={{ color: "#d5deee" }}>{t.lead}</p>
          <div className="hero-actions">
            <Button href={pathFor(locale, "report")} variant="signal">{t.reportIncidentCta}</Button>
            <OpenAssistant label={t.verifyCta} />
          </div>
        </div>
        <div className="chips" aria-label={t.marqueeLabel}>
          {chips.map((item, index) => {
            const copy = copyOf(item.translations, locale);
            if (!copy) return null;
            return (
              <Link key={item.id} className="chip" href={pathFor(locale, "awareness", copy.value.slug)} style={{ animationDelay: `${index * 0.6}s` }}>
                <span />
                {copy.value.title}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="strip">
        <div className="strip-mark" aria-hidden="true"><svg width="180" height="180" viewBox="0 0 40 40"><circle cx="20" cy="20" r="14" fill="none" stroke="white" strokeWidth="2" /></svg></div>
        <div className="container strip-inner">
          <p>{t.strip}</p>
          <OpenAssistant label={t.check} />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading eyebrow={t.introEyebrow} title={t.introH2} lead={t.introBody} />
            <ul className="check-list">
              {t.checks.map((item) => <li key={item}><Check className="tick" size={18} aria-hidden="true" />{item}</li>)}
            </ul>
            <Button href={pathFor(locale, "awareness")} variant="outline-dark">{t.introCta}</Button>
          </div>
          <div className="portrait-wrap">
            <span className="ring" />
            <span className="ring ring-2" />
            <Photo src="/images/site-4.jpg" alt={alt.portrait} width={1024} height={1024} />
            <div className="stat-rule">
              <span className="stat-num">{categories.length}</span>
              <span className="stat-label">{t.statTypes}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-label={t.pillarsH2}>
        <div className="container">
          <SectionHeading eyebrow={t.pillarsEyebrow} title={t.pillarsH2} lead={t.pillarsLead} />
          <div className="pillars-index" style={{ marginTop: 28 }}>
            {t.pillars.map((pillar, index) => (
              <article className="pillar-row" key={pillar.title}>
                <span className="num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{pillar.title}</h3>
                <p className="muted">{pillar.desc}</p>
                <span className="arr" aria-hidden="true">→</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band-dark" aria-label={t.marqueeLabel}>
        <div className="marquee">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} style={{ display: "flex", gap: 42 }} aria-hidden={copy === 1}>
                {categories.map((item) => {
                  const text = copyOf(item.translations, locale);
                  return <span className="marquee-item" key={`${copy}-${item.id}`}>{text?.value.title}</span>;
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-mist">
        <div className="container">
          <SectionHeading eyebrow={t.scamsEyebrow} title={t.scamsH2} lead={t.scamsLead} />
          <div className="bento" style={{ marginTop: 28 }}>
            {homeCats.map((item) => {
              const copy = copyOf(item.translations, locale);
              if (!copy) return null;
              return (
                <Link key={item.id} href={pathFor(locale, "awareness", copy.value.slug)} className={`tile ${item.tileSize === "large" ? "large" : ""}`}>
                  <IconTile name={item.icon} />
                  <h3>{copy.value.title}</h3>
                  <p>{copy.value.summary}</p>
                  <span className="tile-foot">{t.readMore} <span aria-hidden="true">→</span></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section band-dark">
        <div className="container">
          <SectionHeading eyebrow={t.howEyebrow} title={t.howH2} lead={t.howLead || undefined} light />
          <div className="steps" style={{ marginTop: 28 }}>
            {[
              ["/images/site-8.jpg", alt.contact],
              ["/images/site-6.jpg", alt.pressure],
              ["/images/site-3.jpg", alt.payment],
              ["/images/site-7.jpg", alt.gone],
            ].map(([src, text], index) => (
              <article className="step" key={src}>
                <Photo src={src} alt={text} width={1200} height={800} />
                <div className="step-body">
                  <div className="numeral">{t.steps[index].n}</div>
                  <h3>{t.steps[index].title}</h3>
                  <p className="muted-dark">{t.steps[index].text}</p>
                </div>
              </article>
            ))}
          </div>
          <h3 style={{ marginTop: 36 }}>{t.techniques}</h3>
          <div className="accordion">
            {t.techniqueItems.map((item) => (
              <details key={item.title}>
                <summary>{item.title}</summary>
                <p>{item.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-mid">
        <div className="container">
          <SectionHeading eyebrow={t.findEyebrow} title={t.findH2} light />
          <div className="counters" style={{ marginTop: 24 }}>
            <Counter value={categories.length} label={t.statTypes} />
            <Counter value={resources.length} label={t.statResources} />
            <Counter value={2} label={t.statLanguages} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading eyebrow={t.reportEyebrow} title={t.reportH2} lead={t.reportLead} />
            <div style={{ marginTop: 18 }}>
              <Button href={pathFor(locale, "report")} variant="signal">{t.reportButton}</Button>
            </div>
          </div>
          <div className="report-preview">
            {t.reportSteps.map((step, index) => (
              <div className="preview-step" key={step.t}>
                <span className="numeral" style={{ WebkitTextStrokeColor: "#10244d", fontSize: "1.6rem" }}>{`0${index + 1}`}</span>
                <span><strong>{step.t}</strong><br /><span className="help">{step.d}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-mist">
        <div className="container">
          <SectionHeading eyebrow={t.resourcesEyebrow} title={t.resourcesH2} lead={t.resourcesLead || undefined} />
          <div className="feature-grid" style={{ marginTop: 24 }}>
            {featuredResource ? <ResourceFeature locale={locale} item={featuredResource} /> : null}
            <div className="stack">
              {moreResources.map((item) => {
                const copy = copyOf(item.translations, locale);
                if (!copy) return null;
                return (
                  <Link key={item.id} className="resource-row" href={pathFor(locale, "resources", copy.value.slug)}>
                    <span className="badge">{item.format}</span>
                    <span><strong>{copy.value.title}</strong><br /><span className="help">{copy.value.summary}</span></span>
                  </Link>
                );
              })}
              <Button href={pathFor(locale, "resources")} variant="text">{t.viewAll}</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t.servicesEyebrow} title={t.servicesH2} />
          <div className="service-contrast" style={{ marginTop: 24 }}>
            <article className="service-panel free">
              <p className="eyebrow">{t.freeTag}</p>
              <h3>{t.freeTitle}</h3>
              <p>{t.freeBody}</p>
              <ul>{t.freePoints.map((item) => <li key={item}>{item}</li>)}</ul>
              <Button href={pathFor(locale, "resources")} variant="outline-dark">{t.freeCta}</Button>
            </article>
            <article className="service-panel paid">
              <p className="eyebrow">{t.paidTag}</p>
              <h3>{t.paidTitle}</h3>
              <p>{t.paidBody}</p>
              <ul>{t.paidPoints.map((item) => <li key={item}>{item}</li>)}</ul>
              <Button href={pathFor(locale, "services")} variant="outline">{t.paidCta}</Button>
            </article>
          </div>
        </div>
      </section>

      <section className="section band-mist">
        <div className="container">
          <SectionHeading eyebrow={t.newsEyebrow} title={t.newsH2} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
            <h3>{t.alertsTitle}</h3>
            <Link href={pathFor(locale, "alerts")}>{t.alertsCta}</Link>
          </div>
          <div className="cards-3" style={{ marginTop: 12 }}>
            {topAlerts.map((item) => {
              const copy = copyOf(item.translations, locale);
              if (!copy) return null;
              return (
                <Link key={item.id} className="alert-card" href={pathFor(locale, "alerts", copy.value.slug)}>
                  <div className="pad" style={{ display: "flex", justifyContent: "space-between" }}>
                    <RiskBadge level={item.risk as "low"} label={t.risk[item.risk as "low"]} />
                    <span className="help">{item.country}</span>
                  </div>
                  {item.image ? <Photo src={item.image} alt="" width={1200} height={800} /> : null}
                  <div className="pad"><h3>{copy.value.title}</h3><p className="muted">{copy.value.summary}</p></div>
                </Link>
              );
            })}
          </div>
          <div className="cards-3" style={{ marginTop: 22 }}>
            {topArticles.map((item) => {
              const copy = copyOf(item.translations, locale);
              if (!copy) return null;
              return (
                <Link key={item.id} className="article-card" href={pathFor(locale, "news", copy.value.slug)}>
                  {item.image ? <Photo src={item.image} alt="" width={1200} height={800} /> : null}
                  <div className="pad">
                    <span className="badge">{item.kind}</span>
                    <h3 style={{ marginTop: 8 }}>{copy.value.title}</h3>
                    <p className="help">{item.author}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section band-dark">
        <div className="container">
          <div className="nl-card">
            <div className="nl-panel">
              <div className="mark" aria-hidden="true">
                <svg width="230" height="230" viewBox="0 0 40 40"><circle cx="20" cy="20" r="14" fill="none" stroke="white" strokeWidth="1.5" /><circle cx="31" cy="9" r="2" fill="#2bd4e8" /></svg>
              </div>
              <p className="eyebrow">{t.newsletterEyebrow}</p>
              <h2 style={{ fontSize: "clamp(1.6rem, 1.2rem + 1.4vw, 2.4rem)" }}>{t.newsletterH2}</h2>
              <p className="lead" style={{ color: "#d5deee" }}>{t.newsletterLead}</p>
              <ul className="nl-bullets">
                {t.newsletterPoints.map((point) => (
                  <li key={point}>
                    <Check size={16} style={{ color: "#2bd4e8", flex: "none", marginTop: 4 }} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <NewsletterForm locale={locale} />
          </div>
        </div>
      </section>

      <section className="section band-mid final">
        <div className="watermark" aria-hidden="true"><svg width="280" height="280" viewBox="0 0 40 40"><circle cx="20" cy="20" r="14" fill="none" stroke="white" strokeWidth="1.5" /></svg></div>
        <div className="container">
          <h2>{t.finalH2}</h2>
          <p className="lead measure muted-dark">{t.finalLead}</p>
          <div className="final-actions">
            <Button href={pathFor(locale, "report")} variant="signal">{t.reportCta}</Button>
            <Button href={pathFor(locale, "resources")} variant="outline">{t.finalResources}</Button>
            <Button href={pathFor(locale, "contact")} variant="outline">{t.finalContact}</Button>
          </div>
        </div>
      </section>
    </>
  );
}

function ResourceFeature({ locale, item }: { locale: Locale; item: Resource }) {
  const copy = copyOf(item.translations, locale);
  if (!copy) return null;
  return (
    <Link className="feature-card" href={pathFor(locale, "resources", copy.value.slug)}>
      {item.image ? <Photo src={item.image} alt="" width={1200} height={800} /> : null}
      <div className="pad">
        <span className="badge">{item.format}</span>
        <h3 style={{ marginTop: 10 }}>{copy.value.title}</h3>
        <p className="muted">{copy.value.summary}</p>
      </div>
    </Link>
  );
}
