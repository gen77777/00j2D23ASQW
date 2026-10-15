"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useMotion } from "./MotionProvider";
import { useGsapContext } from "./useGsapContext";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** Max displacement in px. Clamped to 8 per the brief's micro-interaction budget. */
  strength?: number;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  "data-cursor"?: string;
};

/** Translates toward the pointer with quickTo, springs back on leave. Disabled on touch/reduced-motion. */
export default function MagneticButton({
  children,
  className,
  strength = 8,
  href,
  onClick,
  type = "button",
  disabled,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const { reducedMotion, coarsePointer } = useMotion();
  const cap = Math.min(strength, 8);

  useGsapContext(
    () => {
      const el = ref.current;
      if (!el || reducedMotion || coarsePointer) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(gsap.utils.clamp(-cap, cap, relX * 0.4));
        yTo(gsap.utils.clamp(-cap, cap, relY * 0.4));
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    [reducedMotion, coarsePointer, cap],
    ref,
  );

  if (href) {
    return (
      <a ref={ref} href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref} type={type} disabled={disabled} className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
