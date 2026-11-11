import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Atmosphere from "@/components/Atmosphere";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
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
    "Mohammad Kevin Arif Rudianto",
    "Corecraft",
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
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[250] focus:rounded-lg focus:bg-[#0b0b0c] focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <Preloader />
          <Atmosphere />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
