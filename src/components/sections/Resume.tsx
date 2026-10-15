import type { ContentData, ResumeEntry } from "@/types/content";
import SplitLines from "@/components/motion/SplitLines";

function Timeline({ title, entries }: { title: string; entries: ResumeEntry[] }) {
  return (
    <div className="grid gap-8 border-t border-hair py-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
      <h3 className="text-xl font-medium">{title}</h3>
      <ol className="space-y-12">
        {entries.map((entry) => (
          <li key={entry.id} data-reveal className="border-l border-hair pl-6 md:pl-8">
            <p className="eyebrow mb-3 leading-relaxed tracking-normal">{entry.period}</p>
            <h4 className="text-xl leading-relaxed md:text-2xl">{entry.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{entry.subtitle}</p>
            {entry.details.length > 0 && (
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-loose text-ink/80 md:text-base">
                {entry.details.map((detail, index) => <li key={index}>{detail}</li>)}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Resume({ data }: { data: ContentData["resume"] }) {
  return (
    <section id="profile" aria-labelledby="profile-title" className="editorial-section profile-section">
      <div className="section-kicker"><span>04 / BACKGROUND</span><span>{data.eyebrow}</span></div>
      <div className="profile-intro">
        <h2 id="profile-title" className="profile-title" data-reveal>
          {data.headline}
        </h2>
        <SplitLines as="p" className="profile-summary">{data.intro}</SplitLines>
      </div>
      <Timeline title="学歴" entries={data.education} />
      <div className="grid gap-8 border-t border-hair py-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <h3 className="text-xl font-medium">資格</h3>
        <ul className="divide-y divide-hair">
          {data.qualifications.map((qualification) => (
            <li key={qualification.id} data-reveal className="flex flex-col gap-2 py-5 first:pt-0 sm:flex-row sm:gap-8">
              <span className="eyebrow w-24 shrink-0 leading-relaxed tracking-normal">{qualification.period}</span>
              <span className="leading-relaxed">{qualification.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
