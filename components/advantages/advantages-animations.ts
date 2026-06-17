"use client";

import gsap from "gsap";
import { splitTitleLines } from "@/lib/animation/split-chars";
import { observeSectionReveal } from "@/lib/animation/section-reveal";
import { usePreloaderReady } from "@/components/preloader";
import { useLayoutEffect, useRef } from "react";

const MOTION = {
  easePrimary: "power4.out",
  easeSecondary: "power3.out",
  easeSoft: "power2.out",
} as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function splitWords(el: HTMLElement) {
  if (el.querySelector("[data-advantages-word]")) return;
  const raw = (el.textContent ?? "").replace(/\s+/g, " ").trim();
  if (!raw) return;

  const words = raw.split(" ");
  el.textContent = "";
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.dataset.advantagesWord = "true";
    span.textContent = word;
    span.style.display = "inline-block";
    span.style.whiteSpace = "pre";
    el.appendChild(span);
    if (index < words.length - 1) {
      el.appendChild(document.createTextNode(" "));
    }
  });
}

function randomDirection(index: number) {
  const pool = ["left", "right", "bottom"] as const;
  return pool[index % pool.length];
}

export function useAdvantagesSectionAnimations() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = usePreloaderReady();
  const hasPlayedRef = useRef(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;

    let disconnectReveal: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>("[data-advantages-eyebrow]");
      const titleLead = section.querySelector<HTMLElement>("[data-advantages-title-lead]");
      const titleEmphasis = section.querySelector<HTMLElement>("[data-advantages-title-emphasis]");
      const subtitle = section.querySelector<HTMLElement>("[data-advantages-subtitle]");
      const bento = section.querySelector<HTMLElement>("[data-advantages-bento]");
      const imageNodes = section.querySelectorAll<HTMLElement>("[data-advantages-image]");
      const wordGroups = section.querySelectorAll<HTMLElement>("[data-advantages-word-group]");

      const chars = splitTitleLines(
        section,
        "[data-advantages-title-lead]",
        "[data-advantages-title-emphasis]",
        "advantages-char",
      );

      wordGroups.forEach((group) => {
        const lines = group.querySelectorAll<HTMLElement>("p, h3");
        lines.forEach((line) => splitWords(line));
      });

      const firstSplitGroup = section.querySelector<HTMLElement>(
        '[data-advantages-word-group="first-split"]',
      );
      const standardGroups = Array.from(wordGroups).filter((group) => group !== firstSplitGroup);

      const setFinalState = () => {
        if (titleLead) gsap.set(titleLead, { autoAlpha: 1, y: 0 });
        if (titleEmphasis) gsap.set(titleEmphasis, { autoAlpha: 1, y: 0 });
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (chars.length) gsap.set(chars, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (subtitle) gsap.set(subtitle, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (bento) gsap.set(bento, { autoAlpha: 1, y: 0 });
        if (imageNodes.length) gsap.set(imageNodes, { autoAlpha: 1, scale: 1, filter: "blur(0px)" });
        wordGroups.forEach((group) => {
          const words = group.querySelectorAll<HTMLElement>("[data-advantages-word]");
          if (words.length) gsap.set(words, { autoAlpha: 1, x: 0, y: 0, filter: "blur(0px)" });
        });
      };

      const setInitialState = () => {
        if (titleLead) gsap.set(titleLead, { autoAlpha: 1, y: 0 });
        if (titleEmphasis) gsap.set(titleEmphasis, { autoAlpha: 1, y: 0 });
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 10, filter: "blur(6px)" });
        if (chars.length) gsap.set(chars, { autoAlpha: 0, y: 16, filter: "blur(8px)" });
        if (subtitle) gsap.set(subtitle, { autoAlpha: 0, y: 12, filter: "blur(6px)" });
        if (bento) gsap.set(bento, { autoAlpha: 0, y: 28 });
        if (imageNodes.length) {
          gsap.set(imageNodes, { autoAlpha: 0, scale: 1.085, filter: "blur(14px)" });
        }

        if (firstSplitGroup) {
          const words = firstSplitGroup.querySelectorAll<HTMLElement>("[data-advantages-word]");
          words.forEach((word, index) => {
            gsap.set(word, {
              autoAlpha: 0,
              x: index % 2 === 0 ? -20 : 20,
              y: 0,
              filter: "blur(8px)",
            });
          });
        }

        standardGroups.forEach((group, groupIndex) => {
          const words = group.querySelectorAll<HTMLElement>("[data-advantages-word]");
          const direction = randomDirection(groupIndex);
          words.forEach((word) => {
            gsap.set(word, {
              autoAlpha: 0,
              x: direction === "left" ? -16 : direction === "right" ? 16 : 0,
              y: direction === "bottom" ? 16 : 0,
              filter: "blur(8px)",
            });
          });
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

        const headingTargets = [eyebrow, ...(chars.length ? chars : [])].filter(
          Boolean,
        ) as HTMLElement[];

        if (headingTargets.length) {
          tl.fromTo(
            headingTargets,
            { autoAlpha: 0, y: 12, filter: "blur(8px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.56,
              stagger: 0.018,
              ease: MOTION.easePrimary,
            },
            0,
          );
        }

        if (subtitle) {
          tl.fromTo(
            subtitle,
            { autoAlpha: 0, y: 12, filter: "blur(6px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.46, ease: MOTION.easePrimary },
            0.1,
          );
        }

        if (bento) {
          tl.fromTo(
            bento,
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: MOTION.easeSecondary },
            0.14,
          );
        }

        if (imageNodes.length) {
          tl.to(
            imageNodes,
            {
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.02,
              stagger: 0.08,
              ease: MOTION.easePrimary,
            },
            0.2,
          );
        }

        if (firstSplitGroup) {
          const words = firstSplitGroup.querySelectorAll<HTMLElement>("[data-advantages-word]");
          words.forEach((word, index) => {
            tl.to(
              word,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                filter: "blur(0px)",
                duration: 0.45,
                ease: MOTION.easeSoft,
              },
              0.6 + index * 0.08,
            );
          });
        }

        standardGroups.forEach((group, groupIndex) => {
          const words = group.querySelectorAll<HTMLElement>("[data-advantages-word]");
          words.forEach((word, wordIndex) => {
            tl.to(
              word,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                filter: "blur(0px)",
                duration: 0.4,
                ease: MOTION.easeSoft,
              },
              0.82 + groupIndex * 0.17 + wordIndex * 0.045,
            );
          });
        });
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
