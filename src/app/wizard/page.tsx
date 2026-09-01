"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useMemo } from "react";
import { useJourney } from "@/context/JourneyContext";
import { useTranslation } from "@/context/LanguageContext";
import {
  AGRICULTURE_ACTIVITIES,
  BUSINESS_ACTIVITIES,
  LOCATIONS,
} from "@/lib/locations";
import type { Profile } from "@/lib/types";
import { formatINR } from "@/lib/format";

type Data = Omit<Profile, never> & {
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
  { id: "below-10th", label: "Below 10th" },
  { id: "10th-12th", label: "10th – 12th" },
  { id: "graduate", label: "Graduate" },
  { id: "post-graduate", label: "Post-graduate" },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#475569] sm:text-sm">
        {label}
      </span>
      {children}
    </label>
  );
}

function AnimatedSelect({
  label,
  placeholder,
  value,
  items,
  disabled = false,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  items: string[];
  disabled?: boolean;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const sortedAndFilteredItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => a.localeCompare(b));

    if (!search.trim()) return sorted;

    const q = search.trim().toLowerCase();

    const startsWith = sorted.filter((item) =>
      item.toLowerCase().startsWith(q)
    );

    const contains = sorted.filter(
      (item) =>
        !item.toLowerCase().startsWith(q) &&
        item.toLowerCase().includes(q)
    );

    return [...startsWith, ...contains];
  }, [items, search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    setSearch("");

    const initialIndex = sortedAndFilteredItems.indexOf(value);

    setHighlightedIndex(
      initialIndex !== -1 ? initialIndex : 0
    );

    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 40);

    return () => window.clearTimeout(timer);
  }, [open, sortedAndFilteredItems, value]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [search]);

  useEffect(() => {
    if (!open || !listRef.current) return;

    const element = listRef.current.querySelector(
      `[data-wizard-item-index="${highlightedIndex}"]`
    ) as HTMLElement | null;

    element?.scrollIntoView({
      block: "nearest",
    });
  }, [highlightedIndex, open]);

  const selectItem = (item: string) => {
    onChange(item);
    setOpen(false);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setHighlightedIndex((previous) =>
        previous < sortedAndFilteredItems.length - 1
          ? previous + 1
          : 0
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setHighlightedIndex((previous) =>
        previous > 0
          ? previous - 1
          : sortedAndFilteredItems.length - 1
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const selected =
        sortedAndFilteredItems[highlightedIndex];

      if (selected) selectItem(selected);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative ${
        open ? "z-[99999]" : "z-20"
      }`}
    >
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#475569] sm:text-sm">
        {label}
      </span>

      <button
        type="button"
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((previous) => !previous);
        }}
        className="flex min-h-12 w-full items-center justify-between border border-[#CBD5E1] bg-white px-4 py-3 text-left text-sm font-semibold text-[#111827] outline-none transition hover:border-[#0F5FC5] focus:border-[#0F5FC5] focus:ring-2 focus:ring-[#0F5FC5]/10 disabled:cursor-not-allowed disabled:bg-[#F1F5F9] disabled:text-[#94A3B8]"
      >
        <span
          className={`truncate ${
            value ? "text-[#111827]" : "text-[#94A3B8]"
          }`}
        >
          {value || placeholder}
        </span>

        <span
          className={`ml-3 flex-none text-xs font-bold text-[#0F5FC5] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && !disabled && (
        <div
          className="absolute left-0 right-0 top-full z-[99999] mt-1 border border-[#CBD5E1] bg-white p-2 shadow-[0_16px_40px_rgba(15,23,42,0.14)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-2 flex items-center border border-[#CBD5E1] bg-[#F8FAFC]">
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm font-medium text-[#111827] outline-none placeholder:text-[#94A3B8]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="px-3 text-sm font-bold text-[#64748B] hover:text-[#0F5FC5]"
              >
                Clear
              </button>
            )}
          </div>

          <div
            ref={listRef}
            className="max-h-56 overflow-y-auto"
          >
            {sortedAndFilteredItems.length === 0 ? (
              <div className="px-3 py-5 text-center text-xs font-medium text-[#64748B]">
                No results found.
              </div>
            ) : (
              sortedAndFilteredItems.map((item, index) => {
                const selected = value === item;
                const highlighted =
                  highlightedIndex === index;

                return (
                  <button
                    key={item}
                    type="button"
                    data-wizard-item-index={index}
                    onMouseEnter={() =>
                      setHighlightedIndex(index)
                    }
                    onClick={() => selectItem(item)}
                    className={`flex min-h-10 w-full items-center justify-between border-b border-[#E2E8F0] px-3 py-2 text-left text-sm font-semibold transition last:border-b-0 ${
                      highlighted
                        ? "bg-[#EFF6FF] text-[#0F5FC5]"
                        : selected
                        ? "bg-[#F8FAFC] text-[#111827]"
                        : "text-[#334155] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <span className="truncate">
                      {item}
                    </span>

                    {selected && (
                      <span className="ml-3 text-xs font-black text-[#0F5FC5]">
                        Selected
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WizardPage() {
  const router = useRouter();

  const { profile, setJourney } = useJourney();
  const { t } = useTranslation();

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

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    t("wiz_step_0"),
    t("wiz_step_1"),
    t("wiz_step_2"),
    t("wiz_step_3"),
  ];

  const purposes: {
    id: Profile["purpose"];
    label: string;
    hint: string;
  }[] = [
    {
      id: "business",
      label: t("wiz_pur_biz"),
      hint: t("wiz_pur_biz_hint"),
    },
    {
      id: "agriculture",
      label: t("wiz_pur_agri"),
      hint: t("wiz_pur_agri_hint"),
    },
    {
      id: "education",
      label: t("wiz_pur_edu"),
      hint: t("wiz_pur_edu_hint"),
    },
  ];

  const stateList = Object.keys(LOCATIONS);

  const districtList = data.state
    ? LOCATIONS[data.state] ?? []
    : [];

  const update = <K extends keyof Data>(
    key: K,
    value: Data[K]
  ) => {
    setData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const onSelectPurpose = (
    purpose: Profile["purpose"]
  ) => {
    let activity = data.activityType;
    let cost = data.projectCost;

    if (purpose === "business") {
      activity = BUSINESS_ACTIVITIES[0];
      cost = 300000;
    } else if (purpose === "agriculture") {
      activity = AGRICULTURE_ACTIVITIES[0];
      cost = 250000;
    } else {
      activity = EDUCATION_ACTIVITIES[0];
      cost = 1000000;
    }

    setData((previous) => ({
      ...previous,
      purpose,
      activityType: activity,
      projectCost: cost,
    }));
  };

  const nextStep = () => {
    setError(null);

    if (step === 0) {
      if (!data.state) {
        setError(
          "Please select your state to continue."
        );
        return;
      }

      if (!data.district) {
        setError(
          "Please select your district to continue."
        );
        return;
      }
    }

    setStep((previous) =>
      Math.min(previous + 1, steps.length - 1)
    );
  };

  const prevStep = () => {
    setError(null);

    setStep((previous) =>
      Math.max(previous - 1, 0)
    );
  };

  const onSubmit = async () => {
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
          ? localStorage.getItem("groq-api-key") || ""
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
          "Could not compute recommendation"
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
        "Failed to generate recommendation. Please check your network."
      );
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-8 text-[#111827] sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">

        <header className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0F5FC5]">
            NIRVAAN
          </p>

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl">
            Find the right scheme
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
            Answer a few questions to identify the government
            scheme that best matches your profile.
          </p>
        </header>

        <section className="mb-6 border border-[#CBD5E1] bg-white">
          <div className="grid grid-cols-4">
            {steps.map((stepLabel, index) => {
              const active = index === step;
              const completed = index < step;

              return (
                <div
                  key={stepLabel}
                  className={`border-r border-[#E2E8F0] px-2 py-3 text-center last:border-r-0 sm:px-4 ${
                    active
                      ? "bg-[#EFF6FF]"
                      : "bg-white"
                  }`}
                >
                  <div
                    className={`mx-auto flex h-8 w-8 items-center justify-center border text-xs font-extrabold ${
                      completed
                        ? "border-[#0F5FC5] bg-[#0F5FC5] text-white"
                        : active
                        ? "border-[#0F5FC5] bg-white text-[#0F5FC5]"
                        : "border-[#CBD5E1] bg-white text-[#64748B]"
                    }`}
                  >
                    {completed ? "✓" : index + 1}
                  </div>

                  <p
                    className={`mt-2 hidden text-[10px] font-semibold sm:block ${
                      active
                        ? "text-[#0F5FC5]"
                        : "text-[#64748B]"
                    }`}
                  >
                    {stepLabel}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="h-1 bg-[#E2E8F0]">
            <div
              className="h-full bg-[#0F5FC5] transition-all duration-300"
              style={{
                width: `${(step / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
        </section>

        <section className="border border-[#CBD5E1] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-8">

          {error && (
            <div className="mb-6 border border-[#F59E0B] bg-[#FFF7ED] px-4 py-3 text-sm font-semibold text-[#9A3412]">
              {error}
            </div>
          )}

          {step === 0 && (
            <div className="space-y-7">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0F5FC5]">
                  Step 1
                </p>

                <h2 className="mt-1 text-xl font-extrabold text-[#111827] sm:text-2xl">
                  {t("wiz_title_0")}
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {t("wiz_sub_0")}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <AnimatedSelect
                  label={t("wiz_state_lbl")}
                  placeholder={t("wiz_state_ph")}
                  value={data.state}
                  items={stateList}
                  onChange={(value) => {
                    update("state", value);

                    const districts =
                      LOCATIONS[value] ?? [];

                    update(
                      "district",
                      districts[0] || ""
                    );
                  }}
                />

                <AnimatedSelect
                  label={t("wiz_dist_lbl")}
                  placeholder={
                    data.state
                      ? t("wiz_dist_ph")
                      : t("wiz_dist_wait")
                  }
                  value={data.district}
                  items={districtList}
                  disabled={!data.state}
                  onChange={(value) =>
                    update("district", value)
                  }
                />

              </div>

              <Field label={t("wiz_cat_lbl")}>
                <div className="grid grid-cols-3 gap-3">
                  {(["sc", "st", "obc"] as const).map(
                    (category) => {
                      const selected =
                        data.category === category;

                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() =>
                            update(
                              "category",
                              category
                            )
                          }
                          className={`min-h-12 border px-3 py-3 text-xs font-bold transition sm:text-sm ${
                            selected
                              ? "border-[#0F5FC5] bg-[#EFF6FF] text-[#0F5FC5]"
                              : "border-[#CBD5E1] bg-white text-[#475569] hover:border-[#0F5FC5] hover:bg-[#F8FAFC]"
                          }`}
                        >
                          {category === "sc"
                            ? "SC"
                            : category === "st"
                            ? "ST"
                            : "OBC / Gen"}
                        </button>
                      );
                    }
                  )}
                </div>
              </Field>

              <Field
                label={`${t("wiz_age_lbl")} • ${data.age} ${t(
                  "wiz_years"
                )}`}
              >
                <input
                  type="range"
                  min={17}
                  max={70}
                  step={1}
                  value={data.age}
                  onChange={(event) =>
                    update(
                      "age",
                      Number(event.target.value)
                    )
                  }
                  className="h-2 w-full cursor-pointer accent-[#0F5FC5]"
                />

                <div className="mt-2 flex justify-between text-xs font-semibold text-[#64748B]">
                  <span>17 years</span>
                  <span className="font-bold text-[#0F5FC5]">
                    {data.age} years
                  </span>
                  <span>70 years</span>
                </div>
              </Field>

            </div>
          )}{step === 1 && (
            <div className="space-y-7">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0F5FC5]">
                  Step 2
                </p>

                <h2 className="mt-1 text-xl font-extrabold text-[#111827] sm:text-2xl">
                  {t("wiz_title_1")}
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {t("wiz_sub_1")}
                </p>
              </div>

              <Field label="Purpose">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {purposes.map((purpose) => {
                    const selected =
                      data.purpose === purpose.id;

                    return (
                      <button
                        key={purpose.id}
                        type="button"
                        onClick={() =>
                          onSelectPurpose(purpose.id)
                        }
                        className={`min-h-[120px] border p-4 text-left transition ${
                          selected
                            ? "border-[#0F5FC5] bg-[#EFF6FF]"
                            : "border-[#CBD5E1] bg-white hover:border-[#0F5FC5] hover:bg-[#F8FAFC]"
                        }`}
                      >
                        <span
                          className={`block text-sm font-extrabold ${
                            selected
                              ? "text-[#0F5FC5]"
                              : "text-[#111827]"
                          }`}
                        >
                          {purpose.label}
                        </span>

                        <span className="mt-2 block text-xs leading-5 text-[#64748B]">
                          {purpose.hint}
                        </span>

                        {selected && (
                          <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#0F5FC5]">
                            Selected
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <div>
                {data.purpose === "business" && (
                  <AnimatedSelect
                    label={t("wiz_act_select")}
                    placeholder={t("wiz_act_ph")}
                    value={data.activityType}
                    items={BUSINESS_ACTIVITIES}
                    onChange={(value) =>
                      update("activityType", value)
                    }
                  />
                )}

                {data.purpose === "agriculture" && (
                  <AnimatedSelect
                    label={t("wiz_act_select")}
                    placeholder={t("wiz_act_ph")}
                    value={data.activityType}
                    items={AGRICULTURE_ACTIVITIES}
                    onChange={(value) =>
                      update("activityType", value)
                    }
                  />
                )}

                {data.purpose === "education" && (
                  <div className="space-y-5">

                    <AnimatedSelect
                      label={t("wiz_act_edu_select")}
                      placeholder={t("wiz_act_ph")}
                      value={data.activityType}
                      items={EDUCATION_ACTIVITIES}
                      onChange={(value) =>
                        update(
                          "activityType",
                          value
                        )
                      }
                    />

                    <Field label={t("wiz_course_loc")}>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                        <button
                          type="button"
                          onClick={() =>
                            update(
                              "courseLocation",
                              "india"
                            )
                          }
                          className={`min-h-12 border px-4 py-3 text-sm font-bold transition ${
                            data.courseLocation ===
                            "india"
                              ? "border-[#0F5FC5] bg-[#EFF6FF] text-[#0F5FC5]"
                              : "border-[#CBD5E1] bg-white text-[#475569] hover:border-[#0F5FC5]"
                          }`}
                        >
                          {t("wiz_course_in")}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            update(
                              "courseLocation",
                              "abroad"
                            )
                          }
                          className={`min-h-12 border px-4 py-3 text-sm font-bold transition ${
                            data.courseLocation ===
                            "abroad"
                              ? "border-[#0F5FC5] bg-[#EFF6FF] text-[#0F5FC5]"
                              : "border-[#CBD5E1] bg-white text-[#475569] hover:border-[#0F5FC5]"
                          }`}
                        >
                          {t("wiz_course_ab")}
                        </button>

                      </div>
                    </Field>

                  </div>
                )}
              </div>

            </div>
          )}

          {step === 2 && (
            <div className="space-y-7">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0F5FC5]">
                  Step 3
                </p>

                <h2 className="mt-1 text-xl font-extrabold text-[#111827] sm:text-2xl">
                  {t("wiz_title_2")}
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {t("wiz_sub_2")}
                </p>
              </div>

              <Field
                label={t("wiz_cost_lbl")}
              >
                <div className="border border-[#CBD5E1] bg-[#F8FAFC] p-4">

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm font-semibold text-[#475569]">
                      {data.purpose === "education"
                        ? t("wiz_course_cost_lbl")
                        : t("wiz_cost_lbl")}
                    </span>

                    <span className="text-xl font-extrabold text-[#0F5FC5]">
                      {formatINR(data.projectCost)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={10000}
                    max={
                      data.purpose === "education"
                        ? data.courseLocation ===
                          "abroad"
                          ? 4000000
                          : 2500000
                        : 5000000
                    }
                    step={10000}
                    value={data.projectCost}
                    onChange={(event) =>
                      update(
                        "projectCost",
                        Number(event.target.value)
                      )
                    }
                    className="mt-5 h-2 w-full cursor-pointer accent-[#0F5FC5]"
                  />

                  <div className="mt-2 flex justify-between text-[11px] font-semibold text-[#64748B]">
                    <span>₹10,000</span>

                    <span className="text-[#0F5FC5]">
                      {t("wiz_financed_lbl")}{" "}
                      {formatINR(
                        Math.round(
                          data.projectCost * 0.9
                        )
                      )}
                    </span>

                    <span>
                      {formatINR(
                        data.purpose === "education"
                          ? data.courseLocation ===
                            "abroad"
                            ? 4000000
                            : 2500000
                          : 5000000
                      )}
                    </span>
                  </div>

                </div>
              </Field>

              <Field label={t("wiz_income_lbl")}>
                <div className="border border-[#CBD5E1] bg-[#F8FAFC] p-4">

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm font-semibold text-[#475569]">
                      Annual family income
                    </span>

                    <span className="text-xl font-extrabold text-[#0F5FC5]">
                      {formatINR(data.annualIncome)}
                      /yr
                    </span>
                  </div>

                  <input
                    type="range"
                    min={50000}
                    max={1200000}
                    step={10000}
                    value={data.annualIncome}
                    onChange={(event) =>
                      update(
                        "annualIncome",
                        Number(event.target.value)
                      )
                    }
                    className="mt-5 h-2 w-full cursor-pointer accent-[#0F5FC5]"
                  />

                  <div className="mt-2 flex justify-between text-[11px] font-semibold text-[#64748B]">
                    <span>₹50,000/yr</span>
                    <span>₹12,00,000/yr</span>
                  </div>

                  <div className="mt-4 border-l-2 border-[#E87512] bg-[#FFF7ED] px-3 py-2">
                    <p className="text-xs font-semibold leading-5 text-[#9A3412]">
                      {t("wiz_income_rule")}
                    </p>
                  </div>

                </div>
              </Field>

            </div>
          )}

          {step === 3 && (
            <div className="space-y-7">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0F5FC5]">
                  Step 4
                </p>

                <h2 className="mt-1 text-xl font-extrabold text-[#111827] sm:text-2xl">
                  {t("wiz_title_3")}
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {t("wiz_sub_3")}
                </p>
              </div>

              <AnimatedSelect
                label={t("wiz_edu_lbl")}
                placeholder={t("wiz_edu_ph")}
                value={
                  EDUCATION_LEVELS.find(
                    (level) =>
                      level.id ===
                      data.educationLevel
                  )?.label || "10th – 12th"
                }
                items={EDUCATION_LEVELS.map(
                  (level) => level.label
                )}
                onChange={(value) => {
                  const found =
                    EDUCATION_LEVELS.find(
                      (level) =>
                        level.label === value
                    );

                  if (found) {
                    update(
                      "educationLevel",
                      found.id
                    );
                  }
                }}
              />

              <div className="border border-[#CBD5E1] bg-[#F8FAFC]">

                <div className="border-b border-[#CBD5E1] bg-white px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0F5FC5]">
                    {t("wiz_profile_sum")}
                  </p>
                </div>

                <div className="divide-y divide-[#E2E8F0]">

                  <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs font-medium text-[#64748B]">
                      {t("wiz_sum_loc")}
                    </span>

                    <span className="text-sm font-bold text-[#111827]">
                      {data.district},{" "}
                      {data.state}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs font-medium text-[#64748B]">
                      {t("wiz_sum_pur")}
                    </span>

                    <span className="text-sm font-bold text-[#111827]">
                      {data.activityType}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs font-medium text-[#64748B]">
                      {t("wiz_sum_cost")}
                    </span>

                    <span className="text-sm font-bold text-[#0F5FC5]">
                      {formatINR(
                        data.projectCost
                      )}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs font-medium text-[#64748B]">
                      {t("wiz_sum_inc")}
                    </span>

                    <span className="text-sm font-bold text-[#111827]">
                      {formatINR(
                        data.annualIncome
                      )}
                      /yr
                    </span>
                  </div>

                </div>
              </div>

            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-[#E2E8F0] pt-5">

            {step > 0 ? (
              <button
                type="button"
                onClick={prevStep}
                disabled={submitting}
                className="min-h-11 border border-[#CBD5E1] bg-white px-5 text-sm font-bold text-[#475569] transition hover:border-[#0F5FC5] hover:bg-[#F8FAFC] hover:text-[#0F5FC5] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("wiz_btn_back")}
              </button>
            ) : (
              <div />
            )}

            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="min-h-11 border border-[#0F5FC5] bg-[#0F5FC5] px-6 text-sm font-bold text-white transition hover:bg-[#0B4FA7]"
              >
                {t("wiz_btn_continue")}
              </button>
            ) : (
              <button
                type="button"
                onClick={onSubmit}
                disabled={submitting}
                className="min-h-11 border border-[#E87512] bg-[#E87512] px-6 text-sm font-bold text-white transition hover:bg-[#C95F0A] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? t("wiz_btn_analyzing")
                  : t("wiz_btn_submit")}
              </button>
            )}

          </div>

        </section>

        <p className="mt-5 text-center text-[11px] font-medium text-[#94A3B8]">
          Your information is used only to identify suitable government schemes.
        </p>

      </div>
    </main>
  );
    }
