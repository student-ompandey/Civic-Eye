import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CivicAI } from "@/components/layout/CivicAI";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Civic Eye — See a Problem. Report It. Track the Change.",
  description: "Civic Eye is an AI-powered civic issue reporting platform. Report potholes, garbage overflow, broken streetlights, water leakage, and public infrastructure issues, and track their resolution status in real-time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0d0d] text-foreground font-sans relative">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CivicAI />
      </body>
    </html>
  );
}
