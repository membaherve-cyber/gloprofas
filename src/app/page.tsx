"use client";

/**
 * GLOPROFAS application shell.
 * Single-route architecture: every "page" is a view addressed by hash
 * (#/about, #/scams/phishing, #/report …). Bilingual EN/FR via I18nProvider.
 */

import React, { Suspense, lazy, useEffect, useMemo } from "react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { RouterProvider, useRouter } from "@/lib/router";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AssistantLauncher } from "@/components/layout/assistant";

const HomeView = lazy(() => import("@/components/views/home").then((m) => ({ default: m.HomeView })));
const AboutView = lazy(() => import("@/components/views/about").then((m) => ({ default: m.AboutView })));
const ActivitiesView = lazy(() => import("@/components/views/activities").then((m) => ({ default: m.ActivitiesView })));
const ScamsView = lazy(() => import("@/components/views/scams").then((m) => ({ default: m.ScamsView })));
const ScamDetailView = lazy(() => import("@/components/views/scams").then((m) => ({ default: m.ScamDetailView })));
const AlertsView = lazy(() => import("@/components/views/alerts").then((m) => ({ default: m.AlertsView })));
const AlertDetailView = lazy(() => import("@/components/views/alerts").then((m) => ({ default: m.AlertDetailView })));
const VictimSupportView = lazy(() => import("@/components/views/victim-support").then((m) => ({ default: m.VictimSupportView })));
const NewsView = lazy(() => import("@/components/views/news").then((m) => ({ default: m.NewsView })));
const NewsDetailView = lazy(() => import("@/components/views/news").then((m) => ({ default: m.NewsDetailView })));
const ResourcesView = lazy(() => import("@/components/views/resources").then((m) => ({ default: m.ResourcesView })));
const ServicesView = lazy(() => import("@/components/views/services").then((m) => ({ default: m.ServicesView })));
const GetInvolvedView = lazy(() => import("@/components/views/get-involved").then((m) => ({ default: m.GetInvolvedView })));
const ContactView = lazy(() => import("@/components/views/contact").then((m) => ({ default: m.ContactView })));
const ReportView = lazy(() => import("@/components/views/report").then((m) => ({ default: m.ReportView })));
const CheckView = lazy(() => import("@/components/views/check").then((m) => ({ default: m.CheckView })));
const LegalView = lazy(() => import("@/components/views/legal").then((m) => ({ default: m.LegalView })));
const AdminView = lazy(() => import("@/components/views/admin").then((m) => ({ default: m.AdminView })));

/** Per-route document titles (bilingual). */
function useRouteTitle(section: string, slug: string | undefined) {
  const { locale, t } = useI18n();
  useEffect(() => {
    const titles: Record<string, { en: string; fr: string }> = {
      "": {
        en: "GLOPROFAS | Scam Awareness & Fraud Prevention",
        fr: "GLOPROFAS | Sensibilisation aux arnaques et prévention de la fraude",
      },
      about: { en: "About", fr: "À propos" },
      activities: { en: "Activities & Programmes", fr: "Activités et programmes" },
      scams: { en: "Scam Awareness Centre", fr: "Centre de sensibilisation aux arnaques" },
      alerts: { en: "Scam Alerts", fr: "Alertes arnaques" },
      "victim-support": { en: "Victim Support", fr: "Aide aux victimes" },
      news: { en: "News & Publications", fr: "Actualités et publications" },
      resources: { en: "Resource Centre", fr: "Centre de ressources" },
      services: { en: "Services", fr: "Services" },
      "get-involved": { en: "Get Involved", fr: "S'impliquer" },
      contact: { en: "Contact", fr: "Contact" },
      report: { en: "Report a Scam", fr: "Signaler une arnaque" },
      check: { en: "Check a Number, Link or Message", fr: "Vérifier un numéro, un lien ou un message" },
      legal: { en: t(`legal.${slug ?? "privacy"}`), fr: t(`legal.${slug ?? "privacy"}`) },
      admin: { en: "Team Log in", fr: "Connexion équipe" },
    };
    const base = titles[section] ?? titles[""];
    document.title = slug
      ? `${base[locale]} · GLOPROFAS`
      : section === ""
        ? base[locale]
        : `${base[locale]} · GLOPROFAS`;
  }, [section, slug, locale, t]);
}

function ViewSkeleton() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-24" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-3 text-slatex-400">
        <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-line-200 border-t-brand-600" />
        <span className="text-[13px]">GLOPROFAS…</span>
      </div>
    </div>
  );
}

function Views() {
  const { route } = useRouter();
  const { section, parts } = route;
  const slug = parts[0];
  useRouteTitle(section, slug);

  const view = useMemo(() => {
    switch (section) {
      case "":
        return <HomeView />;
      case "about":
        return <AboutView />;
      case "activities":
        return <ActivitiesView />;
      case "scams":
        return slug ? <ScamDetailView slug={slug} /> : <ScamsView />;
      case "alerts":
        return slug ? <AlertDetailView id={slug} /> : <AlertsView />;
      case "victim-support":
        return <VictimSupportView />;
      case "news":
        return slug ? <NewsDetailView id={slug} /> : <NewsView />;
      case "resources":
        return <ResourcesView />;
      case "services":
        return <ServicesView />;
      case "get-involved":
        return <GetInvolvedView />;
      case "contact":
        return <ContactView />;
      case "report":
        return <ReportView />;
      case "check":
        return <CheckView />;
      case "legal":
        return <LegalView slug={slug ?? "privacy"} />;
      case "admin":
        return <AdminView />;
      default:
        return <HomeView />;
    }
  }, [section, slug]);

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <Suspense fallback={<ViewSkeleton />}>{view}</Suspense>
    </main>
  );
}

function Shell() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <Views />
      <Footer />
      <AssistantLauncher />
    </div>
  );
}

export default function Page() {
  useEffect(() => {
    // Ensure a hash exists so the router is always addressable.
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#/");
    }
  }, []);

  return (
    <I18nProvider>
      <RouterProvider>
        <Shell />
      </RouterProvider>
    </I18nProvider>
  );
}
