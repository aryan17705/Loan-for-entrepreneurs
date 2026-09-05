"use client";

import Link from "next/link";
import NirvaanAI from "@/components/NirvaanAI";

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Verification",
    description:
      "Verify your identity and establish the basic information required to begin your assistance journey.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="6" y="4" width="20" height="24" />
        <path d="M11 10h10" />
        <path d="M11 15h10" />
        <path d="M11 20h6" />
        <path d="m20 20 2 2 4-5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Earning Status",
    description:
      "Establish whether you are earning or non-earning and complete the relevant assessment route.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="4" y="8" width="24" height="18" />
        <path d="M11 8V5h10v3" />
        <path d="M4 14h24" />
        <path d="M13 14v4h6v-4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Smart Scheme Recommender",
    description:
      "Use verified information to identify suitable government loan schemes and understand the available support.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="16" cy="16" r="10" />
        <path d="M16 10v6l4 3" />
        <path d="M8 8 6 6" />
        <path d="m24 8 2-2" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Financial Calculator",
    description:
      "Select an eligible loan amount and explore repayment planning based on your recommended financial option.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="6" y="4" width="20" height="24" />
        <rect x="10" y="8" width="12" height="5" />
        <path d="M10 17h3" />
        <path d="M16 17h3" />
        <path d="M22 17h0" />
        <path d="M10 22h3" />
        <path d="M16 22h3" />
        <path d="M22 22h0" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Geo-Spatial Partner Locator & Router",
    description:
      "Locate available partner institutions across India and route your application journey to the appropriate partner.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M16 27s8-8.2 8-14a8 8 0 1 0-16 0c0 5.8 8 14 8 14Z" />
        <circle cx="16" cy="13" r="2.5" />
        <path d="M7 25h5" />
        <path d="M20 25h5" />
      </svg>
    ),
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M16 27s8-8.2 8-14a8 8 0 1 0-16 0c0 5.8 8 14 8 14Z" />
      <circle cx="16" cy="13" r="2.5" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="nirvaan-page">
      {/* -------------------------------------------------
          HERO
      ------------------------------------------------- */}

      <section className="relative overflow-hidden border-b border-[var(--nirvaan-border)]">
        <div className="nirvaan-hero absolute inset-0 z-0" />

        <div className="nirvaan-fabric-background" aria-hidden="true">
          <img src="/nirvaan-fabric.jpg" alt="" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[620px] w-full max-w-[1440px] grid-cols-1 items-center px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-16">
          <div className="relative z-20 max-w-[640px]">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[var(--nirvaan-orange)]" />

              <span className="text-[10px] font-bold tracking-[2px] text-[var(--nirvaan-blue)]">
                FINANCIAL SUPPORT ASSISTANCE
              </span>
            </div>

            <h1 className="nirvaan-text-strong max-w-[680px] text-[44px] font-extrabold leading-[1.05] tracking-[-1.5px] sm:text-[58px] lg:text-[70px]">
              Find the right scheme.
              <br />
              <span className="nirvaan-blue">
                Get your financial support.
              </span>
            </h1>

            <p className="nirvaan-muted mt-7 max-w-[560px] text-[14px] font-medium leading-7 sm:text-[15px]">
              Follow a structured assistance journey designed to
              help you verify your information, understand your
              eligibility, identify suitable loan schemes, plan
              repayment and reach the appropriate partner.
            </p>

            <div className="mt-9">
              <Link
                href="/wizard"
                className="nirvaan-primary text-[11px]"
              >
                START YOUR JOURNEY
                <span className="ml-3">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
    PARTNER LOCATIONS & ROUTES
------------------------------------------------- */}

