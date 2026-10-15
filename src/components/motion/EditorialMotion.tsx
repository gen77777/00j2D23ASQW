"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "./useGsapContext";
import { useMotion } from "./MotionProvider";

export default function EditorialMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();
  useGsapContext(() => {
    if (reducedMotion || !root.current) return;
    const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]", root.current);
    elements.forEach((element) => {
      gsap.from(element, {
        y: 36, opacity: 0, duration: 0.95, ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 94%", once: true },
      });
    });
    gsap.utils.toArray<HTMLElement>("[data-rule]", root.current).forEach((element) => {
      gsap.from(element, { scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: element, start: "top 95%", once: true } });
    });
    let cancelled = false;
    document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
    return () => { cancelled = true; };
  }, [reducedMotion], root);
  return <div ref={root}>{children}</div>;
}
