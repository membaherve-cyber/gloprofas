/**
 * GLOPROFAS unified art-direction pass — "Blue Hour Twilight" edition,
 * ultrarealistic professional-photo-configuration re-take.
 *
 * One cohesive photographic language across the entire site:
 *   · Candid editorial documentary photojournalism
 *   · Cool blue-hour twilight / overcast ambience balanced by warm
 *     golden interior practical lights
 *   · Canon EOS R5, 50mm f/1.2L at f/2.0, ISO 400, Portra 400 science
 *   · Visible skin pores, peach fuzz, film grain, unedited RAW aesthetic
 *   · African subjects and West African settings
 *
 * Includes the 8 user-specified prompts verbatim (adapted only to append
 * negative instructions in natural language) plus in-theme regenerations
 * of every other displayed image. Legacy filenames are overwritten with
 * the new canonical frames so all existing references update instantly.
 *
 * Resume-safe via scripts/unified-done.txt.
 * Run: bun scripts/unified-images.ts
 */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const GEN = path.join(process.cwd(), "public", "images", "gen");
const CTX = path.join(process.cwd(), "public", "images", "context");
const DONE = path.join(process.cwd(), "scripts", "unified-done.txt");

/** Shared photographic DNA appended to every supplementary prompt. */
const STYLE =
  "Professional photographic capture: Canon EOS R5 full-frame mirrorless camera, 50mm f/1.2L prime lens at f/2.0, ISO 400, 1/125 second, handheld available light, Kodak Portra 400 color science with soft highlight rolloff, gentle lens vignetting, fine organic 35mm film grain, subtle chromatic aberration at the frame edges. Ultrarealistic surface detail: skin with visible pores, fine peach-fuzz hair, natural oil sheen on the T-zone, subtle blemishes and uneven skin tone rendered with true subsurface scattering; individual flyaway hairs; authentic fabric fibers, stitching and natural wrinkles; hands with clearly separated fingers, defined knuckles, tendons and natural fingernails. Candid unposed editorial documentary photojournalism, unedited RAW photo aesthetic. Strictly avoid waxy or airbrushed skin, plastic or porcelain sheen, digital beauty retouching, glossy 3D-render look, CGI, HDR halos, oversaturated colors, neon glow, stock-photo posing, text, logos, watermarks, readable screen content.";

type Job = { file: string; dir: string; size: string; prompt: string; also?: string[] };

