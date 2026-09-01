"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FiCpu, FiActivity, FiServer, FiArrowRight } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

import { getAssetPath } from "../utils/assets";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageCardRef.current,
        { opacity: 0, x: -60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".about-pillar-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-pillars-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-8 md:px-12 bg-[#05070c] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="ambient-glow w-[400px] h-[400px] bg-[#0df5c8]/10 top-1/4 -left-20" />
      <div className="ambient-glow w-[500px] h-[500px] bg-[#38bdf8]/10 -bottom-20 right-0" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0df5c8]">
            [ 01 // ARCHITECT PROFILE & MANIFESTO ]
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Liquid Glass Portrait Frame */}
          <div
            ref={imageCardRef}
            className="lg:col-span-5 relative flex flex-col items-center"
          >
            <div className="relative w-full max-w-md liquid-glass-card rounded-3xl p-3 sm:p-4 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)] group">
              {/* Specular corner accents */}
              <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-[#0df5c8] rounded-tl-lg pointer-events-none" />
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-[#38bdf8] rounded-br-lg pointer-events-none" />

              {/* Holographic Badge */}
              <div className="absolute top-6 right-6 z-20 liquid-glass-pill px-3 py-1 text-[10px] font-mono text-slate-200 border border-white/20 flex items-center gap-1.5 shadow-lg">
                <HiSparkles className="text-[#0df5c8]" />
                <span>SAUDI TECH TALENT</span>
              </div>

              {/* Portrait Image */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src={getAssetPath("/shot.jpeg")}
                  alt="Ahmad Balubaid"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-center grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent opacity-80" />

                {/* Bottom Overlay Telemetry inside photo */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <p className="font-syne font-bold text-white text-lg leading-tight">
                    Ahmad Balubaid
                  </p>
                  <p className="font-mono text-[11px] text-[#0df5c8] tracking-wider">
                    Computer Science • Effat University
                  </p>
                </div>
              </div>

              {/* Status footer pill */}
              <div className="mt-3.5 px-3 py-2 rounded-xl liquid-glass-subtle flex items-center justify-between font-mono text-[11px]">
                <span className="text-slate-400">STATUS:</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Engineering
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Manifesto */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col">
            <h2 className="font-editorial italic text-3xl sm:text-5xl lg:text-6xl text-white font-light leading-[1.08] mb-6">
              "Bridging probabilistic machine intelligence with resilient, production-grade systems."
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-5">
              I am an AI engineer and full-stack systems developer based in Saudi Arabia. My focus centers on building AI solutions that move beyond basic toy prototypes into real-world, domain-grounded systems that solve high-stakes challenges.
            </p>

            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed mb-8">
              From architecting <span className="text-white font-medium">Retrieval-Augmented Generation (RAG)</span> engines tailored for Arabic legislation to engineering <span className="text-white font-medium">clinical outcome prediction models</span> and maintaining high-concurrency community infrastructure for <span className="text-white font-medium">3,000+ active users</span>, I build end-to-end architectures where precision meets scale.
            </p>

            {/* Architectural Pillars (Liquid Glass Cards) */}
            <div className="about-pillars-grid grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {/* Pillar 1 */}
              <div className="about-pillar-card liquid-glass-card rounded-2xl p-4 border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#0df5c8]/10 border border-[#0df5c8]/30 flex items-center justify-center text-[#0df5c8] mb-3">
                  <FiCpu size={16} />
                </div>
                <h3 className="font-syne font-bold text-white text-xs uppercase tracking-wider mb-1">
                  Applied AI & RAG
                </h3>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Arabic NLP, hybrid semantic retrieval, vector stores, and custom embedding fine-tuning.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="about-pillar-card liquid-glass-card rounded-2xl p-4 border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8] mb-3">
                  <FiActivity size={16} />
                </div>
                <h3 className="font-syne font-bold text-white text-xs uppercase tracking-wider mb-1">
                  Clinical Modeling
                </h3>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Supervised ML pipelines predicting myocardial infarction complications with explainability.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="about-pillar-card liquid-glass-card rounded-2xl p-4 border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30 flex items-center justify-center text-[#f59e0b] mb-3">
                  <FiServer size={16} />
                </div>
                <h3 className="font-syne font-bold text-white text-xs uppercase tracking-wider mb-1">
                  Systems & DevOps
                </h3>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Linux deployment, custom Java plugins, anti-bot heuristics, and Next.js full-stack apps.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="liquid-glass-pill px-6 py-3 bg-[#0df5c8]/10 hover:bg-[#0df5c8]/20 border border-[#0df5c8]/40 text-[#0df5c8] font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 group"
              >
                <span>Inspect Flagship Artifacts</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#timeline"
                className="liquid-glass-pill px-6 py-3 border border-white/10 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <span>View Career Chronicle →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}