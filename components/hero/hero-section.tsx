"use client";

import { HeroCardStack } from "@/components/hero/hero-card-stack";
import { HeroFounderTrust } from "@/components/hero/hero-founder-trust";
import { HeroGetQuoteButton } from "@/components/hero/hero-get-quote-button";
import { HeroHeadline } from "@/components/hero/hero-headline";
import { HeroPartnerMarquee } from "@/components/hero/hero-partner-marquee";
import { HeroStatusNotch } from "@/components/hero/hero-status-notch";
import { useFadeFromTop } from "@/components/hero/site-chrome";
import { logoPrimary } from "@/lib/images/urls";
import { scrollToTop } from "@/lib/navigation/scroll-to-section";

function HeroHeader() {
  const ref = useFadeFromTop(0);

  return (
    <header
      ref={ref}
      id="top"
      className="flex shrink-0 items-center justify-between px-[var(--page-gutter)] pb-2 pt-[calc(2.125rem+env(safe-area-inset-top,0px))] sm:pb-3 sm:pt-[calc(2.375rem+env(safe-area-inset-top,0px))] md:pt-[calc(2.5rem+env(safe-area-inset-top,0px))] lg:pb-5 lg:pt-[calc(2.75rem+env(safe-area-inset-top,0px))]"
      data-name="Header"
      style={{ opacity: 0 }}
    >
      <a
        href="#top"
        onClick={(event) => {
          event.preventDefault();
          scrollToTop();
        }}
        className="relative inline-flex shrink-0 cursor-pointer items-center justify-center"
        aria-label="Daily Decimals home"
      >
        <div className="relative h-9 w-[6.75rem] sm:h-10 sm:w-[7.5rem]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              alt="Daily Decimals"
              className="absolute top-[-87.99%] left-[-29.58%] h-[307.51%] w-[157.22%] max-w-none"
              src={logoPrimary}
            />
          </div>
        </div>
      </a>
      <HeroGetQuoteButton />
    </header>
  );
}

/**
 * Unified hero: fixed availability pill, vertically centered 3D card stack,
 * copy anchored bottom-left.
 */
export function HeroSection() {
  return (
    <section
      className="hero relative z-10 flex min-h-[100svh] w-full flex-col overflow-x-clip bg-surface lg:overflow-x-visible"
      aria-label="Hero"
    >
      <HeroStatusNotch />

      <HeroHeader />

      <div className="hero-inner mx-auto flex min-h-0 w-full max-w-[90rem] flex-1 flex-col gap-0 px-[var(--page-gutter)] pb-[calc(6.25rem+env(safe-area-inset-bottom,0px))] sm:gap-1 sm:pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] lg:grid lg:min-h-0 lg:grid-cols-2 lg:items-stretch lg:gap-10 lg:pb-20 xl:gap-12">
        <div className="hero-stack order-1 -mt-3 flex items-start justify-center overflow-visible sm:-mt-1 lg:order-2 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:min-h-0 lg:h-full lg:flex-1 lg:items-center lg:justify-center lg:py-0">
          <HeroCardStack />
        </div>

        <div className="hero-content order-2 -mt-5 flex min-w-0 shrink-0 flex-col sm:mt-0 lg:order-1 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:h-full lg:shrink lg:justify-end lg:pb-6 lg:pr-0 xl:pb-8">
          <div className="flex flex-col items-start gap-3 sm:gap-5 lg:gap-8">
            <HeroFounderTrust />
            <HeroHeadline />
          </div>
          <div className="mt-3 w-full min-w-0 sm:mt-5 lg:mt-14 xl:mt-16">
            <HeroPartnerMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}