const JOBS: Job[] = [
  /* ============================================================
     PART 1 — The 8 user-specified canonical images
     ============================================================ */

  // 1 · Hero — woman at cafe window, twilight (2:1)
  {
    file: "hero-cafe-woman.jpg",
    dir: GEN,
    size: "1472x736",
    also: ["hero-main.jpg"],
    prompt:
      "Candid editorial photograph of a Black woman in her late 20s with curly hair tied up in a bun, wearing a textured blue denim button-down shirt, sitting at a cafe table by a large floor-to-ceiling window at twilight, looking down at her smartphone with a serious, suspicious expression, white ceramic coffee cup in the foreground. Cool blue hour twilight skyline outside with warm golden and red city bokeh lights, warm ambient indoor lighting on her face, the phone screen glowing with a dim unreadable interface that softly illuminates her fingers. Professional photographic capture: Canon EOS R5, 50mm f/1.2L prime at f/2.0, ISO 400, 1/125s, Kodak Portra 400 color science, fine film grain, shallow depth of field with background cafe patrons softly out of focus yet anatomically believable. Ultrarealistic skin with visible pores, peach fuzz and natural oil sheen on her cheeks and forehead, individual flyaway hairs escaping the bun, denim fibers and stitching in sharp relief, five clearly separated fingers holding the phone. Subject positioned slightly right of center with open negative space on the left side for website text, unedited RAW photo aesthetic. Strictly avoid: waxy or airbrushed skin, plastic sheen, 3D render, CGI, pure-black void phone screen, melted or featureless background faces, stock photo smile, watermark, any text.",
  },

  // 2 · In-article feature — phishing & SMS scams (3:2 → 1344x768)
  {
    file: "feature-phishing-sms.jpg",
    dir: GEN,
    size: "1344x768",
    also: ["scam-phishing.jpg"],
    prompt:
      "Close-up over-the-shoulder candid photograph of a person's hand holding a smartphone on a commuter train, subtle look of confusion and hesitation as they read an incoming text message, natural overcast daylight streaming through the train window, realistic reflections of the train ceiling lights on the phone glass, authentic fingerprint smudges and micro-scratches on the screen, crisp phone body edges. Professional photographic capture: Canon EOS R5, 50mm f/1.2L prime at f/2.0, ISO 400, 1/125s, Kodak Portra 400 color science, fine film grain, shallow depth of field with fellow passengers in the background softly blurred yet anatomically believable with distinct heads and shoulders. Ultrarealistic skin on the hand with visible pores, knuckle wrinkles and natural fingernails, individual wrist hairs catching the light. Unedited RAW photo aesthetic. Strictly avoid: readable text, futuristic holograms, neon glow, CGI, waxy or airbrushed skin, melted background faces, watermark.",
  },

  // 3 · In-article feature — romance, senior, investment scams (3:2)
  {
    file: "feature-senior-laptop.jpg",
    dir: GEN,
    size: "1344x768",
    also: ["scam-romance.jpg"],
    prompt:
      "Candid documentary photograph of an older African adult in their late 60s sitting in a cozy living room armchair, looking intently at a laptop screen with a concerned, furrowed brow, reading glasses resting low on their nose, warm afternoon lamp light mixing with soft window daylight. Deep realistic wrinkles: crow's feet, laugh lines and furrowed brow rendered with true subsurface scattering, age spots and visible pores on the hands, each finger clearly separated and resting naturally on individual keyboard keys, family photos on the wall behind rendered as believable blurred snapshots with plausible frames. Professional photographic capture: Canon EOS R5, 50mm f/1.2L prime at f/2.0, ISO 400, 1/125s, Kodak Portra 400 color science, fine film grain, natural color tones, gentle lens vignetting. Genuine editorial photojournalism feel, unedited RAW photo aesthetic. Strictly avoid: dramatic dark shadows, cheesy stock photo pose, waxy or plastic skin, airbrushed smoothing, 3D render, illustration, watermark.",
  },

  // 4 · "Report a Scam" / verification tool card (4:5 → 864x1152)
  {
    file: "report-desk.jpg",
    dir: GEN,
    size: "864x1152",
    also: ["report-scene.jpg"],
    prompt:
      "Overhead flat-lay editorial photograph of a wooden desk with a laptop open to a clean browser window, a physical notebook with handwritten checklist notes, a pen, and a pair of eyeglasses, natural diffused daylight from a side window casting soft realistic shadows with correct direction and penumbras. Crisp focus on paper tooth grain, visible wood pore texture and the pen barrel's subtle reflections, faint believable reflections on the eyeglass lenses. Professional photographic capture: Canon EOS R5, 50mm prime at f/4, ISO 400, 1/125s, Kodak Portra 400 color science with natural white balance, fine film grain. Authentic workspace aesthetic, unedited RAW photo look. Strictly avoid: readable words, floating icons, padlock graphics, 3D render, neon colors, artificial studio lighting, watermark.",
  },

  // A · Matching article & section image — man in cafe at dusk (3:2)
  {
    file: "article-man-cafe.jpg",
    dir: GEN,
    size: "1344x768",
    also: ["article-cat-online.jpg"],
    prompt:
      "Candid editorial photograph of an African man in his 30s wearing a casual navy sweater, sitting inside a dimly lit modern cafe at dusk, holding a smartphone with a natural relaxed grip — five clearly separated fingers, thumb hovering over the screen — looking at it with subtle concern and skepticism, faint stubble follicles along his jaw. Large window behind him showing a cool twilight blue city street with soft warm amber bokeh lights, warm interior table lamp light illuminating the side of his face with realistic falloff. Professional photographic capture: Canon EOS R5, 50mm f/1.2L prime at f/2.0, ISO 400, 1/125s, Kodak Portra 400 color science, fine film grain, shallow depth of field, unedited RAW photo aesthetic. Ultrarealistic skin with visible pores and natural oil sheen on the forehead and nose, authentic knit texture on the sweater with individual wool fibers, believable background figures. Strictly avoid: readable text on screen, hooded hacker, neon glow, waxy or airbrushed skin, CGI, watermark.",
  },

  // B · E-commerce fraud guide — woman with laptop at blue hour (3:2)
  {
    file: "ecommerce-woman.jpg",
    dir: GEN,
    size: "1344x768",
    also: ["scam-shopping.jpg"],
    prompt:
      "Candid over-the-shoulder editorial photograph of an African woman in her 40s sitting at a wooden table near a window at blue hour dusk, scrolling on an open laptop with a hesitant, analytical expression, a credit card resting on the table beside a ceramic mug. The laptop screen shows a softly out-of-focus e-commerce page of colored blocks with no readable text, faintly reflecting in her eyes. Cool deep blue twilight sky through the glass, warm indoor tungsten light casting soft natural shadows with realistic falloff on her face and hands. Professional photographic capture: Canon EOS R5, 50mm f/1.2L prime at f/2.0, ISO 400, 1/125s, Kodak Portra 400 color science, fine film grain, shallow depth of field. Ultrarealistic hands with clearly separated fingers, defined knuckles, natural veins and fingernails resting on individually spaced keyboard keys, laptop edges and hinge rendered with crisp machined precision. Unedited RAW photo aesthetic. Strictly avoid: gibberish text, pure blank white screen, floating padlock icons, warning symbols, 3D render, waxy or airbrushed skin, watermark.",
  },

  // C · Deep-dive feature — older man with tablet at twilight (4:5)
  {
    file: "investor-senior.jpg",
    dir: GEN,
    size: "864x1152",
    prompt:
      "Candid documentary portrait of a thoughtful older African man in his 60s wearing eyeglasses and a dark casual collared shirt, sitting in a quiet armchair near a window at twilight, holding a tablet with a natural relaxed grip — each finger clearly articulated around the crisp machined tablet bezel, a faint unreadable screen glow softly lighting his hands. Deep twilight blue evening tones outside the window balanced by a warm amber reading lamp indoors whose light genuinely reaches and warms the near side of his face with realistic falloff. Salt-and-pepper stubble with individual hairs, deep forehead creases and crow's feet with true subsurface scattering, visible pores, authentic cotton weave on the shirt. Professional photographic capture: Canon EOS R5, 85mm f/1.4 prime at f/2.0, ISO 400, 1/125s, Kodak Portra 400 color science, fine organic film grain, shallow depth of field. Cinematic editorial photojournalism, unedited RAW photo aesthetic. Strictly avoid: dramatic dark shadows, stock photo pose, waxy or plastic skin, airbrushed smoothing, fused or merged fingers, warped device geometry, 3D render, illustration, watermark.",
  },

  // D · "How to verify & stay safe" checklist card (1:1)
  {
    file: "verify-hands.jpg",
    dir: GEN,
    size: "1024x1024",
    also: ["check-verify.jpg"],
    prompt:
      "Close-up editorial photograph of a person's hands on a dark cafe table beside a smartphone lying face-down and an open notebook with a pen: the right hand holds the pen naturally over the page as if mid-thought, the left hand rests flat and relaxed beside the notebook — every finger clearly separated with visible fingernails, defined knuckles and natural wrinkled skin texture. Cool blue hour twilight light from a nearby window mixing with a warm golden cafe lamp reflection, shallow depth of field with soft city bokeh lights in the background, crisp focus on skin pores and paper tooth grain. Professional photographic capture: Canon EOS R5, 50mm f/1.2L prime at f/2.0, ISO 400, 1/125s, Kodak Portra 400 color science, fine film grain. Calm and trustworthy mood, unedited RAW photo aesthetic. Strictly avoid: interlaced or fused fingers, ambiguous hand anatomy, waxy or over-smoothed skin, digital graphics, neon icons, CGI, watermark.",
  },

  /* ============================================================
     PART 2 — gen/ supplements in the same unified theme
     ============================================================ */

  {
    file: "about-workshop.jpg",
    dir: GEN,
    size: "864x1152",
    prompt:
      `Candid editorial photograph of a community anti-fraud awareness workshop in a modest hall in Cameroon at dusk: an African facilitator in smart-casual attire speaking warmly from the front, a seated audience of African men and women of different ages taking notes, warm tungsten room lighting with deep blue twilight visible through open louvered windows. ${STYLE}`,
  },
  {
    file: "campaign-seminar.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a professional financial-fraud-prevention seminar in a modern conference room in Africa at dusk: a confident African female presenter gesturing toward a seated audience of professionals with notepads, cool twilight blue light through tall windows balanced by warm interior downlights, corporate but warm atmosphere. ${STYLE}`,
  },
  {
    file: "campaign-school.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a young African speaker educating teenagers about online safety in a bright school classroom in Cameroon, students raising hands eagerly, natural late-afternoon daylight streaming through large windows, energetic and positive mood. ${STYLE}`,
  },
  {
    file: "victim-support.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a compassionate African counselor in a modest office at dusk speaking gently with a young adult who looks relieved and safe, both seated across a small table, soft empathetic body language, warm desk lamp light with deep blue twilight filtering through window blinds, quiet dignity, no distress. ${STYLE}`,
  },
  {
    file: "family-impact.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid documentary photograph of an African family of four sitting around a simple dining table at home in the evening, discussing household papers together with concerned but supportive expressions, warm lamp light mixed with cool blue dusk from the window, intimate documentary moment, dignity and care. ${STYLE}`,
  },
  {
    file: "scam-mobile-money.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African market vendor woman at her colorful vegetable stall on a West African street at dusk, checking her mobile money balance on a basic phone with a careful, doubtful expression, warm golden stall lamp glow against the deep blue twilight street, customers blurred in the background. ${STYLE}`,
  },
  {
    file: "scam-momo-notification.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African shopkeeper behind his counter at dusk frowning at a payment notification on his phone, finger hovering hesitantly over the screen, warm shop bulb light with cool blue evening light through the doorway, moment of doubt and verification. ${STYLE}`,
  },
  {
    file: "scam-investment.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a middle-aged African businessman at a wooden office desk at dusk studying an investment offer on his smartphone with a skeptical, evaluating expression, calculator and notebook on the desk, warm desk lamp light balanced by cool blue twilight through the office window, moment of critical thinking. ${STYLE}`,
  },
  {
    file: "scam-job.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a young African job seeker at a small home table in the evening, looking at a job offer message on her laptop with a doubtful, uncertain expression, printed CV papers beside the laptop, warm desk lamp light against cool blue dusk from the window, hopeful but cautious mood. ${STYLE}`,
  },
  {
    file: "scam-impersonation.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an elderly African man at home in his living room at twilight receiving a phone call, holding the phone slightly away from his ear with a wary, suspicious expression, framed family photos on shelves, warm lamp light mixing with deep blue evening window light, moment of caution. ${STYLE}`,
  },
  {
    file: "scam-advance-fee.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a hopeful young African student in a small internet cafe at night, looking at a message on his phone promising a prize, torn between hope and doubt, hand near his mouth in a thinking gesture, warm cafe lighting with cool blue night visible through the front window. ${STYLE}`,
  },
  {
    file: "scam-loan.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African woman running a small tailoring business in her workshop at dusk, looking at her phone with a concerned, pressed expression while colorful fabric and a sewing machine surround her, warm work lamp light against deep blue twilight through the window. ${STYLE}`,
  },
  {
    file: "scam-crypto.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a young African man in a modern cafe at dusk looking at cryptocurrency charts on his smartphone with an anxious, uncertain expression, hand on his chin, warm interior table lamp light on his face balanced by cool twilight blue city bokeh through the window behind him. ${STYLE}`,
  },
  {
    file: "scam-crypto-recovery.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African man at a home desk in the evening reading a message on his phone from a self-styled recovery agent, skeptical guarded expression, one eyebrow raised, notebook and cold cup of tea on the desk, warm desk lamp light against cool blue dusk window. ${STYLE}`,
  },
  {
    file: "scam-business.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African small-business owner in his shop office at dusk carefully checking payment details on a paper invoice with a pen while comparing with his phone, shelves of goods softly blurred behind, warm bulb light with cool blue evening light through the doorway, diligent independent verification. ${STYLE}`,
  },
  {
    file: "article-cat-money.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Close-up editorial photograph of African hands arranging cash banknotes and a smartphone on a dark wooden table at dusk, warm golden lamp light from one side and cool blue twilight from a window on the other, crisp focus on skin texture and paper currency grain, calm trustworthy mood. ${STYLE}`,
  },
  {
    file: "article-cat-social.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of two African friends on a sofa in a warm living room in the evening sharing a smartphone, one pointing at the screen with a cautious, warning expression while the other looks concerned, warm lamp light with deep blue dusk through the window. ${STYLE}`,
  },
  {
    file: "article-cat-business.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African office manager at her desk at dusk reviewing printed documents with a pen, laptop closed beside a mug, warm desk lamp glow against cool blue twilight through the office window, focused and methodical mood. ${STYLE}`,
  },
  {
    file: "article-cat-emerging.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a young African man seen in profile outdoors on a city street at night, his face softly lit from below by the warm glow of a phone held below the frame, cool blue city lights bokeh behind him, contemplative expression. ${STYLE}`,
  },
  {
    file: "resource-centre-hero.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Still-life editorial photograph of an open plain notebook, a pen, a smartphone lying face-down and reading glasses arranged on a warm wooden library table at dusk, cool blue hour light from a tall window mixing with a warm golden desk lamp, crisp paper grain and wood texture, calm studious mood. ${STYLE}`,
  },
  {
    file: "reporting-directory.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African woman at a tidy home desk at dusk calmly completing an online form on a laptop, notebook and pen beside her, a city skyline in deep blue hour visible through the window with warm golden interior lamp light, composed and determined mood. ${STYLE}`,
  },
  {
    file: "knowledge-tools.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Overhead flat-lay editorial photograph of a dark wooden desk with a plain open notebook, a fountain pen, a smartphone lying face-down, reading glasses and a small stack of printed guides, warm golden lamp light raking across from one side with cool blue twilight from a window on the other, soft realistic shadows, crisp paper grain. ${STYLE}`,
  },
  {
    file: "video-learning.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African mother and her teenage son in a warm living room in the evening watching an educational video on a tablet propped against a stack of books on the table, both leaning in with engaged expressions, warm lamp light with deep blue dusk through the window. ${STYLE}`,
  },
  {
    file: "victim-guide.jpg",
    dir: GEN,
    size: "1344x768",
    prompt:
      `Close-up editorial photograph of a compassionate African counselor's hand resting reassuringly on a young person's hand over a small office table, a plain notebook and tissue box nearby, warm desk lamp light with soft cool blue dusk through window blinds, calm supportive mood. ${STYLE}`,
  },

  /* ============================================================
     PART 3 — context/ regenerations in the same unified theme
     ============================================================ */

  {
    file: "article-business-controls.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of two African business colleagues reviewing a printed invoice together at an office desk at dusk, one pointing at a row of figures, warm desk lamp light with cool blue twilight through the window blinds, focused collaborative mood. ${STYLE}`,
  },
  {
    file: "home-online-shopping.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African woman at her living-room table at dusk opening a parcel delivery box with a hesitant, uncertain expression, smartphone beside the box, warm lamp light with deep blue twilight through the window. ${STYLE}`,
  },
  {
    file: "article-payment-pause.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Close-up editorial photograph of an African person's hand pausing thoughtfully above a smartphone lying on a dark cafe table beside a plain notebook and pen, cool blue hour twilight light from the window mixing with a warm golden lamp reflection, moment of hesitation before paying. ${STYLE}`,
  },
  {
    file: "person-phone-desk.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a young African professional at a home desk at dusk reading his smartphone with a focused, wary expression, closed laptop and mug beside him, warm desk lamp light against cool blue twilight through the window. ${STYLE}`,
  },
  {
    file: "person-finance-phone.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African woman in her 30s seated at a kitchen table in the evening reviewing her mobile banking on a smartphone with a furrowed, concentrated brow, warm tungsten kitchen light with cool blue dusk through the window. ${STYLE}`,
  },
  {
    file: "urban-professional.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial street photograph of an African professional man in a smart blazer walking through a city street at blue hour, glancing down at his phone with a wary, careful expression, warm golden shop lights and street bokeh against the cool twilight sky. ${STYLE}`,
  },
  {
    file: "payment-counter.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a West African market vendor's hands counting banknotes beside a small cash tin on a wooden stall counter at dusk, colorful fabrics blurred behind, warm golden lamp glow against deep blue twilight, shallow depth of field. ${STYLE}`,
  },
  {
    file: "intro-phone.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid over-the-shoulder editorial photograph of an African woman seated on a city bench at blue hour examining her smartphone with a skeptical expression, warm street light bokeh and cool deep blue twilight sky behind her. ${STYLE}`,
  },
  {
    file: "executive-phone-laptop.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African executive in a crisp shirt standing beside his office desk at dusk, holding his smartphone in one hand while resting the other on a closed laptop, city skyline in deep blue twilight through the window behind, warm desk lamp accent on his face. ${STYLE}`,
  },
  {
    file: "remote-work-call.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African woman working from home at a dining table at dusk on a video call on her open laptop, leaning slightly toward the screen with a polite but uncertain expression, warm lamp light with cool blue dusk through the window. ${STYLE}`,
  },
  {
    file: "campaign-corporate.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a corporate fraud-awareness training session in a modern office at dusk: an African facilitator presenting to employees seated around a conference table, notepads and pens out, warm interior lights with cool twilight through the glass partition walls. ${STYLE}`,
  },
  {
    file: "campaign-community.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a community awareness forum in a West African neighbourhood at dusk: an African facilitator beside a plain flip chart speaking to seated residents under warm string lights, deep blue evening sky above the courtyard, engaged faces. ${STYLE}`,
  },
  {
    file: "campaign-youth.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of African teenagers gathered on school benches at dusk around a young mentor holding a tablet, screen not visible, pointing as he explains, warm courtyard floodlight glow against the cool blue evening sky, engaged curious expressions. ${STYLE}`,
  },
  {
    file: "team-laptops-office.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a small African team in a modest office at dusk reviewing printed documents together around laptops, one person gesturing while explaining, warm ceiling lights with cool blue twilight through the windows, collaborative mood. ${STYLE}`,
  },
  {
    file: "contactless-card-terminal.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial close-up photograph of an African customer tapping a bank card on a small mobile money merchant terminal at an evening market stall, warm golden lamp glow on the hands against deep blue twilight, shallow depth of field. ${STYLE}`,
  },
  {
    file: "currency-exchange-desk.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of a traveller's hands counting mixed banknotes on a wooden exchange counter at dusk, a small tied cash bundle and coins beside, warm interior tungsten light with cool blue street twilight visible through a small window. ${STYLE}`,
  },
  {
    file: "notebook-smartphone-notes.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Close-up editorial photograph of an older African man's weathered hands writing in a plain notebook at a kitchen table in the evening, a smartphone lying face-down and folded reading glasses beside him, warm lamp light with soft cool blue dusk from the window, crisp paper grain. ${STYLE}`,
  },
  {
    file: "article-reporting.jpg",
    dir: CTX,
    size: "1344x768",
    prompt:
      `Candid editorial photograph of an African woman at a home desk at dusk calmly completing an online report on her laptop, notebook and pen beside her, warm desk lamp light against a deep blue twilight window with distant city lights, quiet determination. ${STYLE}`,
  },
];

