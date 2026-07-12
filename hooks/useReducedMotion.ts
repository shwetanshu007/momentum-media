"use client";

import useMediaQuery from "./useMediaQuery";

const QUERY = "(prefers-reduced-motion: reduce)";

/** Imperative check for non-hook contexts (animation helpers, event handlers). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * Shared reduced-motion hook. Returns false on the server, then tracks the
 * media query live on the client.
 */
export default function useReducedMotion(): boolean {
  return useMediaQuery(QUERY);
}
