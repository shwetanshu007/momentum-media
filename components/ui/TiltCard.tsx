"use client";

import { HTMLAttributes, MouseEvent, ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";
import useMediaQuery from "@/hooks/useMediaQuery";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  /** Max tilt, degrees. */
  max?: number;
}

/**
 * Perspective tilt following the mouse (max ~8deg) with a moving specular
 * glare highlight; springs back on leave. Disabled on touch devices and
 * under prefers-reduced-motion (renders a plain wrapper).
 */
export default function TiltCard({ children, className, max = 8, ...rest }: TiltCardProps) {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reduced;

  // Pointer position within the card, 0..1.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const glareOpacity = useMotionValue(0);

  const spring = { stiffness: 260, damping: 22, mass: 0.8 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glareSpringOpacity = useSpring(glareOpacity, { stiffness: 200, damping: 30 });
  const glare = useMotionTemplate`radial-gradient(320px circle at ${glareX} ${glareY}, rgba(255,255,255,0.10), rgba(255,255,255,0.04) 40%, transparent 70%)`;

  if (!enabled) {
    return <div className={className} {...rest}>{children}</div>;
  }

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    glareOpacity.set(1);
  };
  const onMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <div className={className} style={{ perspective: "900px" }} {...rest}>
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl z-20"
          style={{ background: glare, opacity: glareSpringOpacity }}
        />
      </motion.div>
    </div>
  );
}
