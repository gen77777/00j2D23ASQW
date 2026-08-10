import type { ContentData } from "@/types/content";

export default function Footer({ data }: { data: ContentData["footer"] }) {
  return (
    <footer id="contact" className="border-t border-white/10 py-12 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center text-sm tracking-[0.1em] uppercase text-gray-500">
      <p>© {new Date().getFullYear()} {data.copyrightName}</p>
      <a href="#" className="hover:text-white transition-colors mt-4 md:mt-0">
        BACK TO TOP
      </a>
    </footer>
  );
}
