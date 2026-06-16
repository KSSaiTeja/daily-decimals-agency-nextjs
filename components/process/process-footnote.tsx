import { PROCESS_FOOTNOTE } from "@/components/process/data";

export function ProcessFootnote() {
  return (
    <footer data-process-footnote className="process-footnote">
      <span className="process-footnote__star" data-process-footnote-star>
        {PROCESS_FOOTNOTE.star}
      </span>
      <p className="process-footnote__text" data-process-footnote-text>
        {PROCESS_FOOTNOTE.text}
      </p>
    </footer>
  );
}
