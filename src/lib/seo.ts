import type { ContentData } from "@/types/content";

/** Falls back to localhost in dev; set NEXT_PUBLIC_SITE_URL in production (see .env.example). */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export function siteConfig(data: ContentData) {
  return {
    siteUrl: getSiteUrl(),
    name: data.meta.siteName,
    title: `${data.meta.siteName} — ${data.meta.tagline}`,
    description: data.meta.tagline,
  };
}
