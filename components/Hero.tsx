"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HiArrowRight, HiOutlinePlay } from "react-icons/hi2";
import { FaStar, FaWhatsapp } from "react-icons/fa6";
import { trackLead, trackClick } from "@/lib/analytics";
import { splitTextReveal, type SplitRevealResult } from "@/lib/animations";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import useReducedMotion from "@/hooks/useReducedMotion";
import Magnetic from "./ui/Magnetic";
import HeroCanvasLoader from "./three/HeroCanvasLoader";

const rotatingWords = ["Brand", "Growth", "Reach", "Revenue"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const reduced = useReducedMotion();

  const scope = useRef<HTMLElement>(null);
  const seg1 = useRef<HTMLSpanElement>(null);
  const seg2 = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduced]);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const splits: SplitRevealResult[] = [];
    const ctx = gsap.context(() => {
      if (seg1.current) {
        splits.push(splitTextReveal(seg1.current, { delay: 0.1 }));
      }
      if (seg2.current) {
        splits.push(splitTextReveal(seg2.current, { delay: 0.3 }));
      }
      const rest = [subRef.current, ctaRef.current, proofRef.current].filter(
        Boolean
      );
      gsap.fromTo(
        rest,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.6,
          clearProps: "transform,opacity",
        }
      );
    }, scope);

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={scope}
      className="relative min-h-svh flex items-center overflow-hidden"
      style={{ background: "#131314" }}
    >
      <HeroCanvasLoader />

      {/* Subtle center scan line */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(205,242,0,0.010) 0%, transparent 40%, transparent 60%, rgba(155,208,204,0.008) 100%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Headline */}
          <h1 className="display-l text-white mb-6" style={{ maxWidth: "900px" }}>
            <span ref={seg1} className="inline-block">Accelerate Your</span>{" "}
            <span className="hero-word-swap" key={wordIndex}>
              <span style={{ color: "#cdf200" }}>{rotatingWords[wordIndex]}</span>
            </span>{" "}
            <br className="hidden sm:block" />
            <span ref={seg2} className="inline-block">
              With <span className="lime-glow" style={{ color: "#cdf200" }}>Momentumm</span>
            </span>
          </h1>

          {/* Subcopy */}
          <p
            ref={subRef}
            className="body-l mb-10 leading-relaxed"
            style={{ color: "#c5c9ac", maxWidth: "640px" }}
          >
            High-octane digital strategy engineered for scale. We combine data-backed execution,
            strategic rigor, and creative excellence to turn your brand into a growth engine.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-3 sm:gap-4 mb-12 justify-center">
            <Magnetic>
              <a
                href={`https://wa.me/919408266131?text=${encodeURIComponent(
                  "Hi Momentumm Media! I'd like to book a free discovery call to discuss my brand's growth."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackLead({
                    label: "Book Free Discovery Call",
                    location: "hero",
                    destination: "whatsapp",
                  })
                }
                className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-105 lime-glow-box-strong"
                style={{
                  background: "#cdf200",
                  color: "#1a2000",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                <FaWhatsapp size={16} />
                Book Free Discovery Call
                <HiArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </Magnetic>

            <a
              href="#case-studies"
              onClick={() =>
                trackClick({
                  label: "View Case Studies",
                  location: "hero",
                  destination: "#case-studies",
                })
              }
              className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full font-semibold transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#e5e2e3",
                fontSize: "0.9rem",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              }}
            >
              <HiOutlinePlay size={15} />
              View Case Studies
            </a>
          </div>

          {/* Social proof micro */}
          <div
            ref={proofRef}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={13}
                  style={{ color: "#cdf200" }}
                />
              ))}
              <span className="ml-1 text-xs font-semibold text-white">4.9</span>
              <span className="text-xs" style={{ color: "#c5c9ac", opacity: 0.7 }}>
                average rating
              </span>
            </div>
            <span style={{ color: "#c5c9ac", opacity: 0.3 }}>·</span>
            <span className="label-s" style={{ color: "#c5c9ac" }}>
              500+ brands worldwide
            </span>
            <span style={{ color: "#c5c9ac", opacity: 0.3 }}>·</span>
            <span className="label-s" style={{ color: "#c5c9ac" }}>
              ₹1Cr+ Ad Spend Managed
            </span>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #131314)" }}
      />

      <style>{`
        @keyframes hero-word-swap {
          from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .hero-word-swap {
          display: inline-block;
          animation: hero-word-swap 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-word-swap { animation: none; }
        }
      `}</style>
    </section>
  );
}
