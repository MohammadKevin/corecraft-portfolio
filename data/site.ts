export type NavItem = {
  id: string;
  label: string;
};

export type SectionInfo = {
  number: string;
  label: string;
  title?: string;
  heading?: string;
  subheading?: string;
  meta?: string;
  description?: string;
  footerLeft?: string;
  footerRight?: string;
  availability?: string;
  focusTitle?: string;
  focusSubtitle?: string;
  carouselAriaLabel?: string;
};

export type SiteConfig = {
  logo: string;
  navigation: NavItem[];
  navIds: string[];
  darkSectionIds: string[];
  sections: {
    hero: SectionInfo;
    about: SectionInfo;
    services: SectionInfo;
    stack: SectionInfo;
    work: SectionInfo;
    credentials: SectionInfo;
    experience: SectionInfo;
    contact: SectionInfo;
  };
  experienceLabel: string;
  footer: {
    wordmark: string;
    brandName: string;
    location: string;
    tagline: string;
    copyrightYear: number;
    builtWith: string;
    availability: string;
    quickNavTitle: string;
  };
};

export const site = {
  logo: "/logo-corecraft.png",
  navigation: [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "stack", label: "Stack" },
    { id: "work", label: "Work" },
    { id: "credentials", label: "Credentials" },
    { id: "experience", label: "Experience" },
  ],
  navIds: [
    "hero",
    "about",
    "services",
    "stack",
    "work",
    "credentials",
    "experience",
    "contact",
  ],
  darkSectionIds: ["about", "stack", "work", "experience"],
  sections: {
    hero: {
      number: "/01",
      label: "HERO",
    },
    about: {
      number: "/02",
      label: "ABOUT & STATEMENT",
      meta: "ENGINEERING PHILOSOPHY & METRICS",
      focusTitle: "Uptime-Focused",
      focusSubtitle: "Architecture Focus",
    },
    services: {
      number: "/03",
      label: "SERVICES & CAPABILITIES",
      heading: "Production capabilities delivered end-to-end.",
      description:
        "Specialized engineering capabilities architected for high concurrency, robust fault-tolerance, and resilient scale across complex full-lifecycle deployments.",
      footerLeft: "Modular Services",
      footerRight: "Available for Full-cycle Engagement",
    },
    stack: {
      number: "/04",
      label: "STACK",
      title: "TECHNICAL ARCHITECTURE",
      meta: "CONTINUOUS CROSSING MARQUEE",
      heading: "A battle-tested stack built for reliability and scale.",
    },
    work: {
      number: "/05",
      label: "SELECTED WORK",
      heading: "Production systems in live deployment.",
    },
    credentials: {
      number: "/06",
      label: "VERIFIED CREDENTIALS",
      heading: "Audited problem-solving and software credentials.",
      carouselAriaLabel: "Industry certifications grid track",
    },
    experience: {
      number: "/07",
      label: "EXPERIENCE",
      heading: "Industry track record in engineering & quality assurance.",
      meta: "2+ YEARS BUILDING RESILIENT SYSTEMS",
    },
    contact: {
      number: "/08",
      label: "CONTACT & FOOTER",
      heading: "HAVE A PROJECT IN MIND?",
      subheading:
        "Let's engineer something clear, resilient, and impactful together.",
      availability: "Available for New Projects",
    },
  },
  experienceLabel: "2+ YEARS BUILDING RESILIENT SYSTEMS",
  footer: {
    wordmark: "CORECRAFT",
    brandName: "Corecraft",
    location: "Malang, Indonesia",
    tagline: "AVAILABLE FOR NEW PROJECTS ✦ SCALE & UPTIME SPECIALIST ✦",
    copyrightYear: 2026,
    builtWith: "Built with Next.js 16 & React 19.",
    availability: "Available for New Projects",
    quickNavTitle: "Quick Navigation",
  },
} satisfies SiteConfig;
