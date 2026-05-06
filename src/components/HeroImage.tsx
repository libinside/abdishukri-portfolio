"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { ImageAsset } from "@/content/types";

type HeroImageProps = {
  image: ImageAsset;
  children: ReactNode;
};

export function HeroImage({ image, children }: HeroImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-charcoal text-ivory">
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-zoom-in"
        aria-label="Open hero photograph"
        onClick={() => setOpen(true)}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover grayscale"
          loading="eager"
        />
      </button>
      <div className="pointer-events-none absolute inset-0 bg-charcoal/45" />
      <div className="relative z-10">{children}</div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4 text-ivory sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Hero image lightbox"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 border border-ivory/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition hover:border-ivory sm:right-8 sm:top-8"
            onClick={(event) => {
              event.stopPropagation();
              setOpen(false);
            }}
          >
            Close
          </button>
          <figure
            className="max-h-[86vh] max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[78vh] w-auto object-contain"
            />
            {image.caption ? (
              <figcaption className="mt-4 max-w-3xl text-sm leading-7 text-ivory/70">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        </div>
      ) : null}
    </section>
  );
}
