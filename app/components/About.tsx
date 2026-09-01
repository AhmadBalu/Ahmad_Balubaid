"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      paragraphRefs.current.forEach((para, i) => {
        if (para) {
          gsap.fromTo(
            para,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.1 * i,
              ease: "power3.out",
              scrollTrigger: {
                trigger: para,
                start: "top 90%",
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div ref={imageRef} className="relative">
          <div className="absolute inset-0 border-2 border-accent-cyan rounded-3xl translate-x-3 translate-y-3 pointer-events-none" />
          <div className="absolute -top-4 -left-4 w-8 h-8 pointer-events-none">
            <div className="absolute top-0 left-0 w-6 h-px bg-accent-gold" />
            <div className="absolute top-0 left-0 w-px h-6 bg-accent-gold" />
          </div>
          <div className="relative rounded-3xl overflow-hidden">
            <Image
              src="/shot.jpeg"
              alt="Ahmad Balubaid"
              width={400}
              height={500}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>

        <div ref={contentRef}>
          <span className="text-xs font-space uppercase tracking-[0.2em] text-accent-cyan mb-4 block">
            ABOUT ME
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">
            The Mind Behind the Code
          </h2>
          <p ref={(el) => { paragraphRefs.current[0] = el; }} className="text-gray-400 font-space text-sm leading-relaxed mb-4">
            I'm a passionate AI engineer and full-stack developer based in Saudi Arabia. My journey began with curiosity about how technology shapes our world, leading me to pursue computer science at Effat University while building real-world projects.
          </p>
          <p ref={(el) => { paragraphRefs.current[1] = el; }} className="text-gray-400 font-space text-sm leading-relaxed mb-4">
            My fascination with artificial intelligence grew from experimenting with code to architecting intelligent systems. I specialize in developing RAG systems, machine learning models for healthcare, and full-stack applications that solve meaningful problems.
          </p>
          <p ref={(el) => { paragraphRefs.current[2] = el; }} className="text-gray-400 font-space text-sm leading-relaxed mb-6">
            What drives me is the intersection of creativity and technology — building solutions that are not just functional, but elegant. I'm currently focused on advancing AI applications in healthcare and developing tools that empower communities.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-4 py-2 bg-gray-900 border border-accent-cyan rounded-full font-space text-xs text-accent-cyan">
              Based in Saudi Arabia 🇸🇦
            </span>
            <span className="px-4 py-2 bg-gray-900 border border-accent-cyan rounded-full font-space text-xs text-accent-cyan">
              Open to Work ✦
            </span>
          </div>

          <span className="text-accent-gold font-space text-xs uppercase tracking-wider hover:opacity-80 transition-opacity cursor-pointer">
            Read my full story →
          </span>
        </div>
      </div>
    </section>
  );
}