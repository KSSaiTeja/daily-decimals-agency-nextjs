"use client";

import gsap from "gsap";
import { usePreloaderReady } from "@/components/preloader";
import { useLayoutEffect, useRef, type RefObject } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useFadeFromTop(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const ready = usePreloaderReady();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !ready) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { y: 0, autoAlpha: 1 });
      return;
    }

    gsap.fromTo(
      el,
      { y: -36, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.95,
        delay,
        ease: "power3.out",
        force3D: true,
      },
    );
  }, [delay, ready]);

  return ref;
}

type BlurRevealWordsProps = {
  text: string;
  className?: string;
  startDelay?: number;
  stagger?: number;
};

export function BlurRevealWords({
  text,
  className = "",
  startDelay = 0.55,
  stagger = 0.075,
}: BlurRevealWordsProps) {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const ready = usePreloaderReady();
  const words = text.split(" ");

  useLayoutEffect(() => {
    const line = lineRef.current;
    if (!line || !ready) return;

    const wordEls = line.querySelectorAll<HTMLElement>("[data-hero-word]");

    if (prefersReducedMotion()) {
      gsap.set(wordEls, { opacity: 1, filter: "blur(0px)", x: 0 });
      return;
    }

    gsap.fromTo(
      wordEls,
      { opacity: 0, filter: "blur(12px)", x: -14 },
      {
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        duration: 0.5,
        stagger,
        delay: startDelay,
        ease: "power2.out",
      },
    );
  }, [startDelay, stagger, text, ready]);

  return (
    <p ref={lineRef} className={`${className} whitespace-nowrap`.trim()}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span data-hero-word className="inline-block will-change-[transform,filter,opacity]">
            {word}
            {i < words.length - 1 ? "\u00a0" : ""}
          </span>
        </span>
      ))}
    </p>
  );
}

type RevealFromBottomOptions = {
  delay?: number;
  stagger?: number;
};

export function useRevealFromBottom(
  ref: RefObject<HTMLElement | null>,
  { delay = 0, stagger = 0.14 }: RevealFromBottomOptions = {},
) {
  const ready = usePreloaderReady();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !ready) return;

    const lines = root.querySelectorAll<HTMLElement>("[data-hero-line-content]");

    if (prefersReducedMotion()) {
      gsap.set(lines, { y: 0, autoAlpha: 1, filter: "blur(0px)", rotateX: 0 });
      return;
    }

    gsap.fromTo(
      lines,
      {
        y: 72,
        autoAlpha: 0,
        filter: "blur(10px)",
        rotateX: 14,
        transformOrigin: "50% 100%",
      },
      {
        y: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        rotateX: 0,
        duration: 1.15,
        stagger,
        delay,
        ease: "power4.out",
        force3D: true,
      },
    );
  }, [delay, stagger, ready, ref]);
}

type FounderStackOptions = {
  avatarDelay?: number;
  avatarStagger?: number;
};

const FOUNDER_POP_FROM = { y: 22, autoAlpha: 0, scale: 0.86 } as const;
const FOUNDER_POP_TO = {
  y: 0,
  autoAlpha: 1,
  scale: 1,
  duration: 0.7,
  ease: "back.out(1.35)",
  force3D: true,
} as const;

export function useFounderStackEntrance(
  ref: RefObject<HTMLElement | null>,
  { avatarDelay = 0, avatarStagger = 0.14 }: FounderStackOptions = {},
) {
  const ready = usePreloaderReady();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !ready) return;

    const avatars = root.querySelectorAll<HTMLElement>("[data-founder-avatar]");
    const trust = root.querySelector<HTMLElement>("[data-founder-trust]");

    if (prefersReducedMotion()) {
      gsap.set(avatars, { y: 0, autoAlpha: 1, scale: 1 });
      if (trust) gsap.set(trust, { y: 0, autoAlpha: 1, scale: 1 });
      return;
    }

    gsap.fromTo(avatars, FOUNDER_POP_FROM, {
      ...FOUNDER_POP_TO,
      stagger: avatarStagger,
      delay: avatarDelay,
    });

    if (trust) {
      const trustDelay =
        avatarDelay + Math.max(0, avatars.length - 1) * avatarStagger + 0.1;
      gsap.fromTo(trust, FOUNDER_POP_FROM, {
        ...FOUNDER_POP_TO,
        delay: trustDelay,
      });
    }
  }, [avatarDelay, avatarStagger, ready, ref]);
}
