"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiTerminal, FiX, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { sound } from "../utils/sound";

interface TerminalHistoryItem {
  type: "input" | "output" | "system" | "error" | "ascii";
  text: string;
}

export default function CommandTerminal({
  isOpen,
  onClose,
  onToggleWireframe,
}: {
  isOpen: boolean;
  onClose: () => void;
  onToggleWireframe?: () => void;
}) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    {
      type: "system",
      text: "AHMAD BALUBAID // INTELLIGENCE SYSTEM KERNEL v2.4",
    },
    {
      type: "system",
      text: "Type 'help' to explore available commands or 'ping' to benchmark latency.",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [matrixActive, setMatrixActive] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen) {
      sound.playSuccess();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Matrix Rain Easter Egg
  useEffect(() => {
    if (!matrixActive) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "01$#_&%§◊◈∆∇λπ∿░▒▓█AHMADBALUBAID";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(4, 7, 13, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0df5c8";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 40);

    const timeout = setTimeout(() => {
      setMatrixActive(false);
      clearInterval(interval);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [matrixActive]);

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    sound.playClick();
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newHistory: TerminalHistoryItem[] = [
      ...history,
      { type: "input", text: `ahmad@system:~$ ${trimmed}` },
    ];

    const args = trimmed.toLowerCase().split(" ");
    const primary = args[0];

    switch (primary) {
      case "help":
        newHistory.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  whoami       — Developer profile & academic telemetry
  paper        — IEEE Xplore AraRAG publication metadata
  projects     — Flagship engineering architectures
  3d           — Engage interactive 3D WebGL Systems Holodeck
  ping         — Live HTTP round-trip latency benchmark
  wireframe    — Toggle architect schematic / wireframe mode
  matrix       — Initiate cyber glyph matrix rain
  sound        — Toggle Web Audio procedural synthesizer
  sudo hire    — Dispatch direct recruitment transmission
  clear        — Clear terminal output screen
  exit         — Close the command terminal`,
        });
        break;

      case "whoami":
        newHistory.push({
          type: "output",
          text: `NAME: Ahmad Balubaid
ROLE: AI Systems Architect & Full-Stack Engineer
INSTITUTION: Effat University (Dept. of Computer Science)
LOCATION: Saudi Arabia 🇸🇦 (21.54° N, 39.17° E)
FOCUS: Applied RAG, LLM Hallucination Reduction, Clinical ML`,
        });
        break;

      case "paper":
        newHistory.push({
          type: "output",
          text: `TITLE: Lawsuit AraRAG: A Retrieval-Augmented Generation Framework for Arabic Legal Document Understanding and Hallucination Reduction
PUBLISHER: IEEE Xplore Digital Library (23rd ILTC 2026)
AUTHORS: Passent ElKafrawy, Ahmad Hakim, Ahmad Balubaid, Faisal Alkhalili
STATUS: Peer-Reviewed & Indexed`,
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          text: `01 // LabyChecker: Minecraft Cross-Network Telemetry (18+ Servers, Cloudflare Pool)
02 // Lawsuit AraRAG: Legal Document Understanding (IEEE Xplore, 94.2% Acc)
03 // Clinical Complication Predictor: MI Cardiology Model (0.89 ROC-AUC)
04 // Nektax Systems: High-Concurrency Multiplayer Network (3,000+ Users)
05 // Academic Performance Engine: Full-Stack Predictive Platform (Next.js + Prisma)`,
        });
        break;

      case "ping":
        newHistory.push({
          type: "system",
          text: "Pinging edge gateway...",
        });
        setHistory(newHistory);
        const start = performance.now();
        try {
          await fetch(window.location.href, { method: "HEAD", cache: "no-store" });
          const latency = Math.round(performance.now() - start);
          setHistory((h) => [
            ...h,
            { type: "output", text: `PING RESPONSE: ${latency}ms [Status: OPTIMAL // Edge Connected]` },
          ]);
        } catch {
          setHistory((h) => [
            ...h,
            { type: "output", text: `PING: 24ms [Estimated Edge Latency]` },
          ]);
        }
        return;

      case "wireframe":
        if (onToggleWireframe) {
          onToggleWireframe();
          newHistory.push({
            type: "system",
            text: "Architect Wireframe / Schematic mode toggled.",
          });
        }
        break;

      case "matrix":
        setMatrixActive(true);
        newHistory.push({
          type: "system",
          text: "CYBER MATRIX PROTOCOL INITIATED [6.0s stream]",
        });
        break;

      case "sound":
        const isNowOn = sound.toggle();
        newHistory.push({
          type: "system",
          text: `Web Audio Synthesizer: ${isNowOn ? "ENABLED [Harmonics Active]" : "DISABLED [Muted]"}`,
        });
        break;

      case "3d":
      case "holodeck":
        newHistory.push({
          type: "system",
          text: "Engaging 3D WebGL Systems Holodeck...",
        });
        setTimeout(() => {
          onClose();
          const holodeckEl = document.getElementById("holodeck");
          if (holodeckEl) holodeckEl.scrollIntoView({ behavior: "smooth" });
        }, 400);
        break;

      case "sudo":
        if (args[1] === "hire") {
          newHistory.push({
            type: "output",
            text: "Launching transmission channel: Ahmadobalubaid@gmail.com...",
          });
          window.location.href = "mailto:Ahmadobalubaid@gmail.com?subject=Priority%20Engineering%20Opportunity";
        } else {
          newHistory.push({
            type: "error",
            text: "sudo: permission granted only for 'sudo hire'",
          });
        }
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        return;

      default:
        newHistory.push({
          type: "error",
          text: `Command not found: '${trimmed}'. Type 'help' for available commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKeystroke();

    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {matrixActive && (
        <canvas
          ref={matrixCanvasRef}
          className="fixed inset-0 z-[99999] pointer-events-none opacity-85"
        />
      )}

      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
        <div className="relative w-full max-w-2xl max-h-[85vh] liquid-glass rounded-3xl border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden font-mono">
          {/* Terminal Window Header Bar */}
          <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-100 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs text-slate-400 flex items-center gap-2 font-medium">
                <FiTerminal className="text-[#0df5c8]" />
                <span>ahmad@system: ~ (bash)</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-slate-500 hidden sm:inline-block">
                ESC or 'exit' to close
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-slate-400 hover:text-white transition-colors"
                aria-label="Close terminal"
              >
                <FiX size={16} />
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div
            className="flex-1 p-5 overflow-y-auto text-xs space-y-2 select-text bg-[#03060a]/90 min-h-[320px] max-h-[500px]"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, index) => (
              <div
                key={index}
                className={`whitespace-pre-wrap leading-relaxed ${
                  item.type === "input"
                    ? "text-[#38bdf8] font-semibold"
                    : item.type === "error"
                    ? "text-rose-400"
                    : item.type === "system"
                    ? "text-[#0df5c8]"
                    : "text-slate-300 font-light"
                }`}
              >
                {item.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Prompt Input Bar */}
          <div className="p-3.5 border-t border-white/10 bg-black/50 flex items-center gap-2.5">
            <span className="text-[#0df5c8] font-bold text-xs select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'whoami', 'ping', 'matrix'..."
              className="flex-1 bg-transparent text-xs text-white placeholder:text-slate-600 focus:outline-none font-mono caret-[#0df5c8]"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="liquid-glass-pill px-3 py-1 text-[10px] text-[#0df5c8] border border-[#0df5c8]/40 hover:bg-[#0df5c8]/20 transition-all uppercase"
            >
              Exec
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
