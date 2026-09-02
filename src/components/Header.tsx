"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/recommendation", label: "Schemes" },
  { href: "/locator", label: "Partners" },
  { href: "/checklist", label: "Resources" },
  { href: "/wizard", label: "How It Works" },
  { href: "/#about", label: "About Us" },
];

function NirvaanLogo() {
  return (
    <span className="relative inline-flex items-center">
      <span className="nirvaan-wordmark text-[28px] leading-none text-[#102A43] sm:text-[32px]">
        NIRVAAN
      </span>

      <span
        aria-hidden="true"
        className="absolute -right-2.5 -top-1 h-2.5 w-2.5 bg-[#F47B20]"
      />
    </span>
  );
}

function isActiveLink(
  pathname: string,
  href: string
) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/#about") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#DCE4EC] bg-white print:hidden">
      <div className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label="NIRVAAN Home"
          className="flex flex-none items-center"
        >
          <NirvaanLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 xl:flex">
          {LINKS.map((link) => {
            const active = isActiveLink(
              pathname,
              link.href
            );

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex min-h-[78px] items-center px-1 text-[13px] font-semibold transition-colors ${
                  active
                    ? "text-[#102A43]"
                    : "text-[#526579] hover:text-[#1769D2]"
                }`}
              >
                {link.label}

                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1769D2]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Application Assistance */}
          <a
            href="#help"
            className="hidden min-h-11 items-center justify-center border border-[#1769D2] bg-white px-4 text-[12px] font-extrabold text-[#1769D2] transition-colors hover:bg-[#EFF6FF] sm:inline-flex"
          >
            <span aria-hidden="true" className="mr-2 text-base">
              +
            </span>
            Application Assistance
          </a>

          {/* Tablet Get Started */}
          <Link
            href="/wizard"
            className="hidden min-h-11 items-center justify-center border border-[#0758C7] bg-[#0758C7] px-5 text-[12px] font-extrabold text-white transition-colors hover:bg-[#064CA9] lg:inline-flex xl:hidden"
          >
            Get Started
          </Link>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() =>
              setMobileOpen((current) => !current)
            }
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center border border-[#C8D4E1] bg-white text-[#17324F] transition-colors hover:bg-[#F7F9FC] xl:hidden"
          >
            <span
              aria-hidden="true"
              className="text-xl leading-none"
            >
              {mobileOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen ? (
        <div className="border-t border-[#DCE4EC] bg-white xl:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-2 sm:px-8">
            {LINKS.map((link) => {
              const active = isActiveLink(
                pathname,
                link.href
              );

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex min-h-12 items-center border-b border-[#E5EBF1] px-2 text-sm font-semibold last:border-b-0 ${
                    active
                      ? "text-[#1769D2]"
                      : "text-[#3F5368]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Application Assistance */}
            <a
              href="#help"
              className="mb-3 mt-3 flex min-h-12 items-center justify-center border border-[#1769D2] bg-white px-4 text-xs font-extrabold text-[#1769D2] transition-colors hover:bg-[#EFF6FF]"
            >
              Application Assistance
            </a>

            {/* Mobile Start Button */}
            <Link
              href="/wizard"
              className="mb-3 flex min-h-12 items-center justify-center border border-[#0758C7] bg-[#0758C7] px-4 text-xs font-extrabold text-white transition-colors hover:bg-[#064CA9]"
            >
              Start My Journey
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
