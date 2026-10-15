import fs from "fs/promises";
import path from "path";
import type { ContentData } from "@/types/content";

function contentFilePath(): string {
  return path.join(process.cwd(), "src/data/content.json");
}

export async function getContentRaw(): Promise<string> {
  return fs.readFile(contentFilePath(), "utf8");
}

export async function getContent(): Promise<ContentData> {
  return JSON.parse(await getContentRaw()) as ContentData;
}

export async function getProjectBySlug(slug: string) {
  const data = await getContent();
  return data.projects.find((project) => project.slug === slug) ?? null;
}
