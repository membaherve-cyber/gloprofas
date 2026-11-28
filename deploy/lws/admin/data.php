<?php
/**
 * Admin API stub (shared-hosting deployment).
 *
 * The full admin panel runs against the Next.js backend on the
 * development/Vercel deployment. On LWS shared hosting there is no
 * Node.js runtime or admin database, so this endpoint responds like
 * an invalid login attempt — the admin UI shows its authentication
 * error instead of breaking.
 */
require_once dirname(__DIR__) . '/_lib.php';

http_response_code(401);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['error' => 'unauthorized']);