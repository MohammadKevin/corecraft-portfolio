import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://corecraft.my.id"),
  title: "Mohammad Kevin | Backend & Fullstack Software Engineer",
  description:
    "High-performance backend systems, scalable REST APIs, and modern fullstack applications. Specialized in Next.js, NestJS, Express, Prisma, PostgreSQL, and MySQL.",
  keywords: [
    "Mohammad Kevin",
    "Backend Developer",
    "Fullstack Developer",
    "Software Engineer Malang",
    "SMK Telkom Malang",
    "Next.js Developer",
    "NestJS Developer",
    "Express.js",
    "Prisma ORM",
    "PostgreSQL",
    "MySQL",
    "SaaS Architecture",
    "API Gateway",
    "POS Systems",
  ].join(", "),
  authors: [{ name: "Mohammad Kevin" }],
  creator: "Mohammad Kevin",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://corecraft.my.id",
    title: "Mohammad Kevin | Backend & Fullstack Software Engineer",
    description: "High-performance backend systems, scalable REST APIs, and modern fullstack applications.",
    siteName: "Mohammad Kevin Portfolio",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Mohammad Kevin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Kevin | Backend & Fullstack Software Engineer",
    description: "High-performance backend systems, scalable REST APIs, and modern fullstack applications.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://corecraft.my.id",
  },
  verification: {
    google: "Ql3s20yhLdCaRpqDF5mz_7W3KDBTAOFCTs2sx9QrXvc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`scroll-smooth ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body
        suppressHydrationWarning
        className="antialiased bg-white text-zinc-900 min-h-screen font-sans selection:bg-sky-100 selection:text-sky-900"
      >
        <LanguageProvider>
          <Navbar />
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
