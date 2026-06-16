import { paths as iconPaths } from "./icons";
import { paths as servicePaths } from "./services";

const svgPaths = {
  ...iconPaths,
  ...servicePaths,
} as const;

export default svgPaths;
export type SvgPathName = keyof typeof svgPaths;
