"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

// three + @react-three/fiber only load in this chunk, on demand.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/**
 * Mounts the WebGL momentum field behind the hero:
 * - instant CSS gradient fallback (also the reduced-motion/no-JS visual)
 * - canvas mount deferred until idle or first interaction (post-LCP)
 * - render loop paused when the hero is off-screen or the tab is hidden
 */
export default function HeroCanvasLoader() {
  const reduced = useReducedMotion();
  const holder = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  // Defer heavy chunk until the browser is idle or the user interacts.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let armed = false;
    let idleId = 0;
    let timeoutId = 0;

    const arm = () => {
      if (armed) return;
      armed = true;
      setReady(true);
      window.removeEventListener("scroll", arm);
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(arm, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(arm, 1500);
    }
    window.addEventListener("scroll", arm, { passive: true });
    window.addEventListener("pointerdown", arm, { passive: true });
    window.addEventListener("keydown", arm);

    return () => {
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", arm);
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
  }, []);

  // Pause when the hero scrolls out of view.
  useEffect(() => {
    const el = holder.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pause when the tab is hidden.
  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    onVis();
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div ref={holder} className="absolute inset-0" aria-hidden="true">
      {/* Instant gradient fallback — always painted, canvas fades in above. */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 60% 45% at 65% 35%, rgba(205,242,0,0.07), transparent 70%)",
            "radial-gradient(ellipse 45% 40% at 12% 82%, rgba(222,183,255,0.06), transparent 70%)",
            "radial-gradient(ellipse 50% 40% at 40% 60%, rgba(155,208,204,0.04), transparent 70%)",
          ].join(", "),
        }}
      />
      {!reduced && ready && <HeroCanvas active={inView && tabVisible} />}
    </div>
  );
}
