"use client";

import { AdvantagesPhotoCollage } from "@/components/advantages/advantages-photo-collage";
import { ADVANTAGES_EXPERTISE, ADVANTAGES_PORTFOLIO } from "@/components/advantages/data";
import { SvgPath } from "@/components/icons/svg-path";
import {
  iconAccent14,
  iconAccent15,
  innovationVisual,
  interiorShowcase,
  logoPlaceholder,
  logoPrimary,
  logoSecondary,
  personaBlur,
  personaSharp,
  productDetail,
} from "@/lib/images";

function AdvantagesTextScrim({ className = "" }: { className?: string }) {
  return <div className={`advantages-card__text-scrim ${className}`.trim()} aria-hidden />;
}

function ExpertiseCard() {
  return (
    <article className="advantages-card advantages-card--expertise">
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

function DesignCard() {
  return (
    <article className="advantages-card advantages-card--design">
      <div className="advantages-card__media" data-advantages-image>
        <img alt="" className="advantages-card__media-image" src={interiorShowcase} />
      </div>

      <AdvantagesTextScrim />

      <div
        className="advantages-card__copy advantages-card__copy--overlay"
        data-advantages-word-group="first-split"
      >
        <h3 className="type-title text-white">
          <span className="block">Unique Design</span>
          <span className="block">Aestetic</span>
        </h3>
      </div>
    </article>
  );
}

function BrandCard() {
  return (
    <article className="advantages-card advantages-card--brand">
      <div className="advantages-card__media" data-advantages-image>
        <img alt="" className="advantages-card__media-image" src={logoPlaceholder} />
        <div className="advantages-card__media-scrim advantages-card__media-scrim--dark" />
      </div>
      <img alt="" className="advantages-card__brand-logo" src={logoSecondary} />
    </article>
  );
}

function InnovativeCard() {
  return (
    <article className="advantages-card advantages-card--innovative">
      <div className="advantages-card__media" data-advantages-image>
        <img alt="" className="advantages-card__media-image" src={innovationVisual} />
      </div>

      <AdvantagesTextScrim className="advantages-card__text-scrim--compact" />

      <div className="advantages-card__innovative-pattern" aria-hidden>
        <img alt="" className="advantages-card__innovative-ring" src={iconAccent15} />
        <div className="advantages-card__innovative-badge">
          <img alt="" className="advantages-card__innovative-badge-bg" src={iconAccent14} />
          <p className="advantages-card__innovative-badge-label">Solutions</p>
        </div>
      </div>

      <div className="advantages-card__copy advantages-card__copy--center" data-advantages-word-group>
        <p className="advantages-card__innovative-title">Innovative</p>
      </div>
    </article>
  );
}

function PortfolioCard() {
  return (
    <article className="advantages-card advantages-card--portfolio">
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
      </div>

      <AdvantagesTextScrim className="advantages-card__text-scrim--portfolio" />

      <div className="advantages-card__portfolio-bottom">
        <div data-advantages-word-group>
          <h3 className="type-title text-white">
            {ADVANTAGES_PORTFOLIO.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
        </div>
      </div>

      <AdvantagesPhotoCollage />
    </article>
  );
}

function ClientCard() {
  return (
    <article className="advantages-card advantages-card--client">
      <div className="advantages-card__client-backdrop" data-advantages-image>
        <img alt="" className="advantages-card__media-image" src={personaBlur} />
      </div>

      <div className="advantages-card__client-portrait">
        <img alt="" className="advantages-card__client-portrait-image" src={personaSharp} />
      </div>

      <AdvantagesTextScrim />

      <div className="advantages-card__copy advantages-card__copy--center" data-advantages-word-group>
        <p className="advantages-card__client-line">Client-oriented</p>
        <p className="advantages-card__client-line advantages-card__client-line--accent">Approach</p>
      </div>
    </article>
  );
}

function DetailCard() {
  return (
    <article className="advantages-card advantages-card--detail">
      <div className="advantages-card__media" data-advantages-image>
        <img alt="" className="advantages-card__media-image" src={productDetail} />
      </div>

      <AdvantagesTextScrim />

      <div className="advantages-card__detail-content">
        <svg className="advantages-card__detail-star" viewBox="0 0 23 23" fill="none" aria-hidden>
          <SvgPath name="scrollCueChevron" fill="white" opacity={0.9} />
        </svg>

        <div data-advantages-word-group>
          <h3 className="type-title text-white">
            <span className="block">Serious Attention</span>
            <span className="block">to Detail</span>
          </h3>
        </div>
      </div>
    </article>
  );
}

export function AdvantagesBento() {
  return (
    <div className="advantages-bento" data-advantages-bento>
      <ExpertiseCard />
      <DesignCard />
      <div className="advantages-bento__stack">
        <BrandCard />
        <InnovativeCard />
      </div>
      <PortfolioCard />
      <ClientCard />
      <DetailCard />
    </div>
  );
}
