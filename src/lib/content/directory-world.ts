import type { DirectoryCountry } from "./resource-centre-types";

/**
 * GLOPROFAS — Global scam reporting directory · WORLD, non-Africa
 * (16 Europe · 3 North America · 5 South America · 11 Asia ·
 *  5 Middle East · 2 Oceania).
 *
 * Bilingual (EN/FR) entries for official public-sector bodies that accept
 * scam, fraud and cybercrime reports from the public.
 *
 * Editorial rules applied to every entry:
 * - Only agencies whose official status and role are well established are
 *   listed; URLs were checked on 2026-11-20. Several official government
 *   sites block automated checks (WAF/403) — they are treated as real and
 *   usable. Sites unreachable from our checking environment are only listed
 *   when the agency is confidently official, and those countries are
 *   marked "pending-verification".
 * - CERTs handle technical incidents, not financial investigations.
 * - Financial regulators supervise institutions; victims should contact
 *   their bank / operator first and file a criminal complaint with police.
 * - Consumer and telecom regulators handle administrative complaints, not
 *   prosecutions.
 * - INTERPOL and Europol do NOT accept individual public complaints and
 *   are never listed as reporting destinations.
 * - No phone numbers, e-mail addresses or portals are invented: the only
 *   e-mail listed is the UK NCSC suspicious-mail address.
 * - Flag emoji are built from ISO 3166-1 alpha-2 regional indicator pairs.
 */
