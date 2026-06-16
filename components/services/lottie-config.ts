/** Per-tab Lottie presentation for the services image panel. */

export type ServiceLottieLabel =
  | "Strategy"
  | "Design"
  | "Content"
  | "Performance"
  | "Product"
  | "Media";

export type ServiceLottieConfig = {
  src: string;
  background: string;
  inset: string;
  bottomClipPercent: number;
  fadeLengthPercent: number;
};

const LOTTIE_MASK = {
  bottomClipPercent: 18,
  fadeLengthPercent: 42,
} as const;

const LOTTIE_ASSETS = {
  webDesign: {
    src: "/lottie/Web%20Design.json",
    background: "#E9E9E9",
    inset: "2%",
  },
  brandDesign: {
    src: "/lottie/Branding.json",
    background: "#F5F5F5",
    inset: "2%",
  },
} as const;

function lottieForTab(asset: keyof typeof LOTTIE_ASSETS): ServiceLottieConfig {
  return { ...LOTTIE_ASSETS[asset], ...LOTTIE_MASK };
}

export const SERVICE_LOTTIE: Record<ServiceLottieLabel, ServiceLottieConfig> = {
  Strategy: lottieForTab("webDesign"),
  Design: lottieForTab("brandDesign"),
  Content: lottieForTab("brandDesign"),
  Performance: lottieForTab("webDesign"),
  Product: lottieForTab("webDesign"),
  Media: lottieForTab("brandDesign"),
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
