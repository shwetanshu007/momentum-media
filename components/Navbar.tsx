"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiBars3 as Menu, HiXMark as X } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import { trackLead, trackClick } from "@/lib/analytics";
import Magnetic from "./ui/Magnetic";

const WHATSAPP_URL = `https://wa.me/919408266131?text=${encodeURIComponent(
  "Hi Momentumm Media! I'd like to book a free discovery call to discuss my brand's growth."
)}`;

const links = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    // Deepen the glass once past the hero on the homepage; past the header elsewhere.
    const glassAt = () =>
      pathname === "/" ? window.innerHeight * 0.85 : 80;

    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > glassAt());
      // Hide on scroll down, reveal on scroll up (never while menu is open).
      setHidden(y > lastY.current && y > 160 && !open);
      lastY.current = y;
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [pathname, open]);

  return (
    <nav
      className="site-nav fixed top-0 left-0 right-0 z-50 transition-transform duration-500"
      style={{ transform: hidden ? "translateY(calc(-100% - 1rem))" : "translateY(0)" }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3">
        {/* Floating liquid-glass bar */}
        <div
          className={`liquid-glass ${scrolled ? "liquid-glass-strong" : ""} rounded-2xl sm:rounded-full flex items-center justify-between pl-4 pr-3 sm:pl-6 sm:pr-2.5 py-2.5 transition-colors duration-500`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group py-0.5" aria-label="Momentumm Media — Home">
            <Image

  src="/momentumm-logo.png"

  alt="Momentumm Media"

  width={180}

  height={40}

  priority

  className="h-7 sm:h-9 w-auto object-contain"

/>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() =>
                  trackClick({
                    label: `Nav: ${l.label}`,
                    location: "navbar",
                    destination: l.href,
                  })
                }
                className="label-m text-body-alt hover:text-white transition-colors duration-200"
                style={{ color: "#c5c9ac" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Magnetic strength={0.3} radius={40}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackLead({
                    label: "Book Free Call",
                    location: "navbar-desktop",
                    destination: "whatsapp",
                  })
                }
                className="label-m px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                style={{
                  background: "#cdf200",
                  color: "#1a2000",
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                <FaWhatsapp size={14} />
                Book Free Call
              </a>
            </Magnetic>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2.5 rounded-xl text-white"
            style={{ background: "rgba(255,255,255,0.07)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu — same floating glass language */}
        {open && (
          <div className="lg:hidden liquid-glass liquid-glass-strong rounded-2xl mt-2 px-5 py-5 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="label-m hover:text-white transition-colors py-3 px-2 rounded-lg"
                style={{ color: "#c5c9ac" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackLead({
                  label: "Book Free Call",
                  location: "navbar-mobile",
                  destination: "whatsapp",
                });
                setOpen(false);
              }}
              className="text-center mt-3 py-3.5 rounded-full font-black label-m inline-flex items-center justify-center gap-2"
              style={{ background: "#cdf200", color: "#1a2000" }}
            >
              <FaWhatsapp size={14} />
              Book Free Call
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
