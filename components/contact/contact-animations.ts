"use client";

import gsap from "gsap";
import { usePreloaderReady } from "@/components/preloader";
import { useLayoutEffect, useRef, useState } from "react";

const MOTION = {
  ease: "power2.out",
} as const;

const REVEAL_VISIBLE_RATIO = 0.12;
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

function shouldReveal(entry: IntersectionObserverEntry) {
  if (!entry.isIntersecting) return false;
  if (entry.intersectionRatio < REVEAL_VISIBLE_RATIO) return false;

  const rect = entry.boundingClientRect;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= vh * 0.78 && rect.bottom >= vh * 0.15;
}

export function useContactSectionAnimations() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = usePreloaderReady();
  const hasPlayedRef = useRef(false);
  const [emailMarqueeActive, setEmailMarqueeActive] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;

    let observer: IntersectionObserver | null = null;

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
        observer?.disconnect();
        observer = null;

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

      observer.observe(revealTarget);

      requestAnimationFrame(() => {
        const rect = revealTarget.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const inView =
          rect.top <= vh * 0.78 &&
          rect.bottom >= vh * 0.15 &&
          rect.height > 0 &&
          rect.bottom > 0 &&
          rect.top < vh;

        if (inView) {
          runTimeline();
        }
      });
    }, section);

    return () => {
      observer?.disconnect();
      ctx.revert();
      setEmailMarqueeActive(false);
    };
  }, [ready]);

  return { sectionRef, emailMarqueeActive };
}
