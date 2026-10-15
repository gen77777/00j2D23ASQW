"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ContentData } from "@/types/content";
import Preloader from "@/components/motion/Preloader";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { useMotion } from "@/components/motion/MotionProvider";

export default function Hero({ data }: { data: ContentData["hero"] }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-portrait-image",
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "expo.out" }
      );
      gsap.fromTo(
        ".hero-flank-tag",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".hero-giant-name",
        { opacity: 0, yPercent: 40 },
        { opacity: 1, yPercent: 0, duration: 1.2, ease: "expo.out", delay: 0.4 }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative w-full h-screen min-h-[680px] flex flex-col justify-between overflow-hidden bg-[#000000] text-white pt-24 pb-6 px-6 md:px-12 select-none"
    >
      {/* Center Section: Large Portrait + Flanking Tags (100% Kaely Liora reference composition) */}
      <div className="relative z-10 my-auto w-full flex items-center justify-between">
        {/* Left Subtitle Tags */}
        <div className="hidden lg:flex flex-1 justify-around items-center text-xs font-mono tracking-[0.25em] text-white/70 uppercase">
          <span className="hero-flank-tag hover:text-white transition-colors duration-300">
            UI / UX DESIGNER
          </span>
          <span className="hero-flank-tag hover:text-white transition-colors duration-300">
            BRAND DESIGNER
          </span>
        </div>

        {/* Central Portrait: Large vertical focal portrait matching reference */}
        <div className="hero-portrait-image relative mx-auto w-[min(580px,86vw)] h-[58vh] md:h-[64vh] flex items-center justify-center">
          <Image
            src="/images/hero-focal-portrait.jpg"
            alt={data.name}
            fill
            priority
            className="object-contain object-center"
            sizes="(max-width: 768px) 86vw, 580px"
          />
          {/* Bottom vignette blending silhouette smoothly into the giant text below */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#000000] via-[#000000]/70 to-transparent pointer-events-none" />
        </div>

        {/* Right Subtitle Tags */}
        <div className="hidden lg:flex flex-1 justify-around items-center text-xs font-mono tracking-[0.25em] text-white/70 uppercase">
          <span className="hero-flank-tag hover:text-white transition-colors duration-300">
            WEB & APP DEV
          </span>
          <span className="hero-flank-tag hover:text-white transition-colors duration-300">
            TOKYO, JAPAN
          </span>
        </div>
      </div>

      {/* Mobile Subtitle Tags (responsive) */}
      <div className="flex lg:hidden justify-between items-center text-[10px] font-mono tracking-widest text-white/70 uppercase my-2 px-2 z-10">
        <span>UI/UX & BRAND</span>
        <span>WEB & APP / TOKYO</span>
      </div>

      {/* Bottom Section: Giant Display Name spanning the screen (Exactly matching Kaely Liora) */}
      <div className="relative z-20 w-full">
        <div className="overflow-hidden">
          <h1 className="hero-giant-name w-full font-display font-medium text-white tracking-[-0.04em] leading-[0.82] text-[clamp(4.2rem,15vw,15.5rem)] text-left">
            Gen Shouketsu
          </h1>
        </div>
      </div>
    </section>
  );
}
