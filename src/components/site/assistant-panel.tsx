"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Send, ShieldAlert, Trash2, X } from "lucide-react";
import { routes, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/messages/en";

type Source = { title: string; href: string };

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  grounded?: boolean;
};

export function AssistantPanel({
  locale,
  dict,
  onClose,
}: {
  locale: Locale;
  dict: Dictionary;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: dict.assistant.welcome },
  ]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  async function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || pending) return;
    setError(null);
    setInput("");
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setPending(true);
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          messages: next.slice(-8).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (response.status === 429) {
        setError(dict.assistant.rateLimit);
        setPending(false);
        return;
      }
      if (!response.ok) throw new Error("request failed");
      const data = (await response.json()) as {
        answer: string;
        sources: Source[];
        grounded: boolean;
      };
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer, sources: data.sources, grounded: data.grounded },
      ]);
    } catch {
      setError(dict.assistant.error);
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={dict.assistant.name}
      className="fixed inset-0 z-[70] flex flex-col overflow-hidden border border-white/10 bg-navy-900 shadow-[var(--shadow-none)] sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[600px] sm:w-[380px] sm:rounded-none"
    >
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
            <ShieldAlert size={17} strokeWidth={1.8} aria-hidden="true" className="text-white" />
          </span>
          <div>
            <p className="text-[0.85rem] font-semibold leading-tight text-white">{dict.assistant.name}</p>
            <p className="text-xs text-slate-300">{dict.assistant.languageNote}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setMessages([{ role: "assistant", content: dict.assistant.welcome }]);
              setError(null);
            }}
            aria-label={dict.assistant.clear}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.assistant.close}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.map((message, index) => (
          <div key={index} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[88%] rounded-sm px-3.5 py-2.5 text-[0.85rem] leading-relaxed ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "border border-white/10 bg-navy-800 text-slate-100"
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
              {message.sources && message.sources.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {message.sources.map((source) => (
                    <Link
                      key={source.href}
                      href={source.href}
                      className="inline-flex items-center gap-1 rounded-full border border-cyan-400/40 px-2 py-0.5 text-xs font-semibold text-cyan-400 hover:bg-cyan-400/10"
                    >
                      {source.title} <ArrowRight size={10} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              ) : null}
              {message.grounded === false && message.role === "assistant" && index > 0 ? (
                <p className="mt-2 text-xs text-signal-400">{dict.common.notPolice}</p>
              ) : null}
            </div>
          </div>
        ))}
        {pending ? (
          <p className="text-[0.8rem] text-slate-300" role="status">
            {dict.assistant.thinking}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-[10px] border border-risk-critical/40 bg-risk-critical/10 px-3 py-2 text-[0.8rem] text-white" role="alert">
            {error}
          </p>
        ) : null}
        {messages.length === 1 ? (
          <div className="space-y-2 pt-2">
            {dict.assistant.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => void send(suggestion)}
                className="block w-full rounded-[10px] border border-white/10 bg-white/5 px-3 py-2 text-left text-[0.8rem] text-slate-200 hover:border-cyan-400/50 hover:text-white"
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}
        {messages.length > 2 ? (
          <div className="rounded-[12px] border border-signal-400/40 bg-signal-400/10 p-3">
            <Link href={routes.report(locale)} className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-signal-400">
              <ShieldAlert size={15} aria-hidden="true" /> {dict.assistant.reportCta}
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void send(input);
        }}
        className="shrink-0 border-t border-white/10 bg-navy-950 p-3"
      >
        <div className="flex items-center gap-2">
          <label htmlFor="assistant-input" className="sr-only">
            {dict.assistant.placeholder}
          </label>
          <input
            ref={inputRef}
            id="assistant-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={600}
            placeholder={dict.assistant.placeholder}
            className="field min-h-11 border-white/15 bg-white/10 text-white placeholder:text-slate-300"
          />
          <button
            type="submit"
            disabled={pending || !input.trim()}
            aria-label={dict.assistant.send}
            className="btn btn-primary btn-sm h-11 w-11 shrink-0 px-0"
          >
            <Send size={16} aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-xs leading-snug text-slate-300">{dict.assistant.disclaimer}</p>
      </form>
    </div>
  );
}
