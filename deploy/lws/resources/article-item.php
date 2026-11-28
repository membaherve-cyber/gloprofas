<?php
/**
 * GET /api/resources/articles/{slug} — full article by slug + related.
 * Port of src/app/api/resources/articles/[slug]/route.ts (the related
 * logic ports getRelatedArticles() from src/lib/content/resource-centre.ts).
 * Sits behind: RewriteRule ^api/resources/articles/([^/]+)/?$
 */
require_once dirname(__DIR__) . '/_resources.php';

require_get();
rate_limit('article-detail', 180, 60);

$slug = res_path_param('#^/api/resources/articles/([^/]+)$#');
if ($slug === null) {
    json_out(['error' => 'not_found'], 404);
}

$articles = res_articles();

$article = null;
foreach ($articles as $a) {
    if (($a['slug'] ?? '') === $slug && !empty($a['published'])) {
        $article = $a;
        break;
    }
}
if ($article === null) {
    json_out(['error' => 'not_found'], 404);
}

/* getRelatedArticles(): relatedSlugs first, then same-category padding. */
$candidates = [];
$candidateSlugs = [];
foreach (($article['relatedSlugs'] ?? []) as $s) {
    $match = res_find_article($articles, (string) $s);
    if ($match !== null) {
        $candidates[] = $match;
        $candidateSlugs[(string) $s] = true;
    }
}
if (count($candidates) < 3) {
    foreach ($articles as $a) {
        if (count($candidates) >= 3) break;
        $sl = (string) ($a['slug'] ?? '');
        if (
            ($a['categorySlug'] ?? '') === ($article['categorySlug'] ?? '')
            && $sl !== ($article['slug'] ?? '')
            && !isset($candidateSlugs[$sl])
        ) {
            $candidates[] = $a;
            $candidateSlugs[$sl] = true;
        }
    }
}

/* Prefer the live published version of each related candidate. */
$related = [];
foreach (array_slice($candidates, 0, 3) as $r) {
    $live = null;
    foreach ($articles as $a) {
        if (($a['slug'] ?? '') === ($r['slug'] ?? '') && !empty($a['published'])) {
            $live = $a;
            break;
        }
    }
    $related[] = $live ?? $r;
}

json_cached(
    ['article' => $article, 'related' => $related],
    'public, max-age=120, stale-while-revalidate=600'
);
