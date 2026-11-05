"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Send, X } from "lucide-react";
import { Logo } from "@/components/ui";
import type { AssistantReply, Locale } from "@/lib/types";
import { m } from "@/lib/i18n";

export function Counter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el) return;
    if (reduce) { setN(value); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (time: number) => {
        const p = Math.min(1, (time - start) / 900);
        setN(Math.round(value * (1 - (1 - p) ** 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);
  return (
    <div className="counter-card" ref={ref}>
      <span className="stat-num">{n}{suffix}</span>
      <span>{label}</span>
    </div>
  );
}

export function CopyButton({ value, label, copied }: { value: string; label: string; copied: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="btn btn-outline-dark"
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setDone(true);
      }}
    >
      {done ? <Check size={16} /> : <Copy size={16} />} {done ? copied : label}
    </button>
  );
}

export function OpenAssistant({ label }: { label: string }) {
  return (
    <button className="btn btn-outline" type="button" onClick={() => window.dispatchEvent(new Event("glp-open-assistant"))}>
      {label}
    </button>
  );
}

export function Assistant({ locale, welcome, suggestions }: { locale: Locale; welcome: string; suggestions: string[] }) {
  const t = m(locale);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string; reply?: AssistantReply }[]>([]);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openIt = () => setOpen(true);
    window.addEventListener("glp-open-assistant", openIt);
    return () => window.removeEventListener("glp-open-assistant", openIt);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight }); }, [messages, busy]);

  async function ask(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const history = messages.map(({ role, content: body }) => ({ role, content: body }));
    setMessages((current) => [...current, { role: "user", content }]);
    setInput("");
    setBusy(true);
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, locale, history }),
      });
      const reply = await response.json() as AssistantReply & { error?: string };
      setMessages((current) => [...current, { role: "assistant", content: reply.answer || t.assistant.error, reply }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: t.assistant.error }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button className="assistant-btn" type="button" aria-label={t.assistant.open} onClick={() => setOpen(true)}>
        <Logo compact />
      </button>
      {open ? (
        <section className="panel" role="dialog" aria-modal="true" aria-label={t.assistant.name}>
          <header>
            <div>
              <strong>{t.assistant.name}</strong>
              <div className="help">{t.assistant.sub} · {locale.toUpperCase()}</div>
            </div>
            <div>
              <button className="icon-btn" type="button" onClick={() => setMessages([])} aria-label={t.assistant.clear}>↺</button>
              <button className="icon-btn" type="button" onClick={() => setOpen(false)} aria-label={t.assistant.close}><X /></button>
            </div>
          </header>
          <div className="messages" ref={box} aria-live="polite">
            <div className="bubble bot">{welcome}</div>
            {messages.length === 0 ? (
              <div className="suggests">
                {suggestions.map((item) => <button key={item} type="button" onClick={() => ask(item)}>{item}</button>)}
              </div>
            ) : null}
            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`bubble ${item.role === "user" ? "user" : "bot"}`}>
                {item.content}
                {item.reply?.sources?.length ? (
                  <div className="sources">
                    {item.reply.sources.map((source) => <a key={source.href} href={source.href}>{source.title}</a>)}
                  </div>
                ) : null}
                {item.reply?.action ? <p><a href={item.reply.action.href}>{item.reply.action.label}</a></p> : null}
              </div>
            ))}
            {busy ? <div className="bubble bot">{t.assistant.typing}…</div> : null}
          </div>
          <footer>
            <form className="composer" onSubmit={(event) => { event.preventDefault(); void ask(input); }}>
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={t.assistant.placeholder} aria-label={t.assistant.placeholder} maxLength={2000} />
              <button className="btn btn-signal" type="submit" aria-label={t.assistant.send}><Send size={16} /></button>
            </form>
            <p className="help">{t.assistant.disclaimer}</p>
          </footer>
        </section>
      ) : null}
    </>
  );
}
