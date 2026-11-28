/**
 * Export runtime data for the LWS PHP hosting deployment.
 *
 * Produces a single JSON file consumed by the PHP endpoints:
 *   · checker indicators (patterns + labels)         → api/check.php
 *   · warning-sign options + disclaimer              → api/check.php
 *   · alerts index (id/title/summary/risk)           → api/check.php
 *   · published article summaries                    → api/check.php, api/assistant.php
 *   · assistant grounding corpus (categories/alerts/
 *     resources/articles searchable fields)          → api/assistant.php
 *
 * Run: bun scripts/export-hosting-data.ts /path/to/out.json
 */
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { CHECKER_DISCLAIMER, WARNING_SIGN_OPTIONS } from "@/lib/content/checker-data";
import { ARTICLES } from "@/lib/content/resource-centre";
import { ZITE_CONTENT } from "@/lib/content/zite-data";

async function main() {
  const outPath = process.argv[2] ?? "/tmp/gloprofas-hosting/api-data.json";
  const db = new PrismaClient();

  /* Checker indicator patterns live in the DB (seeded from checker-data). */
  const patterns = await db.checkerPattern.findMany({ orderBy: { indicatorId: "asc" } });
  const indicators = patterns
    .filter((p) => p.active)
    .map((p) => {
      const content = JSON.parse(p.content) as {
        label: { en: string; fr: string };
        explanation: { en: string; fr: string };
      };
      let regexes: string[] = [];
      try {
        regexes = JSON.parse(p.patterns) as string[];
      } catch {
        regexes = [];
      }
      return {
        id: p.indicatorId,
        category: p.category,
        weight: p.weight,
        label: content.label,
        explanation: content.explanation,
        patterns: regexes,
      };
    });

  /* Articles published in the resource centre (content JSON holds
     the bilingual title/summary — same shape toArticleSummary uses). */
  const articleRows = await db.article.findMany({ where: { published: true } });
  const articles = articleRows.map((a) => {
    const c = JSON.parse(a.content) as { title: { en: string; fr: string }; summary: { en: string; fr: string } };
    return { slug: a.slug, title: c.title, summary: c.summary };
  });

  await db.$disconnect();

  /* Assistant grounding corpus. */
  const corpus = {
    categories: ZITE_CONTENT.categories.map((c) => ({
      title: c.title,
      summary: c.summary,
      definition: {
        en: c.parsedContent.en.definition ?? "",
        fr: c.parsedContent.fr.definition ?? "",
      },
      slug: c.slug,
    })),
    alerts: ZITE_CONTENT.alerts.map((a) => ({
      id: a.id,
      title: a.title,
      summary: a.summary,
      actions: a.actions,
      country: a.country,
      risk: a.risk as string,
    })),
    resources: ZITE_CONTENT.resources.map((r) => ({
      title: r.title,
      description: r.description,
    })),
    articles: ARTICLES.map((a) => ({
      slug: a.slug,
      title: a.title,
      summary: a.summary,
      what: a.what,
    })),
  };

  const payload = {
    generatedAt: new Date().toISOString(),
    checker: {
      indicators,
      warningSigns: WARNING_SIGN_OPTIONS,
      disclaimer: CHECKER_DISCLAIMER,
      alerts: ZITE_CONTENT.alerts.map((a) => ({
        id: a.id,
        title: a.title,
        summary: a.summary,
        risk: a.risk as string,
      })),
      articles,
    },
    assistant: corpus,
  };

  fs.mkdirSync(outPath.slice(0, outPath.lastIndexOf("/")), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(payload));
  console.log(
    `exported ${indicators.length} indicators, ${articles.length} articles, ` +
      `${corpus.categories.length} categories, ${corpus.alerts.length} alerts → ${outPath}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
