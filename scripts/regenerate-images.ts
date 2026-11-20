/**
 * GLOPROFAS ultra-realistic image regeneration + self-verification.
 * For every image: generate → VLM strict realism check → retry with simpler
 * prompt if score < 90 → save as optimised JPG (sharp).
 * Run: bun scripts/regenerate-images.ts [--only <filename>]
 */
import ZAI from "z-ai-web-dev-sdk";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const GEN_DIR = path.join(process.cwd(), "public", "images", "gen");
const CTX_DIR = path.join(process.cwd(), "public", "images", "context");
const ZITE_DIR = path.join(process.cwd(), "public", "images", "zite");
fs.mkdirSync(GEN_DIR, { recursive: true });

const STYLE =
  "Candid documentary photograph, available natural light, unretouched realistic skin with visible pores and natural imperfections, authentic contemporary West African setting, 35mm reportage style, subtle film grain, shallow depth of field, true photojournalism. Strictly no text, no logos, no readable screen content — screens dim or softly blurred. Naturally posed hands with correct anatomy. Real photograph, not a render, not illustration.";

const SIMPLE =
  "Simple candid documentary photo, one or two people, natural daylight, realistic skin, 35mm, shallow depth of field, no text anywhere, phone screens dim, hands naturally posed, unretouched photojournalism look.";

type Job = { out: string; dir: string; size: string; prompt: string };

