"use client";

import { useFunnelSectionAnimations } from "@/components/funnel/funnel-animations";
import { FunnelBody } from "@/components/funnel/funnel-body";
import { FunnelHeader } from "@/components/funnel/funnel-header";
import { useRef } from "react";

/**
 * Scroll-pinned growth funnel — heading scrolls through first; only the strip
 * diagram and stage content pin for the scrubbed stage progression.
 */
export function FunnelSection() {
  const stickyRef = useRef<HTMLDivElement>(null);

  useFunnelSectionAnimations({ stickyRef });

  return (
    <section
      id="funnel"
      data-funnel-section
      aria-label="Growth funnel"
      className="funnel-section scroll-mt-8"
    >
      <div data-funnel-pin-track className="funnel-pin-track">
        <div ref={stickyRef} data-funnel-sticky-viewport className="funnel-sticky-viewport">
          <div className="funnel-sticky__inner">
            <div data-funnel-intro className="funnel-sticky__header">
              <FunnelHeader />
            </div>
            <FunnelBody />
          </div>
        </div>
      </div>
    </section>
  );
}
