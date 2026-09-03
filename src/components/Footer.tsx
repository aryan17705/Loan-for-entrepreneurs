"use client";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-10 dark:border-white/10 dark:bg-black">

      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          {/* BRAND */}

          <div>

            <div className="text-2xl font-black tracking-[-0.04em] text-slate-900 dark:text-white">
              N<span className="text-[#1769D2]">I</span>RVAAN
            </div>

            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-500">
              Financial Support Assistance
            </p>

          </div>

          {/* PROJECT */}

          <div className="text-left md:text-right">

            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Smart India Hackathon Prototype
            </p>

            <p className="mt-1 text-xs font-bold text-[#1769D2]">
              SIH26092
            </p>

          </div>

        </div>

        <div className="mt-8 border-t border-slate-200 pt-5 dark:border-white/10">

          <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-500">
            © 2026 NIRVAAN · Financial Support Assistance
          </p>

        </div>

      </div>

    </footer>
  );
}
