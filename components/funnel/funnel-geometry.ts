/** Horizontal strip clip — left edge straight, right edge tapers (funnel narrowing right). */
export function getFunnelStripClip(index: number) {
  const rightTop = 100 - index * 2.5;
  const rightBottom = 100 - index * 5 - 4;
  return `polygon(0% 0%, ${rightTop}% 0%, ${rightBottom}% 100%, 0% 100%)`;
}

/** Width reduction per strip step — scales with the CSS `--funnel-strip-step` variable. */
export function getFunnelStripWidthReduction(index: number) {
  return `calc(var(--funnel-strip-step) * ${index})`;
}
