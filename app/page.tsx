"use client";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import MarqueeBar from "./components/MarqueeBar";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Stats from "./components/Stats";
import HorizontalScroll from "./components/HorizontalScroll";
import ThreeScene from "./components/ThreeScene";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import "./globals.css";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground">
      <LoadingScreen />
      <CustomCursor />
      <div className="grain-overlay" />
      <Hero />
      <MarqueeBar />
      <About />
      <TechStack />
      <Projects />
      <Timeline />
      <Stats />
      <HorizontalScroll />
      <ThreeScene />
      <Contact />
      <Footer />
    </main>
  );
}
