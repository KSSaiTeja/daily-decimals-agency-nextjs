import { ArrowLeft, ArrowRight } from "lucide-react";

type TestimonialsNavArrowProps = {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
};

export function TestimonialsNavArrow({
  direction,
  label,
  onClick,
}: TestimonialsNavArrowProps) {
  const Icon = direction === "next" ? ArrowRight : ArrowLeft;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-[46px] items-center justify-center rounded-[32px] bg-[#ddd] p-3 transition-colors duration-200 hover:bg-[#d0d0d0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/55"
    >
      <Icon size={20} strokeWidth={2} className="text-black" aria-hidden />
    </button>
  );
}
