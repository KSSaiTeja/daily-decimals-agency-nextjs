"use client";

import { useFooterSectionAnimations } from "@/components/footer/footer-animations";
import { FooterCard } from "@/components/footer/footer-card";

/**
 * Site footer — dark card with nav columns, IST clock, and back-to-top.
 */
export function FooterSection() {
  const { sectionRef } = useFooterSectionAnimations();

  return (
    <footer
      ref={sectionRef}
      id="footer"
      data-footer-section
      aria-label="Site footer"
      className="footer-section"
    >
      <div className="footer-section__inner">
        <FooterCard />
      </div>
    </footer>
  );
}
