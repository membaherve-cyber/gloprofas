"use client";

/**
 * GLOPROFAS global header — Apple HIG edition.
 * Fixed, frosted glass (blur 20px · saturate 180%); slim utility bar with
 * latest alert + EN/FR switch; main bar with logo, 8-item nav, accent pill
 * "Report a scam" CTA; accessible light mobile drawer.
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav border-b border-black/[0.08]"
          : "glass-nav border-b border-black/[0.05]"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-900 focus:shadow-e2"
      >
        {t("nav.skip")}
      </a>

      {/* Utility bar */}
      <div className="hidden border-b border-black/[0.05] lg:block">
        <div className="container-g flex h-9 items-center justify-between text-[12px]">
          {latestAlert ? (
            <A
              href={`/alerts/${latestAlert.id}`}
              className="group flex min-w-0 items-center gap-2.5 text-slatex-600 transition-colors hover:text-ink-900"
            >
              <span className="pulse-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" aria-hidden />
              <span className="eyebrow !text-[11px] !text-ink-900">{R(L.latestAlert, locale)}</span>
              <span className="truncate font-medium text-slatex-600 group-hover:text-ink-900">
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
              className="relative h-[18px] w-9 rounded-full border border-black/[0.15] bg-black/[0.04] transition-all duration-300 hover:border-black/30"
            >
              <span
                className={`absolute top-[2px] h-[12px] w-[12px] rounded-full transition-all duration-300 ${
                  locale === "fr" ? "left-[19px] bg-ink-900" : "left-[3px] bg-ink-900"
                }`}
              />
            </button>
            <span className="text-slatex-400" aria-hidden>FR</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-g flex h-[56px] items-center justify-between gap-4 lg:h-[60px]">
        <A href="/" className="flex shrink-0 items-center gap-3" aria-label="GLOPROFAS — Home">
          <img
            src="/images/gloprofas-logo.png"
            alt=""
            width={132}
            height={40}
            className="h-[26px] w-auto lg:h-[30px]"
          />
          <span className="hidden 2xl:block">
            <span className="block font-heading text-[14px] font-bold leading-tight tracking-[-0.02em] text-ink-900">
              GLOPROFAS
            </span>
            <span className="block text-[10.5px] leading-tight text-slatex-600">
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors duration-300 hover:bg-black/[0.05] xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={t("nav.menu")}
            onClick={() => setOpen(true)}
          >
            <Menu size={21} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div id="mobile-drawer" className="fixed inset-0 z-[70] xl:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            aria-label={t("nav.close")}
            onClick={() => setOpen(false)}
            tabIndex={-1}
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-[#fbfbfd] shadow-e3">
            <div className="flex h-16 items-center justify-between border-b border-black/[0.06] px-5">
              <img src="/images/gloprofas-logo.png" alt="" className="h-8 w-auto" />
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors duration-300 hover:bg-black/[0.05]"
                aria-label={t("nav.close")}
                onClick={() => setOpen(false)}
              >
                <X size={21} strokeWidth={1.8} />
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
                        className={`flex items-baseline gap-4 rounded-2xl px-3 py-3 transition-all duration-300 ${
                          active ? "bg-black/[0.05]" : "hover:bg-black/[0.03]"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="mast-num text-[12px]">{String(i + 1).padStart(2, "0")}</span>
                        <span className={`font-heading text-[16px] font-semibold tracking-[-0.02em] ${
                          active ? "text-brand-600" : "text-ink-900"
                        }`}>
                          {R(L.nav[item.key as keyof typeof L.nav], locale)}
                        </span>
                      </A>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 border-t border-black/[0.06] pt-6">
                <p className="mb-3 text-[12px] font-semibold tracking-[0.01em] text-slatex-600">
                  {locale === "fr" ? "Langue" : "Language"}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(["en", "fr"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLocale(l)}
                      aria-pressed={locale === l}
                      className={`h-11 rounded-full border text-sm font-semibold transition-all duration-300 ${
                        locale === l
                          ? "border-transparent bg-ink-900 text-white"
                          : "border-black/[0.12] text-ink-900 hover:border-black/30"
                      }`}
                    >
                      {l === "en" ? "English" : "Français"}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
            <div className="border-t border-black/[0.06] p-5">
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
