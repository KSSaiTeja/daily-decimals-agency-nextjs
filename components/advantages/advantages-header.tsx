import { SectionHeading } from "@/components/section-heading";
import { ADVANTAGES_EYEBROW, ADVANTAGES_HEADING } from "@/components/advantages/data";

export function AdvantagesHeader() {
  return (
    <SectionHeading
      eyebrow={ADVANTAGES_EYEBROW}
      titleLead={ADVANTAGES_HEADING.titleLead}
      titleEmphasis={ADVANTAGES_HEADING.titleEmphasis}
      subtitle={ADVANTAGES_HEADING.subtitle}
      eyebrowDataAttr="data-advantages-eyebrow"
      titleLeadDataAttr="data-advantages-title-lead"
      titleEmphasisDataAttr="data-advantages-title-emphasis"
      subtitleDataAttr="data-advantages-subtitle"
    />
  );
}
