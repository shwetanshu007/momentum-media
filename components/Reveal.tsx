"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitTextReveal, type SplitRevealResult } from "@/lib/animations";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Section entrance wrapper. When the wrapped block scrolls into view:
 * - the element marked [data-reveal-heading] (fallback: first h2) gets a
 *   split-text char reveal
 * - every [data-reveal-card] fades up with a 0.08s stagger
 * No-op under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const splits: SplitRevealResult[] = [];
    const ctx = gsap.context(() => {
      const heading =
        el.querySelector<HTMLElement>("[data-reveal-heading]") ??
        el.querySelector<HTMLElement>("h2");
      if (heading) {
        splits.push(
          splitTextReveal(heading, {
            stagger: 0.018,
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              once: true,
            },
          })
        );
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-reveal-card]", el);
      if (cards.length) {
        // fromTo + clearProps: both ends locked and inline styles removed on
        // finish, so a mid-flight ScrollTrigger.refresh() (e.g. from the
        // pinned Process section) can never freeze cards at the start offset.
        gsap.fromTo(
          cards,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            immediateRender: true,
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, el);

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
