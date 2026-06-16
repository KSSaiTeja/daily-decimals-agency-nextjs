import { AboutSection } from "@/components/about";
import { AdvantagesSection } from "@/components/advantages";
import { ProcessSection } from "@/components/process";
import { FunnelSection } from "@/components/funnel";
import { HeroSection } from "@/components/hero";
import { IndustriesSection } from "@/components/industries";
import { RibbonSection } from "@/components/ribbon";
import { ServicesSection } from "@/components/services";
import { ContactSection } from "@/components/contact";
import { FooterSection } from "@/components/footer";
import { TestimonialsSection } from "@/components/testimonials";
import { PreloaderGate } from "@/components/preloader";
import { SiteBottomNav } from "@/components/navigation";

export default function Page() {
  return (
    <PreloaderGate>
      <div className="min-h-screen bg-surface">
        <HeroSection />
        <RibbonSection />
        <AboutSection />
        <IndustriesSection />
        <FunnelSection />
        <ServicesSection />
        <AdvantagesSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
        <FooterSection />
        <SiteBottomNav />
      </div>
    </PreloaderGate>
  );
}
