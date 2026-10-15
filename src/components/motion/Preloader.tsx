"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ label = "厳 正傑" }: { label?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try { if (sessionStorage.getItem("type-intro-shown")) return; } catch { /* Session storage is optional. */ }
    const context = gsap.context(() => {
      gsap.set(element, { display: "flex" });
      const timeline = gsap.timeline({ onComplete: () => {
        gsap.set(element, { display: "none" });
        try { sessionStorage.setItem("type-intro-shown", "1"); } catch { /* No persistent dependency. */ }
      } });
      timeline.from(".intro-name span", { yPercent: 120, rotate: 5, stagger: 0.08, duration: 0.65, ease: "expo.out" })
        .to(".intro-rule", { scaleX: 1, duration: 0.65, ease: "expo.inOut" }, 0)
        .to(element, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, 0.7);
    }, element);
    return () => context.revert();
  }, []);
  return (
    <div ref={root} className="type-intro" aria-hidden="true">
      <div className="intro-name">{Array.from(label).map((letter, index) => <span key={index}>{letter}</span>)}</div>
      <div className="intro-baseline"><span>GRAPHIC × DIGITAL</span><span>TOKYO, JP</span></div>
      <div className="intro-rule" />
    </div>
  );
}
