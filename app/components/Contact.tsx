"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiSend, FiCopy, FiCheck, FiArrowUpRight } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);

  const emailAddress = "Ahmadobalubaid@gmail.com";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-terminal-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulated responsive feedback
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 800);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-8 md:px-12 bg-[#05070c] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="ambient-glow w-[600px] h-[600px] bg-[#0df5c8]/10 top-1/4 -right-20" />
      <div className="ambient-glow w-[450px] h-[450px] bg-[#38bdf8]/10 -bottom-20 left-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0df5c8]">
            [ 07 // TRANSMISSION TERMINAL ]
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        </div>

        {/* Section Title */}
        <div className="mb-16">
          <h2 className="font-editorial italic text-4xl sm:text-6xl text-white font-light mb-3">
            Initiate Collaboration
          </h2>
          <p className="font-mono text-xs text-slate-400 tracking-widest uppercase">
            REACH OUT FOR AI RESEARCH, SYSTEM ARCHITECTURE, OR ENGINEERING OPPORTUNITIES
          </p>
        </div>

        {/* Main Terminal Container */}
        <div className="contact-terminal-card liquid-glass rounded-3xl p-6 sm:p-10 border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4">
                  Let's engineer the future of intelligent systems.
                </h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed mb-8">
                  Whether you have an inquiry regarding Arabic RAG architectures, machine learning deployments, high-concurrency systems, or potential roles in Saudi Arabia and globally, I am ready to connect.
                </p>

                {/* Quick Copy Email Card */}
                <div className="liquid-glass-card rounded-2xl p-4 border border-white/10 mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      DIRECT EMAIL TRANSMISSION
                    </span>
                    <span className="font-mono text-[10px] text-[#0df5c8]">
                      {copied ? "COPIED!" : "CLICK TO COPY"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs sm:text-sm text-white font-medium truncate">
                      {emailAddress}
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="liquid-glass-pill p-2 text-slate-300 hover:text-[#0df5c8] hover:border-[#0df5c8]/50 transition-colors shrink-0"
                      aria-label="Copy Email"
                    >
                      {copied ? <FiCheck className="text-[#0df5c8]" /> : <FiCopy />}
                    </button>
                  </div>
                </div>

                {/* Social Signals */}
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-2">
                    DIGITAL FOOTPRINT
                  </span>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://linkedin.com/in/ahmad-balubaid/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-glass-pill px-4 py-2.5 text-xs font-mono text-slate-200 hover:text-[#0df5c8] border border-white/10 flex items-center gap-2 transition-all"
                    >
                      <FaLinkedin className="text-base text-[#38bdf8]" />
                      <span>LinkedIn Profile</span>
                      <FiArrowUpRight className="text-xs text-slate-400" />
                    </a>

                    <a
                      href="https://github.com/AhmadBalu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-glass-pill px-4 py-2.5 text-xs font-mono text-slate-200 hover:text-[#0df5c8] border border-white/10 flex items-center gap-2 transition-all"
                    >
                      <SiGithub className="text-base text-white" />
                      <span>GitHub Workspace</span>
                      <FiArrowUpRight className="text-xs text-slate-400" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="mt-8 pt-6 border-t border-white/10 font-mono text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0df5c8] animate-pulse" />
                <span>Riyadh / Jeddah • UTC+3 AST</span>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Identity / Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Dr. Faisal Al-Harbi"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#0df5c8]/60 focus:bg-white/[0.07] transition-all placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="faisal@enterprise.sa"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#0df5c8]/60 focus:bg-white/[0.07] transition-all placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                    Subject / Project Scope *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. Arabic RAG Architecture Consultation"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#0df5c8]/60 focus:bg-white/[0.07] transition-all placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                    Detailed Transmission / Message *
                  </label>
                  <textarea
                    name="message"
                    placeholder="Describe your technical requirements, research proposal, or project timeline..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#0df5c8]/60 focus:bg-white/[0.07] transition-all placeholder:text-slate-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full liquid-glass-pill py-4 bg-[#0df5c8]/15 hover:bg-[#0df5c8]/25 border border-[#0df5c8]/50 text-white hover:text-[#0df5c8] font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 group cursor-pointer shadow-[0_10px_30px_rgba(13,245,200,0.15)]"
                >
                  {status === "submitting" ? (
                    <span>Transmitting Dispatch...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform text-[#0df5c8]" />
                    </>
                  )}
                </button>

                {status === "success" && (
                  <div className="p-4 rounded-xl liquid-glass-subtle border border-emerald-500/40 text-emerald-400 font-mono text-xs flex items-center gap-2">
                    <FiCheck />
                    <span>Transmission received successfully. I will respond within 24 hours.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





