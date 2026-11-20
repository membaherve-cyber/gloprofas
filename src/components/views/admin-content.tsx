"use client";

/**
 * Resource Centre CMS — admin content management modules.
 * Articles, Videos (with YouTube verification), Checklists, Reporting
 * Directory (verification statuses and review dates) and Scam Checker
 * detection patterns. Consumes /api/admin/content/[type].
 */

import React, { useCallback, useEffect, useState } from "react";
import {
  BadgeCheck,
  CirclePlay,
  FileDown,
  Globe,
  ListChecks,
  Newspaper,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

/* ---------------- shared helpers ---------------- */

type DraftState = Record<string, string | boolean | number>;

async function api<T>(url: string, method: string, body?: unknown): Promise<{ ok: boolean; data?: T; error?: string }> {
  try {
    const res = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = (await res.json().catch(() => ({}))) as T & { error?: string };
    if (!res.ok) return { ok: false, error: data?.error ?? `http_${res.status}` };
    return { ok: true, data };
  } catch {
    return { ok: false, error: "network" };
  }
}

function lines(v: string): string[] {
  return v.split("\n").map((s) => s.trim()).filter(Boolean);
}

function Field({
  label,
  value,
  onChange,
  textarea,
  rows = 3,
  mono,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  mono?: boolean;
  hint?: string;
}) {
  const id = React.useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-heading text-[12px] font-semibold text-slatex-600">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          className={`field-g !text-[13px] ${mono ? "font-mono !text-[12px]" : ""}`}
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`field-g !min-h-[38px] !py-1.5 !text-[13px] ${mono ? "font-mono !text-[12px]" : ""}`}
        />
      )}
      {hint ? <p className="mt-1 text-[11px] text-slatex-400">{hint}</p> : null}
    </div>
  );
}

function Toggle({ on, onChange, labelOn, labelOff }: { on: boolean; onChange: (v: boolean) => void; labelOn: string; labelOff: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-bold uppercase tracking-wide transition-colors ${
        on ? "bg-[#159769]/15 text-[#0d6e4a]" : "bg-slatex-200/40 text-slatex-500"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${on ? "bg-[#159769]" : "bg-slatex-400"}`} aria-hidden />
      {on ? labelOn : labelOff}
    </button>
  );
}

/* ================================================================== */
/* Root component                                                      */
/* ================================================================== */

type ModuleKey = "articles" | "videos" | "checklists" | "directory" | "checker";

export function AdminContentPanel() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [mod, setMod] = useState<ModuleKey>("articles");

  const modules: { key: ModuleKey; icon: typeof Newspaper; label: string }[] = [
    { key: "articles", icon: Newspaper, label: fr ? "Articles" : "Articles" },
    { key: "videos", icon: CirclePlay, label: fr ? "Vidéos" : "Videos" },
    { key: "checklists", icon: ListChecks, label: fr ? "Listes" : "Checklists" },
    { key: "directory", icon: Globe, label: fr ? "Annuaire" : "Directory" },
    { key: "checker", icon: ShieldCheck, label: fr ? "Vérificateur" : "Checker" },
  ];

  return (
    <div className="card-g mt-8 overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-line-200 px-5 py-4">
        <h2 className="mr-3 font-heading text-[15px] font-semibold text-ink-900">
          {fr ? "Gestion du contenu — Centre de ressources" : "Content management — Resource Centre"}
        </h2>
        {modules.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMod(m.key)}
            aria-pressed={mod === m.key}
            className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[12.5px] font-semibold transition-colors ${
              mod === m.key
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-line-200 text-slatex-600 hover:border-brand-400 hover:text-brand-600"
            }`}
          >
            <m.icon size={14} aria-hidden />
            {m.label}
          </button>
        ))}
      </div>
      <div className="p-5">
        {mod === "articles" ? <ArticlesModule /> : null}
        {mod === "videos" ? <VideosModule /> : null}
        {mod === "checklists" ? <ChecklistsModule /> : null}
        {mod === "directory" ? <DirectoryModule /> : null}
        {mod === "checker" ? <CheckerModule /> : null}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Articles                                                            */
/* ================================================================== */

type AdminArticle = {
  id: string;
  slug: string;
  categorySlug: string;
  published: boolean;
  featured: boolean;
  popular: boolean;
  publishedAt: string;
  updatedAt: string;
  content: {
    title: { en: string; fr: string };
    metaDescription: { en: string; fr: string };
    summary: { en: string; fr: string };
    what: { en: string; fr: string };
    how: { en: string; fr: string };
    warningSigns: { en: string; fr: string }[];
    example: { en: string; fr: string };
    protect: { en: string; fr: string }[];
    ifVictim: { en: string; fr: string }[];
    reportTo: { en: string; fr: string }[];
    keyTakeaway: { en: string; fr: string };
    relatedSlugs: string[];
    checklistSlug: string;
    references: { label: string; url: string }[];
    readingMinutes: number;
    imageUrl: string;
  };
};

const CATEGORIES = ["online-digital", "money-banking", "social-engineering", "business-fraud", "emerging-specialised"];

