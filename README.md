# abdishukri Photography Portfolio

A modern, minimal, cinematic photography portfolio for **abdishukri**.

Built with Next.js, React, and Tailwind CSS. The project is prepared for handover so the final code, Vercel project, and Namecheap domain can be owned and managed by Abdishukri.

## Ownership And Handover

This site should not be deployed from the builder's Vercel account unless Abdishukri explicitly wants that. The clean handover path is:

1. Push this code to a GitHub repository owned by Abdishukri.
2. Abdishukri imports that repository into his own Vercel account.
3. Abdishukri connects his Namecheap domain to that Vercel project.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

## Replace Photos

The current site uses remote placeholder images.

For final images, place files in:

```text
public/photos
```

Then update image paths in the content files. For example:

```ts
src: "/photos/coastal-silence-01.jpg"
```

Recommended content files to update:

- `src/content/galleries.ts`
- `src/content/photo-essays.ts`
- `src/content/articles.ts`
- `src/content/featured-work.ts`
- `src/content/about.ts`

## Edit Text And Content

All editable site content lives in:

```text
src/content
```

Use these files:

- `galleries.ts` - work/projects, gallery images, captions, locations, years
- `photo-essays.ts` - visual essay pages with paragraphs, pull quotes, images, captions
- `articles.ts` - writing pages with title, date, category, hero image, body text
- `featured-work.ts` - external publication cards and links
- `about.ts` - bio, approach, portrait, clients, publications, location, email, Instagram

Each gallery, essay, and article has a `slug`. The slug controls the URL, for example:

```text
/work/coastal-silence
```

## Push To Abdishukri's GitHub Repository

Abdishukri should create a new empty GitHub repository while logged into his own GitHub account.

Then from this project folder:

```bash
git init
git add .
git commit -m "Initial abdishukri portfolio"
git branch -M main
git remote add origin https://github.com/ABDISHUKRI_USERNAME/REPOSITORY_NAME.git
git push -u origin main
```

Replace `ABDISHUKRI_USERNAME` and `REPOSITORY_NAME` with Abdishukri's actual GitHub username and repo name.

If the repository already exists locally with Git history, only add the correct remote owned by Abdishukri:

```bash
git remote add origin https://github.com/ABDISHUKRI_USERNAME/REPOSITORY_NAME.git
git push -u origin main
```

## Import Into Abdishukri's Vercel Account

Abdishukri should do these steps from his own Vercel account:

1. Sign in to Vercel.
2. Choose **Add New Project**.
3. Import the GitHub repository owned by Abdishukri.
4. Keep the framework preset as **Next.js**.
5. Use the default build settings:
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: leave as the Next.js default
6. Deploy the project.

After this, future updates are managed by pushing changes to Abdishukri's GitHub repository. Vercel will redeploy from that repo.

## Connect Abdishukri's Namecheap Domain

Abdishukri should connect the domain from inside his own Vercel project:

1. In Vercel, open the project.
2. Go to **Settings** then **Domains**.
3. Add the Namecheap domain, such as `abdishukri.com`.
4. Vercel will show the exact DNS records required for that domain.
5. In Namecheap, open the domain's **Advanced DNS** settings.
6. Add or update the DNS records exactly as Vercel provides them.
7. Return to Vercel and wait for verification.

Use Vercel's displayed DNS records as the source of truth. Do not guess records from another project, because Vercel may provide different records depending on whether the domain is apex, `www`, or a subdomain.

Commonly, Vercel asks for records like an `A` record for the apex domain and a `CNAME` record for `www`, but Abdishukri should copy the exact values shown in his Vercel dashboard.

## Contact Form

The contact form uses a `mailto:` flow so it works without a backend. To change the recipient email, edit:

```text
src/content/about.ts
```

For a production backend form later, add an API route or a form provider from Abdishukri's own accounts.

## Project Structure

```text
src/app                Next.js App Router pages
src/components         Reusable UI and interaction components
src/content            Editable content files
src/lib                Content helpers
public/photos          Final local photo assets
```
