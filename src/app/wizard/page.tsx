"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { useJourney } from "@/context/JourneyContext";
import {
  AGRICULTURE_ACTIVITIES,
  BUSINESS_ACTIVITIES,
  LOCATIONS,
} from "@/lib/locations";
import type { Profile } from "@/lib/types";
import { formatINR } from "@/lib/format";

type RouteType = "earning" | "non-earning" | null;

type Data = {
  state: string;
  district: string;
  category: Profile["category"];
  age: number;
  purpose: Profile["purpose"];
  activityType: string;
  projectCost: number;
  annualIncome: number;
  educationLevel: Profile["educationLevel"];
  courseLocation: "india" | "abroad";
};

const INITIAL: Data = {
  state: "",
  district: "",
  category: "sc",
  age: 30,
  purpose: "business",
  activityType: BUSINESS_ACTIVITIES[0],
  projectCost: 300000,
  annualIncome: 250000,
  educationLevel: "10th-12th",
  courseLocation: "india",
};

const EDUCATION_ACTIVITIES = [
  "B.Tech / Engineering Degree",
  "MBBS / Medical / Dental",
  "MBA / Business Management",
  "Diploma / Polytechnic Course",
  "Post-Graduate / Masters",
  "Law / Legal Studies",
  "Aviation / Commercial Pilot",
  "Vocational / Skill Training",
];

const EDUCATION_LEVELS: {
  id: Profile["educationLevel"];
  label: string;
}[] = [
  {
    id: "below-10th",
    label: "Below 10th",
  },
  {
    id: "10th-12th",
    label: "10th – 12th",
  },
  {
    id: "graduate",
    label: "Graduate",
  },
  {
    id: "post-graduate",
    label: "Post-graduate",
  },
];

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Verification",
    short: "Identity",
  },
  {
    number: "02",
    title: "Earning Status",
    short: "Income",
  },
  {
    number: "03",
    title: "Smart Scheme Recommender",
    short: "Matching",
  },
  {
    number: "04",
    title: "Financial Calculator",
    short: "Financing",
  },
  {
    number: "05",
    title: "Geo-Spatial Partner Locator & Router",
    short: "Partners",
  },
];

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M24 5 39 11v11c0 10-6 17-15 21C15 39 9 32 9 22V11l15-6Z" />
      <path d="m16 24 5 5 11-12" />
    </svg>
  );
}

function AadhaarIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="8" y="6" width="32" height="36" />
      <circle cx="24" cy="18" r="6" />
      <path d="M14 35c1-6 5-9 10-9s9 3 10 9" />
    </svg>
  );
}

function DigiLockerIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M8 16h32v24H8z" />
      <path d="M12 16V10h24v6" />
      <path d="M17 23h14M17 29h10M17 35h7" />
      <path d="M34 26h6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="24" cy="14" r="6" />
      <path d="M12 39c0-8 5-13 12-13s12 5 12 13" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="7" y="14" width="34" height="25" />
      <path d="M17 14V9h14v5" />
      <path d="M7 23h34M20 23v4h8v-4" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m5 18 19-9 19 9-19 9-19-9Z" />
      <path d="M12 22v10c7 6 17 6 24 0V22" />
      <path d="M43 19v11" />
    </svg>
  );
}

function ProjectIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M8 40V15l16-8 16 8v25" />
      <path d="M16 40V25h16v15" />
      <path d="M20 17h8" />
      <path d="M12 40h24" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="5" y="11" width="29" height="26" />
      <path d="m34 20 9-6v20l-9-6" />
      <path d="m17 20 8 4-8 4v-8Z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M10 5h20l8 8v30H10V5Z" />
      <path d="M30 5v9h8" />
      <path d="M16 23h16M16 29h16M16 35h10" />
    </svg>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.08em] text-[#41566D]">
        {label}
      </span>

      {hint ? (
        <span className="mb-2 block text-xs font-medium leading-5 text-[#7A8A9B]">
          {hint}
        </span>
      ) : null}

      {children}
    </label>
  );
}

