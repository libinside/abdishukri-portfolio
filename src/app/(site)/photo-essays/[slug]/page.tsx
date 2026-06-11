import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClickableImage } from "@/components/LightboxGallery";
import { photoEssays } from "@/content/photo-essays";
import { getPhotoEssay, getPhotoEssaySiblings } from "@/lib/content";

type EssayPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return photoEssays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params,
}: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getPhotoEssay(slug);

  if (!essay) {
    return { title: "Essay Not Found" };
  }

  return {
    title: essay.title,
    description: essay.description,
  };
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const essay = getPhotoEssay(slug);

  if (!essay) {
    notFound();
  }

  const { previous, next } = getPhotoEssaySiblings(essay.slug);

  return (
    <article className="page-shell">
      <header className="mx-auto max-w-5xl text-center">
        <p className="kicker">
          {essay.location} / {essay.date} / {essay.readingTime}
        </p>
        <h1 className="display-title mt-6">{essay.title}</h1>
        <p className="body-copy mx-auto mt-8 max-w-3xl">{essay.subtitle}</p>
      </header>

      <ClickableImage
        image={essay.heroImage}
        className="mx-auto mt-12 max-w-6xl"
        imageClassName="aspect-[16/10]"
        priority
      />

      <div className="mx-auto mt-16 grid max-w-4xl gap-10">
        {essay.blocks.map((block, index) => {
          if (block.type === "paragraph") {
            return (
              <p key={`${block.type}-${index}`} className="body-copy">
                {block.text}
              </p>
            );
          }

          if (block.type === "pullquote") {
            return (
              <blockquote
                key={`${block.type}-${index}`}
                className="border-y border-charcoal/15 py-10 font-serif text-4xl leading-tight text-charcoal"
              >
                {block.text}
              </blockquote>
            );
          }

          return (
            <ClickableImage
              key={`${block.image.src}-${index}`}
              image={block.image}
              className="my-4"
              imageClassName={
                block.image.orientation === "portrait"
                  ? "aspect-[4/5]"
                  : "aspect-[16/10]"
              }
            />
          );
        })}
      </div>

      <nav className="mx-auto mt-20 grid max-w-5xl gap-4 border-t border-charcoal/15 pt-8 md:grid-cols-2">
        {previous ? (
          <Link
            href={`/photo-essays/${previous.slug}`}
            className="border border-charcoal/15 p-5 transition hover:border-charcoal/45"
          >
            <p className="kicker">Previous Essay</p>
            <p className="mt-3 font-serif text-3xl">{previous.title}</p>
          </Link>
        ) : null}
        {next ? (
          <Link
            href={`/photo-essays/${next.slug}`}
            className="border border-charcoal/15 p-5 transition hover:border-charcoal/45 md:text-right"
          >
            <p className="kicker">Next Essay</p>
            <p className="mt-3 font-serif text-3xl">{next.title}</p>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
