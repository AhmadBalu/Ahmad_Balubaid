"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let posX = 0;
    let posY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const updateCursor = () => {
      posX += (mouseX - posX) / 8;
      posY += (mouseY - posY) / 8;
      cursor.style.left = `${posX}px`;
      cursor.style.top = `${posY}px`;
      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => cursor.classList.add("hover");
    const handleMouseLeave = () => cursor.classList.remove("hover");

    document.addEventListener("mousemove", handleMouseMove);
    const hoverElements = document.querySelectorAll("a, button, .project-card");
    hoverElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    updateCursor();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      hoverElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
