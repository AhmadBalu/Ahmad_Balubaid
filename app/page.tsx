"use client";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeBar from "./components/MarqueeBar";
import About from "./components/About";
import Projects from "./components/Projects";
import ResearchPublication from "./components/ResearchPublication";
import HorizontalScroll from "./components/HorizontalScroll";
import TechStack from "./components/TechStack";
import Timeline from "./components/Timeline";
import Stats from "./components/Stats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ParticleNetwork from "./components/ParticleNetwork";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#05070c] text-white selection:bg-[#0df5c8]/20 selection:text-[#0df5c8] overflow-x-hidden">
      <LoadingScreen />
      <CustomCursor />
      <ParticleNetwork />
      <div className="grain-overlay" />
      <Navbar />
      <Hero />
      <MarqueeBar />
      <About />
      <Projects />
      <ResearchPublication />
      <HorizontalScroll />
      <TechStack />
      <Timeline />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
}



