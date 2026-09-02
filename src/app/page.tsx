"use client";

import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "Verification",
    description:
      "Verify your identity through DigiLocker OTP and link either Aadhaar or PAN.",
    details: ["DigiLocker OTP", "Aadhaar or PAN"],
  },
  {
    number: "02",
    title: "Earning Status",
    description:
      "Tell us whether you are earning or currently non-earning so NIRVAAN can guide you through the right route.",
    details: [
      "Earning assessment",
      "Income proof",
      "Non-earning assessment",
    ],
  },
  {
    number: "03",
    title: "Smart Scheme Recommender",
    description:
      "AI analyses your verified information and identifies a suitable scheme with its maximum loan amount.",
    details: ["AI-powered matching", "Scheme recommendation", "Maximum loan"],
  },
  {
    number: "04",
    title: "Financial Calculator",
    description:
      "Choose a loan amount within your recommended maximum and understand the financing before moving ahead.",
    details: ["₹50,000 increments", "Loan amount selection", "AI assistance"],
  },
  {
    number: "05",
    title: "Geo-Spatial Partner Locator & Router",
    description:
      "View partner locations across India on a satellite map, select a partner and get directions.",
    details: [
      "Satellite map",
      "Partner selection",
      "Route & directions",
    ],
  },
];

const ROUTES = [
  {
    label: "EARNING",
    title: "For earning applicants",
    description:
      "Provide your income details and upload bank income proof for verification.",
    points: [
      "Enter annual income",
      "Upload bank income proof PDF",
      "Income verification",
      "Continue to Smart Scheme Recommender",
    ],
  },
  {
    label: "NON-EARNING",
    title: "For non-earning applicants",
    description:
      "Choose an educational loan or a small project loan and complete a NIRVAAN team assessment.",
    points: [
      "Educational Loan",
      "Small Project Loan",
      "Video assessment with the NIRVAAN team",
      "Verification of claims and guarantor",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      {/* HERO */}
      <section className="border-b border-[#D9E0E7] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <div className="inline-flex border border-[#E87512] bg-[#FFF7ED] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#B45309]">
                Government Scheme Assistance
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-[#002244] sm:text-5xl lg:text-6xl">
                Find the right scheme.
                <br />
                <span className="text-[#0077CC]">
                  Plan your financing.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-[#526071]">
                NIRVAAN guides you through identity verification,
                earning-status assessment, AI-based scheme matching,
                financing selection and partner location.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/wizard"
                  className="inline-flex min-h-[50px] items-center justify-center border border-[#0077CC] bg-[#0077CC] px-7 text-sm font-bold text-white transition-colors hover:border-[#005FA3] hover:bg-[#005FA3] focus:outline-none focus:ring-2 focus:ring-[#0077CC] focus:ring-offset-2"
                >
                  Start Application
                  <span className="ml-3" aria-hidden="true">
                    →
                  </span>
                </Link>

                <Link
                  href="/recommendation"
                  className="inline-flex min-h-[50px] items-center justify-center border border-[#B9C4D1] bg-white px-7 text-sm font-bold text-[#002244] transition-colors hover:border-[#0077CC] hover:bg-[#F7F9FB] hover:text-[#0077CC] focus:outline-none focus:ring-2 focus:ring-[#0077CC] focus:ring-offset-2"
                >
                  Smart Scheme Recommender
                </Link>
              </div>

              <div className="mt-9 grid border-t border-[#E5EAF0] pt-5 sm:grid-cols-3">
                <div className="border-b border-[#E5EAF0] pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-5">
                  <p className="text-2xl font-extrabold text-[#002244]">
                    01
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#667085]">
                    Verify your identity
                  </p>
                </div>

                <div className="border-b border-[#E5EAF0] py-4 sm:border-b-0 sm:border-r sm:px-5 sm:py-0">
                  <p className="text-2xl font-extrabold text-[#0077CC]">
                    02
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#667085]">
                    Assess your route
                  </p>
                </div>

                <div className="pt-4 sm:pl-5 sm:pt-0">
                  <p className="text-2xl font-extrabold text-[#E87512]">
                    05
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#667085]">
                    Reach a partner
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-[#CBD5E1] bg-[#F7F9FB]">
              <div className="border-b border-[#CBD5E1] bg-[#002244] px-5 py-4">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white">
                  NIRVAAN Journey
                </p>
                <p className="mt-1 text-xs font-medium leading-5 text-[#DCE7F5]">
                  Five connected stages from verification to partner selection.
                </p>
              </div>

              <div className="divide-y divide-[#D9E0E7] bg-white">
                {STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="flex gap-4 px-5 py-4"
                  >
                    <span className="w-9 shrink-0 text-sm font-extrabold text-[#0077CC]">
                      {step.number}
                    </span>

                    <div>
                      <h2 className="text-sm font-extrabold text-[#002244]">
                        {step.title}
                      </h2>

                      <p className="mt-1 text-xs font-medium leading-5 text-[#667085]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section
        id="how-it-works"
        className="border-b border-[#D9E0E7] bg-[#F7F9FB]"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0077CC]">
              How NIRVAAN works
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.025em] text-[#002244] sm:text-4xl">
              One guided journey, five clear stages.
            </h2>

            <p className="mt-4 text-sm font-medium leading-7 text-[#526071] sm:text-base">
              Instead of moving between disconnected tools, NIRVAAN
              keeps the applicant journey connected. Verified
              information can be used to guide the next stage.
            </p>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid border border-[#CBD5E1] md:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, index) => (
              <article
                key={step.number}
                className={`min-h-[300px] bg-white p-6 transition-colors hover:bg-[#F8FAFC] ${
                  index !== STEPS.length - 1
                    ? "border-b border-[#D9E0E7] lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-3xl font-extrabold text-[#D9E0E7]">
                    {step.number}
                  </span>

                  <span className="border border-[#D9E0E7] bg-[#F7F9FB] px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#667085]">
                    Stage
                  </span>
                </div>

                <h3 className="mt-7 text-base font-extrabold leading-6 text-[#002244]">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs font-medium leading-5 text-[#667085]">
                  {step.description}
                </p>

                <div className="mt-5 border-t border-[#E5EAF0] pt-4">
                  {step.details.map((detail) => (
                    <p
                      key={detail}
                      className="border-b border-[#F1F5F9] py-2 text-[11px] font-semibold text-[#526071] last:border-b-0"
                    >
                      <span className="mr-2 text-[#0077CC]">
                        ✓
                      </span>
                      {detail}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
            {/* APPLICANT ROUTES */}
      <section className="border-t border-[#D9E0E7] bg-[#F7F9FB]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#E87512]">
                Stage 02
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.025em] text-[#002244]">
                Choose the route that matches your situation.
              </h2>

              <p className="mt-4 text-sm font-medium leading-7 text-[#526071]">
                Earning and non-earning applicants follow different
                assessment paths before reaching the same AI-powered
                scheme recommendation stage.
              </p>

              <Link
                href="/wizard"
                className="mt-7 inline-flex min-h-[46px] items-center border border-[#0077CC] bg-[#0077CC] px-6 text-xs font-bold text-white transition-colors hover:bg-[#005FA3]"
              >
                Begin Verification
                <span className="ml-3" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="grid border border-[#CBD5E1] bg-white md:grid-cols-2">
              {ROUTES.map((route, index) => (
                <article
                  key={route.label}
                  className={`p-6 sm:p-7 ${
                    index === 0
                      ? "border-b border-[#D9E0E7] md:border-b-0 md:border-r"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0077CC]">
                      {route.label}
                    </span>

                    <span className="h-2 w-2 bg-[#E87512]" />
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-[#002244]">
                    {route.title}
                  </h3>

                  <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">
                    {route.description}
                  </p>

                  <div className="mt-5 border-t border-[#E5EAF0] pt-3">
                    {route.points.map((point) => (
                      <div
                        key={point}
                        className="flex gap-3 border-b border-[#F1F5F9] py-2.5 last:border-b-0"
                      >
                        <span className="text-xs font-extrabold text-[#0077CC]">
                          ✓
                        </span>

                        <span className="text-xs font-semibold leading-5 text-[#526071]">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI RECOMMENDATION */}
      <section className="border-t border-[#D9E0E7] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 border border-[#CBD5E1] lg:grid-cols-[1fr_1fr]">
            <div className="bg-[#002244] p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center border border-[#3B82C4] bg-[#07345E] text-xs font-extrabold text-white">
                  AI
                </span>

                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9CC8EA]">
                  Intelligent assistance
                </p>
              </div>

              <h2 className="mt-6 text-3xl font-extrabold tracking-[-0.025em] text-white">
                Smart Scheme Recommender
              </h2>

              <p className="mt-4 text-sm font-medium leading-7 text-[#D8E4F0]">
                Once your relevant information has been verified,
                NIRVAAN uses it to help identify a suitable scheme
                and the maximum loan amount available within the
                applicable criteria.
              </p>

              <Link
                href="/recommendation"
                className="mt-7 inline-flex min-h-[46px] items-center border border-white bg-white px-6 text-xs font-bold text-[#002244] transition-colors hover:bg-[#EAF3FA]"
              >
                Open Recommender
                <span className="ml-3" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="bg-[#F7F9FB] p-7 sm:p-9">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0077CC]">
                What comes next
              </p>

              <div className="mt-6 space-y-0 border-t border-[#D9E0E7]">
                <div className="grid grid-cols-[42px_1fr] gap-4 border-b border-[#D9E0E7] py-5">
                  <span className="text-sm font-extrabold text-[#0077CC]">
                    03
                  </span>

                  <div>
                    <h3 className="text-sm font-extrabold text-[#002244]">
                      Scheme + maximum loan
                    </h3>

                    <p className="mt-1 text-xs font-medium leading-5 text-[#667085]">
                      Receive a recommendation based on your verified
                      applicant information.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-[42px_1fr] gap-4 border-b border-[#D9E0E7] py-5">
                  <span className="text-sm font-extrabold text-[#0077CC]">
                    04
                  </span>

                  <div>
                    <h3 className="text-sm font-extrabold text-[#002244]">
                      Select your loan amount
                    </h3>

                    <p className="mt-1 text-xs font-medium leading-5 text-[#667085]">
                      Choose an amount from ₹50,000 upward in ₹50,000
                      increments, up to your maximum.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-[42px_1fr] gap-4 py-5">
                  <span className="text-sm font-extrabold text-[#0077CC]">
                    05
                  </span>

                  <div>
                    <h3 className="text-sm font-extrabold text-[#002244]">
                      Find a partner
                    </h3>

                    <p className="mt-1 text-xs font-medium leading-5 text-[#667085]">
                      Use the satellite map to explore partner
                      locations and plan your route.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="border-t border-[#D9E0E7] bg-[#F7F9FB]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0077CC]">
                NIRVAAN tools
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.025em] text-[#002244]">
                Everything stays connected.
              </h2>
            </div>

            <p className="max-w-md text-sm font-medium leading-6 text-[#667085] sm:text-right">
              Move from recommendation to financing and then to a
              physical partner location without losing the context
              of your journey.
            </p>
          </div>

          <div className="mt-8 grid border border-[#CBD5E1] bg-white md:grid-cols-3">
            <Link
              href="/recommendation"
              className="group border-b border-[#D9E0E7] p-6 transition-colors hover:bg-[#F8FAFC] md:border-b-0 md:border-r sm:p-7"
            >
              <span className="text-3xl font-extrabold text-[#D9E0E7]">
                03
              </span>

              <h3 className="mt-7 text-lg font-extrabold text-[#002244] group-hover:text-[#0077CC]">
                Smart Scheme Recommender
              </h3>

              <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">
                Identify suitable financing options using the
                information collected through your journey.
              </p>

              <div className="mt-7 border-t border-[#D9E0E7] pt-4 text-xs font-extrabold text-[#0077CC]">
                Explore recommender
                <span className="float-right" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>

            <Link
              href="/calculator"
              className="group border-b border-[#D9E0E7] p-6 transition-colors hover:bg-[#F8FAFC] md:border-b-0 md:border-r sm:p-7"
            >
              <span className="text-3xl font-extrabold text-[#D9E0E7]">
                04
              </span>

              <h3 className="mt-7 text-lg font-extrabold text-[#002244] group-hover:text-[#0077CC]">
                Financial Calculator
              </h3>

              <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">
                Select your required loan amount within the maximum
                recommended amount and plan the financing.
              </p>

              <div className="mt-7 border-t border-[#D9E0E7] pt-4 text-xs font-extrabold text-[#0077CC]">
                Open financial calculator
                <span className="float-right" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>

            <Link
              href="/locator"
              className="group p-6 transition-colors hover:bg-[#F8FAFC] sm:p-7"
            >
              <span className="text-3xl font-extrabold text-[#D9E0E7]">
                05
              </span>

              <h3 className="mt-7 text-lg font-extrabold text-[#002244] group-hover:text-[#0077CC]">
                Geo-Spatial Partner Locator & Router
              </h3>

              <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">
                Explore the partner network on a satellite map,
                select a location and plan your route.
              </p>

              <div className="mt-7 border-t border-[#D9E0E7] pt-4 text-xs font-extrabold text-[#0077CC]">
                Open partner locator
                <span className="float-right" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
            {/* FINAL ACTION */}
      <section className="border-t border-[#D9E0E7] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid border border-[#CBD5E1] lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="p-7 sm:p-9">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#E87512]">
                Ready to begin?
              </p>

              <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.02em] text-[#002244] sm:text-3xl">
                Start your NIRVAAN journey.
              </h2>

              <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-[#667085]">
                Begin with verification. NIRVAAN will guide you through
                the relevant assessment route, scheme recommendation,
                financing selection and partner discovery.
              </p>
            </div>

            <div className="border-t border-[#D9E0E7] p-7 lg:border-l lg:border-t-0 sm:p-9">
              <Link
                href="/wizard"
                className="inline-flex min-h-[50px] min-w-[210px] items-center justify-center border border-[#0077CC] bg-[#0077CC] px-7 text-sm font-bold text-white transition-colors hover:border-[#005FA3] hover:bg-[#005FA3] focus:outline-none focus:ring-2 focus:ring-[#0077CC] focus:ring-offset-2"
              >
                Start Application
                <span className="ml-3" aria-hidden="true">
                  →
                </span>
              </Link>

              <p className="mt-3 text-center text-[10px] font-medium leading-4 text-[#7A8797]">
                Begin with Step 01: Verification
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INDEPENDENT PLATFORM NOTICE */}
      <section className="border-t border-[#D9E0E7] bg-[#F7F9FB]">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="border-l-[3px] border-[#E87512] bg-white px-5 py-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#002244]">
              Important
            </p>

            <p className="mt-2 max-w-5xl text-xs font-medium leading-5 text-[#667085]">
              NIRVAAN is an independent platform for scheme discovery
              and application assistance. It does not represent,
              operate, or speak on behalf of any government department,
              bank, financial institution, or scheme authority.
              Eligibility, loan limits, interest rates and final
              approval are subject to the applicable rules and the
              concerned institution.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
