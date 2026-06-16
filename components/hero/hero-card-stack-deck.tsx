"use client";

import gsap from "gsap";
import { usePreloaderReady } from "@/components/preloader";
import { heroCardImages } from "@/lib/images";
import { useLayoutEffect, useRef } from "react";

const CARD_START = [
  { x: "56vw", y: "-8vh", z: -880, rotX: -8, rotY: 38, rotZ: -32 },
  { x: "70vw", y: "10vh", z: -1280, rotX: 12, rotY: 64, rotZ: 18 },
  { x: "44vw", y: "6vh", z: -1080, rotX: 6, rotY: 22, rotZ: -38 },
  { x: "62vw", y: "34vh", z: -1620, rotX: -2, rotY: 52, rotZ: 26 },
  { x: "48vw", y: "40vh", z: -1380, rotX: 16, rotY: 44, rotZ: -14 },
] as const;

const DECK_PITCH = { rotX: 25, rotY: -15 } as const;

type FinalCardPose = {
  x: number;
  y: number;
  z: number;
  rotZ: number;
  zIndex: number;
};

const CARD_FINAL: readonly FinalCardPose[] = [
  { x: -40, y: -24, z: 0, rotZ: -14, zIndex: 5 },
  { x: 4, y: 50, z: -34, rotZ: -8, zIndex: 4 },
  { x: 44, y: 118, z: -68, rotZ: -2, zIndex: 3 },
  { x: 84, y: 194, z: -102, rotZ: 4, zIndex: 2 },
  { x: 124, y: 272, z: -136, rotZ: 12, zIndex: 1 },
];

const STAGGER = 0.12;
const ENTRANCE_DURATION = 1.55;
const CARD_COUNT = CARD_FINAL.length;
const BACK_SLOT = CARD_COUNT - 1;
const FRONT_HOLD = 2.5;
const PASS_DURATION = 2.85;
const UNDER_START = 0.3;
const UNDER_DURATION = PASS_DURATION * 0.94;
const SMOOTH_EASE = "sine.inOut";
const CARD_ORIGIN = "50% 94%";

function findCardAtSlot(slots: readonly number[], slot: number) {
  return slots.findIndex((s) => s === slot);
}

function setCardZIndex(el: HTMLDivElement, zIndex: number) {
  el.style.zIndex = String(zIndex);
}

function samplePassPose(
  t: number,
  top: FinalCardPose,
  back: FinalCardPose,
) {
  const arc = Math.sin(Math.PI * t) ** 2;
  const tilt = Math.sin(Math.PI * t) ** 1.5;
  const trackX = top.x + (back.x - top.x) * t;
  const trackY = top.y + (back.y - top.y) * t;
  const trackZ = top.z + (back.z - top.z) * t;

  return {
    x: trackX - 34 * arc,
    y: trackY - 20 * arc,
    z: trackZ + 28 * arc,
    rotationX: -46 * tilt * (1 - t * 0.38),
    rotationZ: top.rotZ + (back.rotZ - top.rotZ) * t,
  };
}

type HeroCardStackDeckProps = {
  className?: string;
};

