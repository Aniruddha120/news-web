import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const bengali = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className={`${bengali.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}