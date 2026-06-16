import {
  Armchair,
  Building2,
  GraduationCap,
  Hotel,
  Landmark,
  ShoppingBag,
  Store,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import type { IndustryIconName } from "./data";

const ICONS: Record<IndustryIconName, LucideIcon> = {
  fintech: Landmark,
  hospitality: Hotel,
  education: GraduationCap,
  "real-estate": Building2,
  interior: Armchair,
  d2c: ShoppingBag,
  marketplace: Store,
  experiences: Ticket,
};

type IndustryIconProps = {
  icon: IndustryIconName;
  className?: string;
};

export function IndustryIcon({ icon, className }: IndustryIconProps) {
  const Icon = ICONS[icon];

  return (
    <Icon
      className={className}
      size={26}
      strokeWidth={1.4}
      aria-hidden
    />
  );
}
