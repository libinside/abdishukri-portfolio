Place Abdishukri's final photography files in this folder.

Example:

- public/photos/coastal-silence-01.jpg
- public/photos/portrait-abdishukri.jpg

Then update the matching `src` fields in the content files:

- `src/content/galleries.ts`
- `src/content/photo-essays.ts`
- `src/content/articles.ts`
- `src/content/featured-work.ts`
- `src/content/about.ts`

For a file stored at `public/photos/coastal-silence-01.jpg`, use:

```ts
src: "/photos/coastal-silence-01.jpg"
```
