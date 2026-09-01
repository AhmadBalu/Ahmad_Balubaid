"use client";
import { useState, useEffect } from "react";
import { HiSparkles } from "react-icons/hi";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [saudiTime, setSaudiTime] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Saudi Arabia is UTC+3 (Asia/Riyadh)
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Riyadh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setSaudiTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
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
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand / Monogram */}
        <a
          href="#"
          className="liquid-glass-pill px-4 py-2 flex items-center gap-3 group transition-all duration-300 hover:border-[#0df5c8]/40"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#0df5c8] animate-pulse shadow-[0_0_8px_#0df5c8]" />
          <span className="font-mono text-xs font-semibold tracking-wider text-white group-hover:text-[#0df5c8] transition-colors">
            AHMAD BALUBAID
          </span>
          <span className="hidden md:inline-block font-mono text-[10px] text-slate-400 border-l border-white/10 pl-2">
            AI ARCHITECT
          </span>
        </a>

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
              className="px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase text-slate-300 hover:text-[#0df5c8] hover:bg-white/[0.06] transition-all duration-200 flex items-center gap-1.5"
            >
              <span className="text-[9px] text-[#0df5c8]/60">{item.index}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Info: Live Saudi Clock & Resume CTA */}
        <div className="flex items-center gap-3">
          {/* Saudi Arabia Live Clock Badge */}
          <div className="hidden sm:flex liquid-glass-pill px-3.5 py-2 items-center gap-2 font-mono text-[11px] text-slate-300">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            <span className="text-slate-400">AST (UTC+3)</span>
            <span className="text-[#0df5c8] font-medium tracking-widest">{saudiTime || "16:00:00"}</span>
          </div>

          {/* Direct Resume CTA */}
          <a
            href="mailto:Ahmadobalubaid@gmail.com?subject=Portfolio%20Inquiry%20-%20Resume%20Request"
            className="liquid-glass-pill px-4 py-2 font-mono text-[11px] text-white hover:text-[#0df5c8] border border-white/15 hover:border-[#0df5c8]/50 flex items-center gap-2 group transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          >
            <FiDownload className="text-[#0df5c8] group-hover:translate-y-0.5 transition-transform" />
            <span className="tracking-wider uppercase text-[10px] sm:text-[11px]">Transmission</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden liquid-glass-pill p-2 text-white hover:text-[#0df5c8] transition-colors"
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
                className="px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase text-slate-200 hover:text-[#0df5c8] hover:bg-white/[0.08] transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-[#0df5c8]">{item.index} //</span>
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between px-2 font-mono text-[10px] text-slate-400">
              <span>RIYADH / JEDDAH</span>
              <span className="text-[#0df5c8]">{saudiTime} AST</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
