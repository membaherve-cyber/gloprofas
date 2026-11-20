#!/usr/bin/env bash
# Batch URL verification for the reporting directory.
cd /home/z/my-project
OUT=scripts/url-verification.txt
: > "$OUT"

URLS=(
  # Cameroon
  "https://www.antic.cm" "https://www.minpostel.gov.cm" "https://www.police.gov.cm" "https://www.art.cm"
  # Nigeria
  "https://cert.gov.ng" "https://efccnigeria.gov.ng" "https://fccpc.gov.ng" "https://www.npf.gov.ng" "https://www.cbn.gov.ng" "https://ncc.gov.ng"
  # Ghana
  "https://csa.gov.gh" "https://cybersecurityauthority.gov.gh" "https://police.gov.gh" "https://www.bog.gov.gh" "https://nca.org.gh"
  # South Africa
  "https://www.saps.gov.za" "https://www.sabric.co.za" "https://www.fsca.co.za" "https://www.cybersecurityhub.gov.za"
  # Kenya
  "https://www.dci.go.ke" "https://www.kenyapolice.go.ke" "https://ca.go.ke" "https://www.centralbank.go.ke" "https://www.odpc.go.ke"
  # Uganda
  "https://www.police.go.ug" "https://www.ucc.co.ug" "https://www.bou.or.ug" "https://nita.go.ug"
  # Tanzania
  "https://www.tcra.go.tz" "https://www.policeforce.go.tz" "https://www.bot.go.tz"
  # Rwanda
  "https://www.police.gov.rw" "https://www.ncsa.gov.rw" "https://www.bnr.rw"
  # Ethiopia
  "https://insa.gov.et" "https://www.ethiopianpolice.gov.et" "https://www.gov.et" "https://www.nbe.gov.et"
  # Senegal
  "https://www.adie.sn" "https://www.artp.sn" "https://www.bceao.int" "https://www.senegal.sn"
  # Cote d'Ivoire
  "https://artci.ci" "https://www.cn-cert.ci" "https://www.gouv.ci"
  # DRC
  "https://www.arpce-rdc.org" "https://www.bcc.cd" "https://www.gouvernement.cd"
  # Morocco
  "https://www.dgssi.gov.ma" "https://www.anrt.ma" "https://www.dgsn.gov.ma" "https://www.bkam.ma"
  # Egypt
  "https://www.moiegypt.gov.eg" "https://itida.gov.eg" "https://tra.gov.eg" "https://www.cbe.org.eg" "https://www.egypt.gov.eg"
  # Algeria
  "https://arpce.dz" "https://www.dgsn.dz" "https://www.bank-of-algeria.dz" "https://www.cert-dz.dz" "https://www.el-mouradia.dz"
  # Tunisia
  "https://ansi.tn" "https://www.inpdp.police.tn" "https://www.intt.tn" "https://www.bct.gov.tn"
  # Zambia
  "https://www.zicta.zm" "https://www.zambiapolice.gov.zm" "https://www.boz.zm"
  # Zimbabwe
  "https://www.potraz.gov.zw" "https://www.zrp.gov.zw" "https://www.rbz.co.zw"
  # Botswana
  "https://www.bocra.org.bw" "https://www.gov.bw" "https://www.bankofbotswana.bw"
  # Benin
  "https://arcep.bj" "https://police.gov.bj" "https://cyber.gouv.bj" "https://www.gouv.bj"
  # Burkina Faso
  "https://anssi.bf" "https://arcep.bf" "https://www.police.bf" "https://www.gov.bf"
  # Togo
  "https://artp.tg" "https://www.gouv.tg"
  # Gabon
  "https://arcep.ga" "https://www.beac.int" "https://www.gouv.ga"
  # Congo
  "https://www.arpce-cg.com" "https://www.congo.gov.cg"
  # Angola
  "https://www.inacom.gov.ao" "https://www.minint.gov.ao" "https://www.bna.ao" "https://www.gov.ao"
  # UK
  "https://www.actionfraud.police.uk" "https://www.ncsc.gov.uk" "https://www.ncsc.gov.uk/section/report-suspicious-emails-websites-phishing" "https://www.fca.org.uk" "https://www.police.uk"
  # France
  "https://www.cybermalveillance.gouv.fr" "https://signal.conso.gouv.fr" "https://www.banque-france.fr" "https://www.police-nationale.interieur.gouv.fr" "https://www.interieur.gouv.fr"
  # Germany
  "https://www.polizei.de" "https://www.bsi.bund.de" "https://www.verbraucherzentrale.de" "https://www.bafin.de"
  # Spain
  "https://www.incibe.es" "https://www.policia.es" "https://www.guardiacivil.es" "https://www.cnmv.es"
  # Italy
  "https://www.poliziadistato.it" "https://www.gdf.gov.it" "https://www.agcm.it" "https://www.bancaditalia.it"
  # Netherlands
  "https://www.fraudehelpdesk.nl" "https://www.politie.nl" "https://www.afm.nl" "https://www.dnb.nl"
  # Belgium
  "https://www.safeonweb.be" "https://www.police.eu" "https://www.polfed-fedpol.be" "https://economie.fgov.be" "https://www.fsma.be"
  # Ireland
  "https://www.garda.ie" "https://fraudsmart.ie" "https://www.ccpc.ie" "https://www.ncsc.gov.ie"
  # Switzerland
  "https://www.ncsc.admin.ch" "https://www.fedpol.admin.ch" "https://www.finma.ch"
  # Sweden
  "https://www.polisen.se" "https://www.msb.se" "https://www.konsumentverket.se" "https://www.fi.se"
  # Norway
  "https://www.politiet.no" "https://www.nettvett.no" "https://www.finanstilsynet.no" "https://www.nsm.no"
  # Portugal
  "https://www.cncs.gov.pt" "https://www.psp.pt" "https://www.asae.gov.pt" "https://www.bportugal.pt"
  # Poland
  "https://www.cert.pl" "https://incydent.cert.pl" "https://www.policja.gov.pl" "https://www.uokik.gov.pl" "https://www.knf.gov.pl"
  # Austria
  "https://www.cert.at" "https://www.polizei.gv.at" "https://www.vki.at" "https://www.fma.gv.at"
  # Denmark
  "https://politi.dk" "https://www.sikkerdigital.dk" "https://www.cfcs.dk" "https://finanstilsynet.dk"
  # Finland
  "https://poliisi.fi" "https://www.kyberturvallisuuskeskus.fi" "https://www.finanssivalvonta.fi" "https://www.kkv.fi"
  # US
  "https://www.ic3.gov" "https://reportfraud.ftc.gov" "https://www.ftc.gov" "https://www.cisa.gov" "https://www.uspis.gov"
  # Canada
  "https://www.antifraudcentre-centreantifraude.ca" "https://www.cyber.gc.ca" "https://www.rcmp-grc.gc.ca" "https://www.competitionbureau.gc.ca"
  # Mexico
  "https://www.gob.mx/sspc" "https://www.gob.mx/profeco" "https://www.banxico.org.mx" "https://www.ift.org.mx"
  # Brazil
  "https://www.gov.br/pf" "https://www.consumidor.gov.br" "https://www.cert.br" "https://www.bcb.gov.br"
  # Argentina
  "https://www.mpf.gob.ar" "https://www.policiafederal.gob.ar" "https://www.cnv.gov.ar" "https://www.argentina.gob.ar"
  # Chile
  "https://www.policia.cl" "https://www.sernac.cl" "https://www.cmfchile.cl"
  # Colombia
  "https://www.policia.gov.co" "https://www.sic.gov.co" "https://www.superfinanciera.gov.co"
  # Peru
  "https://www.pnp.gob.pe" "https://www.gob.pe/indecopi" "https://www.sbs.gob.pe" "https://www.gob.pe"
  # India
  "https://cybercrime.gov.in" "https://www.cert-in.org.in" "https://www.rbi.org.in" "https://cms.rbi.org.in" "https://www.mha.gov.in"
  # China
  "https://www.12321.cn" "https://www.mps.gov.cn" "https://www.12315.cn" "http://www.pbc.gov.cn"
  # Japan
  "https://www.npa.go.jp" "https://www.nisc.go.jp" "https://www.caa.go.jp" "https://www.fsa.go.jp"
  # Singapore
  "https://www.scamshield.gov.sg" "https://www.police.gov.sg" "https://www.cad.gov.sg" "https://www.mas.gov.sg"
  # Malaysia
  "https://www.rmp.gov.my" "https://nfcc.jpm.gov.my" "https://www.bnm.gov.my" "https://www.mcmc.gov.my" "https://www.jpm.gov.my"
  # Indonesia
  "https://www.komdigi.go.id" "https://patrolisiber.id" "https://www.ojk.go.id" "https://www.polri.go.id"
  # Philippines
  "https://acg.pnp.gov.ph" "https://www.nbi.gov.ph" "https://www.sec.gov.ph" "https://www.bsp.gov.ph" "https://pnp.gov.ph"
  # Thailand
  "https://www.thaipoliceonline.go.th" "https://www.police.go.th" "https://www.oic.or.th"
  # Pakistan
  "https://www.fia.gov.pk" "https://complaint.fia.gov.pk" "https://www.pta.gov.pk" "https://www.sbp.org.pk"
  # Bangladesh
  "https://www.btrc.gov.bd" "https://cid.police.gov.bd" "https://www.bb.org.bd" "https://dmp.gov.bd" "https://www.police.gov.bd"
  # South Korea
  "https://boho.or.kr" "https://www.kisa.or.kr" "https://www.police.go.kr" "https://www.fss.or.kr"
  # UAE
  "https://www.ecrime.ae" "https://www.dubaipolice.gov.ae" "https://www.centralbank.ae" "https://www.moi.gov.ae"
  # Saudi
  "https://www.my.gov.sa" "https://www.cst.gov.sa" "https://www.sama.gov.sa" "https://nca.gov.sa"
  # Qatar
  "https://www.moi.gov.qa" "https://www.qcert.org" "https://www.qcb.gov.qa"
  # Israel
  "https://www.police.gov.il" "https://www.gov.il/en/departments/national_cyber_directorate" "https://www.gov.il"
  # Jordan
  "https://www.psd.gov.jo" "https://www.cbj.gov.jo"
  # Australia
  "https://www.scamwatch.gov.au" "https://www.cyber.gov.au" "https://www.cyber.gov.au/report" "https://www.idcare.org" "https://www.afca.org.au" "https://www.accc.gov.au"
  # NZ
  "https://www.netsafe.org.nz" "https://www.cert.govt.nz" "https://www.police.govt.nz" "https://www.fma.govt.nz" "https://netsafe.org.nz"
)

for url in "${URLS[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -L "$url" 2>/dev/null)
  echo "$code $url" >> "$OUT"
done
echo "DONE $(wc -l < $OUT)" >> "$OUT"
cat "$OUT"
