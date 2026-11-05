"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/ui";
import type { Locale } from "@/lib/types";
import { m } from "@/lib/i18n";

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export function Header({
  locale,
  home,
  items,
  reportHref,
  searchHref,
  loginHref,
  alert,
  alternates,
  pathname,
}: {
  locale: Locale;
  home: string;
  items: NavItem[];
  reportHref: string;
  searchHref: string;
  loginHref: string;
  alert?: { title: string; href: string } | null;
  alternates: Record<string, string>;
  pathname: string;
}) {
  const t = m(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const other = locale === "en" ? "fr" : "en";
  const switchHref = alternates[pathname] || `/${other}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      document.documentElement.style.setProperty("--px", `${x}px`);
      document.documentElement.style.setProperty("--py", `${y}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <div className="chrome">
        <div className="utility">
          <div className="container utility-inner">
            {alert ? (
              <div className="ticker">
                <span className="dot" aria-hidden="true" />
                <span>{locale === "fr" ? "Dernière alerte" : "Latest alert"}</span>
                <Link href={alert.href}>{alert.title}</Link>
              </div>
            ) : <span />}
            <div className="util-links">
              <Link href={switchHref} hrefLang={other}>{other.toUpperCase()}</Link>
              <span aria-hidden="true">|</span>
              <Link href={loginHref}>{t.login}</Link>
            </div>
          </div>
        </div>
        <header className={`header ${scrolled || pathname !== home ? "scrolled" : ""}`}>
          <div className="container header-inner">
            <Link href={home} aria-label="GLOPROFAS"><Logo size="sm" priority /></Link>
            <nav className="nav-desktop" aria-label="Main">
              {items.map((item) => (
                <div className="nav-item" key={item.href}>
                  <Link className="nav-link" href={item.href}>{item.label}</Link>
                  {item.children ? (
                    <div className={`dropdown ${item.children.length > 6 ? "mega" : ""}`}>
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>{child.label}</Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div className="search-pop">
                <button className="icon-btn" aria-label={t.search} type="button"><Search size={18} /></button>
                <form action={searchHref} method="get">
                  <input name="q" aria-label={t.search} placeholder={t.searchPlaceholder} />
                </form>
              </div>
              <Link className="btn btn-signal" href={reportHref}>{t.reportCta}</Link>
              <button className="nav-toggle icon-btn" type="button" aria-expanded={open} aria-label={t.menu} onClick={() => setOpen(true)}>
                <Menu />
              </button>
            </div>
          </div>
        </header>
      </div>
      {open ? (
        <div className="drawer" role="dialog" aria-modal="true" aria-label={t.menu}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Logo />
            <button className="icon-btn" type="button" onClick={() => setOpen(false)} aria-label={t.close}><X /></button>
          </div>
          <form action={searchHref} method="get" style={{ margin: "16px 0" }}>
            <input name="q" aria-label={t.search} placeholder={t.searchPlaceholder} style={{ width: "100%", minHeight: 48, borderRadius: 14, border: 0, padding: "0 12px" }} />
          </form>
          <div className="drawer-scroll">
            {items.map((item) => item.children ? (
              <details key={item.href}>
                <summary>{item.label}</summary>
                <div className="sub">
                  {item.children.map((child) => <Link key={child.href} href={child.href} onClick={() => setOpen(false)}>{child.label}</Link>)}
                </div>
              </details>
            ) : (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} style={{ display: "flex", minHeight: 48, alignItems: "center", fontWeight: 700, textDecoration: "none" }}>{item.label}</Link>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link href={switchHref}>{other.toUpperCase()}</Link>
            <Link href={loginHref}>{t.login}</Link>
          </div>
          <Link className="btn btn-signal pin-report" href={reportHref}>{t.reportCta}</Link>
        </div>
      ) : null}
    </>
  );
}
