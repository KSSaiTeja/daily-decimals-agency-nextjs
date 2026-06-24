export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  context: string;
  initials: string;
  avatarGradient: string;
};

export const TESTIMONIALS_EYEBROW = "(Client voices)";

export const TESTIMONIALS_HEADING = {
  titleLead: "Proof from",
  titleEmphasis: "real partners",
  subtitle: "Feedback that fuels our work.",
} as const;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "anya-petrova",
    name: "Anya Petrova",
    role: "CEO",
    company: "Petrova Industries",
    quote:
      "Their innovative strategies transformed our online presence and boosted sales. A game-changer for our team.",
    context:
      "Petrova Industries sought increased brand awareness. We delivered a targeted campaign that exceeded expectations within the first quarter.",
    initials: "AP",
    avatarGradient: "linear-gradient(135deg, #ff6b35 0%, #ff4d00 45%, #c73e00 100%)",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "Founder",
    company: "Brightline Studio",
    quote:
      "Daily Decimals brought clarity to our brand story. The site feels premium, fast, and unmistakably ours.",
    context:
      "Brightline needed a portfolio that matched the quality of their client work. Launch week traffic doubled with stronger inbound leads.",
    initials: "MC",
    avatarGradient: "linear-gradient(135deg, #3d5afe 0%, #1e88e5 50%, #0d47a1 100%)",
  },
  {
    id: "elena-vasquez",
    name: "Elena Vasquez",
    role: "CMO",
    company: "Northwind Collective",
    quote:
      "Every detail was intentional, from motion to messaging. Our conversion rate climbed without sacrificing brand warmth.",
    context:
      "Northwind wanted a cohesive digital experience across product pages and campaigns. The new system paid for itself in six weeks.",
    initials: "EV",
    avatarGradient: "linear-gradient(135deg, #7c4dff 0%, #651fff 50%, #4527a0 100%)",
  },
  {
    id: "james-okonkwo",
    name: "James Okonkwo",
    role: "Director of Growth",
    company: "Vaultline",
    quote:
      "We finally have a site that sells as well as our product does. The team moved fast and communicated like partners.",
    context:
      "Vaultline's previous site buried key proof points. Restructuring the funnel lifted demo requests by forty-one percent.",
    initials: "JO",
    avatarGradient: "linear-gradient(135deg, #00bfa5 0%, #00897b 50%, #004d40 100%)",
  },
  {
    id: "sofia-lindstrom",
    name: "Sofia Lindström",
    role: "Partner",
    company: "Arch & Co.",
    quote:
      "Refined, confident, and human: the exact tone we needed. Clients mention the website before they mention our fees.",
    context:
      "Arch & Co. repositioned toward high-touch residential projects. The refreshed identity aligned every touchpoint with that shift.",
    initials: "SL",
    avatarGradient: "linear-gradient(135deg, #f50057 0%, #c51162 50%, #880e4f 100%)",
  },
];
