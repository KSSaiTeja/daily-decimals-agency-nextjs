"use client";

import { useAboutSectionAnimations } from "@/components/about/about-animations";
import { AboutAuditCta } from "@/components/about/about-audit-cta";
import { AboutStatCard } from "@/components/about/about-stat-card";
import {
  ABOUT_EYEBROW,
  ABOUT_SLOGAN,
  ABOUT_STATS,
} from "@/components/about/data";

/**
 * About block below the ribbon — fluid layout with a responsive four-stat row.
 */
export function AboutSection() {
  const { sectionRef } = useAboutSectionAnimations();

  return (
    <section
      ref={sectionRef}
      id="about"
      data-about-section
      aria-label="About"
      className="about-section scroll-mt-8"
    >
      <div className="mx-auto flex w-full max-w-[90rem] flex-col items-center gap-8 px-[var(--page-gutter)] pt-[clamp(2rem,5vh,3rem)] sm:gap-10 lg:gap-12">
        <p data-about-hey className="type-eyebrow text-center normal-case">
          {ABOUT_EYEBROW}
        </p>

        <div className="about-panel w-full">
          <div className="flex flex-col gap-10 sm:gap-12 lg:gap-[4.875rem]">
            <div className="about-slogan flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-4 xl:gap-5">
              <div className="flex shrink-0 items-end justify-start lg:w-[clamp(7rem,18vw,14.5rem)] lg:justify-end lg:pt-1.5">
                <p
                  data-about-year
                  className="type-kicker text-brand opacity-80 normal-case tracking-[-0.03em]"
                >
                  {ABOUT_SLOGAN.year}
                </p>
              </div>

              <p
                data-about-word-reveal
                className="type-prose min-w-0 max-w-[56.25rem] flex-1"
              >
                {ABOUT_SLOGAN.prose}
              </p>
            </div>

            <div className="flex flex-col gap-8 lg:gap-10">
              <div className="about-stats">
                {ABOUT_STATS.map((stat) => (
                  <AboutStatCard key={stat.title} stat={stat} />
                ))}
              </div>

              <AboutAuditCta />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
