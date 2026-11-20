/**
 * GLOPROFAS printable checklist PDF generator (bilingual EN/FR).
 * Renders every checklist in CHECKLISTS to /public/checklists/<slug>-<lang>.pdf
 * GLOPROFAS branding, tick boxes, warnings, references, publication info.
 * Run: bun scripts/generate-pdfs.ts
 */
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { CHECKLISTS } from "../src/lib/content/checklists-data";

const OUT_DIR = path.join(process.cwd(), "public", "checklists");
fs.mkdirSync(OUT_DIR, { recursive: true });

type Lang = "en" | "fr";

const BRAND = { navy: "#0a1735", teal: "#0e7490", amber: "#b45309", ink: "#1e293b", slate: "#475569", line: "#cbd5e1", soft: "#f1f5f9" };
const PAGE = { top: 56, bottom: 70, left: 52, right: 52 };

function L(t: { en: string; fr: string }, lang: Lang): string {
  return t[lang];
}

/** Estimate rendered height (px) of wrapped text at a given size/width. */
function estHeight(text: string, size: number, width: number, lineGap = 2): number {
  const avgChar = size * 0.5;
  const perLine = Math.max(10, Math.floor(width / avgChar));
  let lines = 0;
  for (const p of text.split(/\n/)) lines += Math.max(1, Math.ceil(p.length / perLine));
  return lines * (size + lineGap) + 4;
}

const UI = {
  organisation: { en: "GLOPROFAS — Global Programme for the Fight Against Scams", fr: "GLOPROFAS — Programme mondial de lutte contre les arnaques" },
  resourceCentre: { en: "Resource Centre · Printable Checklist", fr: "Centre de ressources · Liste de vérification à imprimer" },
  warningTitle: { en: "Important warning signs", fr: "Signaux d’alerte importants" },
  emergencyTitle: { en: "Emergency actions", fr: "Actions d’urgence" },
  referencesTitle: { en: "Official references", fr: "Références officielles" },
  published: { en: "Published", fr: "Publié" },
  version: { en: "Version", fr: "Version" },
  moreAt: { en: "More free guides, checklists and alerts:", fr: "Plus de guides, listes et alertes gratuits :" },
  site: { en: "gloprofas.org — Resource Centre", fr: "gloprofas.org — Centre de ressources" },
  footerNote: {
    en: "This checklist is educational guidance. GLOPROFAS is not a law-enforcement authority. Contact your bank and the competent authorities through official channels.",
    fr: "Cette liste est un guide éducatif. GLOPROFAS n’est pas une autorité policière. Contactez votre banque et les autorités compétentes via leurs canaux officiels.",
  },
} as const;

