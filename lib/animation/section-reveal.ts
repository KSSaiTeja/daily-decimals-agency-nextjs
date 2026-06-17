export type SectionRevealOptions = {
  target: Element;
  onReveal: () => void;
  hasRevealed?: () => boolean;
  rootMargin?: string;
  minVisibleRatio?: number;
  topGate?: number;
  bottomGate?: number;
};

/** Lenient viewport band — section heading is considered on-screen. */
export function isElementInRevealBand(
  rect: DOMRectReadOnly,
  { topGate = 0.88, bottomGate = 0.06 }: { topGate?: number; bottomGate?: number } = {},
) {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  if (rect.height <= 0) return false;
  return rect.bottom > 0 && rect.top < vh && rect.top <= vh * topGate && rect.bottom >= vh * bottomGate;
}

export function entryShouldReveal(
  entry: IntersectionObserverEntry,
  minVisibleRatio = 0.06,
) {
  if (!entry.isIntersecting) return false;
  if (entry.intersectionRatio < minVisibleRatio) return false;
  return isElementInRevealBand(entry.boundingClientRect);
}

/**
 * Fire `onReveal` once when a section enters view.
 * Also checks immediately after mount and on scroll so headings never stay hidden.
 */
export function observeSectionReveal({
  target,
  onReveal,
  hasRevealed,
  rootMargin = "-4% 0px -8% 0px",
  minVisibleRatio = 0.06,
  topGate,
  bottomGate,
}: SectionRevealOptions) {
  let revealed = false;
  let observer: IntersectionObserver | null = null;
  const fallbackTimers: number[] = [];

  const cleanup = () => {
    observer?.disconnect();
    observer = null;
    fallbackTimers.forEach((timer) => window.clearTimeout(timer));
    fallbackTimers.length = 0;
    window.removeEventListener("scroll", onScroll);
  };

  const runReveal = () => {
    if (revealed || hasRevealed?.()) return;
    revealed = true;
    cleanup();
    onReveal();
  };

  const tryReveal = () => {
    if (revealed || hasRevealed?.()) return;
    const rect = target.getBoundingClientRect();
    if (isElementInRevealBand(rect, { topGate, bottomGate })) {
      runReveal();
    }
  };

  const onScroll = () => {
    tryReveal();
  };

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entryShouldReveal(entry, minVisibleRatio)) {
          runReveal();
          return;
        }
      }
    },
    {
      threshold: [0, 0.04, 0.08, 0.12, 0.2, 0.35],
      rootMargin,
    },
  );

  observer.observe(target);

  requestAnimationFrame(() => {
    tryReveal();
    requestAnimationFrame(tryReveal);
  });

  fallbackTimers.push(
    window.setTimeout(tryReveal, 120),
    window.setTimeout(tryReveal, 480),
    window.setTimeout(tryReveal, 1200),
  );

  window.addEventListener("scroll", onScroll, { passive: true });

  return cleanup;
}
