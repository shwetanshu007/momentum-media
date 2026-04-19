"use client";

import Link from "next/link";
import { HiArrowRight as ArrowRight } from "react-icons/hi2";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "Deep-dive into your business landscape — goals, gaps, and growth levers.",
    items: ["Business analysis & goal setting", "Target audience definition", "Competitor landscape review"],
    col: "#cdf200",
  },
  {
    num: "02",
    title: "Proposal & Scope",
    desc: "A precise, transparent roadmap with defined deliverables and timelines.",
    items: ["Custom strategy development", "Defined deliverables & timelines", "Investment breakdown"],
    col: "#9bd0cc",
  },
  {
    num: "03",
    title: "Onboarding Kit",
    desc: "Full alignment — tools, access, and team introductions for a seamless start.",
    items: ["Project management setup", "Platform access & assets", "Team introductions"],
    col: "#deb7ff",
  },
  {
    num: "04",
    title: "Kickoff Meeting",
    desc: "Stakeholder alignment before we launch — strategy, timeline, accountability.",
    items: ["Strategy presentation", "Timeline confirmation", "Roles & responsibilities"],
    col: "#cdf200",
  },
  {
    num: "05",
    title: "Optimization Cycle",
    desc: "Continuous monitoring, testing, and refinement for compounding returns.",
    items: ["Performance tracking", "Campaign adjustments", "Comprehensive reporting"],
    col: "#9bd0cc",
  },
];

export default function Process() {
  return (
    <section id="process" className="section-pad" style={{ background: "#0e0e0f" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="kinetic-chip mb-5 inline-block">How We Work</span>
            <h2 className="headline-l text-white">
              Five stages to{" "}
              <span style={{ color: "#cdf200" }} className="lime-glow">
                unstoppable momentum
              </span>
            </h2>
          </div>
          <Link
            href="/process"
            className="inline-flex items-center gap-2 label-m group"
            style={{ color: "#c5c9ac" }}
          >
            Full Process Details
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group rounded-2xl p-6 hover-scale relative overflow-hidden"
              style={{ background: "#1c1c1e" }}
            >
              {/* Number watermark */}
              <div
                className="absolute -top-2 -right-2 text-7xl font-black select-none pointer-events-none leading-none"
                style={{ color: "rgba(255,255,255,0.03)", lineHeight: 1 }}
              >
                {step.num}
              </div>

              {/* Accent line top */}
              <div
                className="h-0.5 rounded-full mb-5 transition-all duration-500 group-hover:w-full"
                style={{ background: step.col, width: "2rem" }}
              />

              <div className="font-black text-sm mb-3 font-mono" style={{ color: step.col, opacity: 0.6 }}>
                {step.num}
              </div>

              <h3 className="title-m text-white mb-2">{step.title}</h3>
              <p className="body-s mb-4" style={{ color: "#c5c9ac" }}>{step.desc}</p>

              <ul className="space-y-1.5">
                {step.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 body-s" style={{ color: "#e5e2e3" }}>
                    <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: step.col }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
