"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import AboutSection from "@/components/sections/AboutSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import TechStack from "@/components/sections/TechStack";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import { projectsData, Project } from "@/data/projects";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(projectsData);

  useEffect(() => {
    // Fetch dynamic projects from Supabase / API endpoint if available
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          const normalized = data.projects.map((p: Record<string, unknown>) => ({
            ...p,
            tech: Array.isArray(p.tech) ? p.tech : [],
            demoUrl: (p.demoUrl || p.demo_url || "") as string,
            repoUrl: (p.repoUrl || p.repo_url || "") as string,
            type: (p.type || "Fullstack") as Project["type"],
          }));
          setProjects(normalized);
        }
      })
      .catch(() => {
        // Fallback gracefully to bundled data
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section with Real-time Telemetry Mockup */}
      <Hero />

      {/* 2. Stats Numerical Strip with Divider Lines */}
      <Stats />

      {/* 3. Dedicated About & Portrait Photo Section */}
      <AboutSection />

      {/* 4. Engineering Services & Deliverables Grid */}
      <ServicesGrid />

      {/* 6. Production Provenance & Categorized Tech Stack */}
      <TechStack />

      {/* 7. Production Projects Portfolio with Search & Category Filters */}
      <ProjectsSection projects={projects} />

      {/* 8. Experience, Industrial Internship & Milestones */}
      <ExperienceSection />

      {/* 9. High-End Editorial SaaS Contact Section */}
      <ContactSection />
    </div>
  );
}