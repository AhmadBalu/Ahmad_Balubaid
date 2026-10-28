"use client";

import { useEffect, useRef, useState } from "react";

const LINE_ONE = "AHMAD";
const LINE_TWO = "BALUBAID";

const COBALT: readonly [number, number, number] = [61, 107, 255];
const LIME: readonly [number, number, number] = [198, 255, 0];

const BUCKET_COUNT = 24;
// Cobalt is perceptually far darker than lime at the same nominal intensity,
// so the two ends carry separate gains and the gradient reads evenly.
const COBALT_GAIN = 0.78;
const LIME_GAIN = 0.46;

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  size: number;
  seed: number;
  bucket: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

function readDisplayFont(): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-syne")
    .trim();
  const fallback = "system-ui, -apple-system, Segoe UI, sans-serif";
  return raw ? `${raw}, ${fallback}` : fallback;
}

/**
 * Rasterises the name and returns the filled pixels as target points (CSS px).
 */
function sampleNameTargets(
  cssWidth: number,
  cssHeight: number,
  dpr: number,
  fontStack: string
): Array<{ x: number; y: number }> {
  const off = document.createElement("canvas");
  off.width = Math.max(1, Math.round(cssWidth * dpr));
  off.height = Math.max(1, Math.round(cssHeight * dpr));

  const octx = off.getContext("2d", { willReadFrequently: true });
  if (!octx) return [];

  const w = off.width;
  const h = off.height;

  // Fit the longer word to ~88% of the stage, then clamp to the stage height.
  octx.font = `800 100px ${fontStack}`;
  const probeWidth = octx.measureText(LINE_TWO).width || 1;
  let fontSize = ((w * 0.88) / probeWidth) * 100;
  fontSize = Math.min(fontSize, (h * 0.8) / 2 / 0.94);

  octx.font = `800 ${fontSize}px ${fontStack}`;
  octx.textAlign = "center";
  octx.textBaseline = "middle";
  octx.fillStyle = "#ffffff";

  const lineHeight = fontSize * 0.94;
  octx.fillText(LINE_ONE, w / 2, h / 2 - lineHeight / 2);
  octx.fillText(LINE_TWO, w / 2, h / 2 + lineHeight / 2);

  const { data } = octx.getImageData(0, 0, w, h);
  const gap = Math.max(2, Math.round(3.1 * dpr));
  const points: Array<{ x: number; y: number }> = [];

  for (let y = 0; y < h; y += gap) {
    for (let x = 0; x < w; x += gap) {
      if (data[(y * w + x) * 4 + 3] > 130) {
        points.push({ x: x / dpr, y: y / dpr });
      }
    }
  }

  return points;
}

