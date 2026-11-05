import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-24 text-center">
      <p className="text-6xl">🧺</p>
      <h1 className="mt-4 text-3xl font-bold">৪০৪ — পেজটি পাওয়া যায়নি</h1>
      <p className="mt-2 text-flat">
        তুমি যে পেজটি খুঁজছো সেটি নেই, নাম বদলে গেছে বা সরিয়ে ফেলা হয়েছে।
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-lg bg-brand px-5 py-2.5 text-white">
          হোম পেজে যাও
        </Link>
        <Link
          href="/#সব-পণ্য"
          className="rounded-lg border border-black/15 px-5 py-2.5"
        >
          সব পণ্যের দাম
        </Link>
      </div>
    </main>
  );
}
