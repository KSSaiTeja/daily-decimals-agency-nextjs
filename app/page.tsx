import { HeroSection } from "@/components/hero";
import { PreloaderGate } from "@/components/preloader";
import { SiteBottomNav } from "@/components/navigation";
import { SITE_NAV_SECTIONS } from "@/lib/navigation";

export default function Page() {
  return (
    <PreloaderGate>
      <div className="min-h-screen bg-surface">
        <HeroSection />

        {SITE_NAV_SECTIONS.map(({ id, label }) => (
          <section
            key={id}
            id={id}
            className="flex min-h-[70vh] scroll-mt-8 items-center justify-center border-t border-line/40 px-[var(--page-gutter)]"
          >
            <h2 className="type-display text-center">{label}</h2>
          </section>
        ))}

        <SiteBottomNav />
      </div>
    </PreloaderGate>
  );
}
