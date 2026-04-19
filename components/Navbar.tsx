"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiBars3 as Menu, HiXMark as X } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import { trackLead, trackClick } from "@/lib/analytics";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass" : ""
      }`}
      style={scrolled ? { borderBottom: "1px solid rgba(255,255,255,0.06)" } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center group" aria-label="Momentumm Media — Home">
          <Image
            src="/momentumm-logo.png"
            alt="Momentumm Media"
            width={180}
            height={40}
            priority
            className="h-8 sm:h-10 w-auto object-contain"
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
        <div className="hidden lg:flex items-center gap-3">
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
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-2 rounded-xl glass text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden glass-strong px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="label-m text-body-alt hover:text-lime transition-colors py-1"
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
            className="text-center py-3 rounded-full font-black label-m inline-flex items-center justify-center gap-2"
            style={{ background: "#cdf200", color: "#1a2000" }}
          >
            <FaWhatsapp size={14} />
            Book Free Call
          </a>
        </div>
      )}
    </nav>
  );
}
