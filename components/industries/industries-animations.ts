"use client";

import gsap from "gsap";
import { splitTitleLines } from "@/lib/animation/split-chars";
import { observeSectionReveal } from "@/lib/animation/section-reveal";
import { usePreloaderReady } from "@/components/preloader";
import { useLayoutEffect, useRef } from "react";

const MOTION = {
  easePrimary: "power4.out",
  easeSecondary: "power3.out",
} as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useIndustriesSectionAnimations() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = usePreloaderReady();
  const hasPlayedRef = useRef(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;

    let disconnectReveal: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const panel = section.querySelector<HTMLElement>("[data-industries-panel]");
      const eyebrow = section.querySelector<HTMLElement>("[data-industries-eyebrow]");
      const titleLead = section.querySelector<HTMLElement>("[data-industries-title-lead]");
      const titleEmphasis = section.querySelector<HTMLElement>(
        "[data-industries-title-emphasis]",
      );
      const subtitle = section.querySelector<HTMLElement>("[data-industries-subtitle]");
      const rows = section.querySelectorAll<HTMLElement>("[data-industry-row]");

      const chars = splitTitleLines(
        section,
        "[data-industries-title-lead]",
        "[data-industries-title-emphasis]",
        "industries-char",
      );

      const setFinalState = () => {
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 1, y: 0 });
        if (chars.length) gsap.set(chars, { autoAlpha: 1, y: 0 });
        if (subtitle) gsap.set(subtitle, { autoAlpha: 1, y: 0 });
        if (panel) gsap.set(panel, { autoAlpha: 1, y: 0 });
        if (rows.length) gsap.set(rows, { autoAlpha: 1, x: 0 });
      };

      const setInitialState = () => {
        if (titleLead) gsap.set(titleLead, { autoAlpha: 1, y: 0 });
        if (titleEmphasis) gsap.set(titleEmphasis, { autoAlpha: 1, y: 0 });
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 10 });
        if (chars.length) gsap.set(chars, { autoAlpha: 0, y: 16 });
        if (subtitle) gsap.set(subtitle, { autoAlpha: 0, y: 12 });
        if (panel) gsap.set(panel, { autoAlpha: 0, y: 28 });
        if (rows.length) gsap.set(rows, { autoAlpha: 0, x: 18 });
      };

      const playReveal = () => {
        if (hasPlayedRef.current) return;
        hasPlayedRef.current = true;

        const tl = gsap.timeline({
          defaults: { ease: MOTION.easePrimary, overwrite: "auto" },
        });

        const headingTargets = [eyebrow, ...(chars.length ? chars : [])].filter(
          Boolean,
        ) as HTMLElement[];

        if (headingTargets.length) {
          tl.fromTo(
            headingTargets,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.56, stagger: 0.018 },
            0,
          );
        }

        if (subtitle) {
          tl.fromTo(
            subtitle,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.46, ease: MOTION.easeSecondary },
            0.1,
          );
        }

        if (panel) {
          tl.fromTo(
            panel,
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: MOTION.easeSecondary },
            0.14,
          );
        }

        if (rows.length) {
          tl.fromTo(
            rows,
            { autoAlpha: 0, x: 18 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.58,
              stagger: 0.05,
              ease: MOTION.easeSecondary,
            },
            0.22,
          );
        }
      };

      if (prefersReducedMotion()) {
        setFinalState();
        return;
      }

      setInitialState();

      disconnectReveal = observeSectionReveal({
        target: section,
        onReveal: playReveal,
        hasRevealed: () => hasPlayedRef.current,
      });

      return () => disconnectReveal?.();
    }, section);

    return () => {
      disconnectReveal?.();
      ctx.revert();
    };
  }, [ready]);

  return { sectionRef };
}
