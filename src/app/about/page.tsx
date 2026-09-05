"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="nirvaan-page min-h-screen">
      {/* Hero */}
      <section className="border-b border-[#dce4ec] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#f28c28]">
              About NIRVAAN
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight text-[#071a2b] sm:text-5xl lg:text-6xl">
              India&apos;s Official{" "}
              <span className="text-[#1769d2]">
                Loan Assistance Platform
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[#5a6e85] sm:text-lg">
              NIRVAAN is an India&apos;s Official Loan Assistance Platform
              designed to simplify the way individuals discover and understand
              government-backed loan and financial assistance opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="border-b border-[#dce4ec] bg-[#f6f8fb]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1769d2]">
                Our Purpose
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-[#071a2b] sm:text-4xl">
                Making financial assistance easier to discover.
              </h2>
            </div>

            <div className="space-y-5 text-[15px] leading-8 text-[#5a6e85] sm:text-base">
              <p>
                Government financial support is available through numerous
                schemes, but finding the right opportunity can often be
                complicated.
              </p>

              <p>
                Different schemes have different eligibility requirements,
                benefits, documentation, and application procedures. NIRVAAN
                brings this information together into a structured and
                accessible platform, helping users identify opportunities that
                may be relevant to their needs.
              </p>

              <p>
                Our goal is to make the journey from discovering a scheme to
                understanding its requirements much clearer and easier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-[#dce4ec] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f28c28]">
              The Challenge
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#071a2b] sm:text-4xl">
              Finding financial support shouldn&apos;t be complicated.
            </h2>

            <p className="mt-5 text-[15px] leading-8 text-[#5a6e85] sm:text-base">
              For many people, the challenge is not necessarily the absence of
              government support. The challenge is finding the right scheme
              and understanding whether it is relevant to their situation.
            </p>
          </div>

          <div className="mt-10 grid gap-px border border-[#dce4ec] bg-[#dce4ec] sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Difficulty finding relevant government schemes",
              "Complex eligibility requirements",
              "Information spread across different sources",
              "Uncertainty about required documents",
              "Difficulty understanding available benefits",
              "Uncertainty about the next application step",
            ].map((item, index) => (
              <div
                key={item}
                className="bg-white p-6 sm:p-7"
              >
                <span className="text-sm font-bold text-[#1769d2]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="mt-3 text-sm font-semibold leading-6 text-[#102a43] sm:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="border-b border-[#dce4ec] bg-[#f6f8fb]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1769d2]">
              What NIRVAAN Provides
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#071a2b] sm:text-4xl">
              From discovery to preparation.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                number: "01",
                title: "Scheme Discovery",
                text: "Explore government loan and financial assistance schemes based on your requirements.",
              },
              {
                number: "02",
                title: "Eligibility Guidance",
                text: "Understand the key eligibility conditions associated with different schemes.",
              },
              {
                number: "03",
                title: "Financial Assistance",
                text: "Explore available benefits, loan support, subsidies, and other forms of assistance.",
              },
              {
                number: "04",
                title: "Document Guidance",
                text: "Understand the documents and information that may be required for an application.",
              },
              {
                number: "05",
                title: "Application Assistance",
                text: "Get a clearer understanding of the application process and appropriate next steps.",
              },
              {
                number: "06",
                title: "Better Decisions",
                text: "Compare available opportunities and make more informed decisions about your financial support options.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="border border-[#dce4ec] bg-white p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="text-2xl font-extrabold text-[#1769d2]">
                    {item.number}
                  </span>

                  <span className="h-2 w-2 bg-[#f28c28]" />
                </div>

                <h3 className="mt-7 text-lg font-extrabold text-[#071a2b]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#5a6e85]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="border-b border-[#dce4ec] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="border-l-4 border-[#1769d2] pl-6 sm:pl-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f28c28]">
              Our Vision
            </p>

            <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-[#071a2b] sm:text-4xl lg:text-5xl">
              A simpler path to financial opportunities.
            </h2>

            <p className="mt-6 max-w-3xl text-[15px] leading-8 text-[#5a6e85] sm:text-base">
              We envision an India where access to information about financial
              assistance is simple, transparent, and accessible. NIRVAAN aims
              to make the journey from &quot;I need financial support&quot; to
              &quot;I understand my available options&quot; much simpler.
            </p>
          </div>
        </div>
      </section>

      {/* Name */}
      <section className="border-b border-[#dce4ec] bg-[#f6f8fb]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1769d2]">
                Why NIRVAAN?
              </p>

              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#071a2b] sm:text-5xl">
                NIRVAAN
              </h2>
            </div>

            <div>
              <p className="text-[15px] leading-8 text-[#5a6e85] sm:text-base">
                NIRVAAN represents a journey towards relief, clarity, and
                opportunity. For someone searching for financial assistance,
                the process can often feel overwhelming. NIRVAAN is built to
                bring clarity to that process by helping users discover
                relevant opportunities and understand what comes next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#071a2b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f28c28]">
              NIRVAAN
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              Connecting people with the financial support opportunities
              created for them.
            </h2>

            <Link
              href="/"
              className="mt-8 inline-flex min-h-[46px] items-center justify-center border border-white px-6 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#071a2b]"
            >
              Explore NIRVAAN
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
<section className="bg-white">
  <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
    <div className="border border-[#dce4ec] bg-[#f6f8fb] p-6 sm:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1769d2]">
        Government Backed
      </p>

      <h2 className="mt-3 text-2xl font-extrabold text-[#071a2b] sm:text-3xl">
        A platform you can trust.
      </h2>

      <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5a6e85] sm:text-base">
        NIRVAAN is India&apos;s Official Loan Assistance Platform, backed by
        the vision of making government financial assistance easier to discover
        and access. Built with trust, transparency, and accessibility at its
        core, NIRVAAN helps individuals find and understand financial support
        opportunities available to them.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}
