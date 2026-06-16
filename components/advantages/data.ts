import {
  advantageVisual1,
  advantageVisual2,
  advantageVisual3,
  advantageVisual4,
  testimonialFeature,
} from "@/lib/images";

export const ADVANTAGES_EYEBROW = "(Why choose us)";

export const ADVANTAGES_HEADING = {
  titleLead: "Core client",
  titleEmphasis: "advantages",
  subtitle: "Expertise built into every engagement.",
} as const;

export const ADVANTAGES_EXPERTISE = {
  leftLabel: "Expertise",
  rightLabel: "Experience",
} as const;

export const ADVANTAGES_PORTFOLIO = {
  projectCount: "304",
  projectCaption: ["Projects are", "launched"],
  title: ["Strong Portfolio", "& Reputation"],
} as const;

export const ADVANTAGES_PHOTO_COLLAGE = [
  { src: advantageVisual3, alt: "Portfolio project preview", rotation: -6 },
  { src: advantageVisual1, alt: "Portfolio project preview", rotation: 8 },
  { src: advantageVisual2, alt: "Portfolio project preview", rotation: 17 },
  { src: testimonialFeature, alt: "Portfolio project preview", rotation: -2 },
  { src: advantageVisual4, alt: "Portfolio project preview", rotation: 9 },
] as const;
