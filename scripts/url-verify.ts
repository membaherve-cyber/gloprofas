// Parallel URL verification with Bun — resumable, writes results incrementally.
import fs from "fs";

const OUT = "scripts/url-verification.txt";
const done = new Set<string>(
  fs.existsSync(OUT)
    ? fs
        .readFileSync(OUT, "utf8")
        .split("\n")
        .filter((l) => l.includes("http"))
        .map((l) => l.split(" ").slice(1).join(" ").trim())
    : []
);

const script = fs.readFileSync("scripts/url-verify.sh", "utf8");
const urls = [...script.matchAll(/"(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
const unique = [...new Set(urls)];
const todo = unique.filter((u) => !done.has(u));

console.log(`total ${unique.length}, done ${done.size}, todo ${todo.length}`);

const CONCURRENCY = 12;
const results: string[] = [];
let idx = 0;

async function worker() {
  while (idx < todo.length) {
    const my = idx++;
    const url = todo[my];
    if (!url) continue;
    let code = "000";
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 9000);
      const res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: ctl.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml",
        },
      });
      clearTimeout(t);
      code = String(res.status);
    } catch {
      code = "000";
    }
    const line = `${code} ${url}`;
    results.push(line);
    fs.appendFileSync(OUT, line + "\n");
    if (results.length % 25 === 0) console.log(`progress: ${results.length}/${todo.length}`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
console.log(`ALLDONE ${results.length} checked, ${todo.length} todo were pending`);

export {};
