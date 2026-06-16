/** Public raster/SVG asset URLs. */
function imageUrl(filename: string): string {
  return `/images/${filename}`;
}

function heroImageUrl(filename: string): string {
  return `/hero-images/${filename}`;
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
export const interiorShowcase = imageUrl("interior-showcase.png");
export const logoPlaceholder = imageUrl("logo-placeholder.png");
export const innovationVisual = imageUrl("innovation-visual.png");
export const iconAccent14 = imageUrl("icon-accent-14.png");
export const iconAccent15 = imageUrl("icon-accent-15.png");
export const advantageVisual1 = imageUrl("advantage-visual-1.png");
export const advantageVisual2 = imageUrl("advantage-visual-2.png");
export const advantageVisual3 = imageUrl("advantage-visual-3.png");
export const advantageVisual4 = imageUrl("advantage-visual-4.png");
export const testimonialFeature = imageUrl("testimonial-feature.png");
export const personaBlur = imageUrl("persona-blur.png");
export const personaSharp = imageUrl("persona-sharp.png");
export const productDetail = imageUrl("product-detail.png");
