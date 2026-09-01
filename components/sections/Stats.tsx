"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Zap, ShieldCheck, CheckCircle2, Clock } from "lucide-react";

export default function Stats() {
  const { lang } = useLanguage();

  const stats = [
    {
      value: "2+",
      unit: lang === "id" ? "Tahun" : "Years",
      label: lang === "id" ? "Pengalaman Rekayasa" : "Engineering Experience",
      subtext: lang === "id" ? "Backend & Fullstack Web" : "Backend & Fullstack Web",
      icon: <Clock className="w-4 h-4 text-sky-600" />,
    },
    {
      value: "10+",
      unit: "Sistem",
      label: lang === "id" ? "Proyek Produksi Selesai" : "Production Systems Built",
      subtext: lang === "id" ? "POS, Arsip, Admin Portals" : "POS, Archive, Dashboards",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    },
    {
      value: "< 25ms",
      unit: "Latency",
      label: lang === "id" ? "Rata-rata Respon API" : "Average API Latency",
      subtext: lang === "id" ? "Query teroptimasi & cache" : "Optimized query & cache",
      icon: <Zap className="w-4 h-4 text-amber-600" />,
    },
    {
      value: "100%",
      unit: "Type-Safe",
      label: lang === "id" ? "Integritas Data End-to-End" : "End-to-End Type Safety",
      subtext: lang === "id" ? "TypeScript + Prisma ORM" : "TypeScript + Prisma ORM",
      icon: <ShieldCheck className="w-4 h-4 text-sky-600" />,
    },
  ];

  return (
    <section className="border-y border-zinc-200/80 bg-zinc-50/50 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-5 rounded-[14px] border border-zinc-200 shadow-2xs flex flex-col justify-between hover:border-sky-400 hover:shadow-xs transition-all duration-150"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                  {item.unit}
                </span>
                <div className="w-6 h-6 rounded-lg bg-zinc-50 border border-zinc-200/60 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 font-mono tracking-tight">
                  {item.value}
                </div>
                <p className="text-xs sm:text-sm font-bold text-zinc-800 leading-snug mt-1">
                  {item.label}
                </p>
                <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 font-normal leading-tight">
                  {item.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
