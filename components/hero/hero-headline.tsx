"use client";

import { useRevealFromBottom } from "@/components/hero/site-chrome";
import { useRef } from "react";

const headlineSize =
  "text-[clamp(1.85rem,7.7vw,3.25rem)] leading-[1.2] sm:leading-[1.12] lg:text-[4rem] xl:text-[4.375rem]";

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
      <div data-hero-line className="mb-[0.06em] w-full min-w-0 overflow-hidden sm:mb-[-0.1em]">
        <div data-hero-line-content className={lineOne}>
          <p className="whitespace-nowrap">Design That Inspires,</p>
        </div>
      </div>

      <div data-hero-line className="w-full min-w-0">
        <div data-hero-line-content className={lineTwo}>
          <p className="whitespace-nowrap" aria-label="Content That Converts">
            Content That C
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/hero-images/O-pattern.svg"
              aria-hidden
              draggable={false}
              className="pointer-events-none inline-block h-[1.1em] w-[1.1em] align-[-0.22em]"
            />
            nverts
          </p>
        </div>
      </div>
    </div>
  );
}
