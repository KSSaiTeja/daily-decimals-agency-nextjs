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
  title: string;
  caption: string;
  avatarVariant: AboutAvatarVariant;
  avatars: readonly [string, string, string];
  /** Tall corner SVG — 80 for round rows, 90 for square rows. */
  decorHeight: 80 | 90;
};

export const ABOUT_EYEBROW = "( Hey.. ❤️ )";

export const ABOUT_SLOGAN = {
  year: "2026",
  prose:
    "Whether it's your home, office, or a commercial project, we are always dedicated to bringing your vision to life. Our numbers speak better than words:",
} as const;

export const ABOUT_STATS: AboutStat[] = [
  {
    value: 2025,
    title: "Year of establishment",
    caption: "More than 10 years in the field",
    avatarVariant: "round",
    avatars: [statAvatar1, statAvatar2, statAvatar3],
    decorHeight: 80,
  },
  {
    value: 304,
    title: "Projects are launched",
    caption: "A lot of projects are done",
    avatarVariant: "square",
    avatars: [statAvatar4, statAvatar5, brandAccent],
    decorHeight: 90,
  },
  {
    value: 189,
    title: "Clients are satisfied",
    caption: "These people love us",
    avatarVariant: "round",
    avatars: [iconAccent1, iconAccent2, iconAccent3],
    decorHeight: 80,
  },
  {
    value: 12,
    title: "Projects in work",
    caption: "What we do right now",
    avatarVariant: "square",
    avatars: [iconAccent4, iconAccent5, iconAccent6],
    decorHeight: 90,
  },
];

export const ABOUT_AUDIT_CTA = {
  label: "Want us to audit your business?",
  href: "mailto:dailydecimals@gmail.com",
  emailLabel: "Email Daily Decimals for an audit",
} as const;

export const ABOUT_AVAILABILITY = {
  slotsLabel: "5 Slots are avaliable",
} as const;
