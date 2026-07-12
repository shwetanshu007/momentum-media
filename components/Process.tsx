"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowRight as ArrowRight } from "react-icons/hi2";
import { splitTextReveal, type SplitRevealResult } from "@/lib/animations";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "Deep-dive into your business landscape — goals, gaps, and growth levers.",
    items: ["Business analysis & goal setting", "Target audience definition", "Competitor landscape review"],
    col: "#cdf200",
  },
  {
    num: "02",
    title: "Proposal & Scope",
    desc: "A precise, transparent roadmap with defined deliverables and timelines.",
    items: ["Custom strategy development", "Defined deliverables & timelines", "Investment breakdown"],
    col: "#9bd0cc",
  },
  {
    num: "03",
    title: "Onboarding Kit",
    desc: "Full alignment — tools, access, and team introductions for a seamless start.",
    items: ["Project management setup", "Platform access & assets", "Team introductions"],
    col: "#deb7ff",
  },
  {
    num: "04",
    title: "Kickoff Meeting",
    desc: "Stakeholder alignment before we launch — strategy, timeline, accountability.",
    items: ["Strategy presentation", "Timeline confirmation", "Roles & responsibilities"],
    col: "#cdf200",
  },
  {
    num: "05",
    title: "Optimization Cycle",
    desc: "Continuous monitoring, testing, and refinement for compounding returns.",
    items: ["Performance tracking", "Campaign adjustments", "Comprehensive reporting"],
    col: "#9bd0cc",
  },
];

export default function Process() {
  const scope = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const splits: SplitRevealResult[] = [];
    if (!prefersReducedMotion() && scope.current) {
      const heading = scope.current.querySelector<HTMLElement>("h2");
      if (heading) {
        splits.push(
          splitTextReveal(heading, {
            stagger: 0.018,
            scrollTrigger: { trigger: heading, start: "top 88%", once: true },
          })
        );
      }
    }

    const mm = gsap.matchMedia(scope);

    // Desktop, motion OK: pinned horizontal scrub.
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const section = scope.current;
        const track = trackRef.current;
        const wrap = wrapRef.current;
        if (!section || !track || !wrap) return;

        section.classList.add("process-h");

        const cards = gsap.utils.toArray<HTMLElement>(".process-card", track);
        const nums = gsap.utils.toArray<HTMLElement>(".process-num", track);
        let lastActive = -1;
        let numTween: gsap.core.Tween | null = null;

        const setActive = (idx: number) => {
          if (idx === lastActive) return;
          lastActive = idx;
          cards.forEach((c, i) => {
            c.classList.toggle("is-active", i === idx);
            c.classList.toggle("is-past", i < idx);
          });
          const numEl = nums[idx];
          if (numEl) {
            numTween?.kill();
            const counter = { v: 0 };
            numTween = gsap.to(counter, {
              v: idx + 1,
              duration: 0.5,
              ease: "power2.out",
              onUpdate() {
                numEl.textContent = String(Math.round(counter.v)).padStart(2, "0");
              },
            });
          }
        };

        const getDist = () => Math.max(0, track.scrollWidth - wrap.clientWidth);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + (getDist() + window.innerHeight * 0.4),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              setActive(
                Math.min(steps.length - 1, Math.floor(self.progress * steps.length))
              );
            },
          },
        });
        tl.to(track, { x: () => -getDist(), ease: "none" }, 0);
        if (fillRef.current) {
          tl.fromTo(fillRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
        }
        setActive(0);

        return () => {
          numTween?.kill();
          section.classList.remove("process-h");
          cards.forEach((c) => c.classList.remove("is-active", "is-past"));
          nums.forEach((n, i) => (n.textContent = steps[i].num));
        };
      }
    );

    // Mobile/tablet, motion OK: no pinning. One staggered fade-up when the
    // strip enters the viewport (cards sit in a horizontal swipe carousel on
    // phones, a 2-col grid on tablets — vertical per-card triggers would fire
    // all at once for the carousel, so trigger the container instead).
    mm.add(
      "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      () => {
        if (!scope.current || !wrapRef.current) return;
        const cards = gsap.utils.toArray<HTMLElement>(".process-card", scope.current);
        gsap.fromTo(
          cards,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.09,
            immediateRender: true,
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: wrapRef.current, start: "top 88%", once: true },
          }
        );
      }
    );

    // prefers-reduced-motion: no matchMedia branch runs — plain stacked cards.
    return () => {
      splits.forEach((s) => s.revert());
      mm.revert();
    };
  }, []);

  return (
    <section id="process" ref={scope} className="section-pad" style={{ background: "#0e0e0f" }}>
      <div className="process-inner">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 process-header">
            <div className="max-w-xl">
              <span className="kinetic-chip mb-5 inline-block">How We Work</span>
              <h2 className="headline-l text-white">
                Five stages to{" "}
                <span style={{ color: "#cdf200" }} className="lime-glow">
                  unstoppable momentum
                </span>
              </h2>
            </div>
            <Link
              href="/process"
              className="inline-flex items-center gap-2 label-m group"
              style={{ color: "#c5c9ac" }}
            >
              Full Process Details
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Steps */}
          <div ref={wrapRef} className="process-wrap">
            <div ref={trackRef} className="process-track">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="process-card group rounded-2xl p-6 relative overflow-hidden"
                  style={{ background: "#1c1c1e" }}
                >
                  {/* Number watermark */}
                  <div
                    className="process-watermark absolute -top-2 -right-2 text-7xl font-black select-none pointer-events-none leading-none"
                    style={{ color: "rgba(255,255,255,0.03)", lineHeight: 1 }}
                  >
                    {step.num}
                  </div>

                  {/* Accent line top */}
                  <div
                    className="h-0.5 rounded-full mb-5 transition-all duration-500 group-hover:w-full"
                    style={{ background: step.col, width: "2rem" }}
                  />

                  <div
                    className="process-num font-black text-sm mb-3 font-mono"
                    style={{ color: step.col, opacity: 0.6 }}
                  >
                    {step.num}
                  </div>

                  <h3 className="title-m text-white mb-2">{step.title}</h3>
                  <p className="process-desc body-s mb-4" style={{ color: "#c5c9ac" }}>{step.desc}</p>

                  <ul className="space-y-1.5">
                    {step.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 body-s" style={{ color: "#e5e2e3" }}>
                        <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: step.col }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Swipe hint (phones only) */}
          <p className="process-swipe-hint label-s mt-4 text-center" style={{ color: "#c5c9ac", opacity: 0.55 }}>
            Swipe to explore →
          </p>

          {/* Scroll progress line (visible in pinned mode only) */}
          <div className="process-progress" aria-hidden="true">
            <div ref={fillRef} className="process-progress-fill" />
          </div>
        </div>
      </div>
    </section>
  );
}
