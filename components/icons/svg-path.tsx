import type { SVGProps } from "react";
import type { SvgPathName } from "@/lib/svg";
import svgPaths from "@/lib/svg/paths";

type SvgPathProps = Omit<SVGProps<SVGPathElement>, "d"> & {
  name: SvgPathName;
};

/** Renders a path from the design-system path registry by semantic name. */
export function SvgPath({ name, ...props }: SvgPathProps) {
  return <path d={svgPaths[name]} {...props} />;
}
