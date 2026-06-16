"use client";

import { useContactSectionAnimations } from "@/components/contact/contact-animations";
import { ContactCard } from "@/components/contact/contact-card";

/**
 * Contact section — dark card with enquiry form and support email marquee.
 */
export function ContactSection() {
  const { sectionRef, emailMarqueeActive } = useContactSectionAnimations();

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-contact-section
      aria-label="Contact"
      className="contact-section scroll-mt-8"
    >
      <div className="contact-section__inner">
        <ContactCard emailMarqueeActive={emailMarqueeActive} />
      </div>
    </section>
  );
}
