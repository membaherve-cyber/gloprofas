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
const ScamCheckerView = lazy(() => import("@/components/views/resources-checker").then((m) => ({ default: m.ScamCheckerView })));
const ServicesView = lazy(() => import("@/components/views/services").then((m) => ({ default: m.ServicesView })));
const GetInvolvedView = lazy(() => import("@/components/views/get-involved").then((m) => ({ default: m.GetInvolvedView })));
const ContactView = lazy(() => import("@/components/views/contact").then((m) => ({ default: m.ContactView })));
const ReportView = lazy(() => import("@/components/views/report").then((m) => ({ default: m.ReportView })));
const LegalView = lazy(() => import("@/components/views/legal").then((m) => ({ default: m.LegalView })));
const AdminView = lazy(() => import("@/components/views/admin").then((m) => ({ default: m.AdminView })));

/** Per-route document titles (bilingual). */
function useRouteTitle(section: string, slug: string | undefined, subSlug: string | undefined) {
  const { locale, t } = useI18n();
  useEffect(() => {
    const resourceSubs: Record<string, { en: string; fr: string }> = {
      "practical-tools": { en: "Practical Tools to Protect Yourself", fr: "Outils pratiques pour vous protéger" },
      "knowledge-tools": { en: "Knowledge & Tools", fr: "Savoir et outils" },
      "video-learning": { en: "Video Learning Centre", fr: "Centre d’apprentissage vidéo" },
      "scam-checker": { en: "GLOPROFAS Scam Checker", fr: "GLOPROFAS Scam Checker" },
      "reporting-channels": { en: "Where to Report Scams and Cybercrime", fr: "Où signaler les arnaques et la cybercriminalité" },
      search: { en: "Search", fr: "Recherche" },
    };
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
      check: { en: "GLOPROFAS Scam Checker", fr: "GLOPROFAS Scam Checker" },
      legal: { en: t(`legal.${slug ?? "privacy"}`), fr: t(`legal.${slug ?? "privacy"}`) },
      admin: { en: "Team Log in", fr: "Connexion équipe" },
    };
    let base = titles[section] ?? titles[""];
    if (section === "resources" && slug && resourceSubs[slug]) {
      base = resourceSubs[slug];
      // Detail pages set their own richer titles via the view itself.
      if (subSlug) {
        return;
      }
    }
    document.title =
      section === ""
        ? base[locale]
        : `${base[locale]} · GLOPROFAS`;
  }, [section, slug, subSlug, locale, t]);
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
  const subSlug = parts[1];
  useRouteTitle(section, slug, subSlug);

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
        return <ScamCheckerView />;
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
