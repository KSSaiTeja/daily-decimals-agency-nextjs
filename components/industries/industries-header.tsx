import { SectionHeading } from "@/components/section-heading";
import { INDUSTRIES_EYEBROW, INDUSTRIES_HEADING } from "./data";

export function IndustriesHeader() {
  return (
    <SectionHeading
      eyebrow={INDUSTRIES_EYEBROW}
      titleLead={INDUSTRIES_HEADING.titleLead}
      titleEmphasis={INDUSTRIES_HEADING.titleEmphasis}
      subtitle={INDUSTRIES_HEADING.subtitle}
      eyebrowDataAttr="data-industries-eyebrow"
      titleLeadDataAttr="data-industries-title-lead"
      titleEmphasisDataAttr="data-industries-title-emphasis"
      subtitleDataAttr="data-industries-subtitle"
    />
  );
}
