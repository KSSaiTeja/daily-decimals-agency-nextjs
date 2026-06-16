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

export const FOOTER_NAV_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Our Story", href: "#about", sectionId: "about" },
      { label: "Our Projects", href: "#testimonials", sectionId: "testimonials" },
      { label: "What We Offer", href: "#services", sectionId: "services" },
      { label: "Insights", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Linkedin", href: "https://www.linkedin.com", external: true },
      { label: "Instagram", href: "https://www.instagram.com", external: true },
      { label: "FaceBook", href: "https://www.facebook.com", external: true },
      { label: "Behance", href: "https://www.behance.net", external: true },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Data Protection", href: "#" },
      { label: "User Agreement", href: "#" },
    ],
  },
] as const satisfies readonly FooterNavColumn[];

export const FOOTER_COPY = {
  copyright: "© 2025 Daily Decimals. All rights reserved.",
  timezoneLabel: "India →",
  backToTop: "backtotop",
} as const;
