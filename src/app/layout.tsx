import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Usama Adil — Full Stack Engineer",
    template: "%s | Usama Adil",
  },
  description:
    "Full Stack Software Engineer specializing in TypeScript, React, NestJS, PostgreSQL, and AI integrations. Building modern web apps and scalable APIs.",
  keywords: [
    "Full Stack Engineer",
    "TypeScript",
    "React",
    "Next.js",
    "NestJS",
    "PostgreSQL",
    "AI integrations",
    "freelance developer",
  ],
  authors: [{ name: "Usama Adil" }],
  creator: "Usama Adil",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://usamaadil.dev",
    siteName: "Usama Adil",
    title: "Usama Adil — Full Stack Engineer",
    description:
      "Full Stack Software Engineer specializing in TypeScript, React, NestJS, and AI integrations.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Usama Adil Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Usama Adil — Full Stack Engineer",
    description: "Full Stack Software Engineer building modern web & AI products.",
    creator: "@usamaadil",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-zinc-950 text-zinc-50 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
