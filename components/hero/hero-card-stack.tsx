"use client";

import { HeroCardStackDeck } from "@/components/hero/hero-card-stack-deck";

/** One 3D GSAP deck on every breakpoint — scaled to fit the column. */
export function HeroCardStack() {
  return (
    <div className="flex h-full min-h-[inherit] w-full items-start justify-center overflow-visible lg:items-center lg:justify-center">
      <div className="relative h-[30rem] w-full max-w-[52rem] overflow-visible origin-top scale-[0.82] min-[400px]:h-[31rem] min-[400px]:scale-[0.88] min-[480px]:scale-[0.94] sm:h-[32rem] sm:scale-[1] md:scale-[0.92] lg:h-[31rem] lg:max-w-[56rem] lg:origin-center lg:scale-[1.06] lg:translate-x-[2%] xl:h-[33rem] xl:max-w-[58rem] xl:scale-[1.12] xl:translate-x-[1%]">
        <HeroCardStackDeck className="size-full min-h-[inherit]" />
      </div>
    </div>
  );
}
