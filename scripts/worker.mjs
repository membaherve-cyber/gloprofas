#!/usr/bin/env node
/**
 * GLOPROFAS job worker. Run with `node scripts/worker.mjs` (systemd service or
 * `npm run worker` once the script alias is added). It drains the `jobs` table
 * using an atomic UPDATE ... FOR UPDATE SKIP LOCKED claim, so several workers
 * can run safely. Emails are sent with Nodemailer when SMTP is configured;
 * otherwise jobs are completed as no-ops and remain inspectable in the table.
 */
import { spawn } from "node:child_process";

const interval = Number(process.env.WORKER_INTERVAL_MS ?? 15000);
const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3000";

async function tick() {
  try {
    const response = await fetch(`${base}/api/jobs/run`, {
      method: "POST",
      headers: process.env.WORKER_TOKEN ? { Authorization: `Bearer ${process.env.WORKER_TOKEN}` } : {},
    });
    if (!response.ok) {
      console.error(`[worker] HTTP ${response.status}`);
      return;
    }
    const result = await response.json();
    if (result.processed > 0 || result.failed > 0) {
      console.log(`[worker] processed=${result.processed} failed=${result.failed}`);
    }
  } catch (error) {
    console.error("[worker] request failed", error instanceof Error ? error.message : error);
  }
}

console.log(`[worker] GLOPROFAS worker started (interval ${interval}ms, target ${base})`);
void tick();
setInterval(tick, interval);

process.on("SIGTERM", () => {
  console.log("[worker] stopping");
  process.exit(0);
});
void spawn;
