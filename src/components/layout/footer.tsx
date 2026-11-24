"use client";

/**
 * GLOPROFAS global footer — Apple.com edition.
 * Soft gray surface, 12px secondary text, hairline dividers,
 * compact link columns, legal line, disclaimer.
 */

import React from "react";
import { ShieldCheck, Siren, MessageCircleQuestion, Radar } from "lucide-react";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R, L } from "@/lib/content/copy";
import { ZITE_CONTENT } from "@/lib/content/zite-data";
import { NAV_ITEMS } from "@/lib/site";

export function Footer() {
  const { locale, t } = useI18n();
  const year = new Date().getFullYear();

  const actionLinks = [
    { href: "/report", label: R(L.report, locale), icon: Siren },
    { href: "/resources/scam-checker", label: locale === "fr" ? "Scam Checker" : "Scam Checker", icon: MessageCircleQuestion },
    { href: "/alerts", label: locale === "fr" ? "Alertes arnaques" : "Scam alerts", icon: Radar },
    { href: "/resources/reporting-channels/victim-guide", label: locale === "fr" ? "Guide d’urgence" : "Emergency guide", icon: ShieldCheck },
  ];

  const resourceLinks = [
    { href: "/resources", label: locale === "fr" ? "Centre de ressources" : "Resource Centre" },
    { href: "/resources/practical-tools", label: locale === "fr" ? "Outils pratiques" : "Practical Tools" },
    { href: "/resources/knowledge-tools", label: locale === "fr" ? "Savoir et outils" : "Knowledge & Tools" },
    { href: "/resources/video-learning", label: locale === "fr" ? "Centre vidéo" : "Video Learning Centre" },
    { href: "/resources/reporting-channels", label: locale === "fr" ? "Canaux de signalement" : "Reporting Channels" },
  ];

  return (
    <footer className="bg-[#f5f5f7] text-slatex-600">
      <div className="container-g py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <img src="/images/gloprofas-logo.png" alt="GLOPROFAS" className="mb-5 h-9 w-auto" />
            <p className="max-w-md text-[13px] leading-relaxed text-slatex-600">
              {R(L.footer.desc, locale)}
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {actionLinks.map(({ href, label, icon: Icon }) => (
                <A
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.12] bg-white px-3.5 py-2 text-[12.5px] font-medium text-ink-900 transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-black/30 hover:bg-white active:scale-[0.98]"
                >
                  <Icon size={14} strokeWidth={2} aria-hidden />
                  {label}
                </A>
              ))}
            </div>
          </div>

          {/* Quick links + Resource Centre */}
          <nav className="md:col-span-2" aria-label={R(L.footer.quick, locale)}>
            <h2 className="mb-3 text-[12px] font-semibold text-ink-900">
              {R(L.footer.quick, locale)}
            </h2>
            <ul className="space-y-2 text-[12.5px]">
              {NAV_ITEMS.slice(0, 6).map((item) => (
                <li key={item.key}>
                  <A
                    href={item.href}
                    className="text-[#424245] transition-colors duration-300 hover:text-ink-900 hover:underline"
                  >
                    {R(L.nav[item.key as keyof typeof L.nav], locale)}
                  </A>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="md:col-span-2" aria-label={locale === "fr" ? "Centre de ressources" : "Resource Centre"}>
            <h2 className="mb-3 text-[12px] font-semibold text-ink-900">
              {locale === "fr" ? "Ressources" : "Resources"}
            </h2>
            <ul className="space-y-2 text-[12.5px]">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <A
                    href={item.href}
                    className="text-[#424245] transition-colors duration-300 hover:text-ink-900 hover:underline"
                  >
                    {item.label}
                  </A>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-3">
            <h2 className="mb-3 text-[12px] font-semibold text-ink-900">
              {R(L.footer.contactTitle, locale)}
            </h2>
            <dl className="space-y-2 text-[12.5px]">
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-slatex-400">{locale === "fr" ? "Courriel" : "Email"}:</dt>
                <dd className="min-w-0 [overflow-wrap:anywhere]">
                  <a href="mailto:contact@gloprofas.org" className="text-[#424245] transition-colors duration-300 hover:text-ink-900 hover:underline">
                    contact@gloprofas.org
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-slatex-400">{locale === "fr" ? "Emplacement" : "Location"}:</dt>
                <dd className="min-w-0 [overflow-wrap:anywhere] text-[#424245]">{locale === "fr" ? "Akwa, Douala, Cameroun · Initiative internationale" : "Akwa, Douala, Cameroon · International initiative"}</dd>
              </div>
            </dl>
            <p className="mt-5 text-[12px] leading-relaxed text-slatex-400">
              {R(L.footer.disclaimer, locale)}
            </p>
          </div>
        </div>

        {/* Topics index — visible deep links to every scam category (internal linking) */}
        <nav
          aria-label={locale === "fr" ? "Types d’arnaques couverts" : "Scam types covered"}
          className="mt-9 border-t border-black/[0.08] pt-6"
        >
          <p className="mb-3 text-[12px] font-semibold text-slatex-600">
            {locale === "fr"
              ? "Types d’arnaques que nous couvrons"
              : "Scam types we cover"}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-slatex-400">
            {ZITE_CONTENT.categories.map((c) => (
              <li key={c.slug}>
                <A
                  href={`/scams/${c.slug}`}
                  className="transition-colors duration-300 hover:text-ink-900 hover:underline"
                >
                  {locale === "fr" ? c.title.fr : c.title.en}
                </A>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-7 flex flex-col gap-4 border-t border-black/[0.08] pt-6 text-[12px] text-slatex-400 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {R(L.footer.rights, locale)}
          </p>
          <nav aria-label={t("legal.privacy")} className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <A href="/legal/privacy" className="text-[#424245] transition-colors duration-300 hover:text-ink-900 hover:underline">
              {t("legal.privacy")}
            </A>
            <A href="/legal/terms" className="text-[#424245] transition-colors duration-300 hover:text-ink-900 hover:underline">
              {t("legal.terms")}
            </A>
            <A href="/legal/cookies" className="text-[#424245] transition-colors duration-300 hover:text-ink-900 hover:underline">
              {t("legal.cookies")}
            </A>
            <A href="/admin" className="text-[#424245] transition-colors duration-300 hover:text-ink-900 hover:underline" rel="nofollow">
              {locale === "fr" ? "Connexion équipe" : "Team log in"}
            </A>
          </nav>
        </div>
      </div>
    </footer>
  );
}
