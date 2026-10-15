import type { ContentData } from "@/types/content";
import { getSiteUrl } from "./seo";

/**
 * `Person`, not `Organization`/`LocalBusiness` — this is a real individual's site with no
 * physical storefront, so a LocalBusiness address would be fabricated. Person + sameAs is the
 * schema.org-correct choice for a solo practitioner's site.
 */
export function personJsonLd(data: ContentData) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.hero.name,
    jobTitle: data.hero.role,
    url: getSiteUrl(),
    ...(data.footer.location ? { address: { "@type": "PostalAddress", addressLocality: data.footer.location } } : {}),
    sameAs: data.footer.socials.map((s) => s.url).filter(Boolean),
  };
}
