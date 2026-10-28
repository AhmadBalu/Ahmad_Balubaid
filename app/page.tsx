"use client";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeBar from "./components/MarqueeBar";
import About from "./components/About";
import Projects from "./components/Projects";
import ResearchPublication from "./components/ResearchPublication";
import TechStack from "./components/TechStack";
import Timeline from "./components/Timeline";
import Stats from "./components/Stats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ParticleNetwork from "./components/ParticleNetwork";
import DesignQuirksDock from "./components/DesignQuirksDock";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#04050b] text-white selection:bg-[#3d6bff]/20 selection:text-[#3d6bff] overflow-x-hidden">
      <LoadingScreen />
      <ScrollReveal />
      <CustomCursor />
      <ParticleNetwork />
      <div className="grain-overlay" />
      <Navbar />
      <Hero />
      <MarqueeBar />
      <About />
      <Projects />
      <ResearchPublication />
      <TechStack />
      <Timeline />
      <Stats />
      <Contact />
      <Footer />
      <DesignQuirksDock />
    </main>
  );
}



