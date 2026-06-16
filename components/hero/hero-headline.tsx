"use client";

import { useRevealFromBottom } from "@/components/hero/site-chrome";
import { heroGenerationO } from "@/lib/images/urls";
import { useRef } from "react";

const headlineSize =
  "text-[clamp(1.65rem,7.4vw,3.25rem)] leading-[1.02] lg:text-[4rem] xl:text-[4.375rem]";

export function HeroHeadline() {
  const ref = useRef<HTMLDivElement>(null);
  useRevealFromBottom(ref, { delay: 0, stagger: 0.16 });

  const lineOne = `font-['Inter:Light',sans-serif] ${headlineSize} font-light tracking-[-0.05em] text-ink-muted`;
  const lineTwo = `font-['Inter:Semibold',sans-serif] ${headlineSize} font-semibold tracking-[-0.04em] text-ink-muted`;

  return (
    <div
      ref={ref}
      className="flex w-full min-w-0 flex-col items-start text-left"
      data-name="Hero Headline"
    >
      <div data-hero-line className="mb-[-0.28em] w-full min-w-0 overflow-hidden sm:mb-[-0.32em]">
        <div data-hero-line-content className={lineOne}>
          <p className="whitespace-nowrap">Switch up to</p>
        </div>
      </div>

      <div data-hero-line className="w-full min-w-0">
        <div data-hero-line-content className={lineTwo}>
          <p className="whitespace-nowrap" aria-label="next generation era">
            next generati
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={heroGenerationO}
              aria-hidden
              draggable={false}
              className="pointer-events-none inline-block h-[0.92em] w-[0.78em] align-[-0.13em]"
            />
            n era
          </p>
        </div>
      </div>
    </div>
  );
}
