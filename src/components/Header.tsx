"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  {
    label: "How It Works",
    href: "/#how-it-works",
  },
  {
    label: "Scheme Recommender",
    href: "/recommendation",
  },
  {
    label: "Financial Calculator",
    href: "/calculator",
  },
  {
    label: "Partner Locator",
    href: "/locator",
  },
];

function NirvaanLogo() {
  return (
    <Link
      href="/"
      aria-label="NIRVAAN home"
      className="group inline-flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 460 70"
        width="184"
        height="28"
        role="img"
        aria-label="NIRVAAN"
        className="block h-8 w-auto sm:h-9"
      >
        <text
          x="0"
          y="44"
          fontFamily="system-ui, -apple-system, Inter, Segoe UI, Roboto, sans-serif"
          fontSize="44"
          fontWeight="700"
          letterSpacing="1.5px"
          fill="#002244"
        >
          NIRVAAN
        </text>

        <circle
          cx="232"
          cy="18"
          r="4.5"
          fill="#0077CC"
          style={{ borderRadius: "50%" }}
        />
      </svg>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.includes("#")) {
      return false;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };
    return (
    <header className="sticky top-0 z-50 border-b border-[#D9E0E7] bg-white">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <NirvaanLogo />

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-stretch md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative inline-flex min-h-[72px] items-center border-l border-[#E5EAF0] px-5 text-sm font-semibold transition-colors ${
                  active
                    ? "text-[#0077CC]"
                    : "text-[#374151] hover:bg-[#F7F9FB] hover:text-[#0077CC]"
                }`}
              >
                {item.label}

                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0077CC]"
                  />
                )}
              </Link>
            );
          })}

          <Link
            href="/wizard"
            className="ml-4 inline-flex min-h-[42px] self-center items-center justify-center border border-[#0077CC] bg-[#0077CC] px-5 text-sm font-bold text-white transition-colors hover:border-[#005FA3] hover:bg-[#005FA3]"
          >
            Start Application
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center border border-[#B9C4D1] bg-white text-[#002244] transition-colors hover:bg-[#F7F9FB] md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={2} />
          )}
        </button>
      </div>
            {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-[#D9E0E7] bg-white md:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-7xl px-4 sm:px-6"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex min-h-[52px] items-center border-b border-[#E5EAF0] px-1 text-sm font-semibold ${
                    active
                      ? "text-[#0077CC]"
                      : "text-[#374151] hover:text-[#0077CC]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/wizard"
              onClick={() => setMobileOpen(false)}
              className="my-4 flex min-h-[46px] items-center justify-center border border-[#0077CC] bg-[#0077CC] px-5 text-sm font-bold text-white transition-colors hover:bg-[#005FA3]"
            >
              Start Application
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
