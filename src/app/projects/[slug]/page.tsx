import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent, getProjectBySlug } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const data = await getContent();
  return data.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — 制作実績`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}/` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, data] = await Promise.all([getProjectBySlug(slug), getContent()]);
  if (!project) notFound();

  return (
    <>
      <Header siteName={data.meta.siteName} />
      <main id="top" className="mx-auto min-h-screen max-w-6xl px-8 pb-24 pt-32 md:px-16">
        <Link href="/#projects" className="text-sm text-ink/60 underline underline-offset-4 hover:text-ink">実績一覧に戻る</Link>
        <article className="mt-12 grid gap-12 lg:grid-cols-[1fr_2fr]">
          <header>
            <p className="eyebrow mb-4 leading-relaxed">{project.category}</p>
            <h1 className="mb-8 break-words text-3xl font-medium leading-snug md:text-4xl">{project.title}</h1>
            <dl className="space-y-4 text-sm text-ink/70">
              <div>
                <dt className="mb-1 text-ink">制作年</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt className="mb-1 text-ink">担当</dt>
                <dd>{project.role}</dd>
              </div>
              {project.liveUrl && (
                <div>
                  <dt className="mb-1 text-ink">公開サイト</dt>
                  <dd><a href={project.liveUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-ink">サイトを見る</a></dd>
                </div>
              )}
            </dl>
          </header>
          <div className="max-w-2xl space-y-10">
            <p className="text-lg leading-loose text-ink/80">{project.summary}</p>
            {project.caseStudy.map((block, index) => (
              <section key={index} className="border-t border-hair pt-8">
                <h2 className="mb-4 text-xl font-medium">{block.heading}</h2>
                <p className="whitespace-pre-line leading-loose text-ink/70">{block.body}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer data={data.footer} />
    </>
  );
}
