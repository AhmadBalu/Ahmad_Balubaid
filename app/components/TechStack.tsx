"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, usePrefersReducedMotion } from "../utils/motion";
import { FiCpu, FiServer, FiLayout, FiTerminal, FiCheck } from "react-icons/fi";

import { splitRevealChars } from "../utils/reveal";

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
  name: string;
  category: "ai" | "backend" | "frontend" | "infra";
  context: string;
  icon: string;
}

const techCapabilities: TechItem[] = [
  // AI & Intelligence
  {
    name: "Python 3.12",
    category: "ai",
    context: "Asyncio streaming engines, AI pipelines, aiohttp backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "PyTorch",
    category: "ai",
    context: "Neural network architectures, tensor computing",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    name: "LangChain",
    category: "ai",
    context: "RAG document retrieval, LCEL chains, vector search",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Scikit-Learn",
    category: "ai",
    context: "Clinical ML, XGBoost, regression & classification",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Pandas & NumPy",
    category: "ai",
    context: "Biomarker data preprocessing & statistical EDA",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },

  // Backend & Systems
  {
    name: "asyncio & aiohttp",
    category: "backend",
    context: "Parallel cross-network scraping, dual-stage streaming",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Discord API",
    category: "backend",
    context: "Gateway events, dynamic embeds, cryptographic role sync",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discordjs/discordjs-original.svg",
  },
  {
    name: "Java",
    category: "backend",
    context: "High-concurrency plugins, multi-threaded networking",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Node.js",
    category: "backend",
    context: "Async server microservices, event streaming",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "PostgreSQL",
    category: "backend",
    context: "Relational persistence, ACID transactions",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MongoDB",
    category: "backend",
    context: "Document storage, rapid prototype schemas",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "C++",
    category: "backend",
    context: "Algorithms, memory management, CS foundations",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },

  // Frontend & Runtimes
  {
    name: "Next.js 16",
    category: "frontend",
    context: "App router, Server Actions, high-performance SSR",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "React 19",
    category: "frontend",
    context: "Declarative UI, concurrent rendering, custom hooks",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    category: "frontend",
    context: "Type-safe contracts across full stack architectures",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "TailwindCSS v4",
    category: "frontend",
    context: "Modern utility-first styling, responsive fluid layouts",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Three.js",
    category: "frontend",
    context: "Interactive 3D WebGL scenes, particle physics",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  },

  // DevOps & Infrastructure
  {
    name: "Camoufox / Trawl",
    category: "infra",
    context: "Headless anti-bot browser automation & Turnstile solve",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "Cloudflare Clearance",
    category: "infra",
    context: "Session pooling, TLS fingerprints, rate-limit pooling",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg",
  },
  {
    name: "Docker",
    category: "infra",
    context: "Containerized deployment, multi-stage microservices",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Linux / Bash",
    category: "infra",
    context: "Server daemon management, shell automation, security",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "Git & GitHub",
    category: "infra",
    context: "Version control, CI/CD actions, code review",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
];

const categoryTabs = [
  { key: "all", label: "All Layers", icon: FiCpu },
  { key: "ai", label: "AI & ML", icon: FiCpu },
  { key: "backend", label: "Systems & DB", icon: FiServer },
  { key: "frontend", label: "Web Runtimes", icon: FiLayout },
  { key: "infra", label: "DevOps & Linux", icon: FiTerminal },
];

/** Short label for the corner tag on each card, keyed by category. */
const categoryLabels: Record<TechItem["category"], string> = {
  ai: "AI/ML",
  backend: "SYS",
  frontend: "WEB",
  infra: "OPS",
};

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // One flat pool — the filter buttons are the only thing that sorts it.
  const filteredTech =
    selectedCategory === "all"
      ? techCapabilities
      : techCapabilities.filter((t) => t.category === selectedCategory);

  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // Entrance tweens set their own from-state, so skipping them leaves the
    // badges resting at their final position rather than at opacity 0. The
    // effect still re-runs on category change to keep the ctx in sync.
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-matrix-badge",
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory, reduced]);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-8 md:px-12 bg-[#04050b] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="ambient-glow w-[500px] h-[500px] bg-[#c6ff00]/10 top-1/4 left-1/4" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-8" data-reveal="up">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#3d6bff]">
            [ 04 // ARCHITECTURAL CAPABILITY MATRIX ]
          </span>
          <div className="accent-rule flex-1" />
        </div>

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              data-reveal="chars"
              className="font-editorial italic text-4xl sm:text-6xl text-white font-light mb-3"
            >
              {splitRevealChars("Technologies & Toolchains")}
            </h2>
            <p
              data-reveal="up"
              style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
              className="font-mono text-xs text-slate-400 tracking-widest uppercase"
            >
              STRATIFIED BY INTELLIGENCE, DISTRIBUTED BACKEND, CLIENT INTERFACE, AND DEVOPS
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`touch-target liquid-glass-pill px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === tab.key
                    ? "bg-[#3d6bff]/20 text-[#3d6bff] border-[#3d6bff]/60 shadow-[0_0_15px_rgba(61,107,255,0.2)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* One flat pool. The category tabs above are the only thing that sorts
            it — each card carries a short layer tag so a mixed view is still
            readable without the grid imposing an order of its own. */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              className="tech-matrix-badge group flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-[#3d6bff]/35 hover:bg-white/[0.04]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] p-2 transition-transform group-hover:scale-105">
                <img
                  src={tech.icon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-full w-full object-contain brightness-95 transition-all group-hover:brightness-110"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-syne text-sm font-bold text-white transition-colors group-hover:text-[#3d6bff]">
                    {tech.name}
                  </h4>
                  <span className="mt-0.5 shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
                    {categoryLabels[tech.category]}
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-xs font-light leading-snug text-slate-400">
                  {tech.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

