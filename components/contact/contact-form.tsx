"use client";

import {
  CONTACT_DEMO_SUCCESS,
  CONTACT_SUBMIT_LABEL,
  CONTACT_SUBMITTING_LABEL,
  CONTACT_SUPPORT_EMAIL,
  getContactFirstName,
  INITIAL_CONTACT_FORM,
  isValidContactEmail,
  type ContactFormState,
  type ContactSubmitStatus,
} from "@/components/contact/data";
import { ContactSubmitButton } from "@/components/contact/contact-submit-button";
import { ContactSuccessMessage } from "@/components/contact/contact-success-message";
import { FormEvent, useState } from "react";

const FIELD_CLASS =
  "contact-field type-lead-inverse w-full appearance-none rounded-none border-0 border-b border-white/20 bg-transparent pb-4 pt-2 text-[clamp(1.125rem,1.6vw,1.375rem)] text-white shadow-none ring-0 placeholder:text-white/45 outline-none transition-colors duration-200 focus:border-white/45 focus:placeholder:text-white/35";

const DEMO_SUBMIT_DELAY_MS = 1200;

function openMailDraft(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`New enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  );
  window.location.href = `mailto:${CONTACT_SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

type ContactFormProps = {
  className?: string;
};

export function ContactForm({ className = "" }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormState>(INITIAL_CONTACT_FORM);
  const [status, setStatus] = useState<ContactSubmitStatus>("idle");
  const [error, setError] = useState("");
  const [sentViaWebhook, setSentViaWebhook] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setStatus("idle");
    setError("");
    setSentViaWebhook(false);
    setSubmittedName("");
    setForm(INITIAL_CONTACT_FORM);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setError("Please fill all the fields before submitting.");
      return;
    }

    if (!isValidContactEmail(email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setStatus("submitting");
      setSubmittedName(name);

      if (CONTACT_DEMO_SUCCESS) {
        await wait(DEMO_SUBMIT_DELAY_MS);
        setSentViaWebhook(true);
        setStatus("success");
        setForm(INITIAL_CONTACT_FORM);
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        delivered?: boolean;
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setError(payload.error ?? "Something went wrong. Please try again.");
        return;
      }

      const delivered = Boolean(payload.delivered);
      setSentViaWebhook(delivered);

      if (!delivered) {
        openMailDraft(name, email, message);
      }

      setStatus("success");
      setForm(INITIAL_CONTACT_FORM);
    } catch {
      setStatus("error");
      setError("Could not send your message. Please email us directly.");
    }
  };

  if (status === "success") {
    return (
      <ContactSuccessMessage
        firstName={getContactFirstName(submittedName)}
        sentViaWebhook={sentViaWebhook}
        onSendAnother={resetForm}
      />
    );
  }

  return (
    <form
      data-contact-form
      data-contact-animate
      className={`flex w-full min-w-0 flex-col gap-[clamp(28px,3vw,40px)] ${className}`.trim()}
      onSubmit={onSubmit}
    >
      <label className="flex w-full flex-col gap-2.5">
        <span className="type-body-md text-[clamp(1.0625rem,1.4vw,1.25rem)] text-white">
          Your Name
        </span>
        <input
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          className={FIELD_CLASS}
          placeholder="Enter your Name"
          autoComplete="name"
          name="name"
          required
        />
      </label>

      <label className="flex w-full flex-col gap-2.5">
        <span className="type-body-md text-[clamp(1.0625rem,1.4vw,1.25rem)] text-white">
          Your Email
        </span>
        <input
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          className={FIELD_CLASS}
          placeholder="Enter the Email"
          autoComplete="email"
          name="email"
          required
        />
      </label>

      <label className="flex w-full flex-col gap-2.5">
        <span className="type-body-md text-[clamp(1.0625rem,1.4vw,1.25rem)] text-white">
          Project Description
        </span>
        <textarea
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className={`${FIELD_CLASS} min-h-[120px] resize-y leading-[1.45]`}
          placeholder="Type Here..."
          name="message"
          required
        />
      </label>

      <div className="flex w-full flex-col gap-4 pt-2">
        <ContactSubmitButton
          submitting={status === "submitting"}
          label={CONTACT_SUBMIT_LABEL}
          submittingLabel={CONTACT_SUBMITTING_LABEL}
        />

        {status === "error" && error ? (
          <p className="type-body text-[0.9375rem] text-[#ffb4a8]" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
