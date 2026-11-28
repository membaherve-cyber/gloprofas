<?php
/**
 * GLOPROFAS Resource Centre — shared PHP helpers (LWS deployment).
 * Ports the read side of src/lib/server/resource-store.ts and the
 * projections used by src/app/api/resources/* against the exported
 * resources-data.json bundle (regenerate with
 * `bun scripts/export-hosting-data.ts`, see deploy/lws/README.md).
 */

require_once __DIR__ . '/_lib.php';

/* ---------------- Bundle access ---------------- */

/**
 * Loads resources-data.json (articles, checklists, videos, directory).
 * Mirrors the shape returned by getResourceStore() in the Next.js app.
 */
function res_bundle(): array {
    static $bundle = null;
    if ($bundle !== null) return $bundle;
    $file = __DIR__ . '/resources-data.json';
    if (!is_file($file)) {
        $alt = dirname(__DIR__) . '/resources-data.json';
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

function res_articles(): array {
    $b = res_bundle();
    return isset($b['articles']) && is_array($b['articles']) ? $b['articles'] : [];
}

function res_checklists(): array {
    $b = res_bundle();
    return isset($b['checklists']) && is_array($b['checklists']) ? $b['checklists'] : [];
}

function res_videos(): array {
    $b = res_bundle();
    return isset($b['videos']) && is_array($b['videos']) ? $b['videos'] : [];
}

function res_directory(): array {
    $b = res_bundle();
    return isset($b['directory']) && is_array($b['directory']) ? $b['directory'] : [];
}

/* ---------------- Method / path helpers ---------------- */

/** These endpoints are GET-only in the Next.js app (405, empty body — like Next). */
function require_get(): void {
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
        http_response_code(405);
        header('Allow: GET');
        exit;
    }
}

/**
 * Extracts the dynamic segment from the ORIGINAL request URI, so the same
 * code works behind the Apache rewrite and the local test router.
 * Example: res_path_param('#^/api/resources/articles/([^/]+)$#')
 */
function res_path_param(string $pattern): ?string {
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    if (!is_string($path)) return null;
    if (preg_match($pattern, $path, $m)) return urldecode($m[1]);
    return null;
}

/* ---------------- Projections (ports of the TS ones) ---------------- */

/** Ports toArticleSummary() from src/lib/server/resource-store.ts. */
function article_summary(array $a): array {
    return [
        'slug' => (string) ($a['slug'] ?? ''),
        'categorySlug' => (string) ($a['categorySlug'] ?? ''),
        'title' => $a['title'] ?? ['en' => '', 'fr' => ''],
        'summary' => $a['summary'] ?? ['en' => '', 'fr' => ''],
        'readingMinutes' => (int) ($a['readingMinutes'] ?? 0),
        'publishedAt' => (string) ($a['publishedAt'] ?? ''),
        'updatedAt' => (string) ($a['updatedAt'] ?? ''),
        'featured' => !empty($a['featured']),
        'popular' => !empty($a['popular']),
        'imageUrl' => (string) ($a['imageUrl'] ?? ''),
        'published' => !empty($a['published']),
    ];
}

/** Ports the light country index used by /overview and /directory?summary=1. */
function country_summary(array $c): array {
    return [
        'code' => (string) ($c['code'] ?? ''),
        'name' => (string) ($c['name'] ?? ''),
        'nameFr' => (string) ($c['nameFr'] ?? ''),
        'continent' => (string) ($c['continent'] ?? ''),
        'priority' => !empty($c['priority']),
        'status' => (string) ($c['status'] ?? ''),
        'agencyCount' => is_array($c['agencies'] ?? null) ? count($c['agencies']) : 0,
        'lastVerified' => (string) ($c['lastVerified'] ?? ''),
    ];
}

/** Ports the GET /api/resources/checklists projection. */
function checklist_public(array $c): array {
    return [
        'slug' => (string) ($c['slug'] ?? ''),
        'title' => $c['title'] ?? ['en' => '', 'fr' => ''],
        'subtitle' => $c['subtitle'] ?? ['en' => '', 'fr' => ''],
        'category' => (string) ($c['category'] ?? ''),
        'intro' => $c['intro'] ?? ['en' => '', 'fr' => ''],
        'warning' => $c['warning'] ?? ['en' => '', 'fr' => ''],
        'sections' => $c['sections'] ?? [],
        'references' => $c['references'] ?? [],
        'version' => (string) ($c['version'] ?? ''),
        'publishedAt' => (string) ($c['publishedAt'] ?? ''),
        'featured' => !empty($c['featured']),
        'downloadCount' => (int) ($c['downloadCount'] ?? 0),
        'pdfEn' => (string) ($c['pdfEn'] ?? ''),
        'pdfFr' => (string) ($c['pdfFr'] ?? ''),
    ];
}

/** Ports the GET /api/resources/videos projection. */
function video_public(array $v): array {
    return [
        'youtubeId' => (string) ($v['youtubeId'] ?? ''),
        'title' => $v['title'] ?? ['en' => '', 'fr' => ''],
        'description' => $v['description'] ?? ['en' => '', 'fr' => ''],
        'publisher' => (string) ($v['publisher'] ?? ''),
        'publisherUrl' => (string) ($v['publisherUrl'] ?? ''),
        'duration' => (string) ($v['duration'] ?? ''),
        'topicSlug' => (string) ($v['topicSlug'] ?? ''),
        'verified' => !empty($v['verified']),
        'verifiedAt' => (string) ($v['verifiedAt'] ?? ''),
        'displayOrder' => (int) ($v['displayOrder'] ?? 0),
    ];
}

/** Find an article in the bundle by slug (any published state). */
function res_find_article(array $articles, string $slug): ?array {
    foreach ($articles as $a) {
        if (($a['slug'] ?? '') === $slug) return $a;
    }
    return null;
}

/* ---------------- Cached JSON response ---------------- */

/** JSON response with a public Cache-Control (ports the NextResponse headers). */
function json_cached(array $payload, string $cacheControl): void {
    http_response_code(200);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: ' . $cacheControl);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
