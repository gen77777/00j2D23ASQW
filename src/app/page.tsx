import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ResumeSection from "@/components/sections/ResumeSection";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

export default async function Home() {
  const data = await getContent();

  return (
    <>
      <Header siteName={data.meta.siteName} />
      <main id="top" className="portfolio-page min-h-screen bg-[#000000] text-white">
        <Hero data={data.hero} />
        <ResumeSection data={data.resume} />
        {data.projects.length > 0 && <Projects data={data.projects} />}
      </main>
      <Footer data={data.footer} />
    </>
  );
}
