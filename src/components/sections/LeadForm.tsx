"use client";

import { useState, useTransition } from "react";
import { submitLead } from "@/app/contact/actions";
import Field from "@/components/ui/Field";
import MagneticButton from "@/components/motion/MagneticButton";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Three fields written as first-person sentence fragments — the copy is the label (see
 * ui/Field). Success is a state swap in place, not a redirect, so it works identically whether
 * this form is standalone (/contact) or inside the lead-capture dialog.
 */
export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await submitLead(formData);
      if (result.success) {
        setStatus("success");
      } else {
        setError(result.error);
      }
    });
  };

  if (status === "success") {
    return (
      <div className="flex flex-col gap-4">
        <p className="display-heading text-4xl normal-case md:text-5xl">送信完了。</p>
        <p className="text-ink/60">1日以内にご返信します。</p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-10">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <Field label="私の名前は" name="name" required />
      <Field
        label="メールアドレスは"
        name="email"
        type="email"
        required
        validate={(v) => (EMAIL_RE.test(v) ? null : "正しいメールアドレスを入力してください。")}
      />
      <Field label="構築中のものは" name="message" type="textarea" required />
      {error && (
        <p role="alert" className="text-sm text-ink">
          {error}
        </p>
      )}
      <MagneticButton
        type="submit"
        disabled={isPending}
        className="self-start bg-ink px-8 py-4 text-sm font-bold uppercase tracking-widest text-paper transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {isPending ? "送信中..." : "送信"}
      </MagneticButton>
    </form>
  );
}
