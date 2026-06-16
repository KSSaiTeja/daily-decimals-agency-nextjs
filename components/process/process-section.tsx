"use client";

import { useProcessSectionAnimations } from "@/components/process/process-animations";
import { ProcessBackground } from "@/components/process/process-background";
import { ProcessCards } from "@/components/process/process-cards";
import { ProcessHeader } from "@/components/process/process-header";
import { useRef } from "react";

/**
 * Methodology section — full-viewport pin with honeycomb card reveals on scroll.
 */
export function ProcessSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useProcessSectionAnimations({ trackRef, stickyRef });

  return (
    <section id="process" aria-label="Our process" className="process-section scroll-mt-8">
      <div ref={trackRef} data-process-pin-track className="process-pin-track">
        <div ref={stickyRef} data-process-sticky-viewport className="process-sticky-viewport">
          <div data-process-section className="process-panel">
            <ProcessBackground />

            <div data-process-sticky-shell className="process-sticky-shell">
              <ProcessHeader />
              <ProcessCards />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
