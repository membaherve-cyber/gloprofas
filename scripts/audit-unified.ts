/**
 * Strict photorealism audit for the 8 canonical unified-theme images.
 * Uses the vision chat API to judge each image against the ultrarealistic
 * standard; prints one verdict line per image. Run AFTER generation:
 *   bun scripts/audit-unified.ts
 */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const GEN = path.join(process.cwd(), "public", "images", "gen");

const FILES = [
  "hero-cafe-woman.jpg",
  "feature-phishing-sms.jpg",
  "feature-senior-laptop.jpg",
  "report-desk.jpg",
  "article-man-cafe.jpg",
  "ecommerce-woman.jpg",
  "investor-senior.jpg",
  "verify-hands.jpg",
];

const JUDGE = `You are a strict photo editor auditing one image for a professional anti-fraud website. The standard is ULTRAREALISTIC documentary photography, indistinguishable from a real photograph: candid editorial look, natural light, realistic skin with pores/wrinkles, film grain, no AI artifacts.
Output exactly ONE line in this format:
SCORE <0-100> | PASS or FAIL | notes: <brief list of any artifacts: plastic/waxy skin, warped hands or faces, gibberish or fake text, impossible objects, cartoon/3D-render look, over-smoothing, wrong anatomy, weird lighting>
A score below 85 is FAIL. Be strict.`;

async function main() {
  const zai = await ZAI.create();
  for (const file of FILES) {
    const p = path.join(GEN, file);
    if (!fs.existsSync(p)) {
      console.log(`${file} | MISSING`);
      continue;
    }
    const b64 = fs.readFileSync(p).toString("base64");
    let done = false;
    for (let attempt = 1; attempt <= 4 && !done; attempt++) {
      try {
        const res = await zai.chat.completions.createVision({
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: JUDGE },
                { type: "image_url", image_url: { url: `data:image/jpeg;base64,${b64}` } },
              ],
            },
          ],
          thinking: { type: "disabled" },
        });
        const out = (res.choices[0]?.message?.content ?? "").trim().split("\n")[0];
        console.log(`${file} | ${out}`);
        done = true;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`${file} | attempt ${attempt} error: ${msg.slice(0, 100)}`);
        await new Promise((r) => setTimeout(r, 8000 * attempt));
      }
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
}
main();
