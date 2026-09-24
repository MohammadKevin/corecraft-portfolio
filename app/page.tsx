"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Download, FileText, Server, Database, Monitor, 
  ShoppingCart, FolderClosed, RefreshCw, Send, 
  AlertCircle, Loader2, MapPin, Clock, Check
} from "lucide-react";
import { projectsData, Project } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { timelineLogs } from "@/data/timeline";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import { send as sendEmail } from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_rmat5kp";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_zt9llkk";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "3qW5e407vXhAIdlX5";

export default function Home() {
  const { lang } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [activeTab, setActiveTab] = useState<string>("backend");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [projectType, setProjectType] = useState("Proyek Baru");
  const emailAddress = "kvn4.200581@gmail.com";

  const t = translations.hero;

  useEffect(() => {
    fetch("/api/visit", { method: "POST" }).catch(() => {});
  }, []);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      })
      .catch(() => {});
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setFormStatus("loading");
    setErrorMsg("");

    try {
      await sendEmail(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        message: `[${projectType}]\n\n${form.message}`,
      }, PUBLIC_KEY);
      setFormStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("error");
      setErrorMsg(lang === "id" ? "Gagal mengirim pesan. Silakan coba via email langsung." : "Failed to send message. Please reach out directly via email.");
    }
  };

  const activeCategoryData = skillCategories.find((c) => c.id === activeTab) || skillCategories[0];
  
  const projectFilterOptions = [
    { key: "All", label: { id: "Semua", en: "All" } },
    { key: "Fullstack", label: { id: "Fullstack", en: "Fullstack" } },
    { key: "Backend", label: { id: "Backend", en: "Backend" } },
    { key: "Frontend", label: { id: "Frontend", en: "Frontend" } },
  ];

  const filteredProjects = projects.filter((p) => {
    if (!p.title) return false;
    return activeCategory === "All" || p.type.toLowerCase() === activeCategory.toLowerCase();
  });

  const servicesData = [
    {
      icon: Server,
      title: { id: "Backend & RESTful API", en: "Backend & RESTful API" },
      desc: {
        id: "API modular dengan NestJS & Express, DTO validation, otentikasi JWT/OAuth2, serta dokumentasi OpenAPI/Swagger.",
        en: "Modular APIs with NestJS & Express, DTO validation, JWT/OAuth2 authentication, and OpenAPI/Swagger documentation."
      }
    },
    {
      icon: Database,
      title: { id: "Database & Query Tuning", en: "Database & Query Tuning" },
      desc: {
        id: "Skema relasional PostgreSQL/MySQL efisien, query indexing terstruktur, migrasi Prisma ORM, dan in-memory Redis caching.",
        en: "Efficient relational PostgreSQL/MySQL schemas, structured query indexing, Prisma ORM migrations, and Redis caching."
      }
    },
    {
      icon: Monitor,
      title: { id: "Fullstack Web Apps", en: "Fullstack Web Apps" },
      desc: {
        id: "Aplikasi web end-to-end dengan Next.js App Router, React Server Components, TypeScript yang type-safe, dan Tailwind CSS.",
        en: "End-to-end web apps with Next.js App Router, React Server Components, type-safe TypeScript, and Tailwind CSS."
      }
    },
    {
      icon: ShoppingCart,
      title: { id: "POS & Inventory Systems", en: "POS & Inventory Systems" },
      desc: {
        id: "Sistem kasir multi-cabang, barcode scanner, mutasi stok realtime, struk digital, dan log audit transaksi akurat.",
        en: "Multi-branch cashier systems, barcode scanner, real-time stock mutation, digital invoices, and precise transaction audit logs."
      }
    },
    {
      icon: FolderClosed,
      title: { id: "Digital Archive & Records", en: "Digital Archive & Records" },
      desc: {
        id: "Arsip terstruktur, metadata tagging, kontrol akses berbasis peran (RBAC), serta penyimpanan berkas terenkripsi.",
        en: "Structured archiving, metadata tagging, role-based access control (RBAC), and encrypted file storage."
      }
    },
    {
      icon: RefreshCw,
      title: { id: "Third-Party API & Payments", en: "Third-Party API & Payments" },
      desc: {
        id: "Integrasi payment gateway (Midtrans/Xendit), webhook berprinsip idempotent, dan sinkronisasi data async.",
        en: "Payment gateway integration (Midtrans/Xendit), idempotent webhooks, and asynchronous data synchronization."
      }
    }
  ];

  const projectTypeOptions = [
    { id: "Proyek Baru", en: "New Project" },
    { id: "Tawaran Kerja", en: "Job Offer" },
    { id: "Konsultasi", en: "Consultation" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      
      {/* 1. HERO SECTION */}
      <section id="hero" aria-label="Hero" className="w-full min-h-screen flex flex-col justify-center items-center pt-24 pb-16 scroll-mt-28 bg-transparent">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center py-6 w-full">

          <h1 className="font-[family-name:var(--font-display)] text-[38px] sm:text-[52px] lg:text-[62px] leading-[1.12] tracking-tight font-extrabold text-[#1C1B1D] mb-6">
            {lang === "id" ? "Membangun Arsitektur API Scalable & Sistem Fullstack Modern." : "Architecting Scalable APIs & Modern Fullstack Systems."}
          </h1>

          <p className="text-lg leading-relaxed text-[#71717A] max-w-2xl mx-auto mb-10">
            {lang === "id" 
              ? "Lulusan & Rekayasawan Perangkat Lunak dari SMK Telkom Malang dengan fokus mendalam pada performa backend berlatensi rendah, sistem POS & inventaris terdistribusi, integrasi ORM efisien, serta API RESTful tangguh siap produksi."
              : "Software Engineer from SMK Telkom Malang focusing on low-latency backend performance, distributed POS & inventory systems, efficient ORM integration, and production-ready RESTful APIs."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-[#1C1B1D] hover:bg-black text-white px-8 py-3.5 text-sm font-semibold transition-all shadow-md active:scale-95">
              {t.contactBtn[lang]}
            </a>
            <Link href="/cv" className="liquid-glass inline-flex items-center justify-center rounded-full text-[#1C1B1D] border border-white/80 px-8 py-3.5 text-sm font-semibold hover:bg-white/90 transition-all shadow-xs active:scale-95">
              <FileText className="mr-2 w-4 h-4 text-[#1C1B1D]" />
              Curriculum Vitae
            </Link>
          </div>

          <div className="liquid-glass w-full max-w-3xl rounded-3xl p-6 sm:p-7 border border-white/80 shadow-md flex flex-wrap items-center justify-around gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-[#1C1B1D]">2+ Tahun</span>
              <span className="text-xs text-[#71717A] mt-0.5 font-medium">{lang === "id" ? "Pengalaman Praktis" : "Practical Experience"}</span>
            </div>
            <div className="w-1 h-8 bg-zinc-300/60 hidden sm:block rounded-full" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-[#1C1B1D]">10+ Proyek</span>
              <span className="text-xs text-[#71717A] mt-0.5 font-medium">{lang === "id" ? "Teruji & Terdistribusi" : "Tested & Distributed"}</span>
            </div>
            <div className="w-1 h-8 bg-zinc-300/60 hidden sm:block rounded-full" />
            <div className="flex flex-col items-center">
              <span className="text-base sm:text-lg font-bold text-sky-700">Next.js • NestJS • Prisma</span>
              <span className="text-xs text-[#71717A] mt-0.5 font-medium">Core Production Stack</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" aria-label="About" className="w-full py-24 bg-transparent scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="font-mono text-xs uppercase text-sky-700 font-semibold mb-2 block tracking-wider">
            {lang === "id" ? "TENTANG SAYA" : "ABOUT ME"}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[28px] sm:text-[38px] leading-tight font-bold text-[#1C1B1D] max-w-2xl mb-12 tracking-tight">
            {lang === "id" ? "Komitmen pada Performa, Ketepatan Logik & Kode Bersih" : "Committed to Performance, Precise Logic & Clean Code"}
          </h2>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 relative max-w-sm sm:max-w-md lg:max-w-none mx-auto w-full">
              <div className="liquid-glass w-full aspect-[4/5] rounded-3xl shadow-xl p-3 sm:p-3.5 border border-white/80 relative group">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-100/40">
                  <Image 
                    src="/images/logo.png" 
                    alt="Mohammad Kevin" 
                    fill 
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 440px, 480px" 
                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-500" 
                    priority 
                  />
                </div>
              </div>
              <div className="liquid-glass absolute -bottom-3 sm:-bottom-4 right-2 sm:right-4 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-lg flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1C1B1D] border border-white/80 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {lang === "id" ? "Siap untuk Proyek & Magang" : "Open for Projects & Internship"}
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-5">
              <p className="text-[15px] leading-relaxed text-[#71717A]">
                {lang === "id" ? "Saya Mohammad Kevin, seorang Fullstack dan Backend Software Engineer lulusan SMK Telkom Malang. Ketertarikan saya berakar pada pembangunan fondasi backend yang kokoh: merancang arsitektur basis data relasional, mengoptimalkan query, serta membangun pipeline API yang efisien dan aman." : "I'm Mohammad Kevin, a Fullstack and Backend Software Engineer from SMK Telkom Malang. My interest is rooted in building solid backend foundations: designing relational database architectures, optimizing queries, and building efficient and secure API pipelines."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                {[
                  { label: lang === "id" ? "LOKASI" : "LOCATION", val: "Malang, Jatim", sub: "WIB / UTC+7" }, 
                  { label: lang === "id" ? "STATUS" : "STATUS", val: lang === "id" ? "Tersedia Penuh" : "Available", sub: lang === "id" ? "Full-time / Magang" : "Full-time / Internship" }, 
                  { label: lang === "id" ? "FOKUS" : "FOCUS", val: "Backend & Cloud", sub: "API & DB Engines" }
                ].map(item => (
                  <div key={item.label} className="liquid-glass p-4.5 rounded-2xl shadow-xs border border-white/80 hover:shadow-md transition-all">
                    <span className="font-mono text-[11px] text-sky-700 block mb-1 font-semibold">{item.label}</span>
                    <p className="text-sm font-semibold text-[#1C1B1D]">{item.val}</p>
                    <p className="text-[11px] text-[#71717A]">{item.sub}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a href="/CV%20Mohammad%20Kevin.pdf" download className="inline-flex items-center justify-center rounded-full bg-sky-600 text-white px-6 py-3 text-sm font-semibold hover:bg-sky-700 transition-colors shadow-sm">
                  <Download className="mr-2 w-4 h-4" /> {lang === "id" ? "Unduh Resume" : "Download Resume"}
                </a>
                <Link href="/cv" className="liquid-glass inline-flex items-center justify-center rounded-full text-[#1C1B1D] px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-colors shadow-xs border border-white/80">
                  <FileText className="mr-2 w-4 h-4" /> {lang === "id" ? "Lihat CV Digital" : "View Digital CV"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" aria-label="Services" className="w-full py-24 bg-transparent scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="font-mono text-xs uppercase text-sky-700 font-semibold mb-2 block tracking-wider">
            {lang === "id" ? "LAYANAN REKAYASA" : "ENGINEERING SERVICES"}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[28px] sm:text-[38px] leading-tight font-bold text-[#1C1B1D] max-w-2xl mb-12 tracking-tight">
            {lang === "id" ? "Solusi Rekayasa Perangkat Lunak Komprehensif" : "Comprehensive Software Engineering Solutions"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((svc) => (
              <div key={svc.title.en} className="liquid-glass rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/80 flex flex-col group">
                <div className="w-13 h-13 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform border border-sky-400/20 shadow-xs">
                  <svc.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1C1B1D] mb-3">{svc.title[lang]}</h3>
                <p className="text-[15px] leading-relaxed text-[#71717A]">{svc.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECH STACK SECTION */}
      <section id="skills" aria-label="Skills" className="w-full py-24 bg-transparent scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="font-mono text-xs uppercase text-sky-700 font-semibold mb-2 block tracking-wider">
            {lang === "id" ? "KEAHLIAN TEKNIS" : "TECHNICAL SKILLS"}
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <h2 className="font-[family-name:var(--font-display)] text-[28px] sm:text-[38px] font-bold text-[#1C1B1D] max-w-2xl tracking-tight">
              {lang === "id" ? "Teknologi yang Teruji dalam Produksi" : "Production-Tested Technologies"}
            </h2>
            <div className="liquid-glass flex items-center gap-1 p-1.5 rounded-full shadow-sm self-start border border-white/80" role="tablist">
              {skillCategories.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveTab(cat.id)} 
                  role="tab"
                  aria-selected={activeTab === cat.id}
                  className={`px-4 py-1.5 rounded-full font-mono text-[12px] transition-all cursor-pointer ${activeTab === cat.id ? "bg-[#1C1B1D] text-white font-medium shadow-xs" : "text-[#71717A] hover:text-[#1C1B1D]"}`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeCategoryData.skills.map(skill => (
              <div key={skill.name} className="liquid-glass rounded-2xl p-5.5 shadow-xs border border-white/80 flex flex-col justify-between gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[15px] font-bold text-[#1C1B1D]">{skill.name}</span>
                    <span className="font-mono text-[10px] bg-white/70 text-[#71717A] px-2 py-0.5 rounded-md font-semibold border border-white/80">{skill.levelTag}</span>
                  </div>
                  <p className="text-xs text-[#71717A] leading-relaxed">
                    {typeof skill.desc === 'string' ? skill.desc : (skill.desc?.[lang] || skill.desc?.id || "")}
                  </p>
                </div>
                {skill.achievements && skill.achievements.length > 0 && (
                  <div className="pt-2.5 border-t border-zinc-200/50">
                    <span className="text-[10px] font-mono text-sky-700 font-semibold block mb-1">
                      {lang === "id" ? "Pencapaian Kunci:" : "Key Achievement:"}
                    </span>
                    <p className="text-[11px] text-zinc-600 leading-normal flex items-start gap-1">
                      <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{typeof skill.achievements[0] === 'string' ? skill.achievements[0] : (skill.achievements[0]?.[lang] || skill.achievements[0]?.id || "")}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section id="projects" aria-label="Projects" className="w-full py-24 bg-transparent scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase text-sky-700 font-semibold mb-2 block tracking-wider">
                {lang === "id" ? "PORTOFOLIO TERPILIH" : "FEATURED PORTFOLIO"}
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-[28px] sm:text-[38px] font-bold text-[#1C1B1D] tracking-tight">
                {lang === "id" ? "Studi Kasus & Implementasi Nyata" : "Case Studies & Real Implementations"}
              </h2>
            </div>
            <div className="liquid-glass flex flex-wrap gap-1.5 p-1.5 rounded-full shadow-xs border border-white/80" role="tablist">
              {projectFilterOptions.map(cat => (
                <button 
                  key={cat.key} 
                  onClick={() => setActiveCategory(cat.key)} 
                  role="tab"
                  aria-selected={activeCategory === cat.key}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[12px] transition-all cursor-pointer ${activeCategory === cat.key ? "bg-[#1C1B1D] text-white font-medium shadow-xs" : "text-[#71717A] hover:text-[#1C1B1D]"}`}
                >
                  {cat.label[lang]}
                </button>
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {filteredProjects.map(p => {
              const dText = typeof p.desc === 'string' ? p.desc : (p.desc?.[lang] || (p.desc as { id?: string })?.id || "");
              const iText = typeof p.impact === 'string' ? p.impact : (p.impact?.[lang] || (p.impact as { id?: string })?.id || "");
              return (
                <div key={p.id} className="liquid-glass rounded-3xl p-7 shadow-sm border border-white/80 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[11px] bg-sky-500/10 text-sky-700 px-3 py-0.5 rounded-full font-bold border border-sky-400/20">
                        {p.type}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">2025</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1C1B1D] mb-2">{p.title}</h3>
                    <p className="text-[14px] text-[#71717A] mb-4 leading-relaxed">{dText}</p>
                    {iText && (
                      <div className="bg-emerald-500/10 text-emerald-950 rounded-2xl p-3 text-[11px] mb-4 font-mono leading-relaxed border border-emerald-400/20">
                        ✓ {lang === "id" ? "Dampak" : "Impact"}: {iText}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {p.tech.map(t => (
                        <span key={t} className="text-[10px] bg-white/70 text-[#71717A] px-2 py-0.5 rounded-md font-mono font-medium border border-white/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-zinc-200/50">
                    {p.demoUrl ? (
                      <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 rounded-full bg-[#1C1B1D] hover:bg-black text-white text-xs font-bold text-center transition-colors shadow-sm">
                        Demo
                      </a>
                    ) : null}
                    {p.repoUrl ? (
                      <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-full bg-white/80 hover:bg-white text-[#1C1B1D] text-xs font-bold text-center transition-colors border border-white/80 shadow-2xs">
                        GitHub
                      </a>
                    ) : (
                      <span className="px-4 py-2.5 text-zinc-400 text-[11px] font-mono">Private</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TIMELINE SECTION */}
      <section id="timeline" aria-label="Timeline" className="w-full py-24 bg-transparent scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="font-mono text-xs uppercase text-sky-700 font-semibold mb-2 block tracking-wider">
            {lang === "id" ? "PERJALANAN" : "JOURNEY"}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[28px] sm:text-[38px] font-bold text-[#1C1B1D] mb-12 tracking-tight">
            {lang === "id" ? "Pendidikan & Rekam Jejak Profesional" : "Education & Professional Track Record"}
          </h2>
          <div className="relative pl-6 sm:pl-8 space-y-10">
            <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-0.5 bg-zinc-300/60" />
            {timelineLogs.map((log, idx) => (
              <div key={log.id} className="relative flex items-start gap-6">
                <div className={`w-3 h-3 rounded-full mt-2 -ml-[23px] sm:-ml-[25px] ring-4 ring-white shadow-xs ${idx === 0 ? "bg-sky-600" : "bg-zinc-300"}`} />
                <div className="liquid-glass rounded-3xl p-7 shadow-sm flex-1 border border-white/80 hover:shadow-md transition-all">
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[#1C1B1D]">
                      {typeof log.role === 'string' ? log.role : (log.role?.[lang] || log.role?.id || "")}
                    </h3>
                    <span className="text-[11px] font-mono bg-white/70 text-zinc-700 px-3 py-1 rounded-full font-semibold border border-white/80">
                      {log.year}
                    </span>
                  </div>
                  <p className="text-xs text-sky-700 font-mono font-semibold mb-2">{log.org}</p>
                  <p className="text-sm text-[#71717A] leading-relaxed">
                    {typeof log.summary === 'string' ? log.summary : (log.summary?.[lang] || log.summary?.id || "")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" aria-label="Contact" className="w-full py-24 bg-transparent scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
          <div>
            <span className="font-mono text-xs uppercase text-sky-700 font-semibold mb-2 block tracking-wider">
              {lang === "id" ? "HUBUNGI SAYA" : "GET IN TOUCH"}
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[28px] sm:text-[40px] font-bold text-[#1C1B1D] tracking-tight">
              {lang === "id" ? "Mari Diskusikan Proyek atau Peluang Kerjasama" : "Let's Discuss Projects or Opportunities"}
            </h2>
          </div>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 liquid-glass p-8 sm:p-9 rounded-3xl shadow-lg border border-white/80 flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] uppercase text-[#71717A] font-mono tracking-wider font-semibold">
                    {lang === 'id' ? "Email Utama" : "Email Address"}
                  </span>
                  <div className="bg-white/70 p-3 rounded-2xl flex items-center justify-between gap-2 border border-white/80 shadow-2xs">
                    <span className="text-xs font-mono font-bold text-zinc-900 truncate">{emailAddress}</span>
                    <button 
                      onClick={copyEmail} 
                      type="button"
                      aria-label="Copy Email"
                      className="px-3 py-1.5 rounded-xl bg-[#1C1B1D] text-white text-[10px] font-bold uppercase transition-transform active:scale-95 cursor-pointer shrink-0"
                    >
                      {copiedEmail ? (lang === "id" ? "Tersalin" : "Copied") : (lang === "id" ? "Salin" : "Copy")}
                    </button>
                  </div>
                </div>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-sky-600 w-5 h-5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#71717A] font-mono uppercase font-semibold">{lang === "id" ? "Lokasi" : "Location"}</p>
                      <p className="text-sm font-bold text-[#1C1B1D]">{lang === "id" ? "Malang, Jawa Timur, Indonesia" : "Malang, East Java, Indonesia"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-sky-600 w-5 h-5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#71717A] font-mono uppercase font-semibold">{lang === "id" ? "Jam Kerja" : "Working Hours"}</p>
                      <p className="text-sm font-bold text-[#1C1B1D]">
                        {lang === "id" ? "Senin – Sabtu (08:00 – 21:00 WIB)" : "Monday – Saturday (08:00 – 21:00 GMT+7)"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-sky-500/10 rounded-2xl flex items-center gap-3 border border-sky-400/20">
                <p className="text-xs text-[#1C1B1D] font-mono font-semibold">
                  {lang === "id" ? "Tersedia untuk Kontrak & Magang" : "Available for Contracts & Internships"}
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-7 liquid-glass p-8 sm:p-9 rounded-3xl shadow-lg border border-white/80">
              {formStatus === "success" && (
                <div className="mb-6 p-4 bg-emerald-500/10 text-emerald-950 rounded-2xl text-xs font-mono text-center border border-emerald-400/20">
                  {lang === "id" ? "Pesan terkirim! Terima kasih sudah menghubungi — saya akan segera membalas." : "Message sent! Thank you for reaching out — I will get back to you soon."}
                </div>
              )}
              {formStatus === "error" && (
                <div className="mb-6 p-4 bg-rose-500/10 text-rose-950 rounded-2xl text-xs font-mono flex items-center gap-2 border border-rose-400/20">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-3 gap-2 mb-2" role="group" aria-label="Project Type">
                  {projectTypeOptions.map((item) => {
                    const label = item[lang];
                    const isSelected = projectType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setProjectType(item.id)}
                        className={`py-2 px-3 rounded-2xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#1C1B1D] text-white shadow-xs"
                            : "bg-white/60 text-[#71717A] hover:bg-white/90 border border-white/80"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#1C1B1D] font-mono uppercase">
                      {lang === 'id' ? "Nama Lengkap" : "Full Name"}
                    </label>
                    <input 
                      type="text" 
                      value={form.name} 
                      onChange={e => setForm({...form, name: e.target.value})} 
                      placeholder={lang === 'id' ? "Aditya Nugroho" : "John Doe"} 
                      className="w-full px-4 py-3 rounded-2xl bg-white/60 border border-white/80 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200 outline-none text-sm transition-all text-[#1C1B1D]" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#1C1B1D] font-mono uppercase">
                      Email
                    </label>
                    <input 
                      type="email" 
                      value={form.email} 
                      onChange={e => setForm({...form, email: e.target.value})} 
                      placeholder="nama@email.com" 
                      className="w-full px-4 py-3 rounded-2xl bg-white/60 border border-white/80 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200 outline-none text-sm transition-all text-[#1C1B1D]" 
                      required 
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#1C1B1D] font-mono uppercase">
                    {lang === 'id' ? "Pesan" : "Message"}
                  </label>
                  <textarea 
                    value={form.message} 
                    onChange={e => setForm({...form, message: e.target.value})} 
                    placeholder={lang === 'id' ? "Ceritakan detail proyek..." : "Tell me about your project requirements..."} 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-2xl bg-white/60 border border-white/80 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200 outline-none text-sm resize-none transition-all text-[#1C1B1D]" 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={formStatus === 'loading'} 
                  className="w-full py-4 bg-[#1C1B1D] hover:bg-black text-white rounded-full font-bold text-sm transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {formStatus === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> 
                      <span>{lang === 'id' ? "Kirim Pesan" : "Send Message"}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
