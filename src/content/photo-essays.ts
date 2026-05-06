import type { PhotoEssay } from "./types";

export const photoEssays: PhotoEssay[] = [
  {
    slug: "the-hour-before-the-market",
    title: "The Hour Before The Market",
    subtitle:
      "An essay on preparation, repetition, and the soft choreography of a place waking before commerce begins.",
    date: "April 18, 2026",
    location: "Nairobi, Kenya",
    readingTime: "5 min read",
    description:
      "A visual magazine-style story following vendors, streets, and light in the hour before a market opens.",
    heroImage: {
      src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=2200&q=85",
      alt: "People moving through a dim event space",
      caption: "Movement gathers before the day announces itself.",
      orientation: "landscape",
    },
    blocks: [
      {
        type: "paragraph",
        text: "Before the first customers arrive, the market belongs to hands. Tarps are pulled tight, crates are lifted, and every gesture carries the confidence of repetition.",
      },
      {
        type: "image",
        image: {
          src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=82",
          alt: "People moving through a low-lit interior",
          caption: "The first movements are practical, almost silent.",
          orientation: "landscape",
        },
      },
      {
        type: "paragraph",
        text: "The camera waits for the moment when labor becomes composition. A stack of fruit, a strip of shade, a face turned toward a voice off-frame - each detail briefly aligns.",
      },
      {
        type: "pullquote",
        text: "The story begins before the crowd. By the time the market is full, the most delicate part of the day has already passed.",
      },
      {
        type: "image",
        image: {
          src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1500&q=82",
          alt: "A quiet old street with reflective water",
          caption: "Side streets hold the last of the morning quiet.",
          orientation: "portrait",
        },
      },
      {
        type: "paragraph",
        text: "This essay is placeholder copy. Replace it with Abdishukri's actual field notes, interviews, captions, and long-form observations when the real photographs are ready.",
      },
    ],
  },
  {
    slug: "rooms-that-hold-light",
    title: "Rooms That Hold Light",
    subtitle:
      "A quiet interior study of portraits, windows, and the emotional weather of private rooms.",
    date: "February 9, 2026",
    location: "Addis Ababa, Ethiopia",
    readingTime: "4 min read",
    description:
      "A restrained photo essay pairing portraits with interior details and reflective prose.",
    heroImage: {
      src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1800&q=85",
      alt: "A portrait in calm interior light",
      caption: "Portrait made in a room with window light.",
      orientation: "portrait",
    },
    blocks: [
      {
        type: "paragraph",
        text: "Some rooms make a portrait before the person sits down. The wall color, the chair, the hour of light - all of it becomes part of the image.",
      },
      {
        type: "image",
        image: {
          src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1400&q=82",
          alt: "A seated portrait in natural light",
          caption: "The room edits the face before the camera does.",
          orientation: "portrait",
        },
      },
      {
        type: "paragraph",
        text: "The strongest portraits in this series are not dramatic. They are attentive. They hold small tensions: a hand just outside the frame, a glance after a question, a curtain shifting in wind.",
      },
      {
        type: "image",
        image: {
          src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1500&q=82",
          alt: "A composed portrait with soft light",
          caption: "Stillness as a form of permission.",
          orientation: "portrait",
        },
      },
      {
        type: "paragraph",
        text: "Use this structure for real essays: build the rhythm with paragraphs, single images, captions, and pull quotes.",
      },
    ],
  },
];
