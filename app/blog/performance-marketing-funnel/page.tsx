import type { Metadata } from "next";
import BlogPostLayout from "@/components/BlogPostLayout";

export const metadata: Metadata = {
  title:
    "The Performance Marketing Funnel: A Stage-by-Stage Guide | Momentumm Media",
  description:
    "A rigorous walkthrough of the performance marketing funnel — awareness, consideration, conversion, retention, and advocacy — with the metrics, tactics, and traps at each stage.",
  keywords:
    "performance marketing, marketing funnel, top of funnel, middle of funnel, bottom of funnel, retention marketing, advocacy, CAC, LTV, conversion rate",
  alternates: { canonical: "/blog/performance-marketing-funnel" },
  openGraph: {
    title: "The Performance Marketing Funnel: A Stage-by-Stage Guide",
    description:
      "A stage-by-stage performance marketing funnel guide — metrics, tactics, and traps at every step.",
    type: "article",
    url: "/blog/performance-marketing-funnel",
    publishedTime: "2026-01-28T00:00:00.000Z",
    authors: ["Momentumm Media"],
    tags: ["Performance Marketing", "Funnel", "Strategy"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Performance Marketing Funnel: A Stage-by-Stage Guide",
    description:
      "Awareness to advocacy — the rigorous walkthrough of a funnel that compounds.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "The Performance Marketing Funnel: A Stage-by-Stage Guide",
  description:
    "A stage-by-stage guide to the modern performance marketing funnel, including metrics, tactics, and common traps.",
  author: { "@type": "Organization", name: "Momentumm Media" },
  publisher: { "@type": "Organization", name: "Momentumm Media" },
  datePublished: "2026-01-28",
  dateModified: "2026-01-28",
  mainEntityOfPage: "/blog/performance-marketing-funnel",
  articleSection: "Strategy",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPostLayout
        category="Strategy"
        categoryColor="#cdf200"
        heroTag="Evergreen · 2026 Edition"
        title="The Performance Marketing Funnel: A Stage-by-Stage Guide"
        intro="The performance marketing funnel is often drawn as a triangle and then ignored. Treat it that way and you end up with a campaign strategy that is 90% bottom-of-funnel, a rising CAC curve, and a pipeline that evaporates the moment you pause paid spend. Treated properly, the funnel is a set of compounding, measurable stages — each with its own job, metric, and failure mode. This guide walks through all five, stage by stage."
        readTime="10 min"
        date="Jan 28, 2026"
        sections={[
          {
            number: "01",
            title: "Awareness — Make the Right People Aware",
            intro:
              "Awareness is not about shouting at everyone. It is about reaching the specific people who are likely to care, and making them remember you before they need you.",
            bullets: [
              "Objective — unaided brand recall in your target segment",
              "Channels — paid social reach, YouTube, CTV, content SEO, PR, sponsorships",
              "Creative — emotional, high-quality, story-led; built for silence and sound",
              "Leading metrics — reach against ICP, video-watched %, branded search lift",
              "Common trap — optimizing awareness campaigns for conversions and wondering why CPM rises and recall doesn't",
            ],
            outro:
              "Awareness done well lowers the cost of every downstream stage. Done poorly, it just buys impressions.",
          },
          {
            number: "02",
            title: "Consideration — Earn a Place on the Shortlist",
            intro:
              "Consideration is the quiet, compounding middle. It is where most budget gets misallocated, either over-invested (endless retargeting) or under-invested (nothing between awareness and conversion).",
            bullets: [
              "Objective — make it onto the buyer's shortlist with a credible, differentiated story",
              "Channels — mid-funnel YouTube, case studies, comparison content, webinars, sequenced email",
              "Creative — proof-heavy, specific, and useful (how-to, proof, comparisons)",
              "Leading metrics — return-visit rate, high-intent page depth, email list quality",
              "Common trap — treating retargeting as 'consideration' when it's really repeat-conversion pressure",
            ],
            outro:
              "A healthy consideration layer is what lets awareness convert at all. Ignore it and you will pay for the same customer twice.",
          },
          {
            number: "03",
            title: "Conversion — Reduce Friction, Not Just Price",
            intro:
              "The conversion stage is where performance marketing is most loudly measured and most narrowly optimized. Discounting works until it becomes the brand. Better levers usually exist:",
            bullets: [
              "Objective — convert high-intent demand at the lowest sustainable CAC",
              "Channels — paid search, branded SEM, retargeting, product-page SEO, comparison ads",
              "Creative — offer-led, objection-handling, trust-signal heavy",
              "Leading metrics — conversion rate by intent tier, cost per qualified lead, add-to-cart to purchase",
              "Common trap — attributing brand-heavy last-click conversions to the paid search line that captured them",
            ],
            outro:
              "If conversion rate is low, fix the product page, the form, the shipping story, and the social proof before you touch the discount.",
            callout: "Discount is the lever you pull last, not first.",
          },
          {
            number: "04",
            title: "Retention — Where Margin Is Actually Made",
            intro:
              "Retention is usually the funnel stage with the highest ROI and the thinnest budget. That is exactly the arbitrage.",
            bullets: [
              "Objective — extend LTV, raise repeat purchase rate, reduce churn",
              "Channels — lifecycle email, WhatsApp, loyalty programs, onboarding sequences, in-product prompts",
              "Creative — personalized, behavioural, segmented by cohort and recency",
              "Leading metrics — onboarding completion, 30-day active rate, repeat purchase rate, NPS",
              "Common trap — retention owned by 'operations' with no creative budget, so it looks like a support function and performs like one",
            ],
            outro:
              "A 10% retention improvement typically beats a 10% conversion improvement on lifetime impact — and is usually cheaper to achieve.",
          },
          {
            number: "05",
            title: "Advocacy — Turn Customers Into Distribution",
            intro:
              "Advocacy is the stage most funnels drop. It is also the stage that, done well, lowers CAC on every stage above it.",
            bullets: [
              "Objective — generate referrals, reviews, and organic content from happy customers",
              "Channels — referral programs, UGC campaigns, review automation, community, ambassadors",
              "Creative — built for re-shareability; designed to be forwarded, not just read",
              "Leading metrics — referral rate, review volume and rating, UGC volume, branded UGC reach",
              "Common trap — running a referral program with no incentive worth sharing and calling it a channel",
            ],
            outro:
              "Advocacy is the closest thing performance marketing has to compounding interest.",
          },
          {
            number: "06",
            title: "Wire the Funnel Together With Measurement",
            intro:
              "A funnel is not five disconnected campaigns — it is one system. Make that explicit in measurement:",
            bullets: [
              "Stage-level conversion rates tracked over time, not just blended funnel conversion",
              "Cohort views of LTV and payback broken down by acquisition channel",
              "Attribution and incrementality working together (see our attribution post)",
              "A single dashboard that shows where the leak is — not one where you'd have to triangulate across six",
            ],
            outro:
              "When any stage slows, you should know within a week. When any stage compounds, you should know what to double down on.",
          },
        ]}
        conclusion={{
          title: "Conclusion",
          paragraphs: [
            "The performance marketing funnel is not a diagram — it is a way of allocating budget, attention, and creative effort across the real journey a customer takes. Brands that manage all five stages with equal rigour compound advantages over time; brands that run a conversion-only strategy keep paying more for the same customers.",
            "At Momentumm Media, we help brands design, operate, and measure every stage of the funnel — and shift budget toward the stages that deliver the most durable growth.",
          ],
        }}
        faq={[
          {
            question: "How do I split budget across funnel stages?",
            answer:
              "A useful starting ratio is 30% awareness, 20% consideration, 35% conversion, 10% retention, 5% advocacy — then shift based on your LTV, payback target, and which stage is the current bottleneck. The mix changes materially for ecommerce, SaaS, and B2B services.",
          },
          {
            question: "Isn't the funnel outdated compared to the 'looping' or 'flywheel' model?",
            answer:
              "The stages are the same — awareness, consideration, conversion, retention, advocacy. The 'loop' view just emphasizes that advocacy feeds back into awareness. You can use either drawing. What matters is that all five stages are funded, measured, and owned.",
          },
          {
            question: "How long before I see results at each stage?",
            answer:
              "Conversion responds in days to weeks. Retention responds in weeks to months. Awareness and consideration typically need 3–6 months to show clear movement in leading indicators, and longer to show up in branded search and blended CAC.",
          },
          {
            question: "What's the single most common mistake?",
            answer:
              "Underfunding consideration. It is invisible in last-click reporting, so it gets cut first — and the cost shows up later as rising CPA in conversion campaigns and declining return-visit rates.",
          },
        ]}
        ctaTitle="Want a funnel that compounds, not leaks?"
        ctaBody="Let's audit every stage of your performance marketing funnel, plug the leaks, and shift spend toward the stages driving durable growth."
        ctaWhatsappMessage="I am interested in auditing my performance marketing funnel with Momentumm Media"
        related={[
          {
            slug: "attribution-modeling",
            category: "Growth",
            catCol: "#deb7ff",
            title: "How Attribution Modeling Changes Your Marketing Decisions",
          },
          {
            slug: "whatsapp-marketing-playbook",
            category: "Social",
            catCol: "#cdf200",
            title: "WhatsApp Marketing in 2026: A Complete Playbook",
          },
        ]}
      />
    </>
  );
}
