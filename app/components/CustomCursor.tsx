"use client";
import { useEffect, useRef, useState } from "react";
import { sound } from "../utils/sound";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setIsVisible(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const render = () => {
      // Smooth liquid trailing
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    const handleMouseEnter = () => {
      ringRef.current?.classList.add("active");
      sound.playHover();
    };

    const handleMouseLeave = () => {
      ringRef.current?.classList.remove("active");
    };

    const handleWindowClick = () => {
      sound.playClick();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleWindowClick);
    render();

    const addInteractiveListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, input, textarea, [data-cursor-hover], .liquid-glass-card, .cursor-pointer"
      );
      targets.forEach((target) => {
        target.addEventListener("mouseenter", handleMouseEnter);
        target.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    addInteractiveListeners();

    // Observe DOM mutations to bind new elements
    const observer = new MutationObserver(addInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleWindowClick);
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}

