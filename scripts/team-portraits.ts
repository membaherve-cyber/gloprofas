/**
 * GLOPROFAS team portrait preparation.
 *
 * Processes the uploaded member photographs (upload/) into consistent
 * 4:5 institutional portraits (public/images/team/):
 *
 *   · Exact 880x1100 (4:5) output for every member — one aspect ratio
 *   · Top-anchored crops so faces near the top edge are preserved
 *   · Subtle unifying grade (gentle saturation ease + micro-contrast)
 *     so photographs taken in different settings sit together — real
 *     features, skin and identity untouched; no beautification, no
 *     generative fill, no cropping of faces
 *   · mozjpeg 4:4:4 encoding
 *
 * Run: bun scripts/team-portraits.ts
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const UP = path.join(process.cwd(), "upload");
const OUT = path.join(process.cwd(), "public", "images", "team");

type Crop = { top?: number; left?: number };

const MEMBERS: {
  file: string;
  slug: string;
  crop?: Crop;
}[] = [
  // 896x1200 (3:4) sources: crop to 4:5 by trimming the bottom only.
  { file: "Oscar Munimang = CEO.jfif", slug: "oscar-munimang" },
  { file: "Musing Derick Tenn = Secretary General.jfif", slug: "musing-derick-tenn" },
  { file: "Njaha Herve = Information and Technology Officer.jfif", slug: "njaha-herve" },
  { file: "Afongang Vivian = Public Relations Officer.jfif", slug: "afongang-vivian" },
  // 1199x1312 (near-square) source: trim the sides, keep full height.
  { file: "Stephanie Tum = Vice President.png", slug: "stephanie-tum", crop: { left: 75 } },
];

const W = 880;
const H = 1100; // 4:5

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const m of MEMBERS) {
    const src = path.join(UP, m.file);
    const img = sharp(src);
    const meta = await img.metadata();
    const sw = meta.width ?? 0;
    const sh = meta.height ?? 0;
    if (!sw || !sh) throw new Error(`cannot read ${m.file}`);

    // Source window with 4:5 ratio, anchored to protect the face.
    let cw = sw;
    let ch = Math.round((sw * 5) / 4);
    if (ch > sh) {
      ch = sh;
      cw = Math.round((ch * 4) / 5);
    }
    const top = m.crop?.top ?? 0;
    const left =
      m.crop?.left ?? Math.max(0, Math.round((sw - cw) / 2));

    const buf = await img
      .extract({ left, top, width: Math.min(cw, sw - left), height: Math.min(ch, sh - top) })
      .resize(W, H, { fit: "cover", position: "top" })
      .modulate({ saturation: 0.96 }) // subtle unifying colour ease
      .linear(1.03, -4) // gentle micro-contrast
      .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();

    const out = path.join(OUT, `${m.slug}.jpg`);
    fs.writeFileSync(out, buf);
    console.log(
      `[ok] ${m.slug}.jpg  ${sw}x${sh} -> ${W}x${H}  (${(buf.length / 1024).toFixed(0)}KB)  from "${m.file}"`
    );
  }
  console.log("DONE — team portraits prepared.");
}

main().catch((e) => {
  console.error("[fatal]", e);
  process.exit(1);
});
