"use client";
import { useState, useEffect, useRef } from "react";
import { HiSparkles } from "react-icons/hi";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";
import TextScramble from "./TextScramble";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    // The progress bar is written straight to the DOM so scrubbing the page
    // doesn't re-render the nav (and its TextScramble children) every frame.
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
      setScrolled(window.scrollY > 40);
    };

    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "About", href: "#about", index: "01" },
    { label: "Artifacts", href: "#projects", index: "02" },
    { label: "Research", href: "#research", index: "03" },
    { label: "Capabilities", href: "#stack", index: "04" },
    { label: "Chronicle", href: "#timeline", index: "05" },
    { label: "Dispatch", href: "#contact", index: "06" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 sm:pt-6 pointer-events-none transition-all duration-300">
      {/* Reading progress — cobalt to lime as the page is consumed.
          The initial scale is an inline transform (not `scale-x-0`, which sets
          the `scale` property and would multiply against the value we write). */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden">
        <div
          ref={progressRef}
          style={{ transform: "scaleX(0)" }}
          className="h-full w-full origin-left bg-gradient-to-r from-[#1a3fd4] via-[#3d6bff] to-[#c6ff00] shadow-[0_0_12px_rgba(61,107,255,0.65)]"
        />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand / Monogram */}
        <MagneticButton strength={0.25}>
          <a
            href="#"
            className="liquid-glass-pill px-4 py-2 flex items-center gap-3 group transition-all duration-300 hover:border-[#3d6bff]/40 block"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#3d6bff] animate-pulse shadow-[0_0_8px_#3d6bff]" />
            <span className="font-mono text-xs font-semibold tracking-wider text-white group-hover:text-[#3d6bff] transition-colors">
              <TextScramble text="AHMAD BALUBAID" />
            </span>
            <span className="hidden md:inline-block font-mono text-[10px] text-slate-400 border-l border-white/10 pl-2">
              AI ARCHITECT
            </span>
          </a>
        </MagneticButton>

        {/* Center Nav Links (Desktop) */}
        <nav
          className={`hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-500 ${
            scrolled ? "liquid-glass shadow-2xl" : "liquid-glass-subtle"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase text-slate-300 hover:text-[#3d6bff] hover:bg-white/[0.06] transition-all duration-200 flex items-center gap-1.5"
            >
              <span className="text-[9px] text-[#3d6bff]/60">{item.index}</span>
              <TextScramble text={item.label} speed={40} />
            </a>
          ))}
        </nav>

        {/* Right Info: Resume CTA & Mobile Trigger */}
        <div className="flex items-center gap-3">
          {/* Direct Resume CTA */}
          <MagneticButton strength={0.35}>
            <a
              href="mailto:Ahmadobalubaid@gmail.com?subject=Portfolio%20Inquiry%20-%20Resume%20Request"
              className="liquid-glass-pill px-4 py-2 font-mono text-[11px] text-white hover:text-[#3d6bff] border border-white/15 hover:border-[#3d6bff]/50 flex items-center gap-2 group transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] block"
            >
              <FiDownload className="text-[#3d6bff] group-hover:translate-y-0.5 transition-transform" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px]">Transmission</span>
            </a>
          </MagneticButton>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="touch-target lg:hidden liquid-glass-pill p-2 text-white hover:text-[#3d6bff] transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto pointer-events-auto liquid-glass rounded-2xl p-4 border border-white/15 animate-in fade-in slide-in-from-top-2 duration-300">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase text-slate-200 hover:text-[#3d6bff] hover:bg-white/[0.08] transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-[#3d6bff]">{item.index} //</span>
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between px-2 font-mono text-[10px] text-slate-400">
              <span>ENGINEER & RESEARCHER</span>
              <span className="text-[#3d6bff]">PORTFOLIO // 2026</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
