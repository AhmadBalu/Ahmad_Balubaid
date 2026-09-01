"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SiGithub, SiDiscord, SiPython } from "react-icons/si";
import {
  FiExternalLink,
  FiCpu,
  FiLayers,
  FiX,
  FiCheckCircle,
  FiActivity,
  FiTerminal,
  FiShield,
  FiSearch,
  FiServer,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  interactiveType: "labychecker" | "rag" | "clinical" | "infrastructure" | "stack";
  deepDive: {
    problem: string;
    architecture: string;
    keyInnovations: string[];
  };
}

const projects: ProjectItem[] = [
  {
    id: "labychecker",
    number: "01",
    category: "CROSS-NETWORK INTELLIGENCE & ASYNC ENGINE",
    title: "LabyChecker Intelligence Platform",
    tagline: "High-performance Minecraft cross-network intelligence & Discord identity verification",
    description:
      "Engineered an asynchronous intelligence platform and Discord service aggregating, normalizing, and visualizing real-time player telemetry across 18+ major competitive Minecraft networks. Solves scattered logs, alt-account tracking, Cloudflare Turnstile barriers, and manual community verification.",
    metrics: [
      { label: "Concurrent Networks", value: "18+ Servers" },
      { label: "Initial Stream Latency", value: "< 5.0s" },
      { label: "Anti-Bot Bypass", value: "Camoufox / Trawl" },
    ],
    tags: [
      "Python 3.12",
      "asyncio",
      "aiohttp",
      "Discord API",
      "Camoufox/Trawl",
      "Cloudflare Clearance",
      "StarlightSkins API",
    ],
    image: "/labymod.jpg",
    githubUrl: "https://github.com/AhmadBalu",
    interactiveType: "labychecker",
    deepDive: {
      problem:
        "Competitive Minecraft networks suffer from fragmented player logs, scattered alt accounts, aggressive Cloudflare Turnstile blocks on server web APIs, and tedious manual verification across distinct Discord communities.",
      architecture:
        "Discord Client ──> Gateway ──> LabyChecker Core (Asyncio Engine) ──> Parallel Ingestion [Direct Fast APIs + Cloudflare Session Pool + Trawl Headless Cluster] ──> Aggregator & Normalizer ──> Progressive Dual-Stage Discord Embeds (<5s initial preview + final dynamic streaming update).",
      keyInnovations: [
        "Asynchronous Progressive Streaming: Dual-stage embed pipeline delivering initial preview embed in <5s and streaming in deep background lookups dynamically",
        "Trawl Anti-Bot Automation: Headless browser scraping cluster (Trawl / Camoufox) solving Cloudflare Turnstile & edge verification with zero throughput degradation",
        "Smart Session Clearance Pooling: Persistent cf_clearance caching, dynamic user agents, and TLS fingerprints enabling sub-second HTTP API execution",
        "Dynamic Timestamp Normalization: Normalizes 18+ disparate date schemas into native Discord relative tags (<t:TIMESTAMP:R>) for client-side timezone auto-adjustment",
        "Automated Cryptographic Verification: One-click Laby.net authentication enforcing automatic Discord role syncing and in-game nickname validation",
      ],
    },
  },
  {
    id: "saudi-law-rag",
    number: "02",
    category: "IEEE PUBLISHED RESEARCH & ARABIC RAG",
    title: "Lawsuit AraRAG (IEEE Xplore)",
    tagline: "A Retrieval-Augmented Generation Framework for Arabic Legal Document Understanding & Hallucination Reduction",
    description:
      "Peer-reviewed research paper published in IEEE Xplore (23rd ILTC 2026). Engineered an intelligent Arabic legal RAG architecture addressing morphological complexity, right-to-left syntax, and domain-grounded citation enforcement.",
    metrics: [
      { label: "Publisher", value: "IEEE Xplore" },
      { label: "Retrieval Accuracy", value: "94.2%" },
      { label: "Query Latency", value: "< 240ms" },
    ],
    tags: ["IEEE Publication", "Python", "LangChain", "Arabic NLP", "Vector DB", "RAG", "Embeddings"],
    image: "/Paper.png",
    githubUrl: "https://github.com/AhmadBalu",
    interactiveType: "rag",
    deepDive: {
      problem: "Legal document synthesis in Arabic struggles with morphological variations, section hierarchy loss, and right-to-left statutory cross-references.",
      architecture: "Hybrid dense-sparse retrieval combining specialized Arabic embeddings with BM25 keyword reranking and citation-enforced hallucination guards, presented at the 23rd ILTC Conference.",
      keyInnovations: [
        "Domain-specific Arabic legal stemmer and stopword filter",
        "Hierarchical statutory chunking preserving section context",
        "Deterministic citation verification verifying output vs raw gazette articles",
        "Peer-reviewed and published in IEEE Xplore Digital Library (2026)",
      ],
    },
  },
  {
    id: "clinical-prediction",
    number: "03",
    category: "HEALTHCARE MACHINE LEARNING",
    title: "Clinical Complication Predictor",
    tagline: "Supervised ML model predicting myocardial infarction complications",
    description:
      "Developed an end-to-end clinical machine learning pipeline analyzing multidimensional patient biomarker telemetry to predict secondary cardiac complications with explainable feature importance.",
    metrics: [
      { label: "ROC-AUC Score", value: "0.89" },
      { label: "Model Architecture", value: "XGBoost + SHAP" },
      { label: "Clinical Features", value: "48 Biomarkers" },
    ],
    tags: ["Python", "Scikit-Learn", "XGBoost", "Clinical ML", "Data Science", "Pandas"],
    image: "/hospital.jpg",
    githubUrl: "https://github.com/AhmadBalu",
    interactiveType: "clinical",
    deepDive: {
      problem: "Hospital telemetry often misses early indicators of post-infarction shock or arrhythmias in acute coronary care units.",
      architecture: "Gradient-boosted decision trees trained with SMOTE class rebalancing, cross-validated on clinical cohorts with SHAP explainability matrices.",
      keyInnovations: [
        "Handling missing biomarker data via iterative MICE imputation",
        "SHAP-based clinical feature attribution for ICU decision support",
        "Calibration curves tuned to minimize false negatives in high-risk patients",
      ],
    },
  },
  {
    id: "nektax-systems",
    number: "04",
    category: "DISTRIBUTED COMMUNITY INFRASTRUCTURE",
    title: "Nektax Systems & Infrastructure",
    tagline: "High-concurrency gaming network supporting 3,000+ active users",
    description:
      "Architected server-side plugins, custom network moderation, and anti-bot mitigation pipelines for an online community platform. Handled packet inspection, Linux clustering, and real-time moderation.",
    metrics: [
      { label: "Active Community", value: "3,000+ Users" },
      { label: "Uptime Reliability", value: "99.8%" },
      { label: "Bot Mitigation", value: "Real-time Heuristics" },
    ],
    tags: ["Java", "Linux Admin", "Spigot/Paper API", "Anti-Bot Heuristics", "MySQL", "Docker"],
    image: "/nektax.png",
    githubUrl: "https://github.com/AhmadBalu",
    interactiveType: "infrastructure",
    deepDive: {
      problem: "High-traffic multiplayer networks experience coordinated DDoS proxy joins, chat spamming, and server memory leakage.",
      architecture: "Custom Java asynchronous event hooks coupled with Linux iptables rate limiters and real-time behavioral fingerprinting.",
      keyInnovations: [
        "Multi-threaded profanity and spoofing filter with sub-millisecond execution",
        "Automated mass-join mitigation inspecting proxy headers",
        "Linux daemon automation for health telemetry and memory recycling",
      ],
    },
  },
  {
    id: "student-score-predictor",
    number: "05",
    category: "PREDICTIVE ANALYTICS & WEB",
    title: "Academic Performance Engine",
    tagline: "Predictive student outcome pipeline and full-stack records system",
    description:
      "Engineered machine learning pipelines modeling academic score trajectories alongside full-stack management applications with role-based access control and PostgreSQL persistence.",
    metrics: [
      { label: "R² Explained Variance", value: "0.86" },
      { label: "Stack", value: "Next.js + Prisma" },
      { label: "Persistence", value: "PostgreSQL" },
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Python", "EDA"],
    image: "/exam1.jpg",
    githubUrl: "https://github.com/AhmadBalu",
    interactiveType: "stack",
    deepDive: {
      problem: "Traditional academic tracking fails to provide proactive interventions for at-risk student cohorts.",
      architecture: "Full-stack Next.js web console with PostgreSQL database connected to predictive inference endpoints.",
      keyInnovations: [
        "Feature engineering isolating socio-behavioral learning metrics",
        "Type-safe data contracts via Prisma ORM and Next.js server actions",
        "Responsive analytics dashboard for administrative oversight",
      ],
    },
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // LabyChecker Simulator States
  const [selectedIgn, setSelectedIgn] = useState<string>("AhmadBalu");
  const [isLabyLoading, setIsLabyLoading] = useState<boolean>(false);

  // RAG interactive simulator states
  const [ragQuery, setRagQuery] = useState("Saudi Labor Law: End of Service Gratuity calculation rules");
  const [ragSimulating, setRagSimulating] = useState(false);
  const [ragResult, setRagResult] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleLabyProfileSelect = (ign: string) => {
    setSelectedIgn(ign);
    setIsLabyLoading(true);
    setTimeout(() => {
      setIsLabyLoading(false);
    }, 400);
  };

  const simulateRagQuery = (query: string) => {
    setRagQuery(query);
    setRagSimulating(true);
    setRagResult(null);

    setTimeout(() => {
      setRagSimulating(false);
      if (query.includes("Labor")) {
        setRagResult(
          "【Saudi Labor Law - Article 84 & 85】: Upon contract termination, worker is entitled to end-of-service award: half a month wage for each of first five years, and full month wage for each subsequent year. Calculation basis: last received basic salary + allowances."
        );
      } else {
        setRagResult(
          "【Saudi Commercial Courts Law - Article 16】: Commercial courts possess statutory jurisdiction over disputes between traders regarding commercial transactions, bankruptcy proceedings, and intellectual property claims exceeding statutory thresholds."
        );
      }
    }, 600);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-8 md:px-12 bg-[#05070c] overflow-hidden"
    >
      {/* Ambient background lights */}
      <div className="ambient-glow w-[550px] h-[550px] bg-[#0df5c8]/10 top-1/3 -right-24" />
      <div className="ambient-glow w-[450px] h-[450px] bg-[#818cf8]/10 bottom-10 left-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0df5c8]">
              [ 02 // FLAGSHIP ARTIFACTS ]
            </span>
            <div className="h-px w-24 bg-gradient-to-r from-white/15 to-transparent" />
          </div>
          <span className="font-mono text-xs text-slate-400 hidden sm:inline-block">
            SYSTEM ARCHITECTURE & PRODUCTION CASE STUDIES
          </span>
        </div>

        {/* Section Title */}
        <div className="mb-16">
          <h2 className="font-editorial italic text-4xl sm:text-6xl text-white font-light mb-3">
            Curated Engineering Works
          </h2>
          <p className="font-mono text-xs text-slate-400 tracking-widest uppercase">
            EXPLORE CROSS-NETWORK INTELLIGENCE, ARABIC RAG REASONING, CLINICAL ML, AND HIGH-CONCURRENCY SYSTEMS
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card-item liquid-glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 group relative overflow-hidden"
            >
              {/* Top Meta Bar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0df5c8] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0df5c8]" />
                    {project.category}
                  </span>
                  <span className="font-editorial italic text-3xl text-white/25 group-hover:text-[#0df5c8]/40 transition-colors">
                    {project.number}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-2 group-hover:text-[#0df5c8] transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-slate-300 mb-4 font-light">
                  {project.tagline}
                </p>

                {/* Project Image Preview */}
                <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/10 group-hover:border-[#0df5c8]/30 transition-colors flex items-center justify-center">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className={`object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
                      project.id === "labychecker" ? "object-contain p-6 bg-[#090d16]" : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d17] via-transparent to-transparent opacity-85" />

                  {/* Overlay Metrics Strip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    {project.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="liquid-glass-pill px-3 py-1 text-center flex-1"
                      >
                        <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                          {metric.label}
                        </p>
                        <p className="font-syne font-bold text-xs text-white">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="liquid-glass-pill px-2.5 py-1 text-[11px] font-mono text-slate-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setActiveModalProject(project);
                    if (project.interactiveType === "rag") {
                      simulateRagQuery("Saudi Labor Law: End of Service Gratuity calculation rules");
                    }
                  }}
                  className="liquid-glass-pill px-4 py-2.5 bg-white/[0.06] hover:bg-[#0df5c8]/15 border border-white/15 hover:border-[#0df5c8]/50 text-white hover:text-[#0df5c8] font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  <HiSparkles className="text-[#0df5c8]" />
                  <span>Inspect Architecture</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass-pill p-2.5 text-slate-300 hover:text-white hover:border-[#0df5c8]/40 transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <SiGithub size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Case Study & Architecture Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto liquid-glass rounded-3xl border border-white/20 p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full liquid-glass-pill text-slate-400 hover:text-white hover:border-[#0df5c8]/50 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <FiX size={20} />
            </button>

            {/* Header */}
            <div className="mb-6 pr-10">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0df5c8] flex items-center gap-2 mb-1">
                <span>[ ARTIFACT INSPECTOR // {activeModalProject.number} ]</span>
              </span>
              <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white">
                {activeModalProject.title}
              </h3>
              <p className="font-mono text-xs text-slate-300 mt-1">
                {activeModalProject.tagline}
              </p>
            </div>

            {/* Architecture Details */}
            <div className="space-y-6 mb-8">
              <div className="liquid-glass-subtle rounded-2xl p-4 border border-white/10">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-2">
                  <FiCpu className="text-[#0df5c8]" />
                  <span>The Architectural Challenge</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {activeModalProject.deepDive.problem}
                </p>
              </div>

              <div className="liquid-glass-subtle rounded-2xl p-4 border border-white/10">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-2">
                  <FiLayers className="text-[#38bdf8]" />
                  <span>Engineered System Topology</span>
                </h4>
                <div className="bg-[#03060a] rounded-xl p-3 font-mono text-[11px] text-[#38bdf8] border border-white/10 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {activeModalProject.deepDive.architecture}
                </div>
              </div>

              {/* LabyChecker Interactive Cross-Network Intelligence Sandbox */}
              {activeModalProject.interactiveType === "labychecker" && (
                <div className="liquid-glass rounded-2xl p-5 border border-[#0df5c8]/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#0df5c8] flex items-center gap-2">
                      <SiDiscord />
                      <span>Live Cross-Network Player Dossier Simulator</span>
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      ASYNC STREAM ENGINE: ONLINE
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-3">
                    Test live player dossier aggregation across 18+ Minecraft networks and dynamic Discord relative timestamps:
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {["AhmadBalu", "Technoblade", "LabyUser99"].map((ign) => (
                      <button
                        key={ign}
                        onClick={() => handleLabyProfileSelect(ign)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          selectedIgn === ign
                            ? "bg-[#0df5c8]/20 text-[#0df5c8] border border-[#0df5c8]/50"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        Lookup: {ign}
                      </button>
                    ))}
                  </div>

                  {/* Simulated Discord Intelligence Embed */}
                  <div className="bg-[#0b101b] rounded-2xl p-4 border border-[#38bdf8]/30 relative overflow-hidden font-mono text-xs">
                    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0df5c8] to-[#0284c7] p-0.5 flex items-center justify-center shadow-lg">
                          <div className="w-full h-full bg-[#0b101b] rounded-[10px] flex items-center justify-center font-bold text-white text-xs">
                            {selectedIgn.substring(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-syne font-bold text-white text-sm">
                              {selectedIgn}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              ✔ Cryptographic Laby.net Verified
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400">
                            UUID: 8a4c1f2e-3d7b-49e0-b91a-{selectedIgn === "AhmadBalu" ? "7c3e8f9d12a4" : "0981bcf76a21"}
                          </p>
                        </div>
                      </div>

                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-slate-400 block">Clearance Pool:</span>
                        <span className="text-[10px] text-[#0df5c8]">cf_clearance: ACTIVE [Pool 2]</span>
                      </div>
                    </div>

                    {isLabyLoading ? (
                      <div className="py-6 text-center text-[#0df5c8] animate-pulse">
                        Querying 18+ Minecraft networks via async parallel streams...
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                        {/* Server 1 */}
                        <div className="liquid-glass-subtle rounded-xl p-2.5 border border-white/10">
                          <p className="text-[#38bdf8] font-bold text-[11px] mb-1">
                            ⚔ Hypixel Network
                          </p>
                          <p className="text-[10px] text-slate-400">Rank: <span className="text-white font-medium">MVP++ [Aqua]</span></p>
                          <p className="text-[10px] text-slate-400">Last Seen: <span className="text-emerald-400">&lt;t:1725199372:R&gt; (4 mins ago)</span></p>
                          <p className="text-[10px] text-slate-400">First Joined: <span className="text-white">Jan 14, 2018</span></p>
                        </div>

                        {/* Server 2 */}
                        <div className="liquid-glass-subtle rounded-xl p-2.5 border border-white/10">
                          <p className="text-[#0df5c8] font-bold text-[11px] mb-1">
                            🏰 Wynncraft RPG
                          </p>
                          <p className="text-[10px] text-slate-400">Class: <span className="text-white font-medium">Archer (Lvl 104)</span></p>
                          <p className="text-[10px] text-slate-400">Playtime: <span className="text-white font-medium">412 Hours</span></p>
                          <p className="text-[10px] text-slate-400">Guild: <span className="text-white">Kingdom of Ragni</span></p>
                        </div>

                        {/* Cosmetics & 3D render */}
                        <div className="liquid-glass-subtle rounded-xl p-2.5 border border-white/10 sm:col-span-2 flex items-center justify-between">
                          <div>
                            <p className="text-[#f59e0b] font-bold text-[11px] mb-1">
                              ✨ Cosmetics & Dynamic 3D Skins
                            </p>
                            <p className="text-[10px] text-slate-300">
                              Active: Custom Bandana (Mint Glow), Animated Cloak, 3D Pose Render
                            </p>
                          </div>
                          <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-slate-200">
                            StarlightSkins API
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* RAG Simulation Sandbox */}
              {activeModalProject.interactiveType === "rag" && (
                <div className="liquid-glass rounded-2xl p-5 border border-[#0df5c8]/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#0df5c8] flex items-center gap-2">
                      <FiTerminal />
                      <span>Live Arabic RAG Query Simulator</span>
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400">
                      EMBEDDINGS: READY
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-3">
                    Select a sample legal query to test dense vector retrieval and citation grounding:
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() =>
                        simulateRagQuery("Saudi Labor Law: End of Service Gratuity calculation rules")
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        ragQuery.includes("Labor")
                          ? "bg-[#0df5c8]/20 text-[#0df5c8] border border-[#0df5c8]/50"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      Labor Law: End of Service
                    </button>
                    <button
                      onClick={() =>
                        simulateRagQuery("Saudi Commercial Courts: Jurisdiction over arbitration disputes")
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        ragQuery.includes("Commercial")
                          ? "bg-[#0df5c8]/20 text-[#0df5c8] border border-[#0df5c8]/50"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      Commercial Courts Jurisdiction
                    </button>
                  </div>

                  {/* Simulator Output Window */}
                  <div className="bg-[#03060a] rounded-xl p-4 font-mono text-xs border border-white/10">
                    <div className="text-slate-400 mb-2 flex items-center gap-2">
                      <span className="text-[#0df5c8]">$</span>
                      <span>query: "{ragQuery}"</span>
                    </div>

                    {ragSimulating ? (
                      <div className="text-[#0df5c8] animate-pulse flex items-center gap-2 py-2">
                        <span>Executing hybrid vector search & reranking...</span>
                      </div>
                    ) : (
                      ragResult && (
                        <div className="text-slate-200 leading-relaxed bg-white/[0.03] p-3 rounded-lg border border-white/10 mt-2">
                          <p className="text-[#0df5c8] text-[11px] mb-1 font-bold">
                            ✔ CITATION VERIFIED (Score: 0.942)
                          </p>
                          <p className="text-slate-300">{ragResult}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Key Technical Innovations */}
              <div className="liquid-glass-subtle rounded-2xl p-4 border border-white/10">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-300 mb-3">
                  Key Technical Feats & Validations
                </h4>
                <ul className="space-y-2">
                  {activeModalProject.deepDive.keyInnovations.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <FiCheckCircle className="text-[#0df5c8] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-pill px-5 py-2.5 text-xs font-mono text-white hover:text-[#0df5c8] border border-white/15 flex items-center gap-2"
              >
                <SiGithub />
                <span>View Source on GitHub</span>
              </a>

              <button
                onClick={() => setActiveModalProject(null)}
                className="liquid-glass-pill px-5 py-2.5 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


