import type { ServiceContent } from "@/components/services/data";
import { ServicesBackgroundMarquee } from "@/components/services/services-background-marquee";
import { ServicesImageBox } from "@/components/services/services-image-box";

type ServicesContentProps = {
  service: ServiceContent;
};

export function ServicesContent({ service }: ServicesContentProps) {
  return (
    <div className="services-content">
      <div className="services-visual-stage">
        <ServicesBackgroundMarquee items={service.tags} />
        <ServicesImageBox service={service} />
      </div>

      <div
        className="services-content__copy type-lead text-ink"
        data-services-paragraph
      >
        {service.description.map((line, index) => (
          <p key={index} data-services-paragraph-line>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
