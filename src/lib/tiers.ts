export type MotionTier = "full" | "reduced";

/**
 * Reads prefers-reduced-motion once, synchronously, for use during the first client render.
 * Server-rendered markup always assumes "full" (no window) — MotionProvider corrects this on
 * mount before any animation fires, so there's no visible flash of the wrong tier.
 */
export function getMotionTier(): MotionTier {
  if (typeof window === "undefined") return "full";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduced" : "full";
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
