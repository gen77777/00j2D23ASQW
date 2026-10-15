import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";
import { requireAdminSession } from "@/lib/auth";
import { getContentRaw } from "@/lib/content";

export default async function AdminPage() {
  try {
    await requireAdminSession();
  } catch {
    redirect("/admin/login/");
  }

  const fileContents = await getContentRaw();

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
