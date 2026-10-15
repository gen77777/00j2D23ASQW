"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE, verifyPassword } from "@/lib/auth";
import { rateLimit } from "@/lib/rateLimit";

export async function login(formData: FormData): Promise<{ success: false; error: string } | void> {
  const password = String(formData.get("password") ?? "");
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (!rateLimit(`login:${ip}`, 5, 60_000)) {
    return { success: false, error: "Too many attempts — try again in a minute." };
  }

  const storedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!storedHash || !verifyPassword(password, storedHash)) {
    return { success: false, error: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  redirect("/admin/");
}
