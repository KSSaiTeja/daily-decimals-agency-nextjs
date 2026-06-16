import type { FunnelStage } from "@/components/funnel/data";
import {
  getFunnelStripClip,
  getFunnelStripWidthReduction,
} from "@/components/funnel/funnel-geometry";

type FunnelStripProps = {
  stage: FunnelStage;
  index: number;
};

export function FunnelStrip({ stage, index }: FunnelStripProps) {
  return (
    <div
      data-funnel-strip
      data-funnel-strip-index={index}
      className="funnel-strip relative flex items-center will-change-transform"
      style={{
        width: `calc(var(--funnel-strip-width) - ${getFunnelStripWidthReduction(index)})`,
        clipPath: getFunnelStripClip(index),
      }}
    >
      <div
        data-funnel-strip-fill
        className="absolute inset-0 rounded-[2px]"
        aria-hidden
      />
      <div className="funnel-strip__label relative z-10 flex min-w-0 items-center">
        <span
          data-funnel-strip-number
          className="type-title font-semibold leading-none"
        >
          {stage.number}
        </span>
        <span
          data-funnel-strip-label
          className="type-kicker funnel-strip__title"
        >
          {stage.title}
        </span>
      </div>
    </div>
  );
}
