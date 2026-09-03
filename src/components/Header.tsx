"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  useTranslation,
  LANGUAGES,
} from "@/context/LanguageContext";

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useTranslation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const langRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/", label: t("nav_home"), icon: "⌂" },
    { href: "/wizard", label: t("nav_wizard"), icon: "01" },
    { href: "/calculator", label: t("nav_calculator"), icon: "02" },
    { href: "/locator", label: t("nav_locator"), icon: "03" },
  ];

  /*
   * Load saved theme
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("nirvaan-theme");

    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  /*
   * Theme switch
   */
  const toggleTheme = () => {
    const nextDark = !darkMode;

    setDarkMode(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("nirvaan-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("nirvaan-theme", "light");
    }
  };

  /*
   * Close menus when route changes
   */
  useEffect(() => {
    setMobileMenuOpen(false);
    setLangMenuOpen(false);
  }, [pathname]);

  /*
   * Close language menu when clicking outside
   */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        langRef.current &&
        !langRef.current.contains(e.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const currentLang =
    LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#000000]/90 print:hidden">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20">

        {/* ================= LOGO ================= */}

        <Link
          href="/"
          className="group flex flex-none items-center"
        >
          <span className="text-[22px] font-black tracking-[-0.04em] text-[#111827] dark:text-white sm:text-[27px]">
            N<span className="text-[#1769D2]">I</span>RVAAN
          </span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                pathname === link.href
                  ? "text-[#1769D2]"
                  : "text-slate-600 hover:text-[#1769D2] dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ================= RIGHT TOOLBAR ================= */}

        <div className="flex items-center gap-2">

          {/* THEME SWITCH */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-10 w-10 items-center justify-center border border-slate-200 bg-white text-lg text-slate-700 transition hover:border-[#1769D2] hover:text-[#1769D2] dark:border-white/15 dark:bg-[#090909] dark:text-white dark:hover:border-[#1769D2]"
          >
            {darkMode ? "☀" : "☾"}
          </button>

          {/* LANGUAGE */}

          <div
            ref={langRef}
            className="relative z-50 hidden sm:block"
          >
            <button
              type="button"
              onClick={() =>
                setLangMenuOpen((open) => !open)
              }
              className="flex h-10 items-center gap-2 border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:border-[#1769D2] dark:border-white/15 dark:bg-[#090909] dark:text-white"
            >
              <span>{currentLang.flag}</span>
              <span>{currentLang.native}</span>
              <span className="text-[#1769D2]">
                {langMenuOpen ? "▲" : "▼"}
              </span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 border border-slate-200 bg-white p-1 shadow-xl dark:border-white/15 dark:bg-[#080808]">
                {LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => {
                      setLang(language.code);
                      setLangMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-xs font-bold transition ${
                      lang === language.code
                        ? "bg-[#1769D2] text-white"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{language.flag}</span>
                      <span>{language.native}</span>
                    </span>

                    <span className="text-[10px] opacity-60">
                      {language.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* START JOURNEY */}

          <Link
            href="/wizard"
            className="hidden h-10 items-center bg-[#1769D2] px-4 text-xs font-bold text-white transition hover:bg-[#1257B0] sm:flex"
          >
            START YOUR JOURNEY
          </Link>

          {/* MOBILE */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((open) => !open)
            }
            aria-label="Toggle navigation"
            className="flex h-10 w-10 items-center justify-center border border-slate-200 bg-white text-lg text-slate-800 dark:border-white/15 dark:bg-[#090909] dark:text-white md:hidden"
          >
            {mobileMenuOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-black md:hidden">
          <div className="flex flex-col">

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b border-slate-100 px-2 py-4 text-sm font-bold dark:border-white/10 ${
                  pathname === link.href
                    ? "text-[#1769D2]"
                    : "text-slate-700 dark:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/wizard"
              className="mt-4 bg-[#1769D2] px-4 py-3 text-center text-sm font-bold text-white"
            >
              START YOUR JOURNEY
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
