"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LoaderCircle, MessageCircle, Send, X } from "lucide-react";
import type { Dictionary } from "@/messages/en";
import type { Locale } from "@/lib/i18n";

const JARVIS_COPY = {
  en: {
    title: "Jarvis",
    sub: "GLOPROFAS AI assistant",
    ph: "Describe the message or offer…",
    hi: "Hi, I’m Jarvis! Paste or describe a suspicious message, call or offer and I’ll help you spot warning signs.",
    note: "Guidance only. Never share passwords, PINs or codes.",
    err: "Sorry, the assistant is unavailable right now. Please try again.",
    open: "Chat with Jarvis",
    chips: [
      "Is this WhatsApp message a scam?",
      "I sent money to a scammer, what now?",
      "How do I check an investment offer?",
    ],
  },
  fr: {
    title: "Jarvis",
    sub: "Assistant IA GLOPROFAS",
    ph: "Décrivez le message ou l’offre…",
    hi: "Bonjour, je suis Jarvis ! Collez ou décrivez un message, un appel ou une offre suspecte et je vous aiderai à repérer les signaux d’alerte.",
    note: "Conseils uniquement. Ne partagez jamais mots de passe, codes PIN ou codes.",
    err: "Désolé, l’assistant est indisponible. Réessayez plus tard.",
    open: "Discuter avec Jarvis",
    chips: [
      "Ce message WhatsApp est-il une arnaque ?",
      "J’ai envoyé de l’argent à un escroc, que faire ?",
      "Comment vérifier une offre d’investissement ?",
    ],
  },
} as const;

type ChatMsg = {
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; href: string }[];
};

export function AssistantLauncher({
  locale,
  enabled = true,
  autoOpen = false,
}: {
  locale: Locale;
  dict?: Dictionary;
  enabled?: boolean;
  autoOpen?: boolean;
}) {
  const t = JARVIS_COPY[locale];
  const [open, setOpen] = useState(autoOpen);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!enabled) return null;

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const next: ChatMsg[] = [...messages, { role: "user", content: text.trim() }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, messages: next }),
      });
      if (!res.ok) throw new Error("failed");
      const data = (await res.json()) as {
        answer: string;
        sources?: { title: string; href: string }[];
      };
      setMessages((curr) => [
        ...curr,
        { role: "assistant", content: data.answer, sources: data.sources },
      ]);
    } catch {
      setMessages((curr) => [...curr, { role: "assistant", content: t.err }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open ? (
        <div
          role="dialog"
          aria-label={t.title}
          className="fixed inset-x-3 bottom-20 z-50 flex h-[min(600px,75vh)] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-none sm:inset-x-auto sm:right-5 sm:w-[390px]"
        >
          <div className="flex items-center gap-3 bg-brand-600 px-4 py-3 text-white">
            <span className="rounded-md bg-white p-1">
              <Image
                src="/images/gloprofas-logo.png"
                alt="GLOPROFAS - Global Programme for the Fight Against Scams"
                width={1132}
                height={350}
                className="h-6 w-auto object-contain"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-tight">{t.title}</p>
              <p className="truncate text-xs opacity-80">{t.sub}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-lg p-1 hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <div className="rounded-2xl rounded-bl-sm bg-mist px-3.5 py-2.5 text-sm text-ink">
              {t.hi}
            </div>
            {messages.length === 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {t.chips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => void sendMessage(chip)}
                    className="rounded-full border border-line px-3 py-1.5 text-left text-xs font-medium text-ink transition hover:bg-mist"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            ) : null}
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === "user" ? "flex justify-end" : "flex"}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-brand-600 text-white"
                      : "rounded-bl-sm bg-mist text-ink"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.content}</p>
                  {m.sources && m.sources.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.sources.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="text-xs font-semibold text-brand-600 underline"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {loading ? (
              <div className="flex items-center gap-2 text-xs text-slatex-600">
                <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                <span>…</span>
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage(input);
            }}
            className="border-t border-line p-3"
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.ph}
                maxLength={1200}
                className="h-10 flex-1 rounded-xl border border-line bg-white px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white disabled:opacity-40"
              >
                {loading ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-slatex-600">{t.note}</p>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.open}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-none transition hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
