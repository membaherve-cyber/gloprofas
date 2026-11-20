/** Quick single-request probe: does the image API accept requests right now? */
import ZAI from "z-ai-web-dev-sdk";

async function main() {
  const zai = await ZAI.create();
  try {
    const res = await zai.images.generations.create({
      prompt: "A simple white coffee cup on a wooden table, natural light, photograph",
      size: "1024x1024",
    });
    const b64 = res?.data?.[0]?.base64;
    console.log(b64 ? `PROBE OK — ${Math.round(b64.length / 1024)}KB` : "PROBE EMPTY");
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log(`PROBE FAIL — ${msg.slice(0, 140)}`);
  }
}
main();
