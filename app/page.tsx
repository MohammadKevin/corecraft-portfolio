import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import ServicesAccordion from "@/components/ServicesAccordion";
import ExperienceSection from "@/components/ExperienceSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ServicesAccordion />
      <ExperienceSection />
    </>
  );
}
