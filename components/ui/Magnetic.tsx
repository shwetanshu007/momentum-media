"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";
import useMediaQuery from "@/hooks/useMediaQuery";

interface MagneticProps {
  children: ReactNode;
  /** Fraction of the pointer offset the element follows. */
  strength?: number;
  /** Extra attraction zone around the element, px. */
  radius?: number;
  className?: string;
}

/**
 * Magnetic wrapper: the child drifts toward the pointer while it is within
 * `radius` px of the element's bounds, and springs back on exit.
 * Inert on touch devices and under prefers-reduced-motion.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  radius = 60,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let lastEvent: PointerEvent | null = null;

    const update = () => {
      raf = 0;
      const e = lastEvent;
      if (!e) return;
      const r = el.getBoundingClientRect();
      const inZone =
        e.clientX > r.left - radius &&
        e.clientX < r.right + radius &&
        e.clientY > r.top - radius &&
        e.clientY < r.bottom + radius;
      if (inZone) {
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        x.set((e.clientX - cx) * strength);
        y.set((e.clientY - cy) * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      lastEvent = e;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const reset = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", reset);
      reset();
    };
  }, [enabled, radius, strength, x, y]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
