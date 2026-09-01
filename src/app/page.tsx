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
      accent: "blue",
    },
    {
      step: "02",
      title: t("nav_calculator"),
      desc: t("calc_sub_rec"),
      href: "/calculator",
      cta: t("calc_title"),
      accent: "blue",
    },
    {
      step: "03",
      title: t("nav_locator"),
      desc: t("loc_sub"),
      href: "/locator",
      cta: t("hero_cta_locate"),
      accent: "orange",
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

  const JOURNEY = [
    {
      step: "01",
      title: "Build your profile",
      desc: "Tell NIRVAAN about your location, income, activity and funding requirement.",
    },
    {
      step: "02",
      title: "Get matched",
      desc: "Receive scheme recommendations based on your eligibility and stated requirements.",
    },
    {
      step: "03",
      title: "Prepare to apply",
      desc: "Understand financing, documents and the next steps before visiting a partner.",
    },
    {
      step: "04",
      title: "Find a partner",
      desc: "Locate relevant partner offices and get directions for your application.",
    },
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
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-stretch gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
            {/* Hero Copy */}
            <div className="flex flex-col justify-center border-l-4 border-[#0F5FC5] pl-5 sm:pl-7">
              <div className="inline-flex w-fit items-center border border-[#E87512] bg-[#FFF7ED] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#B45309]">
                Government SC Loan Schemes
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.06] tracking-[-0.035em] text-[#111827] sm:text-5xl lg:text-6xl">
                {t("hero_title_1")}
                <br />
                <span className="text-[#0F5FC5]">
                  {t("hero_title_2")}
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-[#526071] sm:text-base sm:leading-8">
                {t("hero_desc")}
              </p>

              {/* Primary Actions */}
              <div className="mt-7 grid gap-3 sm:flex">
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
              <div className="mt-7 grid grid-cols-1 border-t border-[#E5EAF0] pt-4 text-[11px] font-bold text-[#526071] sm:grid-cols-3">
                <div className="border-b border-[#E5EAF0] py-2 sm:border-b-0 sm:border-r sm:pr-4">
                  <span className="text-[#0F5FC5]">✓</span>{" "}
                  Eligibility matching
                </div>

                <div className="border-b border-[#E5EAF0] py-2 sm:border-b-0 sm:px-4 sm:border-r">
                  <span className="text-[#0F5FC5]">✓</span>{" "}
                  EMI calculation
                </div>

                <div className="py-2 sm:pl-4">
                  <span className="text-[#E87512]">✓</span>{" "}
                  Partner locator
                </div>
              </div>
            </div>

            {/* Government Service Panel */}
            <div className="border border-[#CBD5E1] bg-[#F8FAFC]">
              <div className="border-b border-[#CBD5E1] bg-[#0F294A] px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-white">
                      NIRVAAN Digital Services
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#DCE7F5]">
                      One platform for scheme discovery and application preparation
                    </p>
                  </div>

                  <span className="border border-[#5D7897] px-2 py-1 text-[10px] font-extrabold text-[#DCE7F5]">
                    03 SERVICES
                  </span>
                </div>
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
            <section className="border-b border-[#D7DEE8] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid border border-[#CBD5E1] sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`px-5 py-6 ${
                  index < STATS.length - 1
                    ? "border-b border-[#D7DEE8] sm:border-r lg:border-b-0"
                    : ""
                } ${
                  index === 1
                    ? "sm:border-r-0 lg:border-r"
                    : ""
                }`}
              >
                <p className="text-2xl font-black tracking-[-0.02em] text-[#0F5FC5] sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.07em] text-[#687587]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#D7DEE8] bg-[#F7F9FC]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col gap-3 border-l-4 border-[#E87512] pl-5 sm:flex-row sm:items-end sm:justify-between sm:pl-6">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#B45309]">
                How NIRVAAN works
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.025em] text-[#111827] sm:text-3xl">
                From eligibility to application
              </h2>
            </div>

            <p className="max-w-xl text-sm font-medium leading-6 text-[#687587]">
              A focused four-step journey designed to help applicants
              understand their options before approaching a lending partner.
            </p>
          </div>

          <div className="mt-8 grid border border-[#CBD5E1] bg-white md:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((item, index) => (
              <div
                key={item.step}
                className={`relative p-5 sm:p-6 ${
                  index < JOURNEY.length - 1
                    ? "border-b border-[#D7DEE8] lg:border-b-0 lg:border-r"
                    : ""
                } ${
                  index === 1
                    ? "md:border-r-0 lg:border-r"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-9 w-9 items-center justify-center border text-xs font-black ${
                      index === 3
                        ? "border-[#E87512] bg-[#FFF7ED] text-[#B45309]"
                        : "border-[#0F5FC5] bg-[#EFF6FF] text-[#0F5FC5]"
                    }`}
                  >
                    {item.step}
                  </span>

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#9AA5B3]">
                    Step {item.step}
                  </span>
                </div>

                <h3 className="mt-6 text-base font-extrabold text-[#111827]">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs font-medium leading-6 text-[#687587]">
                  {item.desc}
                </p>

                {index < JOURNEY.length - 1 && (
                  <div className="mt-6 hidden text-right text-xs font-black text-[#B9C4D1] lg:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#D7DEE8] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0F5FC5]">
                Built for applicants
              </p>

              <h2 className="mt-3 max-w-xl text-2xl font-black leading-tight tracking-[-0.025em] text-[#111827] sm:text-3xl">
                Less searching.
                <br />
                More clarity.
              </h2>

              <p className="mt-4 max-w-lg text-sm font-medium leading-7 text-[#687587]">
                NIRVAAN brings scheme discovery, financing estimates and
                partner information into one structured workflow.
              </p>

              <div className="mt-6 border border-[#CBD5E1] bg-[#F8FAFC] p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#526071]">
                  Designed around three questions
                </p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm font-black text-[#0F5FC5]">
                      01
                    </span>
                    <p className="text-xs font-semibold leading-5 text-[#263244]">
                      Which schemes may I be eligible for?
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm font-black text-[#0F5FC5]">
                      02
                    </span>
                    <p className="text-xs font-semibold leading-5 text-[#263244]">
                      What could my financing and EMI look like?
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm font-black text-[#E87512]">
                      03
                    </span>
                    <p className="text-xs font-semibold leading-5 text-[#263244]">
                      Where can I find a relevant partner?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid border border-[#CBD5E1] sm:grid-cols-2">
              {MODULES.map((module, index) => (
                <Link
                  key={module.href}
                  href={module.href}
                  className={`group flex min-h-[230px] flex-col justify-between bg-white p-6 transition-colors hover:bg-[#F7F9FC] ${
                    index === 0
                      ? "border-b border-[#D7DEE8] sm:border-r"
                      : index === 1
                        ? "border-b border-[#D7DEE8]"
                        : "sm:col-span-2"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-9 w-9 items-center justify-center border text-xs font-black ${
                          module.accent === "orange"
                            ? "border-[#E87512] bg-[#FFF7ED] text-[#B45309]"
                            : "border-[#0F5FC5] bg-[#EFF6FF] text-[#0F5FC5]"
                        }`}
                      >
                        {module.step}
                      </span>

                      <span className="text-lg font-light text-[#B9C4D1] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>

                    <h3 className="mt-7 text-lg font-extrabold text-[#111827]">
                      {module.title}
                    </h3>

                    <p className="mt-2 max-w-md text-xs font-medium leading-6 text-[#687587]">
                      {module.desc}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-[#E5EAF0] pt-4 text-xs font-extrabold text-[#0F5FC5]">
                    {module.cta}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
            <section className="border-b border-[#D7DEE8] bg-[#F7F9FC]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div className="border border-[#CBD5E1] bg-white">
              <div className="border-b border-[#CBD5E1] bg-[#0F294A] px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-white">
                      Financing at a glance
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#DCE7F5]">
                      Key figures presented through the NIRVAAN service
                    </p>
                  </div>

                  <span className="w-fit border border-[#5D7897] px-2 py-1 text-[10px] font-extrabold text-[#DCE7F5]">
                    INFORMATION
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2">
                <div className="border-b border-[#D7DEE8] p-5 sm:border-r sm:p-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#687587]">
                    Eligible income
                  </p>
                  <p className="mt-3 text-2xl font-black tracking-[-0.025em] text-[#111827]">
                    Up to ₹5 lakh
                  </p>
                  <p className="mt-2 text-xs font-medium leading-5 text-[#687587]">
                    Family income threshold used for relevant scheme
                    eligibility.
                  </p>
                </div>

                <div className="border-b border-[#D7DEE8] p-5 sm:p-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#687587]">
                    Scheme discovery
                  </p>
                  <p className="mt-3 text-2xl font-black tracking-[-0.025em] text-[#0F5FC5]">
                    AI-assisted
                  </p>
                  <p className="mt-2 text-xs font-medium leading-5 text-[#687587]">
                    Recommendations are generated from the applicant profile
                    and requirements.
                  </p>
                </div>

                <div className="p-5 sm:border-r sm:p-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#687587]">
                    Repayment planning
                  </p>
                  <p className="mt-3 text-2xl font-black tracking-[-0.025em] text-[#111827]">
                    EMI estimate
                  </p>
                  <p className="mt-2 text-xs font-medium leading-5 text-[#687587]">
                    Use the calculator to understand approximate monthly
                    repayment.
                  </p>
                </div>

                <div className="border-t border-[#D7DEE8] p-5 sm:p-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#687587]">
                    Partner discovery
                  </p>
                  <p className="mt-3 text-2xl font-black tracking-[-0.025em] text-[#E87512]">
                    District-wise
                  </p>
                  <p className="mt-2 text-xs font-medium leading-5 text-[#687587]">
                    Search relevant Channel Partners by scheme, type and
                    district.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-[#CBD5E1] bg-white">
              <div className="border-b border-[#CBD5E1] px-5 py-5 sm:px-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#0F5FC5]">
                  Before you apply
                </p>

                <h2 className="mt-2 text-xl font-black tracking-[-0.02em] text-[#111827] sm:text-2xl">
                  Arrive prepared
                </h2>

                <p className="mt-3 text-xs font-medium leading-6 text-[#687587]">
                  NIRVAAN helps you understand the process before you
                  approach a lending or implementation partner.
                </p>
              </div>

              <div className="divide-y divide-[#D7DEE8]">
                <div className="flex gap-4 p-5">
                  <span className="flex h-8 w-8 flex-none items-center justify-center border border-[#0F5FC5] bg-[#EFF6FF] text-[10px] font-black text-[#0F5FC5]">
                    01
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-[#111827]">
                      Check eligibility
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#687587]">
                      Review scheme requirements against your profile.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5">
                  <span className="flex h-8 w-8 flex-none items-center justify-center border border-[#0F5FC5] bg-[#EFF6FF] text-[10px] font-black text-[#0F5FC5]">
                    02
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-[#111827]">
                      Review documents
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#687587]">
                      Know what information and documents may be required.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5">
                  <span className="flex h-8 w-8 flex-none items-center justify-center border border-[#E87512] bg-[#FFF7ED] text-[10px] font-black text-[#B45309]">
                    03
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-[#111827]">
                      Contact the right partner
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#687587]">
                      Use the locator to find a relevant partner near your
                      selected district.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#CBD5E1] bg-[#F8FAFC] p-5">
                <Link
                  href="/checklist"
                  className="flex min-h-11 items-center justify-center border border-[#0F5FC5] bg-[#0F5FC5] px-4 text-xs font-extrabold text-white transition-colors hover:bg-[#0B4FA7] focus:outline-none focus:ring-2 focus:ring-[#0F5FC5] focus:ring-offset-2"
                >
                  View document checklist →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#D7DEE8] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="border border-[#CBD5E1] bg-[#F8FAFC]">
            <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="p-6 sm:p-8">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#B45309]">
                  Official information
                </p>

                <h2 className="mt-2 text-xl font-black tracking-[-0.02em] text-[#111827] sm:text-2xl">
                  Use NIRVAAN as a discovery and preparation layer
                </h2>

                <p className="mt-3 max-w-3xl text-xs font-medium leading-6 text-[#687587] sm:text-sm">
                  NIRVAAN is designed to simplify scheme discovery and
                  application preparation. Final eligibility, sanction,
                  documentation and disbursement remain subject to the
                  applicable scheme guidelines and the concerned authority or
                  lending partner.
                </p>
              </div>

              <div className="border-t border-[#CBD5E1] p-6 lg:border-l lg:border-t-0">
                <div className="border-l-4 border-[#0F5FC5] pl-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#687587]">
                    Platform principle
                  </p>
                  <p className="mt-2 max-w-[220px] text-sm font-extrabold leading-6 text-[#263244]">
                    Clear information before the application step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            <section className="bg-[#0F294A]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#F5A04C]">
                Start with NIRVAAN
              </p>

              <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight tracking-[-0.025em] text-white sm:text-3xl lg:text-4xl">
                Find the right path for your enterprise.
              </h2>

              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-[#DCE7F5]">
                Build your profile, discover relevant schemes, estimate
                financing and locate a partner through one focused platform.
              </p>
            </div>

            <div className="grid gap-3 sm:flex">
              <Link
                href="/wizard"
                className="inline-flex min-h-12 items-center justify-center border border-[#0F5FC5] bg-[#0F5FC5] px-7 text-sm font-extrabold text-white transition-colors hover:bg-[#1671DF] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0F294A]"
              >
                Find eligible schemes
              </Link>

              <Link
                href="/locator"
                className="inline-flex min-h-12 items-center justify-center border border-[#7D94AF] bg-transparent px-7 text-sm font-extrabold text-white transition-colors hover:border-white hover:bg-white hover:text-[#0F294A] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0F294A]"
              >
                Find a nearby partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#D7DEE8] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center border-2 border-[#0F5FC5] text-sm font-black text-[#0F5FC5]">
                  N
                </div>

                <div>
                  <p className="text-lg font-black tracking-[-0.02em] text-[#111827]">
                    NIRVAAN
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#687587]">
                    Scheme Discovery Platform
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs font-medium leading-6 text-[#687587]">
                AI-driven scheme matching and application preparation for
                marginalized entrepreneurs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-xs font-bold text-[#526071] sm:grid-cols-4">
              <Link
                href="/wizard"
                className="transition-colors hover:text-[#0F5FC5]"
              >
                Find Schemes
              </Link>

              <Link
                href="/calculator"
                className="transition-colors hover:text-[#0F5FC5]"
              >
                Calculator
              </Link>

              <Link
                href="/locator"
                className="transition-colors hover:text-[#0F5FC5]"
              >
                Partner Locator
              </Link>

              <Link
                href="/checklist"
                className="transition-colors hover:text-[#0F5FC5]"
              >
                Checklist
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-[#E5EAF0] pt-5 text-[10px] font-semibold text-[#7A8797] sm:flex-row sm:items-center sm:justify-between">
            <span>
              NIRVAAN · Smart India Hackathon Prototype
            </span>

            <span>
              Information shown is subject to applicable scheme guidelines.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
