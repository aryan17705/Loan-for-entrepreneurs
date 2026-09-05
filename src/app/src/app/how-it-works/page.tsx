"use client";

import Link from "next/link";

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Verification",
    heading: "Start with your basic information.",
    description:
      "The journey begins by establishing the information required to understand your assistance needs. You provide the necessary identity and basic details so the platform can create the foundation for the remaining stages.",
    points: [
      "Identity verification",
      "Basic applicant information",
      "Initial eligibility-related details",
      "Creation of your assistance profile",
    ],
  },
  {
    number: "02",
    title: "Earning Status",
    heading: "Understand your financial position.",
    description:
      "NIRVAAN determines whether you are currently earning or non-earning and directs you through the relevant assessment route. This helps ensure that the information used in the next stage reflects your actual financial situation.",
    points: [
      "Earning / non-earning classification",
      "Relevant financial assessment",
      "Collection of required financial information",
    ],
  },
  {
    number: "03",
    title: "Smart Scheme Recommender",
    heading: "Find schemes relevant to your profile.",
    description:
      "Once the required information has been established, NIRVAAN uses the available information to identify government loan schemes that may be relevant to your circumstances. Instead of searching through numerous schemes manually, you receive a more focused set of options to explore.",
    points: [
      "Profile-based scheme matching",
      "Eligibility-oriented filtering",
      "Scheme details and available support",
      "Comparison of relevant options",
    ],
  },
  {
    number: "04",
    title: "Financial Calculator",
    heading: "Plan before you proceed.",
    description:
      "After identifying a suitable financial option, you can explore the loan amount and repayment structure before moving forward. The calculator helps you understand the financial commitment associated with the selected option.",
    points: [
      "Select loan amount",
      "Review repayment planning",
      "Understand estimated instalments",
      "Explore different financial scenarios",
    ],
  },
  {
    number: "05",
    title: "Geo-Spatial Partner Locator & Router",
    heading: "Find the right partner to continue your journey.",
    description:
      "Once your financial option has been identified and planned, NIRVAAN helps locate appropriate partner institutions based on geographical availability. The platform can help route your journey toward the relevant partner so that you know where to proceed next.",
    points: [
      "Locate partner institutions",
      "Explore nearby available partners",
      "Identify the appropriate institution",
      "Route your application journey",
    ],
  },
];

