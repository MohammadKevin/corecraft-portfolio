"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";

/* ---------- Data Definitions (Corecraft — Redesign v3 Blueprint) ---------- */
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
  },
  {
    title: "Contract",
    desc: "Strict TypeScript, DTO validation and OpenAPI docs before any interface is drawn.",
  },
  {
    title: "Build",
    desc: "Transactional isolation, predictable caching and automated API tests with Postman and Playwright.",
  },
  {
    title: "Ship",
    desc: "Deploy, monitor and iterate with uptime as the first requirement.",
  },
];

const PROJECTS = [
  {
    title: "Smart Space Booking & Management",
    slug: "worknest",
    category: "Fullstack",
    year: 2026,
    bg: "#cfd6bf",
    fg: "#121110",
    big: "Smart Space <em class='sf'>Booking</em>",
    tags: ["Express.js", "MySQL", "Prisma ORM"],
    liveUrl: "https://booking.corecraft.my.id",
  },
  {
    title: "Outer.Co — Boutique Florist",
    slug: "outerco",
    category: "E-Commerce",
    year: 2025,
    bg: "#ece7dc",
    fg: "#121110",
    big: "We sell <em class='sf'>happiness</em>",
    tags: ["Next.js 16", "TypeScript", "Cloudinary"],
    liveUrl: "https://outerco.vercel.app",
  },
  {
    title: "InvDocs — Digital Archive",
    slug: "invdocs",
    category: "Fullstack",
    year: 2025,
    bg: "#ff5a1f",
    fg: "#121110",
    big: "InvDocs",
    tags: ["Next.js", "Express.js", "PostgreSQL"],
    liveUrl: "https://github.com/MohammadKevin/InvDocs-Archive",
  },
  {
    title: "CorePOS — Engine",
    slug: "corepos",
    category: "Fullstack",
    year: 2025,
    bg: "#ece7dc",
    fg: "#121110",
    big: "Core<em class='sf'>POS</em>",
    tags: ["React.js", "Express.js"],
    liveUrl: "https://github.com/MohammadKevin",
  },
];

const CREDENTIALS_PAGE1 = [
  {
    date: "Aug 2026",
    category: "Technical Skill",
    title: "REST API (Intermediate)",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/36F1F05CB5E0",
  },
  {
    date: "Aug 2026",
    category: "Backend Engineering",
    title: "Node.js (Intermediate)",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/48FE20D3BAC6",
  },
  {
    date: "Jul 2026",
    category: "Role Certification",
    title: "Software Engineer",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/1FA31AF247F3",
  },
  {
    date: "Aug 2026",
    category: "Role Certification",
    title: "Software Engineer Intern",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/FDBE98DD2143",
  },
  {
    date: "Aug 2026",
    category: "Role Certification",
    title: "Frontend Developer (React)",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/88CEC9A68415",
  },
  {
    date: "Aug 2026",
    category: "Programming Language",
    title: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/C29079B0DD25",
  },
  {
    date: "Aug 2026",
    category: "Programming Language",
    title: "Go (Basic)",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/97910B5C3DFE",
  },
  {
    date: "Dec 2024",
    category: "National Hackathon",
    title: "CodeCollab",
    issuer: "HMSE Telkom University",
    url: "https://github.com/MohammadKevin",
  },
];

const CREDENTIALS_PAGE2 = [
  {
    date: "Aug 2026",
    category: "Frontend UI",
    title: "CSS (Basic)",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/33C5CD52D222",
  },
  {
    date: "Feb 2026",
    category: "National Competition",
    title: "Top 10 Business Model Canvas",
    issuer: "Forum Bisnis Cendekia",
    url: "https://github.com/MohammadKevin",
  },
  {
    date: "Oct 2025",
    category: "Cloud & DevOps",
    title: "Belajar Dasar Cloud dan AWS",
    issuer: "Dicoding Indonesia",
    url: "https://www.dicoding.com/certificates/NVP742E8VPR0",
  },
  {
    date: "May 2025",
    category: "Web Development",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    url: "https://www.dicoding.com/certificates/1OP86E1VRPQK",
  },
  {
    date: "May 2025",
    category: "Programming Language",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    url: "https://www.dicoding.com/certificates/MRZMGNE9NZY1",
  },
];

