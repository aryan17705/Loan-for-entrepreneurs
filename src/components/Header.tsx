"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/recommendation", label: "Schemes" },
  { href: "/locator", label: "Partners" },
  { href: "/checklist", label: "Resources" },
  { href: "/wizard", label: "How It Works" },
  { href: "/#about", label: "About Us" },
];

function NirvaanBrand() {
  return (
    <span className="inline-flex flex-col leading-none">
      <span className="nirvaan-wordmark text-[28px] font-extrabold tracking-[1px] text-[#102A43] sm:text-[31px]">
        NIRVAAN
      </span>

      <span className="mt-1 text-[8px] font-semibold tracking-[0.55px] text-[#5A6E85] sm:text-[9px]">
        India&apos;s Official Loan Assistance Portal
      </span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href.startsWith("/#")) {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#DCE4EC] bg-white">
      <div className="mx-auto flex min-h-[76px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label="NIRVAAN home"
          className="shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <NirvaanBrand />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-2 text-[13px] font-semibold transition-colors ${
                isActive(link.href)
                  ? "text-[#1769D2]"
                  : "text-[#243B53] hover:text-[#1769D2]"
              }`}
            >
              {link.label}

              {isActive(link.href) ? (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1769D2]" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href="/wizard"
            className="border border-[#1769D2] bg-[#1769D2] px-5 py-3 text-[12px] font-extrabold tracking-[0.3px] text-white transition-colors hover:bg-[#0F56B2]"
          >
            APPLICATION ASSISTANCE
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/#help"
            className="flex h-[52px] min-w-[68px] flex-col items-center justify-center border border-[#B9C9D8] bg-white px-3 text-[#102A43]"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="mb-0.5 h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M8 10a4 4 0 1 1 8 0" />
              <path d="M5 19v-3a7 7 0 0 1 14 0v3" />
              <path d="M3.5 19h4v-3.5h-4zM16.5 15.5h4V19h-4z" />
            </svg>
            <span className="text-[10px] font-bold">Help</span>
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-[52px] w-[48px] items-center justify-center border border-transparent bg-white text-[#102A43]"
          >
            <span className="flex w-7 flex-col gap-[5px]">
              <span className="block h-[2px] w-full bg-current" />
              <span className="block h-[2px] w-full bg-current" />
              <span className="block h-[2px] w-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-[#DCE4EC] bg-white lg:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex w-full max-w-[1440px] flex-col px-5 pb-5 pt-2 sm:px-8"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-[#E4EAF0] py-4 text-sm font-bold ${
                  isActive(link.href)
                    ? "text-[#1769D2]"
                    : "text-[#243B53]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/wizard"
              onClick={() => setMenuOpen(false)}
              className="mt-4 border border-[#1769D2] bg-[#1769D2] px-5 py-3.5 text-center text-xs font-extrabold tracking-[0.4px] text-white"
            >
              APPLICATION ASSISTANCE
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
