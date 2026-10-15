"use client";

import { useRef, type ElementType } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useMotion } from "./MotionProvider";
import { useGsapContext } from "./useGsapContext";

type Props = { children: string; as?: ElementType; splitBy?: "lines" | "chars"; className?: string; stagger?: number; delay?: number; active?: boolean };

export default function SplitLines({ children, as: Tag = "div", splitBy = "lines", className, stagger = 0.08, delay = 0, active }: Props) {
  const root = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();
  useGsapContext(() => {
    if (!root.current || reducedMotion || active === false) return;
    const split = SplitText.create(root.current, {
      type: splitBy, mask: splitBy, autoSplit: true, aria: "none",
      onSplit(self) {
        return gsap.from(splitBy === "lines" ? self.lines : self.chars, {
          yPercent: 105, rotate: splitBy === "chars" ? 3 : 0,
          duration: 1.05, ease: "expo.out", stagger, delay,
          ...(active === undefined ? { scrollTrigger: { trigger: root.current, start: "top 92%", once: true } } : {}),
        });
      },
    });
    return () => split.revert();
  }, [children, reducedMotion, active, splitBy, stagger, delay], root);
  return <Tag ref={root} className={className}>{children}</Tag>;
}
