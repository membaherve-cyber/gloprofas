/**
 * GLOPROFAS — Famous scams and frauds worldwide (News & Publications).
 * One well-documented, publicly reported case for each of the twelve scam
 * categories covered on the site. Each entry explains the nature of the
 * scam, its impact, its consequences and practical protection advice.
 * All facts are drawn from public reporting by courts, prosecutors,
 * regulators and the cases' own extensive press coverage.
 * Bilingual EN/FR. No invented statistics — figures follow what the
 * responsible authorities stated publicly.
 */

import type { BiText } from "./resource-centre-types";

export type FamousScam = {
  id: string;
  /** one of the twelve site categories (see zite-data categories) */
  categorySlug: string;
  title: BiText;
  caseName: BiText;
  summary: BiText;
  nature: BiText;
  impact: BiText;
  consequences: BiText;
  advice: BiText[];
  sources: { label: string; url: string }[];
};

export const FAMOUS_SCAMS: FamousScam[] = [
  /* ---------------------------------------------------------------- */
  {
    id: "famous-madoff-mmm",
    categorySlug: "investment-scams",
    title: {
      en: "The biggest Ponzi schemes: $64.8 billion in false statements and a pyramid that froze millions",
      fr: "Les plus grandes pyramides : 64,8 milliards de dollars de faux relevés et une machinerie qui a gelé des millions d’épargnes",
    },
    caseName: {
      en: "Bernard Madoff (United States, 2008) · MMM Nigeria (2016)",
      fr: "Bernard Madoff (États-Unis, 2008) · MMM Nigeria (2016)",
    },
    summary: {
      en: "The largest Ponzi scheme ever uncovered and Africa's most damaging pyramid showed the same truth twice: money that pays earlier investors with newer deposits is not an investment, it is a countdown.",
      fr: "La plus grande pyramide de Ponzi jamais découverte et la plus destructrice des pyramides africaines ont démontré deux fois la même vérité : de l’argent qui rembourse les premiers avec les dépôts des suivants n’est pas un placement, c’est un compte à rebours.",
    },
    nature: {
      en: "A Ponzi or pyramid scheme pays fictional 'returns' by recycling money from newer participants, backed by forged statements, secrecy and recruiting bonuses. US financier Bernard Madoff ran the largest ever uncovered: when the 2008 crisis made clients ask for withdrawals that new money could not cover, the scheme collapsed and the fabricated account balances revealed by the court process reached about $64.8 billion. In Nigeria, the MMM 'mutual aid' pyramid relaunched by Sergey Mavrodi — who had already collapsed one of history's largest pyramids in 1990s Russia — promised 30% monthly 'aid' and froze withdrawals in December 2016, with participants then estimated in the millions.",
      fr: "Une pyramide de Ponzi verse des « rendements » fictifs en recyclant l’argent des nouveaux participants, appuyés sur de faux relevés, le secret et des primes de recrutement. Le financier américain Bernard Madoff a dirigé la plus grande jamais découverte : quand la crise de 2008 a provoqué des retraits que les nouveaux dépôts ne pouvaient plus couvrir, la machinerie s’est effondrée et les faux relevés révélés par la justice ont atteint environ 64,8 milliards de dollars. Au Nigeria, la pyramide MMM de « mutuelle » relancée par Sergueï Mavrodi — déjà responsable de l’une des plus grandes pyramides de l’histoire dans la Russie des années 1990 — promettait 30 % d’« aide » mensuelle avant de geler les retraits en décembre 2016, avec des participants alors estimés en millions.",
    },
    impact: {
      en: "Madoff's collapse wiped out charities, pension funds and family savings across the world; thousands of victims recovered only a fraction through years of court-supervised restitution. MMM's freeze swallowed the savings of Nigerian students, workers and market traders, with distress widely reported in national media.",
      fr: "L’effondrement de Madoff a ruiné des œuvres caritatives, des fonds de pension et des familles du monde entier ; des milliers de victimes n’ont récupéré qu’une fraction après des années de restitution supervisée par la justice. Le gel de MMM a englouti l’épargne d’étudiants, de salariés et de commerçants nigérians, avec une détresse largement rapportée par les médias nationaux.",
    },
    consequences: {
      en: "Madoff pleaded guilty in 2009, was sentenced to 150 years in prison and died there in 2021; Mavrodi died in 2018 after a lifetime of pyramid convictions. Victims were repeatedly re-targeted by fake 'recovery agents'. Both cases tightened regulation and supervision — but the scheme itself never changes.",
      fr: "Madoff a plaidé coupable en 2009, a été condamné à 150 ans de prison et y est mort en 2021 ; Mavrodi est mort en 2018 après une vie de condamnations pour pyramides. Les victimes ont été re-ciblées par de faux « agents de recouvrement ». Les deux affaires ont resserré la réglementation — mais le schéma, lui, ne change jamais.",
    },
    advice: [
      {
        en: "High guaranteed returns with no risk do not exist — that single promise is the heart of every Ponzi scheme.",
        fr: "Un rendement élevé garanti sans risque n’existe pas — cette seule promesse est le cœur de toute pyramide.",
      },
      {
        en: "Verify the firm and the product with the official financial regulator before investing a single franc.",
        fr: "Vérifiez l’entreprise et le produit auprès du régulateur financier officiel avant d’investir le moindre franc.",
      },
      {
        en: "Demand independent proof: statements audited by a named, verifiable third party.",
        fr: "Exigez une preuve indépendante : des relevés audités par un tiers nommé et vérifiable.",
      },
      {
        en: "Withdrawal delays, bonuses for recruiting and 'the window closes tomorrow' pressure are final-stage warnings — get out and report.",
        fr: "Retards de retrait, primes de recrutement et pression « la fenêtre se ferme demain » sont des signes de fin de partie — sortez et signalez.",
      },
    ],
    sources: [
      { label: "FBI — Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "US Securities and Exchange Commission", url: "https://www.sec.gov/" },
      { label: "GLOPROFAS — Investment scams and Ponzi schemes", url: "https://gloprofas.org/#/resources/practical-tools/investment-scams-and-ponzi-schemes" },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "famous-onecoin-ftx",
    categorySlug: "cryptocurrency-scams",
    title: {
      en: "Crypto's biggest failures: the fake coin that raised $4 billion and the exchange that spent its customers' money",
      fr: "Les plus grands fiascos de la crypto : la fausse pièce qui a levé 4 milliards et la bourse qui dépensait l’argent de ses clients",
    },
    caseName: {
      en: "OneCoin (2014–2017) · FTX (2022)",
      fr: "OneCoin (2014–2017) · FTX (2022)",
    },
    summary: {
      en: "OneCoin sold a cryptocurrency that did not exist; FTX was a real exchange that gambled with the money entrusted to it. Two different crimes, one lesson: verify where your money actually sits.",
      fr: "OneCoin a vendu une cryptomonnaie qui n’existait pas ; FTX était une vraie bourse qui jouait avec l’argent qu’on lui confiait. Deux crimes différents, une seule leçon : vérifiez où se trouve réellement votre argent.",
    },
    nature: {
      en: "OneCoin, launched in 2014 by Ruja Ignatova, marketed itself as a Bitcoin rival while selling 'educational packages' of tokens with no real blockchain behind them — nothing verifiable, nothing transferable. Ignatova vanished in 2017 and in 2022 the FBI added her to its Ten Most Wanted Fugitives list; US prosecutors put the scheme's take at more than $4 billion from investors worldwide. FTX, once among the world's largest exchanges, collapsed in November 2022 when it emerged that billions in customer funds had been funnelled to the founder's private trading firm; Sam Bankman-Fried was convicted of fraud in 2023 and sentenced to 25 years in prison in 2024.",
      fr: "OneCoin, lancée en 2014 par Ruja Ignatova, se présentait comme une rivale du Bitcoin tout en vendant des « packs éducatifs » de jetons sans blockchain réelle — rien de vérifiable, rien de transférable. Ignatova a disparu en 2017 et le FBI l’a inscrite en 2022 sur sa liste des dix fugitifs les plus recherchés ; les procureurs américains évaluent le produit de la fraude à plus de 4 milliards de dollars auprès d’investisseurs du monde entier. FTX, autrefois l’une des plus grandes bourses mondiales, s’est effondrée en novembre 2022 quand il est apparu que des milliards de fonds clients avaient été canalisés vers la société de trading privée du fondateur ; Sam Bankman-Fried a été condamné pour fraude en 2023 et purge 25 ans de prison depuis 2024.",
    },
    impact: {
      en: "OneCoin drained savings on every continent, with co-conspirators convicted in the United States and Germany. FTX's collapse vaporised roughly $8 billion in customer money, froze withdrawals worldwide and shook confidence in the entire sector.",
      fr: "OneCoin a drainé des épargnes sur tous les continents, avec des complices condamnés aux États-Unis et en Allemagne. L’effondrement de FTX a vaporisé environ 8 milliards de dollars de fonds clients, gelé les retraits dans le monde entier et ébranlé la confiance dans tout le secteur.",
    },
    consequences: {
      en: "Ignatova remains on the FBI's most wanted list; her co-founder and brother were convicted in US courts. FTX's founder was sentenced to a quarter-century in prison; some customer repayments continued through bankruptcy proceedings, years after the collapse.",
      fr: "Ignatova figure toujours sur la liste des fugitifs du FBI ; son cofondateur et son frère ont été condamnés par des juridictions américaines. Le fondateur de FTX a été condamné à un quart de siècle de prison ; certains remboursements aux clients se sont poursuivis pendant des années dans la procédure de faillite.",
    },
    advice: [
      {
        en: "Before buying any coin, verify that its blockchain and code are public and independently auditable — a coin you cannot inspect is a promise, not an asset.",
        fr: "Avant d’acheter une pièce, vérifiez que sa blockchain et son code sont publics et auditables de façon indépendante — une pièce que vous ne pouvez pas inspecter est une promesse, pas un actif.",
      },
      {
        en: "Check the exchange's registration with your financial regulator before depositing anything.",
        fr: "Vérifiez l’immatriculation de la bourse auprès de votre régulateur financier avant d’y déposer quoi que ce soit.",
      },
      {
        en: "Beware 'guaranteed' crypto returns and schemes that mainly reward you for recruiting others.",
        fr: "Méfiez-vous des rendements crypto « garantis » et des montants qui vous récompensent surtout pour avoir recruté d’autres personnes.",
      },
      {
        en: "Keep significant holdings off exchanges: 'not your keys, not your coins' is the lesson of FTX.",
        fr: "Gardez les montants importants hors des bourses : « pas vos clés, pas vos pièces » est la leçon de FTX.",
      },
    ],
    sources: [
      { label: "FBI — Ten Most Wanted: Ruja Ignatova", url: "https://www.fbi.gov/wanted/topten/ruja-ignatova" },
      { label: "US Department of Justice — press releases", url: "https://www.justice.gov/news" },
      { label: "GLOPROFAS — Cryptocurrency and digital asset scams", url: "https://gloprofas.org/#/resources/practical-tools/cryptocurrency-and-digital-asset-scams" },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "famous-tinder-swindler",
    categorySlug: "romance-scams",
    title: {
      en: "The Tinder Swindler: romance fraud with a private jet",
      fr: "Le Tinder Swindler : la fraude sentimentale en jet privé",
    },
    caseName: {
      en: "Shimon Hayut, alias 'Simon Leviev' · Europe, 2017–2019",
      fr: "Shimon Hayut, alias « Simon Leviev » · Europe, 2017–2019",
    },
    summary: {
      en: "A fake diamond heir seduced women across Europe, then invented emergencies that turned their love into loans. The case, exposed by journalists and the 2022 Netflix documentary, made romance fraud visible worldwide.",
      fr: "Un faux héritier du diamant a séduit des femmes à travers l’Europe, puis inventé des urgences qui transformaient leur amour en prêts. L’affaire, révélée par des journalistes et le documentaire Netflix de 2022, a rendu la fraude sentimentale visible dans le monde entier.",
    },
    nature: {
      en: "Posing as 'Simon Leviev', the jet-setting son of a diamond billionaire, the fraudster built weeks of romance on luxury, travel and constant contact — then manufactured crises: enemies, security details, unpaid bills, accounts frozen 'for his protection'. Each new partner was asked to open loans and credit cards 'for a few days only'. The repayments rolled from one victim to the next, financing the illusion itself. The case was exposed by Norwegian investigative journalists and the 2022 Netflix documentary The Tinder Swindler, with victims' losses estimated at around $10 million.",
      fr: "Se faisant passer pour « Simon Leviev », fils milliardaire du diamant voyageant en jet, l’escroc a construit des semaines de romance sur le luxe, les voyages et le contact permanent — puis a fabriqué des crises : ennemis, agents de sécurité, factures impayées, comptes gelés « pour sa protection ». Chaque nouvelle partenaire était priée d’ouvrir des prêts et des cartes de crédit « pour quelques jours seulement ». Les remboursements roulaient d’une victime à la suivante, finançant l’illusion elle-même. L’affaire a été révélée par des journalistes d’investigation norvégiens et le documentaire Netflix de 2022 The Tinder Swindler, avec des pertes estimées à environ 10 millions de dollars.",
    },
    impact: {
      en: "Beyond the money, victims carried years of debt, damaged credit records and deep trauma. Support services and police forces underline that romance fraud is among the most under-reported crimes, because shame keeps victims silent — which is precisely what fraudsters count on.",
      fr: "Au-delà de l’argent, les victimes ont porté des années de dettes, des dossiers de crédit abîmés et de profonds traumatismes. Les services d’aide et les polices soulignent que la fraude sentimentale fait partie des crimes les moins signalés, car la honte réduit les victimes au silence — c’est exactement sur cela que comptent les escrocs.",
    },
    consequences: {
      en: "The fraudster had already served prison time for earlier deceptions and continued to face legal action; public attention pushed dating platforms to strengthen reporting tools. The victims turned their experience into a global warning: they published their story so that others could recognise the script.",
      fr: "L’escroc avait déjà purgé des peines de prison pour d’anciennes tromperies et a continué de faire face à des poursuites ; l’attention publique a poussé les plateformes de rencontre à renforcer leurs outils de signalement. Les victimes ont transformé leur expérience en avertissement mondial : elles ont publié leur histoire pour que d’autres reconnaissent le scénario.",
    },
    advice: [
      {
        en: "Never send money, open a loan or share card details with someone you have never met in person.",
        fr: "N’envoyez jamais d’argent, n’ouvrez jamais de prêt et ne partagez jamais de données de carte avec quelqu’un que vous n’avez jamais rencontré en personne.",
      },
      {
        en: "Reverse-search profile photos and insist on live video calls before feelings deepen; 'security reasons' for secrecy are the scammer's script.",
        fr: "Effectuez une recherche inversée des photos de profil et exigez des appels vidéo en direct avant que les sentiments ne s’installent ; le secret « pour raisons de sécurité » est le script de l’escroc.",
      },
      {
        en: "A genuine partner never needs your credit; a genuine emergency can be verified through other people.",
        fr: "Un vrai partenaire n’a jamais besoin de votre crédit ; une vraie urgence se vérifie par d’autres personnes.",
      },
      {
        en: "If it happened to you: stop paying, keep everything in writing, report to the police and to GLOPROFAS. You are not to blame.",
        fr: "Si cela vous arrive : cessez de payer, gardez tout par écrit, signalez à la police et à GLOPROFAS. Vous n’êtes pas en faute.",
      },
    ],
    sources: [
      { label: "FBI — Internet Crime Complaint Center (romance fraud reports)", url: "https://www.ic3.gov/" },
      { label: "GLOPROFAS — Romance scams: recognising emotional manipulation", url: "https://gloprofas.org/#/resources/practical-tools/romance-scams-recognising-emotional-manipulation" },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "famous-rimasauskas-bec",
    categorySlug: "business-email-compromise",
    title: {
      en: "How one fraudster invoiced Facebook and Google out of more than $100 million",
      fr: "Comment un seul escroc a facturé plus de 100 millions de dollars à Facebook et Google",
    },
    caseName: {
      en: "Evaldas Rimasauskas · 2013–2015",
      fr: "Evaldas Rimasauskas · 2013–2015",
    },
    summary: {
      en: "Forged invoices that perfectly imitated a real supplier extracted over $100 million from two of the world's most sophisticated companies — proof that business email compromise defeats budgets, not procedures.",
      fr: "De fausses factures imitant parfaitement un vrai fournisseur ont extrait plus de 100 millions de dollars de deux des entreprises les plus sophistiquées du monde — la preuve que la compromission des e-mails professionnels bat les budgets, pas les procédures.",
    },
    nature: {
      en: "The fraudster registered a company in Latvia under the name of Quanta Computer — a genuine Taiwanese hardware supplier to Facebook and Google — then sent emails and invoices that looked exactly like the real vendor's billing. Payments for real equipment flowed into accounts he controlled in Latvia and Cyprus. Between 2013 and 2015 he collected more than $100 million from the two technology giants without ever entering their offices.",
      fr: "L’escroc a immatriculé une société en Lettonie au nom de Quanta Computer — un vrai fournisseur taïwanais de matériel de Facebook et Google — puis a envoyé des e-mails et des factures identiques en apparence à la facturation du vrai fournisseur. Les paiements pour du matériel réel ont coulé vers des comptes qu’il contrôlait en Lettonie et à Chypre. Entre 2013 et 2015, il a encaissé plus de 100 millions de dollars des deux géants technologiques sans jamais entrer dans leurs bureaux.",
    },
    impact: {
      en: "The case became the textbook example of business email compromise (BEC): the FBI's Internet Crime Complaint Center counts BEC among the costliest cybercrime categories year after year, with reported losses in the billions of dollars annually across companies of every size.",
      fr: "L’affaire est devenue l’exemple manuel de la compromission des e-mails professionnels (BEC) : le FBI classe la BEC, année après année, parmi les cybercrimes les plus coûteux, avec des pertes signalées en milliards de dollars par an pour des entreprises de toutes tailles.",
    },
    consequences: {
      en: "Rimasauskas was extradited to the United States, convicted in 2019 and sentenced to five years in prison, with tens of millions of dollars recovered through forfeiture. The case forced multinationals to overhaul supplier-payment verification worldwide.",
      fr: "Rimasauskas a été extradé vers les États-Unis, condamné en 2019 et puni de cinq ans de prison, avec des dizaines de millions de dollars récupérés par la confiscation. L’affaire a contraint des multinationales à réviser la vérification des paiements fournisseurs dans le monde entier.",
    },
    advice: [
      {
        en: "Verify any change of bank details by calling the supplier on a number you already had — never one printed on the invoice or written in the email.",
        fr: "Vérifiez tout changement de coordonnées bancaires en appelant le fournisseur à un numéro que vous possédiez déjà — jamais celui imprimé sur la facture ou écrit dans l’e-mail.",
      },
      {
        en: "Treat every 'we have changed our bank account' message as a red flag requiring dual approval.",
        fr: "Traitez tout message « nous avons changé de compte bancaire » comme un signal d’alerte exigeant une double validation.",
      },
      {
        en: "Train finance teams that perfect documents prove nothing — only independent verification does.",
        fr: "Formez les équipes financières : des documents parfaits ne prouvent rien — seule la vérification indépendante compte.",
      },
      {
        en: "Report immediately: banks can sometimes recall wires within the first hours.",
        fr: "Signalez immédiatement : les banques peuvent parfois rappeler les virements dans les premières heures.",
      },
    ],
    sources: [
      { label: "US Department of Justice — press releases", url: "https://www.justice.gov/news" },
      { label: "FBI — Internet Crime Complaint Center (BEC)", url: "https://www.ic3.gov/" },
      { label: "GLOPROFAS — Business email compromise", url: "https://gloprofas.org/#/resources/practical-tools/business-email-compromise-how-companies-lose-money" },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "famous-deepfake-ceo",
    categorySlug: "impersonation-scams",
    title: {
      en: "'The boss' on the phone: the €220,000 voice clone",
      fr: "« Le patron » au téléphone : le clone vocal à 220 000 euros",
    },
    caseName: {
      en: "Deepfake CEO voice fraud · United Kingdom, 2019",
      fr: "Fraude au vocal deepfake de dirigeant · Royaume-Uni, 2019",
    },
    summary: {
      en: "A UK energy firm's CEO transferred €220,000 after recognising his parent company boss's voice and tone on an urgent call. The voice was an AI clone — and the first globally famous deepfake audio fraud.",
      fr: "Le PDG d’une énergie britannique a viré 220 000 euros après avoir reconnu la voix et le ton du patron de sa maison-mère lors d’un appel urgent. La voix était un clone par IA — la première fraude audio deepfake mondialement célèbre.",
    },
    nature: {
      en: "In 2019, the CEO of a UK-based energy firm received an urgent call — in his assessment, unmistakably — from the head of the firm's German parent company, ordering a transfer of €220,000 to a 'Hungarian supplier'. The melody, the tone, the slight German accent: all correct, all manufactured. The case, reported publicly by the firm's credit insurer and covered worldwide, marked the arrival of AI voice cloning in corporate fraud; the same network tried again days later and failed only because the target hesitated.",
      fr: "En 2019, le PDG d’une entreprise d’énergie basée au Royaume-Uni a reçu un appel urgent — à ses yeux indubitablement — du dirigeant de la maison-mère allemande, ordonnant un virement de 220 000 euros à un « fournisseur hongrois ». La mélodie, le ton, le léger accent allemand : tout était exact, tout était fabriqué. L’affaire, rendue publique par l’assureur-crédit de l’entreprise et couverte dans le monde entier, a marqué l’arrivée du clonage vocal par IA dans la fraude aux entreprises ; le même réseau a réessayé quelques jours plus tard et n’a échoué que parce que la cible a hésité.",
    },
    impact: {
      en: "The case demonstrated that a voice is no longer proof of identity — for executives, but equally for families, where 'a child in distress' can be cloned from seconds of audio. Security agencies across Europe and Africa now list voice cloning among the fastest-growing fraud techniques.",
      fr: "L’affaire a démontré qu’une voix n’est plus une preuve d’identité — pour les dirigeants, mais tout autant pour les familles, où « un enfant en détresse » peut être cloné à partir de quelques secondes d’audio. Les agences de sécurité européennes et africaines classent désormais le clonage vocal parmi les techniques de fraude qui progressent le plus vite.",
    },
    consequences: {
      en: "The first transfer was recovered in part thanks to swift reporting; the case pushed insurers and banks to build voice-verification procedures, and it is now cited in nearly every serious warning about AI-enabled fraud.",
      fr: "Le premier virement a été partiellement récupéré grâce à un signalement rapide ; l’affaire a poussé assureurs et banques à bâtir des procédures de vérification vocale, et elle est citée dans presque tous les avertissements sérieux sur la fraude assistée par IA.",
    },
    advice: [
      {
        en: "Agree a verbal code word with management — and within your family — for urgent requests.",
        fr: "Convenez d’un mot de code verbal avec votre direction — et au sein de votre famille — pour les demandes urgentes.",
      },
      {
        en: "Always call back on the number you already have for the person, never one given during the call.",
        fr: "Rappelez toujours au numéro que vous possédez déjà pour la personne, jamais à celui donné pendant l’appel.",
      },
      {
        en: "Urgency + secrecy + a new payment destination = stop and verify.",
        fr: "Urgence + secret + nouvelle destination de paiement = arrêtez et vérifiez.",
      },
      {
        en: "A perfect voice is not identity; a channel you chose yourself is.",
        fr: "Une voix parfaite n’est pas une identité ; un canal que vous avez choisi vous-même, si.",
      },
    ],
    sources: [
      { label: "Europol — Internet Organised Crime Threat Assessment", url: "https://www.europol.europa.eu/" },
      { label: "GLOPROFAS — Impersonation scams", url: "https://gloprofas.org/#/resources/practical-tools/impersonation-scams-someone-you-trust" },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "famous-podesta-phishing",
    categorySlug: "phishing",
    title: {
      en: "One fake email that shook a superpower",
      fr: "Un seul faux e-mail qui a ébranlé une superpuissance",
    },
    caseName: {
      en: "The Podesta mailbox · United States, March 2016",
      fr: "La boîte mail Podesta · États-Unis, mars 2016",
    },
    summary: {
      en: "A single spear-phishing email disguised as a password alert gave attackers access to the private emails of a US presidential campaign chairman — the most famous phishing case in history.",
      fr: "Un seul e-mail d’hameçonnage ciblé déguisé en alerte de mot de passe a donné aux attaquants accès aux e-mails privés du directeur d’une campagne présidentielle américaine — l’affaire de phishing la plus célèbre de l’histoire.",
    },
    nature: {
      en: "The message imitated a routine Google security notice urging a password change; a shortened link led to a fake sign-in page that captured the credentials. The victim's office — including a technology contractor — debated the email and misjudged it. Attackers then read tens of thousands of private messages, later published in stages. US authorities ultimately indicted foreign military intelligence officers for the intrusion.",
      fr: "Le message imitait un avis de sécurité Google de routine invitant à changer de mot de passe ; un lien raccourci menait à une fausse page de connexion qui capturait les identifiants. L’équipe de la victime — prestataire technique compris — a débattu de l’e-mail et s’est trompée. Les attaquants ont ensuite lu des dizaines de milliers de messages privés, publiés par étapes. Les autorités américaines ont fini par inculper des officiers du renseignement militaire étranger pour cette intrusion.",
    },
    impact: {
      en: "The case proved that one convincing email can compromise any organisation — a presidential campaign with security consultants still lost control of its communications. It made spear-phishing a household term and pushed two-factor authentication into mainstream corporate policy.",
      fr: "L’affaire a prouvé qu’un seul e-mail convaincant peut compromettre n’importe quelle organisation — une campagne présidentielle entourée de consultants en sécurité a quand même perdu le contrôle de ses communications. Elle a fait du spear-phishing un terme grand public et a imposé l’authentification à deux facteurs dans les politiques d’entreprise.",
    },
    consequences: {
      en: "Criminal indictments, years of investigations and a lasting debate about email security. For ordinary users the lesson is simpler: the password-reset email is the most abused trick in the fraudster's toolbox.",
      fr: "Inculpations pénales, années d’enquêtes et débat durable sur la sécurité des e-mails. Pour l’utilisateur ordinaire, la leçon est plus simple : l’e-mail de réinitialisation de mot de passe est le truc le plus exploité de la boîte à outils de l’escroc.",
    },
    advice: [
      {
        en: "Never log in through links in emails — open the official site or app yourself.",
        fr: "Ne vous connectez jamais via des liens d’e-mails — ouvrez vous-même le site ou l’application officielle.",
      },
      {
        en: "Check the real sender address, not just the display name.",
        fr: "Vérifiez l’adresse réelle de l’expéditeur, pas seulement le nom affiché.",
      },
      {
        en: "Turn on multi-factor authentication on every account that matters, ideally with a security key.",
        fr: "Activez l’authentification multifacteur sur chaque compte important, idéalement avec une clé de sécurité.",
      },
      {
        en: "Report fake security alerts to your provider and to GLOPROFAS so others are warned.",
        fr: "Signalez les fausses alertes de sécurité à votre fournisseur et à GLOPROFAS pour avertir les autres.",
      },
    ],
    sources: [
      { label: "US Department of Justice — press releases", url: "https://www.justice.gov/news" },
      { label: "UK National Cyber Security Centre — phishing guidance", url: "https://www.ncsc.gov.uk/" },
      { label: "GLOPROFAS — Phishing scams", url: "https://gloprofas.org/#/resources/practical-tools/phishing-scams-recognise-fake-emails-messages" },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "famous-mobile-money-wave",
    categorySlug: "mobile-money-scams",
    title: {
      en: "Fake transfer alerts: the scam draining West African markets",
      fr: "Les faux avis de transfert : l’arnaque qui vide les marchés d’Afrique de l’Ouest",
    },
    caseName: {
      en: "Mobile money fraud wave · Cameroon, Nigeria, Ghana",
      fr: "Vague de fraudes au mobile money · Cameroun, Nigéria, Ghana",
    },
    summary: {
      en: "Forged payment confirmations and fake 'agent' calls trick merchants and families into releasing goods or sending money back. Authorities in Cameroon, Nigeria and Ghana have issued repeated public warnings.",
      fr: "De fausses confirmations de paiement et de faux appels d’« agent » poussent commerçants et familles à livrer des marchandises ou à renvoyer l’argent. Les autorités du Cameroun, du Nigéria et du Ghana ont multiplié les alertes publiques.",
    },
    nature: {
      en: "Criminals use applications that forge bank or mobile-money payment confirmations, or pose as agents and 'customer service' callers offering to reverse a 'wrong transfer'. The merchant sees a convincing SMS and releases goods; the victim dials the codes dictated on the phone — USSD strings that transfer money out or expose the PIN. Ghana's Cyber Security Authority and police, Nigeria's law enforcement, and Cameroon's ANTIC have all published repeated fraud advisories describing exactly these scripts.",
      fr: "Les criminels utilisent des applications qui falsifient les confirmations de paiement bancaires ou de mobile money, ou se font passer pour des agents et des « services clients » proposant d’annuler un « transfert erroné ». Le commerçant voit un SMS convaincant et livre la marchandise ; la victime compose les codes dictés au téléphone — des codes USSD qui transfèrent l’argent ou exposent le PIN. La Cyber Security Authority et la police ghanéennes, les forces de l’ordre nigérianes et l’ANTIC camerounaise ont toutes publié des alertes répétées décrivant précisément ces scénarios.",
    },
    impact: {
      en: "Merchants lose stock, families lose savings, and confidence in digital payments — a lifeline of West African commerce — is eroded. Operators and regulators report persistent volumes of this fraud year after year, with small traders and young people the most frequent targets.",
      fr: "Les commerçants perdent leur stock, les familles leur épargne, et la confiance dans les paiements numériques — artère du commerce ouest-africain — s’érode. Opérateurs et régulateurs signalent des volumes persistants de cette fraude année après année, les petits commerçants et les jeunes étant les cibles les plus fréquentes.",
    },
    consequences: {
      en: "Money moved by mobile money is extremely hard to trace and rarely recovered; 'recovery agents' re-victimise the same people. Arrests happen, but the low cost of the script keeps the fraud alive.",
      fr: "L’argent parti par mobile money est extrêmement difficile à tracer et rarement récupéré ; les « agents de recouvrement » re-victiment les mêmes personnes. Des arrestations ont lieu, mais le faible coût du scénario maintient la fraude en vie.",
    },
    advice: [
      {
        en: "Before releasing goods, verify the money yourself: check your own balance in the official app or the official USSD menu — never trust a forwarded screenshot or SMS alone.",
        fr: "Avant de livrer, vérifiez vous-même : consultez votre propre solde dans l’application officielle ou le menu USSD officiel — ne vous fiez jamais à une capture transférée ou à un simple SMS.",
      },
      {
        en: "No agent, bank or operator will ever ask for your PIN or your one-time code; anyone who does is a fraudster.",
        fr: "Aucun agent, aucune banque, aucun opérateur ne demandera jamais votre PIN ni votre code à usage unique ; quiconque le fait est un fraudeur.",
      },
      {
        en: "Never dial codes dictated by a caller to 'cancel' or 'reverse' a transfer.",
        fr: "Ne composez jamais les codes dictés par un appelant pour « annuler » ou « régulariser » un transfert.",
      },
      {
        en: "If the money is not visible in YOUR account, it has not arrived — whatever the message says.",
        fr: "Si l’argent n’est pas visible sur VOTRE compte, il n’est pas arrivé — quel que soit le message.",
      },
    ],
    sources: [
      { label: "Ghana Cyber Security Authority", url: "https://csa.gov.gh/" },
      { label: "ANTIC — Cameroun", url: "https://www.antic.cm/" },
      { label: "GLOPROFAS — Mobile money scams: MTN MoMo and Orange Money", url: "https://gloprofas.org/#/resources/practical-tools/mobile-money-scams-protect-mtn-momo-orange-money" },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "famous-419",
    categorySlug: "advance-fee-scams",
    title: {
      en: "'419': the advance-fee fraud behind the 'Nigerian prince'",
      fr: "La « 419 » : la fraude à l’avance de frais derrière le « prince nigérian »",
    },
    caseName: {
      en: "The advance-fee phenomenon · global, decades-running",
      fr: "Le phénomène de la fraude à l’avance de frais · mondial, depuis des décennies",
    },
    summary: {
      en: "Letters, then faxes, then emails promising a fortune in exchange for a small advance fee have drained victims for decades — and still work exactly the same way on WhatsApp today.",
      fr: "Lettres, puis fax, puis e-mails promettant une fortune contre une petite avance de frais drainent les victimes depuis des décennies — et fonctionnent aujourd’hui exactement pareil sur WhatsApp.",
    },
    nature: {
      en: "The victim is promised a large sum — an inheritance, a lottery win, a contract payment, a trunk of banknotes or gold — but must first pay 'legal fees', 'transfer costs', 'taxes' or 'bribes'. Each payment unlocks a new complication and a new fee, until the victim stops paying or the criminals vanish. The con takes its name from Section 419 of Nigeria's Criminal Code and descends from the centuries-old 'Spanish Prisoner' trick; today it arrives as email, WhatsApp and social-media messages, often blending fake documents, cloned official identities and even staged video calls.",
      fr: "On promet à la victime une grosse somme — un héritage, un gain de loterie, un paiement de contrat, une malle de billets ou d’or — mais elle doit d’abord payer des « frais juridiques », des « coûts de transfert », des « taxes » ou des « pots-de-vin ». Chaque paiement débloque une nouvelle complication et de nouveaux frais, jusqu’à ce que la victime cesse de payer ou que les criminels disparaissent. L’arnaque tire son nom de l’article 419 du Code pénal nigérian et descend de la « prisonnier espagnol », vieux de plusieurs siècles ; aujourd’hui, elle arrive par e-mail, WhatsApp et réseaux sociaux, souvent avec de faux documents et des identités officielles clonées.",
    },
    impact: {
      en: "Reporting centres such as the US FBI's Internet Crime Complaint Center have documented billions of dollars in annual losses across confidence-type frauds for years, with advance-fee schemes a persistent component; most victims never report, so true totals are higher. Beyond money, victims surrender passports, bank details and dignity.",
      fr: "Les centres de signalement comme l’IC3 du FBI documentent depuis des années des pertes annuelles en milliards de dollars pour les fraudes de confiance, dont les avan­ces de frais sont une composante persistante ; la plupart des victimes ne signalent jamais, les totaux réels sont donc plus élevés. Au-delà de l’argent, les victimes abandonnent passeports, coordonnées bancaires et dignité.",
    },
    consequences: {
      en: "Funds sent by wire, mobile money or cryptocurrency are rarely recovered; victims are frequently re-targeted by 'recovery agents' demanding new fees; those who borrowed to pay the 'fees' keep the debt. In some jurisdictions, victims who knowingly moved money for the fraudsters have themselves faced legal consequences.",
      fr: "Les fonds envoyés par virement, mobile money ou cryptomonnaie sont rarement récupérés ; les victimes sont souvent re-ciblées par de « faux agents de recouvrement » exigeant de nouveaux frais ; ceux qui ont emprunté pour payer les « frais » gardent la dette. Dans certains pays, des victimes ayant sciemment transféré de l’argent pour les escrocs ont elles-mêmes encouru des poursuites.",
    },
    advice: [
      {
        en: "No legitimate transfer, inheritance or prize ever requires advance fees — treat any such request as fraud.",
        fr: "Aucun transfert, héritage ou gain légitime n’exige d’avance de frais — traitez toute demande de ce type comme une fraude.",
      },
      {
        en: "Never send identity documents or bank details to strangers promising money.",
        fr: "N’envoyez jamais de documents d’identité ni de coordonnées bancaires à des inconnus qui promettent de l’argent.",
      },
      {
        en: "Talk to someone you trust before sending the first fee — secrecy is the scammer's shield.",
        fr: "Parlez à quelqu’un de confiance avant d’envoyer le premier frais — le secret est le bouclier de l’escroc.",
      },
      {
        en: "If you have already paid: stop, preserve the evidence, report to the police and GLOPROFAS — and never pay a 'recovery agent'.",
        fr: "Si vous avez déjà payé : arrêtez, conservez les preuves, signalez à la police et à GLOPROFAS — et ne payez jamais un « agent de recouvrement ».",
      },
    ],
    sources: [
      { label: "FBI — Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "Interpol — financial crime", url: "https://www.interpol.int/en/Crimes/Financial-crime" },
      { label: "GLOPROFAS — Advance-fee scams", url: "https://gloprofas.org/#/scams/advance-fee-scams" },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "famous-pig-butchering",
    categorySlug: "employment-scams",
    title: {
      en: "The fake job ad as a trapdoor: task scams and 'pig butchering'",
      fr: "La fausse offre d’emploi comme trappe : arnaques aux tâches et « pig butchering »",
    },
    caseName: {
      en: "Global fake recruitment networks · documented by Interpol and the UN",
      fr: "Réseaux mondiaux de faux recrutements · documentés par Interpol et l’ONU",
    },
    summary: {
      en: "Fake job adverts harvest 'file fees' from applicants and recruit victims into industrial-scale scam compounds — a phenomenon the UN and Interpol now treat as a global threat.",
      fr: "Les fausses annonces d’emploi ponctionnent des « frais de dossier » et recrutent des victimes pour des complexes d’arnaques à l’échelle industrielle — un phénomène que l’ONU et Interpol traitent désormais comme une menace mondiale.",
    },
    nature: {
      en: "Fake vacancies — online 'customer service', 'data entry' or 'platform optimisation' roles with salaries far above market — serve two purposes. They harvest 'visa fees', 'badge fees' and personal data from applicants; and they recruit job seekers into forced labour in scam compounds, where they are made to run 'pig-butchering' frauds: weeks of fabricated friendship followed by fake investment platforms. UN human rights experts reported in 2023 that hundreds of thousands of people had been trafficked into such compounds in South-East Asia, and Interpol has issued global warnings about the scam networks behind fake job ads.",
      fr: "Les fausses offres — postes de « service client », « saisie de données » ou « optimisation de plateforme » rémunérés très au-dessus du marché — servent deux objectifs. Elles ponctionnent « frais de visa », « frais de badge » et données personnelles des candidats ; et elles recrutent des demandeurs d’emploi vers le travail forcé dans des complexes d’arnaques, où on les oblige à mener des fraudes dites « pig butchering » : des semaines d’amitié fabriquée suivies de fausses plateformes d’investissement. Les experts de l’ONU ont rapporté en 2023 que des centaines de milliers de personnes avaient été traînées dans ces complexes en Asie du Sud-Est, et Interpol a lancé des avertissements mondiaux sur les réseaux derrière les fausses annonces.",
    },
    impact: {
      en: "On one side, job seekers lose fees, documents and data; on the other, trafficked workers endure coercion and violence while being forced to defraud others — a double victimisation that distinguishes this fraud from classic scams.",
      fr: "D’un côté, les demandeurs d’emploi perdent frais, documents et données ; de l’autre, les travailleurs trafiqués subissent coercition et violences tout en étant forcés d’escroquer les autres — une double victimisation qui distingue cette fraude des arnaques classiques.",
    },
    consequences: {
      en: "International arrests and repatriations continue, but the recruitment pipeline keeps running because the ads still find people who need work urgently. The 'task scam' variant — small paid jobs followed by 'investments' to unlock earnings — spreads the same trap worldwide without any travel.",
      fr: "Les arrestations et rapatriements internationaux se poursuivent, mais le pipeline de recrutement tourne encore, car les annonces trouvent toujours des personnes pressées de travailler. La variante « arnaque aux tâches » — petits jobs payés suivis d’« investissements » pour débloquer les gains — diffuse le même piège dans le monde entier sans aucun déplacement.",
    },
    advice: [
      {
        en: "A real employer never collects 'file fees', 'badge fees' or 'training fees' before your first day of work.",
        fr: "Un vrai employeur ne perçoit jamais de « frais de dossier », « frais de badge » ni « frais de formation » avant votre premier jour de travail.",
      },
      {
        en: "Verify the company and the recruiter independently through the official careers page and public records.",
        fr: "Vérifiez indépendamment l’entreprise et le recruteur via la page carrières officielle et les registres publics.",
      },
      {
        en: "A job that pays for liking videos or completing 'small tasks' with rising daily commissions is the entry ramp of a task scam.",
        fr: "Un emploi qui paie pour liker des vidéos ou accomplir de « petites tâches » avec des commissions journalières croissantes est la rampe d’entrée d’une arnaque aux tâches.",
      },
      {
        en: "Never let a 'recruiter' move the conversation to private channels and 'guaranteed' investment platforms.",
        fr: "Ne laissez jamais un « recruteur » déplacer la conversation vers des canaux privés et des plateformes d’investissement « garanties ».",
      },
    ],
    sources: [
      { label: "Interpol — warnings on pig-butchering scam networks", url: "https://www.interpol.int/en/Crimes/Financial-crime" },
      { label: "UN Human Rights — report on trafficking into online scam operations (2023)", url: "https://www.ohchr.org/" },
      { label: "GLOPROFAS — Fake job offers and employment scams", url: "https://gloprofas.org/#/resources/practical-tools/fake-job-offers-and-employment-scams" },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "famous-online-shopping",
    categorySlug: "online-shopping-scams",
    title: {
      en: "The shop that never ships: the most-reported fraud of the online era",
      fr: "La boutique qui n’expédie jamais : la fraude la plus signalée de l’ère numérique",
    },
    caseName: {
      en: "Non-delivery and fake-shop fraud · documented worldwide",
      fr: "Fraude à la non-livraison et aux fausses boutiques · documentée dans le monde entier",
    },
    summary: {
      en: "Fake shops cloned from real retailers, advertised on social media at irresistible prices, take payment and deliver nothing — for years the most-reported fraud category in the United States.",
      fr: "De fausses boutiques clonées de vrais commerçants, publiées sur les réseaux à des prix irrésistibles, encaissent et ne livrent rien — pendant des années, la catégorie de fraude la plus signalée aux États-Unis.",
    },
    nature: {
      en: "The formula is minimal: a professional-looking site or social-media page, photos lifted from real brands, prices 40–70% below market, and payment by card or irreversible transfer. The goods never arrive; or a counterfeit replaces them; or the 'shop' exists only long enough to harvest card details. The US Federal Trade Commission's consumer reporting data ranked online shopping frauds — led by non-delivery — as the most-reported scam category for three consecutive years, and consumer protection agencies across Europe and Africa describe the same pattern each holiday season.",
      fr: "La recette est minimale : un site ou une page de réseau social d’aspect professionnel, des photos prises à de vraies marques, des prix 40 à 70 % sous le marché, et un paiement par carte ou virement irréversible. La marchandise n’arrive jamais ; ou une contrefaçon la remplace ; ou la « boutique » n’existe que le temps de récolter des données de carte. Les données de signalement de la Federal Trade Commission américaine ont classé les fraudes aux achats en ligne — dominées par la non-livraison — au premier rang des arnaques pendant trois années consécutives, et les agences de protection du consommateur d’Europe et d’Afrique décrivent le même schéma à chaque saison des fêtes.",
    },
    impact: {
      en: "Hundreds of thousands of complaints per year in the US alone, with losses in the hundreds of millions; elsewhere, buyers lured off protected platforms into direct mobile-money transfers have no recourse at all.",
      fr: "Des centaines de milliers de plaintes par an aux seuls États-Unis, pour des pertes en centaines de millions ; ailleurs, les acheteurs attirés hors des plateformes protégées vers des virements directs en mobile money n’ont aucun recours.",
    },
    consequences: {
      en: "Card details harvested by fake shops feed further payment fraud; the shops re-appear under new domains within days of being reported, and social-marketplace victims rarely recover anything once a direct transfer is made.",
      fr: "Les données de carte récoltées alimentent d’autres fraudes au paiement ; les boutiques réapparaissent sous de nouveaux domaines quelques jours après leur signalement, et les victimes des réseaux sociaux récupèrent rarement quoi que ce soit une fois le virement direct effectué.",
    },
    advice: [
      {
        en: "Check the domain's age and search the shop's name plus 'scam' or 'arnaque' before paying.",
        fr: "Vérifiez l’âge du domaine et cherchez le nom de la boutique suivi de « scam » ou « arnaque » avant de payer.",
      },
      {
        en: "Prefer payment methods with buyer protection; avoid irreversible transfers to strangers.",
        fr: "Privilégiez les moyens de paiement avec protection acheteur ; évitez les virements irréversibles à des inconnus.",
      },
      {
        en: "No reviews on independent platforms, no physical address, no legal notice — no purchase.",
        fr: "Pas d’avis sur des plateformes indépendantes, pas d’adresse physique, pas de mentions légales — pas d’achat.",
      },
      {
        en: "On social marketplaces, pay only through the platform's protected system — never by direct transfer.",
        fr: "Sur les réseaux sociaux, payez uniquement via le système protégé de la plateforme — jamais par virement direct.",
      },
    ],
    sources: [
      { label: "US Federal Trade Commission — consumer advice", url: "https://reportfraud.ftc.gov" },
      { label: "Europol — Internet Organised Crime Threat Assessment", url: "https://www.europol.europa.eu/" },
      { label: "GLOPROFAS — Online marketplace scams", url: "https://gloprofas.org/#/resources/practical-tools/online-marketplace-scams-buy-and-sell-safely" },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "famous-loan-apps",
    categorySlug: "fake-loan-scams",
    title: {
      en: "Predatory loan apps: credit that costs your privacy and your peace",
      fr: "Les applications de prêt prédatrices : un crédit qui coûte votre vie privée et votre paix",
    },
    caseName: {
      en: "Fake and predatory lending apps · Kenya, Nigeria, India — 2021 onward",
      fr: "Applications de prêt frauduleuses et prédatrices · Kenya, Nigéria, Inde — depuis 2021",
    },
    summary: {
      en: "Instant-credit apps that demand your contacts, messages and photos, then charge hidden fees and harass borrowers' families, were removed from app stores by the hundreds as regulators stepped in.",
      fr: "Des applications de crédit instantané exigeant contacts, messages et photos, facturant des frais cachés et harcelant les familles des emprunteurs, ont été retirées des boutiques par centaines sous la pression des régulateurs.",
    },
    nature: {
      en: "The apps promise loans in minutes, but first harvest identity documents, contact lists, SMS histories and photos. Then come the fees: 'processing', 'insurance', 'verification', paid before any money is advanced. If a loan is granted at all, it can be a fraction of the requested sum, with repayments demanded at usurious rates — enforced by threatening messages sent to the borrower's entire contact list. Google has removed or blocked large numbers of such apps from its store, and regulators in Kenya, Nigeria, India and the Philippines have taken formal enforcement action against predatory digital lenders.",
      fr: "Ces applications promettent un prêt en quelques minutes, mais récoltent d’abord pièces d’identité, listes de contacts, historiques de SMS et photos. Viennent ensuite les frais : « de traitement », « d’assurance », « de vérification », payés avant tout décaissement. Si un prêt est accordé, il ne représente qu’une fraction du montant demandé, avec des remboursements à des taux usuraires — appliqués par des messages menaçants envoyés à toute la liste de contacts de l’emprunteur. Google a retiré ou bloqué un grand nombre de ces applications, et les régulateurs du Kenya, du Nigéria, de l’Inde et des Philippines ont pris des mesures officielles contre les prêteurs numériques prédateurs.",
    },
    impact: {
      en: "Borrowers lose fees and privacy, then face humiliation and psychological pressure as their families and employers receive threatening messages; the data collected outlives the app and resurfaces in further fraud.",
      fr: "Les emprunteurs perdent frais et vie privée, puis subissent humiliation et pression psychologique quand familles et employeurs reçoivent des messages menaçants ; les données collectées survivent à l’application et resservent à d’autres fraudes.",
    },
    consequences: {
      en: "Enforcement actions, app-store purges and new licensing regimes have curbed the worst actors, but copycats reappear under new names; victims of data harvesting remain exposed to blackmail and identity fraud long after the loan is settled.",
      fr: "Mesures répressives, purges des boutiques d’applications et nouveaux régimes de licence ont contenu les pires acteurs, mais des copies réapparaissent sous de nouveaux noms ; les victimes de la collecte de données restent exposées au chantage et à la fraude à l’identité longtemps après le remboursement.",
    },
    advice: [
      {
        en: "Borrow only from lenders licensed by your financial regulator — verify the licence yourself, not the app's own claims.",
        fr: "Empruntez uniquement auprès de prêteurs agréés par votre régulateur financier — vérifiez l’agrément vous-même, pas les affirmations de l’application.",
      },
      {
        en: "Never pay a fee before receiving a loan; a genuine lender deducts its costs from the amount advanced.",
        fr: "Ne payez jamais de frais avant de recevoir le prêt ; un vrai prêteur déduit ses coûts du montant versé.",
      },
      {
        en: "Refuse any app demanding access to your contacts, messages, photos or call log.",
        fr: "Refusez toute application exigeant l’accès à vos contacts, messages, photos ou journal d’appels.",
      },
      {
        en: "If you have already paid: report to the regulator, the app store and the police — and warn your contacts before the app does.",
        fr: "Si vous avez déjà payé : signalez au régulateur, à la boutique d’applications et à la police — et prévenez vos contacts avant que l’application ne le fasse.",
      },
    ],
    sources: [
      { label: "Central Bank of Kenya — digital credit regulations", url: "https://www.centralbank.go.ke/" },
      { label: "GLOPROFAS — Loan, credit and financial assistance scams", url: "https://gloprofas.org/#/resources/practical-tools/loan-credit-and-financial-assistance-scams" },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "famous-fake-sites",
    categorySlug: "fake-websites",
    title: {
      en: "Pixel-perfect fakes: the criminal kits that clone your bank",
      fr: "Des faux au pixel près : les kits criminels qui clonent votre banque",
    },
    caseName: {
      en: "Phishing kits and cloned websites · a global criminal industry",
      fr: "Kits de phishing et sites clonés · une industrie criminelle mondiale",
    },
    summary: {
      en: "Criminal 'phishing kits' copy banks, retailers and government services detail for detail on lookalike domains — and millions of suspicious emails are reported to national takedown services every year.",
      fr: "Les « kits de phishing » criminels copient banques, commerçants et services publics au détail près sur des domaines imitateurs — et des millions d’e-mails suspects sont signalés chaque année aux services nationaux de retrait.",
    },
    nature: {
      en: "A phishing kit is a ready-made copy of a trusted website — the login page of a bank, an operator, a retailer or a ministry — deployed on a lookalike domain that differs from the real one by a single letter. The fake page is pushed by SMS and email in bulk; everything typed into it flows to criminals. The UK's national Suspicious Email Reporting Service has received millions of public reports since 2020, enabling the takedown of large numbers of scam sites; Europol's threat assessments list cloned shops and phishing pages as persistent criminal markets, and the same kits now target mobile-money users across Africa.",
      fr: "Un kit de phishing est la copie prête à l’emploi d’un site de confiance — la page de connexion d’une banque, d’un opérateur, d’un commerçant ou d’un ministère — déployée sur un domaine imitateur qui ne diffère du vrai que par une lettre. La fausse page est diffusée en masse par SMS et e-mail ; tout ce qu’on y saisit part vers les criminels. Le service national britannique de signalement d’e-mails suspects a reçu des millions de signalements depuis 2020, permettant le retrait d’un grand nombre de sites ; les évaluations de menace d’Europol classent les boutiques clonées et les pages de phishing parmi les marchés criminels persistants, et les mêmes kits visent désormais les utilisateurs de mobile money à travers l’Afrique.",
    },
    impact: {
      en: "Credentials harvested from cloned pages are sold in bulk, feeding account takeovers, payment fraud and identity theft; businesses lose customer trust when their brands are cloned, and recovery of stolen funds is rare.",
      fr: "Les identifiants récoltés sur les pages clonées sont vendus en gros, alimentant détournements de comptes, fraudes au paiement et vols d’identité ; les entreprises perdent la confiance de leurs clients quand leur marque est clonée, et la récupération des fonds volés est rare.",
    },
    consequences: {
      en: "Takedown services remove enormous numbers of sites, but kits are cheap and domains disposable, so cloned pages re-appear constantly; the criminal ecosystem around them — hosting, bulletproof registrars, mule accounts — is repeatedly disrupted by international operations but rebuilt.",
      fr: "Les services de retrait suppriment d’énormes quantités de sites, mais les kits sont bon marché et les domaines jetables : les pages clonées réapparaissent sans cesse ; l’écosystème criminel autour — hébergement, bureaux d’enregistrement tolérants, comptes mules — est régulièrement démantelé par des opérations internationales puis reconstruit.",
    },
    advice: [
      {
        en: "Always type your bank's or operator's address yourself, or use the official app; never follow links in messages.",
        fr: "Tapez toujours vous-même l’adresse de votre banque ou opérateur, ou utilisez l’application officielle ; ne suivez jamais les liens des messages.",
      },
      {
        en: "Check the exact domain spelling before entering any credential — one letter is the whole difference.",
        fr: "Vérifiez l’orthographe exacte du domaine avant de saisir le moindre identifiant — une lettre fait toute la différence.",
      },
      {
        en: "Remember: a padlock icon proves encryption, not honesty — fraudsters get certificates too.",
        fr: "Rappelez-vous : le cadenas prouve le chiffrement, pas l’honnêteté — les escrocs ont aussi des certificats.",
      },
      {
        en: "Report cloned sites to the real organisation and to GLOPROFAS so the URL can be flagged for takedown.",
        fr: "Signalez les sites clonés à la vraie organisation et à GLOPROFAS pour que l’URL soit signalée au retrait.",
      },
    ],
    sources: [
      { label: "UK National Cyber Security Centre", url: "https://www.ncsc.gov.uk/" },
      { label: "Europol — Internet Organised Crime Threat Assessment", url: "https://www.europol.europa.eu/" },
      { label: "GLOPROFAS — How to identify fake websites and online stores", url: "https://gloprofas.org/#/resources/practical-tools/how-to-identify-fake-websites-and-online-stores" },
    ],
  },
];
