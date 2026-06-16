/** Read a resolved CSS length custom property (supports calc()) in pixels. */
export function readCssLength(
  section: HTMLElement,
  property: string,
  axis: "height" | "width" = "height",
): number {
  const raw = getComputedStyle(section).getPropertyValue(property).trim();
  if (!raw) return 0;

  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  if (axis === "height") {
    probe.style.height = raw;
    probe.style.width = "0";
  } else {
    probe.style.width = raw;
    probe.style.height = "0";
  }
  section.appendChild(probe);
  const px = probe.getBoundingClientRect()[axis];
  probe.remove();
  return Math.round(px);
}

/** Read a resolved numeric CSS custom property (e.g. rotation in degrees). */
export function readCssNumber(
  section: HTMLElement,
  property: string,
  fallback: number,
): number {
  const raw = getComputedStyle(section).getPropertyValue(property).trim();
  if (!raw) return fallback;
  const value = parseFloat(raw);
  return Number.isFinite(value) ? value : fallback;
}

export type RibbonLayout = {
  statsRotation: number;
  servicesRotation: number;
};

export function readRibbonLayout(section: HTMLElement): RibbonLayout {
  return {
    statsRotation: readCssNumber(section, "--ribbon-rotation-stats", -5),
    servicesRotation: readCssNumber(section, "--ribbon-rotation-services", 5),
  };
}
