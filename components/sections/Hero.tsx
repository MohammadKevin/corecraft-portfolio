"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Activity,
  Server,
  Database,
  Cpu,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

export default function Hero() {
  const { lang } = useLanguage();
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeTab, setActiveTab] = useState<"api" | "query" | "metrics">("api");
  const [reqCount, setReqCount] = useState(4829);

  const t = translations.hero;

  // Real-time simulated micro-metric increment
  useEffect(() => {
    const interval = setInterval(() => {
      setReqCount((prev) => prev + Math.floor(Math.random() * 5));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const copyInstall = () => {
    navigator.clipboard.writeText("npx corecraft-kevin@latest");
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-zinc-50/80 via-white to-white"
    >
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 saas-grid-bg opacity-70 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-100/40 via-sky-50/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        
        {/* Top Editorial Pill with Photo Avatar */}
        <div className="flex justify-center mb-6">
          <div className="saas-badge bg-white/90 backdrop-blur-md shadow-xs border-zinc-200/90 text-zinc-800 py-1.5 px-3 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden relative shrink-0 border border-sky-400">
              <Image
                src="/images/logo.png"
                alt="Kevin"
                fill
                sizes="20px"
                className="object-cover object-top"
              />
            </div>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="font-semibold text-zinc-950 text-xs">Mohammad Kevin</span>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-600 text-xs truncate max-w-[160px] sm:max-w-none">
              {lang === "id" ? "Backend & Fullstack Developer" : "Fullstack & Backend Engineer"}
            </span>
          </div>
        </div>

        {/* High-Impact Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-5">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-950 tracking-tight leading-[1.15] sm:leading-[1.1]">
            {lang === "id" ? (
              <>
                Membangun Arsitektur API{" "}
                <span className="text-sky-500">Scalable</span>{" "}
                & Sistem Fullstack Modern.
              </>
            ) : (
              <>
                Architecting High-Throughput{" "}
                <span className="text-sky-500">APIs</span>{" "}
                & Modern Web Systems.
              </>
            )}
          </h1>

          {/* Concise Subtext */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed font-normal px-2">
            {lang === "id" ? (
              <>
                Developer dari <span className="font-medium text-zinc-900">SMK Telkom Malang</span> dengan 2+ tahun pengalaman nyata merancang sistem kasir POS, pipeline ORM type-safe, dan REST API berlatensi rendah.
              </>
            ) : (
              <>
                Software Engineer specializing in <span className="font-medium text-zinc-900">Next.js, NestJS, Prisma ORM, and PostgreSQL</span>. Building production-grade transactional services with zero fluff.
              </>
            )}
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-3">
            <a
              href="#contact"
              id="hero-contact-cta"
              className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-98 text-white font-bold rounded-xl shadow-sm text-xs sm:text-sm px-5 py-2.5 w-full sm:w-auto transition-all cursor-pointer"
            >
              <span>{t.contactBtn[lang]}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>

            <Link
              href="/cv"
              id="hero-view-cv"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-900 font-semibold rounded-xl text-xs sm:text-sm px-5 py-2.5 w-full sm:w-auto transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-zinc-500" />
              <span>{lang === "id" ? "Curriculum Vitae" : "View Resume / CV"}</span>
            </Link>

            <a
              href="https://github.com/MohammadKevin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold rounded-xl text-xs sm:text-sm px-3.5 py-2.5 hidden sm:inline-flex transition-all cursor-pointer"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4 text-zinc-700" />
            </a>
          </div>

          {/* Terminal Command Quick Copy */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100/80 border border-zinc-200/80 text-[11px] sm:text-xs font-mono text-zinc-600 max-w-full overflow-hidden">
              <Terminal className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span className="text-zinc-900 font-semibold truncate">$ npx corecraft-kevin@latest</span>
              <button
                onClick={copyInstall}
                aria-label="Copy command"
                className="ml-1 text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer shrink-0"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════ DETAILED REALISTIC UI MOCKUP CARD ══════════════ */}
        <div className="mt-10 sm:mt-14 max-w-5xl mx-auto">
          <div className="rounded-[14px] border border-zinc-200 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:border-sky-400 hover:shadow-md">
            
            {/* Mockup Header / Window Chrome */}
            <div className="bg-zinc-50/90 px-3 sm:px-4 py-3 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-300" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-300" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-300" />
                </div>
                <span className="h-4 w-px bg-zinc-200 mx-1 hidden sm:block" />
                <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-white border border-zinc-200 text-[10px] sm:text-[11px] font-mono text-zinc-600">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 inline-block" />
                  <span className="truncate max-w-[140px] sm:max-w-none">api.kevin.dev/v1/telemetry</span>
                </div>
              </div>

              {/* Mockup Tabs */}
              <div className="flex items-center gap-1 bg-zinc-200/60 p-0.5 rounded-lg text-[11px] sm:text-xs font-medium overflow-x-auto">
                <button
                  onClick={() => setActiveTab("api")}
                  className={`px-2 sm:px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                    activeTab === "api"
                      ? "bg-white text-zinc-950 shadow-2xs font-semibold"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  API Gateway
                </button>
                <button
                  onClick={() => setActiveTab("query")}
                  className={`px-2 sm:px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                    activeTab === "query"
                      ? "bg-white text-zinc-950 shadow-2xs font-semibold"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  Prisma Query
                </button>
                <button
                  onClick={() => setActiveTab("metrics")}
                  className={`px-2 sm:px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                    activeTab === "metrics"
                      ? "bg-white text-zinc-950 shadow-2xs font-semibold"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  Health
                </button>
              </div>
            </div>

            {/* Mockup Body Content */}
            <div className="p-4 sm:p-6 bg-white space-y-4 sm:space-y-6">
              
              {/* Telemetry Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 flex flex-col">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase text-zinc-500 tracking-wider">
                    Throughput
                  </span>
                  <div className="flex items-baseline gap-1 sm:gap-1.5 mt-1">
                    <span className="text-lg sm:text-xl font-extrabold text-zinc-950 font-mono">
                      {reqCount.toLocaleString()}
                    </span>
                    <span className="text-[10px] sm:text-xs text-emerald-600 font-medium font-mono">req/s</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5">99.98% success</span>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 flex flex-col">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase text-zinc-500 tracking-wider">
                    P99 Latency
                  </span>
                  <div className="flex items-baseline gap-1 sm:gap-1.5 mt-1">
                    <span className="text-lg sm:text-xl font-extrabold text-sky-600 font-mono">11.4</span>
                    <span className="text-[10px] sm:text-xs text-sky-600 font-medium font-mono">ms</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-emerald-600 mt-0.5">↓ 42% indexed</span>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 flex flex-col">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase text-zinc-500 tracking-wider">
                    DB Pool
                  </span>
                  <div className="flex items-baseline gap-1 sm:gap-1.5 mt-1">
                    <span className="text-lg sm:text-xl font-extrabold text-zinc-950 font-mono">18/20</span>
                    <span className="text-[10px] sm:text-xs text-emerald-600 font-medium">Optimal</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5">PostgreSQL · Prisma</span>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 flex flex-col">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase text-zinc-500 tracking-wider">
                    System Health
                  </span>
                  <div className="flex items-baseline gap-1 sm:gap-1.5 mt-1">
                    <span className="text-lg sm:text-xl font-extrabold text-emerald-600 font-mono">100%</span>
                    <span className="text-[10px] sm:text-xs text-zinc-400 font-medium">Active</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5">6 Services Green</span>
                </div>
              </div>

              {/* Tab Dynamic Views with horizontal scroll safety */}
              {activeTab === "api" && (
                <div className="editorial-code-box p-3 sm:p-4 rounded-xl space-y-2 border border-zinc-800 text-zinc-200 overflow-x-auto">
                  <div className="flex flex-wrap items-center justify-between pb-2 border-b border-zinc-800 text-xs text-zinc-400 gap-2">
                    <span className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-800">
                        POST
                      </span>
                      <code className="text-[11px] sm:text-xs">/api/v1/pos/transaction/checkout</code>
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">200 OK · 14.8ms</span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono space-y-1 text-zinc-300 pt-1 leading-relaxed overflow-x-auto">
                    <p><span className="text-sky-400">export async function</span> <span className="text-amber-300">processOrder</span>(orderPayload: <span className="text-emerald-400">CheckoutDTO</span>) &#123;</p>
                    <p className="pl-4 text-zinc-400">// 1. Atomic Prisma Transaction with balance check</p>
                    <p className="pl-4"><span className="text-purple-400">const</span> receipt = <span className="text-sky-400">await</span> prisma.$transaction(<span className="text-sky-400">async</span> (tx) =&gt; &#123;</p>
                    <p className="pl-8"><span className="text-sky-400">const</span> stock = <span className="text-sky-400">await</span> tx.inventory.decrement(&#123; id: orderPayload.itemId, qty: 1 &#125;);</p>
                    <p className="pl-8"><span className="text-sky-400">return</span> tx.orders.create(&#123; data: &#123; ...orderPayload, invoiceId: generateUUID() &#125; &#125;);</p>
                    <p className="pl-4">&#125;);</p>
                    <p className="pl-4"><span className="text-sky-400">return</span> Response.json(&#123; status: <span className="text-emerald-300">&quot;CONFIRMED&quot;</span>, receipt &#125;);</p>
                    <p>&#125;</p>
                  </div>
                </div>
              )}

              {activeTab === "query" && (
                <div className="editorial-code-box p-3 sm:p-4 rounded-xl space-y-2 border border-zinc-800 text-zinc-200 overflow-x-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs text-zinc-400">
                    <span className="text-sky-400 font-mono">QUERY EXPLAIN ANALYZE</span>
                    <span className="text-zinc-400 font-mono text-[11px]">Execution: 0.84ms</span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono text-zinc-300 space-y-1 overflow-x-auto">
                    <p className="text-emerald-400">-&gt; Index Scan using idx_transactions_created_at on transactions (cost=0.42..8.44)</p>
                    <p className="text-zinc-400">   Filter: (branch_id = &apos;b_malang_01&apos; AND status = &apos;PAID&apos;)</p>
                    <p className="text-zinc-400">   Rows Removed by Filter: 0</p>
                    <p className="text-sky-300">-&gt; Planning Time: 0.112 ms | Execution Time: 0.841 ms</p>
                  </div>
                </div>
              )}

              {activeTab === "metrics" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-zinc-900">NestJS Microservice</p>
                      <p className="text-[11px] text-zinc-500 font-mono">Uptime 99.99%</p>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-zinc-900">Next.js Edge Node</p>
                      <p className="text-[11px] text-zinc-500 font-mono">Cold Start &lt; 25ms</p>
                    </div>
                    <Zap className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-zinc-900">PostgreSQL Cloud</p>
                      <p className="text-[11px] text-zinc-500 font-mono">Replica in Sync</p>
                    </div>
                    <Database className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
              )}

              {/* Bottom Telemetry Footer Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-zinc-100 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">Production Environment: Ready for Deployments</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] text-zinc-400">
                  <span>Region: ap-southeast-1</span>
                  <span>TLS 1.3 Strict</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
