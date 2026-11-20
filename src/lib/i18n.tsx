"use client";

/**
 * GLOPROFAS bilingual system — English (primary) / French.
 * Locale is app-level state persisted in localStorage.
 * Dictionary access falls back to English for any missing key.
 */

import React, {
  createContext,
  useSyncExternalStore,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Locale = "en" | "fr";
export const LOCALES: Locale[] = ["en", "fr"];
export const DEFAULT_LOCALE: Locale = "en";

import en from "@/lib/content/en.json";
import fr from "@/lib/content/fr.json";

type Dict = Record<string, unknown>;

const DICTS: Record<Locale, Dict> = { en: en as Dict, fr: fr as Dict };

/* ---------- helpers ---------- */

/** Resolve a dotted key ("report.labels.category") in a dictionary. */
export function lookup(dict: Dict, key: string): unknown {
  let node: unknown = dict;
  for (const part of key.split(".")) {
    if (node && typeof node === "object" && part in (node as Dict)) {
      node = (node as Dict)[part];
    } else {
      return undefined;
    }
  }
  return node;
}

/** Typed string lookup with English fallback. */
export function t(locale: Locale, key: string): string {
  const v = lookup(DICTS[locale], key) ?? lookup(DICTS.en, key);
  if (typeof v === "string") return v;
  return key;
}

/** Typed string[] lookup with English fallback. */
export function tArr(locale: Locale, key: string): string[] {
  const v = lookup(DICTS[locale], key) ?? lookup(DICTS.en, key);
  if (Array.isArray(v) && v.every((x) => typeof x === "string")) return v as string[];
  return [];
}

/** Raw lookup returning any JSON value (objects, arrays of objects…). */
export function tRaw(locale: Locale, key: string): unknown {
  return lookup(DICTS[locale], key) ?? lookup(DICTS.en, key);
}

export function formatDate(dateStr: string | Date, locale: Locale): string {
  if (!dateStr) return "";
  const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  if (Number.isNaN(d.getTime())) return String(dateStr);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/* ---------- context ---------- */

type I18nCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  tArr: (key: string) => string[];
  tRaw: (key: string) => unknown;
  formatDate: (d: string | Date) => string;
};

const Ctx = createContext<I18nCtx | null>(null);

const STORAGE_KEY = "gloprofas-locale";

/* External store for the persisted locale (React-correct, no effects). */
const localeListeners = new Set<() => void>();

function getLocaleSnapshot(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "fr" ? "fr" : "en";
  } catch {
    return "en";
  }
}

function getLocaleServerSnapshot(): Locale {
  return "en";
}

function subscribeLocale(listener: () => void) {
  localeListeners.add(listener);
  return () => {
    localeListeners.delete(listener);
  };
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    for (const listener of localeListeners) listener();
  }, []);

  const value = useMemo<I18nCtx>(
    () => ({
      locale,
      setLocale,
      t: (key: string) => t(locale, key),
      tArr: (key: string) => tArr(locale, key),
      tRaw: (key: string) => tRaw(locale, key),
      formatDate: (d: string | Date) => formatDate(d, locale),
    }),
    [locale, setLocale]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
