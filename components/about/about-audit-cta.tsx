import { ABOUT_AUDIT_CTA } from "@/components/about/data";
// import { ABOUT_AVAILABILITY } from "@/components/about/data";

function AuditArrowIcon() {
  return (
    <svg
      aria-hidden
      className="size-[1.125rem] shrink-0 text-white transition-transform duration-300 ease-out group-hover:translate-x-[3px] sm:size-[1.375rem]"
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

// Availability pulse hidden for now — uncomment alongside the slots block below.
// function AvailabilityPulse() {
//   return (
//     <div
//       className="relative flex size-4 shrink-0 items-center justify-center"
//       data-name="green/red"
//       aria-hidden
//     >
//       <span className="about-availability-pulse-ring absolute inset-0 rounded-full bg-[#09c300]/35" />
//       <span className="about-availability-pulse-ring about-availability-pulse-ring--delayed absolute inset-0 rounded-full bg-[#09c300]/22" />
//       <span className="about-availability-pulse-core relative size-[11px] rounded-full bg-[#09c300] shadow-[0_0_10px_rgba(9,195,0,0.5)]" />
//     </div>
//   );
// }

export function AboutAuditCta() {
  return (
    <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-4">
      <div
        data-about-cta
        className="w-full max-w-[520px]"
        data-name="buttoncontainer"
      >
        <a
          href={ABOUT_AUDIT_CTA.href}
          className="about-audit-cta__link group relative flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-full bg-white shadow-[0px_10px_32px_-12px_rgba(255,77,0,0.28),0px_6px_20px_-10px_rgba(0,0,0,0.14)] ring-1 ring-black/[0.06] transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0px_16px_40px_-12px_rgba(255,77,0,0.42),0px_10px_28px_-12px_rgba(0,0,0,0.2)] hover:ring-brand/30 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
          aria-label={ABOUT_AUDIT_CTA.emailLabel}
        >
          <span className="about-audit-cta__label min-w-0 flex-1 text-ink">
            {ABOUT_AUDIT_CTA.label}
          </span>
          <span className="about-audit-cta__icon flex shrink-0 items-center justify-center rounded-full bg-brand transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-[0px_6px_18px_-4px_rgba(255,77,0,0.55)]">
            <AuditArrowIcon />
          </span>
        </a>
      </div>

      {/* Availability slots hidden for now — uncomment to re-enable.
      <div
        data-about-slots
        className="flex shrink-0 flex-col items-center"
        data-name="avaliablecontainer"
      >
        <div className="flex items-center gap-3" data-name="avaliability">
          <p className="text-[1.0625rem] font-medium leading-snug tracking-[-0.03em] text-ink-caption whitespace-nowrap">
            {ABOUT_AVAILABILITY.slotsLabel}
          </p>
          <AvailabilityPulse />
        </div>
      </div>
      */}
    </div>
  );
}
