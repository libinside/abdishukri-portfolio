// Minimal GitHub Contents API client used by the admin dashboard.
// Reads and writes files directly in the connected repository. Each write
// creates a commit on the configured branch, which triggers Vercel's
// existing auto-deploy. No third-party SDK required.

const API = "https://api.github.com";

type RepoConfig = {
  token: string;
  repo: string; // "owner/name"
  branch: string;
};

export function getRepoConfig(): RepoConfig {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token) throw new Error("Missing GITHUB_TOKEN environment variable.");
  if (!repo) throw new Error("Missing GITHUB_REPO environment variable.");

  return { token, repo, branch };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

type FileResult = {
  content: string; // decoded UTF-8 text
  sha: string;
};

// Read a UTF-8 text file (e.g. JSON content) at the latest commit on the branch.
export async function getFile(path: string): Promise<FileResult | null> {
  const { token, repo, branch } = getRepoConfig();
  const url = `${API}/repos/${repo}/contents/${encodeURIComponentPath(
    path
  )}?ref=${encodeURIComponent(branch)}`;

  const res = await fetch(url, {
    headers: headers(token),
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub getFile failed (${res.status}): ${await res.text()}`);
  }

  const json = (await res.json()) as { content: string; sha: string };
  const content = Buffer.from(json.content, "base64").toString("utf8");
  return { content, sha: json.sha };
}

// Create or update a text file with a commit.
export async function putTextFile(
  path: string,
  text: string,
  message: string,
  sha?: string
): Promise<void> {
  const base64 = Buffer.from(text, "utf8").toString("base64");
  await putBase64(path, base64, message, sha);
}

async function putBase64(
  path: string,
  base64Content: string,
  message: string,
  sha?: string
): Promise<void> {
  const { token, repo, branch } = getRepoConfig();
  const url = `${API}/repos/${repo}/contents/${encodeURIComponentPath(path)}`;

  const body: Record<string, unknown> = {
    message,
    content: base64Content,
    branch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`GitHub putFile failed (${res.status}): ${await res.text()}`);
  }
}

// Encode each path segment but keep the slashes intact.
function encodeURIComponentPath(path: string): string {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}
