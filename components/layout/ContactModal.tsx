"use client";

import { useState } from "react";
import { useContactModal } from "@/components/layout/ContactModalContext";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactModal() {
  const { isOpen, closeContactModal, context } = useContactModal();
  const [status, setStatus] = useState<SubmitState>("idle");

  if (!isOpen) return null;

  const handleClose = () => {
    closeContactModal();
    // Reset after the close animation would run, so reopening starts fresh.
    setTimeout(() => setStatus("idle"), 200);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      source: context,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/60 p-4 py-10 backdrop-blur-sm md:py-16"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-md bg-ivory shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center bg-ink text-ivory transition-colors hover:bg-brass hover:text-ink"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          <span className="plaque">Let&rsquo;s Talk</span>
          <h2 className="mt-4 font-display text-2xl font-medium text-ink">
            Book a Consultation
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/55">
            {context
              ? `Tell us a bit about ${context}, and a local specialist will follow up within one business day.`
              : "Tell us what you're looking for, and a local specialist will follow up within one business day."}
          </p>

          {status !== "success" ? (
            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-1">
              <input id="contact-name" name="name" type="text" placeholder="Full name" className="field" required />
              <input id="contact-email" name="email" type="email" placeholder="Email address" className="field" required />
              <input id="contact-phone" name="phone" type="tel" placeholder="Phone number" className="field" required />
              <textarea
                id="contact-message"
                name="message"
                placeholder="What can we help you with?"
                rows={4}
                className="field resize-none"
                required
              />

              {status === "error" && (
                <p className="mt-3 text-[13px] leading-relaxed text-red-700">
                  Something went wrong sending that — please try again, or reach us directly at{" "}
                  <a href="mailto:info@westproperties.ca" className="underline">
                    info@westproperties.ca
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary mt-7 w-full whitespace-normal disabled:opacity-50"
              >
                {status === "submitting" ? "Sending..." : "Submit Request"}
              </button>

              <p className="mt-5 text-center text-[11px] leading-relaxed text-ink/40">
                By submitting, you agree to be contacted by West Properties about your request.
              </p>
            </form>
          ) : (
            <div className="mt-8 flex flex-col items-start gap-3 border-t border-stone-line pt-6">
              <span className="plaque">Request Sent</span>
              <p className="text-[14px] leading-relaxed text-ink/65">
                Thanks — a local specialist will be in touch within one business day. (This is a design
                preview: your message was logged, not sent to a real inbox yet.)
              </p>
              <button type="button" onClick={handleClose} className="btn-outline mt-2">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