export const DIRECTORY_WORLD: DirectoryCountry[] = [
  /* ------------------------------------------------------------------ */
  /* EUROPE                                                              */
  /* ------------------------------------------------------------------ */
  {
    code: "GB",
    name: "United Kingdom",
    nameFr: "Royaume-Uni",
    continent: "europe",
    emergency: "999",
    agencies: [
      {
        name: "Action Fraud — national fraud and cybercrime reporting centre",
        role: "reporting-portal",
        website: "https://www.actionfraud.police.uk",
        phone: "0300 123 2040",
        handles: ["online-scams", "financial-fraud", "bank-transfer", "investment", "romance", "bec", "impersonation"],
        note: {
          en: "The UK's national fraud and cybercrime reporting centre (run by the City of London Police) covering England, Wales and Northern Ireland — report online or by phone and keep your crime reference number; in Scotland report directly to Police Scotland.",
          fr: "Centre national de signalement des fraudes et cybercriminalités pour l'Angleterre, le pays de Galles et l'Irlande du Nord (géré par la City of London Police) — signalez en ligne ou par téléphone et conservez votre numéro de référence ; en Écosse, adressez-vous directement à Police Scotland.",
        },
      },
      {
        name: "NCSC — National Cyber Security Centre",
        role: "cert",
        website: "https://www.ncsc.gov.uk",
        reportingUrl: "https://www.ncsc.gov.uk/section/report-suspicious-emails-websites-phishing",
        email: "report@ncsc.gov.uk",
        handles: ["phishing", "cybercrime", "impersonation", "identity-theft"],
        note: {
          en: "The UK's technical cyber-security authority — forward suspicious emails to report@ncsc.gov.uk and report scam websites and text messages through its reporting pages; it analyses and helps block threats but does not investigate financial fraud (that is Action Fraud and the police).",
          fr: "Autorité technique britannique de cybersécurité — transférez les e-mails suspects à report@ncsc.gov.uk et signalez les sites et SMS frauduleux via ses pages de signalement ; elle analyse et contribue à bloquer les menaces mais n'enquête pas sur la fraude financière (cela relève d'Action Fraud et de la police).",
        },
      },
      {
        name: "FCA — Financial Conduct Authority",
        role: "financial-regulator",
        website: "https://www.fca.org.uk",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Regulator of UK financial firms — check its Warning List for unauthorised and 'clone' firms before investing, and report misleading investment offers; it supervises firms but cannot recover money lost to scams.",
          fr: "Régulateur britannique des entreprises financières — consultez sa liste d'avertissement sur les sociétés non autorisées et les sociétés « clones » avant d'investir, et signalez les offres d'investissement trompeuses ; il supervise les entreprises mais ne peut pas récupérer l'argent perdu lors d'arnaques.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 999 if a crime is in progress.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; appelez le 999 si une infraction est en cours.",
    },
    sources: [
      { label: "Action Fraud (official portal)", url: "https://www.actionfraud.police.uk" },
      { label: "NCSC UK (official site)", url: "https://www.ncsc.gov.uk" },
      { label: "Financial Conduct Authority (official site)", url: "https://www.fca.org.uk" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "FR",
    name: "France",
    nameFr: "France",
    continent: "europe",
    emergency: "17 (police) / 112",
    agencies: [
      {
        name: "Cybermalveillance.gouv.fr — national assistance platform",
        role: "reporting-portal",
        website: "https://www.cybermalveillance.gouv.fr",
        handles: ["phishing", "online-scams", "cybercrime", "identity-theft", "impersonation"],
        note: {
          en: "National platform for victims of digital harm — online diagnosis, guidance and reporting of phishing, hacked accounts and online scams; it directs you to the right authority (police, bank, platform) but does not prosecute.",
          fr: "Plateforme nationale d'assistance aux victimes de cybermalveillance — diagnostic en ligne, conseils et signalement du phishing, des piratages de compte et des arnaques en ligne ; elle vous oriente vers la bonne autorité (police, banque, plateforme) mais ne poursuit pas.",
        },
      },
      {
        name: "Signal Conso — government consumer reporting platform",
        role: "consumer-protection",
        website: "https://signal.conso.gouv.fr",
        handles: ["shopping", "online-scams", "impersonation", "investment"],
        note: {
          en: "Official consumer reporting platform (DGCCRF) for deceptive commercial practices — fake shops, misleading offers, unlawful subscriptions; it triggers consumer-law enforcement, while criminal fraud goes to the police.",
          fr: "Plateforme officielle de signalement des consommateurs (DGCCRF) pour les pratiques commerciales trompeuses — fausses boutiques, offres mensongères, abonnements illicites ; elle déclenche des actions au titre du droit de la consommation, l'escroquerie relevant de la police.",
        },
      },
      {
        name: "Police Nationale (France)",
        role: "police",
        website: "https://www.police-nationale.interieur.gouv.fr",
        handles: ["financial-fraud", "online-scams", "romance", "bank-transfer", "bec"],
        note: {
          en: "File a criminal complaint (plainte) for fraud — online pre-complaint, by phone or at any police station; call 17 in an emergency (112 also works).",
          fr: "Portez plainte pour escroquerie — pré-plainte en ligne, par téléphone ou dans n'importe quel commissariat ; en cas d'urgence, appelez le 17 (le 112 fonctionne aussi).",
        },
      },
      {
        name: "Banque de France",
        role: "financial-regulator",
        website: "https://www.banque-france.fr",
        handles: ["bank-transfer", "financial-fraud", "investment", "impersonation"],
        note: {
          en: "Central bank and supervisor of payment systems — contest fraudulent transfers with your bank without delay (EU rules provide for reimbursement of unauthorised payments reported quickly); the Banque de France oversees banking complaints and fraud alerts, not criminal cases.",
          fr: "Banque centrale et superviseur des systèmes de paiement — contestez sans tarder les virements frauduleux auprès de votre banque (le droit européen prévoit le remboursement des paiements non autorisés signalés rapidement) ; la Banque de France supervise les réclamations bancaires et publie des alertes, mais ne traite pas les affaires pénales.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also file a criminal complaint at any police station or gendarmerie brigade, with your evidence.",
      fr: "Vous pouvez aussi porter plainte dans n'importe quel commissariat de police ou brigade de gendarmerie, avec vos preuves.",
    },
    sources: [
      { label: "Cybermalveillance.gouv.fr (official platform)", url: "https://www.cybermalveillance.gouv.fr" },
      { label: "Signal Conso (official platform)", url: "https://signal.conso.gouv.fr" },
      { label: "Banque de France (official site)", url: "https://www.banque-france.fr" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "DE",
    name: "Germany",
    nameFr: "Allemagne",
    continent: "europe",
    emergency: "110",
    agencies: [
      {
        name: "Polizei (Germany)",
        role: "police",
        website: "https://www.polizei.de",
        handles: ["financial-fraud", "online-scams", "cybercrime", "romance", "bec"],
        note: {
          en: "File a criminal complaint (Anzeige) for fraud and cybercrime — online with the police of your region, by phone or at any police station; call 110 in an emergency.",
          fr: "Déposez plainte (Anzeige) pour fraude et cybercriminalité — en ligne auprès de la police de votre région, par téléphone ou dans n'importe quel commissariat ; en cas d'urgence, appelez le 110.",
        },
      },
      {
        name: "BSI — Federal Office for Information Security",
        role: "cert",
        website: "https://www.bsi.bund.de",
        handles: ["phishing", "cybercrime", "identity-theft", "impersonation"],
        note: {
          en: "Federal cyber-security authority — citizen guidance and reporting of phishing, malware and fraudulent websites; it handles technical incidents, not financial investigations.",
          fr: "Autorité fédérale de cybersécurité — conseils aux citoyens et signalement du phishing, des logiciels malveillants et des sites frauduleux ; elle traite les incidents techniques, pas les enquêtes financières.",
        },
      },
      {
        name: "Verbraucherzentrale — consumer advice centres",
        role: "consumer-protection",
        website: "https://www.verbraucherzentrale.de",
        handles: ["shopping", "online-scams", "investment", "impersonation"],
        note: {
          en: "Consumer advice centres — guidance on fake shops, subscription traps and online scams, and complaints against traders; they advise and mediate, criminal cases go to the police.",
          fr: "Centres de conseil aux consommateurs — orientation sur les fausses boutiques, les pièges d'abonnement et les arnaques en ligne, et réclamations contre les commerçants ; ils conseillent et médient, les affaires pénales relevant de la police.",
        },
      },
      {
        name: "BaFin — Federal Financial Supervisory Authority",
        role: "financial-regulator",
        website: "https://www.bafin.de",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Federal financial supervisor — publishes warnings about unauthorised investment and trading platforms; it supervises licensed firms but does not compensate fraud victims.",
          fr: "Superviseur fédéral des marchés financiers — publie des avertissements sur les plateformes d'investissement et de trading non autorisées ; il supervise les entreprises agréées mais n'indemnise pas les victimes de fraude.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 110 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 110.",
    },
    sources: [
      { label: "Polizei.de (official portal)", url: "https://www.polizei.de" },
      { label: "BSI (official site)", url: "https://www.bsi.bund.de" },
      { label: "BaFin (official site)", url: "https://www.bafin.de" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "ES",
    name: "Spain",
    nameFr: "Espagne",
    continent: "europe",
    emergency: "112",
    agencies: [
      {
        name: "INCIBE — National Cybersecurity Institute",
        role: "cert",
        website: "https://www.incibe.es",
        phone: "017",
        handles: ["phishing", "online-scams", "identity-theft", "cybercrime"],
        note: {
          en: "National cyber-security institute — free 017 citizen helpline and online reporting for phishing, fake online shops and identity theft; it provides technical assistance and referral, criminal cases go to the police.",
          fr: "Institut national de cybersécurité — ligne d'assistance citoyenne gratuite 017 et signalement en ligne du phishing, des fausses boutiques et de l'usurpation d'identité ; il fournit une aide technique et oriente, les affaires pénales relevant de la police.",
        },
      },
      {
        name: "Policía Nacional (Spain)",
        role: "police",
        website: "https://www.policia.es",
        handles: ["financial-fraud", "online-scams", "cybercrime", "bec", "impersonation"],
        note: {
          en: "Report fraud (denuncia) online or at any station — its specialised cybercrime groups investigate online fraud and phishing.",
          fr: "Signalez la fraude (denuncia) en ligne ou dans n'importe quel commissariat — ses groupes spécialisés de cybercriminalité enquêtent sur la fraude en ligne et le phishing.",
        },
      },
      {
        name: "Guardia Civil (Spain)",
        role: "police",
        website: "https://www.guardiacivil.es",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "Also accepts fraud complaints and investigates cybercrime within its territorial scope — either national force can record your report.",
          fr: "Elle reçoit aussi les plaintes pour fraude et enquête sur la cybercriminalité dans son ressort territorial — l'une ou l'autre force nationale peut enregistrer votre dénonciation.",
        },
      },
      {
        name: "CNMV — National Securities Market Commission",
        role: "financial-regulator",
        website: "https://www.cnmv.es",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Securities-market supervisor — check its warnings on unauthorised investment firms before investing; it supervises markets but does not recover funds.",
          fr: "Superviseur des marchés de valeurs — consultez ses avertissements sur les sociétés d'investissement non autorisées avant d'investir ; il supervise les marchés mais ne récupère pas les fonds.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station (comisaría) with your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "INCIBE (official site)", url: "https://www.incibe.es" },
      { label: "Policía Nacional (official site)", url: "https://www.policia.es" },
      { label: "Guardia Civil (official site)", url: "https://www.guardiacivil.es" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "IT",
    name: "Italy",
    nameFr: "Italie",
    continent: "europe",
    emergency: "112",
    agencies: [
      {
        name: "Polizia di Stato — Polizia Postale (cybercrime police)",
        role: "cybercrime-unit",
        website: "https://www.poliziadistato.it",
        handles: ["cybercrime", "phishing", "online-scams", "identity-theft", "bec", "child-exploitation"],
        note: {
          en: "The State Police's specialised cybercrime units — report phishing, online fraud, identity theft and online child abuse; they investigate technology-related crimes.",
          fr: "Unités spécialisées de cybercriminalité de la Police d'État — signalez le phishing, la fraude en ligne, l'usurpation d'identité et l'abus en ligne sur les mineurs ; elles enquêtent sur les infractions liées aux technologies.",
        },
      },
      {
        name: "Guardia di Finanza",
        role: "police",
        website: "https://www.gdf.gov.it",
        handles: ["financial-fraud", "investment", "bank-transfer", "bec"],
        note: {
          en: "Financial and economic police — investigates fraud, investment scams and money laundering; complaints can be filed online or at its offices.",
          fr: "Police économique et financière — enquête sur les escroqueries, les fraudes aux investissements et le blanchiment ; les plaintes peuvent être déposées en ligne ou auprès de ses bureaux.",
        },
      },
      {
        name: "AGCM — Competition and Market Authority",
        role: "consumer-protection",
        website: "https://www.agcm.it",
        handles: ["shopping", "online-scams", "impersonation"],
        note: {
          en: "Competition and market authority — handles unfair commercial practices and misleading offers (administrative enforcement); criminal fraud goes to the police.",
          fr: "Autorité de la concurrence et des marchés — traite les pratiques commerciales déloyales et les offres trompeuses (sanctions administratives) ; l'escroquerie relève de la police.",
        },
      },
      {
        name: "Banca d'Italia",
        role: "financial-regulator",
        website: "https://www.bancaditalia.it",
        handles: ["bank-transfer", "financial-fraud", "investment"],
        note: {
          en: "Supervises banks and payment services — complain to your bank first about fraudulent transactions, then to the Banca d'Italia if unresolved.",
          fr: "Supervise les banques et les services de paiement — réclamez d'abord auprès de votre banque pour les opérations frauduleuses, puis auprès de la Banca d'Italia en cas d'absence de réponse.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station (carabinieri or polizia di Stato) with your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel bureau de police (carabinieri ou polizia di Stato), avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "Polizia di Stato (official site)", url: "https://www.poliziadistato.it" },
      { label: "Guardia di Finanza (official site)", url: "https://www.gdf.gov.it" },
      { label: "Banca d'Italia (official site)", url: "https://www.bancaditalia.it" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "NL",
    name: "Netherlands",
    nameFr: "Pays-Bas",
    continent: "europe",
    emergency: "112",
    agencies: [
      {
        name: "Fraudehelpdesk — national fraud helpdesk",
        role: "reporting-portal",
        website: "https://www.fraudehelpdesk.nl",
        handles: ["online-scams", "financial-fraud", "bank-transfer", "impersonation", "bec"],
        note: {
          en: "National fraud helpdesk — advice for victims and a central reporting point working with police and banks; it advises and refers rather than investigating.",
          fr: "Service national d'aide contre la fraude — conseils aux victimes et point de signalement central en coopération avec la police et les banques ; il conseille et oriente sans enquêter lui-même.",
        },
      },
      {
        name: "Politie (Netherlands)",
        role: "police",
        website: "https://www.politie.nl",
        handles: ["financial-fraud", "online-scams", "cybercrime", "romance"],
        note: {
          en: "File an official report (aangifte) for fraud — online or at any police station; call 112 in an emergency.",
          fr: "Déposez plainte (aangifte) pour fraude — en ligne ou dans n'importe quel commissariat ; en cas d'urgence, appelez le 112.",
        },
      },
      {
        name: "AFM — Authority for the Financial Markets",
        role: "financial-regulator",
        website: "https://www.afm.nl",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Financial markets authority — warnings about illegal investment offers and unlicensed crypto firms; supervisory role.",
          fr: "Autorité des marchés financiers — avertissements sur les offres d'investissement illégales et les sociétés de crypto-actifs non agréées ; rôle de supervision.",
        },
      },
      {
        name: "DNB — Dutch central bank (prudential supervisor)",
        role: "financial-regulator",
        website: "https://www.dnb.nl",
        handles: ["bank-transfer", "financial-fraud", "mobile-money"],
        note: {
          en: "Prudential supervisor of banks and payment institutions — escalate complaints your bank cannot resolve about the handling of fraud.",
          fr: "Superviseur prudentiel des banques et des établissements de paiement — saisissez-le des réclamations que votre banque n'a pas pu résoudre concernant le traitement d'une fraude.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "Fraudehelpdesk (official site)", url: "https://www.fraudehelpdesk.nl" },
      { label: "Politie (official site)", url: "https://www.politie.nl" },
      { label: "AFM (official site)", url: "https://www.afm.nl" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "BE",
    name: "Belgium",
    nameFr: "Belgique",
    continent: "europe",
    emergency: "112",
    agencies: [
      {
        name: "Safeonweb — Centre for Cybersecurity Belgium (CCB)",
        role: "reporting-portal",
        website: "https://www.safeonweb.be",
        handles: ["phishing", "online-scams", "impersonation", "cybercrime"],
        note: {
          en: "Citizen portal of the Centre for Cybersecurity Belgium — report suspicious messages and phishing websites; technical reports, financial fraud goes to the police.",
          fr: "Portail citoyen du Centre pour la cybersécurité Belgique — signalez les messages suspects et les sites de phishing ; signalements techniques, la fraude financière relevant de la police.",
        },
      },
      {
        name: "Federal Police (Police Fédérale / Federale Politie)",
        role: "police",
        website: "https://www.polfed-fedpol.be",
        handles: ["financial-fraud", "online-scams", "cybercrime", "bec"],
        note: {
          en: "Criminal complaints (plainte) are filed with your local police zone — online, by phone or in person; the federal police coordinate serious fraud and cybercrime investigations.",
          fr: "Les plaintes pénales se déposent auprès de votre zone de police locale — en ligne, par téléphone ou en personne ; la police fédérale coordonne les enquêtes graves de fraude et de cybercriminalité.",
        },
      },
      {
        name: "FPS Economy — Consumer Affairs (Belgium)",
        role: "consumer-protection",
        website: "https://economie.fgov.be",
        handles: ["shopping", "online-scams", "impersonation", "investment"],
        note: {
          en: "Federal consumer affairs service — complaints about misleading commercial practices and fraudulent traders; mediation and consumer-law enforcement.",
          fr: "Service fédéral des affaires du consommateur — réclamations sur les pratiques commerciales trompeuses et les commerçants frauduleux ; médiation et application du droit de la consommation.",
        },
      },
      {
        name: "FSMA — Financial Services and Markets Authority",
        role: "financial-regulator",
        website: "https://www.fsma.be",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Financial markets supervisor — fraud warnings on unauthorised investment offers, clone firms and fake trading platforms.",
          fr: "Superviseur des marchés financiers — avertissements sur les offres d'investissement non autorisées, les sociétés « clones » et les fausses plateformes de trading.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at your local police station with your evidence; call 101 or 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte auprès de votre zone de police locale, avec vos preuves ; en cas d'urgence, appelez le 101 ou le 112.",
    },
    sources: [
      { label: "Safeonweb (official portal)", url: "https://www.safeonweb.be" },
      { label: "Federal Police (official site)", url: "https://www.polfed-fedpol.be" },
      { label: "FSMA (official site)", url: "https://www.fsma.be" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "IE",
    name: "Ireland",
    nameFr: "Irlande",
    continent: "europe",
    emergency: "112 / 999",
    agencies: [
      {
        name: "An Garda Síochána (Irish national police)",
        role: "police",
        website: "https://www.garda.ie",
        handles: ["financial-fraud", "online-scams", "cybercrime", "romance", "bec"],
        note: {
          en: "National police — fraud and cybercrime complaints at any Garda station, with many reports also possible online; the National Cyber Crime Bureau investigates online fraud.",
          fr: "Police nationale — plaintes pour fraude et cybercriminalité dans n'importe quel poste de Garda, de nombreux signalements étant aussi possibles en ligne ; le National Cyber Crime Bureau enquête sur la fraude en ligne.",
        },
      },
      {
        name: "FraudSMART — banking industry anti-fraud campaign",
        role: "reporting-portal",
        website: "https://fraudsmart.ie",
        handles: ["bank-transfer", "financial-fraud", "phishing", "impersonation"],
        note: {
          en: "Anti-fraud awareness campaign run by the Banking & Payments Federation Ireland — guides victims of payment fraud and publishes alerts; contact your bank immediately, criminal reports go to the Gardaí.",
          fr: "Campagne de sensibilisation contre la fraude menée par la Fédération bancaire et des paiements d'Irlande — guide les victimes de fraude au paiement et publie des alertes ; contactez immédiatement votre banque, les plaintes pénales allant aux Gardaí.",
        },
      },
      {
        name: "CCPC — Competition and Consumer Protection Commission",
        role: "consumer-protection",
        website: "https://www.ccpc.ie",
        handles: ["shopping", "online-scams", "investment", "impersonation"],
        note: {
          en: "Consumer protection commission — complaints about unfair trading, misleading prices and dubious traders; consumer law, not criminal investigation.",
          fr: "Commission de la protection des consommateurs — réclamations sur les pratiques commerciales déloyales, les prix trompeurs et les commerçants douteux ; droit de la consommation, pas d'enquête pénale.",
        },
      },
      {
        name: "NCSC Ireland — National Cyber Security Centre",
        role: "cert",
        website: "https://www.ncsc.gov.ie",
        handles: ["phishing", "cybercrime", "impersonation", "bec"],
        note: {
          en: "Government computer-security incident response team — reports of malicious emails and websites affecting state services; technical incidents only.",
          fr: "Équipe gouvernementale de réponse aux incidents de sécurité informatique — signalements d'e-mails et de sites malveillants touchant les services publics ; incidents techniques uniquement.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any Garda station with your evidence; call 999 or 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel poste de Garda, avec vos preuves ; en cas d'urgence, appelez le 999 ou le 112.",
    },
    sources: [
      { label: "An Garda Síochána (official site)", url: "https://www.garda.ie" },
      { label: "FraudSMART (official site)", url: "https://fraudsmart.ie" },
      { label: "CCPC (official site)", url: "https://www.ccpc.ie" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "CH",
    name: "Switzerland",
    nameFr: "Suisse",
    continent: "europe",
    emergency: "117",
    agencies: [
      {
        name: "NCSC — National Cyber Security Centre (Switzerland)",
        role: "cert",
        website: "https://www.ncsc.admin.ch",
        handles: ["phishing", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "National cyber-security centre — online reporting of cyber incidents (phishing, fake shops, fraud attempts) and prevention advice; technical handling, money matters go through the police and banks.",
          fr: "Centre national de cybersécurité — signalement en ligne des incidents numériques (phishing, fausses boutiques, tentatives de fraude) et conseils de prévention ; traitement technique, les questions d'argent relevant de la police et des banques.",
        },
      },
      {
        name: "fedpol — Federal Office of Police",
        role: "police",
        website: "https://www.fedpol.admin.ch",
        handles: ["financial-fraud", "cybercrime", "bec", "impersonation"],
        note: {
          en: "Federal office of police — coordinates serious and organised cybercrime; criminal complaints are filed with the cantonal police of your canton (117).",
          fr: "Office fédéral de la police — coordonne la cybercriminalité grave et organisée ; les plaintes pénales se déposent auprès de la police cantonale de votre canton (117).",
        },
      },
      {
        name: "FINMA — Swiss Financial Market Supervisory Authority",
        role: "financial-regulator",
        website: "https://www.finma.ch",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Financial-market supervisor — warnings on unauthorised providers and clone firms; supervisory role, no victim compensation.",
          fr: "Superviseur des marchés financiers — avertissements sur les prestataires non autorisés et les sociétés « clones » ; rôle de supervision, pas d'indemnisation des victimes.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at the police station of your canton with your evidence; call 117 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte auprès de la police de votre canton, avec vos preuves ; en cas d'urgence, appelez le 117.",
    },
    sources: [
      { label: "NCSC Switzerland (official site)", url: "https://www.ncsc.admin.ch" },
      { label: "fedpol (official site)", url: "https://www.fedpol.admin.ch" },
      { label: "FINMA (official site)", url: "https://www.finma.ch" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "SE",
    name: "Sweden",
    nameFr: "Suède",
    continent: "europe",
    emergency: "112",
    agencies: [
      {
        name: "Polisen (Swedish police)",
        role: "police",
        website: "https://www.polisen.se",
        handles: ["financial-fraud", "online-scams", "cybercrime", "romance", "bec"],
        note: {
          en: "Report fraud and cybercrime online or at any police station; call 112 in an emergency.",
          fr: "Signalez la fraude et la cybercriminalité en ligne ou dans n'importe quel commissariat ; en cas d'urgence, appelez le 112.",
        },
      },
      {
        name: "MSB — Civil Contingencies Agency (CERT.SE)",
        role: "cert",
        website: "https://www.msb.se",
        handles: ["phishing", "cybercrime", "impersonation", "bec"],
        note: {
          en: "Civil contingencies agency hosting CERT.SE — report phishing and IT incidents; technical incident handling, no financial investigations.",
          fr: "Agence des situations d'urgence hébergeant CERT.SE — signalez le phishing et les incidents informatiques ; gestion technique des incidents, pas d'enquêtes financières.",
        },
      },
      {
        name: "Konsumentverket — Swedish Consumer Agency",
        role: "consumer-protection",
        website: "https://www.konsumentverket.se",
        handles: ["shopping", "online-scams", "investment", "romance"],
        note: {
          en: "Swedish consumer agency — consumer guidance (Hallå konsument) on scams, fake shops and unfair contract terms; advice and dispute support.",
          fr: "Agence suédoise de la consommation — conseils aux consommateurs (Hallå konsument) sur les arnaques, les fausses boutiques et les clauses contractuelles déloyales ; conseils et accompagnement des litiges.",
        },
      },
      {
        name: "Finansinspektionen — Swedish financial supervisory authority",
        role: "financial-regulator",
        website: "https://www.fi.se",
        handles: ["investment", "bank-transfer", "crypto", "financial-fraud"],
        note: {
          en: "Financial supervisory authority — warnings list of unauthorised firms offering investments or crypto services.",
          fr: "Autorité suédoise de supervision financière — liste d'avertissement des sociétés non autorisées proposant des investissements ou des services crypto.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "Polisen (official site)", url: "https://www.polisen.se" },
      { label: "MSB (official site)", url: "https://www.msb.se" },
      { label: "Finansinspektionen (official site)", url: "https://www.fi.se" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "NO",
    name: "Norway",
    nameFr: "Norvège",
    continent: "europe",
    emergency: "112",
    agencies: [
      {
        name: "Politiet (Norwegian police)",
        role: "police",
        website: "https://www.politiet.no",
        handles: ["financial-fraud", "online-scams", "cybercrime", "romance"],
        note: {
          en: "Report fraud online, by phone or at any police station; call 112 in an emergency.",
          fr: "Signalez la fraude en ligne, par téléphone ou dans n'importe quel commissariat ; en cas d'urgence, appelez le 112.",
        },
      },
      {
        name: "Nettvett (NorSIS digital-security guidance)",
        role: "consumer-protection",
        website: "https://www.nettvett.no",
        handles: ["online-scams", "phishing", "shopping", "romance", "impersonation"],
        note: {
          en: "Digital-security guidance service run by NorSIS, the Norwegian digital-security awareness organisation — advice for online fraud victims and warnings about current scams; guidance, not investigation.",
          fr: "Service de conseils en sécurité numérique géré par NorSIS, organisme norvégien de sensibilisation à la sécurité numérique — conseils aux victimes de fraude en ligne et alertes sur les arnaques actuelles ; orientation, sans enquête.",
        },
      },
      {
        name: "NSM — National Security Authority (NorCERT)",
        role: "cert",
        website: "https://www.nsm.no",
        handles: ["phishing", "cybercrime", "bec", "impersonation"],
        note: {
          en: "National security authority whose NorCERT handles serious cyber incidents — report phishing and attacks on critical systems; technical response only.",
          fr: "Autorité nationale de sécurité dont le NorCERT traite les cyberincidents graves — signalez le phishing et les attaques contre des systèmes critiques ; réponse technique uniquement.",
        },
      },
      {
        name: "Finanstilsynet — Norwegian financial supervisory authority",
        role: "financial-regulator",
        website: "https://www.finanstilsynet.no",
        handles: ["investment", "crypto", "financial-fraud"],
        note: {
          en: "Financial supervisory authority — warnings on unauthorised investment firms and scam platforms.",
          fr: "Autorité norvégienne de supervision financière — avertissements sur les sociétés d'investissement non autorisées et les plateformes frauduleuses.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "Politiet (official site)", url: "https://www.politiet.no" },
      { label: "Nettvett (official site)", url: "https://www.nettvett.no" },
      { label: "Finanstilsynet (official site)", url: "https://www.finanstilsynet.no" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "PT",
    name: "Portugal",
    nameFr: "Portugal",
    continent: "europe",
    emergency: "112",
    agencies: [
      {
        name: "CNCS — National Cybersecurity Centre (Portugal)",
        role: "cert",
        website: "https://www.cncs.gov.pt",
        handles: ["phishing", "cybercrime", "online-scams", "impersonation"],
        note: {
          en: "National cyber-security centre — incident reporting and guidance for citizens and companies; technical incidents, not financial investigations.",
          fr: "Centre national de cybersécurité — signalement d'incidents et conseils aux citoyens et entreprises ; incidents techniques, pas d'enquêtes financières.",
        },
      },
      {
        name: "PSP — Public Security Police (Portugal)",
        role: "police",
        website: "https://www.psp.pt",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "Public security police — fraud complaints (queixa) at any station; call 112 in an emergency.",
          fr: "Police de sécurité publique — plaintes pour fraude (queixa) dans n'importe quel commissariat ; en cas d'urgence, appelez le 112.",
        },
      },
      {
        name: "ASAE — Food and Economic Safety Authority (Portugal)",
        role: "consumer-protection",
        website: "https://www.asae.gov.pt",
        handles: ["shopping", "online-scams", "impersonation"],
        note: {
          en: "Authority for food and economic safety — investigates economic fraud and unfair commercial practices; consumer complaints against traders.",
          fr: "Autorité de sécurité alimentaire et économique — enquête sur la fraude économique et les pratiques commerciales déloyales ; réclamations des consommateurs contre les commerçants.",
        },
      },
      {
        name: "Banco de Portugal",
        role: "financial-regulator",
        website: "https://www.bportugal.pt",
        handles: ["bank-transfer", "financial-fraud", "mobile-money"],
        note: {
          en: "Supervises banks and payment services — complain to your bank first, then to the Banco de Portugal if unresolved.",
          fr: "Supervise les banques et les services de paiement — réclamez d'abord auprès de votre banque, puis auprès de la Banco de Portugal en cas d'absence de réponse.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "Banco de Portugal (official site)", url: "https://www.bportugal.pt" },
      { label: "CNCS Portugal (official site)", url: "https://www.cncs.gov.pt" },
      { label: "PSP (official site)", url: "https://www.psp.pt" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "PL",
    name: "Poland",
    nameFr: "Pologne",
    continent: "europe",
    emergency: "112",
    agencies: [
      {
        name: "CERT Polska (NASK)",
        role: "cert",
        website: "https://www.cert.pl",
        reportingUrl: "https://incydent.cert.pl",
        handles: ["phishing", "cybercrime", "bec", "identity-theft", "impersonation"],
        note: {
          en: "National CERT — report phishing, malware and compromised accounts at incydent.cert.pl; technical incident handling, financial fraud goes to the police.",
          fr: "CERT national — signalez le phishing, les logiciels malveillants et les comptes compromis sur incydent.cert.pl ; gestion des incidents techniques, la fraude financière relevant de la police.",
        },
      },
      {
        name: "Policja (Polish National Police)",
        role: "police",
        website: "https://www.policja.gov.pl",
        handles: ["financial-fraud", "online-scams", "cybercrime", "romance", "bec"],
        note: {
          en: "Report fraud at any police station or online; call 112 in an emergency.",
          fr: "Signalez la fraude dans n'importe quel commissariat ou en ligne ; en cas d'urgence, appelez le 112.",
        },
      },
      {
        name: "UOKiK — Office of Competition and Consumer Protection",
        role: "consumer-protection",
        website: "https://www.uokik.gov.pl",
        handles: ["shopping", "online-scams", "investment", "impersonation"],
        note: {
          en: "Office of competition and consumer protection — complaints against traders and warnings about unfair practices; administrative, not criminal.",
          fr: "Office de la concurrence et de la protection des consommateurs — réclamations contre les commerçants et avertissements sur les pratiques déloyales ; administratif, pas pénal.",
        },
      },
      {
        name: "KNF — Polish Financial Supervision Authority",
        role: "financial-regulator",
        website: "https://www.knf.gov.pl",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Financial supervision authority — public warning list of entities operating without a licence; supervisory role.",
          fr: "Autorité polonaise de supervision financière — liste publique d'avertissement des entités exerçant sans agrément ; rôle de supervision.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "CERT Polska (official site)", url: "https://www.cert.pl" },
      { label: "KNF (official site)", url: "https://www.knf.gov.pl" },
      { label: "Policja (official site)", url: "https://www.policja.gov.pl" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "AT",
    name: "Austria",
    nameFr: "Autriche",
    continent: "europe",
    emergency: "133 (police) / 112",
    agencies: [
      {
        name: "CERT.at — Austrian national CERT",
        role: "cert",
        website: "https://www.cert.at",
        handles: ["phishing", "cybercrime", "bec", "impersonation"],
        note: {
          en: "National CERT — technical incident reports (phishing, malware, attacks on networks); it does not investigate financial fraud.",
          fr: "CERT national autrichien — signalements d'incidents techniques (phishing, logiciels malveillants, attaques de réseaux) ; il n'enquête pas sur la fraude financière.",
        },
      },
      {
        name: "Polizei (Austria)",
        role: "police",
        website: "https://www.polizei.gv.at",
        handles: ["financial-fraud", "online-scams", "cybercrime", "romance"],
        note: {
          en: "File a criminal complaint (Anzeige) online or at any police station; call 133 (or 112) in an emergency.",
          fr: "Déposez plainte (Anzeige) en ligne ou dans n'importe quel commissariat ; en cas d'urgence, appelez le 133 (ou le 112).",
        },
      },
      {
        name: "VKI — Association for Consumer Information (Austria)",
        role: "consumer-protection",
        website: "https://www.vki.at",
        handles: ["shopping", "online-scams", "investment", "romance"],
        note: {
          en: "Consumer information association — advice, scam warnings and support in consumer disputes; advisory role.",
          fr: "Association autrichienne pour l'information des consommateurs — conseils, alertes sur les arnaques et aide dans les litiges de consommation ; rôle de conseil.",
        },
      },
      {
        name: "FMA — Austrian Financial Market Authority",
        role: "financial-regulator",
        website: "https://www.fma.gv.at",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Financial market authority — warnings on unauthorised investment firms and clone companies; supervisory role.",
          fr: "Autorité autrichienne des marchés financiers — avertissements sur les sociétés d'investissement non autorisées et les entreprises « clones » ; rôle de supervision.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 133 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 133.",
    },
    sources: [
      { label: "CERT.at (official site)", url: "https://www.cert.at" },
      { label: "Polizei Österreich (official site)", url: "https://www.polizei.gv.at" },
      { label: "VKI (official site)", url: "https://www.vki.at" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "DK",
    name: "Denmark",
    nameFr: "Danemark",
    continent: "europe",
    emergency: "112",
    agencies: [
      {
        name: "Politiet (Danish police)",
        role: "police",
        website: "https://politi.dk",
        handles: ["financial-fraud", "online-scams", "cybercrime", "romance", "bec"],
        note: {
          en: "Report fraud online or at any police station; call 112 in an emergency.",
          fr: "Signalez la fraude en ligne ou dans n'importe quel commissariat ; en cas d'urgence, appelez le 112.",
        },
      },
      {
        name: "CFCS — Danish Centre for Cyber Security",
        role: "cert",
        website: "https://www.cfcs.dk",
        handles: ["phishing", "cybercrime", "bec", "impersonation"],
        note: {
          en: "National IT-security authority — threat alerts and handling of serious cyber incidents; technical work, no financial investigations.",
          fr: "Autorité nationale danoise de sécurité informatique — alertes sur les menaces et traitement des cyberincidents graves ; travail technique, pas d'enquêtes financières.",
        },
      },
      {
        name: "Sikker Digital — official digital-security portal",
        role: "consumer-protection",
        website: "https://www.sikkerdigital.dk",
        handles: ["phishing", "online-scams", "identity-theft", "impersonation"],
        note: {
          en: "Official citizen portal for digital security — guidance on scams and reporting of fraudulent websites and phishing; advice and referral.",
          fr: "Portail officiel danois de sécurité numérique — conseils sur les arnaques et signalement des sites frauduleux et du phishing ; conseils et orientation.",
        },
      },
      {
        name: "Finanstilsynet — Danish Financial Supervisory Authority",
        role: "financial-regulator",
        website: "https://finanstilsynet.dk",
        handles: ["investment", "financial-fraud", "bank-transfer"],
        note: {
          en: "Financial supervisory authority — complaints about banks' handling of fraud and warnings about unauthorised firms.",
          fr: "Autorité danoise de supervision financière — réclamations sur le traitement des fraudes par les banques et avertissements sur les sociétés non autorisées.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "Politiet (official site)", url: "https://politi.dk" },
      { label: "Sikker Digital (official portal)", url: "https://www.sikkerdigital.dk" },
      { label: "Finanstilsynet (official site)", url: "https://finanstilsynet.dk" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "FI",
    name: "Finland",
    nameFr: "Finlande",
    continent: "europe",
    emergency: "112",
    agencies: [
      {
        name: "Poliisi — Finnish Police",
        role: "police",
        website: "https://poliisi.fi",
        handles: ["financial-fraud", "online-scams", "cybercrime", "romance", "bec"],
        note: {
          en: "Report crimes online (nettirikosilmoitus) or at any police station; call 112 in an emergency.",
          fr: "Signalez les infractions en ligne (nettirikosilmoitus) ou dans n'importe quel commissariat ; en cas d'urgence, appelez le 112.",
        },
      },
      {
        name: "NCSC-FI — Traficom Cyber Security Centre",
        role: "cert",
        website: "https://www.kyberturvallisuuskeskus.fi",
        handles: ["phishing", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "Traficom's Cyber Security Centre — report online scams and phishing; guidance and technical incident handling, criminal investigations go to the police.",
          fr: "Centre de cybersécurité de Traficom — signalez les arnaques en ligne et le phishing ; conseils et gestion technique des incidents, les enquêtes pénales relevant de la police.",
        },
      },
      {
        name: "Finanssivalvonta — Finnish Financial Supervisory Authority",
        role: "financial-regulator",
        website: "https://www.finanssivalvonta.fi",
        handles: ["investment", "crypto", "bank-transfer", "financial-fraud"],
        note: {
          en: "Financial supervision authority — warnings on unauthorised investment services; complaints about supervised entities.",
          fr: "Autorité finlandaise de supervision financière — avertissements sur les services d'investissement non autorisés ; réclamations concernant les entités supervisées.",
        },
      },
      {
        name: "KKV — Finnish Competition and Consumer Authority",
        role: "consumer-protection",
        website: "https://www.kkv.fi",
        handles: ["shopping", "online-scams", "investment", "romance"],
        note: {
          en: "Competition and consumer authority — consumer advice and assistance in disputes with traders.",
          fr: "Autorité finlandaise de la concurrence et de la consommation — conseils aux consommateurs et aide dans les litiges avec les commerçants.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "Poliisi (official site)", url: "https://poliisi.fi" },
      { label: "NCSC-FI / Traficom (official site)", url: "https://www.kyberturvallisuuskeskus.fi" },
      { label: "KKV (official site)", url: "https://www.kkv.fi" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  /* ------------------------------------------------------------------ */
  /* NORTH AMERICA                                                       */
  /* ------------------------------------------------------------------ */
  {
    code: "US",
    name: "United States",
    nameFr: "États-Unis",
    continent: "north-america",
    emergency: "911",
    agencies: [
      {
        name: "FBI IC3 — Internet Crime Complaint Center",
        role: "reporting-portal",
        website: "https://www.ic3.gov",
        handles: ["online-scams", "financial-fraud", "bec", "crypto", "romance", "impersonation", "cybercrime"],
        note: {
          en: "The FBI's Internet Crime Complaint Center — the central US portal for reporting online fraud (BEC, romance, investment and tech-support scams); complaints are analysed and routed to law enforcement, so file even for small losses.",
          fr: "Centre de plaintes pour la criminalité sur Internet du FBI — portail central américain pour signaler la fraude en ligne (BEC, arnaques sentimentales, aux placements et au faux support technique) ; les plaintes sont analysées et transmises aux autorités, signalez donc même pour des pertes modestes.",
        },
      },
      {
        name: "FTC — ReportFraud.gov",
        role: "reporting-portal",
        website: "https://reportfraud.ftc.gov",
        handles: ["shopping", "online-scams", "impersonation", "financial-fraud", "identity-theft"],
        note: {
          en: "Federal Trade Commission consumer fraud portal — report scams, dubious business practices and identity theft to feed consumer-law enforcement; for crimes in progress call 911.",
          fr: "Portail de signalement des fraudes de la Federal Trade Commission — signalez arnaques, pratiques commerciales douteuses et usurpation d'identité pour alimenter l'action au titre du droit de la consommation ; pour une infraction en cours, appelez le 911.",
        },
      },
      {
        name: "CISA — Cybersecurity and Infrastructure Security Agency",
        role: "cert",
        website: "https://www.cisa.gov",
        handles: ["phishing", "cybercrime", "bec", "impersonation"],
        note: {
          en: "Cyber-security and infrastructure agency — report phishing and malicious infrastructure; technical mitigation, no victim reimbursement.",
          fr: "Agence de cybersécurité et de sécurité des infrastructures — signalez le phishing et les infrastructures malveillantes ; mesures techniques, sans indemnisation des victimes.",
        },
      },
      {
        name: "USPIS — US Postal Inspection Service",
        role: "police",
        website: "https://www.uspis.gov",
        handles: ["bec", "impersonation", "financial-fraud"],
        note: {
          en: "Postal law-enforcement service — investigates fraud committed through the US Mail (fake lotteries, mail-order and cheque scams); report when the scam used the postal service.",
          fr: "Service fédéral d'inspection postale — enquête sur les fraudes commises via le courrier américain (fausses loteries, arnaques par correspondance et par chèque) ; signalez lorsque l'arnaque a utilisé le service postal.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station or sheriff's office with your evidence; call 911 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat ou bureau du shérif, avec vos preuves ; en cas d'urgence, appelez le 911.",
    },
    sources: [
      { label: "FBI IC3 (official portal)", url: "https://www.ic3.gov" },
      { label: "FTC ReportFraud (official portal)", url: "https://reportfraud.ftc.gov" },
      { label: "USPIS (official site)", url: "https://www.uspis.gov" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "CA",
    name: "Canada",
    nameFr: "Canada",
    continent: "north-america",
    emergency: "911",
    agencies: [
      {
        name: "CAFC — Canadian Anti-Fraud Centre",
        role: "reporting-portal",
        website: "https://www.antifraudcentre-centreantifraude.ca",
        phone: "1-888-495-8501",
        handles: ["online-scams", "financial-fraud", "romance", "impersonation", "crypto", "bec"],
        note: {
          en: "National anti-fraud centre — central Canadian reporting point for scams and fraud (phone or online); reports feed the national fraud database used by police — also file with your local police if you lost money.",
          fr: "Centre antifraude national — point central canadien de signalement des fraudes (par téléphone ou en ligne) ; les signalements alimentent la base nationale utilisée par la police — déposez aussi une plainte locale en cas de perte d'argent.",
        },
      },
      {
        name: "Cyber Centre — Canadian Centre for Cyber Security",
        role: "cert",
        website: "https://www.cyber.gc.ca",
        handles: ["phishing", "cybercrime", "bec", "impersonation"],
        note: {
          en: "National cyber-security authority — report cyber incidents and phishing; technical handling, not financial investigations.",
          fr: "Autorité nationale canadienne de cybersécurité — signalez les incidents informatiques et le phishing ; traitement technique, pas d'enquêtes financières.",
        },
      },
      {
        name: "RCMP — Royal Canadian Mounted Police",
        role: "police",
        website: "https://www.rcmp-grc.gc.ca",
        handles: ["financial-fraud", "cybercrime", "online-scams", "bec"],
        note: {
          en: "Federal police — investigates serious fraud and organised crime; local police also accept fraud complaints; call 911 in an emergency.",
          fr: "Police fédérale — enquête sur les fraudes graves et la criminalité organisée ; la police locale accepte aussi les plaintes pour fraude ; en cas d'urgence, appelez le 911.",
        },
      },
      {
        name: "Competition Bureau (Canada)",
        role: "consumer-protection",
        website: "https://www.competitionbureau.gc.ca",
        handles: ["shopping", "online-scams", "investment", "impersonation"],
        note: {
          en: "Enforces the law against deceptive marketing — report misleading ads, fake offers and pyramid-selling schemes; administrative enforcement, crimes go to the police.",
          fr: "Applique la loi contre les pratiques commerciales trompeuses — signalez les publicités mensongères, les fausses offres et les systèmes de vente pyramidale ; exécution administrative, les infractions pénales relevant de la police.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any local police station or RCMP detachment with your evidence; call 911 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel poste de police local ou détachement de la GRC, avec vos preuves ; en cas d'urgence, appelez le 911.",
    },
    sources: [
      { label: "Canadian Anti-Fraud Centre (official site)", url: "https://www.antifraudcentre-centreantifraude.ca" },
      { label: "Canadian Centre for Cyber Security (official site)", url: "https://www.cyber.gc.ca" },
      { label: "RCMP (official site)", url: "https://www.rcmp-grc.gc.ca" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "MX",
    name: "Mexico",
    nameFr: "Mexique",
    continent: "north-america",
    emergency: "911",
    agencies: [
      {
        name: "SSPC — Ministry of Security and Citizen Protection (Mexico)",
        role: "police",
        website: "https://www.gob.mx/sspc",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "Ministry of Security and Citizen Protection — oversees federal security forces, including the Guardia Nacional; emergencies 911; fraud complaints (denuncia) are also filed with state prosecutors' offices.",
          fr: "Ministère de la Sécurité et de la Protection citoyenne — supervise les forces fédérales, y compris la Garde nationale ; urgences : 911 ; les dénonciations de fraude se déposent aussi auprès des parquets des États.",
        },
      },
      {
        name: "PROFECO — Federal Consumer Protection Office (Mexico)",
        role: "consumer-protection",
        website: "https://www.gob.mx/profeco",
        handles: ["shopping", "online-scams", "impersonation", "romance"],
        note: {
          en: "Federal consumer protection agency — complaints and conciliation with suppliers (fake offers, misleading advertising, online shopping problems); administrative, not criminal.",
          fr: "Agence fédérale de protection du consommateur — réclamations et conciliation avec les fournisseurs (fausses offres, publicité trompeuse, problèmes d'achat en ligne) ; administratif, pas pénal.",
        },
      },
      {
        name: "IFT — Federal Telecommunications Institute (Mexico)",
        role: "consumer-protection",
        website: "https://www.ift.org.mx",
        handles: ["phishing", "impersonation", "mobile-money"],
        note: {
          en: "Telecom regulator — complaints about telephone and internet providers (spam calls, spoofed numbers, premium-charge traps); it regulates operators, it does not investigate fraud.",
          fr: "Régulateur des télécommunications — réclamations contre les opérateurs téléphoniques et Internet (appels indésirables, numéros usurpés, pièges de surtaxe) ; il régule les opérateurs, sans enquêter sur la fraude.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station or with your state prosecutor's office (Ministerio Público), with your evidence; call 911 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat ou auprès du ministère public de votre État, avec vos preuves ; en cas d'urgence, appelez le 911.",
    },
    sources: [
      { label: "SSPC (official site)", url: "https://www.gob.mx/sspc" },
      { label: "PROFECO (official site)", url: "https://www.gob.mx/profeco" },
      { label: "IFT (official site)", url: "https://www.ift.org.mx" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  /* ------------------------------------------------------------------ */
  /* SOUTH AMERICA                                                       */
  /* ------------------------------------------------------------------ */
  {
    code: "BR",
    name: "Brazil",
    nameFr: "Brésil",
    continent: "south-america",
    emergency: "190",
    agencies: [
      {
        name: "Polícia Federal (Brazil)",
        role: "police",
        website: "https://www.gov.br/pf",
        handles: ["financial-fraud", "cybercrime", "online-scams", "bec", "child-exploitation"],
        note: {
          en: "Federal police — investigates cybercrime, financial fraud and money laundering; file a complaint (notícia de crime) online or at a federal police station.",
          fr: "Police fédérale — enquête sur la cybercriminalité, la fraude financière et le blanchiment ; déposez une plainte (notícia de crime) en ligne ou dans une délégation fédérale.",
        },
      },
      {
        name: "Consumidor.gov.br — government consumer complaint platform",
        role: "reporting-portal",
        website: "https://www.consumidor.gov.br",
        handles: ["shopping", "online-scams", "impersonation"],
        note: {
          en: "Government consumer-complaint platform — register disputes with companies that are tracked to a response; consumer disputes, criminal cases go to the police.",
          fr: "Plateforme gouvernementale de réclamations des consommateurs — enregistrez vos litiges avec les entreprises, suivis jusqu'à réponse ; litiges de consommation, les affaires pénales relevant de la police.",
        },
      },
      {
        name: "CERT.br — Brazilian CERT",
        role: "cert",
        website: "https://www.cert.br",
        handles: ["phishing", "cybercrime", "identity-theft", "child-exploitation"],
        note: {
          en: "National CERT — report security incidents (phishing, malware, scams, child exploitation); technical statistics and handling, not investigations.",
          fr: "CERT brésilien — signalez les incidents de sécurité (phishing, logiciels malveillants, arnaques, exploitation des mineurs) ; statistiques et traitement techniques, pas d'enquêtes.",
        },
      },
      {
        name: "Banco Central do Brasil",
        role: "financial-regulator",
        website: "https://www.bcb.gov.br",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "crypto"],
        note: {
          en: "Central bank — supervises banks and the Pix payment system; contact your institution immediately to contest unauthorised transfers, then file complaints about the institution with the BCB.",
          fr: "Banque centrale — supervise les banques et le système de paiement Pix ; contactez immédiatement votre établissement pour contester les transferts non autorisés, puis déposez vos réclamations contre l'établissement auprès de la BCB.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station (delegacia) with your evidence; call 190 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quelle délégation de police, avec vos preuves ; en cas d'urgence, appelez le 190.",
    },
    sources: [
      { label: "Polícia Federal (official site)", url: "https://www.gov.br/pf" },
      { label: "Consumidor.gov.br (official platform)", url: "https://www.consumidor.gov.br" },
      { label: "CERT.br (official site)", url: "https://www.cert.br" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "AR",
    name: "Argentina",
    nameFr: "Argentine",
    continent: "south-america",
    emergency: "911",
    agencies: [
      {
        name: "MPF — Federal Prosecution Service (UFECI cybercrime unit)",
        role: "cybercrime-unit",
        website: "https://www.mpf.gob.ar",
        handles: ["cybercrime", "online-scams", "financial-fraud", "bec", "child-exploitation"],
        note: {
          en: "Federal prosecutor's office — its specialised cybercrime prosecution unit (UFECI) pursues online fraud; criminal complaints (denuncia) can be filed with the federal prosecutor's office, which directs investigations.",
          fr: "Ministère public fédéral — son unité spécialisée de poursuite des cyberinfractions (UFECI) traite la fraude en ligne ; les dénonciations pénales peuvent être déposées auprès du parquet fédéral, qui oriente les enquêtes.",
        },
      },
      {
        name: "Policía Federal Argentina",
        role: "police",
        website: "https://www.policiafederal.gob.ar",
        handles: ["financial-fraud", "cybercrime", "online-scams", "impersonation"],
        note: {
          en: "Federal police — takes criminal complaints (denuncia) for fraud and cybercrime at its delegations; call 911 in an emergency.",
          fr: "Police fédérale argentine — reçoit les dénonciations de fraude et de cybercriminalité dans ses délégations ; en cas d'urgence, appelez le 911.",
        },
      },
      {
        name: "CNV — National Securities Commission (Argentina)",
        role: "financial-regulator",
        website: "https://www.cnv.gov.ar",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Securities regulator — warnings on unauthorised financial intermediaries and fake investment platforms; supervisory role.",
          fr: "Commission nationale des valeurs mobilières — avertissements sur les intermédiaires financiers non autorisés et les fausses plateformes d'investissement ; rôle de supervision.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also file a criminal complaint (denuncia) at any police station or with the federal prosecutor's office, with your evidence; call 911 in an emergency.",
      fr: "Vous pouvez aussi déposer une dénonciation dans n'importe quel commissariat ou auprès du parquet fédéral, avec vos preuves ; en cas d'urgence, appelez le 911.",
    },
    sources: [
      { label: "Argentina.gob.ar (official government portal)", url: "https://www.argentina.gob.ar" },
      { label: "MPF (official site)", url: "https://www.mpf.gob.ar" },
      { label: "CNV (official site)", url: "https://www.cnv.gov.ar" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "CL",
    name: "Chile",
    nameFr: "Chili",
    continent: "south-america",
    emergency: "133",
    agencies: [
      {
        name: "PDI — Policía de Investigaciones (Chile)",
        role: "police",
        website: "https://www.policia.cl",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "Investigations police — fraud complaints (denuncia) at any unit, online or in person; call 133 in an emergency.",
          fr: "Police d'investigations — plaintes pour fraude (denuncia) dans n'importe quelle unité, en ligne ou en personne ; en cas d'urgence, appelez le 133.",
        },
      },
      {
        name: "SERNAC — National Consumer Service (Chile)",
        role: "consumer-protection",
        website: "https://www.sernac.cl",
        handles: ["shopping", "online-scams", "investment", "romance"],
        note: {
          en: "National consumer service — complaints against suppliers, product alerts and consumer guidance; administrative, criminal cases go to the police.",
          fr: "Service national des consommateurs — réclamations contre les fournisseurs, alertes produits et conseils aux consommateurs ; administratif, les affaires pénales relevant de la police.",
        },
      },
      {
        name: "CMF — Commission for the Financial Market (Chile)",
        role: "financial-regulator",
        website: "https://www.cmfchile.cl",
        handles: ["investment", "bank-transfer", "financial-fraud", "crypto"],
        note: {
          en: "Financial-market commission — supervises banks, insurers and securities; complaints about supervised entities.",
          fr: "Commission pour le marché financier — supervise les banques, assurances et valeurs mobilières ; réclamations concernant les entités supervisées.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station or PDI unit with your evidence; call 133 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat ou unité de la PDI, avec vos preuves ; en cas d'urgence, appelez le 133.",
    },
    sources: [
      { label: "PDI (official site)", url: "https://www.policia.cl" },
      { label: "SERNAC (official site)", url: "https://www.sernac.cl" },
      { label: "CMF (official site)", url: "https://www.cmfchile.cl" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "CO",
    name: "Colombia",
    nameFr: "Colombie",
    continent: "south-america",
    emergency: "123",
    agencies: [
      {
        name: "Policía Nacional (Colombia)",
        role: "police",
        website: "https://www.policia.gov.co",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "National police — fraud complaints via the CAI Virtual (online) or at any station; call 123 in an emergency.",
          fr: "Police nationale — plaintes pour fraude via le CAI Virtual (en ligne) ou dans n'importe quel poste ; en cas d'urgence, appelez le 123.",
        },
      },
      {
        name: "SIC — Superintendence of Industry and Commerce (Colombia)",
        role: "consumer-protection",
        website: "https://www.sic.gov.co",
        handles: ["shopping", "online-scams", "investment", "impersonation"],
        note: {
          en: "Superintendence of Industry and Commerce — consumer complaints against traders and enforcement of fair-trading rules; administrative, not criminal.",
          fr: "Superintendance de l'industrie et du commerce — réclamations des consommateurs contre les commerçants et application des règles de loyauté commerciale ; administratif, pas pénal.",
        },
      },
      {
        name: "SFC — Financial Superintendence of Colombia",
        role: "financial-regulator",
        website: "https://www.superfinanciera.gov.co",
        handles: ["investment", "bank-transfer", "financial-fraud", "crypto"],
        note: {
          en: "Financial superintendence — complaints about banks and supervised entities; warnings on unauthorised operators.",
          fr: "Superintendance financière — réclamations contre les banques et entités supervisées ; avertissements sur les opérateurs non autorisés.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 123 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 123.",
    },
    sources: [
      { label: "Policía Nacional (official site)", url: "https://www.policia.gov.co" },
      { label: "SIC (official site)", url: "https://www.sic.gov.co" },
      { label: "SFC (official site)", url: "https://www.superfinanciera.gov.co" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "PE",
    name: "Peru",
    nameFr: "Pérou",
    continent: "south-america",
    emergency: "105",
    agencies: [
      {
        name: "PNP — National Police of Peru",
        role: "police",
        website: "https://www.pnp.gob.pe",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "National police — fraud complaints (denuncia) at police stations, including its cybercrime divisions; call 105 in an emergency.",
          fr: "Police nationale — plaintes pour fraude (denuncia) dans les commissariats, y compris ses divisions de cybercriminalité ; en cas d'urgence, appelez le 105.",
        },
      },
      {
        name: "Indecopi — consumer protection agency (Peru)",
        role: "consumer-protection",
        website: "https://www.gob.pe/indecopi",
        handles: ["shopping", "online-scams", "investment", "romance"],
        note: {
          en: "Consumer protection agency — complaints against suppliers, scam alerts and consumer guidance.",
          fr: "Organisme de protection du consommateur — réclamations contre les fournisseurs, alertes sur les arnaques et conseils aux consommateurs.",
        },
      },
      {
        name: "SBS — Superintendence of Banking and Insurance (Peru)",
        role: "financial-regulator",
        website: "https://www.sbs.gob.pe",
        handles: ["bank-transfer", "financial-fraud", "mobile-money"],
        note: {
          en: "Banking, insurance and pensions supervisor — complaints about supervised entities and alerts on unauthorised operators.",
          fr: "Superintendance des banques, assurances et retraites — réclamations concernant les entités supervisées et alertes sur les opérateurs non autorisés.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 105 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 105.",
    },
    sources: [
      { label: "PNP (official site)", url: "https://www.pnp.gob.pe" },
      { label: "Indecopi (official site)", url: "https://www.gob.pe/indecopi" },
      { label: "SBS (official site)", url: "https://www.sbs.gob.pe" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  /* ------------------------------------------------------------------ */
  /* ASIA                                                                */
  /* ------------------------------------------------------------------ */
  {
    code: "IN",
    name: "India",
    nameFr: "Inde",
    continent: "asia",
    emergency: "112",
    agencies: [
      {
        name: "National Cyber Crime Reporting Portal (India)",
        role: "reporting-portal",
        website: "https://cybercrime.gov.in",
        phone: "1930",
        handles: ["online-scams", "financial-fraud", "mobile-money", "romance", "impersonation", "cybercrime", "bec"],
        note: {
          en: "Official portal of the Ministry of Home Affairs for reporting cybercrime — online financial fraud (including UPI / mobile-money scams), online harassment and other cyber offences; the 1930 cybercrime helpline can trigger quick freezing of fraudulent transfers through banks.",
          fr: "Portail national officiel du ministère de l'Intérieur pour signaler la cybercriminalité — fraude financière en ligne (y compris arnaques UPI / mobile money), harcèlement en ligne et autres cyberinfractions ; la ligne d'assistance 1930 peut déclencher le gel rapide des transferts frauduleux via les banques.",
        },
      },
      {
        name: "CERT-In — Indian Computer Emergency Response Team",
        role: "cert",
        website: "https://www.cert-in.org.in",
        handles: ["phishing", "cybercrime", "bec", "identity-theft", "child-exploitation"],
        note: {
          en: "National CERT — technical incident reporting (phishing, malware, website compromises); it does not investigate financial fraud.",
          fr: "CERT national indien — signalement des incidents techniques (phishing, logiciels malveillants, compromission de sites) ; il n'enquête pas sur la fraude financière.",
        },
      },
      {
        name: "RBI — Reserve Bank of India",
        role: "financial-regulator",
        website: "https://www.rbi.org.in",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "investment"],
        note: {
          en: "Central bank — complain first to your bank (or via the RBI's Complaint Management System at cms.rbi.org.in) about failed or fraudulent transactions, with ombudsman escalation for unresolved disputes.",
          fr: "Banque centrale — réclamez d'abord auprès de votre banque (ou via le système de gestion des réclamations de la RBI sur cms.rbi.org.in) pour les opérations frauduleuses ou non abouties, avec recours à l'ombudsman pour les litiges non résolus.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station (or cyber police station) with your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat (ou commissariat cyber), avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "National Cyber Crime Reporting Portal (official portal)", url: "https://cybercrime.gov.in" },
      { label: "CERT-In (official site)", url: "https://www.cert-in.org.in" },
      { label: "RBI (official site)", url: "https://www.rbi.org.in" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "CN",
    name: "China",
    nameFr: "Chine",
    continent: "asia",
    emergency: "110",
    agencies: [
      {
        name: "12321 — spam and phishing complaint centre (China)",
        role: "reporting-portal",
        website: "https://www.12321.cn",
        handles: ["phishing", "impersonation", "online-scams"],
        note: {
          en: "Official complaint centre for unsolicited calls and messages (under the Ministry of Industry and Information Technology) — report spam SMS, phishing messages and harassing numbers; telecom complaints, not criminal investigations.",
          fr: "Centre officiel de réclamations pour les appels et messages non sollicités (relevant du ministère de l'Industrie et des Technologies de l'information) — signalez les SMS indésirables, le phishing et les numéros harcelants ; réclamations télécom, pas d'enquêtes pénales.",
        },
      },
      {
        name: "12315 — market regulation complaint platform (China)",
        role: "consumer-protection",
        website: "https://www.12315.cn",
        handles: ["shopping", "online-scams", "impersonation"],
        note: {
          en: "Market-regulation complaint platform — disputes with merchants, counterfeit goods and fraudulent online shops; administrative enforcement.",
          fr: "Plateforme de réclamations de la régulation du marché — litiges avec les commerçants, contrefaçons et fausses boutiques en ligne ; exécution administrative.",
        },
      },
      {
        name: "MPS — Ministry of Public Security (China)",
        role: "police",
        website: "https://www.mps.gov.cn",
        handles: ["financial-fraud", "cybercrime", "online-scams", "bec"],
        note: {
          en: "Ministry of Public Security — report crimes at any police station or through local police online channels; call 110 in an emergency.",
          fr: "Ministère de la Sécurité publique — signalez les infractions dans n'importe quel poste de police ou via les canaux en ligne des polices locales ; en cas d'urgence, appelez le 110.",
        },
      },
      {
        name: "PBOC — People's Bank of China",
        role: "financial-regulator",
        website: "http://www.pbc.gov.cn",
        handles: ["bank-transfer", "mobile-money", "financial-fraud"],
        note: {
          en: "Central bank — supervises banks and payment institutions; complain about payment services (including mobile payments) to your provider first, then to the PBOC if unresolved.",
          fr: "Banque centrale chinoise — supervise les banques et les établissements de paiement ; réclamez d'abord auprès de votre prestataire de paiement (y compris mobile), puis auprès de la PBOC en cas d'absence de réponse.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 110 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 110.",
    },
    sources: [
      { label: "12321 complaint centre (official site)", url: "https://www.12321.cn" },
      { label: "12315 platform (official site)", url: "https://www.12315.cn" },
      { label: "PBOC (official site)", url: "http://www.pbc.gov.cn" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "JP",
    name: "Japan",
    nameFr: "Japon",
    continent: "asia",
    emergency: "110",
    agencies: [
      {
        name: "NPA — National Police Agency (Japan)",
        role: "police",
        website: "https://www.npa.go.jp",
        phone: "#9110",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation", "bec"],
        note: {
          en: "National police — criminal complaints at any police station or koban; #9110 (dialled with the # key) is the dedicated cybercrime consultation hotline. Emergencies: 110.",
          fr: "Police nationale — plaintes pénales dans n'importe quel commissariat ou kōban ; le #9110 (composé avec la touche #) est la ligne dédiée de consultation en cybercriminalité. Urgences : 110.",
        },
      },
      {
        name: "NCSC — national cybersecurity centre (NISC, Japan)",
        role: "cert",
        website: "https://www.nisc.go.jp",
        handles: ["phishing", "cybercrime", "bec", "impersonation"],
        note: {
          en: "Government cybersecurity headquarters — national incident information, alerts and coordination between agencies; a technical policy body, not an investigative agency.",
          fr: "Quartier général gouvernemental de la cybersécurité — informations sur les incidents nationaux, alertes et coordination entre administrations ; organe technique de politique publique, pas un service d'enquête.",
        },
      },
      {
        name: "CAA — Consumer Affairs Agency (Japan)",
        role: "consumer-protection",
        website: "https://www.caa.go.jp",
        phone: "188",
        handles: ["shopping", "online-scams", "impersonation", "romance"],
        note: {
          en: "Consumer Affairs Agency — dial 188 for the consumer hotline, which advises on online shopping disputes and billing scams; administrative consumer protection.",
          fr: "Agence des affaires des consommateurs — composez le 188 pour la ligne d'assistance consommateur, qui conseille sur les litiges d'achat en ligne et les fausses facturations ; protection administrative du consommateur.",
        },
      },
      {
        name: "FSA — Financial Services Agency (Japan)",
        role: "financial-regulator",
        website: "https://www.fsa.go.jp",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Financial regulator — warnings on unauthorised investment and deposit solicitation.",
          fr: "Régulateur financier japonais — avertissements sur les sollicitations d'investissement et de dépôts non autorisées.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station or koban (police box) with your evidence; call 110 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat ou kōban (poste de police), avec vos preuves ; en cas d'urgence, appelez le 110.",
    },
    sources: [
      { label: "NPA (official site)", url: "https://www.npa.go.jp" },
      { label: "NISC / NCSC (official site)", url: "https://www.nisc.go.jp" },
      { label: "CAA (official site)", url: "https://www.caa.go.jp" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "SG",
    name: "Singapore",
    nameFr: "Singapour",
    continent: "asia",
    emergency: "999",
    agencies: [
      {
        name: "ScamShield (Singapore)",
        role: "reporting-portal",
        website: "https://www.scamshield.gov.sg",
        phone: "1799",
        handles: ["online-scams", "impersonation", "phishing", "romance"],
        note: {
          en: "National anti-scam portal and app — report scam messages, calls and websites; the ScamShield Helpline 1799 advises victims on next steps.",
          fr: "Portail et application nationaux de lutte contre les arnaques — signalez les messages, appels et sites frauduleux ; la ligne d'assistance ScamShield 1799 conseille les victimes sur les étapes à suivre.",
        },
      },
      {
        name: "SPF — Singapore Police Force",
        role: "police",
        website: "https://www.police.gov.sg",
        reportingUrl: "https://www.police.gov.sg/e-services",
        handles: ["financial-fraud", "cybercrime", "online-scams", "romance", "bec"],
        note: {
          en: "Police — file a report online via police e-services (i-Witness) or at any neighbourhood police centre; call 999 in an emergency.",
          fr: "Police — déposez un rapport en ligne via les e-services de la police (i-Witness) ou dans n'importe quel centre de police de quartier ; en cas d'urgence, appelez le 999.",
        },
      },
      {
        name: "CAD — Commercial Affairs Department (Singapore)",
        role: "cybercrime-unit",
        website: "https://www.cad.gov.sg",
        handles: ["financial-fraud", "investment", "bec", "crypto"],
        note: {
          en: "Police department for white-collar crime — investigates complex commercial and financial fraud, including investment scams.",
          fr: "Département de police chargé de la délinquance en col blanc — enquête sur les fraudes commerciales et financières complexes, y compris les arnaques aux investissements.",
        },
      },
      {
        name: "MAS — Monetary Authority of Singapore",
        role: "financial-regulator",
        website: "https://www.mas.gov.sg",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Central bank and financial regulator — Investor Alert List of unauthorised firms; supervisory role, no criminal investigation.",
          fr: "Banque centrale et régulateur financier — liste d'alerte des investisseurs recensant les sociétés non autorisées ; rôle de supervision, pas d'enquête pénale.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any neighbourhood police centre or post with your evidence; call 999 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel centre ou poste de police de quartier, avec vos preuves ; en cas d'urgence, appelez le 999.",
    },
    sources: [
      { label: "ScamShield (official portal)", url: "https://www.scamshield.gov.sg" },
      { label: "Singapore Police Force (official site)", url: "https://www.police.gov.sg" },
      { label: "MAS (official site)", url: "https://www.mas.gov.sg" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "MY",
    name: "Malaysia",
    nameFr: "Malaisie",
    continent: "asia",
    emergency: "999",
    agencies: [
      {
        name: "NFCC — National Fraud Coordination Centre (Malaysia)",
        role: "reporting-portal",
        website: "https://nfcc.jpm.gov.my",
        phone: "997",
        handles: ["online-scams", "financial-fraud", "bank-transfer", "impersonation", "romance"],
        note: {
          en: "National fraud coordination centre — its NSRC 997 hotline gives scam victims immediate help, working with banks and telcos to freeze accounts and block numbers; it coordinates the national response with the police.",
          fr: "Centre national de coordination de la fraude — sa ligne NSRC 997 apporte une aide immédiate aux victimes, en lien avec les banques et les opérateurs pour geler les comptes et bloquer les numéros ; il coordonne la réponse nationale avec la police.",
        },
      },
      {
        name: "PDRM — Royal Malaysia Police",
        role: "police",
        website: "https://www.rmp.gov.my",
        handles: ["financial-fraud", "cybercrime", "online-scams", "bec"],
        note: {
          en: "Royal Malaysia Police — lodge a police report at any station or online; call 999 in an emergency.",
          fr: "Police royale de Malaisie — déposez un rapport de police dans n'importe quel poste ou en ligne ; en cas d'urgence, appelez le 999.",
        },
      },
      {
        name: "BNM — Bank Negara Malaysia",
        role: "financial-regulator",
        website: "https://www.bnm.gov.my",
        handles: ["bank-transfer", "mobile-money", "financial-fraud", "investment"],
        note: {
          en: "Central bank — complain to your bank or e-money issuer first, then to Bank Negara Malaysia through its complaint channels if the fraud-handling complaint is unresolved; it supervises financial institutions.",
          fr: "Banque centrale — réclamez d'abord auprès de votre banque ou émetteur d'e-money, puis auprès de la Bank Negara Malaysia via ses canaux de réclamation si le litige n'est pas résolu ; elle supervise les institutions financières.",
        },
      },
      {
        name: "MCMC — Malaysian Communications and Multimedia Commission",
        role: "consumer-protection",
        website: "https://www.mcmc.gov.my",
        handles: ["phishing", "impersonation", "mobile-money"],
        note: {
          en: "Communications regulator — complaints about telecom services, spam SMS and scam calls; it regulates operators, criminal fraud goes to the police.",
          fr: "Régulateur des communications et du multimédia — réclamations sur les services télécom, les SMS indésirables et les appels frauduleux ; il régule les opérateurs, la fraude pénale relevant de la police.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 999 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 999.",
    },
    sources: [
      { label: "NFCC (official site)", url: "https://nfcc.jpm.gov.my" },
      { label: "PDRM (official site)", url: "https://www.rmp.gov.my" },
      { label: "BNM (official site)", url: "https://www.bnm.gov.my" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "ID",
    name: "Indonesia",
    nameFr: "Indonésie",
    continent: "asia",
    emergency: "110 / 112",
    agencies: [
      {
        name: "Komdigi — Ministry of Communication and Digital Affairs (Indonesia)",
        role: "consumer-protection",
        website: "https://www.komdigi.go.id",
        handles: ["online-scams", "phishing", "impersonation", "shopping"],
        note: {
          en: "Ministry in charge of digital infrastructure and services — public complaints about fraudulent and illegal online content (fake shops, scam ads, illegal lending apps) that can lead to takedowns; administrative action.",
          fr: "Ministère chargé des infrastructures et services numériques — réclamations publiques sur les contenus en ligne frauduleux et illicites (fausses boutiques, publicités trompeuses, applications de prêt illégales) pouvant entraîner leur retrait ; action administrative.",
        },
      },
      {
        name: "Patroli Siber — National Police Cyber Patrol (Indonesia)",
        role: "cybercrime-unit",
        website: "https://patrolisiber.id",
        handles: ["cybercrime", "online-scams", "financial-fraud", "impersonation"],
        note: {
          en: "National Police cyber patrol — online reporting of cybercrime and online fraud; complaints are routed to police cyber investigators.",
          fr: "Cyberpatrouille de la police nationale — signalement en ligne de la cybercriminalité et de la fraude sur Internet ; les plaintes sont transmises aux enquêteurs spécialisés.",
        },
      },
      {
        name: "OJK — Financial Services Authority (Indonesia)",
        role: "financial-regulator",
        website: "https://www.ojk.go.id",
        handles: ["investment", "financial-fraud", "bank-transfer", "crypto"],
        note: {
          en: "Financial services authority — complaints about banks, insurers and investment services; publishes warnings on illegal investment schemes.",
          fr: "Autorité des services financiers — réclamations sur les banques, assurances et services d'investissement ; publie des avertissements sur les projets d'investissement illégaux.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 110 or 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 110 ou le 112.",
    },
    sources: [
      { label: "Komdigi (official site)", url: "https://www.komdigi.go.id" },
      { label: "Patroli Siber (official portal)", url: "https://patrolisiber.id" },
      { label: "OJK (official site)", url: "https://www.ojk.go.id" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "PH",
    name: "Philippines",
    nameFr: "Philippines",
    continent: "asia",
    emergency: "911",
    agencies: [
      {
        name: "PNP ACG — Philippine National Police Anti-Cybercrime Group",
        role: "cybercrime-unit",
        website: "https://acg.pnp.gov.ph",
        handles: ["cybercrime", "online-scams", "financial-fraud", "phishing", "child-exploitation"],
        note: {
          en: "Anti-Cybercrime Group of the national police — accepts complaints (online or at its offices) for online scams, phishing and other cyber-enabled crimes.",
          fr: "Groupe anticybercriminalité de la police nationale — reçoit les plaintes (en ligne ou dans ses bureaux) pour arnaques en ligne, phishing et autres infractions facilitées par le numérique.",
        },
      },
      {
        name: "NBI — National Bureau of Investigation (Philippines)",
        role: "police",
        website: "https://www.nbi.gov.ph",
        handles: ["financial-fraud", "cybercrime", "impersonation", "bec"],
        note: {
          en: "National Bureau of Investigation — accepts cybercrime and fraud complaints at its regional and district offices.",
          fr: "Bureau national d'enquête — reçoit les plaintes pour cybercriminalité et fraude dans ses bureaux régionaux et de district.",
        },
      },
      {
        name: "SEC Philippines — Securities and Exchange Commission",
        role: "financial-regulator",
        website: "https://www.sec.gov.ph",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Securities regulator — complaints and reports on investment fraud, unlicensed sellers and pseudo-investment schemes; check its advisories.",
          fr: "Régulateur des valeurs mobilières — réclamations et signalements sur la fraude aux investissements, les vendeurs non agréés et les pseudo-projets d'investissement ; consultez ses avis.",
        },
      },
      {
        name: "BSP — Bangko Sentral ng Pilipinas",
        role: "financial-regulator",
        website: "https://www.bsp.gov.ph",
        handles: ["bank-transfer", "mobile-money", "financial-fraud"],
        note: {
          en: "Central bank — complain to your bank or e-money issuer first about unauthorised transactions, then to the BSP if unresolved.",
          fr: "Banque centrale — réclamez d'abord auprès de votre banque ou émetteur d'e-money pour les opérations non autorisées, puis auprès de la BSP en cas d'absence de réponse.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 911 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 911.",
    },
    sources: [
      { label: "PNP ACG (official site)", url: "https://acg.pnp.gov.ph" },
      { label: "NBI (official site)", url: "https://www.nbi.gov.ph" },
      { label: "SEC Philippines (official site)", url: "https://www.sec.gov.ph" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "TH",
    name: "Thailand",
    nameFr: "Thaïlande",
    continent: "asia",
    emergency: "191",
    agencies: [
      {
        name: "Thai Police Online — Royal Thai Police online complaint portal",
        role: "reporting-portal",
        website: "https://www.thaipoliceonline.go.th",
        handles: ["online-scams", "financial-fraud", "impersonation", "shopping", "romance"],
        note: {
          en: "Royal Thai Police online portal — report online fraud (fake shopping pages, investment scams, fake loan ads) with evidence; cases are forwarded to investigation units.",
          fr: "Portail en ligne de la police royale thaïlandaise — signalez la fraude en ligne (fausses boutiques, arnaques aux investissements, fausses offres de prêt) avec vos preuves ; les dossiers sont transmis aux unités d'enquête.",
        },
      },
      {
        name: "RTP — Royal Thai Police",
        role: "police",
        website: "https://www.police.go.th",
        handles: ["financial-fraud", "cybercrime", "online-scams", "impersonation"],
        note: {
          en: "National police — complaints at any police station; call 191 in an emergency.",
          fr: "Police royale thaïlandaise — plaintes dans n'importe quel commissariat ; en cas d'urgence, appelez le 191.",
        },
      },
      {
        name: "OIC — Office of Insurance Commission (Thailand)",
        role: "financial-regulator",
        website: "https://www.oic.or.th",
        handles: ["investment", "financial-fraud", "impersonation"],
        note: {
          en: "Insurance regulator — supervises insurers; complaints about insurance transactions and unauthorised insurance offers.",
          fr: "Commission des assurances — régule les assureurs ; réclamations sur les opérations d'assurance et offres non autorisées.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 191 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 191.",
    },
    sources: [
      { label: "Thai Police Online (official portal)", url: "https://www.thaipoliceonline.go.th" },
      { label: "OIC (official site)", url: "https://www.oic.or.th" },
      { label: "Royal Thai Police (official site)", url: "https://www.police.go.th" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "PK",
    name: "Pakistan",
    nameFr: "Pakistan",
    continent: "asia",
    emergency: "15",
    agencies: [
      {
        name: "FIA — Federal Investigation Agency (Pakistan)",
        role: "cybercrime-unit",
        website: "https://www.fia.gov.pk",
        phone: "1991",
        handles: ["cybercrime", "online-scams", "financial-fraud", "impersonation", "romance"],
        note: {
          en: "Federal Investigation Agency — its cybercrime complaint channels (online at complaint.fia.gov.pk or the 1991 helpline) take reports of online fraud, hacking and harassment; it investigates cybercrime.",
          fr: "Agence fédérale d'investigation — ses canaux de signalement de la cybercriminalité (en ligne sur complaint.fia.gov.pk ou la ligne 1991) recueillent les signalements de fraude en ligne, de piratage et de harcèlement ; elle enquête sur la cybercriminalité.",
        },
      },
      {
        name: "PTA — Pakistan Telecommunication Authority",
        role: "consumer-protection",
        website: "https://www.pta.gov.pk",
        handles: ["phishing", "impersonation", "mobile-money"],
        note: {
          en: "Telecom regulator — complaints about operators, spam and fraudulent messages; administrative action.",
          fr: "Régulateur des télécommunications — réclamations contre les opérateurs, le spam et les messages frauduleux ; action administrative.",
        },
      },
      {
        name: "SBP — State Bank of Pakistan",
        role: "financial-regulator",
        website: "https://www.sbp.org.pk",
        handles: ["bank-transfer", "mobile-money", "financial-fraud"],
        note: {
          en: "Central bank — complain to your bank first about fraudulent transactions, then to the State Bank if unresolved; it supervises banks and payment systems.",
          fr: "Banque centrale — réclamez d'abord auprès de votre banque pour les opérations frauduleuses, puis auprès de la State Bank en cas d'absence de réponse ; elle supervise les banques et les systèmes de paiement.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station or FIA cybercrime circle office with your evidence; call 15 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat ou bureau cybercriminalité de la FIA, avec vos preuves ; en cas d'urgence, appelez le 15.",
    },
    sources: [
      { label: "FIA (official site)", url: "https://www.fia.gov.pk" },
      { label: "PTA (official site)", url: "https://www.pta.gov.pk" },
      { label: "SBP (official site)", url: "https://www.sbp.org.pk" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "BD",
    name: "Bangladesh",
    nameFr: "Bangladesh",
    continent: "asia",
    emergency: "999",
    agencies: [
      {
        name: "Bangladesh Police",
        role: "police",
        website: "https://www.police.gov.bd",
        handles: ["financial-fraud", "online-scams", "cybercrime", "romance"],
        note: {
          en: "National police — file a complaint / first information report (FIR) for fraud at any station; call 999 in an emergency.",
          fr: "Police nationale — déposez une plainte (FIR) pour fraude dans n'importe quel poste ; en cas d'urgence, appelez le 999.",
        },
      },
      {
        name: "CID — Criminal Investigation Department (Bangladesh)",
        role: "police",
        website: "https://cid.police.gov.bd",
        handles: ["cybercrime", "financial-fraud", "bec"],
        note: {
          en: "Specialised investigation branch of the police, including its cyber-police units; cases are referred through the police.",
          fr: "Branche d'enquête spécialisée de la police, comprenant ses unités cyber ; les dossiers sont transmis via la police.",
        },
      },
      {
        name: "BTRC — Bangladesh Telecommunication Regulatory Commission",
        role: "consumer-protection",
        website: "https://www.btrc.gov.bd",
        handles: ["phishing", "impersonation", "mobile-money"],
        note: {
          en: "Telecom regulator — complaints about mobile operators, spam and suspicious SMS services; administrative action.",
          fr: "Régulateur des télécommunications — réclamations contre les opérateurs mobiles, le spam et les services SMS suspects ; action administrative.",
        },
      },
      {
        name: "Bangladesh Bank",
        role: "financial-regulator",
        website: "https://www.bb.org.bd",
        handles: ["bank-transfer", "mobile-money", "financial-fraud"],
        note: {
          en: "Central bank — complaints about banks and mobile financial services (contact the institution first); it supervises payment systems.",
          fr: "Banque centrale — réclamations sur les banques et les services financiers mobiles (contactez d'abord l'établissement) ; elle supervise les systèmes de paiement.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 999 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 999.",
    },
    sources: [
      { label: "Bangladesh Police (official site)", url: "https://www.police.gov.bd" },
      { label: "BTRC (official site)", url: "https://www.btrc.gov.bd" },
      { label: "Bangladesh Bank (official site)", url: "https://www.bb.org.bd" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "KR",
    name: "South Korea",
    nameFr: "Corée du Sud",
    continent: "asia",
    emergency: "112",
    agencies: [
      {
        name: "KISA — Korea Internet & Security Agency (Boho 118 reporting)",
        role: "cert",
        website: "https://boho.or.kr",
        phone: "118",
        handles: ["phishing", "identity-theft", "impersonation", "cybercrime"],
        note: {
          en: "National internet-security agency's reporting centre — report spam and phishing (hotline 118) and internet incidents; technical and regulatory handling, criminal investigations go to the police.",
          fr: "Centre de signalement de l'agence coréenne Internet et sécurité — signalez le spam et le phishing (ligne 118) et les incidents Internet ; traitement technique et réglementaire, les enquêtes pénales relevant de la police.",
        },
      },
      {
        name: "KNPA — Korean National Police Agency",
        role: "police",
        website: "https://www.police.go.kr",
        handles: ["financial-fraud", "online-scams", "cybercrime", "bec"],
        note: {
          en: "National police — complaints at any station; call 112 in an emergency.",
          fr: "Police nationale — plaintes dans n'importe quel commissariat ; en cas d'urgence, appelez le 112.",
        },
      },
      {
        name: "FSS — Financial Supervisory Service (South Korea)",
        role: "financial-regulator",
        website: "https://www.fss.or.kr",
        handles: ["investment", "financial-fraud", "crypto", "impersonation"],
        note: {
          en: "Financial supervisory service — complaints about financial institutions and reports of illegal fundraising or investment solicitation.",
          fr: "Service de supervision financière — réclamations contre les institutions financières et signalements de collectes ou de sollicitations d'investissement illégales.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 112 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 112.",
    },
    sources: [
      { label: "KISA Boho reporting centre (official portal)", url: "https://boho.or.kr" },
      { label: "KISA (official site)", url: "https://www.kisa.or.kr" },
      { label: "FSS (official site)", url: "https://www.fss.or.kr" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  /* ------------------------------------------------------------------ */
  /* MIDDLE EAST                                                         */
  /* ------------------------------------------------------------------ */
  {
    code: "AE",
    name: "United Arab Emirates",
    nameFr: "Émirats arabes unis",
    continent: "middle-east",
    emergency: "999",
    agencies: [
      {
        name: "MoI eCrime — Ministry of Interior (UAE)",
        role: "reporting-portal",
        website: "https://www.moi.gov.ae",
        reportingUrl: "https://www.ecrime.ae",
        handles: ["online-scams", "financial-fraud", "impersonation", "phishing"],
        note: {
          en: "Ministry of Interior's eCrime services — report electronic crimes and suspicious online activity through the ministry's portal and app; cases are referred to police cybercrime units.",
          fr: "Services eCrime du ministère de l'Intérieur — signalez les crimes électroniques et les activités en ligne suspectes via le portail et l'application du ministère ; les dossiers sont transmis aux unités de cybercriminalité de la police.",
        },
      },
      {
        name: "Dubai Police",
        role: "police",
        website: "https://www.dubaipolice.gov.ae",
        handles: ["financial-fraud", "cybercrime", "online-scams", "bec"],
        note: {
          en: "Dubai Police — online reporting of scams and cybercrime through its portal; in other emirates report through the local police or the Ministry of Interior; call 999 in an emergency.",
          fr: "Police de Dubaï — signalement en ligne des arnaques et de la cybercriminalité via son portail ; dans les autres émirats, adressez-vous à la police locale ou au ministère de l'Intérieur ; en cas d'urgence, appelez le 999.",
        },
      },
      {
        name: "Central Bank of the UAE",
        role: "financial-regulator",
        website: "https://www.centralbank.ae",
        handles: ["investment", "financial-fraud", "bank-transfer", "crypto"],
        note: {
          en: "Central bank — supervises banks and licensed financial institutions and warns about unauthorised firms; complain to your bank first.",
          fr: "Banque centrale — supervise les banques et les institutions financières agréées et avertit sur les sociétés non autorisées ; réclamez d'abord auprès de votre banque.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 999 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 999.",
    },
    sources: [
      { label: "UAE Ministry of Interior (official site)", url: "https://www.moi.gov.ae" },
      { label: "Dubai Police (official site)", url: "https://www.dubaipolice.gov.ae" },
      { label: "Central Bank of the UAE (official site)", url: "https://www.centralbank.ae" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    nameFr: "Arabie saoudite",
    continent: "middle-east",
    emergency: "999",
    agencies: [
      {
        name: "my.gov.sa — unified national services portal (Saudi Arabia)",
        role: "reporting-portal",
        website: "https://www.my.gov.sa",
        handles: ["online-scams", "impersonation", "financial-fraud"],
        note: {
          en: "Unified national services portal — submit complaints and requests that are routed to the relevant government agency (police, commerce, central bank).",
          fr: "Portail national unifié des services — déposez vos réclamations et demandes, qui sont transmises à l'organisme gouvernemental compétent (police, commerce, banque centrale).",
        },
      },
      {
        name: "CST — Communications, Space & Technology Commission (Saudi Arabia)",
        role: "consumer-protection",
        website: "https://www.cst.gov.sa",
        handles: ["phishing", "impersonation", "mobile-money"],
        note: {
          en: "Communications regulator — complaints about telecom providers, spam messages and scam calls; administrative action.",
          fr: "Régulateur des communications — réclamations contre les opérateurs télécom, les messages indésirables et les appels frauduleux ; action administrative.",
        },
      },
      {
        name: "SAMA — Saudi Central Bank",
        role: "financial-regulator",
        website: "https://www.sama.gov.sa",
        handles: ["bank-transfer", "financial-fraud", "mobile-money", "crypto"],
        note: {
          en: "Central bank — complaints about banks and payment services after first contacting the institution; warnings on unauthorised financial activities.",
          fr: "Banque centrale — réclamations sur les banques et services de paiement après avoir contacté l'établissement ; avertissements sur les activités financières non autorisées.",
        },
      },
      {
        name: "NCA — National Cybersecurity Authority (Saudi Arabia)",
        role: "cert",
        website: "https://nca.gov.sa",
        handles: ["phishing", "cybercrime", "bec", "impersonation"],
        note: {
          en: "National cybersecurity authority — national cyber-incident handling and security requirements; technical reports.",
          fr: "Autorité nationale de cybersécurité — gestion nationale des incidents informatiques et exigences de sécurité ; signalements techniques.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 999 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 999.",
    },
    sources: [
      { label: "my.gov.sa (official portal)", url: "https://www.my.gov.sa" },
      { label: "CST (official site)", url: "https://www.cst.gov.sa" },
      { label: "SAMA (official site)", url: "https://www.sama.gov.sa" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "QA",
    name: "Qatar",
    nameFr: "Qatar",
    continent: "middle-east",
    emergency: "999",
    agencies: [
      {
        name: "MoI — Ministry of Interior (Qatar)",
        role: "police",
        website: "https://www.moi.gov.qa",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "Ministry of Interior — police services, including electronic reporting of e-crimes through its portal; call 999 in an emergency.",
          fr: "Ministère de l'Intérieur — services de police, y compris le signalement électronique des e-crimes via son portail ; en cas d'urgence, appelez le 999.",
        },
      },
      {
        name: "Q-CERT — Qatar's national CERT",
        role: "cert",
        website: "https://www.qcert.org",
        handles: ["phishing", "cybercrime", "impersonation", "bec"],
        note: {
          en: "National CERT — report cyber-security incidents and phishing; technical handling, not financial investigations.",
          fr: "CERT national — signalez les incidents de cybersécurité et le phishing ; traitement technique, pas d'enquêtes financières.",
        },
      },
      {
        name: "QCB — Qatar Central Bank",
        role: "financial-regulator",
        website: "https://www.qcb.gov.qa",
        handles: ["bank-transfer", "financial-fraud", "mobile-money"],
        note: {
          en: "Central bank — supervises banks and financial institutions; complaints about supervised entities (contact your bank first).",
          fr: "Banque centrale — supervise les banques et les institutions financières ; réclamations concernant les entités supervisées (contactez d'abord votre banque).",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 999 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 999.",
    },
    sources: [
      { label: "MoI Qatar (official site)", url: "https://www.moi.gov.qa" },
      { label: "Q-CERT (official site)", url: "https://www.qcert.org" },
      { label: "QCB (official site)", url: "https://www.qcb.gov.qa" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "IL",
    name: "Israel",
    nameFr: "Israël",
    continent: "middle-east",
    emergency: "100",
    agencies: [
      {
        name: "Israel Police",
        role: "police",
        website: "https://www.police.gov.il",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation", "bec"],
        note: {
          en: "National police — report fraud and cybercrime online or at any station; call 100 in an emergency.",
          fr: "Police israélienne — signalez la fraude et la cybercriminalité en ligne ou dans n'importe quel commissariat ; en cas d'urgence, appelez le 100.",
        },
      },
      {
        name: "INCD — Israel National Cyber Directorate",
        role: "cert",
        website: "https://www.gov.il/en/departments/national_cyber_directorate",
        handles: ["phishing", "cybercrime", "impersonation", "bec"],
        note: {
          en: "National cyber directorate — national CERT functions and incident reporting; technical incidents, criminal cases go to the police.",
          fr: "Direction nationale israélienne du cyber — fonctions de CERT national et signalement des incidents ; incidents techniques, les affaires pénales relevant de la police.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 100 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 100.",
    },
    sources: [
      { label: "Israel Police (official site)", url: "https://www.police.gov.il" },
      { label: "INCD (official site)", url: "https://www.gov.il/en/departments/national_cyber_directorate" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  {
    code: "JO",
    name: "Jordan",
    nameFr: "Jordanie",
    continent: "middle-east",
    emergency: "911",
    agencies: [
      {
        name: "PSD — Public Security Directorate (Jordan)",
        role: "police",
        website: "https://www.psd.gov.jo",
        handles: ["financial-fraud", "online-scams", "cybercrime", "impersonation"],
        note: {
          en: "Public Security Directorate (national police) — complaints at any police centre; call 911 in an emergency.",
          fr: "Direction de la sécurité publique (police nationale) — plaintes dans n'importe quel centre de police ; en cas d'urgence, appelez le 911.",
        },
      },
      {
        name: "CBJ — Central Bank of Jordan",
        role: "financial-regulator",
        website: "https://www.cbj.gov.jo",
        handles: ["bank-transfer", "financial-fraud", "mobile-money"],
        note: {
          en: "Central bank — complain to your bank first, then to the Central Bank of Jordan if unresolved; it supervises banks and payment systems.",
          fr: "Banque centrale de Jordanie — réclamez d'abord auprès de votre banque, puis auprès de la Banque centrale en cas d'absence de réponse ; elle supervise les banques et les systèmes de paiement.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police centre with your evidence; call 911 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel centre de police, avec vos preuves ; en cas d'urgence, appelez le 911.",
    },
    sources: [
      { label: "PSD Jordan (official site)", url: "https://www.psd.gov.jo" },
      { label: "Central Bank of Jordan (official site)", url: "https://www.cbj.gov.jo" },
    ],
    status: "pending-verification",
    lastVerified: "2026-11-20",
  },
  /* ------------------------------------------------------------------ */
  /* OCEANIA                                                             */
  /* ------------------------------------------------------------------ */
  {
    code: "AU",
    name: "Australia",
    nameFr: "Australie",
    continent: "oceania",
    emergency: "000",
    agencies: [
      {
        name: "Scamwatch (ACCC)",
        role: "reporting-portal",
        website: "https://www.scamwatch.gov.au",
        handles: ["online-scams", "investment", "romance", "impersonation", "shopping", "crypto"],
        note: {
          en: "Scamwatch, run by the Australian Competition and Consumer Commission — the national consumer scam-reporting portal; reports drive alerts, advice and enforcement action. Report even if you lost no money.",
          fr: "Scamwatch, géré par la Commission australienne de la concurrence et de la consommation — portail national de signalement des arnaques destiné aux consommateurs ; les signalements alimentent alertes, conseils et mesures d'exécution. Signalez même sans perte financière.",
        },
      },
      {
        name: "ReportCyber — national cybercrime reporting (ASD)",
        role: "reporting-portal",
        website: "https://www.cyber.gov.au/report",
        handles: ["cybercrime", "phishing", "bec", "financial-fraud"],
        note: {
          en: "National online cybercrime reporting service operated by the Australian Signals Directorate — reports are routed to the relevant police agency for assessment; for crimes in progress call 000.",
          fr: "Service national de signalement en ligne de la cybercriminalité, exploité par l'Australian Signals Directorate — les signalements sont transmis à l'agence de police compétente pour évaluation ; pour une infraction en cours, appelez le 000.",
        },
      },
      {
        name: "IDCARE — identity & cyber support (Australia)",
        role: "consumer-protection",
        website: "https://www.idcare.org",
        handles: ["identity-theft", "impersonation", "online-scams"],
        note: {
          en: "National identity and cyber support service — free one-on-one case management for identity-theft and data-breach victims; support and advice, not law enforcement.",
          fr: "Service national d'accompagnement en matière d'identité et de cyber — prise en charge individuelle gratuite des victimes d'usurpation d'identité et de fuites de données ; soutien et conseils, sans pouvoir d'enquête.",
        },
      },
      {
        name: "AFCA — Australian Financial Complaints Authority",
        role: "financial-regulator",
        website: "https://www.afca.org.au",
        handles: ["bank-transfer", "investment", "financial-fraud"],
        note: {
          en: "Financial complaints resolution scheme — free external dispute resolution for complaints against banks, insurers and investment firms, including fraud-loss disputes.",
          fr: "Schéma de résolution des litiges financiers — résolution extrajudiciaire gratuite des litiges avec les banques, assureurs et sociétés d'investissement, y compris les pertes liées à la fraude.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 000 in an emergency.",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 000.",
    },
    sources: [
      { label: "Scamwatch (official portal)", url: "https://www.scamwatch.gov.au" },
      { label: "ReportCyber (official portal)", url: "https://www.cyber.gov.au/report" },
      { label: "IDCARE (official site)", url: "https://www.idcare.org" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
  {
    code: "NZ",
    name: "New Zealand",
    nameFr: "Nouvelle-Zélande",
    continent: "oceania",
    emergency: "111",
    agencies: [
      {
        name: "Netsafe (New Zealand)",
        role: "reporting-portal",
        website: "https://www.netsafe.org.nz",
        phone: "0508 NETSAFE",
        handles: ["online-scams", "impersonation", "romance", "shopping"],
        note: {
          en: "National online-safety organisation — accepts reports of online scams and harmful digital communications and advises victims (helpline 0508 NETSAFE); a support body, not law enforcement.",
          fr: "Organisme national de sécurité en ligne — reçoit les signalements d'arnaques et de communications numériques nuisibles et conseille les victimes (ligne 0508 NETSAFE) ; organisme d'accompagnement, pas un service répressif.",
        },
      },
      {
        name: "CERT NZ",
        role: "cert",
        website: "https://www.cert.govt.nz",
        handles: ["phishing", "cybercrime", "bec", "identity-theft"],
        note: {
          en: "National CERT — report cyber incidents and phishing; technical guidance and incident handling, not financial investigations.",
          fr: "CERT national — signalez les incidents informatiques et le phishing ; conseils techniques et traitement des incidents, pas d'enquêtes financières.",
        },
      },
      {
        name: "New Zealand Police",
        role: "police",
        website: "https://www.police.govt.nz",
        phone: "105",
        handles: ["financial-fraud", "cybercrime", "online-scams", "romance", "bec"],
        note: {
          en: "Police — report fraud and cybercrime online via 105 or at any station; call 111 in an emergency.",
          fr: "Police néo-zélandaise — signalez la fraude et la cybercriminalité en ligne via le 105 ou dans n'importe quel commissariat ; en cas d'urgence, appelez le 111.",
        },
      },
      {
        name: "FMA — Financial Markets Authority (New Zealand)",
        role: "financial-regulator",
        website: "https://www.fma.govt.nz",
        handles: ["investment", "crypto", "financial-fraud", "impersonation"],
        note: {
          en: "Financial markets authority — warnings on scams and unlicensed investment offers; complaints about financial-service providers.",
          fr: "Autorité des marchés financiers — avertissements sur les arnaques et les offres d'investissement non autorisées ; réclamations contre les prestataires de services financiers.",
        },
      },
    ],
    physicalReporting: {
      en: "You can also report in person at any police station with your evidence; call 111 in an emergency (105 for non-emergencies).",
      fr: "Vous pouvez aussi déposer plainte dans n'importe quel commissariat, avec vos preuves ; en cas d'urgence, appelez le 111 (le 105 pour les affaires non urgentes).",
    },
    sources: [
      { label: "Netsafe (official site)", url: "https://www.netsafe.org.nz" },
      { label: "CERT NZ (official site)", url: "https://www.cert.govt.nz" },
      { label: "New Zealand Police (official site)", url: "https://www.police.govt.nz" },
    ],
    status: "verified",
    lastVerified: "2026-11-20",
  },
];
