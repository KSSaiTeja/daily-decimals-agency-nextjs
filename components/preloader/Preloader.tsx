"use client";

import gsap from "gsap";
import {
  Archivo_Black,
  Bebas_Neue,
  Italiana,
  Noto_Serif_Bengali,
  Noto_Serif_Devanagari,
  Noto_Serif_Malayalam,
  Playfair_Display,
  Syne,
  Tiro_Devanagari_Hindi,
  Tiro_Kannada,
  Tiro_Tamil,
  Tiro_Telugu,
} from "next/font/google";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { BrandLogo } from "@/components/brand";
import {
  initPageScrollStability,
} from "@/lib/animation/scroll-trigger-config";
import { PreloaderReadyContext } from "./PreloaderReadyContext";
import "./preloader.css";

const fontBebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" });
const fontPlayfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic", "normal"],
  display: "swap",
});
const fontItaliana = Italiana({ subsets: ["latin"], weight: "400", display: "swap" });
const fontArchivo = Archivo_Black({ subsets: ["latin"], weight: "400", display: "swap" });
const fontSyne = Syne({ subsets: ["latin"], weight: ["700", "800"], display: "swap" });
const fontTiroDeva = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  display: "swap",
});
const fontTiroTe = Tiro_Telugu({ subsets: ["telugu"], weight: "400", display: "swap" });
const fontTiroTa = Tiro_Tamil({ subsets: ["tamil"], weight: "400", display: "swap" });
const fontSerifDeva = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["600", "700"],
  display: "swap",
});
const fontSerifBn = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["600", "700"],
  display: "swap",
});
const fontTiroKn = Tiro_Kannada({ subsets: ["kannada"], weight: "400", display: "swap" });
const fontSerifMl = Noto_Serif_Malayalam({
  subsets: ["malayalam"],
  weight: ["600", "700"],
  display: "swap",
});

type StyleKey =
  | "condensed"
  | "devaClassic"
  | "teluguClassic"
  | "tamilClassic"
  | "devaSerif"
  | "bengaliSerif"
  | "kannadaClassic"
  | "malayalamSerif"
  | "editorial"
  | "parisian"
  | "block"
  | "futurist";

const styleClass: Record<StyleKey, string> = {
  condensed: `${fontBebas.className} preloader-tone-condensed`,
  devaClassic: `${fontTiroDeva.className} preloader-tone-script`,
  teluguClassic: `${fontTiroTe.className} preloader-tone-script`,
  tamilClassic: `${fontTiroTa.className} preloader-tone-script`,
  devaSerif: `${fontSerifDeva.className} preloader-tone-serif`,
  bengaliSerif: `${fontSerifBn.className} preloader-tone-serif`,
  kannadaClassic: `${fontTiroKn.className} preloader-tone-script`,
  malayalamSerif: `${fontSerifMl.className} preloader-tone-serif`,
  editorial: `${fontPlayfair.className} preloader-tone-editorial`,
  parisian: `${fontItaliana.className} preloader-tone-parisian`,
  block: `${fontArchivo.className} preloader-tone-block`,
  futurist: `${fontSyne.className} preloader-tone-futurist`,
};

type Greeting = { label: string; style: StyleKey };

const GREETINGS: readonly Greeting[] = [
  { label: "HELLO", style: "condensed" },
  { label: "नमस्ते", style: "devaClassic" },
  { label: "నమస్కారం", style: "teluguClassic" },
  { label: "வணக்கம்", style: "tamilClassic" },
  { label: "नमस्कार", style: "devaSerif" },
  { label: "নমস্কার", style: "bengaliSerif" },
  { label: "ನಮಸ್ಕಾರ", style: "kannadaClassic" },
  { label: "നമസ്കാരം", style: "malayalamSerif" },
  { label: "NAMASTE", style: "editorial" },
  { label: "BONJOUR", style: "parisian" },
  { label: "HOLA", style: "block" },
  { label: "KONNICHIWA", style: "futurist" },
];

const GREETING_BASE_CLASS = "preloader-greeting";
const CYCLE_DURATION = 2.85;
const HOLD_AT_END = 0.35;
const LOGO_REVEAL_DURATION = 0.65;
const LOGO_HOLD = 0.55;
const EXIT_DURATION = 0.95;

function applyGreeting(el: HTMLElement, greeting: Greeting) {
  el.textContent = greeting.label;
  el.className = `${GREETING_BASE_CLASS} ${styleClass[greeting.style]}`;
}

function getWordTimings() {
  const count = GREETINGS.length;
  const slot = CYCLE_DURATION / count;
  const fade = slot * 0.32;
  const hold = Math.max(0.04, slot - fade * 2);
  return { count, fade, hold };
}

