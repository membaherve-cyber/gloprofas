<?php
/** POST /api/get-involved — volunteer & partnership applications (TS port). */
require_once __DIR__ . '/_lib.php';

rate_limit('getinvolved', 5, 3600);

$body = json_body();
if ($body === null) bad_request(['form' => 'invalid']);

$kind     = (($body['kind'] ?? '') === 'partner') ? 'partner' : 'volunteer';
$language = (($body['language'] ?? '') === 'fr') ? 'fr' : 'en';

if ($kind === 'volunteer') {
    $name        = clean_text($body['name'] ?? null, 80);
    $email       = lower(clean_text($body['email'] ?? null, 254));
    $fields = [];
    if ($name === '') $fields['name'] = 'required';
    if (!is_email($email)) $fields['email'] = 'invalid';
    if ($fields !== []) bad_request($fields);

    store_submission('get-involved', [
        'kind'        => 'volunteer',
        'name'        => $name,
        'email'       => $email,
        'background'  => clean_text($body['background'] ?? null, 500) ?: null,
        'skills'      => clean_text($body['skills'] ?? null, 500) ?: null,
        'languages'   => clean_text($body['languages'] ?? null, 200) ?: null,
        'interests'   => clean_text($body['interests'] ?? null, 300) ?: null,
        'motivation'  => clean_text($body['motivation'] ?? null, 2000) ?: null,
        'language'    => $language,
        'at'          => gmdate('c'),
        'ip'          => client_ip(),
    ]);
    json_out(['ok' => true, 'kind' => 'volunteer'], 201);
}

/* partnership */
$organisation     = clean_text($body['organisation'] ?? null, 160);
$organisationType = clean_text($body['organisationType'] ?? null, 80) ?: null;
$contactPerson    = clean_text($body['contactPerson'] ?? null, 80);
$email            = lower(clean_text($body['email'] ?? null, 254));
$phone            = clean_text($body['phone'] ?? null, 60) ?: null;
$country          = clean_text($body['country'] ?? null, 80) ?: null;
$proposal         = clean_text($body['proposal'] ?? null, 3000);

$fields = [];
if ($organisation === '') $fields['organisation'] = 'required';
if ($contactPerson === '') $fields['contactPerson'] = 'required';
if (!is_email($email)) $fields['email'] = 'invalid';
if (mb_len($proposal) < 20) $fields['proposal'] = 'too_short';
if ($fields !== []) bad_request($fields);

store_submission('get-involved', [
    'kind'            => 'partner',
    'organisation'    => $organisation,
    'organisationType'=> $organisationType,
    'contactPerson'   => $contactPerson,
    'email'           => $email,
    'phone'           => $phone,
    'country'         => $country,
    'proposal'        => $proposal,
    'language'        => $language,
    'at'              => gmdate('c'),
    'ip'              => client_ip(),
]);
json_out(['ok' => true, 'kind' => 'partner'], 201);
