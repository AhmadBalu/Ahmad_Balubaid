"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdCheckCircle } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 20, label: "Projects" },
  { value: 4, label: "Years" },
  { value: 23, label: "Technologies" },
  { value: 3, label: "Certifications" },
];

const certifications = [
  {
    name: "Python Data Structures",
    issuer: "University of Michigan",
    year: "2023",
  },
  {
    name: "Introduction to DevOps",
    issuer: "IBM",
    year: "2026",
  },
  {
    name: "Linear Algebra for Machine Learning and Data Science",
    issuer: "DeepLearning.AI",
    year: "2026",
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Count up animation
      numbersRef.current.forEach((num, i) => {
        if (num) {
          const stat = stats[i];
          gsap.fromTo(
            num,
            { innerHTML: 0 },
            {
              innerHTML: stat.value,
              duration: 2,
              ease: "power2.out",
              snap: { innerHTML: 1 },
              scrollTrigger: {
                trigger: num,
                start: "top 90%",
              },
            }
          );
        }
      });

      // Card reveal
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 bg-background">
      <h2 className="text-4xl md:text-5xl font-playfair text-white mb-16 text-center">
        Stats & Certifications
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border border-gray-800 text-center"
            >
              <span
                ref={(el) => { numbersRef.current[i] = el; }}
                className="block text-4xl font-playfair text-accent-gold mb-2"
              >
                0
              </span>
              <span className="text-xs font-space text-gray-400 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="space-y-4">
          {certifications.map((cert, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[stats.length + i] = el; }}
              className="flex items-start gap-3 p-4 bg-gray-900 rounded-lg border border-gray-800"
            >
              <MdCheckCircle className="text-accent-cyan text-xl mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-white font-space text-sm">{cert.name}</h4>
                <p className="text-gray-400 font-space text-xs">
                  {cert.issuer} • {cert.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
