/**
 * One-off maintenance script — align the CMS database with the reduced
 * 30-article library:
 *   1. Delete the six removed article rows.
 *   2. Scrub references to removed slugs from every remaining article's
 *      relatedSlugs (both the content JSON and the checker mappings already
 *      updated in source).
 * Run once with: bun scripts/reduce-articles.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const REMOVED = [
  "how-to-identify-fake-social-media-accounts",
  "qr-code-scams-how-to-protect-yourself",
  "how-to-recognise-fake-bank-representatives",
  "atm-and-card-fraud-protection",
  "family-emergency-and-grandparent-scams",
  "scholarship-and-education-scams",
];

async function main() {
  let deleted = 0;
  for (const slug of REMOVED) {
    const res = await prisma.article.deleteMany({ where: { slug } });
    deleted += res.count;
  }
  console.log(`Deleted ${deleted} removed article rows.`);

  const rows = await prisma.article.findMany();
  const validSlugs = new Set(rows.map((r) => r.slug));
  let updated = 0;
  for (const row of rows) {
    try {
      const content = JSON.parse(row.content) as { relatedSlugs?: string[] };
      if (Array.isArray(content.relatedSlugs)) {
        const filtered = content.relatedSlugs.filter(
          (s) => validSlugs.has(s) && !REMOVED.includes(s)
        );
        if (filtered.length !== content.relatedSlugs.length) {
          content.relatedSlugs = filtered;
          await prisma.article.update({
            where: { id: row.id },
            data: { content: JSON.stringify(content) },
          });
          updated++;
        }
      }
    } catch {
      console.warn(`Could not parse content for ${row.slug}`);
    }
  }
  console.log(`Scrubbed relatedSlugs on ${updated} rows.`);
  console.log(`Articles remaining in DB: ${await prisma.article.count()}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
