"use client";

import { FOOTER_COPY } from "@/components/footer/data";
import { FooterIstClock } from "@/components/footer/footer-ist-clock";

export function FooterBar() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="footer-bar" data-name="Content">
      <p className="footer-bar__meta footer-bar__copyright">{FOOTER_COPY.copyright}</p>

      <p className="footer-bar__time">
        <span className="footer-bar__time-label">Local time</span>
        <FooterIstClock />
      </p>

      <button
        type="button"
        className="footer-bar__back-to-top"
        onClick={handleBackToTop}
      >
        Back to top ↑
      </button>
    </div>
  );
}
