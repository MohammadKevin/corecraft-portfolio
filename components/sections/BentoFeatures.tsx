"use client";

import { useState } from "react";
import {
  Layers,
  Database,
  Cpu,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Code2,
  GitBranch,
  ArrowUpRight,
  Server,
  Workflow,
  Lock,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BentoFeatures() {
  const { lang } = useLanguage();
  const [selectedRoute, setSelectedRoute] = useState<"/api/v1/checkout" | "/api/v1/archive" | "/api/v1/inventory">("/api/v1/checkout");

  const routeDetails = {
    "/api/v1/checkout": {
      method: "POST",
      latency: "14ms",
      status: "200 OK",
      desc: lang === "id" ? "Penguncian transaksi atomik tabel pesanan & stok inventaris." : "Atomic transaction lock across order & inventory tables.",
    },
    "/api/v1/archive": {
      method: "GET",
      latency: "8ms",
      status: "200 OK",
      desc: lang === "id" ? "Pencarian terindeks cepat pada 50,000+ dokumen digital." : "Indexed search across 50,000+ digital documents.",
    },
    "/api/v1/inventory": {
      method: "PATCH",
      latency: "11ms",
      status: "200 OK",
      desc: lang === "id" ? "Rekonsiliasi stok multi-lokasi dengan optimistic concurrency." : "Real-time stock reconciliation with optimistic concurrency.",
    },
  };

  return (
    <section id="features" className="py-16 sm:py-24 bg-zinc-50/70 border-t border-zinc-200/90 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/90 text-sky-800 text-xs font-extrabold shadow-2xs mb-3.5">
            <Layers className="w-4 h-4 text-sky-600 shrink-0" />
            <span className="tracking-wide font-bold">{lang === "id" ? "Arsitektur & Kapabilitas" : "Engineering Highlights"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            {lang === "id"
              ? "Dirancang untuk reliabilitas dan performa tinggi."
              : "Built for scalable reliability & rapid execution."}
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm md:text-base mt-2.5 leading-relaxed">
            {lang === "id"
              ? "Kombinasi backend modular yang solid, pemodelan database relasional optimal, dan antarmuka web modern."
              : "A robust combination of modular backend infrastructure, optimized SQL query plans, and modern fullstack ergonomics."}
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

          {/* ── CARD 1: Modular Backend Architecture (Span 2) ── */}
          <div className="md:col-span-2 bg-white rounded-[14px] border border-zinc-200 p-5 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-sky-400 hover:shadow-sm transition-all duration-150 overflow-hidden">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold font-mono">
                  <Server className="w-3.5 h-3.5" />
                  <span>NestJS & Express Architecture</span>
                </span>
                <span className="text-[11px] font-mono text-zinc-400 font-medium">Microservice Ready</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight">
                {lang === "id"
                  ? "Arsitektur API Modular & Gateway Berperforma Tinggi"
                  : "Modular API Gateway & Resilient Controller Layer"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed max-w-xl">
                {lang === "id"
                  ? "Pemisahan concern yang tegas menggunakan Controller, Service, DTO Validation, dan Exception Filters untuk maintainability jangka panjang."
                  : "Strict separation of concerns via Controller, Service, DTO validation, and custom exception interceptors built for enterprise maintenance."}
              </p>
            </div>

            {/* Interactive Functional Preview */}
            <div className="mt-6 pt-5 border-t border-zinc-200 bg-zinc-50 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 p-4 sm:p-5 rounded-b-[14px]">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 mb-2.5">
                <span>Interactive Route Explorer</span>
                <span className="text-[10px] sm:text-[11px] font-mono text-emerald-600 font-bold">● Live Sim</span>
              </div>

              {/* Route Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 mb-3">
                {(["/api/v1/checkout", "/api/v1/archive", "/api/v1/inventory"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRoute(r)}
                    className={`px-2.5 py-1.5 rounded-lg text-left text-[11px] sm:text-xs font-mono transition-all truncate cursor-pointer ${
                      selectedRoute === r
                        ? "bg-white text-zinc-950 border border-zinc-300 shadow-2xs font-bold"
                        : "bg-zinc-200/60 text-zinc-600 hover:text-zinc-950 border border-transparent"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Route Inspector Pill */}
              <div className="bg-zinc-950 text-zinc-200 p-3 rounded-xl font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-zinc-800 overflow-x-auto">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 font-bold text-[10px] border border-sky-800 shrink-0">
                    {routeDetails[selectedRoute].method}
                  </span>
                  <span className="text-zinc-300 text-[11px] sm:text-xs truncate">{selectedRoute}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] shrink-0">
                  <span className="text-emerald-400 font-semibold">{routeDetails[selectedRoute].status}</span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-sky-300 font-medium">Latency: {routeDetails[selectedRoute].latency}</span>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2 leading-tight">
                {routeDetails[selectedRoute].desc}
              </p>
            </div>
          </div>

          {/* ── CARD 2: Database Performance (Span 1) ── */}
          <div className="bg-white rounded-[14px] border border-zinc-200 p-5 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-sky-400 hover:shadow-sm transition-all duration-150">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono">
                  <Database className="w-3.5 h-3.5" />
                  <span>PostgreSQL & Prisma</span>
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight">
                {lang === "id"
                  ? "Optimasi Database Relasional"
                  : "Relational Query Tuning"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                {lang === "id"
                  ? "Desain skema normalisasi, query analyzer, dan strategi indexing yang menghasilkan eksekusi 40% lebih cepat."
                  : "Schema normalization, composite index strategizing, and sub-millisecond query execution plans."}
              </p>
            </div>

            {/* Widget Metric Preview */}
            <div className="mt-6 p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-medium">Query Optimization</span>
                <span className="font-mono font-bold text-emerald-600">40% Faster</span>
              </div>
              <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[85%]" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span>Before: 120ms</span>
                <span className="text-emerald-700 font-bold">After: 18ms</span>
              </div>
            </div>
          </div>

          {/* ── CARD 3: Transactional POS Engine (Span 1) ── */}
          <div className="bg-white rounded-[14px] border border-zinc-200 p-5 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-sky-400 hover:shadow-sm transition-all duration-150">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold font-mono">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Transactional Safety</span>
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight">
                {lang === "id"
                  ? "Sistem Kasir & Transaksi Akurat"
                  : "POS & Ledger Integrity"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                {lang === "id"
                  ? "Sistem transaksi POS yang menjamin konsistensi stok tanpa race condition saat lonjakan checkout."
                  : "ACID-compliant inventory deduction guarantees zero race-conditions during peak checkout bursts."}
              </p>
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-zinc-900 text-zinc-200 border border-zinc-800 space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 pb-1 border-b border-zinc-800">
                <span>ACID Ledger Check</span>
                <span className="text-emerald-400 font-bold">PASSED</span>
              </div>
              <div className="text-[11px] text-zinc-300">
                <span>trx_state: </span>
                <span className="text-emerald-400">&apos;COMMITTED&apos;</span>
              </div>
              <div className="text-[11px] text-zinc-300">
                <span>stock_variance: </span>
                <span className="text-sky-300 font-semibold">0.00%</span>
              </div>
            </div>
          </div>

          {/* ── CARD 4: Next.js Modern Fullstack (Span 2) ── */}
          <div className="md:col-span-2 bg-white rounded-[14px] border border-zinc-200 p-5 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-sky-400 hover:shadow-sm transition-all duration-150">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold font-mono">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Next.js 16 App Router & RSC</span>
                </span>
                <span className="text-xs font-mono text-emerald-600 font-bold">100 Lighthouse Perf</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight">
                {lang === "id"
                  ? "Pengembangan Fullstack Modern & Type-Safe"
                  : "End-to-End Type-Safe Fullstack Engineering"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed max-w-xl">
                {lang === "id"
                  ? "Memanfaatkan React Server Components untuk rendering super cepat, integrasi API zero-latency, dan UI yang responsif di semua resolusi layar."
                  : "Leveraging React Server Components for rapid TTFB, zero bundle-size overhead for server logic, and clean responsive interfaces."}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <p className="text-[10px] sm:text-[11px] text-zinc-500 font-medium">Server Components</p>
                <p className="text-xs sm:text-sm font-bold text-zinc-900 mt-0.5">Zero Client Bloat</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <p className="text-[10px] sm:text-[11px] text-zinc-500 font-medium">Tailwind CSS 4</p>
                <p className="text-xs sm:text-sm font-bold text-zinc-900 mt-0.5">High-End Editorial</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 col-span-2 sm:col-span-1">
                <p className="text-[10px] sm:text-[11px] text-zinc-500 font-medium">TypeScript Strict</p>
                <p className="text-xs sm:text-sm font-bold text-emerald-600 mt-0.5">Zero Any Types</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
