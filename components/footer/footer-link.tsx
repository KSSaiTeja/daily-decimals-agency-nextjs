"use client";

import type { FooterLinkItem } from "@/components/footer/data";
import { scrollToSection } from "@/lib/navigation/scroll-to-section";
import type { MouseEvent } from "react";

type FooterLinkProps = {
  link: FooterLinkItem;
};

export function FooterLink({ link }: FooterLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!link.sectionId) return;

    event.preventDefault();
    scrollToSection(link.sectionId);
  };

  return (
    <a
      href={link.href}
      className="footer-link group"
      onClick={handleClick}
      {...(link.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      <span className="footer-link__label">{link.label}</span>
      <span aria-hidden className="footer-link__underline" />
    </a>
  );
}
