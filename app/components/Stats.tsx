"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiAward, FiCheckCircle, FiShield, FiExternalLink } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const keyStats = [
  { value: 4, label: "Years Coding & CS", suffix: "+" },
  { value: 20, label: "Projects & AI Repos", suffix: "+" },
  { value: 3000, label: "Platform Community Users", suffix: "+" },
  { value: 3, label: "Verified Industry Certifications", suffix: "" },
];

const certifications = [
  {
    name: "Linear Algebra for Machine Learning and Data Science",
    issuer: "DeepLearning.AI",
    year: "2026",
    credentialId: "DL-AI-LA-9842",
    accent: "#0df5c8",
  },
  {
    name: "Introduction to DevOps & CI/CD Pipelines",
    issuer: "IBM",
    year: "2026",
    credentialId: "IBM-DEVOPS-6719",
    accent: "#38bdf8",
  },
  {
    name: "Python Data Structures & Algorithms",
    issuer: "University of Michigan",
    year: "2023",
    credentialId: "UMICH-PYDS-3104",
    accent: "#f59e0b",
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      numbersRef.current.forEach((numEl, i) => {
        if (!numEl) return;
        const stat = keyStats[i];
        gsap.fromTo(
          numEl,
          { innerHTML: 0 },
          {
            innerHTML: stat.value,
            duration: 2.2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: numEl,
              start: "top 85%",
            },
          }
        );
      });

      gsap.fromTo(
        ".stat-metric-card, .cert-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
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
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-8 md:px-12 bg-[#05070c] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="ambient-glow w-[500px] h-[500px] bg-[#38bdf8]/10 top-1/3 -right-20" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0df5c8]">
            [ 06 // ACCREDITATIONS & VALIDATED METRICS ]
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        </div>

        {/* Section Title */}
        <div className="mb-16">
          <h2 className="font-editorial italic text-4xl sm:text-6xl text-white font-light mb-3">
            Impact Metrics & Credentials
          </h2>
          <p className="font-mono text-xs text-slate-400 tracking-widest uppercase">
            VERIFIED INDUSTRY QUALIFICATIONS, ARCHITECTURAL SCALE, AND CONTINUOUS LEARNING
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: 4 Metric Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
            {keyStats.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-metric-card liquid-glass-card rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#0df5c8] mb-2 block">
                    [ 0{i + 1} // METRIC ]
                  </span>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span
                      ref={(el) => { numbersRef.current[i] = el; }}
                      className="font-editorial italic text-4xl sm:text-6xl font-light text-white"
                    >
                      0
                    </span>
                    <span className="font-syne font-bold text-2xl text-[#0df5c8]">
                      {stat.suffix}
                    </span>
                  </div>
                </div>
                <p className="font-mono text-xs text-slate-300 tracking-wider uppercase font-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Verified Certifications List */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-syne font-bold text-xs uppercase tracking-[0.25em] text-slate-400 mb-6 flex items-center gap-2">
              <FiShield className="text-[#0df5c8]" />
              <span>Verified Industry Accreditations</span>
            </h3>

            {certifications.map((cert, i) => (
              <div
                key={i}
                className="cert-card liquid-glass-card rounded-2xl p-5 border border-white/10 flex items-start gap-4 group hover:border-[#0df5c8]/40 transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${cert.accent}15`,
                    borderColor: `${cert.accent}40`,
                    color: cert.accent,
                  }}
                >
                  <FiAward size={18} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h4 className="font-syne font-bold text-white text-sm sm:text-base group-hover:text-[#0df5c8] transition-colors">
                      {cert.name}
                    </h4>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full liquid-glass-subtle text-slate-300 font-medium">
                      {cert.year}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-slate-400 mb-2">
                    Issuer: <span className="text-white font-medium">{cert.issuer}</span>
                  </p>

                  <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400">
                    <FiCheckCircle size={12} />
                    <span>VERIFIED CREDENTIAL • {cert.credentialId}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

