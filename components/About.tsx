"use client";

const values = [
  { label: "Innovation", desc: "Continuously evolving to deliver superior strategies.", col: "#cdf200" },
  { label: "Integrity", desc: "Transparent, ethical, and accountable in every engagement.", col: "#9bd0cc" },
  { label: "Engagement", desc: "Building meaningful, long-term client relationships.", col: "#deb7ff" },
  { label: "Excellence", desc: "Quality, precision, and attention to detail — always.", col: "#cdf200" },
  { label: "Growth", desc: "Driving sustained success for our clients and our team.", col: "#9bd0cc" },
];

export default function About() {
  return (
    <section id="about" className="section-pad" style={{ background: "#131314" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <span className="kinetic-chip mb-6 inline-block">Who We Are</span>
            <h2 className="headline-l text-white mb-8">
              The high-octane{" "}
              <span style={{ color: "#cdf200" }} className="lime-glow">
                alternative
              </span>
              <br />to cookie-cutter agencies
            </h2>

            {/* Mission */}
            <div className="mb-8 rounded-2xl p-6" style={{ background: "#1c1c1e" }}>
              <p className="label-m mb-2" style={{ color: "#cdf200" }}>Mission</p>
              <p className="body-l" style={{ color: "#e5e2e3" }}>
                Empower businesses with strategic marketing solutions that deliver measurable,
                sustainable growth through disciplined planning and expert execution.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl p-6" style={{ background: "#1c1c1e" }}>
              <p className="label-m mb-2" style={{ color: "#9bd0cc" }}>Vision</p>
              <p className="body-l" style={{ color: "#e5e2e3" }}>
                To be the trusted partner for brands seeking consistent, impactful marketing
                outcomes in an ever-evolving landscape.
              </p>
            </div>
          </div>

          {/* Right — Core Values */}
          <div>
            <p className="label-m mb-6" style={{ color: "#c5c9ac" }}>Core Values</p>
            <div className="space-y-3">
              {values.map((v) => (
                <div
                  key={v.label}
                  className="group flex items-start gap-4 rounded-2xl p-5 hover-scale"
                  style={{ background: "#1c1c1e" }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: v.col, boxShadow: `0 0 8px ${v.col}80` }}
                  />
                  <div>
                    <h4 className="title-s text-white mb-1">{v.label}</h4>
                    <p className="body-s" style={{ color: "#c5c9ac" }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini stat strip */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { val: "500+", label: "Clients" },
                { val: "5+", label: "Years" },
                { val: "12+", label: "Awards" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "#1c1c1e" }}>
                  <div className="font-black text-2xl lime-glow" style={{ color: "#cdf200" }}>{s.val}</div>
                  <div className="label-s mt-1" style={{ color: "#c5c9ac" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
