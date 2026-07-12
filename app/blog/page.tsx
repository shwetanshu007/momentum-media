import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HiOutlineClock, HiArrowUpRight } from "react-icons/hi2";

const featured = {
  slug: "measuring-marketing-roi",
  category: "Strategy",
  catCol: "#cdf200",
  title: "Measuring Marketing ROI: A Practical Framework for Business Leaders",
  excerpt: "Marketing is an investment, not an expense. Yet many businesses struggle to measure its true impact. Without a clear approach to tracking return on investment, even the best campaigns risk falling short of their potential. This article outlines a practical, evergreen framework for evaluating marketing ROI.",
  readTime: "8 min",
  date: "Apr 12, 2026",
};

const posts = [
  {
    slug: "cohesive-brand-strategy",
    category: "Branding",
    catCol: "#9bd0cc",
    title: "Building a Cohesive Brand Strategy That Delivers Results",
    excerpt: "A strong brand is more than a logo or slogan — it is a strategic asset that drives awareness, trust, and growth.",
    readTime: "7 min",
    date: "Mar 28, 2026",
  },
  {
    slug: "attribution-modeling",
    category: "Growth",
    catCol: "#deb7ff",
    title: "How Attribution Modeling Changes Your Marketing Decisions",
    excerpt: "Most marketers track conversions. The best marketers understand the full journey. Attribution is the difference.",
    readTime: "8 min",
    date: "Mar 15, 2026",
  },
  {
    slug: "whatsapp-marketing-playbook",
    category: "Social",
    catCol: "#cdf200",
    title: "WhatsApp Marketing in 2026: A Complete Playbook",
    excerpt: "WhatsApp has over 2 billion users and a 98% open rate. Here's how forward-thinking brands are using it to drive revenue.",
    readTime: "9 min",
    date: "Mar 5, 2026",
  },
  {
    slug: "kpis-that-drive-outcomes",
    category: "Operations",
    catCol: "#9bd0cc",
    title: "Setting KPIs That Actually Drive Business Outcomes",
    excerpt: "Vanity metrics feel good but don't move the needle. A framework for aligning marketing KPIs with what your business actually needs.",
    readTime: "7 min",
    date: "Feb 20, 2026",
  },
  {
    slug: "transparent-reporting-advantage",
    category: "Culture",
    catCol: "#deb7ff",
    title: "Why Transparent Reporting Is Your Competitive Advantage",
    excerpt: "Brands that embrace radical transparency with their marketing data build deeper trust — and make dramatically better decisions.",
    readTime: "6 min",
    date: "Feb 8, 2026",
  },
  {
    slug: "performance-marketing-funnel",
    category: "Strategy",
    catCol: "#cdf200",
    title: "The Performance Marketing Funnel: A Stage-by-Stage Guide",
    excerpt: "From awareness to advocacy — a rigorous walkthrough of building a performance marketing funnel that compounds over time.",
    readTime: "10 min",
    date: "Jan 28, 2026",
  },
];

const categories = ["All", "Strategy", "Growth", "Social", "Operations", "Culture", "Branding"];

export default function BlogPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16" style={{ background: "#0e0e0f" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="kinetic-chip mb-6 inline-block">Insights</span>
          <h1 className="display-l text-white max-w-2xl mb-6">
            Marketing{" "}
            <span className="lime-glow" style={{ color: "#cdf200" }}>intelligence</span>
          </h1>
          <p className="body-l max-w-xl mb-10" style={{ color: "#c5c9ac" }}>
            Strategy, growth, and execution insights from the Momentumm Media team.
          </p>
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c, i) => (
              <button key={c} className={`kinetic-chip ${i === 0 ? "active" : ""}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-8" style={{ background: "#0e0e0f" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden" style={{ background: "#1c1c1e" }}>
            <div className="grid lg:grid-cols-2">
              {/* Visual pane */}
              <div
                className="h-64 lg:h-auto relative flex items-end p-8"
                style={{
                  background: "linear-gradient(135deg, #131314 0%, #1a2800 50%, #131314 100%)",
                  minHeight: "280px",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(205,242,0,0.12), transparent 70%)" }}
                />
                <span
                  className="relative z-10 text-8xl font-black opacity-10 select-none leading-none"
                  style={{ color: "#cdf200" }}
                >
                  ROI
                </span>
              </div>
              {/* Content pane */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className="kinetic-chip active" style={{ color: featured.catCol }}>
                    {featured.category}
                  </span>
                  <span className="label-s" style={{ color: "#c5c9ac", opacity: 0.4 }}>Featured</span>
                </div>
                <h2 className="headline-s text-white mb-4 leading-snug">{featured.title}</h2>
                <p className="body-m mb-6 leading-relaxed" style={{ color: "#c5c9ac" }}>{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 body-s" style={{ color: "#c5c9ac" }}>
                    <HiOutlineClock size={12} />
                    {featured.readTime} · {featured.date}
                  </div>
                  <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-1.5 label-m group" style={{ color: "#cdf200" }}>
                    Read <HiArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad" style={{ background: "#0e0e0f" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((p) => {
              const Wrapper: React.ElementType = p.slug ? Link : "div";
              const wrapperProps = p.slug ? { href: `/blog/${p.slug}` } : {};
              return (
                <Wrapper
                  key={p.title}
                  {...wrapperProps}
                  className="group rounded-2xl overflow-hidden hover-scale block"
                  style={{ background: "#1c1c1e" }}
                >
                  <div className="px-6 pt-6 pb-4" style={{ background: "#252527" }}>
                    <span className="kinetic-chip active text-xs mb-3 inline-block" style={{ color: p.catCol }}>{p.category}</span>
                    <h3 className="title-m text-white leading-snug">{p.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="body-s mb-5 leading-relaxed" style={{ color: "#c5c9ac" }}>{p.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="body-s" style={{ color: "#c5c9ac", opacity: 0.5 }}>
                        {p.readTime} · {p.date}
                      </span>
                      <span className="label-m flex items-center gap-1" style={{ color: p.catCol }}>
                        {p.slug ? "Read" : "Coming soon"}
                        {p.slug && (
                          <HiArrowUpRight
                            size={11}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          />
                        )}
                      </span>
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
