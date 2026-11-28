<?php
/** POST /api/contact — contact form (TS port). */
require_once __DIR__ . '/_lib.php';

rate_limit('contact', 5, 3600);

$body = json_body();
if ($body === null) bad_request(['message' => 'invalid']);

$categories = ['general', 'partnership', 'volunteer', 'media', 'services'];

$name     = clean_text($body['name'] ?? null, 80);
$email    = lower(clean_text($body['email'] ?? null, 254));
$subject  = clean_text($body['subject'] ?? null, 160);
$category = in_array($body['category'] ?? '', $categories, true) ? $body['category'] : 'general';
$message  = clean_text($body['message'] ?? null, 4000);
$language = (($body['language'] ?? '') === 'fr') ? 'fr' : 'en';

$fields = [];
if ($name === '') $fields['name'] = 'required';
if (!is_email($email)) $fields['email'] = 'invalid';
if (mb_len($message) < 10) $fields['message'] = 'too_short';
if ($fields !== []) bad_request($fields);

store_submission('contact', [
    'name'     => $name,
    'email'    => $email,
    'subject'  => $subject !== '' ? $subject : null,
    'category' => $category,
    'message'  => $message,
    'language' => $language,
    'at'       => gmdate('c'),
    'ip'       => client_ip(),
]);

json_out(['ok' => true], 201);
