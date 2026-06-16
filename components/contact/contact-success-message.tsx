import { CONTACT_SUCCESS } from "@/components/contact/data";

function SuccessCheckIcon() {
  return (
    <svg
      aria-hidden
      className="size-[1.375rem] text-white"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}

type ContactSuccessMessageProps = {
  firstName: string;
  sentViaWebhook: boolean;
  onSendAnother: () => void;
};

export function ContactSuccessMessage({
  firstName,
  sentViaWebhook,
  onSendAnother,
}: ContactSuccessMessageProps) {
  return (
    <div
      className="contact-success"
      role="status"
      aria-live="polite"
      data-contact-success
    >
      <div className="contact-success__glow" aria-hidden />

      <div className="contact-success__badge" aria-hidden>
        <span className="contact-success__badge-ring" />
        <span className="contact-success__badge-core">
          <SuccessCheckIcon />
        </span>
      </div>

      <p className="contact-success__eyebrow type-eyebrow-inverse normal-case">
        {CONTACT_SUCCESS.eyebrow}
      </p>

      <h3 className="contact-success__headline">
        {CONTACT_SUCCESS.headline(firstName)}
      </h3>

      <p className="contact-success__body type-lead-inverse">
        {CONTACT_SUCCESS.body}
      </p>

      <p className="contact-success__reassurance">{CONTACT_SUCCESS.reassurance}</p>

      <ul className="contact-success__steps" aria-label="What happens next">
        {CONTACT_SUCCESS.steps.map((step) => (
          <li key={step} className="contact-success__step">
            <span className="contact-success__step-dot" aria-hidden />
            <span>{step}</span>
          </li>
        ))}
      </ul>

      {!sentViaWebhook ? (
        <p className="contact-success__hint">{CONTACT_SUCCESS.mailtoHint}</p>
      ) : null}

      <button
        type="button"
        onClick={onSendAnother}
        className="contact-success__again"
      >
        {CONTACT_SUCCESS.sendAnother}
      </button>
    </div>
  );
}