const JOBS: Job[] = [
  // ---------- regenerate failing gen/ images ----------
  {
    out: "hero-main.jpg", dir: GEN_DIR, size: "1472x736",
    prompt: "A thoughtful young African woman seated by a cafe window at dusk, three-quarter view, looking down at the dark-screened smartphone held in both hands with a wary focused expression, city lights softly blurred behind her, generous empty space on the left of the frame.",
  },
  {
    out: "about-workshop.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "View from the back of a community hall: rows of seated adults photographed from behind (backs of heads and shoulders), a facilitator standing in the middle distance facing the audience, gesturing calmly, warm hall lighting, no frontal faces.",
  },
  {
    out: "campaign-school.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "Secondary school classroom seen from the back: students photographed from behind raising their hands, a teacher standing at the side near a plain blank whiteboard, bright daylight through windows, energetic mood, no frontal faces.",
  },
  {
    out: "campaign-seminar.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "Professional seminar viewed from the back row: backs of seated professionals, a distant presenter softly out of focus beside a large screen glowing plain deep blue, modern conference room, attentive atmosphere.",
  },
  {
    out: "check-verify.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "Over-the-shoulder view of an African man examining his smartphone held at chest height, his head in profile at the edge of frame, the phone screen showing only a softly blurred colorful interface, warm interior background, moment of careful verification.",
  },
  {
    out: "family-impact.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "An African mother and her teenage son at a kitchen table in the evening, both looking down at household papers and a calculator, heads inclined, hands around a shared mug of tea, warm lamp light, quiet supportive mood.",
  },
  {
    out: "report-scene.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "Side view of a composed middle-aged African man at a tidy home desk at night, laptop glow softly lighting his face, phone in hand, focused and calm as he takes constructive action, desk lamp warm in background.",
  },
  {
    out: "victim-support.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "Two African women in profile seated across a small table in a modest office, one listening empathetically with hands folded, the other speaking with quiet relief, soft afternoon window light, dignified and calm.",
  },
  {
    out: "scam-phishing.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "A young African man standing at a city bus stop glancing down at the dim smartphone buzzing in his hand, skeptical squint, urban street softly blurred behind, midday light, moment of doubt.",
  },
  {
    out: "scam-mobile-money.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "An African market vendor woman in a colorful headwrap at her vegetable stall, holding her dark-screened basic phone loosely at chest height while looking off thoughtfully, produce softly arranged around, harsh natural daylight.",
  },
  {
    out: "scam-investment.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "A middle-aged African businessman with reading glasses at a wooden desk, holding a smartphone at desk level while studying it with a skeptical evaluating expression, calculator pushed to one side, warm office light, side angle.",
  },
  {
    out: "scam-job.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "A young African woman at a small home table beside a closed laptop and a blank notebook, holding her phone with a cautious hopeful expression, modest bright room, morning light, three-quarter view.",
  },
  {
    out: "scam-romance.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "An African woman in her thirties on a sofa at dusk, smartphone resting loosely in her lap, gazing toward the window with a wistful uncertain expression, soft lamp light, quiet emotional documentary mood.",
  },
  {
    out: "scam-impersonation.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "An elderly African man in an armchair holding his ringing phone slightly away from his ear with a wary suspicious expression, modest living room with landscape paintings softly behind, natural window light.",
  },
  {
    out: "scam-business.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "An African shop owner standing at his store counter on a phone call while glancing at a small payment terminal on the counter, shelves of goods softly blurred behind, daytime shop light, alert and careful.",
  },
  {
    out: "scam-crypto.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "A young African man at a cafe table with elbows on the table and chin resting on his hand, a smartphone lying flat on the table with its screen dark, pensive uncertain expression, warm cafe ambience.",
  },
  {
    out: "scam-advance-fee.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "An African student at an internet cafe, hand on cheek, looking at a dim out-of-focus monitor with a torn expression between hope and doubt, warm cafe lighting around him, three-quarter view.",
  },
  {
    out: "scam-loan.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "An African woman who runs a small fabric shop standing at her counter, holding her phone with a concerned but composed expression, a blank notebook and pen on the counter, bolts of colorful fabric softly behind, daylight through the shop front.",
  },
  // ---------- regenerate failing context/ images ----------
  {
    out: "contactless-card-terminal.jpg", dir: CTX_DIR, size: "1344x768",
    prompt: "Close view of a customer's hand holding a plain bank card approaching a contactless payment terminal on a shop counter, slightly elevated angle, no faces, shop lights softly blurred behind, crisp focus on card and terminal.",
  },
  {
    out: "executive-phone-laptop.jpg", dir: CTX_DIR, size: "1344x768",
    prompt: "Three-quarter back view of an African executive at a modern office desk, phone held to his ear, looking toward a closed laptop, city view through the window behind, cool daylight, professional calm.",
  },
  {
    out: "home-online-shopping.jpg", dir: CTX_DIR, size: "1344x768",
    prompt: "An African woman at her home table opening a small delivery parcel box with both hands, curious mild expression, a smartphone and scissors beside her, natural daylight from a window, side view.",
  },
  {
    out: "intro-phone.jpg", dir: CTX_DIR, size: "1344x768",
    prompt: "Top-down view of an African person's hands at a wooden desk, one hand holding a dim smartphone above a closed blank notebook with a pen resting on it, warm desk light, still-life composition.",
  },
  // ---------- regenerate failing zite/ images ----------
  {
    out: "img_BPedTDWHGQzb-FZp.jpg", dir: ZITE_DIR, size: "1344x768",
    prompt: "An African woman at a kitchen counter in the morning reading her dim smartphone with a slight frown, kettle and cups softly behind, window daylight, candid moment of doubt.",
  },
  {
    out: "img_XRXUCAiJJ46mAuVh.jpg", dir: ZITE_DIR, size: "1344x768",
    prompt: "Close view of an African market vendor's hands counting a few worn banknotes beside a basic phone resting on the stall counter, colorful goods softly blurred behind, natural daylight.",
  },
  {
    out: "img_2jsmyLqQWbvqkX0_.jpg", dir: ZITE_DIR, size: "1344x768",
    prompt: "An African man in a shirt at a desk in side profile, holding his phone at desk level beside a small stack of coins, thinking hard with a guarded expression, soft office light.",
  },
  {
    out: "img_RNp07pYUDwb_i1sA.jpg", dir: ZITE_DIR, size: "1344x768",
    prompt: "A young African graduate at a cafe table with a plain document folder, checking his dim smartphone with cautious hope, coffee cup beside, warm daylight, three-quarter view.",
  },
  {
    out: "img_JX8TbpNwVvMe9H2u.jpg", dir: ZITE_DIR, size: "1344x768",
    prompt: "An African man seated on a window-seat sofa at dusk holding his phone loosely, looking out the window with a wistful faraway expression, city lights soft outside, quiet mood.",
  },
  {
    out: "img_S-KECSoRY5SCp7RJ.jpg", dir: ZITE_DIR, size: "1344x768",
    prompt: "An African woman at a home desk looking at the dark-screened smartphone in her hand with quiet worry, a blank notebook and pen before her, soft natural window light.",
  },
  {
    out: "img_26twh5qIAbvzqRdl.jpg", dir: ZITE_DIR, size: "1344x768",
    prompt: "An older African woman on a sofa receiving a phone call, holding the phone before her and studying its screen skeptically, warm lamp light, living room softly blurred.",
  },
  {
    out: "img_9nFXPoNmoeCwAfJE.jpg", dir: ZITE_DIR, size: "1344x768",
    prompt: "An African small-shop owner woman behind her counter holding her phone with a concerned composed expression, shop shelves softly blurred behind, daylight from the doorway.",
  },
  {
    out: "img_9FEr6sokBRFWKAW9.jpg", dir: ZITE_DIR, size: "1344x768",
    prompt: "Over-the-shoulder view of an African person adjusting settings on a dim smartphone at a desk, hand and phone in focus, head partially out of frame, soft daylight, moment of taking protective action.",
  },
  {
    out: "img_wFZrRplDj0fdHgRB.jpg", dir: ZITE_DIR, size: "1344x768",
    prompt: "A community table seen from the side: an African mentor patiently guiding an older man holding his own dim smartphone, both seated, warm community-hall light, respectful and calm.",
  },
  {
    out: "img_k_g-Bue4ibKanRTu.jpg", dir: ZITE_DIR, size: "1344x768",
    prompt: "Top-down still life of printed checklist papers fanned across a wooden desk with a pen, reading glasses and a dim smartphone, warm desk lamp light, tidy composition.",
  },
  // ---------- new Resource Centre images ----------
  {
    out: "resource-centre-hero.jpg", dir: GEN_DIR, size: "1472x736",
    prompt: "Wide shot of an African woman at a home study desk with a laptop, a printed checklist and a smartphone laid out, learning attentively, warm evening lamp light, generous empty space on the left for text overlay.",
  },
  {
    out: "knowledge-tools.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "Top-down still life of several printed checklists stacked on a wooden desk beside a pen, reading glasses and a smartphone with a dark screen, soft natural window light, library calm.",
  },
  {
    out: "video-learning.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "Two African friends on a sofa in the evening watching an educational video together on a smartphone held between them, engaged expressions in warm lamp light, cozy living room softly blurred.",
  },
  {
    out: "reporting-directory.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "An African man at a desk on a calm phone call, taking notes in a blank notebook, an out-of-focus world map softly visible on the wall behind, daylight office scene, purposeful mood.",
  },
  {
    out: "victim-guide.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "An African woman at a kitchen table in the morning making a steady phone call, blank notebook and pen before her, resolute calm expression, soft morning light, sense of taking back control.",
  },
  {
    out: "article-cat-online.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "A young African man at a desk at night, his face softly lit from below by the glow of the dim smartphone in his hands, focused cautious expression, dark room behind, cinematic mood.",
  },
  {
    out: "article-cat-money.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "Close view of two African traders' hands exchanging worn banknotes across a market stall counter, a basic phone resting on the counter, colorful goods softly blurred, natural daylight.",
  },
  {
    out: "article-cat-social.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "An African woman on a bus scrolling her dim smartphone with a skeptical raised eyebrow, other passengers softly blurred, daylight through the window, candid commuting moment.",
  },
  {
    out: "article-cat-business.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "An African businesswoman at an office desk reviewing a payment on her smartphone with a careful verifying expression, a colleague softly out of focus behind, bright modern office.",
  },
  {
    out: "article-cat-emerging.jpg", dir: GEN_DIR, size: "1344x768",
    prompt: "A young African man at home listening to his phone with a surprised doubtful expression, head slightly tilted, soft living room behind, natural window light, candid moment.",
  },
];

