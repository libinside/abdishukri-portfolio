import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { aboutInfo } from "@/content/about";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Abdishukri for editorial photography, documentary work, portraits, and visual storytelling commissions.",
};

export default function ContactPage() {
  return (
    <section className="page-shell">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="kicker">Contact</p>
          <h1 className="display-title mt-5">Start a conversation.</h1>
          <p className="body-copy mt-7">
            For commissions, editorial assignments, portrait sessions, licensing,
            and publication inquiries.
          </p>

          <div className="mt-12 grid gap-6 border-y border-charcoal/15 py-10 text-sm leading-7 text-charcoal/75">
            <div>
              <p className="kicker">Email</p>
              <a className="mt-2 block" href={`mailto:${aboutInfo.contact.email}`}>
                {aboutInfo.contact.email}
              </a>
            </div>
            <div>
              <p className="kicker">Social</p>
              <SocialLinks
                links={aboutInfo.contact.socials}
                className="mt-2 flex flex-wrap gap-x-5 gap-y-2"
                linkClassName="transition hover:text-charcoal"
              />
            </div>
            <div>
              <p className="kicker">Location</p>
              <p className="mt-2">{aboutInfo.location}</p>
            </div>
          </div>
        </div>

        <div className="border border-charcoal/15 p-5 sm:p-8">
          <ContactForm email={aboutInfo.contact.email} />
        </div>
      </div>
    </section>
  );
}
