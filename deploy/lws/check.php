<?php
/**
 * POST /api/check — GLOPROFAS Scam Checker (TS port of
 * src/lib/server/scam-checker.ts). Heuristic pattern analysis;
 * indicative assessment only; nothing is stored.
 */
require_once __DIR__ . '/_lib.php';

rate_limit('check', 15, 60);

$validSignIds = [
    'advance-payment', 'unexpected-prize', 'urgent-money', 'password-pin-request', 'otp-request',
    'unusual-payment', 'guaranteed-returns', 'threats', 'unverified-identity', 'short-links',
    'move-private', 'too-good',
];

/** Category → related GLOPROFAS article slugs (CATEGORY_ARTICLES port). */
$categoryArticles = [
    'urgency'        => ['how-to-recognise-and-avoid-online-scams', 'smishing-and-vishing-sms-telephone-scams'],
    'manipulation'   => ['romance-scams-recognising-emotional-manipulation', 'impersonation-scams-someone-you-trust'],
    'financial'      => ['fake-mobile-money-payment-notifications', 'mobile-money-scams-protect-mtn-momo-orange-money'],
    'advance-fee'    => ['how-to-recognise-and-avoid-online-scams', 'lottery-prize-and-giveaway-scams', 'fake-job-offers-and-employment-scams'],
    'impersonation'  => ['impersonation-scams-someone-you-trust', 'fake-customer-support-and-technical-support-scams'],
    'credentials'    => ['phishing-scams-recognise-fake-emails-messages', 'mobile-money-scams-protect-mtn-momo-orange-money'],
    'payment'        => ['investment-scams-and-ponzi-schemes', 'mobile-money-scams-protect-mtn-momo-orange-money'],
    'promises'       => ['investment-scams-and-ponzi-schemes', 'lottery-prize-and-giveaway-scams'],
    'confidential'   => ['identity-theft-and-personal-data-exploitation', 'phishing-scams-recognise-fake-emails-messages'],
    'urls'           => ['how-to-identify-fake-websites-and-online-stores', 'phishing-scams-recognise-fake-emails-messages'],
    'attachments'    => ['phishing-scams-recognise-fake-emails-messages'],
    'unusual'        => ['how-to-recognise-and-avoid-online-scams', 'whatsapp-scams-common-tricks'],
];

$body = json_body() ?? [];
$locale = (($body['locale'] ?? '') === 'fr') ? 'fr' : 'en';
$text = clean_text($body['text'] ?? null, 3000);
$rawSigns = isset($body['signs']) && is_array($body['signs']) ? $body['signs'] : [];
$signIds = [];
foreach ($rawSigns as $s) {
    if (is_string($s) && in_array($s, $validSignIds, true) && !in_array($s, $signIds, true) && count($signIds) < 12) {
        $signIds[] = $s;
    }
}

if (trim($text) === '' && count($signIds) === 0) {
    json_out(['error' => 'validation'], 400);
}

$bundle = load_bundle();
$indicators = $bundle['checker']['indicators'] ?? [];
$warningSigns = $bundle['checker']['warningSigns'] ?? [];
$disclaimer = $bundle['checker']['disclaimer'] ?? ['en' => '', 'fr' => ''];
$alerts = $bundle['checker']['alerts'] ?? [];
$articles = $bundle['checker']['articles'] ?? [];

/* ---------------- engine ---------------- */

$hasText = mb_len(trim($text)) >= 3;
$hasSigns = count($signIds) > 0;
$mode = ($hasText && $hasSigns) ? 'combined' : ($hasText ? 'text' : 'signs');

$detected = [];

/** URL inspection (inspectUrls port). */
function inspect_urls(string $text, array &$out): void {
    if (!preg_match_all('~https?://[^\s<>"\')]+|www\.[^\s<>"\')]+~i', $text, $m)) return;
    $n = 0;
    foreach ($m[0] as $raw) {
        if ($n >= 3) break;
        $lower = lower($raw);
        $reason = '';
        if (preg_match('~^https?://\d+\.\d+\.\d+\.\d+~', $lower)) $reason = 'IP';
        else {
            $stripped = preg_replace('~^https?://~', '', $lower) ?? $lower;
            if (preg_match('~[a-z0-9]-?(secure|verify|login|support|promo|app)[.-]~', $stripped)) $reason = 'keyword';
            elseif (preg_match('~\.(xyz|top|click|buzz|live|shop|online|info)\b~', $lower)) $reason = 'exotic TLD';
        }
        if ($reason === '') continue;
        $short = mb_len($raw) > 60 ? mb_substr($raw, 0, 60) : $raw;
        $out[] = [
            'id' => 'url-inspection',
            'category' => 'urls',
            'weight' => 1,
            'label' => ['en' => "Suspicious link: {$short}", 'fr' => "Lien suspect : {$short}"],
            'explanation' => [
                'en' => "This address shows structural warning signs (embedded keywords, unusual extension or raw IP). Compare it character by character with the organisation's real address, and never enter codes or payment details on it.",
                'fr' => "Cette adresse présente des signes structurels (mots-clés intégrés, extension inhabituelle ou IP nue). Comparez-la caractère par caractère avec la vraie adresse de l’organisation, et n’y saisissez ni codes ni paiements.",
            ],
            'matchedPattern' => $reason,
        ];
        $n++;
    }
}

