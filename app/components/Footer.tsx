"use client";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { FiMail, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#030509] border-t border-white/10 py-16 px-4 sm:px-8 md:px-12 overflow-hidden">
      {/* Background glow */}
      <div className="ambient-glow w-[300px] h-[300px] bg-[#0df5c8]/5 -top-10 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left Identity & Coordinates */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#0df5c8]" />
            <h4 className="font-syne font-bold text-white text-base tracking-wider">
              AHMAD BALUBAID
            </h4>
          </div>
          <p className="font-mono text-[11px] text-slate-400">
            AI Engineer & Systems Architect • Saudi Arabia 🇸🇦 (21.54° N, 39.17° E)
          </p>
        </div>

        {/* Center Socials */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/AhmadBalu"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-pill p-3 text-slate-300 hover:text-white hover:border-[#0df5c8]/50 transition-colors"
            aria-label="GitHub"
          >
            <SiGithub size={16} />
          </a>
          <a
            href="https://linkedin.com/in/ahmad-balubaid/"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-pill p-3 text-slate-300 hover:text-[#38bdf8] hover:border-[#38bdf8]/50 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={16} />
          </a>
          <a
            href="mailto:Ahmadobalubaid@gmail.com"
            className="liquid-glass-pill p-3 text-slate-300 hover:text-[#0df5c8] hover:border-[#0df5c8]/50 transition-colors"
            aria-label="Email"
          >
            <FiMail size={16} />
          </a>
        </div>

        {/* Right Back to Top & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <button
            onClick={scrollToTop}
            className="liquid-glass-pill px-4 py-2 text-xs font-mono text-slate-300 hover:text-[#0df5c8] flex items-center gap-2 border border-white/10 cursor-pointer group"
          >
            <span>Ascend to Top</span>
            <FiArrowUp className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <p className="font-mono text-[10px] text-slate-400">
            © 2026 Ahmad Balubaid. All systems operational.
          </p>
        </div>
      </div>
    </footer>
  );
}



