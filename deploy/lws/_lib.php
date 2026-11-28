<?php
/**
 * GLOPROFAS shared PHP helpers for the LWS shared-hosting deployment.
 * Ports src/lib/server/api-helpers.ts (rate limiting, validation,
 * secret detection, report references) with file-based storage.
 */

declare(strict_types=1);

date_default_timezone_set('UTC');

/* ---------------- JSON responses ---------------- */

function json_out(array $payload, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function bad_request(array $fields): void {
    json_out(['error' => 'validation', 'fields' => $fields], 400);
}

function server_error(): void {
    json_out(['error' => 'server_error'], 500);
}

function limited_out(int $retryAfterSec): void {
    http_response_code(429);
    header('Content-Type: application/json; charset=utf-8');
    header('Retry-After: ' . (string) $retryAfterSec);
    echo json_encode(['error' => 'rate_limited', 'retryAfter' => $retryAfterSec]);
    exit;
}

function json_body(): ?array {
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') return null;
    $data = json_decode($raw, true);
    return is_array($data) ? $data : null;
}

/* ---------------- Data directory ---------------- */

/**
 * Durable private storage, kept OUTSIDE the web root when possible.
 * Order: ../gloprofas-private (sibling of htdocs, i.e. at the account
 * chroot root), then a deny-protected folder inside the web root.
 */
function data_dir(): string {
    static $dir = null;
    if ($dir !== null) return $dir;

    $here = dirname(__DIR__);                              // htdocs
    $candidates = [
        dirname($here) . '/gloprofas-private',             // outside web root (preferred)
        $here . '/gloprofas-private',                      // inside web root, protected
    ];

    foreach ($candidates as $c) {
        if (!is_dir($c)) {
            @mkdir($c, 0770, true);
            @file_put_contents($c . '/.htaccess', "Require all denied\nDeny from all\n");
        }
        if (is_dir($c) && is_writable($c)) {
            $sub = $c . '/submissions';
            if (!is_dir($sub)) @mkdir($sub, 0770, true);
            $dir = $c;
            return $dir;
        }
    }
    // Last resort: system temp (rate limits still work, submissions less durable).
    $tmp = sys_get_temp_dir() . '/gloprofas-private';
    if (!is_dir($tmp)) @mkdir($tmp, 0770, true);
    $sub = $tmp . '/submissions';
    if (!is_dir($sub)) @mkdir($sub, 0770, true);
    $dir = $tmp;
    return $dir;
}

/** Append one record to a JSONL file with an exclusive lock. */
function store_submission(string $name, array $record): void {
    $file = data_dir() . '/submissions/' . preg_replace('/[^a-z0-9_-]/', '', $name) . '.jsonl';
    $fp = fopen($file, 'a');
    if ($fp === false) return;
    flock($fp, LOCK_EX);
    fwrite($fp, json_encode($record, JSON_UNESCAPED_UNICODE) . "\n");
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
}

/** Read all records from a JSONL file (for dedupe checks). */
function read_submissions(string $name): array {
    $file = data_dir() . '/submissions/' . preg_replace('/[^a-z0-9_-]/', '', $name) . '.jsonl';
    if (!is_file($file)) return [];
    $out = [];
    foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
        $rec = json_decode($line, true);
        if (is_array($rec)) $out[] = $rec;
    }
    return $out;
}

/* ---------------- Rate limiting (file-based sliding window) ---------------- */

function client_ip(): string {
    foreach (['HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'] as $k) {
        if (!empty($_SERVER[$k])) {
            $ip = trim(explode(',', (string) $_SERVER[$k])[0]);
            if ($ip !== '') return $ip;
        }
    }
    return 'local';
}

function rate_limit(string $scope, int $limit, int $windowSec): void {
    $file = data_dir() . '/ratelimit.json';
    $key = $scope . ':' . client_ip();
    $now = (int) round(microtime(true) * 1000);
    $windowMs = $windowSec * 1000;

    $state = [];
    $fp = fopen($file, 'c+');
    if ($fp !== false) {
        flock($fp, LOCK_EX);
        $raw = stream_get_contents($fp);
        if (is_string($raw) && $raw !== '') {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) $state = $decoded;
        }
        foreach ($state as $k => $b) {
            if (!is_array($b) || (int) ($b['resetAt'] ?? 0) < $now) unset($state[$k]);
        }
        if (isset($state[$key]) && (int) $state[$key]['resetAt'] >= $now) {
            if ((int) $state[$key]['count'] >= $limit) {
                $retry = (int) ceil(((int) $state[$key]['resetAt'] - $now) / 1000);
                flock($fp, LOCK_UN);
                fclose($fp);
                limited_out(max(1, $retry));
            }
            $state[$key]['count'] = (int) $state[$key]['count'] + 1;
        } else {
            $state[$key] = ['count' => 1, 'resetAt' => $now + $windowMs];
        }
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($state));
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
    }
}

