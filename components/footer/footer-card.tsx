import { FOOTER_NAV_COLUMNS } from "@/components/footer/data";
import { FooterBackground } from "@/components/footer/footer-background";
import { FooterBar } from "@/components/footer/footer-bar";
import { FooterNavColumn } from "@/components/footer/footer-nav-column";

export function FooterCard() {
  return (
    <div className="footer-shell">
      <div className="footer-card" data-footer-reveal-target data-name="Footer card">
        <FooterBackground />

        <div className="footer-card__content">
          <div data-footer-animate className="footer-card__nav" data-name="Top">
            {FOOTER_NAV_COLUMNS.map((column) => (
              <FooterNavColumn key={column.title} column={column} />
            ))}
          </div>

          <div data-footer-animate className="footer-card__bottom" data-name="Bottom">
            <FooterBar />
          </div>
        </div>
      </div>
    </div>
  );
}
