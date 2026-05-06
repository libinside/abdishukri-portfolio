"use client";

import { useEffect, useState } from "react";
import type { ImageAsset } from "@/content/types";

type LightboxGalleryProps = {
  images: ImageAsset[];
  className?: string;
};

type ClickableImageProps = {
  image: ImageAsset;
  className?: string;
  imageClassName?: string;
  captionClassName?: string;
  priority?: boolean;
};

export function ClickableImage({
  image,
  className = "",
  imageClassName = "",
  captionClassName = "",
  priority = false,
}: ClickableImageProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <figure className={className}>
        <button
          type="button"
          className="group block w-full cursor-zoom-in overflow-hidden bg-charcoal text-left"
          onClick={() => setActive(0)}
        >
          <img
            src={image.src}
            alt={image.alt}
            className={`image-hover h-full w-full object-cover ${imageClassName}`}
            loading={priority ? "eager" : "lazy"}
          />
        </button>
        {image.caption ? (
          <figcaption
            className={`mt-3 text-xs leading-6 text-charcoal/55 ${captionClassName}`}
          >
            {image.caption}
          </figcaption>
        ) : null}
      </figure>
      <LightboxModal
        images={[image]}
        activeIndex={active}
        setActiveIndex={setActive}
      />
    </>
  );
}

export function LightboxGallery({ images, className = "" }: LightboxGalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className={`grid gap-5 md:grid-cols-2 ${className}`}>
        {images.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className={index % 3 === 0 ? "md:col-span-2" : ""}
          >
            <button
              type="button"
              className={`group block w-full cursor-zoom-in overflow-hidden bg-charcoal text-left ${
                index % 3 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"
              }`}
              onClick={() => setActive(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="image-hover h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </button>
            {image.caption ? (
              <figcaption className="mt-3 text-xs leading-6 text-charcoal/55">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
      <LightboxModal
        images={images}
        activeIndex={active}
        setActiveIndex={setActive}
      />
    </>
  );
}

function LightboxModal({
  images,
  activeIndex,
  setActiveIndex,
}: {
  images: ImageAsset[];
  activeIndex: number | null;
  setActiveIndex: (value: number | null) => void;
}) {
  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const currentIndex = activeIndex;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((currentIndex + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((currentIndex - 1 + images.length) % images.length);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, images.length, setActiveIndex]);

  if (activeIndex === null) {
    return null;
  }

  const activeImage = images[activeIndex];

  if (!activeImage) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4 text-ivory sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={() => setActiveIndex(null)}
    >
      <button
        type="button"
        className="absolute right-4 top-4 border border-ivory/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition hover:border-ivory sm:right-8 sm:top-8"
        onClick={(event) => {
          event.stopPropagation();
          setActiveIndex(null);
        }}
      >
        Close
      </button>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            className="absolute left-4 top-1/2 h-12 w-12 -translate-y-1/2 border border-ivory/35 text-2xl transition hover:border-ivory sm:left-8"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex(
                (activeIndex - 1 + images.length) % images.length,
              );
            }}
          >
            {"<"}
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 h-12 w-12 -translate-y-1/2 border border-ivory/35 text-2xl transition hover:border-ivory sm:right-8"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex((activeIndex + 1) % images.length);
            }}
          >
            {">"}
          </button>
        </>
      ) : null}

      <figure
        className="max-h-[86vh] max-w-6xl"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className="max-h-[78vh] w-auto object-contain"
        />
        {activeImage.caption ? (
          <figcaption className="mt-4 max-w-3xl text-sm leading-7 text-ivory/70">
            {activeImage.caption}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}
