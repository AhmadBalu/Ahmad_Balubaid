"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const skills = [
  "Machine Learning",
  "RAG Systems",
  "NLP",
  "Clinical AI",
  "Next.js",
  "Python",
  "Saudi Tech",
  "TypeScript",
  "React",
  "PostgreSQL",
];

export default function MarqueeBar() {
  const marqueeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    marqueeRefs.current.forEach((marquee, index) => {
      if (marquee) {
        gsap.to(marquee, {
          x: index % 2 === 0 ? "-50%" : "50%",
          duration: 20,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }
    });
  }, []);

  return (
    <div className="bg-black py-4 overflow-hidden border-y border-gray-800">
      {[0, 1].map((row) => (
        <div
          key={row}
          ref={(el) => { marqueeRefs.current[row] = el; }}
          className="flex whitespace-nowrap"
        >
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={i}
              className="mx-8 text-sm font-space text-accent-cyan tracking-wider"
            >
              {skill} ·
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
