"use client";

import { useAdvantagesSectionAnimations } from "@/components/advantages/advantages-animations";
import { AdvantagesBento } from "@/components/advantages/advantages-bento";
import { AdvantagesHeader } from "@/components/advantages/advantages-header";

/**
 * Why choose us — responsive bento grid of client advantages below Services.
 */
export function AdvantagesSection() {
  const { sectionRef } = useAdvantagesSectionAnimations();

  return (
    <section
      ref={sectionRef}
      id="advantages"
      data-advantages-section
      aria-label="Why choose us"
      className="advantages-section scroll-mt-8"
    >
      <div className="advantages-section__inner">
        <AdvantagesHeader />
        <AdvantagesBento />
      </div>
    </section>
  );
}
