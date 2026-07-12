"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HiArrowLeft, HiOutlineClock, HiOutlineCalendar, HiOutlineUser, HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import { ReactNode, useEffect } from "react";
import { trackLead, trackClick, trackViewContent } from "@/lib/analytics";

export interface BlogSection {
  number: string;
  title: string;
  intro?: string;
  bullets?: string[];
  outro?: string;
  callout?: ReactNode;
}

interface BlogPostLayoutProps {
  category: string;
  categoryColor: string;
  title: string;
  intro: string;
  readTime: string;
  date: string;
  author?: string;
  heroTag?: string;
  sections: BlogSection[];
  conclusion: { title?: string; paragraphs: string[] };
  ctaTitle: string;
  ctaBody: string;
  ctaWhatsappMessage: string;
  faq?: { question: string; answer: string }[];
  related?: { slug: string; category: string; catCol: string; title: string }[];
}

export default function BlogPostLayout(props: Readonly<BlogPostLayoutProps>) {
  const {
    category, categoryColor, title, intro, readTime, date,
    author = "Momentumm Media",
    heroTag,
    sections, conclusion, ctaTitle, ctaBody, ctaWhatsappMessage,
    faq, related,
  } = props;

  const whatsappUrl = `https://wa.me/919408266131?text=${encodeURIComponent(ctaWhatsappMessage)}`;

  useEffect(() => {
    trackViewContent({ label: title, location: `blog-${category.toLowerCase()}` });
  }, [title, category]);

  return (
    <main style={{ background: "#0e0e0f" }}>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0e0e0f 0%, #131314 50%, #0e0e0f 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 20% 30%, ${categoryColor}10, transparent 55%)`,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 mb-8 label-m transition-colors"
            style={{ color: "#c5c9ac" }}
          >
            <HiArrowLeft size={13} />
            Back to Insights
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="kinetic-chip active" style={{ color: categoryColor }}>
              {category}
            </span>
            {heroTag && (
              <span className="label-s" style={{ color: "#c5c9ac", opacity: 0.6 }}>
                {heroTag}
              </span>
            )}
          </div>

          <h1 className="display-m text-white mb-6 leading-tight">
            {title}
          </h1>

          <p className="body-l mb-8 leading-relaxed" style={{ color: "#c5c9ac" }}>
            {intro}
          </p>

          <div
            className="flex flex-wrap items-center gap-5 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-1.5 body-s" style={{ color: "#c5c9ac" }}>
              <HiOutlineUser size={14} /> {author}
            </div>
            <span style={{ color: "#c5c9ac", opacity: 0.3 }}>·</span>
            <div className="flex items-center gap-1.5 body-s" style={{ color: "#c5c9ac" }}>
              <HiOutlineCalendar size={14} /> {date}
            </div>
            <span style={{ color: "#c5c9ac", opacity: 0.3 }}>·</span>
            <div className="flex items-center gap-1.5 body-s" style={{ color: "#c5c9ac" }}>
              <HiOutlineClock size={14} /> {readTime} read
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-16" style={{ background: "#0e0e0f" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-6">
          {sections.map((s) => (
            <article
              key={s.number}
              className="rounded-2xl p-7 lg:p-9 transition-colors"
              style={{
                background: "#1c1c1e",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="inline-flex items-center justify-center rounded-lg font-black text-sm"
                  style={{
                    background: `${categoryColor}22`,
                    color: categoryColor,
                    width: "36px",
                    height: "36px",
                  }}
                >
                  {s.number}
                </span>
                <h2 className="headline-s text-white leading-snug">{s.title}</h2>
              </div>

              {s.intro && (
                <p className="body-m mb-4 leading-relaxed" style={{ color: "#c5c9ac" }}>
                  {s.intro}
                </p>
              )}

              {s.bullets && (
                <ul className="space-y-2 mb-4">
                  {s.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="body-m pl-5 relative"
                      style={{ color: "#e5e2e3" }}
                    >
                      <span
                        className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full"
                        style={{ background: categoryColor }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {s.outro && (
                <p className="body-m leading-relaxed" style={{ color: "#c5c9ac" }}>
                  {s.outro}
                </p>
              )}

              {s.callout && (
                <div
                  className="mt-5 rounded-xl p-4 font-mono text-sm text-center"
                  style={{
                    background: `${categoryColor}14`,
                    border: `1px solid ${categoryColor}44`,
                    color: categoryColor,
                  }}
                >
                  {s.callout}
                </div>
              )}
            </article>
          ))}

          {/* Conclusion */}
          <article
            className="rounded-2xl p-7 lg:p-9"
            style={{
              background:
                "linear-gradient(135deg, #151a05 0%, #1a2008 50%, #151a05 100%)",
              border: `1px solid ${categoryColor}33`,
            }}
          >
            <h2 className="headline-s mb-4" style={{ color: categoryColor }}>
              {conclusion.title ?? "Final Thoughts"}
            </h2>
            {conclusion.paragraphs.map((p, i) => (
              <p
                key={i}
                className="body-m mb-4 last:mb-0 leading-relaxed text-white"
              >
                {p}
              </p>
            ))}
          </article>

          {/* FAQ */}
          {faq && faq.length > 0 && (
            <article
              className="rounded-2xl p-7 lg:p-9"
              style={{
                background: "#1c1c1e",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <h2 className="headline-s text-white mb-5">
                Frequently Asked Questions
              </h2>
              <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {faq.map((item, i) => (
                  <details
                    key={i}
                    className="group py-4 first:pt-0 last:pb-0"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <summary
                      className="cursor-pointer title-s text-white flex items-center justify-between"
                    >
                      {item.question}
                      <span
                        className="transition-transform group-open:rotate-45 text-2xl leading-none"
                        style={{ color: categoryColor }}
                      >
                        +
                      </span>
                    </summary>
                    <p
                      className="body-m mt-3 leading-relaxed"
                      style={{ color: "#c5c9ac" }}
                    >
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </article>
          )}

          {/* CTA */}
          <article
            className="rounded-2xl p-8 lg:p-10 text-center"
            style={{
              background: "#1c1c1e",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <h3 className="headline-s text-white mb-3">{ctaTitle}</h3>
            <p className="body-m mb-7 leading-relaxed max-w-2xl mx-auto" style={{ color: "#c5c9ac" }}>
              {ctaBody}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackLead({
                  label: `Blog CTA: ${title}`,
                  location: "blog-cta",
                  destination: "whatsapp",
                })
              }
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-105 lime-glow-box-strong"
              style={{
                background: "#cdf200",
                color: "#1a2000",
                fontSize: "0.9rem",
              }}
            >
              <FaWhatsapp size={16} />
              Start a Conversation
            </a>
          </article>

          {/* Related posts */}
          {related && related.length > 0 && (
            <div className="pt-10">
              <h3 className="headline-s text-white mb-6">Keep reading</h3>
              <div className="grid md:grid-cols-2 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    onClick={() =>
                      trackClick({
                        label: `Related: ${r.title}`,
                        location: "blog-related",
                        destination: `/blog/${r.slug}`,
                      })
                    }
                    className="group rounded-2xl p-6 hover-scale block"
                    style={{
                      background: "#1c1c1e",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <span
                      className="kinetic-chip active mb-3 inline-block"
                      style={{ color: r.catCol }}
                    >
                      {r.category}
                    </span>
                    <h4 className="title-m text-white leading-snug mb-3 flex items-start justify-between gap-3">
                      <span>{r.title}</span>
                      <HiOutlineArrowTopRightOnSquare
                        size={16}
                        className="flex-shrink-0 mt-1 opacity-50 group-hover:opacity-100 transition-opacity"
                        style={{ color: r.catCol }}
                      />
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
