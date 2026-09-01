"use client";

import {
  Server,
  Database,
  Code2,
  Workflow,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Layers,
  FileSpreadsheet,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesGrid() {
  const { lang } = useLanguage();

  const services = [
    {
      icon: <Server className="w-5 h-5" />,
      title: lang === "id" ? "Pengembangan Backend & REST API" : "Backend Architecture & REST APIs",
      desc:
        lang === "id"
          ? "Membangun endpoint API modular dengan NestJS & Express, otentikasi JWT/OAuth, rate limiting, dan dokumentasi Swagger/OpenAPI yang rapi."
          : "Designing enterprise-grade API controllers, role-based authorization, rate limiters, and clean OpenAPI specifications.",
      deliverables: [
        lang === "id" ? "Arsitektur Controller-Service Modular" : "Modular Controller-Service Pattern",
        lang === "id" ? "Validasi DTO & Error Handling Terpusat" : "Strict DTO Validation & Error Filters",
        lang === "id" ? "Dokumentasi API Terstandarisasi" : "Automated Swagger / OpenAPI Docs",
      ],
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: lang === "id" ? "Desain & Optimasi Database" : "Database Schema Design & Query Tuning",
      desc:
        lang === "id"
          ? "Perancangan skema relasional PostgreSQL & MySQL, migrasi data type-safe menggunakan Prisma ORM, serta penataan indeks untuk query cepat."
          : "Normalizing relational schemas, type-safe Prisma migrations, composite indexing, and sub-second SQL execution.",
      deliverables: [
        lang === "id" ? "Normalisasi & Pemodelan Relasi" : "Relational Schema Normalization",
        lang === "id" ? "Optimasi Query EXPLAIN ANALYZE" : "EXPLAIN ANALYZE Query Profiling",
        lang === "id" ? "Prisma Type-Safe Client Migrations" : "Prisma Safe Migration Pipelines",
      ],
    },
    {
      icon: <Code2 className="w-5 h-5" />,
      title: lang === "id" ? "Aplikasi Web Fullstack Modern" : "Modern Fullstack Web Engineering",
      desc:
        lang === "id"
          ? "Aplikasi web responsif berbasis Next.js (App Router), React Server Components, TypeScript murni, dan Tailwind CSS dengan performa maksimal."
          : "High-performance React Server Components, zero-bundle client overhead, and bespoke editorial UI systems.",
      deliverables: [
        lang === "id" ? "Server-Side Rendering & Caching" : "React Server Components & SSR",
        lang === "id" ? "Desain Editorial & Responsif" : "Tailwind Design System & Responsive UI",
        lang === "id" ? "Integrasi API Client & Server Actions" : "Type-Safe Server Actions & Mutations",
      ],
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: lang === "id" ? "Sistem Kasir (POS) & Inventaris" : "POS & Transactional Inventory Systems",
      desc:
        lang === "id"
          ? "Solusi point-of-sale tangguh untuk bisnis ritel & F&B dengan rekonsiliasi stok real-time, pencatatan transaksi kasir, dan laporan penjualan."
          : "ACID-compliant retail POS systems with ledger integrity, real-time receipt generation, and inventory tracking.",
      deliverables: [
        lang === "id" ? "Pengurangan Stok Bebas Race-Condition" : "Atomic Stock Lock & Checkout",
        lang === "id" ? "Pencatatan Laporan & Export Data" : "Daily Ledger & Financial Exports",
        lang === "id" ? "Multi-Role Operator & Kasir" : "Multi-Tenant & Role Access Control",
      ],
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5" />,
      title: lang === "id" ? "Sistem Arsip & Manajemen Dokumen" : "Digital Archiving & Document Control",
      desc:
        lang === "id"
          ? "Platform pengarsipan surat & dokumen digital terorganisir dengan pencarian cepat terindeks, kategorisasi dinamis, dan kontrol hak akses."
          : "Indexed document vaults supporting metadata search, tiered access restrictions, and audit logs.",
      deliverables: [
        lang === "id" ? "Pencarian Dokumen Berkecepatan Tinggi" : "Fast Indexed Document Lookup",
        lang === "id" ? "Metadata Dokumen & Log Aktivitas" : "Document Metadata & Audit Tracking",
        lang === "id" ? "Keamanan Akses Berbasis Peran" : "Role-Based Document Access Control",
      ],
    },
    {
      icon: <Workflow className="w-5 h-5" />,
      title: lang === "id" ? "Integrasi Sistem & Otomasi API" : "System Integrations & API Automation",
      desc:
        lang === "id"
          ? "Menghubungkan aplikasi pihak ketiga seperti Payment Gateway, layanan notifikasi email/WhatsApp, serta sinkronisasi webhook otomatis."
          : "Connecting third-party services including payment gateways, webhook sync, and notification delivery pipelines.",
      deliverables: [
        lang === "id" ? "Integrasi Webhook & Callback Aman" : "Secure Webhook & Callback Verification",
        lang === "id" ? "Automated Email & Event Dispatchers" : "Automated Email & Event Triggers",
        lang === "id" ? "Monitoring & Error Logging" : "Robust Monitoring & Error Alerts",
      ],
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/90 text-sky-800 text-xs font-extrabold shadow-2xs mb-3.5">
            <Workflow className="w-4 h-4 text-sky-600 shrink-0" />
            <span className="tracking-wide font-bold">{lang === "id" ? "Layanan & Solusi" : "Services & Deliverables"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            {lang === "id"
              ? "Solusi Rekayasa Perangkat Lunak Terarah"
              : "Specialized Engineering Capabilities"}
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm md:text-base mt-2.5 leading-relaxed">
            {lang === "id"
              ? "Fokus pada pembuatan software yang benar-benar menyelesaikan masalah operasional dan bisnis."
              : "Focusing on building software that solves concrete business and operational challenges with high reliability."}
          </p>
        </div>

        {/* Services 3-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="bg-zinc-50/70 hover:bg-white rounded-[14px] border border-zinc-200 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-sky-400 hover:shadow-sm transition-all duration-150 group"
            >
              <div>
                {/* Soft cyan-tinted icon badge */}
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-sky-500 group-hover:text-white transition-all duration-150">
                  {svc.icon}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight mb-2 group-hover:text-sky-700 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                  {svc.desc}
                </p>
              </div>

              {/* Deliverable Checkpoints */}
              <div className="pt-4 border-t border-zinc-200/80 space-y-2">
                {svc.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                    <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-10 p-6 rounded-[14px] bg-zinc-50 border border-zinc-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-zinc-950">
              {lang === "id" ? "Membutuhkan solusi sistem kustom?" : "Need a custom systems architecture?"}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600">
              {lang === "id"
                ? "Konsultasikan arsitektur database atau API backend Anda tanpa komitmen."
                : "Discuss your database performance, API design, or fullstack requirements."}
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 active:scale-98 text-white shadow-xs whitespace-nowrap transition-all cursor-pointer"
          >
            <span>{lang === "id" ? "Jadwalkan Diskusi" : "Discuss Project"}</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </a>
        </div>

      </div>
    </section>
  );
}
