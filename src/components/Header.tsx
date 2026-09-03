"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#journey", label: "Schemes" },
  { href: "/#journey", label: "Partners" },
  { href: "/#about", label: "Resources" },
  { href: "/#journey", label: "How It Works" },
  { href: "/#about", label: "About Us" },
];

function NirvaanBrand() {
  return (
    <Link href="/" className="flex flex-none items-center">
      <span className="text-[22px] font-black tracking-[-0.04em] text-[#111827] sm:text-[27px]">
        N<span className="text-[#1769D2]">I</span>RVAAN
      </span>

      <span className="ml-3 hidden border-l border-[#d7dee8] pl-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#5b6676] lg:block">
        India&apos;s Official Loan Assistance Portal
      </span>
    </Link>
  );
}

function SunIcon() {
  return <span aria-hidden="true">☀</span>;
}

function MoonIcon() {
  return <span aria-hidden="true">☾</span>;
}

function MenuIcon({ open }: { open: boolean }) {
  return <span aria-hidden="true">{open ? "×" : "☰"}</span>;
}

export default function Header() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("nirvaan-theme");
    const shouldUseDark = savedTheme === "dark";

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setDarkMode(shouldUseDark);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const nextDark = !darkMode;

    setDarkMode(nextDark);

    document.documentElement.classList.toggle("dark", nextDark);

    localStorage.setItem(
      "nirvaan-theme",
      nextDark ? "dark" : "light"
    );
  };

  return (
    <header className="nirvaan-header sticky top-0 z-50 w-full border-b border-[#d7dee8] bg-white print:hidden dark:border-white/10 dark:bg-[#090909]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">

        <NirvaanBrand />

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href.startsWith("/#")
                  ? pathname === "/"
                  : pathname === link.href;

            return (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={`nirvaan-nav-link px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-[#1769D2]"
                    : "text-[#374151] hover:text-[#1769D2] dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT TOOLBAR */}
        <div className="flex items-center gap-2">

          {/* THEME TOGGLE */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="nirvaan-theme-toggle flex h-10 w-10 items-center justify-center border border-[#d7dee8] bg-white text-base text-[#374151] transition hover:border-[#1769D2] hover:text-[#1769D2] dark:border-white/15 dark:bg-[#090909] dark:text-white"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* START YOUR JOURNEY */}
          <Link
            href="/wizard"
            className="nirvaan-primary hidden h-10 items-center bg-[#1769D2] px-4 text-xs font-bold text-white transition hover:bg-[#1257B0] sm:flex"
          >
            START YOUR JOURNEY
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((open) => !open)
            }
            aria-label="Toggle navigation"
            className="flex h-10 w-10 items-center justify-center border border-[#d7dee8] bg-white text-lg text-[#374151] dark:border-white/15 dark:bg-[#090909] dark:text-white md:hidden"
          >
            <MenuIcon open={mobileMenuOpen} />
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="border-t border-[#d7dee8] bg-white px-4 py-4 dark:border-white/10 dark:bg-[#090909] md:hidden">

          <nav className="flex flex-col">

            {LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("/#")
                    ? pathname === "/"
                    : pathname === link.href;

              return (
                <Link
                  key={`${link.href}-mobile-${link.label}`}
                  href={link.href}
                  className={`border-b border-[#e8edf3] px-2 py-4 text-sm font-bold dark:border-white/10 ${
                    isActive
                      ? "text-[#1769D2]"
                      : "text-[#374151] dark:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/wizard"
              className="nirvaan-primary mt-4 bg-[#1769D2] px-4 py-3 text-center text-sm font-bold text-white"
            >
              START YOUR JOURNEY
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}
