"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { useMotion } from "@/components/motion/MotionProvider";

function AccordionItem({ title, children, index }: { title: string; children: ReactNode; index: number }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [open, setOpen] = useState(index === 0);
  const { reducedMotion } = useMotion();
  useEffect(() => () => { tweenRef.current?.kill(); }, []);
  const toggle = (event: React.MouseEvent) => {
    event.preventDefault();
    const details = detailsRef.current;
    const content = contentRef.current;
    if (!details || !content) return;
    tweenRef.current?.kill();
    const next = !open;
    setOpen(next);
    if (reducedMotion) { details.open = next; gsap.set(content, { height: "auto" }); return; }
    const height = details.open ? content.getBoundingClientRect().height : 0;
    details.open = true;
    tweenRef.current = gsap.fromTo(content, { height }, { height: next ? content.scrollHeight : 0, duration: 0.6, ease: "power3.inOut", onComplete: () => {
      details.open = next;
      gsap.set(content, { height: "auto" });
    } });
  };
  return (
    <details ref={detailsRef} open={index === 0} className={`skill-row ${open ? "is-open" : ""}`}>
      <summary onClick={toggle} data-cursor="開く"><span className="skill-number">{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><span className="skill-toggle" aria-hidden="true">+</span></summary>
      <div ref={contentRef} className="skill-panel"><div>{children}</div></div>
    </details>
  );
}
export default function Accordion({ items }: { items: { id: string; title: string; content: ReactNode }[] }) {
  return <div className="skills-list">{items.map((item, index) => <AccordionItem key={item.id} index={index} title={item.title}>{item.content}</AccordionItem>)}</div>;
}
