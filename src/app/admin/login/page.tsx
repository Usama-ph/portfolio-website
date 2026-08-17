import type { Metadata } from "next";
import LoginForm from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
        <h1 className="text-xl font-semibold text-zinc-50">Admin login</h1>
        <p className="mt-1 mb-6 text-sm text-zinc-500">
          Sign in with your Supabase account.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
