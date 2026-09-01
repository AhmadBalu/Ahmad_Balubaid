"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const row1 = [
  "ARABIC LEGAL RAG",
  "CLINICAL MACHINE LEARNING",
  "PROBABILISTIC REASONING",
  "3,000+ USER PLATFORM INFRASTRUCTURE",
  "DISTRIBUTED SYSTEMS",
  "LOW LATENCY INFERENCE",
  "LANGCHAIN & HYBRID SEARCH",
];

const row2 = [
  "FULL STACK ARCHITECTURE",
  "NEXT.JS 16 & REACT 19",
  "CARDIOLOGY OUTCOME PREDICTION",
  "JAVA HIGH-CONCURRENCY PLUGINS",
  "LINUX DEPLOYMENT & DEVOPS",
  "EMBEDDINGS & VECTOR STORES",
  "SAUDI ARABIA VISION 2030 TECH",
];

export default function MarqueeBar() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1 animation (leftwards)
      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          xPercent: -50,
          repeat: -1,
          duration: 26,
          ease: "none",
        });
      }

      // Row 2 animation (rightwards)
      if (row2Ref.current) {
        gsap.fromTo(
          row2Ref.current,
          { xPercent: -50 },
          {
            xPercent: 0,
            repeat: -1,
            duration: 28,
            ease: "none",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative py-6 bg-[#04060a] border-y border-white/10 overflow-hidden select-none">
      {/* Subtle edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#04060a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#04060a] to-transparent z-10 pointer-events-none" />

      {/* Row 1 */}
      <div className="flex overflow-hidden py-1">
        <div ref={row1Ref} className="flex shrink-0 items-center whitespace-nowrap">
          {[...row1, ...row1].map((item, i) => (
            <div key={i} className="flex items-center mx-6">
              <span className="font-syne font-bold text-xs sm:text-sm tracking-[0.2em] uppercase text-white/90">
                {item}
              </span>
              <span className="ml-6 text-[#0df5c8] text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex overflow-hidden py-1 opacity-70">
        <div ref={row2Ref} className="flex shrink-0 items-center whitespace-nowrap">
          {[...row2, ...row2].map((item, i) => (
            <div key={i} className="flex items-center mx-6">
              <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-slate-400">
                {item}
              </span>
              <span className="ml-6 text-[#38bdf8] text-[9px]">◇</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

