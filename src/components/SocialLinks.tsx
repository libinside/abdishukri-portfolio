import type { SocialLink } from "@/content/types";

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
  linkClassName?: string;
};

export function SocialLinks({
  links,
  className = "",
  linkClassName = "",
}: SocialLinksProps) {
  return (
    <div className={className}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.ariaLabel}
          className={linkClassName}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
