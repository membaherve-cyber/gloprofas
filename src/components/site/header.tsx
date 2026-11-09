"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn, Menu, X } from "lucide-react";
import { Btn } from "@/components/zite/shared";
import { L, NAV_ITEMS, R } from "@/components/zite/copy";
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
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="on-dark fixed inset-x-0 top-0 z-50">
      <div className="hidden h-10 bg-navy-950 lg:block">
        <div className="container-g flex h-full items-center justify-between gap-6 text-sm">
          {latestAlert ? (
            <Link
              href={`/${locale}/alerts`}
              className="flex min-w-0 items-center gap-2 text-slatex-300 hover:text-white transition-colors duration-fast ease-standard"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-cyanx" />
              <span className="shrink-0 text-micro font-bold uppercase tracking-label text-white">
                {R(L.latestAlert, locale)}
              </span>
              <span className="ed-link truncate text-small">{latestAlert.title}</span>
            </Link>
          ) : (
            <span />
          )}
          <LangSwitch locale={locale} />
        </div>
      </div>

      <div
        className={`h-[68px] transition-colors duration-base ${
          scrolled || menuOpen ? "border-b border-white/12 bg-navy-950/97" : "bg-transparent"
        }`}
      >
        <div className="container-g flex h-full items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            aria-label="GLOPROFAS - Global Programme for the Fight Against Scams"
            className="inline-flex shrink-0 items-center bg-white px-2 py-1"
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
            <ul className="flex items-center gap-7">
              {NAV_ITEMS.map((item) => {
                const to = `/${locale}${item.href}`;
                const isActive = pathname === to || pathname.startsWith(`${to}/`);
                return (
                  <li key={item.key}>
                    <Link
                      href={to}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative py-1 text-base font-medium transition-colors hover:text-white ${
                        isActive ? "text-white" : "text-slatex-300"
                      }`}
                    >
                      {R(L.nav[item.key], locale)}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-0.5 left-0 h-px bg-cyanx transition-all duration-base ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/admin`}
              className="hidden items-center gap-2 px-2 text-sm font-semibold text-slatex-300 hover:text-white sm:flex transition-colors duration-fast ease-standard"
            >
              <LogIn className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {locale === "fr" ? "Connexion" : "Log in"}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={R(L.menu, locale)}
              className="flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-colors hover:border-white xl:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 top-[68px] overflow-y-auto bg-navy-950 xl:hidden">
          <div className="container-g flex flex-col gap-1 py-6">
            {NAV_ITEMS.map((item, idx) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-4 border-b border-white/12 py-4"
              >
                <span className="ed-num text-xs text-cyanx">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="font-[family-name:var(--font-heading)] text-lg font-medium text-white">
                  {R(L.nav[item.key], locale)}
                </span>
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
