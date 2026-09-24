"use client";

import React from "react";
import { Server, Database, Monitor, ShoppingCart, FolderClosed, RefreshCw, X, Sparkles } from "lucide-react";
import { Lang } from "@/data/translations";

interface AllServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

export default function AllServicesModal({ isOpen, onClose, lang }: AllServicesModalProps) {
  if (!isOpen) return null;

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-8 shadow-2xl border border-zinc-200/80 relative flex flex-col gap-6 text-left my-auto">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span className="font-mono text-xs uppercase text-sky-700 font-semibold tracking-wider">
                {lang === "id" ? "SEMUA LAYANAN REKAYASA" : "ALL ENGINEERING SERVICES"}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1C1B1D]">
              {lang === "id" ? "Katalog Solusi & Kapabilitas Lengkap" : "Complete Capabilities & Solutions Catalog"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {servicesData.map((svc) => (
            <div
              key={svc.title.en}
              className="p-6 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 hover:bg-sky-500/[0.03] hover:border-sky-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-4 border border-sky-400/20">
                  <svc.icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#1C1B1D] mb-2">{svc.title[lang]}</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-[#71717A]">{svc.desc[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
