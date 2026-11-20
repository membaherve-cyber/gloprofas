// YouTube search scraper — extracts video results (id, title, channel, duration, views).
// Usage: bun scripts/yt-search.ts "query" [limit]
const query = process.argv[2] ?? "how to avoid scams";
const limit = Number(process.argv[3] ?? 12);

const url =
  "https://www.youtube.com/results?search_query=" +
  encodeURIComponent(query) +
  "&sp=EgIQAQ%253D%253D"; // video type only

const res = await fetch(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
  },
});
const html = await res.text();

// extract ytInitialData JSON
const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
if (!m) {
  console.error("NO ytInitialData");
  process.exit(1);
}
const data = JSON.parse(m[1]);

interface Video {
  videoId: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  published: string;
}

const out: Video[] = [];
function walk(node: unknown) {
  if (!node || typeof node !== "object") return;
  const vr = (node as Record<string, unknown>).videoRenderer as Record<string, any> | undefined;
  if (vr && vr.videoId) {
    const title = vr.title?.runs?.map((r: any) => r.text).join("") ?? "";
    const channel = vr.ownerText?.runs?.[0]?.text ?? vr.longBylineText?.runs?.[0]?.text ?? "";
    const duration = vr.lengthText?.simpleText ?? "";
    const views = vr.shortViewCountText?.simpleText ?? "";
    const published = vr.publishedTimeText?.simpleText ?? "";
    out.push({ videoId: vr.videoId, title, channel, duration, views, published });
  }
  for (const v of Object.values(node as Record<string, unknown>)) walk(v);
}
walk(data);

console.log(`QUERY: ${query}`);
for (const v of out.slice(0, limit)) {
  console.log(`${v.videoId} | ${v.duration} | ${v.channel} | ${v.title} | ${v.views} | ${v.published}`);
}

export {};
