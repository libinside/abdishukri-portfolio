import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { galleries } from "@/content/galleries";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Photography galleries by Abdishukri, with clickable project pages and image lightboxes.",
};

export default function WorkPage() {
  return (
    <section className="page-shell">
      <div className="mb-14 max-w-4xl">
        <p className="kicker">Work / Galleries</p>
        <h1 className="display-title mt-5">Photography projects.</h1>
        <p className="body-copy mt-7">
          Bodies of work shaped by atmosphere, movement, distance, and the
          quiet pressure of place.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {galleries.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            featured={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
