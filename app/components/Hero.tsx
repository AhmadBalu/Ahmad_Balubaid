"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { HiArrowDown } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import dynamic from "next/dynamic";
import TextScramble from "./TextScramble";
import MagneticButton from "./MagneticButton";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-badge-top",
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.2 }
      )
        .fromTo(
          ".hero-char",
          { opacity: 0, y: 60, rotateX: 30, filter: "blur(8px)" },
          { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", stagger: 0.03, duration: 1.1 },
          "-=0.7"
        )
        .fromTo(
          ".hero-subtext",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          ".hero-cta-group",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const firstName = "Ahmad";
  const lastName = "Balubaid";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 pt-28 pb-16 overflow-hidden bg-[#05070c]"
    >
      {/* Ambient Fluid Glow Blobs */}
      <div className="ambient-glow w-[500px] h-[500px] bg-[#0df5c8]/20 -top-32 -left-32 animate-[floatOrb_20s_infinite_alternate]" />
      <div className="ambient-glow w-[600px] h-[600px] bg-[#38bdf8]/15 top-1/3 -right-48 animate-[floatReverse_22s_infinite_alternate]" />
      <div className="ambient-glow w-[450px] h-[450px] bg-[#818cf8]/15 -bottom-24 left-1/4 animate-[floatOrb_18s_infinite_alternate]" />

      {/* 3D Background Canvas (Interactive full screen center) */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-85">
        <ThreeScene />
      </div>

      {/* Hero Content Container (Overlayed in center, pointer-events pass through to 3D canvas) */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center pointer-events-none select-none">
        {/* Top Status Badge */}
        <div className="hero-badge-top flex items-center justify-center gap-2 mb-8 pointer-events-none">
          <div className="liquid-glass-pill px-4 py-1.5 flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0df5c8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0df5c8]" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#0df5c8] font-medium">
              Available for High-Impact Roles & Research
            </span>
          </div>
        </div>

        {/* Monumental Editorial Headline */}
        <div className="mb-6 overflow-hidden pointer-events-none">
          <h1
            ref={headlineRef}
            className="text-[clamp(3.8rem,10vw,8.5rem)] font-light tracking-[-0.03em] leading-[0.92] text-white select-none pointer-events-none"
          >
            <span className="font-editorial italic font-light text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-slate-400">
              {firstName.split("").map((c, i) => (
                <span key={i} className="hero-char inline-block">
                  {c}
                </span>
              ))}
            </span>
            <span className="hero-char inline-block">&nbsp;</span>
            <span className="font-syne font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              {lastName.split("").map((c, i) => (
                <span key={i} className="hero-char inline-block">
                  {c}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Subtitle / Role */}
        <p className="hero-subtext font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-slate-300/90 mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 pointer-events-none">
          <span className="text-[#0df5c8]">
            <TextScramble text="AI Engineer" />
          </span>
          <span className="text-white/20">◆</span>
          <span className="text-white">
            <TextScramble text="Full Stack Developer" />
          </span>
          <span className="text-white/20">◆</span>
          <span className="text-[#38bdf8]">
            <TextScramble text="Applied Researcher" />
          </span>
        </p>

        {/* Editorial Value Proposition */}
        <p className="hero-subtext max-w-2xl text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8 text-balance pointer-events-none">
          Architecting domain-grounded{" "}
          <span className="text-white font-normal underline decoration-[#0df5c8]/40 underline-offset-4">
            Arabic RAG systems
          </span>
          , clinical predictive machine learning, and resilient{" "}
          <span className="text-white font-normal underline decoration-[#38bdf8]/40 underline-offset-4">
            high-throughput infrastructure
          </span>
          .
        </p>

        {/* CTAs with Magnetic Pull */}
        <div className="hero-cta-group flex flex-wrap items-center justify-center gap-4 mb-10 pointer-events-none">
          <MagneticButton strength={0.35}>
            <a
              href="#projects"
              className="pointer-events-auto liquid-glass-pill px-7 py-3.5 bg-white/[0.08] hover:bg-[#0df5c8]/15 border border-white/20 hover:border-[#0df5c8]/60 text-white hover:text-[#0df5c8] font-mono text-xs uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group block cursor-pointer"
            >
              <span>Explore Flagship Works</span>
              <HiArrowDown className="text-sm group-hover:translate-y-1 transition-transform text-[#0df5c8]" />
            </a>
          </MagneticButton>

          <MagneticButton strength={0.35}>
            <a
              href="#contact"
              className="pointer-events-auto liquid-glass-pill px-7 py-3.5 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-all duration-300 block cursor-pointer"
            >
              <span>Initiate Dispatch</span>
              <FiArrowUpRight className="text-sm text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </MagneticButton>
        </div>

        {/* Subtle Fidget Hint */}
        <div className="hero-subtext pointer-events-none">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400/80 liquid-glass-subtle px-3.5 py-1 rounded-full border border-white/10">
            Click & Drag Anywhere to Spin Desk
          </span>
        </div>
      </div>

      {/* Bottom Architectural Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-400">
          SCROLL TO EXPLORE
        </span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-[#0df5c8] animate-bounce" />
        </div>
      </div>
    </section>
  );
}




