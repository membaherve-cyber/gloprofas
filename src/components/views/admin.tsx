"use client";

/**
 * Administration backoffice — session-guarded dashboard with KPIs,
 * scam report status management, messages and applications feed.
 * Noindex: hidden from search engines via robots meta in layout (route-level).
 */

import React, { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ClipboardList,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  RefreshCw,
  Save,
  Siren,
  Users,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/shared/ui";
import { AdminContentPanel } from "./admin-content";

interface AdminData {
  user: { name: string; email: string; role: string };
  kpis: {
    reportCount: number;
    newReports: number;
    underReview: number;
    notes: number;
    newMessages: number;
    subscribers: number;
    volunteers: number;
    partnerships: number;
    enquiries: number;
  };
  reports: Array<{
    id: string;
    reference: string;
    categorySlug: string | null;
    description: string;
    country: string | null;
    channel: string | null;
    moneyLost: boolean;
    amount: string | null;
    reporterEmail: string;
    evidenceCount: number;
    status: string;
    createdAt: string;
    notes: Array<{ id: string; author: string; note: string; createdAt: string }>;
  }>;
  contactMessages: Array<{
    id: string;
    name: string;
    email: string;
    subject: string | null;
    category: string;
    message: string;
    createdAt: string;
  }>;
  volunteers: Array<{ id: string; name: string; email: string; skills: string | null; createdAt: string }>;
  partnerships: Array<{ id: string; organisation: string; contactPerson: string; email: string; createdAt: string }>;
  enquiries: Array<{ id: string; name: string; organisation: string | null; email: string; serviceSlug: string; createdAt: string }>;
}

const STATUSES = ["new", "under-review", "info-required", "reviewed", "closed"];

const STATUS_STYLES: Record<string, string> = {
  new: "bg-[#d23434]/10 text-[#a52222]",
  "under-review": "bg-[#c18708]/12 text-[#8a6104]",
  "info-required": "bg-[#d75c09]/12 text-[#a34306]",
  reviewed: "bg-brand-50 text-brand-600",
  closed: "bg-[#159769]/10 text-[#0d6e4a]",
};

export function AdminView() {
  const { locale, formatDate } = useI18n();
  const fr = locale === "fr";
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [view, setView] = useState<"dashboard" | "content">("dashboard");

  // login state
  const [email, setEmail] = useState("admin@gloprofas.org");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginBusy, setLoginBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      if (res.status === 401) {
        setUnauthorized(true);
        setData(null);
      } else {
        const json = await res.json();
        setData(json);
        setUnauthorized(false);
      }
    } catch {
      setLoginError(fr ? "Erreur de chargement." : "Loading error.");
    } finally {
      setLoading(false);
    }
  }, [fr]);

  useEffect(() => {
    load();
  }, [load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginBusy(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setLoginError(
          res.status === 401
            ? fr
              ? "Identifiants invalides."
              : "Invalid credentials."
            : fr
              ? "Erreur de connexion."
              : "Login error."
        );
        return;
      }
      await load();
    } catch {
      setLoginError(fr ? "Erreur de connexion." : "Login error.");
    } finally {
      setLoginBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    // Clear any sensitive credentials held in component state so the
    // password is never left in the field (or memory) after signing out.
    setPassword("");
    setLoginError(null);
    setUnauthorized(true);
    setData(null);
  }

  async function updateStatus(reference: string, status: string) {
    await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "report-status", reference, status }),
    });
    load();
  }

  async function addNote(reference: string, note: string) {
    if (note.trim().length < 2) return;
    await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "report-note", reference, note }),
    });
    load();
  }

  /* ---------- Login screen ---------- */
  if (unauthorized) {
    return (
      <section className="on-dark flex min-h-screen items-center justify-center bg-navy-950 px-5 pt-24 pb-16">
        <Reveal className="w-full max-w-md">
          <form onSubmit={login} className="card-dark-g p-8">
            <div className="mb-6 text-center">
              <img src="/images/gloprofas-logo.png" alt="GLOPROFAS" className="mx-auto h-10 w-auto" />
              <p className="mt-3 font-heading text-[15px] font-semibold text-white">
                {fr ? "Connexion équipe" : "Team log in"}
              </p>
              <p className="mt-1 text-[12.5px] text-slatex-400">
                {fr ? "Accès réservé au personnel autorisé." : "Authorised staff only."}
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="ad-email" className="mb-2 block font-heading text-[12.5px] font-semibold text-white">
                  {fr ? "Courriel" : "Email"}
                </label>
                <input
                  id="ad-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  className="field-g !border-white/15 !bg-white/[0.06] !text-white"
                />
              </div>
              <div>
                <label htmlFor="ad-pass" className="mb-2 block font-heading text-[12.5px] font-semibold text-white">
                  {fr ? "Mot de passe" : "Password"}
                </label>
                <input
                  id="ad-pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="field-g !border-white/15 !bg-white/[0.06] !text-white"
                />
              </div>
              {loginError ? (
                <p role="alert" className="rounded-lg bg-[#d23434]/15 px-3.5 py-2.5 text-[13px] text-[#ff9c9c]">
                  {loginError}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={loginBusy}
                className="btn-g btn-signal-g w-full"
              >
                {loginBusy ? (fr ? "Connexion…" : "Signing in…") : fr ? "Se connecter" : "Sign in"}
              </button>
            </div>
            <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-3 text-[11.5px] leading-relaxed text-slatex-400">
              {fr
                ? "Environnement de démonstration — administrateur par défaut : admin@gloprofas.org (mot de passe initial défini par la variable ADMIN_INITIAL_PASSWORD)."
                : "Demonstration environment — default administrator: admin@gloprofas.org (initial password set via the ADMIN_INITIAL_PASSWORD variable)."}
            </p>
          </form>
        </Reveal>
      </section>
    );
  }

  /* ---------- Dashboard ---------- */
  if (loading || !data) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-3 text-slatex-400">
          <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-line-200 border-t-brand-600" />
          <span className="text-[13px]">GLOPROFAS…</span>
        </div>
      </section>
    );
  }

  const k = data.kpis;
  const kpiCards = [
    { label: fr ? "Signalements" : "Reports", value: k.reportCount, icon: Siren },
    { label: fr ? "Nouveaux" : "New", value: k.newReports, icon: Inbox },
    { label: fr ? "En examen" : "Under review", value: k.underReview, icon: ClipboardList },
    { label: fr ? "Messages" : "Messages", value: k.newMessages, icon: Mail },
    { label: fr ? "Abonnés" : "Subscribers", value: k.subscribers, icon: Users },
    { label: fr ? "Bénévoles" : "Volunteers", value: k.volunteers, icon: Users },
    { label: fr ? "Partenariats" : "Partnerships", value: k.partnerships, icon: Users },
    { label: fr ? "Demandes" : "Enquiries", value: k.enquiries, icon: Mail },
  ];

  return (
    <section className="min-h-screen bg-mist-50 pt-28 pb-20">
      <div className="container-g">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">{fr ? "Backoffice" : "Backoffice"}</p>
            <h1 className="h2-g mt-2">
              {view === "dashboard"
                ? fr ? "Tableau de bord" : "Dashboard"
                : fr ? "Centre de ressources — contenu" : "Resource Centre — content"}
            </h1>
            <p className="mt-1 text-[13px] text-slatex-600">
              {data.user.name} · {data.user.email} · {data.user.role}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <div className="flex overflow-hidden rounded-lg border border-line-200 bg-white" role="group" aria-label={fr ? "Vue" : "View"}>
              <button
                type="button"
                onClick={() => setView("dashboard")}
                aria-pressed={view === "dashboard"}
                className={`inline-flex h-9 items-center gap-1.5 px-3.5 text-[12.5px] font-semibold transition-colors ${
                  view === "dashboard" ? "bg-navy-950 text-white" : "text-slatex-600 hover:text-brand-600"
                }`}
              >
                <LayoutDashboard size={13} aria-hidden />
                {fr ? "Tableau de bord" : "Dashboard"}
              </button>
              <button
                type="button"
                onClick={() => setView("content")}
                aria-pressed={view === "content"}
                className={`inline-flex h-9 items-center gap-1.5 px-3.5 text-[12.5px] font-semibold transition-colors ${
                  view === "content" ? "bg-navy-950 text-white" : "text-slatex-600 hover:text-brand-600"
                }`}
              >
                <ClipboardList size={13} aria-hidden />
                {fr ? "Contenu" : "Content"}
              </button>
            </div>
            <button type="button" onClick={load} className="btn-g btn-outline-g btn-sm-g">
              <RefreshCw size={14} aria-hidden />
              {fr ? "Actualiser" : "Refresh"}
            </button>
            <a href="#/" className="btn-g btn-ghost-g btn-sm-g">
              <ArrowLeft size={14} aria-hidden />
              {fr ? "Retour au site" : "Back to site"}
            </a>
            <button type="button" onClick={logout} className="btn-g btn-outline-g btn-sm-g !text-[#a52222] hover:!border-[#d23434]">
              <LogOut size={14} aria-hidden />
              {fr ? "Déconnexion" : "Sign out"}
            </button>
          </div>
        </div>

        {view === "content" ? <AdminContentPanel /> : null}

        {/* KPIs */}
        {view === "dashboard" ? (
        <>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpiCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.label} delay={i * 40}>
                <div className="card-g p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Icon size={16} aria-hidden />
                    </span>
                  </div>
                  <p className="mt-3 font-heading text-[26px] font-bold leading-none text-ink-900">{card.value}</p>
                  <p className="mt-1 text-[12px] font-medium text-slatex-600">{card.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Reports */}
        <Reveal>
          <div className="card-g mt-8 overflow-hidden">
            <div className="flex items-center justify-between border-b border-line-200 px-6 py-4">
              <h2 className="font-heading text-[15px] font-semibold text-ink-900">
                {fr ? "Signalements récents" : "Recent scam reports"}
              </h2>
              <span className="chip-g bg-mist-50 text-slatex-600">{data.reports.length}</span>
            </div>
            <div className="scroll-g max-h-[560px] overflow-y-auto divide-y divide-line-200">
              {data.reports.length === 0 ? (
                <p className="px-6 py-10 text-center text-[13.5px] text-slatex-600">
                  {fr ? "Aucun signalement pour le moment." : "No reports yet."}
                </p>
              ) : (
                data.reports.map((r) => (
                  <ReportRow key={r.id} r={r} fr={fr} formatDate={formatDate} onStatus={updateStatus} onNote={addNote} />
                ))
              )}
            </div>
          </div>
        </Reveal>

        {/* Messages / applications */}
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="card-g h-full overflow-hidden">
              <div className="border-b border-line-200 px-6 py-4">
                <h2 className="font-heading text-[15px] font-semibold text-ink-900">
                  {fr ? "Messages de contact" : "Contact messages"}
                </h2>
              </div>
              <ul className="scroll-g max-h-96 divide-y divide-line-200 overflow-y-auto">
                {data.contactMessages.length === 0 ? (
                  <li className="px-6 py-8 text-center text-[13px] text-slatex-600">
                    {fr ? "Aucun message." : "No messages."}
                  </li>
                ) : (
                  data.contactMessages.map((m) => (
                    <li key={m.id} className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-heading text-[13.5px] font-semibold text-ink-900">{m.name}</span>
                        <span className="chip-g bg-mist-50 text-slatex-600">{m.category}</span>
                        <span className="ml-auto text-[11.5px] text-slatex-400">{formatDate(m.createdAt)}</span>
                      </div>
                      <p className="mt-1 text-[12.5px] text-slatex-500">{m.email}{m.subject ? ` · ${m.subject}` : ""}</p>
                      <p className="mt-1.5 line-clamp-2 text-[13px] text-ink-700">{m.message}</p>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="card-g h-full overflow-hidden">
              <div className="border-b border-line-200 px-6 py-4">
                <h2 className="font-heading text-[15px] font-semibold text-ink-900">
                  {fr ? "Bénévoles, partenariats et demandes" : "Volunteers, partnerships and enquiries"}
                </h2>
              </div>
              <ul className="scroll-g max-h-96 divide-y divide-line-200 overflow-y-auto">
                {data.volunteers.map((v) => (
                  <li key={v.id} className="px-6 py-3.5">
                    <p className="text-[13px]">
                      <span className="chip-g bg-brand-50 text-brand-600">{fr ? "Bénévole" : "Volunteer"}</span>{" "}
                      <span className="font-semibold text-ink-900">{v.name}</span>{" "}
                      <span className="text-slatex-500">· {v.email}</span>
                    </p>
                  </li>
                ))}
                {data.partnerships.map((p) => (
                  <li key={p.id} className="px-6 py-3.5">
                    <p className="text-[13px]">
                      <span className="chip-g bg-signal-100 text-signal-600">{fr ? "Partenariat" : "Partnership"}</span>{" "}
                      <span className="font-semibold text-ink-900">{p.organisation}</span>{" "}
                      <span className="text-slatex-500">· {p.contactPerson} · {p.email}</span>
                    </p>
                  </li>
                ))}
                {data.enquiries.map((en) => (
                  <li key={en.id} className="px-6 py-3.5">
                    <p className="text-[13px]">
                      <span className="chip-g bg-mist-50 text-slatex-600">{fr ? "Service" : "Service"}</span>{" "}
                      <span className="font-semibold text-ink-900">{en.name}</span>
                      {en.organisation ? <span className="text-slatex-500"> · {en.organisation}</span> : null}{" "}
                      <span className="text-slatex-500">· {en.serviceSlug}</span>
                    </p>
                  </li>
                ))}
                {data.volunteers.length + data.partnerships.length + data.enquiries.length === 0 ? (
                  <li className="px-6 py-8 text-center text-[13px] text-slatex-600">
                    {fr ? "Aucune candidature." : "No applications."}
                  </li>
                ) : null}
              </ul>
            </div>
          </Reveal>
        </div>
        </>
        ) : null}
      </div>
    </section>
  );
}

function ReportRow({
  r,
  fr,
  formatDate,
  onStatus,
  onNote,
}: {
  r: AdminData["reports"][number];
  fr: boolean;
  formatDate: (d: string) => string;
  onStatus: (ref: string, status: string) => void;
  onNote: (ref: string, note: string) => void;
}) {
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="px-6 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <code className="font-heading text-[13px] font-bold tracking-wide text-brand-600">{r.reference}</code>
        <select
          value={r.status}
          onChange={(e) => onStatus(r.reference, e.target.value)}
          aria-label={fr ? "Changer le statut" : "Change status"}
          className={`h-8 cursor-pointer rounded-full px-3 text-[11.5px] font-semibold uppercase tracking-wide outline-none ${STATUS_STYLES[r.status] ?? ""}`}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="text-[11.5px] text-slatex-400">
          {formatDate(r.createdAt)}
          {r.country ? ` · ${r.country}` : ""}
          {r.moneyLost ? (fr ? " · argent perdu" : " · money lost") : ""}
          {r.evidenceCount > 0 ? ` · ${r.evidenceCount} 📎` : ""}
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto text-[12px] font-semibold text-brand-600 hover:underline"
        >
          {open ? (fr ? "Réduire" : "Collapse") : fr ? "Détails" : "Details"}
        </button>
      </div>
      <p className="mt-1.5 line-clamp-2 text-[13px] text-ink-700">{r.description}</p>
      <p className="mt-1 text-[11.5px] text-slatex-400">
        {r.categorySlug ?? (fr ? "non classé" : "uncategorised")} · {r.channel ?? "—"} · {r.reporterEmail}
      </p>

      {open ? (
        <div className="mt-3 rounded-xl bg-mist-50 p-4">
          <p className="text-[13px] leading-relaxed text-ink-700">{r.description}</p>
          {r.notes.length > 0 ? (
            <ul className="mt-3 space-y-1.5 border-t border-line-200 pt-3">
              {r.notes.map((n) => (
                <li key={n.id} className="text-[12px] text-slatex-600">
                  <span className="font-semibold text-ink-900">{n.author}:</span> {n.note}
                </li>
              ))}
            </ul>
          ) : null}
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              onNote(r.reference, note);
              setNote("");
            }}
          >
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={fr ? "Note interne…" : "Internal note…"}
              aria-label={fr ? "Note interne" : "Internal note"}
              className="field-g !min-h-[38px] flex-1 !py-1.5 !text-[13px]"
            />
            <button type="submit" className="btn-g btn-primary-g btn-sm-g" aria-label={fr ? "Ajouter la note" : "Add note"}>
              <Save size={13} aria-hidden />
              {fr ? "Ajouter" : "Add"}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
