import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { getCurrentUser, logActivity } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const execFileAsync = promisify(execFile);

function sanitizeRepoName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/^-+|-+$/g, "") || "gloprofas";
}

export async function POST(request: Request) {
  const user = await getCurrentUser().catch(() => null);

  const body = (await request.json().catch(() => ({}))) as {
    token?: string;
    owner?: string;
    repo?: string;
    isPrivate?: boolean;
  };

  const token = (body.token?.trim() || process.env.GITHUB_TOKEN || "").trim();
  const owner = (body.owner?.trim() || "membaherve-cyber").replace(/[^a-zA-Z0-9-]/g, "");
  const repo = sanitizeRepoName(body.repo?.trim() || "gloprofas");
  const isPrivate = Boolean(body.isPrivate);

  if (!token) {
    return NextResponse.json(
      {
        error: `Please enter your GitHub Fine-Grained Token (github_pat_...) to push to https://github.com/${owner}/${repo}`,
      },
      { status: 400 },
    );
  }

  try {
    // 1. Check if the repository exists on GitHub; if 404, attempt to create it
    const checkRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "GLOPROFAS-Platform",
      },
    });

    if (checkRes.status === 404) {
      const createRes = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "User-Agent": "GLOPROFAS-Platform",
        },
        body: JSON.stringify({
          name: repo,
          description:
            "GLOPROFAS — Global Programme for the Fight Against Scams (Next.js fullstack platform)",
          private: isPrivate,
          auto_init: false,
        }),
      });

      if (!createRes.ok && createRes.status !== 422) {
        const errJson = (await createRes.json().catch(() => ({}))) as { message?: string };
        return NextResponse.json(
          {
            error: `Repository https://github.com/${owner}/${repo} was not found or token lacks access: ${
              errJson.message || createRes.statusText
            }`,
          },
          { status: createRes.status },
        );
      }
    } else if (checkRes.status === 401 || checkRes.status === 403) {
      const errJson = (await checkRes.json().catch(() => ({}))) as { message?: string };
      return NextResponse.json(
        {
          error: `GitHub token rejected (${checkRes.status}): ${
            errJson.message || "Ensure the Fine-Grained Token has 'Contents: Read and write' permission on " + owner + "/" + repo
          }`,
        },
        { status: checkRes.status },
      );
    }

    // 2. Ensure local git repository is initialised and all files are committed on branch 'main'
    const cwd = process.cwd();
    if (!existsSync(path.join(cwd, ".git"))) {
      await execFileAsync("git", ["init", "-b", "main"], { cwd });
    }
    await execFileAsync("git", ["checkout", "-B", "main"], { cwd }).catch(() => null);
    await execFileAsync("git", ["add", "-A"], { cwd });
    await execFileAsync(
      "git",
      [
        "-c",
        "user.name=Hervé Memba",
        "-c",
        "user.email=hervememba2@gmail.com",
        "commit",
        "-m",
        "GLOPROFAS fullstack platform",
      ],
      { cwd },
    ).catch(() => null);

    // 3. Push branch 'main' to https://github.com/<owner>/<repo>.git using Basic auth header (works with Fine-Grained PATs)
    const publicUrl = `https://github.com/${owner}/${repo}`;
    const basicAuth = Buffer.from(`x-access-token:${token}`).toString("base64");

    await execFileAsync(
      "git",
      [
        "-c",
        `http.https://github.com/.extraheader=AUTHORIZATION: basic ${basicAuth}`,
        "push",
        "--force",
        `${publicUrl}.git`,
        "HEAD:refs/heads/main",
      ],
      {
        cwd,
        timeout: 120_000,
      },
    );

    await execFileAsync("git", ["remote", "remove", "origin"], { cwd }).catch(() => null);
    await execFileAsync("git", ["remote", "add", "origin", `${publicUrl}.git`], {
      cwd,
    }).catch(() => null);

    await logActivity(
      user?.email ?? "github-sync",
      "github.pushed",
      "repository",
      `${owner}/${repo}`,
    ).catch(() => null);

    return NextResponse.json({
      ok: true,
      repoUrl: publicUrl,
      message: `Successfully pushed branch 'main' to ${publicUrl}`,
    });
  } catch (error) {
    const rawMsg = error instanceof Error ? error.message : "Git push failed";
    const safeMsg = rawMsg
      .replace(/basic [A-Za-z0-9+/=]+/gi, "basic ***")
      .replace(/x-access-token:[^@]+@/g, "x-access-token:***@");
    return NextResponse.json(
      {
        error: `${safeMsg}. Make sure your Fine-Grained Token has 'Contents: Read and write' enabled for ${owner}/${repo}.`,
      },
      { status: 500 },
    );
  }
}
