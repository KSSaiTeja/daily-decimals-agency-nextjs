"use client";

import { useState } from "react";
import { getSelectedService } from "@/components/services/data";
import { useServicesSectionAnimations } from "@/components/services/services-animations";
import { ServicesContent } from "@/components/services/services-content";
import { ServicesHeader } from "@/components/services/services-header";
import { ServicesTabs } from "@/components/services/services-tabs";

/**
 * Services showcase — tabbed Lottie panels with background phrase marquee.
 */
export function ServicesSection() {
  const [selectedTab, setSelectedTab] = useState(0);
  const service = getSelectedService(selectedTab);
  const { sectionRef } = useServicesSectionAnimations({ selectedTab });

  return (
    <section
      ref={sectionRef}
      id="services"
      data-services-section
      aria-label="Services"
      className="services-section scroll-mt-8"
    >
      <div className="services-section__inner">
        <ServicesHeader />

        <div className="services-section__body">
          <ServicesTabs selectedTab={selectedTab} onSelect={setSelectedTab} />
          <ServicesContent service={service} />
        </div>
      </div>
    </section>
  );
}