/** 3D GSAP card cycle — ported from dd-code-demo. */
export function HeroCardStackDeck({ className = "" }: HeroCardStackDeckProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardSlotRef = useRef([0, 1, 2, 3, 4]);
  const ready = usePreloaderReady();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const deck = deckRef.current;
    if (!root || !deck || !ready) return;

    const outers = outerRefs.current.filter(Boolean) as HTMLDivElement[];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const applyDeckPitch = () => {
      const narrow = window.matchMedia("(max-width: 1023px)").matches;
      gsap.set(deck, {
        x: narrow ? "-2%" : "0%",
        rotationX: DECK_PITCH.rotX,
        rotationY: DECK_PITCH.rotY,
        force3D: true,
      });
    };

    const ctx = gsap.context(() => {
      applyDeckPitch();

      if (reduceMotion) {
        CARD_FINAL.forEach((fin, i) => {
          const el = outers[i];
          if (!el) return;
          gsap.set(el, {
            x: fin.x,
            y: fin.y,
            xPercent: -50,
            yPercent: -50,
            z: fin.z,
            rotationZ: fin.rotZ,
            autoAlpha: 1,
            force3D: true,
          });
        });
        return;
      }

      outers.forEach((el, i) => {
        const from = CARD_START[i];
        const fin = CARD_FINAL[i];
        if (!el || !from || !fin) return;
        gsap.set(el, {
          x: from.x,
          y: from.y,
          xPercent: -50,
          yPercent: -50,
          z: from.z,
          rotationX: from.rotX,
          rotationY: from.rotY,
          rotationZ: from.rotZ,
          autoAlpha: 0,
          force3D: true,
          transformOrigin: CARD_ORIGIN,
        });
      });

      const runDeckCycle = () => {
        const slots = cardSlotRef.current;
        const frontCardIndex = findCardAtSlot(slots, 0);
        const frontEl = frontCardIndex >= 0 ? outers[frontCardIndex] : null;
        const topPose = CARD_FINAL[0];
        const backPose = CARD_FINAL[BACK_SLOT];
        if (!frontEl || !topPose || !backPose) return;

        const cycle = gsap.timeline({ onComplete: runDeckCycle });
        cycle.to({}, { duration: FRONT_HOLD });

        const moveAt = FRONT_HOLD;
        const pass = { t: 0 };
        let tuckedBehind = false;

        const setFrontX = gsap.quickSetter(frontEl, "x", "px");
        const setFrontY = gsap.quickSetter(frontEl, "y", "px");
        const setFrontZ = gsap.quickSetter(frontEl, "z", "px");
        const setFrontRotX = gsap.quickSetter(frontEl, "rotationX", "deg");
        const setFrontRotZ = gsap.quickSetter(frontEl, "rotationZ", "deg");
        const setFrontRotY = gsap.quickSetter(frontEl, "rotationY", "deg");

        cycle.to(
          pass,
          {
            t: 1,
            duration: PASS_DURATION,
            ease: SMOOTH_EASE,
            onUpdate: () => {
              const pose = samplePassPose(pass.t, topPose, backPose);
              setFrontX(pose.x);
              setFrontY(pose.y);
              setFrontZ(pose.z);
              setFrontRotX(pose.rotationX);
              setFrontRotZ(pose.rotationZ);
              setFrontRotY(0);
              if (!tuckedBehind && pass.t > 0.36) {
                tuckedBehind = true;
                setCardZIndex(frontEl, 1);
              }
            },
            onComplete: () => {
              setFrontX(backPose.x);
              setFrontY(backPose.y);
              setFrontZ(backPose.z);
              setFrontRotX(0);
              setFrontRotZ(backPose.rotZ);
              setFrontRotY(0);
              cardSlotRef.current[frontCardIndex] = BACK_SLOT;
              setCardZIndex(frontEl, backPose.zIndex);
            },
          },
          moveAt,
        );

        const underAt = moveAt + PASS_DURATION * UNDER_START;

        for (let fromSlot = 1; fromSlot < CARD_COUNT; fromSlot += 1) {
          const cardIndex = findCardAtSlot(slots, fromSlot);
          const el = cardIndex >= 0 ? outers[cardIndex] : null;
          const toPose = CARD_FINAL[fromSlot - 1];
          if (!el || !toPose) continue;

          const toSlot = fromSlot - 1;
          const ripple = (fromSlot - 1) * 0.055;

          cycle.to(
            el,
            {
              x: toPose.x,
              y: toPose.y,
              z: toPose.z,
              rotationX: 0,
              rotationY: 0,
              rotationZ: toPose.rotZ,
              duration: UNDER_DURATION,
              ease: SMOOTH_EASE,
              force3D: true,
              onStart: () => setCardZIndex(el, toPose.zIndex),
              onComplete: () => {
                cardSlotRef.current[cardIndex] = toSlot;
              },
            },
            underAt + ripple,
          );
        }
      };

      const tl = gsap.timeline({ onComplete: runDeckCycle });

      outers.forEach((el, i) => {
        const fin = CARD_FINAL[i];
        if (!el || !fin) return;
        const slot = i * STAGGER;
        tl.to(
          el,
          {
            autoAlpha: 1,
            duration: ENTRANCE_DURATION * 0.22,
            ease: "power2.out",
            force3D: true,
          },
          slot,
        );
        tl.to(
          el,
          {
            x: fin.x,
            y: fin.y,
            z: fin.z,
            rotationX: 0,
            rotationY: 0,
            rotationZ: fin.rotZ,
            duration: ENTRANCE_DURATION,
            ease: "power2.inOut",
            force3D: true,
          },
          slot,
        );
      });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <div
      ref={rootRef}
      className={`pointer-events-none size-full min-h-[inherit] overflow-visible select-none ${className}`}
      data-name="hero-card-stack"
    >
      <div
        className="relative size-full min-h-[inherit] overflow-visible lg:[perspective-origin:50%_42%]"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "38% 42%",
        }}
      >
        <div
          ref={deckRef}
          className="absolute inset-x-0 top-0 bottom-[-1rem] flex items-center justify-center overflow-visible"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            transform: `rotateX(${DECK_PITCH.rotX}deg) rotateY(${DECK_PITCH.rotY}deg)`,
          }}
        >
          {heroCardImages.map((src, i) => {
            const fin = CARD_FINAL[i];
            return (
              <div
                key={src}
                ref={(el) => {
                  outerRefs.current[i] = el;
                }}
                className="absolute left-[30%] top-[14%] w-[min(64%,700px)] max-w-[700px] lg:left-[41%] lg:top-[20%] xl:left-[43%]"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: CARD_ORIGIN,
                  zIndex: fin?.zIndex,
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="overflow-visible pb-1"
                  style={{
                    filter:
                      "drop-shadow(0 22px 36px rgba(15, 23, 42, 0.18)) drop-shadow(0 8px 12px rgba(15, 23, 42, 0.08))",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={src}
                    draggable={false}
                    className="pointer-events-none block h-auto w-full rounded-[28px] border border-black/6 object-cover"
                    style={{
                      aspectRatio: "85.6 / 53.98",
                      backfaceVisibility: "hidden",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
