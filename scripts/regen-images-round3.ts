/**
 * GLOPROFAS ultra-realistic image regeneration — round 3.
 * For every failing image: generate → strict VLM realism check → retry with
 * alternate prompt if score < 90 → save the best attempt as optimised JPG.
 * Resume-safe: skips images already marked PASS in scripts/regen-round3.txt.
 * Run: bun scripts/regen-images-round3.ts
 */
import ZAI from "z-ai-web-dev-sdk";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const GEN_DIR = path.join(process.cwd(), "public", "images", "gen");
const CTX_DIR = path.join(process.cwd(), "public", "images", "context");
const RESULTS = path.join(process.cwd(), "scripts", "regen-round3.txt");
fs.mkdirSync(GEN_DIR, { recursive: true });
fs.writeFileSync(RESULTS, fs.existsSync(RESULTS) ? fs.readFileSync(RESULTS) : "");

const STYLE =
  "Candid documentary photograph, available natural light, unretouched realistic skin with visible pores and natural imperfections, authentic contemporary West African setting, 35mm reportage style, subtle film grain, shallow depth of field, true photojournalism. Strictly no text, no logos, no readable screen content — screens dim or softly blurred. Naturally posed hands with correct anatomy. Real photograph, not a render, not illustration.";

const JUDGE = `You are a strict photo editor auditing one image for a professional anti-fraud website. The standard is ULTRAREALISTIC documentary photography (100% photorealistic, indistinguishable from a real photo).
Output exactly ONE line in this format:
IMG1 | SCORE <0-100> | PASS or FAIL | artifacts: <brief list of AI artifacts if any: plastic/waxy skin, warped hands or faces, gibberish or fake text, impossible objects, cartoon/illustration/3D-render look, over-smoothing, wrong anatomy, weird lighting>
Judge strictly. A score below 90 is FAIL.`;

type Job = { out: string; dir: string; prompts: string[] };

