import type { Metadata } from "next";
import { featuredWork } from "@/content/featured-work";

export const metadata: Metadata = {
  title: "Featured Work",
  description:
    "External publication cards and selected features for Abdishukri's photography work.",
};

export default function FeaturedWorkPage() {
  return (
    <section className="page-shell">
      <div className="mb-14 max-w-4xl">
        <p className="kicker">Featured Work</p>
        <h1 className="display-title mt-5">Published elsewhere.</h1>
        <p className="body-copy mt-7">
          Selected features, interviews, and publication moments from across
          Abdishukri's editorial practice.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {featuredWork.map((item) => (
          <a
            key={`${item.platform}-${item.title}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${item.title} on ${item.platform}`}
            className="group editorial-card flex min-h-[34rem] flex-col overflow-hidden"
          >
            <div className="aspect-[4/3] overflow-hidden bg-charcoal">
              <img
                src={item.image.src}
                alt={item.image.alt}
                className="image-hover h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-10 p-6">
              <div>
                <p className="kicker">
                  {item.platform} / {item.date}
                </p>
                <h2 className="mt-5 font-serif text-4xl leading-tight">
                  {item.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-charcoal/70">
                  {item.description}
                </p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal/60">
                Open Feature
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
