"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="help"
      className="border-t border-[#DCE4EC] bg-[#0E2A4A] text-white print:hidden"
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.85fr_0.85fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="NIRVAAN Home"
            >
              <span className="relative inline-flex">
                <span className="nirvaan-wordmark text-2xl font-extrabold tracking-[0.08em] text-white sm:text-[28px]">
                  NIRVAAN
                </span>

                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-1 h-2.5 w-2.5 bg-[#F47B20]"
                />
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm font-medium leading-6 text-[#B9CDE1]">
              An independent platform for discovering government
              schemes, understanding financing options and preparing
              applications.
            </p>

            <div className="mt-6 border-l-2 border-[#F47B20] pl-4">
              <p className="text-xs font-bold leading-5 text-[#D9E6F2]">
                NIRVAAN is not a government department, bank or
                lending institution.
              </p>

              <p className="mt-1 text-[11px] font-medium leading-5 text-[#9FB5CA]">
                Scheme eligibility, final approval, sanction and
                disbursement are determined by the relevant
                institutions and applicable rules.
              </p>
            </div>
          </div>

          {/* Help Portal */}
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#F47B20]">
              Help Portal
            </p>

            <h2 className="mt-3 text-xl font-extrabold text-white">
              Need assistance?
            </h2>

            <p className="mt-2 text-xs font-medium leading-5 text-[#B9CDE1]">
              Contact the NIRVAAN assistance team for help
              understanding the platform and preparing your
              journey.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <a
              href="tel:+918888565758"
              className="flex items-center gap-4 border border-[#385674] bg-[#143554] px-4 py-4 transition-colors hover:border-[#6D91B3]"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 flex-none items-center justify-center bg-[#1B68C7] text-white"
              >
                ☎
              </span>

              <span>
                <span className="block text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#9FB5CA]">
                  Phone
                </span>

                <span className="mt-1 block text-sm font-extrabold text-white">
                  +91 8888565758
                </span>
              </span>
            </a>

            <a
              href="mailto:nirvaanscheme@gmail.com"
              className="flex items-center gap-4 border border-[#385674] bg-[#143554] px-4 py-4 transition-colors hover:border-[#6D91B3]"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 flex-none items-center justify-center bg-[#1B68C7] text-white"
              >
                @
              </span>

              <span className="min-w-0">
                <span className="block text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#9FB5CA]">
                  Email
                </span>

                <span className="mt-1 block truncate text-sm font-extrabold text-white">
                  nirvaanscheme@gmail.com
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-10 border-t border-[#294766] pt-6">
          <div className="flex flex-col gap-3 text-[11px] font-medium text-[#91A8BE] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 NIRVAAN · Government Scheme Assistance Portal
            </p>

            <p>
              Independent platform · English only
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
