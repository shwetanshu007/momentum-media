"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Subtle scroll-speed offset: the child drifts by ±speed×80px across its
 * journey through the viewport. Desktop only; no-op under
 * prefers-reduced-motion (handled by the matchMedia condition).
 */
export default function Parallax({
  children,
  speed = 0.1,
  className,
}: {
  children: ReactNode;
  /** Positive drifts up slower, negative faster; ~0.05–0.15 is subtle. */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          el,
          { y: () => speed * 80 },
          {
            y: () => -speed * 80,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    );

    return () => mm.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
