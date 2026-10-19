import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Atmosphere from "@/components/Atmosphere";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://corecraft.my.id";
const fullName = `${profile.firstName} ${profile.lastName}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${fullName} — Backend & Fullstack Software Engineer`,
    template: `%s — ${fullName}`,
  },
  description: profile.subtitle,
  keywords: [
    "Mohammad Kevin",
    "Backend Developer",
    "Fullstack Developer",
    "Software Engineer Malang",
    "Next.js Developer",
    "NestJS Developer",
    "Prisma ORM",
    "PostgreSQL",
    "MySQL",
    "REST API",
  ],
  authors: [{ name: fullName }],
  creator: fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${fullName} Portfolio`,
    title: `${fullName} — Backend & Fullstack Developer`,
    description: profile.subtitle,
    images: [
      {
        url: profile.avatar,
        width: 800,
        height: 800,
        alt: fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${fullName} — Backend & Fullstack Developer`,
    description: profile.subtitle,
    images: [profile.avatar],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#121110",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@400;700&display=swap"
        />
      </head>
      <body className="antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <Preloader />
          <Atmosphere />
          <CustomCursor />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
