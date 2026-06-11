# Studio Dashboard — Setup

This site now includes a private dashboard at `/admin` for managing galleries,
photo essays, articles, featured work, and the about/contact page. Saving a
change commits it to this GitHub repository, which triggers Vercel to rebuild
and publish automatically. No database and no paid services are used.

## How it works

- Content lives as JSON in `src/content/data/*.json`.
- The public pages read that JSON at build time (unchanged from before).
- The dashboard reads and writes the JSON through the GitHub API. Each content
  save is a commit; Vercel's existing GitHub integration deploys it, usually
  live within about a minute.
- Uploaded images go to Vercel Blob storage (not the repo), which scales to
  large photo libraries. Images appear immediately, no rebuild required.

## One-time setup

### 1. Create a GitHub token

1. Go to GitHub > Settings > Developer settings > Personal access tokens >
   Fine-grained tokens > Generate new token.
2. Repository access: Only select repositories > `libinside/abdishukri-portfolio`.
3. Permissions > Repository permissions > Contents: Read and write.
4. Generate and copy the token (starts with `github_pat_`).

### 2. Connect a Vercel Blob store (for images)

1. In the Vercel project: Storage > Create Database > Blob > Create.
2. Connect it to this project when prompted. Vercel injects
   `BLOB_READ_WRITE_TOKEN` into the project automatically.

The free tier covers a generous amount of storage and bandwidth, enough for a
growing photo library.

### 3. Add environment variables in Vercel

In the Vercel project: Settings > Environment Variables. Add these for the
Production (and Preview, if you want) environments:

| Name | Value |
| --- | --- |
| `ADMIN_PASSWORD` | the password you will type to sign in |
| `ADMIN_SECRET` | a long random string (`openssl rand -hex 32`) |
| `GITHUB_REPO` | `libinside/abdishukri-portfolio` |
| `GITHUB_BRANCH` | `main` |
| `GITHUB_TOKEN` | the token from step 1 |

`BLOB_READ_WRITE_TOKEN` is added automatically by step 2. Redeploy once after
adding the variables so the running app picks them up.

### 4. Sign in

Visit `https://www.abdishukri.com/admin`, enter the password, and start editing.

## Local development

```bash
cp .env.example .env.local   # then fill in the values
npm install
npm run dev
```

Open `http://localhost:3000/admin`. Note: even locally, saves commit to GitHub,
because the dashboard writes through the GitHub API rather than the local disk.

## Notes

- Images are downscaled in your browser (longest edge 2400px, WebP) before
  upload, keeping files small and pages fast. Originals on your computer are
  untouched. Uploaded files are served from Vercel Blob.
- The `/admin` area is excluded from search engines and protected by the
  password plus a signed session cookie that expires after 12 hours.
- Slugs (the URL part) auto-generate from titles and must be unique within a
  section. You can edit them manually before the first save.
