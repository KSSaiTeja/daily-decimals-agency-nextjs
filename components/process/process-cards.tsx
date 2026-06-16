import { ProcessCard } from "@/components/process/process-card";
import { ProcessFootnote } from "@/components/process/process-footnote";
import { PROCESS_STEPS } from "@/components/process/data";

export function ProcessCards() {
  return (
    <div data-process-cards-shell className="process-cards-shell">
      <div data-process-cards className="process-cards">
        {PROCESS_STEPS.map((step, index) => (
          <ProcessCard key={step.id} step={step} index={index} />
        ))}
      </div>
      <ProcessFootnote />
    </div>
  );
}
