export type FunnelStage = {
  number: string;
  title: string;
  heading: string;
  description: string;
};

export const FUNNEL_EYEBROW = "(Growth funnel)";

export const FUNNEL_HEADING = {
  titleLead: "Our full",
  titleEmphasis: "growth path",
  subtitle: "Every stage, engineered to convert.",
} as const;

export const FUNNEL_STAGES: FunnelStage[] = [
  {
    number: "01",
    title: "Discoverability",
    heading: "Helping the right customers find you.",
    description:
      "Visibility and presence across the channels that attract your ideal audience.",
  },
  {
    number: "02",
    title: "Consideration",
    heading: "Turning attention into trust.",
    description:
      "Interest, credibility, and value that resonates with your audience.",
  },
  {
    number: "03",
    title: "Acquisition",
    heading: "Driving measurable customer growth.",
    description: "Qualified traffic converted into valuable customers.",
  },
  {
    number: "04",
    title: "Engagement",
    heading: "Keeping customers active and connected.",
    description: "Meaningful interactions at every touchpoint.",
  },
  {
    number: "05",
    title: "Retention",
    heading: "Increasing lifetime value.",
    description:
      "Retention, expansion, and advocacy that compounds growth.",
  },
];
