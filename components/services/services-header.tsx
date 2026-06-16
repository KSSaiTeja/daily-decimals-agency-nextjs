import { SERVICES_EYEBROW, SERVICES_HEADING } from "@/components/services/data";

export function ServicesHeader() {
  return (
    <div className="section-heading">
      <div className="section-heading__eyebrow-wrap text-center">
        <p className="type-eyebrow normal-case" data-services-eyebrow>
          {SERVICES_EYEBROW}
        </p>
      </div>

      <div className="section-heading__body">
        <div aria-hidden className="section-heading__offset" />
        <div className="section-heading__content">
          <h2 className="services-heading">
            <span className="type-display-lead" data-services-title-lead>
              {SERVICES_HEADING.titleLead}{" "}
            </span>
            <span className="type-display" data-services-title-emphasis>
              {SERVICES_HEADING.titleEmphasis}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
