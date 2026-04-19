import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import { HiArrowRight as ArrowRight } from "react-icons/hi2";

const services = [
  {
    icon: "◈",
    title: "Strategy & Branding",
    tagline: "Build a brand presence that commands attention.",
    desc: "Your brand is your most valuable asset. We develop strategies that clearly articulate your unique position in the market, resonate deeply with your target audience, and create a consistent identity that builds trust over time.",
    items: ["Brand Strategy & Positioning", "Visual Identity & Logo Design", "Brand Guidelines & Style Systems", "Market Research & Audience Insights", "Competitive Landscape Analysis"],
    col: "#cdf200",
    bg: "#131314",
  },
  {
    icon: "◎",
    title: "Digital Marketing",
    tagline: "Precision campaigns. Maximum reach.",
    desc: "Data-informed campaigns across every digital touchpoint — from organic search to paid acquisition. We don't spray and pray. Every channel, every campaign, every creative is tied back to your specific business objectives.",
    items: ["SEO & SEM Strategy", "PPC Advertising Management", "Email Marketing Automation", "WhatsApp Marketing Campaigns", "Analytics & Performance Reporting"],
    col: "#9bd0cc",
    bg: "#0e0e0f",
  },
  {
    icon: "◐",
    title: "Performance Marketing",
    tagline: "Every rupee accountable. Every campaign optimized.",
    desc: "Pure results-first marketing. We build funnels that convert, track every touchpoint with precision attribution, and obsessively optimize until your cost of acquisition is where it needs to be.",
    items: ["Conversion Rate Optimization", "Paid Media Strategy & Buying", "Full-Funnel Development", "Attribution Modeling", "Transparent ROI Reporting"],
    col: "#deb7ff",
    bg: "#131314",
  },
  {
    icon: "◑",
    title: "Social Media & Content",
    tagline: "Content that converts. Communities that compound.",
    desc: "Social media isn't just about posting — it's about building a community that amplifies your brand. We create content strategies and social systems that turn followers into advocates and advocacy into revenue.",
    items: ["Content Strategy & Creation", "Social Media Management", "Influencer & Creator Partnerships", "Video Production & Direction", "Community Growth Programs"],
    col: "#cdf200",
    bg: "#0e0e0f",
  },
  {
    icon: "◒",
    title: "Community & Reputation",
    tagline: "Your reputation is your most fragile asset.",
    desc: "In the age of instant opinion, your brand's reputation can shift overnight. We monitor, protect, and proactively build your brand equity — with crisis-ready playbooks for when things get difficult.",
    items: ["Reputation Monitoring & Alerts", "Community Engagement Programs", "Crisis Communications Planning", "PR Strategy & Media Relations", "Review Management"],
    col: "#9bd0cc",
    bg: "#131314",
  },
  {
    icon: "◓",
    title: "Training & Consulting",
    tagline: "Empower your team to own their growth.",
    desc: "The best outcomes happen when your internal team is aligned with your external agency. We run tailored workshops, strategic consulting sessions, and process optimization engagements that leave your team stronger.",
    items: ["Customized Marketing Workshops", "Leadership Strategy Consulting", "Marketing Process Optimization", "Team Capability Assessments", "Marketing Technology Audits"],
    col: "#deb7ff",
    bg: "#0e0e0f",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20" style={{ background: "#0e0e0f" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="kinetic-chip mb-6 inline-block">Our Services</span>
          <h1 className="display-l text-white max-w-3xl mb-6">
            Six practice areas.{" "}
            <span className="lime-glow" style={{ color: "#cdf200" }}>
              One mission.
            </span>
          </h1>
          <p className="body-l max-w-2xl" style={{ color: "#c5c9ac" }}>
            Integrated marketing solutions that work in concert to drive measurable,
            compounding growth for your business.
          </p>
        </div>
      </section>

      {/* Service sections */}
      {services.map((s, i) => (
        <section key={s.title} className="section-pad" style={{ background: s.bg }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-16 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              {/* Content */}
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="text-4xl mb-5" style={{ color: s.col }}>{s.icon}</div>
                <span className="kinetic-chip mb-4 inline-block" style={{ color: s.col }}>{s.title}</span>
                <h2 className="headline-m text-white mb-5">{s.tagline}</h2>
                <p className="body-l leading-relaxed mb-8" style={{ color: "#c5c9ac" }}>{s.desc}</p>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 group font-semibold"
                  style={{ color: s.col }}
                >
                  <span>Start this service</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Deliverables card */}
              <div className={`rounded-2xl p-8 ${i % 2 === 1 ? "lg:order-1" : ""}`} style={{ background: "#1c1c1e" }}>
                <p className="label-m mb-6" style={{ color: "#c5c9ac", opacity: 0.5 }}>Deliverables</p>
                <ul className="space-y-4">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 group/item">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover/item:scale-110"
                        style={{ background: `${s.col}15` }}
                      >
                        <svg className="w-3.5 h-3.5" style={{ color: s.col }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="body-m" style={{ color: "#e5e2e3" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <Cta />
      <Footer />
    </main>
  );
}
