import {
  FOOTER_BRAND,
  FOOTER_CONTACT,
  FOOTER_NAV,
  FOOTER_SOCIALS,
  type FooterSocialIcon,
} from "@/components/footer/data";
import { FooterBackground } from "@/components/footer/footer-background";
import { FooterBar } from "@/components/footer/footer-bar";
import { FooterNavColumn } from "@/components/footer/footer-nav-column";
import { logoSecondary } from "@/lib/images";

function SocialIcon({ name }: { name: FooterSocialIcon }) {
  switch (name) {
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9V9Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M14 9V7.2c0-.83.4-1.2 1.3-1.2H17V3h-2.5C11.9 3 11 4.6 11 6.6V9H9v3h2v9h3v-9h2.2l.5-3H14Z" />
        </svg>
      );
    case "behance":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8.3 11.4c.9-.45 1.4-1.18 1.4-2.27 0-2.02-1.5-2.88-3.4-2.88H1v11.1h5.5c2.05 0 3.86-.99 3.86-3.28 0-1.42-.67-2.36-2.06-2.67ZM3.4 8.13h2.4c.82 0 1.46.27 1.46 1.18 0 .84-.55 1.18-1.34 1.18H3.4V8.13Zm2.6 6.34H3.4v-2.55h2.66c.95 0 1.55.4 1.55 1.3 0 .92-.71 1.25-1.61 1.25ZM23 12.8c0-2.4-1.4-4.4-3.93-4.4-2.46 0-4.13 1.85-4.13 4.27 0 2.5 1.58 4.25 4.13 4.25 1.93 0 3.18-.87 3.78-2.72h-2.06c-.21.61-.74.9-1.62.9-1.07 0-1.74-.7-1.79-1.79H23c.01-.26 0-.5 0-.71Zm-5.59-.79c.12-.95.71-1.55 1.66-1.55.97 0 1.5.6 1.55 1.55h-3.21ZM15.06 7.07h4.66V6h-4.66v1.07Z" />
        </svg>
      );
  }
}

function FooterContactBlock() {
  return (
    <div className="footer-contact-block">
      <p className="footer-coffee">{FOOTER_CONTACT.coffeeLabel}</p>
      <p className="footer-cities">{FOOTER_CONTACT.cities}</p>

      <p className="footer-contact__label">{FOOTER_CONTACT.contactLabel}</p>
      <div className="footer-contact__lines">
        <a className="footer-contact__link" href={`mailto:${FOOTER_CONTACT.email}`}>
          {FOOTER_CONTACT.email}
        </a>
        {FOOTER_CONTACT.phones.map((phone) => (
          <a
            key={phone}
            className="footer-contact__link"
            href={`tel:${phone.replace(/\s+/g, "")}`}
          >
            {phone}
          </a>
        ))}
      </div>
    </div>
  );
}

function FooterSocials() {
  return (
    <div className="footer-socials" aria-label="Social media">
      {FOOTER_SOCIALS.map((social) => (
        <a
          key={social.label}
          className="footer-social"
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="footer-social__icon">
            <SocialIcon name={social.icon} />
          </span>
          <span className="footer-social__label">{social.label}</span>
        </a>
      ))}
    </div>
  );
}

export function FooterCard() {
  return (
    <div className="footer-shell">
      <div className="footer-card" data-footer-reveal-target data-name="Footer card">
        <FooterBackground />

        <div className="footer-card__content">
          <div data-footer-animate className="footer-top" data-name="Top">
            <div className="footer-brand">
              <img
                className="footer-brand__logo"
                src={logoSecondary}
                alt="Daily Decimals"
              />
              <p className="footer-brand__tagline">{FOOTER_BRAND.tagline}</p>
              <FooterContactBlock />
            </div>

            <div className="footer-nav">
              {FOOTER_NAV.map((column) => (
                <FooterNavColumn key={column.title} column={column} />
              ))}
              <div className="footer-follow">
                <p className="footer-follow__label">Follow us</p>
                <FooterSocials />
              </div>
            </div>
          </div>

          <div data-footer-animate className="footer-divider" aria-hidden />

          <div data-footer-animate className="footer-card__bottom" data-name="Bottom">
            <FooterBar />
          </div>
        </div>
      </div>
    </div>
  );
}
