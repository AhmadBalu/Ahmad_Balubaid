"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(horizontalRef.current, {
        x: "-66.666%",
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 grain-overlay" />
      
      <div ref={horizontalRef} className="flex h-full w-[300%]">
        <div className="w-1/3 h-full flex items-center justify-center px-12">
          <h2 className="text-6xl md:text-8xl font-playfair text-accent-cyan tracking-wider">
            ARTIFICIAL INTELLIGENCE
          </h2>
        </div>
        <div className="w-1/3 h-full flex items-center justify-center px-12">
          <h2 className="text-6xl md:text-8xl font-playfair text-accent-gold tracking-wider">
            BUILT FOR IMPACT
          </h2>
        </div>
        <div className="w-1/3 h-full flex items-center justify-center px-12">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-accent-cyan to-accent-gold blur-xl mb-8" />
            <h2 className="text-5xl md:text-7xl font-playfair text-white tracking-wider">
              LET US BUILD THE FUTURE
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
