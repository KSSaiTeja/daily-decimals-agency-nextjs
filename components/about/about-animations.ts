"use client";

import gsap from "gsap";
import { usePreloaderReady } from "@/components/preloader";
import { useLayoutEffect, useRef } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function formatCounterValue(value: number) {
  return String(Math.round(value));
}

const MOTION = {
  easePrimary: "power4.out",
  easeSecondary: "power3.out",
  easeSoft: "power2.out",
  wordStagger: 0.055,
} as const;

function prepareYearChars(el: HTMLElement) {
  if (el.querySelector("[data-about-year-char]")) return;
  const raw = (el.textContent ?? "").trim();
  if (!raw) return;
  el.textContent = "";
  for (const ch of raw) {
    const span = document.createElement("span");
    span.dataset.aboutYearChar = "true";
    span.textContent = ch;
    span.style.display = "inline-block";
    el.appendChild(span);
  }
}

/** Wraps each word in an inline-block span so it can be revealed individually. */
function splitWords(el: HTMLElement): HTMLElement[] {
  const existing = el.querySelectorAll<HTMLElement>("[data-about-word]");
  if (existing.length) return Array.from(existing);

  const raw = (el.textContent ?? "").replace(/\s+/g, " ").trim();
  if (!raw) return [];

  el.textContent = "";
  const words = raw.split(" ");
  const spans: HTMLElement[] = [];

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.dataset.aboutWord = "true";
    span.textContent = word;
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity, filter";
    el.appendChild(span);
    spans.push(span);
    if (index < words.length - 1) {
      el.appendChild(document.createTextNode(" "));
    }
  });

  return spans;
}

