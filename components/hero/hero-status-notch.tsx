"use client";

import { BlurRevealWords, useFadeFromTop } from "@/components/hero/site-chrome";
import { iconPaths } from "@/lib/svg";

type HeroStatusNotchProps = {
  className?: string;
};

/** Availability pill — fixed flush to the viewport top, scales down on small screens. */
export function HeroStatusNotch({ className = "" }: HeroStatusNotchProps) {
  const ref = useFadeFromTop(0.12);

  return (
    <div
      ref={ref}
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center pt-[env(safe-area-inset-top,0px)] ${className}`.trim()}
      data-name="Notch"
      style={{ opacity: 0 }}
    >
      <div className="relative -mt-px h-7 w-[min(15.5rem,calc(100%-1.5rem))] sm:h-8 sm:w-[min(18rem,calc(100%-2rem))] md:h-9 md:w-[min(20rem,calc(100%-2rem))] lg:h-10 lg:w-[min(21.375rem,calc(100%-2.5rem))]">
        <svg
          className="absolute top-0 left-0 size-full"
          viewBox="0 0 342 36"
          fill="none"
          preserveAspectRatio="xMidYMin slice"
          aria-hidden
        >
          <path
            d={iconPaths.headerNotchShadow}
            fill="#0C0C0C"
            fillOpacity="0.82"
          />
        </svg>
        <span
          aria-hidden
          className="absolute top-1/2 left-[21%] size-1.5 -translate-y-1/2 rounded-full bg-[#61c554] sm:left-[22.5%] sm:size-2 md:left-[77px]"
        />
        <div className="absolute inset-[24%_20%_24%_26%] flex items-center overflow-hidden sm:inset-[22%_22%_22%_28%]">
          <BlurRevealWords
            text="Available for New Projects"
            className="font-['Inter:Regular',sans-serif] text-[11px] font-normal tracking-[-0.12px] text-white leading-4 sm:text-[12px] sm:leading-[18px] md:text-[13px] md:tracking-[-0.14px] lg:text-[14px] lg:leading-5"
            startDelay={0.72}
            stagger={0.075}
          />
        </div>
      </div>
    </div>
  );
}
