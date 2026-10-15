import { ViewTransition } from "react";

/**
 * Route navigations are React transitions in the App Router, so wrapping a page's content here
 * activates the browser's View Transitions API automatically — a default crossfade with zero
 * configuration. No-ops silently on unsupported browsers (pre-Chromium 125-ish); reduced-motion
 * users get the CSS override in globals.css's `@media (prefers-reduced-motion: reduce)` block.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return <ViewTransition enter="editorial-page" exit="editorial-page">{children}</ViewTransition>;
}
