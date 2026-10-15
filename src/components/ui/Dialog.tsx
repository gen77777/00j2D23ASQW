"use client";

import { forwardRef, useEffect, useEffectEvent, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { useMotion } from "@/components/motion/MotionProvider";

export type DialogHandle = { open: () => void; close: () => void };
type Props = { children: React.ReactNode; onClose?: () => void; labelledBy?: string; fullscreen?: boolean };

const Dialog = forwardRef<DialogHandle, Props>(function Dialog({ children, onClose, labelledBy, fullscreen = false }, ref) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const { reducedMotion } = useMotion();
  const notifyClose = useEffectEvent(() => onClose?.());
  useImperativeHandle(ref, () => ({
    open() {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      dialog.showModal();
      if (reducedMotion) return;
      timelineRef.current?.kill();
      const timeline = gsap.timeline();
      timeline.fromTo(panelRef.current, { y: fullscreen ? 60 : 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out" });
      const links = dialog.querySelectorAll("nav a");
      if (links.length) timeline.fromTo(links, { yPercent: 90, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.65, ease: "expo.out" }, 0.1);
      timelineRef.current = timeline;
    },
    close() {
      const dialog = dialogRef.current;
      if (!dialog || !dialog.open) return;
      timelineRef.current?.kill();
      if (reducedMotion) { dialog.close(); return; }
      timelineRef.current = gsap.timeline({ onComplete: () => dialog.close() }).to(panelRef.current, { opacity: 0, y: -20, duration: 0.25, ease: "power2.in" });
    },
  }));
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const click = (event: MouseEvent) => { if (event.target === dialog) dialog.close(); };
    const close = () => { timelineRef.current?.kill(); notifyClose(); };
    dialog.addEventListener("click", click); dialog.addEventListener("close", close);
    return () => { timelineRef.current?.kill(); dialog.removeEventListener("click", click); dialog.removeEventListener("close", close); };
  }, []);
  return <dialog ref={dialogRef} aria-labelledby={labelledBy} data-lenis-prevent className={fullscreen ? "editorial-dialog is-fullscreen" : "editorial-dialog"}><div ref={panelRef} className="dialog-panel">{children}</div></dialog>;
});
export default Dialog;
