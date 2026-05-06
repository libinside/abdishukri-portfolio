"use client";

import { FormEvent, useState } from "react";

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const replyTo = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${replyTo}`, "", message].join("\n"),
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setStatus("Your email app should open with the message ready to send.");
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/65">
        Name
        <input
          required
          name="name"
          className="border border-charcoal/20 bg-ivory px-4 py-4 text-base font-normal normal-case tracking-normal text-charcoal outline-none transition focus:border-charcoal"
          autoComplete="name"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/65">
        Email
        <input
          required
          type="email"
          name="email"
          className="border border-charcoal/20 bg-ivory px-4 py-4 text-base font-normal normal-case tracking-normal text-charcoal outline-none transition focus:border-charcoal"
          autoComplete="email"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/65">
        Message
        <textarea
          required
          name="message"
          rows={6}
          className="resize-y border border-charcoal/20 bg-ivory px-4 py-4 text-base font-normal normal-case tracking-normal text-charcoal outline-none transition focus:border-charcoal"
        />
      </label>
      <button
        type="submit"
        className="w-full bg-charcoal px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-ivory transition hover:opacity-80 sm:w-fit"
      >
        Send Inquiry
      </button>
      {status ? <p className="text-sm text-charcoal/65">{status}</p> : null}
    </form>
  );
}
