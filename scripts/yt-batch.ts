// Batch search for credible anti-scam educational videos (2–4 min target).
const QUERIES: [string, string][] = [
  ["online-scams", "how to spot a scam online official"],
  ["phishing", "how to recognize phishing emails CISA"],
  ["phishing-ncsc", "phishing attacks NCSC cyber awareness"],
  ["mobile-money", "mobile money scam awareness Africa"],
  ["romance", "romance scam awareness FTC"],
  ["investment", "investment scam red flags FTC"],
  ["crypto", "cryptocurrency scam awareness"],
  ["social-media", "social media scam awareness"],
  ["whatsapp", "WhatsApp scam awareness"],
  ["fake-website", "how to spot a fake website scam"],
  ["identity-theft", "identity theft protection FTC"],
  ["deepfake", "deepfake scam awareness video"],
  ["after-scam", "what to do if you have been scammed"],
  ["interpol", "INTERPOL cybercrime awareness"],
  ["europol", "Europol cybercrime awareness"],
  ["unodc", "UNODC cybercrime awareness"],
  ["scamwatch", "Scamwatch how to spot a scam"],
  ["singapore", "scams awareness Singapore police Spot the Signs"],
  ["canada", "Canadian Anti-Fraud Centre scam awareness"],
];

for (const [tag, q] of QUERIES) {
  try {
    const url =
      "https://www.youtube.com/results?search_query=" + encodeURIComponent(q) + "&sp=EgIQAQ%253D%253D";
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    const html = await res.text();
    const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
    if (!m) {
      console.log(`\n### ${tag}: NO DATA`);
      continue;
    }
    const data = JSON.parse(m[1]);
    const out: string[] = [];
    function walk(node: unknown) {
      if (!node || typeof node !== "object" || out.length >= 10) return;
      const vr = (node as Record<string, unknown>).videoRenderer as Record<string, any> | undefined;
      if (vr && vr.videoId) {
        const title = vr.title?.runs?.map((r: any) => r.text).join("") ?? "";
        const channel = vr.ownerText?.runs?.[0]?.text ?? "";
        const duration = vr.lengthText?.simpleText ?? "";
        out.push(`${vr.videoId} | ${duration} | ${channel} | ${title}`);
      }
      for (const v of Object.values(node as Record<string, unknown>)) walk(v);
    }
    walk(data);
    console.log(`\n### ${tag} (${q})`);
    for (const l of out) console.log(l);
    await new Promise((r) => setTimeout(r, 1200));
  } catch (e) {
    console.log(`\n### ${tag}: ERROR ${e}`);
  }
}

export {};
