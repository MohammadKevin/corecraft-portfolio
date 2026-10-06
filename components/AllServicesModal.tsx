"use client";

import React from "react";
import { Server, Database, Monitor, ShoppingCart, FolderClosed, RefreshCw, X, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Lang } from "@/data/translations";

interface AllServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

export default function AllServicesModal({ isOpen, onClose, lang }: AllServicesModalProps) {
  if (!isOpen) return null;

  const servicesData = [
    { icon: Server, title: { id: "Backend & RESTful API", en: "Backend & RESTful API" }, desc: { id: "API modular dengan NestJS & Express, DTO validation, otentikasi JWT/OAuth2, serta dokumentasi OpenAPI/Swagger.", en: "Modular APIs with NestJS & Express, DTO validation, JWT/OAuth2 authentication, and OpenAPI/Swagger documentation." } },
    { icon: Database, title: { id: "Database & Query Tuning", en: "Database & Query Tuning" }, desc: { id: "Skema relasional PostgreSQL/MySQL efisien, query indexing terstruktur, migrasi Prisma ORM, dan in-memory Redis caching.", en: "Efficient relational PostgreSQL/MySQL schemas, structured query indexing, Prisma ORM migrations, and Redis caching." } },
    { icon: Monitor, title: { id: "Fullstack Web Apps", en: "Fullstack Web Apps" }, desc: { id: "Aplikasi web end-to-end dengan Next.js App Router, React Server Components, TypeScript yang type-safe, dan Tailwind CSS.", en: "End-to-end web apps with Next.js App Router, React Server Components, type-safe TypeScript, and Tailwind CSS." } },
    { icon: ShoppingCart, title: { id: "POS & Inventory Systems", en: "POS & Inventory Systems" }, desc: { id: "Sistem kasir multi-cabang, barcode scanner, mutasi stok realtime, struk digital, dan log audit transaksi akurat.", en: "Multi-branch cashier systems, barcode scanner, real-time stock mutation, digital invoices, and precise transaction audit logs." } },
    { icon: FolderClosed, title: { id: "Digital Archive & Records", en: "Digital Archive & Records" }, desc: { id: "Arsip terstruktur, metadata tagging, kontrol akses berbasis peran (RBAC), serta penyimpanan berkas terenkripsi.", en: "Structured archiving, metadata tagging, role-based access control (RBAC), and encrypted file storage." } },
    { icon: RefreshCw, title: { id: "Third-Party API & Payments", en: "Third-Party API & Payments" }, desc: { id: "Integrasi payment gateway (Midtrans/Xendit), webhook berprinsip idempotent, dan sinkronisasi data async.", en: "Payment gateway integration (Midtrans/Xendit), idempotent webhooks, and asynchronous data synchronization." } },
  ];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-ink/50 backdrop-blur-md overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto brutal-card p-5 sm:p-8 shadow-[8px_8px_0_var(--border)] flex flex-col gap-6 text-left my-auto"
      >
        <div className="flex items-start justify-between gap-4 border-b-[3px] border-foreground pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-accent-violet" />
              <span className="font-mono text-xs uppercase text-accent-violet font-bold tracking-wider">
                {lang === "id" ? "SEMUA LAYANAN REKAYASA" : "ALL ENGINEERING SERVICES"}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
              {lang === "id" ? "Katalog Solusi & Kapabilitas Lengkap" : "Complete Capabilities & Solutions Catalog"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="p-2 rounded-full border-2 border-foreground shadow-[2px_2px_0_var(--border)] hover:shadow-[4px_4px_0_var(--accent-pink)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer bg-surface text-ink shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {servicesData.map((svc, idx) => (
            <motion.div
              key={svc.title.en}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="brutal-card p-6 shadow-[4px_4px_0_var(--border)] flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-accent-yellow/20 text-ink flex items-center justify-center mb-4 border-2 border-foreground shadow-[3px_3px_0_var(--border)]">
                  <svc.icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-ink mb-2">{svc.title[lang]}</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-muted">{svc.desc[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}