/** Per-tab Lottie presentation for the services image panel. */

export type ServiceLottieLabel =
  | "Strategy"
  | "Design & Tech"
  | "Content"
  | "Performance"
  | "Product"
  | "Media & Channels";

export type ServiceLottieConfig = {
  src: string;
  background: string;
  inset: string;
  bottomClipPercent: number;
  fadeLengthPercent: number;
};

const LOTTIE_MASK = {
  bottomClipPercent: 20,
  fadeLengthPercent: 42,
} as const;

const LOTTIE_BASE = {
  background: "#F5F5F5",
  inset: "2%",
} as const;

/** Each service tab maps to its own optimized Lottie (URL-encoded file names). */
function lottieForSrc(src: string): ServiceLottieConfig {
  return { src, ...LOTTIE_BASE, ...LOTTIE_MASK };
}

export const SERVICE_LOTTIE: Record<ServiceLottieLabel, ServiceLottieConfig> = {
  Strategy: lottieForSrc("/lottie/Strategy.json"),
  "Design & Tech": lottieForSrc("/lottie/Design%20%26%20Tech.json"),
  Content: lottieForSrc("/lottie/Content.json"),
  Performance: lottieForSrc("/lottie/Performance.json"),
  Product: lottieForSrc("/lottie/Product.json"),
  "Media & Channels": lottieForSrc("/lottie/Media%20%26%20Channel.json"),
};

export function isServiceLottieLabel(label: string): label is ServiceLottieLabel {
  return label in SERVICE_LOTTIE;
}

const MASK_INTENSITY_BOOST = 0.08;

const BLEND_STOPS_BASE: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [0.08, 0.02],
  [0.18, 0.06],
  [0.3, 0.12],
  [0.42, 0.2],
  [0.54, 0.32],
  [0.64, 0.45],
  [0.73, 0.58],
  [0.8, 0.7],
  [0.86, 0.8],
  [0.91, 0.88],
  [0.95, 0.94],
  [1, 1],
];

function blendOpacity(opacity: number) {
  if (opacity <= 0) return 0;
  return Math.min(1, opacity + MASK_INTENSITY_BOOST);
}

const BLEND_STOPS: ReadonlyArray<readonly [number, number]> = BLEND_STOPS_BASE.map(
  ([position, opacity]) => [position, blendOpacity(opacity)] as const,
);

function blendBandHeight(clipPercent: number, fadeLength: number) {
  return clipPercent + fadeLength;
}

export function lottieAnimationMask(clipPercent: number, fadeLength: number) {
  const band = blendBandHeight(clipPercent, fadeLength);
  const visibleUntil = 100 - band;

  const fadeStops = BLEND_STOPS.map(([position, overlayStrength]) => {
    const y = visibleUntil + position * band;
    const visibility = 1 - overlayStrength;
    return `rgba(0,0,0,${visibility.toFixed(3)}) ${y.toFixed(2)}%`;
  });

  return `linear-gradient(to bottom, #000 0%, #000 ${visibleUntil}%, ${fadeStops.join(", ")})`;
}
