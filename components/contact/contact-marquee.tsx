"use client";

import { CONTACT_EMAIL_MARQUEE_SPEED } from "@/components/contact/data";
import gsap from "gsap";
import { useLayoutEffect, useRef, type ReactNode } from "react";

export type ContactMarqueeDirection = "left" | "right";

type ContactMarqueeProps = {
  children: ReactNode;
  active: boolean;
  direction?: ContactMarqueeDirection;
  gap?: string;
  edgeColor: string;
  className?: string;
  trackClassName?: string;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function measureSetWidth(element: HTMLElement) {
  return Math.round(element.getBoundingClientRect().width);
}

export function ContactMarquee({
  children,
  active,
  direction = "left",
  gap = "4.5rem",
  edgeColor,
  className = "",
  trackClassName = "",
}: ContactMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const loopDistanceRef = useRef(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !active) return;

    const firstSet = track.querySelector<HTMLElement>('[data-contact-marquee-set="a"]');
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

      const duration = distance / CONTACT_EMAIL_MARQUEE_SPEED;

      if (direction === "left") {
        gsap.set(track, { x: 0 });
        tweenRef.current = gsap.to(track, {
          x: -distance,
          duration,
          ease: "none",
          repeat: -1,
          force3D: true,
        });
      } else {
        gsap.set(track, { x: -distance });
        tweenRef.current = gsap.to(track, {
          x: 0,
          duration,
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
  }, [active, direction, children]);

  const setClass = `flex shrink-0 flex-nowrap items-center ${trackClassName}`.trim();

  return (
    <div className={`relative w-full overflow-hidden ${className}`.trim()}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(3rem,8vw,5.5rem)]"
        style={{
          background: `linear-gradient(to right, ${edgeColor} 28%, transparent)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(3rem,8vw,5.5rem)]"
        style={{
          background: `linear-gradient(to left, ${edgeColor} 28%, transparent)`,
        }}
      />
      <div
        ref={trackRef}
        className={`flex w-max flex-nowrap items-center will-change-transform ${trackClassName}`.trim()}
        style={{ gap }}
      >
        <div data-contact-marquee-set="a" className={setClass} style={{ gap }}>
          {children}
        </div>
        <div data-contact-marquee-set="b" className={setClass} style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
