import type { ContentData } from "@/types/content";
import Marquee from "@/components/motion/Marquee";

export default function Practice({ data }: { data: ContentData["practice"] }) {
  return (
    <section className="practice-section">
      <div className="editorial-section practice-copy"><p className="eyebrow">{data.eyebrow}</p><h2 data-reveal>{data.statement}</h2></div>
      <Marquee items={data.disciplines} speed={50} />
    </section>
  );
}
