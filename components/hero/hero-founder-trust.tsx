"use client";

import { useFounderStackEntrance } from "@/components/hero/site-chrome";
import {
  founderAvatar1,
  founderAvatar2,
  founderAvatar3,
} from "@/lib/images";
import { useRef } from "react";

const AVATARS = [founderAvatar1, founderAvatar2, founderAvatar3] as const;

export function HeroFounderTrust() {
  const ref = useRef<HTMLDivElement>(null);
  useFounderStackEntrance(ref);

  return (
    <div ref={ref} className="flex items-center justify-start gap-2.5 sm:gap-3">
      <div className="relative h-9 w-[5.5rem] shrink-0 sm:h-10 sm:w-24">
        {AVATARS.map((src, index) => (
          <div
            key={src}
            data-founder-avatar
            className="absolute top-0 size-9 overflow-hidden rounded-full border border-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] sm:size-10"
            style={{ left: `${index * 1.65}rem` }}
          >
            <img alt="" src={src} className="size-full object-cover" />
          </div>
        ))}
      </div>
      <p
        data-founder-trust
        className="type-body text-[15px] text-ink-subtle sm:text-base"
      >
        Outcome-focussed growth partners.
      </p>
    </div>
  );
}
