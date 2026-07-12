"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import useReducedMotion from "@/hooks/useReducedMotion";
import useMediaQuery from "@/hooks/useMediaQuery";

/**
 * Minimal custom cursor: a single lime dot with a soft follow; grows gently
 * over interactive elements. Fine-pointer devices with motion allowed only;
 * native cursor hidden (via .has-custom-cursor) only while this is active.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reduced;
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const dot = dotRef.current;
    if (!root || !dot) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      root.classList.add("is-on");
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const interactive = target?.closest?.(
        "a, button, [role='button'], input, textarea, select"
      );
      root.classList.toggle("cursor-hover", !!interactive);
    };

    const onLeaveWindow = () => root.classList.remove("is-on");
    const onEnterWindow = () => root.classList.add("is-on");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    document.documentElement.addEventListener("pointerenter", onEnterWindow);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      document.documentElement.removeEventListener("pointerenter", onEnterWindow);
      gsap.killTweensOf(dot);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
