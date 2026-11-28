<?php
/** POST /api/service-enquiry — professional service enquiries (TS port). */
require_once __DIR__ . '/_lib.php';

rate_limit('enquiry', 5, 3600);

$body = json_body();
if ($body === null) bad_request(['requirements' => 'invalid']);

$name          = clean_text($body['name'] ?? null, 80);
$organisation  = clean_text($body['organisation'] ?? null, 160) ?: null;
$email         = lower(clean_text($body['email'] ?? null, 254));
$phone         = clean_text($body['phone'] ?? null, 60) ?: null;
$country       = clean_text($body['country'] ?? null, 80) ?: null;
$serviceSlug   = clean_text($body['serviceSlug'] ?? null, 80) ?: 'general';
$requirements  = clean_text($body['requirements'] ?? null, 3000);
$contactMethod = in_array($body['contactMethod'] ?? '', ['email', 'phone'], true) ? $body['contactMethod'] : 'email';
$language      = (($body['language'] ?? '') === 'fr') ? 'fr' : 'en';

$fields = [];
if ($name === '') $fields['name'] = 'required';
if (!is_email($email)) $fields['email'] = 'invalid';
if (mb_len($requirements) < 20) $fields['requirements'] = 'too_short';
if ($fields !== []) bad_request($fields);

store_submission('service-enquiry', [
    'name'         => $name,
    'organisation' => $organisation,
    'email'        => $email,
    'phone'        => $phone,
    'country'      => $country,
    'serviceSlug'  => $serviceSlug,
    'requirements' => $requirements,
    'contactMethod'=> $contactMethod,
    'language'     => $language,
    'at'           => gmdate('c'),
    'ip'           => client_ip(),
]);

json_out(['ok' => true], 201);
