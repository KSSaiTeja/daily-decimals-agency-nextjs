import {
  brandAccent,
  iconAccent1,
  iconAccent2,
  iconAccent3,
  iconAccent4,
  iconAccent5,
  iconAccent6,
  statAvatar1,
  statAvatar2,
  statAvatar3,
  statAvatar4,
  statAvatar5,
} from "@/lib/images";

export type AboutAvatarVariant = "round" | "square";

export type AboutStat = {
  value: number;
  suffix?: string;
  title: string;
  caption: string;
  avatarVariant: AboutAvatarVariant;
  avatars: readonly [string, string, string];
  /** Tall corner SVG — 80 for round rows, 90 for square rows. */
  decorHeight: 80 | 90;
};

export const ABOUT_EYEBROW = "( Hi there… )";

export const ABOUT_SLOGAN = {
  year: "2023",
} as const;

/** First entry is the large lead line; the rest render as smaller body paragraphs. */
export const ABOUT_PARAGRAPHS: string[] = [
  "Think of us as an extension of your own in-house team, working relentlessly to grow your business with you, with deep expertise in design, content and product-led growth.",
  "We don't start with colour palettes or ad platforms. We start with your business model, your customer's habits, your margins, your competitive edge and your real problems. From posts that align with your brand to visuals that bring your product alive and copy that makes customers act, we are all about them.",
  "The medium doesn't matter. Be it your social pages, your ads, your website, your app screens or an email to your customers, we make every pixel count through design that inspires and content that converts.",
  "We're also very good at making sense of the chaos. Great marketing doesn't start at brand logos; it starts in product thinking and ends with every part of the organisation speaking the same brand language. So we work with founders and multiple teams to make this a reality.",
];

export const ABOUT_STATS: AboutStat[] = [
  {
    value: 2023,
    title: "Year of establishment",
    caption: "when daily decimals began",
    avatarVariant: "round",
    avatars: [statAvatar1, statAvatar2, statAvatar3],
    decorHeight: 80,
  },
  {
    value: 40,
    suffix: "+",
    title: "Years of cumulative marketing experience",
    caption: "across our team",
    avatarVariant: "square",
    avatars: [statAvatar4, statAvatar5, brandAccent],
    decorHeight: 90,
  },
  {
    value: 25,
    suffix: "+",
    title: "Brands we've worked with",
    caption: "and growing",
    avatarVariant: "round",
    avatars: [iconAccent1, iconAccent2, iconAccent3],
    decorHeight: 80,
  },
  {
    value: 2000,
    suffix: "+",
    title: "Creative assets designed",
    caption: "and counting",
    avatarVariant: "square",
    avatars: [iconAccent4, iconAccent5, iconAccent6],
    decorHeight: 90,
  },
];

export const ABOUT_AUDIT_CTA = {
  label: "Want us to audit your product or marketing for Free?",
  href: "mailto:dailydecimals@gmail.com",
  emailLabel: "Email Daily Decimals for a free audit",
} as const;

export const ABOUT_AVAILABILITY = {
  slotsLabel: "5 Slots are avaliable",
} as const;
