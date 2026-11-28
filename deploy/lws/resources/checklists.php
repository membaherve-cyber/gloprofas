<?php
/**
 * /api/resources/checklists — printable checklist library.
 *
 * GET  → published checklist library (port of the Next.js GET route,
 *        served from resources-data.json).
 * POST → checklist download beacon { slug, lang }: appends an anonymised
 *        event line and returns the file path. The Next.js route
 *        increments a DB counter; on shared hosting we log the event
 *        (no personal data — the TS route stores none).
 */
require_once dirname(__DIR__) . '/_resources.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    rate_limit('checklists-get', 120, 60);

    $list = [];
    foreach (res_checklists() as $c) {
        if (!empty($c['published'])) $list[] = $c;
    }
    $out = array_map('checklist_public', $list);

    json_cached(
        ['count' => count($out), 'checklists' => $out],
        'public, max-age=60, stale-while-revalidate=300'
    );
}

if ($method !== 'POST') {
    http_response_code(405);
    header('Allow: GET, POST');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'method_not_allowed']);
    exit;
}

rate_limit('checklists-track', 40, 60);

$body = json_body() ?? [];
$slug = preg_replace('/[^a-z0-9-]/i', '', (string) ($body['slug'] ?? ''));
$slug = $slug !== '' ? substr($slug, 0, 80) : '';
$lang = in_array($body['lang'] ?? '', ['en', 'fr'], true) ? $body['lang'] : 'en';

if ($slug === '') {
    json_out(['error' => 'validation'], 400);
}

$item = null;
foreach (res_checklists() as $c) {
    if (($c['slug'] ?? '') === $slug) {
        $item = $c;
        break;
    }
}
if ($item === null) {
    json_out(['error' => 'not_found'], 404);
}

store_submission('checklist-downloads', [
    'slug' => $slug,
    'lang' => $lang,
    'at' => gmdate('c'),
]);

$file = $lang === 'fr'
    ? (($item['pdfFr'] ?? '') !== '' ? $item['pdfFr'] : ($item['pdfEn'] ?? ''))
    : (($item['pdfEn'] ?? '') !== '' ? $item['pdfEn'] : ($item['pdfFr'] ?? ''));

json_out(['ok' => true, 'file' => $file]);
