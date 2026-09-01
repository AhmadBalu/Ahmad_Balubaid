"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCpu, FiServer, FiZap, FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    number: "01",
    tag: "INTELLIGENCE DOMAIN",
    title: "Domain-Grounded RAG",
    subtitle: "Eliminating Hallucinations with Deterministic Citation Guardrails",
    description:
      "Transforming raw legal statutes and unstructured enterprise data into sub-second vector semantic retrieval with strict grounded accuracy.",
    icon: FiCpu,
    accent: "#0df5c8",
    stats: "94.2% Grounded Accuracy",
  },
  {
    number: "02",
    tag: "CONCURRENCY DOMAIN",
    title: "High-Throughput Systems",
    subtitle: "3,000+ User Multi-Threaded Network Architecture",
    description:
      "Architecting low-latency asynchronous event hooks, real-time packet filtering, anti-bot mitigation, and robust Linux server deployment.",
    icon: FiServer,
    accent: "#38bdf8",
    stats: "3,000+ Community Scaled",
  },
  {
    number: "03",
    tag: "PRODUCTION DOMAIN",
    title: "Clinical Machine Learning",
    subtitle: "Predictive Telemetry with Explainable Feature Attribution",
    description:
      "Bridging clinical datasets and predictive models to identify high-risk myocardial infarction complications with actionable ICU interpretability.",
    icon: FiZap,
    accent: "#f59e0b",
    stats: "0.89 ROC-AUC Clinical Score",
  },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = horizontalTrackRef.current;
      if (!track) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(track, {
        xPercent: -66.666,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#05070c] border-y border-white/10"
    >
      {/* Background ambient lighting */}
      <div className="ambient-glow w-[600px] h-[600px] bg-[#0df5c8]/10 top-1/2 left-1/3 -translate-y-1/2" />

      {/* Top Section Indicator */}
      <div className="absolute top-8 left-8 sm:left-12 z-20 flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0df5c8]">
          [ 03 // CORE CAPABILITY CHAPTERS ]
        </span>
        <div className="h-px w-20 bg-white/20" />
      </div>

      {/* Horizontal Sliding Track */}
      <div
        ref={horizontalTrackRef}
        className="flex h-full w-[300%] will-change-transform"
      >
        {chapters.map((chapter, i) => {
          const Icon = chapter.icon;
          return (
            <div
              key={i}
              className="w-1/3 h-full flex items-center justify-center px-6 sm:px-16 lg:px-24"
            >
              <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Number & Metric (Liquid Glass) */}
                <div className="lg:col-span-5 flex flex-col items-start">
                  <div className="liquid-glass-card rounded-3xl p-8 border border-white/15 w-full relative overflow-hidden group">
                    <div
                      className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full blur-2xl opacity-30 pointer-events-none"
                      style={{ backgroundColor: chapter.accent }}
                    />

                    <span
                      className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full liquid-glass-subtle inline-block mb-4"
                      style={{ color: chapter.accent }}
                    >
                      {chapter.tag}
                    </span>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-editorial italic text-7xl font-light text-white">
                        {chapter.number}
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        // 03
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs text-slate-300 mt-4 pt-4 border-t border-white/10">
                      <Icon style={{ color: chapter.accent }} size={16} />
                      <span className="font-bold text-white">
                        {chapter.stats}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Editorial Copy */}
                <div className="lg:col-span-7 flex flex-col">
                  <h3 className="font-syne font-bold text-3xl sm:text-5xl text-white mb-3">
                    {chapter.title}
                  </h3>
                  <p
                    className="font-editorial italic text-xl sm:text-2xl font-light mb-4"
                    style={{ color: chapter.accent }}
                  >
                    "{chapter.subtitle}"
                  </p>
                  <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                    {chapter.description}
                  </p>

                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 font-mono text-xs text-[#0df5c8] uppercase tracking-wider hover:translate-x-1 transition-transform"
                  >
                    <span>View Related Implementations</span>
                    <FiArrowRight />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

