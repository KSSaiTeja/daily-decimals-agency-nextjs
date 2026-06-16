import type { SVGProps } from "react";
import { SvgPath } from "./svg-path";

type RibbonOrnamentIconProps = SVGProps<SVGSVGElement>;

/** Ribbon marquee bullet — four-point star from the Figma export. */
export function RibbonOrnamentIcon({
  className = "block size-full",
  ...props
}: RibbonOrnamentIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 17.0387 17"
      preserveAspectRatio="none"
      aria-hidden
      {...props}
    >
      <SvgPath name="ribbonOrnament" fill="currentColor" />
    </svg>
  );
}
