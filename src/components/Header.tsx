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
  { href: "/about", label: "About Us" },
];

function NirvaanBrand() {
  return (
    <span className="inline-flex flex-col leading-none">
      <span className="nirvaan-wordmark text-[27px] font-extrabold tracking-[1px] sm:text-[31px]">
        N<span className="nirvaan-logo-i">I</span>RVAAN
      </span>

      <span className="nirvaan-logo-subtitle mt-1 text-[8px] font-semibold tracking-[0.55px] sm:text-[9px]">
        India&apos;s Official Loan Assistance Portal
      </span>
    </span>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nirvaan-theme");

    if (saved === "dark") {
      setDark(true);
      document.documentElement.dataset.theme = "dark";
    } else {
      setDark(false);
      document.documentElement.dataset.theme = "light";
    }
  }, []);

  const toggleTheme = () => {
    const next = !dark;

    setDark(next);

    document.documentElement.dataset.theme = next
      ? "dark"
      : "light";

    localStorage.setItem(
      "nirvaan-theme",
      next ? "dark" : "light"
    );
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return false;
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="nirvaan-header sticky top-0 z-50 w-full border-b">
      <div className="mx-auto flex min-h-[78px] w-full max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label="NIRVAAN Home"
          className="shrink-0"
          onClick={closeMenu}
        >
          <NirvaanBrand />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {LINKS.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className={`nirvaan-nav-link whitespace-nowrap text-[12px] font-semibold tracking-[0.15px] ${
                isActive(link.href)
                  ? "nirvaan-nav-link-active"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              dark
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            className="nirvaan-secondary min-h-[40px] w-[40px] p-0"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link
            href="/wizard"
            className="nirvaan-primary min-h-[40px] px-4 text-[11px]"
          >
            APPLICATION ASSISTANCE
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              dark
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            className="nirvaan-secondary flex h-[40px] w-[40px] items-center justify-center p-0"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={
              menuOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={menuOpen}
            className="nirvaan-secondary flex h-[40px] w-[40px] items-center justify-center p-0"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t xl:hidden">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-4 sm:px-8">
            <nav className="flex flex-col">
              {LINKS.map((link) => (
                <Link
                  key={`mobile-${link.label}-${link.href}`}
                  href={link.href}
                  onClick={closeMenu}
                  className="nirvaan-nav-link border-b py-4 text-[12px] font-semibold last:border-b-0"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/wizard"
                onClick={closeMenu}
                className="nirvaan-primary mt-4 w-full text-[11px]"
              >
                APPLICATION ASSISTANCE
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
