"use client";

import { FaInstagram } from "react-icons/fa6";
import { HiArrowUpRight } from "react-icons/hi2";
import { trackClick } from "@/lib/analytics";

const INSTAGRAM_HANDLE = "momentummmediaofficial";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

/**
 * Instagram feed preview.
 *
 * A fully "live" feed requires either (a) a server-side Instagram Graph API
 * integration with a long-lived access token, or (b) a third-party widget
 * service (EmbedSocial, Elfsight, etc.). For a no-backend setup we render a
 * branded preview grid that links every tile straight to the profile. Swap the
 * tile sources for real post URLs (or wire up the Graph API) when available.
 */
const previewTiles = [
  { gradient: "linear-gradient(135deg, #cdf200 0%, #9bd0cc 100%)", emoji: "" },
  { gradient: "linear-gradient(135deg, #9bd0cc 0%, #deb7ff 100%)", emoji: "" },
  { gradient: "linear-gradient(135deg, #deb7ff 0%, #cdf200 100%)", emoji: "" },
  { gradient: "linear-gradient(135deg, #1a2800 0%, #cdf200 100%)", emoji: "" },
  { gradient: "linear-gradient(135deg, #174f4b 0%, #9bd0cc 100%)", emoji: "" },
  { gradient: "linear-gradient(135deg, #2a1a3a 0%, #deb7ff 100%)", emoji: "" },
];

export default function InstagramFeed() {
  return (
    <section
      className="max-w-7xl mx-auto px-6 lg:px-8 py-12"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="label-m mb-2" style={{ color: "#c5c9ac", opacity: 0.5 }}>
            Latest on Instagram
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackClick({
                label: "Instagram handle",
                location: "ig-feed",
                destination: "instagram",
              })
            }
            className="inline-flex items-center gap-2 text-white hover:text-lime transition-colors group"
          >
            <FaInstagram size={18} style={{ color: "#cdf200" }} />
            <span className="title-m">@{INSTAGRAM_HANDLE}</span>
            <HiArrowUpRight
              size={14}
              className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              style={{ color: "#cdf200" }}
            />
          </a>
        </div>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackClick({
              label: "Follow on Instagram",
              location: "ig-feed",
              destination: "instagram",
            })
          }
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full label-m font-semibold transition-all duration-300 hover:scale-105 self-start sm:self-auto"
          style={{
            background: "rgba(205,242,0,0.1)",
            color: "#cdf200",
            border: "1px solid rgba(205,242,0,0.25)",
          }}
        >
          <FaInstagram size={14} />
          Follow on Instagram
        </a>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
        {previewTiles.map((tile, i) => (
          <a
            key={tile.gradient + i}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open @${INSTAGRAM_HANDLE} on Instagram`}
            onClick={() =>
              trackClick({
                label: `IG tile ${i + 1}`,
                location: "ig-feed-tiles",
                destination: "instagram",
              })
            }
            className="relative block aspect-square rounded-xl overflow-hidden group ig-tile"
            style={{ background: tile.gradient }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(10,10,11,0.7)" }}
            >
              <FaInstagram size={28} style={{ color: "#fff" }} />
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .ig-tile {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ig-tile:hover { transform: scale(1.04); }
      `}</style>
    </section>
  );
}
