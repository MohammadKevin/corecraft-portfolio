import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Atmosphere from "@/components/Atmosphere";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

/** Display face — hero name, section headings. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/** Mono face — the `/SELECTED WORK` style eyebrows and indices. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/** Body face. */
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
  themeColor: "#F6F7F9",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
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
