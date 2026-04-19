import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";

const cases = [
  {
    client: "Aaryan International",
    industry: "Professional Services",
    challenge: "Stagnant lead generation despite significant marketing spend. Existing strategy lacked clear targeting and suffered from inconsistent messaging across channels.",
    approach: [
      "Detailed discovery session to define goals and target audiences",
      "Unified brand strategy with clear positioning",
      "Data-driven digital plan: SEO, PPC & WhatsApp Marketing",
      "Rigorous performance tracking and regular reporting",
    ],
    results: [
      { val: "150%", label: "Increase in Qualified Leads", col: "#cdf200" },
      { val: "35%", label: "Reduction in Cost Per Lead", col: "#9bd0cc" },
      { val: "100%", label: "Brand Consistency Achieved", col: "#deb7ff" },
    ],
    quote: "Momentumm Media's structured approach and commitment to transparency transformed our marketing into a reliable growth engine.",
    by: "Aaryan International Leadership Team",
    col: "#cdf200",
    bg: "#131314",
  },
  {
    client: "AIM",
    industry: "Retail",
    challenge: "Low conversion rates and limited visibility in a competitive market. Campaigns lacked cohesion, and their website was underperforming on every key metric.",
    approach: [
      "In-depth audit to identify conversion bottlenecks",
      "Redesigned landing pages aligned with brand strategy",
      "Targeted Performance Marketing campaign launch",
      "WhatsApp Marketing for direct, personalized engagement",
    ],
    results: [
      { val: "200%", label: "Conversion Rate Improvement", col: "#deb7ff" },
      { val: "45%", label: "Increase in Average Order Value", col: "#cdf200" },
      { val: "2X", label: "Customer Engagement via WhatsApp", col: "#9bd0cc" },
    ],
    quote: "Momentumm Media provided the clarity and expertise we needed to align our marketing efforts and achieve real, sustainable growth.",
    by: "Aryan, CFO — AIM",
    col: "#deb7ff",
    bg: "#0e0e0f",
  },
  {
    client: "Core Brain",
    industry: "Design",
    challenge: "Fragmented marketing approach and difficulty proving ROI to internal stakeholders. Paid campaigns delivered inconsistent results with unclear attribution.",
    approach: [
      "Comprehensive strategy workshop to clarify goals and KPIs",
      "Integrated plan: SEO, PPC, Email & Social Media",
      "Performance Marketing framework with clear attribution modeling",
      "Regular, transparent stakeholder reporting",
    ],
    results: [
      { val: "250%", label: "ROI Increase Over 12 Months", col: "#9bd0cc" },
      { val: "₹1Cr+", label: "Ad Spend Managed Efficiently", col: "#cdf200" },
      { val: "3X", label: "Stakeholder Confidence Score", col: "#deb7ff" },
    ],
    quote: "Momentumm Media's disciplined, KPI-driven approach ensured we knew exactly where our budget was going and what it delivered.",
    by: "Harshal Chaudhary, Founder — Core Brain",
    col: "#9bd0cc",
    bg: "#131314",
  },
];

export default function CaseStudiesPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20" style={{ background: "#0e0e0f" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="kinetic-chip mb-6 inline-block">Proof of Work</span>
          <h1 className="display-l text-white max-w-3xl mb-6">
            Real challenges.{" "}
            <span className="lime-glow" style={{ color: "#cdf200" }}>
              Real results.
            </span>
          </h1>
          <p className="body-l max-w-2xl" style={{ color: "#c5c9ac" }}>
            Three case studies that demonstrate our approach: structured strategy,
            disciplined execution, and transparent reporting — every time.
          </p>
        </div>
      </section>

      {/* Case studies */}
      {cases.map((c) => (
        <section key={c.client} className="section-pad" style={{ background: c.bg }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12">
              <span className="kinetic-chip mb-4 inline-block" style={{ color: c.col }}>{c.industry}</span>
              <h2 className="headline-l text-white">{c.client}</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Challenge + Approach */}
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                <div className="rounded-2xl p-7" style={{ background: "#1c1c1e" }}>
                  <p className="label-m mb-4" style={{ color: "#c5c9ac", opacity: 0.5 }}>The Challenge</p>
                  <p className="body-m leading-relaxed" style={{ color: "#e5e2e3" }}>{c.challenge}</p>
                </div>

                <div className="rounded-2xl p-7" style={{ background: "#1c1c1e" }}>
                  <p className="label-m mb-4" style={{ color: "#c5c9ac", opacity: 0.5 }}>Our Approach</p>
                  <ul className="space-y-3">
                    {c.approach.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: c.col }} />
                        <span className="body-s" style={{ color: "#e5e2e3" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Results + Quote */}
              <div className="space-y-4">
                {c.results.map((r) => (
                  <div key={r.label} className="rounded-2xl p-6" style={{ background: "#1c1c1e" }}>
                    <div className="font-black text-3xl mb-1" style={{ color: r.col }}>{r.val}</div>
                    <div className="body-s" style={{ color: "#c5c9ac" }}>{r.label}</div>
                  </div>
                ))}

                {/* Quote */}
                <div className="rounded-2xl p-6" style={{ background: `${c.col}0d` }}>
                  <p className="body-s italic leading-relaxed mb-3" style={{ color: "#e5e2e3" }}>"{c.quote}"</p>
                  <p className="label-s" style={{ color: c.col }}>— {c.by}</p>
                </div>
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
