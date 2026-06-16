import type { ServiceContent } from "@/components/services/data";
import { isServiceLottieLabel } from "@/components/services/lottie-config";
import { ServiceLottie } from "@/components/services/service-lottie";

type ServicesImageBoxProps = {
  service: ServiceContent;
};

export function ServicesImageBox({ service }: ServicesImageBoxProps) {
  return (
    <div data-services-image-box className="services-image-box">
      <div className="services-image-box__frame">
        {isServiceLottieLabel(service.label) ? (
          <ServiceLottie key={service.label} label={service.label} />
        ) : null}
      </div>
      <div className="services-image-box__border" aria-hidden />
    </div>
  );
}
