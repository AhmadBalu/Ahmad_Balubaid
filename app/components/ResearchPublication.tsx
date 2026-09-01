"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FiAward, FiExternalLink, FiBookOpen, FiUsers, FiCheckCircle } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

import { getAssetPath } from "../utils/assets";

gsap.registerPlugin(ScrollTrigger);

export default function ResearchPublication() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftCardRef.current,
        { opacity: 0, x: -50, scale: 0.96 },
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
        rightCardRef.current,
        { opacity: 0, x: 50, scale: 0.96 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-8 md:px-12 bg-[#05070c] overflow-hidden border-t border-white/10"
    >
      {/* Ambient background light */}
      <div className="ambient-glow w-[550px] h-[550px] bg-[#0df5c8]/10 top-1/3 -left-24" />
      <div className="ambient-glow w-[500px] h-[500px] bg-[#38bdf8]/10 bottom-10 right-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0df5c8]">
              [ 03 // PEER-REVIEWED RESEARCH & IEEE PUBLICATION ]
            </span>
            <div className="h-px w-24 bg-gradient-to-r from-white/15 to-transparent" />
          </div>
          <span className="font-mono text-xs text-slate-400 hidden sm:inline-block">
            PUBLISHED IN IEEE XPLORE • ILTC 2026
          </span>
        </div>

        {/* Section Title */}
        <div className="mb-14">
          <h2 className="font-editorial italic text-4xl sm:text-6xl text-white font-light mb-3">
            Academic Research & Publications
          </h2>
          <p className="font-mono text-xs text-slate-400 tracking-widest uppercase">
            ADVANCING ARABIC GENERATIVE AI, SEMANTIC RETRIEVAL, AND HALLUCINATION REDUCTION
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: IEEE Paper Preview Card */}
          <div
            ref={leftCardRef}
            className="lg:col-span-6 liquid-glass rounded-3xl p-6 sm:p-8 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between"
          >
            <div>
              {/* Top Meta Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <span className="liquid-glass-pill px-3.5 py-1 text-xs font-mono text-[#0df5c8] border border-[#0df5c8]/40 flex items-center gap-2">
                  <FiBookOpen />
                  <span>IEEE Xplore Digital Library</span>
                </span>
                <span className="font-mono text-xs text-slate-400">
                  23rd ILTC Conference • 2026
                </span>
              </div>

              {/* Paper Title */}
              <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-white mb-4 leading-snug">
                Lawsuit AraRAG: A Retrieval-Augmented Generation Framework for Arabic Legal Document Understanding and Hallucination Reduction
              </h3>

              {/* Authors List */}
              <div className="liquid-glass-subtle rounded-xl p-3.5 border border-white/10 mb-6 font-mono text-xs">
                <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <FiUsers className="text-[#0df5c8]" />
                  <span>Authors & Researchers</span>
                </p>
                <p className="text-slate-200 leading-relaxed font-medium">
                  Passent ElKafrawy · Ahmad Hakim · <span className="text-[#0df5c8] font-bold">Ahmad Balubaid</span> · Faisal Alkhalili
                </p>
                <p className="text-slate-400 text-[11px] mt-1">
                  Effat University — Department of Computer Science
                </p>
              </div>

              {/* Paper Screenshot Preview */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 mb-6 group">
                <Image
                  src={getAssetPath("/Paper.png")}
                  alt="Lawsuit AraRAG IEEE Xplore Publication"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d17] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="liquid-glass-pill px-3 py-1 text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <FiCheckCircle />
                    <span>Peer-Reviewed & Indexed</span>
                  </span>
                </div>
              </div>

              {/* Abstract Snippet */}
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                Addresses the critical gap in Arabic legal generative AI by architecting a specialized Retrieval-Augmented Generation (RAG) framework tailored for morphological complexity, right-to-left syntax, and domain-grounded citation enforcement.
              </p>
            </div>

            {/* Action link */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href="https://linkedin.com/in/ahmad-balubaid/"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-pill px-4 py-2.5 text-xs font-mono text-white hover:text-[#0df5c8] border border-white/15 flex items-center gap-2 transition-all"
              >
                <FiExternalLink />
                <span>View IEEE Publication</span>
              </a>
              <span className="font-mono text-[11px] text-slate-400">
                DOI / Conference Indexed
              </span>
            </div>
          </div>

          {/* Right: Research Team & LinkedIn Announcement Card */}
          <div
            ref={rightCardRef}
            className="lg:col-span-6 liquid-glass rounded-3xl p-6 sm:p-8 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between"
          >
            <div>
              {/* Top Meta Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <span className="liquid-glass-pill px-3.5 py-1 text-xs font-mono text-[#38bdf8] border border-[#38bdf8]/40 flex items-center gap-2">
                  <FaLinkedin className="text-base text-[#38bdf8]" />
                  <span>Research Spotlight & Team</span>
                </span>
                <span className="font-mono text-xs text-slate-400">
                  Effat University • Saudi Arabia 🇸🇦
                </span>
              </div>

              {/* Research Team Photo */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 mb-6 group">
                <Image
                  src={getAssetPath("/researchteam.jpg")}
                  alt="Ahmad Balubaid and Research Team at ILTC 2026 Conference"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d17] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="liquid-glass-pill px-3 py-1 text-[10px] font-mono text-slate-200 border border-white/20">
                    23rd International Learning & Tech Conference (ILTC)
                  </span>
                </div>
              </div>

              {/* LinkedIn Post Commentary Block */}
              <div className="liquid-glass-card rounded-2xl p-5 border border-white/10 mb-6 relative">
                <div className="flex items-center gap-2 mb-3">
                  <FaLinkedin className="text-[#38bdf8] text-base" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white font-semibold">
                    LinkedIn Research Announcement
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed italic mb-3">
                  "Honored to announce that our research paper <span className="text-white font-medium not-italic">‘Lawsuit AraRAG: A Retrieval-Augmented Generation Framework for Arabic Legal Document Understanding and Hallucination Reduction’</span> has been officially published in IEEE Xplore after being presented at the 23rd International Learning and Technology Conference (ILTC 2026)."
                </p>

                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  "Immense gratitude to Dr. Passent ElKafrawy, Ahmad Hakim, Faisal Alkhalili, and Effat University for this milestone in empowering Arabic NLP and legal intelligence systems."
                </p>
              </div>
            </div>

            {/* LinkedIn profile link */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href="https://linkedin.com/in/ahmad-balubaid/"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-pill px-4 py-2.5 text-xs font-mono text-slate-200 hover:text-[#38bdf8] border border-white/15 flex items-center gap-2 transition-all"
              >
                <FaLinkedin />
                <span>Connect on LinkedIn</span>
              </a>
              <span className="font-mono text-[11px] text-[#0df5c8]">
                #IEEE #AI #ArabicNLP #RAG
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
