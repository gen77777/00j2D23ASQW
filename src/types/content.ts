export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  coverImage: ImageAsset;
  caseStudy: { heading: string; body: string }[];
  mediaType: "image" | "video";
  liveUrl?: string;
  featured: boolean;
};

export type ResumeEntry = {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  details: string[];
};

export type ContentData = {
  meta: {
    siteName: string;
    tagline: string;
    url: string;
  };

  hero: {
    name: string;
    role: string;
    englishTitle: string;
    japaneseTitle: string;
    services: string[];
    ringWords?: string[];
    ring: {
      duration: number;
      radius: number;
      offsets: string;
    };
  };

  manifest: {
    eyebrow: string;
    statement: string;
  };

  approach: {
    eyebrow: string;
    intro: string;
    capabilities: { id: string; title: string; description: string }[];
  };

  services: {
    eyebrow: string;
    items: { id: string; title: string; description: string; deliverables: string[] }[];
  };

  projects: Project[];

  resume: {
    eyebrow: string;
    headline: string;
    intro: string;
    experience: ResumeEntry[];
    education: ResumeEntry[];
    qualifications: { id: string; period: string; title: string }[];
  };

  practice: {
    eyebrow: string;
    statement: string;
    disciplines: string[];
    basedIn: string;
  };

  coreVision: {
    eyebrow: string;
    headline: string;
    body: string;
  };

  contact: {
    eyebrow: string;
    headline: string;
  };

  footer: {
    copyrightName: string;
    email: string;
    location: string;
    socials: { label: string; url: string }[];
  };

  leads: {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
  }[];
};
