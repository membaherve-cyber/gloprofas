"use client";

/**
 * Oskie — GLOPROFAS AI Assistant floating widget.
 * Calls POST /api/assistant (server-side LLM with GLOPROFAS content grounding).
 * Responsible educational guidance only.
 */

import React, { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { A } from "@/lib/router";

type Msg = {
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; href: string }[];
};

/**
 * Oskie brand mark — the GLOPROFAS "G", used on the assistant launcher
 * and in the chat header.
 */
function OskieMark({ size = 44 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="flex items-center justify-center rounded-full bg-white"
      style={{ width: size * 0.72, height: size * 0.72 }}
    >
      <span
        className="font-heading font-extrabold leading-none text-brand-600"
        style={{ fontSize: size * 0.46 }}
      >
        G
      </span>
    </span>
  );
}

export function AssistantLauncher() {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions =
    locale === "fr"
      ? [
          "Ce message WhatsApp est-il une arnaque ?",
          "J'ai envoyé de l'argent à un escroc, que faire ?",
          "Comment vérifier une offre d'investissement ?",
        ]
      : [
          "Is this WhatsApp message a scam?",
          "I sent money to a scammer, what now?",
          "How do I check an investment offer?",
        ];

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ role: "assistant", content: t("assistant.welcome") }]);
    }
  }, [open, msgs.length, t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs, busy]);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    setInput("");
    setError(null);
    const history = [...msgs, { role: "user" as const, content: question }];
    setMsgs(history);
    setBusy(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, locale }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "assistant_error");
      }
      setMsgs([
        ...history,
        { role: "assistant", content: data.answer, sources: data.sources },
      ]);
    } catch (e) {
      const code = e instanceof Error ? e.message : "error";
      setError(
        code === "rate_limited" ? t("assistant.rateLimit") : t("assistant.error")
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("assistant.close") : t("assistant.open")}
        aria-expanded={open}
        className="assistant-fab fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-[0_8px_28px_rgba(0,113,227,0.35)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-brand-700 active:scale-[0.96]"
      >
        {open ? <X size={22} /> : <OskieMark size={44} />}
        {!open ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-brand-600 bg-white" />
          </span>
        ) : null}
      </button>

      {/* Dialog */}
      {open ? (
        <div
          role="dialog"
          aria-label="Oskie — GLOPROFAS AI Assistant"
          className="fixed bottom-24 right-5 z-[60] flex h-[min(560px,calc(100dvh-140px))] w-[min(400px,calc(100vw-40px))] flex-col overflow-hidden rounded-[24px] bg-white shadow-e3 ring-1 ring-black/[0.08]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-black/[0.08] bg-white px-4 py-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600">
              <span className="font-heading text-[20px] font-bold leading-none text-white">G</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-[14.5px] font-bold leading-tight text-ink-900">Oskie</p>
              <p className="truncate text-[11.5px] text-slatex-600">{t("assistant.name")}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("assistant.close")}
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-900 transition-colors duration-300 hover:bg-black/[0.05]"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="scroll-g flex-1 space-y-3.5 overflow-y-auto bg-[#fbfbfd] px-4 py-4"
            aria-live="polite"
          >
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                <div
                  className={`max-w-[85%] rounded-[18px] px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                    m.role === "user"
                      ? "bg-brand-600 text-white"
                      : "border border-black/[0.08] bg-white text-ink-900 shadow-e1"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                  {m.sources && m.sources.length > 0 ? (
                    <div className="mt-2.5 border-t border-line-200 pt-2">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slatex-600">
                        {t("assistant.sources")}
                      </p>
                      <ul className="space-y-1">
                        {m.sources.map((s, j) => (
                          <li key={j}>
                            <A href={s.href} className="text-[12px] font-semibold text-brand-600 hover:underline">
                              {s.title}
                            </A>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {busy ? (
              <div className="flex items-center gap-2 text-[12.5px] text-slatex-600">
                <span className="flex gap-1" aria-hidden>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500 [animation-delay:300ms]" />
                </span>
                {t("assistant.thinking")}
              </div>
            ) : null}
            {error ? (
              <p role="alert" className="rounded-lg bg-[#d23434]/10 px-3 py-2 text-[12.5px] text-[#a52222]">
                {error}
              </p>
            ) : null}
          </div>

          {/* Suggestions */}
          {msgs.length <= 1 ? (
            <div className="flex flex-wrap gap-2 border-t border-black/[0.08] bg-white px-4 py-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-black/[0.1] px-3 py-1.5 text-[12px] font-medium text-ink-900 transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-black/30 active:scale-[0.98]"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}

          {/* Input */}
          <form
            className="border-t border-black/[0.08] bg-white p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={1200}
                placeholder={t("assistant.placeholder")}
                aria-label={t("assistant.placeholder")}
                className="field-g !min-h-[42px] flex-1 !rounded-full"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={t("assistant.send")}
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:bg-brand-700 active:scale-[0.96] disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="mt-2 text-center text-[10.5px] text-slatex-400">
              {t("assistant.disclaimer")} · {t("assistant.languageNote")}
            </p>
          </form>
        </div>
      ) : null}
    </>
  );
}
