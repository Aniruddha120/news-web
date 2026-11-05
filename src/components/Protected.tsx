"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const fired = useRef(false);

  useEffect(() => {
    if (isPending || session || fired.current) return;
    fired.current = true;
    toast.error("এই পেজ দেখতে সাইন ইন করতে হবে");
    router.replace("/signin");
  }, [isPending, session, router]);

  if (isPending) {
    return <p className="py-20 text-center text-flat">লোড হচ্ছে…</p>;
  }
  if (!session) return null;

  return <>{children}</>;
}
