<?php
/** POST /api/reports — confidential scam report (TS port). */
require_once __DIR__ . '/_lib.php';

rate_limit('reports', 5, 3600);

$channels = ['sms', 'phone', 'whatsapp', 'social', 'email', 'web', 'inperson', 'other'];

/** Magic-byte sniff, mirroring the TS sniffType(). */
function sniff_type(string $bytes): ?string {
    if (strlen($bytes) < 4) return null;
    if (ord($bytes[0]) === 0xFF && ord($bytes[1]) === 0xD8 && ord($bytes[2]) === 0xFF) return 'jpg';
    if (ord($bytes[0]) === 0x89 && ord($bytes[1]) === 0x50 && ord($bytes[2]) === 0x4E && ord($bytes[3]) === 0x47) return 'png';
    if (ord($bytes[0]) === 0x52 && ord($bytes[1]) === 0x49 && ord($bytes[2]) === 0x46 && ord($bytes[3]) === 0x46) return 'webp';
    if (ord($bytes[0]) === 0x25 && ord($bytes[1]) === 0x50 && ord($bytes[2]) === 0x44 && ord($bytes[3]) === 0x2D) return 'pdf';
    return null;
}

$body = json_body();
if ($body === null) bad_request(['description' => 'invalid']);

$description   = clean_text($body['description'] ?? null, 4000);
$incidentDate  = clean_text($body['incidentDate'] ?? null, 20);
$reporterEmail = lower(clean_text($body['reporterEmail'] ?? null, 254));
$language      = (($body['language'] ?? '') === 'fr') ? 'fr' : 'en';
$consent       = ($body['consent'] ?? null) === true;

$fields = [];
if (mb_len($description) < 20) $fields['description'] = 'too_short';
if (contains_secrets($description)) $fields['description'] = 'secrets';
if (!is_email($reporterEmail)) $fields['reporterEmail'] = 'invalid';
if (!$consent) $fields['consent'] = 'required';
if ($incidentDate !== '') {
    $ts = strtotime($incidentDate);
    if ($ts === false || $ts > time() + 86400) $fields['incidentDate'] = 'invalid';
}
if ($fields !== []) bad_request($fields);

/* Evidence: base64 payloads, magic-byte sniff, size caps (max 5, ~2MB). */
$rawEvidence = isset($body['evidence']) && is_array($body['evidence']) ? array_slice($body['evidence'], 0, 5) : [];
$evidenceCount = 0;
$evidenceMeta = [];
foreach ($rawEvidence as $f) {
    if (!is_array($f)) continue;
    $b64 = $f['dataBase64'] ?? null;
    if (!is_string($b64) || $b64 === '') continue;
    if (strlen($b64) > 2800000) continue;
    $comma = strrpos($b64, ',');
    $pure = $comma === false ? $b64 : substr($b64, $comma + 1);
    $bytes = base64_decode($pure, true);
    if ($bytes === false || strlen($bytes) > 2200000) continue;
    $type = sniff_type($bytes);
    if ($type !== null) {
        $evidenceCount++;
        $evidenceMeta[] = ['name' => clean_text($f['name'] ?? '', 160), 'type' => $type, 'bytes' => strlen($bytes)];
    }
}

$reference = generate_reference();

store_submission('reports', [
    'reference'      => $reference,
    'categorySlug'   => clean_text($body['categorySlug'] ?? null, 64) ?: null,
    'description'    => $description,
    'incidentDate'   => $incidentDate !== '' ? $incidentDate : null,
    'channel'        => in_array($body['channel'] ?? '', $channels, true) ? $body['channel'] : null,
    'country'        => clean_text($body['country'] ?? null, 80) ?: null,
    'city'           => clean_text($body['city'] ?? null, 80) ?: null,
    'suspiciousUrl'  => clean_text($body['suspiciousUrl'] ?? null, 300) ?: null,
    'phoneInvolved'  => clean_text($body['phoneInvolved'] ?? null, 60) ?: null,
    'emailInvolved'  => lower(clean_text($body['emailInvolved'] ?? null, 254)) ?: null,
    'moneyLost'      => ($body['moneyLost'] ?? null) === true,
    'amount'         => clean_text($body['amount'] ?? null, 40) ?: null,
    'ongoing'        => ($body['ongoing'] ?? null) === true,
    'reporterName'   => clean_text($body['reporterName'] ?? null, 80) ?: null,
    'reporterEmail'  => $reporterEmail,
    'evidenceCount'  => $evidenceCount,
    'evidenceMeta'   => $evidenceMeta,
    'language'       => $language,
    'status'         => 'new',
    'note'           => 'Report received' . ($evidenceCount > 0 ? " with {$evidenceCount} attachment(s)" : '') . '.',
    'at'             => gmdate('c'),
    'ip'             => client_ip(),
]);

json_out(['ok' => true, 'reference' => $reference, 'status' => 'received'], 201);
