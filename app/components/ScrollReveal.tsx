"use client";

import { useEffect } from "react";

/**
 * Reveals every `[data-reveal]` element in the document once it scrolls into
 * view. Kept as a single shared observer so section headers animate with one
 * consistent timing curve instead of each component rolling its own GSAP tween.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (nodes.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-revealed"));
      return;
    }

    let pending = nodes;
    let frame = 0;
    let disposed = false;

    const teardown = () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleSweep);
      window.removeEventListener("resize", scheduleSweep);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const reveal = (node: HTMLElement) => {
      node.classList.add("is-revealed");
      observer.unobserve(node);
      pending = pending.filter((item) => item !== node);
      if (pending.length === 0) teardown();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    /**
     * Safety net. An instant jump — anchor navigation, a restored scroll
     * position, Lenis catching up after a fast flick — can carry an element
     * from below the fold to above it between two rendering opportunities.
     * IntersectionObserver only reports state *changes*, so it never fires and
     * the element would sit at opacity 0 forever. Anything fully scrolled past
     * gets revealed outright.
     */
    const sweep = () => {
      frame = 0;
      if (disposed) return;
      for (const node of [...pending]) {
        if (node.getBoundingClientRect().bottom < 0) reveal(node);
      }
    };

    const scheduleSweep = () => {
      if (frame || disposed) return;
      frame = requestAnimationFrame(sweep);
    };

    nodes.forEach((node) => observer.observe(node));
    window.addEventListener("scroll", scheduleSweep, { passive: true });
    window.addEventListener("resize", scheduleSweep);
    scheduleSweep();

    return () => {
      disposed = true;
      teardown();
    };
  }, []);

  return null;
}
