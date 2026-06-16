import { SectionHeading } from "@/components/section-heading";
import { FUNNEL_EYEBROW, FUNNEL_HEADING } from "@/components/funnel/data";

export function FunnelHeader() {
  return (
    <SectionHeading
      eyebrow={FUNNEL_EYEBROW}
      titleLead={FUNNEL_HEADING.titleLead}
      titleEmphasis={FUNNEL_HEADING.titleEmphasis}
      subtitle={FUNNEL_HEADING.subtitle}
      eyebrowDataAttr="data-funnel-eyebrow"
      titleLeadDataAttr="data-funnel-title-lead"
      titleEmphasisDataAttr="data-funnel-title-emphasis"
      subtitleDataAttr="data-funnel-subtitle"
    />
  );
}
