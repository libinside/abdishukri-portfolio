import Link from "next/link";
import { HeroImage } from "@/components/HeroImage";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { aboutInfo } from "@/content/about";
import { articles } from "@/content/articles";
import { featuredWork } from "@/content/featured-work";
import { galleries } from "@/content/galleries";
import { photoEssays } from "@/content/photo-essays";

export default function HomePage() {
  const heroProject = galleries[0];

  return (
    <>
      <HeroImage image={heroProject.cover}>
        <div className="mx-auto flex min-h-screen max-w-editorial flex-col justify-end px-5 pb-12 pt-32 sm:px-8 lg:px-12">
          <div className="max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-ivory/75">
              {aboutInfo.tagline}
            </p>
            <h1 className="mt-5 font-serif text-[clamp(4.5rem,16vw,13rem)] leading-[0.82] tracking-normal">
              {aboutInfo.logoText}
            </h1>
            <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.22em]">
              <Link
                href="/work"
                className="border border-ivory/50 px-5 py-4 transition hover:border-ivory"
              >
                View Work
              </Link>
              <Link
                href="/contact"
                className="border border-ivory/50 px-5 py-4 transition hover:border-ivory"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </HeroImage>

      <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Cinematic stories, edited with restraint."
          description="A selection of gallery projects built around atmosphere, people, place, and sequence."
          href="/work"
          linkText="All Work"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleries.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Photo Essays"
          title="Visual magazine stories with room to breathe."
          href="/photo-essays"
          linkText="Read Essays"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {photoEssays.map((essay) => (
            <Link
              key={essay.slug}
              href={`/photo-essays/${essay.slug}`}
              className="group editorial-card grid overflow-hidden md:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="aspect-[4/5] overflow-hidden bg-charcoal md:aspect-auto">
                <img
                  src={essay.heroImage.src}
                  alt={essay.heroImage.alt}
                  className="image-hover h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-between gap-10 p-6">
                <div>
                  <p className="kicker">{essay.location}</p>
                  <h3 className="mt-4 font-serif text-4xl leading-tight">
                    {essay.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-charcoal/70">
                    {essay.description}
                  </p>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal/55">
                  {essay.date} / {essay.readingTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Articles"
          title="Writing on process, editing, and image culture."
          href="/articles"
          linkText="All Articles"
        />
        <div className="grid gap-4">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group grid gap-4 border-t border-charcoal/15 py-7 transition hover:border-charcoal/45 md:grid-cols-[0.7fr_1.4fr_0.4fr]"
            >
              <p className="kicker">{article.category}</p>
              <div>
                <h3 className="font-serif text-3xl leading-tight">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-charcoal/70">
                  {article.excerpt}
                </p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal/55 md:text-right">
                {article.date}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Featured Work"
          title="Selected publications and external features."
          href="/featured-work"
          linkText="View Features"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featuredWork.map((item) => (
            <a
              key={`${item.platform}-${item.title}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${item.title} on ${item.platform}`}
              className="group editorial-card block overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden bg-charcoal">
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  className="image-hover h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="kicker">{item.platform}</p>
                <h3 className="mt-4 font-serif text-3xl leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-charcoal/70">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-editorial gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <Link
          href="/about"
          className="group block aspect-[4/5] overflow-hidden bg-charcoal"
        >
          <img
            src={aboutInfo.portrait.src}
            alt={aboutInfo.portrait.alt}
            className="image-hover h-full w-full object-cover"
            loading="lazy"
          />
        </Link>
        <div className="flex flex-col justify-center border-y border-charcoal/15 py-10">
          <p className="kicker">About</p>
          <h2 className="section-title mt-4">
            A quiet, deliberate approach to people and place.
          </h2>
          <p className="body-copy mt-6">{aboutInfo.bio[0]}</p>
          <Link
            href="/about"
            className="mt-8 w-fit border-b border-charcoal pb-1 text-xs font-semibold uppercase tracking-[0.22em] transition hover:opacity-60"
          >
            Read Profile
          </Link>
        </div>
      </section>
    </>
  );
}