function buildWordTimeline(tl: gsap.core.Timeline, wordEl: HTMLElement) {
  const { count, fade, hold } = getWordTimings();

  applyGreeting(wordEl, GREETINGS[0]);
  gsap.set(wordEl, { opacity: 1, force3D: true });
  tl.to({}, { duration: hold });

  for (let i = 1; i < count; i++) {
    tl.to(wordEl, { opacity: 0, duration: fade, ease: "power2.inOut" });
    tl.call(() => applyGreeting(wordEl, GREETINGS[i]));
    tl.to(wordEl, { opacity: 1, duration: fade, ease: "power2.inOut" });
    if (i < count - 1) {
      tl.to({}, { duration: hold });
    }
  }
}

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const wordSlotRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.body.classList.add("preloader-active");

    const overlay = overlayRef.current;
    const center = centerRef.current;
    const wordSlot = wordSlotRef.current;
    const wordEl = wordRef.current;
    const logoEl = logoRef.current;
    const counterEl = counterRef.current;

    if (!overlay || !center || !wordSlot || !wordEl || !logoEl || !counterEl) {
      document.body.classList.remove("preloader-active");
      onComplete();
      return;
    }

    const finish = () => {
      document.body.classList.remove("preloader-active");
      onComplete();
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      wordSlot.style.display = "none";
      gsap.set(logoEl, { opacity: 1, scale: 1, y: 0 });
      counterEl.textContent = "100";
      window.setTimeout(finish, 400);
      return () => document.body.classList.remove("preloader-active");
    }

    gsap.set(center, { y: 0, opacity: 1, force3D: true });
    gsap.set(counterEl, { opacity: 1 });
    gsap.set(logoEl, { opacity: 0, scale: 0.92, y: 10, force3D: true });
    counterEl.textContent = "0";

    const wordsTl = gsap.timeline();
    buildWordTimeline(wordsTl, wordEl);
    const contentDuration = wordsTl.duration();

    const counterObj = { value: 0 };
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.add(wordsTl, 0);
    tl.to(
      counterObj,
      {
        value: 100,
        duration: contentDuration,
        ease: "power1.inOut",
        onUpdate: () => {
          counterEl.textContent = String(Math.round(counterObj.value));
        },
      },
      0,
    );

    tl.to({}, { duration: HOLD_AT_END });

    tl.to(wordSlot, {
      opacity: 0,
      y: -8,
      duration: 0.45,
      ease: "power2.inOut",
      force3D: true,
    });

    tl.to(
      logoEl,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: LOGO_REVEAL_DURATION,
        ease: "power3.out",
        force3D: true,
      },
      "<0.08",
    );

    tl.to({}, { duration: LOGO_HOLD });

    tl.to(
      center,
      {
        y: "-22vh",
        opacity: 0,
        duration: EXIT_DURATION,
        ease: "power3.inOut",
        force3D: true,
      },
      ">",
    );

    tl.to(
      counterEl,
      { opacity: 0, duration: EXIT_DURATION * 0.65, ease: "power2.inOut" },
      "<0.25",
    );

    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.45,
        ease: "power2.inOut",
        onComplete: finish,
      },
      "<0.35",
    );

    return () => {
      tl.kill();
      document.body.classList.remove("preloader-active");
    };
  }, [onComplete]);

  const first = GREETINGS[0];

  return (
    <div
      ref={overlayRef}
      className="preloader-overlay"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div ref={centerRef} className="preloader-center">
        <div ref={wordSlotRef} className="preloader-word-slot">
          <span
            ref={wordRef}
            className={`${GREETING_BASE_CLASS} ${styleClass[first.style]}`}
          >
            {first.label}
          </span>
        </div>
        <div ref={logoRef} className="preloader-logo" aria-hidden>
          <BrandLogo className="w-[min(72vw,220px)]" alt="" />
        </div>
      </div>

      <div className="preloader-counter">
        <div
          ref={counterRef}
          className={`preloader-counter-text ${fontBebas.className} preloader-tone-counter`}
        >
          0
        </div>
      </div>
    </div>
  );
}

type PreloaderGateProps = {
  children: ReactNode;
};

/** Blocks page content until the preloader sequence finishes. */
export function PreloaderGate({ children }: PreloaderGateProps) {
  const [ready, setReady] = useState(false);
  const handleComplete = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!ready) return;
    return initPageScrollStability();
  }, [ready]);

  return (
    <PreloaderReadyContext.Provider value={ready}>
      <div className={ready ? undefined : "invisible"} aria-hidden={!ready}>
        {children}
      </div>
      {!ready ? <Preloader onComplete={handleComplete} /> : null}
    </PreloaderReadyContext.Provider>
  );
}
