"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuoteStyleListener } from "./hero-layout-state";

const navLinks = [
  { label: "SERVICES", href: "/services" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "ABOUT", href: "/about" },
  { label: "BLOG", href: "/blog" },
  { label: "CAREERS", href: "/careers" },
];

function QuoteButton({ style, scrolled }: { style: ReturnType<typeof useQuoteStyleListener>; scrolled: boolean }) {
  const base = "hidden md:inline-flex items-center gap-2.5 font-black text-[13px] uppercase tracking-[0.12em] transition-all duration-200";
  const font = { fontFamily: "var(--font-nunito-sans)" };

  if (style === "amber-clip") return (
    <Link href="/contact" className={`${base} bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_28px_rgba(245,158,11,0.55)]`}
      style={{ ...font, clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}>
      Get a Quote
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  );

  if (style === "white-round") return (
    <Link href="/contact" className={`${base} rounded-full bg-white hover:bg-amber-300 text-black px-7 py-2.5`} style={font}>
      Get a Quote
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  );

  if (style === "outline-amber") return (
    <Link href="/contact"
      className={`${base} px-7 py-2.5 transition-all duration-300 ${
        scrolled
          ? "rounded-full border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black"
          : "rounded-full bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]"
      }`}
      style={font}>
      Get a Quote
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  );

  // glow-pulse
  return (
    <Link href="/contact" className={`${base} rounded-lg bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5`}
      style={{ ...font, boxShadow: "0 0 0 0 rgba(245,158,11,0.7)", animation: "glow-ping 2s ease-in-out infinite" }}>
      Get a Quote →
    </Link>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const quoteStyle = useQuoteStyleListener();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#07080f]/85 backdrop-blur-xl border-b border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="py-3">
        <div
          className="mx-auto flex items-center justify-between h-[70px]"
          style={{ width: "var(--layout-width, 75%)" }}
        >
          <Link href="/" className="shrink-0">
            <Image
              src="/video/logo/logo_td2.png"
              alt="TD Games"
              width={187}
              height={55}
              className="object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link transition-all duration-300 ${isActive ? "active-link" : "text-white"}`}
                  style={{
                    fontFamily: "var(--font-nunito-sans), sans-serif",
                    fontSize: "17px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    padding: "7px 14px",
                    margin: "0 5px",
                    lineHeight: 1,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <QuoteButton style={quoteStyle} scrolled={scrolled} />

            <button
              className="md:hidden flex flex-col gap-1.5 p-2.5 rounded-lg border border-white/14 bg-white/6"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="mx-5 mt-2 md:hidden rounded-2xl border border-white/12 bg-[#090a0f]/96 backdrop-blur-xl px-5 py-5 flex flex-col gap-2 shadow-[0_18px_36px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] ${
                  isActive ? "bg-amber-400/16 text-amber-200" : "text-white/80 hover:bg-white/8 hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-nav-display)" }}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-amber-300 px-6 py-3 text-sm font-black uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-nav-display)" }}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