const DOCUMENT_GROUPS = [
  {
    title: "Identity & Basic Details",
    items: [
      "Aadhaar Card",
      "PAN Card",
      "Passport-size photograph",
      "Mobile number linked with your identity documents",
    ],
  },
  {
    title: "Address & Residence",
    items: [
      "Address proof",
      "Residential / domicile certificate, where applicable",
    ],
  },
  {
    title: "Income & Financial Information",
    items: [
      "Income certificate",
      "Bank account details",
      "Recent bank statement, where applicable",
      "Income-related supporting documents",
    ],
  },
  {
    title: "Category & Eligibility Documents",
    items: [
      "Caste / category certificate, where applicable",
      "Disability certificate, where applicable",
      "Other eligibility certificates required for a particular scheme",
    ],
  },
  {
    title: "Education / Business Documents",
    items: [
      "Educational certificates",
      "Business registration documents",
      "Business plan / project report",
      "Quotation or cost estimate",
      "Other scheme-specific documents",
    ],
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

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="nirvaan-page">
      {/* -------------------------------------------------
          HERO
      ------------------------------------------------- */}

      <section className="border-b border-[var(--nirvaan-border)]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-[900px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[var(--nirvaan-orange)]" />

              <span className="text-[10px] font-bold tracking-[2px] text-[var(--nirvaan-blue)]">
                HOW IT WORKS
              </span>
            </div>

            <h1 className="nirvaan-text-strong text-[42px] font-extrabold leading-[1.05] tracking-[-1.5px] sm:text-[58px] lg:text-[68px]">
              From verification to financial support,
              <br />
              <span className="nirvaan-blue">step by step.</span>
            </h1>

            <p className="nirvaan-muted mt-7 max-w-[760px] text-[14px] font-medium leading-7 sm:text-[15px]">
              NIRVAAN guides you through a structured assistance process to
              help you understand your eligibility, identify suitable
              government loan schemes, plan your financing, and connect with
              the appropriate partner institution.
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

      <section className="border-b border-[var(--nirvaan-border)]">
        <div className="mx-auto w-full max-w-[1100px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mb-14 max-w-[760px]">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[var(--nirvaan-orange)]" />

              <span className="text-[10px] font-bold tracking-[2px] text-[var(--nirvaan-blue)]">
                THE FIVE STAGES
              </span>
            </div>

            <h2 className="nirvaan-text-strong text-[32px] font-extrabold leading-tight sm:text-[44px]">
              One journey.
              <br />
              <span className="nirvaan-blue">Everything in order.</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute bottom-8 left-[23px] top-8 w-px bg-[var(--nirvaan-border)] sm:left-[31px]" />

            <div className="space-y-8">
              {JOURNEY_STEPS.map((step, index) => (
                <article
                  key={step.number}
                  className="relative grid grid-cols-[48px_1fr] gap-5 sm:grid-cols-[64px_1fr] sm:gap-7"
                >
                  <div className="relative z-10 flex justify-center">
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

                  <div className="border border-[var(--nirvaan-border)] bg-[var(--nirvaan-surface-2)] p-5 sm:p-8">
                    <div
                      className={`text-[9px] font-bold tracking-[2px] ${
                        index % 2 === 0
                          ? "text-[var(--nirvaan-blue)]"
                          : "text-[var(--nirvaan-orange)]"
                      }`}
                    >
                      STEP {step.number}
                    </div>

                    <h3 className="nirvaan-text-strong mt-2 text-[21px] font-extrabold leading-7 sm:text-[25px]">
                      {step.title}
                    </h3>

                    <p className="nirvaan-text-strong mt-5 text-[14px] font-bold leading-6">
                      {step.heading}
                    </p>

                    <p className="nirvaan-muted mt-3 max-w-[800px] text-[12px] font-medium leading-6 sm:text-[13px]">
                      {step.description}
                    </p>

                    <div className="mt-6 border-t border-[var(--nirvaan-border)] pt-5">
                      <p className="nirvaan-text-strong text-[9px] font-bold tracking-[2px]">
                        WHAT HAPPENS HERE
                      </p>

                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {step.points.map((point) => (
                          <div
                            key={point}
                            className="flex items-start gap-3"
                          >
                            <span
                              className={
                                index % 2 === 0
                                  ? "mt-0.5 text-[var(--nirvaan-blue)]"
                                  : "mt-0.5 text-[var(--nirvaan-orange)]"
                              }
                            >
                              <CheckIcon />
                            </span>

                            <span className="nirvaan-muted text-[11px] font-semibold leading-5">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {index < JOURNEY_STEPS.length - 1 ? (
                      <div className="mt-6 border-t border-[var(--nirvaan-border)] pt-4">
                        <span className="nirvaan-muted text-[9px] font-bold tracking-[1.5px]">
                          NEXT:{" "}
                        </span>

                        <span className="text-[9px] font-bold tracking-[1.5px] text-[var(--nirvaan-blue)]">
                          {JOURNEY_STEPS[index + 1].title}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          SEQUENTIAL JOURNEY
      ------------------------------------------------- */}

      <section className="border-b border-[var(--nirvaan-border)]">
        <div className="mx-auto w-full max-w-[1100px] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div className="border-l-2 border-[var(--nirvaan-orange)] bg-[var(--nirvaan-surface-2)] px-6 py-6 sm:px-8 sm:py-8">
            <p className="text-[9px] font-bold tracking-[2px] text-[var(--nirvaan-orange)]">
              THE JOURNEY IS SEQUENTIAL
            </p>

            <h2 className="nirvaan-text-strong mt-3 text-[24px] font-extrabold sm:text-[30px]">
              01 → 02 → 03 → 04 → 05
            </h2>

            <p className="nirvaan-muted mt-4 max-w-[850px] text-[12px] font-medium leading-6 sm:text-[13px]">
              The five stages are designed to work in order. Each completed
              stage provides information required for the next stage. Later
              stages of the assistance journey become available only after
              the required previous stage has been completed.
            </p>

            <div className="mt-6 border-t border-[var(--nirvaan-border)] pt-5">
              <p className="text-[9px] font-bold tracking-[2px] text-[var(--nirvaan-blue)]">
                ONE EXCEPTION
              </p>

              <p className="nirvaan-text-strong mt-2 text-[12px] font-bold leading-6 sm:text-[13px]">
                Partner locations and routes can be accessed independently at
                any time.
              </p>

              <p className="nirvaan-muted mt-2 max-w-[850px] text-[11px] font-medium leading-5">
                This is important because the locator is useful even for
                someone who simply wants to find available partner
                institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          DOCUMENTS REQUIRED
      ------------------------------------------------- */}

      <section className="border-b border-[var(--nirvaan-border)]">
        <div className="mx-auto w-full max-w-[1100px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-[800px]">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[var(--nirvaan-orange)]" />

              <span className="text-[10px] font-bold tracking-[2px] text-[var(--nirvaan-blue)]">
                DOCUMENTS REQUIRED
              </span>
            </div>

            <h2 className="nirvaan-text-strong text-[32px] font-extrabold leading-tight sm:text-[44px]">
              Keep your documents ready.
            </h2>

            <p className="nirvaan-muted mt-5 max-w-[760px] text-[13px] font-medium leading-6 sm:text-[14px]">
              The exact documents required may vary depending on your profile,
              eligibility, and the government loan scheme you are matched
              with. NIRVAAN will guide you toward the relevant requirements
              during the assistance process.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {DOCUMENT_GROUPS.map((group) => (
              <article
                key={group.title}
                className="border border-[var(--nirvaan-border)] bg-[var(--nirvaan-surface-2)] p-6 sm:p-7"
              >
                <h3 className="nirvaan-text-strong text-[16px] font-extrabold">
                  {group.title}
                </h3>

                <div className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 text-[var(--nirvaan-blue)]">
                        <CheckIcon />
                      </span>

                      <span className="nirvaan-muted text-[11px] font-semibold leading-5">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-[var(--nirvaan-blue)] bg-[var(--nirvaan-surface-2)] px-5 py-5 sm:px-6">
            <p className="text-[9px] font-bold tracking-[2px] text-[var(--nirvaan-blue)]">
              IMPORTANT
            </p>

            <p className="nirvaan-text-strong mt-3 text-[12px] font-bold leading-6">
              You may not need every document listed above.
            </p>

            <p className="nirvaan-muted mt-2 text-[11px] font-medium leading-5">
              Document requirements depend on the scheme, applicant profile,
              loan type, and applicable eligibility conditions. The final
              list should be checked against the requirements of the selected
              scheme and partner institution.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          FINAL CTA
      ------------------------------------------------- */}

      <section>
        <div className="mx-auto w-full max-w-[1100px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="border border-[var(--nirvaan-border)] bg-[var(--nirvaan-surface-2)] px-6 py-10 text-center sm:px-10 sm:py-14">
            <p className="text-[9px] font-bold tracking-[2px] text-[var(--nirvaan-orange)]">
              READY TO BEGIN?
            </p>

            <h2 className="nirvaan-text-strong mt-3 text-[30px] font-extrabold sm:text-[40px]">
              Start your NIRVAAN journey.
            </h2>

            <p className="nirvaan-muted mx-auto mt-4 max-w-[620px] text-[12px] font-medium leading-6 sm:text-[13px]">
              Move through each stage in order and discover the financial
              assistance options relevant to you.
            </p>

            <div className="mt-7 flex justify-center">
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
    </main>
  );
}
