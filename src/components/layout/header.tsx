"use client";

/**
 * GLOPROFAS global header.
 * Fixed, dark navy; top utility bar with latest alert + EN/FR switch;
 * main bar with logo, 8-item nav, prominent amber "Report a scam" CTA;
 * accessible mobile drawer.
 */

import React, { useEffect, useState } from "react";
import { Menu, X, Siren } from "lucide-react";
import { A, useRouter } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R, L } from "@/lib/content/copy";
import { ZITE_CONTENT } from "@/lib/content/zite-data";
import { NAV_ITEMS } from "@/lib/site";

export function Header() {
  const { locale, setLocale, t } = useI18n();
  const { route } = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Close the drawer when the route changes (render-time adjustment).
  const [prevPath, setPrevPath] = useState(route.path);
  if (prevPath !== route.path) {
    setPrevPath(route.path);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) document.body.dataset.drawerOpen = "1";
    else delete document.body.dataset.drawerOpen;
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.drawerOpen;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const latestAlert = ZITE_CONTENT.alerts[0];

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-navy-950/[0.985] shadow-[0_8px_30px_rgba(5,11,26,0.35)]" : "bg-navy-950/90"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-950"
      >
        {t("nav.skip")}
      </a>

      {/* Utility bar */}
      <div className="hidden border-b border-white/10 lg:block">
        <div className="container-g flex h-10 items-center justify-between text-[12.5px]">
          {latestAlert ? (
            <A
              href={`/alerts/${latestAlert.id}`}
              className="group flex min-w-0 items-center gap-2.5 text-slatex-300 hover:text-white transition-colors"
            >
              <span className="pulse-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" aria-hidden />
              <span className="eyebrow !text-[10.5px] !text-cyanx-500">{R(L.latestAlert, locale)}</span>
              <span className="truncate font-medium text-white/85 group-hover:text-white">
                {R(latestAlert.title, locale)}
              </span>
            </A>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-2" role="group" aria-label={locale === "fr" ? "Langue" : "Language"}>
            <span className="text-slatex-400" aria-hidden>EN</span>
            <button
              type="button"
              role="switch"
              aria-checked={locale === "fr"}
              aria-label={locale === "fr" ? "Passer en anglais" : "Passer en français"}
              onClick={() => setLocale(locale === "en" ? "fr" : "en")}
              className="relative h-[18px] w-9 rounded-full border border-white/25 bg-white/10 transition-colors hover:border-cyanx-500/60"
            >
              <span
                className={`absolute top-[2px] h-[12px] w-[12px] rounded-full transition-all duration-200 ${
                  locale === "fr" ? "left-[19px] bg-cyanx-500" : "left-[3px] bg-white"
                }`}
              />
            </button>
            <span className="text-slatex-400" aria-hidden>FR</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-g flex h-[64px] items-center justify-between gap-4 lg:h-[68px]">
        <A href="/" className="flex shrink-0 items-center gap-3" aria-label="GLOPROFAS — Home">
          <span className="rounded-md bg-white px-2.5 py-1.5 shadow-e1">
            <img
              src="/images/gloprofas-logo.png"
              alt=""
              width={132}
              height={40}
              className="h-[30px] w-auto lg:h-[34px]"
            />
          </span>
          <span className="hidden 2xl:block">
            <span className="block font-heading text-[15px] font-bold leading-tight tracking-tight text-white">
              GLOPROFAS
            </span>
            <span className="block text-[10.5px] leading-tight text-slatex-300">
              {locale === "fr"
                ? "Programme mondial de lutte contre les arnaques"
                : "Global Programme for the Fight Against Scams"}
            </span>
          </span>
        </A>

        <nav aria-label="Primary" className="hidden items-center gap-[18px] min-[1440px]:gap-6 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              route.path === item.href ||
              (item.href !== "/" && route.path.startsWith(item.href));
            return (
              <A
                key={item.key}
                href={item.href}
                className={`nav-link-g ${active ? "active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {R(L.nav[item.key as keyof typeof L.nav], locale)}
              </A>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <A
            href="/report"
            className="btn-g btn-signal-g btn-sm-g hidden sm:inline-flex"
          >
            <Siren size={15} strokeWidth={2.2} aria-hidden />
            {R(L.report, locale)}
          </A>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={t("nav.menu")}
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div id="mobile-drawer" className="fixed inset-0 z-[70] xl:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="absolute inset-0 bg-navy-950/70 backdrop-blur-[2px]"
            aria-label={t("nav.close")}
            onClick={() => setOpen(false)}
            tabIndex={-1}
          />
          <div className="on-dark absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-navy-950 shadow-e3">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
              <img src="/images/gloprofas-logo.png" alt="" className="h-8 w-auto" />
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10"
                aria-label={t("nav.close")}
                onClick={() => setOpen(false)}
              >
                <X size={22} />
              </button>
            </div>
            <nav aria-label="Mobile" className="scroll-g flex-1 overflow-y-auto px-5 py-6">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item, i) => {
                  const active =
                    route.path === item.href ||
                    (item.href !== "/" && route.path.startsWith(item.href));
                  return (
                    <li key={item.key}>
                      <A
                        href={item.href}
                        className={`flex items-baseline gap-4 rounded-lg px-3 py-3 transition-colors ${
                          active ? "bg-white/[0.07]" : "hover:bg-white/[0.05]"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="mast-num text-[13px]">{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-heading text-[15px] font-semibold text-white">
                          {R(L.nav[item.key as keyof typeof L.nav], locale)}
                        </span>
                      </A>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-slatex-400">
                  {locale === "fr" ? "Langue" : "Language"}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(["en", "fr"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLocale(l)}
                      aria-pressed={locale === l}
                      className={`h-11 rounded-lg border text-sm font-semibold transition-colors ${
                        locale === l
                          ? "border-cyanx-500 bg-cyanx-500/10 text-cyanx-500"
                          : "border-white/15 text-white/80 hover:border-white/40"
                      }`}
                    >
                      {l === "en" ? "English" : "Français"}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
            <div className="border-t border-white/10 p-5">
              <A href="/report" className="btn-g btn-signal-g w-full">
                <Siren size={16} strokeWidth={2.2} aria-hidden />
                {R(L.report, locale)}
              </A>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
