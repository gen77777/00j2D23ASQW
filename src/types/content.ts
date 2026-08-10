export type Project = {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  mediaType: string;
};

export type ContentData = {
  hero: {
    name: string;
    role: string;
    englishTitle: string;
    japaneseTitle: string;
    services: string[];
    settings3d: {
      duration: number;
      radius: number;
      offsets: string;
    };
  };
  projects: Project[];
  footer: {
    copyrightName: string;
  };
};
