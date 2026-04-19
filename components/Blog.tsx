"use client";

import Link from "next/link";
import { HiArrowUpRight, HiOutlineClock } from "react-icons/hi2";

const posts = [
  {
    slug: "measuring-marketing-roi",
    category: "Strategy",
    catCol: "#cdf200",
    title: "Measuring Marketing ROI: A Practical Framework for Business Leaders",
    excerpt: "Without a clear approach to tracking return on investment, even the best campaigns risk falling short. This evergreen framework empowers decision-makers to evaluate ROI with confidence.",
    readTime: "6 min",
    date: "Apr 12, 2026",
    topics: ["Define Clear Objectives", "Establish KPIs", "Track Attribution", "Consistent Reporting"],
  },
  {
    slug: "cohesive-brand-strategy",
    category: "Branding",
    catCol: "#9bd0cc",
    title: "Building a Cohesive Brand Strategy That Delivers Results",
    excerpt: "A strong brand is a strategic asset — not just a logo. Without a cohesive strategy, even the most compelling creative fails to convert. Here's the framework that works.",
    readTime: "5 min",
    date: "Mar 28, 2026",
    topics: ["Brand Purpose", "Audience Insight", "Positioning Statement", "Identity System"],
  },
];

export default function Blog() {
  return (
    <section id="blog" className="section-pad" style={{ background: "#131314" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="kinetic-chip mb-5 inline-block">Insights</span>
            <h2 className="headline-l text-white">
              Marketing{" "}
              <span style={{ color: "#cdf200" }} className="lime-glow">intelligence</span>
            </h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1.5 label-m group" style={{ color: "#c5c9ac" }}>
            All Articles <HiArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <article
              key={p.slug}
              className="group rounded-2xl overflow-hidden hover-scale"
              style={{ background: "#1c1c1e" }}
            >
              {/* Header band */}
              <div
                className="px-7 pt-7 pb-5 relative overflow-hidden"
                style={{ background: "#252527" }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 30% 50%, ${p.catCol}08, transparent 70%)` }}
                />
                <span className="kinetic-chip active inline-block mb-4" style={{ color: p.catCol }}>
                  {p.category}
                </span>
                <h3 className="title-l text-white leading-snug">{p.title}</h3>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5 body-s" style={{ color: "#c5c9ac" }}>
                    <HiOutlineClock size={11} />
                    {p.readTime} read
                  </div>
                  <span style={{ color: "#c5c9ac", opacity: 0.3 }}>·</span>
                  <span className="body-s" style={{ color: "#c5c9ac" }}>{p.date}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-7">
                <p className="body-m mb-6 leading-relaxed" style={{ color: "#c5c9ac" }}>{p.excerpt}</p>

                <div className="mb-6">
                  <p className="label-s mb-3" style={{ color: "#c5c9ac", opacity: 0.5 }}>What's inside</p>
                  <div className="flex flex-wrap gap-2">
                    {p.topics.map((topic) => (
                      <span key={topic} className="kinetic-chip">{topic}</span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/blog/${p.slug}`}
                  className="inline-flex items-center gap-1.5 label-m group/link"
                  style={{ color: p.catCol }}
                >
                  Read Article
                  <HiArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
