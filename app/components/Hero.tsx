"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

export default function Hero() {
  const orbRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      orbRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        ".name-letter",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.04, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8 },
        "-=0.3"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4"
      );
  }, []);

  const firstName = "Ahmad";
  const orbContainerRef = useRef<HTMLDivElement>(null);
  const lastName = "Balubaid";

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#03080f]">
      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.14]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Nebula radial glow layers */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at 15% 65%, rgba(0,190,170,0.09) 0%, transparent 65%),
            radial-gradient(ellipse 45% 38% at 85% 30%, rgba(180,140,10,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 55% at 50% 45%, rgba(0,60,100,0.14) 0%, transparent 70%)
          `,
        }}
      />

      {/* Three.js star field */}
      <div className="absolute inset-0 z-[1] opacity-90">
        <ThreeScene />
      </div>

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex justify-end items-center px-10 py-6 gap-8 z-20">
        {["Home", "Portfolio", "About", "Contact"].map((item) => (
          <a
            key={item}
            href="#"
            className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-[rgba(160,195,220,0.45)] hover:text-[rgba(0,220,195,0.85)] transition-colors duration-300"
          >
            {item}
          </a>
        ))}
        <a
          href="#"
          className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-[rgba(0,210,185,0.6)] hover:text-[rgba(0,210,185,0.95)] border border-[rgba(0,210,185,0.28)] hover:bg-[rgba(0,210,185,0.06)] px-3 py-1.5 rounded-[3px] transition-all duration-300"
        >
          ↓ Resume
        </a>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Orb */}
        <div ref={orbRef} className="relative w-40 h-40 mb-10">
          {/* Outer pulse glow */}
          <div
            className="absolute rounded-full animate-pulse"
            style={{
              inset: "-28px",
              background: "radial-gradient(circle, rgba(0,200,175,0.07) 0%, transparent 68%)",
            }}
          />

          {/* Floating wrapper */}
          <div className="relative w-full h-full animate-[float_7s_ease-in-out_infinite]">
            {/* SVG ring + mesh */}
            <svg
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full animate-[spin_28s_linear_infinite]"
            >
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#22e5c8" />
                  <stop offset="55%" stopColor="#22e5c8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#d4aa22" />
                </linearGradient>
                <clipPath id="orbClip">
                  <circle cx="80" cy="80" r="57" />
                </clipPath>
              </defs>

              {/* Inner mesh lines */}
              <g clipPath="url(#orbClip)" opacity="0.2">
                <ellipse cx="80" cy="80" rx="57" ry="28" stroke="rgba(0,200,175,0.5)" strokeWidth="0.5" fill="none" />
                <ellipse cx="80" cy="80" rx="57" ry="14" stroke="rgba(0,200,175,0.3)" strokeWidth="0.5" fill="none" />
                <line x1="23" y1="80" x2="137" y2="80" stroke="rgba(0,200,175,0.35)" strokeWidth="0.5" />
                <line x1="80" y1="23" x2="80" y2="137" stroke="rgba(0,200,175,0.35)" strokeWidth="0.5" />
                <circle cx="80" cy="80" r="30" stroke="rgba(0,200,175,0.2)" strokeWidth="0.5" fill="none" />
                <circle cx="80" cy="80" r="44" stroke="rgba(0,200,175,0.12)" strokeWidth="0.5" fill="none" />
              </g>

              {/* Outer dashed orbit */}
              <circle cx="80" cy="80" r="72" stroke="rgba(34,229,200,0.07)" strokeWidth="0.5" strokeDasharray="3 8" fill="none" />

              {/* Main gradient ring */}
              <circle cx="80" cy="80" r="57" stroke="url(#ringGrad)" strokeWidth="1.5" fill="none" />

              {/* Accent dots */}
              <circle cx="80" cy="23" r="2.5" fill="#22e5c8" opacity="0.75" />
              <circle cx="137" cy="80" r="1.5" fill="#d4aa22" opacity="0.5" />
            </svg>

            {/* Center dark circle with initials */}
            <div
              className="absolute flex items-center justify-center rounded-full border border-[rgba(0,190,170,0.12)]"
              style={{
                inset: "22px",
                background: "radial-gradient(circle at 35% 30%, #0c2232, #020b14)",
              }}
            >
              <span
                className="font-mono text-[20px] font-light tracking-widest"
                style={{
                  background: "linear-gradient(135deg, #22e5c8, #d4aa22)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AB
              </span>
            </div>
          </div>
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-[clamp(3.6rem,8vw,6rem)] font-light text-[#dde8f0] tracking-[0.05em] leading-none mb-4 text-center"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {firstName.split("").map((l, i) => (
            <span key={`f${i}`} className="name-letter inline-block italic text-[#c2d8e8]">
              {l}
            </span>
          ))}
          <span className="name-letter inline-block">&nbsp;</span>
          {lastName.split("").map((l, i) => (
            <span key={`s${i}`} className="name-letter inline-block">
              {l}
            </span>
          ))}
        </h1>

        {/* Gradient divider */}
        <div
          ref={dividerRef}
          className="origin-center mb-4"
          style={{
            width: "120px",
            height: "0.5px",
            background: "linear-gradient(90deg, transparent, #22e5c8, #d4aa22, transparent)",
          }}
        />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[rgba(140,175,200,0.55)]"
        >
          AI Engineer
          <span className="text-[rgba(34,229,200,0.35)] mx-3 text-[8px] align-middle">◆</span>
          Full Stack Developer
          <span className="text-[rgba(34,229,200,0.35)] mx-3 text-[8px] align-middle">◆</span>
          Researcher
        </p>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-[fadeIn_1.5s_ease_0.8s_both] z-10">
        <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-[rgba(120,160,185,0.35)]">
          Scroll
        </span>
        <div className="flex flex-col items-center gap-1 animate-[bounce_2.2s_ease-in-out_infinite]">
          <div
            className="w-3.5 h-px origin-center"
            style={{
              background: "rgba(34,229,200,0.4)",
              transform: "rotate(35deg) translateX(3px)",
            }}
          />
          <div
            className="w-3.5 h-px origin-center"
            style={{
              background: "rgba(34,229,200,0.4)",
              transform: "rotate(-35deg) translateX(-3px)",
            }}
          />
        </div>
      </div>

      {/* Corner decorations */}
      <span className="absolute bottom-6 left-7 font-mono text-[11px] tracking-wide text-[rgba(34,229,200,0.22)] z-10">
        N
      </span>
      <svg className="absolute bottom-6 right-7 z-10" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 0 L18 9 L9 18 L0 9 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.5" />
      </svg>
    </section>
  );
}



