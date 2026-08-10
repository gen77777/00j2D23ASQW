"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { ContentData } from "@/types/content";

export default function Hero({ data }: { data: ContentData["hero"] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro fade-in for left side content
      gsap.fromTo(
        leftRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );

      // Staggered intro for right side service words
      const words = rightRef.current?.querySelectorAll(".service-word");
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0 },
          { opacity: 1, duration: 2, stagger: 0.15, ease: "power4.out", delay: 0.3 }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Simple split function for English title to insert <br/> dynamically or just render
  return (
    <section ref={containerRef} className="h-screen relative flex flex-col md:flex-row">
      {/* Left side: Statement */}
      <div ref={leftRef} className="md:w-1/2 vertical-line flex flex-col justify-center px-12 md:px-24 pt-32 pb-24 relative">
        <h1 className="text-2xl md:text-4xl font-normal leading-tight tracking-wide mb-8 uppercase max-w-4xl">
          {data.englishTitle}
        </h1>
        <h2 className="text-xl md:text-2xl font-normal leading-tight tracking-wide text-right mt-12 md:mt-24 uppercase">
          {data.japaneseTitle}
        </h2>

        {/* Bottom left label */}
        <div className="absolute bottom-12 left-12 flex flex-col">
          <span className="text-[10px] md:text-xs tracking-[0.1em] text-gray-500 mb-2 uppercase">{data.name}</span>
          <span className="flex items-center gap-2 text-[10px] md:text-xs tracking-[0.1em] uppercase">
            <span className="w-1 h-1 bg-white rounded-full" />
            {data.role}
            <span className="w-1 h-1 bg-white rounded-full" />
          </span>
        </div>
      </div>

      {/* Right side: Skills 3D Cylinder */}
      <div 
        ref={rightRef} 
        className="md:w-1/2 flex flex-col relative justify-center items-center py-24 min-h-[50vh]"
        style={{ perspective: "1000px" }}
      >
        <div 
          className="relative w-full h-full flex justify-center items-center"
          style={{ transformStyle: "preserve-3d" }}
          ref={(el) => {
            if (el) {
              // Ensure old animation is killed before applying new one to prevent conflicts on hot reload
              gsap.killTweensOf(el);
              gsap.to(el, {
                rotationY: 360,
                duration: data.settings3d?.duration || 20,
                repeat: -1,
                ease: "none"
              });
            }
          }}
        >
          {data.services.map((service, index) => {
            const angle = (360 / Math.max(data.services.length, 1)) * index;
            const radius = data.settings3d?.radius || 280;
            
            const offsetsStr = data.settings3d?.offsets || "-160, 80, -40, 140, 0, -100, 100";
            const offsets = offsetsStr.split(",").map(s => parseInt(s.trim()));
            const yOffset = offsets[index % offsets.length] || 0;
            
            return (
              <div 
                key={index} 
                className="service-word absolute text-lg md:text-xl tracking-[0.1em] uppercase whitespace-nowrap text-white/80"
                style={{ 
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yOffset}px)`
                }}
              >
                {service}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
