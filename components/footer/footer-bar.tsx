"use client";

import { FOOTER_COPY } from "@/components/footer/data";
import { FooterIstClock } from "@/components/footer/footer-ist-clock";
import { scrollToTop } from "@/lib/navigation/scroll-to-section";

export function FooterBar() {
  return (
    <div className="footer-bar" data-name="Content">
      <p className="footer-bar__meta footer-bar__copyright">{FOOTER_COPY.copyright}</p>

      <div className="footer-bar__time" data-name="Time">
        <span className="footer-bar__meta">{FOOTER_COPY.timezoneLabel}</span>
        <FooterIstClock />
      </div>

      <button
        type="button"
        className="footer-bar__back-to-top"
        onClick={scrollToTop}
      >
        {FOOTER_COPY.backToTop}
      </button>
    </div>
  );
}
