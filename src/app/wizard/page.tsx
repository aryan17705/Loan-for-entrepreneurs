"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

const STEPS = [
  {
    number: "01",
    title: "Verification",
    description: "Verify your identity before continuing.",
  },
  {
    number: "02",
    title: "Earning Status",
    description: "Tell us about your current earning situation.",
  },
  {
    number: "03",
    title: "Smart Scheme Recommender",
    description:
      "Find a suitable scheme and maximum loan amount.",
  },
  {
    number: "04",
    title: "Financial Calculator",
    description: "Choose your required loan amount.",
  },
  {
    number: "05",
    title: "Partner Locator & Router",
    description:
      "Find a suitable partner and plan your route.",
  },
];

type RouteType = "earning" | "non-earning" | null;

export default function WizardPage() {
  const router = useRouter();
  const { profile, setProfile } = useJourney();

  const [currentStep, setCurrentStep] = useState(1);
  const [route, setRoute] = useState<RouteType>(null);

  const [annualIncome, setAnnualIncome] = useState(
    profile?.annualIncome ? String(profile.annualIncome) : ""
  );

  const [incomeProofName, setIncomeProofName] =
    useState("");

  const [nonEarningPurpose, setNonEarningPurpose] =
    useState<
      "education" | "small-project" | null
    >(null);

  const [
    videoAssessmentRequested,
    setVideoAssessmentRequested,
  ] = useState(false);

  const [
    verificationComplete,
    setVerificationComplete,
  ] = useState(false);

  const [verificationMethod, setVerificationMethod] =
    useState<"aadhaar" | "pan" | null>(null);

  const [otpSent, setOtpSent] = useState(false);

  const [error, setError] = useState("");

  const handleVerification = () => {
    setError("");

    if (!verificationMethod) {
      setError(
        "Please select Aadhaar or PAN for identity verification."
      );
      return;
    }

    if (!otpSent) {
      setError(
        "Please request the DigiLocker OTP before continuing."
      );
      return;
    }

    setVerificationComplete(true);
    setCurrentStep(2);
  };

  const handleRouteContinue = () => {
    setError("");

    if (!route) {
      setError("Please select your earning status.");
      return;
    }

    if (route === "earning") {
      const income = Number(annualIncome);

      if (
        !annualIncome ||
        !Number.isFinite(income) ||
        income <= 0
      ) {
        setError("Please enter a valid annual income.");
        return;
      }

      if (!incomeProofName) {
        setError(
          "Please upload your bank income proof PDF."
        );
        return;
      }

      setProfile({
        ...(profile || {}),
        annualIncome: income,
      } as typeof profile);

      setCurrentStep(3);
      return;
    }

    if (!nonEarningPurpose) {
      setError(
        "Please select Educational Loan or Small Project Loan."
      );
      return;
    }

    if (!videoAssessmentRequested) {
      setError(
        "Please request the NIRVAAN team video assessment before continuing."
      );
      return;
    }

    setCurrentStep(3);
  };

  const handleRecommender = () => {
    setError("");
    router.push("/recommendation");
  };

  const handleBack = () => {
    setError("");

    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* PAGE HEADER */}
      <section className="border-b border-[#D9E0E7] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-10 bg-[#0077CC]" />

              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0077CC]">
                NIRVAAN Assistance Journey
              </p>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#002244] sm:text-4xl">
              Find the right financing pathway
            </h1>

            <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-[#667085]">
              Complete the five-stage journey to verify your
              identity, establish your earning status, discover a
              suitable scheme, choose a loan amount and locate a
              partner.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRESS TRACKER */}
      <section className="border-b border-[#D9E0E7] bg-[#F7F9FB]">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid gap-px border border-[#CBD5E1] bg-[#CBD5E1] sm:grid-cols-5">
            {STEPS.map((step, index) => {
              const stepNumber = index + 1;
              const active = currentStep === stepNumber;
              const completed = currentStep > stepNumber;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => {
                    if (completed) {
                      setCurrentStep(stepNumber);
                      setError("");
                    }
                  }}
                  disabled={!completed && !active}
                  className={[
                    "min-h-[92px] bg-white px-4 py-4 text-left",
                    "transition-colors",
                    completed
                      ? "cursor-pointer hover:bg-[#F0F7FC]"
                      : "",
                    active ? "bg-[#F0F7FC]" : "",
                    !completed && !active
                      ? "cursor-default opacity-70"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center border text-[10px] font-extrabold",
                        completed
                          ? "border-[#0077CC] bg-[#0077CC] text-white"
                          : active
                            ? "border-[#0077CC] bg-white text-[#0077CC]"
                            : "border-[#CBD5E1] bg-white text-[#8A96A6]",
                      ].join(" ")}
                    >
                      {completed ? (
                        <Check
                          className="h-4 w-4"
                          strokeWidth={3}
                        />
                      ) : (
                        step.number
                      )}
                    </div>

                    <div className="min-w-0">
                      <p
                        className={[
                          "text-xs font-extrabold",
                          active || completed
                            ? "text-[#002244]"
                            : "text-[#667085]",
                        ].join(" ")}
                      >
                        {step.title}
                      </p>

                      <p className="mt-1 text-[10px] font-medium leading-4 text-[#7A8797]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          {/* STEP 01 */}
          {currentStep === 1 && (
            <div className="border border-[#CBD5E1] bg-white">
              <div className="border-b border-[#CBD5E1] bg-[#002244] px-6 py-6 sm:px-8">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9CC8EA]">
                  Step 01
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-white">
                  Verification
                </h2>

                <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-[#D8E4F0]">
                  Verify your identity before entering the scheme
                  assistance journey.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="border border-[#CBD5E1] bg-[#F7F9FB] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#0077CC] bg-white">
                      <ShieldCheck
                        className="h-5 w-5 text-[#0077CC]"
                        strokeWidth={2}
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-[#002244]">
                        DigiLocker OTP verification
                      </h3>

                      <p className="mt-1 text-xs font-medium leading-5 text-[#667085]">
                        Start with DigiLocker OTP verification,
                        then link either Aadhaar or PAN for identity
                        verification.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-extrabold text-[#002244]">
                    1. Verify through DigiLocker
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(true);
                      setError("");
                    }}
                    className="mt-3 inline-flex min-h-[46px] items-center justify-center border border-[#0077CC] bg-[#0077CC] px-6 text-xs font-bold text-white transition-colors hover:bg-[#005FA3]"
                  >
                    {otpSent
                      ? "OTP Requested"
                      : "Request DigiLocker OTP"}
                  </button>

                  {otpSent && (
                    <p className="mt-3 text-[10px] font-bold text-[#15803D]">
                      DigiLocker OTP request recorded.
                    </p>
                  )}
                </div>

                <div className="mt-7 border-t border-[#D9E0E7] pt-6">
                  <p className="text-xs font-extrabold text-[#002244]">
                    2. Select identity document
                  </p>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => {
                        setVerificationMethod("aadhaar");
                        setError("");
                      }}
                      className={[
                        "border p-5 text-left transition-colors",
                        verificationMethod === "aadhaar"
                          ? "border-[#0077CC] bg-[#F0F7FC]"
                          : "border-[#CBD5E1] bg-white hover:border-[#0077CC]",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-extrabold text-[#002244]">
                            Aadhaar
                          </p>

                          <p className="mt-1 text-[10px] font-medium leading-4 text-[#667085]">
                            Link Aadhaar for identity verification.
                          </p>
                        </div>

                        {verificationMethod === "aadhaar" && (
                          <Check
                            className="h-4 w-4 shrink-0 text-[#0077CC]"
                            strokeWidth={2.5}
                          />
                        )}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setVerificationMethod("pan");
                        setError("");
                      }}
                      className={[
                        "border p-5 text-left transition-colors",
                        verificationMethod === "pan"
                          ? "border-[#0077CC] bg-[#F0F7FC]"
                          : "border-[#CBD5E1] bg-white hover:border-[#0077CC]",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-extrabold text-[#002244]">
                            PAN
                          </p>

                          <p className="mt-1 text-[10px] font-medium leading-4 text-[#667085]">
                            Link PAN for identity verification.
                          </p>
                        </div>

                        {verificationMethod === "pan" && (
                          <Check
                            className="h-4 w-4 shrink-0 text-[#0077CC]"
                            strokeWidth={2.5}
                          />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {verificationMethod && otpSent && (
                  <div className="mt-6 border-l-[3px] border-[#16A34A] bg-[#F0FDF4] px-5 py-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#15803D]">
                      Ready for verification
                    </p>

                    <p className="mt-1 text-xs font-semibold text-[#166534]">
                      {verificationMethod === "aadhaar"
                        ? "Aadhaar"
                        : "PAN"}{" "}
                      selected for identity verification.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mt-6 border-l-[3px] border-[#DC2626] bg-[#FEF2F2] px-5 py-4">
                    <p className="text-xs font-bold text-[#B91C1C]">
                      {error}
                    </p>
                  </div>
                )}

                <div className="mt-7 flex justify-end border-t border-[#D9E0E7] pt-6">
                  <button
                    type="button"
                    onClick={handleVerification}
                    className="inline-flex min-h-[46px] items-center justify-center border border-[#0077CC] bg-[#0077CC] px-7 text-xs font-bold text-white transition-colors hover:bg-[#005FA3]"
                  >
                    Continue to Earning Status
                    <ArrowRight
                      className="ml-3 h-4 w-4"
                      strokeWidth={2}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
                    {/* STEP 02 */}
          {currentStep === 2 && (
            <div className="border border-[#CBD5E1] bg-white">
              <div className="border-b border-[#CBD5E1] bg-[#002244] px-6 py-6 sm:px-8">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9CC8EA]">
                  Step 02
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-white">
                  Earning Status
                </h2>

                <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-[#D8E4F0]">
                  Tell us about your current earning situation so
                  NIRVAAN can take you through the appropriate
                  assessment route.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRoute("earning");
                      setError("");
                    }}
                    className={[
                      "border p-6 text-left transition-colors",
                      route === "earning"
                        ? "border-[#0077CC] bg-[#F0F7FC]"
                        : "border-[#CBD5E1] bg-white hover:border-[#0077CC]",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#0077CC]">
                          Route A
                        </p>

                        <h3 className="mt-2 text-xl font-extrabold text-[#002244]">
                          Earning
                        </h3>

                        <p className="mt-2 text-xs font-medium leading-5 text-[#667085]">
                          For applicants who currently have an
                          income and can provide bank income proof.
                        </p>
                      </div>

                      {route === "earning" && (
                        <Check
                          className="h-5 w-5 shrink-0 text-[#0077CC]"
                          strokeWidth={2.5}
                        />
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRoute("non-earning");
                      setError("");
                    }}
                    className={[
                      "border p-6 text-left transition-colors",
                      route === "non-earning"
                        ? "border-[#E87512] bg-[#FFF8F1]"
                        : "border-[#CBD5E1] bg-white hover:border-[#E87512]",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#E87512]">
                          Route B
                        </p>

                        <h3 className="mt-2 text-xl font-extrabold text-[#002244]">
                          Non-Earning
                        </h3>

                        <p className="mt-2 text-xs font-medium leading-5 text-[#667085]">
                          For applicants who are not currently
                          earning and need an educational or
                          small-project financing pathway.
                        </p>
                      </div>

                      {route === "non-earning" && (
                        <Check
                          className="h-5 w-5 shrink-0 text-[#E87512]"
                          strokeWidth={2.5}
                        />
                      )}
                    </div>
                  </button>
                </div>

                {/* EARNING ROUTE */}
                {route === "earning" && (
                  <div className="mt-6 border border-[#CBD5E1] bg-[#F7F9FB] p-6">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#0077CC]">
                      Earning route
                    </p>

                    <h3 className="mt-2 text-lg font-extrabold text-[#002244]">
                      Income verification
                    </h3>

                    <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-[#667085]">
                      Enter your annual income and upload your
                      bank income proof as a PDF. The information
                      will be used as part of your verified
                      assessment.
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="annual-income"
                          className="text-xs font-extrabold text-[#002244]"
                        >
                          Annual income
                        </label>

                        <div className="mt-2 flex border border-[#B9C4D1] bg-white focus-within:border-[#0077CC]">
                          <span className="flex items-center border-r border-[#B9C4D1] px-3 text-sm font-bold text-[#526071]">
                            ₹
                          </span>

                          <input
                            id="annual-income"
                            type="number"
                            min="1"
                            inputMode="numeric"
                            value={annualIncome}
                            onChange={(event) => {
                              setAnnualIncome(
                                event.target.value
                              );
                              setError("");
                            }}
                            placeholder="Enter annual income"
                            className="min-h-[46px] min-w-0 flex-1 border-0 bg-white px-3 text-sm font-medium text-[#111827] outline-none placeholder:text-[#8A96A6]"
                          />
                        </div>

                        <p className="mt-2 text-[10px] font-medium leading-4 text-[#7A8797]">
                          Enter the annual income supported by
                          your financial records.
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="income-proof"
                          className="text-xs font-extrabold text-[#002244]"
                        >
                          Bank income proof
                        </label>

                        <label
                          htmlFor="income-proof"
                          className="mt-2 flex min-h-[46px] cursor-pointer items-center border border-dashed border-[#B9C4D1] bg-white px-4 transition-colors hover:border-[#0077CC]"
                        >
                          <span className="min-w-0 flex-1 truncate text-xs font-semibold text-[#526071]">
                            {incomeProofName ||
                              "Choose PDF document"}
                          </span>

                          <span className="ml-3 shrink-0 border border-[#CBD5E1] bg-[#F7F9FB] px-3 py-2 text-[10px] font-bold text-[#002244]">
                            Browse
                          </span>
                        </label>

                        <input
                          id="income-proof"
                          type="file"
                          accept="application/pdf,.pdf"
                          className="sr-only"
                          onChange={(event) => {
                            const file =
                              event.target.files?.[0];

                            if (!file) {
                              setIncomeProofName("");
                              return;
                            }

                            const isPdf =
                              file.type ===
                                "application/pdf" ||
                              file.name
                                .toLowerCase()
                                .endsWith(".pdf");

                            if (!isPdf) {
                              setIncomeProofName("");
                              setError(
                                "Please upload your income proof as a PDF."
                              );
                              return;
                            }

                            setIncomeProofName(file.name);
                            setError("");
                          }}
                        />

                        <p className="mt-2 text-[10px] font-medium leading-4 text-[#7A8797]">
                          PDF format required.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-l-[3px] border-[#E87512] bg-white px-5 py-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#8A4B08]">
                        Income assessment
                      </p>

                      <p className="mt-1 text-xs font-medium leading-5 text-[#667085]">
                        Your submitted income information and
                        proof will be checked before you proceed
                        to scheme matching.
                      </p>
                    </div>
                  </div>
                )}

                {/* NON-EARNING ROUTE */}
                {route === "non-earning" && (
                  <div className="mt-6 border border-[#CBD5E1] bg-[#F7F9FB] p-6">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#E87512]">
                      Non-earning route
                    </p>

                    <h3 className="mt-2 text-lg font-extrabold text-[#002244]">
                      Choose your financing purpose
                    </h3>

                    <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-[#667085]">
                      Non-earning applicants are not rejected
                      immediately. Select the relevant pathway
                      and request a video assessment with the
                      NIRVAAN team.
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => {
                          setNonEarningPurpose("education");
                          setError("");
                        }}
                        className={[
                          "border p-5 text-left transition-colors",
                          nonEarningPurpose === "education"
                            ? "border-[#0077CC] bg-white"
                            : "border-[#CBD5E1] bg-white hover:border-[#0077CC]",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-extrabold text-[#002244]">
                              Educational Loan
                            </h4>

                            <p className="mt-1 text-[10px] font-medium leading-4 text-[#667085]">
                              Financing pathway for eligible
                              education-related needs.
                            </p>
                          </div>

                          {nonEarningPurpose === "education" && (
                            <Check
                              className="h-4 w-4 shrink-0 text-[#0077CC]"
                              strokeWidth={2.5}
                            />
                          )}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setNonEarningPurpose(
                            "small-project"
                          );
                          setError("");
                        }}
                        className={[
                          "border p-5 text-left transition-colors",
                          nonEarningPurpose ===
                          "small-project"
                            ? "border-[#E87512] bg-white"
                            : "border-[#CBD5E1] bg-white hover:border-[#E87512]",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-extrabold text-[#002244]">
                              Small Project Loan
                            </h4>

                            <p className="mt-1 text-[10px] font-medium leading-4 text-[#667085]">
                              For currently non-earning
                              entrepreneurs with a project plan.
                            </p>
                          </div>

                          {nonEarningPurpose ===
                            "small-project" && (
                            <Check
                              className="h-4 w-4 shrink-0 text-[#E87512]"
                              strokeWidth={2.5}
                            />
                          )}
                        </div>
                      </button>
                    </div>

                    <div className="mt-6 border border-[#CBD5E1] bg-white p-5">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#0077CC]">
                        NIRVAAN team assessment
                      </p>

                      <h4 className="mt-2 text-sm font-extrabold text-[#002244]">
                        Video call before scheme matching
                      </h4>

                      <p className="mt-2 text-xs font-medium leading-5 text-[#667085]">
                        During the video call, the team will ask
                        why the money is needed, your plans, the
                        amount required, your repayment plan and
                        guarantor details.
                      </p>

                      <p className="mt-3 text-xs font-medium leading-5 text-[#667085]">
                        The submitted claims and guarantor
                        information are then assessed, including
                        whether the guarantor is genuine or
                        whether suitable legal security can be
                        provided.
                      </p>

                      <label className="mt-5 flex cursor-pointer items-start gap-3 border border-[#CBD5E1] bg-[#F7F9FB] p-4">
                        <input
                          type="checkbox"
                          checked={
                            videoAssessmentRequested
                          }
                          onChange={(event) => {
                            setVideoAssessmentRequested(
                              event.target.checked
                            );
                            setError("");
                          }}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-[#0077CC]"
                        />

                        <span>
                          <span className="block text-xs font-extrabold text-[#002244]">
                            Request NIRVAAN team video
                            assessment
                          </span>

                          <span className="mt-1 block text-[10px] font-medium leading-4 text-[#667085]">
                            I understand that this assessment is
                            required before proceeding.
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-6 border-l-[3px] border-[#DC2626] bg-[#FEF2F2] px-5 py-4">
                    <p className="text-xs font-bold text-[#B91C1C]">
                      {error}
                    </p>
                  </div>
                )}

                <div className="mt-7 flex flex-col gap-3 border-t border-[#D9E0E7] pt-6 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="min-h-[44px] border border-[#B9C4D1] bg-white px-6 text-xs font-bold text-[#526071] transition-colors hover:border-[#0077CC] hover:text-[#0077CC]"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={handleRouteContinue}
                    className="inline-flex min-h-[46px] items-center justify-center border border-[#0077CC] bg-[#0077CC] px-7 text-xs font-bold text-white transition-colors hover:bg-[#005FA3]"
                  >
                    Continue to Smart Scheme Recommender
                    <ArrowRight
                      className="ml-3 h-4 w-4"
                      strokeWidth={2}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
                    {/* STEP 03 */}
          {currentStep === 3 && (
            <div className="border border-[#CBD5E1] bg-white">
              <div className="border-b border-[#CBD5E1] bg-[#002244] px-6 py-6 sm:px-8">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9CC8EA]">
                  Step 03
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-white">
                  Smart Scheme Recommender
                </h2>

                <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-[#D8E4F0]">
                  Use AI-assisted scheme matching to identify a
                  suitable scheme and maximum loan amount.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="border border-[#CBD5E1] bg-[#F7F9FB] p-6">
                  <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
                    <div className="flex h-14 w-14 items-center justify-center border border-[#0077CC] bg-white">
                      <span className="text-lg font-extrabold text-[#0077CC]">
                        AI
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#0077CC]">
                        AI-assisted matching
                      </p>

                      <h3 className="mt-2 text-xl font-extrabold text-[#002244]">
                        Match your verified profile with
                        suitable schemes
                      </h3>

                      <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-[#667085]">
                        The Smart Scheme Recommender uses the
                        information available from your journey
                        to identify suitable financing options and
                        determine the maximum loan amount
                        associated with the recommendation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="border border-[#CBD5E1] bg-white p-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#667085]">
                      Profile
                    </p>

                    <p className="mt-2 text-sm font-extrabold text-[#002244]">
                      Verified context
                    </p>

                    <p className="mt-1 text-[10px] font-medium leading-4 text-[#7A8797]">
                      Identity and earning-status information.
                    </p>
                  </div>

                  <div className="border border-[#CBD5E1] bg-white p-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#667085]">
                      AI
                    </p>

                    <p className="mt-2 text-sm font-extrabold text-[#002244]">
                      Scheme matching
                    </p>

                    <p className="mt-1 text-[10px] font-medium leading-4 text-[#7A8797]">
                      Suitable scheme options based on the
                      available profile information.
                    </p>
                  </div>

                  <div className="border border-[#CBD5E1] bg-white p-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#667085]">
                      Output
                    </p>

                    <p className="mt-2 text-sm font-extrabold text-[#002244]">
                      Maximum loan amount
                    </p>

                    <p className="mt-1 text-[10px] font-medium leading-4 text-[#7A8797]">
                      Used as the upper limit in the next stage.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-l-[3px] border-[#E87512] bg-[#FFF8F1] px-5 py-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#8A4B08]">
                    Important
                  </p>

                  <p className="mt-2 text-xs font-medium leading-5 text-[#667085]">
                    A recommendation is intended to assist with
                    scheme discovery. Final eligibility,
                    sanctioned amount and approval are determined
                    by the applicable scheme rules and concerned
                    institution.
                  </p>
                </div>

                {error && (
                  <div className="mt-6 border-l-[3px] border-[#DC2626] bg-[#FEF2F2] px-5 py-4">
                    <p className="text-xs font-bold text-[#B91C1C]">
                      {error}
                    </p>
                  </div>
                )}

                <div className="mt-7 flex flex-col gap-3 border-t border-[#D9E0E7] pt-6 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(2);
                      setError("");
                    }}
                    className="min-h-[44px] border border-[#B9C4D1] bg-white px-6 text-xs font-bold text-[#526071] transition-colors hover:border-[#0077CC] hover:text-[#0077CC]"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={handleRecommender}
                    className="inline-flex min-h-[46px] items-center justify-center border border-[#0077CC] bg-[#0077CC] px-7 text-xs font-bold text-white transition-colors hover:bg-[#005FA3]"
                  >
                    Open Smart Scheme Recommender
                    <ArrowRight
                      className="ml-3 h-4 w-4"
                      strokeWidth={2}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 04 */}
          {currentStep === 4 && (
            <div className="border border-[#CBD5E1] bg-white">
              <div className="border-b border-[#CBD5E1] bg-[#002244] px-6 py-6 sm:px-8">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9CC8EA]">
                  Step 04
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-white">
                  Financial Calculator
                </h2>

                <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-[#D8E4F0]">
                  Choose a loan amount within the maximum amount
                  returned by the Smart Scheme Recommender.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="border border-[#CBD5E1] bg-[#F7F9FB] p-6">
                  <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
                    <div className="flex h-14 w-14 items-center justify-center border border-[#0077CC] bg-white">
                      <span className="text-lg font-extrabold text-[#0077CC]">
                        ₹
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#0077CC]">
                        Financial planning
                      </p>

                      <h3 className="mt-2 text-xl font-extrabold text-[#002244]">
                        Select the loan amount you need
                      </h3>

                      <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-[#667085]">
                        The Financial Calculator uses ₹50,000
                        increments. Available options begin at
                        ₹50,000 and continue until the maximum
                        amount returned by the recommender.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="border border-[#CBD5E1] bg-white p-5">
                    <p className="text-2xl font-extrabold text-[#0077CC]">
                      ₹50K
                    </p>

                    <p className="mt-2 text-xs font-extrabold text-[#002244]">
                      Starting amount
                    </p>

                    <p className="mt-1 text-[10px] font-medium leading-4 text-[#7A8797]">
                      The first available selection.
                    </p>
                  </div>

                  <div className="border border-[#CBD5E1] bg-white p-5">
                    <p className="text-2xl font-extrabold text-[#0077CC]">
                      +₹50K
                    </p>

                    <p className="mt-2 text-xs font-extrabold text-[#002244]">
                      Fixed increments
                    </p>

                    <p className="mt-1 text-[10px] font-medium leading-4 text-[#7A8797]">
                      Each option increases by ₹50,000.
                    </p>
                  </div>

                  <div className="border border-[#CBD5E1] bg-white p-5">
                    <p className="text-2xl font-extrabold text-[#E87512]">
                      MAX
                    </p>

                    <p className="mt-2 text-xs font-extrabold text-[#002244]">
                      Maximum selectable amount
                    </p>

                    <p className="mt-1 text-[10px] font-medium leading-4 text-[#7A8797]">
                      The recommended maximum remains
                      selectable.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-l-[3px] border-[#E87512] bg-[#FFF8F1] px-5 py-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#8A4B08]">
                    Example
                  </p>

                  <p className="mt-2 text-xs font-semibold leading-5 text-[#667085]">
                    If the maximum amount is ₹4,00,000, the
                    available choices are ₹50,000, ₹1,00,000,
                    ₹1,50,000, ₹2,00,000, ₹2,50,000, ₹3,00,000,
                    ₹3,50,000 and ₹4,00,000.
                  </p>
                </div>

                <div className="mt-7 flex flex-col gap-3 border-t border-[#D9E0E7] pt-6 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(3);
                      setError("");
                    }}
                    className="min-h-[44px] border border-[#B9C4D1] bg-white px-6 text-xs font-bold text-[#526071] transition-colors hover:border-[#0077CC] hover:text-[#0077CC]"
                  >
                    ← Back
                  </button>

                  <Link
                    href="/calculator"
                    className="inline-flex min-h-[46px] items-center justify-center border border-[#0077CC] bg-[#0077CC] px-7 text-xs font-bold text-white transition-colors hover:bg-[#005FA3]"
                  >
                    Open Financial Calculator
                    <ArrowRight
                      className="ml-3 h-4 w-4"
                      strokeWidth={2}
                    />
                  </Link>
                </div>
              </div>
            </div>
          )}
                    {/* STEP 05 */}
          {currentStep === 5 && (
            <div className="border border-[#CBD5E1] bg-white">
              <div className="border-b border-[#CBD5E1] bg-[#002244] px-6 py-6 sm:px-8">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9CC8EA]">
                  Step 05
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-white">
                  Geo-Spatial Partner Locator &amp; Router
                </h2>

                <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-[#D8E4F0]">
                  Find partner locations, select a suitable partner
                  and plan your route.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="border border-[#CBD5E1] bg-[#F7F9FB] p-5">
                    <p className="text-2xl font-extrabold text-[#0077CC]">
                      01
                    </p>

                    <h3 className="mt-3 text-sm font-extrabold text-[#002244]">
                      Satellite Map
                    </h3>

                    <p className="mt-2 text-xs font-medium leading-5 text-[#667085]">
                      View available partner locations across
                      India on a satellite map.
                    </p>
                  </div>

                  <div className="border border-[#CBD5E1] bg-[#F7F9FB] p-5">
                    <p className="text-2xl font-extrabold text-[#0077CC]">
                      02
                    </p>

                    <h3 className="mt-3 text-sm font-extrabold text-[#002244]">
                      Partner Selection
                    </h3>

                    <p className="mt-2 text-xs font-medium leading-5 text-[#667085]">
                      Search the network and select a partner
                      location that suits your journey.
                    </p>
                  </div>

                  <div className="border border-[#CBD5E1] bg-[#F7F9FB] p-5">
                    <p className="text-2xl font-extrabold text-[#E87512]">
                      03
                    </p>

                    <h3 className="mt-3 text-sm font-extrabold text-[#002244]">
                      Routing
                    </h3>

                    <p className="mt-2 text-xs font-medium leading-5 text-[#667085]">
                      Plan directions to your selected partner
                      location.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border border-[#CBD5E1] bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#0077CC] bg-[#F0F7FC]">
                      <span className="text-[9px] font-extrabold tracking-wide text-[#0077CC]">
                        MAP
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-extrabold text-[#002244]">
                        Full partner network
                      </p>

                      <p className="mt-1 text-xs font-medium leading-5 text-[#667085]">
                        The locator initially shows the available
                        partner network with the district filter
                        set to All. You can narrow the results
                        after opening the locator.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 border-t border-[#D9E0E7] pt-6 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(4);
                      setError("");
                    }}
                    className="min-h-[44px] border border-[#B9C4D1] bg-white px-6 text-xs font-bold text-[#526071] transition-colors hover:border-[#0077CC] hover:text-[#0077CC]"
                  >
                    ← Back
                  </button>

                  <Link
                    href="/locator"
                    className="inline-flex min-h-[46px] items-center justify-center border border-[#0077CC] bg-[#0077CC] px-7 text-xs font-bold text-white transition-colors hover:bg-[#005FA3]"
                  >
                    Open Partner Locator &amp; Router
                    <ArrowRight
                      className="ml-3 h-4 w-4"
                      strokeWidth={2}
                    />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* JOURNEY TOOLS */}
          {currentStep >= 3 && (
            <div className="mt-6 border border-[#CBD5E1] bg-[#F7F9FB] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#667085]">
                    Journey tools
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#526071]">
                    Open any completed or current tool directly.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/recommendation"
                    className="border border-[#CBD5E1] bg-white px-4 py-2 text-[10px] font-bold text-[#002244] transition-colors hover:border-[#0077CC] hover:text-[#0077CC]"
                  >
                    Smart Recommender
                  </Link>

                  <Link
                    href="/calculator"
                    className="border border-[#CBD5E1] bg-white px-4 py-2 text-[10px] font-bold text-[#002244] transition-colors hover:border-[#0077CC] hover:text-[#0077CC]"
                  >
                    Financial Calculator
                  </Link>

                  <Link
                    href="/locator"
                    className="border border-[#0077CC] bg-white px-4 py-2 text-[10px] font-bold text-[#0077CC] transition-colors hover:bg-[#F0F7FC]"
                  >
                    Partner Locator
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* PLATFORM NOTICE */}
          <div className="mt-8 border-l-[3px] border-[#E87512] bg-[#FFF8F1] px-5 py-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#8A4B08]">
              Important information
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-[#667085]">
              NIRVAAN is an independent platform for scheme
              discovery and application assistance. It does not
              represent, operate or speak on behalf of any
              government department, bank, financial institution
              or scheme authority. Eligibility, loan limits,
              interest rates and final approval are subject to
              the applicable rules and the concerned institution.
            </p>
          </div>

          {/* RETURN HOME */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center border border-[#B9C4D1] bg-white px-6 text-xs font-bold text-[#526071] transition-colors hover:border-[#0077CC] hover:text-[#0077CC]"
            >
              Return to NIRVAAN Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
