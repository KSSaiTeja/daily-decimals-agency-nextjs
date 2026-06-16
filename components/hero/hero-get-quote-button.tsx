"use client";

import { CONTACT_SECTION_ID } from "@/lib/navigation/site-sections";
import { scrollToSection } from "@/lib/navigation/scroll-to-section";

type HeroGetQuoteButtonProps = {
  className?: string;
};

export function HeroGetQuoteButton({ className = "" }: HeroGetQuoteButtonProps) {
  return (
    <button
      type="button"
      onClick={() => scrollToSection(CONTACT_SECTION_ID)}
      className={`relative flex min-h-[44px] shrink-0 cursor-pointer items-center justify-center overflow-clip rounded-full bg-[rgba(12,12,12,0.82)] px-5 py-2.5 shadow-[0px_12px_12px_-6px_rgba(26,26,26,0.12)] transition-transform duration-200 active:scale-[0.98] sm:px-6 ${className}`.trim()}
      data-name="Link - Secondary"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-full rounded-full bg-brand"
      />
      <span className="relative text-[15px] font-medium leading-none tracking-[-0.14px] whitespace-nowrap text-white">
        Get Quote
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full border border-brand"
      />
    </button>
  );
}
