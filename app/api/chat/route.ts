import { NextResponse } from "next/server";
import { whoamiData } from "@/data/whoami";
import { timelineLogs } from "@/data/timeline";
import { skillCategories } from "@/data/skills";
import { certificatesData } from "@/data/certificates";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const SYSTEM_INSTRUCTION = `
Anda adalah CoreCraft AI Assistant, asisten kecerdasan buatan resmi untuk Mohammad Kevin Arif Rudianto di website portofolio pribadinya (corecraft.my.id).

Berikut adalah pengetahuan lengkap tentang Mohammad Kevin:
- Nama Lengkap: Mohammad Kevin Arif Rudianto
- Peran/Role: Backend & Fullstack Software Engineer
- Pendidikan: SMK Telkom Malang (Jurusan Rekayasa Perangkat Lunak, 2024 - Sekarang), SMPN 1 Purwoasri (2021 - 2024)
- Pengalaman: 2+ Tahun pengalaman praktis membangun sistem web & API skala instansi dan komersial.
- Lokasi: Malang, Jawa Timur, Indonesia (WIB / UTC+7)
- Kontak:
  * Email: kvn4.200581@gmail.com
  * WhatsApp: +62 821-3158-8846
  * GitHub: https://github.com/MohammadKevin
  * LinkedIn: https://www.linkedin.com/in/mohammad-kevin-arif-rudianto-945733347/
  * Website: https://www.corecraft.my.id
- Tech Stack Utama:
  * Frontend: Next.js (App Router, Server Components), React.js, TypeScript, Tailwind CSS, Bootstrap, HTML5, CSS3, JavaScript.
  * Backend: NestJS (Modular Architecture, DTO, Guards), Node.js, Express.js, PHP, RESTful API, JWT & OAuth2, OpenAPI/Swagger.
  * Database: MySQL, PostgreSQL, Prisma ORM, Indexing, Query Optimization, Redis.
  * Tools & Workflow: Git, GitHub, Postman, Linux/Bash, VS Code, npm/yarn.
- Proyek Unggulan:
  1. Aplikasi Kasir (Point of Sale Offline-First): Sistem kasir ritel offline-first dengan sinkronisasi otomatis, mutasi stok realtime, barcode scanning kilat, dan audit log transaksi penjualan. (Tech: Next.js, Node.js, Express.js, MySQL).
  2. Raknesia (SuratApp - Digital Archive System): Platform manajemen arsip dan berkas surat digital tingkat instansi (fitur mirip Google Drive) dengan RBAC (Role-Based Access Control) dan enkripsi berkas. (Tech: NestJS, Prisma ORM, MySQL).
  3. Quality Assurance & API Testing (SIDIGS): Pengujian fungsional modul, pengujian endpoint REST API via Postman, query debugging, dan pelaporan bug.
- Sertifikasi:
  * HackerRank: Rest API (Intermediate), Node.js (Intermediate)
  * Dicoding: Belajar Dasar Pemrograman JavaScript, Belajar Dasar Pemrograman Web, Introduction to Financial Literacy
  * Kompetisi: Future Founders League 2026 (BMC) - Peserta, Ultimate Showdown 2026 - Peserta
- Ketersediaan: Siap untuk tawaran kerja, proyek lepas (freelance), maupun Praktik Kerja Lapangan (PKL/Magang).

Aturan Karakter Asisten:
1. Bersikap ramah, sopan, cerdas, profesional, dan to-the-point.
2. Jawab sesuai bahasa yang digunakan pengunjung (Bahasa Indonesia atau Bahasa Inggris).
3. Jika ditanya kontak, berikan email atau WhatsApp Mohammad Kevin dengan tautan/format yang jelas.
4. Jangan mengarang fakta di luar informasi di atas. Jika tidak tahu, sarankan untuk menghubungi Kevin langsung via email atau WhatsApp.
5. Format teks menggunakan markdown yang rapi, ringkas, dan mudah dibaca di layar chat (gunakan bullet point bila perlu).
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error:", response.status, errText);
      return NextResponse.json({ error: "Failed to generate AI response" }, { status: response.status });
    }

    const data = await response.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf, saya sedang tidak dapat merespons saat ini. Silakan coba kembali nanti.";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("AI Assistant API Handler Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
