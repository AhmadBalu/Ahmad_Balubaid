import type { Metadata } from "next";
import { Cormorant_Garamond, Syne, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmad Balubaid — AI Engineer & Systems Architect",
  description: "Portfolio of Ahmad Balubaid: AI Engineer, Applied ML Researcher, and Full-Stack Systems Architect based in Saudi Arabia.",
  keywords: [
    "Ahmad Balubaid",
    "AI Engineer Saudi Arabia",
    "Machine Learning",
    "RAG Systems",
    "Arabic NLP",
    "Full Stack Developer",
    "Next.js",
    "Python AI",
  ],
  authors: [{ name: "Ahmad Balubaid" }],
  openGraph: {
    title: "Ahmad Balubaid — AI Engineer & Systems Architect",
    description: "Architecting domain-grounded AI systems, Clinical ML pipelines, and resilient distributed architectures.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${syne.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased dark scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#05070c] text-[#f1f5f9] selection:bg-[#0df5c8]/20 selection:text-[#0df5c8]">
        {children}
      </body>
    </html>
  );
}

