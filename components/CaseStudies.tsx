"use client";

import Link from "next/link";
import { HiArrowUpRight as ArrowUpRight } from "react-icons/hi2";
import SpotlightCard from "./ui/SpotlightCard";

const cases = [
  {
    client: "Aaryan International",
    industry: "Professional Services",
    challenge: "Stagnant lead generation despite significant spend — unclear targeting, inconsistent messaging.",
    metrics: [
      { val: "150%", label: "Qualified Lead Increase", col: "#cdf200" },
      { val: "-35%", label: "Cost Per Lead", col: "#9bd0cc" },
    ],
    tag: "Lead Generation",
    col: "#cdf200",
    quote: "Transformed our marketing into a reliable growth engine.",
    by: "Aaryan International Team",
  },
  {
    client: "AIM",
    industry: "Retail",
    challenge: "Low conversions, limited visibility. Campaigns lacked cohesion and the site was underperforming.",
    metrics: [
      { val: "200%", label: "Conversion Rate Lift", col: "#deb7ff" },
      { val: "+45%", label: "Avg Order Value", col: "#9bd0cc" },
    ],
    tag: "Conversion Optimization",
    col: "#deb7ff",
    quote: "The clarity and expertise we needed to achieve real, sustainable growth.",
    by: "Aryan, CFO — AIM",
  },
  {
    client: "Core Brain",
    industry: "Design",
    challenge: "Fragmented approach, unclear attribution, and difficulty proving ROI to stakeholders.",
    metrics: [
      { val: "250%", label: "ROI Over 12 Months", col: "#9bd0cc" },
      { val: "₹1Cr+", label: "Ad Spend Managed", col: "#cdf200" },
    ],
    tag: "ROI & Attribution",
    col: "#9bd0cc",
    quote: "We knew exactly where our budget was going and what it delivered.",
    by: "Harshal Chaudhary, Founder",
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="section-pad" style={{ background: "#0e0e0f" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="kinetic-chip mb-5 inline-block">Proof of Work</span>
            <h2 className="headline-l text-white">
              Case{" "}
              <span style={{ color: "#cdf200" }} className="lime-glow">Studies</span>
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 label-m group"
            style={{ color: "#c5c9ac" }}
          >
            All Case Studies <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c) => (
            <SpotlightCard
              key={c.client}
              className="group overflow-hidden hover-scale h-full"
              style={{ background: "#1c1c1e" }}
              spotlightColor={`${c.col}1a`}
              borderColorHover={`${c.col}55`}
            >
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${c.col}, transparent)` }} />

              <div className="p-7">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span className="kinetic-chip text-xs mb-2 inline-block">{c.tag}</span>
                    <h3 className="title-l text-white">{c.client}</h3>
                    <p className="body-s mt-0.5" style={{ color: "#c5c9ac" }}>{c.industry}</p>
                  </div>
                </div>

                <p className="body-s mb-6 leading-relaxed" style={{ color: "#c5c9ac" }}>
                  <span className="label-s mr-1.5" style={{ color: "#c5c9ac", opacity: 0.5 }}>Challenge:</span>
                  {c.challenge}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {c.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl p-3 transition-colors group-hover:bg-[#2e2e31]"
                      style={{ background: "#252527" }}
                    >
                      <div className="font-black text-xl leading-none" style={{ color: m.col }}>{m.val}</div>
                      <div className="body-s mt-1 leading-tight" style={{ color: "#c5c9ac" }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                <p className="body-s italic mb-1 leading-relaxed" style={{ color: "#e5e2e3" }}>&ldquo;{c.quote}&rdquo;</p>
                <p className="body-s" style={{ color: "#c5c9ac", opacity: 0.6 }}>— {c.by}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