const EXPERIENCES = [
  {
    year: "2026—",
    company: "SIDIGS",
    role: "Quality Assurance",
    summary:
      "Executing rigorous test plans, automated API contract validations, and defect lifecycle tracking across client delivery pipelines.",
    tech: ["Manual Testing", "Postman", "Bug Tracking", "API Testing"],
    location: "Malang, Indonesia · current",
  },
  {
    year: "2025—",
    company: "CoreCraft",
    role: "Freelance & Backend Developer",
    summary:
      "Building resilient web platforms, transactional backends, and custom management systems for businesses under the CoreCraft studio.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Prisma ORM", "TypeScript"],
    location: "Remote",
  },
  {
    year: "2024—",
    company: "SMK Telkom Malang",
    role: "Software Engineering Student",
    summary:
      "Studying core computer science principles, database modeling, object-oriented design, and enterprise application architectures.",
    tech: [],
    location: "Malang, Indonesia",
  },
];

const STACK_ROW_A = [
  "NestJS",
  "PostgreSQL",
  "Prisma ORM",
  "Redis",
  "Supabase",
  "TypeScript",
];
const STACK_ROW_B = [
  "Next.js 16",
  "React 19",
  "Express.js",
  "Linux",
  "MySQL",
  "Vercel",
];

const ABOUT_WORDS = [
  "Architecting",
  "high-concurrency",
  "backend",
  "backbones,",
  "resilient",
  "API",
  "contracts,",
  "and",
  "query-optimized",
  "data",
  "systems",
  "—",
  "paired",
  "with",
  "modern,",
  "human-centered",
  "interfaces.",
];

