type ServicesBackgroundMarqueeProps = {
  phrase: string;
};

function MarqueeChunk({ phrase }: { phrase: string }) {
  const marqueeText = Array.from({ length: 8 }, () => phrase).join("   •   ");

  return (
    <div className="services-bg-marquee__chunk" data-services-marquee-chunk>
      <p className="services-bg-marquee__text">{marqueeText}</p>
    </div>
  );
}

export function ServicesBackgroundMarquee({ phrase }: ServicesBackgroundMarqueeProps) {
  return (
    <div className="services-bg-marquee" aria-hidden>
      <div className="services-bg-marquee__mask">
        <div data-services-marquee-track className="services-bg-marquee__track">
          <MarqueeChunk phrase={phrase} />
          <MarqueeChunk phrase={phrase} />
        </div>
      </div>
      <div className="services-bg-marquee__fade services-bg-marquee__fade--left" />
      <div className="services-bg-marquee__fade services-bg-marquee__fade--right" />
    </div>
  );
}
