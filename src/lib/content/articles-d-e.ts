/**
 * GLOPROFAS Resource Centre — Categories D and E articles.
 * D: business and professional fraud (BEC, invoices, executive impersonation,
 * recruitment identity fraud, procurement, business investment scams).
 * E: emerging and specialised scams (AI/deepfakes, identity theft, extortion,
 * crypto recovery, fake charities, travel and visa fraud).
 * All user-facing text is bilingual (EN/FR). Reference URLs verified live.
 */
import type { Article } from "./resource-centre-types";

export const ARTICLES_D_E: Article[] = [
  /* ------------------------------------------------------------------ */
  /* D1 — Business email compromise                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "business-email-compromise-how-companies-lose-money",
    categorySlug: "business-fraud",
    title: {
      en: "Business Email Compromise: How Companies Lose Money",
      fr: "Compromission des e-mails professionnels : comment les entreprises perdent leur argent",
    },
    metaDescription: {
      en: "Business email compromise tricks staff into paying criminals. Learn how BEC works, its warning signs, and how to protect your company’s money.",
      fr: "La compromission des e-mails professionnels pousse les salariés à payer des escrocs. Comprendre le BEC, ses signes d’alerte et protéger votre entreprise.",
    },
    summary: {
      en: "Business email compromise (BEC) is one of the costliest frauds facing companies worldwide. Criminals infiltrate or imitate professional email threads, then redirect genuine payments to their own accounts. This guide explains the mechanics, warning signs and defences every business needs.",
      fr: "La compromission des e-mails professionnels (BEC) figure parmi les fraudes les plus coûteuses pour les entreprises. Les escrocs s’introduisent dans les échanges ou imitent les adresses, puis détournent des paiements réels vers leurs comptes. Ce guide présente les mécanismes, les signes d’alerte et les défenses indispensables.",
    },
    what: {
      en: "Business email compromise is a targeted fraud where criminals pose as a supplier, executive or trusted partner — or secretly monitor real email exchanges — to make a company pay a genuine-looking invoice or transfer funds into the criminal’s account. The payment often follows normal approval procedures, because the request itself seemed authentic.",
      fr: "La compromission des e-mails professionnels est une fraude ciblée : les escrocs se font passer pour un fournisseur, un dirigeant ou un partenaire de confiance — ou surveillent discrètement de vrais échanges — pour faire payer une facture d’apparence authentique ou virer des fonds vers leur compte. Le paiement suit souvent les procédures normales, car la demande paraissait légitime.",
    },
    how: {
      en: "The fraud starts with reconnaissance: criminals study a company’s suppliers, managers and payment cycles, then access a mailbox through phishing or a leaked password. They follow real conversations for weeks, learning invoice values, deadlines and tone. The strike is quiet: a genuine thread is hijacked and continued from a look-alike domain — one letter changed — so the reply lands with the criminal. When a large payment falls due, “new bank details” arrive with an urgent, confidential note, and the company pays a real invoice into the criminal’s account. The money then hops between mule accounts and becomes very hard to recover, which is why prevention matters more than any cure.",
      fr: "La fraude commence par de la reconnaissance : les escrocs étudient fournisseurs, dirigeants et cycles de paiement, puis accèdent à une boîte mail par hameçonnage ou mot de passe divulgué. Ils suivent ensuite les vrais échanges pendant des semaines, mémorisant montants, échéances et ton habituel. L’attaque est silencieuse : un fil authentique est détourné et prolongé depuis un domaine quasi identique — une seule lettre modifiée — et la réponse part vers l’escroc. Quand un gros paiement arrive à échéance, de « nouvelles coordonnées bancaires » arrivent avec une note urgente et confidentielle, et l’entreprise règle une vraie facture sur le compte du criminel. Les fonds sautent alors de comptes-relais en comptes-relais et deviennent très difficiles à récupérer : la prévention compte plus que tout remède.",
    },
    warningSigns: [
      {
        en: "A supplier emails “updated” bank details shortly before a payment is due.",
        fr: "Un fournisseur annonce par e-mail des coordonnées bancaires « mises à jour » juste avant une échéance.",
      },
      {
        en: "The email domain nearly matches the real one, with one changed character.",
        fr: "Le domaine de l’e-mail ressemble au vrai à un caractère près.",
      },
      {
        en: "Urgency and secrecy: “process today”, “do not discuss this with anyone yet”.",
        fr: "Urgence et secret : « traitez aujourd’hui », « n’en parlez encore à personne ».",
      },
      {
        en: "An executive who never uses email suddenly authorises a large confidential transfer.",
        fr: "Un dirigeant qui n’utilise jamais l’e-mail autorise soudain un transfert important et confidentiel.",
      },
      {
        en: "Replies inside a genuine thread come from a slightly different address.",
        fr: "Les réponses dans un fil authentique proviennent d’une adresse légèrement différente.",
      },
      {
        en: "The new account is held at a different bank or in another country than usual.",
        fr: "Le nouveau compte est tenu dans une autre banque ou un autre pays que d’habitude.",
      },
      {
        en: "Login alerts, missing emails or unfamiliar forwarding rules appear in the mailbox.",
        fr: "Alertes de connexion, e-mails disparus ou règles de transfert inconnues apparaissent dans la boîte.",
      },
    ],
    example: {
      en: "Illustrative example: A Douala import-export firm is finalising a container purchase. After weeks of normal correspondence, the supplier’s thread continues from a nearly identical domain and announces a “new bank account following an internal audit”. The accountant, pressed by the release deadline, transfers 18 million FCFA. The genuine supplier, still waiting, calls a week later. The mailbox had been monitored; the money was gone within hours.",
      fr: "Exemple illustratif : une entreprise d’import-export de Douala finalise l’achat d’un conteneur. Après des semaines d’échanges normaux, le fil du fournisseur se poursuit depuis un domaine quasi identique annonçant un « nouveau compte bancaire après un audit interne ». Pressée par la date limite, la comptable vire 18 millions de FCFA. Le vrai fournisseur, toujours en attente, appelle une semaine plus tard : la boîte mail était surveillée, et l’argent a disparu en quelques heures.",
    },
    protect: [
      {
        en: "Verify every change of bank details by phone, on a number you already hold on file.",
        fr: "Vérifiez tout changement de coordonnées bancaires par téléphone, au numéro déjà présent dans vos fichiers.",
      },
      {
        en: "Require dual authorisation for all transfers above an agreed threshold.",
        fr: "Exigez une double autorisation pour tout virement dépassant un plafond défini.",
      },
      {
        en: "Train finance and admin staff regularly on BEC and phishing red flags.",
        fr: "Formez régulièrement les équipes financières et administratives aux signaux du BEC et de l’hameçonnage.",
      },
      {
        en: "Look at the full email address, not just the display name, before replying.",
        fr: "Vérifiez l’adresse e-mail complète, et pas seulement le nom affiché, avant de répondre.",
      },
      {
        en: "Enable multi-factor authentication on all company mailboxes and review forwarding rules.",
        fr: "Activez l’authentification multifacteur sur toutes les boîtes et contrôlez les règles de transfert.",
      },
      {
        en: "Agree a simple out-of-band confirmation routine with your main suppliers.",
        fr: "Convenez d’une confirmation par un autre canal avec vos principaux fournisseurs.",
      },
      {
        en: "Keep supplier master data changes under four-eyes control.",
        fr: "Soumettez les modifications des données fournisseurs à un contrôle à quatre yeux.",
      },
    ],
    ifVictim: [
      {
        en: "Contact your bank immediately and request a recall of the transfer — speed is critical.",
        fr: "Contactez immédiatement votre banque et demandez un rappel du virement : la rapidité est décisive.",
      },
      {
        en: "Ask the receiving bank, through yours, to freeze the destination account.",
        fr: "Demandez, via votre banque, le gel du compte destinataire auprès de la banque réceptrice.",
      },
      {
        en: "Preserve the fraudulent emails with their full headers; do not delete anything.",
        fr: "Conservez les e-mails frauduleux avec leurs en-têtes complets ; ne supprimez rien.",
      },
      {
        en: "Alert the impersonated supplier or partner so they can warn other clients.",
        fr: "Avertissez le fournisseur ou partenaire usurpé afin qu’il prévienne ses autres clients.",
      },
      {
        en: "Have the compromised mailbox secured at once: new passwords, MFA, forwarding rules removed.",
        fr: "Sécurisez aussitôt la boîte compromise : nouveaux mots de passe, MFA, suppression des règles de transfert.",
      },
      {
        en: "Report to the police or cybercrime unit and to GLOPROFAS with your evidence.",
        fr: "Signalez les faits à la police ou à l’unité de cybercriminalité, ainsi qu’à GLOPROFAS, avec vos preuves.",
      },
    ],
    reportTo: [
      {
        en: "Your bank through its official hotline or relationship manager — immediately, to attempt a transfer recall.",
        fr: "Votre banque, via sa ligne officielle ou votre chargé de compte, immédiatement, pour tenter un rappel de virement.",
      },
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon), with full email headers.",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun), avec les en-têtes complets.",
      },
      {
        en: "GLOPROFAS via our online report form so we can advise and document the case.",
        fr: "GLOPROFAS, via notre formulaire de signalement en ligne, pour être conseillé et documenter le cas.",
      },
    ],
    keyTakeaway: {
      en: "Never treat a change of payment details as routine. One phone call to a known number — before, not after, paying — would stop most business email compromise losses.",
      fr: "Ne considérez jamais un changement de coordonnées bancaires comme anodin. Un seul appel vers un numéro déjà connu — avant le paiement, pas après — éviterait la plupart des pertes liées au BEC.",
    },
    relatedSlugs: [
      "invoice-and-payment-redirection-fraud",
      "ceo-and-executive-impersonation-scams",
      "phishing-scams-recognise-fake-emails-messages",
    ],
    checklistSlug: "bec-prevention",
    references: [
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "Europol", url: "https://www.europol.europa.eu/" },
      { label: "Cameroon ANTIC", url: "https://www.antic.cm/" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-08-25",
    updatedAt: "2026-11-20",
    featured: true,
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* D2 — Invoice and payment redirection fraud                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "invoice-and-payment-redirection-fraud",
    categorySlug: "business-fraud",
    title: {
      en: "Invoice and Payment Redirection Fraud",
      fr: "Fraude par facture et détournement de paiement",
    },
    metaDescription: {
      en: "Fraudsters intercept or imitate real invoices and swap the bank details. Learn how invoice redirection works and how to verify before paying.",
      fr: "Les escrocs interceptent ou imitent de vraies factures et remplacent les coordonnées bancaires. Signes d’alerte et vérifications à faire avant de payer.",
    },
    summary: {
      en: "Invoice redirection fraud convinces a business to pay a genuine-looking bill into a criminal’s account. It targets accounts payable teams, managers and SMEs alike. This guide shows how the switch is performed and the checks that stop it.",
      fr: "La fraude par redirection de facture amène une entreprise à régler une facture d’apparence légitime sur le compte d’un escroc. Comptables, gérants et PME sont visés. Ce guide explique comment la substitution s’opère et quelles vérifications l’empêchent.",
    },
    what: {
      en: "Invoice and payment redirection fraud is any scheme in which a criminal alters, imitates or intercepts a legitimate invoice so that payment is sent to the wrong account. The bill itself may be real — rent, supplies, services — but the bank details belong to the fraudster, and the loss is often discovered only when the genuine creditor chases the debt.",
      fr: "La fraude par redirection de facture désigne tout stratagème par lequel un escroc modifie, imite ou intercepte une facture légitime afin que le paiement aille sur le mauvais compte. La facture peut être réelle — loyer, fournitures, prestations — mais les coordonnées bancaires sont celles de l’escroc, et la perte n’est souvent découverte que lorsque le vrai créancier réclame son dû.",
    },
    how: {
      en: "The fraudster inserts themselves between you and a real creditor. They compromise a mailbox and resend a genuine invoice with amended bank details; or they write from a look-alike domain, using logos and letterhead copied from the real supplier. Timing follows your payment calendar — month-end, renewals — and the story is plausible: an audit, a bank merger, a changed account. Because the invoice matches what you expected, approval is quick. The fraud surfaces weeks later, when the true creditor asks where the money is.",
      fr: "L’escroc s’intercale entre vous et un vrai créancier. Il compromet une boîte mail et renvoie une facture authentique aux coordonnées modifiées, ou écrit depuis un domaine quasi identique avec logos et papier à en-tête copiés du vrai fournisseur. Le timing suit votre calendrier de paiement — fin de mois, renouvellements — et le prétexte est plausible : audit, fusion bancaire, changement de compte. La facture ressemblant à ce que vous attendiez, la validation est rapide. La fraude apparaît des semaines plus tard, quand le vrai créancier réclame son argent.",
    },
    warningSigns: [
      {
        en: "A known supplier suddenly invoices from a new bank account.",
        fr: "Un fournisseur connu facture soudainement depuis un nouveau compte bancaire.",
      },
      {
        en: "The invoice arrives as an attachment from a slightly different email address.",
        fr: "La facture arrive en pièce jointe depuis une adresse e-mail légèrement différente.",
      },
      {
        en: "Bank details differ from those on file, even by one digit or name.",
        fr: "Les coordonnées bancaires diffèrent de vos fichiers, ne serait-ce d’un chiffre ou d’un nom.",
      },
      {
        en: "The message stresses urgency, secrecy or a “last-minute administrative change”.",
        fr: "Le message insiste sur l’urgence, le secret ou un « changement administratif de dernière minute ».",
      },
      {
        en: "Amounts match expectations exactly, which lowers your guard.",
        fr: "Les montants correspondent exactement à vos attentes, ce qui endort votre vigilance.",
      },
      {
        en: "Phone numbers printed on the invoice are new or unreachable when tested.",
        fr: "Les numéros imprimés sur la facture sont nouveaux ou injoignables quand on les teste.",
      },
      {
        en: "Payment pressure references penalties, contract clauses or imminent delivery stops.",
        fr: "La pression invoque des pénalités, des clauses contractuelles ou un arrêt de livraison imminent.",
      },
    ],
    example: {
      en: "Illustrative example: A Yaoundé law firm expects its annual software licence renewal of 2.4 million FCFA. A convincing “revised invoice” arrives from an address one letter off the vendor’s real domain, citing “a bank migration”. The accounts clerk pays on deadline day. Six weeks later the actual vendor chases the unpaid renewal; the firm discovers both the look-alike domain and the lost funds.",
      fr: "Exemple illustratif : un cabinet d’avocats de Yaoundé attend le renouvellement annuel de sa licence logicielle, 2,4 millions de FCFA. Une « facture révisée » convaincante arrive depuis une adresse différente d’une lettre du vrai domaine, invoquant une « migration bancaire ». La comptable règle le jour de l’échéance. Six semaines plus tard, l’éditeur réclame son impayé ; le cabinet découvre alors le domaine imité et les fonds perdus.",
    },
    protect: [
      {
        en: "Treat any change of bank details as high-risk until verified independently.",
        fr: "Considérez tout changement de coordonnées bancaires comme à haut risque jusqu’à vérification indépendante.",
      },
      {
        en: "Call the supplier on the number already in your records — never one printed on the new invoice.",
        fr: "Appelez le fournisseur au numéro déjà en votre possession, jamais celui imprimé sur la nouvelle facture.",
      },
      {
        en: "Maintain a master file of approved supplier accounts under dual control.",
        fr: "Tenez un fichier des comptes fournisseurs approuvés, sous double contrôle.",
      },
      {
        en: "Check the sender’s full address and domain, character by character.",
        fr: "Vérifiez l’adresse complète de l’expéditeur et son domaine, caractère par caractère.",
      },
      {
        en: "Confirm large or first-time payments out-of-band before releasing funds.",
        fr: "Confirmez les paiements importants ou nouveaux par un autre canal avant de débloquer les fonds.",
      },
      {
        en: "Remind accounts staff that real suppliers rarely change accounts by email alone.",
        fr: "Rappelez aux comptables qu’un vrai fournisseur change rarement de compte par simple e-mail.",
      },
      {
        en: "Log every verified change so patterns and anomalies stay visible.",
        fr: "Consignez chaque changement vérifié afin de repérer les schémas et les anomalies.",
      },
    ],
    ifVictim: [
      {
        en: "Ask your bank immediately to attempt a recall of the transfer.",
        fr: "Demandez immédiatement à votre banque de tenter un rappel du virement.",
      },
      {
        en: "Notify the genuine supplier and the impersonated company without delay.",
        fr: "Avertissez sans tarder le vrai fournisseur et la société dont l’identité a été usurpée.",
      },
      {
        en: "Keep the fraudulent invoice and emails, with full headers, as evidence.",
        fr: "Conservez la facture frauduleuse et les e-mails, en-têtes complets, comme preuves.",
      },
      {
        en: "Review your mailbox security if the fraudster had access to correspondence.",
        fr: "Vérifiez la sécurité de votre boîte mail si l’escroc a eu accès à la correspondance.",
      },
      {
        en: "Report to the police or cybercrime unit and to GLOPROFAS with evidence.",
        fr: "Signalez les faits à la police ou à l’unité de cybercriminalité, ainsi qu’à GLOPROFAS, avec vos preuves.",
      },
    ],
    reportTo: [
      {
        en: "Your bank, via its official hotline or branch, to request an urgent transfer recall.",
        fr: "Votre banque, via sa ligne officielle ou votre agence, pour demander un rappel urgent du virement.",
      },
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon), with the fraudulent emails.",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun), avec les e-mails frauduleux.",
      },
      {
        en: "GLOPROFAS through our online report form, so we can support and document your case.",
        fr: "GLOPROFAS, via notre formulaire de signalement en ligne, pour vous soutenir et documenter votre dossier.",
      },
    ],
    keyTakeaway: {
      en: "A perfect invoice with new bank details is the classic trap. Verification belongs before payment: call the creditor on a number you already had, not one the message provides.",
      fr: "Une facture parfaite avec de nouvelles coordonnées bancaires est le piège classique. Vérifiez avant de payer : appelez le créancier à un numéro que vous possédiez déjà, pas celui du message.",
    },
    relatedSlugs: [
      "business-email-compromise-how-companies-lose-money",
      "supplier-and-procurement-fraud",
      "how-to-recognise-fake-bank-representatives",
    ],
    checklistSlug: "bec-prevention",
    references: [
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
      { label: "ScamShield Singapore", url: "https://www.scamshield.gov.sg/" },
      { label: "Cameroon ANTIC", url: "https://www.antic.cm/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-08-28",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* D3 — CEO and executive impersonation scams                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "ceo-and-executive-impersonation-scams",
    categorySlug: "business-fraud",
    title: {
      en: "CEO and Executive Impersonation Scams",
      fr: "Escroqueries par usurpation de dirigeant : le faux patron",
    },
    metaDescription: {
      en: "Fraudsters impersonate CEOs and managers to force urgent, confidential transfers. Learn how fake-boss scams work and the checks that stop them.",
      fr: "Escrocs déguisés en dirigeants pour imposer des transferts urgents et confidentiels. Méthodes du « faux patron » et réflexes qui protègent l’entreprise.",
    },
    summary: {
      en: "Executive impersonation — the “fake boss” scam — targets finance staff with urgent, confidential transfer requests that appear to come from the top. This article explains the psychology and mechanics used, and the simple verification rules that defeat them.",
      fr: "L’usurpation de dirigeant — l’escroquerie du « faux patron » — vise les équipes financières avec des demandes de transfert urgentes et confidentielles semblant venir de la direction. Ce guide en explique la psychologie, les mécanismes et les règles de vérification qui les déjouent.",
    },
    what: {
      en: "A CEO or executive impersonation scam is a fraud where criminals pose as a director, manager or owner — by email, phone, messaging apps or a cloned voice — to pressure an employee into an urgent payment or disclosure of sensitive data. Authority and urgency are the weapons: the request bypasses normal checks because it seems to come from the top.",
      fr: "L’escroquerie par usurpation de dirigeant est une fraude où des criminels se font passer pour un directeur, un gérant ou un propriétaire — par e-mail, téléphone, messagerie ou voix clonée — pour contraindre un salarié à effectuer un paiement urgent ou à divulguer des données sensibles. L’autorité et l’urgence sont les armes : la demande contourne les contrôles habituels parce qu’elle semble venir du sommet.",
    },
    how: {
      en: "The criminal first studies the organisation: names and roles from the company website or LinkedIn, travel schedules from social posts, invoicing rhythms from harvested correspondence. Then comes contact — often late on Friday or before a holiday — as an email from a look-alike executive address or a WhatsApp message from a new “boss” number. The story writes itself: a confidential acquisition, a supplier to save, a customs penalty. The employee is told to keep it secret and act now; compliance would “jeopardise the deal”. Increasingly, a cloned voice on a short call adds realism. The constant is authority plus urgency plus secrecy — three pressures that good procedure is designed to break.",
      fr: "Le criminel étudie d’abord l’organisation : noms et fonctions sur le site de l’entreprise ou LinkedIn, déplacements sur les réseaux sociaux, rythme des factures dans la correspondance collectée. Puis vient le contact — souvent le vendredi soir ou avant un jour férié — par e-mail depuis une adresse imitant celle du dirigeant ou par WhatsApp depuis un nouveau numéro de « patron ». L’histoire s’écrit toute seule : acquisition confidentielle, fournisseur à sauver, pénalité douanière. Le salarié doit garder le secret et agir immédiatement ; un contrôle « compromettrait l’opération ». De plus en plus, une voix clonée lors d’un bref appel renforce l’illusion. La constante : autorité, urgence et secret — trois pressions que une bonne procédure est conçue pour briser.",
    },
    warningSigns: [
      {
        en: "An urgent transfer request arrives from the boss outside working hours.",
        fr: "Une demande de transfert urgente du patron arrive en dehors des heures de travail.",
      },
      {
        en: "The message demands absolute secrecy “until the deal is announced”.",
        fr: "Le message exige un secret absolu « jusqu’à l’annonce de l’opération ».",
      },
      {
        en: "Contact comes from a new number or a slightly misspelt executive address.",
        fr: "Le contact provient d’un nouveau numéro ou d’une adresse de dirigeante légèrement déformée.",
      },
      {
        en: "The reason is a confidential deal that normal channels cannot know about.",
        fr: "Le motif est une affaire confidentielle que les canaux normaux ne peuvent pas connaître.",
      },
      {
        en: "Pressure is applied: deadlines, penalties, or the boss being “unreachable in a meeting”.",
        fr: "La pression s’exerce : délais, pénalités, ou patron « injoignable en réunion ».",
      },
      {
        en: "Video or voice contact is brief, poor quality or refused altogether.",
        fr: "Le contact vidéo ou vocal est bref, de mauvaise qualité ou carrément refusé.",
      },
      {
        en: "You are asked to bypass dual authorisation “just this once”.",
        fr: "On vous demande de passer outre la double autorisation « juste cette fois ».",
      },
    ],
    example: {
      en: "Illustrative example: The accountant of a Douala construction company receives an email, late on a Friday, from an address mimicking the managing director: a confidential land deal needs a 9 million FCFA deposit before Monday, and discretion is essential. A WhatsApp message from a new number, signed “MD”, reinforces the request. A quick call to the director’s known number exposes the fraud — the real MD is at a family gathering.",
      fr: "Exemple illustratif : le comptable d’une entreprise de construction de Douala reçoit un vendredi soir un e-mail d’une adresse imitant celle du directeur général : un terrain confidentiel exige un dépôt de 9 millions de FCFA avant lundi, discrétion obligatoire. Un message WhatsApp d’un numéro inconnu, signé « DG », confirme la demande. Un simple appel au numéro habituel du directeur démasque la fraude : le vrai DG est en famille.",
    },
    protect: [
      {
        en: "Agree a written rule: no payment on the basis of email or chat alone.",
        fr: "Établissez une règle écrite : aucun paiement sur la seule base d’un e-mail ou d’un message.",
      },
      {
        en: "Verify every urgent request by calling the executive back on their known number.",
        fr: "Vérifiez toute demande urgente en rappelant le dirigeant à son numéro habituel.",
      },
      {
        en: "Apply dual authorisation without exception — especially under time pressure.",
        fr: "Appliquez la double autorisation sans exception, surtout sous pression temporelle.",
      },
      {
        en: "Limit public information about your company’s structure and payment routines.",
        fr: "Limitez les informations publiques sur la structure et les routines de paiement de l’entreprise.",
      },
      {
        en: "Register executive domains similar to your own and monitor misspellings.",
        fr: "Enregistrez les domaines proches de ceux de vos dirigeants et surveillez les fautes d’orthographe.",
      },
      {
        en: "Brief staff regularly: any request combining urgency, secrecy and authority is suspect.",
        fr: "Sensibilisez régulièrement les équipes : urgence, secret et autorité réunis = soupçon.",
      },
      {
        en: "Make it explicitly safe for employees to question a director’s instructions.",
        fr: "Assurez explicitement aux salariés qu’ils peuvent questionner les instructions d’un dirigeant.",
      },
    ],
    ifVictim: [
      {
        en: "Contact your bank immediately to request a recall of the transfer.",
        fr: "Contactez immédiatement votre banque pour demander un rappel du virement.",
      },
      {
        en: "Alert the impersonated executive so they can warn other staff.",
        fr: "Avertissez le dirigeant usurpé afin qu’il prévienne les autres salariés.",
      },
      {
        en: "Preserve all messages, including full email headers and phone numbers used.",
        fr: "Conservez tous les messages, y compris les en-têtes complets et les numéros utilisés.",
      },
      {
        en: "Secure the affected accounts, passwords and devices used in the exchange.",
        fr: "Sécurisez les comptes, mots de passe et appareils concernés par l’échange.",
      },
      {
        en: "Report quickly to the police or cybercrime unit and to GLOPROFAS.",
        fr: "Signalez rapidement les faits à la police ou à l’unité de cybercriminalité, ainsi qu’à GLOPROFAS.",
      },
    ],
    reportTo: [
      {
        en: "Your bank via its official channels — immediately, to attempt a transfer recall.",
        fr: "Votre banque via ses canaux officiels, immédiatement, pour tenter un rappel du virement.",
      },
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon).",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun).",
      },
      {
        en: "GLOPROFAS via our online report form, with the messages and numbers involved.",
        fr: "GLOPROFAS via notre formulaire de signalement, avec les messages et numéros concernés.",
      },
    ],
    keyTakeaway: {
      en: "A real executive will never object to a verification call on their known number. Urgency plus secrecy plus authority is the signature of the fake-boss scam — slow it down.",
      fr: "Un vrai dirigeant ne s’offusquera jamais d’un appel de vérification sur son numéro habituel. Urgence, secret et autorité : telle est la signature du faux patron — ralentissez.",
    },
    relatedSlugs: [
      "business-email-compromise-how-companies-lose-money",
      "impersonation-scams-someone-you-trust",
      "artificial-intelligence-and-deepfake-scams",
    ],
    checklistSlug: "bec-prevention",
    references: [
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "Europol", url: "https://www.europol.europa.eu/" },
      { label: "UK National Cyber Security Centre — Cyber Aware", url: "https://www.ncsc.gov.uk/cyberaware" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-09-05",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* D4 — Recruitment and corporate identity fraud                       */
  /* ------------------------------------------------------------------ */
  {
    slug: "recruitment-and-corporate-identity-fraud",
    categorySlug: "business-fraud",
    title: {
      en: "Recruitment and Corporate Identity Fraud",
      fr: "Fraude au recrutement et usurpation d’identité d’entreprise",
    },
    metaDescription: {
      en: "Criminals clone company identities to run fake recruitment and charge fees. How the fraud works, and how to verify employers and candidates.",
      fr: "Escrocs copiant l’identité d’entreprises réelles pour organiser de faux recrutements payants. Comprendre la fraude et vérifier employeurs et candidats.",
    },
    summary: {
      en: "Recruitment and corporate identity fraud borrows the name, logo and reputation of real companies to deceive jobseekers or employers. This guide explains how fake recruitment campaigns and forged professional identities work, and how both sides can verify before trusting.",
      fr: "La fraude au recrutement et à l’identité d’entreprise emprunte nom, logo et réputation de sociétés réelles pour tromper candidats ou employeurs. Ce guide explique le fonctionnement des faux recrutements et des identités professionnelles falsifiées, et comment vérifier avant de faire confiance.",
    },
    what: {
      en: "Recruitment and corporate identity fraud covers two mirror-image scams. In the first, criminals impersonate a genuine employer — cloned website, logo, invented HR managers — to run a fake recruitment ending in “administrative fees”. In the second, a fraudster applies for a real job with forged diplomas or a stolen professional identity, seeking access to money, data or stock.",
      fr: "Cette fraude regroupe deux escroqueries en miroir. Dans la première, des escrocs usurpent un employeur réel — site cloné, logo, faux responsables RH — pour organiser un recrutement factice qui se termine par des « frais de dossier ». Dans la seconde, un fraudeur postule à un vrai emploi avec des diplômes falsifiés ou une identité professionnelle volée, pour accéder à l’argent, aux données ou au stock.",
    },
    how: {
      en: "For fake recruitment, the fraudsters first build the stage: a website copying a real company’s, job adverts on classifieds and social media, and “HR officers” who interview by WhatsApp. The process feels real — shortlisting, questions, congratulations — until the “offer letter” arrives with fees to pay: file processing, medical checks, uniforms or a “registration deposit” into a personal mobile money account. For fake candidates, the build-up is different: impressive CVs, references that cannot be reached, certificates from unfamiliar institutions, and a push to start quickly in roles with access to payments or premises. In both versions the goal is trust — obtained faster than it can be verified.",
      fr: "Pour le faux recrutement, les escrocs montent d’abord le décor : un site copié d’une vraie entreprise, des annonces sur les petites annonces en ligne et les réseaux sociaux, et des « responsables RH » qui font passer les entretiens par WhatsApp. Le processus semble réel — présélection, questions, félicitations — jusqu’à la « lettre d’embauche » assortie de frais : dossier, visite médicale, uniformes ou « acompte d’inscription » versé sur un compte de mobile money personnel. Pour les faux candidats, la préparation diffère : CV flatteurs, références injoignables, certificats d’établissements inconnus, et une pression pour démarrer vite sur des postes donnant accès aux paiements ou aux locaux. Dans les deux cas, l’objectif est la confiance, obtenue plus vite qu’elle ne peut être vérifiée.",
    },
    warningSigns: [
      {
        en: "A recruitment requires payment for tests, files, uniforms or medical checks.",
        fr: "Un recrutement exige un paiement pour tests, dossiers, uniformes ou visites médicales.",
      },
      {
        en: "Interviews happen only by chat, with no verifiable company number or office.",
        fr: "Les entretiens se tiennent uniquement par messagerie, sans numéro ni bureau vérifiables.",
      },
      {
        en: "The “offer” arrives without a serious interview or any face-to-face contact.",
        fr: "L’« offre » arrive sans véritable entretien ni aucun contact en personne.",
      },
      {
        en: "Email addresses use free domains or misspell the real company’s domain.",
        fr: "Les adresses e-mail utilisent des domaines gratuits ou déforment celui de la vraie entreprise.",
      },
      {
        en: "Pressure to accept “immediately” because “several candidates are waiting”.",
        fr: "Pression pour accepter « immédiatement » car « plusieurs candidats attendent ».",
      },
      {
        en: "A candidate’s references and schools are impossible to contact or verify.",
        fr: "Les références et écoles d’un candidat sont impossibles à joindre ou à vérifier.",
      },
      {
        en: "Documents show inconsistent dates, fonts or unfamiliar institutions.",
        fr: "Les documents présentent des dates, polices ou établissements incohérents.",
      },
    ],
    example: {
      en: "Illustrative example: A Yaoundé agribusiness announces ten inspector positions. Weeks later, “recruiters” using its logo and a cloned website run a parallel campaign on social media, interviewing candidates by WhatsApp. Selected applicants are told to pay 85,000 FCFA for “badges and medical clearance” via mobile money. The firm learns of the scam when victims arrive at its gate asking when training starts.",
      fr: "Exemple illustratif : une agro-industrie de Yaoundé publie dix postes d’inspecteur. Des semaines plus tard, des « recruteurs » utilisant son logo et un site cloné mènent une campagne parallèle sur les réseaux sociaux, avec entretiens par WhatsApp. Les candidats retenus doivent verser 85 000 FCFA de « frais de badge et de visite médicale » par mobile money. L’entreprise découvre la fraude quand des victimes se présentent à son portail pour demander la date de la formation.",
    },
    protect: [
      {
        en: "Never pay any fee for a job offer — legitimate employers do not charge candidates.",
        fr: "Ne payez jamais de frais pour une offre d’emploi : les employeurs sérieux ne facturent pas les candidats.",
      },
      {
        en: "Verify vacancies on the company’s official site and through its published contacts.",
        fr: "Vérifiez les offres sur le site officiel de l’entreprise et via ses contacts publiés.",
      },
      {
        en: "Check the exact domain of every recruiter email, character by character.",
        fr: "Contrôlez le domaine exact de chaque e-mail de recruteur, caractère par caractère.",
      },
      {
        en: "Announce your real recruitment channels publicly to limit cloned campaigns.",
        fr: "Annoncez publiquement vos vrais canaux de recrutement pour limiter les campagnes clonées.",
      },
      {
        en: "Contact listed references and schools by phone before hiring senior staff.",
        fr: "Appelez les références et établissements listés avant de recruter un cadre.",
      },
      {
        en: "Request original documents and verify them with the issuing institutions.",
        fr: "Exigez les documents originaux et vérifiez-les auprès des institutions émettrices.",
      },
      {
        en: "Run background checks for roles handling money, data or security.",
        fr: "Menez des enquêtes de moralité pour les postes gérant argent, données ou sécurité.",
      },
    ],
    ifVictim: [
      {
        en: "Stop all payments and break contact with the fake recruiters or candidate.",
        fr: "Interrompez tout paiement et coupez le contact avec les faux recruteurs ou le faux candidat.",
      },
      {
        en: "Warn the genuine company whose identity was cloned, with your evidence.",
        fr: "Avertissez l’entreprise réelle dont l’identité a été copiée, avec vos preuves.",
      },
      {
        en: "Preserve adverts, messages, payment receipts and any “offer letters” received.",
        fr: "Conservez annonces, messages, reçus de paiement et toute « lettre d’embauche » reçue.",
      },
      {
        en: "Ask your mobile money provider about reversing or tracing the payments.",
        fr: "Demandez à votre opérateur de mobile money si les paiements peuvent être annulés ou tracés.",
      },
      {
        en: "Report to the police or cybercrime unit and to GLOPROFAS with your file.",
        fr: "Signalez les faits à la police ou à l’unité de cybercriminalité, ainsi qu’à GLOPROFAS, avec votre dossier.",
      },
    ],
    reportTo: [
      {
        en: "Your bank or mobile money provider through its official app or hotline.",
        fr: "Votre banque ou opérateur de mobile money, via son application ou sa ligne officielle.",
      },
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon).",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun).",
      },
      {
        en: "GLOPROFAS via our online report form — we can help document the impersonation.",
        fr: "GLOPROFAS via notre formulaire de signalement : nous pouvons aider à documenter l’usurpation.",
      },
    ],
    keyTakeaway: {
      en: "Real employers never sell job offers, and real credentials survive checking. If either side asks you to pay first or skip verification, you are looking at fraud.",
      fr: "Un vrai employeur ne vend jamais un poste, et de vrais diplômes supportent la vérification. Si l’on vous demande de payer d’abord ou de sauter les vérifications, c’est une fraude.",
    },
    relatedSlugs: [
      "fake-job-offers-and-employment-scams",
      "how-to-identify-fake-websites-and-online-stores",
      "business-email-compromise-how-companies-lose-money",
    ],
    checklistSlug: "bec-prevention",
    references: [
      { label: "Europol", url: "https://www.europol.europa.eu/" },
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
      { label: "ScamShield Singapore", url: "https://www.scamshield.gov.sg/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-09-14",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* D5 — Supplier and procurement fraud                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "supplier-and-procurement-fraud",
    categorySlug: "business-fraud",
    title: {
      en: "Supplier and Procurement Fraud",
      fr: "Fraude fournisseurs et achats : vérifier avant de payer",
    },
    metaDescription: {
      en: "Fake suppliers, cloned catalogues and inflated invoices drain company money. Learn how procurement fraud works and the checks that keep purchases safe.",
      fr: "Faux fournisseurs, catalogues clonés et factures gonflées vident les caisses. Comprendre ces fraudes et les contrôles qui sécurisent vos commandes.",
    },
    summary: {
      en: "Procurement fraud turns everyday purchasing into loss: fake suppliers who vanish after advance payment, inflated invoices, and goods that never match what was ordered. This guide explains the schemes and the purchasing controls that expose them.",
      fr: "La fraude aux achats transforme les achats ordinaires en pertes : faux fournisseurs disparaissant après l’acompte, factures gonflées, marchandises non conformes. Ce guide présente ces stratagèmes et les contrôles d’achat qui les démasquent.",
    },
    what: {
      en: "Supplier and procurement fraud is any deception in the buying chain: a criminal poses as a credible supplier, an existing supplier inflates or duplicates invoices, or an insider colludes to approve payments for goods never received. It ranges from cloned supplier websites taking advance payments to delivery notes signed for merchandise that was never delivered.",
      fr: "La fraude fournisseurs et achats désigne toute tromperie dans la chaîne d’approvisionnement : un escroc se présente comme fournisseur crédible, un fournisseur réel gonfle ou duplique ses factures, ou un complice interne valide des paiements pour des marchandises jamais livrées — des sites fournisseurs clonés captant des acomptes jusqu’aux bons de livraison signés pour du vide.",
    },
    how: {
      en: "Fake suppliers invest in appearance: professional websites cloned from real traders, WhatsApp catalogues with market prices, and a first small order delivered on time to build confidence. The large order then requires an advance payment into a personal or recently opened account — and delivery never comes. Inside companies, the fraud is quieter: duplicated invoices slip through approval, prices quietly rise above the market, or goods arrive short and delivery notes are signed anyway. Because procurement runs on trust between people who have traded for years, both versions exploit the same weakness — the assumption that familiar habits guarantee honest counterparties.",
      fr: "Les faux fournisseurs investissent dans l’apparence : sites professionnels clonés de vrais négociants, catalogues WhatsApp aux prix du marché, et une première petite commande livrée à temps pour installer la confiance. La grosse commande exige ensuite un acompte sur un compte personnel ou récemment ouvert — et la livraison ne vient jamais. Au sein des entreprises, la fraude est plus discrète : factures dupliquées qui passent la validation, prix qui dérivent au-dessus du marché, ou marchandises manquantes dont on signe pourtant le bon de livraison. Les achats reposant sur la confiance entre partenaires de longue date, les deux versions exploitent la même faille : croire que les habitudes connues garantissent des interlocuteurs honnêtes.",
    },
    warningSigns: [
      {
        en: "A new supplier insists on advance payment before any delivery.",
        fr: "Un nouveau fournisseur exige un acompte avant toute livraison.",
      },
      {
        en: "Prices sit visibly below the market “because of a special arrangement”.",
        fr: "Les prix sont nettement sous le marché « grâce à un arrangement spécial ».",
      },
      {
        en: "Catalogue photos and texts appear copied from another company’s website.",
        fr: "Photos et textes du catalogue semblent copiés du site d’une autre entreprise.",
      },
      {
        en: "Bank details belong to an individual rather than a business account.",
        fr: "Les coordonnées bancaires relèvent d’un particulier et non d’un compte professionnel.",
      },
      {
        en: "The same invoice is submitted twice with slight differences.",
        fr: "La même facture est présentée deux fois avec de légères différences.",
      },
      {
        en: "Deliveries arrive short, late or substituted, but notes get signed anyway.",
        fr: "Les livraisons sont incomplètes, tardives ou substituées, mais les bons sont signés quand même.",
      },
      {
        en: "One staff member defends a supplier and resists comparison or audits.",
        fr: "Un salarié défend un fournisseur et s’oppose à toute comparaison ou audit.",
      },
    ],
    example: {
      en: "Illustrative example: A construction company in Douala needs steel for a site deadline. A “distributor” found through social media quotes an attractive price, delivers a small trial order promptly, then requests a 70 percent advance for the main batch. The company transfers 12 million FCFA; the phone numbers go quiet and the WhatsApp catalogue disappears. Only later does a search reveal the photos were lifted from a genuine importer.",
      fr: "Exemple illustratif : une entreprise de construction de Douala cherche de l’acier pour tenir un délai de chantier. Un « distributeur » trouvé sur les réseaux sociaux propose un prix attractif, livre rapidement une petite commande test, puis demande un acompte de 70 pour cent pour le lot principal. L’entreprise vire 12 millions de FCFA ; les numéros deviennent muets et le catalogue WhatsApp disparaît. Une recherche révèlera plus tard que les photos étaient copiées d’un vrai importateur.",
    },
    protect: [
      {
        en: "Verify new suppliers: trade register, physical address, references you can call.",
        fr: "Vérifiez les nouveaux fournisseurs : registre du commerce, adresse physique, références appelables.",
      },
      {
        en: "Compare quotes from several independent suppliers before committing large amounts.",
        fr: "Comparez les devis de plusieurs fournisseurs indépendants avant d’engager des montants importants.",
      },
      {
        en: "Reverse-search catalogue images to detect copies from genuine companies.",
        fr: "Faites une recherche inversée des images du catalogue pour repérer les copies d’entreprises réelles.",
      },
      {
        en: "Prefer verified business accounts; treat personal accounts as a red flag.",
        fr: "Privilégiez les comptes professionnels vérifiés ; les comptes personnels sont un signal d’alarme.",
      },
      {
        en: "Limit advance payments; use staged payments against delivery milestones.",
        fr: "Limitez les acomptes ; payez par étapes selon les jalons de livraison.",
      },
      {
        en: "Check deliveries against orders before signing any delivery note.",
        fr: "Contrôlez les livraisons par rapport aux commandes avant de signer le bon.",
      },
      {
        en: "Rotate and audit staff in purchasing roles; review supplier performance annually.",
        fr: "Faites tourner et auditez le personnel des achats ; examinez chaque année la performance des fournisseurs.",
      },
    ],
    ifVictim: [
      {
        en: "Ask your bank to attempt a recall if the transfer was recent.",
        fr: "Demandez à votre banque de tenter un rappel si le virement est récent.",
      },
      {
        en: "Gather all documentation: quotes, messages, invoices, proof of payment.",
        fr: "Rassemblez toute la documentation : devis, messages, factures, preuves de paiement.",
      },
      {
        en: "Report the fake supplier to the platform where you found them.",
        fr: "Signalez le faux fournisseur à la plateforme où vous l’avez trouvé.",
      },
      {
        en: "Alert trade associations or peers so other buyers are warned.",
        fr: "Alertez les associations professionnelles ou vos pairs pour avertir d’autres acheteurs.",
      },
      {
        en: "Report to the police or cybercrime unit and to GLOPROFAS with evidence.",
        fr: "Signalez les faits à la police ou à l’unité de cybercriminalité, ainsi qu’à GLOPROFAS, avec vos preuves.",
      },
    ],
    reportTo: [
      {
        en: "Your bank through its official channels to attempt recovery of funds.",
        fr: "Votre banque, via ses canaux officiels, pour tenter de récupérer les fonds.",
      },
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon), with documentation.",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun), avec la documentation.",
      },
      {
        en: "GLOPROFAS via our online report form — we can advise and help document the case.",
        fr: "GLOPROFAS via notre formulaire de signalement : nous pouvons conseiller et aider à documenter le dossier.",
      },
    ],
    keyTakeaway: {
      en: "An exceptional price plus a demand for advance payment is the classic procurement trap. Verify the counterparty independently, pay in stages, and check what you sign for.",
      fr: "Un prix exceptionnel assorti d’une demande d’acompte : voilà le piège classique des achats. Vérifiez le fournisseur par des voies indépendantes, payez par étapes et contrôlez ce que vous signez.",
    },
    relatedSlugs: [
      "invoice-and-payment-redirection-fraud",
      "business-email-compromise-how-companies-lose-money",
      "how-to-identify-fake-websites-and-online-stores",
    ],
    checklistSlug: "bec-prevention",
    references: [
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "Ghana Cyber Security Authority", url: "https://www.csa.gov.gh/" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-09-25",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* D6 — Fake investment opportunities targeting businesses             */
  /* ------------------------------------------------------------------ */
  {
    slug: "fake-investment-opportunities-targeting-businesses",
    categorySlug: "business-fraud",
    title: {
      en: "Fake Investment Opportunities Targeting Businesses",
      fr: "Fausses opportunités d’investissement visant les entreprises",
    },
    metaDescription: {
      en: "Fraudsters target business owners with fake bonds, contract finance and crypto schemes. Learn to verify any investment before company money moves.",
      fr: "Escrocs ciblant les dirigeants : obligations, financements et cryptos « garantis ». Vérifiez tout placement avant d’engager les fonds de l’entreprise.",
    },
    summary: {
      en: "Business owners are attractive targets for investment fraud: spare cash, time pressure and appetite for growth. This guide explains the fake schemes pitched to companies — bonds, contract finance, crypto funds — and how to verify before money leaves the account.",
      fr: "Les dirigeants sont des cibles prisées des escrocs à l’investissement : trésorerie disponible, pression du temps, appétit de croissance. Ce guide décrit les schémas vendus aux entreprises — obligations, financement de contrats, fonds crypto — et comment vérifier avant tout décaissement.",
    },
    what: {
      en: "Fake investment opportunities targeting businesses are schemes pitched to owners and managers as a way to grow idle cash or finance contracts: “treasury bonds” sold at a discount, guaranteed crypto arbitrage, or advance fees to unlock a lucrative public contract. What distinguishes them from legitimate finance is fabrication — the instrument, the counterparty or the return does not exist.",
      fr: "Les fausses opportunités d’investissement visant les entreprises sont des offres présentées aux dirigeants comme un moyen de faire fructuer la trésorerie ou de financer des contrats : « obligations » vendues à prix réduit, arbitrage crypto « garanti », ou frais d’avance pour débloquer un juteux marché public. Ce qui les distingue de la finance légitime, c’est la fabrication : l’instrument, le cocontractant ou le rendement n’existe pas.",
    },
    how: {
      en: "The pitch always fits a business need. A “portfolio manager” offers treasury products returning far more than any deposit; a “contract broker” says a government contract awaits once a registration fee is paid; a crypto “liquidity pool” promises daily gains on company funds. Documents look professional, with plausible terminology and fake registration numbers, and early small payouts build confidence. The request then bypasses your bank: transfer to a personal account, or buy crypto and send it. When returns fail to appear, fees continue — taxes, release charges — until the money runs out.",
      fr: "Le discours épouse toujours un besoin de l’entreprise. Un « gestionnaire de portefeuille » propose des produits de trésorerie rapportant bien plus qu’un dépôt ; un « courtier en contrats » annonce qu’un marché public vous attend dès qu’une taxe d’enregistrement est payée ; une « pool de liquidités » crypto promet des gains quotidiens sur les fonds de la société. Les documents semblent professionnels, avec terminology plausible et faux numéros d’enregistrement, et de premiers petits versements installent la confiance. La demande contourne ensuite votre banque : virement sur un compte personnel, ou achat de cryptos à transférer. Quand les rendements tardent, les frais continuent — taxes, déblocages — jusqu’à épuisement de la trésorerie.",
    },
    warningSigns: [
      {
        en: "Returns are “guaranteed”, fixed or far above normal market rates.",
        fr: "Les rendements sont « garantis », fixes ou très au-dessus des taux normaux du marché.",
      },
      {
        en: "A public contract requires an advance “registration” or facilitation fee.",
        fr: "Un marché public exige des « frais d’enregistrement » ou de facilitation payables d’avance.",
      },
      {
        en: "Documents cite regulators or registration numbers that cannot be confirmed.",
        fr: "Les documents citent des régulateurs ou numéros d’enregistrement impossibles à confirmer.",
      },
      {
        en: "You are pushed to move money to personal accounts or crypto wallets.",
        fr: "On vous pousse à virer l’argent vers des comptes personnels ou des portefeuilles crypto.",
      },
      {
        en: "Allocation is “limited” and the closing date is imminent.",
        fr: "L’allocation est « limitée » et la clôture est imminente.",
      },
      {
        en: "Early small payouts arrive to encourage a much larger commitment.",
        fr: "De premiers petits versements arrivent pour pousser à un engagement bien plus lourd.",
      },
      {
        en: "The counterparty avoids meetings, video calls or written contracts.",
        fr: "Le cocontractant fuit les rencontres, appels vidéo et contrats écrits.",
      },
    ],
    example: {
      en: "Illustrative example: The owner of a Douala logistics SME is offered “treasury bonds” by a self-described portfolio manager: 15 percent quarterly, “risk-free”, funds released on demand. After a 5 million FCFA “activation fee”, the dashboard shows impressive paper gains. Withdrawal requests trigger new charges — “tax clearance”, then “transfer authorisation”. Banks and the regulator’s public list confirm no such institution exists.",
      fr: "Exemple illustratif : la dirigeante d’une PME de logistique de Douala se voit proposer des « obligations du Trésor » par un soi-disant gestionnaire de portefeuille : 15 pour cent trimestriel, « sans risque », fonds disponibles à la demande. Après des « frais d’activation » de 5 millions de FCFA, le tableau de bord affiche d’imposants gains virtuels. Chaque retrait déclenche de nouveaux frais — « régularisation fiscale », puis « autorisation de virement ». Les banques et la liste publique du régulateur confirment qu’un tel établissement n’existe pas.",
    },
    protect: [
      {
        en: "Verify any institution against the regulator’s official public list before investing.",
        fr: "Vérifiez tout établissement auprès de la liste publique officielle du régulateur avant d’investir.",
      },
      {
        en: "Treat “guaranteed” high returns as a defining sign of fraud, not quality.",
        fr: "Considérez les rendements élevés « garantis » comme un signe de fraude, pas de qualité.",
      },
      {
        en: "Ask your own bank to review the offer — an independent second opinion.",
        fr: "Demandez à votre banque d’examiner l’offre : un second avis indépendant.",
      },
      {
        en: "Never pay advance fees to “unlock” contracts, prizes or investment exits.",
        fr: "Ne payez jamais de frais d’avance pour « débloquer » contrats, lots ou sorties d’investissement.",
      },
      {
        en: "Insist on audited identities: registered company, licence number, physical offices.",
        fr: "Exigez des identités vérifiables : société enregistrée, numéro de licence, bureaux physiques.",
      },
      {
        en: "Keep company investments inside regulated accounts, not personal wallets.",
        fr: "Gardez les placements de l’entreprise dans des comptes réglementés, pas des portefeuilles personnels.",
      },
      {
        en: "Make large commitments collective: board or partner approval, not one signature.",
        fr: "Rendez les engagements importants collectifs : approbation du conseil ou des associés, pas une seule signature.",
      },
    ],
    ifVictim: [
      {
        en: "Stop all further payments — “release fees” are part of the scam.",
        fr: "Cessez tout paiement : les « frais de déblocage » font partie de l’arnaque.",
      },
      {
        en: "Ask your bank to attempt a transfer recall and flag the receiving accounts.",
        fr: "Demandez à votre banque un rappel de virement et le signalement des comptes récepteurs.",
      },
      {
        en: "If crypto was sent, report the wallet addresses to the platform and police.",
        fr: "Si des cryptos ont été envoyées, signalez les adresses des portefeuilles à la plateforme et à la police.",
      },
      {
        en: "Preserve all documents, dashboards, messages and payment records.",
        fr: "Conservez tous les documents, tableaux de bord, messages et relevés de paiement.",
      },
      {
        en: "Report to the police or cybercrime unit and to GLOPROFAS promptly.",
        fr: "Signalez rapidement les faits à la police ou à l’unité de cybercriminalité, ainsi qu’à GLOPROFAS.",
      },
    ],
    reportTo: [
      {
        en: "Your bank through its official channels, to attempt recovery and flag accounts.",
        fr: "Votre banque, via ses canaux officiels, pour tenter une récupération et signaler les comptes.",
      },
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon).",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun).",
      },
      {
        en: "GLOPROFAS via our online report form, with all documents and transaction records.",
        fr: "GLOPROFAS via notre formulaire de signalement, avec tous les documents et relevés de transactions.",
      },
    ],
    keyTakeaway: {
      en: "No genuine investment needs an advance fee to release your own money, and none guarantees high returns. Verify the licence, involve your bank, and never invest company funds in haste.",
      fr: "Aucun placement sérieux n’exige de frais d’avance pour restituer votre argent, et aucun ne garantit des rendements élevés. Vérifiez la licence, impliquez votre banque et n’investissez jamais dans la précipitation.",
    },
    relatedSlugs: [
      "investment-scams-and-ponzi-schemes",
      "cryptocurrency-and-digital-asset-scams",
      "business-email-compromise-how-companies-lose-money",
    ],
    checklistSlug: "investment-verification",
    references: [
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "Europol", url: "https://www.europol.europa.eu/" },
      { label: "Ghana Cyber Security Authority", url: "https://www.csa.gov.gh/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-10-03",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* E7 — Artificial intelligence and deepfake scams                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "artificial-intelligence-and-deepfake-scams",
    categorySlug: "emerging-specialised",
    title: {
      en: "Artificial Intelligence and Deepfake Scams",
      fr: "Escroqueries par intelligence artificielle et deepfakes",
    },
    metaDescription: {
      en: "AI clones voices and faces to impersonate relatives and executives in urgent calls. Learn how deepfake scams work and the checks that stop them.",
      fr: "L’IA clone voix et visages pour se faire passer pour un proche ou un dirigeant. Comprendre les deepfakes et les réflexes qui permettent de les déjouer.",
    },
    summary: {
      en: "Artificial intelligence now clones voices from seconds of audio and faces from a few photos. Criminals use this to make “emergency” calls from family members or video instructions from executives. This guide explains the technology and the verification habits that still defeat it.",
      fr: "L’intelligence artificielle clone désormais une voix à partir de quelques secondes d’audio, un visage à partir de quelques photos. Les escrocs s’en servent pour des appels « d’urgence » d’un proche ou des instructions vidéo d’un dirigeant. Ce guide explique la technologie et les réflexes qui la déjouent.",
    },
    what: {
      en: "Deepfake scams use artificial intelligence to fabricate voices, faces or entire video calls. A criminal harvests a few seconds of someone’s voice — from a video, a voice note or a brief call — then uses AI tools to say anything in that voice, or to place a photorealistic face into a live call and impersonate the victim’s relative, colleague or boss.",
      fr: "Les escroqueries par deepfake utilisent l’intelligence artificielle pour fabriquer des voix, des visages ou des appels vidéo entiers. L’escroc prélève quelques secondes de voix — vidéo, note vocale ou bref appel — puis fait dire n’importe quoi à cette voix, ou insère un visage ultra-réaliste dans un appel en direct pour se faire passer pour un proche, un collègue ou un patron de la victime.",
    },
    how: {
      en: "The typical attack is a phone call that sounds exactly like a relative in distress: an accident, an arrest, a hospital bill — pay now, tell nobody. The corporate version has a “director” joining a video meeting with a convincing face, or a voice note authorising an urgent transfer. Fabrication needs only a small sample: a voice cloned from a public video, a face from social media. Every deepfake scam still relies on urgency, secrecy and a payment channel the criminal controls — so the old rule survives the new technology: hang up and call back on a number you already had, and agree a family or company code word for emergencies.",
      fr: "L’attaque type est un appel téléphonique qui ressemble exactement à un proche en détresse : accident, arrestation, facture d’hôpital — payez tout de suite, n’en parlez à personne. La version corporate met un « directeur » en visio avec un visage convaincant, ou une note vocale autorisant un virement urgent. La fabrication n’exige qu’un petit échantillon : une voix clonée depuis une vidéo publique, un visage issu des réseaux sociaux. Toute escroquerie par deepfake repose encore sur l’urgence, le secret et un canal de paiement contrôlé par l’escroc — aussi la vieille règle survit-elle à la nouvelle technologie : raccrochez et rappelez à un numéro que vous aviez déjà, et convenez d’un mot de code familial ou d’entreprise pour les urgences.",
    },
    warningSigns: [
      {
        en: "A caller’s voice is right, but the line is bad and the story urgent.",
        fr: "La voix de l’appelant est la bonne, mais la ligne est mauvaise et le récit urgent.",
      },
      {
        en: "The “relative” begs you not to tell parents, spouses or colleagues.",
        fr: "Le « proche » vous supplie de n’avertir ni parents, ni conjoint, ni collègues.",
      },
      {
        en: "Payment is demanded immediately, by mobile money, crypto or gift cards.",
        fr: "Le paiement est exigé immédiatement, par mobile money, crypto ou cartes cadeaux.",
      },
      {
        en: "A video caller’s lips and voice seem slightly out of sync.",
        fr: "Sur un appel vidéo, les lèvres et la voix semblent légèrement désynchronisées.",
      },
      {
        en: "The “executive” on a call refuses questions or repeats the same phrases.",
        fr: "Le « dirigeant » en appel refuse les questions ou répète les mêmes phrases.",
      },
      {
        en: "Contact comes from a new number or account “because the phone was lost”.",
        fr: "Le contact vient d’un nouveau numéro ou compte « parce que le téléphone a été perdu ».",
      },
      {
        en: "You are warned that verifying will have “serious consequences” for the person.",
        fr: "On vous avertit que vérifier aura des « conséquences graves » pour la personne.",
      },
    ],
    example: {
      en: "Illustrative example: A finance officer in Douala answers a call that sounds exactly like the company’s founder: he is in police trouble after an accident, needs 3 million FCFA immediately for a settlement, and begs her to tell no one. The line crackles and the call is brief. She hangs up and calls the founder’s usual number: he is at his desk. The voice she heard was a clone built from his conference videos.",
      fr: "Exemple illustratif : une responsable financière de Douala répond à un appel identique à la voix du fondateur de l’entreprise : un accident l’a mis dans une situation délicate avec la police, il lui faut immédiatement 3 millions de FCFA et il la supplie de n’en parler à personne. La ligne grésille, l’appel est bref. Elle raccroche et compose le numéro habituel du fondateur : il est à son bureau. La voix entendue était un clone bâti à partir de ses vidéos de conférences.",
    },
    protect: [
      {
        en: "Agree a family or team code word that a genuine caller will know.",
        fr: "Convenez d’un mot de code familial ou d’équipe qu’un vrai appelant connaîtra.",
      },
      {
        en: "Hang up and call back on the number you already have for that person.",
        fr: "Raccrochez et rappelez au numéro que vous avez déjà pour cette personne.",
      },
      {
        en: "Question the caller about shared memories only the real person would know.",
        fr: "Interrogez l’appelant sur des souvenirs communs que seul le vrai connaîtrait.",
      },
      {
        en: "Treat “do not tell anyone” as the loudest alarm bell in any call.",
        fr: "Considérez « n’en parle à personne » comme la sonnette d’alarme la plus forte.",
      },
      {
        en: "Restrict public videos and voice notes that give away voice samples.",
        fr: "Limitez les vidéos et notes vocales publiques qui livrent des échantillons de voix.",
      },
      {
        en: "Apply dual authorisation for transfers, whatever the apparent authority.",
        fr: "Appliquez la double autorisation des virements, quelle que soit l’autorité affichée.",
      },
      {
        en: "Ask video callers to turn sideways, wave or answer live questions.",
        fr: "Demandez aux appelants vidéo de tourner la tête, de saluer ou de répondre en direct.",
      },
    ],
    ifVictim: [
      {
        en: "Stop payment attempts immediately and call the real person to confirm.",
        fr: "Interrompez aussitôt tout paiement et appelez la vraie personne pour confirmer.",
      },
      {
        en: "Ask your bank or mobile money provider to attempt a recall right away.",
        fr: "Demandez immédiatement à votre banque ou opérateur de tenter un rappel.",
      },
      {
        en: "Preserve the call recording, number, messages and any transfer receipts.",
        fr: "Conservez l’enregistrement de l’appel, le numéro, les messages et les reçus de virement.",
      },
      {
        en: "Report quickly to the police or cybercrime unit — voice evidence matters.",
        fr: "Signalez rapidement à la police ou à l’unité de cybercriminalité : les preuves vocales comptent.",
      },
      {
        en: "Alert family members or colleagues so the same trick cannot be repeated.",
        fr: "Avertissez proches ou collègues afin que la même ruse ne se répète pas.",
      },
    ],
    reportTo: [
      {
        en: "Your bank or mobile money provider through its official hotline — immediately.",
        fr: "Votre banque ou opérateur de mobile money via sa ligne officielle, immédiatement.",
      },
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon), with recordings.",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun), avec les enregistrements.",
      },
      {
        en: "GLOPROFAS via our online report form so we can advise and warn others.",
        fr: "GLOPROFAS via notre formulaire de signalement, pour conseiller et avertir les autres.",
      },
    ],
    keyTakeaway: {
      en: "A perfect voice is no longer proof of identity. Before money or secrets move, hang up and reach the person yourself through a channel you chose.",
      fr: "Une voix parfaite n’est plus une preuve d’identité. Avant que l’argent ou les secrets ne circulent, raccrochez et joignez vous-même la personne par un canal que vous avez choisi.",
    },
    relatedSlugs: [
      "impersonation-scams-someone-you-trust",
      "family-emergency-and-grandparent-scams",
      "ceo-and-executive-impersonation-scams",
    ],
    checklistSlug: "general-scam-prevention",
    references: [
      { label: "Europol", url: "https://www.europol.europa.eu/" },
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "UK National Cyber Security Centre — Cyber Aware", url: "https://www.ncsc.gov.uk/cyberaware" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-10-12",
    updatedAt: "2026-11-20",
    featured: true,
    popular: true,
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* E8 — Identity theft and personal data exploitation                  */
  /* ------------------------------------------------------------------ */
  {
    slug: "identity-theft-and-personal-data-exploitation",
    categorySlug: "emerging-specialised",
    title: {
      en: "Identity Theft and Personal Data Exploitation",
      fr: "Vol d’identité et exploitation des données personnelles",
    },
    metaDescription: {
      en: "Stolen IDs, SIM swaps and leaked data let criminals open accounts and loans in your name. How identity theft happens and how to contain it.",
      fr: "Pièces volées, SIM swap, fuites de données : des comptes et crédits s’ouvrent à votre nom. Prévention et réaction face au vol d’identité.",
    },
    summary: {
      en: "Identity theft turns stolen documents, numbers and data into money: loans, accounts and purchases in your name. This guide explains how criminals obtain and exploit personal data, the warning signs of misuse, and how to respond quickly.",
      fr: "Le vol d’identité transforme documents, numéros et données volés en argent : crédits, comptes et achats à votre nom. Ce guide explique comment les escrocs obtiennent et exploitent les données personnelles, les signes d’usage frauduleux et la conduite à tenir.",
    },
    what: {
      en: "Identity theft is the unauthorised use of your personal information — national ID, passport, tax number, passwords, photos or date of birth — to impersonate you for profit. Criminals use stolen credentials to open mobile money and bank accounts, take out loans, register companies, defraud your contacts, or cross borders, leaving debts and legal problems that surface in your name.",
      fr: "Le vol d’identité est l’utilisation non autorisée de vos informations personnelles — pièce d’identité, passeport, numéro fiscal, mots de passe, photos, date de naissance — pour se faire passer pour vous à des fins lucratives. Les escrocs ouvrent des comptes de mobile money ou bancaires, souscrivent des crédits, immatriculent des sociétés, abusent de vos contacts ou franchissent des frontières, laissant dettes et ennuis juridiques à votre nom.",
    },
    how: {
      en: "The raw material comes from everyday leaks: a wallet lost in a taxi, document photos sent to “verifiers”, phishing forms, oversharing on social media, or discarded papers. A single ID card can anchor a fabricated life: a SIM registered in your name, a mobile money account opened with your photo, then micro-loans and purchases left unpaid. SIM-swap attacks extend the reach — your number moves to the criminal’s phone, intercepting the one-time codes that unlock banking and email. Victims often discover the damage indirectly: debt-recovery messages, a loan refusal, or a contact asking why you are requesting money. Early detection and documented complaints limit the harm.",
      fr: "La matière première vient des fuites du quotidien : un sac perdu dans un taxi, des photos de documents envoyées à de « vérificateurs », des formulaires d’hameçonnage, le partage excessif sur les réseaux sociaux ou des papiers jetés. Une seule pièce d’identité peut ancrer une vie fabriquée : une SIM enregistrée à votre nom, un compte de mobile money ouvert avec votre photo, puis des microcrédits et des achats impayés. Les attaques par SIM swap prolongent la portée : votre numéro migre vers le téléphone de l’escroc, interceptant les codes à usage unique qui protègent banque et e-mail. Les victimes découvrent souvent les dégâts indirectement : messages de recouvrement, refus de crédit, ou un contact qui demande pourquoi vous réclamez de l’argent. Une détection précoce et des plaintes documentées limitent le préjudice.",
    },
    warningSigns: [
      {
        en: "You receive codes, alerts or confirmations for accounts you never opened.",
        fr: "Vous recevez codes, alertes ou confirmations pour des comptes jamais ouverts.",
      },
      {
        en: "Debt-recovery messages or loan refusals mention obligations you never took.",
        fr: "Des messages de recouvrement ou refus de crédit évoquent des engagements jamais souscrits.",
      },
      {
        en: "Your phone shows “no signal” despite good coverage — possible SIM swap.",
        fr: "Votre téléphone affiche « aucun réseau » malgré une bonne couverture : SIM swap possible.",
      },
      {
        en: "Contacts say you asked them for money, which you never did.",
        fr: "Des proches affirment que vous leur avez demandé de l’argent, ce qui est faux.",
      },
      {
        en: "Mail or SMS about accounts, loans or deliveries you do not recognise.",
        fr: "Courriels ou SMS concernant des comptes, crédits ou livraisons que vous ne reconnaissez pas.",
      },
      {
        en: "Your email reports logins from places you have never visited.",
        fr: "Votre messagerie signale des connexions depuis des lieux jamais visités.",
      },
      {
        en: "A copy of your ID appears in transactions you know nothing about.",
        fr: "Une copie de votre pièce d’identité apparaît dans des transactions qui vous sont inconnues.",
      },
    ],
    example: {
      en: "Illustrative example: Ngono, a nurse in Bafoussam, loses her handbag in a shared taxi. Three weeks later she receives SMS about a micro-loan she never took, and a shop in Douala demands payment for a phone bought with a copy of her ID. A mobile money account she never opened had been used in between. She files a police report the same day and disputes each account in writing.",
      fr: "Exemple illustratif : Ngono, infirmière à Bafoussam, perd son sac dans un taxi partagé. Trois semaines plus tard, elle reçoit des SMS au sujet d’un microcrédit jamais souscrit, et une boutique de Douala réclame le paiement d’un téléphone acheté avec une copie de sa pièce d’identité. Un compte de mobile money qu’elle n’avait jamais ouvert a servi d’intermédiaire. Elle dépose plainte le jour même et conteste chaque compte par écrit.",
    },
    protect: [
      {
        en: "Store identity documents securely and share copies only when legally required.",
        fr: "Conservez les pièces d’identité en sécurité et ne fournissez de copies qu’en cas d’obligation légale.",
      },
      {
        en: "Never send ID photos to unverified “employers”, “lenders” or “agents”.",
        fr: "N’envoyez jamais de photos de pièces à des « employeurs », « prêteurs » ou « agents » non vérifiés.",
      },
      {
        en: "Use strong, unique passwords and multi-factor authentication on key accounts.",
        fr: "Utilisez des mots de passe robustes et uniques avec authentification multifacteur sur les comptes clés.",
      },
      {
        en: "Limit personal data on social media: documents, tickets, addresses, routines.",
        fr: "Limitez les données personnelles en ligne : documents, billets, adresses, habitudes.",
      },
      {
        en: "Check your statements, credit notifications and account alerts regularly.",
        fr: "Consultez régulièrement vos relevés, notifications de crédit et alertes de compte.",
      },
      {
        en: "Ask your operator about a SIM-swap code or port-freeze option.",
        fr: "Renseignez-vous auprès de votre opérateur sur un code SIM swap ou le gel du portage.",
      },
      {
        en: "Destroy documents bearing personal data before discarding them.",
        fr: "Détruisez les documents portant des données personnelles avant de les jeter.",
      },
    ],
    ifVictim: [
      {
        en: "Report to the police immediately and keep the stamped complaint.",
        fr: "Signalez immédiatement à la police et conservez la plainte tamponnée.",
      },
      {
        en: "Notify your bank, mobile money operator and any implicated lender in writing.",
        fr: "Avertissez par écrit votre banque, votre opérateur et tout prêteur impliqué.",
      },
      {
        en: "Ask operators to block or freeze accounts opened fraudulently in your name.",
        fr: "Demandez aux opérateurs de bloquer les comptes ouverts frauduleusement à votre nom.",
      },
      {
        en: "Change passwords and PINs for email, banking and social media.",
        fr: "Changez les mots de passe et codes de la messagerie, de la banque et des réseaux sociaux.",
      },
      {
        en: "Dispute debts in writing, enclosing the police report, and keep copies.",
        fr: "Contestez les dettes par écrit en joignant la plainte, et gardez des copies.",
      },
      {
        en: "Tell close contacts your identity may be misused, so they can verify requests.",
        fr: "Prévenez vos proches que votre identité peut être détournée, pour qu’ils vérifient les demandes.",
      },
    ],
    reportTo: [
      {
        en: "Your bank and mobile money operator via their official hotlines and branches.",
        fr: "Votre banque et votre opérateur de mobile money via leurs lignes officielles et agences.",
      },
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon) — insist on a written report.",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun) ; exigez un procès-verbal.",
      },
      {
        en: "GLOPROFAS via our online report form so we can advise on containing the damage.",
        fr: "GLOPROFAS via notre formulaire de signalement, pour être conseillé sur la limitation des dégâts.",
      },
    ],
    keyTakeaway: {
      en: "Your identity is an asset: guard documents, codes and data as carefully as cash. If misused, act the same day — reports, written disputes and quick freezes limit the damage.",
      fr: "Votre identité est un actif : protégez documents, codes et données comme votre argent. En cas d’abus, agissez le jour même — plainte, contestations écrites et blocages rapides limitent les dégâts.",
    },
    relatedSlugs: [
      "sim-swap-fraud-hijacked-phone-number",
      "phishing-scams-recognise-fake-emails-messages",
      "artificial-intelligence-and-deepfake-scams",
    ],
    checklistSlug: "identity-theft-prevention",
    references: [
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "Cameroon ANTIC", url: "https://www.antic.cm/" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-10-20",
    updatedAt: "2026-11-20",
    popular: true,
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* E9 — Online extortion and blackmail scams                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "online-extortion-and-blackmail-scams",
    categorySlug: "emerging-specialised",
    title: {
      en: "Online Extortion and Blackmail Scams",
      fr: "Extorsion et chantage en ligne : comprendre et réagir",
    },
    metaDescription: {
      en: "Extortion scams trap people with intimate images or false accusations, then demand money. Dignified, effective responses — and why paying backfires.",
      fr: "Chantage en ligne : images intimes ou fausses accusations, puis exigences d’argent. Des réponses dignes et efficaces, et pourquoi payer aggrave tout.",
    },
    summary: {
      en: "Online extortion uses intimacy, fear or shame to demand money: recorded private moments, fabricated images, or threats to expose harmless information. This guide explains how it works and the response that protects you — no payment, evidence, and support.",
      fr: "L’extorsion en ligne exploite l’intimité, la peur ou la honte pour exiger de l’argent : images enregistrées, photomontages ou menaces de divulgation. Ce guide explique son fonctionnement et la réponse qui protège : ne pas payer, conserver les preuves, chercher du soutien.",
    },
    what: {
      en: "Online extortion — including “sextortion” — is a scam in which criminals threaten to expose intimate images, fabricated material or private information unless you pay. It may involve a real video recorded during a manipulated call, images altered to place you in a compromising scene, or stolen private data. The leverage is fear of exposure; the demand is money, and paying merely funds the next threat.",
      fr: "L’extorsion en ligne — y compris la « sextorsion » — est une escroquerie dans laquelle des criminels menacent de divulguer des images intimes, des photomontages ou des informations privées si vous ne payez pas. Il peut s’agir d’une vraie vidéo enregistrée lors d’un appel piégé, d’images modifiées pour vous placer dans une scène compromettante ou de données volées. Le levier est la peur de l’exposition ; l’exigence est l’argent, et payer ne fait qu’alimenter la menace suivante.",
    },
    how: {
      en: "The criminal first creates false intimacy or authority. An attractive stranger builds rapid romantic contact, moves to a video call, and records intimate moments — or plays a pre-recorded stream while coaxing you on camera. Blackmail follows: pay, or the material goes to family, employer or contacts scraped from your profiles. Some versions need no intimacy at all, just a fabricated image or the claim that “we have your data”. Two facts matter: extortionists are repeat offenders — paying marks you as a payer and invites escalation — and material loses its power once reported, as platforms remove it and police act. If the person depicted or targeted is a minor, report to the police immediately; never face that alone.",
      fr: "L’escroc commence par créer une fausse intimité ou une fausse autorité. Un inconnu séduisant instaure une relation rapide, propose un appel vidéo et enregistre des images intimes — ou diffuse un flux préenregistré tout en vous incitant à vous montrer. Puis vient le chantage : payez, ou les images iront à votre famille, votre employeur ou vos contacts, extraits de vos profils. Certaines variantes n’exigent aucune intimité : un simple photomontage ou l’affirmation « nous avons vos données ». Deux vérités comptent : les extorqueurs sont des récidivistes — payer fait de vous un payeur et invite à l’escalade — et le matériel perd sa puissance dès qu’il est signalé : les plateformes le retirent et la police agit. Si la personne visée est un mineur, signalez immédiatement à la police ; ne restez jamais seul face à cela.",
    },
    warningSigns: [
      {
        en: "A new online contact pushes quickly towards intimate photos or video calls.",
        fr: "Une nouvelle connaissance en ligne pousse vite vers les photos intimes ou l’appel vidéo.",
      },
      {
        en: "Requests suddenly turn to money, gift cards or cryptocurrency transfers.",
        fr: "Les demandes se muent soudain en argent, cartes cadeaux ou transferts de cryptomonnaies.",
      },
      {
        en: "Messages claim material exists that you know was never shared.",
        fr: "Des messages affirment détenir des images que vous savez n’avoir jamais partagées.",
      },
      {
        en: "Deadlines are attached: “pay within hours or it is published”.",
        fr: "Des délais sont imposés : « payez sous quelques heures ou tout est publié ».",
      },
      {
        en: "The person names your contacts, workplace or family to intensify fear.",
        fr: "La personne cite vos contacts, votre employeur ou votre famille pour accentuer la peur.",
      },
      {
        en: "Screenshots arrive “as proof”, often crude composites or brief clips.",
        fr: "Des captures arrivent « en preuve », souvent des montages grossiers ou de brefs extraits.",
      },
      {
        en: "Threats escalate whenever you respond, negotiate or ask for time.",
        fr: "Les menaces s’intensifient dès que vous répondez, négociez ou demandez du temps.",
      },
    ],
    example: {
      en: "Illustrative example: Étienne, a young engineer in Yaoundé, accepts a video call from a new online contact who quickly steers it towards intimacy. Days later she writes: a recording exists, and 300,000 FCFA will stop it reaching his employer and church group. Deeply shaken but clear-headed, he refuses to pay, screenshots everything, blocks the account and reports to the police cybercrime desk the same evening.",
      fr: "Exemple illustratif : Étienne, jeune ingénieur à Yaoundé, accepte un appel vidéo d’une nouvelle connaissance en ligne qui oriente vite l’échange vers l’intime. Quelques jours plus tard, elle lui écrit : un enregistrement existe et 300 000 FCFA éviteront son envoi à son employeur et à son groupe paroissial. Bouleversé mais lucide, il refuse de payer, capture tout, bloque le compte et saisit le service de cybercriminalité de la police le soir même.",
    },
    protect: [
      {
        en: "Never share intimate images, even with people you feel you trust online.",
        fr: "Ne partagez jamais d’images intimes, même avec des personnes en qui vous croyez avoir confiance.",
      },
      {
        en: "Disable or cover your camera when joining calls with strangers.",
        fr: "Désactivez ou couvrez votre caméra lors des appels avec des inconnus.",
      },
      {
        en: "Restrict who can see your contacts, workplace and family on social media.",
        fr: "Restreignez la visibilité de vos contacts, employeur et famille sur les réseaux sociaux.",
      },
      {
        en: "Treat any sudden demand for money as a red flag, whatever the story.",
        fr: "Considérez toute demande d’argent soudaine comme un signal d’alarme, quelle que soit l’histoire.",
      },
      {
        en: "Talk openly with teenagers about extortion tactics and safe reporting paths.",
        fr: "Parlez ouvertement aux adolescents des tactiques d’extorsion et des voies de signalement sûres.",
      },
      {
        en: "Learn your platform’s reporting tools before you ever need them.",
        fr: "Apprenez à utiliser les outils de signalement des plateformes avant d’en avoir besoin.",
      },
    ],
    ifVictim: [
      {
        en: "Do not pay — payment funds the criminal and rarely stops the threats.",
        fr: "Ne payez pas : le paiement finance le criminel et arrête rarement les menaces.",
      },
      {
        en: "Stop responding, but do not delete anything: keep messages, numbers, files.",
        fr: "Cessez de répondre, mais ne supprimez rien : conservez messages, numéros et fichiers.",
      },
      {
        en: "Capture screenshots with dates, usernames and any account details shown.",
        fr: "Prenez des captures avec dates, noms d’utilisateur et détails de compte affichés.",
      },
      {
        en: "Use the platform’s report and block tools on every account involved.",
        fr: "Utilisez les outils de signalement et de blocage de la plateforme sur chaque compte impliqué.",
      },
      {
        en: "Tell one trusted person — isolation is the blackmailer’s strongest ally.",
        fr: "Confiez-vous à une personne de confiance : l’isolement est le meilleur allié du maître chanteur.",
      },
      {
        en: "If a minor is involved in any way, report to the police immediately.",
        fr: "Si un mineur est impliqué de quelque manière, signalez immédiatement à la police.",
      },
    ],
    reportTo: [
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon) — urgently if a minor is involved.",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun), en urgence si un mineur est impliqué.",
      },
      {
        en: "The platform (WhatsApp, Instagram, TikTok and others) through its reporting tools.",
        fr: "La plateforme (WhatsApp, Instagram, TikTok et autres) via ses outils de signalement.",
      },
      {
        en: "GLOPROFAS via our online report form — we treat every report with strict confidentiality.",
        fr: "GLOPROFAS via notre formulaire de signalement : chaque signalement est traité avec une strict confidentialité.",
      },
    ],
    keyTakeaway: {
      en: "Extortion thrives on silence, not on the material itself. Refuse to pay, preserve the evidence, report — and remember: you are the victim of a crime, never the guilty party.",
      fr: "Le chantage prospère sur le silence, non sur les images elles-mêmes. Ne payez pas, conservez les preuves, signalez — et souvenez-vous : vous êtes victime d’un crime, jamais le coupable.",
    },
    relatedSlugs: [
      "romance-scams-recognising-emotional-manipulation",
      "identity-theft-and-personal-data-exploitation",
      "how-to-recognise-and-avoid-online-scams",
    ],
    checklistSlug: "after-being-scammed",
    references: [
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "Europol", url: "https://www.europol.europa.eu/" },
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-10-28",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* E10 — Cryptocurrency recovery and refund scams                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "cryptocurrency-recovery-and-refund-scams",
    categorySlug: "emerging-specialised",
    title: {
      en: "Cryptocurrency Recovery and Refund Scams",
      fr: "Escroqueries à la « récupération » de cryptomonnaies : la double perte",
    },
    metaDescription: {
      en: "Scammers re-target fraud victims with fake «recovery agents» charging advance fees. Learn how crypto recovery scams work and what real recourse exists.",
      fr: "Les escrocs ciblent les victimes déjà fraudées avec de faux « agents de récupération » payés d’avance. Comprendre ces arnaques et les recours réels.",
    },
    summary: {
      en: "After a crypto scam, a second wave often follows: self-styled “recovery agents” who promise to retrieve lost funds for an advance fee. This guide explains how recovery fraud hunts previous victims, and what honest options actually exist.",
      fr: "Après une arnaque aux cryptomonnaies vient souvent une seconde vague : de prétendus « agents de récupération » promettant de retrouver les fonds contre des frais payés d’avance. Ce guide explique comment ces fraudeurs chassent les victimes et quels recours honnêtes existent.",
    },
    what: {
      en: "A cryptocurrency recovery scam is a follow-on fraud that targets people who have already lost money to crypto or investment schemes. The “recovery agent” claims special blockchain-tracking skills or official connections, guarantees a high recovery rate, and asks for an upfront fee — a “gas fee”, “unlocking charge”, commission deposit or legal retainer — then disappears or invents further costs.",
      fr: "L’escroquerie à la « récupération de cryptomonnaies » est une fraude en cascade qui cible les personnes ayant déjà perdu de l’argent dans des schémas crypto ou d’investissement. L’« agent de récupération » invoque des compétences spéciales de traçage blockchain ou des relations officielles, garantit un fort taux de récupération et réclame des frais d’avance — « frais de gaz », « déblocage », dépôt de commission ou provision — puis disparaît ou invente de nouveaux coûts.",
    },
    how: {
      en: "The scheme feeds on visibility: scammers monitor public complaints and comments under fraud-related posts, then reach out unprompted by email or WhatsApp as “blockchain analysts”, “law firms” or “recovery agencies” — sometimes impersonating real regulators with cloned websites. The offer feels targeted because it is: they know which scheme hurt you. The hook is always advance payment, because genuine recoveries — through banks, police, courts or regulated processes — never require paying an unknown online actor first. Once the first fee lands, scripts follow: funds “awaiting release”, then “taxes”, then “account upgrades”. Victims of the first scam are mined for a second.",
      fr: "Le schéma se nourrit de la visibilité : les escrocs surveillent les plaintes publiques et les commentaires sous les publications sur la fraude, puis contactent d’eux-mêmes par e-mail ou WhatsApp en se présentant comme « analystes blockchain », « cabinets d’avocats » ou « agences de récupération » — usurpant parfois de vrais régulateurs avec des sites clonés. L’offre semble ciblée parce qu’elle l’est : ils savent quel schéma vous a nuit. L’hameçon est toujours le paiement d’avance, car les récupérations authentiques — via banques, police, tribunaux ou procédures réglementées — n’exigent jamais de payer d’abord un inconnu en ligne. Dès le premier versement, les scripts s’enchaînent : fonds « en attente de libération », puis « taxes », puis « mises à niveau de compte ». Les victimes de la première arnaque sont exploitées pour une seconde.",
    },
    warningSigns: [
      {
        en: "A “recovery agent” contacts you first — you never searched for them.",
        fr: "Un « agent de récupération » vous contacte d’abord : vous ne l’avez jamais cherché.",
      },
      {
        en: "Recovery is “guaranteed” or described with a precise success rate.",
        fr: "La récupération est « garantie » ou avancée avec un taux de succès précis.",
      },
      {
        en: "Upfront payment is required before any work or result appears.",
        fr: "Un paiement d’avance est exigé avant tout travail ou tout résultat.",
      },
      {
        en: "Payment is demanded in cryptocurrency or to a personal wallet.",
        fr: "Le paiement est exigé en cryptomonnaie ou vers un portefeuille personnel.",
      },
      {
        en: "The “agency” shows cloned websites, forged licences or copied logos.",
        fr: "L’« agence » présente des sites clonés, de fausses licences ou des logos copiés.",
      },
      {
        en: "They discourage you from reporting the original scam to police.",
        fr: "Ils vous dissuadent de signaler l’arnaque initiale à la police.",
      },
      {
        en: "New fees keep appearing: taxes, unlocking, transfers, account upgrades.",
        fr: "De nouveaux frais apparaissent sans cesse : taxes, déblocages, transferts, mises à niveau.",
      },
    ],
    example: {
      en: "Illustrative example: Six months after losing 2 million FCFA to a fake trading platform, a shop owner in Accra receives a WhatsApp message from a “digital assets recovery firm”: his file is “already traced” and 80 percent recoverable for a 15 percent commission, payable in USDT “to activate the recovery chain”. He pays; the “firm” then demands a “blockchain unlock fee”. His bank confirms no legitimate recovery works this way.",
      fr: "Exemple illustratif : six mois après avoir perdu 2 millions de FCFA sur une fausse plateforme de trading, un commerçant d’Accra reçoit un message WhatsApp d’une « société de récupération d’actifs numériques » : son dossier est « déjà tracé » et récupérable à 80 pour cent contre 15 pour cent de commission, payable en USDT « pour activer la chaîne de récupération ». Il paie ; la « société » réclame ensuite des « frais de déblocage blockchain ». Sa banque confirme qu’aucune récupération légitime ne fonctionne ainsi.",
    },
    protect: [
      {
        en: "Assume unsolicited recovery offers are scams — genuine help is never pushed.",
        fr: "Tenez toute offre de récupération non sollicitée pour une arnaque : l’aide sérieuse ne se impose pas.",
      },
      {
        en: "Remember that blockchain transactions are final; no agent can simply reverse them.",
        fr: "Rappelez-vous que les transactions blockchain sont définitives : aucun agent ne peut les annuler.",
      },
      {
        en: "Verify any firm against the financial regulator’s official register.",
        fr: "Vérifiez toute société auprès du registre officiel du régulateur financier.",
      },
      {
        en: "Never pay advance fees, commissions or “unlocking charges” to online strangers.",
        fr: "Ne versez jamais frais d’avance, commissions ou « déblocages » à des inconnus en ligne.",
      },
      {
        en: "Let your bank and the police drive any real recovery process.",
        fr: "Laissez votre banque et la police piloter tout vrai processus de récupération.",
      },
      {
        en: "Be sceptical of testimonials and screenshots — both are easily fabricated.",
        fr: "Méfiez-vous des témoignages et captures d’écran : les deux se fabriquent facilement.",
      },
      {
        en: "Talk to GLOPROFAS or a consumer-protection body before paying anyone.",
        fr: "Consultez GLOPROFAS ou un organisme de protection du consommateur avant de payer.",
      },
    ],
    ifVictim: [
      {
        en: "Stop paying immediately — every additional fee funds the same fraud.",
        fr: "Cessez immédiatement de payer : chaque frais supplémentaire finance la même fraude.",
      },
      {
        en: "Preserve all messages, wallet addresses and receipts from the “agents”.",
        fr: "Conservez tous les messages, adresses de portefeuilles et reçus des « agents ».",
      },
      {
        en: "Report wallet addresses to the exchange or platform involved.",
        fr: "Signalez les adresses des portefeuilles à la plateforme ou à l’échange concerné.",
      },
      {
        en: "Add the new evidence to your original police file — the two scams connect.",
        fr: "Ajoutez les nouvelles preuves à votre plainte initiale : les deux escroqueries sont liées.",
      },
      {
        en: "Warn other victims in the forums or groups where you were approached.",
        fr: "Avertissez les autres victimes dans les forums ou groupes où vous avez été abordé.",
      },
    ],
    reportTo: [
      {
        en: "Your bank and the crypto exchange involved, via their official channels.",
        fr: "Votre banque et l’échange de cryptomonnaies concerné, via leurs canaux officiels.",
      },
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon), adding the new evidence.",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun), en y ajoutant les nouvelles preuves.",
      },
      {
        en: "GLOPROFAS via our online report form — we can help you assess any recovery offer.",
        fr: "GLOPROFAS via notre formulaire de signalement : nous pouvons aider à évaluer toute offre de récupération.",
      },
    ],
    keyTakeaway: {
      en: "Anyone who contacts you promising to recover lost crypto for a fee paid upfront is running the second half of the scam. Real recovery goes through banks, police and regulators — never advance fees.",
      fr: "Quiconque vous contacte en promettant de récupérer vos cryptos contre des frais d’avance exécute la seconde moitié de l’arnaque. La vraie récupération passe par les banques, la police et les régulateurs — jamais par des frais d’avance.",
    },
    relatedSlugs: [
      "cryptocurrency-and-digital-asset-scams",
      "investment-scams-and-ponzi-schemes",
      "fake-customer-support-and-technical-support-scams",
    ],
    checklistSlug: "crypto-scam-prevention",
    references: [
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "Europol", url: "https://www.europol.europa.eu/" },
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* E11 — Fake charity and donation campaigns                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "fake-charity-and-donation-campaigns",
    categorySlug: "emerging-specialised",
    title: {
      en: "Fake Charity and Donation Campaigns",
      fr: "Faux appels aux dons et fausses associations",
    },
    metaDescription: {
      en: "Fraudsters exploit compassion with fake appeals after disasters. Learn to verify charities and donate safely, so your generosity reaches real victims.",
      fr: "Après les catastrophes, des escrocs exploitent la générosité par de faux appels aux dons. Vérifiez les associations avant de donner.",
    },
    summary: {
      en: "Fake charity scams hijack generosity: fabricated causes, stolen photos and urgent appeals that funnel donations to criminals. This guide explains how to spot fraudulent campaigns and verify organisations before your money moves.",
      fr: "Les fausses associations détournent la générosité : causes inventées, photos volées et appels urgents qui dirigent les dons vers des criminels. Ce guide explique comment repérer les campagnes frauduleuses et vérifier les organisations avant de donner.",
    },
    what: {
      en: "A fake charity scam is a fundraising appeal for a cause that does not exist, or that grossly misrepresents where the money goes. Criminals build convincing campaigns — real disaster photos, emotional stories, professional pages — around a personal mobile money number or an unregistered “foundation”, exploiting moments when compassion runs high and verification runs low.",
      fr: "Une fausse association est un appel aux dons pour une cause inexistante, ou qui déforme gravement la destination de l’argent. Les escrocs bâtissent des campagnes convaincantes — photos réelles de catastrophe, récits émouvants, pages soignées — autour d’un numéro de mobile money personnel ou d’une « fondation » non déclarée, en exploitant les moments où la compassion est forte et la vérification rare.",
    },
    how: {
      en: "Timing is the weapon. Within hours of a flood, fire or accident, fraudulent appeals appear on social media and messaging groups: recycled photos of real suffering, a hastily built page, a personal account for “immediate help”. Some campaigns run continuously — sick children, orphanages — with stories copied from genuine organisations; others impersonate real charities or public figures with cloned pages. The collection betrays the fraud: donations to personal accounts, no receipts, no legally named organisation, and pressure to give “right now”. The cause evokes emotion precisely so questions feel heartless — which is why verification habits must be built before the emergency.",
      fr: "Le timing est l’arme. Quelques heures après une inondation, un incendie ou un accident, des appels frauduleux surgissent sur les réseaux sociaux et les groupes de messagerie : photos réelles recyclées, page bâtie à la hâte, compte personnel pour une « aide immédiate ». Certaines campagnes tournent en continu — enfants malades, orphelinats — avec des histoires copiées d’organisations réelles ; d’autres usurpent de vraies associations ou personnalités via des pages clonées. La collecte trahit la fraude : dons vers des comptes personnels, aucun reçu, aucune organisation juridiquement nommée, et pression pour donner « tout de suite ». La cause suscite l’émotion précisément pour que les questions semblent sans cœur — d’où l’importance de bâtir ses réflexes de vérification avant la crise.",
    },
    warningSigns: [
      {
        en: "Donations are requested to a personal mobile money number or personal account.",
        fr: "Les dons sont demandés sur un numéro de mobile money ou un compte personnel.",
      },
      {
        en: "The campaign appears within hours of a disaster, with recycled photos.",
        fr: "La campagne surgit quelques heures après une catastrophe, avec des photos recyclées.",
      },
      {
        en: "No legally named organisation, registration details or receipts are offered.",
        fr: "Aucune organisation nommée juridiquement, aucun détail d’enregistrement ni reçu.",
      },
      {
        en: "Urgency is extreme: “the child is dying tonight”, “we leave at dawn”.",
        fr: "L’urgence est extrême : « l’enfant meurt ce soir », « nous partons à l’aube ».",
      },
      {
        en: "The page or profile was created recently and has little history.",
        fr: "La page ou le profil a été créé récemment et n’a presque pas d’historique.",
      },
      {
        en: "Collectors cannot say how funds will reach beneficiaries, or who audits them.",
        fr: "Les collecteurs ne savent dire comment les fonds parviendront, ni qui les contrôle.",
      },
      {
        en: "A known charity or celebrity “asks” from a look-alike page or new account.",
        fr: "Une association ou célébrité connue « demande » depuis une page similaire ou un nouveau compte.",
      },
    ],
    example: {
      en: "Illustrative example: After severe flooding is reported in northern Cameroon, a WhatsApp broadcast circulates with distressing photos and a plea for 10,000 FCFA “to save a family tonight”, giving a personal MoMo number. A journalist later finds the photos are from a different country’s flood three years earlier. Genuine relief efforts, by contrast, are announced by established organisations with verifiable accounts and public reporting.",
      fr: "Exemple illustratif : après de graves inondations dans le nord du Cameroun, un message WhatsApp circule avec des photos bouleversantes et un appel à verser 10 000 FCFA « pour sauver une famille ce soir » sur un numéro MoMo personnel. Un journaliste découvrira que les photos proviennent d’une inondation survenue trois ans plus tôt dans un autre pays. Les vraies actions de secours, elles, sont annoncées par des organisations établies, aux comptes vérifiables et au bilan public.",
    },
    protect: [
      {
        en: "Decide your giving habits before emergencies: preferred, verified organisations only.",
        fr: "Décidez de vos habitudes de don avant les crises : uniquement des organisations vérifiées.",
      },
      {
        en: "Check whether the organisation appears in official charity registers where they exist.",
        fr: "Vérifiez si l’organisation figure dans les registres officiels des associations, là où ils existent.",
      },
      {
        en: "Give through official channels: the organisation’s site, verified account or office.",
        fr: "Donnez par les canaux officiels : site de l’organisation, compte vérifié ou bureau.",
      },
      {
        en: "Reverse-search campaign photos — recycled images expose fabricated causes.",
        fr: "Faites une recherche inversée des photos : les images recyclées démasquent les causes fabriquées.",
      },
      {
        en: "Ask for the legal name, registration and a receipt before donating.",
        fr: "Demandez le nom légal, l’enregistrement et un reçu avant de donner.",
      },
      {
        en: "Be doubly careful in the first days of any disaster or crisis.",
        fr: "Redoublez de prudence dans les premiers jours de toute catastrophe ou crise.",
      },
      {
        en: "Donate directly rather than through intermediaries who “collect on behalf of”.",
        fr: "Donnez directement plutôt que via des intermédiaires qui « collectent au nom de ».",
      },
    ],
    ifVictim: [
      {
        en: "Stop further donations and warn others in the groups where it circulated.",
        fr: "Cessez les dons et avertissez les autres dans les groupes où le message a circulé.",
      },
      {
        en: "Ask your bank or operator about tracing or reversing the payments.",
        fr: "Demandez à votre banque ou opérateur si les paiements peuvent être tracés ou annulés.",
      },
      {
        en: "Screenshot the campaign, numbers, names and payment receipts as evidence.",
        fr: "Capturez la campagne, numéros, noms et reçus de paiement comme preuves.",
      },
      {
        en: "Report the page and the collection account to the platform involved.",
        fr: "Signalez la page et le compte de collecte à la plateforme concernée.",
      },
      {
        en: "Report to the police or cybercrime unit and to GLOPROFAS with your evidence.",
        fr: "Signalez les faits à la police ou à l’unité de cybercriminalité, ainsi qu’à GLOPROFAS, avec vos preuves.",
      },
    ],
    reportTo: [
      {
        en: "Your bank or mobile money provider through its official hotline, to trace the account.",
        fr: "Votre banque ou opérateur de mobile money via sa ligne officielle, pour tracer le compte.",
      },
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon), with evidence.",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun), avec les preuves.",
      },
      {
        en: "GLOPROFAS via our online report form — we can help verify organisations and document cases.",
        fr: "GLOPROFAS via notre formulaire de signalement : nous aidons à vérifier les organisations et à documenter les cas.",
      },
    ],
    keyTakeaway: {
      en: "Generosity deserves protection as much as money does. Decide where you give before the emergency, verify the collector, and never donate to personal accounts for public causes.",
      fr: "La générosité mérite autant de protection que l’argent. Choisissez vos causes avant la crise, vérifiez le collecteur et ne versez jamais de dons publics sur des comptes personnels.",
    },
    relatedSlugs: [
      "how-to-identify-fake-social-media-accounts",
      "how-to-identify-fake-websites-and-online-stores",
      "online-marketplace-scams-buy-and-sell-safely",
    ],
    checklistSlug: "general-scam-prevention",
    references: [
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
      { label: "ScamShield Singapore", url: "https://www.scamshield.gov.sg/" },
      { label: "Ghana Cyber Security Authority", url: "https://www.csa.gov.gh/" },
    ],
    readingMinutes: 4,
    publishedAt: "2026-11-10",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* E12 — Travel, visa and immigration scams                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "travel-visa-and-immigration-scams",
    categorySlug: "emerging-specialised",
    title: {
      en: "Travel, Visa and Immigration Scams",
      fr: "Escroqueries voyage, visa et immigration",
    },
    metaDescription: {
      en: "Fake visa agents, cloned embassy sites and «visa lottery» fees drain savings and dreams. Learn how travel scams work and how to verify before you pay.",
      fr: "Faux agents de visa, sites d’ambassade clonés et « loteries de visas » vident l’épargne. Méthodes et vérifications avant de payer.",
    },
    summary: {
      en: "Visa and immigration scams sell what no agent can guarantee: visas, work abroad, or “green card lottery” wins. This guide explains how fake agents and cloned embassy sites operate, and how to verify every migration step before money leaves.",
      fr: "Les escroqueries visa et immigration vendent ce qu’aucun agent ne peut garantir : visas, emplois à l’étranger ou « loterie de cartes vertes ». Ce guide explique le fonctionnement des faux agents et des sites d’ambassade clonés, et comment vérifier chaque étape avant de payer.",
    },
    what: {
      en: "Travel, visa and immigration scams exploit people’s wish to study, work or build a life abroad. Criminals pose as travel agents, “visa consultants” or embassy staff, or clone official websites, charging fees for visas, appointments, lotteries or documents that are worthless — while victims lose savings, miss real deadlines, and sometimes travel on forged papers they did not know were fake.",
      fr: "Les escroqueries de voyage, visa et immigration exploitent le désir d’étudier, de travailler ou de vivre à l’étranger. Des escrocs se font passer pour agents de voyage, « consultants visa » ou personnels d’ambassade, ou copient des sites officiels, en facturant visas, rendez-vous, loteries ou documents sans valeur — tandis que les victimes perdent leur épargne, manquent de vraies échéances et voyagent parfois avec de faux papiers qu’elles croyaient authentiques.",
    },
    how: {
      en: "The fake agent advertises guaranteed visas, “connections at the embassy” or job contracts abroad, through social media, flyers or word of mouth. Fees come with official-sounding names: file processing, appointment booking, “visa lottery registration”. The clone website is the modern centrepiece: an embassy or immigration service page copied almost perfectly, selling fake appointment slots or forms. Some victims discover the fraud when nothing materialises; others only at the airport or border, holding forged visas. The most damaging versions combine fraud with trafficking risks — “jobs” that lead to exploitation. One rule protects throughout: no genuine embassy outsources decisions to private agents, and no legitimate process can be bought or guaranteed.",
      fr: "Le faux agent promet des visas garantis, des « relations à l’ambassade » ou des contrats de travail à l’étranger, via les réseaux sociaux, des prospectus ou le bouche-à-oreille. Les frais portent des noms officiels : traitement du dossier, prise de rendez-vous, « enregistrement à la loterie des visas ». Le site cloné est la pièce maîtresse moderne : une page d’ambassade ou de service d’immigration copiée presque parfaitement, vendant de faux créneaux de rendez-vous ou formulaires. Certaines victimes découvrent la fraude quand rien ne se concrétise ; d’autres seulement à l’aéroport ou à la frontière, munies de visas falsifiés. Les versions les plus graves mêlent fraude et risques de traite — des « emplois » menant à l’exploitation. Une règle protège partout : aucune ambassade sérieuse ne délègue ses décisions à des agents privés, et aucune procédure légitime ne s’achète ni ne se garantit.",
    },
    warningSigns: [
      {
        en: "A “visa agent” guarantees success — no legitimate agent ever can.",
        fr: "Un « agent de visa » garantit le succès : aucun agent légitime ne le peut.",
      },
      {
        en: "Fees are demanded for “lottery registration” or guaranteed appointments.",
        fr: "Des frais sont exigés pour un « enregistrement à la loterie » ou des rendez-vous garantis.",
      },
      {
        en: "The website address differs slightly from the official embassy domain.",
        fr: "L’adresse du site diffère légèrement du domaine officiel de l’ambassade.",
      },
      {
        en: "Payment goes to a personal account or mobile money number.",
        fr: "Le paiement se fait sur un compte personnel ou un numéro de mobile money.",
      },
      {
        en: "The agent discourages contacting the embassy or checking official sources.",
        fr: "L’agent vous dissuade de contacter l’ambassade ou de vérifier les sources officielles.",
      },
      {
        en: "“Connections inside the embassy” are offered for a supplement.",
        fr: "Des « relations à l’intérieur de l’ambassade » sont proposées moyennant un supplément.",
      },
      {
        en: "Contracts or job offers abroad arrive without any verifiable employer.",
        fr: "Des contrats ou offres d’emploi à l’étranger arrivent sans employeur vérifiable.",
      },
    ],
    example: {
      en: "Illustrative example: A student in Douala pays an “agency” 1.8 million FCFA for a guaranteed Canadian study visa, including “embassy file handling” and a work contract. The contract arrives stamped by a company that cannot be found in any registry. Departure day approaches; the agency’s office is closed and its numbers silent. The real embassy confirms his file was never submitted — genuine applications go through published channels only.",
      fr: "Exemple illustratif : un étudiant de Douala verse 1,8 million de FCFA à une « agence » pour un visa d’études canadien garanti, avec « constitution du dossier à l’ambassade » et contrat de travail. Le contrat arrive, tamponné par une société introuvable dans les registres. Au jour du départ, l’agence est fermée et les numéros muets. La véritable ambassade confirme qu’aucun dossier n’a jamais été déposé : les candidatures authentiques passent uniquement par les voies publiées.",
    },
    protect: [
      {
        en: "Use only the official embassy or consulate website, typed yourself.",
        fr: "N’utilisez que le site officiel de l’ambassade ou du consulat, saisi vous-même.",
      },
      {
        en: "Check the domain exactly — clone sites differ by a letter or ending.",
        fr: "Vérifiez le domaine avec précision : les sites clonés diffèrent d’une lettre ou d’une extension.",
      },
      {
        en: "Remember: only you can lodge your own application in most official processes.",
        fr: "Rappelez-vous : dans la plupart des procédures, vous seul pouvez déposer votre demande.",
      },
      {
        en: "Treat any “guaranteed” visa, job abroad or lottery win as fraud.",
        fr: "Tenez tout visa, emploi à l’étranger ou gain de loterie « garanti » pour une fraude.",
      },
      {
        en: "Verify foreign employers directly before signing or paying anything.",
        fr: "Vérifiez directement les employeurs étrangers avant de signer ou de payer quoi que ce soit.",
      },
      {
        en: "Keep copies of every document and receipt an agent handles for you.",
        fr: "Gardez des copies de chaque document et reçu qu’un agent traite pour vous.",
      },
      {
        en: "Book appointments through official sources rather than paid intermediaries.",
        fr: "Prenez vos rendez-vous via les sources officielles plutôt que par des intermédiaires payants.",
      },
    ],
    ifVictim: [
      {
        en: "Stop all payments and demand a written account of what was done.",
        fr: "Interrompez tout paiement et exigez un compte rendu écrit des actions menées.",
      },
      {
        en: "Contact the real embassy to check whether any application exists.",
        fr: "Contactez la véritable ambassade pour vérifier si un dossier existe.",
      },
      {
        en: "Preserve contracts, receipts, adverts, messages and the agent’s details.",
        fr: "Conservez contrats, reçus, annonces, messages et coordonnées de l’agent.",
      },
      {
        en: "If you travelled on forged papers unknowingly, tell authorities and seek legal advice.",
        fr: "Si vous avez voyagé sans le savoir avec de faux papiers, informez les autorités et consultez un juriste.",
      },
      {
        en: "Report to the police or cybercrime unit and to GLOPROFAS with evidence.",
        fr: "Signalez les faits à la police ou à l’unité de cybercriminalité, ainsi qu’à GLOPROFAS, avec vos preuves.",
      },
    ],
    reportTo: [
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon), with your file.",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun), avec votre dossier.",
      },
      {
        en: "The real embassy or consulate, so they can warn other applicants about clone sites.",
        fr: "La véritable ambassade ou le consulat, afin qu’ils avertissent les autres candidats des sites clonés.",
      },
      {
        en: "GLOPROFAS via our online report form — we can help document and escalate the case.",
        fr: "GLOPROFAS via notre formulaire de signalement : nous pouvons aider à documenter et escalader le dossier.",
      },
    ],
    keyTakeaway: {
      en: "No one can sell you a guaranteed visa, and no embassy works through private “connections”. Verify the domain, use official channels, and treat every guarantee as the scam itself.",
      fr: "Personne ne peut vous vendre un visa garanti, et aucune ambassade ne fonctionne par « relations » privées. Vérifiez le domaine, utilisez les voies officielles : toute garantie est l’arnaque elle-même.",
    },
    relatedSlugs: [
      "scholarship-and-education-scams",
      "fake-job-offers-and-employment-scams",
      "how-to-identify-fake-websites-and-online-stores",
    ],
    checklistSlug: "general-scam-prevention",
    references: [
      { label: "Europol", url: "https://www.europol.europa.eu/" },
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
      { label: "Ghana Cyber Security Authority", url: "https://www.csa.gov.gh/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-11-15",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },
];
