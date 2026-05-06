import type { Article } from "./types";

export const articles: Article[] = [
  {
    slug: "building-a-visual-language",
    title: "Building A Visual Language",
    date: "May 2, 2026",
    category: "Process",
    excerpt:
      "Notes on restraint, sequence, and creating a body of work that can be recognized before it is explained.",
    heroImage: {
      src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2200&q=85",
      alt: "A camera held in dramatic studio light",
      caption: "A language begins with repeated attention.",
      orientation: "landscape",
    },
    body: [
      "A visual language is not a preset. It is a pattern of choices that begins to feel inevitable: where the frame rests, what is left out, how a face is allowed to stay unresolved.",
      "For Abdishukri, the strongest images often come from refusing excess. The edit is quiet, the palette is disciplined, and the sequence gives the viewer room to meet the subject.",
      "This is placeholder editorial copy. Replace it with real writing, project notes, interviews, press announcements, or journal entries inside src/content/articles.ts.",
    ],
  },
  {
    slug: "why-captions-matter",
    title: "Why Captions Matter",
    date: "March 14, 2026",
    category: "Editorial",
    excerpt:
      "A short reflection on captions as context, rhythm, and a second frame around the photograph.",
    heroImage: {
      src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2200&q=85",
      alt: "A notebook and writing desk",
      caption: "The caption is part of the edit.",
      orientation: "landscape",
    },
    body: [
      "A caption should not flatten the photograph. It should widen the room around it.",
      "The best captions carry location, time, and emotional pressure without explaining away the image. They give the viewer a handhold and then step back.",
      "Use the article content file to create more pieces as Abdishukri's writing archive grows.",
    ],
  },
  {
    slug: "editing-for-silence",
    title: "Editing For Silence",
    date: "January 27, 2026",
    category: "Editing",
    excerpt:
      "On sequencing images so the quiet frames carry as much weight as the dramatic ones.",
    heroImage: {
      src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2200&q=85",
      alt: "A quiet forest path in soft light",
      caption: "Silence is often built in the sequence.",
      orientation: "landscape",
    },
    body: [
      "A strong edit needs pressure and release. Not every frame should announce itself at the same volume.",
      "The quiet photographs are often where the audience begins to trust the work. They hold space between the images that perform.",
      "This sample article shows the clean writing layout: title, date, category, image, caption, and body text.",
    ],
  },
];
