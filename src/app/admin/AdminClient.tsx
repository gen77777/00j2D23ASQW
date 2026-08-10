"use client";

import { useState, useRef } from "react";
import { saveContent, uploadImage } from "../actions";
import type { ContentData, Project } from "@/types/content";

export default function AdminClient({ initialContent }: { initialContent: string }) {
  const [data, setData] = useState<ContentData>(JSON.parse(initialContent));
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

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
    } catch (err: any) {
      setStatus("error");
      setErrorMsg("Failed to save: " + err.message);
    }
  };

  const handleHeroChange = (field: keyof ContentData["hero"], value: string) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...data.hero.services];
    newServices[index] = value;
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, services: newServices },
    }));
  };

  const addService = () => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, services: [...prev.hero.services, "NEW SERVICE"] },
    }));
  };

  const removeService = (index: number) => {
    const newServices = [...data.hero.services];
    newServices.splice(index, 1);
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, services: newServices },
    }));
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setData((prev) => ({ ...prev, projects: newProjects }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now(), // Generate simple unique ID
      title: "New Project",
      category: "CATEGORY . TYPE",
      imageUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
      mediaType: "image",
    };
    setData((prev) => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  const removeProject = (index: number) => {
    const newProjects = [...data.projects];
    newProjects.splice(index, 1);
    setData((prev) => ({ ...prev, projects: newProjects }));
  };

  const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIndex(index);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadImage(formData);
      if (result.success && result.url) {
        handleProjectChange(index, "imageUrl", result.url);
      } else {
        alert(result.error || "Failed to upload image");
      }
    } catch (err) {
      alert("Error uploading image");
    } finally {
      setUploadingIndex(null);
    }
  };

  // UI Components
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-12 bg-[#1b1b1b] border border-white/10 p-6 md:p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold tracking-widest uppercase mb-6 text-white/90 border-b border-white/10 pb-4">
        {title}
      </h2>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );

  const InputField = ({ label, value, onChange, isTextarea = false }: { label: string; value: string; onChange: (v: string) => void; isTextarea?: boolean }) => (
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
        <div className="bg-red-500/20 text-red-400 p-4 border border-red-500/50 rounded-md">
          {errorMsg}
        </div>
      )}

      {/* Hero Section */}
      <Section title="Hero Section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Name (Top Left)" value={data.hero.name} onChange={(v) => handleHeroChange("name", v)} />
          <InputField label="Role (Top Left)" value={data.hero.role} onChange={(v) => handleHeroChange("role", v)} />
        </div>
        <InputField label="English Main Title" value={data.hero.englishTitle} onChange={(v) => handleHeroChange("englishTitle", v)} isTextarea />
        <InputField label="Japanese Subtitle" value={data.hero.japaneseTitle} onChange={(v) => handleHeroChange("japaneseTitle", v)} />
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <label className="text-xs tracking-widest uppercase text-gray-400 font-semibold">Services (Right Side Floating)</label>
            <button onClick={addService} className="text-xs border border-white/20 px-3 py-1 hover:bg-white/10 transition-colors">+ ADD SERVICE</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.hero.services.map((service, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleServiceChange(index, e.target.value)}
                  className="w-full bg-[#131313] border border-white/20 p-2 text-sm text-white focus:outline-none focus:border-white/60"
                />
                <button onClick={() => removeService(index)} className="bg-red-500/20 text-red-400 px-3 hover:bg-red-500/40 transition-colors">X</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <h3 className="text-sm font-bold tracking-widest uppercase text-gray-300 mb-6">3D Cylinder Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField 
              label="Rotation Speed (seconds/loop)" 
              value={String(data.hero.settings3d?.duration || 20)} 
              onChange={(v) => handleHeroChange("settings3d", { ...data.hero.settings3d, duration: Number(v) || 20 } as any)} 
            />
            <InputField 
              label="Cylinder Radius (px)" 
              value={String(data.hero.settings3d?.radius || 280)} 
              onChange={(v) => handleHeroChange("settings3d", { ...data.hero.settings3d, radius: Number(v) || 280 } as any)} 
            />
            <InputField 
              label="Vertical Offsets (comma separated)" 
              value={data.hero.settings3d?.offsets || "-160, 80, -40, 140, 0, -100, 100"} 
              onChange={(v) => handleHeroChange("settings3d", { ...data.hero.settings3d, offsets: v } as any)} 
            />
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section title="Works / Projects">
        <div className="flex justify-end mb-4">
          <button onClick={addProject} className="text-xs border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors">+ ADD NEW PROJECT</button>
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
                <InputField label="Project Title" value={project.title} onChange={(v) => handleProjectChange(index, "title", v)} />
                <InputField label="Category Tags" value={project.category} onChange={(v) => handleProjectChange(index, "category", v)} />
                <div className="md:col-span-2">
                  <label className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-2 block">Image/Video URL</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      value={project.imageUrl}
                      onChange={(e) => handleProjectChange(index, "imageUrl", e.target.value)}
                      className="flex-1 bg-[#131313] border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white/60 transition-colors"
                    />
                    <label className="cursor-pointer bg-white/10 border border-white/20 px-4 py-3 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors whitespace-nowrap">
                      {uploadingIndex === index ? "Uploading..." : "Upload Local"}
                      <input 
                        type="file" 
                        accept="image/*,video/*"
                        className="hidden" 
                        onChange={(e) => handleFileUpload(index, e)}
                        disabled={uploadingIndex === index}
                      />
                    </label>
                  </div>
                  {project.imageUrl && (
                    <div className="mt-2 text-xs text-gray-500 break-all">
                      Preview: <a href={project.imageUrl} target="_blank" rel="noreferrer" className="underline hover:text-white">Open Media</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer Section */}
      <Section title="Footer">
        <InputField label="Copyright Name" value={data.footer.copyrightName} onChange={(v) => setData((prev) => ({ ...prev, footer: { copyrightName: v } }))} />
      </Section>
    </div>
  );
}
