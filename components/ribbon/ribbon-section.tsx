"use client";

import { RIBBON_SERVICES, RIBBON_STATS } from "@/components/ribbon/data";
import { readRibbonLayout } from "@/components/ribbon/ribbon-layout";
import { RibbonBar } from "@/components/ribbon/ribbon-bar";
import { RibbonMarquee } from "@/components/ribbon/ribbon-marquee";
import { usePreloaderReady } from "@/components/preloader";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const ENTRANCE_DURATION = 1.45;
const ENTRANCE_STAGGER = 0.1;

function slideOffset() {
  return Math.round(window.innerWidth * 0.88);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setRibbonTransform(
  element: HTMLElement,
  layout: ReturnType<typeof readRibbonLayout>,
  x: number,
  layer: "stats" | "services",
) {
  const rotation =
    layer === "stats" ? layout.statsRotation : layout.servicesRotation;

  gsap.set(element, {
    xPercent: -50,
    yPercent: -50,
    x,
    y: 0,
    rotation,
    transformOrigin: "50% 50%",
    force3D: true,
  });
}

/**
 * Two counter-rotated marquee ribbons sharing one center point so they cross
 * in a true X. Slides in from opposite sides on first intersection, then marquees.
 */
export function RibbonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRibbonRef = useRef<HTMLDivElement>(null);
  const servicesRibbonRef = useRef<HTMLDivElement>(null);
  const ready = usePreloaderReady();
  const [marqueeActive, setMarqueeActive] = useState(false);
  const hasEntered = useRef(false);
  const observerPrimed = useRef(false);
  const entranceTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!ready) return;

    const section = sectionRef.current;
    const statsEl = statsRibbonRef.current;
    const servicesEl = servicesRibbonRef.current;
    if (!section || !statsEl || !servicesEl || hasEntered.current) return;

    const layout = readRibbonLayout(section);
    const offset = slideOffset();
    setRibbonTransform(statsEl, layout, offset, "stats");
    setRibbonTransform(servicesEl, layout, -offset, "services");
  }, [ready]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;

    const syncLayout = () => {
      const statsEl = statsRibbonRef.current;
      const servicesEl = servicesRibbonRef.current;
      if (!statsEl || !servicesEl) return;

      const layout = readRibbonLayout(section);

      gsap.set(statsEl, { y: 0, rotation: layout.statsRotation });
      gsap.set(servicesEl, { y: 0, rotation: layout.servicesRotation });
    };

    const runEntrance = () => {
      if (hasEntered.current) return;

      const statsEl = statsRibbonRef.current;
      const servicesEl = servicesRibbonRef.current;
      if (!statsEl || !servicesEl) return;

      hasEntered.current = true;
      setMarqueeActive(false);

      const layout = readRibbonLayout(section);

      if (prefersReducedMotion()) {
        setRibbonTransform(statsEl, layout, 0, "stats");
        setRibbonTransform(servicesEl, layout, 0, "services");
        setMarqueeActive(true);
        return;
      }

      const offset = slideOffset();
      setRibbonTransform(statsEl, layout, offset, "stats");
      setRibbonTransform(servicesEl, layout, -offset, "services");

      entranceTimelineRef.current?.kill();
      entranceTimelineRef.current = gsap
        .timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => setMarqueeActive(true),
        })
        .fromTo(
          servicesEl,
          {
            xPercent: -50,
            yPercent: -50,
            x: -offset,
            y: 0,
            rotation: layout.servicesRotation,
          },
          {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            rotation: layout.servicesRotation,
            duration: ENTRANCE_DURATION,
          },
          0,
        )
        .fromTo(
          statsEl,
          {
            xPercent: -50,
            yPercent: -50,
            x: offset,
            y: 0,
            rotation: layout.statsRotation,
          },
          {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            rotation: layout.statsRotation,
            duration: ENTRANCE_DURATION,
          },
          ENTRANCE_STAGGER,
        );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!observerPrimed.current) {
          observerPrimed.current = true;
          if (entry.isIntersecting) return;
        }
        if (entry.isIntersecting) runEntrance();
      },
      { threshold: 0.18, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(section);

    requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.82 && rect.bottom > window.innerHeight * 0.08;
      if (inView) runEntrance();
    });

    window.addEventListener("resize", syncLayout);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncLayout);
      entranceTimelineRef.current?.kill();
    };
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      aria-label="Highlights"
      className="ribbon-section"
      data-name="ribbon-bars"
    >
      <div className="ribbon-stage relative mx-auto flex items-center justify-center">
        <div
          ref={statsRibbonRef}
          className="ribbon-layer ribbon-layer--stats absolute left-1/2 top-1/2 will-change-transform"
        >
          <RibbonBar variant="stats">
            <RibbonMarquee
              items={RIBBON_STATS}
              active={marqueeActive}
              direction="left"
              edgeColor="var(--color-ink)"
            />
          </RibbonBar>
        </div>

        <div
          ref={servicesRibbonRef}
          className="ribbon-layer ribbon-layer--services absolute left-1/2 top-1/2 will-change-transform"
        >
          <RibbonBar variant="services">
            <RibbonMarquee
              items={RIBBON_SERVICES}
              active={marqueeActive}
              direction="right"
              edgeColor="var(--color-brand)"
            />
          </RibbonBar>
        </div>
      </div>
    </section>
  );
}
