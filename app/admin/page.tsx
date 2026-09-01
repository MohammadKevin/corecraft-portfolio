"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Folder,
  Layers,
  Activity,
  Award,
  ShieldCheck,
  Search,
  RefreshCw,
  X,
  Laptop,
  Smartphone,
  Monitor,
  Terminal,
  Grid,
  Lock,
  ArrowRight,
  User,
  Key,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";

// Types definition
interface Project {
  id: string;
  title: string;
  category: string;
  type: string;
  color: string;
  desc: string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
}

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category?: string;
  skills?: string[];
  credentialUrl?: string;
}

interface Visitor {
  id: string;
  ip: string;
  userAgent: string;
  device: string;
  browser: string;
  os: string;
  timestamp: string;
}

interface GithubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  repoUrl: string;
  homepage: string;
  updatedAt: string;
}

const colorGradients = [
  { label: "Sky Blue", value: "from-sky-500 to-cyan-500", bg: "bg-sky-500" },
  { label: "Indigo Cobalt", value: "from-indigo-600 to-sky-500", bg: "bg-indigo-600" },
  { label: "Emerald Mint", value: "from-emerald-600 to-teal-500", bg: "bg-emerald-600" },
  { label: "Violet Purple", value: "from-purple-600 to-indigo-500", bg: "bg-purple-600" },
  { label: "Amber Orange", value: "from-amber-500 to-orange-600", bg: "bg-amber-500" },
  { label: "Rose Pink", value: "from-rose-500 to-red-600", bg: "bg-rose-500" },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "analytics">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCertificates, setLoadingCertificates] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Certificate Form States
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [certId, setCertId] = useState("");
  const [certTitle, setCertTitle] = useState("");
  const [certIssuer, setCertIssuer] = useState("");
  const [certDate, setCertDate] = useState("2024");
  const [certCategory, setCertCategory] = useState("Backend");
  const [certSkills, setCertSkills] = useState("");
  const [certCredentialUrl, setCertCredentialUrl] = useState("");

  // Project Form States
  const [isEditing, setIsEditing] = useState(false);
  const [formId, setFormId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formType, setFormType] = useState("Fullstack");
  const [formColor, setFormColor] = useState("from-sky-500 to-cyan-500");
  const [formDesc, setFormDesc] = useState("");
  const [formTech, setFormTech] = useState("");
  const [formDemoUrl, setFormDemoUrl] = useState("");
  const [formRepoUrl, setFormRepoUrl] = useState("");

  // GitHub Repositories State
  const [githubUsername, setGithubUsername] = useState("MohammadKevin");
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [loadingGithubRepos, setLoadingGithubRepos] = useState(false);
  const [repoInputSearch, setRepoInputSearch] = useState("");
  const [isRepoDropdownOpen, setIsRepoDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVisitorQuery, setSearchVisitorQuery] = useState("");
  const [visitorFilterDevice, setVisitorFilterDevice] = useState("All");

  // Notifications (Toast)
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | null }>({ msg: "", type: null });
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsRepoDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Authenticate on Load
  useEffect(() => {
    if (sessionStorage.getItem("kevin-analytics-auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch Projects and GitHub Repos if Authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchProjects();
    fetchGithubRepos("MohammadKevin");
  }, [isAuthenticated]);

  // Fetch Certificates if Tab Active or on Load
  useEffect(() => {
    if (!isAuthenticated) return;
    if (activeTab === "certificates") {
      fetchCertificates();
    }
  }, [isAuthenticated, activeTab]);

  const fetchCertificates = () => {
    setLoadingCertificates(true);
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCertificates(data.certificates);
        } else {
          showToast(data.error || "Gagal mengambil data sertifikat", "error");
        }
      })
      .catch((err) => {
        console.error("Fetch certificates error:", err);
        showToast("Error koneksi server", "error");
      })
      .finally(() => setLoadingCertificates(false));
  };

  const handleSaveCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle || !certIssuer || !certDate) {
      showToast("Harap isi semua bidang wajib", "error");
      return;
    }

    const payload = {
      id: certId,
      title: certTitle,
      issuer: certIssuer,
      date: certDate,
      category: certCategory,
      skills: certSkills,
      credentialUrl: certCredentialUrl,
    };

    const method = isEditingCert ? "PUT" : "POST";
    try {
      const res = await fetch("/api/certificates", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showToast(isEditingCert ? "Sertifikat berhasil diperbarui!" : "Sertifikat baru berhasil ditambahkan!", "success");
        resetCertForm();
        fetchCertificates();
      } else {
        showToast(data.error || "Gagal menyimpan sertifikat", "error");
      }
    } catch {
      showToast("Error koneksi saat menyimpan sertifikat", "error");
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus sertifikat ini?")) return;
    try {
      const res = await fetch(`/api/certificates?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("Sertifikat berhasil dihapus!", "success");
        fetchCertificates();
      } else {
        showToast(data.error || "Gagal menghapus sertifikat", "error");
      }
    } catch {
      showToast("Error koneksi saat menghapus sertifikat", "error");
    }
  };

  const handleEditCertClick = (cert: CertificateItem) => {
    setIsEditingCert(true);
    setCertId(cert.id);
    setCertTitle(cert.title);
    setCertIssuer(cert.issuer);
    setCertDate(cert.date);
    setCertCategory(cert.category || "Backend");
    setCertSkills(Array.isArray(cert.skills) ? cert.skills.join(", ") : "");
    setCertCredentialUrl(cert.credentialUrl || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetCertForm = () => {
    setIsEditingCert(false);
    setCertId("");
    setCertTitle("");
    setCertIssuer("");
    setCertDate("2024");
    setCertCategory("Backend");
    setCertSkills("");
    setCertCredentialUrl("");
  };

  const showToast = (msg: string, type: "success" | "error") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3500);
  };

  const fetchProjects = () => {
    setLoadingProjects(true);
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.projects);
        } else {
          showToast(data.error || "Gagal mengambil data proyek", "error");
        }
      })
      .catch((err) => {
        console.error("Fetch projects error:", err);
        showToast("Error koneksi server", "error");
      })
      .finally(() => setLoadingProjects(false));
  };

  const fetchAnalytics = () => {
    setLoadingAnalytics(true);
    fetch("/api/visit")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVisitors(data.visitors);
        } else {
          showToast(data.error || "Gagal mengambil data analitik", "error");
        }
      })
      .catch((err) => {
        console.error("Fetch analytics error:", err);
        showToast("Error koneksi server", "error");
      })
      .finally(() => setLoadingAnalytics(false));
  };

  const fetchGithubRepos = async (user = githubUsername) => {
    if (!user.trim()) return;
    setLoadingGithubRepos(true);
    try {
      const res = await fetch(`/api/github/repos?username=${encodeURIComponent(user.trim())}`);
      const data = await res.json();
      if (data.success) {
        setGithubRepos(data.repos);
      } else {
        showToast(data.error || "Gagal mengambil repository GitHub", "error");
      }
    } catch (err) {
      console.error("Fetch GitHub repos error:", err);
      showToast("Gagal terhubung ke GitHub API", "error");
    } finally {
      setLoadingGithubRepos(false);
    }
  };

  const handleSelectGithubRepo = (repo: GithubRepo) => {
    setFormRepoUrl(repo.repoUrl);
    setRepoInputSearch(repo.name);

    if (!formTitle || formTitle === "Kasir App" || !isEditing) {
      const formattedTitle = repo.name
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setFormTitle(formattedTitle);
    }

    if (repo.description) {
      setFormDesc(repo.description);
    }

    if (repo.homepage) {
      setFormDemoUrl(repo.homepage);
    }

    const techItems: string[] = [];
    if (repo.language) techItems.push(repo.language);
    if (Array.isArray(repo.topics)) {
      repo.topics.forEach((t) => {
        const cleanTech = t.charAt(0).toUpperCase() + t.slice(1);
        if (!techItems.map((x) => x.toLowerCase()).includes(cleanTech.toLowerCase())) {
          techItems.push(cleanTech);
        }
      });
    }

    if (techItems.length > 0) {
      setFormTech(techItems.join(", "));
    }

    setIsRepoDropdownOpen(false);
    showToast(`Terhubung ke GitHub repo "${repo.name}"!`, "success");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "kevin" && password === "kevin135") {
      sessionStorage.setItem("kevin-analytics-auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
      showToast("Selamat datang kembali, Kevin!", "success");
    } else {
      setLoginError("Username atau password salah!");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("kevin-analytics-auth");
    setIsAuthenticated(false);
    showToast("Berhasil keluar dari sesi admin.", "success");
  };

  const handleFormReset = () => {
    setIsEditing(false);
    setFormId("");
    setFormTitle("");
    setFormCategory("");
    setFormType("Fullstack");
    setFormColor("from-sky-500 to-cyan-500");
    setFormDesc("");
    setFormTech("");
    setFormDemoUrl("");
    setFormRepoUrl("");
    setRepoInputSearch("");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formCategory.trim() || !formDesc.trim() || !formTech.trim()) {
      showToast("Mohon isi semua kolom formulir wajib.", "error");
      return;
    }

    const payload = {
      id: formId || undefined,
      title: formTitle,
      category: formCategory,
      type: formType,
      color: formColor,
      desc: formDesc,
      tech: formTech.split(",").map((t) => t.trim()).filter(Boolean),
      demoUrl: formDemoUrl.trim(),
      repoUrl: formRepoUrl.trim(),
    };

    const url = "/api/projects";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        showToast(isEditing ? "Proyek berhasil diperbarui!" : "Proyek baru berhasil diunggah!", "success");
        handleFormReset();
        fetchProjects();
      } else {
        showToast(data.error || "Gagal menyimpan proyek", "error");
      }
    } catch {
      showToast("Gagal menyimpan. Cek jaringan Anda.", "error");
    }
  };

  const handleEditClick = (project: Project) => {
    setIsEditing(true);
    setFormId(project.id);
    setFormTitle(project.title);
    setFormCategory(project.category);
    setFormType(project.type);
    setFormColor(project.color);
    setFormDesc(project.desc);
    setFormTech(project.tech.join(", "));
    setFormDemoUrl(project.demoUrl || "");
    setFormRepoUrl(project.repoUrl || "");
    setRepoInputSearch(project.repoUrl ? project.repoUrl.replace("https://github.com/MohammadKevin/", "").replace("https://github.com/", "") : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        showToast("Proyek berhasil dihapus!", "success");
        fetchProjects();
      } else {
        showToast(data.error || "Gagal menghapus proyek", "error");
      }
    } catch {
      showToast("Gagal menghapus. Cek jaringan Anda.", "error");
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const filteredVisitors = visitors.filter((v) => {
    const matchesSearch =
      v.ip.includes(searchVisitorQuery) ||
      v.os.toLowerCase().includes(searchVisitorQuery.toLowerCase()) ||
      v.browser.toLowerCase().includes(searchVisitorQuery.toLowerCase()) ||
      v.userAgent.toLowerCase().includes(searchVisitorQuery.toLowerCase());
    const matchesDevice = visitorFilterDevice === "All" || v.device === visitorFilterDevice;
    return matchesSearch && matchesDevice;
  });

  const searchFilteredRepos = githubRepos.filter((r) =>
    r.name.toLowerCase().includes(repoInputSearch.toLowerCase()) ||
    (r.description && r.description.toLowerCase().includes(repoInputSearch.toLowerCase())) ||
    (r.language && r.language.toLowerCase().includes(repoInputSearch.toLowerCase()))
  );

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  const getDeviceIcon = (device: string) => {
    if (device === "Desktop") return <Laptop className="w-4 h-4 text-sky-600" />;
    if (device === "Mobile") return <Smartphone className="w-4 h-4 text-emerald-600" />;
    return <Monitor className="w-4 h-4 text-amber-600" />;
  };

  // ══════════════ LOGIN GATE VIEW ══════════════
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-zinc-50 text-zinc-900 flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-white rounded-[14px] p-8 border border-zinc-200 shadow-sm">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Portofolio</span>
            </Link>
            
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center mx-auto mb-4 shadow-2xs">
              <Lock className="w-6 h-6 text-sky-600" />
            </div>

            <h1 className="text-2xl font-extrabold text-zinc-950 tracking-tight">Admin Console</h1>
            <p className="text-xs text-zinc-500 mt-1.5">Masukkan kredensial Kevin untuk mengelola portofolio.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-sky-500 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-sky-500 transition-all shadow-2xs"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 active:scale-98 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer text-sm"
            >
              Masuk ke Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ══════════════ AUTHENTICATED DASHBOARD ══════════════
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 pt-8 pb-16 font-sans">
      
      {/* Floating Toast notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 flex items-center gap-3 border ${
          toastVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90 pointer-events-none"
        } ${toast.type === "success" ? "bg-white text-zinc-900 border-zinc-300 shadow-emerald-500/5" : "bg-rose-50 text-rose-900 border-rose-200"}`}
      >
        {toast.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
        <span>{toast.msg}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Dashboard */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-5 sm:p-6 rounded-[14px] border border-zinc-200 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 text-zinc-700 transition-all cursor-pointer shadow-2xs"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-950 tracking-tight leading-tight">Developer Dashboard</h1>
                <span className="px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200 text-sky-700 text-[10px] font-mono font-bold">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">Pusat kendali portofolio dan manajemen data Mohammad Kevin.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={() => {
                if (activeTab === "projects") fetchProjects();
                else if (activeTab === "certificates") fetchCertificates();
                else fetchAnalytics();
              }}
              className="flex items-center gap-2 px-3.5 py-2 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-xl text-xs font-bold text-zinc-800 shadow-2xs transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-zinc-500" />
              <span>Segarkan</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-white border border-zinc-200 rounded-xl w-fit mb-8 shadow-2xs">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "projects" ? "bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs" : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <Folder className="w-4 h-4 text-sky-600" />
            <span>Upload & Edit Proyek</span>
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "certificates" ? "bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs" : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <Award className="w-4 h-4 text-sky-600" />
            <span>Kelola Sertifikat</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("analytics");
              fetchAnalytics();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "analytics" ? "bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs" : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <Activity className="w-4 h-4 text-sky-600" />
            <span>Analitik Pengunjung</span>
          </button>
        </div>

        {/* CONTENT TABS */}
        {activeTab === "projects" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* FORM UPLOAD (Left - 5 Cols) */}
            <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-[14px] p-6 shadow-2xs flex flex-col gap-6 relative">
              <div className="border-b border-zinc-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                    <Folder className="w-5 h-5 text-sky-600" />
                    <span>{isEditing ? "Edit Proyek" : "Upload Proyek Baru"}</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Data ini langsung disinkronkan ke halaman utama.</p>
                </div>
                {isEditing && (
                  <button
                    onClick={handleFormReset}
                    className="p-1 rounded-lg bg-zinc-100 hover:bg-rose-50 text-zinc-500 hover:text-rose-600 transition-colors"
                    title="Batalkan Edit"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                
                {/* INLINE GITHUB REPO SEARCH SELECTOR */}
                <div ref={dropdownRef} className="flex flex-col gap-2 p-4 rounded-xl bg-zinc-50 border border-zinc-200 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Cari Repo GitHub (@{githubUsername})</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => fetchGithubRepos(githubUsername)}
                      disabled={loadingGithubRepos}
                      className="text-[10px] text-zinc-500 hover:text-sky-600 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${loadingGithubRepos ? "animate-spin text-sky-600" : ""}`} />
                      <span>Muat Ulang Repo</span>
                    </button>
                  </div>

                  {/* Input Search & Dropdown Trigger */}
                  <div className="relative mt-1">
                    <div className="flex items-center bg-white border border-zinc-300 rounded-xl focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-transparent transition-all shadow-2xs">
                      <div className="pl-3 pr-1 text-zinc-400">
                        <Search className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        placeholder={loadingGithubRepos ? "Memuat repository GitHub..." : "Ketik untuk mencari repo..."}
                        value={repoInputSearch || (formRepoUrl ? formRepoUrl.replace("https://github.com/MohammadKevin/", "").replace("https://github.com/", "") : "")}
                        onChange={(e) => {
                          setRepoInputSearch(e.target.value);
                          setFormRepoUrl(e.target.value ? `https://github.com/${githubUsername}/${e.target.value}` : "");
                          setIsRepoDropdownOpen(true);
                        }}
                        onFocus={() => setIsRepoDropdownOpen(true)}
                        className="w-full py-2 px-2 text-xs text-zinc-900 bg-transparent focus:outline-none placeholder-zinc-400 font-mono"
                      />
                      {formRepoUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormRepoUrl("");
                            setRepoInputSearch("");
                          }}
                          className="pr-3 text-zinc-400 hover:text-rose-500 text-xs font-bold cursor-pointer"
                          title="Hapus tautan repo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Dropdown Menu Result */}
                    {isRepoDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 z-40 bg-white border border-zinc-200 rounded-xl shadow-xl max-h-56 overflow-y-auto p-1 font-sans">
                        {loadingGithubRepos ? (
                          <div className="py-4 text-center text-zinc-500 text-xs flex items-center justify-center gap-2">
                            <RefreshCw className="animate-spin h-3.5 w-3.5 text-sky-600" />
                            <span>Memuat daftar repo @{githubUsername}...</span>
                          </div>
                        ) : searchFilteredRepos.length > 0 ? (
                          searchFilteredRepos.map((repo) => (
                            <div
                              key={repo.id}
                              onClick={() => handleSelectGithubRepo(repo)}
                              className="p-2.5 rounded-lg hover:bg-zinc-50 transition-all cursor-pointer flex items-center justify-between group border border-transparent hover:border-zinc-200"
                            >
                              <div className="flex flex-col gap-0.5 truncate pr-2">
                                <div className="flex items-center gap-2">
                                  <Folder className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                                  <span className="text-xs font-bold text-zinc-950 group-hover:text-sky-600 transition-colors truncate">
                                    {repo.name}
                                  </span>
                                  {repo.language && (
                                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-50 border border-sky-200 text-sky-700 shrink-0 font-mono">
                                      {repo.language}
                                    </span>
                                  )}
                                </div>
                                {repo.description && (
                                  <span className="text-[10px] text-zinc-500 truncate pl-5">
                                    {repo.description}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-sky-600 font-bold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                Pilih ✓
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="py-4 text-center text-zinc-400 text-xs">
                            Tidak ada repository bernama &quot;{repoInputSearch}&quot;.
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {formRepoUrl ? (
                    <div className="flex items-center justify-between text-[10px] bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-emerald-800 mt-1 font-mono">
                      <span className="truncate flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        Connected: {formRepoUrl}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-zinc-500">
                      Ketik nama repo untuk menghubungkan langsung dengan kode GitHub.
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-800">Judul Proyek *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kasir App"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-800">Sub-kategori *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: POS System"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-800">Tipe Proyek *</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs cursor-pointer"
                    >
                      <option value="Fullstack">Fullstack</option>
                      <option value="Backend">Backend</option>
                      <option value="Frontend">Frontend</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-800">Deskripsi Proyek *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Sistem kasir offline-first lengkap dengan faktur dan pemantauan stok..."
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 resize-none shadow-2xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-800">
                    Teknologi (Pisahkan koma) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Next.js, NestJS, PostgreSQL, Prisma"
                    value={formTech}
                    onChange={(e) => setFormTech(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs"
                  />
                  <span className="text-[10px] text-zinc-500">Masukkan nama teknologi dipisahkan dengan koma.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-800">
                      Live Demo URL (Opsional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://demo-app.com"
                      value={formDemoUrl}
                      onChange={(e) => setFormDemoUrl(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-800">
                      GitHub Repo URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/user/repo"
                      value={formRepoUrl}
                      onChange={(e) => setFormRepoUrl(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3 bg-sky-500 hover:bg-sky-600 active:scale-98 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer text-xs uppercase tracking-wider"
                >
                  {isEditing ? "Perbarui Proyek" : "Simpan & Publikasikan Proyek"}
                </button>
              </form>
            </div>

            {/* LIST PROJECT (Right - 7 Cols) */}
            <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-[14px] p-6 shadow-2xs flex flex-col gap-6">
              
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                    <Grid className="w-5 h-5 text-sky-600" />
                    <span>Proyek Aktif ({projects.length})</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Daftar semua proyek yang tampil di portofolio.</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Cari proyek..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3.5 py-2 pl-9 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs"
                  />
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Projects Grid */}
              {loadingProjects ? (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-3">
                  <RefreshCw className="animate-spin h-6 w-6 text-sky-600" />
                  <span className="text-xs">Memuat daftar proyek...</span>
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects.map((p) => (
                    <div
                      key={p.id}
                      className="border border-zinc-200 bg-zinc-50/70 hover:bg-white rounded-[14px] p-5 shadow-2xs hover:border-sky-400 transition-all flex flex-col justify-between h-56 relative"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md font-mono uppercase tracking-wider">{p.category}</span>
                          <div className="flex items-center gap-1.5">
                            {p.repoUrl && p.repoUrl.includes("github.com") && (
                              <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md flex items-center gap-1 font-mono">
                                <GithubIcon className="w-2.5 h-2.5" />
                                GitHub
                              </span>
                            )}
                            <span className="text-[10px] font-semibold text-zinc-700 bg-white border border-zinc-200 px-2 py-0.5 rounded-md">
                              {p.type}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-base font-bold text-zinc-950 leading-tight">{p.title}</h3>
                        <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">{p.desc}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-zinc-200/80 pt-3 mt-3">
                        <div className="flex flex-wrap gap-1 max-w-[60%]">
                          {p.tech.slice(0, 2).map((t) => (
                            <span key={t} className="text-[9px] bg-white border border-zinc-200 px-1.5 py-0.5 rounded text-zinc-700 font-mono">
                              {t}
                            </span>
                          ))}
                          {p.tech.length > 2 && <span className="text-[8px] text-zinc-400 font-mono">+{p.tech.length - 2}</span>}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {p.repoUrl && (
                            <a
                              href={p.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white border border-zinc-200 hover:border-sky-400 hover:text-sky-600 text-zinc-600 shadow-2xs transition-all"
                              title="Buka Repo GitHub"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-1.5 rounded-lg bg-white border border-zinc-200 hover:border-sky-400 hover:text-sky-600 text-zinc-600 shadow-2xs transition-all cursor-pointer"
                            title="Edit Proyek"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(p.id, p.title)}
                            className="p-1.5 rounded-lg bg-white border border-zinc-200 hover:border-rose-300 hover:text-rose-600 text-zinc-600 shadow-2xs transition-all cursor-pointer"
                            title="Hapus Proyek"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-zinc-50 rounded-[14px] border border-zinc-200 p-6">
                  <Search className="w-8 h-8 text-zinc-400 mx-auto" />
                  <h3 className="text-sm font-bold text-zinc-900 mt-3">Tidak Ada Proyek</h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Mulai upload proyek baru menggunakan formulir di sebelah kiri.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : activeTab === "certificates" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* FORM UPLOAD SERTIFIKAT (Left - 5 Cols) */}
            <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-[14px] p-6 shadow-2xs flex flex-col gap-6 relative">
              <div className="border-b border-zinc-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                    <Award className="w-5 h-5 text-sky-600" />
                    <span>{isEditingCert ? "Edit Sertifikat" : "Upload Sertifikat Baru"}</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {isEditingCert ? "Perbarui informasi kredensial sertifikat." : "Tambahkan sertifikasi & kredensial baru."}
                  </p>
                </div>
                {isEditingCert && (
                  <button
                    onClick={resetCertForm}
                    className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-xs font-semibold border border-zinc-200 transition-all cursor-pointer"
                  >
                    Batal Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveCertificate} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-800">Judul Sertifikat *</label>
                  <input
                    type="text"
                    required
                    placeholder="misal: Backend Developer & RESTful API Engineering"
                    value={certTitle}
                    onChange={(e) => setCertTitle(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-800">Penerbit / Institusi *</label>
                  <input
                    type="text"
                    required
                    placeholder="misal: SMK Telkom Malang / Dicoding / Udemy"
                    value={certIssuer}
                    onChange={(e) => setCertIssuer(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-800">Tahun / Tanggal *</label>
                    <input
                      type="text"
                      required
                      placeholder="misal: 2024"
                      value={certDate}
                      onChange={(e) => setCertDate(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-800">Kategori *</label>
                    <select
                      value={certCategory}
                      onChange={(e) => setCertCategory(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs cursor-pointer"
                    >
                      <option value="Backend">Backend</option>
                      <option value="Fullstack">Fullstack</option>
                      <option value="Database">Database</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-800">Skill / Teknologi (Pisahkan Koma)</label>
                  <input
                    type="text"
                    placeholder="misal: Node.js, Express, PostgreSQL, Prisma"
                    value={certSkills}
                    onChange={(e) => setCertSkills(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-800">URL Verifikasi Credential (Opsional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={certCredentialUrl}
                    onChange={(e) => setCertCredentialUrl(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-sky-500 text-xs text-zinc-900 shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3 bg-sky-500 hover:bg-sky-600 active:scale-98 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>{isEditingCert ? "Perbarui Sertifikat" : "Simpan Sertifikat"}</span>
                </button>
              </form>

            </div>

            {/* DAFTAR SERTIFIKAT (Right - 7 Cols) */}
            <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-[14px] p-6 shadow-2xs flex flex-col gap-6">
              <div className="border-b border-zinc-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-sky-600" />
                    <span>Daftar Sertifikat Terdaftar ({certificates.length})</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Seluruh sertifikasi yang tampil di halaman portofolio.</p>
                </div>
              </div>

              {loadingCertificates ? (
                <div className="text-center py-16 text-zinc-500">
                  Memuat data sertifikat...
                </div>
              ) : certificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="border border-zinc-200 bg-zinc-50/70 hover:bg-white rounded-[14px] p-5 shadow-2xs hover:border-sky-400 transition-all flex flex-col justify-between h-56 relative"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md font-mono uppercase tracking-wider">{cert.category || "Backend"}</span>
                          <span className="text-[10px] font-mono text-zinc-700 bg-white border border-zinc-200 px-2 py-0.5 rounded-md font-bold">
                            {cert.date}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-zinc-950 leading-tight">{cert.title}</h3>
                        <p className="text-xs text-zinc-600 leading-relaxed">{cert.issuer}</p>
                      </div>

                      <div>
                        {Array.isArray(cert.skills) && cert.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {cert.skills.map((s) => (
                              <span key={s} className="text-[9px] bg-white border border-zinc-200 px-1.5 py-0.5 rounded text-zinc-700 font-mono">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between border-t border-zinc-200/80 pt-3">
                          {cert.credentialUrl ? (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1"
                            >
                              <span>Verify Link</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-[10px] text-zinc-400">No URL</span>
                          )}

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleEditCertClick(cert)}
                              className="p-1.5 rounded-lg bg-white border border-zinc-200 hover:border-sky-400 hover:text-sky-600 text-zinc-600 shadow-2xs transition-all cursor-pointer"
                              title="Edit Sertifikat"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCertificate(cert.id)}
                              className="p-1.5 rounded-lg bg-white border border-zinc-200 hover:border-rose-300 hover:text-rose-600 text-zinc-600 shadow-2xs transition-all cursor-pointer"
                              title="Hapus Sertifikat"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-zinc-50 rounded-[14px] border border-zinc-200 p-6">
                  <Award className="w-8 h-8 text-zinc-400 mx-auto" />
                  <h3 className="text-sm font-bold text-zinc-900 mt-3">Belum Ada Sertifikat</h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Tambah sertifikat baru menggunakan formulir di sebelah kiri.
                  </p>
                </div>
              )}

            </div>
          </div>
        ) : (
          /* ANALYTICS TAB CONTENT */
          <div className="flex flex-col gap-6 sm:gap-8">
            
            {/* STATS PANEL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-zinc-200 p-5 rounded-[14px] shadow-2xs">
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono">Total Kunjungan</span>
                <div className="text-3xl font-extrabold text-zinc-950 font-mono mt-3">{visitors.length}</div>
                <p className="text-[11px] text-zinc-500 mt-1">Jumlah tayangan halaman utama</p>
              </div>

              <div className="bg-white border border-zinc-200 p-5 rounded-[14px] shadow-2xs">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono">Desktop</span>
                <div className="text-3xl font-extrabold text-zinc-950 font-mono mt-3">
                  {visitors.filter((v) => v.device === "Desktop").length}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Kunjungan via PC / Laptop (
                  {visitors.length
                    ? Math.round((visitors.filter((v) => v.device === "Desktop").length / visitors.length) * 100)
                    : 0}
                  %)
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-5 rounded-[14px] shadow-2xs">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono">Mobile</span>
                <div className="text-3xl font-extrabold text-zinc-950 font-mono mt-3">
                  {visitors.filter((v) => v.device === "Mobile").length}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Kunjungan via Smartphone (
                  {visitors.length
                    ? Math.round((visitors.filter((v) => v.device === "Mobile").length / visitors.length) * 100)
                    : 0}
                  %)
                </p>
              </div>

              <div className="bg-white border border-zinc-200 p-5 rounded-[14px] shadow-2xs">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono">Tablet & Lainnya</span>
                <div className="text-3xl font-extrabold text-zinc-950 font-mono mt-3">
                  {visitors.filter((v) => v.device !== "Desktop" && v.device !== "Mobile").length}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Kunjungan via perangkat lain (
                  {visitors.length
                    ? Math.round(
                        (visitors.filter((v) => v.device !== "Desktop" && v.device !== "Mobile").length /
                          visitors.length) *
                          100
                      )
                    : 0}
                  %)
                </p>
              </div>
            </div>

            {/* VISITOR LOGS TABLE */}
            <div className="bg-white border border-zinc-200 rounded-[14px] p-6 shadow-2xs flex flex-col gap-6">
              
              {/* Filter visitor */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-sky-600" />
                    <span>Log Kunjungan Terbaru</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Detil log kunjungan terakhir ke portofolio Anda.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                  <select
                    value={visitorFilterDevice}
                    onChange={(e) => setVisitorFilterDevice(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-zinc-300 text-xs text-zinc-900 bg-white focus:outline-sky-500 shadow-2xs cursor-pointer"
                  >
                    <option value="All">Semua Perangkat</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Tablet">Tablet</option>
                  </select>

                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Cari IP / OS / Browser..."
                      value={searchVisitorQuery}
                      onChange={(e) => setSearchVisitorQuery(e.target.value)}
                      className="w-full px-3.5 py-2 pl-9 rounded-xl border border-zinc-300 text-xs text-zinc-900 bg-white focus:outline-sky-500 shadow-2xs"
                    />
                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-zinc-200 rounded-xl">
                <table className="w-full text-left text-xs text-zinc-600">
                  <thead className="text-[10px] text-zinc-600 uppercase bg-zinc-50 border-b border-zinc-200 font-bold tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Perangkat</th>
                      <th className="py-3 px-4">Sistem Operasi</th>
                      <th className="py-3 px-4">Browser</th>
                      <th className="py-3 px-4">IP Address</th>
                      <th className="py-3 px-4">Waktu Kunjungan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {loadingAnalytics ? (
                      <tr>
                        <td colSpan={5} className="text-center py-12 text-zinc-500">
                          Memuat data log pengunjung...
                        </td>
                      </tr>
                    ) : filteredVisitors.length > 0 ? (
                      filteredVisitors.map((v) => (
                        <tr key={v.id} className="hover:bg-zinc-50/60 transition-colors">
                          <td className="py-3 px-4 font-bold text-zinc-950 flex items-center gap-2">
                            {getDeviceIcon(v.device)}
                            <span>{v.device}</span>
                          </td>
                          <td className="py-3 px-4 text-zinc-700">{v.os}</td>
                          <td className="py-3 px-4 text-zinc-700">{v.browser}</td>
                          <td className="py-3 px-4 font-mono text-[11px] text-sky-700 font-bold">{v.ip}</td>
                          <td className="py-3 px-4 text-zinc-500 font-mono text-[11px]">{formatDate(v.timestamp)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-12 text-zinc-400">
                          Belum ada log pengunjung yang tercatat.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}
