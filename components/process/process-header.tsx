import { SectionHeading } from "@/components/section-heading";
import { PROCESS_EYEBROW, PROCESS_HEADING } from "@/components/process/data";

export function ProcessHeader() {
  return (
    <div data-process-header>
      <SectionHeading
        variant="inverse"
        showRule
        eyebrow={PROCESS_EYEBROW}
        titleLead={PROCESS_HEADING.titleLead}
        titleEmphasis={PROCESS_HEADING.titleEmphasis}
        subtitle={PROCESS_HEADING.subtitle}
        eyebrowDataAttr="data-process-eyebrow"
        titleLeadDataAttr="data-process-title-lead"
        titleEmphasisDataAttr="data-process-title-emphasis"
        subtitleDataAttr="data-process-subtitle"
      />
    </div>
  );
}
