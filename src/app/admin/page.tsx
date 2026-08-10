import fs from "fs/promises";
import path from "path";
import AdminClient from "./AdminClient";
import type { ContentData } from "@/types/content";

export default async function AdminPage() {
  const filePath = path.join(process.cwd(), "src/data/content.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  
  return (
    <main className="admin-cursor-auto min-h-screen bg-[#0e0e0e] text-white p-8 md:p-16 relative z-[99999]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-widest uppercase mb-12 border-b border-white/20 pb-4">
          Content Management
        </h1>
        <AdminClient initialContent={fileContents} />
      </div>
    </main>
  );
}
