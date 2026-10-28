"use client";

import { useEffect, useLayoutEffect, useState } from "react";

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * `useLayoutEffect` warns when it runs during SSR, so fall back to `useEffect`
 * on the server — where neither actually does anything.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Read the media query once, imperatively — for use inside effects.
 *
 * Prefer this over the reactive hook for guarding a *one-shot entrance
 * animation*. The reactive value is still false during the effect's first run,
 * so a guard written against it starts an animation that the next run
 * immediately tears down via `ctx.revert()` — which both flashes the motion the
 * visitor asked not to see and restores whatever value GSAP recorded before the
 * tween, clobbering anything React has rendered since.
 *
 * Keep the reactive form for anything that changes *layout*, where the
 * re-render is the whole point.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

/**
 * Reactive form, for components that need to *stop* an animation that is
 * already running — or to render an entirely different layout at all. Starts
 * false during SSR and on the client's first render so the markup hydrates,
 * then settles on the real preference.
 *
 * The sync runs in a layout effect so that re-render commits before the browser
 * paints. With a plain effect the visitor would get one painted frame of the
 * motion layout before it snapped to the resting one — which is exactly the
 * experience the preference asks us to avoid.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
