import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LightboxGallery } from "@/components/LightboxGallery";
import { galleries } from "@/content/galleries";
import { getGalleryProject, getGallerySiblings } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return galleries.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getGalleryProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getGalleryProject(slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getGallerySiblings(project.slug);

  return (
    <article className="page-shell">
      <header className="grid gap-10 border-b border-charcoal/15 pb-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="kicker">
            {project.location} / {project.year}
          </p>
          <h1 className="display-title mt-5">{project.title}</h1>
        </div>
        <div className="self-end">
          <p className="body-copy">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-charcoal/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <LightboxGallery images={project.images} className="mt-12" />

      <nav className="mt-20 grid gap-4 border-t border-charcoal/15 pt-8 md:grid-cols-2">
        {previous ? (
          <Link
            href={`/work/${previous.slug}`}
            className="group border border-charcoal/15 p-5 transition hover:border-charcoal/45"
          >
            <p className="kicker">Previous</p>
            <p className="mt-3 font-serif text-3xl">{previous.title}</p>
          </Link>
        ) : null}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group border border-charcoal/15 p-5 transition hover:border-charcoal/45 md:text-right"
          >
            <p className="kicker">Next</p>
            <p className="mt-3 font-serif text-3xl">{next.title}</p>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
