"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn, Menu, X } from "lucide-react";
import {
  Btn,
} from "@/components/zite/shared";
import { L, NAV_ITEMS } from "@/lib/zite-copy";

import { R } from "@/lib/zite-copy";

import type { Dictionary } from "@/messages/en";
import type { Locale } from "@/lib/i18n";

function LangSwitch({ locale, className = "" }: { locale: Locale; className?: string }) {
  const pathname = usePathname() || `/${locale}`;
  return (
    <div className={`flex items-center gap-1 text-sm ${className}`}>
      {(["en", "fr"] as const).map((lang, idx) => {
        const target = pathname.replace(/^\/(en|fr)/, `/${lang}`);
        return (
          <span key={lang} className="flex items-center gap-1">
            {idx > 0 ? <span className="text-white/30">|</span> : null}
            <Link
              href={target}
              hrefLang={lang}
              aria-current={locale === lang ? "true" : undefined}
              className={`px-1 font-semibold uppercase ${
                locale === lang ? "text-white" : "text-slatex-300 hover:text-white"
              }`}
            >
              {lang}
            </Link>
          </span>
        );
      })}
    </div>
  );
}

export function SiteHeader({
  locale,
  latestAlert,
}: {
  locale: Locale;
  dict?: Dictionary;
  categories?: { slugEn: string; slugFr: string; nameEn: string; nameFr: string }[];
  latestAlert: { title: string; href: string } | null;
  transparent?: boolean;
}) {
  const pathname = usePathname() || `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header className="on-dark fixed inset-x-0 top-0 z-50">
      <div className="hidden h-10 bg-navy-950 lg:block">
        <div className="container-g flex h-full items-center justify-between gap-6 text-sm">
          {latestAlert ? (
            <Link
              href={`/${locale}/alerts`}
              className="flex min-w-0 items-center gap-2 text-slatex-300 hover:text-white"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-cyanx" />
              <span className="font-semibold text-white">{R(L.latestAlert, locale)}:</span>
              <span className="truncate">{latestAlert.title}</span>
            </Link>
          ) : (
            <span />
          )}
          <LangSwitch locale={locale} />
        </div>
      </div>

      <div
        className={`h-[72px] transition-colors duration-250 ${
          scrolled || menuOpen ? "border-b border-white/10 bg-navy-900" : "bg-transparent"
        }`}
      >
        <div className="container-g flex h-full items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            aria-label="GLOPROFAS - Global Programme for the Fight Against Scams"
            className="inline-flex shrink-0 items-center rounded-[10px] bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-white/15 transition-transform duration-200 hover:-translate-y-px"
          >
            <Image
              src="/images/gloprofas-logo.png"
              alt="GLOPROFAS - Global Programme for the Fight Against Scams"
              width={1132}
              height={350}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                const to = `/${locale}${item.href}`;
                const isActive = pathname === to || pathname.startsWith(`${to}/`);
                return (
                  <li key={item.key}>
                    <Link
                      href={to}
                      className={`relative py-2.5 text-[0.875rem] font-semibold tracking-[0.005em] transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-cyanx after:transition-transform after:duration-200 hover:text-white ${
                        isActive
                          ? "text-white after:scale-x-100"
                          : "text-slatex-300 after:scale-x-0 hover:after:scale-x-100"
                      }`}
                    >
                      {R(L.nav[item.key], locale)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/admin`}
              className="hidden items-center gap-1.5 px-2 text-sm font-semibold text-slatex-300 hover:text-white sm:flex"
            >
              <LogIn className="h-4 w-4" />
              {locale === "fr" ? "Connexion" : "Log in"}
            </Link>
            <Btn
              href={`/${locale}/report`}
              variant="signal"
              arrow={false}
              className="h-11 px-5 text-sm"
            >
              {R(L.report, locale)}
            </Btn>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={R(L.menu, locale)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white xl:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={R(L.menu, locale)}
          className="fixed inset-0 top-[72px] overflow-y-auto border-t border-white/10 bg-navy-950 xl:hidden"
        >
          <div className="container-g flex flex-col gap-1 py-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-4 font-[family-name:var(--font-heading)] text-xl font-semibold text-white"
              >
                {R(L.nav[item.key], locale)}
              </Link>
            ))}
            <LangSwitch locale={locale} className="mt-6 text-base" />
            <Link
              href={`/${locale}/admin`}
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex items-center gap-2 font-semibold text-white"
            >
              <LogIn className="h-5 w-5" />
              {locale === "fr" ? "Connexion équipe" : "Team log in"}
            </Link>
            <div className="mt-8" onClick={() => setMenuOpen(false)}>
              <Btn href={`/${locale}/report`} variant="signal" className="w-full">
                {R(L.report, locale)}
              </Btn>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
