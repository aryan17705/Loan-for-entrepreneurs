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
    },
    {
      step: "02",
      title: t("nav_calculator"),
      desc: t("calc_sub_rec"),
      href: "/calculator",
      cta: t("calc_title"),
    },
    {
      step: "03",
      title: t("nav_locator"),
      desc: t("loc_sub"),
      href: "/locator",
      cta: t("hero_cta_locate"),
    },
  ];

  const STATS = [
    { value: t("stat_1_val"), label: t("stat_1_lbl") },
    { value: t("stat_2_val"), label: t("stat_2_lbl") },
    { value: t("stat_3_val"), label: t("stat_3_lbl") },
    { value: t("stat_4_val"), label: t("stat_4_lbl") },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111827] antialiased">
      {/* =====================================================
          OFFICIAL INFORMATION STRIP
          ===================================================== */}
      <section className="border-b border-[#D7DEE8] bg-[#F7F9FC]">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-2 text-[11px] font-semibold text-[#526071] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>
            Ministry of Social Justice &amp; Empowerment
          </span>

          <span className="text-[#0F5FC5]">
            Smart India Hackathon Prototype · SIH26092
          </span>
        </div>
      </section>

      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="border-b border-[#D7DEE8] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">

            {/* Hero Copy */}
            <div>
              <div className="inline-flex items-center border border-[#E87512] bg-[#FFF7ED] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#B45309]">
                Government SC Loan Schemes
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.08] tracking-[-0.03em] text-[#111827] sm:text-5xl lg:text-6xl">
                {t("hero_title_1")}
                <br />
                <span className="text-[#0F5FC5]">
                  {t("hero_title_2")}
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-[#526071] sm:text-base sm:leading-8">
                {t("hero_desc")}
              </p>

              {/* Primary Actions */}
              <div className="mt-8 grid gap-3 sm:flex">
                <Link
                  href="/wizard"
                  className="inline-flex min-h-12 items-center justify-center border border-[#0F5FC5] bg-[#0F5FC5] px-7 text-sm font-extrabold text-white transition-colors hover:bg-[#0B4FA7] focus:outline-none focus:ring-2 focus:ring-[#0F5FC5] focus:ring-offset-2"
                >
                  {t("hero_cta_find")}
                </Link>

                <Link
                  href="/locator"
                  className="inline-flex min-h-12 items-center justify-center border border-[#B9C4D1] bg-white px-7 text-sm font-extrabold text-[#263244] transition-colors hover:border-[#0F5FC5] hover:bg-[#F3F7FC] hover:text-[#0F5FC5] focus:outline-none focus:ring-2 focus:ring-[#0F5FC5] focus:ring-offset-2"
                >
                  {t("hero_cta_locate")}
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#E5EAF0] pt-5 text-[11px] font-bold text-[#526071]">
                <span>✓ Eligibility-based matching</span>
                <span>✓ EMI calculation</span>
                <span>✓ Channel Partner locator</span>
              </div>
            </div>

            {/* Government Service Panel */}
            <div className="border border-[#CBD5E1] bg-[#F8FAFC]">
              <div className="border-b border-[#CBD5E1] bg-[#0F294A] px-5 py-4">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-white">
                  NIRVAAN Digital Services
                </p>
                <p className="mt-1 text-xs font-medium text-[#DCE7F5]">
                  One platform for scheme discovery and application preparation
                </p>
              </div>

              <div className="divide-y divide-[#D7DEE8] bg-white">
                <div className="flex items-start gap-4 p-5">
                  <span className="flex h-9 w-9 flex-none items-center justify-center border border-[#0F5FC5] bg-[#EFF6FF] text-xs font-black text-[#0F5FC5]">
                    01
                  </span>

                  <div>
                    <p className="text-sm font-extrabold text-[#111827]">
                      Find an eligible scheme
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#687587]">
                      Answer a few questions about your profile and loan requirement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5">
                  <span className="flex h-9 w-9 flex-none items-center justify-center border border-[#0F5FC5] bg-[#EFF6FF] text-xs font-black text-[#0F5FC5]">
                    02
                  </span>

                  <div>
                    <p className="text-sm font-extrabold text-[#111827]">
                      Understand your financing
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#687587]">
                      Estimate EMI, repayment and financing requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5">
                  <span className="flex h-9 w-9 flex-none items-center justify-center border border-[#E87512] bg-[#FFF7ED] text-xs font-black text-[#B45309]">
                    03
                  </span>

                  <div>
                    <p className="text-sm font-extrabold text-[#111827]">
                      Locate where to apply
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#687587]">
                      Find relevant Channel Partners and prepare your documents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#CBD5E1] bg-[#F8FAFC] p-4">
                <Link
                  href="/wizard"
                  className="flex min-h-11 items-center justify-center border border-[#0F5FC5] bg-white px-4 text-xs font-extrabold text-[#0F5FC5] transition-colors hover:bg-[#0F5FC5] hover:text-white"
                >
                  Start the eligibility journey →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          KEY SCHEME METRICS
          ===================================================== */}
      <section className="border-b border-[#D7DEE8] bg-[#F7F9FC]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#0F5FC5]">
              At a glance
            </p>

            <h2 className="mt-1 text-xl font-black text-[#111827]">
              Key financing information
            </h2>
          </div>

          <div className="grid grid-cols-1 border border-[#CBD5E1] bg-white sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, index) => (
              <div
                key={index}
                className="border-b border-[#D7DEE8] p-6 last:border-b-0 sm:nth-[2n]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <p className="text-2xl font-black tracking-tight text-[#0F5FC5] sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-2 max-w-[220px] text-xs font-semibold leading-5 text-[#5B6676]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CORE SERVICES
          ===================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">

          <div className="border-b border-[#CBD5E1] pb-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#E87512]">
                  {t("mod_badge")}
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-[#111827] sm:text-3xl">
                  {t("mod_title")}
                </h2>
              </div>

              <p className="max-w-md text-xs font-medium leading-5 text-[#687587] sm:text-right">
                {t("mod_sub")}
              </p>
            </div>
          </div>

          <div className="mt-8 grid border border-[#CBD5E1] bg-white md:grid-cols-3">
            {MODULES.map((module, index) => (
              <article
                key={module.step}
                className={`group flex min-h-[280px] flex-col p-6 transition-colors hover:bg-[#F8FAFC] sm:p-7 ${
                  index !== MODULES.length - 1
                    ? "border-b border-[#D7DEE8] md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-3xl font-black tracking-tight text-[#D7DEE8]">
                    {module.step}
                  </span>

                  <span className="border border-[#B9C4D1] bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#526071]">
                    Service
                  </span>
                </div>

                <h3 className="mt-7 text-lg font-black text-[#111827] transition-colors group-hover:text-[#0F5FC5]">
                  {module.title}
                </h3>

                <p className="mt-3 flex-1 text-sm font-medium leading-6 text-[#5B6676]">
                  {module.desc}
                </p>

                <Link
                  href={module.href}
                  className="mt-7 inline-flex min-h-10 items-center justify-between border-t border-[#D7DEE8] pt-4 text-xs font-extrabold text-[#0F5FC5] transition-colors hover:text-[#0B4FA7]"
                >
                  <span>{module.cta}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL ACTION PANEL
          ===================================================== */}
      <section className="border-t border-[#D7DEE8] bg-[#F7F9FC]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="border border-[#CBD5E1] bg-white">
            <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">

              <div className="p-6 sm:p-8">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#E87512]">
                  Ready to begin?
                </p>

                <h2 className="mt-2 text-xl font-black text-[#111827] sm:text-2xl">
                  Check which government scheme may fit your requirement.
                </h2>

                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#5B6676]">
                  Start with your basic details. NIRVAAN will guide you through
                  scheme matching, financing estimation and application preparation.
                </p>
              </div>

              <div className="border-t border-[#D7DEE8] p-5 lg:border-l lg:border-t-0 sm:p-8">
                <Link
                  href="/wizard"
                  className="flex min-h-12 min-w-[190px] items-center justify-center border border-[#0F5FC5] bg-[#0F5FC5] px-6 text-sm font-extrabold text-white transition-colors hover:bg-[#0B4FA7]"
                >
                  Find My Scheme →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
