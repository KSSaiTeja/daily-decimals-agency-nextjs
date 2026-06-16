import type { Industry } from "./data";
import { IndustryIcon } from "./industry-icon";

type IndustryRowProps = {
  industry: Industry;
  index: number;
};

export function IndustryRow({ industry, index }: IndustryRowProps) {
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <article
      data-industry-row
      data-industry-index={index}
      className="industry-row group"
    >
      <span className="industry-row__index type-list-index">{indexLabel}</span>

      <div className="industry-row__icon">
        <IndustryIcon icon={industry.icon} className="text-current" />
      </div>

      <p className="industry-row__label type-list-label">{industry.label}</p>

      <span className="industry-row__accent" aria-hidden />
    </article>
  );
}
