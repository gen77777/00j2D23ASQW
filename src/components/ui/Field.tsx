"use client";

import { useId, useState } from "react";

type FieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "textarea";
  required?: boolean;
  validate?: (value: string) => string | null;
};

/**
 * Always a real <label htmlFor>, even when the visible copy reads as a sentence fragment (the
 * fragment is a copy/layout treatment on the label's own text, never a placeholder-as-label
 * substitute). Required fields carry a real <abbr> plus aria-required. Validates on blur, never
 * on keystroke.
 */
export default function Field({ label, name, type = "text", required = false, validate }: FieldProps) {
  const id = useId();
  const [error, setError] = useState<string | null>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!validate) return;
    setError(validate(e.target.value));
  };

  const sharedClassName =
    "min-w-[12ch] flex-1 border-b border-hair bg-transparent text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xl text-ink/60 md:text-2xl">
        <span>{label}</span>
        {type === "textarea" ? (
          <textarea
            id={id}
            name={name}
            required={required}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            onBlur={handleBlur}
            rows={2}
            className={`${sharedClassName} resize-none`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required={required}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            onBlur={handleBlur}
            className={sharedClassName}
          />
        )}
        {required && (
          <abbr title="required" aria-hidden="true" className="text-ink/40 no-underline">
            *
          </abbr>
        )}
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-ink">
          {error}
        </p>
      )}
    </div>
  );
}
