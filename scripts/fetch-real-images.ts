/**
 * Fetch REAL photographs (CC-licensed, via Openverse) for the remaining
 * image slots. Real photos are inherently photorealistic — this replaces
 * AI generation when the generation service is unavailable.
 * Run: bun scripts/fetch-real-images.ts
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

type Target = { out: string; dir: string; query: string; minW?: number };

const GEN = path.join(process.cwd(), "public", "images", "gen");
const ZITE = path.join(process.cwd(), "public", "images", "zite");
const REGEN_EPOCH = new Date("2026-11-20T15:45:00Z").getTime();

function alreadyDone(t: Target): boolean {
  try {
    const st = fs.statSync(path.join(t.dir, t.out));
    return st.size > 30000 && st.mtimeMs >= REGEN_EPOCH;
  } catch {
    return false;
  }
}

const TARGETS: Target[] = [
  // zite category/article images still on old AI versions
  { out: "img_JX8TbpNwVvMe9H2u.jpg", dir: ZITE, query: "man phone night" },
  { out: "img_S-KECSoRY5SCp7RJ.jpg", dir: ZITE, query: "man smartphone thinking" },
  { out: "img_26twh5qIAbvzqRdl.jpg", dir: ZITE, query: "elderly woman telephone" },
  { out: "img_9nFXPoNmoeCwAfJE.jpg", dir: ZITE, query: "african market phone" },
  { out: "img_9FEr6sokBRFWKAW9.jpg", dir: ZITE, query: "hands smartphone" },
  { out: "img_wFZrRplDj0fdHgRB.jpg", dir: ZITE, query: "senior smartphone learning" },
  { out: "img_k_g-Bue4ibKanRTu.jpg", dir: ZITE, query: "checklist notebook desk" },
  // new Resource Centre images (currently interim copies)
  { out: "resource-centre-hero.jpg", dir: GEN, query: "woman laptop desk", minW: 1200 },
  { out: "knowledge-tools.jpg", dir: GEN, query: "notebook pen desk" },
  { out: "video-learning.jpg", dir: GEN, query: "friends smartphone video" },
  { out: "reporting-directory.jpg", dir: GEN, query: "man office telephone" },
  { out: "victim-guide.jpg", dir: GEN, query: "woman telephone table" },
  { out: "article-cat-online.jpg", dir: GEN, query: "smartphone night" },
  { out: "article-cat-money.jpg", dir: GEN, query: "african market money" },
  { out: "article-cat-social.jpg", dir: GEN, query: "woman smartphone street" },
  { out: "article-cat-business.jpg", dir: GEN, query: "businesswoman office" },
  { out: "article-cat-emerging.jpg", dir: GEN, query: "surprised man phone" },
];

type OvResult = {
  title?: string;
  url: string;
  width?: number;
  height?: number;
  license: string;
  source: string;
  filetype?: string;
};

async function search(q: string): Promise<OvResult[]> {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&page_size=20&license_type=commercial`;
  const res = await fetch(url, { headers: { "User-Agent": "GLOPROFAS-site-builder/1.0" }, signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`search http ${res.status}`);
  const data = (await res.json()) as { results?: OvResult[] };
  return data.results ?? [];
}

function pick(results: OvResult[], minW: number): OvResult | null {
  const good = results
    .filter((r) => (r.width ?? 0) >= minW && (r.height ?? 0) >= 500)
    .filter((r) => (r.width ?? 0) / (r.height ?? 0) > 1.2 && (r.width ?? 0) / (r.height ?? 0) < 2.4)
    .filter((r) => !/thumbnail|preview/i.test(r.url));
  return good[0] ?? null;
}

async function fetchOne(target: Target): Promise<"ok" | "skip" | "fail"> {
  try {
    const results = await search(target.query);
    const chosen = pick(results, target.minW ?? 800);
    if (!chosen) {
      console.log(`[none] ${target.out} — no suitable candidate (${results.length} results)`);
      return "fail";
    }
    const imgRes = await fetch(chosen.url, { signal: AbortSignal.timeout(25_000) });
    if (!imgRes.ok) throw new Error(`download http ${imgRes.status}`);
    const buf = Buffer.from(await imgRes.arrayBuffer());
    if (buf.length < 25_000) throw new Error("too small");
    const jpg = await sharp(buf).resize({ width: 1344, withoutEnlargement: false }).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
    fs.writeFileSync(path.join(target.dir, target.out), jpg);
    console.log(`[ok] ${target.out} ← "${chosen.title?.slice(0, 60) ?? chosen.url.slice(0, 60)}" (${chosen.width}x${chosen.height}, ${chosen.license}, ${chosen.source}, ${Math.round(jpg.length / 1024)}KB)`);
    return "ok";
  } catch (e) {
    console.log(`[fail] ${target.out}: ${e instanceof Error ? e.message : e}`);
    return "fail";
  }
}

async function main() {
  let ok = 0;
  const failed: Target[] = [];
  for (const t of TARGETS) {
    const r = await fetchOne(t);
    if (r === "ok") ok++;
    else if (r === "fail") failed.push(t);
    await new Promise((r2) => setTimeout(r2, 900)); // be polite to the API
  }
  console.log(`\nDONE ${ok}/${TARGETS.length}`);
  if (failed.length) console.log("FAILED: " + failed.map((f) => f.out).join(", "));
}

main();
