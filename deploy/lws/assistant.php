<?php
/**
 * POST /api/assistant — Oskie assistant (deterministic port).
 *
 * The LLM (z-ai-web-dev-sdk) cannot run on shared PHP hosting, so this
 * endpoint serves the grounded deterministic fallback from the TS route:
 * content search over categories/alerts/resources/articles plus the
 * localAnswer() guidance, with sources. Same response contract:
 * { answer, grounded, sources: [{title, href}] }.
 */
require_once __DIR__ . '/_lib.php';

rate_limit('assistant', 30, 3600);

$body = json_body() ?? [];
$message = clean_text($body['message'] ?? null, 600);
$locale = (($body['locale'] ?? '') === 'fr') ? 'fr' : 'en';
if (mb_len($message) < 2) json_out(['error' => 'validation'], 400);

$bundle = load_bundle();
$c = $bundle['assistant'];

/** searchContent port: token overlap scoring across the corpus. */
$tokens = [];
foreach (preg_split('/\s+/u', normalise($message)) ?: [] as $t) {
    $t = preg_replace('/[^a-z0-9]/', '', $t) ?? '';
    if (strlen($t) > 3 && !in_array($t, $tokens, true) && count($tokens) < 8) $tokens[] = $t;
}

$hits = [];
$score = function (string $hay) use ($tokens): int {
    $s = 0;
    foreach ($tokens as $t) if ($t !== '' && strpos($hay, $t) !== false) $s++;
    return $s;
};

foreach (($c['categories'] ?? []) as $cat) {
    $hay = normalise(pick($cat['title'], 'en') . ' ' . pick($cat['title'], 'fr') . ' '
        . pick($cat['summary'], 'en') . ' ' . pick($cat['summary'], 'fr') . ' ' . pick($cat['definition'], 'en'));
    $s = $score($hay);
    if ($s > 0) {
        $hits[] = ['score' => $s, 'hit' => [
            'title' => pick($cat['title'], 'en'),
            'href' => '/scams/' . $cat['slug'],
            'text' => pick($cat['summary'], 'en') . ' ' . pick($cat['definition'], 'en'),
        ]];
    }
}
foreach (($c['alerts'] ?? []) as $a) {
    $hay = normalise(pick($a['title'], 'en') . ' ' . pick($a['title'], 'fr') . ' '
        . pick($a['summary'], 'en') . ' ' . pick($a['summary'], 'fr') . ' ' . (string) ($a['country'] ?? ''));
    $s = $score($hay);
    if ($s > 0) {
        $actionLines = array_slice(preg_split('/\r\n|\r|\n/', pick($a['actions'], 'en')) ?: [], 0, 2);
        $hits[] = ['score' => $s, 'hit' => [
            'title' => pick($a['title'], 'en'),
            'href' => '/alerts/' . $a['id'],
            'text' => pick($a['summary'], 'en') . ' Recommended: ' . implode(' ', $actionLines),
        ]];
    }
}
foreach (($c['resources'] ?? []) as $r) {
    $hay = normalise(pick($r['title'], 'en') . ' ' . pick($r['title'], 'fr') . ' '
        . pick($r['description'], 'en') . ' ' . pick($r['description'], 'fr'));
    $s = $score($hay);
    if ($s > 0) {
        $hits[] = ['score' => $s, 'hit' => [
            'title' => pick($r['title'], 'en'),
            'href' => '/resources',
            'text' => pick($r['description'], 'en'),
        ]];
    }
}
foreach (($c['articles'] ?? []) as $a) {
    $hay = normalise(pick($a['title'], 'en') . ' ' . pick($a['title'], 'fr') . ' '
        . pick($a['summary'], 'en') . ' ' . pick($a['summary'], 'fr') . ' '
        . pick($a['what'], 'en') . ' ' . pick($a['what'], 'fr'));
    $s = $score($hay);
    if ($s > 0) {
        $hits[] = ['score' => $s, 'hit' => [
            'title' => pick($a['title'], 'en'),
            'href' => '/resources/practical-tools/' . $a['slug'],
            'text' => pick($a['summary'], 'en') . ' ' . pick($a['what'], 'en'),
        ]];
    }
}

usort($hits, fn ($x, $y) => $y['score'] <=> $x['score']);
$top = array_slice(array_column($hits, 'hit'), 0, 4);

/** localAnswer port. */
$m = lower($message);
$money = (bool) preg_match('/(sent|send|paid|pay|transfer|virement|envoy|payé|argent|money|lost|perdu)/u', $m);
$best = $top[0] ?? null;

if ($locale === 'fr') {
    $parts = ["Voici ce que dit l’accompagnement GLOPROFAS :"];
    if ($best) {
        $text = mb_len($best['text']) > 260 ? mb_substr($best['text'], 0, 260) : $best['text'];
        $parts[] = "\n" . $best['title'] . " — " . $text;
    } else {
        $parts[] = "\nLa plupart des arnaques suivent le même schéma : un contact inattendu, une pression pour agir vite, une demande de paiement ou de code, puis le silence. Faites une pause et vérifiez par un canal officiel que vous connaissez déjà.";
    }
    if ($money) {
        $parts[] = "\nSi vous avez déjà envoyé de l’argent : contactez immédiatement votre banque ou votre opérateur de mobile money par son numéro officiel, changez les mots de passe partagés et conservez toutes les preuves (captures d’écran, numéros, reçus). Ne payez jamais de frais pour « récupérer » des fonds — c’est souvent une seconde arnaque.";
    }
    $parts[] = "\nVous pouvez signaler ce qui s’est passé de manière confidentielle sur la page Signaler une arnaque. Ceci est un accompagnement éducatif général, pas un conseil juridique ou financier.";
} else {
    $parts = ["Here is what GLOPROFAS guidance says:"];
    if ($best) {
        $text = mb_len($best['text']) > 260 ? mb_substr($best['text'], 0, 260) : $best['text'];
        $parts[] = "\n" . $best['title'] . " — " . $text;
    } else {
        $parts[] = "\nMost scams follow the same pattern: an unexpected contact, engineered pressure to act fast, a payment or code request, then silence. Pause before acting and verify through an official channel you already know.";
    }
    if ($money) {
        $parts[] = "\nIf you already sent money: contact your bank or mobile-money provider immediately through its official number, change any passwords you shared, and keep all evidence (screenshots, numbers, receipts). Never pay a fee to 'recover' funds — that is often a second scam.";
    }
    $parts[] = "\nYou can report what happened confidentially on the Report a Scam page. This is general educational guidance, not legal or financial advice.";
}
$answer = implode(' ', $parts);

$sources = [];
foreach (array_slice($top, 0, 3) as $h) {
    $sources[] = ['title' => $h['title'], 'href' => $h['href']];
}

json_out([
    'answer' => $answer,
    'grounded' => count($top) > 0,
    'sources' => $sources,
]);
