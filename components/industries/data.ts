export type IndustryIconName =
  | "fintech"
  | "hospitality"
  | "education"
  | "real-estate"
  | "interior"
  | "d2c"
  | "marketplace"
  | "experiences";

export type Industry = {
  id: string;
  label: string;
  icon: IndustryIconName;
};

export const INDUSTRIES_EYEBROW = "( Industries We've Worked With )";

export const INDUSTRIES_HEADING = {
  titleLead: "Trusted across",
  titleEmphasis: "many sectors",
  subtitle: "Forging partnerships that last long.",
} as const;

export const INDUSTRIES: Industry[] = [
  { id: "fintech", label: "FinTech & WealthTech", icon: "fintech" },
  { id: "hospitality", label: "Hospitality", icon: "hospitality" },
  { id: "education", label: "Education Institutes", icon: "education" },
  { id: "real-estate", label: "Real Estate", icon: "real-estate" },
  { id: "interior", label: "Interior Design Studios", icon: "interior" },
  { id: "d2c", label: "D2C Brands", icon: "d2c" },
  { id: "marketplace", label: "Aggregators & Marketplaces", icon: "marketplace" },
  { id: "experiences", label: "Experiences", icon: "experiences" },
];
