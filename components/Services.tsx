"use client";

import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { LuTarget, LuMegaphone, LuTrendingUp, LuUsersRound, LuShieldCheck, LuGraduationCap } from "react-icons/lu";
import SpotlightCard from "./ui/SpotlightCard";
import type { IconType } from "react-icons";

interface Service {
  Icon: IconType;
  title: string;
  desc: string;
  items: string[];
  accentCol: string;
}

const services: Service[] = [
  {
    Icon: LuTarget,
    title: "Strategy & Branding",
    desc: "Build a differentiated brand presence that commands attention and drives loyalty.",
    items: ["Brand Strategy & Positioning", "Visual Identity & Logo Design", "Brand Guidelines", "Market Research"],
    accentCol: "#cdf200",
  },
  {
    Icon: LuMegaphone,
    title: "Digital Marketing",
    desc: "Precision campaigns across every digital channel, powered by data.",
    items: ["SEO & SEM", "PPC Advertising", "Email Marketing", "WhatsApp Marketing", "Analytics & Reporting"],
    accentCol: "#9bd0cc",
  },
  {
    Icon: LuTrendingUp,
    title: "Performance Marketing",
    desc: "Results-first campaigns engineered to maximize ROI at every funnel stage.",
    items: ["Conversion Rate Optimization", "Paid Media Strategy", "Funnel Development", "Attribution & Measurement"],
    accentCol: "#deb7ff",
  },
  {
    Icon: LuUsersRound,
    title: "Social Media & Content",
    desc: "Compelling content that builds communities and converts audiences.",
    items: ["Content Strategy & Creation", "Social Media Management", "Influencer Partnerships", "Video Production"],
    accentCol: "#cdf200",
  },
  {
    Icon: LuShieldCheck,
    title: "Community & Reputation",
    desc: "Protect and amplify your brand's reputation across every touchpoint.",
    items: ["Reputation Monitoring", "Community Engagement", "Crisis Communications", "PR Strategy"],
    accentCol: "#9bd0cc",
  },
  {
    Icon: LuGraduationCap,
    title: "Training & Consulting",
    desc: "Empower your team with best-practice marketing expertise.",
    items: ["Customized Workshops", "Strategy Consulting", "Process Optimization"],
    accentCol: "#deb7ff",
  },
];

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = Number.parseInt(h.substring(0, 2), 16);
  const g = Number.parseInt(h.substring(2, 4), 16);
  const b = Number.parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function Services() {
  return (
    <section id="services" className="section-pad" style={{ background: "#131314" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <span className="kinetic-chip mb-5 inline-block">Our Capabilities</span>
          <h2 className="headline-l text-white mb-4">
            Integrated solutions,{" "}
            <span style={{ color: "#cdf200" }} className="lime-glow">
              measurable outcomes
            </span>
          </h2>
          <p className="body-l" style={{ color: "#c5c9ac" }}>
            Six core practice areas working in concert to accelerate your growth trajectory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => {
            const { Icon } = s;
            return (
              <SpotlightCard
                key={s.title}
                className="group p-7 hover-scale cursor-pointer h-full"
                style={{ background: "#1c1c1e" }}
                spotlightColor={hexToRgba(s.accentCol, 0.12)}
                borderColorHover={hexToRgba(s.accentCol, 0.35)}
              >
                <div
                  className="inline-flex items-center justify-center rounded-xl mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: hexToRgba(s.accentCol, 0.12),
                    color: s.accentCol,
                    width: "52px",
                    height: "52px",
                  }}
                >
                  <Icon size={26} />
                </div>

                <h3 className="title-l text-white mb-3">{s.title}</h3>
                <p className="body-m mb-5" style={{ color: "#c5c9ac" }}>
                  {s.desc}
                </p>

                <ul className="space-y-2 mb-6">
                  {s.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 body-s"
                      style={{ color: "#e5e2e3" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: s.accentCol, opacity: 0.7 }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 label-m transition-all duration-200 group-hover:gap-2.5"
                  style={{ color: s.accentCol, textDecoration: "none" }}
                >
                  Explore
                  <HiArrowUpRight size={13} />
                </Link>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
