#!/usr/bin/env node
/**
 * Asset uniqueness guard.
 *
 * Fails when:
 *  - a photographic asset is referenced more than once anywhere in src/, or
 *  - a file in public/images is never referenced, or
 *  - a referenced file does not exist.
 *
 * Run with `node scripts/check-assets.mjs`.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const srcDir = join(root, "src");
const imagesDir = join(root, "public", "images");

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const files = walk(srcDir).filter((file) => /\.(ts|tsx)$/.test(file));
const references = new Map();

for (const file of files) {
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(/\/images\/[a-z0-9-]+\.(?:jpg|png|webp|svg)/g)) {
    const asset = match[0];
    const locations = references.get(asset) ?? [];
    locations.push(relative(root, file));
    references.set(asset, locations);
  }
}

const onDisk = readdirSync(imagesDir).map((file) => `/images/${file}`);
const errors = [];

for (const [asset, locations] of references) {
  if (locations.length > 1) {
    errors.push(`DUPLICATE  ${asset} referenced ${locations.length}× → ${locations.join(", ")}`);
  }
  if (!onDisk.includes(asset)) {
    errors.push(`MISSING    ${asset} referenced in ${locations.join(", ")} but not found in public/images`);
  }
}

for (const asset of onDisk) {
  if (!references.has(asset)) {
    errors.push(`UNUSED     ${asset} exists in public/images but is never referenced`);
  }
}

if (errors.length > 0) {
  console.error("Asset check failed:\n" + errors.map((line) => `  ${line}`).join("\n"));
  process.exit(1);
}

console.log(`Asset check passed: ${references.size} assets, each referenced exactly once.`);
