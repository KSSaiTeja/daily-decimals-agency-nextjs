"use client";

import gsap from "gsap";
import { splitTitleLines } from "@/lib/animation/split-chars";
import { usePreloaderReady } from "@/components/preloader";
import { useCallback, useLayoutEffect, useRef, type RefObject } from "react";

const MOTION = {
  easePrimary: "power4.out",
  easeSecondary: "power3.out",
  easeSoft: "power2.out",
} as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type UseTestimonialsSectionAnimationsOptions = {
  slideRef: RefObject<HTMLDivElement | null>;
};

export function useTestimonialsSectionAnimations({
  slideRef,
}: UseTestimonialsSectionAnimationsOptions) {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = usePreloaderReady();
  const hasRevealedRef = useRef(false);
  const slideTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;

    let rafId = 0;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>("[data-testimonials-eyebrow]");
      const titleLead = section.querySelector<HTMLElement>("[data-testimonials-title-lead]");
      const titleEmphasis = section.querySelector<HTMLElement>(
        "[data-testimonials-title-emphasis]",
      );
      const subtitle = section.querySelector<HTMLElement>("[data-testimonials-subtitle]");
      const titleChars = splitTitleLines(
        section,
        "[data-testimonials-title-lead]",
        "[data-testimonials-title-emphasis]",
        "testimonials-char",
      );
      const slide = slideRef.current;
      const person = slide?.querySelector<HTMLElement>("[data-testimonials-person]");
      const copy = slide?.querySelector<HTMLElement>("[data-testimonials-copy]");
      const nav = section.querySelector<HTMLElement>("[data-testimonials-nav]");

      const setFinalState = () => {
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (titleChars.length) gsap.set(titleChars, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (subtitle) gsap.set(subtitle, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (slide) gsap.set(slide, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (person) gsap.set(person, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (copy) gsap.set(copy, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (nav) gsap.set(nav, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
      };

      const setInitialState = () => {
        if (titleLead) gsap.set(titleLead, { autoAlpha: 1, y: 0 });
        if (titleEmphasis) gsap.set(titleEmphasis, { autoAlpha: 1, y: 0 });
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 10, filter: "blur(8px)" });
        if (titleChars.length) gsap.set(titleChars, { autoAlpha: 0, y: 14, filter: "blur(8px)" });
        if (subtitle) gsap.set(subtitle, { autoAlpha: 0, y: 12, filter: "blur(6px)" });
        if (slide) gsap.set(slide, { autoAlpha: 1, y: 0 });
        if (person) gsap.set(person, { autoAlpha: 0, y: 18, filter: "blur(10px)" });
        if (copy) gsap.set(copy, { autoAlpha: 0, y: 22, filter: "blur(12px)" });
        if (nav) gsap.set(nav, { autoAlpha: 0, y: 10, filter: "blur(4px)" });
      };

      const runReveal = () => {
        if (hasRevealedRef.current) return;
        hasRevealedRef.current = true;

        const tl = gsap.timeline({
          defaults: {
            ease: MOTION.easeSecondary,
            force3D: true,
            overwrite: "auto",
          },
        });

        if (eyebrow) {
          tl.to(
            eyebrow,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.72,
              ease: MOTION.easePrimary,
            },
            0,
          );
        }

        if (titleChars.length) {
          tl.to(
            titleChars,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.56,
              stagger: 0.016,
              ease: MOTION.easePrimary,
            },
            0.06,
          );
        }

        if (subtitle) {
          tl.to(
            subtitle,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.82,
              ease: MOTION.easePrimary,
            },
            0.14,
          );
        }

        if (person) {
          tl.to(
            person,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.95,
              ease: MOTION.easePrimary,
            },
            0.22,
          );
        }

        if (copy) {
          tl.to(
            copy,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.05,
              ease: MOTION.easePrimary,
            },
            0.34,
          );
        }

        if (nav) {
          tl.to(
            nav,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.72,
              ease: MOTION.easeSoft,
            },
            0.48,
          );
        }
      };

      const evaluateInView = () => {
        if (hasRevealedRef.current) return;

        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const inBand = rect.top <= vh * 0.72 && rect.bottom >= vh * 0.28;

        if (inBand) runReveal();
      };

      if (prefersReducedMotion()) {
        setFinalState();
        return;
      }

      setInitialState();

      const onScrollOrResize = () => {
        if (rafId) return;
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          evaluateInView();
        });
      };

      window.addEventListener("scroll", onScrollOrResize, { passive: true });
      window.addEventListener("resize", onScrollOrResize);
      evaluateInView();

      return () => {
        if (rafId) window.cancelAnimationFrame(rafId);
        window.removeEventListener("scroll", onScrollOrResize);
        window.removeEventListener("resize", onScrollOrResize);
      };
    }, section);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      slideTweenRef.current?.kill();
      ctx.revert();
    };
  }, [ready, slideRef]);

  const animateTestimonialSlide = useCallback(() => {
    const slide = slideRef.current;
    if (!slide) return;

    slideTweenRef.current?.kill();

    if (prefersReducedMotion()) {
      gsap.set(slide, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(slide, { autoAlpha: 0, y: 28 });
    slideTweenRef.current = gsap.to(slide, {
      autoAlpha: 1,
      y: 0,
      duration: 0.78,
      ease: MOTION.easePrimary,
      overwrite: "auto",
      force3D: true,
    });
  }, [slideRef]);

  return { sectionRef, animateTestimonialSlide };
}
