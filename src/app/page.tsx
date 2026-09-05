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
          FIVE STEP JOURNEY
      ------------------------------------------------- */}

      <section
        id="journey"
        className="border-b border-[var(--nirvaan-border)]"
      >
        <div className="mx-auto w-full max-w-[1100px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
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

          <div className="relative mt-14">
            <div className="absolute left-[23px] top-8 bottom-8 w-px bg-[var(--nirvaan-border)] sm:left-[31px]" />

            <div className="space-y-7">
              {JOURNEY_STEPS.map((step, index) => (
                <article
                  key={step.number}
                  className="relative grid grid-cols-[48px_1fr] gap-5 sm:grid-cols-[64px_1fr] sm:gap-6"
                >
                  <div className="relative z-10 flex items-start justify-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center border-2 bg-white text-[12px] font-extrabold sm:h-16 sm:w-16 sm:text-[14px] ${
                        index % 2 === 0
                          ? "border-[var(--nirvaan-blue)] text-[var(--nirvaan-blue)]"
                          : "border-[var(--nirvaan-orange)] text-[var(--nirvaan-orange)]"
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>

                  <div
                    className={`border bg-[var(--nirvaan-surface-2)] p-5 sm:p-7 ${
                      index % 2 === 0
                        ? "border-[var(--nirvaan-border)]"
                        : "border-[var(--nirvaan-border)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <div
                          className={`mb-2 text-[9px] font-bold tracking-[2px] ${
                            index % 2 === 0
                              ? "text-[var(--nirvaan-blue)]"
                              : "text-[var(--nirvaan-orange)]"
                          }`}
                        >
                          STEP {step.number}
                        </div>

                        <h3 className="nirvaan-text-strong text-[19px] font-extrabold leading-6 sm:text-[22px]">
                          {step.title}
                        </h3>
                      </div>

                      <span
                        className={`shrink-0 ${
                          index % 2 === 0
                            ? "text-[var(--nirvaan-blue)]"
                            : "text-[var(--nirvaan-orange)]"
                        }`}
                      >
                        {step.icon}
                      </span>
                    </div>

                    <p className="nirvaan-muted mt-4 max-w-[760px] text-[12px] font-medium leading-6 sm:text-[13px]">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 border-l-2 border-[var(--nirvaan-orange)] bg-[var(--nirvaan-surface-2)] px-5 py-4">
            <p className="nirvaan-muted text-[11px] font-semibold leading-5">
              <span className="nirvaan-text-strong">
                The journey is sequential.
              </span>{" "}
              Later stages become available only after the required
              previous stage has been completed.{" "}
              <span className="nirvaan-blue">
                Partner locations and routes can be accessed independently
                at any time.
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
