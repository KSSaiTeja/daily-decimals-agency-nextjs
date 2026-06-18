import { AboutSection } from "@/components/about";
import { AdvantagesSection } from "@/components/advantages";
// import { ProcessSection } from "@/components/process";
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
import { SHOW_TESTIMONIALS } from "@/lib/site-layout";

export default function Page() {
  return (
    <PreloaderGate>
      <div className="site-shell min-h-screen bg-surface">
        <HeroSection />
        <RibbonSection />
        <AboutSection />
        <FunnelSection />
        <ServicesSection />
        <IndustriesSection />
        <AdvantagesSection />
        {/* <ProcessSection /> */}
        {SHOW_TESTIMONIALS ? <TestimonialsSection /> : null}
        <ContactSection />
        <FooterSection />
        <SiteBottomNav />
      </div>
    </PreloaderGate>
  );
}
