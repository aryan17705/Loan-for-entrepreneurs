"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/wizard",
      label: "Find My Scheme",
    },
    {
      href: "/calculator",
      label: "EMI Calculator",
    },
    {
      href: "/locator",
      label: "Partner Locator",
    },
    {
      href: "/checklist",
      label: "Checklist",
    },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D7DEE8] bg-white print:hidden">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* NIRVAAN Brand */}
        <Link
          href="/"
          className="flex flex-none items-center gap-3"
          aria-label="NIRVAAN home"
        >
          <span className="flex h-10 w-10 items-center justify-center border-2 border-[#0F5FC5] bg-white text-sm font-black tracking-tight text-[#0F5FC5]">
            N
          </span>

          <span className="text-lg font-black tracking-[0.08em] text-[#111827] sm:text-xl">
            NIRVAAN
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-stretch border border-[#D7DEE8] bg-white">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`border-r border-[#D7DEE8] px-4 py-3 text-sm font-semibold last:border-r-0 transition-colors ${
                  active
                    ? "bg-[#0F5FC5] text-white"
                    : "text-[#263244] hover:bg-[#F3F7FC] hover:text-[#0F5FC5]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/wizard"
            className="hidden sm:inline-flex border border-[#0F5FC5] bg-[#0F5FC5] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0B4FA7]"
          >
            Get Started
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
            className="inline-flex h-10 w-10 items-center justify-center border border-[#CBD5E1] bg-white text-[#111827] lg:hidden"
          >
            <span className="text-xl leading-none">
              {mobileMenuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-[#D7DEE8] bg-white lg:hidden">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block border-b border-[#E5EAF0] px-5 py-4 text-sm font-semibold ${
                  active
                    ? "bg-[#0F5FC5] text-white"
                    : "text-[#263244] hover:bg-[#F3F7FC]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
