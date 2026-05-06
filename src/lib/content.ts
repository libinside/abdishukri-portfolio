import { articles } from "@/content/articles";
import { galleries } from "@/content/galleries";
import { photoEssays } from "@/content/photo-essays";

function findBySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug);
}

function siblingsFor<T extends { slug: string }>(items: T[], slug: string) {
  const index = items.findIndex((item) => item.slug === slug);

  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: items[(index - 1 + items.length) % items.length],
    next: items[(index + 1) % items.length],
  };
}

export function getGalleryProject(slug: string) {
  return findBySlug(galleries, slug);
}

export function getGallerySiblings(slug: string) {
  return siblingsFor(galleries, slug);
}

export function getPhotoEssay(slug: string) {
  return findBySlug(photoEssays, slug);
}

export function getPhotoEssaySiblings(slug: string) {
  return siblingsFor(photoEssays, slug);
}

export function getArticle(slug: string) {
  return findBySlug(articles, slug);
}

export function getArticleSiblings(slug: string) {
  return siblingsFor(articles, slug);
}
