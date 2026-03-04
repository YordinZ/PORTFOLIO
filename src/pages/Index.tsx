import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/FooterSection";
import ParticleNetwork from "@/components/ParticleNetwork";
import CursorTrail from "@/components/CursorTrail";

const Index = () => {
  return (
    <div className="bg-background min-h-screen relative">
      <ParticleNetwork />
      <CursorTrail />
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
