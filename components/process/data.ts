import {
  iconAccent7,
  iconAccent8,
  iconAccent9,
  iconAccent10,
  iconAccent11,
  iconAccent12,
  iconAccent13,
} from "@/lib/images";

export const PROCESS_EYEBROW = "(Our process)";

export const PROCESS_HEADING = {
  titleLead: "How we",
  titleEmphasis: "work together",
  subtitle: "A clear path from idea to launch.",
} as const;

export const PROCESS_FOOTNOTE = {
  star: "*",
  text: "Varies based on project scope",
} as const;

export type ProcessPlacement =
  | "discovery"
  | "ideation"
  | "planning"
  | "execution"
  | "optimization"
  | "delivery"
  | "analysis";

export type ProcessStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: string;
  placement: ProcessPlacement;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discovery",
    step: "01.",
    title: "Discovery",
    description: "We immerse ourselves in your brand, audience, and goals.",
    icon: iconAccent13,
    placement: "discovery",
  },
  {
    id: "ideation",
    step: "02.",
    title: "Ideation",
    description: "We brainstorm creative concepts and strategies tailored to your needs.",
    icon: iconAccent7,
    placement: "ideation",
  },
  {
    id: "planning",
    step: "03.",
    title: "Planning",
    description: "We develop a detailed roadmap, timeline, and resource allocation.",
    icon: iconAccent8,
    placement: "planning",
  },
  {
    id: "execution",
    step: "04.",
    title: "Execution",
    description: "Our team brings your vision to life with precision and expertise.",
    icon: iconAccent9,
    placement: "execution",
  },
  {
    id: "optimization",
    step: "05.",
    title: "Optimization",
    description:
      "We continuously monitor, analyze, and refine our approach for peak performance.",
    icon: iconAccent10,
    placement: "optimization",
  },
  {
    id: "delivery",
    step: "06.",
    title: "Delivery",
    description: "We provide ongoing support and maintenance to ensure lasting success.",
    icon: iconAccent11,
    placement: "delivery",
  },
  {
    id: "analysis",
    step: "07.",
    title: "Analysis",
    description: "We analyze the results and make improvements for future projects.",
    icon: iconAccent12,
    placement: "analysis",
  },
];
