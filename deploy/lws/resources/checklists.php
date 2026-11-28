<?php
/**
 * POST /api/resources/checklists — checklist download tracking.
 * The Next.js route increments a counter; on shared hosting we append
 * an anonymised event line (no personal data — the TS route stores none).
 */
require_once dirname(__DIR__) . '/_lib.php';

$body = json_body() ?? [];
$slug = clean_text($body['slug'] ?? null, 120);
$lang = in_array($body['lang'] ?? '', ['en', 'fr'], true) ? $body['lang'] : 'en';

if ($slug !== '') {
    store_submission('checklist-downloads', [
        'slug' => $slug,
        'lang' => $lang,
        'at' => gmdate('c'),
    ]);
}

json_out(['ok' => true]);
