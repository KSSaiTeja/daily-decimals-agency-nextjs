type BrandfetchLogoOptions = {
  domain: string;
  height?: number;
  width?: number;
  theme?: "light" | "dark";
  type?: "logo" | "icon" | "symbol";
};

const CLIENT_ID = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID ?? "";

export function getBrandfetchLogoUrl({
  domain,
  height = 104,
  width = 320,
  theme = "light",
  type = "logo",
}: BrandfetchLogoOptions): string {
  const params = new URLSearchParams();
  if (CLIENT_ID) params.set("c", CLIENT_ID);

  const query = params.toString();
  const suffix = query ? `?${query}` : "";

  return `https://cdn.brandfetch.io/domain/${domain}/w/${width}/h/${height}/theme/${theme}/type/${type}${suffix}`;
}

export function hasBrandfetchClientId(): boolean {
  return CLIENT_ID.length > 0;
}
