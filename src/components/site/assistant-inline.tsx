"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MessageSquareText } from "lucide-react";
import type { Dictionary } from "@/messages/en";
import type { Locale } from "@/lib/i18n";

const AssistantPanel = dynamic(() => import("./assistant-panel").then((mod) => mod.AssistantPanel), {
  ssr: false,
});

export function AssistantInline({ locale, dict, label }: { locale: Locale; dict: Dictionary; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn btn-outline btn-sm">
        <MessageSquareText size={16} strokeWidth={1.8} aria-hidden="true" />
        {label}
      </button>
      {open ? <AssistantPanel locale={locale} dict={dict} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
