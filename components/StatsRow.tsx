"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 500, suffix: "+", label: "Satisfied Clients", col: "#cdf200" },
  { value: 250, suffix: "%", label: "Average ROI Increase", col: "#9bd0cc" },
  { value: 1, suffix: " Cr+", label: "Ad Spend Managed", prefix: "₹", col: "#deb7ff" },
  { value: 98, suffix: "%", label: "Client Satisfaction", col: "#cdf200" },
  { value: 15, suffix: "M+", label: "Leads Generated", col: "#9bd0cc" },
];

export default function StatsRow() {
  const rowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Final values are already in the static HTML (SEO / no-JS); the count-up
    // only replaces them when motion is allowed.
    if (prefersReducedMotion()) return;
    const row = rowRef.current;
    if (!row) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(".stat-value", row);
      els.forEach((el, i) => {
        const { value, prefix = "", suffix = "" } = stats[i];
        const counter = { v: 0 };
        gsap.fromTo(
          counter,
          { v: 0 },
          {
            v: value,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
            onUpdate() {
              el.textContent = `${prefix}${Math.round(counter.v)}${suffix}`;
            },
            onComplete() {
              el.textContent = `${prefix}${value}${suffix}`;
            },
          }
        );
      });
    }, row);

    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: "#0e0e0f" }} className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="label-m text-center mb-12" style={{ color: "#c5c9ac" }}>
          Results that speak for themselves
        </p>
        <div ref={rowRef} className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10 sm:gap-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`text-center group ${i === stats.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
            >
              <span
                className="stat-value font-black"
                style={{ color: s.col, fontSize: "2.75rem", lineHeight: 1, letterSpacing: "-0.02em" }}
              >
                {s.prefix ?? ""}{s.value}{s.suffix}
              </span>
              <p className="body-s mt-2" style={{ color: "#c5c9ac" }}>{s.label}</p>
              <div
                className="mx-auto mt-3 h-0.5 rounded-full transition-all duration-700 group-hover:w-3/4"
                style={{ background: s.col, width: "40%", opacity: 0.4 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
