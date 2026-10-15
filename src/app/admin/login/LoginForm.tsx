"use client";

import { useState, useTransition } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result && !result.success) {
        setError(result.error);
      }
    });
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="eyebrow">Password</span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="w-full border border-hair bg-transparent p-3 text-ink focus:border-ink focus:outline-none"
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="bg-ink px-6 py-3 text-sm font-bold uppercase tracking-widest text-paper transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {isPending ? "Checking..." : "Sign in"}
      </button>
    </form>
  );
}
