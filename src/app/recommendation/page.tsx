"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useJourney } from "@/context/JourneyContext";
import { formatINR } from "@/lib/format";

interface Explanation {
  explanation: string;
  tips: string[];
  source: "groq" | "fallback";
}

export default function RecommendationPage() {
  const router = useRouter();
  const { profile, recommendation, ready } = useJourney();

  const [ai, setAi] = useState<Explanation | null>(() => {
    if (recommendation?.aiExplanation) {
      return {
        explanation: recommendation.aiExplanation,
        tips: recommendation.aiTips ?? [],
        source: recommendation.source ?? "groq",
      };
    }

    return null;
  });

  const [aiLoading, setAiLoading] = useState(false);
  const requested = useRef(false);

  /* =========================================================
     REDIRECT IF NO RECOMMENDATION EXISTS
     ========================================================= */

  useEffect(() => {
    if (ready && !recommendation) {
      router.replace("/wizard");
    }
  }, [ready, recommendation, router]);

  /* =========================================================
     AI EXPLANATION
     ========================================================= */

  useEffect(() => {
    if (!profile || !recommendation || requested.current) {
      return;
    }

    if (recommendation.aiExplanation) {
      setAi({
        explanation: recommendation.aiExplanation,
        tips: recommendation.aiTips ?? [],
        source: recommendation.source ?? "groq",
      });

      return;
    }

    requested.current = true;
    setAiLoading(true);

    const storedKey =
      typeof window !== "undefined"
        ? localStorage.getItem("groq-api-key") || ""
        : "";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (storedKey) {
      headers["x-groq-key"] = storedKey;
    }

    fetch("/api/explain", {
      method: "POST",
      headers,
      body: JSON.stringify({
        profile,
        recommendation,
        apiKey: storedKey,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAi(data);
      })
      .catch(() => {
        setAi({
          explanation:
            "The AI explanation could not be loaded right now. Your scheme recommendation is still available based on the eligibility assessment.",
          tips: [],
          source: "fallback",
        });
      })
      .finally(() => {
        setAiLoading(false);
      });
  }, [profile, recommendation]);

  /* =========================================================
     LOADING
     ========================================================= */

  if (!ready || !recommendation || !profile) {
    return (
      <main className="min-h-screen bg-[#F7F9FC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl border border-[#CBD5E1] bg-white">
          <div className="border-b border-[#CBD5E1] bg-[#0F294A] px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white">
              NIRVAAN
            </p>

            <p className="mt-1 text-sm font-medium text-[#DCE7F5]">
              Processing scheme recommendation
            </p>
          </div>

          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div
              className="h-8 w-8 animate-spin border-2 border-[#D7DEE8] border-t-[#0F5FC5]"
              aria-hidden="true"
            />

            <p className="mt-5 text-sm font-semibold text-[#111827]">
              Matching your eligibility profile...
            </p>

            <p className="mt-2 max-w-md text-xs font-normal leading-5 text-[#687587]">
              Please wait while NIRVAAN prepares your scheme
              recommendation.
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     CONFIDENCE
     ========================================================= */

  const confidenceLabel =
    recommendation.confidence === "high"
      ? "High match"
      : recommendation.confidence === "medium"
      ? "Moderate match"
      : "Low match";

  const confidenceClass =
    recommendation.confidence === "high"
      ? "border-[#0F5FC5] bg-[#EFF6FF] text-[#0F5FC5]"
      : recommendation.confidence === "medium"
      ? "border-[#E87512] bg-[#FFF7ED] text-[#B45309]"
      : "border-[#B9C4D1] bg-[#F8FAFC] text-[#526071]";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F9FC] text-[#111827]">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="border-b border-[#D7DEE8] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0F5FC5]">
                NIRVAAN
              </p>

              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl">
                Scheme Recommendation
              </h1>

              <p className="mt-2 max-w-2xl text-sm font-normal leading-6 text-[#687587]">
                Based on the information provided in your
                eligibility assessment, the following government
                scheme is the recommended match.
              </p>
            </div>

            <div
              className={`inline-flex w-fit items-center border px-3 py-2 text-xs font-semibold ${confidenceClass}`}
            >
              {confidenceLabel}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">

        {/* ===================================================
            PRIMARY RESULT
            =================================================== */}

        <section className="border border-[#CBD5E1] bg-white">

          <div className="border-b border-[#CBD5E1] bg-[#0F294A] px-5 py-7 text-white sm:px-8 sm:py-9">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

              <div className="max-w-3xl">

                <div className="mb-4 inline-flex border border-[#8FB9EA] bg-[#163A66] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#DCEBFF]">
                  Recommended government scheme
                </div>

                <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {recommendation.schemeName}
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-normal leading-6 text-[#DCE7F5]">
                  {recommendation.tagline}
                </p>

              </div>

              <div className="border-l-4 border-[#E87512] bg-[#183A60] px-5 py-4 lg:min-w-[240px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#BFD3EA]">
                  Estimated eligible loan
                </p>

                <p className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {formatINR(
                    recommendation.eligibleAmount
                  )}
                </p>
              </div>

            </div>
          </div>

          {/* Key financing information */}

          <div className="grid grid-cols-2 divide-x divide-y divide-[#D7DEE8] sm:grid-cols-4 sm:divide-y-0">

            <div className="p-5 sm:p-6">
              <p className="text-xl font-bold text-[#0F5FC5]">
                {recommendation.interestRate}%
              </p>

              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[#687587]">
                Interest rate p.a.
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-xl font-bold text-[#111827]">
                {recommendation.moratoriumMonths}
              </p>

              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[#687587]">
                Grace period / months
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-xl font-bold text-[#111827]">
                {Math.round(
                  recommendation.maxTenureMonths / 12
                )}
              </p>

              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[#687587]">
                Maximum tenure / years
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-xl font-bold text-[#111827]">
                Up to 90%
              </p>

              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[#687587]">
                Project financing
              </p>
            </div>

          </div>
        </section>

        {/* ===================================================
            TWO COLUMN INFORMATION
            =================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* =================================================
              ELIGIBILITY
              ================================================= */}

          <section className="border border-[#CBD5E1] bg-white">

            <div className="flex items-center justify-between border-b border-[#CBD5E1] bg-[#F8FAFC] px-5 py-4 sm:px-6">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0F5FC5]">
                  Eligibility
                </p>

                <h2 className="mt-1 text-base font-bold text-[#111827]">
                  Eligibility assessment
                </h2>
              </div>

              <span className="border border-[#0F5FC5] bg-[#EFF6FF] px-2.5 py-1 text-[10px] font-semibold uppercase text-[#0F5FC5]">
                Reviewed
              </span>

            </div>

            <div className="divide-y divide-[#E5EAF0]">

              {recommendation.checks.map((check) => (
                <div
                  key={check.label}
                  className="flex items-start gap-4 px-5 py-4 sm:px-6"
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center border text-xs font-bold ${
                      check.passed
                        ? "border-[#0F5FC5] bg-[#EFF6FF] text-[#0F5FC5]"
                        : "border-[#E87512] bg-[#FFF7ED] text-[#B45309]"
                    }`}
                    aria-hidden="true"
                  >
                    {check.passed ? "✓" : "!"}
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-5 text-[#111827]">
                      {check.label}
                    </p>

                    <p className="mt-1 text-xs font-normal leading-5 text-[#687587]">
                      {check.detail}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* =================================================
              WHY THIS SCHEME
              ================================================= */}

          <section className="border border-[#CBD5E1] bg-white">

            <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] px-5 py-4 sm:px-6">

              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#E87512]">
                Explanation
              </p>

              <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base font-bold text-[#111827]">
                  Why this scheme?
                </h2>

                <span className="w-fit border border-[#D7DEE8] bg-white px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-[#526071]">
                  {ai?.source === "groq"
                    ? "AI assisted"
                    : "System explanation"}
                </span>
              </div>

            </div>

            <div className="p-5 sm:p-6">

              {aiLoading ? (
                <div className="space-y-3">
                  <div className="h-3 w-[95%] animate-pulse bg-[#E7ECF2]" />
                  <div className="h-3 w-[88%] animate-pulse bg-[#E7ECF2]" />
                  <div className="h-3 w-[76%] animate-pulse bg-[#E7ECF2]" />
                  <div className="h-3 w-[64%] animate-pulse bg-[#E7ECF2]" />
                </div>
              ) : (
                <>
                  <p className="text-sm font-normal leading-7 text-[#374151]">
                    {ai?.explanation}
                  </p>

                  {ai && ai.tips.length > 0 && (
                    <div className="mt-6 border-t border-[#E5EAF0] pt-5">

                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0F5FC5]">
                        Important points
                      </p>

                      <ul className="mt-3 space-y-3">
                        {ai.tips.map((tip, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-xs font-normal leading-5 text-[#526071]"
                          >
                            <span className="font-bold text-[#E87512]">
                              {String(index + 1).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  )}
                </>
              )}

            </div>
          </section>

        </div>

        {/* ===================================================
            ALTERNATIVE SCHEMES
            =================================================== */}

        {recommendation.alternatives.length > 0 && (
          <section className="mt-6 border border-[#CBD5E1] bg-white">

            <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] px-5 py-4 sm:px-6">

              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#E87512]">
                Additional options
              </p>

              <h2 className="mt-1 text-base font-bold text-[#111827]">
                Alternative schemes
              </h2>

            </div>

            <div className="divide-y divide-[#E5EAF0]">

              {recommendation.alternatives.map(
                (alternative) => (
                  <div
                    key={alternative.schemeId}
                    className="grid gap-3 px-5 py-4 sm:grid-cols-[180px_1fr] sm:px-6"
                  >
                    <p className="text-sm font-semibold text-[#111827]">
                      {alternative.schemeId}
                    </p>

                    <p className="text-xs font-normal leading-5 text-[#687587]">
                      {alternative.reason}
                    </p>
                  </div>
                )
              )}

            </div>
          </section>
        )}

        {/* ===================================================
            USER PROFILE SUMMARY
            =================================================== */}

        <section className="mt-6 border border-[#CBD5E1] bg-white">

          <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] px-5 py-4 sm:px-6">

            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0F5FC5]">
              Assessment record
            </p>

            <h2 className="mt-1 text-base font-bold text-[#111827]">
              Information used for matching
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4">

            <div className="border-b border-[#E5EAF0] p-5 lg:border-r">
              <p className="text-[10px] font-medium uppercase tracking-wide text-[#687587]">
                Location
              </p>

              <p className="mt-2 text-sm font-semibold text-[#111827]">
                {profile.district}
                <br />
                {profile.state}
              </p>
            </div>

            <div className="border-b border-[#E5EAF0] p-5 lg:border-r">
              <p className="text-[10px] font-medium uppercase tracking-wide text-[#687587]">
                Purpose
              </p>

              <p className="mt-2 text-sm font-semibold text-[#111827]">
                {profile.activityType}
              </p>
            </div>

            <div className="border-b border-[#E5EAF0] p-5 lg:border-r">
              <p className="text-[10px] font-medium uppercase tracking-wide text-[#687587]">
                Project requirement
              </p>

              <p className="mt-2 text-sm font-semibold text-[#0F5FC5]">
                {formatINR(profile.projectCost)}
              </p>
            </div>

            <div className="p-5">
              <p className="text-[10px] font-medium uppercase tracking-wide text-[#687587]">
                Annual family income
              </p>

              <p className="mt-2 text-sm font-semibold text-[#111827]">
                {formatINR(profile.annualIncome)}
                /yr
              </p>
            </div>

          </div>
        </section>

           {/* ===================================================
            ACTIONS
            =================================================== */}

        <section className="mt-6 border border-[#CBD5E1] bg-white">

          <div className="border-b border-[#CBD5E1] px-5 py-4 sm:px-6">
            <p className="text-xs font-semibold text-[#111827]">
              Continue your application journey
            </p>

            <p className="mt-1 text-xs font-normal text-[#687587]">
              Use the tools below to understand financing,
              prepare documents and find where to apply.
            </p>
          </div>

          <div className="grid sm:grid-cols-3">

            <Link
              href="/calculator"
              className="group border-b border-[#D7DEE8] p-5 transition-colors hover:bg-[#F8FAFC] sm:border-b-0 sm:border-r sm:p-6"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0F5FC5]">
                01
              </span>

              <h3 className="mt-3 text-sm font-semibold text-[#111827] group-hover:text-[#0F5FC5]">
                Calculate EMI
              </h3>

              <p className="mt-2 text-xs font-normal leading-5 text-[#687587]">
                Estimate monthly repayment and understand your
                financing requirement.
              </p>

              <span className="mt-4 block text-xs font-semibold text-[#0F5FC5]">
                Open calculator →
              </span>
            </Link>

            <Link
              href="/locator"
              className="group border-b border-[#D7DEE8] p-5 transition-colors hover:bg-[#F8FAFC] sm:border-b-0 sm:border-r sm:p-6"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0F5FC5]">
                02
              </span>

              <h3 className="mt-3 text-sm font-semibold text-[#111827] group-hover:text-[#0F5FC5]">
                Find a Channel Partner
              </h3>

              <p className="mt-2 text-xs font-normal leading-5 text-[#687587]">
                Locate relevant authorised institutions in your
                area.
              </p>

              <span className="mt-4 block text-xs font-semibold text-[#0F5FC5]">
                Open locator →
              </span>
            </Link>

            <Link
              href="/checklist"
              className="group p-5 transition-colors hover:bg-[#F8FAFC] sm:p-6"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#E87512]">
                03
              </span>

              <h3 className="mt-3 text-sm font-semibold text-[#111827] group-hover:text-[#0F5FC5]">
                Prepare Documents
              </h3>

              <p className="mt-2 text-xs font-normal leading-5 text-[#687587]">
                Review the documents needed before approaching
                the authorised partner.
              </p>

              <span className="mt-4 block text-xs font-semibold text-[#0F5FC5]">
                Open checklist →
              </span>
            </Link>

          </div>
        </section>

        {/* ===================================================
            FOOTER ACTIONS
            =================================================== */}

        <div className="flex flex-col gap-3 py-8 sm:flex-row sm:justify-between">

          <Link
            href="/wizard"
            className="inline-flex min-h-11 items-center justify-center border border-[#B9C4D1] bg-white px-6 text-sm font-semibold text-[#374151] transition-colors hover:border-[#0F5FC5] hover:bg-[#F3F7FC] hover:text-[#0F5FC5]"
          >
            ← Reassess my eligibility
          </Link>

          <Link
            href="/locator"
            className="inline-flex min-h-11 items-center justify-center border border-[#0F5FC5] bg-[#0F5FC5] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#0B4FA7]"
          >
            Find where to apply →
          </Link>

        </div>

      </div>
    </main>
  );
}
