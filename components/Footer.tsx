"use client";

import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineEnvelope as Mail,
  HiOutlinePhone as Phone,
  HiOutlineMapPin as MapPin,
  HiArrowUpRight,
} from "react-icons/hi2";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";
import InstagramFeed from "./InstagramFeed";
import { trackLead, trackContact, trackClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "919408266131";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Momentumm Media! I'd like to book a free discovery call to discuss my brand's growth."
)}`;

const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61577933943193";
const INSTAGRAM_URL = "https://www.instagram.com/momentummmediaofficial/";
const MAPS_URL = "https://share.google/kxwR72iJ29UZqECup";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
];

const serviceLinks = [
  "Strategy & Branding",
  "Digital Marketing",
  "Performance Marketing",
  "Social Media & Content",
  "Community & Reputation",
  "Training & Consulting",
];

interface Social {
  Icon: IconType;
  href: string;
  label: string;
}

const socials: Social[] = [
  { Icon: FaWhatsapp, href: WHATSAPP_URL, label: "WhatsApp" },
  { Icon: FaFacebookF, href: FACEBOOK_URL, label: "Facebook" },
  { Icon: FaInstagram, href: INSTAGRAM_URL, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0b" }}>
      {/* Teaser line */}
      <div
        className="py-8 px-6 lg:px-8 text-center"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="body-m" style={{ color: "#c5c9ac" }}>
          If you&apos;ve come this far, you&apos;re serious about growth.{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackLead({
                label: "Let's make it happen",
                location: "footer-teaser",
                destination: "whatsapp",
              })
            }
            className="font-semibold transition-colors hover:text-white"
            style={{ color: "#cdf200" }}
          >
            Let&apos;s make it happen →
          </a>
        </p>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-block mb-5">
            <Image
              src="/momentumm-logo.png"
              alt="Momentumm Media"
              width={180}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <p className="body-s leading-relaxed mb-6" style={{ color: "#c5c9ac" }}>
            High-octane digital strategy for brands that refuse to stand still.
            Data-backed execution, strategic rigor, transparent partnership.
          </p>
          <div className="flex gap-2.5">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onClick={() =>
                  (label === "WhatsApp" ? trackLead : trackClick)({
                    label: `Social: ${label}`,
                    location: "footer-socials",
                    destination: label.toLowerCase(),
                  })
                }
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.06)", color: "#c5c9ac" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(205,242,0,0.14)";
                  (e.currentTarget as HTMLElement).style.color = "#cdf200";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.color = "#c5c9ac";
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="label-m mb-5" style={{ color: "#c5c9ac", opacity: 0.5 }}>
            Quick Links
          </p>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="body-s transition-colors hover:text-white flex items-center gap-2 group"
                  style={{ color: "#c5c9ac" }}
                >
                  <span
                    className="w-0 h-px transition-all duration-200 group-hover:w-3"
                    style={{ background: "#cdf200" }}
                  />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <p className="label-m mb-5" style={{ color: "#c5c9ac", opacity: 0.5 }}>
            Services
          </p>
          <ul className="space-y-3">
            {serviceLinks.map((s) => (
              <li key={s}>
                <Link
                  href="/services"
                  className="body-s transition-colors hover:text-white"
                  style={{ color: "#c5c9ac" }}
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="label-m mb-5" style={{ color: "#c5c9ac", opacity: 0.5 }}>
            Contact
          </p>
          <ul className="space-y-4 mb-6">
            <li>
              <a
                href="mailto:momentummmediaofficial@gmail.com"
                onClick={() =>
                  trackContact({
                    label: "Email",
                    location: "footer-contact",
                    destination: "email",
                  })
                }
                className="flex items-start gap-3 body-s transition-colors hover:text-white"
                style={{ color: "#c5c9ac" }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <Mail size={13} />
                </div>
                momentummmediaofficial@gmail.com
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackLead({
                    label: "Phone / WhatsApp number",
                    location: "footer-contact",
                    destination: "whatsapp",
                  })
                }
                className="flex items-start gap-3 body-s transition-colors hover:text-white"
                style={{ color: "#c5c9ac" }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <Phone size={13} />
                </div>
                +91 94082 66131
              </a>
            </li>
            <li>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackClick({
                    label: "Address / Maps",
                    location: "footer-contact",
                    destination: "google-maps",
                  })
                }
                className="flex items-start gap-3 body-s transition-colors hover:text-white group"
                style={{ color: "#c5c9ac" }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <MapPin size={13} />
                </div>
                <span className="flex items-center gap-1">
                  Ahmedabad, India
                  <HiArrowUpRight
                    size={11}
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </span>
              </a>
            </li>
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackLead({
                label: "Book Free Call",
                location: "footer-contact",
                destination: "whatsapp",
              })
            }
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full label-m font-bold transition-all hover:scale-105"
            style={{ background: "#cdf200", color: "#1a2000" }}
          >
            <FaWhatsapp size={14} />
            Book Free Call
          </a>
        </div>
      </div>

      {/* Instagram feed */}
      <InstagramFeed />

      {/* Bottom bar */}
      <div
        className="py-5 px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="body-s text-center sm:text-left" style={{ color: "#c5c9ac", opacity: 0.5 }}>
          © {new Date().getFullYear()} Momentumm Media. All rights reserved.
        </p>
        <div className="flex gap-4">
          {["Privacy Policy", "Terms of Service"].map((l) => (
            <a
              key={l}
              href="#"
              className="body-s transition-colors hover:text-white"
              style={{ color: "#c5c9ac", opacity: 0.5 }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
