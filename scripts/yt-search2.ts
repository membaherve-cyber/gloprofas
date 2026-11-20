// Final targeted searches for missing video topics.
const QUERIES: [string, string][] = [
  ["momo", "MTN MoMo fraud awareness video"],
  ["ghana-csa", "Ghana Cyber Security Authority scam awareness video"],
  ["scamwatch", "Scamwatch Australia how to spot a scam video"],
  ["takefive", "Take Five to Stop Fraud video"],
  ["ncsc", "NCSC Cyber Aware video phishing"],
  ["romance-ftc", "FTC romance scam video"],
  ["social-ftc", "FTC social media scams video"],
  ["after-ftc", "what to do if you were scammed FTC video"],
  ["spot-signs", "Spot the Signs of a scam official police video"],
  ["kells", "Kells Online Safety Spot the Scam WhatsApp"],
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
    await new Promise((r) => setTimeout(r, 1300));
  } catch (e) {
    console.log(`\n### ${tag}: ERROR ${e}`);
  }
}

export {};
