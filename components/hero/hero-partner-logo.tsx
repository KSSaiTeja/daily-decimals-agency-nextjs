"use client";

import type { PartnerLogo } from "@/components/hero/partner-logos-data";
import { useState } from "react";

type HeroPartnerLogoProps = {
  partner: PartnerLogo;
};

export function HeroPartnerLogo({ partner }: HeroPartnerLogoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex h-10 w-[9.25rem] shrink-0 items-center justify-start sm:h-11 sm:w-[10rem] md:h-12 md:w-[10.5rem] lg:h-[3.25rem] lg:w-[11rem]">
      {failed ? (
        <span className="whitespace-nowrap text-sm font-medium tracking-tight text-ink/55 sm:text-[0.9375rem]">
          {partner.name}
        </span>
      ) : (
        <img
          alt={partner.name}
          className="max-h-full max-w-full object-contain object-left opacity-85"
          decoding="async"
          loading="lazy"
          src={partner.src}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
