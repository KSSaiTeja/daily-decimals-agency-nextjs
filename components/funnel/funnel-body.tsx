import { FUNNEL_STAGES } from "@/components/funnel/data";
import { FunnelContentPanel } from "@/components/funnel/funnel-content-panel";
import { FunnelStrip } from "@/components/funnel/funnel-strip";

export function FunnelBody() {
  return (
    <div className="funnel-body">
      <div data-funnel-strips className="funnel-strips">
        {FUNNEL_STAGES.map((stage, index) => (
          <FunnelStrip key={stage.number} stage={stage} index={index} />
        ))}
      </div>

      <div className="funnel-content">
        <div
          data-funnel-progress
          className="funnel-progress funnel-progress--vertical"
          aria-hidden
        >
          <div
            data-funnel-progress-fill
            className="funnel-progress__fill funnel-progress__fill--vertical"
          />
        </div>

        <div
          data-funnel-progress
          className="funnel-progress funnel-progress--horizontal"
          aria-hidden
        >
          <div
            data-funnel-progress-fill
            className="funnel-progress__fill funnel-progress__fill--horizontal"
          />
        </div>

        <p data-funnel-stage-counter className="funnel-stage-counter type-kicker">
          Stage 01 of 05
        </p>

        <div data-funnel-content-stage className="funnel-content-stage">
          {FUNNEL_STAGES.map((stage, index) => (
            <FunnelContentPanel key={stage.number} stage={stage} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
