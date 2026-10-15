"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { useMotion } from "@/components/motion/MotionProvider";
import type { ContentData } from "@/types/content";

export default function Manifest({ data }: { data: ContentData["manifest"] }) {
  const root = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();
  useGsapContext(() => {
    if (reducedMotion || !root.current) return;
    const letters = root.current.querySelectorAll(".statement-letter");
    gsap.fromTo(letters, { color: "#858585" }, { color: "#ffffff", stagger: 0.1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 72%", end: "bottom 65%", scrub: 0.5 } });
  }, [reducedMotion, data.statement], root);
  return (
    <section ref={root} id="statement" className="statement-section editorial-section">
      <p className="section-kicker" data-reveal><span>THE PRACTICE</span><span>{data.eyebrow}</span></p>
      <h2 className="statement-text" aria-label={data.statement}>
        {Array.from(data.statement).map((letter, index) => <span className="statement-letter" aria-hidden="true" key={index}>{letter}</span>)}
      </h2>
      <div className="editorial-rule" data-rule />
    </section>
  );
}
