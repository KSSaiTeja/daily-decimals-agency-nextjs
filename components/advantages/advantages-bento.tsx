"use client";

import { AdvantagesPhotoCollage } from "@/components/advantages/advantages-photo-collage";
import {
  ADVANTAGES_EXPERTISE,
  ADVANTAGES_PASTEL_CARDS,
  ADVANTAGES_PORTFOLIO,
  type AdvantagePastelCard,
} from "@/components/advantages/data";
import { SvgPath } from "@/components/icons/svg-path";
import { logoPrimary } from "@/lib/images";

function ExpertiseCard() {
  return (
    <article className="advantages-card advantages-card--expertise" data-advantages-card>
      <div className="advantages-card__expertise-top">
        <p className="type-label-sm">{ADVANTAGES_EXPERTISE.leftLabel}</p>
        <div className="advantages-card__logo-mark">
          <img alt="" className="advantages-card__logo-mark-image" src={logoPrimary} />
        </div>
        <p className="type-label-sm">{ADVANTAGES_EXPERTISE.rightLabel}</p>
      </div>

      <div className="advantages-card__expertise-divider" aria-hidden />

      <div className="advantages-card__watermark" aria-hidden>
        <svg className="advantages-card__watermark-svg" viewBox="0 0 106 117" fill="none">
          <SvgPath name="footerWatermark" fill="currentColor" opacity={0.1} />
        </svg>
      </div>
    </article>
  );
}

function PastelCard({ variant, title, image, imageAlt, compact }: AdvantagePastelCard) {
  return (
    <article
      className={`advantages-card advantages-card--pastel advantages-card--${variant}${
        compact ? " advantages-card--pastel-compact" : ""
      }`}
      data-advantages-card
    >
      <div className="advantages-card__pastel-copy" data-advantages-word-group>
        <h3 className="advantages-card__pastel-title">{title.join(" ")}</h3>
      </div>

      <div className="advantages-card__pastel-photo" data-advantages-image>
        <div className="advantages-card__pastel-frame">
          <img alt={imageAlt} className="advantages-card__pastel-image" src={image} />
        </div>
      </div>
    </article>
  );
}

function PortfolioCard() {
  return (
    <article className="advantages-card advantages-card--portfolio" data-advantages-card>
      <div className="advantages-card__portfolio-top">
        <div className="advantages-card__portfolio-stat">
          <p className="advantages-card__portfolio-count">{ADVANTAGES_PORTFOLIO.projectCount}</p>
          <div className="advantages-card__portfolio-meta">
            <svg
              className="advantages-card__portfolio-icon"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden
            >
              <SvgPath
                name="packageIconBox"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
              <SvgPath
                name="packageIconLid"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
              <path
                d="M10 18.4V10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <p className="advantages-card__portfolio-caption">
              {ADVANTAGES_PORTFOLIO.projectCaption.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div data-advantages-word-group>
          <h3 className="type-title advantages-card__portfolio-title">
            {ADVANTAGES_PORTFOLIO.title.join(" ")}
          </h3>
        </div>
      </div>

      <AdvantagesPhotoCollage />
    </article>
  );
}

function pastelCard(variant: AdvantagePastelCard["variant"]) {
  return ADVANTAGES_PASTEL_CARDS.find((card) => card.variant === variant);
}

export function AdvantagesBento() {
  const design = pastelCard("design");
  const brand = pastelCard("brand");
  const innovative = pastelCard("innovative");
  const client = pastelCard("client");
  const detail = pastelCard("detail");

  return (
    <div className="advantages-bento" data-advantages-bento>
      <ExpertiseCard />
      {design ? <PastelCard {...design} /> : null}
      <div className="advantages-bento__stack">
        {brand ? <PastelCard {...brand} /> : null}
        {innovative ? <PastelCard {...innovative} /> : null}
      </div>
      <PortfolioCard />
      {client ? <PastelCard {...client} /> : null}
      {detail ? <PastelCard {...detail} /> : null}
    </div>
  );
}
