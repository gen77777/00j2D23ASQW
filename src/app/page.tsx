import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Resume from "@/components/sections/Resume";
import WorkExperience from "@/components/sections/WorkExperience";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";
import PageTransition from "@/components/motion/PageTransition";

export default async function Home() {
  const data = await getContent();

  return (
    <>
      <Header siteName={data.meta.siteName} />
      <main id="top" className="portfolio-page min-h-screen bg-black text-white">
        <PageTransition>
          <Hero data={data.hero} />
          <WorkExperience entries={data.resume.experience} />
          {data.projects.length > 0 && <Projects data={data.projects} />}
          <Services data={data.services} />
          <Resume data={data.resume} />
        </PageTransition>
      </main>
      <Footer data={data.footer} />
    </>
  );
}
