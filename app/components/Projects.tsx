"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { MdLanguage } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "Saudi Law RAG",
    description: "Intelligent retrieval-augmented generation system for Saudi legislation. Query complex legal documents using natural language.",
    tags: ["Python", "LangChain", "RAG", "NLP", "Arabic NLP"],
    image: "/law.jpeg",
  },
  {
    number: "02",
    title: "Clinical Outcome Prediction",
    description: "ML model predicting myocardial infarction complications and clinical outcomes from patient data.",
    tags: ["Python", "Scikit-learn", "XGBoost", "Clinical AI", "Healthcare"],
    image: "/hospital.jpg",
  },
  {
    number: "03",
    title: "Student Exam Score Predictor",
    description: "Machine learning pipeline to predict student academic performance based on behavioral and demographic features.",
    tags: ["Python", "Pandas", "ML", "Data Science", "EDA"],
    image: "/exam1.jpg",
  },
  {
    number: "04",
    title: "Hospital Patient Record System",
    description: "Full-stack hospital management system for patient records, appointments, and medical history.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "TypeScript", "Healthcare"],
    image: "/record.avif",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".projects-title .word",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      cardsRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    card.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (card) card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-12 bg-background">
      <h2 className="projects-title text-4xl md:text-7xl font-playfair text-white mb-20">
        {"My Projects".split(" ").map((word, i) => (
          <span key={i} className="word inline-block overflow-hidden mr-4">
            {word}
          </span>
        ))}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="project-card glowing-border bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 transition-all duration-300 flex flex-col"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* Image placeholder */}
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-800">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <span className="text-6xl font-space text-accent-cyan/20">{project.number}</span>
            <h3 className="text-2xl font-playfair text-white mt-2 mb-3">{project.title}</h3>
            <p className="text-gray-400 mb-4 font-space text-sm leading-relaxed">{project.description}</p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 text-xs font-space text-accent-cyan border border-accent-cyan/30 rounded-full bg-gray-900/50">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-auto pt-4">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-accent-cyan hover:text-accent-gold hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all duration-300"
                aria-label="GitHub"
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-accent-cyan hover:text-accent-gold hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all duration-300"
                aria-label="Live Demo"
              >
                <MdLanguage className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
