"use client";

import { FaStar, FaQuoteLeft } from "react-icons/fa6";
import SpotlightCard from "./ui/SpotlightCard";

const testimonials = [
  {
    quote: "Momentumm Media provided a clear strategy, exceptional execution, and consistent communication. Our lead quality and volume improved significantly.",
    name: "Aryan",
    role: "CFO",
    company: "AIM",
    initials: "A",
    col: "#cdf200",
  },
  {
    quote: "They function as an extension of our team, delivering results while maintaining complete transparency. A reliable partner for any business serious about growth.",
    name: "Harshal Chaudhary",
    role: "Founder",
    company: "Core Brain",
    initials: "HC",
    col: "#9bd0cc",
  },
  {
    quote: "Momentumm Media's structured approach and commitment to transparency transformed our marketing into a reliable growth engine.",
    name: "Aaryan",
    role: "Director",
    company: "Aaryan International",
    initials: "A",
    col: "#deb7ff",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad" style={{ background: "#131314" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="kinetic-chip mb-5 inline-block">Client Stories</span>
          <h2 className="headline-l text-white">
            What our partners{" "}
            <span style={{ color: "#cdf200" }} className="lime-glow">say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <SpotlightCard
              key={t.company}
              className="group p-7 hover-scale h-full"
              style={{ background: "#1c1c1e" }}
              spotlightColor={`${t.col}1a`}
              borderColorHover={`${t.col}55`}
            >
              <FaQuoteLeft
                size={22}
                className="mb-5"
                style={{ color: t.col, opacity: 0.7 }}
              />

              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={13}
                    style={{ color: "#cdf200" }}
                  />
                ))}
              </div>

              <p className="body-m italic mb-7 leading-relaxed" style={{ color: "#e5e2e3" }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{ background: `${t.col}25`, color: t.col }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="body-s" style={{ color: "#c5c9ac" }}>{t.role}, {t.company}</div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
