<?php
/** Local test router — mimics the production .htaccess for `php -S`. */
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$map = [
    '/api/newsletter' => '/api/newsletter.php',
    '/api/contact' => '/api/contact.php',
    '/api/reports' => '/api/reports.php',
    '/api/get-involved' => '/api/get-involved.php',
    '/api/service-enquiry' => '/api/service-enquiry.php',
    '/api/check' => '/api/check.php',
    '/api/assistant' => '/api/assistant.php',
    '/api/resources/checklists' => '/api/resources/checklists.php',
    '/api/admin/login' => '/api/admin/login.php',
    '/api/admin/logout' => '/api/admin/logout.php',
    '/api/admin/data' => '/api/admin/data.php',
];

if (isset($map[$uri])) {
    $_SERVER['PHP_SELF'] = $map[$uri];
    require __DIR__ . $map[$uri];
    return true;
}
if (preg_match('#^/api/admin/content/.+#', $uri)) {
    require __DIR__ . '/api/admin/content.php';
    return true;
}

$file = __DIR__ . $uri;
if ($uri !== '/' && file_exists($file) && !is_dir($file)) {
    return false; // serve static as-is
}
if (is_dir($file) && file_exists($file . '/index.html')) {
    $uri = '/index.html';
    $file = __DIR__ . $uri;
}
if (file_exists($file) && !is_dir($file)) {
    header('Content-Type: ' . mime_content_type($file) ?: 'application/octet-stream');
    readfile($file);
    return true;
}
// SPA fallback
require __DIR__ . '/index.html';
return true;
