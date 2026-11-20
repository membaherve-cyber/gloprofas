"use client";

/**
 * Minimal hash router for the single-route GLOPROFAS application.
 * All "pages" live on / and are addressed as #/section or #/section/slug.
 * This keeps the preview on the root route while giving full page semantics.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Route = {
  /** Full path without leading #, always starts with "/", e.g. "/scams/phishing" */
  path: string;
  /** First segment, e.g. "scams" */
  section: string;
  /** Remaining segments, e.g. ["phishing"] */
  parts: string[];
};

function parseHash(hash: string): Route {
  let h = hash.replace(/^#/, "");
  // Strip any query string (#/resources/knowledge-tools?tab=checklists)
  const qi = h.indexOf("?");
  if (qi !== -1) h = h.slice(0, qi);
  if (!h.startsWith("/")) h = "/" + h;
  h = h.replace(/\/+$/, "") || "/";
  const parts = h.split("/").filter(Boolean);
  return { path: h, section: parts[0] ?? "", parts: parts.slice(1) };
}

export function navigate(path: string, opts?: { replace?: boolean; scroll?: boolean }) {
  const target = "#" + (path.startsWith("/") ? path : "/" + path);
  if (typeof window !== "undefined") {
    if (window.location.hash === target) {
      // same route — just scroll top if requested
      if (opts?.scroll !== false) window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    if (opts?.replace) {
      window.history.replaceState(null, "", target);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
      window.location.hash = target;
    }
    if (opts?.scroll !== false) window.scrollTo({ top: 0, behavior: "auto" });
  }
}

type RouterCtx = {
  route: Route;
  navigate: typeof navigate;
};

/* External store subscription for the hash (hydration-safe).
   The snapshot is cached so its identity stays stable between calls. */
let cachedHash = "\u0000";
let cachedRoute = parseHash("");
const cachedEmptyRoute: Route = { path: "/", section: "", parts: [] };

function subscribeHash(listener: () => void) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}

function getHashSnapshot(): Route {
  const h = window.location.hash;
  if (h !== cachedHash) {
    cachedHash = h;
    cachedRoute = parseHash(h);
  }
  return cachedRoute;
}

function getHashServerSnapshot(): Route {
  return cachedEmptyRoute;
}

const Ctx = createContext<RouterCtx | null>(null);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const route = useSyncExternalStore(
    subscribeHash,
    getHashSnapshot,
    getHashServerSnapshot
  );

  const value = useMemo<RouterCtx>(() => ({ route, navigate }), [route]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRouter(): RouterCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRouter must be used inside RouterProvider");
  return ctx;
}

/** Anchor that behaves like a client-side link. */
export function A({
  href,
  children,
  className,
  onClick,
  ...rest
}: React.ComponentPropsWithoutRef<"a"> & { href: string }) {
  const handle = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      e.preventDefault();
      navigate(href);
    },
    [href, onClick]
  );

  const target = href.startsWith("http")
    ? href
    : "#" + (href.startsWith("/") ? href : "/" + href);

  return (
    <a href={target} className={className} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
