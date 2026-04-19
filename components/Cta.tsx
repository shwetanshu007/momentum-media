"use client";

import { HiArrowRight as ArrowRight } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import { trackLead, trackContact } from "@/lib/analytics";

const WHATSAPP_URL = `https://wa.me/919408266131?text=${encodeURIComponent(
  "Hi Momentumm Media! I'd like to book a free discovery call to discuss my brand's growth."
)}`;

export default function Cta() {
  return (
    <section id="contact" className="section-pad" style={{ background: "#0e0e0f" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "#131314" }}
        >
          <div
            className="absolute top-0 left-1/3 w-[500px] h-[500px] -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(205,242,0,0.08), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px] translate-y-1/2 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(222,183,255,0.07), transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10 px-6 sm:px-8 py-14 sm:py-20 lg:px-20 text-center">
            <span className="kinetic-chip active mb-6 sm:mb-8 inline-block">
              Ready to Ignite Growth?
            </span>

            <h2 className="display-m text-white mb-5 max-w-2xl mx-auto">
              Let&apos;s build your{" "}
              <span className="lime-glow" style={{ color: "#cdf200" }}>
                growth engine
              </span>
              <br className="hidden sm:block" /> together
            </h2>

            <p
              className="body-l max-w-xl mx-auto mb-8 sm:mb-10"
              style={{ color: "#c5c9ac" }}
            >
              Free 30-minute strategy session with our senior team. No pitch decks,
              no fluff — just a clear plan to accelerate your brand.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackLead({
                    label: "Book Free Discovery Call",
                    location: "cta-section",
                    destination: "whatsapp",
                  })
                }
                className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 lime-glow-box-strong"
                style={{
                  background: "#cdf200",
                  color: "#1a2000",
                  fontSize: "0.95rem",
                }}
              >
                <FaWhatsapp size={18} />
                Book Free Discovery Call
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="mailto:momentummmediaofficial@gmail.com"
                onClick={() =>
                  trackContact({
                    label: "Email",
                    location: "cta-section",
                    destination: "email",
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/10"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  color: "#e5e2e3",
                  fontSize: "0.9rem",
                }}
              >
                Email Us
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {["No commitment required", "Free 30-min session", "500+ brands growing"].map(
                (b) => (
                  <div
                    key={b}
                    className="flex items-center gap-2 body-s"
                    style={{ color: "#c5c9ac" }}
                  >
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: "#cdf200" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {b}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
