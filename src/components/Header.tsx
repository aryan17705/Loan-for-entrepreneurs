"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const LINKS = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/wizard",
    label: "How It Works",
  },
  {
    href: "/recommendation",
    label: "Schemes",
  },
  {
    href: "/locator",
    label: "Partners",
  },
  {
    href: "/checklist",
    label: "Resources",
  },
];

function NirvaanLogo() {
  return (
    <span className="relative inline-flex items-center">
      <span className="nirvaan-wordmark text-[27px] leading-none text-[#102A43] sm:text-[30px]">
        NIRVAAN
      </span>

      <span className="absolute -right-2 -top-1 h-2.5 w-2.5 bg-[#F47B20]" />
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] =
    useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E1E8EF] bg-white print:hidden">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex flex-none items-center"
          aria-label="NIRVAAN Home"
        >
          <NirvaanLogo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(
                    link.href
                  );

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-7 text-[13px] font-semibold transition ${
                  active
                    ? "text-[#102A43]"
                    : "text-[#4E6176] hover:text-[#1769D2]"
                }`}
              >
                {link.label}

                {active ? (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1769D2]" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#help"
            className="hidden min-h-11 items-center gap-2 border border-[#1769D2] bg-white px-4 text-xs font-extrabold text-[#1769D2] transition hover:bg-[#EFF6FF] sm:inline-flex"
          >
            <span className="text-sm">♧</span>
            Application Assistance
          </a>

          <Link
            href="/wizard"
            className="hidden min-h-11 items-center justify-center border border-[#0758C7] bg-[#0758C7] px-5 text-xs font-extrabold text-white hover:bg-[#064CA9] md:inline-flex lg:hidden"
          >
            Get Started
          </Link>

          <button
            type="button"
            onClick={() =>
              setMobileOpen(
                (current) => !current
              )
            }
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center border border-[#C8D4E1] bg-white text-[#17324F] lg:hidden"
          >
            {mobileOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[#E1E8EF] bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
            {LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(
                      link.href
                    );

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex min-h-12 items-center border-b border-[#E7EDF3] px-2 text-sm font-semibold last:border-b-0 ${
                    active
                      ? "text-[#1769D2]"
                      : "text-[#3F5368]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <a
              href="#help"
              className="mt-3 flex min-h-12 items-center justify-center border border-[#1769D2] text-xs font-extrabold text-[#1769D2]"
            >
              Application Assistance
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
