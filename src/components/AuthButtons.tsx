"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="h-9 w-36 animate-pulse rounded-lg bg-black/5" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="rounded-lg border border-black/15 px-3 py-1.5 text-sm">
          সাইন ইন
        </Link>
        <Link href="/signup" className="rounded-lg bg-brand px-3 py-1.5 text-sm text-white">
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">{session.user.name}</span>
      <button
        onClick={async () => {
          await authClient.signOut();
          toast.success("সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        }}
        className="rounded-lg border border-black/15 px-3 py-1.5 text-sm"
      >
        সাইন আউট
      </button>
    </div>
  );
}