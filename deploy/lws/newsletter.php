<?php
/** POST /api/newsletter — newsletter subscription (TS port). */
require_once __DIR__ . '/_lib.php';

rate_limit('newsletter', 6, 3600);

$body = json_body();
if ($body === null) bad_request(['email' => 'invalid']);

$name     = clean_text($body['name'] ?? null, 80);
$email    = lower(clean_text($body['email'] ?? null, 254));
$country  = clean_text($body['country'] ?? null, 80);
$language = (($body['language'] ?? '') === 'fr') ? 'fr' : 'en';

$fields = [];
if ($name === '') $fields['name'] = 'required';
if (!is_email($email)) $fields['email'] = 'invalid';
if ($fields !== []) bad_request($fields);

$existing = false;
foreach (read_submissions('newsletter') as $rec) {
    if (($rec['email'] ?? '') === $email) { $existing = true; break; }
}

store_submission('newsletter', [
    'kind'     => $existing ? 'update' : 'new',
    'name'     => $name,
    'email'    => $email,
    'country'  => $country,
    'language' => $language,
    'status'   => 'pending',
    'at'       => gmdate('c'),
    'ip'       => client_ip(),
]);

json_out(['ok' => true, 'status' => $existing ? 'updated' : 'created'], $existing ? 200 : 201);
