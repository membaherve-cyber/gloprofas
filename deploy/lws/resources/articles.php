<?php
/**
 * GET /api/resources/articles?category=&q=&full=1 — searchable article library.
 * Port of src/app/api/resources/articles/route.ts.
 */
require_once dirname(__DIR__) . '/_resources.php';

require_get();
rate_limit('articles', 120, 60);

$CATEGORIES = [
    'online-digital',
    'money-banking',
    'social-engineering',
    'business-fraud',
    'emerging-specialised',
];

$category = clean_text($_GET['category'] ?? '', 60);
$q = lower(clean_text($_GET['q'] ?? '', 120));
$full = ($_GET['full'] ?? '') === '1';

$list = [];
foreach (res_articles() as $a) {
    if (!empty($a['published'])) $list[] = $a;
}

if ($category !== '' && in_array($category, $CATEGORIES, true)) {
    $filtered = [];
    foreach ($list as $a) {
        if (($a['categorySlug'] ?? '') === $category) $filtered[] = $a;
    }
    $list = $filtered;
}

if ($q !== '') {
    $terms = preg_split('/\s+/u', $q, -1, PREG_SPLIT_NO_EMPTY) ?: [];
    $scored = [];
    foreach ($list as $a) {
        $hayParts = [
            (string) ($a['slug'] ?? ''),
            (string) ($a['title']['en'] ?? ''), (string) ($a['title']['fr'] ?? ''),
            (string) ($a['summary']['en'] ?? ''), (string) ($a['summary']['fr'] ?? ''),
            (string) ($a['what']['en'] ?? ''), (string) ($a['what']['fr'] ?? ''),
        ];
        if ($full) {
            $hayParts[] = (string) ($a['how']['en'] ?? '');
            $hayParts[] = (string) ($a['how']['fr'] ?? '');
            foreach (($a['warningSigns'] ?? []) as $w) {
                $hayParts[] = ((string) ($w['en'] ?? '')) . ' ' . ((string) ($w['fr'] ?? ''));
            }
        }
        $hay = lower(implode(' ', $hayParts));
        $score = 0;
        foreach ($terms as $t) {
            if (strpos($hay, $t) !== false) $score++;
        }
        if ($score === count($terms)) $scored[] = ['a' => $a, 'score' => $score];
    }
    usort($scored, function ($x, $y) {
        return $y['score'] <=> $x['score'];
    });
    $list = array_map(function ($x) {
        return $x['a'];
    }, $scored);
}

$out = array_map(function ($a) use ($full) {
    return $full ? $a : article_summary($a);
}, $list);

json_cached(
    ['count' => count($out), 'articles' => $out],
    'public, max-age=60, stale-while-revalidate=300'
);
