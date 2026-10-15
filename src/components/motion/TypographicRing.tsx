"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "./MotionProvider";
import { useGsapContext } from "./useGsapContext";

export type TypographicRingHandle = {
  /** Unspools the ring from a gathered, tilted pose into its live idle spin. See MOTION.md. */
  play: () => void;
};

type TypographicRingProps = {
  words: string[];
  /** Seconds per idle revolution. */
  duration?: number;
  radius?: number;
  /** Comma-separated px offsets, cycled per word — kept as a flat string for CMS-editing continuity. */
  offsets?: string;
  className?: string;
  /** Play the unspool entrance immediately on mount instead of waiting for an external play() call. */
  autoPlay?: boolean;
};

/**
 * The site's signature element: a CSS 3D-transform ring of words (no WebGL) that idles with a
 * slow autoplay spin, tips forward as the hero scrolls past (ScrollTrigger scrub), and tilts
 * toward the pointer via damped quickTo lerp. `play()` runs its entrance — see Preloader/Hero
 * for how that's would synchronized with the headline reveal.
 */
const TypographicRing = forwardRef<TypographicRingHandle, TypographicRingProps>(function TypographicRing(
  { words, duration = 20, radius = 280, offsets = "-160, 80, -40, 140, 0, -100, 100", className, autoPlay = true },
  ref,
) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const idleTweenRef = useRef<gsap.core.Tween | null>(null);
  const { reducedMotion, coarsePointer } = useMotion();

  const offsetList = offsets.split(",").map((s) => parseInt(s.trim(), 10) || 0);

  useImperativeHandle(ref, () => ({
    play: () => {
      const el = ringRef.current;
      if (!el || reducedMotion) return;
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.85, rotationY: -30 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.1,
          ease: "expo.out",
          onComplete: () => {
            idleTweenRef.current?.kill();
            idleTweenRef.current = gsap.to(el, {
              rotationY: "+=360",
              duration,
              repeat: -1,
              ease: "none",
            });
          },
        },
      );
    },
  }));

  useGsapContext(
    () => {
      const ring = ringRef.current;
      const tilt = tiltRef.current;
      const wrapper = wrapperRef.current;
      if (!ring || !tilt || !wrapper) return;

      if (reducedMotion) {
        gsap.set(ring, { opacity: 1, scale: 1, rotationY: 0 });
        return;
      }

      if (autoPlay) {
        gsap.set(ring, { opacity: 1 });
        idleTweenRef.current = gsap.to(ring, { rotationY: "+=360", duration, repeat: -1, ease: "none" });
      }

      const scrollTrigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self) => gsap.set(ring, { rotationX: self.progress * 18 }),
      });

      let onMove: ((e: PointerEvent) => void) | null = null;
      if (!coarsePointer) {
        const tiltXTo = gsap.quickTo(tilt, "rotationX", { duration: 0.6, ease: "power3.out" });
        const tiltZTo = gsap.quickTo(tilt, "rotationZ", { duration: 0.6, ease: "power3.out" });
        onMove = (e: PointerEvent) => {
          const rect = wrapper.getBoundingClientRect();
          const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
          const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
          tiltXTo(gsap.utils.clamp(-6, 6, -relY * 6));
          tiltZTo(gsap.utils.clamp(-6, 6, relX * 6));
        };
        window.addEventListener("pointermove", onMove);
      }

      return () => {
        scrollTrigger.kill();
        idleTweenRef.current?.kill();
        if (onMove) window.removeEventListener("pointermove", onMove);
      };
    },
    [reducedMotion, coarsePointer, autoPlay, duration],
    wrapperRef,
  );

  if (reducedMotion) {
    return (
      <ul className={className} aria-label={words.join(", ")}>
        {words.map((word, i) => (
          <li key={i} className="eyebrow py-1 normal-case tracking-normal text-ink">
            {word}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div ref={wrapperRef} className={className} style={{ perspective: "1200px" }}>
      <div
        ref={tiltRef}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%" }}
        className="flex items-center justify-center"
      >
        <div
          ref={ringRef}
          data-unspool-ring
          aria-hidden="true"
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            width: "100%",
            height: "100%",
            opacity: autoPlay ? undefined : 0,
          }}
          className="flex items-center justify-center"
        >
          {words.map((word, index) => {
            const angle = (360 / Math.max(words.length, 1)) * index;
            const yOffset = offsetList[index % offsetList.length] ?? 0;
            return (
              <span
                key={index}
                className="absolute whitespace-nowrap text-lg uppercase tracking-[0.1em] text-ink/80 md:text-xl"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yOffset}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
      <span className="sr-only">{words.join(", ")}</span>
    </div>
  );
});

export default TypographicRing;