<section className="border-b border-[var(--nirvaan-border)]">
  <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
    <div className="relative overflow-hidden border border-[var(--nirvaan-border)] bg-[var(--nirvaan-surface-2)]">
      <div className="grid min-h-[190px] grid-cols-1 items-center lg:grid-cols-[230px_1fr_auto]">
        
        {/* MAP AREA */}
        <div className="relative flex min-h-[170px] items-center justify-center overflow-hidden border-b border-[var(--nirvaan-border)] lg:min-h-[190px] lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 220 230"
            className="h-[155px] w-[155px] sm:h-[170px] sm:w-[170px]"
            fill="none"
            aria-hidden="true"
          >
            {/* Stylized India map */}
            <path
              d="M91 16
                L112 23
                L119 39
                L137 43
                L143 58
                L160 66
                L157 82
                L174 91
                L166 106
                L171 119
                L158 129
                L155 148
                L143 157
                L137 176
                L126 188
                L119 207
                L108 216
                L101 201
                L92 191
                L88 174
                L77 161
                L70 143
                L58 134
                L62 119
                L50 108
                L55 94
                L45 82
                L58 72
                L56 58
                L70 53
                L72 38
                L86 34
                Z"
              fill="rgba(23, 105, 210, 0.06)"
              stroke="var(--nirvaan-blue)"
              strokeWidth="1.4"
            />

            {/* Route */}
            <path
              d="M82 70 C112 83 130 103 118 126 C110 142 111 163 124 183"
              stroke="var(--nirvaan-blue)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity="0.7"
            />

            {/* Location pins */}
            <g transform="translate(82 70)">
              <circle
                cx="0"
                cy="0"
                r="7"
                fill="white"
                stroke="var(--nirvaan-blue)"
                strokeWidth="2"
              />
              <circle
                cx="0"
                cy="0"
                r="2.5"
                fill="var(--nirvaan-blue)"
              />
            </g>

            <g transform="translate(118 126)">
              <circle
                cx="0"
                cy="0"
                r="7"
                fill="white"
                stroke="var(--nirvaan-blue)"
                strokeWidth="2"
              />
              <circle
                cx="0"
                cy="0"
                r="2.5"
                fill="var(--nirvaan-blue)"
              />
            </g>

            <g transform="translate(124 183)">
              <circle
                cx="0"
                cy="0"
                r="7"
                fill="white"
                stroke="var(--nirvaan-orange)"
                strokeWidth="2"
              />
              <circle
                cx="0"
                cy="0"
                r="2.5"
                fill="var(--nirvaan-orange)"
              />
            </g>
          </svg>
        </div>

        {/* TITLE */}
        <div className="px-6 py-7 sm:px-8 lg:px-9">
          <p className="text-[9px] font-bold tracking-[2px] text-[var(--nirvaan-orange)]">
            EXPLORE NEARBY SUPPORT
          </p>

          <h2 className="nirvaan-text-strong mt-2 max-w-[420px] text-[22px] font-extrabold leading-[1.08] sm:text-[26px]">
            OUR PARTNERS&apos;
            <br />
            <span className="nirvaan-blue">
              LOCATIONS &amp; ROUTES
            </span>
          </h2>

          <p className="nirvaan-muted mt-4 max-w-[560px] text-[12px] font-medium leading-6 sm:text-[13px]">
            Find our partner institutions across India, explore nearby
            partners, and view routes.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <span className="nirvaan-muted text-[10px] font-semibold">
              Partner institutions across India
            </span>

            <span className="nirvaan-muted text-[10px] font-semibold">
              Explore nearby partners
            </span>

            <span className="nirvaan-muted text-[10px] font-semibold">
              View routes
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-7 sm:px-8 lg:px-7 lg:pb-0">
          <Link
            href="/partner-location"
            className="nirvaan-primary w-full justify-center text-[10px] sm:w-auto"
          >
            EXPLORE PARTNERS
            <span className="ml-3">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>

      {/* INFORMATION NOTE */}
      <div className="border-t border-[var(--nirvaan-border)] px-5 py-3 sm:px-6">
        <p className="nirvaan-muted text-[9px] font-semibold leading-5">
          <span className="text-[var(--nirvaan-orange)]">
            INFORMATION ONLY:
          </span>{" "}
          Partner locations and routes can be explored independently. To
          proceed with loan assistance, you must complete the required stages
          of the NIRVAAN journey.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* -------------------------------------------------
          FIVE STEP JOURNEY
      ------------------------------------------------- */}

      <section
        id="journey"
        className="border-b border-[var(--nirvaan-border)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-[760px]">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[var(--nirvaan-orange)]" />

              <span className="text-[10px] font-bold tracking-[2px] text-[var(--nirvaan-blue)]">
                FIVE-STEP JOURNEY
              </span>
            </div>

            <h2 className="nirvaan-text-strong text-[32px] font-extrabold leading-tight sm:text-[42px]">
              One journey.
              <br />
              <span className="nirvaan-blue">
                Everything in order.
              </span>
            </h2>

            <p className="nirvaan-muted mt-5 max-w-[700px] text-[13px] font-medium leading-6">
              Your assistance journey follows a fixed sequence.
              Each stage builds on the information completed in
              the previous stage.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {JOURNEY_STEPS.map((step) => (
              <article
                key={step.number}
                className="nirvaan-step flex min-h-[190px] flex-col p-5 sm:min-h-[220px] sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="nirvaan-step-number text-[25px] font-extrabold tracking-[-0.5px]">
                    {step.number}
                  </span>

                  <span className="nirvaan-step-icon">
                    {step.icon}
                  </span>
                </div>

                <div className="mt-7 sm:mt-10">
                  <h3 className="nirvaan-text-strong text-[17px] font-extrabold leading-6">
                    {step.title}
                  </h3>

                  <p className="nirvaan-muted mt-4 text-[11px] font-medium leading-5">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-[var(--nirvaan-orange)] bg-[var(--nirvaan-surface-2)] px-5 py-4">
            <p className="nirvaan-muted text-[11px] font-semibold leading-5">
              <span className="nirvaan-text-strong">
                The journey is sequential.
              </span>{" "}
              Later stages become available only after the required previous
              stage has been completed.{" "}
              <span className="nirvaan-blue">
                Partner locations and routes can be accessed independently at
                any time.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          CONTACT
      ------------------------------------------------- */}

      <section
        id="contact"
        className="border-b border-[var(--nirvaan-border)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 py-3 sm:px-8 lg:px-10">
          <span className="text-[9px] font-bold tracking-[2px] text-[var(--nirvaan-blue)]">
            CONTACT US
          </span>

          <div className="mt-3 flex flex-col gap-2 text-[11px] font-medium sm:flex-row sm:gap-8">
            <span className="nirvaan-muted">
              Phone no -{" "}
              <a
                href="tel:+919373542405"
                className="nirvaan-text-strong hover:text-[var(--nirvaan-blue)]"
              >
                +91 9373542405
              </a>
            </span>

            <span className="nirvaan-muted">
              Email -{" "}
              <a
                href="mailto:nirvaanscheme@gmail.com"
                className="nirvaan-text-strong hover:text-[var(--nirvaan-blue)]"
              >
                nirvaanscheme@gmail.com
              </a>
            </span>
          </div>
        </div>
      </section>

      <NirvaanAI />
    </div>
  );
        }
