import type { ServiceContent } from "@/components/services/data";
import { ServicesBackgroundMarquee } from "@/components/services/services-background-marquee";
import { ServicesImageBox } from "@/components/services/services-image-box";
import { ServicesTags } from "@/components/services/services-tags";

type ServicesContentProps = {
  service: ServiceContent;
};

export function ServicesContent({ service }: ServicesContentProps) {
  return (
    <div className="services-content">
      <div className="services-visual-stage">
        <ServicesBackgroundMarquee phrase={service.backgroundPhrase} />
        <ServicesImageBox service={service} />
      </div>

      <div
        className="services-content__copy type-lead text-ink"
        data-services-paragraph
      >
        <p data-services-paragraph-line>{service.description[0]}</p>
        <p data-services-paragraph-line>{service.description[1]}</p>
      </div>

      <ServicesTags service={service} />
    </div>
  );
}
