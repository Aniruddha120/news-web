"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Protected from "@/components/Protected";

export default function ProfilePage() {
  return (
    <Protected>
      <ProfileForm />
    </Protected>
  );
}

function ProfileForm() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  if (!session) return null;
  const user = session.user;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();
    if (!name) return;

    setLoading(true);
    const { error } = await authClient.updateUser({ name });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "নাম আপডেট ব্যর্থ হয়েছে");
      return;
    }
    toast.success("নাম আপডেট হয়েছে");
  }

  return (
    <main className="mx-auto w-full max-w-md space-y-6 px-4 py-12">
      <div>
        <h1 className="text-2xl font-bold">প্রোফাইল</h1>
        <p className="mt-1 text-sm text-flat">তোমার অ্যাকাউন্টের তথ্য।</p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4">
        <span className="grid size-12 place-items-center rounded-full bg-brand text-lg font-bold text-white">
          {user.name.slice(0, 1)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium">{user.name}</p>
          <p className="truncate text-sm text-flat">{user.email}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-black/10 bg-white p-5">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">নাম</span>
          <input
            name="name"
            defaultValue={user.name}
            required
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium">ইমেইল</span>
          <input
            value={user.email}
            readOnly
            className="w-full rounded-lg border border-black/15 bg-black/5 px-3 py-2 text-flat"
          />
        </label>

        <button
          disabled={loading}
          className="w-full rounded-lg bg-brand px-4 py-2.5 font-medium text-white disabled:opacity-60"
        >
          {loading ? "সেভ হচ্ছে…" : "নাম সেভ করুন"}
        </button>
      </form>
    </main>
  );
}
