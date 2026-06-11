import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell">
      <div className="max-w-3xl">
        <p className="kicker">Not Found</p>
        <h1 className="display-title mt-5">This page is not in the edit.</h1>
        <p className="body-copy mt-7">
          The page may have moved, or the frame may have been left out of the
          final sequence.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block border border-charcoal px-5 py-4 text-xs font-semibold uppercase tracking-[0.22em] transition hover:bg-charcoal hover:text-ivory"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
