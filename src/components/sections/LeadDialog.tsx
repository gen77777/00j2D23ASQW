"use client";

import { useRef } from "react";
import Dialog, { type DialogHandle } from "@/components/ui/Dialog";
import MagneticButton from "@/components/motion/MagneticButton";
import LeadForm from "./LeadForm";

export default function LeadDialog({ triggerLabel = "資料を取得する", triggerClassName }: { triggerLabel?: string; triggerClassName?: string }) {
  const dialogRef = useRef<DialogHandle>(null);
  const titleId = "lead-dialog-title";

  return (
    <>
      <MagneticButton
        onClick={() => dialogRef.current?.open()}
        className={triggerClassName}
        data-cursor="開く"
      >
        {triggerLabel}
      </MagneticButton>
      <Dialog ref={dialogRef} labelledBy={titleId}>
        <h2 id={titleId} className="eyebrow mb-8">
          プロジェクトを始める
        </h2>
        <LeadForm />
      </Dialog>
    </>
  );
}
