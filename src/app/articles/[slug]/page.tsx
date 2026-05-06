import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClickableImage } from "@/components/LightboxGallery";
import { articles } from "@/content/articles";
import { getArticle, getArticleSiblings } from "@/lib/content";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const { previous, next } = getArticleSiblings(article.slug);

  return (
    <article className="page-shell">
      <header className="mx-auto max-w-4xl">
        <p className="kicker">
          {article.category} / {article.date}
        </p>
        <h1 className="display-title mt-6">{article.title}</h1>
        <p className="body-copy mt-8">{article.excerpt}</p>
      </header>

      <ClickableImage
        image={article.heroImage}
        className="mx-auto mt-12 max-w-6xl"
        imageClassName="aspect-[16/9]"
        priority
      />

      <div className="mx-auto mt-14 grid max-w-3xl gap-8">
        {article.body.map((paragraph) => (
          <p key={paragraph} className="body-copy">
            {paragraph}
          </p>
        ))}
      </div>

      <nav className="mx-auto mt-20 grid max-w-5xl gap-4 border-t border-charcoal/15 pt-8 md:grid-cols-2">
        {previous ? (
          <Link
            href={`/articles/${previous.slug}`}
            className="border border-charcoal/15 p-5 transition hover:border-charcoal/45"
          >
            <p className="kicker">Previous Article</p>
            <p className="mt-3 font-serif text-3xl">{previous.title}</p>
          </Link>
        ) : null}
        {next ? (
          <Link
            href={`/articles/${next.slug}`}
            className="border border-charcoal/15 p-5 transition hover:border-charcoal/45 md:text-right"
          >
            <p className="kicker">Next Article</p>
            <p className="mt-3 font-serif text-3xl">{next.title}</p>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
