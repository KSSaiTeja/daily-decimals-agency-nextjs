import { AboutAvatarStack } from "@/components/about/about-avatar-stack";
import { AboutCardDecor } from "@/components/about/about-card-decor";
import type { AboutStat } from "@/components/about/data";

type AboutStatCardProps = {
  stat: AboutStat;
};

export function AboutStatCard({ stat }: AboutStatCardProps) {
  const mediaName = stat.avatarVariant === "round" ? "peopleimgs" : "projectimgs";
  const groupName = stat.avatarVariant === "round" ? "rounds" : "squares";
  const mediaMinHeight =
    stat.decorHeight === 80
      ? "min-h-[var(--about-stat-media-height)]"
      : "min-h-[calc(var(--about-stat-media-height)+0.625rem)]";

  return (
    <article data-about-stat-card className="about-stat-card flex w-full min-w-0 flex-col gap-2">
      <p
        data-about-counter-target={stat.value}
        className="about-stat-card__value type-display tabular-nums"
      >
        {stat.value}
      </p>

      <div className="flex flex-col gap-1">
        <h3 className="about-stat-card__title type-title">{stat.title}</h3>
        <p className="about-stat-card__caption type-caption">{stat.caption}</p>
      </div>

      <div
        className={`about-stat-card__media mt-4 flex w-full items-center sm:mt-5 lg:mt-6 ${mediaMinHeight}`}
        data-name={mediaName}
      >
        <div
          className={`about-stat-card__media-inner relative flex-1 overflow-hidden ${mediaMinHeight}`}
        >
          <AboutAvatarStack
            variant={stat.avatarVariant}
            images={stat.avatars}
            groupName={groupName}
          />
          <div
            data-name="line"
            className="about-stat-card__line absolute top-1/2 left-[6.75rem] right-0 h-px -translate-y-1/2 bg-line opacity-50 sm:left-[7.5rem]"
          />
        </div>
        <AboutCardDecor height={stat.decorHeight} />
      </div>
    </article>
  );
}
