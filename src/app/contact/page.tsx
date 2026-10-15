import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/sections/LeadForm";
import { getContent } from "@/lib/content";
import PageTransition from "@/components/motion/PageTransition";
import SplitLines from "@/components/motion/SplitLines";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContent();
  return {
    // No manual "| siteName" suffix — the root layout's title template already appends it.
    title: data.contact.headline,
    description: data.contact.headline,
    alternates: { canonical: "/contact/" },
  };
}

export default async function ContactPage() {
  const data = await getContent();

  return (
    <>
      <Header siteName={data.meta.siteName} />
      <main id="top" className="mx-auto min-h-screen max-w-3xl px-8 pt-40 pb-32 md:px-16">
        <PageTransition>
        <span className="eyebrow mb-8 block">{data.contact.eyebrow}</span>
        <SplitLines as="h1" className="mb-12 text-3xl font-medium leading-relaxed md:text-4xl">
          {data.contact.headline}
        </SplitLines>
        <LeadForm />
        </PageTransition>
      </main>
      <Footer data={data.footer} />
    </>
  );
}
