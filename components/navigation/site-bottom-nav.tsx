"use client";

import { usePreloaderReady } from "@/components/preloader";
import { SITE_NAV_SECTIONS } from "@/lib/navigation/site-sections";
import { scrollToSection, scrollToTop } from "@/lib/navigation/scroll-to-section";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";

const COMPACT_NAV_QUERY = "(max-width: 480px)";

const COMPACT_NAV_LABELS: Record<string, string> = {
  testimonials: "Reviews",
};

const pillLift =
  "group/pill relative w-full max-w-[min(100%,calc(100vw-1.5rem))] sm:w-max sm:max-w-none will-change-transform transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:hover:-translate-y-1";

/** ~30% of prior shadow strength — soft ambient lift only. */
const pillShadow =
  "pointer-events-none absolute inset-0 -z-10 rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.2),0_4px_14px_rgba(0,0,0,0.14)] transition-[box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/pill:shadow-[0_16px_44px_rgba(0,0,0,0.23),0_6px_18px_rgba(0,0,0,0.17)]";

const pillShell =
  "relative flex h-12 w-full items-center gap-0.5 overflow-hidden rounded-full border border-white/[0.14] bg-[rgba(4,4,4,0.82)] px-1 py-0.5 backdrop-blur-2xl backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:z-[1] before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent sm:h-[3.25rem] sm:w-max sm:gap-1.5 sm:px-1.5 lg:transition-[border-color] lg:duration-[900ms] lg:ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover/pill:border-white/22";

const linksScroll =
  "min-w-0 flex-1 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] sm:flex-none sm:overflow-visible [&::-webkit-scrollbar]:hidden";

const linkBase =
  "relative z-[2] inline-flex h-9 shrink-0 items-center justify-center rounded-full px-2 text-[12px] font-medium leading-none tracking-[-0.02em] text-white/70 whitespace-nowrap transition-colors duration-300 ease-out active:bg-white/10 active:text-white sm:px-3 sm:text-[13px] lg:px-3.5 lg:text-[15px] lg:active:bg-transparent lg:hover:text-white";

type HighlightRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
};

const HIGHLIGHT_HIDDEN: HighlightRect = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  opacity: 0,
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useCompactNavLabels() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_NAV_QUERY);
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return compact;
}

function useNavHighlight(containerRef: RefObject<HTMLDivElement | null>) {
  const [highlight, setHighlight] = useState<HighlightRect>(HIGHLIGHT_HIDDEN);

  const showHighlight = useCallback(
    (target: HTMLElement) => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      setHighlight({
        left: targetRect.left - containerRect.left,
        top: targetRect.top - containerRect.top,
        width: targetRect.width,
        height: targetRect.height,
        opacity: 1,
      });
    },
    [containerRef],
  );

  const hideHighlight = useCallback(() => {
    setHighlight((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return { highlight, showHighlight, hideHighlight };
}

function getNavLabel(sectionId: string, label: string, compact: boolean) {
  if (!compact) return label;
  return COMPACT_NAV_LABELS[sectionId] ?? label;
}

function HomeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

type NavLinkProps = {
  label: string;
  sectionId: string;
  onHighlight: (target: HTMLElement) => void;
};

function NavLink({ label, sectionId, onHighlight }: NavLinkProps) {
  return (
    <a
      href={`#${sectionId}`}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(sectionId);
      }}
      onMouseEnter={(event) => onHighlight(event.currentTarget)}
      onFocus={(event) => onHighlight(event.currentTarget)}
      className={linkBase}
    >
      {label}
    </a>
  );
}

type NavHomeButtonProps = {
  onHighlight: (target: HTMLElement) => void;
};

function NavHomeButton({ onHighlight }: NavHomeButtonProps) {
  return (
    <a
      href="#top"
      onClick={(event) => {
        event.preventDefault();
        scrollToTop();
      }}
      onMouseEnter={(event) => onHighlight(event.currentTarget)}
      onFocus={(event) => onHighlight(event.currentTarget)}
      aria-label="Home"
      className="relative z-[2] inline-flex size-9 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors duration-300 ease-out active:bg-white/10 active:text-white [@media(hover:hover)]:hover:text-white [@media(hover:hover)]:active:bg-transparent"
    >
      <HomeIcon />
    </a>
  );
}

function NavDivider() {
  return (
    <span aria-hidden className="mx-0.5 h-5 w-px shrink-0 bg-white/18 sm:mx-1.5" />
  );
}

function NavHighlight({ rect }: { rect: HighlightRect }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-[1] hidden rounded-full bg-white/[0.09] ring-1 ring-inset ring-white/[0.11] [@media(hover:hover)]:block"
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        opacity: rect.opacity,
        transition:
          "left 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), top 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), width 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), height 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    />
  );
}

/** Fixed bottom pill navigation — translucent black, sliding hover highlight. */
export function SiteBottomNav() {
  const preloaderReady = usePreloaderReady();
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const compactLabels = useCompactNavLabels();
  const pillRef = useRef<HTMLDivElement>(null);
  const { highlight, showHighlight, hideHighlight } = useNavHighlight(pillRef);

  useEffect(() => {
    if (!preloaderReady) return;

    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [preloaderReady]);

  // Hide on scroll-down (so it never overlaps content), reveal on any upward
  // scroll — even a slight one — and always show near the top of the page.
  useEffect(() => {
    if (!preloaderReady) return;

    let lastY = window.scrollY;
    let ticking = false;

    const evaluate = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (y < 96) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [preloaderReady]);

  const handlePillLeave = (event: MouseEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    hideHighlight();
  };

  const handleHighlight = useCallback(
    (target: HTMLElement) => {
      if (prefersReducedMotion()) return;
      showHighlight(target);
    },
    [showHighlight],
  );

  return (
    <nav
      aria-label="Primary"
      data-site-bottom-nav
      className={`pointer-events-none fixed bottom-0 left-1/2 z-[100] w-full max-w-[100vw] -translate-x-1/2 px-3 pt-8 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        !visible
          ? "translate-y-2 opacity-0"
          : hidden
            ? "translate-y-[160%] opacity-0"
            : "translate-y-0 opacity-100"
      }`}
    >
      <div className={`pointer-events-auto mx-auto ${pillLift}`}>
        <div aria-hidden className={pillShadow} />

        <div
          ref={pillRef}
          onMouseLeave={handlePillLeave}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              hideHighlight();
            }
          }}
          className={pillShell}
        >
          <NavHighlight rect={highlight} />

          <NavHomeButton onHighlight={handleHighlight} />
          <NavDivider />

          <div className={linksScroll}>
            <div className="flex w-max items-center gap-0.5 pr-1 sm:gap-1 sm:pr-0">
              {SITE_NAV_SECTIONS.map(({ id, label }) => (
                <NavLink
                  key={id}
                  sectionId={id}
                  label={getNavLabel(id, label, compactLabels)}
                  onHighlight={handleHighlight}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