async function main() {
  fs.mkdirSync(GEN, { recursive: true });
  fs.mkdirSync(CTX, { recursive: true });
  if (!fs.existsSync(DONE)) fs.writeFileSync(DONE, "");

  const done = new Set(
    fs
      .readFileSync(DONE, "utf8")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
  );

  const zai = await ZAI.create();
  let ok = 0;
  let skipped = 0;
  const failed: string[] = [];

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  for (const job of JOBS) {
    if (done.has(job.file)) {
      console.log(`[skip] ${job.file}`);
      skipped++;
      continue;
    }
    let success = false;
    // Up to 6 attempts with rate-limit-aware exponential backoff.
    for (let attempt = 1; attempt <= 6 && !success; attempt++) {
      try {
        const res = await zai.images.generations.create({
          prompt: job.prompt,
          size: job.size as "1344x768",
        });
        const b64 = res?.data?.[0]?.base64;
        if (!b64) throw new Error("empty response");
        const buf = Buffer.from(b64, "base64");
        fs.writeFileSync(path.join(job.dir, job.file), buf);
        for (const alias of job.also ?? []) {
          fs.writeFileSync(path.join(job.dir, alias), buf);
        }
        console.log(
          `[ok] ${job.file}${job.also?.length ? ` (+ ${job.also.join(", ")})` : ""} — ${Math.round(
            buf.length / 1024
          )}KB`
        );
        success = true;
        ok++;
        // Pace requests to stay under the rate limit.
        await sleep(4000);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        const isRate = msg.includes("429") || msg.toLowerCase().includes("too many");
        const waitMs = isRate ? 30000 * attempt : 5000 * attempt;
        console.error(
          `[fail ${attempt}/6] ${job.file}: ${msg.slice(0, 120)} — waiting ${Math.round(
            waitMs / 1000
          )}s${isRate ? " (rate limit)" : ""}`
        );
        if (attempt < 6) await sleep(waitMs);
      }
    }
    if (success) {
      fs.appendFileSync(DONE, job.file + "\n");
      done.add(job.file);
    } else {
      failed.push(job.file);
    }
  }

  console.log(
    `DONE: ${ok} generated, ${skipped} skipped, ${failed.length} failed. Failed: ${
      failed.join(", ") || "none"
    }`
  );
  if (failed.length > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
