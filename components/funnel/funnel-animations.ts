"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitTitleLines } from "@/lib/animation/split-chars";
import {
  configureScrollTrigger,
  refreshScrollTriggersAfterLayout,
} from "@/lib/animation/scroll-trigger-config";
import { observeSectionReveal } from "@/lib/animation/section-reveal";
import { usePreloaderReady } from "@/components/preloader";
import { FUNNEL_STAGES } from "@/components/funnel/data";
import { FUNNEL_COLORS } from "@/components/funnel/funnel-colors";
import { useLayoutEffect, type RefObject } from "react";

configureScrollTrigger();

const STAGE_COUNT = FUNNEL_STAGES.length;
const FADE_SPAN = 0.92;
const PIN_VIEWPORT_MULTIPLIER = 3.15;
const MOBILE_PIN_QUERY = "(max-width: 1023px)";

const MOTION = {
  easePrimary: "power3.out",
  easeRelease: "power2.out",
} as const;

const SCRUB = {
  approach: 0.9,
  pin: 1.15,
  approachMobile: 1.1,
  pinMobile: 1.5,
} as const;

const RESIZE_DEBOUNCE_MS = 220;

const REVEAL_ROOT_MARGIN = "-8% 0px -12% 0px";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobilePinLayout() {
  return window.matchMedia(MOBILE_PIN_QUERY).matches;
}

