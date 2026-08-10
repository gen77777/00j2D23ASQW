"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Point = {
  x: number;
  y: number;
  timestamp: number;
};

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: Point[] = [];
    let animationFrameId: number;

    // Handle canvas resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Crosshair GSAP tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      // Update crosshair
      xTo(e.clientX);
      yTo(e.clientY);

      // Add point for trail
      points.push({ x: e.clientX, y: e.clientY, timestamp: performance.now() });
    };

    window.addEventListener("mousemove", moveCursor);

    // Draw trail
    const drawTrail = () => {
      const currentTime = performance.now();
      
      // Filter out points older than 1000ms
      points = points.filter((p) => currentTime - p.timestamp <= 1000);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 1;

        for (let i = 1; i < points.length; i++) {
          const point = points[i];
          const prevPoint = points[i - 1];
          const age = currentTime - point.timestamp;
          
          // Calculate opacity (1 at 0ms, 0 at 1000ms)
          const opacity = Math.max(0, 1 - age / 1000);

          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(point.x, point.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`; // Max 50% opacity for elegance
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(drawTrail);
    };

    drawTrail();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Trailing curve canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />
      
      {/* Crosshair head */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {/* Vertical line */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-px h-8 bg-white/80" />
        {/* Horizontal line */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-px bg-white/80" />
      </div>
    </>
  );
}