const JOBS: Job[] = [
  // ---------- context/ images ----------
  {
    out: "contactless-card-terminal.jpg", dir: CTX_DIR,
    prompts: [
      "A wary Cameroonian market shopkeeper pausing during a phone call beside her market stall, phone held to her ear, eyes narrowed in suspicion, colourful fabric stalls softly blurred behind, natural daylight.",
      "A young African shop owner standing at a counter lowering a phone from his ear after a suspicious call, cautious frown, small shop interior blurred behind, natural light.",
    ],
  },
  {
    out: "currency-exchange-desk.jpg", dir: CTX_DIR,
    prompts: [
      "A traveller seen from behind at a busy airport currency counter, counting banknotes on the counter, warm terminal lights bokeh, no legible signage, candid distance shot.",
      "Side view of a woman zipping a travel wallet at an airport table, passport tucked under her arm, out-of-focus departure hall behind, natural light.",
    ],
  },
  {
    out: "executive-phone-laptop.jpg", dir: CTX_DIR,
    prompts: [
      "Two African business colleagues reviewing a printed document together at an office desk, one pointing at the paper, a closed laptop beside them, window light, candid documentary.",
      "A senior African manager standing in an office reading a printed page, laptop closed on the desk, glass office wall blurred behind, thoughtful expression.",
    ],
  },
  {
    out: "home-online-shopping.jpg", dir: CTX_DIR,
    prompts: [
      "A woman on her sofa at home seen from behind over her shoulder, browsing a laptop whose screen shows only a soft blurred glow, an unopened parcel box on the cushion beside her, warm evening lamp light.",
      "A home hallway table with an unopened delivery box, a woman's hand reaching toward it, soft window light, shallow depth of field.",
    ],
  },
  {
    out: "notebook-smartphone-notes.jpg", dir: CTX_DIR,
    prompts: [
      "An older African man writing in a plain notebook at his kitchen table, a pen in his hand, a phone lying face-down beside the notebook, morning window light, realistic skin detail.",
      "Close candid shot of weathered hands writing notes in a plain notebook beside a face-down phone on a wooden table, soft daylight.",
    ],
  },
  {
    out: "payment-counter.jpg", dir: CTX_DIR,
    prompts: [
      "A shopkeeper counting a small stack of paper banknotes at a wooden counter, cash box open beside, market shop interior softly blurred behind, natural light.",
      "Hands of a market vendor arranging banknotes in a cash drawer, woven fabrics in the blurred background, daylight.",
    ],
  },
  // ---------- gen/ images ----------
  {
    out: "about-workshop.jpg", dir: GEN_DIR,
    prompts: [
      "View from the back of a community training hall photographed from a distance: rows of seated adults seen from behind, a facilitator standing in the middle distance gesturing calmly, warm hall lighting, no frontal faces close to camera.",
      "Four African professionals around a table in a small workshop room, a facilitator pointing at printed handouts on the table, participants in three-quarter view, window light.",
    ],
  },
  {
    out: "article-cat-emerging.jpg", dir: GEN_DIR,
    prompts: [
      "A young African man standing outdoors at dusk looking at his smartphone held loosely at his side, screen angled away and not visible, city street lights bokeh behind, pensive expression.",
      "Profile portrait of a young African man glancing at a phone in his hand at chest height, screen not visible, blurred evening street behind, thoughtful expression.",
    ],
  },
  {
    out: "article-cat-online.jpg", dir: GEN_DIR,
    prompts: [
      "An African woman pausing at her home desk, fingers resting lightly at the edge of a laptop keyboard, laptop screen showing only a soft blurred glow, cautious expression, natural window light.",
      "A woman seen in profile at a desk looking away from her laptop with a sceptical expression, the screen showing only a soft glow, home office, daylight.",
    ],
  },
  {
    out: "check-verify.jpg", dir: GEN_DIR,
    prompts: [
      "A young man seated at a wooden table looking down at a smartphone lying flat on the table in front of him, viewed from a three-quarter side angle so the screen is not visible, a pen and plain notebook beside him, thoughtful expression, natural light.",
      "Over-the-shoulder view of a person examining a smartphone lying flat on a café table, screen angled away from camera, coffee cup beside, soft daylight.",
    ],
  },
  {
    out: "family-impact.jpg", dir: GEN_DIR,
    prompts: [
      "An African family of three — mother, father and teenage son — sitting around a living-room table in the evening, talking calmly together with no devices visible, warm lamp light, genuine supportive expressions.",
      "A mother and teenage son at a kitchen table in the evening, both leaning over household papers, warm lamp light, quiet supportive mood.",
    ],
  },
  {
    out: "report-scene.jpg", dir: GEN_DIR,
    prompts: [
      "A calm young African woman seated at a tidy desk, hands folded on the table, a closed laptop and a notebook in front of her, composed determined expression, soft office light.",
      "Side view of a composed young woman at a desk writing in a notebook beside a closed laptop, calm focused expression, warm desk light.",
    ],
  },
  {
    out: "reporting-directory.jpg", dir: GEN_DIR,
    prompts: [
      "An African man in a smart shirt making a phone call at a community office desk, phone to his ear, his other hand resting on a plain closed folder, a world map softly blurred on the wall behind, daylight.",
      "A woman at an office desk holding a phone to her ear with one hand and taking notes with the other, a world map blurred behind, natural light.",
    ],
  },
  {
    out: "scam-advance-fee.jpg", dir: GEN_DIR,
    prompts: [
      "An elderly African woman sitting outside her home reading a message on a basic phone held at reading distance, the screen not visible to the camera, puzzled suspicious expression, morning light, detailed wrinkles.",
      "An elderly market woman squinting suspiciously at a basic phone in her hand, simple home doorway behind, natural daylight.",
    ],
  },
  {
    out: "scam-business.jpg", dir: GEN_DIR,
    prompts: [
      "Two African business partners in a bright office corridor, one holding a phone for the other to see angled so the screen is not visible to the camera, both with serious cautious expressions, a glass wall softly blurred behind.",
      "A senior African executive standing at a boardroom table, phone in hand at his side, listening with a sceptical expression, blurred meeting room behind.",
    ],
  },
  {
    out: "scam-crypto.jpg", dir: GEN_DIR,
    prompts: [
      "A young African man at an urban kiosk checking a phone held in a relaxed grip at chest height, screen angled away from the camera, market street bokeh behind, thoughtful frown.",
      "A young man leaning against a wall outdoors with arms crossed and a phone tucked between his fingers, sceptical look, blurred street behind.",
    ],
  },
  {
    out: "scam-impersonation.jpg", dir: GEN_DIR,
    prompts: [
      "A mature African woman standing by a window at home on a phone call, one hand on her hip, alert sceptical expression, phone to her ear, soft daylight.",
      "A man in a doorway answering a phone call with a wary expression, one hand raised in a questioning gesture, home interior blurred, natural light.",
    ],
  },
  {
    out: "scam-investment.jpg", dir: GEN_DIR,
    prompts: [
      "Three African friends in a modest sitting room, one showing a message on his phone angled so the screen is not visible, the others leaning in with curious expressions, evening light.",
      "Two friends at a bus stop, one showing his phone angled away from the camera to the other, who frowns doubtfully, urban street blurred behind.",
    ],
  },
  {
    out: "scam-job.jpg", dir: GEN_DIR,
    prompts: [
      "A young African graduate sitting on the edge of his bed in a simple bedroom reading a message on his phone held loosely, screen turned away, hopeful but cautious expression, morning light.",
      "A young man at a bus stop reading his phone with a cautious expression, the phone screen angled away, city morning light.",
    ],
  },
  {
    out: "scam-phishing.jpg", dir: GEN_DIR,
    prompts: [
      "An office worker pausing with fingers hovering above a laptop keyboard, looking at the screen with a sceptical raised eyebrow, the laptop screen showing only a soft blurred glow, a coffee cup on the desk, natural window light.",
      "A woman at a desk leaning back from her laptop with folded arms and a doubtful expression, the screen only a soft glow, office daylight.",
    ],
  },
  {
    out: "scam-romance.jpg", dir: GEN_DIR,
    prompts: [
      "A middle-aged African woman seated by a window at dusk holding her phone loosely in her lap while gazing thoughtfully outside, phone screen not visible, soft warm interior light.",
      "A woman in profile by a rainy window at dusk, phone resting in her lap, wistful expression, warm lamp glow.",
    ],
  },
  {
    out: "scam-shopping.jpg", dir: GEN_DIR,
    prompts: [
      "An unopened delivery cardboard box on a home entryway table beside a woman's hand resting on the box lid, soft window light, shallow depth of field.",
      "A delivery box and shopping bag on a doorstep seen from inside an open door, soft morning light, no text visible.",
    ],
  },
  {
    out: "victim-guide.jpg", dir: GEN_DIR,
    prompts: [
      "A young African woman seated at a kitchen table with a warm drink, a phone lying face-down beside her, taking a calm breath with a resolute expression, notebook and pen in front of her, morning light.",
      "A person at a kitchen table writing a list in a notebook, phone face-down beside, steady calm expression, soft daylight.",
    ],
  },
  {
    out: "victim-support.jpg", dir: GEN_DIR,
    prompts: [
      "A supportive conversation between two African friends on a sofa, one listening with an empathetic hand on the other's shoulder, no devices visible, warm afternoon living-room light.",
      "Two women seated across a small table, one comforting the other with a hand over hers, empathetic expressions, soft window light.",
    ],
  },
  // ---------- new images replacing zite references ----------
  {
    out: "scam-momo-notification.jpg", dir: GEN_DIR,
    prompts: [
      "A Cameroonian market vendor counting banknotes from her cash drawer with a focused expression, a phone lying face-down on the stall counter, colourful fabrics stacked behind in soft blur, natural daylight.",
      "A market stall owner checking a paper receipt beside a cash box, phone face-down on the counter, fabric rolls blurred behind, daylight.",
    ],
  },
  {
    out: "scam-crypto-recovery.jpg", dir: GEN_DIR,
    prompts: [
      "A young African man at an internet café table leaning back from his laptop with arms crossed and a doubtful expression, the laptop screen showing only a blurred glow, other customers soft in the background, cool interior light.",
      "A young man beside a closed laptop at a café table, chin resting on his hand, doubtful expression, warm café light.",
    ],
  },
];

