"use client";

import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { useMotion } from "@/components/motion/MotionProvider";
import type { ContentData } from "@/types/content";

export default function Approach({ data }: { data: ContentData["approach"] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { reducedMotion } = useMotion();
  useGsapContext(() => {
    if (reducedMotion || !root.current) return;
    root.current.querySelectorAll<HTMLElement>(".method-row").forEach((row, index) => {
      ScrollTrigger.create({ trigger: row, start: "top 65%", end: "bottom 35%", onEnter: () => setActive(index), onEnterBack: () => setActive(index) });
    });
  }, [reducedMotion, data.capabilities.length], root);
  return (
    <section ref={root} id="approach" className="editorial-section method-section">
      <div className="section-kicker"><span>01 / APPROACH</span><span>{data.eyebrow}</span></div>
      <div className="method-grid">
        <div className="method-sticky">
          <h2 className="latin-heading" data-reveal>THINK.<br />MAKE.<br /><span className="outline-type">REFINE.</span></h2>
          <p className="method-intro">{data.intro}</p>
          <div className="method-counter" aria-hidden="true"><span key={active}>{String(active + 1).padStart(2, "0")}</span><small>/ {String(data.capabilities.length).padStart(2, "0")}</small></div>
        </div>
        <div className="method-rows">
          {data.capabilities.map((cap, index) => (
            <article key={cap.id} className={`method-row ${active === index ? "is-active" : ""}`}>
              <div className="editorial-rule" data-rule />
              <span className="eyebrow method-index">({String(index + 1).padStart(2, "0")})</span>
              <h3 data-reveal>{cap.title}</h3>
              <p data-reveal>{cap.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
