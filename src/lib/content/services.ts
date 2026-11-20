/**
 * GLOPROFAS professional services — 12 services in 4 groups,
 * ported from the original repository seed data (bilingual).
 */

export interface GService {
  slug: string;
  group: "individual" | "business" | "enterprise" | "training";
  name: { en: string; fr: string };
  description: { en: string; fr: string };
  pricingMode: "free" | "consultation" | "custom-quotation" | "training-package";
  bullets: { en: string[]; fr: string[] };
}

export const SERVICES: GService[] = [
  {
    slug: "personal-digital-safety-assessment",
    group: "individual",
    name: { en: "Personal digital safety assessment", fr: "Diagnostic de sécurité numérique personnel" },
    description: {
      en: "A structured review of your accounts, devices and habits, with prioritised recommendations.",
      fr: "Une revue structurée de vos comptes, appareils et habitudes, avec des recommandations priorisées.",
    },
    pricingMode: "custom-quotation",
    bullets: {
      en: ["Account and device review", "Priority action list", "Follow-up questions by email"],
      fr: ["Revue des comptes et appareils", "Liste d’actions prioritaires", "Questions de suivi par courriel"],
    },
  },
  {
    slug: "scam-exposure-consultation",
    group: "individual",
    name: { en: "Scam exposure consultation", fr: "Consultation sur l’exposition aux arnaques" },
    description: {
      en: "A conversation about a suspicious situation you have experienced or observed.",
      fr: "Un échange sur une situation suspecte vécue ou observée.",
    },
    pricingMode: "consultation",
    bullets: {
      en: ["Warning-sign review", "Practical next steps", "Guidance on official reporting routes"],
      fr: ["Analyse des signes d’alerte", "Prochaines étapes concrètes", "Orientation vers les circuits officiels"],
    },
  },
  {
    slug: "account-security-guidance",
    group: "individual",
    name: { en: "Account security guidance", fr: "Accompagnement à la sécurité des comptes" },
    description: {
      en: "Step-by-step help enabling two-step verification and recovering an account safely.",
      fr: "Aide pas à pas pour activer la validation en deux étapes et récupérer un compte en sécurité.",
    },
    pricingMode: "free",
    bullets: {
      en: ["Guided setup session", "Recovery checklist", "No credential sharing required"],
      fr: ["Séance d’installation guidée", "Liste de récupération", "Aucun partage d’identifiants demandé"],
    },
  },
  {
    slug: "business-fraud-risk-assessment",
    group: "business",
    name: { en: "Business fraud risk assessment", fr: "Diagnostic du risque de fraude en entreprise" },
    description: {
      en: "A review of payment, procurement and supplier processes against common fraud schemes.",
      fr: "Une revue des processus de paiement, d’achat et de fournisseurs au regard des schémas de fraude courants.",
    },
    pricingMode: "custom-quotation",
    bullets: {
      en: ["Process interviews", "Control gap summary", "Prioritised remediation plan"],
      fr: ["Entretiens sur les processus", "Résumé des lacunes de contrôle", "Plan de remédiation priorisé"],
    },
  },
  {
    slug: "employee-awareness-programme",
    group: "business",
    name: { en: "Employee security awareness programme", fr: "Programme de sensibilisation des employés" },
    description: {
      en: "A twelve-month programme with short sessions, translated material and simple metrics.",
      fr: "Un programme de douze mois avec séances courtes, supports traduits et indicateurs simples.",
    },
    pricingMode: "training-package",
    bullets: {
      en: ["Monthly micro-sessions", "Phishing recognition practice", "Reporting culture guidance"],
      fr: ["Micro-séances mensuelles", "Exercices de reconnaissance d’hameçonnage", "Conseils sur la culture de signalement"],
    },
  },
  {
    slug: "impersonation-monitoring-review",
    group: "business",
    name: { en: "Online impersonation review", fr: "Revue de l’usurpation en ligne" },
    description: {
      en: "An assessment of how your brand could be copied and which takedown routes exist.",
      fr: "Une évaluation de la manière dont votre marque peut être copiée et des procédures de retrait existantes.",
    },
    pricingMode: "custom-quotation",
    bullets: {
      en: ["Domain and profile review", "Takedown process map", "Staff briefing note"],
      fr: ["Revue des domaines et profils", "Cartographie des procédures de retrait", "Note de briefing pour le personnel"],
    },
  },
  {
    slug: "institutional-awareness-programme",
    group: "enterprise",
    name: { en: "Institutional anti-fraud awareness programme", fr: "Programme institutionnel de sensibilisation à la fraude" },
    description: {
      en: "A tailored programme for institutions that need consistent messaging across departments.",
      fr: "Un programme sur mesure pour les institutions ayant besoin d’un message cohérent entre services.",
    },
    pricingMode: "custom-quotation",
    bullets: {
      en: ["Department mapping", "Bilingual material", "Management briefing"],
      fr: ["Cartographie des services", "Supports bilingues", "Briefing de direction"],
    },
  },
  {
    slug: "executive-awareness-session",
    group: "enterprise",
    name: { en: "Executive awareness session", fr: "Séance de sensibilisation des dirigeants" },
    description: {
      en: "A short session on decision-level fraud risks: payments, authority and reputational exposure.",
      fr: "Une séance courte sur les risques de fraude au niveau décisionnel : paiements, autorité et exposition réputationnelle.",
    },
    pricingMode: "consultation",
    bullets: {
      en: ["Ninety-minute session", "Scenario discussion", "Governance checklist"],
      fr: ["Séance de quatre-vingt-dix minutes", "Discussion de scénarios", "Liste de vérification de gouvernance"],
    },
  },
  {
    slug: "customised-workshop",
    group: "training",
    name: { en: "Customised fraud prevention workshop", fr: "Atelier de prévention de la fraude sur mesure" },
    description: {
      en: "A workshop built around the scenarios your teams actually meet.",
      fr: "Un atelier construit autour des scénarios réellement rencontrés par vos équipes.",
    },
    pricingMode: "training-package",
    bullets: {
      en: ["Scenario design with your team", "Facilitated session", "Take-away material"],
      fr: ["Conception des scénarios avec votre équipe", "Séance animée", "Supports à emporter"],
    },
  },
  {
    slug: "online-awareness-session",
    group: "training",
    name: { en: "Online awareness session", fr: "Séance de sensibilisation en ligne" },
    description: {
      en: "A remote session for distributed teams and community groups, in English or French.",
      fr: "Une séance à distance pour équipes dispersées et groupes communautaires, en anglais ou en français.",
    },
    pricingMode: "custom-quotation",
    bullets: {
      en: ["Sixty to ninety minutes", "Live questions", "Recording available on request"],
      fr: ["Soixante à quatre-vingt-dix minutes", "Questions en direct", "Enregistrement disponible sur demande"],
    },
  },
  {
    slug: "fraud-prevention-policy-review",
    group: "training",
    name: { en: "Fraud prevention policy review", fr: "Revue de la politique de prévention de la fraude" },
    description: {
      en: "A reading of your existing policies against practical controls and clear reporting lines.",
      fr: "Une lecture de vos politiques existantes au regard des contrôles pratiques et des circuits de signalement clairs.",
    },
    pricingMode: "custom-quotation",
    bullets: {
      en: ["Policy gap analysis", "Control recommendations", "Reporting flow design"],
      fr: ["Analyse des écarts de politique", "Recommandations de contrôle", "Conception des circuits de signalement"],
    },
  },
];
