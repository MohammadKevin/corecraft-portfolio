import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
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

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
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
    google: "P3ie_hBmhRaKPj0kDNKLJSxyvzclf-QUbNXF33Yxkf0",
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
      className={`scroll-smooth ${jetbrainsMono.variable} ${inter.variable} ${jakarta.variable}`}
    >
      <body
        suppressHydrationWarning
        className="antialiased bg-[#FAF8F1] text-[#1C1B1D] min-h-screen font-sans selection:bg-[#76C0EC] selection:text-white"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohammad Kevin",
              url: "https://corecraft.my.id",
              image: "/images/logo.png",
              jobTitle: "Backend & Fullstack Software Engineer",
              description:
                "High-performance backend systems, scalable REST APIs, and modern fullstack applications. Specialized in Next.js, NestJS, Prisma ORM, PostgreSQL, and MySQL.",
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "SMK Telkom Malang",
              },
              knowsAbout: [
                "Next.js",
                "NestJS",
                "Express.js",
                "Prisma ORM",
                "PostgreSQL",
                "MySQL",
                "TypeScript",
                "Tailwind CSS",
                "REST API",
                "SaaS Architecture",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Malang",
                addressRegion: "Jawa Timur",
                addressCountry: "ID",
              },
              sameAs: [
                "https://github.com/MohammadKevin",
                "https://www.linkedin.com/in/mohammadkevin",
              ],
            }),
          }}
        />
        <LanguageProvider>
          <AuroraBackground />
          <Navbar />
          <div className="flex flex-col min-h-screen relative z-0">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
