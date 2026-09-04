"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  autostart?: boolean;
  speed?: number;
}

const GLYPHS = "01$#_&%§◊◈∆∇λπ∿░▒▓█";

export default function TextScramble({
  text,
  className = "",
  triggerOnHover = true,
  autostart = false,
  speed = 30,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    let iteration = 0;
    const maxIterations = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isAnimating.current = false;
        setDisplayText(text);
      }

      iteration += 1 / 2;
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    if (autostart) {
      scramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autostart, scramble]);

  return (
    <span
      className={`inline-block cursor-default font-mono ${className}`}
      onMouseEnter={() => {
        if (triggerOnHover) scramble();
      }}
    >
      {displayText}
    </span>
  );
}
