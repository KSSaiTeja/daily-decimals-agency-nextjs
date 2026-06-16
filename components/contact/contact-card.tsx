import { CONTACT_COPY, CONTACT_HEADING } from "@/components/contact/data";
import { ContactEmailMarquee } from "@/components/contact/contact-email-marquee";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactPatternBackground } from "@/components/contact/contact-pattern-background";
import { masks } from "@/lib/svg/masks";

type ContactCardProps = {
  emailMarqueeActive: boolean;
};

export function ContactCard({ emailMarqueeActive }: ContactCardProps) {
  return (
    <div
      data-contact-card
      data-contact-reveal-target
      className="relative w-full overflow-hidden rounded-[clamp(20px,2.5vw,32px)]"
      data-name="Contact card"
    >
      <div data-contact-animate className="absolute inset-0" aria-hidden>
        <ContactPatternBackground />
      </div>

      <div
        data-contact-heading
        data-contact-animate
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] flex justify-center overflow-hidden"
        style={{
          WebkitMaskImage: masks.contactHeadingFade,
          maskImage: masks.contactHeadingFade,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <div className="relative w-full px-[clamp(16px,4vw,48px)] pt-[clamp(28px,4vw,48px)]">
          <div
            className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent via-[#0c0c0c]/40 to-[#0c0c0c]"
            aria-hidden
          />
          <h2
            data-contact-heading-title
            className="type-display-lead-inverse relative text-center text-[clamp(4.5rem,11vw,12.75rem)] leading-[0.92] bg-gradient-to-b from-white/[0.32] via-white/[0.16] to-transparent bg-clip-text text-transparent"
          >
            {CONTACT_HEADING}
          </h2>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center px-[clamp(32px,6vw,96px)] pb-[64px] pt-[clamp(152px,18vw,220px)]">
        <div className="flex w-full flex-col gap-[56px]">
          <div className="grid w-full grid-cols-1 items-start gap-[48px] lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-[64px]">
            <div
              data-contact-copy
              data-contact-animate
              className="flex flex-col gap-4 text-white"
            >
              <h3 className="type-display-inverse text-[clamp(2.5rem,5vw,4rem)] leading-[1.06]">
                {CONTACT_COPY.titleLines[0]}
                <br />
                {CONTACT_COPY.titleLines[1]}
              </h3>
              <p className="type-lead-inverse text-[clamp(1.125rem,1.5vw,1.25rem)]">
                {CONTACT_COPY.subtitle}
              </p>
            </div>

            <ContactForm />
          </div>

          <div data-contact-animate className="w-full">
            <ContactEmailMarquee active={emailMarqueeActive} />
          </div>
        </div>
      </div>
    </div>
  );
}
