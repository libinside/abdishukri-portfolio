// Registry describing every editable content type, its JSON file in the repo,
// and whether it is a collection (array of items keyed by slug) or a single
// object. Shared by the admin API routes and the dashboard UI.

export type ContentKind = "collection" | "single";

export type ContentTypeConfig = {
  key: string; // URL/identifier, e.g. "galleries"
  label: string; // Human label for the dashboard
  description: string;
  path: string; // JSON file path within the repo
  kind: ContentKind;
  hasSlug?: boolean; // collections whose items are keyed by a unique slug
};

export const CONTENT_TYPES: ContentTypeConfig[] = [
  {
    key: "galleries",
    label: "Galleries",
    description: "Photo projects with a cover, image set, tags, location and year.",
    path: "src/content/data/galleries.json",
    kind: "collection",
    hasSlug: true,
  },
  {
    key: "photo-essays",
    label: "Photo essays",
    description: "Long-form essays with a hero image and paragraph / image / pullquote blocks.",
    path: "src/content/data/photo-essays.json",
    kind: "collection",
    hasSlug: true,
  },
  {
    key: "articles",
    label: "Articles",
    description: "Written pieces with a hero image, category and body paragraphs.",
    path: "src/content/data/articles.json",
    kind: "collection",
    hasSlug: true,
  },
  {
    key: "featured-work",
    label: "Featured work",
    description: "External publications and features with a thumbnail and link.",
    path: "src/content/data/featured-work.json",
    kind: "collection",
  },
  {
    key: "about",
    label: "About & contact",
    description: "Bio, portrait, clients, publications, location and social links.",
    path: "src/content/data/about.json",
    kind: "single",
  },
];

export function getContentType(key: string): ContentTypeConfig | undefined {
  return CONTENT_TYPES.find((t) => t.key === key);
}
