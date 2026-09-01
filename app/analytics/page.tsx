"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Activity,
  Laptop,
  Smartphone,
  Tablet,
  RefreshCw,
  Lock,
  ShieldCheck,
  Globe,
  Clock,
  Eye,
  AlertCircle,
} from "lucide-react";

interface Visitor {
  id: string;
  timestamp: string;
  ip: string;
  device: string;
  os: string;
  browser: string;
  userAgent: string;
}

export default function Analytics() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("kevin-analytics-auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    fetch("/api/visit")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVisitors(data.visitors);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [refreshKey, isAuthenticated]);

  const totalVisits = visitors.length;
  const desktopCount = visitors.filter((v) => v.device === "Desktop").length;
  const mobileCount = visitors.filter((v) => v.device === "Mobile").length;
  const tabletCount = visitors.filter((v) => v.device === "Tablet").length;

  const desktopPct = totalVisits ? Math.round((desktopCount / totalVisits) * 100) : 0;
  const mobilePct = totalVisits ? Math.round((mobileCount / totalVisits) * 100) : 0;
  const tabletPct = totalVisits ? Math.round((tabletCount / totalVisits) * 100) : 0;

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "kevin" && password === "kevin135") {
      sessionStorage.setItem("kevin-analytics-auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Username atau password salah!");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-zinc-50 text-zinc-900 flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-md bg-white rounded-[14px] p-7 sm:p-8 border border-zinc-200 shadow-sm">
          <div className="text-center mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Portfolio</span>
            </Link>
            
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5" />
            </div>

            <h1 className="text-xl font-bold text-zinc-950 tracking-tight">Telemetry & Analytics</h1>
            <p className="text-xs text-zinc-500 mt-1">Masukkan kredensial administrator untuk melihat data pengunjung.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">Username</label>
              <input
                type="text"
                required
                placeholder="kevin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-sky-500 text-sm text-zinc-900 bg-zinc-50/50 focus:bg-white transition-all w-full"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-sky-500 text-sm text-zinc-900 bg-zinc-50/50 focus:bg-white transition-all w-full"
              />
            </div>

            {loginError && (
              <div className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer mt-2"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 pt-24 pb-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-200">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Portfolio</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">Analitik Pengunjung</h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">Telemetry log & metrik perangkat pengunjung portofolio.</p>
          </div>

          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 hover:border-sky-300 hover:text-sky-600 rounded-xl text-xs font-bold text-zinc-800 shadow-2xs transition-all disabled:opacity-50 cursor-pointer w-fit"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-sky-600" : ""}`} />
            <span>Segarkan Data</span>
          </button>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
          <div className="bg-white p-5 rounded-[14px] border border-zinc-200 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Total Volume</span>
              <Eye className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono tracking-tight">{totalVisits}</div>
            <p className="text-[11px] text-zinc-500 mt-1">Total page impressions</p>
          </div>

          <div className="bg-white p-5 rounded-[14px] border border-zinc-200 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Desktop</span>
              <Laptop className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono tracking-tight">{desktopCount}</div>
            <p className="text-[11px] text-zinc-500 mt-1">{desktopPct}% dari total audiens</p>
          </div>

          <div className="bg-white p-5 rounded-[14px] border border-zinc-200 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Mobile</span>
              <Smartphone className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono tracking-tight">{mobileCount}</div>
            <p className="text-[11px] text-zinc-500 mt-1">{mobilePct}% dari total audiens</p>
          </div>

          <div className="bg-white p-5 rounded-[14px] border border-zinc-200 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Tablet</span>
              <Tablet className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono tracking-tight">{tabletCount}</div>
            <p className="text-[11px] text-zinc-500 mt-1">{tabletPct}% dari total audiens</p>
          </div>
        </div>

        {/* Device Distribution Progress */}
        <div className="bg-white p-6 rounded-[14px] border border-zinc-200 shadow-2xs mb-8 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-950">Rasio Perangkat Pengunjung</h3>
            <span className="text-xs font-mono text-zinc-500">Live Breakdown</span>
          </div>
          
          <div className="w-full bg-zinc-100 h-3 rounded-full overflow-hidden flex">
            <div style={{ width: `${desktopPct}%` }} className="bg-emerald-500 h-full" title={`Desktop: ${desktopPct}%`} />
            <div style={{ width: `${mobilePct}%` }} className="bg-sky-500 h-full" title={`Mobile: ${mobilePct}%`} />
            <div style={{ width: `${tabletPct}%` }} className="bg-purple-500 h-full" title={`Tablet: ${tabletPct}%`} />
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-600 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Desktop ({desktopPct}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span>Mobile ({mobilePct}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>Tablet ({tabletPct}%)</span>
            </div>
          </div>
        </div>

        {/* Log Table Card */}
        <div className="bg-white rounded-[14px] border border-zinc-200 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-950">Log Aktivitas Pengunjung Terbaru</h3>
            <span className="text-xs font-mono text-zinc-500">{visitors.length} rekaman</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-zinc-400 text-xs font-mono">
              Memuat data log...
            </div>
          ) : visitors.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 text-sm">
              Belum ada data kunjungan yang tercatat.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50/80 text-zinc-600 font-semibold border-b border-zinc-200">
                  <tr>
                    <th className="py-3 px-4 font-mono text-[11px]">Waktu</th>
                    <th className="py-3 px-4 font-mono text-[11px]">IP Address</th>
                    <th className="py-3 px-4 font-mono text-[11px]">Perangkat</th>
                    <th className="py-3 px-4 font-mono text-[11px]">Sistem Operasi</th>
                    <th className="py-3 px-4 font-mono text-[11px]">Browser</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-700">
                  {visitors.slice(0, 50).map((v) => (
                    <tr key={v.id} className="hover:bg-zinc-50/60 transition-colors font-mono text-[11px]">
                      <td className="py-3 px-4 text-zinc-500 whitespace-nowrap">{formatDate(v.timestamp)}</td>
                      <td className="py-3 px-4 font-semibold text-zinc-900">{v.ip}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 text-[10px] font-sans font-medium">
                          {v.device === "Desktop" && <Laptop className="w-3 h-3 text-emerald-600" />}
                          {v.device === "Mobile" && <Smartphone className="w-3 h-3 text-sky-600" />}
                          {v.device === "Tablet" && <Tablet className="w-3 h-3 text-purple-600" />}
                          <span>{v.device}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-800">{v.os}</td>
                      <td className="py-3 px-4 text-zinc-800">{v.browser}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
