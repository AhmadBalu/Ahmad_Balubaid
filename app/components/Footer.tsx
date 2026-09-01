"use client";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0">
          <p className="text-gray-400 font-space text-sm mb-2">
            Open to opportunities
          </p>
          <p className="text-gray-500 font-space text-xs">
            Based in Saudi Arabia
          </p>
        </div>

        <div className="flex gap-4 mb-8 md:mb-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-900 text-gray-400 hover:text-accent-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all duration-300"
            aria-label="GitHub"
          >
            <SiGithub className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-900 text-gray-400 hover:text-accent-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:AhmadoBalubaid@gmail.com"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-900 text-gray-400 hover:text-accent-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all duration-300"
            aria-label="Email"
          >
            <MdEmail className="w-5 h-5" />
          </a>
        </div>

        <div className="text-gray-500 font-space text-xs">
          Ahmad Balubaid
        </div>
      </div>
    </footer>
  );
}


