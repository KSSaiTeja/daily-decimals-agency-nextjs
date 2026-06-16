"use client";

import { SectionHeadingOffset } from "@/components/section-heading";
import type { Testimonial } from "@/components/testimonials/data";
import { TestimonialsNavArrow } from "@/components/testimonials/testimonials-nav-arrow";
import { TestimonialsQuoteMark } from "@/components/testimonials/testimonials-quote-mark";
import { useEffect, useRef, type RefObject } from "react";

type TestimonialsCarouselProps = {
  testimonial: Testimonial;
  index: number;
  total: number;
  slideRef: RefObject<HTMLDivElement | null>;
  onPrev: () => void;
  onNext: () => void;
};

export function TestimonialsCarousel({
  testimonial,
  index,
  total,
  slideRef,
  onPrev,
  onNext,
}: TestimonialsCarouselProps) {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    };

    region.addEventListener("keydown", onKeyDown);
    return () => region.removeEventListener("keydown", onKeyDown);
  }, [onNext, onPrev]);

  const statusLabel = `Testimonial ${index + 1} of ${total}`;

  return (
    <div className="flex w-full flex-col gap-[10px]">
      <div
        ref={slideRef}
        data-testimonials-slide
        className="flex w-full flex-col items-start gap-6 lg:flex-row lg:gap-[10px]"
        aria-live="polite"
        aria-atomic="true"
      >
        <SectionHeadingOffset />

        <div
          data-testimonials-person
          className="w-full shrink-0 pt-0 lg:w-[310px] lg:pt-[66px]"
        >
          <div className="flex w-full max-w-[310px] flex-col gap-[16px]">
            <div
              className="flex aspect-square w-[96px] items-center justify-center overflow-hidden rounded-full"
              style={{ background: testimonial.avatarGradient }}
              aria-hidden
            >
              <span className="type-title font-semibold text-white">
                {testimonial.initials}
              </span>
            </div>
            <div className="flex flex-col">
              <p className="type-body-md font-semibold whitespace-nowrap">
                {testimonial.name}
              </p>
              <p className="type-caption font-medium">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={regionRef}
          data-testimonials-copy
          className="flex min-w-0 flex-1 flex-col gap-[22px] outline-none focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand/55"
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={statusLabel}
        >
          <TestimonialsQuoteMark />
          <div className="flex w-full flex-col gap-[36px]">
            <div className="max-w-full pr-0 lg:pr-12">
              <p key={`${testimonial.id}-quote`} className="type-quote">
                {testimonial.quote}
              </p>
            </div>
            <p key={`${testimonial.id}-context`} className="type-lead max-w-[670px]">
              {testimonial.context}
            </p>
          </div>
        </div>
      </div>

      <div
        data-testimonials-nav
        className="flex w-full items-center gap-[10px] pt-8 lg:pt-[50px]"
      >
        <SectionHeadingOffset />
        <div className="flex gap-[20px]">
          <TestimonialsNavArrow
            direction="prev"
            label="Previous testimonial"
            onClick={onPrev}
          />
          <TestimonialsNavArrow
            direction="next"
            label="Next testimonial"
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  );
}
