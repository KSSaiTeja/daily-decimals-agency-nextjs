"use client";

import { RibbonOrnamentIcon } from "@/components/icons";
import { RIBBON_MARQUEE_SPEED } from "@/components/ribbon/data";
import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef } from "react";

export type RibbonMarqueeDirection = "left" | "right";

type RibbonMarqueeProps = {
  items: readonly string[];
  active: boolean;
  direction?: RibbonMarqueeDirection;
  /** Ribbon fill — used for edge fade gradients */
  edgeColor: string;
};

/** Repeat items so one loop set always fills wide viewports. */
const MIN_SET_COPIES = 4;

function expandItems(items: readonly string[]) {
  return Array.from({ length: MIN_SET_COPIES }, () => items).flat();
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function measureSetWidth(element: HTMLElement) {
  return Math.round(element.getBoundingClientRect().width);
}

function RibbonIcon() {
  return (
    <div
      className="shrink-0 text-white"
      style={{
        width: "var(--ribbon-icon-size)",
        height: "var(--ribbon-icon-size)",
      }}
      aria-hidden
    >
      <RibbonOrnamentIcon />
    </div>
  );
}

function RibbonMarqueeItem({ label }: { label: string }) {
  return (
    <div
      className="flex shrink-0 items-center"
      style={{
        height: "var(--ribbon-bar-height)",
        gap: "var(--ribbon-item-gap)",
      }}
    >
      <RibbonIcon />
      <span className="type-marquee whitespace-nowrap">{label}</span>
    </div>
  );
}

export function RibbonMarquee({
  items,
  active,
  direction = "left",
  edgeColor,
}: RibbonMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const loopDistanceRef = useRef(0);
  const expandedItems = useMemo(() => expandItems(items), [items]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !active) return;

    const firstSet = track.querySelector<HTMLElement>('[data-ribbon-set="a"]');
    if (!firstSet) return;

    const run = () => {
      const distance = measureSetWidth(firstSet);
      if (distance <= 0) return;
      if (distance === loopDistanceRef.current && tweenRef.current?.isActive()) {
        return;
      }

      loopDistanceRef.current = distance;
      tweenRef.current?.kill();

      if (prefersReducedMotion()) {
        gsap.set(track, { x: 0 });
        return;
      }

      if (direction === "left") {
        gsap.set(track, { x: 0 });
        tweenRef.current = gsap.to(track, {
          x: -distance,
          duration: distance / RIBBON_MARQUEE_SPEED,
          ease: "none",
          repeat: -1,
          force3D: true,
        });
      } else {
        gsap.set(track, { x: -distance });
        tweenRef.current = gsap.to(track, {
          x: 0,
          duration: distance / RIBBON_MARQUEE_SPEED,
          ease: "none",
          repeat: -1,
          force3D: true,
        });
      }
    };

    run();

    const ro = new ResizeObserver(run);
    ro.observe(firstSet);

    return () => {
      ro.disconnect();
      tweenRef.current?.kill();
      loopDistanceRef.current = 0;
    };
  }, [active, direction, expandedItems]);

  const content = expandedItems.map((label, index) => (
    <RibbonMarqueeItem key={`${label}-${index}`} label={label} />
  ));

  const setClass = "flex shrink-0 flex-nowrap items-center";
  const setStyle = { gap: "var(--ribbon-item-gap)" } as const;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10"
        style={{
          width: "var(--ribbon-edge-fade)",
          background: `linear-gradient(to right, ${edgeColor} 42%, transparent)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10"
        style={{
          width: "var(--ribbon-edge-fade)",
          background: `linear-gradient(to left, ${edgeColor} 42%, transparent)`,
        }}
      />
      <div
        ref={trackRef}
        className="ribbon-marquee-track flex w-max flex-nowrap items-center"
        style={{ height: "var(--ribbon-bar-height)" }}
      >
        <div data-ribbon-set="a" className={setClass} style={setStyle}>
          {content}
        </div>
        <div data-ribbon-set="b" className={setClass} style={setStyle} aria-hidden>
          {content}
        </div>
      </div>
    </div>
  );
}
