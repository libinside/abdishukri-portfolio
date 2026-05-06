"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SocialLinks } from "@/components/SocialLinks";
import { aboutInfo } from "@/content/about";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/photo-essays", label: "Photo Essays" },
  { href: "/articles", label: "Articles" },
  { href: "/featured-work", label: "Featured Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-charcoal/15 bg-ivory/95 text-charcoal backdrop-blur">
      <div className="mx-auto flex h-20 max-w-editorial items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-serif text-2xl tracking-normal transition hover:opacity-60"
          aria-label="abdishukri home"
        >
          abdishukri
        </Link>

        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.22em] text-charcoal/70 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-charcoal ${
                pathname === item.href ? "text-charcoal" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-charcoal/25 text-charcoal transition hover:border-charcoal lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close" : "Open"}</span>
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-charcoal transition ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-px w-5 bg-charcoal transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-5 bg-charcoal transition ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav className="border-t border-charcoal/15 bg-ivory px-5 py-6 lg:hidden">
          <div className="mx-auto grid max-w-editorial gap-4 text-sm font-semibold uppercase tracking-[0.22em] text-charcoal/75 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-charcoal/10 py-3 transition hover:text-charcoal"
              >
                {item.label}
              </Link>
            ))}
            <SocialLinks
              links={aboutInfo.contact.socials}
              className="mt-2 flex flex-wrap gap-x-5 gap-y-3 border-t border-charcoal/10 pt-5 text-xs text-charcoal/65"
              linkClassName="normal-case tracking-normal transition hover:text-charcoal"
            />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
