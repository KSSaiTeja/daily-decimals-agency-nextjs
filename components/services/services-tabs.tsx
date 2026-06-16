"use client";

import { SERVICE_TABS } from "@/components/services/data";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

const WRAPPED_TABS_QUERY = "(max-width: 767px)";

type ServicesTabsProps = {
  selectedTab: number;
  onSelect: (index: number) => void;
};

function useWrappedTabsLayout() {
  const [wrapped, setWrapped] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia(WRAPPED_TABS_QUERY);

    const sync = () => setWrapped(media.matches);
    sync();

    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return wrapped;
}

export function ServicesTabs({ selectedTab, onSelect }: ServicesTabsProps) {
  const wrappedLayout = useWrappedTabsLayout();
  const trackRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [isIndicatorReady, setIsIndicatorReady] = useState(false);

  useLayoutEffect(() => {
    if (wrappedLayout) {
      setIsIndicatorReady(false);
      return;
    }

    const track = trackRef.current;
    const button = btnRefs.current[selectedTab];
    if (!track || !button) return;

    const syncIndicator = () => {
      setIndicatorX(button.offsetLeft);
      setIndicatorWidth(button.offsetWidth);
      setIsIndicatorReady(true);
    };

    syncIndicator();

    const resizeObserver = new ResizeObserver(syncIndicator);
    resizeObserver.observe(track);
    btnRefs.current.forEach((el) => {
      if (el) resizeObserver.observe(el);
    });

    return () => resizeObserver.disconnect();
  }, [selectedTab, wrappedLayout]);

  return (
    <div className="services-tabs" data-services-tabs>
      <div className="services-tabs__scroll">
        <div ref={trackRef} className="services-tabs__track">
          {!wrappedLayout ? (
            <div
              data-services-chip-indicator
              className="services-tabs__indicator"
              style={
                {
                  width: `${indicatorWidth}px`,
                  transform: `translate3d(${indicatorX}px, 0, 0)`,
                  transition: isIndicatorReady
                    ? "transform 520ms cubic-bezier(0.25, 1, 0.5, 1), width 520ms cubic-bezier(0.25, 1, 0.5, 1)"
                    : "none",
                  opacity: isIndicatorReady ? 1 : 0,
                } satisfies CSSProperties
              }
            />
          ) : null}

          {SERVICE_TABS.map((label, index) => {
            const selected = selectedTab === index;
            return (
              <button
                key={label}
                ref={(el) => {
                  btnRefs.current[index] = el;
                }}
                type="button"
                onClick={() => onSelect(index)}
                aria-pressed={selected}
                className="services-tab"
                data-services-tab
                data-selected={selected ? "" : undefined}
              >
                <span className="services-tab__surface" aria-hidden />
                <span className="services-tab__label">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
