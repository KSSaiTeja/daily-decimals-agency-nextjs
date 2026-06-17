"use client";

import gsap from "gsap";
import { observeSectionReveal } from "@/lib/animation/section-reveal";
import { usePreloaderReady } from "@/components/preloader";
import { useLayoutEffect, useRef } from "react";

const MOTION = {
  ease: "power2.out",
} as const;

const REVEAL_VISIBLE_RATIO = 0.04;
const REVEAL_ROOT_MARGIN = "0px 0px -5% 0px";

const REVEAL_FROM = {
  autoAlpha: 0,
  y: 24,
  filter: "blur(8px)",
} as const;

const REVEAL_TO = {
  autoAlpha: 1,
  y: 0,
  filter: "blur(0px)",
} as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useFooterSectionAnimations() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = usePreloaderReady();
  const hasPlayedRef = useRef(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;

    let disconnectReveal: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const revealItems = section.querySelectorAll<HTMLElement>("[data-footer-animate]");

      const reduce = prefersReducedMotion();

      if (reduce) {
        gsap.set(revealItems, REVEAL_TO);
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
              duration: 0.88,
              force3D: true,
              overwrite: "auto",
            },
          })
          .to(revealItems, { ...REVEAL_TO, stagger: 0.11 }, 0);
      };

      disconnectReveal = observeSectionReveal({
        target: section,
        onReveal: runTimeline,
        hasRevealed: () => hasPlayedRef.current,
        rootMargin: REVEAL_ROOT_MARGIN,
        minVisibleRatio: 0.04,
      });

      const failSafeId = window.setTimeout(() => {
        if (!hasPlayedRef.current) {
          gsap.set(revealItems, REVEAL_TO);
          hasPlayedRef.current = true;
        }
      }, 2500);

      return () => {
        window.clearTimeout(failSafeId);
      };
    }, section);

    return () => {
      disconnectReveal?.();
      ctx.revert();
    };
  }, [ready]);

  return { sectionRef };
}
