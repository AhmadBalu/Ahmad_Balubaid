"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { HiArrowDown } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import dynamic from "next/dynamic";
import TextScramble from "./TextScramble";
import MagneticButton from "./MagneticButton";
import ParticleHeadline from "./ParticleHeadline";
import { prefersReducedMotion, usePrefersReducedMotion } from "../utils/motion";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // The entrance cascade is pure decoration, and it is the first thing a
    // visitor sees — under reduced motion the hero just starts in its final
    // state. Every target sits at its natural opacity until GSAP sets the
    // `from` values, so skipping the tween leaves the section fully visible.
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-headline-stage",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.4, delay: 0.2 }
      )
        .fromTo(
          ".hero-subtext",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          "-=0.6"
        )
        .fromTo(
          ".hero-scene-region",
          { opacity: 0 },
          { opacity: 1, duration: 1.6 },
          "-=1.2"
        )
        .fromTo(
          ".hero-cta-group",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=1.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#04050b] px-4 pt-28 pb-16 sm:px-8"
    >
      {/* Ambient Fluid Glow Blobs */}
      <div className="ambient-glow w-[500px] h-[500px] bg-[#3d6bff]/20 -top-32 -left-32 animate-[floatOrb_20s_infinite_alternate]" />
      <div className="ambient-glow w-[600px] h-[600px] bg-[#c6ff00]/15 top-1/4 -right-48 animate-[floatReverse_22s_infinite_alternate]" />
      <div className="ambient-glow w-[450px] h-[450px] bg-[#3d6bff]/15 bottom-0 left-1/4 animate-[floatOrb_18s_infinite_alternate]" />

      {/* ---- Copy: its own column, so nothing is ever laid over the model ---- */}
      {/* The grid box spans the full container, so it must not swallow pointer
          events — otherwise it sits (invisibly) over the model and eats every
          drag. Only the text column itself is interactive. */}
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="pointer-events-auto flex flex-col items-center text-center lg:col-span-8 lg:items-start lg:text-left">
          {/* Monumental Particle-Assembled Name */}
          <div className="hero-headline-stage relative w-full pointer-events-none">
            <h1 className="sr-only">Ahmad Balubaid — AI Engineer &amp; Systems Architect</h1>
            <ParticleHeadline />
          </div>

          {/* Subtitle / Role */}
          <p className="hero-subtext mb-7 flex flex-wrap items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-slate-300/90 sm:gap-4 sm:text-sm lg:justify-start">
            <span className="text-[#3d6bff]">
              <TextScramble text="AI Engineer" />
            </span>
            <span className="text-white/20">◆</span>
            <span className="text-white">
              <TextScramble text="Full Stack Developer" />
            </span>
            <span className="text-white/20">◆</span>
            <span className="text-[#c6ff00]">
              <TextScramble text="Applied Researcher" />
            </span>
          </p>

          {/* Editorial Value Proposition */}
          <p className="hero-subtext mb-8 max-w-xl text-balance text-base font-light leading-relaxed text-slate-300 sm:text-lg">
            Architecting domain-grounded{" "}
            <span className="text-white font-normal underline decoration-[#3d6bff]/40 underline-offset-4">
              Arabic RAG systems
            </span>
            , clinical predictive machine learning, and resilient{" "}
            <span className="text-white font-normal underline decoration-[#c6ff00]/40 underline-offset-4">
              high-throughput infrastructure
            </span>
            .
          </p>

          {/* CTAs with Magnetic Pull */}
          <div className="hero-cta-group flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <MagneticButton strength={0.35}>
              <a
                href="#projects"
                className="pointer-events-auto liquid-glass-pill px-7 py-3.5 bg-white/[0.08] hover:bg-[#3d6bff]/15 border border-white/20 hover:border-[#3d6bff]/60 text-white hover:text-[#3d6bff] font-mono text-xs uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group block cursor-pointer"
              >
                <span>Explore Flagship Works</span>
                <HiArrowDown className="text-sm group-hover:translate-y-1 transition-transform text-[#3d6bff]" />
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
        </div>
      </div>

      {/* ---- Workspace render: unboxed. Buys the right half on desktop and
              bleeds off the edge; drops below the copy as a band on mobile.
              Two nested masks feather it into the page instead of framing it. ---- */}
      <div className="hero-scene-region pointer-events-auto relative z-0 mt-8 h-[210px] w-full sm:h-[280px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[42%]">
        <div className="hero-scene-fade-x h-full w-full">
          <div className="hero-scene-fade-y h-full w-full">
            <ThreeScene />
          </div>
        </div>
      </div>

      {/* Bottom Architectural Scroll Cue. Hidden on phones: the floating
          DesignQuirksDock occupies the same strip, and the cue is decorative
          enough that overlapping it looks like a glitch. */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-60 sm:flex">
        <span className="font-mono text-[10px] sm:text-[9px] uppercase tracking-[0.3em] text-slate-400">
          SCROLL TO EXPLORE
        </span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-[#3d6bff] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