const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null;
const jobs = only ? JOBS.filter((j) => j.out === only) : JOBS;

async function generate(zai: Awaited<ReturnType<typeof ZAI.create>>, prompt: string, size: string) {
  const res = await zai.images.generations.create({ prompt, size });
  const b64 = res?.data?.[0]?.base64;
  if (!b64) throw new Error("empty response");
  return Buffer.from(b64, "base64");
}

async function review(zai: Awaited<ReturnType<typeof ZAI.create>>, jpg: Buffer) {
  const b64 = jpg.toString("base64");
  const res = await zai.chat.completions.createVision({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "You are a strict photo editor. Is this image 100% photorealistic like a real documentary photograph (score 90+)? Reply in ONE line exactly: SCORE <number 0-100> | PASS or FAIL | <artifacts if any>",
          },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${b64}` } },
        ],
      },
    ],
    thinking: { type: "disabled" },
  });
  const text = res.choices?.[0]?.message?.content ?? "";
  const scoreMatch = text.match(/SCORE\s*(\d+)/i);
  const score = scoreMatch ? Number(scoreMatch[1]) : 0;
  const pass = /PASS/i.test(text) && !/FAIL/i.test(text);
  return { score, pass, text };
}

async function main() {
  const zai = await ZAI.create();
  const results: { out: string; status: string; score: number }[] = [];

  for (const job of jobs) {
    const outPath = path.join(job.dir, job.out);
    let best: { score: number; buf: Buffer } | null = null;
    let status = "FAIL";

    for (let attempt = 1; attempt <= 3; attempt++) {
      const prompt =
        attempt === 1
          ? `${job.prompt} ${STYLE}`
          : `Simplified candid documentary photo: ${job.prompt.split(",")[0]}, single subject, natural daylight, realistic skin texture, no text, dim screens, simple background. ${SIMPLE}`;
      try {
        const png = await generate(zai, prompt, job.size);
        const jpg = await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
        const r = await review(zai, jpg);
        process.stdout.write(`  [${job.out}] attempt ${attempt}: score ${r.score} ${r.pass ? "PASS" : "FAIL"}\n`);
        if (!best || r.score > best.score) best = { score: r.score, buf: jpg };
        if (r.pass && r.score >= 90) break;
      } catch (e) {
        process.stdout.write(`  [${job.out}] attempt ${attempt} error: ${e instanceof Error ? e.message : e}\n`);
        await new Promise((r) => setTimeout(r, 3000));
      }
    }

    if (best) {
      fs.writeFileSync(outPath, best.buf);
      status = best.score >= 90 ? "PASS" : best.score >= 85 ? "SOFT-PASS" : "FAIL";
      results.push({ out: job.out, status, score: best.score });
    } else {
      results.push({ out: job.out, status: "ERROR", score: 0 });
    }
  }

  console.log("\n==== SUMMARY ====");
  for (const r of results) console.log(`${r.status}\t${r.score}\t${r.out}`);
  const fails = results.filter((r) => r.status === "FAIL" || r.status === "ERROR");
  console.log(`DONE: ${results.length - fails.length}/${results.length} passed`);
  if (fails.length) console.log("RETRY LIST: " + fails.map((f) => f.out).join(","));
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
