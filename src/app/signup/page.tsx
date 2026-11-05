"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: String(form.get("name")),
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }
    toast.success("রেজিস্ট্রেশন সফল — এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <main className="mx-auto w-full max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold">সাইন আপ</h1>
      <p className="mt-1 text-sm text-flat">নতুন অ্যাকাউন্ট খুলুন, ফ্রি।</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-xl border border-black/10 bg-white p-5">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">নাম</span>
          <input name="name" required className="w-full rounded-lg border border-black/15 px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">ইমেইল</span>
          <input name="email" type="email" required className="w-full rounded-lg border border-black/15 px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">পাসওয়ার্ড</span>
          <input name="password" type="password" required minLength={8} className="w-full rounded-lg border border-black/15 px-3 py-2" />
        </label>
        <button
          disabled={loading}
          className="w-full rounded-lg bg-brand px-4 py-2.5 font-medium text-white disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন…" : "রেজিস্টার করুন"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-flat">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-medium text-brand">
          সাইন ইন করুন
        </Link>
      </p>
    </main>
  );
}