function buildPdf(checklist: (typeof CHECKLISTS)[number], lang: Lang): Promise<void> {
  return new Promise((resolve, reject) => {
    const outPath = path.join(OUT_DIR, `${checklist.slug}-${lang}.pdf`);
    const doc = new PDFDocument({
      size: "A4",
      margins: PAGE,
      info: { Title: L(checklist.title, lang), Author: "GLOPROFAS", Subject: L(checklist.subtitle, lang), Creator: "GLOPROFAS Resource Centre" },
    });
    const stream = fs.createWriteStream(outPath);
    doc.pipe(stream);

    const contentW = doc.page.width - PAGE.left - PAGE.right;
    const bottom = doc.page.height - PAGE.bottom;

    /** Ensure `need` px remain on the page; else start a new page. */
    const need = (px: number) => {
      if (doc.y + px > bottom) doc.addPage();
    };
    const gap = (px: number) => {
      doc.y += px;
    };

    /* ---------- Header band ---------- */
    doc.rect(0, 0, doc.page.width, 92).fill(BRAND.navy);
    doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(17).text("GLOPROFAS", PAGE.left, 24, { lineBreak: false });
    doc.font("Helvetica").fontSize(8.5).fillColor("#c7d7f0").text(L(UI.organisation, lang), PAGE.left, 48, { width: contentW, lineBreak: false });
    doc.fontSize(8).fillColor("#7fd3e8").text(L(UI.resourceCentre, lang), PAGE.left, 72, { lineBreak: false });
    doc.y = 116;

    /* ---------- Title ---------- */
    doc.font("Helvetica-Bold").fontSize(19).fillColor(BRAND.navy).text(L(checklist.title, lang), PAGE.left, doc.y, { width: contentW });
    gap(4);
    doc.font("Helvetica-Oblique").fontSize(10.5).fillColor(BRAND.teal).text(L(checklist.subtitle, lang), PAGE.left, doc.y, { width: contentW });
    gap(10);

    /* ---------- Intro ---------- */
    doc.font("Helvetica").fontSize(9.5).fillColor(BRAND.slate).text(L(checklist.intro, lang), PAGE.left, doc.y, { width: contentW, lineGap: 2 });
    gap(12);

    /* ---------- Warning box ---------- */
    const warnH = 40 + estHeight(L(checklist.warning, lang), 9, contentW - 24);
    need(warnH + 10);
    doc.roundedRect(PAGE.left, doc.y, contentW, warnH, 5).fill("#fdf3e3");
    doc.roundedRect(PAGE.left, doc.y, 3.5, warnH, 2).fill(BRAND.amber);
    doc.font("Helvetica-Bold").fontSize(9).fillColor(BRAND.amber).text(L(UI.warningTitle, lang).toUpperCase(), PAGE.left + 12, doc.y + 9, { width: contentW - 24, lineBreak: false });
    doc.font("Helvetica").fontSize(9).fillColor("#7c4a10").text(L(checklist.warning, lang), PAGE.left + 12, doc.y + 4, { width: contentW - 24, lineGap: 2 });
    doc.y += warnH - estHeight(L(checklist.warning, lang), 9, contentW - 24) - 4; // land at box bottom
    gap(12);

    /* ---------- Emergency box ---------- */
    if (checklist.emergency) {
      const emH = 40 + estHeight(L(checklist.emergency, lang), 9, contentW - 24);
      need(emH + 10);
      doc.roundedRect(PAGE.left, doc.y, contentW, emH, 5).fill("#fdecec");
      doc.roundedRect(PAGE.left, doc.y, 3.5, emH, 2).fill("#b3261e");
      doc.font("Helvetica-Bold").fontSize(9).fillColor("#b3261e").text(L(UI.emergencyTitle, lang).toUpperCase(), PAGE.left + 12, doc.y + 9, { width: contentW - 24, lineBreak: false });
      doc.font("Helvetica").fontSize(9).fillColor("#7f1d1d").text(L(checklist.emergency, lang), PAGE.left + 12, doc.y + 4, { width: contentW - 24, lineGap: 2 });
      doc.y += emH - estHeight(L(checklist.emergency, lang), 9, contentW - 24) - 4;
      gap(14);
    }

    /* ---------- Sections with tick boxes ---------- */
    for (const section of checklist.sections) {
      need(70);
      doc.roundedRect(PAGE.left, doc.y, contentW, 26, 4).fill(BRAND.soft);
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor(BRAND.navy).text(L(section.heading, lang), PAGE.left + 10, doc.y + 8, { width: contentW - 20, lineBreak: false });
      doc.y += 34;
      for (const item of section.items) {
        const text = L(item, lang);
        const rowH = Math.max(16, estHeight(text, 9.5, contentW - 34, 1.5));
        need(rowH + 6);
        const rowY = doc.y;
        doc.roundedRect(PAGE.left + 2, rowY + 2, 11, 11, 2).lineWidth(1).strokeColor(BRAND.teal).stroke();
        doc.font("Helvetica").fontSize(9.5).fillColor(BRAND.ink).text(text, PAGE.left + 22, rowY, { width: contentW - 34, lineGap: 1.5 });
        doc.y = Math.max(rowY + rowH, doc.y);
        gap(6);
      }
      gap(8);
    }

    /* ---------- References ---------- */
    gap(6);
    need(60);
    doc.moveTo(PAGE.left, doc.y).lineTo(PAGE.left + contentW, doc.y).lineWidth(0.8).strokeColor(BRAND.line).stroke();
    gap(10);
    doc.font("Helvetica-Bold").fontSize(9).fillColor(BRAND.navy).text(L(UI.referencesTitle, lang), PAGE.left, doc.y, { lineBreak: false });
    gap(5);
    for (const ref of checklist.references) {
      need(18);
      doc.font("Helvetica").fontSize(8.5).fillColor(BRAND.slate).text(`•  ${ref.label} — ${ref.url}`, PAGE.left, doc.y, { width: contentW });
      gap(4);
    }

    /* ---------- Publication info ---------- */
    gap(8);
    need(64);
    doc.roundedRect(PAGE.left, doc.y, contentW, 54, 5).fill(BRAND.soft);
    const infoY = doc.y;
    doc.font("Helvetica").fontSize(8.5).fillColor(BRAND.slate).text(`${L(UI.published, lang)}: ${checklist.publishedAt}   ·   ${L(UI.version, lang)}: ${checklist.version}`, PAGE.left + 12, infoY + 9, { width: contentW - 24, lineBreak: false });
    doc.text(`${L(UI.moreAt, lang)} ${L(UI.site, lang)}`, PAGE.left + 12, infoY + 23, { width: contentW - 24, lineBreak: false });
    doc.font("Helvetica-Oblique").fontSize(7.5).fillColor("#64748b").text(L(UI.footerNote, lang), PAGE.left + 12, infoY + 37, { width: contentW - 24, lineGap: 1.5, height: 32 });

    /* ---------- Footer on all pages ---------- */
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      // Zero the bottom margin while painting footers so PDFKit does not
      // auto-paginate text positioned inside the margin band.
      const oldBottom = doc.page.margins.bottom;
      doc.page.margins.bottom = 0;
      doc.font("Helvetica").fontSize(7.5).fillColor("#94a3b8").text(
        `GLOPROFAS · ${L(checklist.title, lang)} · gloprofas.org`,
        PAGE.left, doc.page.height - 44, { width: contentW, align: "center", lineBreak: false }
      );
      doc.text(String(i - range.start + 1), PAGE.left, doc.page.height - 30, { width: contentW, align: "center", lineBreak: false });
      doc.page.margins.bottom = oldBottom;
    }

    doc.end();
    stream.on("finish", () => resolve());
    stream.on("error", reject);
  });
}

async function main() {
  let ok = 0;
  const failed: string[] = [];
  for (const c of CHECKLISTS) {
    for (const lang of ["en", "fr"] as Lang[]) {
      try {
        await buildPdf(c, lang);
        ok++;
        console.log(`[ok] ${c.slug}-${lang}.pdf`);
      } catch (e) {
        failed.push(`${c.slug}-${lang}`);
        console.error(`[fail] ${c.slug}-${lang}: ${e instanceof Error ? e.message : e}`);
      }
    }
  }
  console.log(`DONE ${ok}/${CHECKLISTS.length * 2} PDFs` + (failed.length ? ` failed: ${failed.join(",")}` : ""));
}

main();
