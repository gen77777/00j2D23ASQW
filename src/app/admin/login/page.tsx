import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="admin-cursor-auto flex min-h-screen items-center justify-center bg-paper px-8">
      <div className="w-full max-w-sm">
        <h1 className="eyebrow mb-8">Admin</h1>
        <LoginForm />
      </div>
    </main>
  );
}
