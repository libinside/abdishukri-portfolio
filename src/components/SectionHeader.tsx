import Link from "next/link";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkText?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkText,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 border-t border-charcoal/15 pt-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="kicker">{eyebrow}</p>
        <h2 className="section-title mt-3">{title}</h2>
        {description ? <p className="body-copy mt-5">{description}</p> : null}
      </div>
      {href && linkText ? (
        <Link
          href={href}
          className="w-fit border-b border-charcoal pb-1 text-xs font-semibold uppercase tracking-[0.22em] transition hover:opacity-60"
        >
          {linkText}
        </Link>
      ) : null}
    </div>
  );
}