function SelectBox({
  label,
  value,
  placeholder,
  items,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  items: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    const sorted = [...items].sort((a, b) =>
      a.localeCompare(b)
    );

    if (!search.trim()) return sorted;

    const query = search.toLowerCase();

    return sorted.filter((item) =>
      item.toLowerCase().includes(query)
    );
  }, [items, search]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

            return () =>
      document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
    >
      <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.08em] text-[#41566D]">
        {label}
      </span>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-12 w-full items-center justify-between border border-[#C7D4E1] bg-white px-4 text-left text-sm font-semibold text-[#17324F] transition hover:border-[#1769D2] disabled:cursor-not-allowed disabled:bg-[#F1F5F8] disabled:text-[#9AA7B4]"
      >
        <span className={value ? "" : "text-[#9AA7B4]"}>
          {value || placeholder}
        </span>

        <span className="ml-3 text-xs text-[#1769D2]">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && !disabled ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 border border-[#C7D4E1] bg-white p-2 shadow-[0_16px_40px_rgba(16,42,67,0.15)]">
          <input
            autoFocus
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search..."
            className="mb-2 h-10 w-full border border-[#D5DFE8] bg-[#F8FAFC] px-3 text-xs font-medium text-[#17324F] outline-none focus:border-[#1769D2]"
          />

          <div className="max-h-56 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <p className="px-3 py-5 text-center text-xs font-medium text-[#7A8A9B]">
                No results found.
              </p>
            ) : (
              filteredItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    onChange(item);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`block min-h-10 w-full border-b border-[#E5EBF1] px-3 py-2 text-left text-xs font-semibold last:border-0 ${
                    item === value
                      ? "bg-[#EFF6FF] text-[#1769D2]"
                      : "text-[#3E536A] hover:bg-[#F7FAFD]"
                  }`}
                >
                  {item}
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function JourneyHeader({ current }: { current: number }) {
  return (
    <div className="border border-[#D5DFE8] bg-white">
      <div className="hidden lg:grid lg:grid-cols-5">
        {JOURNEY_STEPS.map((item, index) => {
          const active = index === current;
          const completed = index < current;

          return (
            <div
              key={item.number}
              className={`relative border-r border-[#E0E7EE] px-4 py-5 last:border-r-0 ${
                active ? "bg-[#F2F7FD]" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-9 w-9 flex-none items-center justify-center border text-xs font-extrabold ${
                    completed
                      ? "border-[#1769D2] bg-[#1769D2] text-white"
                      : active
                      ? "border-[#1769D2] bg-white text-[#1769D2]"
                      : "border-[#C7D4E1] bg-white text-[#8292A3]"
                  }`}
                >
                  {completed ? "✓" : item.number}
                </span>

                <div>
                  <p
                    className={`text-xs font-extrabold leading-4 ${
                      active
                        ? "text-[#1769D2]"
                        : "text-[#17324F]"
                    }`}
                  >
                    {item.title}
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-[#7B8B9B]">
                    {item.short}
                  </p>
                </div>
              </div>

              {index < JOURNEY_STEPS.length - 1 ? (
                <span className="absolute -right-2.5 top-8 z-10 hidden bg-white px-1 text-[#1769D2] lg:block">
                  →
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#F47B20]">
              Current stage
            </p>

            <p className="mt-1 text-sm font-extrabold text-[#17324F]">
              {JOURNEY_STEPS[current].number} ·{" "}
              {JOURNEY_STEPS[current].title}
            </p>
          </div>

          <span className="text-xs font-extrabold text-[#1769D2]">
            {current + 1} / 5
          </span>
        </div>

        <div className="h-1 bg-[#E1E8EF]">
          <div
            className="h-full bg-[#1769D2] transition-all"
            style={{
              width: `${((current + 1) / 5) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default function WizardPage() {
  const router = useRouter();
  const { profile, setJourney } = useJourney();

  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(() =>
    profile
      ? {
          ...INITIAL,
          ...profile,
          courseLocation:
            profile.courseLocation ?? "india",
        }
      : INITIAL
  );

  const [verificationMethod, setVerificationMethod] =
    useState<"aadhaar" | "pan" | null>(null);

  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const [routeType, setRouteType] =
    useState<RouteType>(null);

  const [incomeProof, setIncomeProof] =
    useState<File | null>(null);

  const [assessmentPurpose, setAssessmentPurpose] =
    useState("");

  const [assessmentAmount, setAssessmentAmount] =
    useState("50000");

  const [repaymentPlan, setRepaymentPlan] =
    useState("");

  const [guarantor, setGuarantor] = useState("");

  const [videoRequested, setVideoRequested] =
    useState(false);

  const [teamVerified, setTeamVerified] =
    useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] =
    useState<string | null>(null);

  const update = <K extends keyof Data>(
    key: K,
    value: Data[K]
  ) => {
    setData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const stateList = Object.keys(LOCATIONS);

  const districtList = data.state
    ? LOCATIONS[data.state] ?? []
    : [];

  const selectState = (value: string) => {
    update("state", value);

    update(
      "district",
      LOCATIONS[value]?.[0] || ""
    );
  };

  const onSelectRoute = (route: RouteType) => {
    setRouteType(route);
    setError(null);

    if (route === "earning") {
      update("purpose", "business");
      update(
        "activityType",
        BUSINESS_ACTIVITIES[0]
      );
      update("projectCost", 300000);
    }
  };

  const sendOtp = () => {
    setError(null);

    if (!mobile.trim()) {
      setError(
        "Please enter the mobile number used for DigiLocker verification."
      );
      return;
    }

    if (mobile.replace(/\D/g, "").length !== 10) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    setOtpSent(true);
  };

  const verifyOtp = () => {
    setError(null);

    if (otp.trim().length !== 6) {
      setError(
        "Please enter the 6-digit OTP to continue."
      );
      return;
    }

    setVerified(true);
  };

  const onSelectPurpose = (
    purpose: Profile["purpose"]
  ) => {
    if (purpose === "business") {
      update(
        "activityType",
        BUSINESS_ACTIVITIES[0]
      );
      update("projectCost", 300000);
    } else if (purpose === "agriculture") {
      update(
        "activityType",
        AGRICULTURE_ACTIVITIES[0]
      );
      update("projectCost", 250000);
    } else {
      update(
        "activityType",
        EDUCATION_ACTIVITIES[0]
      );
      update("projectCost", 1000000);
    }

    update("purpose", purpose);
  };

  const canContinueStepOne =
    verified &&
    !!verificationMethod &&
    !!data.state &&
    !!data.district;

  const canContinueStepTwo =
    !!routeType &&
    (routeType === "earning"
      ? !!incomeProof && data.annualIncome > 0
      : videoRequested && teamVerified);

  const goToRecommendation = async () => {
    setError(null);
    setSubmitting(true);

    const finalProfile: Profile = {
      state: data.state,
      district: data.district,
      category: data.category,
      age: Number(data.age),
      purpose: data.purpose,
      activityType: data.activityType,
      projectCost: Number(data.projectCost),
      annualIncome: Number(data.annualIncome),
      educationLevel: data.educationLevel,
      courseLocation:
        data.purpose === "education"
          ? data.courseLocation
          : undefined,
    };

    try {
      const groqKey =
        typeof window !== "undefined"
          ? localStorage.getItem(
              "groq-api-key"
            ) || ""
          : "";

      const response = await fetch(
        "/api/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...finalProfile,
            apiKey: groqKey,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Could not generate the scheme recommendation."
        );
      }

      const json = await response.json();

      setJourney({
        profile: finalProfile,
        recommendation: json.recommendation,
      });

      router.push("/recommendation");
    } catch {
      setError(
        "We could not generate your recommendation right now. Please try again."
      );
      setSubmitting(false);
    }
  };

  const next = () => {
    setError(null);

    if (step === 0) {
      if (!verificationMethod) {
        setError(
          "Please choose Aadhaar or PAN for identity verification."
        );
        return;
      }

      if (!verified) {
        setError(
          "Please complete DigiLocker OTP verification first."
        );
        return;
      }

      if (!data.state || !data.district) {
        setError(
          "Please select your state and district."
        );
        return;
      }

      setStep(1);
      return;
    }

    if (step === 1) {
      if (!routeType) {
        setError(
          "Please select your earning status."
        );
        return;
      }

      if (
        routeType === "earning" &&
        (!incomeProof || data.annualIncome <= 0)
      ) {
        setError(
          "Please enter your annual income and upload your income proof."
        );
        return;
      }

      if (
        routeType === "non-earning" &&
        (!videoRequested || !teamVerified)
      ) {
        setError(
          "Please request the video assessment and complete the verification confirmation."
        );
        return;
      }

      setStep(2);
      return;
    }
  };

  const back = () => {
    setError(null);

    if (step === 0) {
      router.push("/");
      return;
    }

    setStep((current) =>
      Math.max(0, current - 1)
    );
  };
          return (
    <main className="min-h-screen bg-[#F7FAFC] text-[#102A43]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-xs font-extrabold uppercase tracking-[0.12em] text-[#1769D2] hover:text-[#064CA9]"
            >
              ← NIRVAAN
            </Link>

            <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-[#102A43] sm:text-4xl">
              Your financing journey
            </h1>

            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#617286]">
              Complete each stage in sequence. Your verified
              information is carried forward to the next stage.
            </p>
          </div>

          <div className="border border-[#D4DFE9] bg-white px-5 py-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#F47B20]">
              NIRVAAN Journey
            </p>

            <p className="mt-1 text-xs font-semibold text-[#52677D]">
              Secure · Guided · Eligibility-based
            </p>
          </div>
        </div>

        <JourneyHeader current={step} />

        <section className="mt-6 border border-[#D5DFE8] bg-white shadow-[0_8px_30px_rgba(16,42,67,0.05)]">
          <div className="border-b border-[#DCE4EC] bg-[#0E2A4A] px-5 py-6 text-white sm:px-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#F47B20]">
              Stage {step + 1}
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
              {JOURNEY_STEPS[step].title}
            </h2>

            <p className="mt-2 max-w-3xl text-xs font-medium leading-5 text-[#C8D9EA]">
              {step === 0
                ? "Verify your identity before beginning the financing assessment."
                : step === 1
                ? "Tell us whether you currently earn and complete the appropriate verification route."
                : "Your verified profile is ready for AI-powered scheme matching."}
            </p>
          </div>

          <div className="p-5 sm:p-8">
            {error ? (
              <div className="mb-7 border border-[#F2B46D] bg-[#FFF8EF] px-4 py-3 text-xs font-semibold leading-5 text-[#9A4D0A]">
                {error}
              </div>
            ) : null}

            {step === 0 ? (
              <div className="space-y-8">
                <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                  <div>
                    <p className="text-sm font-extrabold text-[#102A43]">
                      DigiLocker identity verification
                    </p>

                    <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-[#68798C]">
                      Use DigiLocker OTP verification and
                      link either Aadhaar or PAN as your
                      identity document.
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() =>
                          setVerificationMethod(
                            "aadhaar"
                          )
                        }
                        className={`border p-5 text-left transition ${
                          verificationMethod ===
                          "aadhaar"
                            ? "border-[#1769D2] bg-[#F1F7FF]"
                            : "border-[#D4DFE9] bg-white hover:border-[#1769D2]"
                        }`}
                      >
                        <AadhaarIcon />

                        <p className="mt-4 text-sm font-extrabold text-[#17324F]">
                          Aadhaar
                        </p>

                        <p className="mt-1 text-xs font-medium leading-5 text-[#718297]">
                          Link Aadhaar for identity
                          verification.
                        </p>

                        {verificationMethod ===
                        "aadhaar" ? (
                          <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#1769D2]">
                            Selected
                          </p>
                        ) : null}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setVerificationMethod(
                            "pan"
                          )
                        }
                        className={`border p-5 text-left transition ${
                          verificationMethod === "pan"
                            ? "border-[#1769D2] bg-[#F1F7FF]"
                            : "border-[#D4DFE9] bg-white hover:border-[#1769D2]"
                        }`}
                      >
                        <FileIcon />

                        <p className="mt-4 text-sm font-extrabold text-[#17324F]">
                          PAN
                        </p>

                        <p className="mt-1 text-xs font-medium leading-5 text-[#718297]">
                          Link PAN for identity
                          verification.
                        </p>

                        {verificationMethod ===
                        "pan" ? (
                          <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#1769D2]">
                            Selected
                          </p>
                        ) : null}
                      </button>
                    </div>
                  </div>

                  <div className="border border-[#D4DFE9] bg-[#F8FAFC] p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center bg-[#EFF5FF] text-[#1769D2]">
                        <DigiLockerIcon />
                      </div>

                      <div>
                        <p className="text-sm font-extrabold text-[#17324F]">
                          DigiLocker OTP
                        </p>

                        <p className="text-[11px] font-medium text-[#748599]">
                          Secure verification step
                        </p>
                      </div>
                    </div>

                    <Field
                      label="Mobile number"
                      hint="Enter the 10-digit mobile number used for verification."
                    >
                      <div className="flex gap-2">
                        <span className="flex h-12 items-center border border-[#C7D4E1] bg-[#F5F8FB] px-3 text-sm font-bold text-[#52677D]">
                          +91
                        </span>

                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          value={mobile}
                          onChange={(event) =>
                            setMobile(
                              event.target.value.replace(
                                /\D/g,
                                ""
                              )
                            )
                          }
                          placeholder="10-digit mobile number"
                          className="h-12 min-w-0 flex-1 border border-[#C7D4E1] bg-white px-3 text-sm font-medium text-[#17324F] outline-none focus:border-[#1769D2]"
                        />
                      </div>
                    </Field>

                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={sendOtp}
                        className="mt-4 flex min-h-11 w-full items-center justify-center border border-[#1769D2] bg-[#1769D2] px-5 text-xs font-extrabold text-white hover:bg-[#064CA9]"
                      >
                        SEND OTP
                      </button>
                    ) : (
                      <div className="mt-4">
                        <Field
                          label="Enter OTP"
                          hint="Enter the 6-digit OTP received on your mobile."
                        >
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otp}
                            onChange={(event) =>
                              setOtp(
                                event.target.value.replace(
                                  /\D/g,
                                  ""
                                )
                              )
                            }
                            placeholder="6-digit OTP"
                            className="h-12 w-full border border-[#C7D4E1] bg-white px-3 text-sm font-semibold tracking-[0.25em] text-[#17324F] outline-none focus:border-[#1769D2]"
                          />
                        </Field>

                        <button
                          type="button"
                          onClick={verifyOtp}
                          className="mt-4 flex min-h-11 w-full items-center justify-center border border-[#1769D2] bg-[#1769D2] px-5 text-xs font-extrabold text-white hover:bg-[#064CA9]"
                        >
                          VERIFY OTP
                        </button>

                        {verified ? (
                          <div className="mt-3 border border-[#B9DEC9] bg-[#F1FBF5] px-3 py-3 text-xs font-bold text-[#19703F]">
                            ✓ Identity verification completed
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#E0E7EE] pt-7">
                  <p className="text-sm font-extrabold text-[#17324F]">
                    Basic profile
                  </p>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <SelectBox
                      label="State"
                      value={data.state}
                      placeholder="Select your state"
                      items={stateList}
                      onChange={selectState}
                    />

                    <SelectBox
                      label="District"
                      value={data.district}
                      placeholder={
                        data.state
                          ? "Select your district"
                          : "Select state first"
                      }
                      items={districtList}
                      disabled={!data.state}
                      onChange={(value) =>
                        update(
                          "district",
                          value
                        )
                      }
                    />
                  </div>

                  <div className="mt-5">
                    <Field label="Category">
                      <div className="grid grid-cols-3 gap-3">
                        {(
                          ["sc", "st", "obc"] as const
                        ).map((category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() =>
                              update(
                                "category",
                                category
                              )
                            }
                            className={`min-h-12 border text-xs font-extrabold ${
                              data.category ===
                              category
                                ? "border-[#1769D2] bg-[#EFF6FF] text-[#1769D2]"
                                : "border-[#C7D4E1] bg-white text-[#53677D] hover:border-[#1769D2]"
                            }`}
                          >
                            {category === "sc"
                              ? "SC"
                              : category === "st"
                              ? "ST"
                              : "OBC / Gen"}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field
                      label={`Age · ${data.age}
                      years`}
                    >
                      <input
                        type="range"
                        min={17}
                        max={70}
                        value={data.age}
                        onChange={(event) =>
                          update(
                            "age",
                            Number(
                              event.target.value
                            )
                          )
                        }
                        className="h-2 w-full cursor-pointer accent-[#1769D2]"
                      />

                      <div className="mt-2 flex justify-between text-[10px] font-semibold text-[#7A8A9B]">
                        <span>17 years</span>
                        <span>70 years</span>
                      </div>
                    </Field>
                  </div>
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-extrabold text-[#102A43]">
                    Select your current earning status
                  </p>

                  <p className="mt-2 text-sm font-medium leading-6 text-[#68798C]">
                    NIRVAAN follows a different verification
                    route depending on whether you currently
                    earn an income.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectRoute("earning")
                    }
                    className={`border p-6 text-left transition ${
                      routeType === "earning"
                        ? "border-[#1769D2] bg-[#F1F7FF]"
                        : "border-[#D4DFE9] bg-white hover:border-[#1769D2]"
                    }`}
                  >
                    <div className="flex h-14 w-14 items-center justify-center bg-[#EFF5FF] text-[#1769D2]">
                      <BriefcaseIcon />
                    </div>

                    <h3 className="mt-5 text-lg font-extrabold text-[#17324F]">
                      Earning
                    </h3>

                    <p className="mt-2 text-xs font-medium leading-5 text-[#718297]">
                      I currently earn an income and
                      can provide bank income proof.
                    </p>

                    <div className="mt-5 border-t border-[#DCE5ED] pt-4 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#1769D2]">
                      Income verification
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectRoute("non-earning")
                    }
                    className={`border p-6 text-left transition ${
                      routeType === "non-earning"
                        ? "border-[#F47B20] bg-[#FFF8F1]"
                        : "border-[#D4DFE9] bg-white hover:border-[#F47B20]"
                    }`}
                  >
                    <div className="flex h-14 w-14 items-center justify-center bg-[#FFF1E5] text-[#D7660E]">
                      <UserIcon />
                    </div>

                    <h3 className="mt-5 text-lg font-extrabold text-[#17324F]">
                      Non-Earning
                    </h3>

                    <p className="mt-2 text-xs font-medium leading-5 text-[#718297]">
                      I currently do not earn and need
                      an educational or small project route.
                    </p>

                    <div className="mt-5 border-t border-[#DCE5ED] pt-4 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#D7660E]">
                      Assessment required
                    </div>
                  </button>
                </div>

                {routeType === "earning" ? (
                  <div className="border border-[#D4DFE9] bg-[#F8FAFC] p-5 sm:p-7">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 flex-none items-center justify-center bg-[#EFF5FF] text-[#1769D2]">
                        <BriefcaseIcon />
                      </div>

                      <div>
                        <h3 className="text-base font-extrabold text-[#17324F]">
                          Earning verification
                        </h3>

                        <p className="mt-1 text-xs font-medium leading-5 text-[#6C7E91]">
                          Enter your income and upload the
                          bank income proof that will be
                          reviewed as part of your journey.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Annual family income"
                        hint="Enter the verified annual family income."
                      >
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#607388]">
                            ₹
                          </span>

                          <input
                            type="number"
                            min={0}
                            value={data.annualIncome}
                            onChange={(event) =>
                              update(
                                "annualIncome",
                                Number(
                                  event.target.value
                                )
                              )
                            }
                            className="h-12 w-full border border-[#C7D4E1] bg-white pl-8 pr-3 text-sm font-semibold text-[#17324F] outline-none focus:border-[#1769D2]"
                          />
                        </div>
                      </Field>

                      <Field
                        label="Income proof"
                        hint="Upload a PDF bank income proof."
                      >
                        <label className="flex min-h-12 cursor-pointer items-center gap-3 border border-dashed border-[#B9C8D6] bg-white px-4 hover:border-[#1769D2]">
                          <FileIcon />

                          <span className="min-w-0">
                            <span className="block truncate text-xs font-bold text-[#42586E]">
                              {incomeProof
                                ? incomeProof.name
                                : "Choose PDF document"}
                            </span>

                            <span className="mt-0.5 block text-[10px] font-medium text-[#8593A2]">
                              PDF only
                            </span>
                          </span>

                          <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(event) =>
                              setIncomeProof(
                                event.target.files?.[0] ||
                                  null
                              )
                            }
                          />
                        </label>
                      </Field>
                    </div>

                    <div className="mt-5 border-l-2 border-[#1769D2] bg-white px-4 py-3">
                      <p className="text-xs font-semibold leading-5 text-[#5B6F83]">
                        Your income is subject to the applicable
                        eligibility criteria and verification.
                        NIRVAAN does not approve or sanction loans.
                      </p>
                    </div>
                  </div>
                ) : null}

                {routeType === "non-earning" ? (
                  <div className="space-y-6">
                    <div className="border border-[#D4DFE9] bg-[#F8FAFC] p-5 sm:p-7">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 flex-none items-center justify-center bg-[#FFF1E5] text-[#D7660E]">
                          <VideoIcon />
                        </div>

                        <div>
                          <h3 className="text-base font-extrabold text-[#17324F]">
                            NIRVAAN team video assessment
                          </h3>

                          <p className="mt-1 text-xs font-medium leading-5 text-[#6C7E91]">
                            Non-earning applicants need an
                            assessment covering why the money
                            is needed, the plan, repayment
                            approach, amount required and
                            guarantor/security information.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <Field label="Why do you need the money?">
                          <textarea
                            value={assessmentPurpose}
                            onChange={(event) =>
                              setAssessmentPurpose(
                                event.target.value
                              )
                            }
                            rows={4}
                            placeholder="Briefly explain your requirement..."
                            className="w-full resize-none border border-[#C7D4E1] bg-white px-3 py-3 text-xs font-medium leading-5 text-[#17324F] outline-none focus:border-[#1769D2]"
                          />
                        </Field>

                        <div className="space-y-5">
                          <Field label="Amount required">
                            <select
                              value={assessmentAmount}
                              onChange={(event) =>
                                setAssessmentAmount(
                                  event.target.value
                                )
                              }
                              className="h-12 w-full border border-[#C7D4E1] bg-white px-3 text-sm font-semibold text-[#17324F] outline-none focus:border-[#1769D2]"
                            >
                              <option value="50000">
                                ₹50,000
                              </option>
                              <option value="100000">
                                ₹1,00,000
                              </option>
                              <option value="150000">
                                ₹1,50,000
                              </option>
                              <option value="200000">
                                ₹2,00,000
                              </option>
                              <option value="250000">
                                ₹2,50,000
                              </option>
                              <option value="300000">
                                ₹3,00,000
                              </option>
                              <option value="500000">
                                ₹5,00,000
                              </option>
                            </select>
                          </Field>

                          <Field label="Repayment plan">
                            <input
                              value={repaymentPlan}
                              onChange={(event) =>
                                setRepaymentPlan(
                                  event.target.value
                                )
                              }
                              placeholder="How will you repay?"
                              className="h-12 w-full border border-[#C7D4E1] bg-white px-3 text-xs font-medium text-[#17324F] outline-none focus:border-[#1769D2]"
                            />
                          </Field>

                          <Field label="Guarantor / legal security">
                            <input
                              value={guarantor}
                              onChange={(event) =>
                                setGuarantor(
                                  event.target.value
                                )
                              }
                              placeholder="Provide details for assessment"
                              className="h-12 w-full border border-[#C7D4E1] bg-white px-3 text-xs font-medium text-[#17324F] outline-none focus:border-[#1769D2]"
                            />
                          </Field>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (
                            !assessmentPurpose.trim() ||
                            !repaymentPlan.trim() ||
                            !guarantor.trim()
                          ) {
                            setError(
                              "Please complete the assessment details before requesting the video assessment."
                            );
                            return;
                          }

                          setError(null);
                          setVideoRequested(true);
                        }}
                        className="mt-6 flex min-h-12 w-full items-center justify-center border border-[#D7660E] bg-[#F47B20] px-5 text-xs font-extrabold text-white hover:bg-[#D7660E]"
                      >
                        {videoRequested
                          ? "VIDEO ASSESSMENT REQUESTED ✓"
                          : "REQUEST VIDEO ASSESSMENT"}
                      </button>
                    </div>

                    {videoRequested ? (
                      <div className="border border-[#B9DEC9] bg-[#F1FBF5] p-5">
                        <p className="text-sm font-extrabold text-[#19703F]">
                          Assessment stage ready
                        </p>

                        <p className="mt-2 text-xs font-medium leading-5 text-[#4C705D]">
                          In the prototype workflow, the NIRVAAN
                          team verification checkpoint is represented
                          below. Final eligibility remains subject
                          to actual assessment and applicable
                          requirements.
                        </p>
                         <label className="mt-4 flex cursor-pointer items-start gap-3 border border-[#C8E4D3] bg-white p-4">
                          <input
                            type="checkbox"
                            checked={teamVerified}
                            onChange={(event) =>
                              setTeamVerified(
                                event.target.checked
                              )
                            }
                            className="mt-0.5 h-4 w-4 accent-[#19703F]"
                          />

                          <span className="text-xs font-semibold leading-5 text-[#4C705D]">
                            I understand that the team must
                            verify my assessment claims and
                            guarantor/security information before
                            this route can proceed.
                          </span>
                        </label>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center bg-[#EFF5FF] text-[#1769D2]">
                  <TargetIcon />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.14em] text-[#F47B20]">
                  Stage 03
                </p>

                <h3 className="mt-2 text-2xl font-extrabold text-[#102A43]">
                  Smart Scheme Recommender
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-[#68798C]">
                  Your identity and earning-status journey is
                  complete. NIRVAAN is ready to use your verified
                  profile for scheme matching.
                </p>

                <div className="mx-auto mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
                  <div className="border border-[#D5DFE8] bg-[#F8FAFC] p-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#7A8A9B]">
                      Location
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#17324F]">
                      {data.district}
                    </p>
                  </div>

                  <div className="border border-[#D5DFE8] bg-[#F8FAFC] p-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#7A8A9B]">
                      Route
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#17324F]">
                      {routeType === "earning"
                        ? "Earning"
                        : "Non-Earning"}
                    </p>
                  </div>

                  <div className="border border-[#D5DFE8] bg-[#F8FAFC] p-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#7A8A9B]">
                      Requirement
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#17324F]">
                      {formatINR(
                        data.projectCost
                      )}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={goToRecommendation}
                  disabled={submitting}
                  className="mt-8 inline-flex min-h-13 min-w-[250px] items-center justify-center border border-[#0758C7] bg-[#0758C7] px-8 text-sm font-extrabold text-white hover:bg-[#064CA9] disabled:cursor-not-allowed disabled:bg-[#8BAFD7]"
                >
                  {submitting
                    ? "MATCHING SCHEMES..."
                    : "CONTINUE TO SMART SCHEME RECOMMENDER →"}
                </button>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 border-t border-[#DCE4EC] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <button
              type="button"
              onClick={back}
              disabled={submitting}
              className="min-h-11 border border-[#C8D4E1] bg-white px-6 text-xs font-extrabold text-[#52677D] hover:border-[#1769D2] hover:text-[#1769D2] disabled:opacity-50"
            >
              ← BACK
            </button>

            {step < 2 ? (
              <button
                type="button"
                onClick={next}
                disabled={
                  submitting ||
                  (step === 0
                    ? !canContinueStepOne
                    : !canContinueStepTwo)
                }
                className="min-h-11 border border-[#0758C7] bg-[#0758C7] px-7 text-xs font-extrabold text-white hover:bg-[#064CA9] disabled:cursor-not-allowed disabled:bg-[#A7BED8]"
              >
                CONTINUE TO{" "}
                {step === 0
                  ? "EARNING STATUS"
                  : "SMART SCHEME RECOMMENDER"}{" "}
                →
              </button>
            ) : null}
          </div>
        </section>

        <div className="mt-5 flex items-start gap-3 border border-[#D5DFE8] bg-white p-4">
          <ShieldIcon />

          <div>
            <p className="text-xs font-extrabold text-[#17324F]">
              Your information
            </p>

            <p className="mt-1 text-[11px] font-medium leading-5 text-[#718297]">
              NIRVAAN is an independent platform that helps
              users discover and prepare for government scheme
              applications. Final approval, verification,
              sanction and disbursement are handled by the
              relevant institutions.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function TargetIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="22" cy="26" r="14" />
      <circle cx="22" cy="26" r="7" />
      <circle cx="22" cy="26" r="2" fill="currentColor" />
      <path d="m31 17 9-9M34 8h6v6" />
    </svg>
  );
          }
