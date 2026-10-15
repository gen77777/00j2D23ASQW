"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import gsap from "gsap";

/**
 * Thin wrapper around gsap.context() — every animation created inside `setup` is scoped to
 * `scope` (if given) and reverted automatically on cleanup, so components never leak tweens
 * or ScrollTriggers across mounts/hot-reloads.
 */
export function useGsapContext(
  setup: (context: gsap.Context) => void,
  deps: DependencyList,
  scope?: RefObject<Element | null>,
) {
  useEffect(() => {
    const ctx = gsap.context(setup, scope ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
