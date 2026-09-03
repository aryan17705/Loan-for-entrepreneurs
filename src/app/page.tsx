"use client";

import Link from "next/link";

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Verification",
    description:
      "Verify your identity through DigiLocker OTP and Aadhaar or PAN verification before beginning the assistance journey.",
    accent: "blue",
  },
  {
    number: "02",
    title: "Earning Status",
    description:
      "Tell us whether you are earning or non-earning so the journey can follow the appropriate assessment route.",
    accent: "orange",
  },
  {
    number: "03",
    title: "Smart Scheme Recommender",
    description:
      "Your verified journey information is assessed by the AI-powered recommender to identify suitable scheme options.",
    accent: "blue",
  },
  {
    number: "04",
    title: "Financial Calculator",
    description:
      "Choose an eligible loan amount and understand the estimated repayment structure before moving ahead.",
    accent: "orange",
  },
  {
    number: "05",
    title: "Geo-Spatial Partner Locator & Router",
    description:
      "View the partner network across India, select a suitable partner and get routing assistance.",
    accent: "blue",
  },
];

function StepIcon({
  number,
  accent,
}: {
  number: string;
  accent: "blue" | "orange";
}) {
  const stroke =
    accent === "orange" ? "#F47B20" : "#1769D2";

  if (number === "01") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="h-9 w-9"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
      >
        <rect x="9" y="6" width="30" height="36" />
        <circle cx="24" cy="18" r="5" />
        <path d="M15 33c2.2-4.5 5.1-6.5 9-6.5s6.8 2 9 6.5" />
      </svg>
    );
  }

  if (number === "02") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="h-9 w-9"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
      >
        <path d="M8 37h32" />
        <path d="M12 32V20" />
        <path d="M20 32V14" />
        <path d="M28 32V23" />
        <path d="M36 32V9" />
        <path d="m10 16 9-7 9 5 10-8" />
      </svg>
    );
  }

  if (number === "03") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="h-9 w-9"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
      >
        <circle cx="20" cy="20" r="11" />
        <path d="m29 29 10 10" />
        <path d="M16 20h8" />
        <path d="M20 16v8" />
      </svg>
    );
  }

  if (number === "04") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="h-9 w-9"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
      >
        <rect x="8" y="7" width="32" height="34" />
        <path d="M14 15h20" />
        <path d="M14 23h6M24 23h10" />
        <path d="M14 30h6M24 30h10" />
        <path d="M14 36h20" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="h-9 w-9"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
    >
      <path d="M24 42s13-12.2 13-23A13 13 0 0 0 11 19c0 10.8 13 23 13 23Z" />
      <circle cx="24" cy="19" r="4.5" />
      <path d="M6 39h36" />
    </svg>
  );
}

