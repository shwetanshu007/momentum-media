"use client";

const logos: string[] = [
  ...Array.from({ length: 14 }, (_, i) => `/logos/${i + 1}.svg`),
  "/logos/extra-1.png",
  "/logos/extra-2.webp",
  "/logos/extra-3.png",
  "/logos/extra-4.jpg",
  "/logos/extra-5.png",
  "/logos/extra-6.png",
  "/logos/extra-7.png",
  "/logos/extra-8.png",
  "/logos/extra-9.jpeg",
  "/logos/extra-10.webp",
];

export default function SocialProof() {
  const track = [...logos, ...logos];

  return (
    <div
      className="py-12 overflow-hidden relative social-proof"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "#0e0e0f",
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0e0e0f, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0e0e0f, transparent)" }}
      />

      <p className="text-center label-s mb-8" style={{ color: "#c5c9ac" }}>
        Trusted by forward-thinking brands
      </p>

      <div className="marquee-track logo-marquee items-center">
        {track.map((src, i) => (
          <div
            key={i}
            className="logo-item flex items-center justify-center"
            aria-hidden={i >= logos.length ? "true" : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Client logo ${(i % logos.length) + 1}`}
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <style>{`
        .logo-marquee {
          gap: 3rem;
          animation-play-state: running;
        }
        .social-proof:hover .logo-marquee {
          animation-play-state: paused;
        }

        .logo-item {
          flex-shrink: 0;
          height: 56px;
          width: 140px;
          padding: 0 0.5rem;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .logo-item img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          filter: grayscale(100%) brightness(1.4) opacity(0.55);
          transition: filter 0.35s ease, transform 0.35s ease;
          pointer-events: none;
        }
        .logo-item:hover {
          transform: scale(1.08);
        }
        .logo-item:hover img {
          filter: grayscale(0%) brightness(1) opacity(1);
        }

        @media (min-width: 640px) {
          .logo-item { width: 160px; height: 64px; }
        }
      `}</style>
    </div>
  );
}
