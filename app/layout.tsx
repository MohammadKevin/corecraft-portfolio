import type { Metadata, Viewport } from "next";
import {
  Anton,
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Sacramento,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n";
import { profile } from "@/data/profile";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-geist",
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: false,
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
  preload: true,
});

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sacramento",
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://corecraft.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.fullName} — Backend & Fullstack Software Engineer`,
    template: `%s — ${profile.fullName}`,
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
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: `${profile.fullName} Portfolio`,
    title: `${profile.fullName} — Backend & Fullstack Developer`,
    description: profile.subtitle,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.fullName} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} — Backend & Fullstack Developer`,
    description: profile.subtitle,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbf7f0",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  givenName: profile.firstName,
  familyName: profile.lastName,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Malang",
    addressRegion: "East Java",
    addressCountry: "ID",
  },
  sameAs: profile.socials.map((social) => social.url),
  knowsAbout: [
    "Backend Engineering",
    "REST API Architecture",
    "PostgreSQL",
    "MySQL",
    "Prisma ORM",
    "NestJS",
    "Next.js",
    "TypeScript",
  ],
};

const bootScript = `(function(){var d=document.documentElement;d.classList.add('js-ready');try{var m=localStorage.getItem('corecraft-motion');if(m==='off'||(m===null&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)){d.dataset.motion='off'}else{d.dataset.motion='on'}}catch(e){d.dataset.motion='on'}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} ${anton.variable} ${sacramento.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Lewati ke konten
        </a>

        <noscript>
          <style>{`[data-loader]{display:none!important}body.is-loading{overflow:auto!important;height:auto!important}`}</style>
        </noscript>

        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
