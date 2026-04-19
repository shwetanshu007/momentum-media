"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Satisfied Clients", col: "#cdf200" },
  { value: 250, suffix: "%", label: "Average ROI Increase", col: "#9bd0cc" },
  { value: 1, suffix: " Cr+", label: "Ad Spend Managed", prefix: "₹", col: "#deb7ff" },
  { value: 98, suffix: "%", label: "Client Satisfaction", col: "#cdf200" },
  { value: 15, suffix: "M+", label: "Leads Generated", col: "#9bd0cc" },
];

function Counter({ to, prefix = "", suffix = "", col, run }: { to: number; prefix?: string; suffix?: string; col: string; run: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let f = 0;
    const step = to / 60;
    const id = setInterval(() => {
      f += step;
      if (f >= to) { setVal(to); clearInterval(id); }
      else setVal(Math.floor(f));
    }, 22);
    return () => clearInterval(id);
  }, [to, run]);
  return (
    <span className="font-black" style={{ color: col, fontSize: "2.75rem", lineHeight: 1, letterSpacing: "-0.02em" }}>
      {prefix}{val}{suffix}
    </span>
  );
}

export default function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRun(true); }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section style={{ background: "#0e0e0f" }} className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="label-m text-center mb-12" style={{ color: "#c5c9ac" }}>
          Results that speak for themselves
        </p>
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {stats.map((s, i) => (
            <div key={i} className="text-center group">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} col={s.col} run={run} />
              <p className="body-s mt-2" style={{ color: "#c5c9ac" }}>{s.label}</p>
              <div
                className="mx-auto mt-3 h-0.5 rounded-full transition-all duration-700 group-hover:w-3/4"
                style={{ background: s.col, width: "40%", opacity: 0.4 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
