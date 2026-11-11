"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { education, certificates, profile } from "@/data";
import { ProjectMockup } from "@/components/ProjectMockup";

/* ---------- Section Data (Corecraft — Final v11 + Education) ---------- */

const SERVICES = [
  {
    title: "Backend & RESTful API Architecture",
    desc: "Modular APIs with NestJS & Express, DTO validation, JWT/OAuth2 authentication and OpenAPI/Swagger documentation. Every endpoint is designed to stay predictable as the product grows.",
    tags: ["NestJS", "Express.js", "Node.js", "OpenAPI", "Postman"],
    preview: (
      <>
        <s>GET</s> /v1/orders <u>200</u>
        <br />
        <s>POST</s> /v1/auth/login <u>201</u>
        <br />
        <s>PATCH</s> /v1/stock/42 <u>200</u>
        <br />
        <s>GET</s> /docs · OpenAPI 3.1
      </>
    ),
  },
  {
    title: "Database Engineering & Query Tuning",
    desc: "Relational schema design, indexing and query optimization built for surge traffic.",
    tags: ["PostgreSQL", "MySQL", "Prisma ORM"],
    preview: (
      <>
        CREATE TABLE <s>orders</s> (<br />
        &nbsp; id <u>uuid PK</u>,<br />
        &nbsp; sku <u>text INDEX</u>,<br />
        &nbsp; qty <u>int CHECK</u>,<br />
        &nbsp; ts <u>timestamptz</u>
        <br />
        );
      </>
    ),
  },
  {
    title: "Fullstack Web Applications",
    desc: "Clean, intuitive interfaces on top of strict API contracts.",
    tags: ["Next.js", "React", "TypeScript"],
    preview: (
      <>
        <s>page.tsx</s>
        <br />
        → fetch(/v1/orders)
        <br />
        → typed DTO contract
        <br />
        → render <u>OrderTable</u>
        <br />→ optimistic UI sync
      </>
    ),
  },
  {
    title: "POS & Inventory Management Systems",
    desc: "Transaction-safe stock and sales flows with barcode scanning and invoicing.",
    tags: ["Express.js", "MySQL"],
    preview: (
      <>
        <s>INV-0042</s>
        <br />
        Item A ×2 ...... 40.000
        <br />
        Item B ×1 ...... 25.000
        <br />
        ────────────────
        <br />
        TOTAL <u>65.000</u>
        <br />
        stock −3 · committed
      </>
    ),
  },
  {
    title: "Digital Document & Archive Systems",
    desc: "Structured archiving with file encryption and role-based access control.",
    tags: ["PostgreSQL", "RBAC"],
    preview: (
      <>
        <s>/archive</s>
        <br />
        ├ contracts/ <u>locked</u>
        <br />
        ├ invoices/ <u>RBAC</u>
        <br />
        └ reports/ <u>encrypted</u>
      </>
    ),
  },
  {
    title: "Payment Gateway & Third-Party Integrations",
    desc: "Webhook-safe payments and external integrations with retry handling.",
    tags: ["Webhooks", "REST"],
    preview: (
      <>
        <s>checkout</s> → gateway
        <br />
        webhook <u>payment.paid</u>
        <br />
        retry ×3 · exponential backoff
        <br />
        idempotency-key ✓
      </>
    ),
  },
];

