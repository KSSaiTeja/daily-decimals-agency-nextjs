"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitTitleLines } from "@/lib/animation/split-chars";
import { usePreloaderReady } from "@/components/preloader";
import {
  PROCESS_CARDS_ARTBOARD_WIDTH,
  PROCESS_CARDS_NATURAL_HEIGHT,
  PROCESS_VIEWPORT_FIT,
} from "@/components/process/process-layout";
import { useLayoutEffect, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

const PIN_VIEWPORT_MULTIPLIER = 3.1;
const DESKTOP_PIN_QUERY = "(min-width: 1024px)";
const REVEAL_VISIBLE_RATIO = 0.2;
const REVEAL_ROOT_MARGIN = "-10% 0px -16% 0px";

const MOTION = {
  easePrimary: "power4.out",
  easeSecondary: "power3.out",
} as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isDesktopPinLayout() {
  return window.matchMedia(DESKTOP_PIN_QUERY).matches;
}

function getPinTrackHeight(viewportHeight: number) {
  return Math.round(PIN_VIEWPORT_MULTIPLIER * viewportHeight);
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function mapRange(value: number, start: number, end: number) {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

function shouldReveal(entry: IntersectionObserverEntry) {
  if (!entry.isIntersecting) return false;
  if (entry.intersectionRatio < REVEAL_VISIBLE_RATIO) return false;

  const rect = entry.boundingClientRect;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= vh * 0.74 && rect.bottom >= vh * 0.14;
}

/** Opacity-only reveal — keep visibility visible so images paint inside the scaled pin. */
function setCardRevealOpacity(
  targets: Element | Element[] | NodeListOf<Element>,
  opacity: number,
) {
  gsap.set(targets, {
    opacity,
    visibility: "visible",
    pointerEvents: opacity > 0 ? "auto" : "none",
  });
}

function applyCardOpacity(
  cards: NodeListOf<HTMLElement>,
  progress: number,
  hasInteracted: boolean,
) {
  if (!hasInteracted) {
    setCardRevealOpacity(cards, 0);
    return;
  }

  const revealCount = Math.max(1, cards.length - 1);

  cards.forEach((card, index) => {
    if (index === 0) {
      setCardRevealOpacity(card, 1);
      return;
    }

    const normalizedIndex = index - 1;
    const start = 0.04 + (normalizedIndex / revealCount) * 0.8;
    const end = start + 0.1;
    const local = mapRange(progress, start, end);
    setCardRevealOpacity(card, local);
  });
}

function preloadProcessCardImages(section: HTMLElement) {
  const images = section.querySelectorAll<HTMLImageElement>(".process-card__icon");

  return Promise.all(
    Array.from(images).map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }

          const finish = () => resolve();
          img.addEventListener("load", finish, { once: true });
          img.addEventListener("error", finish, { once: true });
        }),
    ),
  );
}

function clearViewportFit(section: HTMLElement) {
  const shell = section.querySelector<HTMLElement>("[data-process-cards-shell]");
  const cardsEl = section.querySelector<HTMLElement>("[data-process-cards]");
  if (!shell || !cardsEl) return;

  cardsEl.style.transform = "";
  cardsEl.style.transformOrigin = "";
  cardsEl.style.height = "";
  cardsEl.style.marginBottom = "";
  shell.style.height = "";
  shell.style.minHeight = "";
  shell.style.maxHeight = "";
  shell.style.flex = "";
}

function readCssMinHeightPx(element: HTMLElement, vh: number) {
  const raw = getComputedStyle(element).minHeight;
  if (!raw || raw === "none" || raw === "auto") return 0;

  const value = parseFloat(raw);
  if (Number.isNaN(value)) return 0;

  if (raw.endsWith("vh") || raw.endsWith("dvh") || raw.endsWith("svh") || raw.endsWith("lvh")) {
    return (vh * value) / 100;
  }

  if (raw.endsWith("rem")) {
    const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return value * rootSize;
  }

  return value;
}