function ArticlesModule() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [items, setItems] = useState<AdminArticle[] | null>(null);
  const [editing, setEditing] = useState<AdminArticle | "new" | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [reload, setReload] = useState(0);
  const refresh = useCallback(() => setReload((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await api<{ items: AdminArticle[] }>("/api/admin/content/articles", "GET");
      if (!cancelled) setItems(r.data?.items ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [reload]);

  const quickPatch = async (id: string, patch: Record<string, unknown>) => {
    const r = await api("/api/admin/content/articles", "PATCH", { id, ...patch });
    setMsg(r.ok ? (fr ? "Enregistré." : "Saved.") : `Erreur: ${r.error}`);
    if (r.ok) refresh();
  };

  if (editing) {
    return (
      <ArticleEditor
        article={editing === "new" ? null : editing}
        onDone={() => {
          setEditing(null);
          refresh();
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-slatex-600">
          {items ? `${items.length} ${fr ? "articles" : "articles"}` : fr ? "Chargement…" : "Loading…"}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={refresh} className="btn-g btn-ghost-g btn-sm-g">
            <RefreshCw size={13} aria-hidden />
          </button>
          <button type="button" onClick={() => setEditing("new")} className="btn-g btn-primary-g btn-sm-g">
            <Plus size={13} aria-hidden />
            {fr ? "Nouvel article" : "New article"}
          </button>
        </div>
      </div>
      {msg ? <p className="mb-3 rounded-lg bg-brand-50 px-3 py-2 text-[12.5px] font-medium text-brand-600">{msg}</p> : null}
      <div className="scroll-g max-h-[620px] overflow-y-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-line-200 text-[11.5px] uppercase tracking-wide text-slatex-400">
              <th className="py-2.5 pr-3">{fr ? "Titre / slug" : "Title / slug"}</th>
              <th className="py-2.5 pr-3">{fr ? "Catégorie" : "Category"}</th>
              <th className="py-2.5 pr-3">{fr ? "Statut" : "Status"}</th>
              <th className="py-2.5 pr-3">{fr ? "Révisé" : "Updated"}</th>
              <th className="py-2.5" aria-label={fr ? "Actions" : "Actions"} />
            </tr>
          </thead>
          <tbody className="divide-y divide-line-200">
            {(items ?? []).map((a) => (
              <tr key={a.id} className="align-top">
                <td className="py-3 pr-3">
                  <p className="font-heading font-semibold text-ink-900">{a.content.title.en}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-slatex-400">{a.slug}</p>
                </td>
                <td className="py-3 pr-3">
                  <select
                    value={a.categorySlug}
                    onChange={(e) => quickPatch(a.id, { content: { ...a.content, categorySlug: e.target.value } })}
                    className="h-8 cursor-pointer rounded-lg border border-line-200 px-2 text-[12px]"
                    aria-label="category"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </td>
                <td className="py-3 pr-3">
                  <div className="flex flex-col gap-1.5">
                    <Toggle on={a.published} onChange={(v) => quickPatch(a.id, { published: v })} labelOn={fr ? "publié" : "published"} labelOff={fr ? "brouillon" : "draft"} />
                    <Toggle on={a.featured} onChange={(v) => quickPatch(a.id, { featured: v })} labelOn={fr ? "vedette" : "featured"} labelOff="—" />
                    <Toggle on={a.popular} onChange={(v) => quickPatch(a.id, { popular: v })} labelOn={fr ? "populaire" : "popular"} labelOff="—" />
                  </div>
                </td>
                <td className="py-3 pr-3 text-[11.5px] text-slatex-400">{a.updatedAt}</td>
                <td className="py-3">
                  <div className="flex justify-end gap-1.5">
                    <button type="button" onClick={() => setEditing(a)} className="btn-g btn-ghost-g !h-8 !px-2.5 !text-[12px]">
                      <Save size={12} aria-hidden />
                      {fr ? "Éditer" : "Edit"}
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!window.confirm(fr ? `Supprimer « ${a.slug} » ?` : `Delete “${a.slug}”?`)) return;
                        await api("/api/admin/content/articles", "DELETE", { id: a.id });
                        refresh();
                      }}
                      className="btn-g btn-ghost-g !h-8 !px-2.5 !text-[12px] !text-[#a52222]"
                      aria-label="delete"
                    >
                      <Trash2 size={12} aria-hidden />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ArticleEditor({ article, onDone }: { article: AdminArticle | null; onDone: () => void }) {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [d, setD] = useState<DraftState>({
    slug: article?.slug ?? "",
    categorySlug: article?.categorySlug ?? "online-digital",
    titleEn: article?.content.title.en ?? "",
    titleFr: article?.content.title.fr ?? "",
    metaEn: article?.content.metaDescription.en ?? "",
    metaFr: article?.content.metaDescription.fr ?? "",
    summaryEn: article?.content.summary.en ?? "",
    summaryFr: article?.content.summary.fr ?? "",
    whatEn: article?.content.what.en ?? "",
    whatFr: article?.content.what.fr ?? "",
    howEn: article?.content.how.en ?? "",
    howFr: article?.content.how.fr ?? "",
    exampleEn: article?.content.example.en ?? "",
    exampleFr: article?.content.example.fr ?? "",
    takeawayEn: article?.content.keyTakeaway.en ?? "",
    takeawayFr: article?.content.keyTakeaway.fr ?? "",
    signsEn: (article?.content.warningSigns ?? []).map((x) => x.en).join("\n"),
    signsFr: (article?.content.warningSigns ?? []).map((x) => x.fr).join("\n"),
    protectEn: (article?.content.protect ?? []).map((x) => x.en).join("\n"),
    protectFr: (article?.content.protect ?? []).map((x) => x.fr).join("\n"),
    victimEn: (article?.content.ifVictim ?? []).map((x) => x.en).join("\n"),
    victimFr: (article?.content.ifVictim ?? []).map((x) => x.fr).join("\n"),
    reportEn: (article?.content.reportTo ?? []).map((x) => x.en).join("\n"),
    reportFr: (article?.content.reportTo ?? []).map((x) => x.fr).join("\n"),
    related: (article?.content.relatedSlugs ?? []).join(", "),
    checklist: article?.content.checklistSlug ?? "",
    refs: (article?.content.references ?? []).map((r) => `${r.label} | ${r.url}`).join("\n"),
    readingMinutes: article?.content.readingMinutes ?? 5,
    imageUrl: article?.content.imageUrl ?? "",
    published: article?.published ?? true,
  });
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (k: string) => (v: string) => setD((p) => ({ ...p, [k]: v }));

  const buildContent = () => {
    const pairs = (en: string, fr2: string) => {
      const e = lines(en);
      const f = lines(fr2);
      return e.map((x, i) => ({ en: x, fr: f[i] ?? f[0] ?? x }));
    };
    return {
      title: { en: String(d.titleEn), fr: String(d.titleFr) },
      metaDescription: { en: String(d.metaEn), fr: String(d.metaFr) },
      summary: { en: String(d.summaryEn), fr: String(d.summaryFr) },
      what: { en: String(d.whatEn), fr: String(d.whatFr) },
      how: { en: String(d.howEn), fr: String(d.howFr) },
      example: { en: String(d.exampleEn), fr: String(d.exampleFr) },
      keyTakeaway: { en: String(d.takeawayEn), fr: String(d.takeawayFr) },
      warningSigns: pairs(String(d.signsEn), String(d.signsFr)),
      protect: pairs(String(d.protectEn), String(d.protectFr)),
      ifVictim: pairs(String(d.victimEn), String(d.victimFr)),
      reportTo: pairs(String(d.reportEn), String(d.reportFr)),
      relatedSlugs: String(d.related).split(",").map((s) => s.trim()).filter(Boolean),
      checklistSlug: String(d.checklist),
      references: lines(String(d.refs)).map((l) => {
        const [label, url] = l.split("|").map((s) => s.trim());
        return { label: label ?? "", url: url ?? "" };
      }).filter((r) => r.url),
      readingMinutes: Number(d.readingMinutes) || 5,
      imageUrl: String(d.imageUrl),
      publishedAt: article?.publishedAt ?? new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };
  };

  const save = async () => {
    setBusy(true);
    setErr(null);
    const content = buildContent();
    const r = article
      ? await api("/api/admin/content/articles", "PATCH", { id: article.id, content })
      : await api("/api/admin/content/articles", "POST", { slug: d.slug, categorySlug: d.categorySlug, content, published: d.published });
    setBusy(false);
    if (!r.ok) {
      setErr(r.error ?? "error");
      return;
    }
    onDone();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-heading text-[15px] font-bold text-ink-900">
          {article ? (fr ? "Modifier l’article" : "Edit article") : fr ? "Nouvel article" : "New article"}
        </h3>
        <div className="flex gap-2">
          <button type="button" onClick={onDone} className="btn-g btn-ghost-g btn-sm-g">
            <X size={13} aria-hidden />
            {fr ? "Annuler" : "Cancel"}
          </button>
          <button type="button" onClick={save} disabled={busy} className="btn-g btn-primary-g btn-sm-g">
            <Save size={13} aria-hidden />
            {busy ? (fr ? "Enregistrement…" : "Saving…") : fr ? "Enregistrer" : "Save"}
          </button>
        </div>
      </div>
      {err ? <p className="mb-3 rounded-lg bg-[#d23434]/10 px-3 py-2 text-[12.5px] text-[#a52222]">Erreur: {err}</p> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label={fr ? "Slug (URL)" : "Slug (URL)"} value={String(d.slug)} onChange={set("slug")} mono hint="new-article-slug" />
        <div>
          <label className="mb-1.5 block font-heading text-[12px] font-semibold text-slatex-600">{fr ? "Catégorie" : "Category"}</label>
          <select value={String(d.categorySlug)} onChange={(e) => setD((p) => ({ ...p, categorySlug: e.target.value }))} className="field-g !min-h-[38px] !py-1.5 !text-[13px]">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <Field label={fr ? "Titre (EN)" : "Title (EN)"} value={String(d.titleEn)} onChange={set("titleEn")} />
        <Field label={fr ? "Titre (FR)" : "Title (FR)"} value={String(d.titleFr)} onChange={set("titleFr")} />
        <Field label={fr ? "Méta description (EN)" : "Meta description (EN)"} value={String(d.metaEn)} onChange={set("metaEn")} textarea rows={2} />
        <Field label={fr ? "Méta description (FR)" : "Meta description (FR)"} value={String(d.metaFr)} onChange={set("metaFr")} textarea rows={2} />
        <Field label={fr ? "Introduction (EN)" : "Introduction (EN)"} value={String(d.summaryEn)} onChange={set("summaryEn")} textarea rows={3} />
        <Field label={fr ? "Introduction (FR)" : "Introduction (FR)"} value={String(d.summaryFr)} onChange={set("summaryFr")} textarea rows={3} />
        <Field label={fr ? "Qu’est-ce que c’est ? (EN)" : "What is it (EN)"} value={String(d.whatEn)} onChange={set("whatEn")} textarea rows={3} />
        <Field label={fr ? "Qu’est-ce que c’est ? (FR)" : "What is it (FR)"} value={String(d.whatFr)} onChange={set("whatFr")} textarea rows={3} />
        <Field label={fr ? "Comment ça marche (EN)" : "How it works (EN)"} value={String(d.howEn)} onChange={set("howEn")} textarea rows={4} />
        <Field label={fr ? "Comment ça marche (FR)" : "How it works (FR)"} value={String(d.howFr)} onChange={set("howFr")} textarea rows={4} />
        <Field label={fr ? "Signaux d’alerte (EN, un par ligne)" : "Warning signs (EN, one per line)"} value={String(d.signsEn)} onChange={set("signsEn")} textarea rows={5} />
        <Field label={fr ? "Signaux d’alerte (FR, un par ligne)" : "Warning signs (FR, one per line)"} value={String(d.signsFr)} onChange={set("signsFr")} textarea rows={5} />
        <Field label={fr ? "Exemple illustratif (EN)" : "Illustrative example (EN)"} value={String(d.exampleEn)} onChange={set("exampleEn")} textarea rows={3} />
        <Field label={fr ? "Exemple illustratif (FR)" : "Illustrative example (FR)"} value={String(d.exampleFr)} onChange={set("exampleFr")} textarea rows={3} />
        <Field label={fr ? "Protection (EN, un par ligne)" : "Protection (EN, one per line)"} value={String(d.protectEn)} onChange={set("protectEn")} textarea rows={5} />
        <Field label={fr ? "Protection (FR, un par ligne)" : "Protection (FR, one per line)"} value={String(d.protectFr)} onChange={set("protectFr")} textarea rows={5} />
        <Field label={fr ? "Si victime (EN, un par ligne)" : "If victim (EN, one per line)"} value={String(d.victimEn)} onChange={set("victimEn")} textarea rows={4} />
        <Field label={fr ? "Si victime (FR, un par ligne)" : "If victim (FR, one per line)"} value={String(d.victimFr)} onChange={set("victimFr")} textarea rows={4} />
        <Field label={fr ? "Où signaler (EN, un par ligne)" : "Where to report (EN, one per line)"} value={String(d.reportEn)} onChange={set("reportEn")} textarea rows={3} />
        <Field label={fr ? "Où signaler (FR, un par ligne)" : "Where to report (FR, one per line)"} value={String(d.reportFr)} onChange={set("reportFr")} textarea rows={3} />
        <Field label={fr ? "Point clé (EN)" : "Key takeaway (EN)"} value={String(d.takeawayEn)} onChange={set("takeawayEn")} textarea rows={2} />
        <Field label={fr ? "Point clé (FR)" : "Key takeaway (FR)"} value={String(d.takeawayFr)} onChange={set("takeawayFr")} textarea rows={2} />
        <Field label={fr ? "Guides liés (slugs, virgules)" : "Related slugs (comma-separated)"} value={String(d.related)} onChange={set("related")} textarea rows={2} mono />
        <Field label={fr ? "Liste associée (slug)" : "Checklist slug"} value={String(d.checklist)} onChange={set("checklist")} mono />
        <Field label={fr ? "Références (label | url, une par ligne)" : "References (label | url, one per line)"} value={String(d.refs)} onChange={set("refs")} textarea rows={3} mono />
        <Field label={fr ? "Image (chemin)" : "Image (path)"} value={String(d.imageUrl)} onChange={set("imageUrl")} mono hint="/images/gen/…" />
      </div>
    </div>
  );
}

/* ================================================================== */
/* Videos                                                              */
/* ================================================================== */

type AdminVideo = {
  id: string;
  youtubeId: string;
  published: boolean;
  displayOrder: number;
  verified: boolean;
  verifiedAt: string;
  content: {
    title: { en: string; fr: string };
    description: { en: string; fr: string };
    publisher: string;
    publisherUrl: string;
    duration: string;
    topicSlug: string;
  };
};

const TOPICS = ["online-scams", "phishing", "mobile-money", "romance-impersonation", "investment-crypto", "social-whatsapp", "fake-websites", "identity-theft", "ai-deepfakes", "after-scam"];

function VideosModule() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [items, setItems] = useState<AdminVideo[] | null>(null);
  const [adding, setAdding] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newTitleFr, setNewTitleFr] = useState("");
  const [newDescEn, setNewDescEn] = useState("");
  const [newDescFr, setNewDescFr] = useState("");
  const [newTopic, setNewTopic] = useState("online-scams");
  const [verify, setVerify] = useState<{ state: "idle" | "busy" | "ok" | "error"; title?: string; publisher?: string; id?: string }>({ state: "idle" });
  const [msg, setMsg] = useState<string | null>(null);

  const [reload, setReload] = useState(0);
  const refresh = useCallback(() => setReload((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await api<{ items: AdminVideo[] }>("/api/admin/content/videos", "GET");
      if (!cancelled) setItems(r.data?.items ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [reload]);

  const doVerify = async () => {
    setVerify({ state: "busy" });
    const r = await api<{ ok: boolean; youtubeId: string; title: string; publisher: string }>("/api/admin/verify-video", "POST", { url: newUrl });
    if (r.ok && r.data?.ok) {
      setVerify({ state: "ok", title: r.data.title, publisher: r.data.publisher, id: r.data.youtubeId });
    } else {
      setVerify({ state: "error" });
    }
  };

  const add = async () => {
    if (verify.state !== "ok" || !verify.id) return;
    const r = await api("/api/admin/content/videos", "POST", {
      youtubeId: verify.id,
      content: {
        title: { en: verify.title ?? "", fr: newTitleFr || verify.title || "" },
        description: { en: newDescEn, fr: newDescFr },
        publisher: verify.publisher ?? "",
        publisherUrl: "",
        duration: "",
        topicSlug: newTopic,
      },
      published: true,
      displayOrder: (items?.length ?? 0) + 1,
    });
    if (r.ok) {
      setAdding(false);
      setNewUrl("");
      setNewTitleFr("");
      setNewDescEn("");
      setNewDescFr("");
      setVerify({ state: "idle" });
      refresh();
    } else {
      setMsg(r.error ?? "error");
    }
  };

  const patch = async (id: string, body: Record<string, unknown>) => {
    const r = await api("/api/admin/content/videos", "PATCH", { id, ...body });
    setMsg(r.ok ? (fr ? "Enregistré." : "Saved.") : `Erreur: ${r.error}`);
    if (r.ok) refresh();
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-slatex-600">{items ? `${items.length} ${fr ? "vidéos" : "videos"}` : fr ? "Chargement…" : "Loading…"}</p>
        <div className="flex gap-2">
          <button type="button" onClick={refresh} className="btn-g btn-ghost-g btn-sm-g">
            <RefreshCw size={13} aria-hidden />
          </button>
          <button type="button" onClick={() => setAdding((v) => !v)} className="btn-g btn-primary-g btn-sm-g">
            <Plus size={13} aria-hidden />
            {fr ? "Ajouter une vidéo" : "Add video"}
          </button>
        </div>
      </div>
      {msg ? <p className="mb-3 rounded-lg bg-brand-50 px-3 py-2 text-[12.5px] font-medium text-brand-600">{msg}</p> : null}

      {adding ? (
        <div className="mb-5 rounded-xl border border-line-200 bg-mist-30 p-4">
          <h4 className="font-heading text-[13.5px] font-bold text-ink-900">
            {fr ? "Ajouter une vidéo YouTube (vérification obligatoire)" : "Add a YouTube video (verification required)"}
          </h4>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <Field label={fr ? "URL ou ID YouTube" : "YouTube URL or ID"} value={newUrl} onChange={setNewUrl} mono hint="https://www.youtube.com/watch?v=…" />
              <button
                type="button"
                onClick={doVerify}
                disabled={verify.state === "busy" || newUrl.trim().length < 5}
                className="btn-g btn-outline-g btn-sm-g mt-2"
              >
                <BadgeCheck size={13} aria-hidden />
                {verify.state === "busy" ? (fr ? "Vérification…" : "Verifying…") : fr ? "Vérifier la vidéo" : "Verify video"}
              </button>
              {verify.state === "ok" ? (
                <p className="mt-2 rounded-lg bg-[#159769]/10 px-3 py-2 text-[12.5px] text-[#0d6e4a]">
                  ✓ {verify.title} — {verify.publisher}
                </p>
              ) : null}
              {verify.state === "error" ? (
                <p className="mt-2 rounded-lg bg-[#d23434]/10 px-3 py-2 text-[12.5px] text-[#a52222]">
                  {fr ? "Vidéo introuvable, privée ou supprimée." : "Video not found, private or removed."}
                </p>
              ) : null}
            </div>
            <Field label={fr ? "Titre français (optionnel)" : "French title (optional)"} value={newTitleFr} onChange={setNewTitleFr} />
            <div>
              <label className="mb-1.5 block font-heading text-[12px] font-semibold text-slatex-600">{fr ? "Sujet" : "Topic"}</label>
              <select value={newTopic} onChange={(e) => setNewTopic(e.target.value)} className="field-g !min-h-[38px] !py-1.5 !text-[13px]">
                {TOPICS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <Field label={fr ? "Description (EN)" : "Description (EN)"} value={newDescEn} onChange={setNewDescEn} textarea rows={2} />
            <Field label={fr ? "Description (FR)" : "Description (FR)"} value={newDescFr} onChange={setNewDescFr} textarea rows={2} />
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={add} disabled={verify.state !== "ok"} className="btn-g btn-primary-g btn-sm-g">
              <Plus size={13} aria-hidden />
              {fr ? "Ajouter au centre vidéo" : "Add to video centre"}
            </button>
            <button type="button" onClick={() => setAdding(false)} className="btn-g btn-ghost-g btn-sm-g">
              <X size={13} aria-hidden />
              {fr ? "Annuler" : "Cancel"}
            </button>
          </div>
        </div>
      ) : null}

      <div className="scroll-g max-h-[560px] space-y-3 overflow-y-auto">
        {(items ?? []).map((v) => (
          <VideoRow key={v.id} v={v} fr={fr} onPatch={patch} onDelete={async (id) => {
            if (!window.confirm(fr ? "Supprimer cette vidéo ?" : "Delete this video?")) return;
            await api("/api/admin/content/videos", "DELETE", { id });
            refresh();
          }} />
        ))}
      </div>
    </div>
  );
}

function VideoRow({
  v,
  fr,
  onPatch,
  onDelete,
}: {
  v: AdminVideo;
  fr: boolean;
  onPatch: (id: string, body: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [titleEn, setTitleEn] = useState(v.content.title.en);
  const [titleFr, setTitleFr] = useState(v.content.title.fr);
  const [descEn, setDescEn] = useState(v.content.description.en);
  const [descFr, setDescFr] = useState(v.content.description.fr);
  const [topic, setTopic] = useState(v.content.topicSlug);
  const [order, setOrder] = useState(String(v.displayOrder));

  return (
    <div className="rounded-xl border border-line-200 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <img src={`https://i.ytimg.com/vi/${v.youtubeId}/default.jpg`} alt="" width={80} height={45} className="h-[45px] w-20 rounded-md object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-[13.5px] font-semibold text-ink-900">{v.content.title.en}</p>
          <p className="mt-0.5 text-[11.5px] text-slatex-400">
            {v.content.publisher} · {v.content.duration || "—"} · {v.verified ? `✓ ${v.verifiedAt}` : ""}
          </p>
        </div>
        <Toggle on={v.published} onChange={(val) => onPatch(v.id, { published: val })} labelOn={fr ? "publiée" : "published"} labelOff={fr ? "masquée" : "hidden"} />
        <button type="button" onClick={() => setOpen((o) => !o)} className="btn-g btn-ghost-g !h-8 !px-2.5 !text-[12px]">
          {open ? (fr ? "Réduire" : "Collapse") : fr ? "Éditer" : "Edit"}
        </button>
        <button type="button" onClick={() => onDelete(v.id)} className="btn-g btn-ghost-g !h-8 !px-2.5 !text-[12px] !text-[#a52222]" aria-label="delete">
          <Trash2 size={12} aria-hidden />
        </button>
      </div>
      {open ? (
        <div className="mt-4 grid gap-3 border-t border-line-200 pt-4 md:grid-cols-2">
          <Field label={fr ? "Titre (EN)" : "Title (EN)"} value={titleEn} onChange={setTitleEn} />
          <Field label={fr ? "Titre (FR)" : "Title (FR)"} value={titleFr} onChange={setTitleFr} />
          <Field label={fr ? "Description (EN)" : "Description (EN)"} value={descEn} onChange={setDescEn} textarea rows={2} />
          <Field label={fr ? "Description (FR)" : "Description (FR)"} value={descFr} onChange={setDescFr} textarea rows={2} />
          <div>
            <label className="mb-1.5 block font-heading text-[12px] font-semibold text-slatex-600">{fr ? "Sujet" : "Topic"}</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} className="field-g !min-h-[38px] !py-1.5 !text-[13px]">
              {TOPICS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <Field label={fr ? "Ordre d’affichage" : "Display order"} value={order} onChange={setOrder} />
          <div className="md:col-span-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  onPatch(v.id, {
                    content: {
                      ...v.content,
                      title: { en: titleEn, fr: titleFr },
                      description: { en: descEn, fr: descFr },
                      topicSlug: topic,
                    },
                    displayOrder: Number(order) || 0,
                  })
                }
                className="btn-g btn-primary-g btn-sm-g"
              >
                <Save size={13} aria-hidden />
                {fr ? "Enregistrer" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => onPatch(v.id, { youtubeId: v.youtubeId })}
                className="btn-g btn-outline-g btn-sm-g"
                title={fr ? "Revérifier la disponibilité" : "Re-verify availability"}
              >
                <BadgeCheck size={13} aria-hidden />
                {fr ? "Revérifier" : "Re-verify"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ================================================================== */
/* Checklists                                                          */
/* ================================================================== */

type AdminChecklist = {
  id: string;
  slug: string;
  published: boolean;
  featured: boolean;
  downloadCount: number;
  fileEn: string;
  fileFr: string;
  content: {
    title: { en: string; fr: string };
    subtitle: { en: string; fr: string };
    category: string;
    intro: { en: string; fr: string };
    warning: { en: string; fr: string };
    sections: { heading: { en: string; fr: string }; items: { en: string; fr: string }[] }[];
    references: { label: string; url: string }[];
    version: string;
    publishedAt: string;
    pdfEn: string;
    pdfFr: string;
  };
};

function ChecklistsModule() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [items, setItems] = useState<AdminChecklist[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [reload, setReload] = useState(0);
  const refresh = useCallback(() => setReload((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await api<{ items: AdminChecklist[] }>("/api/admin/content/checklists", "GET");
      if (!cancelled) setItems(r.data?.items ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [reload]);

  const patch = async (id: string, body: Record<string, unknown>) => {
    const r = await api("/api/admin/content/checklists", "PATCH", { id, ...body });
    setMsg(r.ok ? (fr ? "Enregistré." : "Saved.") : `Erreur: ${r.error}`);
    if (r.ok) refresh();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-[13px] text-slatex-600">
          {items ? `${items.length} ${fr ? "listes" : "checklists"}` : fr ? "Chargement…" : "Loading…"}
        </p>
        <button type="button" onClick={refresh} className="btn-g btn-ghost-g btn-sm-g">
          <RefreshCw size={13} aria-hidden />
        </button>
      </div>
      {msg ? <p className="mb-3 rounded-lg bg-brand-50 px-3 py-2 text-[12.5px] font-medium text-brand-600">{msg}</p> : null}
      <div className="scroll-g max-h-[560px] space-y-3 overflow-y-auto">
        {(items ?? []).map((c) => (
          <ChecklistRow key={c.id} c={c} fr={fr} onPatch={patch} onDelete={async (id) => {
            if (!window.confirm(fr ? "Supprimer cette liste ?" : "Delete this checklist?")) return;
            await api("/api/admin/content/checklists", "DELETE", { id });
            refresh();
          }} />
        ))}
      </div>
      <p className="mt-4 text-[11.5px] leading-relaxed text-slatex-400">
        <FileDown size={12} className="mr-1 inline" aria-hidden />
        {fr
          ? "Les fichiers PDF bilingues sont servis depuis /checklists/<slug>-en.pdf et -fr.pdf. Remplacez un document en déposant le nouveau fichier à ce chemin ou en éditant les URLs ci-dessous."
          : "Bilingual PDFs are served from /checklists/<slug>-en.pdf and -fr.pdf. Replace a document by uploading the new file at that path or editing the URLs below."}
      </p>
    </div>
  );
}

function ChecklistRow({
  c,
  fr,
  onPatch,
  onDelete,
}: {
  c: AdminChecklist;
  fr: boolean;
  onPatch: (id: string, body: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [titleEn, setTitleEn] = useState(c.content.title.en);
  const [titleFr, setTitleFr] = useState(c.content.title.fr);
  const [subEn, setSubEn] = useState(c.content.subtitle.en);
  const [subFr, setSubFr] = useState(c.content.subtitle.fr);
  const [introEn, setIntroEn] = useState(c.content.intro.en);
  const [introFr, setIntroFr] = useState(c.content.intro.fr);
  const [fileEn, setFileEn] = useState(c.fileEn);
  const [fileFr, setFileFr] = useState(c.fileFr);

  return (
    <div className="rounded-xl border border-line-200 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <ListChecks size={16} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-[13.5px] font-semibold text-ink-900">{c.content.title.en}</p>
          <p className="mt-0.5 font-mono text-[11px] text-slatex-400">{c.slug} · {c.downloadCount} ↓</p>
        </div>
        <Toggle on={c.published} onChange={(v) => onPatch(c.id, { published: v })} labelOn={fr ? "publiée" : "published"} labelOff={fr ? "brouillon" : "draft"} />
        <Toggle on={c.featured} onChange={(v) => onPatch(c.id, { featured: v })} labelOn={fr ? "vedette" : "featured"} labelOff="—" />
        <button type="button" onClick={() => setOpen((o) => !o)} className="btn-g btn-ghost-g !h-8 !px-2.5 !text-[12px]">
          {open ? (fr ? "Réduire" : "Collapse") : fr ? "Éditer" : "Edit"}
        </button>
        <button type="button" onClick={() => onDelete(c.id)} className="btn-g btn-ghost-g !h-8 !px-2.5 !text-[12px] !text-[#a52222]" aria-label="delete">
          <Trash2 size={12} aria-hidden />
        </button>
      </div>
      {open ? (
        <div className="mt-4 grid gap-3 border-t border-line-200 pt-4 md:grid-cols-2">
          <Field label={fr ? "Titre (EN)" : "Title (EN)"} value={titleEn} onChange={setTitleEn} />
          <Field label={fr ? "Titre (FR)" : "Title (FR)"} value={titleFr} onChange={setTitleFr} />
          <Field label={fr ? "Sous-titre (EN)" : "Subtitle (EN)"} value={subEn} onChange={setSubEn} />
          <Field label={fr ? "Sous-titre (FR)" : "Subtitle (FR)"} value={subFr} onChange={setSubFr} />
          <Field label={fr ? "Introduction (EN)" : "Intro (EN)"} value={introEn} onChange={setIntroEn} textarea rows={2} />
          <Field label={fr ? "Introduction (FR)" : "Intro (FR)"} value={introFr} onChange={setIntroFr} textarea rows={2} />
          <Field label={fr ? "Fichier PDF anglais" : "English PDF file"} value={fileEn} onChange={setFileEn} mono hint="/checklists/…-en.pdf" />
          <Field label={fr ? "Fichier PDF français" : "French PDF file"} value={fileFr} onChange={setFileFr} mono hint="/checklists/…-fr.pdf" />
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={() =>
                onPatch(c.id, {
                  content: { ...c.content, title: { en: titleEn, fr: titleFr }, subtitle: { en: subEn, fr: subFr }, intro: { en: introEn, fr: introFr } },
                  fileEn,
                  fileFr,
                })
              }
              className="btn-g btn-primary-g btn-sm-g"
            >
              <Save size={13} aria-hidden />
              {fr ? "Enregistrer" : "Save"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ================================================================== */
/* Directory                                                           */
/* ================================================================== */

type AdminCountry = {
  id: string;
  code: string;
  status: string;
  lastVerified: string;
  nextReview: string | null;
  content: { name: string; nameFr: string; continent: string; agencies: unknown[] };
};

const STATUSES = [
  { value: "verified", label: "Verified" },
  { value: "pending-verification", label: "Pending verification" },
  { value: "requires-review", label: "Requires review" },
  { value: "outdated", label: "Outdated" },
];

function DirectoryModule() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [items, setItems] = useState<AdminCountry[] | null>(null);
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminCountry | null>(null);

  const [reload, setReload] = useState(0);
  const refresh = useCallback(() => setReload((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await api<{ items: AdminCountry[] }>("/api/admin/content/directory", "GET");
      if (!cancelled) setItems(r.data?.items ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [reload]);

  const patch = async (id: string, body: Record<string, unknown>) => {
    const r = await api("/api/admin/content/directory", "PATCH", { id, ...body });
    setMsg(r.ok ? (fr ? "Enregistré." : "Saved.") : `Erreur: ${r.error}`);
    if (r.ok) refresh();
  };

  const filtered = (items ?? []).filter((c) =>
    `${c.code} ${c.content?.name} ${c.content?.nameFr}`.toLowerCase().includes(q.toLowerCase())
  );

  if (editing) {
    return (
      <CountryEditor
        country={editing}
        fr={fr}
        onDone={() => {
          setEditing(null);
          refresh();
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={fr ? "Filtrer les pays…" : "Filter countries…"}
          className="field-g !min-h-[38px] !py-1.5 !text-[13px] max-w-xs"
          aria-label={fr ? "Filtrer les pays" : "Filter countries"}
        />
        <p className="text-[13px] text-slatex-600">{items ? `${items.length} ${fr ? "pays" : "countries"}` : "…"}</p>
        <button type="button" onClick={refresh} className="btn-g btn-ghost-g btn-sm-g">
          <RefreshCw size={13} aria-hidden />
        </button>
      </div>
      {msg ? <p className="mb-3 rounded-lg bg-brand-50 px-3 py-2 text-[12.5px] font-medium text-brand-600">{msg}</p> : null}
      <div className="scroll-g max-h-[560px] overflow-y-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-line-200 text-[11.5px] uppercase tracking-wide text-slatex-400">
              <th className="py-2.5 pr-3">{fr ? "Pays" : "Country"}</th>
              <th className="py-2.5 pr-3">{fr ? "Continent" : "Continent"}</th>
              <th className="py-2.5 pr-3">{fr ? "Autorités" : "Agencies"}</th>
              <th className="py-2.5 pr-3">{fr ? "Statut de vérification" : "Verification status"}</th>
              <th className="py-2.5 pr-3">{fr ? "Vérifié / revu" : "Verified / review"}</th>
              <th className="py-2.5" aria-label="actions" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line-200">
            {filtered.map((c) => (
              <tr key={c.id}>
                <td className="py-2.5 pr-3">
                  <p className="font-heading font-semibold text-ink-900">{c.content?.name}</p>
                  <p className="font-mono text-[10.5px] text-slatex-400">{c.code}</p>
                </td>
                <td className="py-2.5 pr-3 text-[12px] text-slatex-600">{c.content?.continent}</td>
                <td className="py-2.5 pr-3 text-[12px] text-slatex-600">{c.content?.agencies?.length ?? 0}</td>
                <td className="py-2.5 pr-3">
                  <select
                    value={c.status}
                    onChange={(e) => patch(c.id, { status: e.target.value })}
                    className={`h-8 cursor-pointer rounded-full px-2.5 text-[11px] font-semibold ${
                      c.status === "verified" ? "bg-[#159769]/10 text-[#0d6e4a]" : c.status === "outdated" ? "bg-[#d23434]/10 text-[#a52222]" : "bg-signal-100 text-signal-600"
                    }`}
                    aria-label="status"
                  >
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2.5 pr-3 text-[11.5px] text-slatex-400">
                  {c.lastVerified}
                  <br />
                  {c.nextReview ? `→ ${c.nextReview}` : ""}
                </td>
                <td className="py-2.5">
                  <div className="flex justify-end gap-1.5">
                    <button type="button" onClick={() => patch(c.id, { markVerified: true })} className="btn-g btn-ghost-g !h-8 !px-2.5 !text-[12px]" title={fr ? "Marquer vérifié aujourd’hui" : "Mark verified today"}>
                      <BadgeCheck size={12} aria-hidden />
                    </button>
                    <button type="button" onClick={() => setEditing(c)} className="btn-g btn-ghost-g !h-8 !px-2.5 !text-[12px]">
                      <Save size={12} aria-hidden />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CountryEditor({ country, fr, onDone }: { country: AdminCountry; fr: boolean; onDone: () => void }) {
  const [json, setJson] = useState(() => {
    try {
      return JSON.stringify(country.content, null, 2);
    } catch {
      return "";
    }
  });
  const [nextReview, setNextReview] = useState(country.nextReview ?? "");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    setErr(null);
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      setErr(fr ? "JSON invalide" : "Invalid JSON");
      setBusy(false);
      return;
    }
    const r = await api("/api/admin/content/directory", "PATCH", {
      id: country.id,
      content: parsed,
      nextReview: nextReview || null,
    });
    setBusy(false);
    if (!r.ok) {
      setErr(r.error ?? "error");
      return;
    }
    onDone();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-heading text-[15px] font-bold text-ink-900">
          {fr ? "Modifier" : "Edit"}: {country.content?.name} ({country.code})
        </h3>
        <div className="flex gap-2">
          <button type="button" onClick={onDone} className="btn-g btn-ghost-g btn-sm-g">
            <X size={13} aria-hidden />
            {fr ? "Annuler" : "Cancel"}
          </button>
          <button type="button" onClick={save} disabled={busy} className="btn-g btn-primary-g btn-sm-g">
            <Save size={13} aria-hidden />
            {fr ? "Enregistrer" : "Save"}
          </button>
        </div>
      </div>
      {err ? <p className="mb-3 rounded-lg bg-[#d23434]/10 px-3 py-2 text-[12.5px] text-[#a52222]">{err}</p> : null}
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Field
            label={fr ? "Contenu du pays (JSON — agences, contacts, sources, notes bilingues)" : "Country content (JSON — agencies, contacts, sources, bilingual notes)"}
            value={json}
            onChange={setJson}
            textarea
            rows={20}
            mono
          />
        </div>
        <div>
          <Field label={fr ? "Prochaine revue (YYYY-MM-DD)" : "Next review (YYYY-MM-DD)"} value={nextReview} onChange={setNextReview} mono hint={fr ? "Rappel de vérification périodique" : "Periodic verification reminder"} />
          <p className="mt-3 text-[11.5px] leading-relaxed text-slatex-400">
            {fr
              ? "Structure : { name, nameFr, continent, priority, emergency, physicalReporting: {en,fr}, agencies: [{ name, role, website, reportingUrl, phone, email, handles, note: {en,fr} }], sources: [{label,url}] }"
              : "Structure: { name, nameFr, continent, priority, emergency, physicalReporting: {en,fr}, agencies: [{ name, role, website, reportingUrl, phone, email, handles, note: {en,fr} }], sources: [{label,url}] }"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Checker patterns                                                    */
/* ================================================================== */

type AdminPattern = {
  id: string;
  indicatorId: string;
  category: string;
  weight: number;
  active: boolean;
  label: { en: string; fr: string };
  explanation: { en: string; fr: string };
  patterns: string[];
};

function CheckerModule() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [items, setItems] = useState<AdminPattern[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminPattern | "new" | null>(null);

  const [reload, setReload] = useState(0);
  const refresh = useCallback(() => setReload((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await api<{ items: AdminPattern[] }>("/api/admin/content/checker", "GET");
      if (!cancelled) setItems(r.data?.items ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [reload]);

  const patch = async (id: string, body: Record<string, unknown>) => {
    const r = await api("/api/admin/content/checker", "PATCH", { id, ...body });
    setMsg(r.ok ? (fr ? "Enregistré." : "Saved.") : `Erreur: ${r.error}`);
    if (r.ok) refresh();
  };

  if (editing) {
    return (
      <PatternEditor
        pattern={editing === "new" ? null : editing}
        fr={fr}
        onDone={() => {
          setEditing(null);
          refresh();
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-slatex-600">
          {items ? `${items.length} ${fr ? "motifs de détection" : "detection patterns"}` : "…"}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={refresh} className="btn-g btn-ghost-g btn-sm-g">
            <RefreshCw size={13} aria-hidden />
          </button>
          <button type="button" onClick={() => setEditing("new")} className="btn-g btn-primary-g btn-sm-g">
            <Plus size={13} aria-hidden />
            {fr ? "Nouveau motif" : "New pattern"}
          </button>
        </div>
      </div>
      {msg ? <p className="mb-3 rounded-lg bg-brand-50 px-3 py-2 text-[12.5px] font-medium text-brand-600">{msg}</p> : null}
      <p className="mb-4 text-[11.5px] leading-relaxed text-slatex-400">
        {fr
          ? "Les motifs alimentent le moteur d’analyse du Scam Checker. Regex sensibles à la casse sur texte normalisé (minuscules, sans accents). Les messages soumis par les visiteurs ne sont jamais exposés ici."
          : "Patterns power the Scam Checker analysis engine. Case-insensitive regexes on normalised text (lowercase, accents stripped). Visitor-submitted messages are never exposed here."}
      </p>
      <div className="scroll-g max-h-[560px] space-y-2.5 overflow-y-auto">
        {(items ?? []).map((p) => (
          <div key={p.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-line-200 p-3.5">
            <span className="font-mono text-[12px] font-bold text-brand-600">{p.indicatorId}</span>
            <span className="chip-g bg-mist-50 text-slatex-600">{p.category} · w{p.weight} · {p.patterns.length} regex</span>
            <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink-700">{p.label.en}</span>
            <Toggle on={p.active} onChange={(v) => patch(p.id, { active: v })} labelOn={fr ? "actif" : "active"} labelOff={fr ? "inactif" : "off"} />
            <button type="button" onClick={() => setEditing(p)} className="btn-g btn-ghost-g !h-8 !px-2.5 !text-[12px]">
              <Save size={12} aria-hidden />
              {fr ? "Éditer" : "Edit"}
            </button>
            <button
              type="button"
              onClick={async () => {
                if (!window.confirm(fr ? "Supprimer ce motif ?" : "Delete this pattern?")) return;
                await api("/api/admin/content/checker", "DELETE", { id: p.id });
                refresh();
              }}
              className="btn-g btn-ghost-g !h-8 !px-2.5 !text-[12px] !text-[#a52222]"
              aria-label="delete"
            >
              <Trash2 size={12} aria-hidden />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatternEditor({ pattern, fr, onDone }: { pattern: AdminPattern | null; fr: boolean; onDone: () => void }) {
  const [id, setId] = useState(pattern?.indicatorId ?? "");
  const [category, setCategory] = useState(pattern?.category ?? "urgency");
  const [weight, setWeight] = useState(String(pattern?.weight ?? 2));
  const [labelEn, setLabelEn] = useState(pattern?.label.en ?? "");
  const [labelFr, setLabelFr] = useState(pattern?.label.fr ?? "");
  const [explEn, setExplEn] = useState(pattern?.explanation.en ?? "");
  const [explFr, setExplFr] = useState(pattern?.explanation.fr ?? "");
  const [patterns, setPatterns] = useState((pattern?.patterns ?? []).join("\n"));
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    setErr(null);
    const body = {
      indicatorId: id,
      category,
      weight: Number(weight) || 1,
      label: { en: labelEn, fr: labelFr },
      explanation: { en: explEn, fr: explFr },
      patterns: lines(patterns),
      active: true,
    };
    const r = pattern
      ? await api("/api/admin/content/checker", "PATCH", { id: pattern.id, ...body })
      : await api("/api/admin/content/checker", "POST", body);
    setBusy(false);
    if (!r.ok) {
      setErr(r.error === "bad_regex" ? (fr ? "Regex invalide dans la liste" : "Invalid regex in list") : r.error ?? "error");
      return;
    }
    onDone();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-heading text-[15px] font-bold text-ink-900">
          {pattern ? (fr ? "Modifier le motif" : "Edit pattern") : fr ? "Nouveau motif de détection" : "New detection pattern"}
        </h3>
        <div className="flex gap-2">
          <button type="button" onClick={onDone} className="btn-g btn-ghost-g btn-sm-g">
            <X size={13} aria-hidden />
            {fr ? "Annuler" : "Cancel"}
          </button>
          <button type="button" onClick={save} disabled={busy} className="btn-g btn-primary-g btn-sm-g">
            <Save size={13} aria-hidden />
            {fr ? "Enregistrer" : "Save"}
          </button>
        </div>
      </div>
      {err ? <p className="mb-3 rounded-lg bg-[#d23434]/10 px-3 py-2 text-[12.5px] text-[#a52222]">{err}</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={fr ? "Identifiant (id)" : "Indicator id"} value={id} onChange={setId} mono hint="e.g. new-indicator-id" />
        <Field label={fr ? "Catégorie" : "Category"} value={category} onChange={setCategory} mono hint="urgency | advance-fee | credentials | impersonation | …" />
        <Field label={fr ? "Poids (1–3)" : "Weight (1–3)"} value={weight} onChange={setWeight} />
        <div />
        <Field label={fr ? "Libellé (EN)" : "Label (EN)"} value={labelEn} onChange={setLabelEn} />
        <Field label={fr ? "Libellé (FR)" : "Label (FR)"} value={labelFr} onChange={setLabelFr} />
        <Field label={fr ? "Explication (EN)" : "Explanation (EN)"} value={explEn} onChange={setExplEn} textarea rows={3} />
        <Field label={fr ? "Explication (FR)" : "Explanation (FR)"} value={explFr} onChange={setExplFr} textarea rows={3} />
        <div className="md:col-span-2">
          <Field
            label={fr ? "Motifs regex (un par ligne)"
              : "Regex patterns (one per line)"}
            value={patterns}
            onChange={setPatterns}
            textarea
            rows={6}
            mono
            hint={fr ? "Appliqués au texte normalisé (minuscules, sans accents) — ex. \\burgent(ly)?\\b" : "Applied to normalised text (lowercase, accents stripped) — e.g. \\burgent(ly)?\\b"}
          />
        </div>
      </div>
    </div>
  );
}
