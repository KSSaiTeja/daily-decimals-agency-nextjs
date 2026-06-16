"use client";

import { TESTIMONIALS } from "@/components/testimonials/data";
import { useTestimonialsSectionAnimations } from "@/components/testimonials/testimonials-animations";
import { TestimonialsCarousel } from "@/components/testimonials/testimonials-carousel";
import { TestimonialsHeader } from "@/components/testimonials/testimonials-header";
import { useCallback, useRef, useState } from "react";

/**
 * Client testimonials carousel — responsive quote layout with prev/next navigation.
 */
export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const { sectionRef, animateTestimonialSlide } = useTestimonialsSectionAnimations({
    slideRef,
  });

  const total = TESTIMONIALS.length;
  const testimonial = TESTIMONIALS[index];

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex(((nextIndex % total) + total) % total);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => animateTestimonialSlide());
      });
    },
    [animateTestimonialSlide, total],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      data-testimonials-section
      aria-label="Client testimonials"
      className="testimonials-section scroll-mt-8"
    >
      <div className="testimonials-section__inner">
        <TestimonialsHeader />
        <TestimonialsCarousel
          testimonial={testimonial}
          index={index}
          total={total}
          slideRef={slideRef}
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>
    </section>
  );
}
