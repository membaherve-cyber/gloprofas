import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Footer } from "@/components/footer";
import { Header, type NavItem } from "@/components/header";
import { Assistant } from "@/components/widgets";
import { ensureSeeded } from "@/db/seed";
import { m } from "@/lib/i18n";
import { pathFor } from "@/lib/paths";
import { isLocale, pickLocale } from "@/lib/utils";
import { buildAlternateMap, getChatSettings, getSettings, listAlerts, listCategories, listPages } from "@/server/queries";
import { publishDue } from "@/server/services";

export const dynamic = "force-dynamic";

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  await ensureSeeded();
  await publishDue().catch(() => undefined);
  const t = m(raw);
  const [settings, categories, alerts, pages, alternates, chat, headerStore] = await Promise.all([
    getSettings(),
    listCategories(),
    listAlerts(),
    listPages(),
    buildAlternateMap(),
    getChatSettings(),
    headers(),
  ]);
  const publishedAlerts = alerts.filter((item) => item.status === "published");
  const latest = publishedAlerts.find((item) => item.pinned) || publishedAlerts[0];
  const latestCopy = latest ? pickLocale(latest.translations, raw) : null;
  const about = pages.filter((item) => item.section === "about").map((item) => {
    const copy = pickLocale(item.translations, raw);
    return copy ? { label: copy.value.title, href: pathFor(raw, "about", copy.value.slug) } : null;
  }).filter((item): item is { label: string; href: string } => Boolean(item));
  const involved = pages.filter((item) => item.section === "involved").map((item) => {
    const copy = pickLocale(item.translations, raw);
    return copy ? { label: copy.value.title, href: pathFor(raw, "involved", copy.value.slug) } : null;
  }).filter((item): item is { label: string; href: string } => Boolean(item));
  const items: NavItem[] = [
    { label: t.nav.about, href: pathFor(raw, "about"), children: about },
    { label: t.nav.awareness, href: pathFor(raw, "awareness"), children: categories.filter((item) => item.status === "published").map((item) => {
      const copy = pickLocale(item.translations, raw);
      return copy ? { label: copy.value.title, href: pathFor(raw, "awareness", copy.value.slug) } : null;
    }).filter((item): item is { label: string; href: string } => Boolean(item)) },
    { label: t.nav.resources, href: pathFor(raw, "resources") },
    { label: t.nav.services, href: pathFor(raw, "services"), children: (["individuals", "businesses", "institutions", "training"] as const).map((key) => ({ label: t.groups[key], href: pathFor(raw, "services", key) })) },
    { label: t.nav.news, href: pathFor(raw, "news"), children: [
      { label: t.nav.news, href: pathFor(raw, "news") },
      { label: t.alertsTitle, href: pathFor(raw, "alerts") },
      { label: t.newsLinks[2], href: `${pathFor(raw, "news")}?kind=campaign` },
      { label: t.newsLinks[3], href: `${pathFor(raw, "news")}?kind=press` },
    ] },
    { label: t.nav.involved, href: pathFor(raw, "involved"), children: involved },
    { label: t.nav.contact, href: pathFor(raw, "contact") },
    { label: t.login, href: `/${raw}/login` },
  ];
  return (
    <>
      <Header
        locale={raw}
        home={`/${raw}`}
        items={items}
        reportHref={pathFor(raw, "report")}
        searchHref={pathFor(raw, "search")}
        loginHref={`/${raw}/login`}
        alert={latest && latestCopy ? { title: latestCopy.value.title, href: pathFor(raw, "alerts", latestCopy.value.slug) } : null}
        alternates={alternates}
        pathname={headerStore.get("x-pathname") || `/${raw}`}
      />
      <main id="main">{children}</main>
      <Footer locale={raw} settings={settings} />
      {chat?.enabled ? <Assistant locale={raw} welcome={chat.welcome[raw] || chat.welcome.en || ""} suggestions={chat.suggestions[raw] || chat.suggestions.en || []} /> : null}
    </>
  );
}
