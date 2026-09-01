"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCpu, FiServer, FiLayout, FiTerminal, FiCheck } from "react-icons/fi";

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
    name: "Python",
    category: "ai",
    context: "Core AI modeling, data pipelines, backend APIs",
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
  { key: "ai", label: "01 // AI & ML", icon: FiCpu },
  { key: "backend", label: "02 // Systems & DB", icon: FiServer },
  { key: "frontend", label: "03 // Web Runtimes", icon: FiLayout },
  { key: "infra", label: "04 // DevOps & Linux", icon: FiTerminal },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredTech =
    selectedCategory === "all"
      ? techCapabilities
      : techCapabilities.filter((t) => t.category === selectedCategory);

  useEffect(() => {
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
  }, [selectedCategory]);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-8 md:px-12 bg-[#05070c] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="ambient-glow w-[500px] h-[500px] bg-[#38bdf8]/10 top-1/4 left-1/4" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0df5c8]">
            [ 04 // ARCHITECTURAL CAPABILITY MATRIX ]
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        </div>

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-editorial italic text-4xl sm:text-6xl text-white font-light mb-3">
              Technologies & Toolchains
            </h2>
            <p className="font-mono text-xs text-slate-400 tracking-widest uppercase">
              STRATIFIED BY INTELLIGENCE, DISTRIBUTED BACKEND, CLIENT INTERFACE, AND DEVOPS
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`liquid-glass-pill px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === tab.key
                    ? "bg-[#0df5c8]/20 text-[#0df5c8] border-[#0df5c8]/60 shadow-[0_0_15px_rgba(13,245,200,0.2)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Capability Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTech.map((tech, i) => (
            <div
              key={tech.name + i}
              className="tech-matrix-badge liquid-glass-card rounded-2xl p-5 border border-white/10 flex items-start gap-4 group hover:border-[#0df5c8]/40 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 p-2.5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-[#0df5c8]/40 transition-all">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-full h-full object-contain filter brightness-95 group-hover:brightness-110 transition-all"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-syne font-bold text-white text-sm group-hover:text-[#0df5c8] transition-colors">
                    {tech.name}
                  </h3>
                  <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full liquid-glass-subtle text-slate-400">
                    {tech.category.toUpperCase()}
                  </span>
                </div>
                <p className="font-mono text-xs text-slate-400 leading-snug font-light">
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

