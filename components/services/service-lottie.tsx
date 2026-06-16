"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { getCachedLottie, loadLottie } from "@/components/services/lottie-cache";
import {
  lottieAnimationMask,
  SERVICE_LOTTIE,
  type ServiceLottieLabel,
} from "@/components/services/lottie-config";

export function ServiceLottie({ label }: { label: ServiceLottieLabel }) {
  const config = SERVICE_LOTTIE[label];
  const animationMask = lottieAnimationMask(config.bottomClipPercent, config.fadeLengthPercent);
  const [animationData, setAnimationData] = useState<object | null>(() => getCachedLottie(config.src));
  const [visible, setVisible] = useState(Boolean(getCachedLottie(config.src)));

  useEffect(() => {
    let cancelled = false;

    loadLottie(config.src)
      .then((data) => {
        if (cancelled) return;
        setAnimationData(data);
        requestAnimationFrame(() => {
          if (!cancelled) setVisible(true);
        });
      })
      .catch(() => {
        if (!cancelled) setAnimationData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [config.src]);

  return (
    <div className="relative size-full overflow-hidden bg-transparent" aria-label={label}>
      <div className="absolute" style={{ inset: config.inset }}>
        {animationData ? (
          <div
            className="relative size-full transition-opacity duration-300 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              WebkitMaskImage: animationMask,
              maskImage: animationMask,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          >
            <Lottie
              animationData={animationData}
              loop
              autoplay
              rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
              className="size-full"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
