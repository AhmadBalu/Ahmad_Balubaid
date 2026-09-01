"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCheckCircle, FiCalendar, FiMapPin, FiAward } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  period: string;
  role: string;
  institution: string;
  type: string;
  highlights: string[];
  metrics?: string;
  accent: string;
}

const timelineData: TimelineEntry[] = [
  {
    period: "2024 — PRESENT",
    role: "Computer Science Researcher & AI Engineer",
    institution: "Effat University",
    type: "ACADEMIC & RESEARCH",
    highlights: [
      "Conducting applied research in Arabic Legal RAG architectures and hybrid semantic retrieval",
      "Developed clinical predictive machine learning models for cardiology outcome classification",
      "Architecting full-stack Next.js and PostgreSQL enterprise systems",
    ],
    metrics: "Focus: Applied AI & Healthcare ML",
    accent: "#0df5c8",
  },
  {
    period: "2024 — 2025",
    role: "Systems Developer & Platform Manager",
    institution: "Nektax.net Community Network",
    type: "HIGH-CONCURRENCY PLATFORM",
    highlights: [
      "Engineered server-side Java plugins and asynchronous networking event hooks",
      "Orchestrated Linux cloud server infrastructure and memory management daemons",
      "Built real-time profanity filtering and automated proxy anti-bot mitigation heuristics",
      "Scaled infrastructure supporting a 3,000+ active online user base with 99.8% uptime",
    ],
    metrics: "Scale: 3,000+ Active Users",
    accent: "#38bdf8",
  },
  {
    period: "2024",
    role: "Founder & Growth Engineer",
    institution: "Taqyimat.net",
    type: "COMMERCIAL PLATFORM",
    highlights: [
      "Built an affiliate product review platform with optimized conversion tracking",
      "Engineered automated SEO pipelines, content structure, and user engagement funnels",
      "Mastered digital marketing mechanics, consumer analytics, and monetization workflows",
    ],
    metrics: "Impact: Commercial Growth & SEO",
    accent: "#f59e0b",
  },
  {
    period: "2023",
    role: "High School Graduate (Distinction)",
    institution: "Nobles International School",
    type: "FOUNDATION",
    highlights: [
      "Completed secondary education with rigorous STEM and computational coursework",
      "Developed foundational algorithms, object-oriented concepts, and web fundamentals",
    ],
    accent: "#818cf8",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-entry-card",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.18,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-8 md:px-12 bg-[#05070c] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="ambient-glow w-[500px] h-[500px] bg-[#0df5c8]/10 bottom-20 -left-20" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0df5c8]">
            [ 05 // CHRONOLOGICAL TELEMETRY ]
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        </div>

        {/* Section Title */}
        <div className="mb-16">
          <h2 className="font-editorial italic text-4xl sm:text-6xl text-white font-light mb-3">
            Career Chronicle & Milestones
          </h2>
          <p className="font-mono text-xs text-slate-400 tracking-widest uppercase">
            A LOGBOOK OF ACADEMIC RESEARCH, PLATFORMS SCALED, AND TECHNICAL ROLES
          </p>
        </div>

        {/* Timeline Entries */}
        <div className="relative pl-6 sm:pl-10 border-l border-white/15 space-y-12">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className="timeline-entry-card relative group"
            >
              {/* Timeline Node Orb */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-6 w-3.5 h-3.5 rounded-full border-2 border-[#05070c] shadow-[0_0_12px_currentColor]"
                style={{
                  backgroundColor: item.accent,
                  color: item.accent,
                }}
              />

              {/* Liquid Glass Card Container */}
              <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 border border-white/10 group-hover:border-white/25 transition-all">
                {/* Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs px-3 py-1 rounded-full liquid-glass-subtle font-semibold"
                      style={{ color: item.accent }}
                    >
                      {item.period}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      // {item.type}
                    </span>
                  </div>

                  {item.metrics && (
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white font-medium">
                      {item.metrics}
                    </span>
                  )}
                </div>

                {/* Role and Institution */}
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-white mb-1">
                  {item.role}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-slate-400 mb-5 flex items-center gap-2">
                  <span style={{ color: item.accent }}>●</span>
                  <span>{item.institution}</span>
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2.5">
                  {item.highlights.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed"
                    >
                      <FiCheckCircle
                        className="shrink-0 mt-0.5"
                        style={{ color: item.accent }}
                        size={14}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

