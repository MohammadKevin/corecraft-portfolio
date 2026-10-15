import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import TimelineSection from "@/components/TimelineSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      {/* SECTION 1: HERO */}
      <Hero />

      {/* SECTION 2: ABOUT / STATEMENT */}
      <AboutSection />

      {/* SECTION 3: SERVICES & CAPABILITIES */}
      <ServicesSection />

      {/* SECTION 4: TECHNICAL ARCHITECTURE / SKILLS */}
      <SkillsSection />

      {/* SECTION 5: SELECTED WORK */}
      <ProjectsSection />

      {/* SECTION 6: VERIFIED CREDENTIALS */}
      <CertificatesSection />

      {/* SECTION 7: TIMELINE & EXPERIENCE */}
      <TimelineSection />

      {/* SECTION 8: CONTACT & FOOTER */}
      <ContactSection />
    </>
  );
}
