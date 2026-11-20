/**
 * GLOPROFAS — frequently asked questions.
 * Single source of truth: rendered visibly on the homepage (accordion) and
 * mirrored into the FAQPage structured data in the root layout.
 * Bilingual EN/FR. Content is genuine, drawn from the site's own guidance.
 */

import type { BiText } from "./resource-centre-types";

export const FAQ_ITEMS: { q: BiText; a: BiText }[] = [
  {
    q: {
      en: "How do I know if a message is a scam?",
      fr: "Comment savoir si un message est une arnaque ?",
    },
    a: {
      en: "Look for the core warning signs: unexpected contact, artificial urgency, requests for advance payments, codes or PINs, unusual payment instructions, and promises that are too good to be true. You can paste any suspicious message into the free GLOPROFAS Scam Checker for an indicative analysis of its warning signs.",
      fr: "Recherchez les signaux d’alerte fondamentaux : un contact inattendu, une urgence artificielle, des demandes de paiement anticipé, de codes ou de PIN, des instructions de paiement inhabituelles et des promesses trop belles pour être vraies. Vous pouvez coller tout message suspect dans le GLOPROFAS Scam Checker gratuit pour une analyse indicative de ses signaux.",
    },
  },
  {
    q: {
      en: "What should I do immediately after being scammed?",
      fr: "Que faire immédiatement après avoir été arnaqué ?",
    },
    a: {
      en: "Follow five steps in order: stop all contact and payments; contact your bank or mobile money provider (MTN MoMo, Orange Money) immediately; preserve all evidence (screenshots, numbers, receipts); report to the competent authorities in your country; then protect your identity by changing passwords and enabling multi-factor authentication.",
      fr: "Suivez cinq étapes dans l’ordre : cessez tout contact et tout paiement ; contactez immédiatement votre banque ou votre opérateur de mobile money (MTN MoMo, Orange Money) ; conservez toutes les preuves (captures d’écran, numéros, reçus) ; signalez aux autorités compétentes de votre pays ; puis protégez votre identité en changeant vos mots de passe et en activant l’authentification multifacteur.",
    },
  },
  {
    q: {
      en: "How do I report a scam in Cameroon?",
      fr: "Comment signaler une arnaque au Cameroun ?",
    },
    a: {
      en: "In Cameroon, report to the police (117 in an emergency), to ANTIC for technical cyber incidents such as phishing and compromised accounts, and to your bank or mobile money operator for financial loss. GLOPROFAS also accepts confidential scam reports through its reporting form. For other countries, use the GLOPROFAS global reporting directory.",
      fr: "Au Cameroun, signalez à la police (le 117 en urgence), à l’ANTIC pour les incidents techniques tels que le phishing et les comptes compromis, et à votre banque ou opérateur de mobile money pour les pertes financières. GLOPROFAS accepte aussi des signalements confidentiels via son formulaire. Pour les autres pays, utilisez l’annuaire mondial de signalement GLOPROFAS.",
    },
  },
  {
    q: {
      en: "Is it safe to use MTN MoMo or Orange Money?",
      fr: "Est-il sûr d’utiliser MTN MoMo ou Orange Money ?",
    },
    a: {
      en: "Yes, mobile money services are safe when used correctly. No agent, bank or operator will ever ask for your PIN or one-time code, and no legitimate transfer requires you to dial codes dictated by a caller. Always verify received payments in your own official app or USSD menu before releasing goods.",
      fr: "Oui, les services de mobile money sont sûrs lorsqu’ils sont bien utilisés. Aucun agent, aucune banque ni aucun opérateur ne vous demandera jamais votre PIN ni votre code à usage unique, et aucun transfert légitime n’exige de composer des codes dictés par un appelant. Vérifiez toujours les paiements reçus dans votre propre application ou menu USSD officiel avant de livrer.",
    },
  },
  {
    q: {
      en: "Can GLOPROFAS recover money I lost to a scam?",
      fr: "GLOPROFAS peut-il récupérer l’argent perdu suite à une arnaque ?",
    },
    a: {
      en: "No. GLOPROFAS is an independent not-for-profit awareness and education initiative. It does not have investigative or law-enforcement powers and cannot recover funds. It helps you understand what happened and points you to the right authorities — and warns that anyone promising recovery for a fee is running a second scam.",
      fr: "Non. GLOPROFAS est une initiative indépendante à but non lucratif de sensibilisation et d’éducation. Elle ne dispose d’aucun pouvoir d’enquête ou de police et ne peut récupérer de fonds. Elle vous aide à comprendre ce qui s’est passé et vous oriente vers les bonnes autorités — et rappelle que quiconque promet une récupération contre frais mène une seconde arnaque.",
    },
  },
  {
    q: {
      en: "Are GLOPROFAS guides and resources free?",
      fr: "Les guides et ressources GLOPROFAS sont-ils gratuits ?",
    },
    a: {
      en: "Yes. All bilingual guides, alerts, checklists, video lessons, the Scam Checker and the reporting directory are free and require no account or registration.",
      fr: "Oui. Tous les guides bilingues, alertes, listes de vérification, leçons vidéo, le Scam Checker et l’annuaire de signalement sont gratuits et ne requièrent aucun compte ni inscription.",
    },
  },
];
