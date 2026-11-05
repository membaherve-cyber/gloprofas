"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveReportAction, submitReportAction, uploadEvidenceAction } from "@/server/actions";
import { m } from "@/lib/i18n";
import { pathFor } from "@/lib/paths";
import type { Locale, ReportDraftData } from "@/lib/types";

type Cat = { id: string; title: string };

export function ReportWizard({ locale, categories, initial }: { locale: Locale; categories: Cat[]; initial: ReportDraftData }) {
  const t = m(locale);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ReportDraftData>(initial);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [pending, setPending] = useState(false);

  function set<K extends keyof ReportDraftData>(key: K, value: ReportDraftData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  async function next() {
    setPending(true);
    setError("");
    const form = new FormData();
    form.set("step", String(step));
    form.set("category_id", data.categoryId || "");
    form.set("unsure", data.unsure ? "yes" : "no");
    form.set("description", data.description || "");
    form.set("incident_date", data.incidentDate || "");
    form.set("channel", data.channel || "");
    form.set("country", data.country || "");
    form.set("city", data.city || "");
    form.set("url", data.url || "");
    form.set("phone", data.phone || "");
    form.set("email_involved", data.emailInvolved || "");
    form.set("money_lost", data.moneyLost ? "yes" : "no");
    form.set("amount", data.amount || "");
    form.set("currency", data.currency || "");
    form.set("ongoing", data.ongoing ? "yes" : "no");
    form.set("name", data.name || "");
    form.set("email", data.email || "");
    form.set("language", data.language || locale);
    form.set("consent", data.consent ? "yes" : "no");
    const result = await saveReportAction({ ok: false }, form);
    setPending(false);
    if (!result.ok) { setError(t.forms.invalid); return; }
    setStep((current) => Math.min(5, current + 1));
    router.refresh();
  }

  async function upload(list: FileList | null) {
    if (!list?.[0]) return;
    const form = new FormData();
    form.set("file", list[0]);
    const result = await uploadEvidenceAction(form);
    if (!result.ok) setError(result.error || t.errorGeneric);
    else setFiles((current) => [...current, list[0].name]);
  }

  return (
    <div className="wizard">
      <div className="progress" aria-label="Progress">
        {t.report.steps.map((label, index) => <span key={label} className={step === index + 1 ? "on" : ""}>{index + 1}. {label}</span>)}
      </div>
      <p className="notice">{t.report.reassurance}</p>
      {step === 1 ? (
        <div className="card" style={{ display: "grid", gap: 14 }}>
          <h2 style={{ fontSize: "1.6rem" }}>{t.report.category}</h2>
          <div className="choice-grid">
            {categories.map((item) => (
              <button key={item.id} type="button" className={`choice ${data.categoryId === item.id && !data.unsure ? "on" : ""}`} onClick={() => { set("categoryId", item.id); set("unsure", false); }}>{item.title}</button>
            ))}
            <button type="button" className={`choice ${data.unsure ? "on" : ""}`} onClick={() => set("unsure", true)}>{t.report.unsure}</button>
          </div>
          <div className="field"><label htmlFor="desc">{t.report.description}</label><textarea id="desc" value={data.description || ""} onChange={(event) => set("description", event.target.value)} required /></div>
          <div className="field"><label htmlFor="date">{t.report.date}</label><input id="date" type="date" value={data.incidentDate || ""} onChange={(event) => set("incidentDate", event.target.value)} /></div>
        </div>
      ) : null}
      {step === 2 ? (
        <div className="card" style={{ display: "grid", gap: 14 }}>
          <div className="field"><label htmlFor="channel">{t.report.channel}</label>
            <select id="channel" value={data.channel || ""} onChange={(event) => set("channel", event.target.value)}>
              <option value="">—</option>
              {t.channels.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="field"><label htmlFor="country">{t.report.country}</label><input id="country" value={data.country || ""} onChange={(event) => set("country", event.target.value)} /></div>
          <div className="field"><label htmlFor="city">{t.report.city} <span className="help">({t.optional})</span></label><input id="city" value={data.city || ""} onChange={(event) => set("city", event.target.value)} /></div>
          <div className="field"><label htmlFor="url">{t.report.url}</label><input id="url" value={data.url || ""} onChange={(event) => set("url", event.target.value)} /></div>
          <div className="field"><label htmlFor="phone">{t.report.phone}</label><input id="phone" value={data.phone || ""} onChange={(event) => set("phone", event.target.value)} /></div>
          <div className="field"><label htmlFor="emailInvolved">{t.report.email}</label><input id="emailInvolved" value={data.emailInvolved || ""} onChange={(event) => set("emailInvolved", event.target.value)} /></div>
          <fieldset><legend>{t.report.money}</legend>
            <label><input type="radio" name="money" checked={data.moneyLost === true} onChange={() => set("moneyLost", true)} /> {t.report.yes}</label>
            <label><input type="radio" name="money" checked={data.moneyLost === false} onChange={() => set("moneyLost", false)} /> {t.report.no}</label>
          </fieldset>
          {data.moneyLost ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: 10 }}>
              <div className="field"><label htmlFor="amount">{t.report.amount}</label><input id="amount" value={data.amount || ""} onChange={(event) => set("amount", event.target.value)} /></div>
              <div className="field"><label htmlFor="currency">{t.report.currency}</label><input id="currency" value={data.currency || "XAF"} onChange={(event) => set("currency", event.target.value)} /></div>
            </div>
          ) : null}
          <fieldset><legend>{t.report.ongoing}</legend>
            <label><input type="radio" checked={data.ongoing === true} onChange={() => set("ongoing", true)} /> {t.report.yes}</label>
            <label><input type="radio" checked={data.ongoing === false} onChange={() => set("ongoing", false)} /> {t.report.no}</label>
          </fieldset>
          <div style={{ borderTop: "1px solid var(--color-line)", paddingTop: 14 }}>
            <p className="help">{t.report.evidence}</p>
            <div className="field"><label htmlFor="file">{t.report.drop}</label><input id="file" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => upload(event.target.files)} /></div>
            <ul>{files.map((name) => <li key={name}>{name}</li>)}</ul>
          </div>
        </div>
      ) : null}
      {step === 3 ? (
        <div className="card" style={{ display: "grid", gap: 12 }}>
          <div className="field"><label htmlFor="name">{t.report.name} <span className="help">({t.optional})</span></label><input id="name" value={data.name || ""} autoComplete="name" onChange={(event) => set("name", event.target.value)} /></div>
          <div className="field"><label htmlFor="email">{t.report.yourEmail}</label><input id="email" type="email" required autoComplete="email" value={data.email || ""} onChange={(event) => set("email", event.target.value)} /></div>
          <div className="field"><label htmlFor="lang">{t.report.prefLang}</label>
            <select id="lang" value={data.language || locale} onChange={(event) => set("language", event.target.value as Locale)}>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      ) : null}
      {step === 4 ? (
        <div className="card" style={{ display: "grid", gap: 10 }}>
          <h2 style={{ fontSize: "1.5rem" }}>{t.report.review}</h2>
          <p>{data.description}</p>
          <p className="help">{data.email} · {data.country} · {data.moneyLost ? t.report.yes : t.report.no}</p>
          <label style={{ display: "flex", gap: 8 }}><input type="checkbox" checked={Boolean(data.consent)} onChange={(event) => set("consent", event.target.checked)} /> {t.report.consent}</label>
          <p className="notice">{t.notPolice}</p>
          <button className="btn btn-signal" type="button" disabled={pending || !data.consent} onClick={async () => {
            setPending(true);
            const form = new FormData();
            form.set("step", "4");
            form.set("description", data.description || "");
            form.set("email", data.email || "");
            form.set("language", data.language || locale);
            form.set("name", data.name || "");
            form.set("consent", "yes");
            form.set("money_lost", data.moneyLost ? "yes" : "no");
            form.set("ongoing", data.ongoing ? "yes" : "no");
            await saveReportAction({ ok: false }, form);
            await submitReportAction(locale);
            setPending(false);
          }}>{t.submit}</button>
        </div>
      ) : null}
      {error ? <p className="error" role="alert">{error}</p> : null}
      <div className="sticky-next">
        <button className="btn btn-outline-dark" type="button" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1}>{t.back}</button>
        {step < 4 ? <button className="btn" type="button" onClick={() => void next()} disabled={pending}>{t.next}</button> : <a href={pathFor(locale, "legal", locale === "fr" ? "avertissement-signalement" : "reporting-disclaimer")}>{t.readMore}</a>}
      </div>
    </div>
  );
}
