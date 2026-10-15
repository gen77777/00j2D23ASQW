"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import NavOverlay from "@/components/NavOverlay";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { useMotion } from "@/components/motion/MotionProvider";

const links = [
  { href: "/#top", label: "ホーム", en: "HOME" },
  { href: "/#resume", label: "経歴・資格", en: "RESUME" },
  { href: "/#projects", label: "実績", en: "PORTFOLIO" },
];

export default function Header({ siteName }: { siteName: string }) {
  const root = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();
  useGsapContext(() => {
    if (reducedMotion) return;
    gsap.fromTo(".reading-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });
  }, [reducedMotion], root);
  return (
    <header ref={root} className="site-header">
      <Link href="/" className="site-signature" aria-label={`${siteName} ホーム`} data-cursor="戻る">
        <span>{siteName}<small>GRAPHIC × DIGITAL</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="メインナビゲーション">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="nav-roll" data-cursor="見る">
            <span>{link.label}</span>
            <span aria-hidden="true">{link.en}</span>
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <Link
          href="/contact/"
          className="header-contact-btn hidden sm:inline-flex"
          data-cursor="話す"
        >
          CONTACT
        </Link>
        <NavOverlay />
      </div>
      <span className="reading-progress" aria-hidden="true" />
    </header>
  );
}
