"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useMotion } from "./MotionProvider";

/**
 * A ring that scales and inverts (mix-blend-mode: difference) over interactive elements, and
 * shows a contextual verb read from a `data-cursor="Verb"` attribute on the hovered element.
 * Hidden entirely on touch and under reduced motion — never the site's only affordance, since
 * every interactive element still carries its own visible focus ring and hover state.
 *
 * Sets `data-cursor="custom"` on <html> only while actually rendering, which is what drives the
 * native `cursor: none` rule in globals.css — so the OS cursor reappears automatically whenever
 * this component bails out (touch, reduced motion, or the /admin escape hatch).
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const { reducedMotion, coarsePointer } = useMotion();
  const pathname = usePathname();
  const disabled = reducedMotion || coarsePointer || pathname?.startsWith("/admin");

  useEffect(() => {
    document.documentElement.dataset.cursor = disabled ? "" : "custom";
    return () => {
      delete document.documentElement.dataset.cursor;
    };
  }, [disabled]);

  useEffect(() => {
    if (disabled) return;
    const ring = ringRef.current;
    if (!ring) return;

    gsap.set(ring, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const xTo = gsap.quickTo(ring, "x", { duration: 0.16, ease: "power3.out" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.16, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      gsap.set(ring, { autoAlpha: 1 });
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(target ? "Gen" : null);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [disabled]);

  if (disabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full border border-ink mix-blend-difference transition-[width,height] duration-200 ease-out ${
        label ? "w-20 h-20" : "w-6 h-6"
      }`}
    >
      {label && <span className="eyebrow text-ink normal-case tracking-normal">{label}</span>}
    </div>
  );
}
