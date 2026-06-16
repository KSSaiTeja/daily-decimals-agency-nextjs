import type { AboutAvatarVariant } from "@/components/about/data";

type AboutAvatarStackProps = {
  variant: AboutAvatarVariant;
  images: readonly [string, string, string];
  groupName: "rounds" | "squares";
};

const ROUND_RADIUS = "rounded-full";
const SQUARE_RADIUS = ["rounded-lg", "rounded-lg", "rounded-[10px]"] as const;

/**
 * Overlapping triple avatar strip used under each about stat card.
 * Size is driven by `--about-avatar-*` tokens on `.about-avatar-stack`.
 */
export function AboutAvatarStack({
  variant,
  images,
  groupName,
}: AboutAvatarStackProps) {
  const isRound = variant === "round";
  const offsetFactor = isRound ? 1 : 1.0135;

  return (
    <div
      data-name={groupName}
      className="about-avatar-stack absolute left-0 top-1/2 flex -translate-y-1/2 items-center"
    >
      {images.map((src, index) => {
        const radiusClass = isRound ? ROUND_RADIUS : SQUARE_RADIUS[index];

        return (
          <div
            key={src}
            data-about-avatar
            className={`absolute top-0 overflow-hidden border-[3px] border-surface-elevated ${radiusClass}`}
            style={{
              left: `calc(${index} * var(--about-avatar-offset) * ${offsetFactor})`,
              width: "var(--about-avatar-size)",
              height: "var(--about-avatar-size)",
            }}
          >
            <img alt="" src={src} className="size-full object-cover" />
          </div>
        );
      })}
      <div
        aria-hidden
        className="relative shrink-0"
        style={{
          width: "var(--about-avatar-track)",
          height: "var(--about-avatar-size)",
        }}
      />
    </div>
  );
}
