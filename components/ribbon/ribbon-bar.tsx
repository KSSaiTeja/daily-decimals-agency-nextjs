import type { ReactNode } from "react";

type RibbonBarProps = {
  variant: "stats" | "services";
  children: ReactNode;
};

const VARIANT_CLASS = {
  stats: "bg-ink",
  services: "bg-brand",
} as const;

export function RibbonBar({ variant, children }: RibbonBarProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "var(--ribbon-track-width)",
        height: "var(--ribbon-bar-height)",
      }}
    >
      <div className={`absolute inset-0 ${VARIANT_CLASS[variant]}`} />
      {children}
    </div>
  );
}
