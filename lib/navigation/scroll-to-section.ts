import { getLenis } from "@/lib/scroll/lenis-store";

const SCROLL_OFFSET = 32;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const lenis = getLenis();
  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(target, { offset: -SCROLL_OFFSET });
    return;
  }

  const y = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

  window.scrollTo({
    top: Math.max(0, y),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

export function scrollToTop() {
  const lenis = getLenis();
  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(0);
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}
