"use client";

import { useState } from "react";
import { useMotion } from "./MotionProvider";

type Props = { items: string[]; speed?: number; pauseOnHover?: boolean; className?: string; itemClassName?: string };
export default function Marquee({ items, speed = 60, pauseOnHover = true, className = "", itemClassName = "" }: Props) {
  const [paused, setPaused] = useState(false);
  const { reducedMotion } = useMotion();
  return (
    <div className={`type-marquee ${className} ${pauseOnHover ? "pause-on-hover" : ""}`}>
      <div className="type-marquee-track" style={{ animationDuration: `${Math.max(24, 2200 / speed)}s`, animationPlayState: paused ? "paused" : "running" }}>
        {[0, 1].map((copy) => <div key={copy} className="type-marquee-group" aria-hidden={copy === 1 || undefined}>{items.map((item, index) => <span key={index} className={itemClassName}>{item}<i aria-hidden="true">↗</i></span>)}</div>)}
      </div>
      {!reducedMotion && <button type="button" className="marquee-control" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "文字のスクロールを再開" : "文字のスクロールを停止"}</button>}
    </div>
  );
}
