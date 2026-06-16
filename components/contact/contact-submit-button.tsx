function SubmitArrowIcon() {
  return (
    <svg
      aria-hidden
      className="size-[1.125rem] shrink-0 text-white transition-transform duration-300 ease-out group-hover:translate-x-[3px] sm:size-[1.25rem]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
    </svg>
  );
}

function SubmitSpinner() {
  return (
    <svg
      aria-hidden
      className="contact-submit__spinner size-[1.125rem] shrink-0 text-white sm:size-[1.25rem]"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

type ContactSubmitButtonProps = {
  submitting: boolean;
  disabled?: boolean;
  label: string;
  submittingLabel: string;
};

export function ContactSubmitButton({
  submitting,
  disabled = false,
  label,
  submittingLabel,
}: ContactSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || submitting}
      className="contact-submit group relative flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-full bg-white shadow-[0px_10px_32px_-12px_rgba(255,77,0,0.32),0px_6px_20px_-10px_rgba(0,0,0,0.28)] ring-1 ring-white/20 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0px_16px_40px_-12px_rgba(255,77,0,0.45),0px_10px_28px_-12px_rgba(0,0,0,0.35)] hover:ring-brand/35 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:scale-100"
      aria-busy={submitting}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white to-[#fafafa] opacity-100"
      />
      <span className="contact-submit__label relative min-w-0 flex-1 text-ink">
        {submitting ? submittingLabel : label}
      </span>
      <span className="contact-submit__icon relative flex shrink-0 items-center justify-center rounded-full bg-brand transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-[0px_6px_18px_-4px_rgba(255,77,0,0.55)] group-disabled:scale-100">
        {submitting ? <SubmitSpinner /> : <SubmitArrowIcon />}
      </span>
    </button>
  );
}
