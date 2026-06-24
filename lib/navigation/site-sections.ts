export type SiteSection = {
  id: string;
  label: string;
};

/** Bottom pill links — order matches site section flow. */
export const SITE_NAV_SECTIONS: SiteSection[] = [
  { id: "about", label: "How We Work" },
  { id: "services", label: "Services" },
  { id: "funnel", label: "Approach" },
  { id: "contact", label: "Contact Us" },
];

export const CONTACT_SECTION_ID = "contact";
