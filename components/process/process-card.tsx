import type { CSSProperties } from "react";
import type { ProcessStep } from "@/components/process/data";
import {
  PROCESS_CARD_RECTS,
  PROCESS_ICON_HEIGHT,
  PROCESS_ICON_WIDTH,
} from "@/components/process/process-layout";

type ProcessCardProps = {
  step: ProcessStep;
  index: number;
};

export function ProcessCard({ step, index }: ProcessCardProps) {
  const rect = PROCESS_CARD_RECTS[step.placement];

  return (
    <article
      data-process-card
      className={`process-card process-card--${step.placement}`}
      style={
        rect
          ? ({
              "--process-top": rect.top,
              "--process-right": rect.right,
              "--process-bottom": rect.bottom,
              "--process-left": rect.left,
              "--process-z": index + 1,
            } as CSSProperties)
          : undefined
      }
    >
      <div className="process-card__visual">
        <p className="process-card__step type-kicker">{step.step}</p>
        <div className="process-card__icon-wrap">
          <div className="process-card__icon-frame" aria-hidden>
            <img
              alt=""
              className="process-card__icon"
              src={step.icon}
              width={PROCESS_ICON_WIDTH}
              height={PROCESS_ICON_HEIGHT}
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <div className="process-card__copy">
        <h3 className="process-card__title">{step.title}</h3>
        <p className="process-card__description">{step.description}</p>
      </div>
    </article>
  );
}
