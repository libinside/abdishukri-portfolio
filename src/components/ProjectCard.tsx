import Link from "next/link";
import type { GalleryProject } from "@/content/types";

type ProjectCardProps = {
  project: GalleryProject;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group editorial-card block overflow-hidden ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`overflow-hidden bg-charcoal ${
          featured ? "aspect-[16/10]" : "aspect-[4/5]"
        }`}
      >
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          className="image-hover h-full w-full object-cover"
          loading={featured ? "eager" : "lazy"}
        />
      </div>
      <div className="grid gap-5 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-charcoal/55">
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>
        <div>
          <h3 className="font-serif text-3xl leading-tight">{project.title}</h3>
          <p className="mt-3 text-sm leading-7 text-charcoal/70">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
