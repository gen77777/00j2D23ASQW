import type { ContentData } from "@/types/content";
import SplitLines from "@/components/motion/SplitLines";
import MagneticButton from "@/components/motion/MagneticButton";

export default function CoreVision({ data }: { data: ContentData["coreVision"] }) {
  return (
    <section className="editorial-section vision-section">
      <div className="section-kicker"><span>05 / WHAT COMES NEXT</span><span>{data.eyebrow}</span></div>
      <span className="vision-arrow" aria-hidden="true" data-reveal>↗</span>
      <SplitLines as="h2" className="vision-title">{data.headline}</SplitLines>
      <div className="vision-bottom"><p data-reveal>{data.body}</p><MagneticButton href="/contact/" className="round-link" data-cursor="話す">話しましょう<span aria-hidden="true">↗</span></MagneticButton></div>
    </section>
  );
}
