"use client";

import { useState } from "react";
import { saveContent } from "../actions";
import type { ContentData, Project } from "@/types/content";
import ResumeEditor from "./ResumeEditor";

// --- shared UI primitives ---------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12 bg-[#1b1b1b] border border-white/10 p-6 md:p-8 rounded-lg shadow-xl">
    <h2 className="text-xl font-bold tracking-widest uppercase mb-6 text-white/90 border-b border-white/10 pb-4">
      {title}
    </h2>
    <div className="flex flex-col gap-6">{children}</div>
  </section>
);

const InputField = ({
  label,
  value,
  onChange,
  isTextarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  isTextarea?: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs tracking-widest uppercase text-gray-400 font-semibold">{label}</label>
    {isTextarea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#131313] border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white/60 transition-colors h-24 resize-y"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#131313] border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white/60 transition-colors"
      />
    )}
  </div>
);

const StringListEditor = ({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
}) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <label className="text-xs tracking-widest uppercase text-gray-400 font-semibold">{label}</label>
      <button
        onClick={() => onChange([...values, "NEW"])}
        className="text-xs border border-white/20 px-3 py-1 hover:bg-white/10 transition-colors"
      >
        + ADD
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {values.map((v, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={v}
            onChange={(e) => {
              const next = [...values];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="w-full bg-[#131313] border border-white/20 p-2 text-sm text-white focus:outline-none focus:border-white/60"
          />
          <button
            onClick={() => {
              const next = [...values];
              next.splice(i, 1);
              onChange(next);
            }}
            className="bg-red-500/20 text-red-400 px-3 hover:bg-red-500/40 transition-colors"
          >
            X
          </button>
        </div>
      ))}
    </div>
  </div>
);


export default function AdminClient({ initialContent }: { initialContent: string }) {
  const [data, setData] = useState<ContentData>(JSON.parse(initialContent));
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = async () => {
    setStatus("saving");
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const result = await saveContent(jsonString);
      if (result.success) {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Unknown error");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to save: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  // --- generic helpers -------------------------------------------------

  function updateNested<K extends keyof ContentData, F extends keyof ContentData[K]>(
    section: K,
    field: F,
    value: ContentData[K][F],
  ) {
    setData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  }

  const handleProjectChange = <F extends keyof Project>(index: number, field: F, value: Project[F]) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setData((prev) => ({ ...prev, projects: newProjects }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: String(Date.now()),
      slug: `project-${Date.now()}`,
      title: "New project",
      category: "CATEGORY . TYPE",
      year: String(new Date().getFullYear()),
      role: "Design & development",
      summary: "",
      coverImage: {
        src: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
        alt: "",
        width: 800,
        height: 600,
      },
      caseStudy: [{ heading: "Overview", body: "" }],
      mediaType: "image",
      featured: false,
    };
    setData((prev) => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  const removeProject = (index: number) => {
    const newProjects = [...data.projects];
    newProjects.splice(index, 1);
    setData((prev) => ({ ...prev, projects: newProjects }));
  };


  return (
    <div className="flex flex-col gap-8 pb-32">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#0e0e0e]/90 backdrop-blur-md py-6 flex justify-between items-center border-b border-white/10 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-widest uppercase">Content Dashboard</h1>
          <p className="text-gray-400 text-xs tracking-widest mt-1">VISUAL UI EDITOR</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-sm tracking-widest uppercase text-gray-400 hover:text-white transition-colors mr-4">
            View Live →
          </a>
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50 min-w-[160px]"
          >
            {status === "saving" ? "SAVING..." : status === "success" ? "SAVED!" : "SAVE CHANGES"}
          </button>
        </div>
      </div>

      {status === "error" && (
        <div className="bg-red-500/20 text-red-400 p-4 border border-red-500/50 rounded-md">{errorMsg}</div>
      )}

      <Section title="Site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Site name" value={data.meta.siteName} onChange={(v) => updateNested("meta", "siteName", v)} />
          <InputField label="URL" value={data.meta.url} onChange={(v) => updateNested("meta", "url", v)} />
        </div>
        <InputField label="Tagline" value={data.meta.tagline} onChange={(v) => updateNested("meta", "tagline", v)} />
      </Section>

      <Section title="Hero">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Name (top left)" value={data.hero.name} onChange={(v) => updateNested("hero", "name", v)} />
          <InputField label="Role (top left)" value={data.hero.role} onChange={(v) => updateNested("hero", "role", v)} />
        </div>
        <InputField
          label="English main title"
          value={data.hero.englishTitle}
          onChange={(v) => updateNested("hero", "englishTitle", v)}
          isTextarea
        />
        <InputField
          label="Japanese subtitle"
          value={data.hero.japaneseTitle}
          onChange={(v) => updateNested("hero", "japaneseTitle", v)}
        />
        <StringListEditor
          label="制作領域（テキスト）"
          values={data.hero.services}
          onChange={(v) => updateNested("hero", "services", v)}
        />
        <StringListEditor
          label="右側の回転テキスト（開発・デザイン）"
          values={data.hero.ringWords ?? data.hero.services}
          onChange={(v) => updateNested("hero", "ringWords", v)}
        />
        <InputField
          label="1回転の秒数（10秒以上）"
          value={String(data.hero.ring.duration)}
          onChange={(v) => updateNested("hero", "ring", { ...data.hero.ring, duration: Math.max(10, Number(v) || 28) })}
        />
      </Section>

      <Section title="Manifest">
        <InputField label="Eyebrow" value={data.manifest.eyebrow} onChange={(v) => updateNested("manifest", "eyebrow", v)} />
        <InputField
          label="Statement"
          value={data.manifest.statement}
          onChange={(v) => updateNested("manifest", "statement", v)}
          isTextarea
        />
      </Section>

      <Section title="Approach">
        <InputField label="Eyebrow" value={data.approach.eyebrow} onChange={(v) => updateNested("approach", "eyebrow", v)} />
        <InputField label="Intro" value={data.approach.intro} onChange={(v) => updateNested("approach", "intro", v)} isTextarea />
        <div className="flex flex-col gap-6">
          {data.approach.capabilities.map((cap, i) => (
            <div key={cap.id} className="bg-[#131313] border border-white/10 p-6">
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-500">{cap.id}</h3>
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="Title"
                  value={cap.title}
                  onChange={(v) => {
                    const next = [...data.approach.capabilities];
                    next[i] = { ...next[i], title: v };
                    updateNested("approach", "capabilities", next);
                  }}
                />
                <InputField
                  label="Description"
                  value={cap.description}
                  isTextarea
                  onChange={(v) => {
                    const next = [...data.approach.capabilities];
                    next[i] = { ...next[i], description: v };
                    updateNested("approach", "capabilities", next);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Services">
        <InputField label="Eyebrow" value={data.services.eyebrow} onChange={(v) => updateNested("services", "eyebrow", v)} />
        <div className="flex justify-end">
          <button
            onClick={() =>
              updateNested("services", "items", [
                ...data.services.items,
                { id: `service-${Date.now()}`, title: "New service", description: "", deliverables: [] },
              ])
            }
            className="text-xs border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors"
          >
            + ADD SERVICE
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {data.services.items.map((item, i) => (
            <div key={item.id} className="bg-[#131313] border border-white/10 p-6 relative group">
              <button
                onClick={() => {
                  const next = [...data.services.items];
                  next.splice(i, 1);
                  updateNested("services", "items", next);
                }}
                className="absolute top-4 right-4 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest hover:text-red-300"
              >
                Delete
              </button>
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="Title"
                  value={item.title}
                  onChange={(v) => {
                    const next = [...data.services.items];
                    next[i] = { ...next[i], title: v };
                    updateNested("services", "items", next);
                  }}
                />
                <InputField
                  label="Description"
                  value={item.description}
                  isTextarea
                  onChange={(v) => {
                    const next = [...data.services.items];
                    next[i] = { ...next[i], description: v };
                    updateNested("services", "items", next);
                  }}
                />
                <StringListEditor
                  label="Deliverables"
                  values={item.deliverables}
                  onChange={(v) => {
                    const next = [...data.services.items];
                    next[i] = { ...next[i], deliverables: v };
                    updateNested("services", "items", next);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Projects">
        <div className="flex justify-end mb-4">
          <button onClick={addProject} className="text-xs border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors">
            + ADD NEW PROJECT
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {data.projects.map((project, index) => (
            <div key={project.id} className="bg-[#131313] border border-white/10 p-6 relative group">
              <button
                onClick={() => removeProject(index)}
                className="absolute top-4 right-4 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest hover:text-red-300"
              >
                Delete Project
              </button>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-500">Project #{index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Title" value={project.title} onChange={(v) => handleProjectChange(index, "title", v)} />
                <InputField label="Slug (URL)" value={project.slug} onChange={(v) => handleProjectChange(index, "slug", v)} />
                <InputField label="Category tags" value={project.category} onChange={(v) => handleProjectChange(index, "category", v)} />
                <InputField label="Year" value={project.year} onChange={(v) => handleProjectChange(index, "year", v)} />
                <InputField label="Role" value={project.role} onChange={(v) => handleProjectChange(index, "role", v)} />
                <InputField label="Live URL" value={project.liveUrl ?? ""} onChange={(v) => handleProjectChange(index, "liveUrl", v)} />
                <div className="md:col-span-2">
                  <InputField label="Summary" value={project.summary} isTextarea onChange={(v) => handleProjectChange(index, "summary", v)} />
                </div>

              </div>
            </div>
          ))}
        </div>
      </Section>

      <ResumeEditor data={data.resume} onChange={(resume) => setData((prev) => ({ ...prev, resume }))} />

      <Section title="Practice">
        <InputField label="Eyebrow" value={data.practice.eyebrow} onChange={(v) => updateNested("practice", "eyebrow", v)} />
        <InputField
          label="Statement"
          value={data.practice.statement}
          isTextarea
          onChange={(v) => updateNested("practice", "statement", v)}
        />
        <InputField label="Based in" value={data.practice.basedIn} onChange={(v) => updateNested("practice", "basedIn", v)} />
        <StringListEditor
          label="関心のある分野（テキスト）"
          values={data.practice.disciplines}
          onChange={(v) => updateNested("practice", "disciplines", v)}
        />
      </Section>

      <Section title="Core vision">
        <InputField label="Eyebrow" value={data.coreVision.eyebrow} onChange={(v) => updateNested("coreVision", "eyebrow", v)} />
        <InputField label="Headline" value={data.coreVision.headline} onChange={(v) => updateNested("coreVision", "headline", v)} />
        <InputField label="Body" value={data.coreVision.body} isTextarea onChange={(v) => updateNested("coreVision", "body", v)} />
      </Section>

      <Section title="Contact">
        <InputField label="Eyebrow" value={data.contact.eyebrow} onChange={(v) => updateNested("contact", "eyebrow", v)} />
        <InputField label="Headline" value={data.contact.headline} onChange={(v) => updateNested("contact", "headline", v)} />
      </Section>

      <Section title="Footer">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Copyright name"
            value={data.footer.copyrightName}
            onChange={(v) => updateNested("footer", "copyrightName", v)}
          />
          <InputField label="Email" value={data.footer.email} onChange={(v) => updateNested("footer", "email", v)} />
          <InputField label="Location" value={data.footer.location} onChange={(v) => updateNested("footer", "location", v)} />
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-xs tracking-widest uppercase text-gray-400 font-semibold">Socials</label>
            <button
              onClick={() => updateNested("footer", "socials", [...data.footer.socials, { label: "New", url: "" }])}
              className="text-xs border border-white/20 px-3 py-1 hover:bg-white/10 transition-colors"
            >
              + ADD
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {data.footer.socials.map((social, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Label"
                  value={social.label}
                  onChange={(e) => {
                    const next = [...data.footer.socials];
                    next[i] = { ...next[i], label: e.target.value };
                    updateNested("footer", "socials", next);
                  }}
                  className="w-40 bg-[#131313] border border-white/20 p-2 text-sm text-white focus:outline-none focus:border-white/60"
                />
                <input
                  type="text"
                  placeholder="URL"
                  value={social.url}
                  onChange={(e) => {
                    const next = [...data.footer.socials];
                    next[i] = { ...next[i], url: e.target.value };
                    updateNested("footer", "socials", next);
                  }}
                  className="flex-1 bg-[#131313] border border-white/20 p-2 text-sm text-white focus:outline-none focus:border-white/60"
                />
                <button
                  onClick={() => {
                    const next = [...data.footer.socials];
                    next.splice(i, 1);
                    updateNested("footer", "socials", next);
                  }}
                  className="bg-red-500/20 text-red-400 px-3 hover:bg-red-500/40 transition-colors"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
