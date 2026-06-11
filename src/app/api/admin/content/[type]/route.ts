import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/guard";
import { getContentType } from "@/lib/admin-content";
import { getFile, putTextFile } from "@/lib/github";

export const runtime = "nodejs";

// Read the current content JSON live from the repo so the editor always
// reflects the latest committed state (even before Vercel finishes rebuilding).
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type } = await params;
  const config = getContentType(type);
  if (!config) {
    return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  }

  try {
    const file = await getFile(config.path);
    const data = file ? JSON.parse(file.content) : config.kind === "collection" ? [] : {};
    return NextResponse.json({ data, sha: file?.sha ?? null });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to read content." },
      { status: 500 }
    );
  }
}

// Save the full content JSON for a type with a commit.
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type } = await params;
  const config = getContentType(type);
  if (!config) {
    return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  }

  let payload: unknown;
  let sha: string | undefined;
  try {
    const body = await request.json();
    payload = body?.data;
    sha = typeof body?.sha === "string" ? body.sha : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Basic shape validation against the declared kind.
  if (config.kind === "collection" && !Array.isArray(payload)) {
    return NextResponse.json(
      { error: "Expected an array of items." },
      { status: 400 }
    );
  }
  if (config.kind === "single" && (typeof payload !== "object" || payload === null || Array.isArray(payload))) {
    return NextResponse.json({ error: "Expected an object." }, { status: 400 });
  }

  if (config.kind === "collection" && config.hasSlug) {
    const slugs = (payload as Array<{ slug?: unknown }>).map((i) => i?.slug);
    const missing = slugs.some((s) => typeof s !== "string" || s.length === 0);
    if (missing) {
      return NextResponse.json(
        { error: "Every item needs a non-empty slug." },
        { status: 400 }
      );
    }
    const unique = new Set(slugs as string[]);
    if (unique.size !== slugs.length) {
      return NextResponse.json(
        { error: "Slugs must be unique." },
        { status: 400 }
      );
    }
  }

  const text = JSON.stringify(payload, null, 2) + "\n";

  try {
    // If the client did not send a sha, look up the latest one to avoid 409s.
    let currentSha = sha;
    if (!currentSha) {
      const file = await getFile(config.path);
      currentSha = file?.sha;
    }
    await putTextFile(
      config.path,
      text,
      `content: update ${config.label} via admin dashboard`,
      currentSha
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save content." },
      { status: 500 }
    );
  }
}
