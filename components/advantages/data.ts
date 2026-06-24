import {
  buildingRevenueEngines1,
  buildingRevenueEngines2,
  buildingRevenueEngines3,
  buildingRevenueEngines4,
  buildingRevenueEngines5,
  connectedCustomerJourneys,
  endToEndOwnership,
  fromInsightsToExecution,
  pixelsWithPurpose,
  productMeetsMarketing,
} from "@/lib/images";

export const ADVANTAGES_EYEBROW = "( Why Clients Choose Us )";

export const ADVANTAGES_HEADING = {
  titleLead: "Expertise built into",
  titleEmphasis: "every engagement",
  subtitle: "Stronger growth, better returns.",
} as const;

export const ADVANTAGES_EXPERTISE = {
  leftLabel: "Startup Speed",
  rightLabel: "Enterprise Thinking",
} as const;

export const ADVANTAGES_PORTFOLIO = {
  projectCount: "2000+",
  projectCaption: ["Creative assets", "designed"],
  title: ["Building Revenue", "Engines"],
} as const;

export type AdvantagePastelVariant =
  | "design"
  | "brand"
  | "innovative"
  | "client"
  | "detail";

export type AdvantagePastelCard = {
  variant: AdvantagePastelVariant;
  title: readonly string[];
  /** Swap these images per card later — rendered as the framed bottom photo. */
  image: string;
  imageAlt: string;
  compact?: boolean;
};

export const ADVANTAGES_PASTEL_CARDS: readonly AdvantagePastelCard[] = [
  {
    variant: "design",
    title: ["Pixels with", "Purpose"],
    image: pixelsWithPurpose,
    imageAlt: "Design craft preview",
  },
  {
    variant: "brand",
    title: ["End-to-end", "Ownership"],
    image: endToEndOwnership,
    imageAlt: "Brand ownership preview",
    compact: true,
  },
  {
    variant: "innovative",
    title: ["Product Meets", "Marketing"],
    image: productMeetsMarketing,
    imageAlt: "Product and marketing preview",
    compact: true,
  },
  {
    variant: "client",
    title: ["Connected Customer", "Journeys"],
    image: connectedCustomerJourneys,
    imageAlt: "Customer journey preview",
  },
  {
    variant: "detail",
    title: ["From Insights", "to Execution"],
    image: fromInsightsToExecution,
    imageAlt: "Insights to execution preview",
  },
] as const;

export const ADVANTAGES_PHOTO_COLLAGE = [
  { src: buildingRevenueEngines1, alt: "Portfolio project preview", rotation: -6 },
  { src: buildingRevenueEngines2, alt: "Portfolio project preview", rotation: 8 },
  { src: buildingRevenueEngines3, alt: "Portfolio project preview", rotation: 17 },
  { src: buildingRevenueEngines4, alt: "Portfolio project preview", rotation: -2 },
  { src: buildingRevenueEngines5, alt: "Portfolio project preview", rotation: 9 },
] as const;
