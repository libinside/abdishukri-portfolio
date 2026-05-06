import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { aboutInfo } from "@/content/about";

export function Footer() {
  return (
    <footer className="border-t border-charcoal/15 bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-editorial gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-12">
        <div>
          <Link href="/" className="font-serif text-4xl tracking-normal">
            {aboutInfo.logoText}
          </Link>
          <p className="mt-5 max-w-xl text-sm leading-7 text-ivory/70">
            {aboutInfo.tagline}. Editorial photography, visual essays, and
            commissioned stories.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ivory/50">
            Contact
          </p>
          <div className="mt-5 grid gap-3 text-sm text-ivory/80">
            <a href={`mailto:${aboutInfo.contact.email}`}>
              {aboutInfo.contact.email}
            </a>
            <p>{aboutInfo.location}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ivory/50">
            Explore
          </p>
          <div className="mt-5 grid gap-3 text-sm text-ivory/80">
            <Link href="/work">Work</Link>
            <Link href="/photo-essays">Photo Essays</Link>
            <Link href="/articles">Articles</Link>
            <Link href="/featured-work">Featured Work</Link>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ivory/50">
            Social
          </p>
          <SocialLinks
            links={aboutInfo.contact.socials}
            className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ivory/80"
            linkClassName="transition hover:text-ivory"
          />
        </div>
      </div>
    </footer>
  );
}
