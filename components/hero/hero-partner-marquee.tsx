"use client";

import { HeroPartnerLogo } from "@/components/hero/hero-partner-logo";
import { PARTNER_LOGOS } from "@/components/hero/partner-logos-data";
import { usePreloaderReady } from "@/components/preloader";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

const PX_PER_SECOND = 52;
const LOGO_GAP = "1.75rem";

export function HeroPartnerMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const ready = usePreloaderReady();

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !ready) return;

    const firstSet = track.querySelector<HTMLElement>('[data-marquee-set="a"]');
    if (!firstSet) return;

    const run = () => {
      const distance = firstSet.getBoundingClientRect().width;
      if (distance <= 0) return;

      tweenRef.current?.kill();
      gsap.set(track, { x: 0 });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      tweenRef.current = gsap.to(track, {
        x: -distance,
        duration: distance / PX_PER_SECOND,
        ease: "none",
        repeat: -1,
        force3D: true,
      });
    };

    run();

    const ro = new ResizeObserver(run);
    ro.observe(firstSet);

    return () => {
      ro.disconnect();
      tweenRef.current?.kill();
    };
  }, [ready]);

  const logos = PARTNER_LOGOS.map((partner) => (
    <HeroPartnerLogo key={partner.src} partner={partner} />
  ));
  const setClass = "flex shrink-0 flex-nowrap items-center";
  const setStyle = { gap: LOGO_GAP } as const;

  return (
    <div className="relative h-10 w-full overflow-hidden sm:h-11 md:h-12 lg:h-[3.25rem]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-surface to-transparent sm:w-14 md:w-16"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface to-transparent sm:w-14 md:w-16"
      />
      <div
        ref={trackRef}
        className="flex h-full w-max flex-nowrap items-center will-change-transform"
        style={{ gap: LOGO_GAP }}
      >
        <div data-marquee-set="a" className={setClass} style={setStyle}>
          {logos}
        </div>
        <div data-marquee-set="b" className={setClass} style={setStyle} aria-hidden>
          {logos}
        </div>
      </div>
    </div>
  );
}
