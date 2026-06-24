type ServicesBackgroundMarqueeProps = {
  items: readonly string[];
};

function MarqueeChunk({ items }: { items: readonly string[] }) {
  const sequence = items.join("   •   ");
  const marqueeText = Array.from({ length: 4 }, () => sequence).join("   •   ");

  return (
    <div className="services-bg-marquee__chunk" data-services-marquee-chunk>
      <p className="services-bg-marquee__text">{marqueeText}</p>
    </div>
  );
}

export function ServicesBackgroundMarquee({ items }: ServicesBackgroundMarqueeProps) {
  return (
    <div className="services-bg-marquee" aria-hidden>
      <div className="services-bg-marquee__mask">
        <div data-services-marquee-track className="services-bg-marquee__track">
          <MarqueeChunk items={items} />
          <MarqueeChunk items={items} />
        </div>
      </div>
      <div className="services-bg-marquee__fade services-bg-marquee__fade--left" />
      <div className="services-bg-marquee__fade services-bg-marquee__fade--right" />
    </div>
  );
}
