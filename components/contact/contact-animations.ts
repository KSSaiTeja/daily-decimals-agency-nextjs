"use client";

import gsap from "gsap";
import { observeSectionReveal } from "@/lib/animation/section-reveal";
import { usePreloaderReady } from "@/components/preloader";
import { useLayoutEffect, useRef, useState } from "react";

const MOTION = {
  ease: "power2.out",
} as const;

const REVEAL_ROOT_MARGIN = "-8% 0px -12% 0px";

const REVEAL_FROM = {
  autoAlpha: 0,
  y: 20,
  filter: "blur(7px)",
} as const;

const REVEAL_TO = {
  autoAlpha: 1,
  y: 0,
  filter: "blur(0px)",
} as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useContactSectionAnimations() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = usePreloaderReady();
  const hasPlayedRef = useRef(false);
  const [emailMarqueeActive, setEmailMarqueeActive] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;

    let disconnectReveal: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const revealTarget =
        section.querySelector<HTMLElement>("[data-contact-reveal-target]") ?? section;
      const revealItems = section.querySelectorAll<HTMLElement>("[data-contact-animate]");

      const reduce = prefersReducedMotion();

      if (reduce) {
        gsap.set(revealItems, REVEAL_TO);
        setEmailMarqueeActive(true);
        return;
      }

      gsap.set(revealItems, REVEAL_FROM);

      const runTimeline = () => {
        if (hasPlayedRef.current) return;
        hasPlayedRef.current = true;

        gsap
          .timeline({
            defaults: {
              ease: MOTION.ease,
              duration: 0.82,
              force3D: true,
              overwrite: "auto",
            },
            onComplete: () => setEmailMarqueeActive(true),
          })
          .to(revealItems, { ...REVEAL_TO, stagger: 0.09 }, 0);
      };

      disconnectReveal = observeSectionReveal({
        target: revealTarget,
        onReveal: runTimeline,
        hasRevealed: () => hasPlayedRef.current,
        rootMargin: REVEAL_ROOT_MARGIN,
      });
    }, section);

    return () => {
      disconnectReveal?.();
      ctx.revert();
      setEmailMarqueeActive(false);
    };
  }, [ready]);

  return { sectionRef, emailMarqueeActive };
}