function syncViewportFit(section: HTMLElement) {
  const header = section.querySelector<HTMLElement>("[data-process-header]");
  const shell = section.querySelector<HTMLElement>("[data-process-cards-shell]");
  const cardsEl = section.querySelector<HTMLElement>("[data-process-cards]");
  if (!shell || !cardsEl) return;

  if (!isDesktopPinLayout()) {
    clearViewportFit(section);
    return;
  }

  const vh = window.innerHeight || document.documentElement.clientHeight;
  const headerHeight = header?.offsetHeight ?? 160;
  const footnote = section.querySelector<HTMLElement>("[data-process-footnote]");
  const footnoteHeight = footnote?.offsetHeight ?? 36;
  const chrome =
    headerHeight + footnoteHeight + PROCESS_VIEWPORT_FIT.verticalPad + 12;
  const cardsBudget = Math.max(0, vh - chrome);
  const shellMinPx = readCssMinHeightPx(shell, vh);
  const footnoteReserve = footnoteHeight + 12;
  const availableForCards = Math.max(cardsBudget, shellMinPx - footnoteReserve);
  const shellWidth = shell.clientWidth || cardsEl.clientWidth;
  const heightScale =
    availableForCards > 0 ? availableForCards / PROCESS_CARDS_NATURAL_HEIGHT : 1;
  const widthScale =
    shellWidth > 0 ? shellWidth / PROCESS_CARDS_ARTBOARD_WIDTH : 1;
  const safeScale = Math.min(heightScale, widthScale, 1);
  const scaledHeight = Math.ceil(PROCESS_CARDS_NATURAL_HEIGHT * safeScale);
  const layoutTrim = PROCESS_CARDS_NATURAL_HEIGHT - scaledHeight;
  const shellHeight = scaledHeight + footnoteHeight + 12;

  if (safeScale < 0.995) {
    cardsEl.style.transform = `scale(${safeScale})`;
    cardsEl.style.transformOrigin = "top center";
    cardsEl.style.height = `${PROCESS_CARDS_NATURAL_HEIGHT}px`;
    cardsEl.style.marginBottom = `${-layoutTrim}px`;
  } else {
    cardsEl.style.transform = "";
    cardsEl.style.transformOrigin = "";
    cardsEl.style.height = `${PROCESS_CARDS_NATURAL_HEIGHT}px`;
    cardsEl.style.marginBottom = "0";
  }

  shell.style.height = `${shellHeight}px`;
  shell.style.minHeight = `${shellHeight}px`;
  shell.style.maxHeight = "none";
  shell.style.flex = "0 0 auto";
}

type ProcessAnimationRefs = {
  trackRef: RefObject<HTMLDivElement | null>;
  stickyRef: RefObject<HTMLDivElement | null>;
};

