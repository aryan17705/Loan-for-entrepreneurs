"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const STEPS = [
  {
    number: "01",
    title: "Verification",
    description:
      "Secure identity verification through DigiLocker with Aadhaar or PAN.",
    icon: "✓",
  },
  {
    number: "02",
    title: "Earning Status",
    description:
      "Select your earning status and complete the required verification or assessment.",
    icon: "◎",
  },
  {
    number: "03",
    title: "Smart Scheme Recommender",
    description:
      "AI-powered scheme matching based on your verified profile and financial requirements.",
    icon: "◎",
  },
  {
    number: "04",
    title: "Financial Calculator",
    description:
      "Choose your loan amount and understand EMI, interest and repayment details.",
    icon: "▦",
  },
  {
    number: "05",
    title: "Geo-Spatial Partner Locator & Router",
    description:
      "Find partner institutions, select a suitable location and get directions.",
    icon: "⌖",
  },
];

function NirvaanLogo({ light = false }: { light?: boolean }) {
  return (
    <span className="relative inline-flex items-center">
      <span
        className={`nirvaan-wordmark text-[28px] leading-none font-extrabold tracking-[0.08em] sm:text-[31px] ${
          light ? "text-white" : "text-[#102A43]"
        }`}
      >
        NIRVAAN
      </span>

      <span className="absolute -right-2 -top-1 h-2.5 w-2.5 bg-[#F47B20]" />
    </span>
  );
}

