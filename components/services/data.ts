export const SERVICE_TABS = [
  "Strategy",
  "Design & Tech",
  "Content",
  "Product",
  "Performance",
  "Media & Channels",
] as const;

export type ServiceTabLabel = (typeof SERVICE_TABS)[number];

export type ServiceContent = {
  label: ServiceTabLabel;
  description: readonly string[];
  tags: readonly string[];
  backgroundPhrase: string;
};

export const SERVICES_EYEBROW = "( What We Do )";

export const SERVICES_HEADING = {
  titleLead: "Services we",
  titleEmphasis: "offer",
  subtitle: "Capabilities powering every stage.",
} as const;

export const SERVICES_CONTENT: Record<ServiceTabLabel, ServiceContent> = {
  Strategy: {
    label: "Strategy",
    description: [
      "From business consulting, brand playbooks, budgets & ROI projections, product strategy, revenue engine, communication strategy and growth roadmaps",
      "to customer lifetime value maximization.",
    ],
    tags: ["Go-to-Market", "Pricing", "Growth", "Communication", "Funnel Strategy"],
    backgroundPhrase: "Strategy",
  },
  "Design & Tech": {
    label: "Design & Tech",
    description: [
      "Designing and developing websites, micro-sites, landing pages, booking sites, AI-catalogs, app screens,",
      "social media posts, email templates and ad creatives.",
    ],
    tags: ["Website", "Apps", "Ads", "Emails"],
    backgroundPhrase: "Design",
  },
  Content: {
    label: "Content",
    description: [
      "From content writing to copywriting: blogs, posts, reels, videos, app & website UX, ad copy,",
      "WhatsApp notifications, email copy, push notifications and pitch-decks.",
    ],
    tags: ["SEO & AEO", "Blogs", "Social Media", "Emails", "Decks", "Brochures"],
    backgroundPhrase: "Content",
  },
  Product: {
    label: "Product",
    description: [
      "Creating 360° touchpoints for customer onboarding, conversion, purchase, upsell, retention and loyalty",
      "through drip campaigns and product-led growth.",
    ],
    tags: ["Product Led Growth", "App Flow", "Customer Journeys", "Engagement", "Retention"],
    backgroundPhrase: "Product",
  },
  Performance: {
    label: "Performance",
    description: [
      "Driving brand impressions, website traffic, quality leads, app downloads and customer purchases",
      "by planning & executing digital performance ads.",
    ],
    tags: ["Google Ads", "Meta Ads", "Downloads", "Lead Generation"],
    backgroundPhrase: "Performance",
  },
  "Media & Channels": {
    label: "Media & Channels",
    description: [
      "Omni-channel marketing spanning digital to offline: managing assets, negotiating partnerships and making you visible to target customers,",
      "tapping into streaming platforms, influencer marketing, rewards platforms and offline events.",
    ],
    tags: ["LinkedIn", "Instagram", "Outdoor Media", "Events", "Strategic Partnerships"],
    backgroundPhrase: "Media",
  },
};

export function getSelectedService(selectedTab: number) {
  const safeIndex = Math.max(0, Math.min(selectedTab, SERVICE_TABS.length - 1));
  return SERVICES_CONTENT[SERVICE_TABS[safeIndex]];
}