const PROCESS_STEPS = [
  {
    title: "Schema",
    eyebrow: "ERD · Indexes · Constraints",
    desc: "Start at the data model: relational design, indexes and constraints that hold under load.",
    bg: "#f5f1ea",
    fg: "#0a0a0f",
    height: "34%",
    isDark: false,
  },
  {
    title: "Contract",
    eyebrow: "DTO · OpenAPI · Types",
    desc: "Strict TypeScript, DTO validation and OpenAPI docs before any interface is drawn.",
    bg: "#e8edff",
    fg: "#0a0a0f",
    height: "54%",
    isDark: false,
  },
  {
    title: "Build",
    eyebrow: "Tests · Caching · Transactions",
    desc: "Transactional isolation, predictable caching and automated API tests with Postman and Playwright.",
    bg: "#2440ff",
    fg: "#ffffff",
    height: "76%",
    isDark: true,
  },
  {
    title: "Ship",
    eyebrow: "Deploy · Monitor · Iterate",
    desc: "Deploy, monitor and iterate with uptime as the first requirement.",
    bg: "#ff4d12",
    fg: "#0a0a0f",
    height: "100%",
    isDark: false,
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

const STACK_COLORS: Record<"B" | "F" | "D" | "T", string> = {
  B: "#ff4d12",
  F: "#2440ff",
  D: "#0a0a0f",
  T: "#c9d2ff",
};

const FEATURED_PROJECTS = [
  {
    title: "Smart Space Booking & Management",
    category: "Fullstack",
    year: 2026,
    bg: "#2440ff",
    fg: "#ffffff",
    isDark: true,
    domain: "smartspace/booking",
    headlineLead: "Smart Space ",
    headlineEmphasis: "Booking",
    tags: ["Express.js", "MySQL", "Prisma ORM"],
    slug: "worknest",
    liveDemo: "https://booking.corecraft.my.id",
  },
  {
    title: "Outer.Co — Boutique Florist",
    category: "E-Commerce",
    year: 2025,
    bg: "#ff4d12",
    fg: "#0a0a0f",
    isDark: false,
    domain: "outer.co",
    headlineLead: "We sell ",
    headlineEmphasis: "happiness",
    tags: ["Next.js 16", "TypeScript", "Cloudinary"],
    slug: "outerco",
    liveDemo: "https://outerco.id",
  },
  {
    title: "InvDocs — Digital Archive & Document Workflow",
    category: "Fullstack",
    year: 2025,
    bg: "#0a0a0f",
    fg: "#ffffff",
    isDark: true,
    domain: "invdocs/archive",
    headlineLead: "Inv",
    headlineEmphasis: "Docs",
    tags: ["Next.js", "Express.js", "PostgreSQL"],
    slug: "invdocs",
    liveDemo: "https://github.com/MohammadKevin/InvDocs-Archive",
  },
  {
    title: "CorePOS — Engine",
    category: "Fullstack",
    year: 2025,
    bg: "#e8edff",
    fg: "#0a0a0f",
    isDark: false,
    domain: "corepos/terminal",
    headlineLead: "Core",
    headlineEmphasis: "POS",
    tags: ["React.js", "Express.js", "MySQL"],
    slug: "corepos",
    liveDemo: "https://github.com/MohammadKevin",
  },
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
    bg: "#ff4d12",
    fg: "#0a0a0f",
  },
  {
    year: "2025—",
    company: "CoreCraft",
    role: "Freelance & Backend Developer",
    summary:
      "Building resilient web platforms, transactional backends, and custom management systems for businesses under the CoreCraft studio.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma ORM", "TypeScript"],
    location: "Remote",
    bg: "#2440ff",
    fg: "#ffffff",
  },
  {
    year: "2024—",
    company: "SMK Telkom Malang",
    role: "Software Engineering Student",
    summary:
      "Studying core computer science principles, database modeling, object-oriented design, and enterprise application architectures.",
    tags: ["PHP", "Node.js", "MySQL", "JavaScript"],
    location: "Malang, Indonesia",
    bg: "#0a0a0f",
    fg: "#ffffff",
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
  "Education",
  "Contact",
];
const SECTION_IDS = SECTIONS.map((s) => s.toLowerCase());

const ABOUT_HEADLINE_TEXT =
  "Architecting high-concurrency backend backbones, resilient API contracts, and query-optimized data systems — paired with modern, human-centered interfaces.";

const CREDENTIAL_GROUPS = [
  [0, 1, 2, 3, 12],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
];

const TOTAL_SECTIONS_STR = String(SECTIONS.length).padStart(2, "0");

function getCredentialAccent(issuer: string, category: string) {
  if (issuer === "HackerRank") return "#2440ff";
  if (/Hackathon|Competition/i.test(category)) return "#ff4d12";
  return "#0a0a0f";
}

function TickStrip({ text }: { text: string }) {
  const repeated = `${text} `.repeat(6);
  return (
    <div className="tick mo">
      <div>
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  );
}

export default function Home() {
  /* ---------- States ---------- */
  const [preloaderPercent, setPreloaderPercent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeExperience, setActiveExperience] = useState(0);
  const [educationFilter, setEducationFilter] = useState<
    "all" | "formal" | "non-formal"
  >("all");
  const [clockString, setClockString] = useState("--:--:-- WIB · Malang");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [workIndex, setWorkIndex] = useState(0);

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
  const rtRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTmoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionTopsRef = useRef<number[]>([]);
  const hasStartedRef = useRef(false);
  const expHoverRef = useRef(false);

  const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  const isCompactMode = () =>
    typeof window !== "undefined" &&
    (window.innerWidth <= 1024 || window.innerHeight <= 680);

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

  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isCompactMode()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
  };

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(profile.email);
    } catch {
      // clipboard unavailable
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1800);
  };

  const scrollWorkCarousel = (dir: -1 | 1) => {
    const wt = wtRef.current;
    if (!wt) return;
    const step = Math.min(wt.clientWidth * 0.85, 520);
    wt.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  /* ---------- Filtered Education Data ---------- */
  const formalItems = useMemo(
    () => education.filter((item) => item.type === "formal"),
    []
  );
  const nonFormalItems = useMemo(
    () => education.filter((item) => item.type === "non-formal"),
    []
  );

  /* ---------- Boot Preloader & Engine (Loading Screen Kept Intact) ---------- */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("an");

    if (
      typeof window !== "undefined" &&
      (window as unknown as { chrome?: unknown }).chrome
    ) {
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
          recalculateTops();
          window.dispatchEvent(new Event("scroll"));
        }, 450);
      }
    }, 70);

    const fallbackTimeout = setTimeout(() => {
      if (!hasStartedRef.current) {
        document.body.classList.add("rd");
        hasStartedRef.current = true;
        recalculateTops();
        window.dispatchEvent(new Event("scroll"));
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
      const time = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Jakarta",
      });
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
      if (isCompactMode()) return;
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

  /* ---------- Pointer Specular Highlight on Liquid Glass (.g) ---------- */
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

  /* ---------- Credentials Vertical Loop Marquee (Desktop Only) ---------- */
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

    const syncMarqueeState = () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced || isCompactMode()) {
        anims.forEach((a) => {
          a.pause();
          a.currentTime = 0;
        });
      } else {
        anims.forEach((a) => a.play());
      }
    };

    syncMarqueeState();
    window.addEventListener("resize", syncMarqueeState);
    marqueeAnimsRef.current = anims;

    return () => {
      window.removeEventListener("resize", syncMarqueeState);
      anims.forEach((a) => a.cancel());
    };
  }, []);

  /* ---------- Experience Auto-Cycle (Desktop In-View) ---------- */
  useEffect(() => {
    const timer = setInterval(() => {
      if (expHoverRef.current || isCompactMode()) return;
      const expSection = document.getElementById("experience");
      if (expSection?.classList.contains("in")) {
        setActiveExperience((prev) => (prev + 1) % EXPERIENCES.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  /* ---------- Scroll Engine: Parallax, Work Horizontal, In-View, Progress ---------- */
  useEffect(() => {
    let q = 0;

    const handleScroll = () => {
      q = 0;
      const y = window.scrollY;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const vh = window.innerHeight;
      const compact = isCompactMode();

      if (barRef.current) {
        barRef.current.style.transform = `scaleY(${totalH > 0 ? y / totalH : 0})`;
      }

      if (!compact) {
        const v = Math.min(Math.abs(y - lyRef.current), 80);
        lyRef.current = y;
        marqueeAnimsRef.current.forEach((a) => {
          if (a && a.playState === "running") a.playbackRate = 1 + v / 4;
        });
        if (rtRef.current) clearTimeout(rtRef.current);
        rtRef.current = setTimeout(() => {
          marqueeAnimsRef.current.forEach((a) => {
            if (a && a.playState === "running") a.playbackRate = 1;
          });
        }, 150);
      }

      const secs = Array.from(document.querySelectorAll<HTMLElement>("section"));
      secs.forEach((s, i) => {
        const nx = secs[i + 1];
        const own = s.getBoundingClientRect().top;
        const nt = nx ? nx.getBoundingClientRect().top : 1e9;

        s.style.setProperty(
          "--x",
          compact || !nx ? "0" : cl(1 - nt / vh).toFixed(3)
        );

        const vis = compact
          ? hasStartedRef.current && own < vh * 0.88 && nt > vh * 0.1
          : hasStartedRef.current && own <= vh * 0.55 && nt > vh * 0.45;

        if (vis !== s.classList.contains("in")) {
          s.classList.toggle("in", vis);
          if (vis) {
            s.querySelectorAll<HTMLElement>("[data-n]").forEach(animateCount);
          }
        }
      });

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
              i < words.length * cl((vh * 0.7 - a.top) / (vh * 0.5)));
          w.classList.toggle("on", isHighlighted);
        });
      }

      const pin = pinRef.current;
      const wt = wtRef.current;
      const pb = pbRef.current;
      const cn = cnRef.current;
      if (pin && wt && !compact) {
        const pr = pin.getBoundingClientRect();
        const denom = Math.max(1, pr.height - vh);
        const wp = cl(-pr.top / denom);
        const max = Math.max(0, wt.scrollWidth - window.innerWidth + 16);
        wt.style.transform = `translateX(${-wp * max}px)`;
        if (pb) {
          pb.style.setProperty("--wp", wp.toFixed(3));
        }

        const cards = Array.from(wt.querySelectorAll<HTMLElement>(".wc"));
        const wi = Math.min(
          cards.length - 1,
          Math.round(wp * (cards.length - 1))
        );
        cards.forEach((c, j) => {
          c.classList.toggle("act", j === wi);
          const r = c.getBoundingClientRect();
          c.style.setProperty(
            "--tx2",
            ((r.left + r.width / 2 - window.innerWidth / 2) * -0.12).toFixed(
              1
            ) + "px"
          );
        });
        if (cn) {
          cn.textContent = `0${Math.min(wi + 1, 7)} / 07`;
        }
      } else if (wt && compact) {
        wt.style.transform = "";
      }

      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const c = contactEl.getBoundingClientRect();
        contactEl.style.setProperty(
          "--fl",
          cl((vh * 0.95 - c.top) / (vh * 0.55)).toFixed(3)
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

  /* ---------- Track Horizontal Scroll Counter on Mobile/Tablet ---------- */
  useEffect(() => {
    const wt = wtRef.current;
    if (!wt) return;

    const onTrackScroll = () => {
      if (!isCompactMode()) return;
      const cards = Array.from(wt.querySelectorAll<HTMLElement>(".wc"));
      if (cards.length === 0) return;
      const center = wt.scrollLeft + wt.clientWidth / 2;
      let closest = 0;
      let bestDist = Infinity;
      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const d = Math.abs(cardCenter - center);
        if (d < bestDist) {
          bestDist = d;
          closest = idx;
        }
      });
      setWorkIndex(closest);
      if (cnRef.current) {
        cnRef.current.textContent = `0${Math.min(closest + 1, 7)} / 07`;
      }
    };

    wt.addEventListener("scroll", onTrackScroll, { passive: true });
    return () => wt.removeEventListener("scroll", onTrackScroll);
  }, []);

  /* ---------- Desktop Magnetic Settle to Full-Screen Sections ---------- */
  useEffect(() => {
    const handleSettle = () => {
      if (isCompactMode() || !hasStartedRef.current) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const tops = sectionTopsRef.current;
      const workEl = document.getElementById("work");
      if (!workEl || tops.length === 0) return;

      const wi = SECTION_IDS.indexOf("work");
      const ws = tops[wi];
      const we = ws + workEl.offsetHeight - vh;

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

  /* Close menu on Escape & lock scroll when open */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

      {/* ---------- Existing Loading Screen (Kept Unchanged) ---------- */}
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

      {/* ---------- Vertical Scroll Progress Bar ---------- */}
      <i id="bar" ref={barRef}></i>

      {/* ---------- Fixed Header Brand Logo & Menu Button ---------- */}
      <a className="lg" href="#hero" aria-label="Corecraft — Scroll to top">
        Corecraft<i>/</i>
      </a>

      <button
        type="button"
        className="g mb"
        id="mb"
        aria-expanded={menuOpen}
        aria-controls="mn"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <u></u>
        <span id="mt">{menuOpen ? "Close" : "Menu"}</span>
      </button>

      {/* ---------- Fullscreen Glass Navigation Overlay ---------- */}
      <nav id="mn" className={menuOpen ? "open" : ""} aria-label="Navigasi">
        {SECTIONS.map((sec, i) => (
          <a
            key={sec}
            href={`#${SECTION_IDS[i]}`}
            style={{ "--i": i } as React.CSSProperties}
            onClick={() => setMenuOpen(false)}
          >
            <span className="mo">{String(i + 1).padStart(2, "0")}</span>
            {sec}
          </a>
        ))}
      </nav>

      <main className="home-main">
        {/* ============================================================
            01 / HERO (Final v11)
           ============================================================ */}
        <section id="hero" data-l="Hero">
          <div className="lip g nf mo">
            <b>01 / {TOTAL_SECTIONS_STR} — Hero</b>
            <span>Malang, East Java · 2026</span>
          </div>

          <div className="c">
            <div className="hm mo">
              <span
                className="g chip nf"
                data-r
                style={{ "--i": 4 } as React.CSSProperties}
              >
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

              {/* 3D Interactive Tilt API Spec Card (Final v11) */}
              <div
                className="tw"
                data-r="s"
                style={{ "--i": 8 } as React.CSSProperties}
              >
                <div className="g card" id="tl" ref={tlCardRef}>
                  <div className="ch1 mo">
                    <span>
                      <b>POST</b> /v1/hello
                    </span>
                    <span style={{ color: "var(--od)", fontWeight: 600 }}>
                      201 Created
                    </span>
                  </div>
                  <div className="cb1 mo">
                    {"{"} &quot;engineer&quot;: <s>&quot;Kevin Arif Rudianto&quot;</s>,
                    <br />
                    &nbsp; &quot;builds&quot;: [<u>&quot;APIs&quot;</u>,{" "}
                    <u>&quot;POS&quot;</u>, <u>&quot;Archives&quot;</u>],
                    <br />
                    &nbsp; &quot;stack&quot;: [<s>&quot;NestJS&quot;</s>,{" "}
                    <s>&quot;PostgreSQL&quot;</s>],
                    <br />
                    &nbsp; &quot;uptime&quot;: <u>&quot;99.9%&quot;</u> {"}"}
                  </div>
                  <div className="bars" aria-hidden="true">
                    {[40, 62, 48, 78, 55, 90, 66, 72, 50, 84, 60, 70].map(
                      (h, k) => (
                        <i
                          key={k}
                          style={
                            { "--h": `${h}%`, "--k": k } as React.CSSProperties
                          }
                        />
                      )
                    )}
                  </div>
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
                    href="#contact"
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
                {profile.socials.map((s, idx) => (
                  <React.Fragment key={s.label}>
                    {idx > 0 ? " · " : null}
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.label}
                    </a>
                  </React.Fragment>
                ))}
                <br />
                Scroll ↓
              </div>
            </div>
          </div>

          <TickStrip text="BACKEND ✱ FULLSTACK ✱ APIS ✱ POS SYSTEMS ✱ DIGITAL ARCHIVES ✱ MALANG, EAST JAVA ✱" />
        </section>

        {/* ============================================================
            02 / ABOUT (Final v11)
           ============================================================ */}
        <section id="about" data-l="About">
          <div className="lip g nf mo">
            <b>02 / {TOTAL_SECTIONS_STR} — About</b>
            <span>Engineering philosophy &amp; metrics</span>
          </div>

          <div className="c">
            <div className="ob2" data-r="c">
              <span className="gh">02</span>
              <div className="g ph mo">
                <Image
                  src={profile.avatar}
                  alt={profile.fullName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-top select-none"
                />
              </div>
              <div className="g cap mo nf">
                {profile.fullName}
                <br />
                {profile.role}
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
                      style={{ "--k": idx } as React.CSSProperties}
                    >
                      {w}
                    </span>{" "}
                  </React.Fragment>
                ))}
              </h2>

              <div className="ap">
                <p data-r>{profile.aboutText}</p>

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
                      fontSize: "clamp(17px, 2vw, 30px)",
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

          <TickStrip text="SCHEMA ✱ CONTRACT ✱ BUILD ✱ SHIP ✱ STRICT TYPESCRIPT ✱ TRANSACTIONAL ISOLATION ✱ PREDICTABLE CACHING ✱" />
        </section>

        {/* ============================================================
            03 / SERVICES (Final v11 Cobalt Expanding Planks + Code Illustration)
           ============================================================ */}
        <section id="services" data-l="Services">
          <div className="lip g nf mo">
            <b>03 / {TOTAL_SECTIONS_STR} — Services</b>
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
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    onClick={() => setActiveService(i)}
                    onMouseEnter={() => setActiveService(i)}
                    onFocus={() => setActiveService(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveService(i);
                      }
                    }}
                  >
                    <span className="nn mo">0{i + 1}</span>
                    <span className="vt">{s.title}</span>
                    <div className="in2">
                      <div className="i2l">
                        <div className="gn">0{i + 1}</div>
                        <div>
                          <h3>{s.title}</h3>
                          <div className="g k nf">
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
                      <div className="i2r">
                        <div className="g k nf ill mo">{s.preview}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <TickStrip text="BACKEND & REST APIS ✱ DATABASE ENGINEERING ✱ FULLSTACK WEB ✱ POS & INVENTORY ✱ DOCUMENT ARCHIVES ✱ PAYMENT INTEGRATIONS ✱" />
        </section>

        {/* ============================================================
            04 / PROCESS (Final v11 Colored Stairs)
           ============================================================ */}
        <section id="process" data-l="Process">
          <div className="lip g nf mo">
            <b>04 / {TOTAL_SECTIONS_STR} — Process</b>
            <span>How a build goes</span>
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
                    <span className="mo">{p.eyebrow}</span>
                    <h3>{p.title}</h3>
                    <div className={`g nf${p.isDark ? " k" : ""}`}>
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <TickStrip text="SCHEMA ✱ CONTRACT ✱ BUILD ✱ SHIP ✱ UPTIME AS THE FIRST REQUIREMENT ✱ MEASURE ✱ ITERATE ✱" />
        </section>

        {/* ============================================================
            05 / STACK (Final v11)
           ============================================================ */}
        <section id="stack" data-l="Stack">
          <div className="lip g nf mo">
            <b>05 / {TOTAL_SECTIONS_STR} — Stack</b>
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
            <i
              className="k-b"
              style={{ position: "absolute", display: "block" }}
            />
          </div>

          <div className="c">
            <div className="hd">
              <h2
                className="ttl"
                style={{ fontSize: "clamp(26px, min(4.4vw, 8vh), 68px)" }}
              >
                <span className="ln">
                  <i>
                    A battle-tested stack{" "}
                    <em className="sf">built for scale.</em>
                  </i>
                </span>
              </h2>
              <p data-r>
                Reliability and scale, from the runtime to the deploy target.
              </p>
            </div>

            <div className="kl mo" data-r>
              <span style={{ "--cc": "#ff4d12" } as React.CSSProperties}>
                <i></i>Backend
              </span>
              <span style={{ "--cc": "#2440ff" } as React.CSSProperties}>
                <i></i>Frontend
              </span>
              <span style={{ "--cc": "#0a0a0f" } as React.CSSProperties}>
                <i></i>Data
              </span>
              <span style={{ "--cc": "#c9d2ff" } as React.CSSProperties}>
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
                      "--cc": STACK_COLORS[t[2]],
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

          <TickStrip text="NESTJS ✱ EXPRESS ✱ NODE.JS ✱ TYPESCRIPT ✱ NEXT.JS 16 ✱ REACT 19 ✱ POSTGRESQL ✱ MYSQL ✱ PRISMA ✱ REDIS ✱ SUPABASE ✱" />
        </section>

        {/* ============================================================
            06 / WORK (Final v11 Browser Mockup Cards + Responsive Carousel)
           ============================================================ */}
        <section id="work" data-l="Work">
          <div className="pin" id="pin" ref={pinRef}>
            <div className="pkw">
              <div className="lip g nf mo">
                <b>06 / {TOTAL_SECTIONS_STR} — Work</b>
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
                    Scroll or swipe to move through selected systems — each one
                    a deployed, production-ready build.
                  </p>
                </div>

                <div className="wt" id="wt" ref={wtRef}>
                  {FEATURED_PROJECTS.map((p, i) => (
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

                      <div className="wmid">
                        <div className="wb">
                          {p.headlineLead}
                          <em>{p.headlineEmphasis}</em>
                        </div>
                        <ProjectMockup
                          slug={p.slug}
                          title={p.title}
                          domain={p.domain}
                          compact
                        />
                      </div>

                      <div className={`g wi${p.isDark ? " k" : ""}`}>
                        <b>{p.title}</b>
                        <div className="tags mo">
                          {p.tags.map((t) => (
                            <span key={t} className="tg">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="mo wi-links">
                          <Link href={`/work/${p.slug}`}>Case Study ↗</Link>
                          <span>·</span>
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

                  <Link href="/work" className="wc more">
                    <div
                      className="wb"
                      style={{ fontSize: "clamp(32px, 4.6vw, 68px)" }}
                    >
                      +3 more
                      <br />
                      <em>systems ↗</em>
                    </div>
                    <span
                      className="mo"
                      style={{ fontSize: "12px", color: "var(--mu)" }}
                    >
                      View all 07 production case studies →
                    </span>
                  </Link>
                </div>

                <div className="pb" ref={pbRef}>
                  <i></i>
                </div>

                <div className="work-controls mo">
                  <span style={{ fontSize: "11px", color: "var(--mu)" }}>
                    Swipe cards · 0{Math.min(workIndex + 1, 5)} / 05
                  </span>
                  <div className="work-nav-btns">
                    <button
                      type="button"
                      className="g chip"
                      onClick={() => scrollWorkCarousel(-1)}
                      aria-label="Previous project"
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      className="g chip"
                      onClick={() => scrollWorkCarousel(1)}
                      aria-label="Next project"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>

              <TickStrip text="SMART SPACE BOOKING ✱ OUTER.CO ✱ INVDOCS ✱ COREPOS ✱ 07 PRODUCTION SYSTEMS DELIVERED ✱ 100% ARCHITECTURE INTEGRITY ✱" />
            </div>
          </div>
        </section>

        {/* ============================================================
            07 / CREDENTIALS (Final v11 Color-Coded Triple Marquee)
           ============================================================ */}
        <section id="credentials" data-l="Credentials">
          <div className="lip g nf mo">
            <b>07 / {TOTAL_SECTIONS_STR} — Credentials</b>
            <span>13 verified accreditations</span>
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
            <i
              className="c-n"
              style={{ position: "absolute", display: "block" }}
            >
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
              {CREDENTIAL_GROUPS.map((group, colIdx) => (
                <div key={colIdx} className="cc">
                  {[
                    ...group.map((idx) => ({ idx, dup: false })),
                    ...group.map((idx) => ({ idx, dup: true })),
                  ].map(({ idx, dup }, itemIdx) => {
                    const cert = certificates[idx];
                    if (!cert) return null;
                    const accent = getCredentialAccent(
                      cert.issuer,
                      cert.category
                    );
                    return (
                      <div
                        key={`${cert.id}-${itemIdx}`}
                        className={`g nf ct${dup ? " ct-dup" : ""}`}
                        style={{ "--cc": accent } as React.CSSProperties}
                      >
                        <span className="mo">
                          <span>{cert.date}</span>
                          <span>{cert.category}</span>
                        </span>
                        <b>{cert.title}</b>
                        <span className="mo">
                          <span>{cert.issuer}</span>
                          {cert.url ? (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "var(--ink)", fontWeight: 700 }}
                            >
                              Verify ↗
                            </a>
                          ) : (
                            <span
                              style={{ color: "var(--od)", fontWeight: 600 }}
                            >
                              Awarded
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <TickStrip text="HACKERRANK ✱ DICODING ✱ HMSE TELKOM UNIVERSITY ✱ FORUM BISNIS CENDEKIA ✱ 13 INDUSTRY ACCREDITATIONS ✱" />
        </section>

        {/* ============================================================
            08 / EXPERIENCE (Final v11 Color Wipe Planks)
           ============================================================ */}
        <section id="experience" data-l="Experience">
          <div className="lip g nf mo">
            <b>08 / {TOTAL_SECTIONS_STR} — Experience</b>
            <span>2+ years building resilient systems</span>
          </div>

          <div className="c">
            <div className="hd">
              <h2 className="ttl">
                <span className="ln">
                  <i>
                    Track record{" "}
                    <em className="sf">in engineering &amp; QA.</em>
                  </i>
                </span>
              </h2>
              <p data-r>
                Industry experience across quality assurance, freelance backend
                work and software engineering delivery.
              </p>
            </div>

            <div className="xl2" id="ex">
              {EXPERIENCES.map((x, i) => {
                const isActive = activeExperience === i;
                return (
                  <div
                    key={x.company}
                    className={`xb${isActive ? " act" : ""}`}
                    style={
                      {
                        "--bc": x.bg,
                        "--bf": x.fg,
                      } as React.CSSProperties
                    }
                    onClick={() => setActiveExperience(i)}
                    onMouseEnter={() => {
                      expHoverRef.current = true;
                      setActiveExperience(i);
                    }}
                    onMouseLeave={() => {
                      expHoverRef.current = false;
                    }}
                  >
                    <i className="bar"></i>
                    <div className="xh">
                      <b>{x.company}</b>
                      <span className="yy mo">{x.year}</span>
                    </div>
                    <div className="xd">
                      <div>
                        <div
                          className={`g xx${x.fg === "#ffffff" ? " k" : ""}`}
                        >
                          <div
                            className="mo"
                            style={{
                              fontSize: "11px",
                              opacity: 0.82,
                              marginBottom: "6px",
                            }}
                          >
                            {x.location}
                          </div>
                          <h4>{x.role}</h4>
                          <p>{x.summary}</p>
                          {x.tags.length > 0 ? (
                            <div className="tags mo">
                              {x.tags.map((t) => (
                                <span key={t} className="tg">
                                  {t}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <TickStrip text="SIDIGS ✱ CORECRAFT ✱ SMK TELKOM MALANG ✱ 2+ YEARS BUILDING RESILIENT SYSTEMS ✱ QUALITY ASSURANCE ✱ BACKEND ✱" />
        </section>

        {/* ============================================================
            09 / EDUCATION (Formal & Non-Formal Education History)
           ============================================================ */}
        <section id="education" data-l="Education">
          <div className="lip g nf mo">
            <b>09 / {TOTAL_SECTIONS_STR} — Education</b>
            <span>Riwayat Pendidikan Formal &amp; Non-Formal</span>
          </div>

          <div className="c">
            <div className="hd">
              <h2
                className="ttl"
                style={{ fontSize: "clamp(28px, min(5vw, 8.6vh), 82px)" }}
              >
                <span className="ln">
                  <i>
                    Formal &amp; non-formal{" "}
                    <em className="sf">education.</em>
                  </i>
                </span>
              </h2>
              <p data-r>
                Riwayat pendidikan formal sekolah serta jalur non-formal melalui
                akademi pemrograman, sertifikasi peran, dan kompetisi nasional.
              </p>
            </div>

            <div className="edu-bar">
              <div
                className="edu-tabs mo"
                role="tablist"
                aria-label="Filter riwayat pendidikan"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={educationFilter === "all"}
                  className={`edu-tab${educationFilter === "all" ? " act" : ""}`}
                  onClick={() => setEducationFilter("all")}
                >
                  All ({education.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={educationFilter === "formal"}
                  className={`edu-tab${
                    educationFilter === "formal" ? " act-formal" : ""
                  }`}
                  onClick={() => setEducationFilter("formal")}
                >
                  Formal ({formalItems.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={educationFilter === "non-formal"}
                  className={`edu-tab${
                    educationFilter === "non-formal" ? " act-nonformal" : ""
                  }`}
                  onClick={() => setEducationFilter("non-formal")}
                >
                  Non-Formal ({nonFormalItems.length})
                </button>
              </div>

              <div className="edu-legend mo">
                <span>
                  <i style={{ background: "var(--cb)" }} /> Pendidikan Formal
                </span>
                <span>
                  <i style={{ background: "var(--o)" }} /> Pendidikan Non-Formal
                </span>
              </div>
            </div>

            {educationFilter === "all" ? (
              <div className="edu-grid">
                <div className="edu-col">
                  <div className="edu-col-head formal mo">
                    <span>Pendidikan Formal</span>
                    <span>0{formalItems.length}</span>
                  </div>
                  {formalItems.map((item) => (
                    <EducationCard key={item.id} item={item} />
                  ))}
                </div>

                <div className="edu-col">
                  <div className="edu-col-head non-formal mo">
                    <span>Pendidikan Non-Formal</span>
                    <span>0{nonFormalItems.length}</span>
                  </div>
                  {nonFormalItems.map((item) => (
                    <EducationCard key={item.id} item={item} compact />
                  ))}
                </div>
              </div>
            ) : (
              <div className="edu-grid single">
                {(educationFilter === "formal"
                  ? formalItems
                  : nonFormalItems
                ).map((item) => (
                  <EducationCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          <TickStrip text="PENDIDIKAN FORMAL ✱ SMK TELKOM MALANG ✱ SMPN 1 PURWOASRI ✱ NON-FORMAL ✱ DICODING INDONESIA ✱ HACKERRANK ✱ SELF-TAUGHT LABS ✱" />
        </section>

        {/* ============================================================
            10 / CONTACT (Final v11)
           ============================================================ */}
        <section id="contact" data-l="Contact">
          <div className="lip g nf mo">
            <b>10 / {TOTAL_SECTIONS_STR} — Contact</b>
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
            <i
              className="ctb"
              style={{ position: "absolute", display: "block" }}
            />
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
                gap: "clamp(8px, 1.8vh, 18px)",
                minHeight: 0,
              }}
            >
              <p
                className="mo"
                data-r
                style={{
                  margin: 0,
                  fontSize: "clamp(12px, 1.25vw, 17px)",
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
                  type="button"
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

            <div
              className="g cg4 mo nf"
              data-r="s"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              <div>
                <b>NAVIGATE</b>
                <a href="#about">About</a> · <a href="#services">Services</a> ·{" "}
                <Link href="/work">Work</Link> ·{" "}
                <a href="#education">Education</a>
              </div>
              <div>
                <b>ELSEWHERE</b>
                {profile.socials.map((s, idx) => (
                  <React.Fragment key={s.label}>
                    {idx > 0 ? " · " : null}
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.label}
                    </a>
                  </React.Fragment>
                ))}
              </div>
              <div>
                <b>LOCATION</b>
                Malang, East Java, ID
              </div>
              <div>
                <b>© 2026</b>
                {profile.fullName}
                <br />
                Built with Next.js 16 &amp; React 19 ·{" "}
                <a href="#hero">Back to top ↑</a>
              </div>
            </div>
          </div>

          <TickStrip text="AVAILABLE FOR NEW PROJECTS ✱ KVN4.200581@GMAIL.COM ✱ MALANG, EAST JAVA ✱ LET'S ENGINEER SOMETHING CLEAR ✱" />
        </section>
      </main>
    </>
  );
}

function EducationCard({
  item,
  compact = false,
}: {
  item: (typeof education)[number];
  compact?: boolean;
}) {
  const isFormal = item.type === "formal";
  const accent = isFormal ? "#2440ff" : "#ff4d12";

  return (
    <article
      className="g nf edu-card"
      style={{ "--ec": accent } as React.CSSProperties}
    >
      <div className="edu-card-top mo">
        <span className={`edu-badge ${item.type}`}>
          {isFormal ? "Formal" : "Non-Formal"}
        </span>
        <span>
          {item.period} · {item.status}
        </span>
      </div>

      <div>
        <h3>{item.institution}</h3>
        <p className="edu-program">{item.program}</p>
      </div>

      {!compact ? <p className="edu-summary">{item.summary}</p> : null}

      <ul className="edu-highlights">
        {(compact ? item.highlights.slice(0, 2) : item.highlights).map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>

      <div className="edu-card-foot mo">
        <div className="tags">
          {item.tags.slice(0, compact ? 3 : 5).map((t) => (
            <span key={t} className="tg">
              {t}
            </span>
          ))}
        </div>
        {item.verifyUrl ? (
          <a
            href={item.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: isFormal ? "var(--cb)" : "var(--od)",
            }}
          >
            Verify ↗
          </a>
        ) : (
          <span style={{ fontSize: "11px", color: "var(--mu)" }}>
            {item.location}
          </span>
        )}
      </div>
    </article>
  );
}
