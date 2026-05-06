export type ImageAsset = {
  src: string;
  alt: string;
  caption?: string;
  orientation?: "landscape" | "portrait" | "square";
};

export type GalleryProject = {
  slug: string;
  title: string;
  location: string;
  year: string;
  description: string;
  cover: ImageAsset;
  images: ImageAsset[];
  tags: string[];
};

export type EssayBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "image";
      image: ImageAsset;
    }
  | {
      type: "pullquote";
      text: string;
    };

export type PhotoEssay = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  readingTime: string;
  description: string;
  heroImage: ImageAsset;
  blocks: EssayBlock[];
};

export type Article = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  heroImage: ImageAsset;
  body: string[];
};

export type FeaturedWork = {
  title: string;
  platform: string;
  date: string;
  description: string;
  url: string;
  image: ImageAsset;
};

export type SocialLink = {
  label: "Instagram" | "Facebook" | "X" | "LinkedIn";
  url: string;
  ariaLabel: string;
};

export type AboutInfo = {
  name: string;
  logoText: string;
  tagline: string;
  portrait: ImageAsset;
  bio: string[];
  approach: string;
  clients: string[];
  publications: string[];
  location: string;
  contact: {
    email: string;
    socials: SocialLink[];
  };
};
