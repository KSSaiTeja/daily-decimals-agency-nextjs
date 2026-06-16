export const SERVICE_TABS = [
  "Strategy",
  "Design",
  "Content",
  "Performance",
  "Product",
  "Media",
] as const;

export type ServiceTabLabel = (typeof SERVICE_TABS)[number];

export type ServiceContent = {
  label: ServiceTabLabel;
  description: [string, string];
  tags: [string, string, string];
  backgroundPhrase: string;
};

export const SERVICES_EYEBROW = "(Services)";

export const SERVICES_HEADING = {
  titleLead: "What we",
  titleEmphasis: "do",
} as const;

export const SERVICES_CONTENT: Record<ServiceTabLabel, ServiceContent> = {
  Strategy: {
    label: "Strategy",
    description: ["Go-to-market, pricing strategy,", "positioning and growth planning"],
    tags: ["Go-to-market", "Pricing strategy", "Growth planning"],
    backgroundPhrase: "Strategy",
  },
  Design: {
    label: "Design",
    description: ["Brand & visual systems,", "UI/UX & product design"],
    tags: ["Brand & visual systems", "UI/UX", "Product design"],
    backgroundPhrase: "Design",
  },
  Content: {
    label: "Content",
    description: ["Content strategy, copywriting", "& storytelling"],
    tags: ["Content strategy", "Copywriting", "Storytelling"],
    backgroundPhrase: "Content",
  },
  Performance: {
    label: "Performance",
    description: ["Paid media, growth marketing", "& optimization"],
    tags: ["Paid media", "Growth marketing", "Optimization"],
    backgroundPhrase: "Performance",
  },
  Product: {
    label: "Product",
    description: ["Product strategy, experience", "& experimentation"],
    tags: ["Product strategy", "Experience", "Experimentation"],
    backgroundPhrase: "Product",
  },
  Media: {
    label: "Media",
    description: ["Audience & channel management", "across digital & offline"],
    tags: ["Audience management", "Channel management", "Digital & offline"],
    backgroundPhrase: "Media",
  },
};

export function getSelectedService(selectedTab: number) {
  const safeIndex = Math.max(0, Math.min(selectedTab, SERVICE_TABS.length - 1));
  return SERVICES_CONTENT[SERVICE_TABS[safeIndex]];
}
