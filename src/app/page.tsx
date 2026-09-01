"use client";

import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useTranslation();

  const MODULES = [
    {
      step: "1",
      title: t("nav_wizard"),
      desc: t("wiz_sub_1"),
      href: "/wizard",
      cta: t("hero_cta_find"),
      icon: "🎯",
    },
    {
      step: "2",
      title: t("nav_calculator"),
      desc: t("calc_sub_rec"),
      href: "/calculator",
      cta: t("calc_title"),
      icon: "🧮",
    },
    {
      step: "3",
      title: t("nav_locator"),
      desc: t("loc_sub"),
      href: "/locator",
      cta: t("hero_cta_locate"),
      icon: "📍",
    },
  ];

  const STATS = [
    { value: t("stat_1_val"), label: t("stat_1_lbl") },
    { value: t("stat_2_val"), label: t("stat_2_lbl") },
    { value: t("stat_3_val"), label: t("stat_3_lbl") },
    { value: t("stat_4_val"), label: t("stat_4_lbl") },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased selection:bg-orange-200 selection:text-slate-900">
      
      {/* 🏛️ Official Government Banner Strip */}
      <div className="bg-slate-100 border-b border-slate-200 py-1.5 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-slate-600 gap-1 font-medium">
          <span>Ministry of Social Justice & Empowerment</span>
          <span>Smart India Hackathon Prototype · SIH26092</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        
        {/* 🌐 Minimalist Hero Section */}
        <section className="mx-auto max-w-5xl px-4 pt-16 pb-12 text-center md:pt-20 md:pb-16">
          <span className="inline-block rounded bg-orange-100 border border-orange-200 px-3 py-1 text-xs font-bold tracking-wide text-orange-800 uppercase shadow-sm">
            {t("hero_badge")}
          </span>
          
          <h1 className="mx-auto mt-6 max-w-4xl text-2xl font-black tracking-tight text-[#0F294A] sm:text-4xl md:text-5xl leading-tight">
            {t("hero_title_1")}
            <br />
            <span className="text-[#EA580C]">
              {t("hero_title_2")}
            </span>
          </h1>
          
          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
            {t("hero_desc")}
          </p>
          
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link
              href="/wizard"
              className="w-full rounded-md bg-[#0F294A] hover:bg-[#1A3E66] px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors text-center sm:w-auto"
            >
              {t("hero_cta_find")}
            </Link>
            <Link
              href="/locator"
              className="w-full rounded-md bg-white border border-slate-300 hover:bg-slate-50 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-colors text-center sm:w-auto"
            >
              {t("hero_cta_locate")}
            </Link>
          </div>
        </section>

        {/* 📊 Metrics & Statistics Dashboard Panel */}
        <section className="mx-auto max-w-6xl px-4 py-4">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 border border-slate-200 bg-white rounded-lg p-6 md:grid-cols-4 shadow-sm divide-x-0 md:divide-x divide-slate-100">
            {STATS.map((s, idx) => (
              <div key={idx} className="px-4 text-center">
                <p className="text-xl sm:text-2xl font-extrabold text-[#0F294A] md:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-slate-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 📦 Core Services & Modules Section */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="text-center border-b border-slate-200 pb-6">
            <span className="rounded bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-700">
              {t("mod_badge")}
            </span>
            <h2 className="mt-2 text-xl font-bold text-[#0F294A] md:text-2xl">
              {t("mod_title")}
            </h2>
            <p className="mt-1 text-slate-500 font-medium text-xs sm:text-sm">
              {t("mod_sub")}
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {MODULES.map((m) => (
              <div
                key={m.step}
                className="group flex flex-col rounded-lg bg-white border border-slate-200 p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="rounded bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 text-xs font-bold">
                    Module {m.step}
                  </span>
                </div>
                
                <h3 className="mt-4 text-lg font-bold text-[#0F294A] group-hover:text-blue-700 transition-colors">
                  {m.title}
                </h3>
                
                <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                  {m.desc}
                </p>
                
                <Link
                  href={m.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {m.cta} <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}