function IndiaNetworkIllustration() {
  return (
    <div className="relative h-full min-h-[390px] w-full overflow-hidden border-l border-[#E6EDF5] bg-[#F8FBFF]">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-[8%] top-[18%] h-px w-[75%] rotate-[12deg] bg-[#B8CBE6]" />
        <div className="absolute left-[15%] top-[48%] h-px w-[75%] -rotate-[16deg] bg-[#B8CBE6]" />
        <div className="absolute left-[30%] top-[68%] h-px w-[55%] rotate-[10deg] bg-[#B8CBE6]" />
        <div className="absolute left-[45%] top-[25%] h-[55%] w-px rotate-[28deg] bg-[#B8CBE6]" />
      </div>

      <svg
        viewBox="0 0 500 500"
        className="absolute left-[23%] top-[6%] h-[82%] w-[55%]"
        aria-hidden="true"
      >
        <path
          d="M236 30
             L282 45 L301 74 L330 92 L325 124
             L350 143 L335 174 L349 198 L334 225
             L347 250 L330 278 L318 309 L300 337
             L284 365 L271 397 L250 423 L226 405
             L213 376 L195 350 L177 330 L167 299
             L148 276 L154 247 L139 223 L158 198
             L151 168 L174 143 L169 116 L192 91
             L202 60 Z"
          fill="#F9FCFF"
          stroke="#8EB2E3"
          strokeWidth="2"
        />

        <path
          d="M202 94 L252 130 L300 112 M173 164 L230 190 L330 174
             M158 223 L215 245 L334 225 M177 276 L245 288 L330 278
             M195 350 L248 327 L300 337"
          fill="none"
          stroke="#B6CAE6"
          strokeWidth="1.2"
        />

        <circle cx="252" cy="130" r="5" fill="#1769D2" />
        <circle cx="300" cy="112" r="5" fill="#F47B20" />
        <circle cx="230" cy="190" r="5" fill="#1769D2" />
        <circle cx="330" cy="174" r="5" fill="#1769D2" />
        <circle cx="215" cy="245" r="5" fill="#F47B20" />
        <circle cx="334" cy="225" r="5" fill="#1769D2" />
        <circle cx="245" cy="288" r="5" fill="#1769D2" />
        <circle cx="330" cy="278" r="5" fill="#F47B20" />
        <circle cx="248" cy="327" r="5" fill="#1769D2" />
      </svg>

      <div className="absolute left-[8%] top-[22%] border border-[#BFD0E6] bg-white px-4 py-3 text-center shadow-sm">
        <div className="text-2xl text-[#1769D2]">▤</div>
        <p className="mt-1 text-[11px] font-extrabold text-[#102A43]">
          Loan Schemes
        </p>
      </div>

      <div className="absolute right-[9%] top-[18%] border border-[#BFD0E6] bg-white px-4 py-3 text-center shadow-sm">
        <div className="text-2xl text-[#1769D2]">♙</div>
        <p className="mt-1 text-[11px] font-extrabold text-[#102A43]">
          Applicants
        </p>
      </div>

      <div className="absolute bottom-[17%] left-[18%] border border-[#BFD0E6] bg-white px-5 py-3 text-center shadow-sm">
        <div className="text-2xl font-bold text-[#1769D2]">₹</div>
        <p className="mt-1 text-[11px] font-extrabold text-[#102A43]">
          Financing Options
        </p>
      </div>

      <div className="absolute bottom-[14%] right-[12%] border border-[#BFD0E6] bg-white px-5 py-3 text-center shadow-sm">
        <div className="text-2xl text-[#1769D2]">♢</div>
        <p className="mt-1 text-[11px] font-extrabold text-[#102A43]">
          Partner Institutions
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();

  const startJourney = () => {
    router.push("/wizard");
  };

  return (
    <div className="min-h-screen bg-white text-[#102A43]">
      {/* HERO */}
      <section className="border-b border-[#E4EBF3] bg-white">
        <div className="mx-auto grid min-h-[570px] max-w-7xl lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-12 lg:py-20">
            <div className="mb-6 h-[3px] w-16 bg-[#F47B20]" />

            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[#1769D2]">
              Government Scheme Assistance
            </p>

            <h1 className="max-w-[620px] text-4xl font-extrabold leading-[1.12] tracking-[-0.025em] text-[#102A43] sm:text-5xl lg:text-[56px]">
              Find the right scheme.
              <br />
              Understand your
              <br />
              <span className="text-[#1769D2]">financing options.</span>
            </h1>

            <div className="mt-7 max-w-[570px] border-l-[3px] border-[#F47B20] pl-5">
              <p className="text-base font-medium leading-7 text-[#40556D] sm:text-lg">
                NIRVAAN is an independent platform for discovering government
                schemes, understanding financing options and preparing for
                applications.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={startJourney}
                className="inline-flex min-h-14 items-center justify-center gap-8 border border-[#0758C7] bg-[#0758C7] px-7 text-sm font-extrabold tracking-[0.04em] text-white transition hover:bg-[#064CA9]"
              >
                START MY JOURNEY
                <span className="text-xl">→</span>
              </button>

              <Link
                href="/recommendation"
                className="inline-flex min-h-14 items-center justify-center border border-[#B7C7D9] bg-white px-6 text-sm font-bold text-[#17324F] transition hover:border-[#1769D2] hover:text-[#1769D2]"
              >
                EXPLORE SCHEMES
              </Link>
            </div>
          </div>

          <IndiaNetworkIllustration />
        </div>
      </section>
            {/* FIVE STEP JOURNEY */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#1769D2]" />
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#F47B20]">
                A Simple Five-Step Journey
              </span>
              <span className="h-px w-10 bg-[#1769D2]" />
            </div>

            <h2 className="mt-4 text-2xl font-extrabold text-[#102A43] sm:text-3xl">
              From verification to financing in five simple steps
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-[#64748B]">
              Complete each stage in sequence. Your verified journey
              information is carried forward to the next portal.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {STEPS.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={index === 0 ? startJourney : undefined}
                className={`group relative min-h-[250px] border border-[#E1E8F0] bg-white p-6 text-left shadow-[0_4px_18px_rgba(16,42,67,0.05)] transition ${
                  index === 0
                    ? "cursor-pointer hover:border-[#1769D2] hover:shadow-[0_8px_24px_rgba(23,105,210,0.10)]"
                    : "cursor-default"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center border border-[#DCE7F4] bg-[#F4F8FD] text-2xl font-bold text-[#1769D2]">
                    {step.icon}
                  </div>

                  <span className="text-3xl font-extrabold text-[#1769D2]">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-base font-extrabold leading-6 text-[#102A43]">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs font-medium leading-5 text-[#64748B]">
                  {step.description}
                </p>

                {index === 0 ? (
                  <span className="absolute bottom-5 right-5 text-lg font-bold text-[#1769D2] transition group-hover:translate-x-1">
                    →
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTES */}
      <section className="border-y border-[#E3EAF2] bg-[#F8FAFC] py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="border border-[#DDE6EF] bg-white p-7 sm:p-9">
              <div className="flex items-center justify-between border-b border-[#E5EBF2] pb-5">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1769D2]">
                    Route A
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-[#102A43]">
                    Earning
                  </h2>
                </div>

                <span className="text-3xl font-bold text-[#1769D2]">₹</span>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  "Enter annual income",
                  "Upload bank income proof",
                  "Complete income verification",
                  "Continue to AI scheme matching",
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 flex-none items-center justify-center border border-[#C9D9EA] text-xs font-extrabold text-[#1769D2]">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm font-semibold text-[#334155]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#DDE6EF] bg-white p-7 sm:p-9">
              <div className="flex items-center justify-between border-b border-[#E5EBF2] pb-5">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#F47B20]">
                    Route B
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-[#102A43]">
                    Non-Earning
                  </h2>
                </div>

                <span className="text-3xl font-bold text-[#F47B20]">+</span>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  "Educational loan or small project purpose",
                  "Video assessment with the NIRVAAN team",
                  "Discuss need, repayment plan and guarantor",
                  "Continue after successful verification",
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 flex-none items-center justify-center border border-[#E8D4C4] text-xs font-extrabold text-[#F47B20]">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm font-semibold text-[#334155]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
            {/* TOOLS */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            <Link
              href="/recommendation"
              className="border border-[#DDE6EF] bg-white p-7 transition hover:border-[#1769D2] hover:shadow-[0_8px_24px_rgba(16,42,67,0.07)]"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1769D2]">
                Step 03
              </p>

              <h3 className="mt-3 text-xl font-extrabold text-[#102A43]">
                Smart Scheme Recommender
              </h3>

              <p className="mt-3 text-sm font-medium leading-6 text-[#64748B]">
                Use AI-assisted matching to understand suitable schemes and
                maximum financing options.
              </p>

              <span className="mt-6 inline-block text-sm font-extrabold text-[#1769D2]">
                View recommender →
              </span>
            </Link>

            <Link
              href="/calculator"
              className="border border-[#DDE6EF] bg-white p-7 transition hover:border-[#1769D2] hover:shadow-[0_8px_24px_rgba(16,42,67,0.07)]"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#F47B20]">
                Step 04
              </p>

              <h3 className="mt-3 text-xl font-extrabold text-[#102A43]">
                Financial Calculator
              </h3>

              <p className="mt-3 text-sm font-medium leading-6 text-[#64748B]">
                Select a loan amount and understand EMI, interest, tenure and
                repayment details.
              </p>

              <span className="mt-6 inline-block text-sm font-extrabold text-[#1769D2]">
                Open calculator →
              </span>
            </Link>

            <Link
              href="/locator"
              className="border border-[#DDE6EF] bg-white p-7 transition hover:border-[#1769D2] hover:shadow-[0_8px_24px_rgba(16,42,67,0.07)]"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1769D2]">
                Step 05
              </p>

              <h3 className="mt-3 text-xl font-extrabold text-[#102A43]">
                Geo-Spatial Partner Locator &amp; Router
              </h3>

              <p className="mt-3 text-sm font-medium leading-6 text-[#64748B]">
                Locate partner institutions, review available details and
                continue with directions.
              </p>

              <span className="mt-6 inline-block text-sm font-extrabold text-[#1769D2]">
                Find partners →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-[#DCE5EE] bg-[#0E2A4A] py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#F47B20]">
              Ready to begin?
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-white">
              Start your NIRVAAN journey.
            </h2>

            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#B9CDE1]">
              Complete verification first. NIRVAAN will guide you through the
              remaining stages in sequence.
            </p>
          </div>

          <button
            type="button"
            onClick={startJourney}
            className="inline-flex min-h-14 flex-none items-center justify-center gap-6 border border-[#F47B20] bg-[#F47B20] px-7 text-sm font-extrabold text-white transition hover:bg-[#DD6912]"
          >
            START MY JOURNEY
            <span className="text-xl">→</span>
          </button>
        </div>
      </section>
            {/* INDEPENDENT PLATFORM NOTICE */}
      <section className="border-t border-[#DCE5EE] bg-white py-7">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="border-l-[3px] border-[#F47B20] bg-[#FFF9F5] px-5 py-4">
            <p className="text-xs font-extrabold text-[#102A43]">
              Independent platform notice
            </p>

            <p className="mt-1 max-w-5xl text-[11px] font-medium leading-5 text-[#64748B]">
              NIRVAAN is an independent platform and is not a government
              department, bank or lending institution. Scheme eligibility,
              final approval, sanction and disbursement are determined by the
              relevant institutions and applicable rules.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
