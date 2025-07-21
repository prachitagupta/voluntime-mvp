import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { ReactNode } from 'react';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voluntime",
  description: "Find mentors who volunteer their time to help you grow.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
