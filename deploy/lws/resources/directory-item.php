<?php
/**
 * GET /api/resources/directory/{code} — full reporting information for one
 * country (ISO 3166-1 alpha-2). Port of src/app/api/resources/directory/[code]/route.ts.
 * Sits behind: RewriteRule ^api/resources/directory/([^/]+)/?$
 */
require_once dirname(__DIR__) . '/_resources.php';

require_get();
rate_limit('directory-country', 180, 60);

$code = res_path_param('#^/api/resources/directory/([^/]+)$#');
$wanted = strtoupper((string) $code);
if ($wanted === '') {
    json_out(['error' => 'not_found'], 404);
}

$directory = res_directory();

$country = null;
foreach ($directory as $c) {
    if (($c['code'] ?? '') === $wanted) {
        $country = $c;
        break;
    }
}
if ($country === null) {
    json_out(['error' => 'not_found'], 404);
}

$neighbours = [];
foreach ($directory as $c) {
    if (count($neighbours) >= 8) break;
    if (($c['continent'] ?? '') === ($country['continent'] ?? '') && ($c['code'] ?? '') !== ($country['code'] ?? '')) {
        $neighbours[] = [
            'code' => (string) ($c['code'] ?? ''),
            'name' => (string) ($c['name'] ?? ''),
            'nameFr' => (string) ($c['nameFr'] ?? ''),
        ];
    }
}

json_cached(
    ['country' => $country, 'neighbours' => $neighbours],
    'public, max-age=300, stale-while-revalidate=600'
);
