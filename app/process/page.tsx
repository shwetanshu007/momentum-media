import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";

const stages = [
  {
    num: "01",
    title: "Discovery Call",
    tagline: "Understand before we execute.",
    body: "We start with an in-depth consultation designed to uncover your business's unique challenges, goals, and competitive landscape. This isn't a sales call — it's a strategic session that sets the foundation for everything that follows.",
    items: ["Business analysis and goal setting", "Target audience definition", "Competitor landscape review", "Current marketing audit", "Growth opportunity mapping"],
    col: "#cdf200",
    bg: "#131314",
  },
  {
    num: "02",
    title: "Proposal & Scope",
    tagline: "Clarity before commitment.",
    body: "You receive a precise, transparent proposal with a custom strategy, defined deliverables, realistic timelines, and a clear investment breakdown. No hidden fees, no ambiguous scope.",
    items: ["Custom strategy development", "Defined deliverables and timelines", "Transparent investment breakdown", "KPI framework and success metrics", "Channel selection rationale"],
    col: "#9bd0cc",
    bg: "#0e0e0f",
  },
  {
    num: "03",
    title: "Onboarding Kit",
    tagline: "Full alignment from day one.",
    body: "We equip your team with everything needed for seamless collaboration — platform access, project management setup, and a clear introduction to your dedicated Momentumm Media team.",
    items: ["Project management setup", "Access to platforms and assets", "Team introductions and roles", "Communication cadence established", "Baseline data collection"],
    col: "#deb7ff",
    bg: "#131314",
  },
  {
    num: "04",
    title: "Kickoff Meeting",
    tagline: "Aligned, accountable, ready.",
    body: "All stakeholders come together to confirm the strategy, timeline, and individual responsibilities before we launch. This ensures everyone is driving in the same direction from the first day of execution.",
    items: ["Strategy presentation and sign-off", "Timeline confirmation", "Roles and responsibilities", "Escalation paths defined", "Launch date locked"],
    col: "#cdf200",
    bg: "#0e0e0f",
  },
  {
    num: "05",
    title: "Optimization Cycle",
    tagline: "Continuous improvement. Compounding results.",
    body: "Execution is just the beginning. Our ongoing optimization cycle ensures campaigns are continuously refined based on real-time performance data, keeping your ROI on an upward trajectory.",
    items: ["Weekly performance tracking", "Campaign adjustments and A/B testing", "Monthly comprehensive reporting", "Quarterly strategy reviews", "Budget reallocation recommendations"],
    col: "#9bd0cc",
    bg: "#131314",
  },
];

export default function ProcessPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 section-pad" style={{ background: "#0e0e0f" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="kinetic-chip mb-6 inline-block">Our Process</span>
          <h1 className="display-l text-white max-w-3xl mb-6">
            Five stages to{" "}
            <span className="lime-glow" style={{ color: "#cdf200" }}>
              unstoppable momentum
            </span>
          </h1>
          <p className="body-l max-w-2xl" style={{ color: "#c5c9ac" }}>
            A structured, transparent approach that transforms ambition into measurable results.
            Every engagement follows this proven framework — no shortcuts, no guesswork.
          </p>
        </div>
      </section>

      {/* Full-screen stages */}
      {stages.map((s) => (
        <section key={s.num} className="section-pad" style={{ background: s.bg }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left */}
              <div>
                <div className="font-black text-6xl font-mono mb-4 leading-none" style={{ color: `${s.col}20` }}>
                  {s.num}
                </div>
                <span className="kinetic-chip mb-5 inline-block" style={{ color: s.col }}>{s.title}</span>
                <h2 className="headline-l text-white mb-4">{s.tagline}</h2>
                <p className="body-l leading-relaxed" style={{ color: "#c5c9ac" }}>{s.body}</p>
              </div>

              {/* Right — deliverables */}
              <div className="rounded-2xl p-8" style={{ background: "#1c1c1e" }}>
                <p className="label-m mb-5" style={{ color: "#c5c9ac", opacity: 0.5 }}>What happens in this stage</p>
                <ul className="space-y-4">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${s.col}20` }}
                      >
                        <svg className="w-3 h-3" style={{ color: s.col }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
