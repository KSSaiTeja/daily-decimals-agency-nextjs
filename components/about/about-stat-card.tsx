import type { AboutStat } from "@/components/about/data";

type AboutStatCardProps = {
  stat: AboutStat;
};

export function AboutStatCard({ stat }: AboutStatCardProps) {
  return (
    <article data-about-stat-card className="about-stat-card flex w-full min-w-0 flex-col gap-2">
      <p className="about-stat-card__value type-display tabular-nums">
        <span data-about-counter-target={stat.value}>{stat.value}</span>
        {stat.suffix ? <span>{stat.suffix}</span> : null}
      </p>

      <div className="flex flex-col gap-1">
        <h3 className="about-stat-card__title type-title">{stat.title}</h3>
        <p className="about-stat-card__caption type-caption">{stat.caption}</p>
      </div>
    </article>
  );
}
