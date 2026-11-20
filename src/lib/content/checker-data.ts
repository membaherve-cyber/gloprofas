/**
 * GLOPROFAS Scam Checker — detection pattern library (bilingual EN/FR).
 * Indicative pattern analysis only: never a verdict of legitimacy.
 * Patterns are lowercase regex source strings, applied to text that has
 * been lowercased and accent-stripped by the engine.
 */

import type { CheckerIndicator, WarningSignOption } from "./resource-centre-types";

export const CHECKER_INDICATORS: CheckerIndicator[] = [
  /* ---- Artificial urgency ---- */
  {
    id: "urgency-deadline",
    category: "urgency",
    weight: 2,
    label: { en: "Artificial urgency", fr: "Urgence artificielle" },
    explanation: {
      en: "The message pressures you to act within minutes or hours. Real organisations give you time and never punish you for verifying.",
      fr: "Le message vous presse d’agir en quelques minutes ou heures. Les vraies organisations vous laissent le temps et ne vous punissent jamais de vérifier.",
    },
    patterns: [
      "\\burgent(ly)?\\b", "\\bimmediat(e|ement)\\b", "\\bwithin \\d+ (hours?|minutes?|days?)\\b",
      "\\bdans (les )?(\\d+ heures?|24h|48h)\\b", "\\blast chance\\b", "\\bdernier (delai|rappel)\\b",
      "\\bexpires? (today|now)\\b", "\\bavant (la fin de la journee|ce soir)\\b", "\\bact now\\b", "\\bagissez maintenant\\b",
      "\\bfinal (notice|warning)\\b", "\\bultimatum\\b",
    ],
  },
  {
    id: "urgency-account-threat",
    category: "urgency",
    weight: 2,
    label: { en: "Account suspension threat", fr: "Menace de suspension de compte" },
    explanation: {
      en: "Threats that your account, card or line will be blocked are a classic phishing lever. Your bank never asks you to “confirm” details this way.",
      fr: "Les menaces de blocage de compte, de carte ou de ligne sont un levier classique. Votre banque ne vous demande jamais de « confirmer » ainsi vos données.",
    },
    patterns: [
      "account (has been |will be )?(suspended|blocked|closed|limited|frozen)",
      "carte (suspendue|bloquee)", "compte (suspendu|bloque|ferme)", "verification requise",
      "verifiez votre compte", "confirm(ez|er) (votre |les )?(identite|informations|compte)",
      "\\bblocked\\b", "\\bsuspendu\\b", "unusual activity (was )?detected", "activite suspecte detectee",
    ],
  },
  /* ---- Advance-fee requests ---- */
  {
    id: "advance-fee",
    category: "advance-fee",
    weight: 3,
    label: { en: "Advance-fee request", fr: "Demande de frais anticipés" },
    explanation: {
      en: "You are asked to pay a fee first to unlock a prize, a loan, a delivery or an inheritance. Paying first is the scam itself — nothing arrives afterwards.",
      fr: "On vous demande de payer d’abord pour débloquer un gain, un prêt, une livraison ou un héritage. Payer d’abord, c’est l’arnaque même : rien n’arrive ensuite.",
    },
    patterns: [
      "(activation|registration|processing|clearance|delivery|transfer|administrative|insurance|tax) fee",
      "frais? (d[e']?(activation|inscription|dossier|deblocage|livraison|virement|assurance|douane))",
      "\\bupfront\\b", "\\bpaiement prealable\\b", "\\bcaution\\b", "\\bdepot initial\\b",
      "pay \\$?\\d+ (first|now) to (release|receive|unlock)",
      "\\bliberation (des )?fonds\\b", "\\bunlock(ing)? fee\\b",
    ],
  },
  /* ---- Credential harvesting ---- */
  {
    id: "credential-otp",
    category: "credentials",
    weight: 3,
    label: { en: "Request for codes, PINs or passwords", fr: "Demande de codes, PIN ou mots de passe" },
    explanation: {
      en: "No legitimate bank, operator, employer or administration will ever ask for your PIN, password or one-time code. Anyone who does is stealing your account.",
      fr: "Aucune banque, opérateur, employeur ni administration légitime ne demande votre code PIN, votre mot de passe ou votre code à usage unique. Qui le fait cherche à voler votre compte.",
    },
    patterns: [
      "\\bpins?\\b", "\\botps?\\b", "\\bpasswords?\\b", "mot(s)? de passe", "\\bcode (secret|de securite|de verification|pin)\\b",
      "one[- ]time (code|password|pin)", "code a usage unique", "\\bseed phrase\\b", "\\bprivate keys?\\b",
      "cle privee", "full card (number|details)", "numero complet de (la )?carte", "\\bcvv\\b", "\\bcvc\\b",
    ],
  },
  /* ---- Unrealistic promises ---- */
  {
    id: "promise-guaranteed-returns",
    category: "promises",
    weight: 3,
    label: { en: "Guaranteed or exceptional returns", fr: "Rendements garantis ou exceptionnels" },
    explanation: {
      en: "Investment returns can never be guaranteed. “Guaranteed”, “double your money” or fixed daily profits are the signature of investment fraud and Ponzi schemes.",
      fr: "Aucun rendement ne peut être garanti. « Rendement garanti », « doublez votre argent » ou profits journaliers fixes sont la signature d’une fraude d’investissement ou d’un système de Ponzi.",
    },
    patterns: [
      "guaranteed (return|profit|income|roi|payout)", "rendement garanti", "profits garantis",
      "(double|triple) your (money|investment)", "doublez votre (argent|capital)",
      "\\d{2,}% (daily|weekly|monthly|per (day|week|month))\\b", "\\bx[23] (your|roi)\\b",
      "risk[- ]free (investment|profit)", "sans risque", "get rich", "devenez riche",
      "\\broi\\b.{0,30}(guaranteed|assure)", "(daily|weekly) (profit|payout|earnings) of",
    ],
  },
  {
    id: "promise-prize",
    category: "promises",
    weight: 3,
    label: { en: "Unexpected prize or lottery win", fr: "Gain inattendu à une loterie" },
    explanation: {
      en: "You cannot win a lottery or promotion you never entered. Unexpected prize notifications exist to collect “fees” or your personal data.",
      fr: "Vous ne pouvez pas gagner une loterie ou une promotion à laquelle vous n’avez jamais participé. Ces gains inattendus servent à récolter des « frais » ou vos données personnelles.",
    },
    patterns: [
      "\\byou (have )?won\\b", "vous avez gagne", "\\b félicitations\\b", "\\bfelicitations\\b",
      "\\blottery\\b", "\\bloterie\\b", "\\bprize\\b", "\\bprix gagn(e|ant)\\b", "\\bjackpot\\b",
      "\\bgiveaway winner\\b", "claim your (prize|reward|winnings)", "reclamez votre (prix|gain|recompense)",
      "promo(tion)? (draw|tirage)", "tombola",
    ],
  },
  /* ---- Impersonation ---- */
  {
    id: "impersonation-authority",
    category: "impersonation",
    weight: 2,
    label: { en: "Claims to be a bank, operator or official", fr: "Se prétend banque, opérateur ou officiel" },
    explanation: {
      en: "Criminals impersonate banks, mobile money operators, police or administrations. Verify independently on the official number you already have — never the one in the message.",
      fr: "Les criminels se font passer pour des banques, des opérateurs, la police ou des administrations. Vérifiez via le numéro officiel que vous avez déjà — jamais celui du message.",
    },
    patterns: [
      "\\b(your|dear) (bank|customer|client)\\b", "cher client", "banque.{0,30}(client|fidele)",
      "(customer|technical) (support|service) (team|agent)", "service client.{0,20}(agent|rappel)",
      "\\b(police|officer|inspector|detective|commandant)\\b", "\\bgendarme\\b",
      "\\b(bank )?representative\\b", "\\bagent (de )?(banque|momo|orange)\\b",
      "i am (using|calling from).{0,30}(phone|number) (of|belonging to)", "it'?s me.{0,20}(new number|autre numero)",
      "this is (your|your son'?s|your brother'?s).{0,20}(new|other) (number|phone|account)",
    ],
  },
  {
    id: "impersonation-relative",
    category: "impersonation",
    weight: 2,
    label: { en: "“It’s me” from an unknown number", fr: "« C’est moi » depuis un numéro inconnu" },
    explanation: {
      en: "A message from an unknown number claiming to be a relative with a new phone is a common family-impersonation setup — call the person on their usual number to check.",
      fr: "Un message d’un numéro inconnu prétendant être un proche avec un nouveau téléphone est un classique de l’usurpation familiale : appelez la personne sur son numéro habituel pour vérifier.",
    },
    patterns: [
      "\\bit'?s me\\b", "\\bc'?est (moi|papa|maman)\\b", "i changed my (number|phone|line)",
      "j'ai change de (numero|telephone|ligne)", "nouveau numero", "(save|enregistre|enregistrez) (this|my new) (number|numero)",
      "\\bmaman\\b.{0,30}\\bappel(e|ez)?\\b", "\\bpapa\\b.{0,30}\\bappel(e|ez)?\\b",
      "i lost my phone", "j'ai perdu mon (telephone|telephone)",
    ],
  },
  /* ---- Emotional manipulation ---- */
  {
    id: "manipulation-emotional",
    category: "manipulation",
    weight: 2,
    label: { en: "Emotional pressure", fr: "Pression émotionnelle" },
    explanation: {
      en: "Scammers build rapid intimacy, invoke emergencies, or appeal to secrecy. Strong emotion is used to stop you from thinking clearly and verifying.",
      fr: "Les escrocs créent une intimité rapide, invoquent des urgences ou exigent le secret. L’émotion forte sert à vous empêcher de réfléchir et de vérifier.",
    },
    patterns: [
      "\\bmy (love|dear|darling|sweetheart)\\b", "mon (amour|cheri)\\b",
      "i love you.{0,30}(never met|first time)", "emergency (surgery|operation|hospital|arrest)",
      "urgence.{0,30}(hopital|operation|arrestation|gendarmerie)", "\\bplease help me\\b", "aide[- ]moi (s'?il te plait|vite)",
      "don'?t tell (anyone|anybody)", "ne (le )?dis (a personne|personne)", "keep (this|it) (secret|confidential|between us)",
      "gard(e|ez).{0,20}(secret|entre nous)", "\\bje (suis|me sens) si seul\\b",
    ],
  },
  {
    id: "manipulation-secrecy",
    category: "unusual",
    weight: 2,
    label: { en: "Request to move to a private channel", fr: "Demande de passer à un canal privé" },
    explanation: {
      en: "Moving the conversation to WhatsApp, Telegram or private messages removes you from the platform’s protections and records — a hallmark of fraud.",
      fr: "Déplacer la conversation vers WhatsApp, Telegram ou le privé vous retire des protections et de l’historique de la plateforme : un signe caractéristique de fraude.",
    },
    patterns: [
      "(continue|let'?s move|move|switch).{0,30}(to|on) (whatsapp|telegram|signal|dm|private)",
      "(rejoignez|passez|continuons).{0,20}(whatsapp|telegram|en prive)",
      "contact me on (whatsapp|telegram)", "\\bwhatsapp me\\b", "\\bmon whatsapp\\b", "add me on (whatsapp|telegram)",
      "envoyez(-| )?moi un message (sur|whatsapp)",
    ],
  },
  /* ---- Suspicious payment instructions ---- */
  {
    id: "payment-unusual",
    category: "payment",
    weight: 2,
    label: { en: "Unusual payment method", fr: "Moyen de paiement inhabituel" },
    explanation: {
      en: "Gift cards, cryptocurrency, mobile money to a stranger, or transfers to a personal account are impossible-to-reverse payments loved by scammers.",
      fr: "Cartes cadeaux, cryptomonnaies, mobile money vers un inconnu ou virements vers un compte personnel : des paiements irréversibles appréciés des escrocs.",
    },
    patterns: [
      "\\bgift ?cards?\\b", "\\bcartes? cadeaux?\\b", "\\bitunes\\b", "\\bsteam card\\b", "\\bamazon card\\b",
      "\\b(bitcoin|btc|usdt|tether|eth|ethereum|crypto)\\b", "\\bportefeuille crypto\\b", "\\bcrypto wallet\\b",
      "send (money|funds) to (this|the following) (account|number|address|wallet)",
      "envoyez (l'argent|les fonds).{0,30}(compte|numero|adresse|portefeuille)",
      "(western union|moneygram|ria transfer)", "\\bmandat\\b", "bank details (have )?changed", "nouvelles coordonnees bancaires",
      "\\bmobile money\\b.{0,30}\\btransfert\\b",
    ],
  },
  /* ---- Confidential information ---- */
  {
    id: "confidential-documents",
    category: "confidential",
    weight: 2,
    label: { en: "Request for identity documents or bank details", fr: "Demande de pièces d’identité ou de données bancaires" },
    explanation: {
      en: "Requests for ID photos, card numbers or full personal details are used for identity theft and account takeover. Share these only through official, verified processes.",
      fr: "Les demandes de photos d’identité, de numéros de carte ou de données personnelles complètes servent au vol d’identité. Ne les partagez que via des processus officiels vérifiés.",
    },
    patterns: [
      "(send|envoyez).{0,30}(id|identity card|passport|cni|carte d'identite|passeport)",
      "(photo|scan|copy) of (your )?(id|passport|cni|carte)", "(front and back|recto verso).{0,20}(card|carte)",
      "(bank|banking) (details|information|coordinates)", "coordonnees bancaires", "numero de compte", "account number.{0,20}send",
      "full name.{0,40}(address|date of birth)", "\\bselfie\\b.{0,20}(id|carte|cni)",
    ],
  },
  /* ---- Suspicious URLs ---- */
  {
    id: "url-shortener",
    category: "urls",
    weight: 2,
    label: { en: "Shortened or disguised link", fr: "Lien raccourci ou déguisé" },
    explanation: {
      en: "Shortened links hide the real destination. Never enter codes or payment details on a page reached from an unexpected shortened link.",
      fr: "Les liens raccourcis masquent la vraie destination. Ne saisissez jamais de codes ni de paiements sur une page atteinte via un lien raccourci inattendu.",
    },
    patterns: [
      "bit\\.ly\\/", "tinyurl\\.com\\/", "t\\.co\\/", "is\\.gd\\/", "cutt\\.ly\\/", "shorturl\\.at\\/",
      "rb\\.gy\\/", "rebrand\\.ly\\/", "goo\\.gl\\/", "ow\\.ly\\/",
    ],
  },
  {
    id: "url-suspicious-domain",
    category: "urls",
    weight: 2,
    label: { en: "Suspicious web address", fr: "Adresse web suspecte" },
    explanation: {
      en: "Lookalike domains (extra words, hyphens, digits replacing letters), plain-IP addresses or exotic extensions are common in fake bank, operator and store pages.",
      fr: "Domaines imitateurs (mots ajoutés, tirets, chiffres remplaçant des lettres), adresses IP nues ou extensions exotiques sont fréquents dans les fausses pages de banques, d’opérateurs et de boutiques.",
    },
    patterns: [
      "https?:\\/\\/\\d+\\.\\d+\\.\\d+\\.\\d+", "https?:\\/\\/[^\\s]*\\.(xyz|top|click|buzz|live|shop|online|info)(\\/|\\b)",
      "paypa1", "g00gle", "faceb00k", "amaz0n", "\\bxn--",
      "(bank|momo|orange|mtn)[a-z0-9-]*-(secure|verify|support|promo)", "-verify\\d?\\.",
      "secure-[a-z0-9]+-(login|app)",
    ],
  },
  /* ---- Recruitment / job scams ---- */
  {
    id: "job-fee",
    category: "advance-fee",
    weight: 3,
    label: { en: "Job or visa that requires payment", fr: "Emploi ou visa qui exige un paiement" },
    explanation: {
      en: "Real employers do not charge “file fees”, medical fees or visa fees to candidates. Any recruitment that requires you to pay first is a scam.",
      fr: "Les vrais employeurs ne facturent pas de « frais de dossier », de visite médicale ou de visa aux candidats. Toute embauche qui exige un paiement d’abord est une arnaque.",
    },
  patterns: [
      "(job|emploi|offer|opportunit(e|y)).{0,60}(fee|frais|pay|payer)\\b",
      "(recruitment|recrutement).{0,40}(fee|frais)", "(visa|travel|flight).{0,30}(fee|frais).{0,20}(pay|payer|required|requis)",
      "salary of \\$?\\d{3,}.{0,30}(week|semaine)", "\\bsalaire\\b.{0,20}\\d{3,}.{0,20}(semaine|jour)",
      "no (interview|experience|entretien|diplome) (required|necessaire)",
      "work from home.{0,30}(earn|gagne) \\$?\\d{3,}",
    ],
  },
  /* ---- Recovery scams ---- */
  {
    id: "recovery-scam",
    category: "advance-fee",
    weight: 3,
    label: { en: "Offers to recover lost money", fr: "Offre de récupérer l’argent perdu" },
    explanation: {
      en: "After a scam, “recovery agents”, “hackers” or “lawyers” who promise to get your money back for a fee are running a second scam on the same victim.",
      fr: "Après une arnaque, les « agents de recouvrement », « hackers » ou « avocats » qui promettent de récupérer votre argent contre frais commettent une seconde arnaque sur la même victime.",
    },
    patterns: [
      "(recover|recovery|refund|get back).{0,30}(your (money|funds|crypto|scam))",
      "(recuper(er|ation)|remboursement).{0,30}(votre (argent|fonds|crypto)|arnaque)",
      "\\bfund recovery\\b", "\\bhacker.{0,30}recover\\b", "\\bhacker.{0,30}recuper\\b",
      "we (can|will) (help you )?(recover|get back)", "lost (money|funds|bitcoin).{0,40}(recover|guaranteed)",
    ],
  },
  /* ---- Extortion ---- */
  {
    id: "extortion",
    category: "manipulation",
    weight: 3,
    label: { en: "Threats or blackmail", fr: "Menaces ou chantage" },
    explanation: {
      en: "Threats to share images, contacts or “legal action” are used to force quick payment. Do not pay, do not reply: save everything and report — you are the victim of a crime, not the guilty one.",
      fr: "Les menaces de diffuser des images, des contacts ou des « poursuites » forcent un paiement rapide. Ne payez pas, ne répondez pas : conservez tout et signalez — vous êtes victime, pas coupable.",
    },
    patterns: [
      "\\bblackmail\\b", "\\bchantage\\b", "(i will|we will|je vais).{0,40}(share|publish|post|send).{0,30}(video|photos|images|contacts|your (friends|family))",
      "(je vais|nous allons).{0,40}(publier|diffuser|envoyer).{0,30}(video|photos|images|contacts|vos (amis|famille))",
      "i have (your |a )?(video|recording|photos|footage)", "j'ai (une )?(video|des photos|un enregistrement)",
      "pay (now|or|within)", "payez (maintenant|ou|sous)", "warrant.{0,20}arrest", "mandat d'?arret",
    ],
  },
  /* ---- Fake notification / transfer ---- */
  {
    id: "money-transfer-fake",
    category: "financial",
    weight: 2,
    label: { en: "Money “sent by mistake”", fr: "Argent « envoyé par erreur »" },
    explanation: {
      en: "Fake transfer notifications followed by a request to “send back” are the most common mobile money scam. Check your real balance in the official app or USSD menu before acting.",
      fr: "Faux avis de transfert suivis d’une demande de « renvoyer » l’argent : l’arnaque mobile money la plus courante. Vérifiez votre solde réel dans l’application ou le menu officiel avant d’agir.",
    },
    patterns: [
      "(sent|transferred) (money|funds).{0,30}(by mistake|in error|wrong(ly)?)",
      "(envoye|transfere).{0,20}(par erreur|erreur)",
      "please (send|return|refund).{0,20}(it back|the money|the amount)",
      "(renvoyez|retournez|remboursez).{0,20}(l'argent|le montant|le)",
      "(wrong number|mauvais numero).{0,30}(transfer|envoi)",
      "\\bmomo\\b.{0,40}\\brenvoi\\b", "reversal (request|demande)",
    ],
  },
];

