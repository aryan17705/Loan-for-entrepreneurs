"use client";

import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useTranslation();

  const MODULES = [
    {
      step: "01",
      title: t("nav_wizard"),
      desc: t("wiz_sub_1"),
      href: "/wizard",
      cta: t("hero_cta_find"),
      icon: "01",
    },
    {
      step: "02",
      title: t("nav_calculator"),
      desc: t("calc_sub_rec"),
      href: "/calculator",
      cta: t("calc_title"),
      icon: "02",
    },
    {
      step: "03",
      title: t("nav_locator"),
      desc: t("loc_sub"),
      href: "/locator",
      cta: t("hero_cta_locate"),
      icon: "03",
    },
  ];

  const STATS = [
    {
      value: t("stat_1_val"),
      label: t("stat_1_lbl"),
    },
    {
      value: t("stat_2_val"),
      label: t("stat_2_lbl"),
    },
    {
      value: t("stat_3_val"),
      label: t("stat_3_lbl"),
    },
    {
      value: t("stat_4_val"),
      label: t("stat_4_lbl"),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-black dark:text-white">

      {/* =====================================================
          GOVERNMENT STYLE TOP STRIP
          ===================================================== */}

      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-[11px] dark:border-white/10 dark:bg-[#050505]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 text-slate-600 dark:text-slate-400">
          <span>
            Ministry of Social Justice & Empowerment
          </span>

          <span>
            Smart India Hackathon Prototype · SIH26092
          </span>
        </div>
      </div>

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/10">

        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 md:grid-cols-2 md:py-20 lg:px-10">

          {/* LEFT */}

          <div className="relative z-10">

            <div className="mb-5 inline-flex items-center gap-3 border border-[#1769D2]/30 bg-[#1769D2]/5 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1769D2] dark:bg-[#1769D2]/10">
              <span className="h-1.5 w-7 bg-[#F97316]" />
              {t("hero_badge")}
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              {t("hero_title_1")}
              <br />
              <span className="text-[#1769D2]">
                {t("hero_title_2")}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm font-medium leading-7 text-slate-600 sm:text-base dark:text-slate-400">
              {t("hero_desc")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/wizard"
                className="inline-flex h-12 items-center justify-center bg-[#1769D2] px-7 text-sm font-bold text-white transition hover:bg-[#1257B0]"
              >
                {t("hero_cta_find")}
                <span className="ml-3 text-lg">→</span>
              </Link>

              <Link
                href="/locator"
                className="inline-flex h-12 items-center justify-center border border-slate-300 bg-white px-7 text-sm font-bold text-slate-700 transition hover:border-[#1769D2] hover:text-[#1769D2] dark:border-white/15 dark:bg-black dark:text-white"
              >
                {t("hero_cta_locate")}
              </Link>

            </div>
          </div>

          {/* RIGHT INDIA ILLUSTRATION */}

          <div className="relative flex min-h-[360px] items-center justify-center md:min-h-[500px]">

            <div className="nirvaan-map-glow right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2" />

            <img
              src="/nirvaan-india-illustration.png"
              alt="India map with financial network and partner locations"
              className="nirvaan-hero-image relative z-10 h-auto w-full max-w-[700px] object-contain"
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          STATS
          ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">

        <div className="grid grid-cols-2 border border-slate-200 bg-white md:grid-cols-4 dark:border-white/10 dark:bg-[#050505]">

          {STATS.map((stat, index) => (
            <div
              key={index}
              className="border-b border-slate-200 px-5 py-7 text-center md:border-b-0 md:border-r last:md:border-r-0 dark:border-white/10"
            >
              <p className="text-2xl font-black text-[#1769D2] sm:text-3xl">
                {stat.value}
              </p>

              <p className="mt-2 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* =====================================================
          MODULES
          ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">

        <div className="border-b border-slate-200 pb-6 dark:border-white/10">

          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-[#1769D2]">
            <span className="h-1.5 w-8 bg-[#F97316]" />
            {t("mod_badge")}
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
            {t("mod_title")}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            {t("mod_sub")}
          </p>

        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">

          {MODULES.map((module) => (
            <div
              key={module.step}
              className="group flex min-h-[250px] flex-col border border-slate-200 bg-white p-6 transition hover:border-[#1769D2] dark:border-white/10 dark:bg-[#050505]"
            >

              <div className="flex items-center justify-between">

                <span className="text-sm font-black text-[#1769D2]">
                  {module.step}
                </span>

                <span className="border border-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:text-slate-400">
                  MODULE
                </span>

              </div>

              <h3 className="mt-10 text-xl font-black">
                {module.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {module.desc}
              </p>

              <Link
                href={module.href}
                className="mt-6 inline-flex items-center text-sm font-bold text-[#1769D2] hover:text-[#1257B0]"
              >
                {module.cta}
                <span className="ml-2">→</span>
              </Link>

            </div>
          ))}

        </div>

      </section>

      {/* =====================================================
          NIRVAAN STATEMENT
          ONLY ONE TIME ON HOMEPAGE
          ===================================================== */}

      <section className="border-t border-slate-200 bg-slate-50 px-5 py-10 dark:border-white/10 dark:bg-[#050505]">

        <div className="mx-auto max-w-5xl">

          <p className="border-l-4 border-[#1769D2] pl-5 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
            NIRVAAN is an India&apos;s Official platform for discovering government loan schemes, understanding your financial support options.
          </p>

        </div>

      </section>

    </div>
  );
}
