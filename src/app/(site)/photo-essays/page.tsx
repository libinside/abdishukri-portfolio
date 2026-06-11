import type { Metadata } from "next";
import Link from "next/link";
import { photoEssays } from "@/content/photo-essays";

export const metadata: Metadata = {
  title: "Photo Essays",
  description:
    "Editorial photo essays by Abdishukri, combining images, captions, and long-form story text.",
};

export default function PhotoEssaysPage() {
  return (
    <section className="page-shell">
      <div className="mb-14 max-w-4xl">
        <p className="kicker">Photo Essays</p>
        <h1 className="display-title mt-5">Stories in sequence.</h1>
        <p className="body-copy mt-7">
          Image-led narratives where captions, field notes, and quiet frames
          carry the story forward.
        </p>
      </div>

      <div className="grid gap-7">
        {photoEssays.map((essay, index) => (
          <Link
            key={essay.slug}
            href={`/photo-essays/${essay.slug}`}
            className="group editorial-card grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div
              className={`overflow-hidden bg-charcoal ${
                index % 2 === 0 ? "lg:order-none" : "lg:order-last"
              }`}
            >
              <img
                src={essay.heroImage.src}
                alt={essay.heroImage.alt}
                className="image-hover h-full min-h-[22rem] w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
            <div className="flex flex-col justify-between gap-12 p-6 sm:p-8 lg:min-h-[34rem]">
              <div>
                <p className="kicker">{essay.location}</p>
                <h2 className="mt-5 font-serif text-5xl leading-tight">
                  {essay.title}
                </h2>
                <p className="body-copy mt-6">{essay.subtitle}</p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal/55">
                {essay.date} / {essay.readingTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