export default function HomePage() {
  /* Preloader percent & ready state */
  const [preloaderPercent, setPreloaderPercent] = useState(0);
  const [isReady, setIsReady] = useState(false);

  /* Interactive States */
  const [expandedService, setExpandedService] = useState<number | null>(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(1);
  const [credPage, setCredPage] = useState<1 | 2>(1);
  const [clockString, setClockString] = useState("--:--:-- WIB · Malang");

  /* Refs */
  const barRef = useRef<HTMLElement>(null);
  const aboutHeadlineRef = useRef<HTMLHeadingElement>(null);
  const pvRef = useRef<HTMLDivElement>(null);
  const marqueeAnimsRef = useRef<Animation[]>([]);
  const lyRef = useRef(0);
  const rtRef = useRef<NodeJS.Timeout | null>(null);

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

  /* ---------- Select Project (Work) ---------- */
  const selectProject = (i: number) => {
    setActiveProjectIndex(i);
    const p = PROJECTS[i];
    const v = pvRef.current;
    if (v) {
      v.classList.remove("sw");
      void v.offsetWidth;
      v.classList.add("sw");
      v.style.setProperty("--pb", p.bg);
      v.style.setProperty("--pf", p.fg);
    }
  };

  /* ---------- Initial Setup & Preloader Boot ---------- */
  useEffect(() => {
    let currentPercent = 0;
    const interval = setInterval(() => {
      currentPercent = Math.min(100, currentPercent + Math.ceil(Math.random() * 9));
      setPreloaderPercent(currentPercent);
      if (currentPercent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          document.body.classList.add("rd");
          setIsReady(true);
        }, 350);
      }
    }, 70);

    return () => {
      clearInterval(interval);
      document.body.classList.remove("rd");
    };
  }, []);

  /* ---------- Live Clock ---------- */
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

  /* ---------- Marquee Animation & Scroll Accelerate ---------- */
  useEffect(() => {
    const m1 = document.getElementById("m1");
    const m2 = document.getElementById("m2");
    if (!m1 || !m2) return;

    const anims = [
      m1.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
        { duration: 45000, iterations: Infinity }
      ),
      m2.animate(
        [{ transform: "translateX(-50%)" }, { transform: "translateX(0)" }],
        { duration: 45000, iterations: Infinity }
      ),
    ];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      anims.forEach((a) => a.pause());
    }

    marqueeAnimsRef.current = anims;

    return () => {
      anims.forEach((a) => a.cancel());
    };
  }, []);

  /* ---------- IntersectionObserver for In-View & Counters ---------- */
  useEffect(() => {
    if (!isReady) return;

    function count(el: HTMLElement) {
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
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>("section"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nv a"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          target.classList.toggle("in", entry.isIntersecting);
          if (entry.isIntersecting) {
            target.querySelectorAll<HTMLElement>("[data-n]").forEach(count);
            navLinks.forEach((a) => {
              a.classList.toggle("on", a.getAttribute("href") === "#" + target.id);
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((s) => io.observe(s));

    return () => {
      io.disconnect();
    };
  }, [isReady]);

  /* ---------- Scroll Handler (Progress, Words, Parallax, Marquee Speed) ---------- */
  useEffect(() => {
    const bar = barRef.current;
    let scheduled = false;

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;

      requestAnimationFrame(() => {
        scheduled = false;
        const y = window.scrollY;
        const scrollH = document.documentElement.scrollHeight - window.innerHeight;

        // Top progress bar
        if (bar) {
          bar.style.transform = `scaleX(${scrollH ? y / scrollH : 0})`;
        }

        // Marquee speedup on scroll velocity
        const v = Math.min(Math.abs(y - lyRef.current), 80);
        lyRef.current = y;
        marqueeAnimsRef.current.forEach((a) => {
          if (a) a.playbackRate = 1 + v / 5;
        });
        if (rtRef.current) clearTimeout(rtRef.current);
        rtRef.current = setTimeout(() => {
          marqueeAnimsRef.current.forEach((a) => {
            if (a) a.playbackRate = 1;
          });
        }, 150);

        // Section card parallax scaling (--x)
        const allSections = document.querySelectorAll<HTMLElement>("section");
        allSections.forEach((s) => {
          const r = s.getBoundingClientRect();
          s.style.setProperty(
            "--x",
            String(Math.min(1, Math.max(0, -r.top / (r.height * 0.85))))
          );
        });

        // About words opacity highlight
        const aboutEl = document.getElementById("about");
        if (aboutEl && aboutHeadlineRef.current) {
          const r = aboutEl.getBoundingClientRect();
          const p = Math.min(
            1,
            Math.max(0, (window.innerHeight * 0.8 - r.top) / (window.innerHeight * 0.7))
          );
          const words = aboutHeadlineRef.current.querySelectorAll(".w");
          words.forEach((w, i) => {
            w.classList.toggle("on", i < p * words.length);
          });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rtRef.current) clearTimeout(rtRef.current);
    };
  }, []);

  /* Initialize Preview Card on Mount */
  useEffect(() => {
    selectProject(1);
  }, []);

  const name1 = "Mohammad Kevin";
  const name2 = "Arif Rudianto";
  const activeP = PROJECTS[activeProjectIndex];

  return (
    <>
      {/* ---------- Preloader Screen ---------- */}
      <div id="pre">
        <span className="mo">Booting Corecraft…</span>
        <div className="n">
          <span id="pc">{preloaderPercent}</span>%
        </div>
      </div>

      {/* ---------- Scroll Progress Bar ---------- */}
      <i id="bar" ref={barRef}></i>

      {/* ---------- Floating Pill Navigation ---------- */}
      <header className="nv">
        <nav>
          <b>Corecraft.</b>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#stack">Stack</a>
          <a href="#work">Work</a>
          <a href="#credentials">Credentials</a>
          <a href="#experience">Experience</a>
          <a className="cta" href="#contact">
            Let’s Talk ↗
          </a>
        </nav>
      </header>

      <main>
        {/* ============================================================
            SECTION 01: HERO (--t-k)
           ============================================================ */}
        <section id="hero" className="t-k">
          <div className="c">
            <div className="lb mo">
              <span>(01) — Hero</span>
              <span>Malang, East Java · 2026</span>
            </div>

            <h1 className="nm">
              <span className="ln" data-split>
                {name1.split("").map((c, i) => (
                  <span
                    key={i}
                    className="ch"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {c === " " ? "\u00A0" : c}
                  </span>
                ))}
              </span>
              <span className="ln sf" data-split>
                {name2.split("").map((c, i) => (
                  <span
                    key={i}
                    className="ch"
                    style={{ "--i": i + name1.length } as React.CSSProperties}
                  >
                    {c === " " ? "\u00A0" : c}
                  </span>
                ))}
              </span>
            </h1>

            <div className="g2 hb">
              <div>
                <p className="lead" data-r style={{ "--i": 6 } as React.CSSProperties}>
                  Backend &amp; Fullstack Developer building reliable APIs, POS systems
                  and digital archives.
                </p>
                <div
                  className="bs"
                  data-r
                  style={{ "--i": 7 } as React.CSSProperties}
                >
                  <a className="bt p" href="#work">
                    Let’s collaborate ↗
                  </a>
                  <a className="bt" href="#work">
                    View Selected Work
                  </a>
                </div>
              </div>

              <div
                className="tm mo"
                data-r="s"
                style={{ "--i": 5 } as React.CSSProperties}
              >
                <div className="th">
                  <span>
                    <b style={{ color: "var(--ac)" }}>POST</b> /v1/hello
                  </span>
                  <span style={{ color: "#5bd18b" }}>201 Created</span>
                </div>
                <div data-r style={{ "--i": 7, color: "var(--mu)" } as React.CSSProperties}>
                  &#123; &quot;engineer&quot;: &quot;Kevin Arif Rudianto&quot;,
                </div>
                <div data-r style={{ "--i": 8, color: "var(--mu)" } as React.CSSProperties}>
                  &nbsp; &quot;builds&quot;: [&quot;APIs&quot;, &quot;POS&quot;, &quot;Digital Archives&quot;],
                </div>
                <div data-r style={{ "--i": 9, color: "var(--mu)" } as React.CSSProperties}>
                  &nbsp; &quot;stack&quot;: [&quot;NestJS&quot;, &quot;PostgreSQL&quot;, &quot;Next.js&quot;],
                </div>
                <div data-r style={{ "--i": 10, color: "var(--mu)" } as React.CSSProperties}>
                  &nbsp; &quot;status&quot;: &quot;available&quot; &#125;
                </div>
              </div>
            </div>
          </div>

          {/* Rotating Available Badge */}
          <div className="bd" aria-hidden="true">
            <svg viewBox="0 0 160 160">
              <defs>
                <path
                  id="cp"
                  d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0"
                />
              </defs>
              <text
                className="mo"
                fontSize="11"
                fontWeight="700"
                letterSpacing="1.8"
                fill="#121110"
              >
                <textPath href="#cp">
                  AVAILABLE FOR NEW PROJECTS ✱ OPEN TO WORK ✱{" "}
                </textPath>
              </text>
            </svg>
            ↗
          </div>
        </section>

        {/* ============================================================
            SECTION 02: ABOUT (--t-b)
           ============================================================ */}
        <section id="about" className="t-b">
          <div className="c">
            <div className="lb mo">
              <span>(02) — About</span>
              <span>Engineering philosophy &amp; metrics</span>
            </div>

            <div className="g2">
              <div>
                <h2 className="st" id="st" ref={aboutHeadlineRef}>
                  {ABOUT_WORDS.map((w, idx) => (
                    <React.Fragment key={idx}>
                      <span className={`w ${w.startsWith("human") ? "sf" : ""}`}>
                        {w}
                      </span>
                      {idx < ABOUT_WORDS.length - 1 ? " " : ""}
                    </React.Fragment>
                  ))}
                </h2>
                <p className="pp" data-r>
                  Modern software breaks not at the happy path, but at the edges:
                  unindexed relational tables under surge traffic, race conditions in
                  inventory transactions, or unhandled webhook retries. My engineering
                  approach starts at the schema and protocol layer — designing strict
                  TypeScript contracts, transactional isolation, and predictable caching
                  strategies before surfacing clean, intuitive frontend experiences with
                  Next.js and React 19.
                </p>
              </div>

              <div className="pt">
                <div className="ph mo" data-r="c">
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={profile.fullName}
                      fill
                      priority
                      className="object-cover object-top select-none"
                    />
                  ) : (
                    "[ FOTO PORTRAIT ]"
                  )}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="sts">
              <div data-r>
                <b className="num" data-n="2" data-p="+">
                  0
                </b>
                <span className="mo">Years of Engineering</span>
              </div>
              <div data-r style={{ "--i": 1 } as React.CSSProperties}>
                <b className="num" data-n="7" data-z="2">
                  00
                </b>
                <span className="mo">Production Platforms Built</span>
              </div>
              <div data-r style={{ "--i": 2 } as React.CSSProperties}>
                <b className="num" data-n="13">
                  0
                </b>
                <span className="mo">Industry Certifications</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 03: SERVICES (--t-o)
           ============================================================ */}
        <section id="services" className="t-o">
          <div className="c">
            <div className="lb mo">
              <span>(03) — Services</span>
              <span>Production capabilities, end-to-end</span>
            </div>

            <div className="g3">
              <div>
                <h2 className="h2">
                  <span className="ln">
                    <i>What I</i>
                  </span>
                  <span className="ln">
                    <i>
                      <em className="sf">ship.</em>
                    </i>
                  </span>
                </h2>
                <p className="pp" data-r>
                  Specialized engineering capabilities architected for high concurrency,
                  robust fault-tolerance, and resilient scale across complex
                  full-lifecycle deployments.
                </p>
                <span
                  className="tg mo"
                  data-r
                  style={{ marginTop: "20px" }}
                >
                  6 core disciplines available
                </span>
              </div>

              <div id="sv">
                {SERVICES.map((s, idx) => {
                  const isOpen = expandedService === idx;
                  return (
                    <React.Fragment key={idx}>
                      <button
                        className="rw"
                        aria-expanded={isOpen}
                        data-r
                        style={{ "--i": idx } as React.CSSProperties}
                        onClick={() =>
                          setExpandedService(isOpen ? null : idx)
                        }
                      >
                        <span className="mo">0{idx + 1}</span>
                        <b>{s.title}</b>
                        <i>+</i>
                      </button>
                      <div className="pn">
                        <div>
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
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 04: PROCESS (--t-k dots)
           ============================================================ */}
        <section id="process" className="t-k dots">
          <div className="c">
            <div className="lb mo">
              <span>(04) — Process</span>
              <span>New section · How a build goes</span>
            </div>

            <div className="g3">
              <div>
                <h2 className="h2">
                  <span className="ln">
                    <i>How a</i>
                  </span>
                  <span className="ln">
                    <i>build</i>
                  </span>
                  <span className="ln">
                    <i>
                      <em className="sf">goes.</em>
                    </i>
                  </span>
                </h2>
              </div>

              <div className="stp" id="pr">
                <u className="rl"></u>
                {PROCESS_STEPS.map((p, idx) => (
                  <div
                    key={idx}
                    className="sp"
                    data-r
                    style={{ "--i": idx * 3 } as React.CSSProperties}
                  >
                    <span className="mo">0{idx + 1}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 05: STACK (--t-b)
           ============================================================ */}
        <section id="stack" className="t-b">
          <div className="c">
            <div className="lb mo">
              <span>(05) — Stack</span>
              <span>20 production technologies</span>
            </div>
            <p
              className="h2 sm"
              data-r
              style={{
                maxWidth: "12em",
                fontSize: "clamp(26px, 3.4vw, 52px)",
                letterSpacing: "-.035em",
              }}
            >
              A battle-tested stack built for reliability and scale.
            </p>
          </div>

          <div className="stamp">
            <b data-n="20">0</b>
            <span className="mo">TECHNOLOGIES</span>
          </div>

          <div className="mqw">
            <div className="mq" id="m1">
              {[...STACK_ROW_A, ...STACK_ROW_A].map((item, i) => (
                <React.Fragment key={i}>
                  <span>{item}</span>
                  <em>✱</em>
                </React.Fragment>
              ))}
            </div>
            <div className="mq o2" id="m2">
              {[...STACK_ROW_B, ...STACK_ROW_B].map((item, i) => (
                <React.Fragment key={i}>
                  <span>{item}</span>
                  <em>✱</em>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="c">
            <div className="chips mo" data-r>
              <span className="tg">Playwright</span>
              <span className="tg">Postman</span>
              <span className="tg">Supabase</span>
              <span className="tg">Git &amp; GitHub</span>
              <span className="tg">Cloudinary</span>
              <span className="tg">Tailwind CSS 4</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 06: WORK (--t-k)
           ============================================================ */}
        <section id="work" className="t-k">
          <div className="c">
            <div className="lb mo">
              <span>(06) — Selected work</span>
              <span id="cn">0{activeProjectIndex + 1} / 07</span>
            </div>

            <h2
              className="h2 sm"
              style={{ marginBottom: "clamp(28px, 5vh, 56px)" }}
            >
              <span className="ln">
                <i>Production systems</i>
              </span>
              <span className="ln">
                <i>
                  in <em className="sf">live deployment.</em>
                </i>
              </span>
            </h2>

            <div className="g2">
              <div id="pl">
                {PROJECTS.map((p, idx) => (
                  <button
                    key={p.slug}
                    className={`pj ${idx === activeProjectIndex ? "on" : ""}`}
                    data-i={idx}
                    data-r
                    style={{ "--i": idx } as React.CSSProperties}
                    onMouseEnter={() => selectProject(idx)}
                    onFocus={() => selectProject(idx)}
                    onClick={() => selectProject(idx)}
                  >
                    <span className="mo">0{idx + 1}</span>
                    <b>{p.title}</b>
                    <span className="mo">
                      {p.category} · {p.year}
                    </span>
                  </button>
                ))}
                <div
                  className="mo pjm"
                  data-r
                  style={{ "--i": 4 } as React.CSSProperties}
                >
                  + 3 more production systems ↗
                </div>
              </div>

              {/* Dynamic Preview Card */}
              <div className="pv" id="pv" ref={pvRef} data-r="s">
                <div className="pm mo">
                  <span id="pm1">{activeP.title.toLowerCase()}</span>
                  <span>case file</span>
                </div>
                <div
                  className="pb"
                  id="pb"
                  dangerouslySetInnerHTML={{ __html: activeP.big }}
                />
                <div className="pf mo">
                  <span id="pt">{activeP.tags.join(" · ")}</span>
                  <span>
                    <Link href={`/work/${activeP.slug}`}>Case Study ↗</Link>
                    {" · "}
                    <a
                      href={activeP.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo ↗
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 07: CREDENTIALS (--t-s)
           ============================================================ */}
        <section id="credentials" className="t-s">
          <div className="c">
            <div className="lb mo">
              <span>(07) — Credentials</span>
              <span>Industry accreditations</span>
            </div>

            <h2
              className="h2"
              style={{ marginBottom: "clamp(28px, 5vh, 56px)" }}
            >
              <span className="num" style={{ display: "inline" }} data-n="13">
                0
              </span>{" "}
              <em className="sf">credentials.</em>
            </h2>

            <div id="cl">
              {(credPage === 1 ? CREDENTIALS_PAGE1 : CREDENTIALS_PAGE2).map(
                (c, idx) => (
                  <a
                    key={c.title + idx}
                    className="cr"
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-r
                    style={{ "--i": idx } as React.CSSProperties}
                  >
                    <span className="mo">{c.date}</span>
                    <span className="mo">{c.category}</span>
                    <b>{c.title}</b>
                    <span className="mo">{c.issuer}</span>
                    <span className="mo" style={{ textAlign: "right" }}>
                      <b style={{ fontSize: "13px" }}>Verify ↗</b>
                    </span>
                  </a>
                )
              )}
            </div>

            <div className="fl mo">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setCredPage(credPage === 1 ? 2 : 1)}
              >
                {credPage === 1 ? "+ 5 more" : "← 8 core"}
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setCredPage(credPage === 1 ? 2 : 1)}
              >
                Page 0{credPage} / 02 · {credPage === 1 ? "Next →" : "← Prev"}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 08: EXPERIENCE (--t-k)
           ============================================================ */}
        <section id="experience" className="t-k">
          <div className="c">
            <div className="lb mo">
              <span>(08) — Experience</span>
              <span>2+ years building resilient systems</span>
            </div>

            <h2
              className="h2 sm"
              style={{
                maxWidth: "11em",
                marginBottom: "clamp(28px, 5vh, 56px)",
              }}
            >
              <span className="ln">
                <i>Industry track record</i>
              </span>
              <span className="ln">
                <i>
                  in engineering <em className="sf">&amp; QA.</em>
                </i>
              </span>
            </h2>

            <div id="ex">
              {EXPERIENCES.map((x, idx) => (
                <div
                  key={idx}
                  className="xr"
                  data-r
                  style={{ "--i": idx } as React.CSSProperties}
                >
                  <div
                    className="yr"
                    style={{ "--i": idx } as React.CSSProperties}
                  >
                    {x.year}
                  </div>
                  <div>
                    <h3>{x.company}</h3>
                    <div
                      className="mo"
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        marginTop: "6px",
                      }}
                    >
                      {x.role}
                    </div>
                    <p>{x.summary}</p>
                  </div>
                  <div>
                    <div
                      className="mo"
                      style={{
                        fontSize: "12px",
                        color: "var(--mu)",
                        marginBottom: "12px",
                      }}
                    >
                      {x.location}
                    </div>
                    <div className="tags mo" style={{ padding: 0 }}>
                      {x.tech.map((t) => (
                        <span key={t} className="tg">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 09: CONTACT (--t-o)
           ============================================================ */}
        <section id="contact" className="t-o">
          <div className="c">
            <div className="lb mo">
              <span>(09) — Contact</span>
              <span id="ck">{clockString}</span>
            </div>

            <h2 className="h2 xl">
              <span className="ln">
                <i>Have a project</i>
              </span>
              <span className="ln">
                <i>
                  in <em className="sf">mind?</em>
                </i>
              </span>
            </h2>

            <p className="pp mo" data-r>
              Let&apos;s engineer something clear, resilient, and impactful together.
            </p>

            <div
              className="bs"
              data-r
              style={{ "--i": 1 } as React.CSSProperties}
            >
              <a
                className="bt k"
                data-mg
                href={`mailto:${profile.email}`}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                {profile.email} ↗
              </a>
              <a
                className="bt"
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
                className="bt"
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

            <div className="fl mo">
              <span>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#stack">Stack</a>
                <a href="#work">Work</a>
                <a href="#experience">Experience</a>
              </span>
              <span>
                © 2026 Mohammad Kevin Arif Rudianto. Built with Next.js 16 &amp;
                React 19.
              </span>
              <a href="#hero">Back to top ↑</a>
            </div>
          </div>

          {/* Giant Outlined Typography */}
          <div className="big" aria-hidden="true">
            Corecraft
          </div>
        </section>
      </main>
    </>
  );
}
