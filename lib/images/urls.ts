/** Public raster/SVG asset URLs. */
function imageUrl(filename: string): string {
  return `/images/${filename}`;
}

function heroImageUrl(filename: string): string {
  return `/hero-images/${filename}`;
}

/** Advantages section card images — grouped under /images/advantages/. */
function advantageImageUrl(filename: string): string {
  return `/images/advantages/${filename}`;
}

export const heroCardImages = [
  heroImageUrl("card-1.png"),
  heroImageUrl("card-2.png"),
  heroImageUrl("card-3.png"),
  heroImageUrl("card-4.png"),
  heroImageUrl("card-5.png"),
] as const;

export const heroGenerationO = heroImageUrl("O-pattern.svg");

export const logoPrimary = imageUrl("logo-primary.png");
export const founderAvatar1 = imageUrl("founder-avatar-1.png");
export const founderAvatar2 = imageUrl("founder-avatar-2.png");
export const founderAvatar3 = imageUrl("founder-avatar-3.png");
export const statAvatar1 = imageUrl("stat-avatar-1.png");
export const statAvatar2 = imageUrl("stat-avatar-2.png");
export const statAvatar3 = imageUrl("stat-avatar-3.png");
export const statAvatar4 = imageUrl("stat-avatar-4.png");
export const statAvatar5 = imageUrl("stat-avatar-5.png");
export const brandAccent = imageUrl("brand-accent.png");
export const iconAccent1 = imageUrl("icon-accent-1.png");
export const iconAccent2 = imageUrl("icon-accent-2.png");
export const iconAccent3 = imageUrl("icon-accent-3.png");
export const iconAccent4 = imageUrl("icon-accent-4.png");
export const iconAccent5 = imageUrl("icon-accent-5.png");
export const iconAccent6 = imageUrl("icon-accent-6.png");
export const iconAccent7 = imageUrl("icon-accent-7.png");
export const iconAccent8 = imageUrl("icon-accent-8.png");
export const iconAccent9 = imageUrl("icon-accent-9.png");
export const iconAccent10 = imageUrl("icon-accent-10.png");
export const iconAccent11 = imageUrl("icon-accent-11.png");
export const iconAccent12 = imageUrl("icon-accent-12.png");
export const iconAccent13 = imageUrl("icon-accent-13.png");
export const processBackground = imageUrl("process-background.png");
export const processOverlay = imageUrl("process-overlay.png");
export const logoSecondary = imageUrl("logo-secondary.png");
export const pixelsWithPurpose = advantageImageUrl("pixels-with-purpose.png");
export const endToEndOwnership = advantageImageUrl("end-to-end-ownership.png");
export const productMeetsMarketing = advantageImageUrl("product-meets-marketing.png");
export const connectedCustomerJourneys = advantageImageUrl("connected-customer-journeys.png");
export const fromInsightsToExecution = advantageImageUrl("from-insights-to-execution.png");
export const buildingRevenueEngines1 = advantageImageUrl("building-revenue-engines-1.png");
export const buildingRevenueEngines2 = advantageImageUrl("building-revenue-engines-2.png");
export const buildingRevenueEngines3 = advantageImageUrl("building-revenue-engines-3.png");
export const buildingRevenueEngines4 = advantageImageUrl("building-revenue-engines-4.png");
export const buildingRevenueEngines5 = advantageImageUrl("building-revenue-engines-5.png");
