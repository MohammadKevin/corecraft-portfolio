"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";

/* ---------- Data Definitions (Corecraft — Full Screen v9) ---------- */

const SERVICES = [
  {
    title: "Backend & RESTful API Architecture",
    desc: "Modular APIs with NestJS & Express, DTO validation, JWT/OAuth2 authentication and OpenAPI/Swagger documentation. Every endpoint is designed to stay predictable as the product grows.",
    tags: ["NestJS", "Express.js", "Node.js", "OpenAPI", "Postman"],
  },
  {
    title: "Database Engineering & Query Tuning",
    desc: "Relational schema design, indexing and query optimization built for surge traffic.",
    tags: ["PostgreSQL", "MySQL", "Prisma ORM"],
  },
  {
    title: "Fullstack Web Applications",
    desc: "Clean, intuitive interfaces on top of strict API contracts.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    title: "POS & Inventory Management Systems",
    desc: "Transaction-safe stock and sales flows with barcode scanning and invoicing.",
    tags: ["Express.js", "MySQL"],
  },
  {
    title: "Digital Document & Archive Systems",
    desc: "Structured archiving with file encryption and role-based access control.",
    tags: ["PostgreSQL", "RBAC"],
  },
  {
    title: "Payment Gateway & Third-Party Integrations",
    desc: "Webhook-safe payments and external integrations with retry handling.",
    tags: ["Webhooks", "REST"],
  },
];

const PROCESS_STEPS = [
  {
    title: "Schema",
    desc: "Start at the data model: relational design, indexes and constraints that hold under load.",
    bg: "#f3f3f5",
    fg: "#0b0b0c",
    height: "34%",
  },
  {
    title: "Contract",
    desc: "Strict TypeScript, DTO validation and OpenAPI docs before any interface is drawn.",
    bg: "#e3e3e8",
    fg: "#0b0b0c",
    height: "54%",
  },
  {
    title: "Build",
    desc: "Transactional isolation, predictable caching and automated API tests with Postman and Playwright.",
    bg: "#0b0b0c",
    fg: "#fff",
    height: "76%",
  },
  {
    title: "Ship",
    desc: "Deploy, monitor and iterate with uptime as the first requirement.",
    bg: "#ff4d12",
    fg: "#0b0b0c",
    height: "100%",
  },
];

const TECH_STACK: [string, string, "B" | "F" | "D" | "T"][] = [
  ["Ne", "NestJS", "B"],
  ["Ex", "Express.js", "B"],
  ["No", "Node.js", "B"],
  ["Jw", "JWT / OAuth2", "B"],
  ["Oa", "OpenAPI", "B"],
  ["Ts", "TypeScript", "F"],
  ["Nx", "Next.js 16", "F"],
  ["Re", "React 19", "F"],
  ["Tw", "Tailwind CSS 4", "F"],
  ["Vc", "Vercel", "F"],
  ["Cl", "Cloudinary", "F"],
  ["Pg", "PostgreSQL", "D"],
  ["My", "MySQL", "D"],
  ["Pr", "Prisma ORM", "D"],
  ["Rd", "Redis", "D"],
  ["Su", "Supabase", "D"],
  ["Pw", "Playwright", "T"],
  ["Pm", "Postman", "T"],
  ["Gh", "Git & GitHub", "T"],
  ["Lx", "Linux (Ubuntu)", "T"],
];

const CC: Record<"B" | "F" | "D" | "T", string> = {
  B: "var(--o)",
  F: "var(--ink)",
  D: "#8a8a94",
  T: "#d9d9de",
};

const PROJECTS = [
  {
    title: "Smart Space Booking & Management",
    category: "Fullstack",
    year: 2026,
    bg: "#0b0b0c",
    fg: "#fff",
    isDark: true,
    bigHtml: "Smart Space <em>Booking</em>",
    tags: ["Express.js", "MySQL", "Prisma ORM"],
    slug: "worknest",
    liveDemo: "https://booking.corecraft.my.id",
  },
  {
    title: "Outer.Co — Boutique Florist",
    category: "E-Commerce",
    year: 2025,
    bg: "#ff4d12",
    fg: "#0b0b0c",
    isDark: false,
    bigHtml: "We sell <em>happiness</em>",
    tags: ["Next.js 16", "TypeScript", "Cloudinary"],
    slug: "outerco",
    liveDemo: "https://outerco.vercel.app",
  },
  {
    title: "InvDocs — Digital Archive & Document Workflow",
    category: "Fullstack",
    year: 2025,
    bg: "#f3f3f5",
    fg: "#0b0b0c",
    isDark: false,
    bigHtml: "Inv<em>Docs</em>",
    tags: ["Next.js", "Express.js", "PostgreSQL"],
    slug: "invdocs",
    liveDemo: "https://github.com/MohammadKevin/InvDocs-Archive",
  },
  {
    title: "CorePOS — Engine",
    category: "Fullstack",
    year: 2025,
    bg: "#0b0b0c",
    fg: "#ff6a35",
    isDark: true,
    bigHtml: "Core<em>POS</em>",
    tags: ["React.js", "Express.js"],
    slug: "corepos",
    liveDemo: "https://github.com/MohammadKevin",
  },
];

