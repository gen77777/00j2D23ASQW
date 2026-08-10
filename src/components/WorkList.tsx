"use client";

import { useState } from "react";



import type { ContentData } from "@/types/content";

export default function WorkList({ data }: { data: ContentData["projects"] }) {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="work" className="border-t border-white/10 pt-32 pb-24 px-8 md:px-16">
      {data.map((project) => (
        <article
          key={project.id}
          className="group border-b border-white/10 py-16 flex flex-col md:flex-row items-baseline justify-between hover:bg-white/5 transition-colors cursor-pointer relative overflow-hidden"
          onMouseEnter={() => setActiveProject(project.id)}
          onMouseLeave={() => setActiveProject(null)}
        >
          <div className="flex flex-col z-10">
            <h3 className="text-6xl md:text-8xl font-bold tracking-tight uppercase flex items-center gap-6">
              <span className="text-xl md:text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                ·
              </span>
              {project.title}
              <span className="text-xl md:text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-4 group-hover:translate-x-0">
                ·
              </span>
            </h3>
            
            {/* Detailed Content Reveal */}
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 ml-12 md:ml-[3.5rem]">
              <div className="overflow-hidden">
                <p className="text-sm md:text-base text-gray-400 tracking-widest uppercase mt-6 max-w-2xl">
                  Explore full case study / {project.category} / Technical breakdown & design aesthetics
                </p>
                <button className="mt-4 border border-white/20 px-4 py-2 text-xs tracking-[0.1em] uppercase hover:bg-white hover:text-black transition-colors">
                  View Case Study
                </button>
              </div>
            </div>
          </div>

          <p className="text-sm tracking-[0.1em] uppercase text-gray-400 mt-4 md:mt-0 z-10 group-hover:opacity-0 transition-opacity duration-300">
            {project.category}
          </p>

          {/* Hover Image (centered behind text) */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 opacity-0 group-hover:opacity-50 transition-opacity duration-500 object-cover pointer-events-none -z-0"
          />
        </article>
      ))}
    </section>
  );
}
