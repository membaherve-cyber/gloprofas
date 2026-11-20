import type { DirectoryCountry } from "./resource-centre-types";

/**
 * GLOPROFAS — Global scam reporting directory · AFRICA (25 countries).
 *
 * Bilingual (EN/FR) entries for official public-sector bodies that accept
 * scam, fraud and cybercrime reports from the public.
 *
 * Editorial rules applied to every entry:
 * - Only agencies whose official status and role are well established are
 *   listed; URLs were checked on 2026-11-20. Some official government
 *   sites block automated checks (WAF/403) or were unreachable from our
 *   environment — countries relying on those are "pending-verification".
 * - CERTs handle technical incidents, not financial investigations.
 * - Financial regulators supervise institutions; complaints go to the
 *   bank / mobile-money operator and the police first.
 * - Telecom regulators handle complaints against operators.
 * - INTERPOL is NOT a public complaint portal and is never listed.
 * - Banks and mobile-money operators are impersonated by criminals — they
 *   are victims, never presented as complicit.
 * - Flag emoji are built from ISO 3166-1 alpha-2 regional indicator pairs.
 */
export const DIRECTORY_AFRICA: DirectoryCountry[] = [
  {
    code: "CM",
    name: "Cameroon",
    nameFr: "Cameroun",
    continent: "africa",
    priority: true,
    emergency: "117",
    agencies: [
      {
        name: "ANTIC — Agence Nationale des Technologies de l'Information et de la Communication",
        role: "cert",
        website: "https://www.antic.cm",
        handles: ["cybercrime", "phishing", "online-scams", "identity-theft", "impersonation"],
        note: {
          en: "National ICT agency in charge of cybersecurity and national CERT functions. Report technical incidents (phishing links, malware, compromised accounts) there; stolen money is a matter for the police (117), your bank or your mobile-money operator.",
          fr: "Agence nationale des TIC en charge de la cybersécurité et des fonctions de CERT national. Signalez-y les incidents techniques (liens de phishing, logiciels malveillants, comptes compromis) ; les fonds volés relèvent de la police (117), de votre banque ou de votre opérateur de mobile money.",
        },
      },
      {
        name: "ART — Agence de Régulation des Télécommunications du Cameroun",
        role: "consumer-protection",
        website: "https://www.art.cm",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Telecom regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers, fake 'operator' messages). It does not investigate fraud or recover funds.",
          fr: "Régulateur des télécommunications — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés, faux messages d'« opérateur »). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
      {
        name: "MINPOSTEL — Ministère des Postes et Télécommunications",
        role: "consumer-protection",
        website: "https://www.minpostel.gov.cm",
        handles: ["online-scams", "mobile-money", "cybercrime"],
        note: {
          en: "Ministry in charge of postal and telecom policy and consumer awareness — it publishes scam alerts but does not investigate individual cases; those go to the police and ANTIC.",
          fr: "Ministère chargé des politiques postale et télécom et de la sensibilisation des consommateurs — il publie des alertes sur les arnaques mais n'enquête pas sur les cas individuels, qui relèvent de la police et de l'ANTIC.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station or gendarmerie post, bringing your evidence; call 117 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au commissariat ou à la brigade de gendarmerie la plus proche, avec vos preuves ; en cas d'urgence, appelez le 117.",
    },
    sources: [
      { label: "ANTIC Cameroon (official site)", url: "https://www.antic.cm" },
      { label: "ART Cameroon (official site)", url: "https://www.art.cm" },
      { label: "MINPOSTEL Cameroon (official site)", url: "https://www.minpostel.gov.cm" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "NG",
    name: "Nigeria",
    nameFr: "Nigéria",
    continent: "africa",
    priority: true,
    emergency: "112",
    agencies: [
      {
        name: "EFCC — Economic and Financial Crimes Commission",
        role: "cybercrime-unit",
        website: "https://efccnigeria.gov.ng",
        handles: ["financial-fraud", "online-scams", "bank-transfer", "investment", "crypto", "bec"],
        note: {
          en: "Lead agency for economic and financial crimes, including internet fraud. File a petition with your evidence (messages, transfer receipts, account numbers); you can also attend the nearest EFCC zonal command in person.",
          fr: "Agence principale de lutte contre les crimes économiques et financiers, y compris la fraude sur Internet. Déposez une pétition avec vos preuves (messages, reçus de virement, numéros de compte) ; vous pouvez aussi vous présenter au commandement zonal de l'EFCC le plus proche.",
        },
      },
      {
        name: "ngCERT — Nigerian Computer Emergency Response Team",
        role: "cert",
        website: "https://cert.gov.ng",
        handles: ["cybercrime", "phishing", "identity-theft", "bec", "child-exploitation"],
        note: {
          en: "National CERT — report technical cybersecurity incidents (phishing links, malware, compromised accounts). It does not investigate financial loss; for stolen money also contact your bank and the EFCC or police.",
          fr: "CERT national — signalez les incidents techniques de cybersécurité (liens de phishing, logiciels malveillants, comptes compromis). Il n'enquête pas sur les pertes financières ; en cas de fonds volés, contactez aussi votre banque et l'EFCC ou la police.",
        },
      },
      {
        name: "Central Bank of Nigeria (CBN)",
        role: "financial-regulator",
        website: "https://www.cbn.gov.ng",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "investment"],
        note: {
          en: "Supervises banks and payment service providers. Contact your bank or operator first to block transfers and file a complaint; escalate to the CBN if it does not respond. Criminal fraud is investigated by the police and the EFCC.",
          fr: "Supervise les banques et les prestataires de services de paiement. Contactez d'abord votre banque ou votre opérateur pour bloquer les transferts et réclamer ; saisissez la CBN en cas d'absence de réponse. La fraude criminelle relève de la police et de l'EFCC.",
        },
      },
      {
        name: "FCCPC — Federal Competition and Consumer Protection Commission",
        role: "consumer-protection",
        website: "https://fccpc.gov.ng",
        handles: ["online-scams", "shopping", "impersonation", "investment"],
        note: {
          en: "Consumer protection agency for misleading and fraudulent commercial practices — fake online shops, false advertising, deceptive offers. Criminal fraud also goes to the police and the EFCC.",
          fr: "Agence de protection du consommateur contre les pratiques commerciales trompeuses et frauduleuses — fausses boutiques en ligne, publicités mensongères, offres trompeuses. La fraude criminelle relève aussi de la police et de l'EFCC.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au poste de police le plus proche, avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "Central Bank of Nigeria (official site)", url: "https://www.cbn.gov.ng" },
      { label: "ngCERT (official portal)", url: "https://cert.gov.ng" },
      { label: "EFCC Nigeria (official site)", url: "https://efccnigeria.gov.ng" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "GH",
    name: "Ghana",
    nameFr: "Ghana",
    continent: "africa",
    priority: true,
    emergency: "191",
    agencies: [
      {
        name: "Cyber Security Authority (CSA)",
        role: "cert",
        website: "https://csa.gov.gh",
        handles: ["cybercrime", "phishing", "online-scams", "identity-theft", "child-exploitation"],
        note: {
          en: "National cybersecurity authority — it also accepts cybersecurity incident complaints from the public and runs awareness campaigns. For stolen money, also contact your bank or mobile-money operator and the police (191).",
          fr: "Autorité nationale de cybersécurité — elle accepte aussi les signalements d'incidents cyber du public et mène des campagnes de sensibilisation. En cas d'argent volé, contactez aussi votre banque ou votre opérateur de mobile money et la police (191).",
        },
      },
      {
        name: "Ghana Police Service",
        role: "police",
        website: "https://police.gov.gh",
        phone: "191",
        handles: ["financial-fraud", "online-scams", "romance", "impersonation", "cybercrime"],
        note: {
          en: "Report fraud at the nearest police station with your evidence (messages, receipts, bank statements); call 191 in an emergency.",
          fr: "Signalez la fraude au poste de police le plus proche avec vos preuves (messages, reçus, relevés bancaires) ; en cas d'urgence, appelez le 191.",
        },
      },
      {
        name: "Bank of Ghana",
        role: "financial-regulator",
        website: "https://www.bog.gov.gh",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "investment"],
        note: {
          en: "Supervises banks and payment service providers. Contact your bank or operator first to block transfers and file a complaint; escalate to the Bank of Ghana if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les prestataires de services de paiement. Contactez d'abord votre banque ou votre opérateur pour bloquer les transferts et réclamer ; saisissez la Bank of Ghana en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
      {
        name: "National Communications Authority (NCA)",
        role: "consumer-protection",
        website: "https://nca.org.gh",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Telecom regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers). It does not investigate fraud or recover funds.",
          fr: "Régulateur des télécommunications — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence; call 191 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au poste de police le plus proche, avec vos preuves ; en cas d'urgence, appelez le 191.",
    },
    sources: [
      { label: "Cyber Security Authority Ghana (official site)", url: "https://csa.gov.gh" },
      { label: "Bank of Ghana (official site)", url: "https://www.bog.gov.gh" },
      { label: "NCA Ghana (official site)", url: "https://nca.org.gh" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "ZA",
    name: "South Africa",
    nameFr: "Afrique du Sud",
    continent: "africa",
    priority: true,
    emergency: "10111",
    agencies: [
      {
        name: "South African Police Service (SAPS)",
        role: "police",
        website: "https://www.saps.gov.za",
        phone: "10111",
        handles: ["financial-fraud", "online-scams", "romance", "impersonation", "cybercrime"],
        note: {
          en: "Report any crime at your nearest police station to open a case — keep the case number for your bank and insurer. Call 10111 in an emergency.",
          fr: "Signalez tout crime au poste de police le plus proche pour ouvrir un dossier — conservez le numéro de dossier pour votre banque et votre assureur. En cas d'urgence, appelez le 10111.",
        },
      },
      {
        name: "SABRIC — South African Banking Risk Information Centre",
        role: "reporting-portal",
        website: "https://www.sabric.co.za",
        handles: ["financial-fraud", "bank-transfer", "phishing", "impersonation", "bec"],
        note: {
          en: "Banking industry body that channels reports of suspicious banking incidents (phishing, vishing, smishing, account takeover) to member banks and the police. Always notify your own bank immediately as well and open a police case.",
          fr: "Organisme du secteur bancaire qui transmet les signalements d'incidents bancaires suspects (phishing, vishing, smishing, prise de contrôle de compte) aux banques membres et à la police. Prévenez toujours aussi votre banque immédiatement et ouvrez un dossier de police.",
        },
      },
      {
        name: "FSCA — Financial Sector Conduct Authority",
        role: "financial-regulator",
        website: "https://www.fsca.co.za",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Conduct regulator for the financial sector — check whether an investment provider is licensed and consult its scam warnings. Complaints about licensed firms can be escalated to it; criminal cases go to the SAPS.",
          fr: "Régulateur de conduite du secteur financier — vérifiez si un prestataire d'investissement est agréé et consultez ses alertes sur les arnaques. Les réclamations contre des établissements agréés peuvent lui être soumises ; les affaires criminelles relèvent de la SAPS.",
        },
      },
      {
        name: "Cybersecurity Hub (national CSIRT)",
        role: "cert",
        website: "https://www.cybersecurityhub.gov.za",
        handles: ["cybercrime", "phishing", "identity-theft", "online-scams"],
        note: {
          en: "South Africa's national CSIRT — report technical cybersecurity incidents (phishing, malware, compromised systems). It does not investigate financial loss; report crime to the SAPS and your bank.",
          fr: "CSIRT national de l'Afrique du Sud — signalez les incidents techniques de cybersécurité (phishing, logiciels malveillants, systèmes compromis). Il n'enquête pas sur les pertes financières ; signalez les crimes à la SAPS et à votre banque.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence; call 10111 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au poste de police le plus proche, avec vos preuves ; en cas d'urgence, appelez le 10111.",
    },
    sources: [
      { label: "FSCA South Africa (official site)", url: "https://www.fsca.co.za" },
      { label: "SABRIC (official site)", url: "https://www.sabric.co.za" },
      { label: "SAPS (official site)", url: "https://www.saps.gov.za" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "KE",
    name: "Kenya",
    nameFr: "Kenya",
    continent: "africa",
    priority: true,
    emergency: "999 / 112",
    agencies: [
      {
        name: "DCI — Directorate of Criminal Investigations",
        role: "cybercrime-unit",
        website: "https://www.dci.go.ke",
        handles: ["cybercrime", "financial-fraud", "online-scams", "identity-theft", "bec"],
        note: {
          en: "National criminal investigation service — its specialist units investigate fraud and cybercrime. Report with your evidence at DCI offices or any police station.",
          fr: "Service national d'enquêtes criminelles — ses unités spécialisées enquêtent sur la fraude et la cybercriminalité. Déposez plainte avec vos preuves dans les bureaux de la DCI ou dans tout poste de police.",
        },
      },
      {
        name: "Kenya Police Service",
        role: "police",
        website: "https://www.kenyapolice.go.ke",
        phone: "999 / 112",
        handles: ["financial-fraud", "romance", "impersonation", "online-scams"],
        note: {
          en: "Report fraud at any police station with your evidence (messages, receipts, M-Pesa statements); call 999 or 112 in an emergency.",
          fr: "Signalez la fraude dans tout poste de police avec vos preuves (messages, reçus, relevés M-Pesa) ; en cas d'urgence, appelez le 999 ou le 112.",
        },
      },
      {
        name: "Communications Authority of Kenya (CA) — KE-CIRT",
        role: "cert",
        website: "https://ca.go.ke",
        handles: ["phishing", "cybercrime", "online-scams", "identity-theft"],
        note: {
          en: "Communications regulator hosting KE-CIRT, the national computer emergency response team; it also handles consumer complaints against operators. Report technical incidents there; financial fraud goes to the DCI/police and your bank.",
          fr: "Régulateur des communications hébergeant le KE-CIRT, l'équipe nationale de réponse aux incidents informatiques ; il traite aussi les réclamations des consommateurs contre les opérateurs. Signalez-y les incidents techniques ; la fraude financière relève de la DCI/police et de votre banque.",
        },
      },
      {
        name: "Central Bank of Kenya (CBK)",
        role: "financial-regulator",
        website: "https://www.centralbank.go.ke",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "investment"],
        note: {
          en: "Supervises banks and payment service providers. Contact your bank or operator first to block transfers and file a complaint; escalate to the CBK if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les prestataires de services de paiement. Contactez d'abord votre banque ou votre opérateur pour bloquer les transferts et réclamer ; saisissez la CBK en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence; call 999 or 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au poste de police le plus proche, avec vos preuves ; en cas d'urgence, appelez le 999 ou le 112.",
    },
    sources: [
      { label: "DCI Kenya (official site)", url: "https://www.dci.go.ke" },
      { label: "Kenya Police (official site)", url: "https://www.kenyapolice.go.ke" },
      { label: "Communications Authority of Kenya (official site)", url: "https://ca.go.ke" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "UG",
    name: "Uganda",
    nameFr: "Ouganda",
    continent: "africa",
    priority: true,
    emergency: "999 / 112",
    agencies: [
      {
        name: "Uganda Communications Commission (UCC) — CERT.UG",
        role: "cert",
        website: "https://www.ucc.co.ug",
        handles: ["cybercrime", "phishing", "online-scams", "mobile-money"],
        note: {
          en: "Communications regulator hosting CERT.UG, the national computer emergency response team; it also handles consumer complaints against operators. Report technical incidents there; financial fraud goes to the police and your bank.",
          fr: "Régulateur des communications hébergeant CERT.UG, l'équipe nationale de réponse aux incidents informatiques ; il traite aussi les réclamations des consommateurs contre les opérateurs. Signalez-y les incidents techniques ; la fraude financière relève de la police et de votre banque.",
        },
      },
      {
        name: "NITA-U — National Information Technology Authority, Uganda",
        role: "cert",
        website: "https://nita.go.ug",
        handles: ["cybercrime", "identity-theft", "phishing"],
        note: {
          en: "Government ICT authority coordinating national cybersecurity and e-government systems. Technical incident reports can be directed there; it does not investigate financial loss.",
          fr: "Autorité publique des TIC coordonnant la cybersécurité nationale et les systèmes d'administration électronique. Les signalements d'incidents techniques peuvent lui être adressés ; elle n'enquête pas sur les pertes financières.",
        },
      },
      {
        name: "Bank of Uganda",
        role: "financial-regulator",
        website: "https://www.bou.or.ug",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "investment"],
        note: {
          en: "Supervises banks and payment service providers. Contact your bank or operator first to block transfers and file a complaint; escalate to the Bank of Uganda if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les prestataires de services de paiement. Contactez d'abord votre banque ou votre opérateur pour bloquer les transferts et réclamer ; saisissez la Bank of Uganda en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
      {
        name: "Uganda Police Force",
        role: "police",
        website: "https://www.police.go.ug",
        phone: "999 / 112",
        handles: ["financial-fraud", "online-scams", "romance", "impersonation"],
        note: {
          en: "Report fraud at any police station with your evidence (messages, receipts, mobile-money statements); call 999 or 112 in an emergency.",
          fr: "Signalez la fraude dans tout poste de police avec vos preuves (messages, reçus, relevés de mobile money) ; en cas d'urgence, appelez le 999 ou le 112.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence; call 999 or 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au poste de police le plus proche, avec vos preuves ; en cas d'urgence, appelez le 999 ou le 112.",
    },
    sources: [
      { label: "UCC Uganda (official site)", url: "https://www.ucc.co.ug" },
      { label: "Bank of Uganda (official site)", url: "https://www.bou.or.ug" },
      { label: "NITA-Uganda (official site)", url: "https://nita.go.ug" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "TZ",
    name: "Tanzania",
    nameFr: "Tanzanie",
    continent: "africa",
    priority: true,
    agencies: [
      {
        name: "TCRA — Tanzania Communications Regulatory Authority",
        role: "cert",
        website: "https://www.tcra.go.tz",
        handles: ["cybercrime", "phishing", "online-scams", "mobile-money"],
        note: {
          en: "Communications regulator hosting the national computer emergency response team (CERT-TZ); it also handles consumer complaints against operators. Report technical incidents and operator abuses there; financial fraud goes to the police and your bank.",
          fr: "Régulateur des communications hébergeant l'équipe nationale de réponse aux incidents informatiques (CERT-TZ) ; il traite aussi les réclamations des consommateurs contre les opérateurs. Signalez-y les incidents techniques et les abus d'opérateurs ; la fraude financière relève de la police et de votre banque.",
        },
      },
      {
        name: "Bank of Tanzania (BOT)",
        role: "financial-regulator",
        website: "https://www.bot.go.tz",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "investment"],
        note: {
          en: "Supervises banks and payment service providers. Contact your bank or operator first to block transfers and file a complaint; escalate to the BOT if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les prestataires de services de paiement. Contactez d'abord votre banque ou votre opérateur pour bloquer les transferts et réclamer ; saisissez la BOT en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
      {
        name: "Tanzania Police Force",
        role: "police",
        website: "https://www.policeforce.go.tz",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "Report fraud at any police station with your evidence (messages, receipts, mobile-money statements). Digital evidence should be preserved exactly as received.",
          fr: "Signalez la fraude dans tout poste de police avec vos preuves (messages, reçus, relevés de mobile money). Les preuves numériques doivent être conservées telles quelles.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence.",
      fr: "Vous pouvez aussi déposer plainte au poste de police le plus proche, avec vos preuves.",
    },
    sources: [
      { label: "TCRA Tanzania (official site)", url: "https://www.tcra.go.tz" },
      { label: "Bank of Tanzania (official site)", url: "https://www.bot.go.tz" },
      { label: "Tanzania Police Force (official site)", url: "https://www.policeforce.go.tz" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "RW",
    name: "Rwanda",
    nameFr: "Rwanda",
    continent: "africa",
    priority: true,
    emergency: "112",
    agencies: [
      {
        name: "Rwanda National Police (RNP)",
        role: "police",
        website: "https://www.police.gov.rw",
        phone: "112",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation", "romance"],
        note: {
          en: "Report fraud and cybercrime at any police station with your evidence; call 112 in an emergency.",
          fr: "Signalez la fraude et la cybercriminalité dans tout poste de police avec vos preuves ; en cas d'urgence, appelez le 112.",
        },
      },
      {
        name: "National Cyber Security Authority (NCSA)",
        role: "cert",
        website: "https://www.ncsa.gov.rw",
        handles: ["cybercrime", "phishing", "identity-theft", "online-scams"],
        note: {
          en: "National cybersecurity authority — coordinates incident response and accepts public cyber-incident reports. It does not investigate financial loss; contact the police and your bank for stolen money.",
          fr: "Autorité nationale de cybersécurité — coordonne la réponse aux incidents et accepte les signalements cyber du public. Elle n'enquête pas sur les pertes financières ; en cas de fonds volés, contactez la police et votre banque.",
        },
      },
      {
        name: "National Bank of Rwanda (BNR)",
        role: "financial-regulator",
        website: "https://www.bnr.rw",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "investment"],
        note: {
          en: "Supervises banks and payment service providers. Contact your bank or operator first to block transfers and file a complaint; escalate to the BNR if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les prestataires de services de paiement. Contactez d'abord votre banque ou votre opérateur pour bloquer les transferts et réclamer ; saisissez la BNR en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au poste de police le plus proche, avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "Rwanda National Police (official site)", url: "https://www.police.gov.rw" },
      { label: "National Bank of Rwanda (official site)", url: "https://www.bnr.rw" },
      { label: "NCSA Rwanda (official site)", url: "https://www.ncsa.gov.rw" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "ET",
    name: "Ethiopia",
    nameFr: "Éthiopie",
    continent: "africa",
    priority: true,
    emergency: "991 / 112",
    agencies: [
      {
        name: "INSA — Information Network Security Administration",
        role: "cert",
        website: "https://insa.gov.et",
        handles: ["cybercrime", "phishing", "online-scams", "identity-theft"],
        note: {
          en: "Federal agency for cybersecurity and the protection of critical information infrastructure — report technical incidents there. Financial fraud is a matter for the police and your bank.",
          fr: "Agence fédérale chargée de la cybersécurité et de la protection des infrastructures d'information critiques — signalez-y les incidents techniques. La fraude financière relève de la police et de votre banque.",
        },
      },
      {
        name: "National Bank of Ethiopia (NBE)",
        role: "financial-regulator",
        website: "https://www.nbe.gov.et",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "investment"],
        note: {
          en: "Supervises banks and payment service providers. Contact your bank or operator first to block transfers and file a complaint; escalate to the NBE if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les prestataires de services de paiement. Contactez d'abord votre banque ou votre opérateur pour bloquer les transferts et réclamer ; saisissez la NBE en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
    ],
    physicalReporting: {
      en: "There is no single national online police portal — report at the nearest police station with your evidence, and call 991 or 112 in an emergency.",
      fr: "Il n'existe pas de portail policier national unique en ligne — déposez plainte au poste de police le plus proche avec vos preuves, et appelez le 991 ou le 112 en cas d'urgence.",
    },
    sources: [
      { label: "INSA Ethiopia (official site)", url: "https://insa.gov.et" },
      { label: "National Bank of Ethiopia (official site)", url: "https://www.nbe.gov.et" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "SN",
    name: "Senegal",
    nameFr: "Sénégal",
    continent: "africa",
    priority: true,
    emergency: "17",
    agencies: [
      {
        name: "BCEAO — Banque Centrale des États de l'Afrique de l'Ouest",
        role: "financial-regulator",
        website: "https://www.bceao.int",
        handles: ["bank-transfer", "financial-fraud", "mobile-money", "investment"],
        note: {
          en: "Central bank of the West African Monetary Union (WAEMU/UEMOA) — it supervises banks in Senegal. Contact your bank first to block transfers and file a complaint; escalate to the banking supervisor if it does not respond. Criminal fraud is investigated by the police (17).",
          fr: "Banque centrale de l'Union économique et monétaire ouest-africaine (UEMOA) — elle supervise les banques au Sénégal. Contactez d'abord votre banque pour bloquer les transferts et réclamer ; saisissez le superviseur bancaire en cas d'absence de réponse. La fraude criminelle relève de la police (17).",
        },
      },
      {
        name: "ARTP — Agence de Régulation des Télécommunications et des Postes",
        role: "consumer-protection",
        website: "https://www.artp.sn",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Telecom and postal regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers, fake 'operator' messages). It does not investigate fraud or recover funds.",
          fr: "Régulateur des télécommunications et des postes — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés, faux messages d'« opérateur »). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
      {
        name: "ADIE — Agence de l'Informatique de l'État",
        role: "cert",
        website: "https://www.adie.sn",
        handles: ["cybercrime", "phishing", "online-scams"],
        note: {
          en: "State IT agency running e-government services and national cybersecurity functions — technical incident reports can be directed there. It does not investigate financial loss.",
          fr: "Agence informatique de l'État assurant les services d'administration électronique et des fonctions nationales de cybersécurité — les signalements d'incidents techniques peuvent lui être adressés. Elle n'enquête pas sur les pertes financières.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station or gendarmerie post, bringing your evidence; call 17 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au commissariat ou à la brigade de gendarmerie la plus proche, avec vos preuves ; en cas d'urgence, appelez le 17.",
    },
    sources: [
      { label: "BCEAO (official site)", url: "https://www.bceao.int" },
      { label: "ARTP Senegal (official site)", url: "https://www.artp.sn" },
      { label: "ADIE Senegal (official site)", url: "https://www.adie.sn" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "CI",
    name: "Côte d'Ivoire",
    nameFr: "Côte d’Ivoire",
    continent: "africa",
    priority: true,
    agencies: [
      {
        name: "BCEAO — Banque Centrale des États de l'Afrique de l'Ouest",
        role: "financial-regulator",
        website: "https://www.bceao.int",
        handles: ["bank-transfer", "financial-fraud", "mobile-money", "investment"],
        note: {
          en: "Central bank of the West African Monetary Union (WAEMU/UEMOA) — it supervises banks in Côte d'Ivoire. Contact your bank first to block transfers and file a complaint; escalate to the banking supervisor if it does not respond. Criminal fraud is investigated by the police and gendarmerie.",
          fr: "Banque centrale de l'Union économique et monétaire ouest-africaine (UEMOA) — elle supervise les banques en Côte d'Ivoire. Contactez d'abord votre banque pour bloquer les transferts et réclamer ; saisissez le superviseur bancaire en cas d'absence de réponse. La fraude criminelle relève de la police et de la gendarmerie.",
        },
      },
      {
        name: "ARTCI — Autorité de Régulation des Télécommunications/TIC",
        role: "consumer-protection",
        website: "https://artci.ci",
        handles: ["mobile-money", "phishing", "impersonation", "online-scams"],
        note: {
          en: "Telecom and ICT regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers, fake 'operator' messages). It does not investigate fraud or recover funds.",
          fr: "Régulateur des télécommunications et des TIC — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés, faux messages d'« opérateur »). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station or gendarmerie post, bringing your evidence.",
      fr: "Vous pouvez aussi déposer plainte au commissariat ou à la brigade de gendarmerie la plus proche, avec vos preuves.",
    },
    sources: [
      { label: "BCEAO (official site)", url: "https://www.bceao.int" },
      { label: "ARTCI Côte d'Ivoire (official site)", url: "https://artci.ci" },
      { label: "Government of Côte d'Ivoire (official portal)", url: "https://www.gouv.ci" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "CD",
    name: "DR Congo",
    nameFr: "RD Congo",
    continent: "africa",
    priority: true,
    agencies: [
      {
        name: "BCC — Banque Centrale du Congo",
        role: "financial-regulator",
        website: "https://www.bcc.cd",
        handles: ["bank-transfer", "financial-fraud", "mobile-money", "investment"],
        note: {
          en: "Supervises banks and payment institutions in the DRC. Contact your bank or operator first to block transfers and file a complaint; escalate to the BCC if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les établissements de paiement en RDC. Contactez d'abord votre banque ou votre opérateur pour bloquer les transferts et réclamer ; saisissez la BCC en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
      {
        name: "ARPCE — Autorité de Régulation des Postes et des Communications Électroniques (RDC)",
        role: "consumer-protection",
        website: "https://www.arpce-rdc.org",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Postal and telecom regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers). It does not investigate fraud or recover funds.",
          fr: "Régulateur des postes et des communications électroniques — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence.",
      fr: "Vous pouvez aussi déposer plainte au commissariat de police le plus proche, avec vos preuves.",
    },
    sources: [
      { label: "Banque Centrale du Congo (official site)", url: "https://www.bcc.cd" },
      { label: "ARPCE RDC (official site)", url: "https://www.arpce-rdc.org" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "MA",
    name: "Morocco",
    nameFr: "Maroc",
    continent: "africa",
    priority: true,
    emergency: "19 / 112",
    agencies: [
      {
        name: "DGSSI — Direction Générale de la Sécurité des Systèmes d'Information",
        role: "cert",
        website: "https://www.dgssi.gov.ma",
        handles: ["cybercrime", "phishing", "online-scams", "identity-theft"],
        note: {
          en: "National cybersecurity authority (maCERT) — report technical incidents (phishing links, malware, compromised accounts) there. It does not investigate financial loss; for stolen money contact the police (19), your bank and your operator.",
          fr: "Autorité nationale de cybersécurité (maCERT) — signalez-y les incidents techniques (liens de phishing, logiciels malveillants, comptes compromis). Elle n'enquête pas sur les pertes financières ; en cas de fonds volés, contactez la police (19), votre banque et votre opérateur.",
        },
      },
      {
        name: "Bank Al-Maghrib",
        role: "financial-regulator",
        website: "https://www.bkam.ma",
        handles: ["bank-transfer", "financial-fraud", "investment", "crypto"],
        note: {
          en: "Supervises banks and payment institutions. Contact your bank first to block transfers and file a complaint; escalate to Bank Al-Maghrib if it does not respond. Criminal fraud is investigated by the police and gendarmerie.",
          fr: "Supervise les banques et les établissements de paiement. Contactez d'abord votre banque pour bloquer les transferts et réclamer ; saisissez Bank Al-Maghrib en cas d'absence de réponse. La fraude criminelle relève de la police et de la gendarmerie.",
        },
      },
      {
        name: "ANRT — Agence Nationale de Réglementation des Télécommunications",
        role: "consumer-protection",
        website: "https://www.anrt.ma",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Telecom regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers, fake 'operator' messages). It does not investigate fraud or recover funds.",
          fr: "Régulateur des télécommunications — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés, faux messages d'« opérateur »). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station or gendarmerie post, bringing your evidence; in an emergency call 19 or 112.",
      fr: "Vous pouvez aussi déposer plainte au commissariat ou à la brigade de gendarmerie la plus proche, avec vos preuves ; en cas d'urgence, appelez le 19 ou le 112.",
    },
    sources: [
      { label: "DGSSI Morocco (official site)", url: "https://www.dgssi.gov.ma" },
      { label: "Bank Al-Maghrib (official site)", url: "https://www.bkam.ma" },
      { label: "ANRT Morocco (official site)", url: "https://www.anrt.ma" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "EG",
    name: "Egypt",
    nameFr: "Égypte",
    continent: "africa",
    priority: true,
    emergency: "122",
    agencies: [
      {
        name: "ITIDA — Information Technology Industry Development Authority (Egypt CERT)",
        role: "cert",
        website: "https://itida.gov.eg",
        handles: ["cybercrime", "phishing", "online-scams", "identity-theft"],
        note: {
          en: "Hosts Egypt CERT, the national computer emergency response team — report technical incidents (phishing links, malware, compromised accounts) there. It does not investigate financial loss; for stolen money contact your bank and the police (122).",
          fr: "Héberge Egypt CERT, l'équipe nationale de réponse aux incidents informatiques — signalez-y les incidents techniques (liens de phishing, logiciels malveillants, comptes compromis). Il n'enquête pas sur les pertes financières ; en cas de fonds volés, contactez votre banque et la police (122).",
        },
      },
      {
        name: "Central Bank of Egypt (CBE)",
        role: "financial-regulator",
        website: "https://www.cbe.org.eg",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "crypto"],
        note: {
          en: "Supervises banks and payment service providers. Contact your bank or operator first to block transfers and file a complaint; escalate to the CBE if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les prestataires de services de paiement. Contactez d'abord votre banque ou votre opérateur pour bloquer les transferts et réclamer ; saisissez la CBE en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
      {
        name: "NTRA — National Telecom Regulatory Authority",
        role: "consumer-protection",
        website: "https://tra.gov.eg",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Telecom regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers, fake 'operator' messages). It does not investigate fraud or recover funds.",
          fr: "Régulateur des télécommunications — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés, faux messages d'« opérateur »). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
      {
        name: "Ministry of Interior of Egypt",
        role: "police",
        website: "https://www.moiegypt.gov.eg",
        phone: "122",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "The Ministry of Interior (national police) receives criminal complaints, including cybercrime, through its services portal and police stations; call 122 in an emergency.",
          fr: "Le ministère de l'Intérieur (police nationale) reçoit les plaintes pénales, y compris pour la cybercriminalité, via son portail de services et dans les commissariats ; en cas d'urgence, appelez le 122.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence; call 122 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au commissariat de police le plus proche, avec vos preuves ; en cas d'urgence, appelez le 122.",
    },
    sources: [
      { label: "ITIDA Egypt (official site)", url: "https://itida.gov.eg" },
      { label: "Central Bank of Egypt (official site)", url: "https://www.cbe.org.eg" },
      { label: "NTRA Egypt (official site)", url: "https://tra.gov.eg" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "DZ",
    name: "Algeria",
    nameFr: "Algérie",
    continent: "africa",
    priority: true,
    emergency: "17",
    agencies: [
      {
        name: "ARPCE — Autorité de Régulation de la Poste et des Communications Électroniques",
        role: "consumer-protection",
        website: "https://arpce.dz",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Postal and telecom regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers, fake 'operator' messages). It does not investigate fraud or recover funds.",
          fr: "Régulateur de la poste et des communications électroniques — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés, faux messages d'« opérateur »). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
      {
        name: "Bank of Algeria — Banque d'Algérie",
        role: "financial-regulator",
        website: "https://www.bank-of-algeria.dz",
        handles: ["bank-transfer", "financial-fraud", "investment"],
        note: {
          en: "Supervises banks and payment institutions. Contact your bank first to block transfers and file a complaint; escalate to the Bank of Algeria if it does not respond. Criminal fraud is investigated by the police and gendarmerie.",
          fr: "Supervise les banques et les établissements de paiement. Contactez d'abord votre banque pour bloquer les transferts et réclamer ; saisissez la Banque d'Algérie en cas d'absence de réponse. La fraude criminelle relève de la police et de la gendarmerie.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station or gendarmerie post, bringing your evidence; call 17 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au commissariat ou à la brigade de gendarmerie la plus proche, avec vos preuves ; en cas d'urgence, appelez le 17.",
    },
    sources: [
      { label: "ARPCE Algeria (official site)", url: "https://arpce.dz" },
      { label: "Bank of Algeria (official site)", url: "https://www.bank-of-algeria.dz" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "TN",
    name: "Tunisia",
    nameFr: "Tunisie",
    continent: "africa",
    priority: true,
    emergency: "197",
    agencies: [
      {
        name: "BCT — Banque Centrale de Tunisie",
        role: "financial-regulator",
        website: "https://www.bct.gov.tn",
        handles: ["bank-transfer", "financial-fraud", "investment", "crypto"],
        note: {
          en: "Supervises banks and payment institutions. Contact your bank first to block transfers and file a complaint; escalate to the BCT if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les établissements de paiement. Contactez d'abord votre banque pour bloquer les transferts et réclamer ; saisissez la BCT en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
      {
        name: "INT — Instance Nationale des Télécommunications",
        role: "consumer-protection",
        website: "https://www.intt.tn",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Telecom regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers, fake 'operator' messages). It does not investigate fraud or recover funds.",
          fr: "Régulateur des télécommunications — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés, faux messages d'« opérateur »). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
      {
        name: "ANSI — Agence Nationale de Sécurité Informatique",
        role: "cert",
        website: "https://ansi.tn",
        handles: ["cybercrime", "phishing", "online-scams", "identity-theft"],
        note: {
          en: "National cybersecurity agency hosting Tunisia's CERT — report technical incidents (phishing links, malware, compromised accounts) there. It does not investigate financial loss; contact the police and your bank for stolen money.",
          fr: "Agence nationale de sécurité informatique hébergeant le CERT tunisien — signalez-y les incidents techniques (liens de phishing, logiciels malveillants, comptes compromis). Elle n'enquête pas sur les pertes financières ; en cas de fonds volés, contactez la police et votre banque.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence; in an emergency call 197.",
      fr: "Vous pouvez aussi déposer plainte au commissariat de police le plus proche, avec vos preuves ; en cas d'urgence, appelez le 197.",
    },
    sources: [
      { label: "Central Bank of Tunisia (official site)", url: "https://www.bct.gov.tn" },
      { label: "INT Tunisia (official site)", url: "https://www.intt.tn" },
      { label: "ANSI Tunisia (official site)", url: "https://ansi.tn" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "ZM",
    name: "Zambia",
    nameFr: "Zambie",
    continent: "africa",
    priority: true,
    emergency: "999",
    agencies: [
      {
        name: "Zambia Police Service",
        role: "police",
        website: "https://www.zambiapolice.gov.zm",
        phone: "999",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation", "romance"],
        note: {
          en: "Report fraud at any police station with your evidence (messages, receipts, mobile-money statements); call 999 in an emergency.",
          fr: "Signalez la fraude dans tout poste de police avec vos preuves (messages, reçus, relevés de mobile money) ; en cas d'urgence, appelez le 999.",
        },
      },
      {
        name: "ZICTA — Zambia Information and Communications Technology Authority",
        role: "cert",
        website: "https://www.zicta.zm",
        handles: ["cybercrime", "phishing", "online-scams", "mobile-money"],
        note: {
          en: "ICT regulator hosting the national computer incident response team; it also handles consumer complaints against operators. Report technical incidents and operator abuses there; financial fraud goes to the police and your bank.",
          fr: "Régulateur des TIC hébergeant l'équipe nationale de réponse aux incidents informatiques ; il traite aussi les réclamations des consommateurs contre les opérateurs. Signalez-y les incidents techniques et les abus d'opérateurs ; la fraude financière relève de la police et de votre banque.",
        },
      },
      {
        name: "Bank of Zambia (BOZ)",
        role: "financial-regulator",
        website: "https://www.boz.zm",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "investment"],
        note: {
          en: "Supervises banks and payment service providers. Contact your bank or operator first to block transfers and file a complaint; escalate to the BOZ if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les prestataires de services de paiement. Contactez d'abord votre banque ou votre opérateur pour bloquer les transferts et réclamer ; saisissez la BOZ en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence; call 999 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au poste de police le plus proche, avec vos preuves ; en cas d'urgence, appelez le 999.",
    },
    sources: [
      { label: "Zambia Police (official site)", url: "https://www.zambiapolice.gov.zm" },
      { label: "Bank of Zambia (official site)", url: "https://www.boz.zm" },
      { label: "ZICTA (official site)", url: "https://www.zicta.zm" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "ZW",
    name: "Zimbabwe",
    nameFr: "Zimbabwe",
    continent: "africa",
    priority: true,
    emergency: "99",
    agencies: [
      {
        name: "POTRAZ — Postal and Telecommunications Regulatory Authority of Zimbabwe",
        role: "cert",
        website: "https://www.potraz.gov.zw",
        handles: ["cybercrime", "phishing", "online-scams", "mobile-money"],
        note: {
          en: "Postal and telecom regulator hosting the national CSIRT and handling consumer complaints against operators. Report technical incidents and operator abuses there; financial fraud goes to the police and your bank.",
          fr: "Régulateur des postes et télécommunications hébergeant le CSIRT national et traitant les réclamations des consommateurs contre les opérateurs. Signalez-y les incidents techniques et les abus d'opérateurs ; la fraude financière relève de la police et de votre banque.",
        },
      },
      {
        name: "Reserve Bank of Zimbabwe (RBZ)",
        role: "financial-regulator",
        website: "https://www.rbz.co.zw",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "investment"],
        note: {
          en: "Supervises banks and payment service providers. Contact your bank or operator first to block transfers and file a complaint; escalate to the RBZ if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les prestataires de services de paiement. Contactez d'abord votre banque ou votre opérateur pour bloquer les transferts et réclamer ; saisissez la RBZ en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
      {
        name: "Zimbabwe Republic Police (ZRP)",
        role: "police",
        website: "https://www.zrp.gov.zw",
        phone: "99",
        handles: ["financial-fraud", "online-scams", "impersonation", "cybercrime"],
        note: {
          en: "Report fraud at any police station with your evidence (messages, receipts, mobile-money statements); call 99 in an emergency.",
          fr: "Signalez la fraude dans tout poste de police avec vos preuves (messages, reçus, relevés de mobile money) ; en cas d'urgence, appelez le 99.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence; call 99 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au poste de police le plus proche, avec vos preuves ; en cas d'urgence, appelez le 99.",
    },
    sources: [
      { label: "POTRAZ Zimbabwe (official site)", url: "https://www.potraz.gov.zw" },
      { label: "Reserve Bank of Zimbabwe (official site)", url: "https://www.rbz.co.zw" },
      { label: "Zimbabwe Republic Police (official site)", url: "https://www.zrp.gov.zw" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "BW",
    name: "Botswana",
    nameFr: "Botswana",
    continent: "africa",
    priority: true,
    emergency: "999",
    agencies: [
      {
        name: "Bank of Botswana",
        role: "financial-regulator",
        website: "https://www.bankofbotswana.bw",
        handles: ["bank-transfer", "financial-fraud", "investment", "crypto"],
        note: {
          en: "Supervises banks and payment institutions. Contact your bank first to block transfers and file a complaint; escalate to the Bank of Botswana if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les établissements de paiement. Contactez d'abord votre banque pour bloquer les transferts et réclamer ; saisissez la Bank of Botswana en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
      {
        name: "Botswana Police Service",
        role: "police",
        website: "https://www.gov.bw",
        phone: "999",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "Report fraud at any police station with your evidence; call 999 in an emergency. The official government portal lists police services and contacts.",
          fr: "Signalez la fraude dans tout poste de police avec vos preuves ; en cas d'urgence, appelez le 999. Le portail officiel du gouvernement recense les services et contacts de la police.",
        },
      },
      {
        name: "BOCRA — Botswana Communications Regulatory Authority",
        role: "consumer-protection",
        website: "https://www.bocra.org.bw",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Communications regulator — complaints against telecom operators and internet service providers (SIM-swap, spam SMS, spoofed numbers). It does not investigate fraud or recover funds.",
          fr: "Régulateur des communications — réclamations contre les opérateurs de télécoms et fournisseurs d'accès Internet (échange de SIM, SMS spam, numéros usurpés). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence; call 999 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au poste de police le plus proche, avec vos preuves ; en cas d'urgence, appelez le 999.",
    },
    sources: [
      { label: "Bank of Botswana (official site)", url: "https://www.bankofbotswana.bw" },
      { label: "Government of Botswana (official portal)", url: "https://www.gov.bw" },
      { label: "BOCRA (official site)", url: "https://www.bocra.org.bw" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "BJ",
    name: "Benin",
    nameFr: "Bénin",
    continent: "africa",
    priority: true,
    emergency: "117",
    agencies: [
      {
        name: "ARCEP Bénin — Autorité de Régulation des Communications Électroniques et de la Poste",
        role: "consumer-protection",
        website: "https://arcep.bj",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Telecom and postal regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers, fake 'operator' messages). It does not investigate fraud or recover funds.",
          fr: "Régulateur des communications électroniques et de la poste — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés, faux messages d'« opérateur »). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
      {
        name: "Cyber Sécurité Bénin (national cybersecurity agency)",
        role: "cert",
        website: "https://cyber.gouv.bj",
        handles: ["cybercrime", "phishing", "online-scams", "identity-theft"],
        note: {
          en: "National cybersecurity agency — report technical incidents (phishing links, malware, compromised accounts) there. It does not investigate financial loss; contact the police (117), your bank and your operator for stolen money.",
          fr: "Agence nationale de cybersécurité — signalez-y les incidents techniques (liens de phishing, logiciels malveillants, comptes compromis). Elle n'enquête pas sur les pertes financières ; en cas de fonds volés, contactez la police (117), votre banque et votre opérateur.",
        },
      },
      {
        name: "BCEAO — Banque Centrale des États de l'Afrique de l'Ouest",
        role: "financial-regulator",
        website: "https://www.bceao.int",
        handles: ["bank-transfer", "financial-fraud", "mobile-money", "investment"],
        note: {
          en: "Central bank of the West African Monetary Union (WAEMU/UEMOA) — it supervises banks in Benin. Contact your bank first to block transfers and file a complaint; escalate to the banking supervisor if it does not respond. Criminal fraud is investigated by the police (117).",
          fr: "Banque centrale de l'Union économique et monétaire ouest-africaine (UEMOA) — elle supervise les banques au Bénin. Contactez d'abord votre banque pour bloquer les transferts et réclamer ; saisissez le superviseur bancaire en cas d'absence de réponse. La fraude criminelle relève de la police (117).",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station or gendarmerie post, bringing your evidence; call 117 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au commissariat ou à la brigade de gendarmerie la plus proche, avec vos preuves ; en cas d'urgence, appelez le 117.",
    },
    sources: [
      { label: "ARCEP Bénin (official site)", url: "https://arcep.bj" },
      { label: "Cyber Sécurité Bénin (official site)", url: "https://cyber.gouv.bj" },
      { label: "Government of Benin (official portal)", url: "https://www.gouv.bj" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "BF",
    name: "Burkina Faso",
    nameFr: "Burkina Faso",
    continent: "africa",
    priority: true,
    emergency: "17",
    agencies: [
      {
        name: "Police Nationale du Burkina Faso",
        role: "police",
        website: "https://www.police.bf",
        phone: "17",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "Report fraud at any police station with your evidence (messages, receipts, mobile-money statements); call 17 in an emergency.",
          fr: "Signalez la fraude dans tout poste de police avec vos preuves (messages, reçus, relevés de mobile money) ; en cas d'urgence, appelez le 17.",
        },
      },
      {
        name: "ANSSI-BF — Agence Nationale de Sécurité des Systèmes d'Information",
        role: "cert",
        website: "https://anssi.bf",
        handles: ["cybercrime", "phishing", "online-scams", "identity-theft"],
        note: {
          en: "National cybersecurity agency — report technical incidents (phishing links, malware, compromised accounts) there. It does not investigate financial loss; contact the police (17), your bank and your operator for stolen money.",
          fr: "Agence nationale de sécurité des systèmes d'information — signalez-y les incidents techniques (liens de phishing, logiciels malveillants, comptes compromis). Elle n'enquête pas sur les pertes financières ; en cas de fonds volés, contactez la police (17), votre banque et votre opérateur.",
        },
      },
      {
        name: "ARCEP Burkina Faso — Autorité de Régulation des Communications Électroniques et des Postes",
        role: "consumer-protection",
        website: "https://arcep.bf",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Telecom and postal regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers, fake 'operator' messages). It does not investigate fraud or recover funds.",
          fr: "Régulateur des communications électroniques et des postes — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés, faux messages d'« opérateur »). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
      {
        name: "BCEAO — Banque Centrale des États de l'Afrique de l'Ouest",
        role: "financial-regulator",
        website: "https://www.bceao.int",
        handles: ["bank-transfer", "financial-fraud", "mobile-money", "investment"],
        note: {
          en: "Central bank of the West African Monetary Union (WAEMU/UEMOA) — it supervises banks in Burkina Faso. Contact your bank first to block transfers and file a complaint; escalate to the banking supervisor if it does not respond. Criminal fraud is investigated by the police (17).",
          fr: "Banque centrale de l'Union économique et monétaire ouest-africaine (UEMOA) — elle supervise les banques au Burkina Faso. Contactez d'abord votre banque pour bloquer les transferts et réclamer ; saisissez le superviseur bancaire en cas d'absence de réponse. La fraude criminelle relève de la police (17).",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station or gendarmerie post, bringing your evidence; call 17 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au commissariat ou à la brigade de gendarmerie la plus proche, avec vos preuves ; en cas d'urgence, appelez le 17.",
    },
    sources: [
      { label: "Police Nationale du Burkina Faso (official site)", url: "https://www.police.bf" },
      { label: "ANSSI-BF (official site)", url: "https://anssi.bf" },
      { label: "BCEAO (official site)", url: "https://www.bceao.int" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "TG",
    name: "Togo",
    nameFr: "Togo",
    continent: "africa",
    priority: true,
    emergency: "117",
    agencies: [
      {
        name: "ARTP Togo — Autorité de Régulation des Communications Électroniques et des Postes",
        role: "consumer-protection",
        website: "https://artp.tg",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Telecom and postal regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers, fake 'operator' messages). It does not investigate fraud or recover funds.",
          fr: "Régulateur des communications électroniques et des postes — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés, faux messages d'« opérateur »). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
      {
        name: "BCEAO — Banque Centrale des États de l'Afrique de l'Ouest",
        role: "financial-regulator",
        website: "https://www.bceao.int",
        handles: ["bank-transfer", "financial-fraud", "mobile-money", "investment"],
        note: {
          en: "Central bank of the West African Monetary Union (WAEMU/UEMOA) — it supervises banks in Togo. Contact your bank first to block transfers and file a complaint; escalate to the banking supervisor if it does not respond. Criminal fraud is investigated by the police (117).",
          fr: "Banque centrale de l'Union économique et monétaire ouest-africaine (UEMOA) — elle supervise les banques au Togo. Contactez d'abord votre banque pour bloquer les transferts et réclamer ; saisissez le superviseur bancaire en cas d'absence de réponse. La fraude criminelle relève de la police (117).",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station or gendarmerie post, bringing your evidence; call 117 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au commissariat ou à la brigade de gendarmerie la plus proche, avec vos preuves ; en cas d'urgence, appelez le 117.",
    },
    sources: [
      { label: "ARTP Togo (official site)", url: "https://artp.tg" },
      { label: "BCEAO (official site)", url: "https://www.bceao.int" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "GA",
    name: "Gabon",
    nameFr: "Gabon",
    continent: "africa",
    priority: true,
    agencies: [
      {
        name: "ARCEP Gabon — Autorité de Régulation des Communications Électroniques et des Postes",
        role: "consumer-protection",
        website: "https://arcep.ga",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Telecom and postal regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers, fake 'operator' messages). It does not investigate fraud or recover funds.",
          fr: "Régulateur des communications électroniques et des postes — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés, faux messages d'« opérateur »). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
      {
        name: "BEAC — Banque des États de l'Afrique Centrale",
        role: "financial-regulator",
        website: "https://www.beac.int",
        handles: ["bank-transfer", "financial-fraud", "mobile-money", "investment"],
        note: {
          en: "Central bank of the Central African Economic and Monetary Community (CEMAC) — it supervises banks in Gabon. Contact your bank first to block transfers and file a complaint; escalate to the banking supervisor if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Banque de la Communauté économique et monétaire de l'Afrique centrale (CEMAC) — elle supervise les banques au Gabon. Contactez d'abord votre banque pour bloquer les transferts et réclamer ; saisissez le superviseur bancaire en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station or gendarmerie post, bringing your evidence.",
      fr: "Vous pouvez aussi déposer plainte au commissariat ou à la brigade de gendarmerie la plus proche, avec vos preuves.",
    },
    sources: [
      { label: "ARCEP Gabon (official site)", url: "https://arcep.ga" },
      { label: "BEAC (official site)", url: "https://www.beac.int" },
      { label: "Government of Gabon (official portal)", url: "https://www.gouv.ga" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "CG",
    name: "Republic of the Congo",
    nameFr: "République du Congo",
    continent: "africa",
    priority: true,
    emergency: "117",
    agencies: [
      {
        name: "ARPCE Congo — Autorité de Régulation des Postes et des Communications Électroniques",
        role: "consumer-protection",
        website: "https://www.arpce-cg.com",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Postal and telecom regulator — complaints against operators (SIM-swap, spam SMS, spoofed numbers, fake 'operator' messages). It does not investigate fraud or recover funds.",
          fr: "Régulateur des postes et des communications électroniques — réclamations contre les opérateurs (échange de SIM, SMS spam, numéros usurpés, faux messages d'« opérateur »). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
      {
        name: "BEAC — Banque des États de l'Afrique Centrale",
        role: "financial-regulator",
        website: "https://www.beac.int",
        handles: ["bank-transfer", "financial-fraud", "mobile-money", "investment"],
        note: {
          en: "Central bank of the Central African Economic and Monetary Community (CEMAC) — it supervises banks in the Republic of the Congo. Contact your bank first to block transfers and file a complaint; escalate to the banking supervisor if it does not respond. Criminal fraud is investigated by the police (117).",
          fr: "Banque de la Communauté économique et monétaire de l'Afrique centrale (CEMAC) — elle supervise les banques en République du Congo. Contactez d'abord votre banque pour bloquer les transferts et réclamer ; saisissez le superviseur bancaire en cas d'absence de réponse. La fraude criminelle relève de la police (117).",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station or gendarmerie post, bringing your evidence; call 117 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte au commissariat ou à la brigade de gendarmerie la plus proche, avec vos preuves ; en cas d'urgence, appelez le 117.",
    },
    sources: [
      { label: "ARPCE Congo (official site)", url: "https://www.arpce-cg.com" },
      { label: "BEAC (official site)", url: "https://www.beac.int" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "AO",
    name: "Angola",
    nameFr: "Angola",
    continent: "africa",
    priority: true,
    agencies: [
      {
        name: "BNA — Banco Nacional de Angola",
        role: "financial-regulator",
        website: "https://www.bna.ao",
        handles: ["bank-transfer", "financial-fraud", "investment", "crypto"],
        note: {
          en: "Supervises banks and payment institutions. Contact your bank first to block transfers and file a complaint; escalate to the BNA if it does not respond. Criminal fraud is investigated by the police.",
          fr: "Supervise les banques et les établissements de paiement. Contactez d'abord votre banque pour bloquer les transferts et réclamer ; saisissez la BNA en cas d'absence de réponse. La fraude criminelle relève de la police.",
        },
      },
      {
        name: "INACOM — Angola communications regulator",
        role: "consumer-protection",
        website: "https://www.inacom.gov.ao",
        handles: ["mobile-money", "phishing", "impersonation"],
        note: {
          en: "Communications regulator — complaints against telecom operators and internet service providers (SIM-swap, spam SMS, spoofed numbers). It does not investigate fraud or recover funds.",
          fr: "Régulateur des communications — réclamations contre les opérateurs de télécoms et fournisseurs d'accès Internet (échange de SIM, SMS spam, numéros usurpés). Il n'enquête pas sur la fraude et ne récupère pas les fonds.",
        },
      },
      {
        name: "Ministério do Interior (National Police)",
        role: "police",
        website: "https://www.minint.gov.ao",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "The Ministry of Interior oversees the Polícia Nacional — report fraud at the nearest police station with your evidence (messages, receipts, transfer records).",
          fr: "Le ministère de l'Intérieur supervise la Polícia Nacional — signalez la fraude au poste de police le plus proche avec vos preuves (messages, reçus, relevés de virement).",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the nearest police station, bringing your evidence.",
      fr: "Vous pouvez aussi déposer plainte au poste de police le plus proche, avec vos preuves.",
    },
    sources: [
      { label: "Banco Nacional de Angola (official site)", url: "https://www.bna.ao" },
      { label: "Ministry of Interior of Angola (official site)", url: "https://www.minint.gov.ao" },
      { label: "INACOM Angola (official site)", url: "https://www.inacom.gov.ao" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
];