/** Option B — user-selected suspicious characteristics. */
export const WARNING_SIGN_OPTIONS: WarningSignOption[] = [
  {
    id: "advance-payment",
    label: { en: "They asked me to pay money in advance", fr: "On me demande de payer une somme d’avance" },
    weight: 3,
    explanation: {
      en: "Advance payments for prizes, loans, deliveries, jobs or “unlocking” funds are the core of advance-fee fraud.",
      fr: "Les paiements anticipés pour des gains, prêts, livraisons, emplois ou « déblocages » de fonds sont le cœur de la fraude par frais anticipés.",
    },
  },
  {
    id: "unexpected-prize",
    label: { en: "I was told I won a prize or lottery I never entered", fr: "On m’a dit que j’ai gagné une loterie sans y participer" },
    weight: 3,
    explanation: {
      en: "You cannot win a competition you never entered. Unexpected winnings are bait for fees and data harvesting.",
      fr: "On ne peut pas gagner un concours auquel on n’a pas participé. Les gains inattendus servent d’appât pour des frais et la collecte de données.",
    },
  },
  {
    id: "urgent-money",
    label: { en: "There is urgent pressure to send money right now", fr: "Il y a une pression urgente pour envoyer de l’argent maintenant" },
    weight: 2,
    explanation: {
      en: "Urgency is engineered so you act before you verify. Real institutions accept verification delays.",
      fr: "L’urgence est fabriquée pour que vous agissiez avant de vérifier. Les vraies institutions acceptent les délais de vérification.",
    },
  },
  {
    id: "password-pin-request",
    label: { en: "They asked for my password or PIN", fr: "On m’a demandé mon mot de passe ou mon code PIN" },
    weight: 3,
    explanation: {
      en: "No legitimate organisation ever asks for your password or PIN — not your bank, not your operator, not technical support.",
      fr: "Aucune organisation légitime ne demande votre mot de passe ou code PIN — ni votre banque, ni votre opérateur, ni le support technique.",
    },
  },
  {
    id: "otp-request",
    label: { en: "They asked for an OTP or verification code", fr: "On m’a demandé un code de vérification (OTP)" },
    weight: 3,
    explanation: {
      en: "A one-time code is the last key to your account. Anyone asking you to read it out is taking over your account in real time.",
      fr: "Le code à usage unique est la dernière clé de votre compte. Qui vous demande de le dicter prend votre contrôle en temps réel.",
    },
  },
  {
    id: "unusual-payment",
    label: { en: "They want payment by gift card, crypto or to a personal account", fr: "Le paiement exigé se fait par carte cadeau, crypto ou vers un compte personnel" },
    weight: 2,
    explanation: {
      en: "Irreversible payment methods are chosen so you cannot get your money back. Legitimate organisations offer traceable channels.",
      fr: "Les moyens de paiement irréversibles sont choisis pour que vous ne puissiez rien récupérer. Les organisations légitimes proposent des canaux traçables.",
    },
  },
  {
    id: "guaranteed-returns",
    label: { en: "They promise guaranteed high returns on an investment", fr: "On me promet des rendements élevés garantis" },
    weight: 3,
    explanation: {
      en: "All investment carries risk. Guaranteed, fixed or “too good to be true” returns indicate investment fraud or a Ponzi scheme.",
      fr: "Tout investissement comporte un risque. Des rendements garantis, fixes ou « trop beaux pour être vrais » indiquent une fraude d’investissement ou un système de Ponzi.",
    },
  },
  {
    id: "threats",
    label: { en: "They threatened me (arrest, account closure, exposure)", fr: "On m’a menacé (arrestation, clôture de compte, exposition)" },
    weight: 3,
    explanation: {
      en: "Threats and intimidation are criminal tools. Institutions write to you officially; they do not threaten you by message to force immediate payment.",
      fr: "Les menaces et l’intimidation sont des outils criminels. Les institutions vous écrivent officiellement ; elles ne menacent pas par message pour forcer un paiement immédiat.",
    },
  },
  {
    id: "unverified-identity",
    label: { en: "I cannot verify who they really are", fr: "Je ne peux pas vérifier qui ils sont vraiment" },
    weight: 2,
    explanation: {
      en: "If you cannot independently confirm the person or organisation on a channel you already trust, treat the contact as unverified.",
      fr: "Si vous ne pouvez pas confirmer la personne ou l’organisation via un canal que vous connaissez déjà, considérez le contact comme non vérifié.",
    },
  },
  {
    id: "short-links",
    label: { en: "The message contains shortened or strange links", fr: "Le message contient des liens raccourcis ou étranges" },
    weight: 2,
    explanation: {
      en: "Shortened and lookalike links hide fake pages built to capture your codes and payments.",
      fr: "Les liens raccourcis et imitateurs cachent de fausses pages conçues pour capter vos codes et paiements.",
    },
  },
  {
    id: "move-private",
    label: { en: "They insist we continue on WhatsApp, Telegram or in private", fr: "On insiste pour continuer sur WhatsApp, Telegram ou en privé" },
    weight: 2,
    explanation: {
      en: "Moving you off the original platform removes protections, moderation and your evidence trail.",
      fr: "Vous sortir de la plateforme d’origine supprime les protections, la modération et votre historique de preuves.",
    },
  },
  {
    id: "too-good",
    label: { en: "The offer seems too good to be true", fr: "L’offre semble trop belle pour être vraie" },
    weight: 2,
    explanation: {
      en: "When an offer beats every real alternative by far, the missing detail is usually the scam. Verify before paying anything.",
      fr: "Quand une offre dépasse largement toutes les alternatives réelles, le détail manquant est souvent l’arnaque. Vérifiez avant de payer.",
    },
  },
];

