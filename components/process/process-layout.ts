/** Raster dimensions for process step illustrations (512 × 115). */
export const PROCESS_ICON_WIDTH = 512;
export const PROCESS_ICON_HEIGHT = 115;
/** Artboard rects for the methodology honeycomb (1600 × 960 reference). */
export const PROCESS_CARDS_NATURAL_HEIGHT = 960;
export const PROCESS_CARDS_ARTBOARD_WIDTH = 1600;

/** Breathing room between header, cards, and footnote inside the pin. */
export const PROCESS_VIEWPORT_FIT = {
  verticalPad: 4,
} as const;

export type ProcessCardRect = {
  top: string;
  right: string;
  bottom: string;
  left: string;
};

/** Honeycomb positions — widened row bands, nudged slightly upward. */
export const PROCESS_CARD_RECTS: Record<string, ProcessCardRect> = {
  discovery: { top: "0%", right: "0%", bottom: "68%", left: "75.61%" },
  ideation: { top: "33%", right: "75.61%", bottom: "34%", left: "0%" },
  planning: { top: "33%", right: "50.41%", bottom: "34%", left: "25.2%" },
  execution: { top: "33%", right: "25.2%", bottom: "34%", left: "50.41%" },
  optimization: { top: "33%", right: "0%", bottom: "32%", left: "75.62%" },
  delivery: { top: "65.5%", right: "50.41%", bottom: "0%", left: "25.2%" },
  analysis: { top: "66.5%", right: "0%", bottom: "0%", left: "75.61%" },
};
