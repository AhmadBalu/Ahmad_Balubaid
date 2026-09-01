"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#04060a] flex flex-col items-center justify-center p-6 select-none"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient fluid glow */}
          <div className="ambient-glow w-[350px] h-[350px] bg-[#0df5c8]/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 max-w-sm w-full liquid-glass rounded-3xl p-8 border border-white/15 text-center flex flex-col items-center shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0df5c8] shadow-[0_0_12px_#0df5c8] mb-4 animate-ping" />

            <h2 className="font-syne font-extrabold text-xl tracking-wider text-white mb-1">
              AHMAD BALUBAID
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#0df5c8] mb-6">
              AI Systems & Machine Intelligence
            </p>

            {/* Progress Bar Container */}
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mb-3 border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0df5c8] to-[#38bdf8]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <div className="w-full flex items-center justify-between font-mono text-[10px] text-slate-400">
              <span>SYSTEM INITIALIZATION</span>
              <span className="text-white font-medium">{Math.min(progress, 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

