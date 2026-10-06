"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, FileText, ExternalLink, Award, Send, Loader2, AlertCircle, Check } from "lucide-react";
import { projectsData, Project } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { timelineLogs } from "@/data/timeline";
import { certificatesData } from "@/data/certificates";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import { send as sendEmail } from "@emailjs/browser";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import TechSphere from "@/components/TechSphere";

gsap.registerPlugin(ScrollTrigger);

const CvModal = dynamic(() => import("@/components/CvModal"), { ssr: false });

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_rmat5kp";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_zt9llkk";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "3qW5e407vXhAIdlX5";

function MarqueeStrip({ items, className = "" }: { items: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const width = el.scrollWidth / 2;
    gsap.to(el, {
      x: -width,
      duration: 25,
      repeat: -1,
      ease: "none",
      modifiers: {
        x: gsap.utils.unitize((x: string) => parseFloat(x) % width),
      },
    });
  }, [items]);

  return (
    <div className="overflow-hidden py-6 border-y border-white/[0.04]">
      <div ref={ref} className="marquee-track" style={{ width: "max-content" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`text-[14px] sm:text-[16px] font-mono ${className}`}>
            {item}
            <span className="mx-6 text-white/10">&times;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { lang } = useLanguage();
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [projectType, setProjectType] = useState("Proyek Baru");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const techList = ["Next.js", "NestJS", "Express", "Prisma ORM", "PostgreSQL", "MySQL", "TypeScript", "Tailwind CSS", "Redis", "Docker", "Node.js", "React", "Git", "REST API", "Linux"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setFormStatus("loading");
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
      setErrorMsg(lang === "id" ? "Gagal mengirim. Coba via email langsung." : "Failed to send. Try reaching out via email directly.");
    }
  };

  const projectTypeOptions = [
    { id: "Proyek Baru", en: "New Project" },
    { id: "Tawaran Kerja", en: "Job Offer" },
    { id: "Konsultasi", en: "Consultation" },
  ];

  return (
    <>
      <Preloader />
      <Navbar />
      <div className="min-h-screen bg-[#0A0A0C] text-[#F5F5F0]">

        {/* HERO */}
        <section ref={heroRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0C] pointer-events-none z-10" />
          <motion.div style={{ y: heroY }} className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-mono text-xs sm:text-sm text-[#8A8A8A] mb-6 uppercase tracking-[0.2em]"
            >
              {lang === "id" ? "Software Engineering Student" : "Software Engineering Student"} &bull; SMK Telkom Malang
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="font-display text-[46px] sm:text-[72px] lg:text-[96px] leading-[0.95] font-extrabold text-white tracking-tight mb-6"
            >
              Mohammad<br />Kevin
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-base sm:text-lg text-[#8A8A8A] max-w-xl mb-10"
            >
              {lang === "id"
                ? "Merancang arsitektur backend scalable, REST API type-safe, dan sistem fullstack modern untuk kebutuhan bisnis nyata."
                : "Designing scalable backend architectures, type-safe REST APIs, and modern fullstack systems for real business needs."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <a href="#contact" className="px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all">
                {lang === "id" ? "Hubungi Saya" : "Get in Touch"}
              </a>
              <button
                type="button"
                onClick={() => setIsCvModalOpen(true)}
                className="px-8 py-3.5 rounded-full bg-white/5 text-white text-sm font-semibold border border-white/10 hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Curriculum Vitae
              </button>
            </motion.div>
          </motion.div>

          <div className="relative z-20 w-full max-w-3xl mt-12">
            <TechSphere />
          </div>
        </section>

        {/* MARQUEE */}
        <MarqueeStrip items={techList} className="text-[#8A8A8A]" />
        <MarqueeStrip items={projectsData.map((p) => p.title)} className="text-white/40" />

        {/* ABOUT */}
        <section id="about" className="py-24 sm:py-32 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.06]">
                <Image
                  src="/images/profile-photo.webp"
                  alt="Mohammad Kevin"
                  width={500}
                  height={625}
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="w-full h-auto object-cover aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-[0.2em] mb-3 block">
                {lang === "id" ? "Tentang Saya" : "About Me"}
              </span>
              <h2 className="font-display text-[32px] sm:text-[44px] font-extrabold text-white leading-tight mb-6">
                {lang === "id" ? "Backend & Fullstack Developer dengan fokus performa dan clean code." : "Backend & Fullstack Developer focused on performance and clean code."}
              </h2>
              <p className="text-[15px] leading-relaxed text-[#8A8A8A] mb-8">
                {lang === "id"
                  ? "Saya Mohammad Kevin, Siswa Rekayasa Perangkat Lunak di SMK Telkom Malang. Saya membangun arsitektur backend yang scalable, mendesain database relasional yang efisien, dan mengembangkan API yang type-safe untuk kebutuhan produksi."
                  : "I'm Mohammad Kevin, a Software Engineering student at SMK Telkom Malang. I build scalable backend architectures, design efficient relational databases, and develop type-safe APIs for production needs."}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: lang === "id" ? "Pengalaman" : "Experience", val: "2+ Tahun" },
                  { label: lang === "id" ? "Proyek" : "Projects", val: "10+" },
                  { label: lang === "id" ? "Lokasi" : "Location", val: "Malang, ID" },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <p className="text-[11px] font-mono text-[#8A8A8A] uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-white">{item.val}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all"
                >
                  <Download className="w-4 h-4" />
                  {lang === "id" ? "Unduh Resume" : "Download Resume"}
                </button>
                <Link href="/cv" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white text-sm font-semibold border border-white/10 hover:bg-white/10 transition-all">
                  <FileText className="w-4 h-4" />
                  {lang === "id" ? "CV Digital" : "Digital CV"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-24 sm:py-32 px-6 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto">
            <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-[0.2em] mb-3 block">
              {lang === "id" ? "Keahlian Teknis" : "Technical Skills"}
            </span>
            <h2 className="font-display text-[28px] sm:text-[40px] font-extrabold text-white mb-12">
              {lang === "id" ? "Teknologi Produksi" : "Production Stack"}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                  <h3 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.04]">{cat.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span key={skill.name} className="px-3 py-1.5 rounded-full bg-white/[0.04] text-xs font-mono text-[#8A8A8A] border border-white/[0.04]">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-24 sm:py-32 px-6 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto">
            <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-[0.2em] mb-3 block">
              {lang === "id" ? "Portfolio Terpilih" : "Featured Portfolio"}
            </span>
            <h2 className="font-display text-[28px] sm:text-[40px] font-extrabold text-white mb-12">
              {lang === "id" ? "Studi Kasus & Implementasi" : "Case Studies & Implementations"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.filter((p) => p.featured).map((p, idx) => {
                const dText = typeof p.desc === "string" ? p.desc : (p.desc?.[lang] || (p.desc as { id?: string })?.id || "");
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[10px] font-mono text-[#8A8A8A]">{p.type}</span>
                      <span className="text-[10px] font-mono text-[#8A8A8A]">2025</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">{p.title}</h3>
                    <p className="text-[13px] leading-relaxed text-[#8A8A8A] mb-4">{dText}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.tech.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] bg-white/[0.03] text-[#8A8A8A] px-2 py-0.5 rounded font-mono">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-4 border-t border-white/[0.04]">
                      {p.demoUrl ? (
                        <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all">Demo</a>
                      ) : null}
                      {p.repoUrl ? (
                        <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 rounded-full bg-white/5 text-white text-xs font-semibold border border-white/10 hover:bg-white/10 transition-all">GitHub</a>
                      ) : (
                        <span className="flex-1 text-center py-2 text-[10px] font-mono text-[#8A8A8A]">Private</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CERTIFICATES */}
        <section id="certificates" className="py-24 sm:py-32 px-6 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto">
            <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-[0.2em] mb-3 block">
              {lang === "id" ? "Sertifikasi" : "Certifications"}
            </span>
            <h2 className="font-display text-[28px] sm:text-[40px] font-extrabold text-white mb-12">
              {lang === "id" ? "Kredensial Terverifikasi" : "Verified Credentials"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {certificatesData.slice(0, 8).map((cert, idx) => {
                const titleText = typeof cert.title === "string" ? cert.title : cert.title[lang];
                const issuerText = typeof cert.issuer === "string" ? cert.issuer : cert.issuer[lang];
                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all"
                  >
                    <Award className="w-5 h-5 text-white/20 mb-3" />
                    <h4 className="text-sm font-bold text-white mb-1 leading-snug">{titleText}</h4>
                    <p className="text-[11px] font-mono text-[#8A8A8A] mb-3">{issuerText}</p>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] font-mono text-white/40 hover:text-white/80 transition-colors">
                        Verify <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="py-24 sm:py-32 px-6 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-[0.2em] mb-3 block">
              {lang === "id" ? "Perjalanan" : "Journey"}
            </span>
            <h2 className="font-display text-[28px] sm:text-[40px] font-extrabold text-white mb-12">
              {lang === "id" ? "Pengalaman & Pendidikan" : "Experience & Education"}
            </h2>

            <div className="relative pl-8 space-y-10">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-white/[0.04]" />
              {timelineLogs.map((log, idx) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative"
                >
                  <div className={`absolute left-[-1.65rem] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#0A0A0C] ${idx === 0 ? "bg-white" : "bg-white/20"}`} />
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {typeof log.role === "string" ? log.role : (log.role?.[lang] || log.role?.id || "")}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[10px] font-mono text-[#8A8A8A]">
                      {typeof log.year === "string" ? log.year : (log.year?.[lang] || log.year?.id || "")}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#8A8A8A] leading-relaxed">
                    {typeof log.summary === "string" ? log.summary : (log.summary?.[lang] || log.summary?.id || "")}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 sm:py-32 px-6 border-t border-white/[0.04]">
          <div className="max-w-2xl mx-auto text-center">
            <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-[0.2em] mb-3 block">
              {lang === "id" ? "Hubungi Saya" : "Get in Touch"}
            </span>
            <h2 className="font-display text-[28px] sm:text-[40px] font-extrabold text-white mb-4">
              {lang === "id" ? "Diskusikan Proyek Anda" : "Discuss Your Project"}
            </h2>
            <p className="text-[15px] text-[#8A8A8A] mb-10">
              {lang === "id"
                ? "Konsultasi proyek, kolaborasi backend, atau peluang magang industri."
                : "Project consulting, backend engineering, or internship collaboration."}
            </p>

            {formStatus === "success" && (
              <div className="mb-6 p-4 bg-white/[0.04] rounded-2xl text-sm text-[#8A8A8A] text-center border border-white/[0.04]">
                {lang === "id" ? "Pesan terkirim! Terima kasih — saya akan segera membalas." : "Message sent! Thank you — I'll get back to you soon."}
              </div>
            )}
            {formStatus === "error" && (
              <div className="mb-6 p-4 bg-red-500/5 rounded-2xl text-sm text-red-400 flex items-center gap-2 border border-red-500/10">
                <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              <div className="grid grid-cols-3 gap-2">
                {projectTypeOptions.map((item) => {
                  const label = item[lang as keyof typeof item] as string;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProjectType(item.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-all ${projectType === item.id ? "bg-white text-black" : "bg-white/[0.03] text-[#8A8A8A] border border-white/[0.04] hover:bg-white/[0.06]"}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={lang === "id" ? "Nama" : "Name"} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.06] outline-none transition-all" required />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.06] outline-none transition-all" required />
              </div>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={lang === "id" ? "Deskripsi kebutuhan / pesan..." : "Project scope / message..."} rows={4} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.06] outline-none resize-none transition-all" required />
              <button type="submit" disabled={formStatus === "loading"} className="w-full py-3.5 bg-white text-black rounded-full font-semibold text-sm hover:bg-white/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {formStatus === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> {lang === "id" ? "Kirim Pesan" : "Send Message"}</>}
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 px-6 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image src="/images/corecraft-logo-dark.svg" alt="CoreCraft" width={32} height={32} className="w-8 h-8 object-contain opacity-50" />
              <span className="text-sm font-bold text-white/50">Mohammad Kevin</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://github.com/MohammadKevin" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-white/30 hover:text-white/60 transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/mohammad-kevin-arif-rudianto-945733347/" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-white/30 hover:text-white/60 transition-colors">LinkedIn</a>
              <a href="mailto:kvn4.200581@gmail.com" className="text-[11px] font-mono text-white/30 hover:text-white/60 transition-colors">Email</a>
            </div>
            <span className="text-[11px] font-mono text-white/20">&copy; {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>

      <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} lang={lang} />
    </>
  );
}