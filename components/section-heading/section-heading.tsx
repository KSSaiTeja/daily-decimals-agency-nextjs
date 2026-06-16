import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  titleLead: string;
  titleEmphasis: string;
  subtitle?: string;
  variant?: "default" | "inverse";
  showRule?: boolean;
  eyebrowDataAttr?: string;
  titleLeadDataAttr?: string;
  titleEmphasisDataAttr?: string;
  subtitleDataAttr?: string;
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  titleLead,
  titleEmphasis,
  subtitle,
  variant = "default",
  showRule = false,
  eyebrowDataAttr = "data-section-eyebrow",
  titleLeadDataAttr = "data-section-title-lead",
  titleEmphasisDataAttr = "data-section-title-emphasis",
  subtitleDataAttr = "data-section-subtitle",
  className = "",
  children,
}: SectionHeadingProps) {
  const isInverse = variant === "inverse";
  const rootClass = `section-heading${isInverse ? " section-heading--inverse" : ""}${className ? ` ${className}` : ""}`;

  return (
    <div className={rootClass}>
      <div className="section-heading__eyebrow-wrap text-center">
        <p className="type-eyebrow normal-case" {...{ [eyebrowDataAttr]: "" }}>
          {eyebrow}
        </p>
      </div>

      <div className="section-heading__body">
        <div aria-hidden className="section-heading__offset" />
        <div className="section-heading__content">
          <h2 className="flex flex-col">
            <span
              className={isInverse ? "type-display-lead-inverse block" : "type-display-lead block"}
              {...{ [titleLeadDataAttr]: "" }}
            >
              {titleLead}
            </span>
            <span
              className={isInverse ? "type-display-inverse block" : "type-display block"}
              {...{ [titleEmphasisDataAttr]: "" }}
            >
              {titleEmphasis}
            </span>
          </h2>
          {subtitle ? (
            <p
              className={isInverse ? "type-lead-inverse section-heading__subtitle" : "type-lead max-w-[32.5rem]"}
              {...{ [subtitleDataAttr]: "" }}
            >
              {subtitle}
            </p>
          ) : null}
          {showRule && isInverse ? <div className="section-heading__rule" aria-hidden /> : null}
          {children}
        </div>
      </div>
    </div>
  );
}

/** Left offset spacer for content aligned under section titles. */
export function SectionHeadingOffset() {
  return <div aria-hidden className="section-heading__offset shrink-0" />;
}