const CREDENTIALS = [
  ["Aug 2026", "Technical Skill", "REST API (Intermediate) Certificate", "HackerRank", "https://www.hackerrank.com/certificates/36F1F05CB5E0"],
  ["Aug 2026", "Backend Engineering", "Node.js (Intermediate) Certificate", "HackerRank", "https://www.hackerrank.com/certificates/48FE20D3BAC6"],
  ["Jul 2026", "Role Certification", "Software Engineer Certificate", "HackerRank", "https://www.hackerrank.com/certificates/1FA31AF247F3"],
  ["Aug 2026", "Role Certification", "Software Engineer Intern Role Certificate", "HackerRank", "https://www.hackerrank.com/certificates/FDBE98DD2143"],
  ["Aug 2026", "Role Certification", "Frontend Developer (React) Role Certificate", "HackerRank", "https://www.hackerrank.com/certificates/88CEC9A68415"],
  ["Aug 2026", "Programming Language", "JavaScript (Intermediate) Certificate", "HackerRank", "https://www.hackerrank.com/certificates/C29079B0DD25"],
  ["Aug 2026", "Programming Language", "Go (Basic) Certificate", "HackerRank", "https://www.hackerrank.com/certificates/97910B5C3DFE"],
  ["Aug 2026", "Frontend UI", "CSS (Basic) Certificate", "HackerRank", "https://www.hackerrank.com/certificates/33C5CD52D222"],
  ["Dec 2024", "National Hackathon", "National Hackathon “CodeCollab”", "HMSE Telkom University", "https://github.com/MohammadKevin"],
  ["Feb 2026", "National Competition", "Top 10 Business Model Canvas (BMC)", "Forum Bisnis Cendekia", "https://github.com/MohammadKevin"],
  ["Apr 2026", "Professional Course", "Basic JavaScript Programming", "Dicoding Indonesia", "https://www.dicoding.com/certificates/MRZMGNE9NZY1"],
  ["Apr 2026", "Professional Course", "Basic Web Programming", "Dicoding Indonesia", "https://www.dicoding.com/certificates/1OP86E1VRPQK"],
];

const EXPERIENCES = [
  {
    year: "2026—",
    company: "SIDIGS",
    role: "Quality Assurance",
    summary:
      "Executing rigorous test plans, automated API contract validations, and defect lifecycle tracking across client delivery pipelines.",
    tags: ["Manual Testing", "Postman", "Bug Tracking", "API Testing"],
    location: "Malang, Indonesia · current",
  },
  {
    year: "2025—",
    company: "CoreCraft",
    role: "Freelance & Backend Developer",
    summary:
      "Building resilient web platforms, transactional backends, and custom management systems for businesses under the CoreCraft studio.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma ORM", "TypeScript"],
    location: "Remote",
  },
  {
    year: "2024—",
    company: "SMK Telkom Malang",
    role: "Software Engineering Student",
    summary:
      "Studying core computer science principles, database modeling, object-oriented design, and enterprise application architectures.",
    tags: [],
    location: "Malang, Indonesia",
  },
];

const SECTIONS = [
  "Hero",
  "About",
  "Services",
  "Process",
  "Stack",
  "Work",
  "Credentials",
  "Experience",
  "Contact",
];
const SECTION_IDS = SECTIONS.map((s) => s.toLowerCase());

const ABOUT_HEADLINE_TEXT =
  "Architecting high-concurrency backend backbones, resilient API contracts, and query-optimized data systems — paired with modern, human-centered interfaces.";

