import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { can, getCurrentUser, logActivity } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const execFileAsync = promisify(execFile);

function sanitizeRepoName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/^-+|-+$/g, "") || "gloprofas";
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || !can(user, "content:write")) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

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
        error:
          "A GitHub Personal Access Token (classic token with 'repo' scope or fine-grained token with Contents & Administration write permissions) is required to push to https://github.com/" +
          owner +
          "/" +
          repo,
      },
      { status: 400 },
    );
  }

  try {
    // 1. Check if the repository already exists on GitHub, otherwise create it
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
          description: "GLOPROFAS — Global Programme for the Fight Against Scams (Next.js fullstack platform)",
          private: isPrivate,
          auto_init: false,
        }),
      });

      if (!createRes.ok) {
        const errJson = (await createRes.json().catch(() => ({}))) as { message?: string };
        return NextResponse.json(
          {
            error: `GitHub API could not create repository ${owner}/${repo}: ${
              errJson.message || createRes.statusText
            }`,
          },
          { status: createRes.status },
        );
      }
    } else if (!checkRes.ok) {
      const errJson = (await checkRes.json().catch(() => ({}))) as { message?: string };
      return NextResponse.json(
        {
          error: `GitHub authentication failed: ${errJson.message || checkRes.statusText}`,
        },
        { status: checkRes.status },
      );
    }

    // 2. Ensure git repo is initialised and all current files are committed
    const cwd = process.cwd();
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
        "Update GLOPROFAS platform",
      ],
      { cwd },
    ).catch(() => null); // No-op if working tree is already clean

    // 3. Push main branch to https://github.com/<owner>/<repo>.git using token auth
    const authUrl = `https://x-access-token:${encodeURIComponent(token)}@github.com/${owner}/${repo}.git`;
    await execFileAsync("git", ["push", "--force", authUrl, "HEAD:refs/heads/main"], {
      cwd,
      timeout: 120_000,
    });

    const publicUrl = `https://github.com/${owner}/${repo}`;
    await execFileAsync("git", ["remote", "set-url", "origin", `${publicUrl}.git`], {
      cwd,
    }).catch(() => null);

    await logActivity(user.email, "github.pushed", "repository", `${owner}/${repo}`);

    return NextResponse.json({
      ok: true,
      repoUrl: publicUrl,
      message: `Successfully pushed branch 'main' to ${publicUrl}`,
    });
  } catch (error) {
    const rawMsg = error instanceof Error ? error.message : "Git push failed";
    // Redact any token from error output
    const safeMsg = rawMsg.replace(/x-access-token:[^@]+@/g, "x-access-token:***@");
    return NextResponse.json({ error: safeMsg }, { status: 500 });
  }
}
