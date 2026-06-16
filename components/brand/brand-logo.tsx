import { logoPrimary } from "@/lib/images";

/** Visible logo bounds from the Figma export (117 × 39.878). */
const LOGO_WIDTH = 117;
const LOGO_HEIGHT = 39.878;

type BrandLogoProps = {
  /** Fixed width in px. Omit when using a fluid width via `className`. */
  width?: number;
  className?: string;
  alt?: string;
};

/**
 * Daily Decimals wordmark — crops `logo-primary.png` to the header viewport
 * (same positioning as dd-code-demo `site-header.tsx`).
 */
export function BrandLogo({
  width,
  className = "",
  alt = "Daily Decimals",
}: BrandLogoProps) {
  return (
    <div
      className={`relative shrink-0 ${className}`.trim()}
      style={{
        ...(width !== undefined ? { width } : null),
        aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          alt={alt}
          src={logoPrimary}
          className="absolute top-[-87.99%] left-[-29.58%] h-[307.51%] w-[157.22%] max-w-none"
        />
      </div>
    </div>
  );
}
