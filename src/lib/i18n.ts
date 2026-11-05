import type { Locale } from "@/lib/types";
import enJson from "@/messages/en.json";
import frJson from "@/messages/fr.json";

// All public copy lives in src/messages/{en,fr}.json (Locale Parity).
// Typing `fr` against the English shape enforces key parity at compile time.
export type Messages = typeof enJson;

const fr: Messages = frJson;

export function m(locale: Locale): Messages {
  return locale === "fr" ? fr : enJson;
}
