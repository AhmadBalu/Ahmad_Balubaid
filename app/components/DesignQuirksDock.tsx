"use client";
import React, { useState, useEffect } from "react";
import { FiTerminal, FiVolumeX } from "react-icons/fi";
import { sound } from "../utils/sound";
import MagneticButton from "./MagneticButton";
import CommandTerminal from "./CommandTerminal";

export default function DesignQuirksDock() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

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

  return (
    <>
      <CommandTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Floating Creative Controls Dock (Fixed Bottom-Right) */}
      <aside
        aria-label="Interactive system controls"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 pointer-events-none"
      >
        {/* Controls Dock */}
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
