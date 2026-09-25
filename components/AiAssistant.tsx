"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, X, Send, Sparkles, Bot, User, Loader2, RotateCcw, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AiAssistant() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            lang === "id"
              ? "Halo! Saya **CoreCraft AI**, asisten kecerdasan buatan untuk portofolio Mohammad Kevin. Ada yang bisa saya bantu terkait proyek, tech stack, atau ketersediaan Kevin?"
              : "Hi! I'm **CoreCraft AI**, the official virtual assistant for Mohammad Kevin's portfolio. How can I help you regarding Kevin's projects, tech stack, or work availability?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [lang, messages.length]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    {
      id: "stack",
      label: lang === "id" ? "Tech Stack Kevin" : "Kevin's Tech Stack",
      prompt: lang === "id" ? "Apa saja tech stack utama dan keahlian yang dikuasai Mohammad Kevin?" : "What are Mohammad Kevin's core tech stacks and skills?",
    },
    {
      id: "projects",
      label: lang === "id" ? "Proyek Unggulan" : "Featured Projects",
      prompt: lang === "id" ? "Ceritakan proyek-proyek unggulan yang pernah dibuat oleh Kevin seperti Kasir POS dan Raknesia." : "Tell me about Kevin's featured projects like POS Cashier and Raknesia.",
    },
    {
      id: "contact",
      label: lang === "id" ? "Kontak & Kolaborasi" : "Contact & Hire",
      prompt: lang === "id" ? "Bagaimana cara menghubungi Kevin untuk tawaran kerja, proyek, atau magang?" : "How can I contact Kevin for job offers, freelance projects, or internships?",
    },
    {
      id: "education",
      label: lang === "id" ? "Pendidikan & Sertifikasi" : "Education & Certs",
      prompt: lang === "id" ? "Di mana Kevin bersekolah dan apa saja sertifikasi yang sudah diraih?" : "Where does Kevin study and what certifications does he hold?",
    },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      const replyMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || (lang === "id" ? "Maaf, tidak ada respons yang diterima." : "Sorry, no response received."),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, replyMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            lang === "id"
              ? "Maaf, terjadi gangguan saat menghubungkan ke AI. Silakan hubungi Kevin langsung via email di kvn4.200581@gmail.com."
              : "Sorry, an error occurred while contacting AI. Please reach out to Kevin directly at kvn4.200581@gmail.com.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-" + Date.now(),
        role: "assistant",
        content:
          lang === "id"
            ? "Percakapan telah direset. Ada yang ingin Anda tanyakan tentang Mohammad Kevin?"
            : "Chat reset. Is there anything you'd like to ask about Mohammad Kevin?",
        timestamp: new Date(),
      },
    ]);
  };

  const formatMessageText = (text: string) => {
    // Simple markdown bold formatting
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-bold text-zinc-950">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Toggle Button (Bottom Right) */}
      <aside aria-label="CoreCraft AI Assistant" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 print:hidden">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open CoreCraft AI Assistant"
            title={lang === "id" ? "Buka CoreCraft AI Assistant" : "Open CoreCraft AI Assistant"}
            className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#1C1B1D] text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)] border border-white/20 hover:bg-black transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Subtle glowing ring aura */}
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-400/30 via-cyan-300/30 to-sky-500/30 blur-xs group-hover:opacity-100 opacity-50 transition-opacity -z-10 animate-pulse" />
            
            {/* CoreCraft Logo */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl overflow-hidden shadow-xs">
              <Image
                src="/images/corecraft-logo-dark.svg"
                alt="CoreCraft AI"
                width={32}
                height={32}
                className="w-full h-full object-contain transition-transform group-hover:scale-110 duration-300"
              />
            </div>

            {/* Sparkle Badge at top-right */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-500 border-2 border-[#1C1B1D] flex items-center justify-center shadow-xs">
              <Sparkles className="w-2 h-2 text-white" />
            </span>
          </button>
        )}
      </aside>

      {/* Interactive Chat Window Modal */}
      {isOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="CoreCraft AI Chat Window"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] md:w-[420px] max-h-[85vh] h-[580px] flex flex-col rounded-3xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_24px_60px_-10px_rgba(28,27,29,0.3)] overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-5 duration-300 print:hidden"
        >
          {/* Header */}
          <header className="px-4 py-3.5 border-b border-zinc-200/80 bg-gradient-to-r from-zinc-50 via-white to-sky-50/40 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center shadow-xs shrink-0">
                <Image
                  src="/images/corecraft-logo-dark.svg"
                  alt="CoreCraft AI"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-[13px] font-bold text-[#1C1B1D] leading-none">
                    CoreCraft AI
                  </h2>
                  <span className="text-[9.5px] font-mono font-semibold px-1.5 py-0.2 rounded bg-sky-50 text-sky-700 border border-sky-200/60">
                    Gemini 2.5
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10.5px] text-zinc-500 font-medium">
                    {lang === "id" ? "Asisten Virtual Portofolio" : "Portfolio Assistant"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title={lang === "id" ? "Reset Percakapan" : "Reset Conversation"}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Messages Area */}
          <main className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#1C1B1D] text-white flex items-center justify-center p-1 shrink-0 mt-0.5 shadow-2xs">
                      <Bot className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? "bg-[#1C1B1D] text-white rounded-br-xs shadow-xs font-medium"
                        : "bg-zinc-100/80 text-zinc-800 rounded-tl-xs border border-zinc-200/60"
                    }`}
                  >
                    {formatMessageText(m.content)}
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center p-1 shrink-0 mt-0.5 shadow-2xs">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-[#1C1B1D] text-white flex items-center justify-center p-1 shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                </div>
                <div className="bg-zinc-100/80 text-zinc-700 rounded-2xl rounded-tl-xs px-3.5 py-2.5 border border-zinc-200/60 flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600" />
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {lang === "id" ? "Sedang berpikir..." : "Thinking..."}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </main>

          {/* Quick Prompt Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
              {quickPrompts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSendMessage(p.prompt)}
                  className="px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 border border-zinc-200 text-[10.5px] font-medium text-zinc-600 transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Box Footer */}
          <footer className="p-3 border-t border-zinc-200/80 bg-zinc-50/50 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === "id" ? "Tanyakan apapun tentang Kevin..." : "Ask anything about Kevin..."}
                disabled={loading}
                className="flex-1 px-3.5 py-2.5 rounded-full bg-white border border-zinc-200/90 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 shadow-2xs"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="w-9 h-9 rounded-full bg-[#1C1B1D] hover:bg-black disabled:opacity-40 disabled:hover:bg-[#1C1B1D] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0 active:scale-90"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </form>
            <div className="flex items-center justify-center gap-1 mt-2 text-[9.5px] text-zinc-400 font-mono">
              <Sparkles className="w-2.5 h-2.5 text-sky-500" />
              <span>Powered by Gemini & CoreCraft Intelligence</span>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
