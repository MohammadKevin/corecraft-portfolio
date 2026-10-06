"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Download, FileText, Server, Database, Monitor,
  ShoppingCart, FolderClosed, RefreshCw, Send,
  AlertCircle, Loader2, Check, ExternalLink, Award,
  ChevronDown, ChevronUp
} from "lucide-react";
import { projectsData, Project } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { timelineLogs } from "@/data/timeline";
import { certificatesData } from "@/data/certificates";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import { send as sendEmail } from "@emailjs/browser";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import AnimatedText from "@/components/AnimatedText";

const AllServicesModal = dynamic(() => import("@/components/AllServicesModal"), { ssr: false });
const AllProjectsModal = dynamic(() => import("@/components/AllProjectsModal"), { ssr: false });
const AllCertificatesModal = dynamic(() => import("@/components/AllCertificatesModal"), { ssr: false });
const CvModal = dynamic(() => import("@/components/CvModal"), { ssr: false });

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_rmat5kp";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_zt9llkk";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "3qW5e407vXhAIdlX5";

export default function Home() {
  const { lang } = useLanguage();
  const [projects] = useState<Project[]>(projectsData);
  const [activeTab, setActiveTab] = useState<string>("backend");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isCertsModalOpen, setIsCertsModalOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [projectType, setProjectType] = useState("Proyek Baru");

  const t = translations.hero;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setFormStatus("loading");
    setErrorMsg("");
    try {
      await sendEmail(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name.trim(),
        from_email: form.email.trim(),
        message: `[${projectType}]\n\n${form.message.trim()}`,
      }, PUBLIC_KEY);
      setFormStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 6000);
    } catch {
      setFormStatus("error");
      setErrorMsg(lang === "id" ? "Gagal mengirim pesan. Silakan coba hubungi langsung via email." : "Failed to send message. Please reach out directly via email.");
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
    { icon: Server, title: { id: "Backend & RESTful API", en: "Backend & RESTful API" }, desc: { id: "API modular dengan NestJS & Express, DTO validation, otentikasi JWT/OAuth2, serta dokumentasi OpenAPI/Swagger.", en: "Modular APIs with NestJS & Express, DTO validation, JWT/OAuth2 authentication, and OpenAPI/Swagger documentation." } },
    { icon: Database, title: { id: "Database & Query Tuning", en: "Database & Query Tuning" }, desc: { id: "Skema relasional PostgreSQL/MySQL efisien, query indexing terstruktur, migrasi Prisma ORM, dan in-memory Redis caching.", en: "Efficient relational PostgreSQL/MySQL schemas, structured query indexing, Prisma ORM migrations, and Redis caching." } },
    { icon: Monitor, title: { id: "Fullstack Web Apps", en: "Fullstack Web Apps" }, desc: { id: "Aplikasi web end-to-end dengan Next.js App Router, React Server Components, TypeScript yang type-safe, dan Tailwind CSS.", en: "End-to-end web apps with Next.js App Router, React Server Components, type-safe TypeScript, and Tailwind CSS." } },
    { icon: ShoppingCart, title: { id: "POS & Inventory Systems", en: "POS & Inventory Systems" }, desc: { id: "Sistem kasir multi-cabang, barcode scanner, mutasi stok realtime, struk digital, dan log audit transaksi akurat.", en: "Multi-branch cashier systems, barcode scanner, real-time stock mutation, digital invoices, and precise transaction audit logs." } },
    { icon: FolderClosed, title: { id: "Digital Archive & Records", en: "Digital Archive & Records" }, desc: { id: "Arsip terstruktur, metadata tagging, kontrol akses berbasis peran (RBAC), serta penyimpanan berkas terenkripsi.", en: "Structured archiving, metadata tagging, role-based access control (RBAC), and encrypted file storage." } },
    { icon: RefreshCw, title: { id: "Third-Party API & Payments", en: "Third-Party API & Payments" }, desc: { id: "Integrasi payment gateway (Midtrans/Xendit), webhook berprinsip idempotent, dan sinkronisasi data async.", en: "Payment gateway integration (Midtrans/Xendit), idempotent webhooks, and asynchronous data synchronization." } },
  ];

  const projectTypeOptions = [
    { id: "Proyek Baru", en: "New Project" },
    { id: "Tawaran Kerja", en: "Job Offer" },
    { id: "Konsultasi", en: "Consultation" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent">

      {/* HERO */}
      <AnimatedSection id="hero" className="min-h-screen flex flex-col justify-center items-center pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center py-6 w-full">
          <AnimatedText
            as="h1"
            text={lang === "id" ? "Membangun Arsitektur API Scalable & Sistem Fullstack Modern." : "Architecting Scalable APIs & Modern Fullstack Systems."}
            className="font-display text-[38px] sm:text-[52px] lg:text-[62px] leading-[1.12] tracking-tight font-extrabold text-ink mb-6"
          />

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-base sm:text-lg leading-relaxed text-muted max-w-2xl mx-auto mb-10"
          >
            {lang === "id"
              ? "Siswa Rekayasa Perangkat Lunak dari SMK Telkom Malang dengan 2+ tahun pengalaman praktis merancang arsitektur POS, type-safe ORM, dan REST API yang andal untuk kebutuhan bisnis nyata."
              : "Software Engineering Student at SMK Telkom Malang with 2+ years of practical experience designing POS architecture, type-safe ORMs, and reliable REST APIs for real business needs."}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <a href="#contact" className="brutal-btn px-8 py-3.5 text-sm bg-accent-yellow text-[#141414]">
              {t.contactBtn[lang]}
            </a>
            <button
              type="button"
              onClick={() => setIsCvModalOpen(true)}
              className="brutal-btn px-8 py-3.5 text-sm bg-surface text-ink"
            >
              <FileText className="mr-2 w-4 h-4 inline" />
              Curriculum Vitae
            </button>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="brutal-card w-full max-w-3xl p-6 sm:p-7 flex flex-wrap items-center justify-around gap-6 text-center"
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-ink">2+ Tahun</span>
              <span className="text-xs text-muted mt-0.5 font-bold">{lang === "id" ? "Pengalaman Praktis" : "Practical Experience"}</span>
            </div>
            <div className="w-1 h-8 bg-border hidden sm:block rounded-full" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-ink">10+ Proyek</span>
              <span className="text-xs text-muted mt-0.5 font-bold">{lang === "id" ? "Teruji & Terdistribusi" : "Tested & Distributed"}</span>
            </div>
            <div className="w-1 h-8 bg-border hidden sm:block rounded-full" />
            <div className="flex flex-col items-center">
              <span className="text-base sm:text-lg font-extrabold text-accent-violet">Next.js &bull; NestJS &bull; Prisma</span>
              <span className="text-xs text-muted mt-0.5 font-bold">Core Production Stack</span>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ABOUT */}
      <AnimatedSection id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            number="01"
            label={lang === "id" ? "TENTANG SAYA" : "ABOUT ME"}
            title={lang === "id" ? "Komitmen pada Performa, Ketepatan Logik & Kode Bersih" : "Committed to Performance, Precise Logic & Clean Code"}
          />

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mt-12">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="lg:col-span-5 relative max-w-sm sm:max-w-md lg:max-w-none mx-auto w-full"
            >
              <div className="brutal-card w-full aspect-[4/5] p-3 sm:p-3.5">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-muted/10">
                  <Image
                    src="/images/profile-photo.webp"
                    alt="Mohammad Kevin"
                    width={400}
                    height={500}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
              <div className="brutal-card absolute -bottom-3 sm:-bottom-4 right-2 sm:right-4 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold text-ink bg-accent-lime shadow-[5px_5px_0_var(--border)]">
                {lang === "id" ? "Siap untuk Proyek & Magang" : "Open for Projects & Internship"}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.1 }}
              className="lg:col-span-7 flex flex-col gap-5"
            >
              <p className="text-[15px] leading-relaxed text-muted">
                {lang === "id" ? "Saya Mohammad Kevin, seorang Siswa Rekayasa Perangkat Lunak di SMK Telkom Malang sekaligus Fullstack dan Backend Developer. Ketertarikan saya berakar pada pembangunan fondasi backend yang kokoh: merancang arsitektur basis data relasional, mengoptimalkan query, serta membangun pipeline API yang efisien dan aman." : "I'm Mohammad Kevin, a Software Engineering student at SMK Telkom Malang and a Fullstack & Backend Developer. My interest is rooted in building solid backend foundations: designing relational database architectures, optimizing queries, and building efficient and secure API pipelines."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                {[
                  { label: lang === "id" ? "LOKASI" : "LOCATION", val: "Malang, Jatim", sub: "WIB / UTC+7" },
                  { label: lang === "id" ? "STATUS" : "STATUS", val: lang === "id" ? "Siswa Aktif" : "Active Student", sub: lang === "id" ? "Siap Magang / Freelance" : "Internship / Freelance" },
                  { label: lang === "id" ? "FOKUS" : "FOCUS", val: "Backend & Cloud", sub: "API & DB Engines" },
                ].map((item) => (
                  <div key={item.label} className="brutal-card p-4 rounded-2xl shadow-[4px_4px_0_var(--border)]">
                    <span className="font-mono text-[11px] text-accent-violet block mb-1 font-extrabold">{item.label}</span>
                    <p className="text-sm font-bold text-ink">{item.val}</p>
                    <p className="text-[11px] text-muted">{item.sub}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCvModalOpen(true)}
                  className="brutal-btn px-6 py-3 text-sm bg-accent-violet text-white inline-flex items-center"
                >
                  <Download className="mr-2 w-4 h-4" /> {lang === "id" ? "Unduh Resume" : "Download Resume"}
                </button>
                <Link href="/cv" className="brutal-btn px-6 py-3 text-sm bg-surface text-ink inline-flex items-center">
                  <FileText className="mr-2 w-4 h-4" /> {lang === "id" ? "Lihat CV Digital" : "View Digital CV"}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* SERVICES */}
      <AnimatedSection id="services" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            number="02"
            label={lang === "id" ? "LAYANAN REKAYASA" : "ENGINEERING SERVICES"}
            title={lang === "id" ? "Solusi Rekayasa Perangkat Lunak Terarah & Terukur" : "Focused & Measurable Software Engineering Solutions"}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-6 mt-12">
            {(showAllServices ? servicesData : servicesData).map((svc, idx) => (
              <motion.div
                key={svc.title.en}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, type: "spring", stiffness: 50 }}
                className={`brutal-card p-6 sm:p-8 flex flex-col justify-between group ${
                  idx >= 3 && !showAllServices ? "hidden md:flex" : "flex"
                }`}
              >
                <div>
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-12 h-12 rounded-2xl bg-accent-yellow/20 text-ink flex items-center justify-center mb-5 border-2 border-foreground shadow-[3px_3px_0_var(--border)]"
                  >
                    <svc.icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-lg font-extrabold text-ink mb-2.5">{svc.title[lang]}</h3>
                  <p className="text-[14px] leading-relaxed text-muted">{svc.desc[lang]}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center pt-6 md:hidden">
            <button
              type="button"
              onClick={() => setShowAllServices(!showAllServices)}
              className="brutal-btn px-5 py-2.5 text-xs bg-surface text-ink inline-flex items-center gap-2"
            >
              <span>{showAllServices ? (lang === "id" ? "Tampilkan Lebih Sedikit" : "Show Less") : (lang === "id" ? `Lihat Semua Layanan (${servicesData.length})` : `View All Services (${servicesData.length})`)}</span>
              {showAllServices ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* SKILLS */}
      <AnimatedSection id="skills" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <SectionHeading
              number="03"
              label={lang === "id" ? "KEAHLIAN TEKNIS" : "TECHNICAL SKILLS"}
              title={lang === "id" ? "Teknologi yang Teruji dalam Produksi" : "Production-Tested Technologies"}
            />
            <div className="flex items-center gap-1 p-1.5 brutal-card rounded-full self-start shadow-[3px_3px_0_var(--border)]" role="tablist">
              <LayoutGroup>
                {skillCategories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    role="tab"
                    aria-selected={activeTab === cat.id}
                    className={`relative px-4 py-1.5 rounded-full font-mono text-[12px] font-bold transition-colors cursor-pointer ${
                      activeTab === cat.id ? "text-surface" : "text-muted hover:text-ink"
                    }`}
                  >
                    {activeTab === cat.id && (
                      <motion.div
                        layoutId="skillTabBg"
                        className="absolute inset-0 bg-ink rounded-full border-2 border-ink shadow-[3px_3px_0_var(--accent-yellow)]"
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{cat.title}</span>
                  </motion.button>
                ))}
              </LayoutGroup>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <AnimatePresence mode="wait">
              {activeCategoryData.skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: idx * 0.05, type: "spring", stiffness: 80 }}
                  className="brutal-card p-5 rounded-2xl shadow-[4px_4px_0_var(--border)] flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[15px] font-extrabold text-ink">{skill.name}</span>
                      <span className="font-mono text-[10px] bg-accent-cyan/20 text-ink px-2 py-0.5 rounded-md font-bold border-2 border-foreground">{skill.levelTag}</span>
                    </div>
                    <div className="w-full h-2 bg-surface rounded-full border-2 border-foreground mb-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-accent-cyan"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      {typeof skill.desc === "string" ? skill.desc : (skill.desc?.[lang] || skill.desc?.id || "")}
                    </p>
                  </div>
                  {skill.achievements && skill.achievements.length > 0 && (
                    <div className="pt-2.5 border-t-2 border-foreground">
                      <span className="text-[10px] font-mono text-accent-violet font-extrabold block mb-1">
                        {lang === "id" ? "Pencapaian Kunci:" : "Key Achievement:"}
                      </span>
                      <p className="text-[11px] text-ink leading-normal flex items-start gap-1 font-bold">
                        <Check className="w-3 h-3 text-accent-lime shrink-0 mt-0.5" />
                        <span>{typeof skill.achievements[0] === "string" ? skill.achievements[0] : (skill.achievements[0]?.[lang] || skill.achievements[0]?.id || "")}</span>
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </AnimatedSection>

      {/* PROJECTS */}
      <AnimatedSection id="projects" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              number="04"
              label={lang === "id" ? "PORTOFOLIO TERPILIH" : "FEATURED PORTFOLIO"}
              title={lang === "id" ? "Studi Kasus & Implementasi Nyata" : "Case Studies & Production Implementations"}
            />
            <div className="flex flex-wrap gap-1.5 p-1.5 brutal-card rounded-full self-start md:self-auto shadow-[3px_3px_0_var(--border)]" role="tablist">
              <LayoutGroup>
                {projectFilterOptions.map((cat) => (
                  <motion.button
                    key={cat.key}
                    onClick={() => { setActiveCategory(cat.key); setShowAllProjects(false); }}
                    role="tab"
                    aria-selected={activeCategory === cat.key}
                    className={`relative px-3.5 py-1.5 rounded-full font-mono text-[12px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      activeCategory === cat.key ? "text-surface" : "text-muted hover:text-ink"
                    }`}
                  >
                    {activeCategory === cat.key && (
                      <motion.div
                        layoutId="projectTabBg"
                        className="absolute inset-0 bg-ink rounded-full border-2 border-ink shadow-[3px_3px_0_var(--accent-pink)]"
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{cat.label[lang]}</span>
                  </motion.button>
                ))}
              </LayoutGroup>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((p, idx) => {
              const dText = typeof p.desc === "string" ? p.desc : (p.desc?.[lang] || (p.desc as { id?: string })?.id || "");
              const iText = typeof p.impact === "string" ? p.impact : (p.impact?.[lang] || (p.impact as { id?: string })?.id || "");
              return (
                <motion.div
                  key={p.id}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, type: "spring", stiffness: 50 }}
                  className={`brutal-card p-6 sm:p-7 flex flex-col justify-between ${
                    idx >= 3 && !showAllProjects ? "hidden md:flex" : "flex"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-3.5">
                      <span className={`text-[11px] px-3 py-0.5 rounded-full font-extrabold border-2 border-foreground ${p.color}`}>
                        {p.type}
                      </span>
                      <span className="text-[11px] text-muted font-mono font-bold">2025</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-ink mb-2 leading-snug">{p.title}</h3>
                    <p className="text-[14px] text-muted mb-4 leading-relaxed">{dText}</p>
                    {iText && (
                      <div className="bg-accent-lime/20 text-ink rounded-2xl p-3 text-[11px] mb-4 font-mono leading-relaxed border-2 border-foreground shadow-[2px_2px_0_var(--border)]">
                        &#10003; {lang === "id" ? "Dampak" : "Impact"}: {iText}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {p.tech.map((t) => (
                        <span key={t} className="text-[10px] bg-surface text-muted px-2 py-0.5 rounded-md font-mono font-bold border-2 border-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t-2 border-foreground">
                    {p.demoUrl ? (
                      <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 rounded-full bg-ink text-surface text-xs font-extrabold text-center border-2 border-foreground shadow-[3px_3px_0_var(--accent-pink)] hover:shadow-[5px_5px_0_var(--accent-pink)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                        Demo
                      </a>
                    ) : null}
                    {p.repoUrl ? (
                      <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-full bg-surface text-ink text-xs font-extrabold text-center border-2 border-foreground shadow-[3px_3px_0_var(--border)] hover:shadow-[5px_5px_0_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                        GitHub
                      </a>
                    ) : (
                      <span className="px-4 py-2.5 text-muted text-[11px] font-mono font-bold">Private</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredProjects.length > 3 && (
            <div className="flex justify-center pt-2 md:hidden">
              <button
                type="button"
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="brutal-btn px-5 py-2.5 text-xs bg-surface text-ink inline-flex items-center gap-2"
              >
                <span>{showAllProjects ? (lang === "id" ? "Tampilkan Lebih Sedikit" : "Show Less") : (lang === "id" ? `Lihat Semua Proyek (${filteredProjects.length})` : `View All Projects (${filteredProjects.length})`)}</span>
                {showAllProjects ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* CERTIFICATES */}
      <AnimatedSection id="certificates" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-8 sm:gap-10">
          <SectionHeading
            number="05"
            label={lang === "id" ? "SERTIFIKASI & KREDENSIAL" : "CERTIFICATIONS & CREDENTIALS"}
            title={lang === "id" ? "Kompetensi Terverifikasi & Resmi" : "Verified Industry Credentials"}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-6">
            {certificatesData.map((cert, idx) => {
              const titleText = typeof cert.title === "string" ? cert.title : cert.title[lang];
              const issuerText = typeof cert.issuer === "string" ? cert.issuer : cert.issuer[lang];
              return (
                <motion.div
                  key={cert.id}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, type: "spring", stiffness: 50 }}
                  className={`brutal-card p-6 sm:p-7 flex flex-col justify-between group ${
                    idx >= 3 && !showAllCerts ? "hidden md:flex" : "flex"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-lime/20 border-2 border-foreground text-[10px] font-mono font-extrabold text-ink">
                        <Award className="w-3 h-3 text-accent-lime" />
                        <span>{cert.category}</span>
                      </div>
                      <span className="text-[11px] font-mono text-muted font-bold">{cert.date}</span>
                    </div>
                    <h3 className="text-[16px] sm:text-[17px] font-extrabold text-ink mb-2 leading-snug group-hover:text-accent-violet transition-colors">
                      {titleText}
                    </h3>
                    <p className="text-xs font-mono text-accent-violet font-extrabold mb-4">{issuerText}</p>
                  </div>
                  {cert.url && (
                    <div className="pt-3 border-t-2 border-foreground flex items-center justify-between">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-ink hover:text-accent-violet transition-colors"
                      >
                        <span>{lang === "id" ? "Verifikasi Kredensial" : "Verify Credential"}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted" />
                      </a>
                      <span className="text-[10px] font-mono bg-accent-lime/20 text-ink font-extrabold px-2 py-0.5 rounded-md border-2 border-foreground">
                        &#10003; Verified
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {certificatesData.length > 3 && (
            <div className="flex justify-center pt-2 md:hidden">
              <button
                type="button"
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="brutal-btn px-5 py-2.5 text-xs bg-surface text-ink inline-flex items-center gap-2"
              >
                <span>{showAllCerts ? (lang === "id" ? "Tampilkan Lebih Sedikit" : "Show Less") : (lang === "id" ? `Lihat Semua Sertifikat (${certificatesData.length})` : `View All Certificates (${certificatesData.length})`)}</span>
                {showAllCerts ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* TIMELINE */}
      <AnimatedSection id="timeline" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            number="06"
            label={lang === "id" ? "PERJALANAN" : "JOURNEY"}
            title={lang === "id" ? "Pendidikan & Rekam Jejak Profesional" : "Education & Professional Track Record"}
          />

          <div className="relative pl-5 sm:pl-8 space-y-7 sm:space-y-10 mt-12">
            <div className="absolute left-1.5 sm:left-3 top-2 bottom-2 w-[3px] bg-border rounded-full" />
            {timelineLogs.map((log, idx) => (
              <motion.div
                key={log.id}
                initial={{ x: idx % 2 === 0 ? -30 : 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, type: "spring", stiffness: 50 }}
                className="relative flex items-start gap-4 sm:gap-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: idx * 0.5 }}
                  className={`w-3 h-3 rounded-full mt-2 -ml-[23px] sm:-ml-[25px] border-2 border-foreground shrink-0 ${
                    idx === 0 ? "bg-accent-yellow" : "bg-surface"
                  }`}
                />
                <div className="brutal-card p-5 sm:p-7 flex-1 shadow-[4px_4px_0_var(--border)]">
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-ink">
                      {typeof log.role === "string" ? log.role : (log.role?.[lang] || log.role?.id || "")}
                    </h3>
                    <span className="text-[11px] font-mono bg-accent-yellow/20 text-ink px-3 py-1 rounded-full font-extrabold border-2 border-foreground">
                      {typeof log.year === "string" ? log.year : (log.year?.[lang] || log.year?.id || "")}
                    </span>
                  </div>
                  <p className="text-xs text-accent-violet font-mono font-extrabold mb-2">{log.org}</p>
                  <p className="text-sm text-muted leading-relaxed">
                    {typeof log.summary === "string" ? log.summary : (log.summary?.[lang] || log.summary?.id || "")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CONTACT */}
      <AnimatedSection id="contact" className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-8 sm:gap-10 text-center">
          <SectionHeading
            number="07"
            label={lang === "id" ? "HUBUNGI SAYA" : "GET IN TOUCH"}
            title={lang === "id" ? "Diskusikan Kebutuhan Sistem & Kolaborasi" : "Discuss System Architecture & Engagements"}
          />
          <p className="text-sm text-muted mt-2 max-w-xl mx-auto">
            {lang === "id"
              ? "Kirim pesan langsung untuk konsultasi proyek, kolaborasi backend, atau peluang magang industri."
              : "Send a direct inquiry for project consulting, backend engineering, or internship collaboration."}
          </p>

          <div className="w-full max-w-2xl brutal-card p-6 sm:p-9 shadow-[8px_8px_0_var(--border)] text-left">
            {formStatus === "success" && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-accent-lime/20 rounded-2xl text-xs font-mono font-bold text-center border-2 border-foreground shadow-[3px_3px_0_var(--border)]">
                {lang === "id" ? "Pesan terkirim! Terima kasih sudah menghubungi — saya akan segera membalas." : "Message sent! Thank you for reaching out — I will get back to you soon."}
              </motion.div>
            )}
            {formStatus === "error" && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-accent-pink/20 rounded-2xl text-xs font-mono font-bold flex items-center gap-2 border-2 border-foreground shadow-[3px_3px_0_var(--border)]">
                <AlertCircle className="w-4 h-4 shrink-0 text-accent-pink" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-1" role="group">
                <LayoutGroup>
                  {projectTypeOptions.map((item) => {
                    const label = item[lang as keyof typeof item] as string;
                    const isSelected = projectType === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => setProjectType(item.id)}
                        className={`relative py-2 px-3 rounded-2xl text-xs font-mono font-extrabold transition-all cursor-pointer text-center ${
                          isSelected
                            ? "text-surface"
                            : "text-muted hover:text-ink bg-surface border-2 border-foreground"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="contactPillBg"
                            className="absolute inset-0 bg-ink rounded-2xl border-2 border-foreground shadow-[3px_3px_0_var(--accent-yellow)]"
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                          />
                        )}
                        <span className="relative z-10">{label}</span>
                      </motion.button>
                    );
                  })}
                </LayoutGroup>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold text-ink font-mono uppercase">{lang === "id" ? "Nama Lengkap" : "Full Name"}</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={lang === "id" ? "Nama Anda / Perusahaan" : "Your Name / Organization"} className="brutal-input w-full px-4 py-3 text-sm text-ink placeholder:text-muted/50" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold text-ink font-mono uppercase">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="nama@perusahaan.com" className="brutal-input w-full px-4 py-3 text-sm text-ink placeholder:text-muted/50" required />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-ink font-mono uppercase">{lang === "id" ? "Deskripsi Kebutuhan / Pesan" : "Project Scope / Message"}</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={lang === "id" ? "Jelaskan kebutuhan sistem, arsitektur, estimasi timeline, atau detail proyek..." : "Describe the system scope, architecture, estimated timeline, or project specs..."} rows={4} className="brutal-input w-full px-4 py-3 text-sm text-ink placeholder:text-muted/50 resize-none" required />
              </div>
              <motion.button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full py-3.5 sm:py-4 bg-accent-yellow text-[#141414] rounded-full font-extrabold text-sm border-2 border-[#141414] shadow-[5px_5px_0_#141414] hover:shadow-[7px_7px_0_#141414] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-[2px_2px_0_#141414] active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                whileTap={{ scale: 0.98 }}
              >
                {formStatus === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{lang === "id" ? "Kirim Pesan" : "Send Message"}</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </AnimatedSection>

      <AllServicesModal isOpen={isServicesModalOpen} onClose={() => setIsServicesModalOpen(false)} lang={lang} />
      <AllProjectsModal isOpen={isProjectsModalOpen} onClose={() => setIsProjectsModalOpen(false)} lang={lang} />
      <AllCertificatesModal isOpen={isCertsModalOpen} onClose={() => setIsCertsModalOpen(false)} lang={lang} />
      <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} lang={lang} />

    </div>
  );
}