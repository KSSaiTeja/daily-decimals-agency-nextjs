import {
  CONTACT_CARD_EDGE,
  CONTACT_EMAIL_MARQUEE_COPIES,
  CONTACT_EMAIL_MARQUEE_GAP,
  CONTACT_SUPPORT_EMAIL,
} from "@/components/contact/data";
import { ContactMarquee } from "@/components/contact/contact-marquee";
import { masks } from "@/lib/svg/masks";

function EmailMarqueeItem() {
  return (
    <span className="type-title whitespace-nowrap text-[clamp(1.5rem,3vw,2.25rem)] text-white">
      {CONTACT_SUPPORT_EMAIL}
    </span>
  );
}

type ContactEmailMarqueeProps = {
  active: boolean;
};

export function ContactEmailMarquee({ active }: ContactEmailMarqueeProps) {
  return (
    <div
      data-contact-email-marquee
      className="relative h-[64px] w-full overflow-hidden"
      style={{
        WebkitMaskImage: masks.fadeHorizontalCompact,
        maskImage: masks.fadeHorizontalCompact,
      }}
    >
      <ContactMarquee
        active={active}
        direction="left"
        gap={CONTACT_EMAIL_MARQUEE_GAP}
        edgeColor={CONTACT_CARD_EDGE}
        className="h-[64px]"
        trackClassName="h-[64px]"
      >
        {Array.from({ length: CONTACT_EMAIL_MARQUEE_COPIES }, (_, index) => (
          <EmailMarqueeItem key={index} />
        ))}
      </ContactMarquee>
    </div>
  );
}
