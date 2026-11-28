<?php
/**
 * GET /api/resources/videos — Video Learning Centre (published, ordered).
 * Port of src/app/api/resources/videos/route.ts.
 */
require_once dirname(__DIR__) . '/_resources.php';

require_get();
rate_limit('videos-get', 120, 60);

$list = [];
foreach (res_videos() as $v) {
    if (!empty($v['published'])) $list[] = $v;
}

usort($list, function ($a, $b) {
    return ((int) ($a['displayOrder'] ?? 0)) <=> ((int) ($b['displayOrder'] ?? 0));
});

$out = array_map('video_public', $list);

json_cached(
    ['count' => count($out), 'videos' => $out],
    'public, max-age=120, stale-while-revalidate=600'
);
