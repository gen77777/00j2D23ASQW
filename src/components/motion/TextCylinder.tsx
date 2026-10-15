"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { useMotion } from "./MotionProvider";
import { useGsapContext } from "./useGsapContext";

export default function TextCylinder({ words, duration = 28, radius = 280 }: { words: string[]; duration?: number; radius?: number }) {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLElement>(null);
  const { reducedMotion, coarsePointer } = useMotion();
  const columns = 6;
  const rows = Math.ceil(words.length / columns);
  const rowSpacing = rows > 1 ? 320 / (rows - 1) : 0;
  const height = 440;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useGsapContext(() => {
    const element = root.current;
    if (!element || reducedMotion) return;
    const tilt = element.querySelector(".word-cylinder__tilt");
    gsap.from(element, { opacity: 0, y: 32, duration: 1.4, delay: 0.45, ease: "expo.out" });
    gsap.to(element.querySelector(".word-cylinder__scene"), { y: -30, ease: "none", scrollTrigger: { trigger: element, start: "top top", end: "bottom top", scrub: 0.7 } });
    if (coarsePointer || !tilt) return;
    gsap.set(tilt, { rotationX: -8, rotationZ: -4 });
    const xTo = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3.out" });
    const zTo = gsap.quickTo(tilt, "rotationZ", { duration: 0.8, ease: "power3.out" });
    const move = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      xTo(-8 + ((event.clientY - box.top) / box.height - 0.5) * 10);
      zTo(-4 + ((event.clientX - box.left) / box.width - 0.5) * 8);
    };
    const leave = () => { xTo(-8); zTo(-4); };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    return () => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); };
  }, [reducedMotion, coarsePointer], root);

  return (
    <figure ref={root} className="word-cylinder min-w-0" style={{ "--cylinder-design-radius": `${radius}px` } as CSSProperties} aria-label="開発とデザインのキーワード">
      <div className="word-cylinder__scene" aria-hidden="true" style={{ height }}>
        <div className="word-cylinder__tilt">
          <div
            className="word-cylinder__rotor"
            style={{
              animationDuration: `${Math.max(10, duration)}s`,
              animationPlayState: paused || !visible || reducedMotion ? "paused" : "running",
            }}
          >
            {words.map((word, index) => {
              const row = Math.floor(index / columns);
              return (
                <span
                  key={`${word}-${index}`}
                  className="word-cylinder__word"
                  style={{
                    "--word-angle": `${(index % columns) * 60 + row * 20}deg`,
                    "--word-height": `${(row - (rows - 1) / 2) * rowSpacing}px`,
                  } as CSSProperties}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <ul className="word-cylinder__words">
        {words.map((word, index) => <li key={`${word}-${index}`}>{word}</li>)}
      </ul>
      <figcaption className="word-cylinder__controls mt-3 flex items-center justify-between gap-4 text-xs text-ink/60">
        <span>DEVELOPMENT / DESIGN</span>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="px-2 py-3 underline underline-offset-4 hover:text-ink">
          {paused ? "回転を再開" : "回転を停止"}
        </button>
      </figcaption>
    </figure>
  );
}
