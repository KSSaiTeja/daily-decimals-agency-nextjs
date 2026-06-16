import type { FunnelStage } from "@/components/funnel/data";

type FunnelContentPanelProps = {
  stage: FunnelStage;
  index: number;
};

export function FunnelContentPanel({ stage, index }: FunnelContentPanelProps) {
  return (
    <div
      data-funnel-content
      data-funnel-content-index={index}
      className="funnel-content-panel absolute inset-0 flex flex-col justify-center will-change-[opacity,transform,filter]"
    >
      <div className="flex items-center gap-4">
        <span data-funnel-content-number className="type-accent-number">
          {stage.number}
        </span>
        <span className="h-px w-12 bg-brand/35" aria-hidden />
      </div>

      <p className="type-kicker">{stage.title}</p>

      <h3 data-funnel-content-heading className="type-quote funnel-content-panel__heading">
        {stage.heading}
      </h3>

      <p
        data-funnel-content-description
        className="type-lead funnel-content-panel__description"
      >
        {stage.description}
      </p>
    </div>
  );
}
