import { iconPaths } from "@/lib/svg";

export function TestimonialsQuoteMark() {
  return (
    <div
      className="flex h-[35px] w-10 shrink-0 flex-col items-start justify-center"
      aria-hidden
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 35">
        <path d={iconPaths.quoteMarkGlow} fill="#FF4D00" opacity={0.2} />
      </svg>
    </div>
  );
}
