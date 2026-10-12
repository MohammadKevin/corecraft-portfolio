import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import FooterCTA from "@/components/FooterCTA";
import { profile } from "@/data/profile";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
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
    default: `${fullName} — Backend & Fullstack Developer`,
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
  themeColor: "#F8F9FA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main id="main">{children}</main>
          <FooterCTA />
        </SmoothScroll>
      </body>
    </html>
  );
}
