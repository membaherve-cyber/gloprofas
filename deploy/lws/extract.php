<?php
/**
 * One-time deployment extractor for gloprofas.org (LWS).
 * Uploads: htdocs/site.zip + this file. Calling it with the correct
 * key extracts the zip into htdocs/ and removes both itself and the zip.
 */
declare(strict_types=1);
$KEY = 'glp-deploy-7f3a9c1e';
if (($_GET['k'] ?? '') !== $KEY) { http_response_code(403); exit('forbidden'); }
$zipPath = __DIR__ . '/site.zip';
if (!is_file($zipPath)) { http_response_code(500); exit('zip missing'); }
if (!class_exists('ZipArchive')) { http_response_code(500); exit('no ZipArchive'); }
$z = new ZipArchive();
if ($z->open($zipPath) !== true) { http_response_code(500); exit('open failed'); }
if (!$z->extractTo(__DIR__)) { http_response_code(500); exit('extract failed'); }
$z->close();
@unlink($zipPath);
@unlink(__FILE__);
echo "extracted OK\n";
