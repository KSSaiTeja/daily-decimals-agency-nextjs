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

const MOBILE_MARQUEE_QUERY = "(max-width: 767px)";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobileMarqueeHidden() {
  return window.matchMedia(MOBILE_MARQUEE_QUERY).matches;
}

type UseServicesSectionAnimationsOptions = {
  selectedTab: number;
};

export function useServicesSectionAnimations({
  selectedTab,
}: UseServicesSectionAnimationsOptions) {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = usePreloaderReady();
  const hasPlayedRef = useRef(false);
  const hasSelectionAnimRef = useRef(false);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;

    let disconnectReveal: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const chars = splitTitleLines(
        section,
        "[data-services-title-lead]",
        "[data-services-title-emphasis]",
        "services-char",
      );
      const eyebrow = section.querySelector<HTMLElement>("[data-services-eyebrow]");
      const titleLead = section.querySelector<HTMLElement>("[data-services-title-lead]");
      const titleEmphasis = section.querySelector<HTMLElement>("[data-services-title-emphasis]");
      const imageBox = section.querySelector<HTMLElement>("[data-services-image-box]");
      const tabs = section.querySelector<HTMLElement>("[data-services-tabs]");
      const marqueeTrack = section.querySelector<HTMLElement>("[data-services-marquee-track]");

      const setFinalState = () => {
        if (titleLead) gsap.set(titleLead, { autoAlpha: 1, y: 0 });
        if (titleEmphasis) gsap.set(titleEmphasis, { autoAlpha: 1, y: 0 });
        if (chars.length) gsap.set(chars, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (imageBox) gsap.set(imageBox, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" });
        if (tabs) gsap.set(tabs, { autoAlpha: 1, y: 0 });
      };

      const setInitialState = () => {
        if (titleLead) gsap.set(titleLead, { autoAlpha: 1, y: 0 });
        if (titleEmphasis) gsap.set(titleEmphasis, { autoAlpha: 1, y: 0 });
        if (chars.length) gsap.set(chars, { autoAlpha: 0, y: 14, filter: "blur(8px)" });
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 24, filter: "blur(4px)" });
        if (imageBox) gsap.set(imageBox, { autoAlpha: 0, y: 18, scale: 0.985, filter: "blur(12px)" });
        if (tabs) gsap.set(tabs, { autoAlpha: 0, y: 12 });
      };

      const startMarquee = () => {
        if (!marqueeTrack || prefersReducedMotion() || isMobileMarqueeHidden()) {
          marqueeTweenRef.current?.kill();
          marqueeTweenRef.current = null;
          return;
        }

        marqueeTweenRef.current?.kill();
        gsap.set(marqueeTrack, { xPercent: -50, autoAlpha: 1 });
        marqueeTweenRef.current = gsap.to(marqueeTrack, {
          xPercent: 0,
          duration: 96,
          ease: "sine.inOut",
          repeat: -1,
        });
      };

      const playReveal = () => {
        if (hasPlayedRef.current) return;
        hasPlayedRef.current = true;

        const tl = gsap.timeline({
          defaults: {
            ease: MOTION.easeSecondary,
            force3D: true,
            overwrite: "auto",
          },
        });

        if (chars.length) {
          tl.to(
            chars,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
              stagger: 0.075,
              ease: MOTION.easePrimary,
            },
            0,
          );
        }

        if (eyebrow) {
          tl.to(
            eyebrow,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.85,
              ease: MOTION.easePrimary,
            },
            0.2,
          );
        }

        if (tabs) {
          tl.to(
            tabs,
            { autoAlpha: 1, y: 0, duration: 0.6, ease: MOTION.easePrimary },
            0.26,
          );
        }

        if (imageBox) {
          tl.to(
            imageBox,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.95,
              ease: MOTION.easePrimary,
            },
            0.32,
          );
        }

        startMarquee();
      };

      if (prefersReducedMotion()) {
        setFinalState();
        startMarquee();
        return;
      }

      setInitialState();
      if (marqueeTrack) {
        gsap.set(marqueeTrack, { autoAlpha: 1 });
        startMarquee();
      }

      disconnectReveal = observeSectionReveal({
        target: section,
        onReveal: playReveal,
        hasRevealed: () => hasPlayedRef.current,
        bottomGate: 0.08,
      });

      const syncMarquee = () => {
        if (isMobileMarqueeHidden()) {
          marqueeTweenRef.current?.kill();
          marqueeTweenRef.current = null;
          return;
        }

        if (marqueeTrack) startMarquee();
      };

      const onScroll = () => {
        syncMarquee();
      };

      let resizeTimer: ReturnType<typeof setTimeout> | null = null;
      const onResize = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          syncMarquee();
          resizeTimer = null;
        }, 200);
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);

      return () => {
        disconnectReveal?.();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        if (resizeTimer) clearTimeout(resizeTimer);
        marqueeTweenRef.current?.kill();
      };
    }, section);

    return () => {
      disconnectReveal?.();
      marqueeTweenRef.current?.kill();
      ctx.revert();
    };
  }, [ready]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!hasSelectionAnimRef.current) {
      hasSelectionAnimRef.current = true;
      return;
    }

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const inBand = rect.top <= vh * 0.72 && rect.bottom >= vh * 0.32;
    if (!inBand) return;

    const imageBox = section.querySelector<HTMLElement>("[data-services-image-box]");
    const paragraph = section.querySelector<HTMLElement>("[data-services-paragraph]");
    const paragraphLines = section.querySelectorAll<HTMLElement>("[data-services-paragraph-line]");
    const tagCards = section.querySelectorAll<HTMLElement>("[data-services-tag-card]");

    if (!imageBox && !paragraph) return;

    if (prefersReducedMotion()) {
      if (imageBox) gsap.set(imageBox, { autoAlpha: 1, filter: "blur(0px)", y: 0 });
      if (paragraph) gsap.set(paragraph, { autoAlpha: 1, filter: "blur(0px)", y: 0 });
      paragraphLines.forEach((line) => gsap.set(line, { autoAlpha: 1, filter: "blur(0px)", y: 0 }));
      tagCards.forEach((card) => gsap.set(card, { autoAlpha: 1, filter: "blur(0px)", y: 0 }));
      return;
    }

    const fadeTargets = [imageBox, paragraph].filter(Boolean) as HTMLElement[];
    const tl = gsap.timeline({
      defaults: { ease: MOTION.easeSecondary, force3D: true, overwrite: "auto" },
    });

    tl.to(fadeTargets, { autoAlpha: 0, filter: "blur(10px)", y: 8, duration: 0.18 }, 0);

    if (paragraphLines.length) {
      tl.to(
        paragraphLines,
        { autoAlpha: 0, filter: "blur(8px)", y: 10, duration: 0.16, stagger: 0.03 },
        0,
      );
    }

    if (tagCards.length) {
      tl.to(
        tagCards,
        { autoAlpha: 0, filter: "blur(8px)", y: 10, duration: 0.22, stagger: 0.05 },
        0,
      );
    }

    tl.to(fadeTargets, { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: 0.42 }, 0.2);

    if (paragraphLines.length) {
      tl.to(
        paragraphLines,
        { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: 0.34, stagger: 0.06 },
        0.24,
      );
    }

    if (tagCards.length) {
      tl.to(
        tagCards,
        { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: 0.5, stagger: 0.08 },
        0.26,
      );
    }
  }, [selectedTab]);

  return { sectionRef };
}
