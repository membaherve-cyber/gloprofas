<?php
/**
 * GET /api/resources/directory?continent=&handles=&q=&summary=1 — global
 * reporting directory. Port of src/app/api/resources/directory/route.ts.
 */
require_once dirname(__DIR__) . '/_resources.php';

require_get();
rate_limit('directory-get', 120, 60);

$CONTINENTS = [
    'africa', 'europe', 'north-america', 'south-america', 'asia', 'middle-east', 'oceania',
];
$FRAUD_TYPES = [
    'online-scams', 'financial-fraud', 'mobile-money', 'bank-transfer', 'identity-theft', 'phishing',
    'crypto', 'investment', 'romance', 'shopping', 'cybercrime', 'bec', 'impersonation', 'child-exploitation',
];

$continent = clean_text($_GET['continent'] ?? '', 40);
$handles = clean_text($_GET['handles'] ?? '', 40);
$q = lower(clean_text($_GET['q'] ?? '', 80));
$summary = ($_GET['summary'] ?? '') === '1';

$list = res_directory();

if ($continent !== '' && in_array($continent, $CONTINENTS, true)) {
    $filtered = [];
    foreach ($list as $c) {
        if (($c['continent'] ?? '') === $continent) $filtered[] = $c;
    }
    $list = $filtered;
}

if ($handles !== '' && in_array($handles, $FRAUD_TYPES, true)) {
    $filtered = [];
    foreach ($list as $c) {
        foreach (($c['agencies'] ?? []) as $agency) {
            if (in_array($handles, (array) ($agency['handles'] ?? []), true)) {
                $filtered[] = $c;
                break;
            }
        }
    }
    $list = $filtered;
}

if ($q !== '') {
    $filtered = [];
    foreach ($list as $c) {
        $names = [];
        foreach (($c['agencies'] ?? []) as $agency) {
            $names[] = (string) ($agency['name'] ?? '');
        }
        $hay = lower(implode(' ', [
            (string) ($c['code'] ?? ''),
            (string) ($c['name'] ?? ''),
            (string) ($c['nameFr'] ?? ''),
            implode(' ', $names),
        ]));
        if (strpos($hay, $q) !== false) $filtered[] = $c;
    }
    $list = $filtered;
}

if ($summary) {
    $countries = array_map('country_summary', $list);
} else {
    $countries = $list;
}

json_cached(
    ['count' => count($countries), 'countries' => $countries],
    'public, max-age=300, stale-while-revalidate=600'
);
