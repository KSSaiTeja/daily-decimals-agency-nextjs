"use client";

import { SectionHeadingOffset } from "@/components/section-heading";
import { useIndustriesSectionAnimations } from "@/components/industries/industries-animations";
import { IndustriesHeader } from "@/components/industries/industries-header";
import { IndustriesList } from "@/components/industries/industries-list";

/**
 * Industries grid below About — fluid layout with a responsive two-column list
 * inside a dark gradient panel.
 */
export function IndustriesSection() {
  const { sectionRef } = useIndustriesSectionAnimations();

  return (
    <section
      ref={sectionRef}
      id="industries"
      data-industries-section
      aria-label="Industries we serve"
      className="industries-section scroll-mt-8"
    >
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-[var(--page-gutter)] sm:gap-10 lg:gap-14">
        <IndustriesHeader />

        <div className="flex w-full items-start">
          <SectionHeadingOffset />
          <div data-industries-panel className="industries-panel relative min-w-0 flex-1">
            <div className="industries-panel__glow" aria-hidden />
            <div className="industries-panel__accent" aria-hidden />
            <div className="relative">
              <IndustriesList />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