if ($hasText) {
    $norm = normalise($text);
    foreach ($indicators as $ind) {
        $patterns = $ind['patterns'] ?? [];
        if (!is_array($patterns)) continue;
        foreach ($patterns as $p) {
            if (!is_string($p) || $p === '') continue;
            $regex = '~' . str_replace('~', '\~', $p) . '~i';
            $m = null;
            if (@preg_match($regex, $norm, $m) === 1) {
                $matched = $m[0] ?? '';
                $detected[] = [
                    'id' => (string) $ind['id'],
                    'category' => (string) $ind['category'],
                    'weight' => (int) $ind['weight'],
                    'label' => $ind['label'],
                    'explanation' => $ind['explanation'],
                    'matchedPattern' => mb_len($matched) > 40 ? mb_substr($matched, 0, 40) : $matched,
                ];
                break;
            }
        }
    }
    inspect_urls($text, $detected);
}

/* Warning signs selected by the user. */
$signResults = [];
$signWeight = 0;
$signWeight3 = 0;
foreach ($warningSigns as $o) {
    if (!in_array($o['id'] ?? '', $signIds, true)) continue;
    $signResults[] = ['id' => $o['id'], 'label' => $o['label'], 'explanation' => $o['explanation']];
    $signWeight += (int) $o['weight'];
    if ((int) $o['weight'] === 3) $signWeight3++;
}

/* Aggregate: unique categories with max weight per category. */
$byCategory = [];
foreach ($detected as $d) {
    $c = $d['category'];
    $byCategory[$c] = max($byCategory[$c] ?? 0, $d['weight']);
}
$textScore = array_sum($byCategory);
$score = $textScore + $signWeight;
$strongHits = count(array_filter($byCategory, fn ($w) => $w >= 3)) + $signWeight3;

if (!$hasText && !$hasSigns) $band = 'insufficient';
elseif ($strongHits >= 1 || $score >= 7) $band = 'strong';
elseif ($score >= 3) $band = 'several';
elseif ($score > 0) $band = 'several';
else $band = ($hasText || $hasSigns) ? 'none' : 'insufficient';

/* Alert overlap matching. */
$matchedAlerts = [];
if ($hasText) {
    $norm = normalise($text);
    $tokens = [];
    foreach (preg_split('/[^a-z0-9]+/', $norm) ?: [] as $t) {
        if (strlen($t) > 3) $tokens[] = $t;
    }
    foreach ($alerts as $a) {
        $hay = normalise(pick($a['title'], 'en') . ' ' . pick($a['title'], 'fr') . ' ' . pick($a['summary'], 'en') . ' ' . pick($a['summary'], 'fr'));
        foreach ($tokens as $t) {
            if ($t !== '' && strpos($hay, $t) !== false) {
                $matchedAlerts[] = ['id' => $a['id'], 'title' => pick($a['title'], 'en'), 'risk' => (string) $a['risk']];
                break;
            }
        }
    }
    $matchedAlerts = array_slice($matchedAlerts, 0, 3);
}

$relatedCategories = array_values(array_unique(array_column($detected, 'category')));

/* Secrets warning (checker-local containsSecrets port). */
$secretsWarning = false;
if ($hasText) {
    $kw = '/\b(pin|otp|one[-\s]?time|cvv|cvc|password|passcode|mot\s+de\s+passe|code\s+secret|code\s+pin|secret\s+code|seed\s+phrase|recovery\s+phrase|private\s+key)\b/iu';
    $digits = preg_replace('/[\s-]/u', '', $text) ?? '';
    $cardLike = (bool) preg_match('/\d{13,19}/', $digits);
    $secretsWarning = (bool) preg_match($kw, $text)
        && (bool) preg_match('/\d{3,}/', $text)
        && ($cardLike || (bool) preg_match('/code|pin|otp/i', $text));
}

