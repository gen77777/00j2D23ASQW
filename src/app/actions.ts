"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export async function saveContent(data: string) {
  try {
    const filePath = path.join(process.cwd(), "src/data/content.json");
    // Verify it's valid JSON before saving
    JSON.parse(data);
    await fs.writeFile(filePath, data, "utf8");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to save content", error);
    return { success: false, error: "Failed to save content" };
  }
}

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file provided" };
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    
    // Ensure public/uploads exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true }).catch(() => {});
    
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);
    
    return { success: true, url: `/uploads/${filename}` };
  } catch (error) {
    console.error("Failed to upload image", error);
    return { success: false, error: "Failed to upload image" };
  }
}
