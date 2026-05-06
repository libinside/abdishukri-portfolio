import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Writing by Abdishukri on photography, editing, process, and visual culture.",
};

export default function ArticlesPage() {
  return (
    <section className="page-shell">
      <div className="mb-14 max-w-4xl">
        <p className="kicker">Articles</p>
        <h1 className="display-title mt-5">Notes and essays.</h1>
        <p className="body-copy mt-7">
          Writing on process, editing, visual memory, and the discipline of
          paying attention.
        </p>
      </div>

      <div className="grid gap-8">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group grid gap-6 border-t border-charcoal/15 pt-8 transition hover:border-charcoal/45 lg:grid-cols-[0.7fr_1.3fr]"
          >
            <div className="aspect-[4/3] overflow-hidden bg-charcoal">
              <img
                src={article.heroImage.src}
                alt={article.heroImage.alt}
                className="image-hover h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-between gap-10 pb-8">
              <div>
                <p className="kicker">
                  {article.category} / {article.date}
                </p>
                <h2 className="mt-5 font-serif text-5xl leading-tight">
                  {article.title}
                </h2>
                <p className="body-copy mt-6">{article.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