export default function ParticleHeadline() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /**
   * Below `md` the particle wordmark is unreadable rather than merely small:
   * the name is fitted to the *width* of the stage, which on a phone lands
   * around 55px, so a 3px dot grid leaves each letter stroke about two dots
   * tall and the whole thing reads as mush. No amount of resizing fixes that
   * in ~358px, so narrow viewports get the typographic wordmark instead and
   * skip the canvas entirely.
   */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setCompact(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const staticWordmark = reduceMotion || compact;

  useEffect(() => {
    if (staticWordmark) return;

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let cssWidth = 0;
    let cssHeight = 0;
    let particles: Particle[] = [];
    let buckets: Particle[][] = [];
    let bucketColors: string[] = [];
    let frameId = 0;
    let startedAt = 0;
    let visible = true;
    let disposed = false;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const pointer = { x: -9999, y: -9999, active: false };

    const rebuild = () => {
      const rect = wrap.getBoundingClientRect();
      cssWidth = Math.max(1, Math.round(rect.width));
      cssHeight = Math.max(1, Math.round(rect.height));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targets = sampleNameTargets(
        cssWidth,
        cssHeight,
        dpr,
        readDisplayFont()
      );

      const maxParticles = cssWidth < 640 ? 4200 : 11000;
      let chosen = targets;
      if (targets.length > maxParticles) {
        const step = targets.length / maxParticles;
        chosen = [];
        for (let i = 0; i < maxParticles; i += 1) {
          chosen.push(targets[Math.floor(i * step)]);
        }
      }

      // Cobalt on the left flowing to acid lime on the right.
      bucketColors = [];
      for (let i = 0; i < BUCKET_COUNT; i += 1) {
        const t = i / (BUCKET_COUNT - 1);
        const gain = lerp(COBALT_GAIN, LIME_GAIN, t);
        const r = Math.round(lerp(COBALT[0], LIME[0], t) * gain);
        const g = Math.round(lerp(COBALT[1], LIME[1], t) * gain);
        const b = Math.round(lerp(COBALT[2], LIME[2], t) * gain);
        bucketColors.push(`rgb(${r},${g},${b})`);
      }

      // Preserve existing particles across resizes so they glide, not jump.
      const previous = particles;
      particles = chosen.map((point, index) => {
        const bucket = Math.round(
          smoothstep(0.16, 0.96, point.x / cssWidth) * (BUCKET_COUNT - 1)
        );
        const existing = previous[index];
        if (existing) {
          existing.tx = point.x;
          existing.ty = point.y;
          existing.bucket = bucket;
          return existing;
        }
        return {
          x: cssWidth / 2 + (Math.random() - 0.5) * cssWidth * 1.5,
          y: cssHeight / 2 + (Math.random() - 0.5) * cssHeight * 2.4,
          tx: point.x,
          ty: point.y,
          vx: 0,
          vy: 0,
          size: 1.15 + Math.random() * 0.75,
          seed: Math.random() * Math.PI * 2,
          bucket,
        };
      });

      buckets = Array.from({ length: BUCKET_COUNT }, () => []);
      for (const particle of particles) {
        buckets[particle.bucket].push(particle);
      }

      startedAt = performance.now();
    };

    const frame = (now: number) => {
      if (disposed || !visible) return;

      const elapsed = now - startedAt;
      const spring = 0.045;
      const friction = 0.87;
      const repelRadius = cssWidth < 640 ? 90 : 125;

      for (const particle of particles) {
        // Gentle idle drift keeps the assembled name breathing.
        const driftX = Math.sin(elapsed * 0.0011 + particle.seed) * 0.7;
        const driftY = Math.cos(elapsed * 0.0009 + particle.seed * 1.37) * 0.7;

        particle.vx += (particle.tx + driftX - particle.x) * spring;
        particle.vy += (particle.ty + driftY - particle.y) * spring;

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0.01 && distance < repelRadius) {
            const falloff = 1 - distance / repelRadius;
            const force = falloff * falloff * 8;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        particle.vx *= friction;
        particle.vy *= friction;
        particle.x += particle.vx;
        particle.y += particle.vy;
      }

      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.globalCompositeOperation = "lighter";

      // Soft halo pass. Drawn every other frame to keep the particle count
      // high without doubling the fill cost.
      const glowPass = Math.floor(elapsed / 16.7) % 2 === 0;
      if (glowPass) {
        ctx.globalAlpha = 0.1;
        for (let i = 0; i < BUCKET_COUNT; i += 1) {
          const bucket = buckets[i];
          if (bucket.length === 0) continue;
          ctx.fillStyle = bucketColors[i];
          for (const particle of bucket) {
            const r = particle.size * 2.2;
            ctx.fillRect(particle.x - r / 2, particle.y - r / 2, r, r);
          }
        }
        ctx.globalAlpha = 1;
      }

      for (let i = 0; i < BUCKET_COUNT; i += 1) {
        const bucket = buckets[i];
        if (bucket.length === 0) continue;
        ctx.fillStyle = bucketColors[i];
        for (const particle of bucket) {
          ctx.fillRect(
            particle.x - particle.size / 2,
            particle.y - particle.size / 2,
            particle.size,
            particle.size
          );
        }
      }

      frameId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (disposed || frameId) return;
      frameId = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    // Listen on window so the headline reacts without swallowing the
    // pointer events the 3D desk behind it relies on for orbit dragging.
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const margin = 240;

      if (
        x < -margin ||
        y < -margin ||
        x > rect.width + margin ||
        y > rect.height + margin
      ) {
        pointer.active = false;
        return;
      }

      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };

    rebuild();
    start();

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        rebuild();
        if (!frameId && visible && !document.hidden) start();
      }, 140);
    });
    resizeObserver.observe(wrap);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(wrap);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      stop();
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [staticWordmark]);

  if (staticWordmark) {
    return (
      <div className="relative flex w-full select-none flex-col items-center justify-center py-4 leading-[0.9] md:py-6 md:leading-[0.94]">
        {/* Both words are sized from their measured advance width, so neither
            can outgrow the column. Syne's caps run wide: "AHMAD" measures about
            6.4x its font size and "BALUBAID" about 8.4x, so anything above
            ~11vw clips the last letter against the section's overflow-x-hidden. */}
        <span className="font-syne text-[clamp(2.4rem,13vw,6.5rem)] font-extrabold uppercase tracking-[-0.02em] text-white">
          Ahmad
        </span>
        <span className="font-syne text-[clamp(1.9rem,10vw,5.4rem)] font-extrabold uppercase tracking-[-0.02em] text-[#8fa8ff]">
          Balubaid
        </span>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative h-[clamp(190px,29vw,430px)] w-full">
      {/* Dark well so the additive particles stay legible over the 3D scene. */}
      <div className="headline-well pointer-events-none absolute -inset-x-[14%] -inset-y-[26%]" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
