import type { ResumeEntry } from "@/types/content";
import SplitLines from "@/components/motion/SplitLines";

export default function WorkExperience({ entries }: { entries: ResumeEntry[] }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="experience-section editorial-section">
      <div className="section-kicker"><span>02 / EXPERIENCE</span><span>積み重ねてきたこと</span></div>
      <div className="experience-heading"><SplitLines as="h2" className="latin-heading">EXPERIENCE.</SplitLines><p id="experience-title">職務経歴</p></div>
      <ol className="experience-list">
        {entries.map((entry, index) => (
          <li key={entry.id} className="experience-entry">
            <div className="editorial-rule" data-rule />
            <div className="experience-grid">
              <div className="experience-date" data-reveal><span className="experience-year">{entry.period.slice(0, 4)}</span><p>{entry.period}</p><span className="eyebrow">{String(index + 1).padStart(2, "0")} / CAREER</span></div>
              <div>
                <h3 data-reveal>{entry.title}</h3>
                <p className="experience-role" data-reveal>{entry.subtitle}</p>
                {entry.details.length > 0 && <ul className="experience-details">{entry.details.map((detail, detailIndex) => <li data-reveal key={detailIndex}><span aria-hidden="true">↳</span><p>{detail}</p></li>)}</ul>}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
