import type { ContentData } from "@/types/content";
import Accordion from "@/components/ui/Accordion";
import SplitLines from "@/components/motion/SplitLines";

export default function Services({ data }: { data: ContentData["services"] }) {
  return (
    <section id="services" aria-labelledby="skills-title" className="editorial-section skills-section">
      <div className="section-kicker"><span>03 / CAPABILITIES</span><span>{data.eyebrow}</span></div>
      <div className="skills-heading"><SplitLines as="h2" className="latin-heading">TOOLS & THINKING.</SplitLines><p id="skills-title">表現をつくる技術。<br />使いやすさを考える視点。</p></div>
      <Accordion items={data.items.map((item) => ({ id: item.id, title: item.title, content: <div className="skill-content"><p>{item.description}</p><ul>{item.deliverables.map((detail) => <li key={detail}>{detail}</li>)}</ul></div> }))} />
    </section>
  );
}
