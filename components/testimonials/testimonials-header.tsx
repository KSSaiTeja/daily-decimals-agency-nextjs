import { SectionHeading } from "@/components/section-heading";
import {
  TESTIMONIALS_EYEBROW,
  TESTIMONIALS_HEADING,
} from "@/components/testimonials/data";

export function TestimonialsHeader() {
  return (
    <SectionHeading
      eyebrow={TESTIMONIALS_EYEBROW}
      titleLead={TESTIMONIALS_HEADING.titleLead}
      titleEmphasis={TESTIMONIALS_HEADING.titleEmphasis}
      subtitle={TESTIMONIALS_HEADING.subtitle}
      eyebrowDataAttr="data-testimonials-eyebrow"
      titleLeadDataAttr="data-testimonials-title-lead"
      titleEmphasisDataAttr="data-testimonials-title-emphasis"
      subtitleDataAttr="data-testimonials-subtitle"
    />
  );
}
