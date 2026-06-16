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
