export const CONTACT_SUPPORT_EMAIL = "dailydecimals@gmail.com";

export const CONTACT_CARD_EDGE = "#111111";

export const CONTACT_EMAIL_MARQUEE_COPIES = 8;
export const CONTACT_EMAIL_MARQUEE_SPEED = 52;
export const CONTACT_EMAIL_MARQUEE_GAP = "72px";

export const CONTACT_HEADING = "Let's Connect";

export const CONTACT_COPY = {
  titleLines: ["Got a project", "in mind?"] as const,
  subtitle: "Let's make something happen together",
} as const;

export type CountryCode = {
  code: string;
  label: string;
};

export const CONTACT_COUNTRY_CODES: CountryCode[] = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+33", label: "🇫🇷 +33" },
];

export const CONTACT_SUBMIT_LABEL = "Send your message";
export const CONTACT_SUBMITTING_LABEL = "Sending your note…";

/**
 * Portfolio demo — skips the API and always shows the success state after a valid submit.
 * Set to `false` when wiring a live inbox or webhook.
 */
export const CONTACT_DEMO_SUCCESS = false;

export const CONTACT_SUCCESS = {
  eyebrow: "You're in good hands",
  headline: (firstName: string) =>
    firstName ? `${firstName}, we got it.` : "We got it. Thank you.",
  body: "Your message is with our team now: real people who care about craft, not an auto-reply. We'll read it properly and get back to you within one business day.",
  reassurance:
    "The hard part was reaching out. You did that. We'll take it from here.",
  steps: [
    "We read every message personally",
    "A thoughtful reply within 24 hours",
    "No spam, just a genuine conversation",
  ] as const,
  sendAnother: "Send another message",
  mailtoHint:
    "Your email draft is open. Hit send and we'll pick it up from there.",
} as const;

export function getContactFirstName(fullName: string) {
  const trimmed = fullName.trim();
  if (!trimmed) return "";
  return trimmed.split(/\s+/)[0] ?? "";
}

export type ContactFormState = {
  name: string;
  email: string;
  countryCode: string;
  mobile: string;
  company: string;
  designation: string;
  message: string;
};

export const INITIAL_CONTACT_FORM: ContactFormState = {
  name: "",
  email: "",
  countryCode: "+91",
  mobile: "",
  company: "",
  designation: "",
  message: "",
};

export type ContactSubmitStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidContactEmail(value: string) {
  return EMAIL_PATTERN.test(value);
}
