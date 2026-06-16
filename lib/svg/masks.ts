/**
 * CSS mask-image values for section fades and clips.
 */
export const masks = {
  /** Horizontal edge fade — compact bar (12.5%–87.5% opaque). */
  fadeHorizontalCompact:
    "linear-gradient(to right, transparent, #000 12.5%, #000 87.5%, transparent)",
  /** Large heading on dark cards — strong at top, dissolves into the section below. */
  contactHeadingFade:
    "linear-gradient(to bottom, #000 0%, #000 28%, rgba(0,0,0,0.55) 58%, transparent 92%)",
} as const;