/* ---------------- Text sanitisation ---------------- */

function clean_text($v, int $maxLen): string {
    if (!is_string($v)) return '';
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    $v = trim($v);
    if (function_exists('mb_substr')) {
        return mb_substr($v, 0, $maxLen, 'UTF-8');
    }
    return substr($v, 0, $maxLen);
}

function is_email(string $v): bool {
    return (bool) preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/', $v) && strlen($v) <= 254;
}

/* ---------------- Report reference ---------------- */

function generate_reference(): string {
    $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    $code = '';
    for ($i = 0; $i < 6; $i++) {
        $code .= $alphabet[random_int(0, strlen($alphabet) - 1)];
    }
    return 'GLP-' . date('Y') . '-' . $code;
}

/* ---------------- Secret detection (reports) ---------------- */

function luhn_valid(string $digits): bool {
    $len = strlen($digits);
    if ($len < 13 || $len > 19) return false;
    $sum = 0;
    $dbl = false;
    for ($i = $len - 1; $i >= 0; $i--) {
        $d = ord($digits[$i]) - 48;
        if ($d < 0 || $d > 9) return false;
        if ($dbl) {
            $d *= 2;
            if ($d > 9) $d -= 9;
        }
        $sum += $d;
        $dbl = !$dbl;
    }
    return $sum % 10 === 0;
}

function contains_secrets(string $text): bool {
    $kw = '/\b(pin|otp|one[-\s]?time|cvv|cvc|password|passcode|mot\s+de\s+passe|code\s+secret|code\s+pin|secret\s+code|seed\s+phrase|recovery\s+phrase|private\s+key)\b[^\d]{0,15}(\d{4,8})/iu';
    if (preg_match($kw, $text)) return true;
    $squashed = preg_replace('/[\s-]/u', '', $text) ?? '';
    if (preg_match_all('/\d{13,19}/', $squashed, $runs)) {
        foreach ($runs[0] as $r) {
            if (luhn_valid($r)) return true;
        }
    }
    if (preg_match_all("/[a-zà-ÿ']+/u", lower($text), $words)) {
        $run = 0;
        foreach ($words[0] as $w) {
            $run = (mb_len($w) >= 3) ? $run + 1 : 0;
            if ($run >= 12) return true;
        }
    }
    return false;
}

/* ---------------- Small unicode helpers ---------------- */

function lower(string $s): string {
    return function_exists('mb_strtolower') ? mb_strtolower($s, 'UTF-8') : strtolower($s);
}

function mb_len(string $s): int {
    return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s);
}

/**
 * Lowercase + strip diacritics (ports the TS normalise()).
 * Uses iconv transliteration when available.
 */
function normalise(string $s): string {
    $s = lower($s);
    if (function_exists('iconv')) {
        $t = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $s);
        if (is_string($t) && $t !== '') {
            // Transliteration may emit quotes for some glyphs — drop them.
            $t = str_replace(["'", '`', '"'], '', $t);
            if ($t !== '') return $t;
        }
    }
    // Manual fallback for common Latin accented characters.
    $from = 'àáâãäåçèéêëìíîïñòóôõöùúûüýÿœæ';
    $to   = 'aaaaaaceeeeiiiinooooouuuuyyoa';
    $s = strtr($s, array_combine(
        preg_split('//u', $from, -1, PREG_SPLIT_NO_EMPTY) ?: [],
        str_split($to)
    ));
    return $s;
}

/* ---------------- Loaded data bundle (checker + assistant) ---------------- */

function load_bundle(): array {
    static $bundle = null;
    if ($bundle !== null) return $bundle;
    $file = __DIR__ . '/api-data.json';
    if (!is_file($file)) {
        $alt = dirname(__DIR__) . '/api-data.json';
        if (is_file($alt)) $file = $alt;
    }
    $raw = is_file($file) ? file_get_contents($file) : false;
    if ($raw === false) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'server_error']);
        exit;
    }
    $bundle = json_decode($raw, true);
    if (!is_array($bundle)) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'server_error']);
        exit;
    }
    return $bundle;
}

/** Locale-aware pick from a bilingual {en, fr} object. */
function pick(array $obj, string $locale): string {
    if ($locale === 'fr' && isset($obj['fr']) && $obj['fr'] !== '') return (string) $obj['fr'];
    return (string) ($obj['en'] ?? '');
}
