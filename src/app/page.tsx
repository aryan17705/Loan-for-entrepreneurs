"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Verify Identity",
    description: "Secure DigiLocker verification with Aadhaar or PAN.",
    href: "/wizard",
    icon: "shield",
  },
  {
    number: "02",
    title: "Earning Status",
    description: "Select your earning status and complete the required checks.",
    href: "/wizard",
    icon: "person",
  },
  {
    number: "03",
    title: "Scheme Matching",
    description: "Answer a few questions and get AI-powered scheme recommendations.",
    href: "/recommendation",
    icon: "target",
  },
  {
    number: "04",
    title: "Financial Calculator",
    description: "Calculate loan amount, EMI, interest and repayment details.",
    href: "/calculator",
    icon: "calculator",
  },
  {
    number: "05",
    title: "Partner Locator",
    description: "Find trusted banks, NBFCs and partners near you.",
    href: "/locator",
    icon: "location",
  },
];

function StepIcon({ type }: { type: string }) {
  if (type === "shield") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      >
        <path d="M32 7 51 14v14c0 13-7.5 23.5-19 29C20.5 51.5 13 41 13 28V14z" />
        <path d="m22 31 7 7 14-15" />
      </svg>
    );
  }

  if (type === "person") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      >
        <circle cx="32" cy="19" r="10" />
        <path d="M13 55c1.8-12 8.5-19 19-19s17.2 7 19 19" />
      </svg>
    );
  }

  if (type === "target") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <circle cx="30" cy="34" r="17" />
        <circle cx="30" cy="34" r="8" />
        <path d="M30 34 51 13" />
        <path d="M45 13h9v9" />
        <path d="M39 22c5 1 9 5 10 10" />
      </svg>
    );
  }

  if (type === "calculator") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <rect x="14" y="7" width="36" height="50" />
        <rect x="21" y="14" width="22" height="9" />
        <path d="M21 31h5M32 31h5M43 31h0M21 40h5M32 40h5M43 40h0M21 49h5M32 49h5M43 49h0" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      className="h-10 w-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M32 57s19-17.5 19-34C51 12.5 42.5 5 32 5S13 12.5 13 23c0 16.5 19 34 19 34Z" />
      <circle cx="32" cy="23" r="7" />
    </svg>
  );
}

