import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm, EnquiryForm, PartnershipForm, VolunteerForm } from "@/components/forms";
import { ReportWizard } from "@/components/report-wizard";
import { CopyButton } from "@/components/widgets";
import { Button, IconTile, Photo, RiskBadge } from "@/components/ui";
import { m } from "@/lib/i18n";
import { pathFor, type SectionKey } from "@/lib/paths";
import type { Locale, WebsiteSettings } from "@/lib/types";
import { formatDate, pickLocale } from "@/lib/utils";
import { loadDraft } from "@/server/services";
import {
  findBySlug,
  listAlerts,
  listArticles,
  listCategories,
  listFaqs,
  listPages,
  listResourceCategories,
  listResources,
  listServices,
  searchPublished,
} from "@/server/queries";

export async function SectionView({
  locale,
  section,
  slug = [],
  query,
  settings,
  draftToken,
  confirmRef,
  moneyLost,
}: {
  locale: Locale;
  section: SectionKey;
  slug?: string[];
  query: Record<string, string | undefined>;
  settings: WebsiteSettings | null;
  draftToken?: string;
  confirmRef?: string;
  moneyLost?: boolean;
}) {
  const t = m(locale);
  if (section === "about" || section === "legal" || section === "involved") return pageView(locale, section, slug[0], settings);
  if (section === "awareness") return awareness(locale, slug[0]);
  if (section === "alerts") return alerts(locale, slug[0], query);
  if (section === "resources") return resources(locale, slug[0], query);
  if (section === "news") return news(locale, slug[0], query);
  if (section === "services") return servicesView(locale, slug);
  if (section === "contact") return contact(locale, settings);
  if (section === "search") return searchView(locale, query.q || "", query.type);
  if (section === "report") return report(locale, slug[0], draftToken, confirmRef, moneyLost);
  notFound();
}

function Hero({ locale, eyebrow, title, lead }: { locale: Locale; eyebrow: string; title: string; lead?: string }) {
  return (
    <header className="page-hero">
      <div className="container">
        <div className="crumbs"><Link href={`/${locale}`}>{m(locale).home}</Link><span>/</span><span>{title}</span></div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 style={{ fontSize: "clamp(2.2rem, 1.4rem + 2vw, 3.6rem)" }}>{title}</h1>
        {lead ? <p className="lead measure" style={{ color: "#d5deee" }}>{lead}</p> : null}
      </div>
    </header>
  );
}

async function pageView(locale: Locale, section: SectionKey, slug: string | undefined, settings: WebsiteSettings | null) {
  const t = m(locale);
  const rows = (await listPages()).filter((row) => row.section === (section === "legal" ? "legal" : section === "involved" ? "involved" : "about") && row.status === "published");
  if (!slug) {
    return (
      <>
        <Hero locale={locale} eyebrow={t.nav[section === "legal" ? "about" : section === "involved" ? "involved" : "about"]} title={section === "about" ? t.nav.about : section === "legal" ? t.footerLegal : t.involvedTitle} />
        <section className="section"><div className="container" style={{ display: "grid", gap: 20 }}>
          {section === "involved" ? <figure className="page-figure"><Photo src="/images/site-5.jpg" alt="" width={1376} height={768} /></figure> : null}
          <div className="grid-cards">
          {rows.map((row) => {
            const copy = pickLocale(row.translations, locale);
            if (!copy) return null;
            return <Link key={row.id} className="card" href={pathFor(locale, section, copy.value.slug)}><h3>{copy.value.title}</h3><p className="muted">{copy.value.summary}</p></Link>;
          })}
          </div>
        </div></section>
      </>
    );
  }
  const row = await findBySlug(rows, locale, slug);
  if (!row) notFound();
  const copy = pickLocale(row.translations, locale)!;
  return (
    <>
      <Hero locale={locale} eyebrow={t.nav.about} title={copy.value.title} lead={copy.value.summary} />
      <section className="section"><div className="container" style={{ display: "grid", gap: 22, maxWidth: 860 }}>
        {copy.fallback ? <p className="notice">{t.fallback}</p> : null}
        <div className="prose">{copy.value.body.map((paragraph, index) => paragraph.startsWith("## ") ? <h2 key={index} style={{ fontSize: "1.35rem" }}>{paragraph.slice(3)}</h2> : <p key={index}>{paragraph}</p>)}</div>
        {section === "involved" && row.key === "volunteer" ? <VolunteerForm locale={locale} /> : null}
        {section === "involved" && row.key === "partner" ? <PartnershipForm locale={locale} /> : null}
        {section === "involved" && row.key === "support" ? (
          <div className="card">
            {settings?.donationUrl ? <a href={settings.donationUrl}>{settings.donationUrl}</a> : <p>{settings?.donationNote[locale]}</p>}
          </div>
        ) : null}
      </div></section>
    </>
  );
}

