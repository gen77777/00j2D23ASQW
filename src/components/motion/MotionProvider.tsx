"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { MotionTier } from "@/lib/tiers";

gsap.registerPlugin(ScrollTrigger, SplitText);

const MotionContext = createContext({ tier: "reduced" as MotionTier, reducedMotion: true, coarsePointer: true });
const queries = ["(prefers-reduced-motion: reduce)", "(hover: hover) and (pointer: fine)"];
function subscribe(callback: () => void) {
  const media = queries.map((query) => window.matchMedia(query));
  media.forEach((query) => query.addEventListener("change", callback));
  return () => media.forEach((query) => query.removeEventListener("change", callback));
}
function snapshot() {
  return (window.matchMedia(queries[0]).matches ? 1 : 0) | (window.matchMedia(queries[1]).matches ? 2 : 0);
}
export function useMotion() { return useContext(MotionContext); }

export default function MotionProvider({ children }: { children: ReactNode }) {
  const preferences = useSyncExternalStore(subscribe, snapshot, () => 1);
  const pathname = usePathname();
  const reducedMotion = Boolean(preferences & 1);
  const coarsePointer = !(preferences & 2);
  const admin = pathname.startsWith("/admin");

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "reduced" : "full";
    if (reducedMotion || coarsePointer || admin) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: { offset: -88 } });
    lenis.on("scroll", ScrollTrigger.update);
    let frame = 0;
    const tick = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, [reducedMotion, coarsePointer, admin]);

  return <MotionContext.Provider value={{ tier: reducedMotion ? "reduced" : "full", reducedMotion, coarsePointer }}>{children}</MotionContext.Provider>;
}