function getPinScrubDistance(viewportHeight: number) {
  const multiplier = isMobilePinLayout() ? 2.85 : PIN_VIEWPORT_MULTIPLIER;
  return Math.round(multiplier * viewportHeight);
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

/** Softens pin start/end so stages ease in and release out cleanly. */
function mapPinProgress(raw: number) {
  const t = clamp01(raw);
  const edge = smoothstep(t);
  const center = t * t * (3 - 2 * t);
  return clamp01(edge * 0.18 + center * 0.82);
}

function stageWeight(stageProgress: number, index: number) {
  const distance = Math.abs(stageProgress - index);
  if (distance >= FADE_SPAN) return 0;
  return smoothstep(1 - distance / FADE_SPAN);
}

function mixHex(from: string, to: string, amount: number) {
  const parse = (hex: string) => {
    const normalized = hex.replace("#", "");
    return [
      Number.parseInt(normalized.slice(0, 2), 16),
      Number.parseInt(normalized.slice(2, 4), 16),
      Number.parseInt(normalized.slice(4, 6), 16),
    ] as const;
  };

  const [r1, g1, b1] = parse(from);
  const [r2, g2, b2] = parse(to);
  const t = clamp01(amount);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

function applyFunnelProgress(
  strips: NodeListOf<HTMLElement>,
  contents: NodeListOf<HTMLElement>,
  progress: number,
  hasInteracted: boolean,
  progressFills: NodeListOf<HTMLElement>,
  stageCounter: HTMLElement | null,
) {
  const stageProgress = clamp01(progress) * (STAGE_COUNT - 1);
  const resolvedProgress = hasInteracted ? stageProgress : 0;
  const dominantIndex = Math.round(resolvedProgress);

  strips.forEach((strip, index) => {
    const weight = stageWeight(resolvedProgress, index);
    const fill = strip.querySelector<HTMLElement>("[data-funnel-strip-fill]");
    const number = strip.querySelector<HTMLElement>("[data-funnel-strip-number]");
    const label = strip.querySelector<HTMLElement>("[data-funnel-strip-label]");

    const bg = mixHex(
      FUNNEL_COLORS.stripInactiveBg,
      FUNNEL_COLORS.stripActiveEnd,
      weight,
    );
    const numberColor = mixHex(FUNNEL_COLORS.stripInactiveText, "#ffffff", weight);
    const labelColor = mixHex(FUNNEL_COLORS.stripInactiveLabel, "#f5f3f0", weight);

    if (fill) {
      gsap.set(fill, {
        backgroundColor: bg,
        boxShadow:
          weight > 0.55 ? FUNNEL_COLORS.stripActiveGlow : "0 0 0 rgba(0,0,0,0)",
      });
    }

    gsap.set(strip, {
      scale: 1 + weight * 0.018,
      x: weight * 4,
      opacity: 0.55 + weight * 0.45,
    });

    if (number) gsap.set(number, { color: numberColor });
    if (label) gsap.set(label, { color: labelColor });
  });

  contents.forEach((panel, index) => {
    const weight = stageWeight(resolvedProgress, index);
    const isDominant = index === dominantIndex;
    const y = (1 - weight) * 18;
    const blur = (1 - weight) * 5;

    gsap.set(panel, {
      autoAlpha: weight,
      y,
      filter: blur > 0.12 ? `blur(${blur}px)` : "none",
      pointerEvents: isDominant && weight > 0.42 ? "auto" : "none",
    });
  });

  const fillPercent = ((resolvedProgress + 1) / STAGE_COUNT) * 100;
  progressFills.forEach((progressFill) => {
    const isHorizontal = progressFill.classList.contains(
      "funnel-progress__fill--horizontal",
    );

    gsap.set(progressFill, {
      [isHorizontal ? "width" : "height"]: `${fillPercent}%`,
    });
  });

  if (stageCounter) {
    const stageNumber = String(dominantIndex + 1).padStart(2, "0");
    const total = String(STAGE_COUNT).padStart(2, "0");
    stageCounter.textContent = `Stage ${stageNumber} of ${total}`;
    gsap.set(stageCounter, {
      autoAlpha: 0.45 + stageWeight(resolvedProgress, dominantIndex) * 0.55,
    });
  }
}

function applyApproachReveal(
  strips: NodeListOf<HTMLElement>,
  contents: NodeListOf<HTMLElement>,
  stickyInner: HTMLElement | null,
  t: number,
) {
  const eased = smoothstep(t);

  gsap.set(strips, {
    autoAlpha: eased,
    x: -14 * (1 - eased),
  });

  const firstContent = contents[0];
  if (firstContent) {
    gsap.set(firstContent, {
      autoAlpha: eased,
      y: 18 * (1 - eased),
      filter: eased > 0.88 ? "none" : `blur(${(1 - eased) * 5}px)`,
    });
  }

  if (stickyInner) {
    gsap.set(stickyInner, {
      y: 16 * (1 - eased),
    });
  }
}

type FunnelAnimationRefs = {
  stickyRef: RefObject<HTMLDivElement | null>;
};

export function useFunnelSectionAnimations({ stickyRef }: FunnelAnimationRefs) {
  const ready = usePreloaderReady();

  useLayoutEffect(() => {
    const sticky = stickyRef.current;
    const section = sticky?.closest<HTMLElement>("[data-funnel-section]");
    if (!sticky || !section || !ready) return;

    let pinTrigger: ScrollTrigger | null = null;
    let approachTrigger: ScrollTrigger | null = null;
    let disconnectHeaderReveal: (() => void) | null = null;
    let stickyObserver: IntersectionObserver | null = null;
    let hasBodyInteracted = false;
    let hasHeaderRevealed = false;
    let headerIntroTl: gsap.core.Timeline | null = null;
    let releaseTween: gsap.core.Tween | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const ctx = gsap.context(() => {
      const intro = section.querySelector<HTMLElement>("[data-funnel-intro]");
      const stickyInner = sticky.querySelector<HTMLElement>(".funnel-sticky__inner");
      const eyebrow = section.querySelector<HTMLElement>("[data-funnel-eyebrow]");
      const titleLead = section.querySelector<HTMLElement>("[data-funnel-title-lead]");
      const titleEmphasis = section.querySelector<HTMLElement>(
        "[data-funnel-title-emphasis]",
      );
      const subtitle = section.querySelector<HTMLElement>("[data-funnel-subtitle]");
      const strips = section.querySelectorAll<HTMLElement>("[data-funnel-strip]");
      const contents = section.querySelectorAll<HTMLElement>("[data-funnel-content]");
      const progressFills = section.querySelectorAll<HTMLElement>(
        "[data-funnel-progress-fill]",
      );
      const stageCounter = section.querySelector<HTMLElement>(
        "[data-funnel-stage-counter]",
      );

      const chars = splitTitleLines(
        section,
        "[data-funnel-title-lead]",
        "[data-funnel-title-emphasis]",
        "funnel-char",
      );

      const setPinnedState = (pinned: boolean) => {
        section.toggleAttribute("data-funnel-pinned", pinned);
        sticky.toggleAttribute("data-funnel-pinned", pinned);
      };

      const applyProgress = (progress: number) => {
        applyFunnelProgress(
          strips,
          contents,
          progress,
          hasBodyInteracted,
          progressFills,
          stageCounter,
        );
      };

      const setFinalState = () => {
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 1, y: 0 });
        if (chars.length) gsap.set(chars, { autoAlpha: 1, y: 0 });
        if (subtitle) gsap.set(subtitle, { autoAlpha: 1, y: 0 });
        gsap.set(strips, { autoAlpha: 1, x: 0 });
        if (stickyInner) gsap.set(stickyInner, { y: 0 });
        setPinnedState(false);
        applyFunnelProgress(strips, contents, 1, true, progressFills, stageCounter);
      };

      const setInitialState = () => {
        if (titleLead) gsap.set(titleLead, { autoAlpha: 1, y: 0 });
        if (titleEmphasis) gsap.set(titleEmphasis, { autoAlpha: 1, y: 0 });
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 10 });
        if (chars.length) gsap.set(chars, { autoAlpha: 0, y: 12 });
        if (subtitle) gsap.set(subtitle, { autoAlpha: 0, y: 10 });
        gsap.set(strips, { autoAlpha: 0, x: -14 });
        if (stickyInner) gsap.set(stickyInner, { y: 16 });
        setPinnedState(false);
        applyFunnelProgress(strips, contents, 0, false, progressFills, stageCounter);
      };

      const showBodyImmediately = () => {
        hasBodyInteracted = true;
        gsap.set(strips, { autoAlpha: 1, x: 0 });
        if (stickyInner) gsap.set(stickyInner, { y: 0 });
        if (contents[0]) {
          gsap.set(contents[0], { autoAlpha: 1, y: 0, filter: "none" });
        }
      };

      const maybeRevealBodyInView = () => {
        if (hasBodyInteracted) return;

        const rect = sticky.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const inApproachZone = rect.top <= vh * 0.92 && rect.bottom >= vh * 0.08;

        if (inApproachZone) {
          showBodyImmediately();
          applyProgress(mapPinProgress(pinTrigger?.progress ?? approachTrigger?.progress ?? 0));
        }
      };

      const revealHeaderIntro = () => {
        if (hasHeaderRevealed) return;
        hasHeaderRevealed = true;

        headerIntroTl?.kill();
        headerIntroTl = gsap.timeline({
          defaults: { ease: MOTION.easePrimary, overwrite: "auto" },
        });

        const headingTargets = [eyebrow, ...(chars.length ? chars : [])].filter(
          Boolean,
        ) as HTMLElement[];

        if (headingTargets.length) {
          headerIntroTl.fromTo(
            headingTargets,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.56, stagger: 0.02 },
            0,
          );
        }

        if (subtitle) {
          headerIntroTl.fromTo(
            subtitle,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.48 },
            0.08,
          );
        }
      };

      const releaseFromPin = () => {
        releaseTween?.kill();
        setPinnedState(false);
        applyProgress(1);

        if (!stickyInner) return;

        releaseTween = gsap.to(stickyInner, {
          y: -10,
          duration: 0.55,
          ease: MOTION.easeRelease,
          overwrite: "auto",
        });
      };

      const resetRelease = () => {
        releaseTween?.kill();
        if (stickyInner) gsap.set(stickyInner, { y: 0 });
      };

      if (prefersReducedMotion()) {
        hasHeaderRevealed = true;
        hasBodyInteracted = true;
        setFinalState();
        return;
      }

      setInitialState();

      if (intro) {
        disconnectHeaderReveal = observeSectionReveal({
          target: intro,
          onReveal: revealHeaderIntro,
          hasRevealed: () => hasHeaderRevealed,
          rootMargin: REVEAL_ROOT_MARGIN,
        });
      }

      const setupScroll = () => {
        const previousProgress = pinTrigger?.progress ?? 0;
        const wasActive = hasBodyInteracted || previousProgress > 0.001 || hasHeaderRevealed;

        approachTrigger?.kill();
        pinTrigger?.kill();
        resetRelease();

        if (!wasActive) {
          hasBodyInteracted = false;
          gsap.set(strips, { autoAlpha: 0, x: -14 });
          if (stickyInner) gsap.set(stickyInner, { y: 16 });
          applyFunnelProgress(strips, contents, 0, false, progressFills, stageCounter);
        }

        const vh = window.innerHeight || document.documentElement.clientHeight;
        const mobile = isMobilePinLayout();

        approachTrigger = ScrollTrigger.create({
          trigger: sticky,
          start: "top bottom",
          end: "top top",
          scrub: mobile ? SCRUB.approachMobile : SCRUB.approach,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            applyApproachReveal(strips, contents, stickyInner, self.progress);
          },
          onLeave: () => {
            showBodyImmediately();
            applyProgress(0);
          },
          onEnterBack: () => {
            resetRelease();
          },
        });

        pinTrigger = ScrollTrigger.create({
          trigger: sticky,
          start: "top top",
          end: () => `+=${getPinScrubDistance(vh)}`,
          pin: sticky,
          pinSpacing: true,
          anticipatePin: mobile ? 0 : 1.5,
          invalidateOnRefresh: true,
          scrub: mobile ? SCRUB.pinMobile : SCRUB.pin,
          onUpdate: (self) => {
            setPinnedState(self.isActive);

            if (!hasBodyInteracted && self.progress > 0) {
              hasBodyInteracted = true;
            }

            applyProgress(mapPinProgress(self.progress));
          },
          onEnter: () => {
            setPinnedState(true);
            hasBodyInteracted = true;
            resetRelease();
            applyProgress(mapPinProgress(pinTrigger?.progress ?? 0));
          },
          onLeave: () => {
            releaseFromPin();
          },
          onEnterBack: () => {
            setPinnedState(true);
            resetRelease();
            hasBodyInteracted = true;
            applyProgress(mapPinProgress(pinTrigger?.progress ?? 0));
          },
          onLeaveBack: () => {
            setPinnedState(false);
            resetRelease();
          },
        });

        if (wasActive || pinTrigger.progress > 0.001) {
          showBodyImmediately();
          setPinnedState(pinTrigger.isActive);
          applyProgress(mapPinProgress(pinTrigger.progress));
        }

        refreshScrollTriggersAfterLayout();
      };

      setupScroll();

      stickyObserver = new IntersectionObserver(
        () => {
          maybeRevealBodyInView();
        },
        { threshold: [0, 0.08, 0.2, 0.45], rootMargin: "0px 0px -6% 0px" },
      );
      stickyObserver.observe(sticky);

      requestAnimationFrame(() => {
        maybeRevealBodyInView();
        refreshScrollTriggersAfterLayout();
      });

      const onResize = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          setupScroll();
          maybeRevealBodyInView();
          resizeTimer = null;
        }, RESIZE_DEBOUNCE_MS);
      };

      window.addEventListener("resize", onResize);

      return () => {
        headerIntroTl?.kill();
        releaseTween?.kill();
        disconnectHeaderReveal?.();
        stickyObserver?.disconnect();
        if (resizeTimer) clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        approachTrigger?.kill();
        approachTrigger = null;
        pinTrigger?.kill();
        pinTrigger = null;
        setPinnedState(false);
      };
    }, section);

    return () => {
      headerIntroTl?.kill();
      releaseTween?.kill();
      disconnectHeaderReveal?.();
      stickyObserver?.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
      approachTrigger?.kill();
      pinTrigger?.kill();
      ctx.revert();
    };
  }, [ready, stickyRef]);
}
