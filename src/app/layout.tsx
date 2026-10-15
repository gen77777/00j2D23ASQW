import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import "../styles/editorial.css";
import { getContent } from "@/lib/content";
import { getSiteUrl, siteConfig } from "@/lib/seo";
import { personJsonLd } from "@/lib/schema";
import MotionProvider from "@/components/motion/MotionProvider";
import Cursor from "@/components/motion/Cursor";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  weight: "variable",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian-mono",
  display: "swap",
  axes: ["wdth"],
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContent();
  const config = siteConfig(data);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: { default: config.title, template: `%s | ${config.name}` },
    description: config.description,
    alternates: { canonical: "/" },
    openGraph: {
      title: config.title,
      description: config.description,
      url: "/",
      siteName: config.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getContent();

  return (
    <html lang="ja">
      <body className={`${hanken.variable} ${bricolage.variable} ${martianMono.variable} antialiased font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(data)) }}
        />
        <MotionProvider>
          <Cursor />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
