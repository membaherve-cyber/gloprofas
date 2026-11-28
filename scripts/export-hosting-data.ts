/**
 * Export runtime data for the LWS PHP hosting deployment.
 *
 * Produces two JSON files consumed by the PHP endpoints:
 *
 *  1. api-data.json (checker + assistant layer)
 *     · checker indicators (patterns + labels)         → api/check.php
 *     · warning-sign options + disclaimer              → api/check.php
 *     · alerts index (id/title/summary/risk)           → api/check.php
 *     · published article summaries                    → api/check.php, api/assistant.php
 *     · assistant grounding corpus                     → api/assistant.php
 *
 *  2. resources-data.json (Resource Centre read model)
 *     · full articles (+ published flags)              → api/resources/articles*.php
 *     · full checklists (+ downloadCount)              → api/resources/checklists.php
 *     · full videos (+ published flags)                → api/resources/videos.php
 *     · full reporting directory (+ status/verified)   → api/resources/directory*.php
 *     Sourced from getResourceStore() — identical to what the Next.js
 *     /api/resources/* routes serve (DB-backed, static fallback).
 *
 * Run: bun scripts/export-hosting-data.ts <api-data.json> [resources-data.json]
 */
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { CHECKER_DISCLAIMER, WARNING_SIGN_OPTIONS } from "@/lib/content/checker-data";
import { ARTICLES } from "@/lib/content/resource-centre";
import { ZITE_CONTENT } from "@/lib/content/zite-data";
import { getResourceStore } from "@/lib/server/resource-store";

async function main() {
  const apiPath = process.argv[2] ?? "/tmp/gloprofas-hosting/api-data.json";
  const resourcesPath =
    process.argv[3] ?? apiPath.slice(0, apiPath.lastIndexOf("/")) + "/resources-data.json";
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

  fs.mkdirSync(apiPath.slice(0, apiPath.lastIndexOf("/")), { recursive: true });
  fs.writeFileSync(apiPath, JSON.stringify(payload));

  /* Resource Centre read model — exactly what getResourceStore() serves to
     the Next.js /api/resources/* routes. The PHP ports consume this file. */
  const store = await getResourceStore();
  const resourcesPayload = {
    generatedAt: new Date().toISOString(),
    articles: store.articles,
    checklists: store.checklists,
    videos: store.videos,
    directory: store.directory,
  };
  fs.mkdirSync(resourcesPath.slice(0, resourcesPath.lastIndexOf("/")), { recursive: true });
  fs.writeFileSync(resourcesPath, JSON.stringify(resourcesPayload));

  console.log(
    `exported ${indicators.length} indicators, ${articles.length} article summaries, ` +
      `${corpus.categories.length} categories, ${corpus.alerts.length} alerts → ${apiPath}`
  );
  console.log(
    `exported resources read model: ${store.articles.length} articles, ` +
      `${store.checklists.length} checklists, ${store.videos.length} videos, ` +
      `${store.directory.length} countries → ${resourcesPath}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
