/**
 * GLOPROFAS professional photo-finish pass.
 *
 * A Lightroom-style finishing treatment applied to every generated
 * image so they read as professionally processed photographs rather
 * than raw AI output:
 *
 *   · Organic film grain        — breaks the tell-tale noise-free
 *                                 "AI sheen" (overlay-blended mono noise)
 *   · Micro-contrast S-curve    — gentle linear contrast for tonal depth
 *   · Saturation ease           — pulls back the over-clean AI colour pop
 *   · 4:4:4 chroma, mozjpeg     — professional-grade JPEG encoding
 *
 * Page-hero images additionally get an exposure lift (gamma + brightness)
 * so inner-page heroes no longer read as dark.
 *
 * Resume-safe via scripts/photofinish-done.txt.
 * Run: bun scripts/photo-finish.ts [--dry]  (pass a filename to process just one)
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DIRS = ["public/images/gen", "public/images/context"];
const DONE = path.join(ROOT, "scripts", "photofinish-done.txt");

/* ---------- treatment tuning ---------- */
const NON_HERO = {
  saturation: 0.93, // ease the AI colour pop
  linearA: 1.05, // S-curve slope
  linearB: -6, // pivot offset (8-bit)
};
const HERO = {
  ...NON_HERO,
  // highlight-preserving exposure lift: shadows +22, filmic rolloff
  linearA: 0.93,
  linearB: 22,
  brightness: 1.04,
};

const GRAIN_AMP = 18; // noise amplitude, 8-bit units
const GRAIN_BLEND = "soft-light" as const; // luma-neutral, gentle response
const JPEG = { quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" } as const;

/* Images that render as page heroes on inner views (need the lift). */
const HERO_FILES = new Set([
  "about-workshop.jpg",
  "campaign-seminar.jpg",
  "resource-centre-hero.jpg",
  "article-cat-online.jpg",
  "reporting-directory.jpg",
  "knowledge-tools.jpg",
  "video-learning.jpg",
  "scam-phishing.jpg",
  "scam-business.jpg",
  "report-desk.jpg",
  "victim-support.jpg",
  "verify-hands.jpg",
  "team-laptops-office.jpg",
  "notebook-smartphone-notes.jpg",
  "article-reporting.jpg",
  "article-payment-pause.jpg",
]);

/** Triangular-distribution mono noise tile, soft-light composited (luma-neutral). */
function grainTile(w: number, h: number, amp: number) {
  const buf = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const n = (Math.random() + Math.random() - 1) * 0.5; // triangular ~[-0.5,0.5]
    const v = Math.max(0, Math.min(255, Math.round(128 + n * 2 * amp)));
    const o = i * 4;
    buf[o] = v;
    buf[o + 1] = v;
    buf[o + 2] = v;
    buf[o + 3] = 255;
  }
  return { input: buf, raw: { width: w, height: h, channels: 4 as const }, blend: GRAIN_BLEND };
}

async function meanLuma(file: string): Promise<number> {
  const st = await sharp(file).stats();
  const [r, g, b] = st.channels;
  return (0.2126 * r.mean + 0.7152 * g.mean + 0.0722 * b.mean) / 255;
}

async function treat(file: string, isHero: boolean, dry: boolean) {
  const before = await meanLuma(file);
  const meta = await sharp(file).metadata();
  const w = meta.width ?? 1344;
  const h = meta.height ?? 768;

  let pipe = sharp(file);
  if (isHero) {
    pipe = pipe.modulate({ brightness: HERO.brightness, saturation: HERO.saturation });
  } else {
    pipe = pipe.modulate({ saturation: NON_HERO.saturation });
  }
  const t = isHero ? HERO : NON_HERO;
  const base = await pipe.linear(t.linearA, t.linearB).toBuffer();

  let out = sharp(base);
  if (!dry) out = out.composite([grainTile(w, h, GRAIN_AMP)]);
  const buf = await out.jpeg(JPEG).toBuffer();

  const tmp = file + ".tmp.jpg";
  fs.writeFileSync(tmp, buf);
  const after = await meanLuma(tmp);
  if (dry) {
    fs.unlinkSync(tmp);
  } else {
    fs.renameSync(tmp, file);
  }
  const pct = before > 0 ? Math.round(((after - before) / before) * 100) : 0;
  const tag = isHero ? "HERO " : "     ";
  console.log(`${tag}${path.basename(file).padEnd(34)} luma ${(before * 100).toFixed(1)}% -> ${(after * 100).toFixed(1)}% (${pct >= 0 ? "+" : ""}${pct}%)  ${(buf.length / 1024).toFixed(0)}KB`);
}

async function main() {
  const argv = process.argv.slice(2);
  const dry = argv.includes("--dry");
  const only = argv.find((a) => !a.startsWith("--")) ?? null;
  const done = new Set(
    fs.existsSync(DONE) ? fs.readFileSync(DONE, "utf8").split("\n").filter(Boolean) : []
  );

  const jobs: { file: string; isHero: boolean }[] = [];
  for (const d of DIRS) {
    const abs = path.join(ROOT, d);
    for (const f of fs.readdirSync(abs).sort()) {
      if (!f.endsWith(".jpg")) continue;
      if (only && f !== only) continue;
      const rel = `${d}/${f}`;
      if (!only && done.has(rel)) continue;
      jobs.push({ file: path.join(abs, f), isHero: HERO_FILES.has(f) });
    }
  }

  if (jobs.length === 0) {
    console.log("Nothing to process — all files already photo-finished.");
    return;
  }
  console.log(`Processing ${jobs.length} file(s) — grain amp ${GRAIN_AMP} (${GRAIN_BLEND}), ${dry ? "DRY (no grain saved)" : "full treatment"}\n`);
  for (const j of jobs) {
    await treat(j.file, j.isHero, dry);
    if (!dry) {
      const rel = `${path.basename(path.dirname(j.file))}/${path.basename(j.file)}`;
      done.add(rel);
      fs.writeFileSync(DONE, [...done].join("\n") + "\n");
    }
  }
  console.log("\nDONE — photo-finish pass complete.");
}

main().catch((e) => {
  console.error("[fatal]", e);
  process.exit(1);
});
