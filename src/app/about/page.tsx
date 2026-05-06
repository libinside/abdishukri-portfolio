import type { Metadata } from "next";
import Link from "next/link";
import { ClickableImage } from "@/components/LightboxGallery";
import { SocialLinks } from "@/components/SocialLinks";
import { aboutInfo } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Abdishukri, photographer and visual storyteller, including bio, approach, selected clients, publications, location, and contact.",
};

export default function AboutPage() {
  return (
    <section className="page-shell">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <ClickableImage
            image={aboutInfo.portrait}
            imageClassName="aspect-[4/5]"
            priority
          />
        </div>

        <div>
          <p className="kicker">About</p>
          <h1 className="display-title mt-5">{aboutInfo.name}</h1>
          <p className="mt-6 text-xl leading-9 text-charcoal/70">
            {aboutInfo.tagline}
          </p>

          <div className="mt-12 grid gap-8 border-y border-charcoal/15 py-10">
            {aboutInfo.bio.map((paragraph) => (
              <p key={paragraph} className="body-copy">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div>
              <p className="kicker">Approach</p>
              <p className="mt-5 text-sm leading-7 text-charcoal/75">
                {aboutInfo.approach}
              </p>
            </div>
            <div>
              <p className="kicker">Location</p>
              <p className="mt-5 text-sm leading-7 text-charcoal/75">
                {aboutInfo.location}
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-10 border-t border-charcoal/15 pt-10 md:grid-cols-2">
            <div>
              <p className="kicker">Selected Clients</p>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-charcoal/75">
                {aboutInfo.clients.map((client) => (
                  <li key={client}>{client}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker">Publications</p>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-charcoal/75">
                {aboutInfo.publications.map((publication) => (
                  <li key={publication}>{publication}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 border-t border-charcoal/15 pt-10 text-xs font-semibold uppercase tracking-[0.22em]">
            <a
              href={`mailto:${aboutInfo.contact.email}`}
              className="border border-charcoal px-5 py-4 transition hover:bg-charcoal hover:text-ivory"
            >
              Email
            </a>
            <SocialLinks
              links={aboutInfo.contact.socials}
              className="contents"
              linkClassName="border border-charcoal px-5 py-4 normal-case tracking-normal transition hover:bg-charcoal hover:text-ivory"
            />
            <Link
              href="/contact"
              className="border border-charcoal px-5 py-4 transition hover:bg-charcoal hover:text-ivory"
            >
              Contact Page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