function IndiaIllustration() {
  return (
    <div className="relative w-full overflow-hidden border border-[#173A5E] bg-[#06111D]">
      <img
        src="/nirvaan-india-illustration.png"
        alt="India map with financial network and partner location illustration"
        className="relative block h-auto w-full object-cover"
      />

      <div className="absolute left-4 top-4 border border-[#FFFFFF33] bg-[#06111DCC] px-3 py-2 backdrop-blur-sm sm:left-6 sm:top-6">
        <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#8EBFF2]">
          India-wide assistance
        </p>
        <p className="mt-1 text-[11px] font-bold text-white">
          Scheme discovery & partner routing
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="w-full bg-white text-[#102A43]">
      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="border-b border-[#DCE4EC] bg-white">
        <div className="mx-auto grid w-full max-w-[1440px] items-stretch lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16">
            <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#F47B20]">
              Financial assistance made easier
            </p>

            <h1 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-[-0.035em] text-[#102A43] sm:text-5xl lg:text-[58px]">
              Find the right scheme.
              <br />
              <span className="text-[#1769D2]">
                Get your financial support.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm font-medium leading-6 text-[#607086] sm:text-base">
              NIRVAAN guides you through a structured five-step
              assistance journey, from identity verification to
              scheme matching, repayment planning and partner
              routing.
            </p>

            <div className="mt-8">
              <Link
                href="/wizard"
                className="inline-flex min-h-[52px] items-center justify-center border border-[#1769D2] bg-[#1769D2] px-7 text-[11px] font-extrabold tracking-[0.08em] text-white transition-colors hover:bg-[#0F56B2]"
              >
                START YOUR JOURNEY
                <span className="ml-4 text-base">→</span>
              </Link>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-2 border border-[#DCE4EC] bg-[#F8FAFC] sm:grid-cols-3">
              <div className="border-b border-[#DCE4EC] p-4 sm:border-b-0 sm:border-r">
                <p className="text-lg font-black text-[#102A43]">
                  05
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#718096]">
                  Guided stages
                </p>
              </div>

              <div className="border-b border-[#DCE4EC] p-4 sm:border-b-0 sm:border-r">
                <p className="text-lg font-black text-[#1769D2]">
                  AI
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#718096]">
                  Scheme matching
                </p>
              </div>

              <div className="col-span-2 p-4 sm:col-span-1">
                <p className="text-lg font-black text-[#F47B20]">
                  PAN
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#718096]">
                  Partner network
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-[#06111D] p-4 sm:p-6 lg:p-8">
            <IndiaIllustration />
          </div>
        </div>
      </section>

      {/* =====================================================
          FIVE-STEP JOURNEY
          ===================================================== */}
      <section className="border-b border-[#DCE4EC] bg-[#F7F9FC]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#1769D2]">
                Your journey
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.025em] text-[#102A43] sm:text-4xl">
                Five steps. One guided path.
              </h2>
            </div>

            <p className="max-w-xl text-xs font-medium leading-5 text-[#68798C] lg:text-right">
              Every stage is completed in order. Later tools become
              available only after the required previous stage has
              been completed.
            </p>
          </div>

          <div className="mt-8 grid border border-[#CBD5E1] bg-[#CBD5E1] md:grid-cols-5">
            {JOURNEY_STEPS.map((item, index) => (
              <article
                key={item.number}
                className={`bg-white p-5 sm:p-6 ${
                  index !== JOURNEY_STEPS.length - 1
                    ? "border-b border-[#CBD5E1] md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`text-3xl font-black tracking-[-0.04em] ${
                      item.accent === "orange"
                        ? "text-[#F47B20]"
                        : "text-[#1769D2]"
                    }`}
                  >
                    {item.number}
                  </span>

                  <StepIcon
                    number={item.number}
                    accent={item.accent as "blue" | "orange"}
                  />
                </div>

                <h3 className="mt-7 min-h-[52px] text-base font-black leading-5 text-[#102A43]">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs font-medium leading-5 text-[#68798C]">
                  {item.description}
                </p>

                <div className="mt-6 border-t border-[#E2E8F0] pt-3">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#8492A6]">
                    {index === 0
                      ? "Journey starts here"
                      : index === 4
                        ? "Final journey stage"
                        : "Next stage unlocks after completion"}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 border-l-2 border-[#F47B20] bg-white px-5 py-4">
            <p className="text-xs font-extrabold text-[#8A4B0F]">
              Guided access
            </p>

            <p className="mt-1 text-[11px] font-medium leading-5 text-[#725A43]">
              NIRVAAN does not provide direct shortcuts to later
              stages. Complete each stage in sequence so the
              information required by the next stage is available.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT + CONTACT
          ===================================================== */}
      <section
        id="about"
        className="border-b border-[#DCE4EC] bg-white"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid border border-[#CBD5E1] lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#1769D2]">
                About NIRVAAN
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[#102A43] sm:text-3xl">
                NIRVAAN
              </h2>

              <p className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#718096]">
                India&apos;s Official Loan Assistance Portal
              </p>

              <p className="mt-6 max-w-2xl text-sm font-medium leading-6 text-[#607086]">
                NIRVAAN is designed to simplify the process of
                discovering suitable government loan schemes and
                preparing for the next steps. The platform brings
                verification, applicant assessment, AI-assisted
                scheme matching, financial planning and partner
                routing into one structured journey.
              </p>

              <div className="mt-7 border-l-2 border-[#F47B20] bg-[#FFF9F3] px-5 py-4">
                <p className="text-xs font-extrabold text-[#8A4B0F]">
                  Important information
                </p>

                <p className="mt-1 text-[11px] font-medium leading-5 text-[#725A43]">
                  NIRVAAN is an independent assistance platform.
                  It does not make final eligibility, sanction,
                  approval or disbursement decisions. Final
                  decisions remain with the relevant government
                  scheme authorities, financial institutions or
                  lending partners.
                </p>
              </div>
            </div>

            <div
              id="help"
              className="border-t border-[#CBD5E1] bg-[#F7F9FC] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10"
            >
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#F47B20]">
                Help Portal
              </p>

              <h2 className="mt-2 text-2xl font-black text-[#102A43]">
                Contact NIRVAAN
              </h2>

              <p className="mt-3 text-xs font-medium leading-5 text-[#68798C]">
                Need help understanding the journey or preparing
                for your application? Reach the NIRVAAN assistance
                team.
              </p>

              <div className="mt-7 border border-[#CBD5E1] bg-white">
                <div className="border-b border-[#E2E8F0] p-5">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#8492A6]">
                    Phone
                  </p>

                  <a
                    href="tel:+918888565758"
                    className="mt-2 block text-base font-black text-[#1769D2] hover:text-[#0F56B2]"
                  >
                    +91 8888565758
                  </a>
                </div>

                <div className="p-5">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#8492A6]">
                    Email
                  </p>

                  <a
                    href="mailto:nirvaanscheme@gmail.com"
                    className="mt-2 block break-all text-sm font-black text-[#1769D2] hover:text-[#0F56B2]"
                  >
                    nirvaanscheme@gmail.com
                  </a>
                </div>
              </div>

              <Link
                href="/wizard"
                className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center border border-[#1769D2] bg-[#1769D2] px-5 text-[10px] font-extrabold tracking-[0.08em] text-white hover:bg-[#0F56B2]"
              >
                START YOUR JOURNEY
                <span className="ml-3 text-base">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          END OF HOMEPAGE
          ===================================================== */}
      <section className="bg-[#102A43]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-lg font-black tracking-[0.04em] text-white">
              NIRVAAN
            </p>

            <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#AFC2D5]">
              India&apos;s Official Loan Assistance Portal
            </p>
          </div>

          <p className="max-w-2xl text-[10px] font-medium leading-5 text-[#B9C8D6] lg:text-right">
            A structured assistance journey for scheme discovery,
            financial planning and partner routing.
          </p>
        </div>
      </section>
    </main>
  );
}