function IndiaNetworkIllustration() {
  return (
    <div className="relative mx-auto h-[330px] w-full max-w-[470px] sm:h-[390px]">
      <svg
        viewBox="0 0 500 430"
        className="h-full w-full"
        fill="none"
        aria-label="India financial support network illustration"
        role="img"
      >
        <g opacity="0.35" stroke="#1769D2" strokeWidth="1">
          <path d="M70 70h350M40 130h410M35 190h430M45 250h420M70 310h350" />
          <path d="M100 30v340M170 25v380M250 20v390M330 25v380M400 40v350" />
        </g>

        <path
          d="M245 33
             275 45
             291 67
             322 81
             316 106
             342 124
             329 149
             344 174
             331 196
             338 226
             320 245
             322 272
             299 291
             290 319
             271 338
             258 375
             240 397
             222 366
             207 346
             188 331
             177 302
             153 284
             160 257
             143 235
             154 211
             137 189
             157 167
             153 139
             177 122
             175 98
             202 89
             213 60Z"
          fill="#F8FBFE"
          stroke="#7FA9D8"
          strokeWidth="2"
        />

        <g stroke="#1769D2" strokeWidth="1.4" opacity="0.5">
          <path d="M205 111 260 154 300 116 321 190 285 231 245 204 201 250 173 214" />
          <path d="M260 154 245 204 285 231 270 285 222 300" />
          <path d="M300 116 321 190" />
          <path d="M201 250 222 300" />
          <path d="M173 214 201 250" />
        </g>

        <g fill="#1769D2">
          <circle cx="205" cy="111" r="5" />
          <circle cx="260" cy="154" r="5" />
          <circle cx="300" cy="116" r="5" />
          <circle cx="321" cy="190" r="5" />
          <circle cx="285" cy="231" r="5" />
          <circle cx="245" cy="204" r="5" />
          <circle cx="201" cy="250" r="5" />
          <circle cx="173" cy="214" r="5" />
          <circle cx="270" cy="285" r="5" />
          <circle cx="222" cy="300" r="5" />
        </g>

        <g fill="#F47B20">
          <circle cx="260" cy="154" r="3.5" />
          <circle cx="321" cy="190" r="3.5" />
          <circle cx="201" cy="250" r="3.5" />
          <circle cx="270" cy="285" r="3.5" />
        </g>

        <g transform="translate(360 55)">
          <circle cx="42" cy="42" r="35" fill="#FFFFFF" stroke="#B8CCE1" />
          <path
            d="M24 50h36M28 50V31h32v19M24 31h40M34 31v-7h20v7M38 37v9M46 37v9M54 37v9"
            stroke="#1769D2"
            strokeWidth="2"
          />
        </g>

        <g transform="translate(377 157)">
          <circle cx="42" cy="42" r="35" fill="#FFFFFF" stroke="#B8CCE1" />
          <circle cx="42" cy="32" r="9" stroke="#1769D2" strokeWidth="2" />
          <path
            d="M25 61c1.5-11 7-17 17-17s15.5 6 17 17"
            stroke="#1769D2"
            strokeWidth="2"
          />
          <circle cx="20" cy="38" r="6" stroke="#1769D2" />
          <circle cx="64" cy="38" r="6" stroke="#1769D2" />
        </g>

        <g transform="translate(365 270)">
          <circle cx="42" cy="42" r="35" fill="#FFFFFF" stroke="#B8CCE1" />
          <text
            x="42"
            y="55"
            textAnchor="middle"
            fontSize="42"
            fontWeight="500"
            fill="#1769D2"
          >
            ₹
          </text>
        </g>

        <g transform="translate(85 175)">
          <circle cx="42" cy="42" r="35" fill="#FFFFFF" stroke="#B8CCE1" />
          <rect
            x="25"
            y="25"
            width="34"
            height="38"
            stroke="#1769D2"
            strokeWidth="2"
          />
          <path d="M32 36h20M32 43h20M32 50h13" stroke="#1769D2" />
        </g>

        <g transform="translate(95 295)">
          <circle cx="42" cy="42" r="35" fill="#FFFFFF" stroke="#B8CCE1" />
          <path
            d="M23 42h38M42 23v38M28 29c5 6 10 8 14 8s9-2 14-8M28 55c5-6 10-8 14-8s9 2 14 8"
            stroke="#1769D2"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full overflow-hidden bg-white text-[#102A43]">
      <main>
        {/* HERO */}
        <section className="border-b border-[#E2E8F0] bg-white">
          <div className="mx-auto grid min-h-[590px] w-full max-w-[1440px] items-center px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-16">
            <div className="relative z-10 max-w-[610px]">
              <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[3px] text-[#F47B20]">
                GOVERNMENT SCHEME ASSISTANCE
              </p>

              <h1 className="text-[42px] font-extrabold leading-[1.08] tracking-[-1.5px] text-[#102A43] sm:text-[54px] lg:text-[64px]">
                Find the right
                <br />
                scheme.
                <br />
                <span className="text-[#1769D2]">
                  Get your financial support.
                </span>
              </h1>

              <div className="mt-7 h-[3px] w-[56px] bg-[#F47B20]" />

              <p className="mt-7 max-w-[540px] text-[15px] font-medium leading-7 text-[#486581] sm:text-[16px]">
                Discover suitable government schemes, understand your
                financing options, prepare your application and find a
                partner to take the next step.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => router.push("/wizard")}
                  className="border border-[#1769D2] bg-[#1769D2] px-7 py-4 text-left text-[12px] font-extrabold tracking-[0.7px] text-white transition-colors hover:bg-[#0F56B2]"
                >
                  START YOUR JOURNEY
                  <span className="ml-7 text-lg">→</span>
                </button>

                <Link
                  href="/locator"
                  className="border border-[#B9C9D8] bg-white px-7 py-4 text-center text-[12px] font-extrabold tracking-[0.5px] text-[#1769D2] hover:bg-[#F5F9FD]"
                >
                  FIND A PARTNER
                </Link>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center lg:mt-0">
              <IndiaNetworkIllustration />
            </div>
          </div>
        </section>

        {/* FIVE STEP JOURNEY */}
        <section className="bg-white">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4">
                <span className="hidden h-[2px] w-14 bg-[#1769D2] sm:block" />
                <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#F47B20]">
                  A SIMPLE FIVE-STEP JOURNEY
                </span>
                <span className="hidden h-[2px] w-14 bg-[#1769D2] sm:block" />
              </div>

              <h2 className="mx-auto mt-4 max-w-[650px] text-[30px] font-extrabold leading-tight tracking-[-0.7px] text-[#102A43] sm:text-[38px]">
                From verification to financing
                <br className="hidden sm:block" /> in five simple steps
              </h2>
            </div>

            <div className="relative mt-10 lg:mt-12">
              <div className="hidden lg:absolute lg:left-[8%] lg:right-[8%] lg:top-[57px] lg:block lg:border-t-2 lg:border-dashed lg:border-[#B8CCE1]" />

              <div className="grid gap-3 lg:grid-cols-5 lg:gap-4">
                {JOURNEY_STEPS.map((step) => (
                  <Link
                    key={step.number}
                    href={step.href}
                    className="group relative flex min-h-[220px] flex-row items-center border border-[#DCE4EC] bg-white p-5 transition-colors hover:border-[#1769D2] hover:bg-[#F8FBFE] lg:min-h-[290px] lg:flex-col lg:items-start lg:p-6"
                  >
                    <div className="relative z-10 flex h-[76px] w-[76px] shrink-0 items-center justify-center border border-[#DCE4EC] bg-[#F4F8FD] text-[#1769D2] lg:h-[82px] lg:w-[82px]">
                      <StepIcon type={step.icon} />
                    </div>

                    <div className="ml-5 flex-1 lg:ml-0 lg:mt-6">
                      <div className="text-[28px] font-extrabold leading-none text-[#1769D2]">
                        {step.number}
                      </div>

                      <h3 className="mt-2 text-[16px] font-extrabold text-[#102A43]">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-[12px] font-medium leading-5 text-[#627D98]">
                        {step.description}
                      </p>
                    </div>

                    <span className="ml-3 text-3xl font-light text-[#1769D2] lg:absolute lg:right-5 lg:top-6">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT + CONTACT */}
        <section
          id="about"
          className="border-t border-[#DCE4EC] bg-[#102A43] text-white"
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[3px] text-[#F47B20]">
                  ABOUT NIRVAAN
                </p>

                <h2 className="mt-5 text-[34px] font-extrabold tracking-[-0.8px] text-white sm:text-[42px]">
                  NIRVAAN
                </h2>

                <p className="mt-2 text-[11px] font-semibold tracking-[0.8px] text-[#B8CCE1]">
                  India&apos;s Official Loan Assistance Portal
                </p>

                <div className="mt-6 h-[3px] w-[55px] bg-[#F47B20]" />

                <p className="mt-6 max-w-[520px] text-[15px] font-medium leading-7 text-[#D9E4EF]">
                  An independent platform for discovering government schemes,
                  understanding financing options and preparing applications.
                </p>

                <div className="mt-7 border-l-2 border-[#F47B20] bg-[#173A5C] px-5 py-4">
                  <p className="text-[13px] font-extrabold leading-5 text-white">
                    NIRVAAN is not a government department, bank or lending
                    institution.
                  </p>

                  <p className="mt-2 text-[12px] font-medium leading-5 text-[#B8CCE1]">
                    Scheme eligibility, final approval, sanction and
                    disbursement are determined by the relevant institutions
                    and applicable rules.
                  </p>
                </div>
              </div>

              <div id="help">
                <p className="text-[11px] font-extrabold uppercase tracking-[3px] text-[#F47B20]">
                  HELP PORTAL
                </p>

                <h2 className="mt-5 text-[30px] font-extrabold text-white sm:text-[36px]">
                  Need assistance?
                </h2>

                <p className="mt-4 max-w-[620px] text-[14px] font-medium leading-6 text-[#D9E4EF]">
                  Contact the NIRVAAN assistance team for help understanding
                  the platform and preparing your journey.
                </p>

                <div className="mt-8 grid gap-4">
                  <a
                    href="tel:+918888565758"
                    className="group flex min-h-[112px] items-center border border-[#315A7D] bg-[#173A5C] px-6 transition-colors hover:border-[#1769D2] sm:px-7"
                  >
                    <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center bg-[#1769D2] text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path d="M7 4h3l2 5-2 2c1.5 3 3 4.5 6 6l2-2 5 2v3c0 1-1 2-2 2C11 22 2 13 2 3c0-1 1-2 2-2h3Z" />
                      </svg>
                    </span>

                    <span className="ml-6">
                      <span className="block text-[11px] font-extrabold uppercase tracking-[2px] text-[#B8CCE1]">
                        PHONE
                      </span>
                      <span className="mt-2 block text-[18px] font-extrabold text-white">
                        +91 8888565758
                      </span>
                    </span>
                  </a>

                  <a
                    href="mailto:nirvaanscheme@gmail.com"
                    className="group flex min-h-[112px] items-center border border-[#315A7D] bg-[#173A5C] px-6 transition-colors hover:border-[#1769D2] sm:px-7"
                  >
                    <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center bg-[#1769D2] text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <rect x="3" y="5" width="18" height="14" />
                        <path d="m4 7 8 6 8-6" />
                      </svg>
                    </span>

                    <span className="ml-6">
                      <span className="block text-[11px] font-extrabold uppercase tracking-[2px] text-[#B8CCE1]">
                        EMAIL
                      </span>
                      <span className="mt-2 block break-all text-[16px] font-extrabold text-white sm:text-[18px]">
                        nirvaanscheme@gmail.com
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-14 border-t border-[#315A7D] pt-6 text-[11px] font-medium leading-5 text-[#9FB4C8]">
              NIRVAAN is an independent platform for scheme discovery,
              financing guidance and application assistance. Final
              eligibility, approval, sanction and disbursement remain with
              the relevant institutions.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
