import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let configured = false;
const RESIZE_DEBOUNCE_MS = 250;

/** One-time ScrollTrigger defaults — avoids address-bar resize thrash on mobile. */
export function configureScrollTrigger() {
  if (configured || typeof window === "undefined") return;
  configured = true;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export function refreshScrollTriggers() {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
}

/** Run after layout-affecting changes (preloader exit, fonts, images). */
export function refreshScrollTriggersAfterLayout() {
  if (typeof window === "undefined") return;
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });
}

/** Global refresh + lifecycle hooks so pin sections measure correctly after load. */
export function initPageScrollStability() {
  if (typeof window === "undefined") return () => undefined;

  configureScrollTrigger();
  refreshScrollTriggersAfterLayout();

  const timers = [
    window.setTimeout(refreshScrollTriggersAfterLayout, 120),
    window.setTimeout(refreshScrollTriggersAfterLayout, 480),
    window.setTimeout(refreshScrollTriggersAfterLayout, 1000),
  ];

  let resizeTimer: ReturnType<typeof setTimeout> | null = null;
  let lastWidth = window.innerWidth;
  const onViewportChange = () => {
    // Mobile browsers fire `resize` when the address bar shows/hides — a
    // height-only change. Refreshing then re-measures pinned sections and can
    // snap the scroll position, so only refresh on real width changes.
    const width = window.innerWidth;
    if (width === lastWidth) return;
    lastWidth = width;

    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      refreshScrollTriggersAfterLayout();
      resizeTimer = null;
    }, RESIZE_DEBOUNCE_MS);
  };

  const onLoad = () => refreshScrollTriggersAfterLayout();

  window.addEventListener("resize", onViewportChange);
  window.addEventListener("orientationchange", onViewportChange);
  window.addEventListener("load", onLoad, { once: true });
  void document.fonts?.ready?.then(refreshScrollTriggersAfterLayout);

  if (document.readyState === "complete") {
    refreshScrollTriggersAfterLayout();
  }

  return () => {
    timers.forEach((timer) => window.clearTimeout(timer));
    if (resizeTimer) clearTimeout(resizeTimer);
    window.removeEventListener("resize", onViewportChange);
    window.removeEventListener("orientationchange", onViewportChange);
    window.removeEventListener("load", onLoad);
  };
}
