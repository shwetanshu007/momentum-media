"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HiArrowRight, HiOutlinePlay } from "react-icons/hi2";
import { FaStar, FaWhatsapp } from "react-icons/fa6";
import { trackLead, trackClick } from "@/lib/analytics";

const HeroBackground = dynamic(() => import("./HeroBackground"), { ssr: false });

const rotatingWords = ["Brand", "Growth", "Reach", "Revenue"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#131314" }}
    >
      <HeroBackground />

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
          <h1
            className="display-l text-white mb-6 hero-fade-in"
            style={{ animationDelay: "0.1s", maxWidth: "900px" }}
          >
            Accelerate Your{" "}
            <span className="hero-word-swap" key={wordIndex}>
              <span style={{ color: "#cdf200" }}>{rotatingWords[wordIndex]}</span>
            </span>{" "}
            <br className="hidden sm:block" />
            With <span className="lime-glow" style={{ color: "#cdf200" }}>Momentumm</span>
          </h1>

          {/* Subcopy */}
          <p
            className="body-l mb-10 leading-relaxed hero-fade-in"
            style={{ color: "#c5c9ac", maxWidth: "640px", animationDelay: "0.2s" }}
          >
            High-octane digital strategy engineered for scale. We combine data-backed execution,
            strategic rigor, and creative excellence to turn your brand into a growth engine.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-3 sm:gap-4 mb-12 justify-center hero-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
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
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 hero-fade-in"
            style={{ animationDelay: "0.4s" }}
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
        @keyframes hero-fade-in {
          from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .hero-fade-in {
          animation: hero-fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes hero-word-swap {
          from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .hero-word-swap {
          display: inline-block;
          animation: hero-word-swap 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

      `}</style>
    </section>
  );
}