export function useAboutSectionAnimations() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = usePreloaderReady();
  const hasPlayedRef = useRef(false);
  const hasPlayedCtaRef = useRef(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;
    let rafId = 0;

    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const hey = section.querySelector<HTMLElement>("[data-about-hey]");
      const year = section.querySelector<HTMLElement>("[data-about-year]");
      const paragraphs = section.querySelectorAll<HTMLElement>("[data-about-paragraph]");
      const cards = section.querySelectorAll<HTMLElement>("[data-about-stat-card]");
      const counters = section.querySelectorAll<HTMLElement>("[data-about-counter-target]");
      const cta = section.querySelector<HTMLElement>("[data-about-cta]");
      const slots = section.querySelector<HTMLElement>("[data-about-slots]");
      const mediaRows = section.querySelectorAll<HTMLElement>(
        '[data-name="peopleimgs"], [data-name="projectimgs"]',
      );
      const avatarGroups = section.querySelectorAll<HTMLElement>(
        '[data-name="rounds"], [data-name="squares"]',
      );
      const connectorLines = section.querySelectorAll<HTMLElement>('[data-name="line"]');
      const decorNodes = section.querySelectorAll<HTMLElement>('[data-name="decor1"]');

      const lead = section.querySelector<HTMLElement>("[data-about-lead]");

      if (year) prepareYearChars(year);
      const yearChars = year?.querySelectorAll<HTMLElement>("[data-about-year-char]") ?? [];

      if (reduce) {
        if (hey) gsap.set(hey, { autoAlpha: 1, y: 0 });
        if (yearChars.length) gsap.set(yearChars, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (lead) gsap.set(lead, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (paragraphs.length) gsap.set(paragraphs, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (cards.length) gsap.set(cards, { autoAlpha: 1, y: 0 });
        if (cta) gsap.set(cta, { autoAlpha: 1, x: 0 });
        if (slots) gsap.set(slots, { autoAlpha: 1, x: 0 });
        if (mediaRows.length) gsap.set(mediaRows, { autoAlpha: 1, y: 0 });
        if (avatarGroups.length) gsap.set(avatarGroups, { autoAlpha: 1, y: 0, scale: 1 });
        if (connectorLines.length) gsap.set(connectorLines, { autoAlpha: 1, scaleX: 1 });
        if (decorNodes.length) gsap.set(decorNodes, { autoAlpha: 1, x: 0 });
        counters.forEach((counter) => {
          const target = Number(counter.dataset.aboutCounterTarget ?? "0");
          counter.textContent = formatCounterValue(target);
        });
        return;
      }

      const leadWords = lead ? splitWords(lead) : [];
      const bodyWords: HTMLElement[] = [];
      paragraphs.forEach((paragraph) => {
        splitWords(paragraph).forEach((word) => bodyWords.push(word));
      });

      if (hey) gsap.set(hey, { autoAlpha: 0, y: 18, filter: "blur(5px)" });
      if (yearChars.length) gsap.set(yearChars, { autoAlpha: 0, y: 12, filter: "blur(5px)" });
      if (lead) gsap.set(lead, { autoAlpha: 1 });
      if (paragraphs.length) gsap.set(paragraphs, { autoAlpha: 1 });
      if (leadWords.length) gsap.set(leadWords, { autoAlpha: 0, y: 16, filter: "blur(8px)" });
      if (bodyWords.length) gsap.set(bodyWords, { autoAlpha: 0, y: 10, filter: "blur(4px)" });
      if (cards.length) gsap.set(cards, { autoAlpha: 0, y: 24, filter: "blur(4px)" });
      if (mediaRows.length) gsap.set(mediaRows, { autoAlpha: 0, y: 20, filter: "blur(3px)" });
      if (avatarGroups.length) gsap.set(avatarGroups, { autoAlpha: 0, y: 10, scale: 0.96 });
      if (connectorLines.length) {
        gsap.set(connectorLines, { autoAlpha: 0, scaleX: 0, transformOrigin: "0% 50%" });
      }
      if (decorNodes.length) gsap.set(decorNodes, { autoAlpha: 0, x: -12 });
      if (cta) gsap.set(cta, { autoAlpha: 0, x: -260, filter: "blur(3px)" });
      if (slots) gsap.set(slots, { autoAlpha: 0, x: 36, filter: "blur(2px)" });

      const runAboutTimeline = () => {
        if (hasPlayedRef.current) return;
        hasPlayedRef.current = true;

        const tl = gsap.timeline({
          defaults: {
            ease: MOTION.easeSecondary,
            force3D: true,
            overwrite: "auto",
          },
        });

        if (hey) {
          tl.to(
            hey,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.95,
              ease: MOTION.easePrimary,
            },
            0,
          );
        }

        if (yearChars.length) {
          tl.to(
            yearChars,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.72,
              stagger: 0.09,
              ease: MOTION.easePrimary,
            },
            0.08,
          );
        }

        if (leadWords.length) {
          tl.to(
            leadWords,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.66,
              stagger: 0.026,
              ease: MOTION.easePrimary,
            },
            0.12,
          );
        }

        if (bodyWords.length) {
          tl.to(
            bodyWords,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.5,
              stagger: 0.009,
              ease: MOTION.easeSoft,
            },
            0.5,
          );
        }

        if (mediaRows.length) {
          tl.to(
            mediaRows,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.95,
              stagger: 0.12,
              ease: MOTION.easePrimary,
            },
            0.55,
          );
        }

        if (avatarGroups.length) {
          tl.to(
            avatarGroups,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.82,
              stagger: 0.08,
              ease: MOTION.easeSoft,
            },
            0.62,
          );
        }

        if (connectorLines.length) {
          tl.to(
            connectorLines,
            {
              autoAlpha: 0.5,
              scaleX: 1,
              duration: 0.72,
              stagger: 0.05,
              ease: MOTION.easeSoft,
            },
            0.7,
          );
        }

        if (decorNodes.length) {
          tl.to(
            decorNodes,
            {
              autoAlpha: 0.45,
              x: 0,
              duration: 0.68,
              stagger: 0.05,
              ease: MOTION.easeSoft,
            },
            0.72,
          );
        }

        if (cards.length) {
          tl.to(
            cards,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              stagger: 0.1,
              ease: MOTION.easePrimary,
            },
            0.74,
          );
        }

        counters.forEach((counter, index) => {
          const target = Number(counter.dataset.aboutCounterTarget ?? "0");
          const min = Math.max(0, Math.floor(target * 0.18));
          const max = Math.max(min + 1, Math.ceil(target * 1.65));
          const start = min + Math.floor(Math.random() * (max - min));
          const state = { value: start };

          gsap.to(state, {
            value: target,
            duration: 2.15 + index * 0.14,
            ease: MOTION.easePrimary,
            delay: 1.05,
            onUpdate: () => {
              counter.textContent = formatCounterValue(state.value);
            },
          });
        });
      };

      const runCtaTimeline = () => {
        if (hasPlayedCtaRef.current) return;
        hasPlayedCtaRef.current = true;
        if (!cta && !slots) return;

        const ctaTl = gsap.timeline({
          defaults: {
            ease: MOTION.easeSecondary,
            force3D: true,
            overwrite: "auto",
          },
        });

        if (cta) {
          ctaTl.to(
            cta,
            {
              autoAlpha: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.02,
              ease: MOTION.easePrimary,
            },
            0,
          );
        }

        if (slots) {
          ctaTl.to(
            slots,
            {
              autoAlpha: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.72,
              ease: MOTION.easeSoft,
            },
            0.38,
          );
        }
      };

      const evaluateInView = () => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const enteredViewportBand =
          rect.top <= vh * 0.72 && rect.bottom >= vh * 0.28;

        if (enteredViewportBand) {
          runAboutTimeline();
        }

        if (!hasPlayedCtaRef.current && cta) {
          const ctaRect = cta.getBoundingClientRect();
          const ctaInBand =
            ctaRect.top <= vh * 0.86 && ctaRect.bottom >= vh * 0.46;
          if (ctaInBand) {
            runCtaTimeline();
          }
        }
      };

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
      ctx.revert();
    };
  }, [ready]);

  return { sectionRef };
}
