"use client";

import { useEffect, useState } from "react";

/** Assembles the mailto address client-side after mount so it never sits as plain text in the
 * server-rendered HTML for basic scrapers to lift. */
export default function ObfuscatedEmail({ user, domain, className }: { user: string; domain: string; className?: string }) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => setAddress(`${user}@${domain}`), [user, domain]);

  if (!address) {
    return (
      <span className={className} aria-hidden="true">
        {"···"}
      </span>
    );
  }

  return (
    <a href={`mailto:${address}`} className={className}>
      {address}
    </a>
  );
}
