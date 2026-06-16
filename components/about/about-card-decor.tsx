import svgPaths from "@/lib/svg/paths";

type AboutCardDecorProps = {
  height: 80 | 90;
};

/** Corner bracket SVG beside stat-card avatar rows. */
export function AboutCardDecor({ height }: AboutCardDecorProps) {
  const viewBox = height === 80 ? "0 0 40 80" : "0 0 40 90";

  return (
    <div
      data-name="decor1"
      className="shrink-0 flex-col items-start justify-center"
      style={{ height: `${height}px`, width: "40px" }}
      aria-hidden
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox={viewBox}
      >
        <g clipPath={`url(#about-decor-${height})`}>
          <path
            d={height === 80 ? "M0 57.5H40" : "M4.37114e-08 22.5L40 22.5"}
            stroke="var(--color-line)"
            strokeMiterlimit={height === 80 ? 10 : undefined}
          />
          <path
            d={height === 80 ? "M14.5 80V0" : "M15.5 2.18557e-08V90"}
            stroke="var(--color-line)"
            strokeMiterlimit={height === 80 ? 10 : undefined}
          />
          <path
            d={height === 80 ? svgPaths.serviceCardDividerA : svgPaths.serviceCardCornerA}
            fill="var(--color-line)"
            {...(height === 90
              ? { clipRule: "evenodd", fillRule: "evenodd" as const }
              : {})}
          />
          <path
            d={height === 80 ? svgPaths.serviceCardDividerB : svgPaths.serviceCardCornerB}
            fill="var(--color-line)"
            {...(height === 90
              ? { clipRule: "evenodd", fillRule: "evenodd" as const }
              : {})}
          />
        </g>
        <defs>
          <clipPath id={`about-decor-${height}`}>
            <rect fill="white" height={height} width="40" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
