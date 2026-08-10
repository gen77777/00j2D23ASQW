import fs from "fs/promises";
import path from "path";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkList from "@/components/WorkList";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import type { ContentData } from "@/types/content";

export default async function Home() {
  const filePath = path.join(process.cwd(), "src/data/content.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data: ContentData = JSON.parse(fileContents);

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="min-h-screen">
        <Hero data={data.hero} />
        <WorkList data={data.projects} />
      </main>
      <Footer data={data.footer} />
    </>
  );
}