async function awareness(locale: Locale, slug?: string) {
  const t = m(locale);
  const rows = (await listCategories()).filter((row) => row.status === "published");
  if (!slug) {
    return (
      <>
        <Hero locale={locale} eyebrow={t.eyebrow} title={t.awarenessCentreTitle} lead={t.scamsLead} />
        <section className="section"><div className="container grid-cards">
          {rows.map((row) => {
            const copy = pickLocale(row.translations, locale);
            if (!copy) return null;
            return (
              <Link key={row.id} className="tile" href={pathFor(locale, "awareness", copy.value.slug)}>
                <IconTile name={row.icon} />
                <h3>{copy.value.title}</h3>
                <p>{copy.value.summary}</p>
              </Link>
            );
          })}
        </div></section>
      </>
    );
  }
  const row = await findBySlug(rows, locale, slug);
  if (!row) notFound();
  const copy = pickLocale(row.translations, locale)!;
  const related = rows.filter((item) => row.related.includes(item.id));
  const resources = (await listResources()).filter((item) => item.status === "published").slice(0, 3);
  return (
    <>
      <Hero locale={locale} eyebrow={t.nav.awareness} title={copy.value.title} lead={copy.value.summary} />
      <section className="section"><div className="container prose" style={{ maxWidth: 860 }}>
        {copy.fallback ? <p className="notice">{t.fallback}</p> : null}
        {row.isDemo ? <p className="badge">{t.demoBadge}</p> : null}
        <h2>{t.sections.definition}</h2>
        <p>{copy.value.definition}</p>
        <h2>{t.sections.how}</h2>
        <p>{copy.value.howItWorks}</p>
        <h2>{t.sections.signs}</h2>
        <ul>{copy.value.warningSigns.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>{t.sections.techniques}</h2>
        <ul>{copy.value.techniques.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>{t.sections.example}</h2>
        <p className="notice">{t.illustrative}</p>
        <p>{copy.value.example}</p>
        <h2>{t.sections.protect}</h2>
        <ul>{copy.value.protection.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>{t.sections.affected}</h2>
        <ul>{copy.value.ifAffected.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="notice">{t.notPolice}</p>
        <Button href={pathFor(locale, "report")} variant="signal">{t.reportCta}</Button>
        <h2>{t.sections.relatedCats}</h2>
        <div className="stack">
          {related.map((item) => {
            const rel = pickLocale(item.translations, locale);
            if (!rel) return null;
            return <Link key={item.id} href={pathFor(locale, "awareness", rel.value.slug)}>{rel.value.title}</Link>;
          })}
        </div>
        <h2>{t.sections.relatedRes}</h2>
        {resources.map((item) => {
          const rel = pickLocale(item.translations, locale);
          if (!rel) return null;
          return <Link key={item.id} href={pathFor(locale, "resources", rel.value.slug)}>{rel.value.title}</Link>;
        })}
      </div></section>
    </>
  );
}

async function alerts(locale: Locale, slug: string | undefined, query: Record<string, string | undefined>) {
  const t = m(locale);
  const rows = (await listAlerts()).filter((row) => row.status === "published");
  const categories = await listCategories();
  if (!slug) {
    const filtered = rows.filter((row) => {
      if (query.risk && row.risk !== query.risk) return false;
      if (query.country && row.country !== query.country) return false;
      if (query.category && row.categoryId !== query.category) return false;
      if (query.q) {
        const copy = pickLocale(row.translations, locale);
        return `${copy?.value.title} ${copy?.value.summary}`.toLowerCase().includes(query.q.toLowerCase());
      }
      return true;
    });
    const pinned = filtered.find((row) => row.pinned || row.risk === "critical");
    return (
      <>
        <Hero locale={locale} eyebrow={t.alertsTitle} title={t.alertsTitle} lead={t.newsH2} />
        <section className="section"><div className="container" style={{ display: "grid", gap: 18 }}>
          <form className="card" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input name="q" defaultValue={query.q} placeholder={t.search} aria-label={t.search} />
            <select name="risk" defaultValue={query.risk || ""} aria-label={t.filters.risk}><option value="">{t.filters.risk}</option>{Object.entries(t.risk).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
            <select name="category" defaultValue={query.category || ""} aria-label={t.filters.category}><option value="">{t.filters.category}</option>{categories.map((item) => <option key={item.id} value={item.id}>{pickLocale(item.translations, locale)?.value.title}</option>)}</select>
            <button className="btn" type="submit">{t.filters.category}</button>
          </form>
          {pinned ? <AlertCard locale={locale} item={pinned} /> : null}
          <div className="cards-3">
            {filtered.filter((item) => item.id !== pinned?.id).map((item) => <AlertCard key={item.id} locale={locale} item={item} />)}
          </div>
          {filtered.length === 0 ? <p>{t.empty}</p> : null}
        </div></section>
      </>
    );
  }
  const row = await findBySlug(rows, locale, slug);
  if (!row) notFound();
  const copy = pickLocale(row.translations, locale)!;
  return (
    <>
      <Hero locale={locale} eyebrow={t.alertsTitle} title={copy.value.title} lead={copy.value.summary} />
      <section className="section"><div className="container prose" style={{ maxWidth: 860 }}>
        <RiskBadge level={row.risk as "low"} label={t.risk[row.risk as "low"]} />
        <p>{row.country} · {formatDate(row.publishedAt, locale)}</p>
        {row.image ? <Photo src={row.image} alt="" width={1200} height={800} /> : null}
        {copy.value.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <h2>{locale === "fr" ? "Actions recommandées" : "Recommended actions"}</h2>
        <ul>{copy.value.recommended.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="notice">{t.notPolice}</p>
      </div></section>
    </>
  );
}

function AlertCard({ locale, item }: { locale: Locale; item: { id: string; risk: string; country: string; image: string | null; translations: unknown } }) {
  const t = m(locale);
  const copy = pickLocale(item.translations as { en?: { title: string; slug: string; summary: string }; fr?: { title: string; slug: string; summary: string } }, locale);
  if (!copy) return null;
  return (
    <Link className="alert-card" href={pathFor(locale, "alerts", copy.value.slug)}>
      <div className="pad"><RiskBadge level={item.risk as "low"} label={t.risk[item.risk as "low"]} /> <span className="help">{item.country}</span></div>
      {item.image ? <Photo src={item.image} alt="" width={800} height={500} /> : null}
      <div className="pad"><h3>{copy.value.title}</h3><p className="muted">{copy.value.summary}</p></div>
    </Link>
  );
}

async function resources(locale: Locale, slug: string | undefined, query: Record<string, string | undefined>) {
  const t = m(locale);
  const rows = (await listResources()).filter((row) => row.status === "published");
  const cats = await listResourceCategories();
  if (!slug) {
    const filtered = rows.filter((row) => !query.category || row.categoryId === query.category);
    return (
      <>
        <Hero locale={locale} eyebrow={t.resourcesEyebrow} title={t.nav.resources} lead={t.resourcesLead} />
        <section className="section"><div className="container" style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="badge" href={pathFor(locale, "resources")}>{t.filters.all}</Link>
            {cats.map((cat) => {
              const copy = pickLocale(cat.translations, locale);
              if (!copy) return null;
              return <Link key={cat.id} className="badge" href={`${pathFor(locale, "resources")}?category=${cat.id}`}>{copy.value.name}</Link>;
            })}
          </div>
          <div className="grid-cards">
            {filtered.map((row) => {
              const copy = pickLocale(row.translations, locale);
              if (!copy) return null;
              return <Link key={row.id} className="card" href={pathFor(locale, "resources", copy.value.slug)}>{row.image ? <Photo src={row.image} alt="" width={800} height={500} /> : null}<span className="badge">{row.format}</span><h3>{copy.value.title}</h3><p className="muted">{copy.value.summary}</p></Link>;
            })}
          </div>
          <h2>FAQ</h2>
          <FaqList locale={locale} />
        </div></section>
      </>
    );
  }
  const row = await findBySlug(rows, locale, slug);
  if (!row) notFound();
  const copy = pickLocale(row.translations, locale)!;
  return (
    <>
      <Hero locale={locale} eyebrow={row.format} title={copy.value.title} lead={copy.value.summary} />
      <section className="section"><div className="container prose" style={{ maxWidth: 860 }}>
        {row.image ? <Photo src={row.image} alt="" width={1200} height={800} /> : null}
        <ul>{copy.value.body.map((item) => <li key={item}>{item}</li>)}</ul>
      </div></section>
    </>
  );
}

async function news(locale: Locale, slug: string | undefined, query: Record<string, string | undefined>) {
  const t = m(locale);
  const rows = (await listArticles()).filter((row) => row.status === "published");
  if (!slug) {
    const filtered = rows.filter((row) => !query.kind || row.kind === query.kind);
    return (
      <>
        <Hero locale={locale} eyebrow={t.nav.news} title={t.nav.news} />
        <section className="section"><div className="container">
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {["article", "campaign", "press"].map((kind) => <Link key={kind} className="badge" href={`${pathFor(locale, "news")}?kind=${kind}`}>{kind}</Link>)}
          </div>
          <div className="cards-3">
            {filtered.map((row) => {
              const copy = pickLocale(row.translations, locale);
              if (!copy) return null;
              return <Link key={row.id} className="article-card" href={pathFor(locale, "news", copy.value.slug)}>{row.image ? <Photo src={row.image} alt="" width={800} height={500} /> : null}<div className="pad"><span className="badge">{row.kind}</span><h3>{copy.value.title}</h3><p className="help">{row.author} · {formatDate(row.publishedAt, locale)}</p></div></Link>;
            })}
          </div>
        </div></section>
      </>
    );
  }
  const row = await findBySlug(rows, locale, slug);
  if (!row) notFound();
  const copy = pickLocale(row.translations, locale)!;
  const share = pathFor(locale, "news", copy.value.slug);
  return (
    <>
      <Hero locale={locale} eyebrow={row.kind} title={copy.value.title} lead={copy.value.summary} />
      <section className="section"><div className="container prose" style={{ maxWidth: 820 }}>
        <p className="help">{row.author} · {formatDate(row.publishedAt, locale)}</p>
        {row.image ? <Photo src={row.image} alt="" width={1200} height={800} /> : null}
        {copy.value.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <p><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(copy.value.title)}&url=${encodeURIComponent(share)}`}>Share</a></p>
      </div></section>
    </>
  );
}

async function servicesView(locale: Locale, slug: string[]) {
  const t = m(locale);
  const rows = (await listServices()).filter((row) => row.status === "published");
  const [group, serviceSlug] = slug;
  if (!group) {
    return (
      <>
        <Hero locale={locale} eyebrow={t.servicesEyebrow} title={t.nav.services} lead={t.servicesH2} />
        <section className="section"><div className="container grid-cards">
          {(["individuals", "businesses", "institutions", "training"] as const).map((key) => (
            <Link key={key} className="card" href={pathFor(locale, "services", key)}><h3>{t.groups[key]}</h3><p className="muted">{rows.filter((row) => row.groupKey === key).length}</p></Link>
          ))}
        </div></section>
      </>
    );
  }
  const groupRows = rows.filter((row) => row.groupKey === group);
  if (!serviceSlug) {
    return (
      <>
        <Hero locale={locale} eyebrow={t.nav.services} title={t.groups[group as "individuals"] || group} />
        <section className="section"><div className="container grid-cards">
          {groupRows.map((row) => {
            const copy = pickLocale(row.translations, locale);
            if (!copy) return null;
            return <Link key={row.id} className="card" href={pathFor(locale, "services", group, copy.value.slug)}><span className="badge">{t.pricing[row.pricingMode as "free"]}</span><h3>{copy.value.title}</h3><p>{copy.value.summary}</p></Link>;
          })}
        </div></section>
      </>
    );
  }
  const row = await findBySlug(groupRows, locale, serviceSlug);
  if (!row) notFound();
  const copy = pickLocale(row.translations, locale)!;
  return (
    <>
      <Hero locale={locale} eyebrow={t.pricing[row.pricingMode as "free"]} title={copy.value.title} lead={copy.value.summary} />
      <section className="section"><div className="container" style={{ display: "grid", gap: 18, maxWidth: 860 }}>
        <p>{copy.value.audience}</p>
        <div className="prose">{copy.value.body.map((paragraph, index) => paragraph.startsWith("## ") ? <h2 key={index} style={{ fontSize: "1.35rem" }}>{paragraph.slice(3)}</h2> : <p key={index}>{paragraph}</p>)}</div>
        <p className="notice">{t.paidBody}</p>
        <EnquiryForm locale={locale} serviceId={row.id} serviceLabel={copy.value.title} />
      </div></section>
    </>
  );
}

async function contact(locale: Locale, settings: WebsiteSettings | null) {
  const t = m(locale);
  return (
    <>
      <Hero locale={locale} eyebrow={t.nav.contact} title={t.contactTitle} lead={t.contactLead} />
      <section className="section"><div className="container split">
        <div className="card">
          {settings?.emailPublic && settings.email ? <p><a href={`mailto:${settings.email}`}>{settings.email}</a></p> : null}
          {settings?.phonePublic && settings.phone ? <p>{settings.phone}</p> : null}
          {settings?.locationPublic && settings.location ? <p>{settings.location}</p> : null}
          <ul>{settings?.socials.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul>
        </div>
        <ContactForm locale={locale} />
      </div></section>
    </>
  );
}

async function searchView(locale: Locale, q: string, type?: string) {
  const t = m(locale);
  const hits = q ? await searchPublished(q, locale, type) : [];
  return (
    <>
      <Hero locale={locale} eyebrow={t.search} title={t.searchPage.title} lead={t.searchPage.lead} />
      <section className="section"><div className="container" style={{ display: "grid", gap: 14 }}>
        <form className="card"><input name="q" defaultValue={q} aria-label={t.search} placeholder={t.searchPlaceholder} /><button className="btn" type="submit">{t.search}</button></form>
        <p>{hits.length} {t.searchPage.results}</p>
        {hits.map((hit) => <Link key={hit.href + hit.title} className="card" href={hit.href}><span className="badge">{hit.type}</span><h3>{hit.title}</h3><p className="muted">{hit.summary}</p></Link>)}
        {q && hits.length === 0 ? <p>{t.empty}</p> : null}
      </div></section>
    </>
  );
}

async function report(locale: Locale, slug: string | undefined, token?: string, confirmRef?: string, moneyLost?: boolean) {
  const t = m(locale);
  if (slug === "confirmation") {
    return (
      <>
        <Hero locale={locale} eyebrow={t.report.eyebrow} title={t.report.confirmTitle} lead={t.report.confirmLead} />
        <section className="section"><div className="container card" style={{ display: "grid", gap: 12, maxWidth: 720 }}>
          {confirmRef ? <><p className="stat-num">{confirmRef}</p><CopyButton value={confirmRef} label={t.report.copy} copied={t.report.copied} /></> : <p>{t.report.noConfirm}</p>}
          <h2 style={{ fontSize: "1.4rem" }}>{t.report.nextSteps}</h2>
          <p>{t.report.nextBody}</p>
          <p className="notice">{t.notPolice}</p>
          {moneyLost ? <div className="notice"><strong>{t.report.safetyTitle}</strong><p>{t.report.safetyBody}</p></div> : null}
        </div></section>
      </>
    );
  }
  const categories = (await listCategories()).filter((row) => row.status === "published").map((row) => ({ id: row.id, title: pickLocale(row.translations, locale)?.value.title || row.id }));
  const draft = await loadDraft(token);
  return (
    <>
      <Hero locale={locale} eyebrow={t.report.eyebrow} title={t.report.title} lead={t.report.reassurance} />
      <section className="section"><div className="container" style={{ maxWidth: 920 }}>
        <ReportWizard locale={locale} categories={categories} initial={draft?.data || { language: locale }} />
      </div></section>
    </>
  );
}

async function FaqList({ locale }: { locale: Locale }) {
  const faqs = await listFaqs();
  return (
    <div className="accordion" style={{ color: "inherit" }}>
      {faqs.map((faq) => {
        const copy = pickLocale(faq.translations, locale);
        if (!copy) return null;
        return <details key={faq.id}><summary>{copy.value.question}</summary><p>{copy.value.answer}</p></details>;
      })}
    </div>
  );
}
