"use client";

/**
 * GLOPROFAS global footer — navy-950, link columns, contact block,
 * legal line, disclaimer.
 */

import React from "react";
import { ShieldCheck, Siren, MessageCircleQuestion, Radar } from "lucide-react";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R, L } from "@/lib/content/copy";
import { NAV_ITEMS } from "@/lib/site";

export function Footer() {
  const { locale, t } = useI18n();
  const year = new Date().getFullYear();

  const actionLinks = [
    { href: "/report", label: R(L.report, locale), icon: Siren },
    { href: "/check", label: locale === "fr" ? "Vérifier un numéro ou un lien" : "Check a number or link", icon: MessageCircleQuestion },
    { href: "/alerts", label: locale === "fr" ? "Alertes arnaques" : "Scam alerts", icon: Radar },
    { href: "/victim-support", label: locale === "fr" ? "Aide aux victimes" : "Victim support", icon: ShieldCheck },
  ];

  return (
    <footer className="on-dark bg-navy-950 text-slatex-300">
      <div className="container-g py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="mb-5 inline-block rounded-md bg-white px-3 py-2">
              <img src="/images/gloprofas-logo.png" alt="GLOPROFAS" className="h-9 w-auto" />
            </div>
            <p className="max-w-md text-[14px] leading-relaxed text-slatex-300">
              {R(L.footer.desc, locale)}
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {actionLinks.map(({ href, label, icon: Icon }) => (
                <A
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-[12.5px] font-semibold text-white/85 transition-colors hover:border-cyanx-500/60 hover:text-cyanx-500"
                >
                  <Icon size={14} strokeWidth={2.2} aria-hidden />
                  {label}
                </A>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav className="md:col-span-3" aria-label={R(L.footer.quick, locale)}>
            <h2 className="mb-4 font-heading text-[13px] font-semibold uppercase tracking-[0.14em] text-white">
              {R(L.footer.quick, locale)}
            </h2>
            <ul className="space-y-2.5 text-[14px]">
              {NAV_ITEMS.slice(0, 6).map((item) => (
                <li key={item.key}>
                  <A
                    href={item.href}
                    className="transition-colors hover:text-cyanx-500"
                  >
                    {R(L.nav[item.key as keyof typeof L.nav], locale)}
                  </A>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <h2 className="mb-4 font-heading text-[13px] font-semibold uppercase tracking-[0.14em] text-white">
              {R(L.footer.contactTitle, locale)}
            </h2>
            <dl className="space-y-2.5 text-[14px]">
              <div className="flex gap-2">
                <dt className="text-slatex-400">{locale === "fr" ? "Courriel" : "Email"}:</dt>
                <dd>
                  <a href="mailto:contact@gloprofas.org" className="transition-colors hover:text-cyanx-500">
                    contact@gloprofas.org
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-slatex-400">{locale === "fr" ? "Emplacement" : "Location"}:</dt>
                <dd>{locale === "fr" ? "Yaoundé, Cameroun · Initiative internationale" : "Yaoundé, Cameroon · International initiative"}</dd>
              </div>
            </dl>
            <p className="mt-5 text-[12.5px] leading-relaxed text-slatex-400">
              {R(L.footer.disclaimer, locale)}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-[12.5px] text-slatex-400 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {R(L.footer.rights, locale)}
          </p>
          <nav aria-label={t("legal.privacy")} className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <A href="/legal/privacy" className="transition-colors hover:text-white">
              {t("legal.privacy")}
            </A>
            <A href="/legal/terms" className="transition-colors hover:text-white">
              {t("legal.terms")}
            </A>
            <A href="/legal/cookies" className="transition-colors hover:text-white">
              {t("legal.cookies")}
            </A>
            <A href="/admin" className="transition-colors hover:text-white" rel="nofollow">
              {locale === "fr" ? "Connexion équipe" : "Team log in"}
            </A>
          </nav>
        </div>
      </div>
    </footer>
  );
}
