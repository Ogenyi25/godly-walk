import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Daily Walk",
  description: "A simple daily devotion app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col items-center bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Navbar />
        <main className="w-full max-w-md px-4 flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
