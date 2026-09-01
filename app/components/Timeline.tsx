"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    year: "2023",
    role: "High School Graduate",
    institution: "Nobles International School",
    items: [
      "Completed high school education",
      "Developed interest in programming and technology",
    ],
    side: "right",
  },

  {
    year: "2024",
    role: "Computer Science Student",
    institution: "Effat University",
    items: [
      "Studying software engineering fundamentals",
      "Building web development and programming projects",
      "Learning JavaScript, React, and backend development",
    ],
    side: "left",
  },

  {
    year: "2024 - 2025",
    role: "Developer / Manager / Community Systems Builder",
    institution: "Nektax.net (Minecraft Community Platform)",
    items: [
      "Developed Minecraft Java plugins and server-side systems",
      "Managed Linux server deployment and hosting",
      "Built profanity filtering and content moderation system",
      "Implemented anti-bot protection (mass join detection, proxy checks)",
      "Supported a 3,000+ user online community",
    ],
    side: "right",
  },

  {
    year: "2024",
    role: "Founder / Developer",
    institution: "Taqyimat.net",
    items: [
      "Built an affiliate-based product review platform",
      "Worked with Amazon affiliate marketing system",
      "Learned SEO, traffic growth, and content optimization",
      "Explored conversion tracking and user engagement strategies",
    ],
    side: "left",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

   useEffect(() => {
     const cards = cardsRef.current;
     for (let i = 0; i < cards.length; i++) {
       const card = cards[i];
       if (card) {
         const side = timelineItems[i]?.side || "left";
         const xFrom = side === "left" ? -50 : 50;
         
         gsap.fromTo(
           card,
           { opacity: 0, x: xFrom },
           {
             opacity: 1,
             x: 0,
             duration: 0.8,
             ease: "power3.out",
             scrollTrigger: {
               trigger: card,
               start: "top 85%",
               toggleActions: "play none none reverse",
             },
           }
         );
       }
     }
   }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 bg-black">
      <h2 className="text-4xl md:text-5xl font-playfair text-white mb-16 text-center">
        Timeline
      </h2>

      <div className="max-w-4xl mx-auto relative">
        {/* Center line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-accent-cyan transform -translate-x-1/2 opacity-50" />

        <div className="space-y-16">
          {timelineItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`relative flex items-center ${item.side === "left" ? "justify-start" : "justify-end"}`}
            >
              {/* Year pill */}
              <div className={`absolute top-0 ${item.side === "left" ? "right-1/2 mr-4" : "left-1/2 ml-4"}`}>
                <span className="px-4 py-1 text-xs font-space text-accent-gold bg-black border border-accent-gold rounded-full">
                  {item.year}
                </span>
              </div>

              {/* Card */}
              <div className={`w-full max-w-md p-6 bg-gray-900 rounded-lg border border-gray-800 ${item.side === "left" ? "mr-8" : "ml-8"}`}>
                <h3 className="text-xl font-playfair text-white mb-1">{item.role}</h3>
                <p className="text-sm font-space text-accent-cyan mb-3">{item.institution}</p>
                <ul className="space-y-1">
                  {item.items.map((point, j) => (
                    <li key={j} className="text-xs text-gray-400 font-space flex items-start">
                      <span className="text-accent-cyan mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
