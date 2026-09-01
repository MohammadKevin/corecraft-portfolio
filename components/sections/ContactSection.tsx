"use client";

import { useState } from "react";
import {
  Mail,
  Send,
  Check,
  Copy,
  Clock,
  MapPin,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { send as sendEmail } from "@emailjs/browser";
import { useLanguage } from "@/contexts/LanguageContext";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_rmat5kp";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_zt9llkk";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "3qW5e407vXhAIdlX5";

export default function ContactSection() {
  const { lang } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const emailAddress = "kvn4.200581@gmail.com";

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
      await sendEmail(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );
      setFormStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("error");
      setErrorMsg(
        lang === "id"
          ? "Gagal mengirim pesan. Silakan hubungi langsung via email atau WhatsApp."
          : "Failed to send message. Please contact directly via email or WhatsApp."
      );
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-t border-zinc-200 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/90 text-sky-800 text-xs font-extrabold shadow-2xs mb-3.5">
            <MessageSquare className="w-4 h-4 text-sky-600 shrink-0" />
            <span className="tracking-wide font-bold">{lang === "id" ? "Inisiasi Kontak" : "Direct Consultation"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            {lang === "id" ? "Diskusikan Kebutuhan Sistem Anda" : "Let's Build Reliable Software Together"}
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm md:text-base mt-2">
            {lang === "id"
              ? "Buka untuk kolaborasi proyek freelance, arsitektur backend, atau konsultasi optimasi database."
              : "Open for freelance client engagements, backend infrastructure design, and fullstack applications."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Column: Direct Contact Info & SLA Card */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            
            {/* Quick Email Copy Card */}
            <div className="bg-zinc-50 p-5 sm:p-6 rounded-[14px] border border-zinc-300 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 font-mono">
                  Direct Inbox
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SLA &lt; 4h Response
                </span>
              </div>

              <div>
                <p className="text-sm font-mono text-zinc-950 font-bold break-all">
                  {emailAddress}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {lang === "id" ? "Klik tombol di bawah untuk menyalin alamat email." : "Click below to copy email to your clipboard."}
                </p>
              </div>

              <button
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-900 shadow-2xs transition-all cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">{lang === "id" ? "Berhasil Disalin!" : "Copied to Clipboard!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-600" />
                    <span>{lang === "id" ? "Salin Email" : "Copy Email Address"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Facts List */}
            <div className="bg-zinc-50 p-5 sm:p-6 rounded-[14px] border border-zinc-300 shadow-2xs space-y-3.5 text-xs text-zinc-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-zinc-950">Malang, East Java, Indonesia</p>
                  <p className="text-[11px] text-zinc-500">UTC+7 · Open for remote & on-site</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-zinc-950">Working Hours</p>
                  <p className="text-[11px] text-zinc-500">Mon - Sat: 08:00 - 21:00 WIB</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-zinc-950">Code Integrity & NDA</p>
                  <p className="text-[11px] text-zinc-500">Full source ownership & confidentiality</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-50 p-6 sm:p-8 rounded-[14px] border border-zinc-300 shadow-2xs">
              <div className="mb-6 pb-4 border-b border-zinc-200">
                <h3 className="text-lg font-bold text-zinc-950">
                  {lang === "id" ? "Kirim Pesan Langsung" : "Send a Direct Message"}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  {lang === "id"
                    ? "Formulir ini terhubung langsung ke inbox email developer."
                    : "This form dispatches directly to the developer inbox."}
                </p>
              </div>

              {formStatus === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p className="font-medium">
                    {lang === "id"
                      ? "Terima kasih! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda."
                      : "Thank you! Your message has been sent successfully. I will get back to you shortly."}
                  </p>
                </div>
              )}

              {formStatus === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-800 block">
                      {lang === "id" ? "Nama Lengkap *" : "Your Name *"}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={lang === "id" ? "contoh: Kevin Arif" : "e.g. John Doe"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-sky-500 transition-colors shadow-2xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-800 block">
                      {lang === "id" ? "Email Kontak *" : "Email Address *"}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-sky-500 transition-colors shadow-2xs"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-800 block">
                    {lang === "id" ? "Detail Pesan / Kebutuhan Proyek *" : "Project Details / Message *"}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={
                      lang === "id"
                        ? "Jelaskan kebutuhan sistem, timeline, atau teknologi yang ingin Anda gunakan..."
                        : "Describe your project requirements, scope, or timeline..."
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-sky-500 transition-colors resize-none shadow-2xs"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="inline-flex items-center justify-center gap-2 w-full text-sm py-3 rounded-xl font-bold bg-sky-500 hover:bg-sky-600 active:scale-98 text-white shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formStatus === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>{lang === "id" ? "Mengirim..." : "Transmitting..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{lang === "id" ? "Kirim Pesan" : "Send Message"}</span>
                      <Send className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