/* ---------------- recommended actions (bilingual port) ---------------- */

$cats = $relatedCategories;
$actions = [];
if ($locale === 'fr') {
    $actions[] = "Ne cliquez pas sur les liens et ne répondez pas ; ouvrez plutôt l’application ou le site officiel en le saisissant vous-même.";
} else {
    $actions[] = "Do not click links or reply; open the official app or type the official address yourself.";
}
$hasCat = fn (string ...$need): bool => count(array_intersect($need, $cats)) > 0;
$hasSignId = fn (string ...$ids): bool => count(array_intersect($ids, array_column($signResults, 'id'))) > 0;

if ($hasCat('credentials', 'confidential')) {
    $actions[] = $locale === 'fr'
        ? "Ne partagez jamais votre code PIN, mot de passe ou code à usage unique — mettez immédiatement vos comptes en sécurité et changez les mots de passe exposés."
        : "Never share your PIN, password or one-time code — secure your accounts immediately and change any exposed passwords.";
}
if ($hasCat('payment', 'advance-fee', 'promises')) {
    $actions[] = $locale === 'fr'
        ? "N’envoyez aucun paiement, aucune « fee » et aucun dépôt avant une vérification indépendante par un canal officiel."
        : "Do not send any payment, “fee” or deposit before independent verification through an official channel.";
}
if ($hasCat('impersonation')) {
    $actions[] = $locale === 'fr'
        ? "Rappelez la personne ou l’organisation concernée via un numéro que vous connaissez déjà — jamais celui du message."
        : "Call the person or organisation back on a number you already know — never the one in the message.";
}
if ($hasCat('urls')) {
    $actions[] = $locale === 'fr'
        ? "Comparez l’adresse caractère par caractère avec le site officiel, et vérifiez le cadenas et l’orthographe exacte du domaine."
        : "Compare the address character by character with the official site, and check the padlock and exact domain spelling.";
}
if ($hasSignId('otp-request', 'password-pin-request')) {
    $actions[] = $locale === 'fr'
        ? "Si vous avez déjà partagé un code, contactez immédiatement votre banque ou opérateur via son numéro officiel pour verrouiller le compte."
        : "If you already shared a code, contact your bank or operator immediately on its official number to lock the account.";
}
$actions[] = $locale === 'fr'
    ? "Conservez les captures d’écran et signalez l’incident via le formulaire GLOPROFAS et auprès des autorités compétentes."
    : "Keep screenshots and report the incident through the GLOPROFAS form and to the competent authorities.";
$actions = array_slice($actions, 0, 6);

/* ---------------- suggested articles ---------------- */

$slugSet = [];
foreach ($relatedCategories as $cat) {
    foreach ($categoryArticles[$cat] ?? [] as $s) $slugSet[$s] = true;
}
if (!$slugSet) {
    foreach ($categoryArticles['urgency'] ?? [] as $s) $slugSet[$s] = true;
}
$suggested = array_slice(array_keys($slugSet), 0, 3);

$relatedArticles = [];
foreach ($articles as $a) {
    if (in_array($a['slug'], $suggested, true)) {
        $relatedArticles[] = [
            'slug' => $a['slug'],
            'title' => pick($a['title'], $locale),
            'summary' => pick($a['summary'], $locale),
        ];
    }
    if (count($relatedArticles) >= 3) break;
}

/* ---------------- response ---------------- */

$outIndicators = [];
foreach ($detected as $d) {
    $outIndicators[] = [
        'id' => $d['id'],
        'category' => $d['category'],
        'label' => pick($d['label'], $locale),
        'explanation' => pick($d['explanation'], $locale),
        'matchedPattern' => $d['matchedPattern'] ?? '',
    ];
}
$outSignResults = [];
foreach ($signResults as $s) {
    $outSignResults[] = [
        'id' => $s['id'],
        'label' => pick($s['label'], $locale),
        'explanation' => pick($s['explanation'], $locale),
    ];
}

json_out([
    'band' => $band,
    'score' => $score,
    'mode' => $mode,
    'indicators' => $outIndicators,
    'signResults' => $outSignResults,
    'secretsWarning' => $secretsWarning,
    'matchedAlerts' => $matchedAlerts,
    'relatedArticles' => $relatedArticles,
    'actions' => $actions,
    'disclaimer' => pick($disclaimer, $locale),
]);
