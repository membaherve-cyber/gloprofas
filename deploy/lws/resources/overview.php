<?php
/**
 * GET /api/resources/overview — Resource Centre landing aggregates.
 * Port of src/app/api/resources/overview/route.ts.
 */
require_once dirname(__DIR__) . '/_resources.php';

require_get();
rate_limit('overview', 90, 60);

$articles = res_articles();
$checklists = res_checklists();
$videos = res_videos();
$directory = res_directory();

$published = [];
foreach ($articles as $a) {
    if (!empty($a['published'])) $published[] = $a;
}

/* Category counts — insertion order matches the TS Map iteration order. */
$byCategory = [];
foreach ($published as $a) {
    $k = (string) ($a['categorySlug'] ?? '');
    $byCategory[$k] = ($byCategory[$k] ?? 0) + 1;
}

/* latest: publishedAt descending, stable (PHP >= 8 sorts are stable). */
$latest = $published;
usort($latest, function ($a, $b) {
    $x = (string) ($a['publishedAt'] ?? '');
    $y = (string) ($b['publishedAt'] ?? '');
    if ($x === $y) return 0;
    return $x < $y ? 1 : -1;
});
$latest = array_slice($latest, 0, 6);

$featured = [];
$popular = [];
foreach ($published as $a) {
    if (!empty($a['featured']) && count($featured) < 4) $featured[] = $a;
    if (!empty($a['popular']) && count($popular) < 6) $popular[] = $a;
}

$publishedChecklists = [];
foreach ($checklists as $c) {
    if (!empty($c['published'])) $publishedChecklists[] = $c;
}
$featuredChecklists = [];
foreach ($publishedChecklists as $c) {
    if (!empty($c['featured']) && count($featuredChecklists) < 3) $featuredChecklists[] = $c;
}
$latestChecklists = array_slice($publishedChecklists, 0, 6);

$publishedVideoCount = 0;
$publishedVideos = [];
foreach ($videos as $v) {
    if (!empty($v['published'])) {
        $publishedVideoCount++;
        if (count($publishedVideos) < 4) $publishedVideos[] = $v;
    }
}

$countries = array_map('country_summary', $directory);

json_cached(
    [
        'counts' => [
            'articles' => count($published),
            'checklists' => count($publishedChecklists),
            'videos' => $publishedVideoCount,
            'countries' => count($directory),
            'articleCategories' => $byCategory,
        ],
        'featuredArticles' => array_map('article_summary', $featured),
        'popularArticles' => array_map('article_summary', $popular),
        'latestArticles' => array_map('article_summary', $latest),
        'featuredChecklists' => $featuredChecklists,
        'latestChecklists' => $latestChecklists,
        'videos' => $publishedVideos,
        'countries' => $countries,
    ],
    'public, max-age=60, stale-while-revalidate=300'
);
