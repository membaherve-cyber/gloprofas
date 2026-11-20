/**
 * GLOPROFAS ultra-realistic editorial image generation.
 * Run: bun run scripts/generate-images.ts
 * Outputs to public/images/gen/*.jpg
 */
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'gen');

const STYLE =
  'Ultra-realistic editorial documentary photograph, shot on 50mm full-frame lens, natural soft directional light, subtle depth of field, polished contrast, dignified non-stereotypical depiction, contemporary West African setting, navy and teal color grading, professional photojournalism, high quality, detailed. No text, no logos, no watermark, no readable screen content, no distorted hands.';

const IMAGES: { file: string; size: string; prompt: string }[] = [
  {
    file: 'hero-main.jpg',
    size: '1472x736',
    prompt: `A calm and thoughtful young African woman in a warm modern urban cafe in Cameroon, looking attentively at her smartphone with a slightly wary, focused expression as she examines a suspicious message, holding the phone in both hands, city visible softly blurred through window behind her, generous negative space on the left side for text overlay. ${STYLE}`,
  },
  {
    file: 'about-workshop.jpg',
    size: '1344x768',
    prompt: `A community anti-fraud awareness workshop in a bright community hall in Cameroon: an African facilitator in smart casual attire standing and speaking warmly to a seated diverse audience of men and women of different ages taking notes, engaged expressions, blue and white room. ${STYLE}`,
  },
  {
    file: 'campaign-seminar.jpg',
    size: '1344x768',
    prompt: `A professional financial-fraud-prevention seminar in a modern conference room in Africa: a confident African female presenter gesturing toward the audience, professionals seated at tables listening attentively, laptops and notepads, corporate but warm atmosphere. ${STYLE}`,
  },
  {
    file: 'campaign-school.jpg',
    size: '1344x768',
    prompt: `A young African speaker educating teenagers about online safety in a school classroom in Cameroon, students raising hands eagerly, bright daylight, modern room, energetic and positive mood. ${STYLE}`,
  },
  {
    file: 'victim-support.jpg',
    size: '1344x768',
    prompt: `A calm reassuring support scene: a compassionate African counselor in a modest office speaking gently with a young adult who looks relieved and safe, both seated across a small table, soft empathetic body language, warm afternoon light, quiet dignity, no distress. ${STYLE}`,
  },
  {
    file: 'family-impact.jpg',
    size: '1344x768',
    prompt: `An African family of four sitting around a simple dining table at home in the evening, discussing household finances together with concerned but supportive expressions, mother holding papers, warm lamp light, intimate documentary moment, dignity and care. ${STYLE}`,
  },
  {
    file: 'report-scene.jpg',
    size: '1344x768',
    prompt: `A respectful scene of a determined middle-aged African man calmly completing an online form on a laptop at a tidy home desk in the evening, desk lamp glow, focused and composed expression, taking a constructive next step, sense of quiet agency. ${STYLE}`,
  },
  {
    file: 'check-verify.jpg',
    size: '1344x768',
    prompt: `Close-up over-the-shoulder view of African hands holding a smartphone, carefully examining a message with a skeptical, analytical expression on the person's face partially visible, warm interior background softly blurred, moment of cautious verification before acting. ${STYLE}`,
  },
  {
    file: 'scam-mobile-money.jpg',
    size: '1344x768',
    prompt: `African market vendor woman at her colorful vegetable stall in a busy street market checking her mobile money balance on a basic phone with a careful, doubtful expression, customers blurred in background, vibrant market atmosphere. ${STYLE}`,
  },
  {
    file: 'scam-phishing.jpg',
    size: '1344x768',
    prompt: `A young African man at home frowning slightly at a suspicious SMS on his smartphone, finger hovering hesitantly, simple home interior with soft daylight, captured moment of doubt and caution. ${STYLE}`,
  },
  {
    file: 'scam-investment.jpg',
    size: '1344x768',
    prompt: `A middle-aged African businessman at a desk studying an investment offer on his phone with a skeptical, evaluating expression, calculator and notebook on desk, office with warm wood tones, moment of critical thinking. ${STYLE}`,
  },
  {
    file: 'scam-job.jpg',
    size: '1344x768',
    prompt: `A young African job seeker woman with a laptop at a small home table, looking at a job offer message with a doubtful, uncertain expression, CV papers beside the laptop, modest bright room, hopeful but cautious mood. ${STYLE}`,
  },
  {
    file: 'scam-romance.jpg',
    size: '1344x768',
    prompt: `A thoughtful African woman in her thirties sitting on a sofa in the evening holding her phone loosely in her lap, looking into the distance with a wistful, uncertain expression, soft warm lamp light, quiet emotional documentary portrait. ${STYLE}`,
  },
  {
    file: 'scam-impersonation.jpg',
    size: '1344x768',
    prompt: `An elderly African man at home receiving a phone call, holding the phone slightly away from his ear with a wary, suspicious expression, sitting in a modest living room with family photos, natural window light, moment of caution. ${STYLE}`,
  },
  {
    file: 'scam-business.jpg',
    size: '1344x768',
    prompt: `An African small-business owner in his shop office carefully checking payment details on an invoice with a pen, comparing with his phone, shelves of goods softly blurred behind, diligent independent verification. ${STYLE}`,
  },
  {
    file: 'scam-shopping.jpg',
    size: '1344x768',
    prompt: `A young African woman at home opening an empty-looking parcel package on her table with a disappointed, confused expression, phone beside her, delivery context, natural daylight, moment of realization. ${STYLE}`,
  },
  {
    file: 'scam-crypto.jpg',
    size: '1344x768',
    prompt: `A young African man in a shared workspace looking at cryptocurrency charts on his phone with an anxious, uncertain expression, hand on his chin, modern coworking environment, cautionary mood. ${STYLE}`,
  },
  {
    file: 'scam-advance-fee.jpg',
    size: '1344x768',
    prompt: `A hopeful African student at an internet cafe looking at a message promising a prize, torn between hope and doubt, hand near his mouth in a thinking gesture, warm cafe lighting around him. ${STYLE}`,
  },
  {
    file: 'scam-loan.jpg',
    size: '1344x768',
    prompt: `An African woman running a small tailoring business in her workshop, looking at her phone with a concerned, pressed expression while fabric and a sewing machine surround her, thinking about a loan offer, daylight through window. ${STYLE}`,
  },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const zai = await ZAI.create();
  let ok = 0;
  const failed: string[] = [];

  for (const img of IMAGES) {
    const outPath = path.join(OUT_DIR, img.file);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 30000) {
      console.log(`[skip] ${img.file} already exists`);
      ok++;
      continue;
    }
    try {
      const res = await zai.images.generations.create({
        prompt: img.prompt,
        size: img.size,
      });
      const b64 = res?.data?.[0]?.base64;
      if (!b64) throw new Error('empty response');
      fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
      console.log(`[ok] ${img.file} (${Math.round(b64.length / 1024)}KB b64)`);
      ok++;
    } catch (e) {
      console.error(`[fail] ${img.file}: ${e instanceof Error ? e.message : e}`);
      failed.push(img.file);
    }
  }

  console.log(`DONE: ${ok}/${IMAGES.length} generated. Failed: ${failed.join(', ') || 'none'}`);
}

main().catch((e) => {
  console.error('FATAL', e);
  process.exit(1);
});
