import type { ServiceContent } from "@/components/services/data";

type ServicesTagsProps = {
  service: ServiceContent;
};

export function ServicesTags({ service }: ServicesTagsProps) {
  return (
    <ul
      className="services-tags"
      data-services-tags
      aria-label={`${service.label} capabilities`}
    >
      {service.tags.map((tag) => (
        <li key={tag} data-services-tag-card>
          <span className="services-tag">
            <span className="services-tag__label">{tag}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
