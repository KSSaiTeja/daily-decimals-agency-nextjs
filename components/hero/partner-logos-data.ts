export type PartnerLogo = {
  name: string;
  src: string;
};

function partnerLogo(filename: string): string {
  return `/images/logos/${encodeURIComponent(filename)}`;
}

export const PARTNER_LOGOS: PartnerLogo[] = [
  { name: "Wink and Wish", src: partnerLogo("wink & wish.png") },
  { name: "Doolally", src: partnerLogo("doolally.png") },
  { name: "Corporate Commerce", src: partnerLogo("corporate commerce.png") },
  { name: "Orchid Hotels", src: partnerLogo("orchid.png") },
  { name: "Goldfinch Hotels and Resorts", src: partnerLogo("goldfinch.png") },
  { name: "Things2do", src: partnerLogo("things2do.png") },
  { name: "MRG Group", src: partnerLogo("mrg group.png") },
  { name: "Einri Living", src: partnerLogo("einri-living.png") },
];
