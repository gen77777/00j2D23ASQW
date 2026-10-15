"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Dialog, { type DialogHandle } from "@/components/ui/Dialog";

const LINKS = [
  { href: "/#top", label: "ホーム" },
  { href: "/#resume", label: "職務経歴・履歴書" },
  { href: "/#projects", label: "実績" },
  { href: "/contact", label: "お問い合わせ" },
];

/** Nav collapses into this full-screen overlay under 1024px — see Header.tsx for the desktop nav. */
export default function NavOverlay() {
  const dialogRef = useRef<DialogHandle>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          dialogRef.current?.open();
          setOpen(true);
        }}
        aria-label="メニューを開く"
        aria-expanded={open}
        className="eyebrow lg:hidden"
      >
        メニュー
      </button>
      <Dialog ref={dialogRef} fullscreen onClose={() => setOpen(false)} labelledBy="nav-overlay-title">
        <div className="flex items-center justify-between">
          <span id="nav-overlay-title" className="eyebrow">
            メニュー
          </span>
          <button onClick={() => dialogRef.current?.close()} aria-label="メニューを閉じる" className="eyebrow">
            閉じる
          </button>
        </div>
        <nav className="my-auto flex flex-col gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => dialogRef.current?.close()}
              className="display-heading text-4xl normal-case leading-none md:text-6xl"
            >
              {link.label}
            </Link>
          ))}
        </nav>

      </Dialog>
    </>
  );
}