/** Overall assessment bands shared by the engine and the UI. */
export const CHECKER_BANDS = {
  strong: {
    key: "strong",
    en: "Strong scam indicators detected",
    fr: "Indicateurs d’arnaque marqués détectés",
  },
  several: {
    key: "several",
    en: "Several suspicious indicators detected",
    fr: "Plusieurs indicateurs suspects détectés",
  },
  insufficient: {
    key: "insufficient",
    en: "Insufficient information",
    fr: "Informations insuffisantes",
  },
  none: {
    key: "none",
    en: "No obvious indicators detected",
    fr: "Aucun indicateur manifeste détecté",
  },
} as const;

export const CHECKER_DISCLAIMER = {
  en: "The GLOPROFAS Scam Checker provides an indicative assessment based on identifiable warning signs. It does not guarantee that a message is fraudulent or legitimate and does not replace professional investigation.",
  fr: "Le GLOPROFAS Scam Checker fournit une évaluation indicative fondée sur des signaux d’alerte identifiables. Il ne garantit ni la fraude ni la légitimité d’un message et ne remplace pas une enquête professionnelle.",
};

export const CHECKER_PRIVACY = {
  en: "No account needed. Your text is analysed in memory to produce this assessment and is not stored or published. Never paste passwords, PINs, one-time codes or full card numbers.",
  fr: "Aucun compte requis. Votre texte est analysé en mémoire pour produire cette évaluation ; il n’est ni conservé ni publié. Ne collez jamais mots de passe, codes PIN, codes à usage unique ni numéros de carte complets.",
};