export function useProcessSectionAnimations({
  trackRef,
  stickyRef,
}: ProcessAnimationRefs) {
  const ready = usePreloaderReady();

  useLayoutEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const section = sticky?.querySelector<HTMLElement>("[data-process-section]");
    if (!track || !sticky || !section || !ready) return;

    let pinTrigger: ScrollTrigger | null = null;
    let introTrigger: ScrollTrigger | null = null;
    let mobileObserver: IntersectionObserver | null = null;
    let hasInteracted = false;
    let textRevealTl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>("[data-process-eyebrow]");
      const titleLead = section.querySelector<HTMLElement>("[data-process-title-lead]");
      const titleEmphasis = section.querySelector<HTMLElement>(
        "[data-process-title-emphasis]",
      );
      const subtitle = section.querySelector<HTMLElement>("[data-process-subtitle]");
      const cards = section.querySelectorAll<HTMLElement>("[data-process-card]");
      const footnoteStar = section.querySelector<HTMLElement>("[data-process-footnote-star]");
      const footnoteText = section.querySelector<HTMLElement>("[data-process-footnote-text]");

      const chars = splitTitleLines(
        section,
        "[data-process-title-lead]",
        "[data-process-title-emphasis]",
        "process-char",
      );

      const applyProgress = (progress: number) => {
        if (!isDesktopPinLayout()) return;
        applyCardOpacity(cards, progress, hasInteracted);
      };

      const setFinalState = () => {
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (chars.length) gsap.set(chars, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (subtitle) gsap.set(subtitle, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (cards.length) setCardRevealOpacity(cards, 1);
        if (footnoteStar) gsap.set(footnoteStar, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (footnoteText) gsap.set(footnoteText, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
      };

      const setInitialState = () => {
        if (titleLead) gsap.set(titleLead, { autoAlpha: 1, y: 0 });
        if (titleEmphasis) gsap.set(titleEmphasis, { autoAlpha: 1, y: 0 });
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 10, filter: "blur(6px)" });
        if (chars.length) gsap.set(chars, { autoAlpha: 0, y: 16, filter: "blur(8px)" });
        if (subtitle) gsap.set(subtitle, { autoAlpha: 0, y: 12, filter: "blur(6px)" });
        if (footnoteStar) gsap.set(footnoteStar, { autoAlpha: 0, y: 10, filter: "blur(6px)" });
        if (footnoteText) gsap.set(footnoteText, { autoAlpha: 0, y: 14, filter: "blur(6px)" });

        if (isDesktopPinLayout()) {
          if (cards.length) setCardRevealOpacity(cards, 0);
        } else {
          if (cards.length) {
            gsap.set(cards, { opacity: 0, visibility: "visible", y: 20, pointerEvents: "none" });
          }
        }
      };

      const showTextImmediately = () => {
        hasInteracted = true;
        textRevealTl?.kill();
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (chars.length) gsap.set(chars, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (subtitle) gsap.set(subtitle, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (footnoteStar) gsap.set(footnoteStar, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        if (footnoteText) gsap.set(footnoteText, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
      };

      const revealTextOnInteraction = () => {
        if (hasInteracted) return;
        hasInteracted = true;

        textRevealTl?.kill();
        textRevealTl = gsap.timeline({
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
          textRevealTl.fromTo(
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
          textRevealTl.fromTo(
            subtitle,
            { autoAlpha: 0, y: 12, filter: "blur(6px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.46,
              ease: MOTION.easePrimary,
            },
            0.1,
          );
        }

        if (footnoteStar) {
          textRevealTl.fromTo(
            footnoteStar,
            { autoAlpha: 0, y: 10, filter: "blur(6px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.4 },
            0.18,
          );
        }

        if (footnoteText) {
          textRevealTl.fromTo(
            footnoteText,
            { autoAlpha: 0, y: 14, filter: "blur(6px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.44 },
            0.22,
          );
        }
      };

      const revealMobileCards = () => {
        if (isDesktopPinLayout()) return;

        gsap.to(cards, {
          opacity: 1,
          visibility: "visible",
          y: 0,
          pointerEvents: "auto",
          duration: 0.5,
          stagger: 0.08,
          ease: MOTION.easePrimary,
          overwrite: "auto",
        });
      };

      const syncTrackHeight = () => {
        if (!isDesktopPinLayout()) {
          track.style.height = "auto";
          return;
        }

        const vh = window.innerHeight || document.documentElement.clientHeight;
        track.style.height = `${getPinTrackHeight(vh)}px`;
      };

      const setupDesktopPin = () => {
        const previousProgress = pinTrigger?.progress ?? 0;
        const wasActive = hasInteracted || previousProgress > 0.001;

        introTrigger?.kill();
        pinTrigger?.kill();

        if (!wasActive) {
          setInitialState();
        }

        introTrigger = ScrollTrigger.create({
          trigger: track,
          start: "top 90%",
          onEnter: () => revealTextOnInteraction(),
          onEnterBack: () => {
            if (!hasInteracted) revealTextOnInteraction();
          },
        });

        pinTrigger = ScrollTrigger.create({
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          pin: sticky,
          pinReparent: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!hasInteracted) revealTextOnInteraction();
            applyProgress(self.progress);
          },
          onEnter: () => {
            if (!hasInteracted) revealTextOnInteraction();
            applyProgress(pinTrigger?.progress ?? 0);
          },
          onLeave: () => applyProgress(1),
          onEnterBack: () => {
            if (!hasInteracted) revealTextOnInteraction();
            applyProgress(pinTrigger?.progress ?? 0);
          },
        });

        syncViewportFit(section);

        if (wasActive || pinTrigger.progress > 0.001) {
          showTextImmediately();
          applyProgress(pinTrigger.progress);
        }

        const reflowAfterImages = () => {
          if (!isDesktopPinLayout()) return;
          syncViewportFit(section);
          applyProgress(pinTrigger?.progress ?? 0);
          ScrollTrigger.refresh();
        };

        void preloadProcessCardImages(section).then(reflowAfterImages);
      };

      const setupMobileReveal = () => {
        introTrigger?.kill();
        pinTrigger?.kill();
        mobileObserver?.disconnect();
        clearViewportFit(section);

        setInitialState();

        mobileObserver = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (shouldReveal(entry)) {
                revealTextOnInteraction();
                revealMobileCards();
                mobileObserver?.disconnect();
                break;
              }
            }
          },
          { threshold: [0, REVEAL_VISIBLE_RATIO, 0.35], rootMargin: REVEAL_ROOT_MARGIN },
        );

        mobileObserver.observe(section);
      };

      const setup = () => {
        syncTrackHeight();

        if (prefersReducedMotion()) {
          track.style.height = "auto";
          syncViewportFit(section);
          hasInteracted = true;
          setFinalState();
          return;
        }

        if (isDesktopPinLayout()) {
          setupDesktopPin();
        } else {
          setupMobileReveal();
        }

        ScrollTrigger.refresh();
      };

      setup();

      const onResize = () => {
        const wasDesktop = pinTrigger !== null;
        const isDesktop = isDesktopPinLayout();

        if (wasDesktop !== isDesktop) {
          hasInteracted = false;
        }

        setup();
      };

      window.addEventListener("resize", onResize);

      return () => {
        textRevealTl?.kill();
        mobileObserver?.disconnect();
        window.removeEventListener("resize", onResize);
        introTrigger?.kill();
        introTrigger = null;
        pinTrigger?.kill();
        pinTrigger = null;
        clearViewportFit(section);
      };
    }, section);

    return () => {
      textRevealTl?.kill();
      mobileObserver?.disconnect();
      introTrigger?.kill();
      pinTrigger?.kill();
      ctx.revert();
    };
  }, [ready, trackRef, stickyRef]);
}
