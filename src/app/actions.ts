"use server";

import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import type { Project } from "@/types/content";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export async function saveContent(data: string) {
  try {
    await requireAdminSession();
    const filePath = path.join(process.cwd(), "src/data/content.json");
    const parsed = JSON.parse(data);
    await fs.writeFile(filePath, data, "utf8");
    revalidatePath("/");
    revalidatePath("/contact");
    for (const project of (parsed.projects ?? []) as Project[]) {
      revalidatePath(`/projects/${project.slug}`);
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to save content", error);
    return { success: false, error: "Failed to save content" };
  }
}

export async function uploadImage(formData: FormData) {
  try {
    await requireAdminSession();

    const file = formData.get("file") as File | null;
    if (!file) return { success: false, error: "No file provided" };
    if (file.size > MAX_UPLOAD_BYTES) return { success: false, error: "File exceeds 8MB limit" };

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true }).catch(() => {});

    const buffer = Buffer.from(await file.arrayBuffer());
    const baseName = Date.now() + "-" + file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");

    if (file.type.startsWith("image/")) {
      const image = sharp(buffer).rotate().resize({ width: 2400, withoutEnlargement: true }).webp({ quality: 82 });
      const { data: outputBuffer, info } = await image.toBuffer({ resolveWithObject: true });
      const filename = `${baseName}.webp`;
      await fs.writeFile(path.join(uploadDir, filename), outputBuffer);
      return { success: true, url: `/uploads/${filename}`, width: info.width, height: info.height };
    }

    if (file.type.startsWith("video/")) {
      const ext = file.name.match(/\.[^.]+$/)?.[0] ?? "";
      const filename = `${baseName}${ext}`;
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      return { success: true, url: `/uploads/${filename}` };
    }

    return { success: false, error: "Unsupported file type" };
  } catch (error) {
    console.error("Failed to upload image", error);
    return { success: false, error: "Failed to upload image" };
  }
}
