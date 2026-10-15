import Link from "next/link";
import type { Project } from "@/types/content";

export default function Projects({ data }: { data: Project[] }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-24 px-8 py-[var(--section-pad)] md:px-16">
      <h2 id="projects-title" className="mb-8 text-2xl font-medium">実績</h2>
      <ul className="divide-y divide-hair border-y border-hair">
        {data.map((project) => (
          <li key={project.id} className="py-8">
            <div className="grid gap-3 md:grid-cols-[6rem_1fr] md:gap-8">
              <p className="eyebrow pt-1 leading-relaxed">{project.year}</p>
              <div>
                <h3 className="text-xl font-medium md:text-2xl">
                  <Link href={`/projects/${project.slug}`} className="underline decoration-ink/30 underline-offset-8 hover:decoration-ink">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{project.category} / {project.role}</p>
                <p className="mt-4 max-w-2xl leading-loose text-ink/80">{project.summary}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
