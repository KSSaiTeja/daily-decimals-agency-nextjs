"use client";

import gsap from "gsap";
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

function shouldReveal(entry: IntersectionObserverEntry) {
  if (!entry.isIntersecting) return false;
  if (entry.intersectionRatio < REVEAL_VISIBLE_RATIO) return false;

  const rect = entry.boundingClientRect;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.bottom > 0 && rect.top < vh;
}

export function useFooterSectionAnimations() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = usePreloaderReady();
  const hasPlayedRef = useRef(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;

    let observer: IntersectionObserver | null = null;
    let failSafeId: number | null = null;

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
        observer?.disconnect();
        observer = null;

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

      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry || !shouldReveal(entry)) return;
          runTimeline();
        },
        {
          root: null,
          rootMargin: REVEAL_ROOT_MARGIN,
          threshold: [0, 0.06, REVEAL_VISIBLE_RATIO, 0.2, 0.35],
        },
      );

      observer.observe(section);

      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const inView = rect.bottom > 0 && rect.top < vh && rect.height > 0;

        if (inView) {
          runTimeline();
        }
      });

      failSafeId = window.setTimeout(() => {
        if (!hasPlayedRef.current) {
          gsap.set(revealItems, REVEAL_TO);
          hasPlayedRef.current = true;
        }
      }, 2500);
    }, section);

    return () => {
      observer?.disconnect();
      if (failSafeId !== null) window.clearTimeout(failSafeId);
      ctx.revert();
    };
  }, [ready]);

  return { sectionRef };
}
