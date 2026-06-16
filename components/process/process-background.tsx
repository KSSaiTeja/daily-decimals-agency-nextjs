import { processBackground, processOverlay } from "@/lib/images";

/** Layered photo + gradient wash matching the DD demo process panel. */
export function ProcessBackground() {
  return (
    <>
      <div className="process-panel__photo" aria-hidden>
        <img alt="" className="process-panel__photo-image" src={processBackground} />
      </div>
      <div className="process-panel__gradient" aria-hidden>
        <img alt="" className="process-panel__gradient-image" src={processOverlay} />
      </div>
    </>
  );
}