/* ---------------- engine ---------------- */

async function main() {
  const zai = await ZAI.create();
  const lines = fs.readFileSync(RESULTS, "utf8").split("\n");
  const done = new Set(
    lines
      .filter((l) => l.startsWith("PASS ") || l.startsWith("BEST "))
      .map((l) => l.slice(5).trim().split(" ")[0])
  );

  let passCount = 0;
  let bestCount = 0;

  for (const job of JOBS) {
    const outPath = path.join(job.dir, job.out);
    if (done.has(job.out)) {
      console.log(`SKIP ${job.out} (already attempted)`);
      continue;
    }

    let best: { score: number; buffer: Buffer } | null = null;

    for (let attempt = 0; attempt < job.prompts.length; attempt++) {
      const prompt = `${job.prompts[attempt]} ${STYLE}`;
      try {
        const res = await zai.images.generations.create({ prompt, size: "1344x768" });
        const b64 = res.data?.[0]?.base64;
        if (!b64) throw new Error("no image data");
        const buffer = Buffer.from(b64, "base64");

        const verdict = await zai.chat.completions.createVision({
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
        const text = verdict.choices?.[0]?.message?.content ?? "";
        const scoreMatch = text.match(/SCORE\s*(\d+)/i);
        const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
        console.log(`${job.out} attempt ${attempt + 1}: score ${score}${score >= 90 ? " (PASS)" : ""}`);

        if (!best || score > best.score) best = { score, buffer };
        if (score >= 90) break;
      } catch (e) {
        console.log(`${job.out} attempt ${attempt + 1} ERROR: ${(e as Error).message}`);
      }
    }

    if (best) {
      const jpg = await sharp(best.buffer).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
      fs.writeFileSync(outPath, jpg);
      if (best.score >= 90) {
        fs.appendFileSync(RESULTS, `PASS ${job.out}\n`);
        passCount++;
        console.log(`SAVED ${job.out} — PASS (${best.score})`);
      } else {
        fs.appendFileSync(RESULTS, `BEST ${job.out} ${best.score}\n`);
        bestCount++;
        console.log(`SAVED ${job.out} — best score ${best.score} (below threshold, kept best)`);
      }
    } else {
      fs.appendFileSync(RESULTS, `ERROR ${job.out}\n`);
      console.log(`FAILED completely: ${job.out}`);
    }
  }

  console.log(`\nDone. Pass: ${passCount}/${JOBS.length}, best-effort kept: ${bestCount}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
