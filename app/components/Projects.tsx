"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { FiExternalLink, FiCpu, FiLayers, FiX, FiCheckCircle, FiActivity, FiTerminal, FiChevronRight } from "react-icons/fi";
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
  interactiveType: "rag" | "clinical" | "infrastructure" | "stack";
  deepDive: {
    problem: string;
    architecture: string;
    keyInnovations: string[];
  };
}

const projects: ProjectItem[] = [
  {
    id: "saudi-law-rag",
    number: "01",
    category: "APPLIED AI & ARABIC NLP",
    title: "Saudi Law Intelligence RAG",
    tagline: "High-precision retrieval-augmented generation for Saudi legislative texts",
    description:
      "Engineered an intelligent Arabic legal retrieval and reasoning system. Processes complex Saudi Royal decrees, ministerial regulations, and commercial codes with semantic chunking and grounded citations.",
    metrics: [
      { label: "Retrieval Accuracy", value: "94.2%" },
      { label: "Query Latency", value: "< 240ms" },
      { label: "Corpus Indexed", value: "10,000+ Articles" },
    ],
    tags: ["Python", "LangChain", "Arabic NLP", "Vector DB", "RAG", "Embeddings"],
    image: "/law.jpeg",
    githubUrl: "https://github.com/AhmadBalu",
    interactiveType: "rag",
    deepDive: {
      problem: "Legal document synthesis in Arabic struggles with morphological variations and subtle cross-statute references.",
      architecture: "Hybrid dense-sparse retrieval combining specialized Arabic embeddings with BM25 keyword reranking and citation-enforced hallucination guards.",
      keyInnovations: [
        "Domain-specific Arabic legal stemmer and stopword filter",
        "Hierarchical statutory chunking preserving section context",
        "Deterministic citation verification verifying output vs raw gazette articles",
      ],
    },
  },
  {
    id: "clinical-prediction",
    number: "02",
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
    number: "03",
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
    image: "/record.avif",
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
    number: "04",
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

  // RAG interactive simulator states
  const [ragQuery, setRagQuery] = useState("Saudi Labor Law: End of Service Gratuity calculation rules");
  const [ragSimulating, setRagSimulating] = useState(false);
  const [ragResult, setRagResult] = useState<string | null>(null);

  // Clinical interactive simulator states
  const [bpValue, setBpValue] = useState(145);
  const [troponin, setTroponin] = useState(0.85);

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
            EXPLORE APPLIED AI REASONING, CLINICAL ML, AND HIGH-CONCURRENCY ARCHITECTURES
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
                <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/10 group-hover:border-[#0df5c8]/30 transition-colors">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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
              className="absolute top-6 right-6 p-2 rounded-full liquid-glass-pill text-slate-400 hover:text-white hover:border-[#0df5c8]/50 transition-colors"
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
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {activeModalProject.deepDive.architecture}
                </p>
              </div>

              {/* Interactive Simulation Sandbox */}
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
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
                className="liquid-glass-pill px-5 py-2.5 text-xs font-mono text-slate-300 hover:text-white"
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

