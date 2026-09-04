"use client";
import React, { useState, useEffect } from "react";
import { FiTerminal, FiVolume2, FiVolumeX, FiLayers, FiMaximize } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { sound } from "../utils/sound";
import MagneticButton from "./MagneticButton";
import CommandTerminal from "./CommandTerminal";

export default function DesignQuirksDock() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [wireframeActive, setWireframeActive] = useState(false);
  const [livePing, setLivePing] = useState<number>(22);

  // Toggle wireframe mode on html tag
  const toggleWireframe = () => {
    sound.playClick();
    const isNowActive = !wireframeActive;
    setWireframeActive(isNowActive);
    if (typeof document !== "undefined") {
      if (isNowActive) {
        document.documentElement.classList.add("wireframe-mode");
      } else {
        document.documentElement.classList.remove("wireframe-mode");
      }
    }
  };

  const toggleSound = () => {
    const isNowOn = sound.toggle();
    setSoundEnabled(isNowOn);
  };

  // Keyboard shortcut for terminal (~ or Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || (e.key === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Periodic network latency ping measurement
  useEffect(() => {
    const measurePing = async () => {
      const start = performance.now();
      try {
        await fetch(window.location.href, { method: "HEAD", cache: "no-store" });
        setLivePing(Math.max(8, Math.round(performance.now() - start)));
      } catch {
        // Fallback default ping
        setLivePing(18 + Math.floor(Math.random() * 8));
      }
    };

    const interval = setInterval(measurePing, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CommandTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onToggleWireframe={toggleWireframe}
      />

      {/* Floating Creative Controls Dock (Fixed Bottom-Right) */}
      <aside
        aria-label="Interactive design and system telemetry controls"
        className="fixed bottom-6 right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2.5 pointer-events-none"
      >
        {/* Telemetry pill */}
        <div className="liquid-glass-pill px-3 py-1.5 font-mono text-[10px] text-slate-400 border border-white/10 hidden md:flex items-center gap-2 shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>EDGE LATENCY:</span>
          <span className="text-[#0df5c8] font-bold">{livePing}ms</span>
        </div>

        {/* Quirk Controls Dock */}
        <div className="liquid-glass rounded-full p-1.5 border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex items-center gap-1.5 pointer-events-auto">
          {/* Audio Synthesizer Toggle */}
          <MagneticButton strength={0.3}>
            <button
              onClick={toggleSound}
              className={`px-3 py-1.5 rounded-full font-mono text-[11px] flex items-center gap-2 transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-[#0df5c8]/20 text-[#0df5c8] border border-[#0df5c8]/60 shadow-[0_0_12px_rgba(13,245,200,0.3)]"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }`}
              title="Toggle Web Audio procedural UI sound effects"
            >
              {soundEnabled ? (
                <>
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-[#0df5c8] rounded-full animate-eq-1" />
                    <span className="w-0.5 bg-[#0df5c8] rounded-full animate-eq-2" />
                    <span className="w-0.5 bg-[#0df5c8] rounded-full animate-eq-3" />
                  </div>
                  <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider">SFX ON</span>
                </>
              ) : (
                <>
                  <FiVolumeX size={14} />
                  <span className="hidden sm:inline text-[10px] uppercase tracking-wider">SFX OFF</span>
                </>
              )}
            </button>
          </MagneticButton>

          {/* Blueprint Wireframe Mode Quirk */}
          <MagneticButton strength={0.3}>
            <button
              onClick={toggleWireframe}
              className={`px-3 py-1.5 rounded-full font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
                wireframeActive
                  ? "bg-[#38bdf8]/25 text-[#38bdf8] border border-[#38bdf8]/60 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }`}
              title="Toggle architectural wireframe / schematic blueprint mode"
            >
              <FiLayers size={13} className={wireframeActive ? "animate-spin" : ""} />
              <span className="hidden sm:inline text-[10px] uppercase tracking-wider">
                {wireframeActive ? "SCHEMATIC ON" : "BLUEPRINT"}
              </span>
            </button>
          </MagneticButton>

          {/* Interactive CLI Terminal Quirk */}
          <MagneticButton strength={0.35}>
            <button
              onClick={() => setTerminalOpen(true)}
              className="liquid-glass-pill px-3.5 py-1.5 text-[11px] font-mono text-white hover:text-[#0df5c8] bg-white/[0.08] hover:bg-[#0df5c8]/20 border border-white/20 hover:border-[#0df5c8]/60 flex items-center gap-2 transition-all cursor-pointer shadow-lg"
              title="Open interactive system terminal (hotkey: ~)"
            >
              <FiTerminal size={13} className="text-[#0df5c8]" />
              <span className="text-[10px] uppercase font-bold tracking-widest">CLI [~]</span>
            </button>
          </MagneticButton>
        </div>
      </aside>
    </>
  );
}
