export type FooterLinkItem = {
  label: string;
  href: string;
  sectionId?: string;
  external?: boolean;
};

export type FooterNavColumn = {
  title: string;
  links: readonly FooterLinkItem[];
};

export type FooterSocialIcon = "linkedin" | "instagram" | "facebook" | "behance";

export type FooterSocial = {
  label: string;
  href: string;
  icon: FooterSocialIcon;
};

export const FOOTER_SOCIALS: FooterSocial[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
  // Hidden for now — uncomment to re-enable.
  // { label: "Instagram", href: "https://www.instagram.com", icon: "instagram" },
  // { label: "Facebook", href: "https://www.facebook.com", icon: "facebook" },
  // { label: "Behance", href: "https://www.behance.net", icon: "behance" },
];

export const FOOTER_BRAND = {
  tagline: "Outcome-focused growth partner — design, content, and product built to compound.",
} as const;

export const FOOTER_NAV: readonly FooterNavColumn[] = [
  {
    title: "Navigate",
    links: [
      { label: "How We Work", href: "#about", sectionId: "about" },
      { label: "Services", href: "#services", sectionId: "services" },
      { label: "Why Us", href: "#advantages", sectionId: "advantages" },
      { label: "Approach", href: "#funnel", sectionId: "funnel" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Industries", href: "#industries", sectionId: "industries" },
      { label: "Contact", href: "#contact", sectionId: "contact" },
    ],
  },
];

export const FOOTER_CONTACT = {
  coffeeLabel: "Let's catch up over a coffee at",
  cities: "Hyderabad, Bengaluru",
  contactLabel: "Or contact us",
  email: "dailydecimals@gmail.com",
  phones: ["+91 77189 03361", "+91 93904 18860"],
} as const;

export const FOOTER_COPY = {
  copyright:
    "© All rights reserved with Daily Decimals Designs & Media LLP (GSTIN: 27AAWFD0640F1ZF) 2026.",
} as const;