export default function Home() {
  /* ---------- States ---------- */
  const [preloaderPercent, setPreloaderPercent] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeExperience, setActiveExperience] = useState(0);
  const [clockString, setClockString] = useState("--:--:-- WIB · Malang");
  const [copiedEmail, setCopiedEmail] = useState(false);

  /* ---------- Refs ---------- */
  const barRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const wtRef = useRef<HTMLDivElement>(null);
  const pbRef = useRef<HTMLDivElement>(null);
  const cnRef = useRef<HTMLSpanElement>(null);
  const aboutHeadlineRef = useRef<HTMLHeadingElement>(null);
  const tlCardRef = useRef<HTMLDivElement>(null);
  const marqueeAnimsRef = useRef<Animation[]>([]);
  const lyRef = useRef(0);
  const rtRef = useRef<NodeJS.Timeout | null>(null);
  const settleTmoRef = useRef<NodeJS.Timeout | null>(null);
  const sectionTopsRef = useRef<number[]>([]);
  const hasStartedRef = useRef(false);

  /* Helper clamp */
  const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* ---------- Calculate Section Offsets for Magnetic Settle ---------- */
  const recalculateTops = () => {
    const secs = Array.from(document.querySelectorAll<HTMLElement>("section"));
    const tops: number[] = [];
    let y = 0;
    secs.forEach((s) => {
      tops.push(y);
      y += s.offsetHeight;
    });
    sectionTopsRef.current = tops;
  };

  /* ---------- Number Counter Animation ---------- */
  const animateCount = (el: HTMLElement) => {
    if (el.dataset.counted === "true") return;
    el.dataset.counted = "true";
    const to = Number(el.dataset.n);
    if (isNaN(to)) return;
    const p = el.dataset.p || "";
    const z = Number(el.dataset.z) || 0;
    const t0 = performance.now();
    function g(t: number) {
      const k = Math.min(1, (t - t0) / 1300);
      el.textContent =
        String(Math.round(to * (1 - Math.pow(1 - k, 3)))).padStart(z, "0") + p;
      if (k < 1) requestAnimationFrame(g);
    }
    requestAnimationFrame(g);
  };

  /* ---------- Magnetic Button Helper ---------- */
  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
  };

  /* ---------- Copy Email ---------- */
  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(profile.email);
    } catch {
      // fallback
    }
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 1800);
  };

  /* ---------- Boot Preloader & Engine ---------- */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("an");

    if (typeof window !== "undefined" && (window as unknown as { chrome?: unknown }).chrome) {
      root.classList.add("lq");
    }

    let n = 0;
    const interval = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 8));
      setPreloaderPercent(n);
      if (n >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          document.body.classList.add("rd");
          hasStartedRef.current = true;
          setIsReady(true);
          recalculateTops();
        }, 450);
      }
    }, 70);

    const fallbackTimeout = setTimeout(() => {
      if (!hasStartedRef.current) {
        document.body.classList.add("rd");
        hasStartedRef.current = true;
        setIsReady(true);
        recalculateTops();
      }
    }, 9000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
      root.classList.remove("an");
      root.classList.remove("lq");
      document.body.classList.remove("rd");
    };
  }, []);

  /* ---------- Live Clock (Asia/Jakarta) ---------- */
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Jakarta" });
      setClockString(`${time} WIB · Malang`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ---------- 3D Card Tilt on Hero ---------- */
  useEffect(() => {
    const tl = tlCardRef.current;
    if (!tl) return;

    const onMouseMove = (e: MouseEvent) => {
      const r = tl.getBoundingClientRect();
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 12;
      const rx = -((e.clientY - r.top) / r.height - 0.5) * 12;
      tl.style.setProperty("--ry", `${ry}deg`);
      tl.style.setProperty("--rx", `${rx}deg`);
    };

    const onMouseLeave = () => {
      tl.style.setProperty("--rx", "0deg");
      tl.style.setProperty("--ry", "0deg");
    };

    tl.addEventListener("mousemove", onMouseMove);
    tl.addEventListener("mouseleave", onMouseLeave);

    return () => {
      tl.removeEventListener("mousemove", onMouseMove);
      tl.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  /* ---------- Pointer Highlight on Liquid Glass (.g) ---------- */
  useEffect(() => {
    let pq = 0;
    let pe: PointerEvent | null = null;

    const onPointerMove = (e: PointerEvent) => {
      pe = e;
      if (!pq) {
        pq = requestAnimationFrame(() => {
          pq = 0;
          if (!pe) return;
          const target = pe.target as HTMLElement | null;
          const g = target?.closest?.(".g") as HTMLElement | null;
          if (g) {
            const r = g.getBoundingClientRect();
            g.style.setProperty("--sx", `${pe.clientX - r.left}px`);
            g.style.setProperty("--sy", `${pe.clientY - r.top}px`);
          }
        });
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  /* ---------- Credentials Vertical Loop Marquee ---------- */
  useEffect(() => {
    const cols = Array.from(document.querySelectorAll<HTMLElement>(".cc"));
    if (cols.length === 0) return;

    const durations = [38000, 46000, 34000];
    const anims = cols.map((col, i) =>
      col.animate(
        [
          { transform: i % 2 ? "translateY(-50%)" : "translateY(0)" },
          { transform: i % 2 ? "translateY(0)" : "translateY(-50%)" },
        ],
        { duration: durations[i % durations.length], iterations: Infinity }
      )
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      anims.forEach((a) => a.pause());
    }

    marqueeAnimsRef.current = anims;

    return () => {
      anims.forEach((a) => a.cancel());
    };
  }, []);

  /* ---------- Scroll Engine: Parallax, Work Horizontal, In-View, Progress ---------- */
  useEffect(() => {
    let q = 0;

    const handleScroll = () => {
      q = 0;
      const y = window.scrollY;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const vh = window.innerHeight;

      // Vertical progress bar (#bar)
      if (barRef.current) {
        barRef.current.style.transform = `scaleY(${totalH ? y / totalH : 0})`;
      }

      // Accelerate credential marquee on scroll velocity
      const v = Math.min(Math.abs(y - lyRef.current), 80);
      lyRef.current = y;
      marqueeAnimsRef.current.forEach((a) => {
        if (a) a.playbackRate = 1 + v / 4;
      });
      if (rtRef.current) clearTimeout(rtRef.current);
      rtRef.current = setTimeout(() => {
        marqueeAnimsRef.current.forEach((a) => {
          if (a) a.playbackRate = 1;
        });
      }, 150);

      // Section stack parallax & in-view detection
      const secs = Array.from(document.querySelectorAll<HTMLElement>("section"));
      secs.forEach((s, i) => {
        const nx = secs[i + 1];
        const own = s.getBoundingClientRect().top;
        const nt = nx ? nx.getBoundingClientRect().top : 1e9;

        // --x parallax factor
        s.style.setProperty("--x", nx ? cl(1 - nt / vh).toFixed(3) : "0");

        // Section .in class trigger
        const vis = hasStartedRef.current && own <= vh * 0.55 && nt > vh * 0.45;
        if (vis !== s.classList.contains("in")) {
          s.classList.toggle("in", vis);
          if (vis) {
            s.querySelectorAll<HTMLElement>("[data-n]").forEach(animateCount);
          }
        }
      });

      // About words progressive reading highlight
      const aboutEl = document.getElementById("about");
      const stEl = aboutHeadlineRef.current;
      const servicesEl = document.getElementById("services");
      if (aboutEl && stEl && servicesEl) {
        const a = aboutEl.getBoundingClientRect();
        const n = servicesEl.getBoundingClientRect();
        const p = cl((vh * 0.85 - n.top) / (vh * 0.8));
        const words = stEl.querySelectorAll(".w2");
        words.forEach((w, i) => {
          const isHighlighted =
            i < p * words.length * 1.15 ||
            (aboutEl.classList.contains("in") &&
              i < words.length * cl((vh * 0.6 - a.top) / (vh * 0.5)));
          w.classList.toggle("on", isHighlighted);
        });
      }

      // Work section horizontal scroll
      const pin = pinRef.current;
      const wt = wtRef.current;
      const pb = pbRef.current;
      const cn = cnRef.current;
      if (pin && wt) {
        const pr = pin.getBoundingClientRect();
        const wp = cl(-pr.top / (pr.height - vh));
        const max = Math.max(0, wt.scrollWidth - window.innerWidth + 16);
        wt.style.transform = `translateX(${-wp * max}px)`;
        if (pb) {
          pb.style.setProperty("--wp", wp.toFixed(3));
        }

        const cards = Array.from(wt.querySelectorAll<HTMLElement>(".wc"));
        const wi = Math.min(cards.length - 1, Math.round(wp * (cards.length - 1)));
        cards.forEach((c, j) => {
          c.classList.toggle("act", j === wi);
          const r = c.getBoundingClientRect();
          c.style.setProperty(
            "--tx2",
            ((r.left + r.width / 2 - window.innerWidth / 2) * -0.12).toFixed(1) + "px"
          );
        });
        if (cn) {
          cn.textContent = `0${Math.min(wi + 1, 7)} / 07`;
        }
      }

      // Contact section text fill reveal (--fl)
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const c = contactEl.getBoundingClientRect();
        contactEl.style.setProperty(
          "--fl",
          cl((vh * 0.95 - c.top) / (vh * 0.6)).toFixed(3)
        );
      }
    };

    const onScroll = () => {
      if (!q) {
        q = requestAnimationFrame(handleScroll);
      }
    };

    const onResize = () => {
      recalculateTops();
      handleScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rtRef.current) clearTimeout(rtRef.current);
    };
  }, []);

  /* ---------- Desktop Magnetic Settle to Full-Screen Sections ---------- */
  useEffect(() => {
    const handleSettle = () => {
      if (window.innerWidth <= 860 || !hasStartedRef.current) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const tops = sectionTopsRef.current;
      const workEl = document.getElementById("work");
      if (!workEl || tops.length === 0) return;

      const wi = SECTION_IDS.indexOf("work");
      const ws = tops[wi];
      const we = ws + workEl.offsetHeight - vh;

      // Don't settle if user is currently inside the middle of the work pinned track
      if (y > ws + vh * 0.2 && y < we - vh * 0.2) return;

      let best = 0;
      let bd = 1e9;
      tops.forEach((t, i) => {
        const targets = i === wi ? [t, we] : [t];
        targets.forEach((tt) => {
          const d = Math.abs(y - tt);
          if (d < bd) {
            bd = d;
            best = tt;
          }
        });
      });

      if (bd > 3 && bd < vh * 0.4) {
        window.scrollTo({ top: best, behavior: "smooth" });
      }
    };

    const onScrollWithSettle = () => {
      if (settleTmoRef.current) clearTimeout(settleTmoRef.current);
      settleTmoRef.current = setTimeout(handleSettle, 220);
    };

    window.addEventListener("scroll", onScrollWithSettle, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollWithSettle);
      if (settleTmoRef.current) clearTimeout(settleTmoRef.current);
    };
  }, []);

  /* Close menu on Escape */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* ---------- Liquid Glass SVG Turbulence Filter ---------- */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="lg" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".007 .011"
            numOctaves={2}
            seed={9}
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale={40}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* ---------- Preloader Blinds & Big Percent Counter ---------- */}
      <div id="pre">
        <i style={{ "--i": 0 } as React.CSSProperties}></i>
        <i style={{ "--i": 1 } as React.CSSProperties}></i>
        <i style={{ "--i": 2 } as React.CSSProperties}></i>
        <i style={{ "--i": 3 } as React.CSSProperties}></i>
        <i style={{ "--i": 4 } as React.CSSProperties}></i>
        <span className="n">
          <span id="pc">{preloaderPercent}</span>
        </span>
      </div>

      {/* ---------- Vertical Scroll Progress Bar (Right Edge) ---------- */}
      <i id="bar" ref={barRef}></i>

      {/* ---------- Fixed Header Brand Logo ---------- */}
      <a className="lg" href="#hero">
        Corecraft<i>/</i>
      </a>

      {/* ---------- Fixed Menu Button ---------- */}
      <button
        className="g mb"
        id="mb"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        <u></u>
        <span id="mt">{menuOpen ? "Close" : "Menu"}</span>
      </button>

      {/* ---------- Fullscreen Glass Navigation Menu Overlay ---------- */}
      <nav id="mn" className={menuOpen ? "open" : ""} aria-label="Navigasi">
        {SECTIONS.map((sec, i) => (
          <a
            key={sec}
            href={`#${SECTION_IDS[i]}`}
            style={{ "--i": i } as React.CSSProperties}
            onClick={() => setMenuOpen(false)}
          >
            <span className="mo">0{i + 1}</span>
            {sec}
          </a>
        ))}
      </nav>

      <main>
        {/* ============================================================
            01 / HERO
           ============================================================ */}
        <section
          id="hero"
          data-l="Hero"
          data-t="BACKEND ✱ FULLSTACK ✱ APIS ✱ POS SYSTEMS ✱ DIGITAL ARCHIVES ✱ MALANG, EAST JAVA ✱"
        >
          <div className="lip g nf mo">
            <b>01 / 09 — Hero</b>
            <span>Malang, East Java · 2026</span>
          </div>

          <div className="c">
            <div className="hm mo">
              <span className="g chip nf" data-r style={{ "--i": 4 } as React.CSSProperties}>
                Backend &amp; Fullstack Software Engineer
              </span>
              <span data-r style={{ "--i": 5 } as React.CSSProperties}>
                / Available for new projects
              </span>
            </div>

            <div className="nmw">
              <i className="g sw"></i>
              <h1 className="nm">
                <span className="ln">Mohammad</span>
                <span className="ln">Kevin Arif</span>
                <span className="ln">Rudianto</span>
              </h1>
              <div className="vt2 mo">
                BACKEND — FULLSTACK — APIS — POS — ARCHIVES
              </div>

              {/* 3D Interactive Tilt System Card */}
              <div
                className="tw"
                data-r="s"
                style={{ "--i": 8 } as React.CSSProperties}
              >
                <div className="g card" id="tl" ref={tlCardRef}>
                  <div
                    className="mo"
                    style={{ fontSize: "10px", letterSpacing: ".08em" }}
                  >
                    SYSTEM SPECS — LIVE PROTOCOL
                  </div>
                  <h3>APIs · POS · Digital Archives</h3>
                  <p className="mo">
                    Architecting high-concurrency Node &amp; NestJS backbones with
                    Prisma ORM, verified schema integrity, and query optimization.
                  </p>
                  <div className="two mo">
                    <div className="mini">
                      CORE ENGINE
                      <b>TypeScript Strict</b>
                    </div>
                    <div className="mini">
                      TARGET UPTIME
                      <b>99.9% Production</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hb">
              <div>
                <p
                  className="lead"
                  data-r
                  style={{ "--i": 6 } as React.CSSProperties}
                >
                  Backend &amp; Fullstack Developer building reliable APIs, POS
                  systems and digital archives.
                </p>
                <div
                  className="bs"
                  data-r
                  style={{ "--i": 7 } as React.CSSProperties}
                >
                  <a
                    className="bt p"
                    data-mg
                    href="#work"
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                  >
                    Let’s collaborate ↗
                  </a>
                  <a
                    className="bt g"
                    data-mg
                    href="#work"
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                  >
                    View Selected Work
                  </a>
                </div>
              </div>

              <div
                className="st3"
                data-r
                style={{ "--i": 8 } as React.CSSProperties}
              >
                <div>
                  <b className="num" data-n="2" data-p="+">
                    2+
                  </b>
                  <span className="mo">Years of Engineering</span>
                </div>
                <div>
                  <b className="num" data-n="7" data-z="2">
                    07
                  </b>
                  <span className="mo">Production Platforms</span>
                </div>
                <div>
                  <b className="num" data-n="13">
                    13
                  </b>
                  <span className="mo">Certifications</span>
                </div>
              </div>

              <div
                className="hi mo"
                data-r
                style={{ "--i": 9 } as React.CSSProperties}
              >
                Based in Malang
                <br />
                GitHub · LinkedIn · WhatsApp
                <br />
                Scroll ↓
              </div>
            </div>
          </div>

          <div className="tick mo">
            <div>
              <span>
                {"BACKEND ✱ FULLSTACK ✱ APIS ✱ POS SYSTEMS ✱ DIGITAL ARCHIVES ✱ MALANG, EAST JAVA ✱ ".repeat(6)}
              </span>
              <span>
                {"BACKEND ✱ FULLSTACK ✱ APIS ✱ POS SYSTEMS ✱ DIGITAL ARCHIVES ✱ MALANG, EAST JAVA ✱ ".repeat(6)}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            02 / ABOUT
           ============================================================ */}
        <section
          id="about"
          data-l="About"
          data-t="SCHEMA ✱ CONTRACT ✱ BUILD ✱ SHIP ✱ STRICT TYPESCRIPT ✱ TRANSACTIONAL ISOLATION ✱ PREDICTABLE CACHING ✱"
        >
          <div className="lip g nf mo">
            <b>02 / 09 — About</b>
            <span>Engineering philosophy &amp; metrics</span>
          </div>

          <div className="c">
            <div className="ob2" data-r="c">
              <span className="gh">02</span>
              <div className="g ph mo">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.fullName}
                    fill
                    priority
                    sizes="(max-width: 860px) 100vw, 400px"
                    className="object-cover object-top select-none"
                  />
                ) : (
                  "[ FOTO PORTRAIT ]"
                )}
              </div>
              <div className="g cap mo nf">
                Mohammad Kevin Arif Rudianto
                <br />
                Backend &amp; Fullstack Software Engineer
              </div>
            </div>

            <div className="ar">
              <h2 className="st" id="st" ref={aboutHeadlineRef}>
                {ABOUT_HEADLINE_TEXT.split(" ").map((w, idx) => (
                  <React.Fragment key={idx}>
                    <span
                      className={`w2 ${
                        w.toLowerCase().startsWith("human") ? "sf" : ""
                      }`}
                    >
                      {w}
                    </span>{" "}
                  </React.Fragment>
                ))}
              </h2>

              <div className="ap">
                <p data-r>
                  Modern software breaks not at the happy path, but at the edges:
                  unindexed relational tables under surge traffic, race conditions in
                  inventory transactions, or unhandled webhook retries. My
                  engineering approach starts at the schema and protocol layer —
                  designing strict TypeScript contracts, transactional isolation,
                  and predictable caching strategies before surfacing clean,
                  intuitive frontend experiences with Next.js and React 19.
                </p>

                <div
                  className="tags mo"
                  data-r
                  style={{ "--i": 2 } as React.CSSProperties}
                >
                  <span className="g chip nf">Strict TypeScript contracts</span>
                  <span className="g chip nf">Transactional isolation</span>
                  <span className="g chip nf">Predictable caching</span>
                  <span className="g chip nf">Next.js · React 19</span>
                </div>
              </div>

              <div
                className="sbar"
                data-r
                style={{ "--i": 3 } as React.CSSProperties}
              >
                <div>
                  <b className="num" data-n="2" data-p="+">
                    2+
                  </b>
                  <span className="mo">Years of Engineering</span>
                </div>
                <div>
                  <b className="num" data-n="7" data-z="2">
                    07
                  </b>
                  <span className="mo">Production Platforms Built</span>
                </div>
                <div>
                  <b className="num" data-n="13">
                    13
                  </b>
                  <span className="mo">Industry Certifications</span>
                </div>
                <div>
                  <b
                    className="num"
                    style={{
                      fontSize: "clamp(18px, 2.2vw, 32px)",
                      lineHeight: 1.15,
                      paddingTop: "6px",
                    }}
                  >
                    Uptime-Focused
                  </b>
                  <span className="mo">Architecture Focus</span>
                </div>
              </div>
            </div>
          </div>

          <div className="tick mo">
            <div>
              <span>
                {"SCHEMA ✱ CONTRACT ✱ BUILD ✱ SHIP ✱ STRICT TYPESCRIPT ✱ TRANSACTIONAL ISOLATION ✱ PREDICTABLE CACHING ✱ ".repeat(6)}
              </span>
              <span>
                {"SCHEMA ✱ CONTRACT ✱ BUILD ✱ SHIP ✱ STRICT TYPESCRIPT ✱ TRANSACTIONAL ISOLATION ✱ PREDICTABLE CACHING ✱ ".repeat(6)}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            03 / SERVICES (Expanding Planks)
           ============================================================ */}
        <section
          id="services"
          data-l="Services"
          data-t="BACKEND & REST APIS ✱ DATABASE ENGINEERING ✱ FULLSTACK WEB ✱ POS & INVENTORY ✱ DOCUMENT ARCHIVES ✱ PAYMENT INTEGRATIONS ✱"
        >
          <div className="lip g nf mo">
            <b>03 / 09 — Services</b>
            <span>Production capabilities, end-to-end</span>
          </div>

          <div className="c">
            <div className="hd">
              <h2 className="ttl">
                <span className="ln">
                  <i>
                    What I <em className="sf">ship.</em>
                  </i>
                </span>
              </h2>
              <p data-r>
                Specialized engineering capabilities architected for high
                concurrency, robust fault-tolerance, and resilient scale across
                complex full-lifecycle deployments.
              </p>
            </div>

            <div className="pk2" id="sv" data-r="f">
              {SERVICES.map((s, i) => {
                const isActive = activeService === i;
                return (
                  <div
                    key={s.title}
                    className={`pl2${isActive ? " act" : ""}`}
                    tabIndex={0}
                    onClick={() => setActiveService(i)}
                    onMouseEnter={() => setActiveService(i)}
                    onFocus={() => setActiveService(i)}
                  >
                    <span className="nn mo">0{i + 1}</span>
                    <span className="vt">{s.title}</span>
                    <div className="in2">
                      <div className="gn">0{i + 1}</div>
                      <div>
                        <h3>{s.title}</h3>
                        <div className="g nf">
                          <p>{s.desc}</p>
                          <div className="tags mo">
                            {s.tags.map((t) => (
                              <span key={t} className="tg">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="tick mo">
            <div>
              <span>
                {"BACKEND & REST APIS ✱ DATABASE ENGINEERING ✱ FULLSTACK WEB ✱ POS & INVENTORY ✱ DOCUMENT ARCHIVES ✱ PAYMENT INTEGRATIONS ✱ ".repeat(6)}
              </span>
              <span>
                {"BACKEND & REST APIS ✱ DATABASE ENGINEERING ✱ FULLSTACK WEB ✱ POS & INVENTORY ✱ DOCUMENT ARCHIVES ✱ PAYMENT INTEGRATIONS ✱ ".repeat(6)}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            04 / PROCESS (Stairs)
           ============================================================ */}
        <section
          id="process"
          data-l="Process"
          data-t="SCHEMA ✱ CONTRACT ✱ BUILD ✱ SHIP ✱ UPTIME AS THE FIRST REQUIREMENT ✱ MEASURE ✱ ITERATE ✱"
        >
          <div className="lip g nf mo">
            <b>04 / 09 — Process</b>
            <span>New section · How a build goes</span>
          </div>

          <div className="c">
            <div className="hd">
              <h2 className="ttl">
                <span className="ln">
                  <i>
                    How a build <em className="sf">goes.</em>
                  </i>
                </span>
              </h2>
              <p data-r>
                Four stages, each one stricter than the last — from the first
                table to the production deploy.
              </p>
            </div>

            <div className="st2" id="st2">
              {PROCESS_STEPS.map((p, i) => (
                <div
                  key={p.title}
                  className="sb"
                  style={
                    {
                      "--b": p.bg,
                      "--f": p.fg,
                      "--h": p.height,
                      "--i": i,
                    } as React.CSSProperties
                  }
                >
                  <div className="nn2">0{i + 1}</div>
                  <div>
                    <h3>{p.title}</h3>
                    <div className={`g nf${p.bg === "#0b0b0c" ? " k" : ""}`}>
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tick mo">
            <div>
              <span>
                {"SCHEMA ✱ CONTRACT ✱ BUILD ✱ SHIP ✱ UPTIME AS THE FIRST REQUIREMENT ✱ MEASURE ✱ ITERATE ✱ ".repeat(6)}
              </span>
              <span>
                {"SCHEMA ✱ CONTRACT ✱ BUILD ✱ SHIP ✱ UPTIME AS THE FIRST REQUIREMENT ✱ MEASURE ✱ ITERATE ✱ ".repeat(6)}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            05 / STACK
           ============================================================ */}
        <section
          id="stack"
          data-l="Stack"
          data-t="NESTJS ✱ EXPRESS ✱ NODE.JS ✱ TYPESCRIPT ✱ NEXT.JS 16 ✱ REACT 19 ✱ POSTGRESQL ✱ MYSQL ✱ PRISMA ✱ REDIS ✱ SUPABASE ✱"
        >
          <div className="lip g nf mo">
            <b>05 / 09 — Stack</b>
            <span>20 production technologies</span>
          </div>

          <div
            className="ob"
            style={{
              inset: "56px 0 40px",
              position: "absolute",
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <i className="k-b" style={{ position: "absolute", display: "block" }}></i>
          </div>

          <div className="c">
            <div className="hd">
              <h2
                className="ttl"
                style={{ fontSize: "clamp(26px, min(4.4vw, 8vh), 68px)" }}
              >
                <span className="ln">
                  <i>
                    A battle-tested stack <em className="sf">built for scale.</em>
                  </i>
                </span>
              </h2>
              <p data-r>Reliability and scale, from the runtime to the deploy target.</p>
            </div>

            <div className="kl mo" data-r>
              <span style={{ "--cc": "var(--o)" } as React.CSSProperties}>
                <i></i>Backend
              </span>
              <span style={{ "--cc": "var(--ink)" } as React.CSSProperties}>
                <i></i>Frontend
              </span>
              <span style={{ "--cc": "#8a8a94" } as React.CSSProperties}>
                <i></i>Data
              </span>
              <span style={{ "--cc": "#d9d9de" } as React.CSSProperties}>
                <i></i>Tooling
              </span>
            </div>

            <div className="kg" id="kg">
              {TECH_STACK.map((t, i) => (
                <div
                  key={t[1]}
                  className="g nf tl"
                  style={
                    {
                      "--cc": CC[t[2]],
                      "--i": Math.floor(i / 5) + (i % 5),
                    } as React.CSSProperties
                  }
                >
                  <span className="mo">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ab">{t[0]}</span>
                  <span className="nmx">{t[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tick mo">
            <div>
              <span>
                {"NESTJS ✱ EXPRESS ✱ NODE.JS ✱ TYPESCRIPT ✱ NEXT.JS 16 ✱ REACT 19 ✱ POSTGRESQL ✱ MYSQL ✱ PRISMA ✱ REDIS ✱ SUPABASE ✱ ".repeat(6)}
              </span>
              <span>
                {"NESTJS ✱ EXPRESS ✱ NODE.JS ✱ TYPESCRIPT ✱ NEXT.JS 16 ✱ REACT 19 ✱ POSTGRESQL ✱ MYSQL ✱ PRISMA ✱ REDIS ✱ SUPABASE ✱ ".repeat(6)}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            06 / WORK (Horizontal Scroll Pinned Track)
           ============================================================ */}
        <section
          id="work"
          data-l="Work"
          data-t="SMART SPACE BOOKING ✱ OUTER.CO ✱ INVDOCS ✱ COREPOS ✱ 07 PRODUCTION SYSTEMS DELIVERED ✱ 100% ARCHITECTURE INTEGRITY ✱"
        >
          <div className="pin" id="pin" ref={pinRef}>
            <div className="pkw">
              <div className="lip g nf mo">
                <b>06 / 09 — Work</b>
                <span id="cn" ref={cnRef}>
                  01 / 07
                </span>
              </div>

              <div className="wk">
                <div className="hd">
                  <h2 className="ttl">
                    <span className="ln">
                      <i>
                        Production systems <em className="sf">live.</em>
                      </i>
                    </span>
                  </h2>
                  <p>
                    Scroll to move through the selected work — each one a
                    deployed, running system.
                  </p>
                </div>

                <div className="wt" id="wt" ref={wtRef}>
                  {PROJECTS.map((p, i) => (
                    <article
                      key={p.slug}
                      className={`wc${i === 0 ? " act" : ""}`}
                      style={
                        {
                          "--b": p.bg,
                          "--f": p.fg,
                        } as React.CSSProperties
                      }
                    >
                      <div className="wm mo">
                        <span>
                          0{i + 1} / {p.category}
                        </span>
                        <span>{p.year}</span>
                      </div>
                      <div
                        className="wb"
                        dangerouslySetInnerHTML={{ __html: p.bigHtml }}
                      />
                      <div className={`g wi${p.isDark ? " k" : ""}`}>
                        <b>{p.title}</b>
                        <div className="tags mo">
                          {p.tags.map((t) => (
                            <span key={t} className="tg">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="mo">
                          <Link href={`/work/${p.slug}`}>Case Study ↗</Link>
                          {" · "}
                          <a
                            href={p.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live Demo ↗
                          </a>
                        </span>
                      </div>
                    </article>
                  ))}

                  <article className="wc more">
                    <div
                      className="wb"
                      style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
                    >
                      +3 more
                      <br />
                      <em>systems ↗</em>
                    </div>
                  </article>
                </div>

                <div className="pb" ref={pbRef}>
                  <i></i>
                </div>
              </div>

              <div className="tick mo">
                <div>
                  <span>
                    {"SMART SPACE BOOKING ✱ OUTER.CO ✱ INVDOCS ✱ COREPOS ✱ 07 PRODUCTION SYSTEMS DELIVERED ✱ 100% ARCHITECTURE INTEGRITY ✱ ".repeat(6)}
                  </span>
                  <span>
                    {"SMART SPACE BOOKING ✱ OUTER.CO ✱ INVDOCS ✱ COREPOS ✱ 07 PRODUCTION SYSTEMS DELIVERED ✱ 100% ARCHITECTURE INTEGRITY ✱ ".repeat(6)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            07 / CREDENTIALS (Triple Column Infinite Marquee)
           ============================================================ */}
        <section
          id="credentials"
          data-l="Credentials"
          data-t="HACKERRANK ✱ DICODING ✱ HMSE TELKOM UNIVERSITY ✱ FORUM BISNIS CENDEKIA ✱ 13 INDUSTRY ACCREDITATIONS ✱"
        >
          <div className="lip g nf mo">
            <b>07 / 09 — Credentials</b>
            <span>Industry accreditations</span>
          </div>

          <div
            className="ob"
            style={{
              inset: "56px 0 40px",
              position: "absolute",
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <i className="c-n" style={{ position: "absolute", display: "block" }}>
              13
            </i>
          </div>

          <div className="c">
            <div className="hd">
              <h2 className="ttl">
                <span className="ln">
                  <i>
                    Verified <em className="sf">credentials.</em>
                  </i>
                </span>
              </h2>
              <p data-r>
                Thirteen certifications across backend, frontend and role-based
                tracks, plus national hackathon and competition results.
              </p>
            </div>

            <div className="cw" id="cw">
              {[
                [0, 1, 2, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
              ].map((group, colIdx) => (
                <div key={colIdx} className="cc">
                  {[...group, ...group].map((certIdx, itemIdx) => {
                    const c = CREDENTIALS[certIdx];
                    return (
                      <div key={itemIdx} className="g nf ct">
                        <span className="mo">
                          <span>{c[0]}</span>
                          <span>{c[1]}</span>
                        </span>
                        <b>{c[2]}</b>
                        <span className="mo">
                          <span>{c[3]}</span>
                          <a
                            href={c[4]}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--ink)", fontWeight: 700 }}
                          >
                            Verify ↗
                          </a>
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="tick mo">
            <div>
              <span>
                {"HACKERRANK ✱ DICODING ✱ HMSE TELKOM UNIVERSITY ✱ FORUM BISNIS CENDEKIA ✱ 13 INDUSTRY ACCREDITATIONS ✱ ".repeat(6)}
              </span>
              <span>
                {"HACKERRANK ✱ DICODING ✱ HMSE TELKOM UNIVERSITY ✱ FORUM BISNIS CENDEKIA ✱ 13 INDUSTRY ACCREDITATIONS ✱ ".repeat(6)}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            08 / EXPERIENCE (Interactive Planks Accordion)
           ============================================================ */}
        <section
          id="experience"
          data-l="Experience"
          data-t="SIDIGS ✱ CORECRAFT ✱ SMK TELKOM MALANG ✱ 2+ YEARS BUILDING RESILIENT SYSTEMS ✱ QUALITY ASSURANCE ✱ BACKEND ✱"
        >
          <div className="lip g nf mo">
            <b>08 / 09 — Experience</b>
            <span>2+ years building resilient systems</span>
          </div>

          <div className="c">
            <div className="hd">
              <h2 className="ttl">
                <span className="ln">
                  <i>
                    Track record <em className="sf">in engineering &amp; QA.</em>
                  </i>
                </span>
              </h2>
              <p data-r>
                Industry experience across quality assurance, freelance backend
                work and formal software engineering study.
              </p>
            </div>

            <div className="xl2" id="ex">
              {EXPERIENCES.map((x, i) => {
                const isActive = activeExperience === i;
                return (
                  <div
                    key={x.company}
                    className={`xb${isActive ? " act" : ""}`}
                    onClick={() => setActiveExperience(i)}
                  >
                    <i className="bar"></i>
                    <div className="xh">
                      <b>{x.company}</b>
                      <span className="yy mo">{x.year}</span>
                    </div>
                    <div className="xd">
                      <div>
                        <div className="g xx">
                          <div
                            className="mo"
                            style={{
                              fontSize: "11px",
                              color: "var(--mu)",
                              marginBottom: "6px",
                            }}
                          >
                            {x.location}
                          </div>
                          <h4>{x.role}</h4>
                          <p>{x.summary}</p>
                          <div className="tags mo">
                            {x.tags.map((t) => (
                              <span key={t} className="tg">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="tick mo">
            <div>
              <span>
                {"SIDIGS ✱ CORECRAFT ✱ SMK TELKOM MALANG ✱ 2+ YEARS BUILDING RESILIENT SYSTEMS ✱ QUALITY ASSURANCE ✱ BACKEND ✱ ".repeat(6)}
              </span>
              <span>
                {"SIDIGS ✱ CORECRAFT ✱ SMK TELKOM MALANG ✱ 2+ YEARS BUILDING RESILIENT SYSTEMS ✱ QUALITY ASSURANCE ✱ BACKEND ✱ ".repeat(6)}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            09 / CONTACT
           ============================================================ */}
        <section
          id="contact"
          data-l="Contact"
          data-t="AVAILABLE FOR NEW PROJECTS ✱ KVN4.200581@GMAIL.COM ✱ MALANG, EAST JAVA ✱ LET'S ENGINEER SOMETHING CLEAR ✱"
        >
          <div className="lip g nf mo">
            <b>09 / 09 — Contact</b>
            <span id="ck">{clockString}</span>
          </div>

          <div
            className="ob"
            style={{
              inset: "56px 0 0",
              position: "absolute",
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <i className="ctb" style={{ position: "absolute", display: "block" }}></i>
          </div>

          <div className="c">
            <div className="big2" aria-label="Let's talk">
              <span className="o1">Let’s talk</span>
              <span className="o2" aria-hidden="true">
                Let’s talk
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "clamp(8px, 2vh, 18px)",
                minHeight: 0,
              }}
            >
              <p
                className="mo"
                data-r
                style={{
                  margin: 0,
                  fontSize: "clamp(12px, 1.3vw, 17px)",
                  color: "var(--mu)",
                }}
              >
                Have a project in mind? Let&apos;s engineer something clear,
                resilient, and impactful together.
              </p>

              <a
                className="em"
                data-r
                style={{ "--i": 1 } as React.CSSProperties}
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>

              <div className="bs" style={{ marginTop: "4px" }} data-r>
                <button
                  className={`bt p cp${copiedEmail ? " on" : ""}`}
                  id="cp"
                  data-mg
                  onClick={handleCopyEmail}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                >
                  {copiedEmail ? "Copied ✓" : "Copy email"}
                </button>
                <a
                  className="bt g"
                  data-mg
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                >
                  WhatsApp
                </a>
                <a
                  className="bt g"
                  data-mg
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                >
                  Resume (PDF)
                </a>
              </div>
            </div>

            {/* Bottom 4-Column Glass Footer Grid */}
            <div
              className="g cg4 mo"
              data-r="s"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              <div>
                <b>NAVIGATE</b>
                <a href="#about">About</a> · <a href="#services">Services</a> ·{" "}
                <a href="#stack">Stack</a> · <a href="#work">Work</a>
              </div>
              <div>
                <b>ELSEWHERE</b>
                <a
                  href="https://github.com/MohammadKevin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>{" "}
                ·{" "}
                <a
                  href="https://www.linkedin.com/in/mohammad-kevin16"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>{" "}
                ·{" "}
                <a
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </div>
              <div>
                <b>LOCATION</b>
                Malang, East Java, ID
              </div>
              <div>
                <b>© 2026</b>
                Mohammad Kevin Arif Rudianto
                <br />
                Built with Next.js 16 &amp; React 19 ·{" "}
                <a href="#hero">Back to top ↑</a>
              </div>
            </div>
          </div>

          <div className="tick mo">
            <div>
              <span>
                {"AVAILABLE FOR NEW PROJECTS ✱ KVN4.200581@GMAIL.COM ✱ MALANG, EAST JAVA ✱ LET'S ENGINEER SOMETHING CLEAR ✱ ".repeat(6)}
              </span>
              <span>
                {"AVAILABLE FOR NEW PROJECTS ✱ KVN4.200581@GMAIL.COM ✱ MALANG, EAST JAVA ✱ LET'S ENGINEER SOMETHING CLEAR ✱ ".repeat(6)}
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
