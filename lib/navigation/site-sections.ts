export type SiteSection = {
  id: string;
  label: string;
};

/** Bottom pill links — order matches site section flow. */
export const SITE_NAV_SECTIONS: SiteSection[] = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Approach" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export const CONTACT_SECTION_ID = "contact";
