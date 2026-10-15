"use server";

import fs from "fs/promises";
import path from "path";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rateLimit";
import type { ContentData } from "@/types/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(
  formData: FormData,
): Promise<{ success: true } | { success: false; error: string }> {
  // Honeypot: real visitors never fill this hidden field. Bots that do get a fake success so
  // they don't learn the field was a trap.
  if (String(formData.get("company_website") ?? "")) {
    return { success: true };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in every field." };
  }
  if (!EMAIL_RE.test(email)) {
    return { success: false, error: "That email doesn't look right." };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(`lead:${ip}`, 3, 60_000)) {
    return { success: false, error: "Too many submissions — try again in a minute." };
  }

  const filePath = path.join(process.cwd(), "src/data/content.json");
  const raw = await fs.readFile(filePath, "utf8");
  const data: ContentData = JSON.parse(raw);
  data.leads.push({ id: String(Date.now()), name, email, message, createdAt: new Date().toISOString() });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");

  return { success: true };
}
