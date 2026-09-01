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

/* =========================================================
   SHARED FIELD
   ========================================================= */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-[#374151] sm:text-sm">
        {label}
      </span>

      {children}
    </label>
  );
}

/* =========================================================
   SHARP RECTANGULAR SEARCH SELECT
   ========================================================= */

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
    const sorted = [...items].sort((a, b) =>
      a.localeCompare(b)
    );

    if (!search.trim()) {
      return sorted;
    }

    const q = search.trim().toLowerCase();

    const exactStart = sorted.filter((item) =>
      item.toLowerCase().startsWith(q)
    );

    const contains = sorted.filter(
      (item) =>
        !item.toLowerCase().startsWith(q) &&
        item.toLowerCase().includes(q)
    );

    return [...exactStart, ...contains];
  }, [items, search]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useEffect(() => {
    if (!open) return;

    setSearch("");

    const initialIdx =
      sortedAndFilteredItems.indexOf(value);

    setHighlightedIndex(
      initialIdx !== -1 ? initialIdx : 0
    );

    setTimeout(
      () => searchInputRef.current?.focus(),
      40
    );
  }, [open]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [search]);

  useEffect(() => {
    if (!open || !listRef.current) return;

    const el = listRef.current.querySelector(
      `[data-item-index="${highlightedIndex}"]`
    ) as HTMLElement | null;

    el?.scrollIntoView({
      block: "nearest",
    });
  }, [highlightedIndex, open]);

  const selectItem = (item: string) => {
    onChange(item);
    setOpen(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();

      setHighlightedIndex((prev) =>
        prev < sortedAndFilteredItems.length - 1
          ? prev + 1
          : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();

      setHighlightedIndex((prev) =>
        prev > 0
          ? prev - 1
          : sortedAndFilteredItems.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();

      if (
        sortedAndFilteredItems[highlightedIndex]
      ) {
        selectItem(
          sortedAndFilteredItems[highlightedIndex]
        );
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
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
      <span className="mb-2 block text-xs font-semibold text-[#374151] sm:text-sm">
        {label}
      </span>

      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="flex min-h-12 w-full items-center justify-between border border-[#B9C4D1] bg-white px-4 py-3 text-left text-xs font-medium text-[#111827] outline-none transition-colors hover:border-[#0F5FC5] focus:border-[#0F5FC5] focus:ring-2 focus:ring-[#0F5FC5]/15 disabled:cursor-not-allowed disabled:bg-[#F3F5F8] disabled:text-[#9AA4B2] sm:text-sm"
      >
        <span
          className={`truncate ${
            value
              ? "font-semibold text-[#111827]"
              : "text-[#687587]"
          }`}
        >
          {value || placeholder}
        </span>

        <span
          className={`ml-3 flex-none text-xs font-bold text-[#0F5FC5] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && !disabled && (
        <div
          className="absolute left-0 right-0 top-full z-[99999] mt-1 border border-[#B9C4D1] bg-white p-2 shadow-[0_16px_40px_rgba(17,24,39,0.16)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-2 flex items-center gap-2 border border-[#D7DEE8] bg-[#F8FAFC] px-3 py-2">
            <span className="text-xs font-bold text-[#0F5FC5]">
              Search
            </span>

            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Type a name..."
              className="min-w-0 flex-1 bg-transparent text-xs font-medium text-[#111827] outline-none placeholder:text-[#8A96A6]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="px-1 text-xs font-bold text-[#687587] hover:text-[#0F5FC5]"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div
            ref={listRef}
            className="max-h-60 overflow-y-auto scrollable-touch"
          >
            {sortedAndFilteredItems.length === 0 ? (
              <div className="p-4 text-center text-xs font-medium text-[#687587]">
                No results for &ldquo;{search}&rdquo;
              </div>
            ) : (
              sortedAndFilteredItems.map(
                (item, idx) => {
                  const isSelected =
                    value === item;

                  const isHighlighted =
                    highlightedIndex === idx;

                  return (
                    <button
                      key={item}
                      type="button"
                      data-item-index={idx}
                      onMouseEnter={() =>
                        setHighlightedIndex(idx)
                      }
                      onPointerDown={(e) => {
                        e.preventDefault();
                        selectItem(item);
                      }}
                      className={`flex w-full items-center justify-between border-b border-[#E9EDF2] px-3 py-3 text-left text-xs font-semibold transition-colors last:border-b-0 sm:text-sm ${
                        isHighlighted
                          ? "bg-[#EFF6FF] text-[#0F5FC5]"
                          : isSelected
                          ? "bg-[#F8FAFC] text-[#111827]"
                          : "bg-white text-[#374151] hover:bg-[#F8FAFC] hover:text-[#0F5FC5]"
                      }`}
                    >
                      <span className="truncate">
                        {item}
                      </span>

                      {isSelected && (
                        <span className="ml-3 flex-none font-bold text-[#0F5FC5]">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                }
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   WIZARD PAGE
   ========================================================= */

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

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

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

  const update = <
    K extends keyof Data
  >(
    key: K,
    value: Data[K]
  ) =>
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));

  /* =======================================================
     PURPOSE SELECTION
     ======================================================= */

  const onSelectPurpose = (
    p: Profile["purpose"]
  ) => {
    let act = data.activityType;
    let cost = data.projectCost;

    if (p === "business") {
      act = BUSINESS_ACTIVITIES[0];
      cost = 300000;
    } else if (p === "agriculture") {
      act = AGRICULTURE_ACTIVITIES[0];
      cost = 250000;
    } else {
      act = EDUCATION_ACTIVITIES[0];
      cost = 1000000;
    }

    setData((prev) => ({
      ...prev,
      purpose: p,
      activityType: act,
      projectCost: cost,
    }));
  };

  /* =======================================================
     NEXT
     ======================================================= */

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

    setStep((s) =>
      Math.min(s + 1, steps.length - 1)
    );
  };

  /* =======================================================
     PREVIOUS
     ======================================================= */

  const prevStep = () => {
    setError(null);

    setStep((s) => Math.max(s - 1, 0));
  };

  /* =======================================================
     SUBMIT
     ======================================================= */

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
      annualIncome: Number(
        data.annualIncome
      ),
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

      const res = await fetch(
        "/api/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...finalProfile,
            apiKey: groqKey,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Could not compute recommendation"
        );
      }

      const json = await res.json();

      setJourney({
        profile: finalProfile,
        recommendation:
          json.recommendation,
      });

      router.push("/recommendation");
    } catch {
      setError(
        "Failed to generate recommendation. Please check your network."
      );

      setSubmitting(false);
    }
  };

  /* =======================================================
     STEP HELPERS
     ======================================================= */

  const progress =
    ((step + 1) / steps.length) * 100;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F9FC] text-[#111827]">

      {/* ===================================================
          HEADER
          =================================================== */}

      <section className="border-b border-[#D7DEE8] bg-white">

        <div className="mx-auto max-w-3xl px-4 py-7 sm:px-6 sm:py-9">

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0F5FC5]">
            NIRVAAN
          </p>

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl">
            Eligibility Assessment
          </h1>

          <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-[#687587] sm:text-sm">
            Answer a few questions to identify
            government schemes that may match
            your profile.
          </p>

        </div>

      </section>

      {/* ===================================================
          PROGRESS
          =================================================== */}

      <section className="border-b border-[#D7DEE8] bg-white">

        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6">

          <div className="flex items-center justify-between gap-4">

            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#687587]">
              Step {step + 1} of {steps.length}
            </p>

            <p className="text-[10px] font-bold text-[#0F5FC5]">
              {Math.round(progress)}% complete
            </p>

          </div>

          <div className="mt-3 h-2 w-full bg-[#E5EAF0]">

            <div
              className="h-full bg-[#0F5FC5] transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <div className="mt-4 grid grid-cols-4 gap-1">

            {steps.map((st, i) => (
              <div
                key={st}
                className={`border-t-2 pt-2 ${
                  i <= step
                    ? "border-[#0F5FC5]"
                    : "border-[#D7DEE8]"
                }`}
              >
                <p
                  className={`hidden text-[10px] font-semibold sm:block ${
                    i === step
                      ? "text-[#0F5FC5]"
                      : "text-[#687587]"
                  }`}
                >
                  {st}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ===================================================
          MAIN FORM
          =================================================== */}

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">

        {/* ERROR */}

        {error && (
          <div className="mb-5 border-l-4 border-[#E87512] bg-[#FFF7ED] px-4 py-3">

            <p className="text-xs font-semibold leading-5 text-[#9A4D08]">
              {error}
            </p>

          </div>
        )}

        <section className="border border-[#CBD5E1] bg-white">

          {/* =================================================
              STEP 0
              ================================================= */}

          {step === 0 && (
            <div className="space-y-7 p-5 sm:p-8">

              <div className="border-b border-[#E5EAF0] pb-5">

                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0F5FC5]">
                  01
                </p>

                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#111827] sm:text-2xl">
                  {t("wiz_title_0")}
                </h2>

                <p className="mt-2 text-xs font-normal leading-5 text-[#687587] sm:text-sm">
                  {t("wiz_sub_0")}
                </p>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <AnimatedSelect
                  label={t("wiz_state_lbl")}
                  placeholder={t("wiz_state_ph")}
                  value={data.state}
                  items={stateList}
                  onChange={(val) => {
                    update("state", val);

                    const dList =
                      LOCATIONS[val] ?? [];

                    update(
                      "district",
                      dList[0] || ""
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
                  onChange={(val) =>
                    update(
                      "district",
                      val
                    )
                  }
                />

              </div>

              {/* CATEGORY */}

              <div>

                <span className="mb-2 block text-xs font-semibold text-[#374151] sm:text-sm">
                  {t("wiz_cat_lbl")}
                </span>

                <div className="grid grid-cols-3 gap-2">

                  {(
                    [
                      "sc",
                      "st",
                      "obc",
                    ] as const
                  ).map((cat) => {

                    const selected =
                      data.category === cat;

                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() =>
                          update(
                            "category", cat
                          )
                        }
                        className={`min-h-12 border px-3 py-3 text-xs font-bold uppercase transition-colors sm:text-sm ${
                          selected
                            ? "border-[#0F5FC5] bg-[#EFF6FF] text-[#0F5FC5]"
                            : "border-[#B9C4D1] bg-white text-[#374151] hover:border-[#0F5FC5] hover:bg-[#F8FAFC]"
                        }`}
                      >
                        {cat === "sc"
                          ? "SC"
                          : cat === "st"
                          ? "ST"
                          : "OBC / Gen"}

                        {selected && (
                          <span className="ml-2">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}

                </div>

              </div>

              {/* AGE */}

              <div>

                <div className="flex items-center justify-between gap-4">

                  <label
                    htmlFor="age"
                    className="text-xs font-semibold text-[#374151] sm:text-sm"
                  >
                    {t("wiz_age_lbl")}
                  </label>

                  <span className="border border-[#D7DEE8] bg-[#F8FAFC] px-3 py-1.5 text-sm font-bold text-[#0F5FC5]">
                    {data.age}{" "}
                    {t("wiz_years")}
                  </span>

                </div>

                <input
                  id="age"
                  type="range"
                  min={17}
                  max={70}
                  step={1}
                  value={data.age}
                  onChange={(e) =>
                    update(
                      "age",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="mt-4 h-1.5 w-full cursor-pointer appearance-none bg-[#D7DEE8] accent-[#0F5FC5]"
                />

                <div className="mt-2 flex justify-between text-[10px] font-medium text-[#8A96A6]">

                  <span>
                    17 {t("wiz_years")}
                  </span>

                  <span>
                    70 {t("wiz_years")}
                  </span>

                </div>

              </div>

            </div>
          )}

          {/* =================================================
              STEP 1
              ================================================= */}

          {step === 1 && (
            <div className="space-y-7 p-5 sm:p-8">

              <div className="border-b border-[#E5EAF0] pb-5">

                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0F5FC5]">
                  02
                </p>

                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#111827] sm:text-2xl">
                  {t("wiz_title_1")}
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#687587] sm:text-sm">
                  {t("wiz_sub_1")}
                </p>

              </div>

              {/* PURPOSE */}

              <div className="grid gap-3 sm:grid-cols-3">

                {purposes.map((p) => {

                  const selected =
                    data.purpose === p.id;

                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() =>
                        onSelectPurpose(
                          p.id
                        )
                      }
                      className={`min-h-[140px] border p-4 text-left transition-colors ${
                        selected
                          ? "border-[#0F5FC5] bg-[#EFF6FF]"
                          : "border-[#CBD5E1] bg-white hover:border-[#0F5FC5] hover:bg-[#F8FAFC]"
                      }`}
                    >

                      <div className="flex items-start justify-between gap-3">

                        <span
                          className={`text-sm font-bold uppercase ${
                            selected
                              ? "text-[#0F5FC5]"
                              : "text-[#687587]"
                          }`}
                        >
                          {p.id}
                        </span>

                        {selected && (
                          <span className="text-xs font-bold text-[#0F5FC5]">
                            SELECTED
                          </span>
                        )}

                      </div>

                      <p className="mt-7 text-sm font-bold text-[#111827]">
                        {p.label}
                      </p>

                      <p className="mt-1 text-[11px] font-medium leading-5 text-[#687587]">
                        {p.hint}
                      </p>

                    </button>
                  );
                })}

              </div>

              {/* ACTIVITY */}

              <div>

                {data.purpose ===
                  "business" && (
                  <AnimatedSelect
                    label={t(
                      "wiz_act_select"
                    )}
                    placeholder={t(
                      "wiz_act_ph"
                    )}
                    value={
                      data.activityType
                    }
                    items={
                      BUSINESS_ACTIVITIES
                    }
                    onChange={(val) =>
                      update(
                        "activityType",
                        val
                      )
                    }
                  />
                )}

                {data.purpose ===
                  "agriculture" && (
                  <AnimatedSelect
                    label={t(
                      "wiz_act_select"
                    )}
                    placeholder={t(
                      "wiz_act_ph"
                    )}
                    value={
                      data.activityType
                    }
                    items={
                      AGRICULTURE_ACTIVITIES
                    }
                    onChange={(val) =>
                      update(
                        "activityType",
                        val
                      )
                    }
                  />
                )}

                {data.purpose ===
                  "education" && (
                  <div className="space-y-5">

                    <AnimatedSelect
                      label={t(
                        "wiz_act_edu_select"
                      )}
                      placeholder={t(
                        "wiz_act_ph"
                      )}
                      value={
                        data.activityType
                      }
                      items={
                        EDUCATION_ACTIVITIES
                      }
                      onChange={(val) =>
                        update(
                          "activityType",
                          val
                        )
                      }
                    />

                    <div>

                      <span className="mb-2 block text-xs font-semibold text-[#374151] sm:text-sm">
                        {t(
                          "wiz_course_loc"
                        )}
                      </span>

                      <div className="grid grid-cols-2 gap-3">

                        {(
                          [
                            "india",
                            "abroad",
                          ] as const
                        ).map(
                          (location) => {

                            const selected =
                              data.courseLocation ===
                              location;

                            return (
                              <button
                                key={location}
                                type="button"
                                onClick={() =>
                                  update(
                                    "courseLocation",
                                    location
                                  )
                                }
                                className={`min-h-12 border px-4 py-3 text-xs font-bold transition-colors sm:text-sm ${
                                  selected
                                    ? "border-[#0F5FC5] bg-[#EFF6FF] text-[#0F5FC5]"
                                    : "border-[#CBD5E1] bg-white text-[#374151] hover:border-[#0F5FC5]"
                                }`}
                              >
                                {location ===
                                "india"
                                  ? t(
                                      "wiz_course_in"
                                    )
                                  : t(
                                      "wiz_course_ab"
                                    )}

                                {selected && (
                                  <span className="ml-2">
                                    ✓
                                  </span>
                                )}
                              </button>
                            );
                          }
                        )}

                      </div>

                    </div>

                  </div>
                )}

              </div>

            </div>
          )}

          {/*
            =================================================
              STEP 2
              ================================================= */}

          {step === 2 && (
            <div className="space-y-8 p-5 sm:p-8">

              <div className="border-b border-[#E5EAF0] pb-5">

                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0F5FC5]">
                  03
                </p>

                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#111827] sm:text-2xl">
                  {t("wiz_title_2")}
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#687587] sm:text-sm">
                  {t("wiz_sub_2")}
                </p>

              </div>

              {/* PROJECT COST */}

              <div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                  <label
                    htmlFor="project-cost"
                    className="text-xs font-semibold text-[#374151] sm:text-sm"
                  >
                    {data.purpose ===
                    "education"
                      ? t(
                          "wiz_course_cost_lbl"
                        )
                      : t(
                          "wiz_cost_lbl"
                        )}
                  </label>

                  <span className="w-fit border border-[#D7DEE8] bg-[#F8FAFC] px-3 py-1.5 text-base font-extrabold text-[#0F5FC5]">
                    {formatINR(
                      data.projectCost
                    )}
                  </span>

                </div>

                <input
                  id="project-cost"
                  type="range"
                  min={10000}
                  max={
                    data.purpose ===
                    "education"
                      ? data.courseLocation ===
                        "abroad"
                        ? 4000000
                        : 2500000
                      : 5000000
                  }
                  step={10000}
                  value={
                    data.projectCost
                  }
                  onChange={(e) =>
                    update(
                      "projectCost",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="mt-5 h-1.5 w-full cursor-pointer appearance-none bg-[#D7DEE8] accent-[#0F5FC5]"
                />

                <div className="mt-3 flex flex-wrap justify-between gap-2 text-[10px] font-medium text-[#8A96A6]">

                  <span>
                    ₹10,000
                  </span>

                  <span className="font-bold text-[#0F5FC5]">
                    {t(
                      "wiz_financed_lbl"
                    )}{" "}
                    {formatINR(
                      Math.round(
                        data.projectCost *
                          0.9
                      )
                    )}
                  </span>

                  <span>
                    {formatINR(
                      data.purpose ===
                        "education"
                        ? data.courseLocation ===
                          "abroad"
                          ? 4000000
                          : 2500000
                        : 5000000
                    )}
                  </span>

                </div>

              </div>

              {/* INCOME */}

              <div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                  <label
                    htmlFor="annual-income"
                    className="text-xs font-semibold text-[#374151] sm:text-sm"
                  >
                    {t(
                      "wiz_income_lbl"
                    )}
                  </label>

                  <span className="w-fit border border-[#D7DEE8] bg-[#F8FAFC] px-3 py-1.5 text-base font-extrabold text-[#0F5FC5]">
                    {formatINR(
                      data.annualIncome
                    )}
                    /yr
                  </span>

                </div>

                <input
                  id="annual-income"
                  type="range"
                  min={50000}
                  max={1200000}
                  step={10000}
                  value={
                    data.annualIncome
                  }
                  onChange={(e) =>
                    update(
                      "annualIncome",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="mt-5 h-1.5 w-full cursor-pointer appearance-none bg-[#D7DEE8] accent-[#0F5FC5]"
                />

                <div className="mt-3 flex justify-between text-[10px] font-medium text-[#8A96A6]">

                  <span>
                    ₹50,000/yr
                  </span>

                  <span>
                    ₹12,00,000/yr
                  </span>

                </div>

                <div className="mt-4 border-l-4 border-[#E87512] bg-[#FFF7ED] px-4 py-3">

                  <p className="text-[11px] font-medium leading-5 text-[#7C4A18]">
                    {t(
                      "wiz_income_rule"
                    )}
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* =================================================
              STEP 3
              ================================================= */}

          {step === 3 && (
            <div className="space-y-7 p-5 sm:p-8">

              <div className="border-b border-[#E5EAF0] pb-5">

                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0F5FC5]">
                  04
                </p>

                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#111827] sm:text-2xl">
                  {t("wiz_title_3")}
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#687587] sm:text-sm">
                  {t("wiz_sub_3")}
                </p>

              </div>

              {/* EDUCATION */}

              <AnimatedSelect
                label={t(
                  "wiz_edu_lbl"
                )}
                placeholder={t(
                  "wiz_edu_ph"
                )}
                value={
                  EDUCATION_LEVELS.find(
                    (l) =>
                      l.id ===
                      data.educationLevel
                  )?.label ||
                  "10th – 12th"
                }
                items={EDUCATION_LEVELS.map(
                  (l) => l.label
                )}
                onChange={(val) => {
                  const found =
                    EDUCATION_LEVELS.find(
                      (l) =>
                        l.label === val
                    );

                  if (found) {
                    update(
                      "educationLevel",
                      found.id
                    );
                  }
                }}
              />

              {/* SUMMARY */}

              <div className="border border-[#CBD5E1] bg-[#F8FAFC]">

                <div className="border-b border-[#D7DEE8] bg-white px-4 py-3">

                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0F5FC5]">
                    {t(
                      "wiz_profile_sum"
                    )}
                  </p>

                </div>

                <div className="divide-y divide-[#E5EAF0]">

                  <div className="grid grid-cols-2 gap-4 px-4 py-3 text-xs">

                    <span className="font-medium text-[#687587]">
                      {t(
                        "wiz_sum_loc"
                      )}
                    </span>

                    <span className="text-right font-bold text-[#111827]">
                      {data.district},{" "}
                      {data.state}
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-4 px-4 py-3 text-xs">

                    <span className="font-medium text-[#687587]">
                      {t(
                        "wiz_sum_pur"
                      )}
                    </span>

                    <span className="text-right font-bold text-[#111827]">
                      {
                        data.activityType
                      }
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-4 px-4 py-3 text-xs">

                    <span className="font-medium text-[#687587]">
                      {t(
                        "wiz_sum_cost"
                      )}
                    </span>

                    <span className="text-right font-bold text-[#0F5FC5]">
                      {formatINR(
                        data.projectCost
                      )}
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-4 px-4 py-3 text-xs">

                    <span className="font-medium text-[#687587]">
                      {t(
                        "wiz_sum_inc"
                      )}
                    </span>

                    <span className="text-right font-bold text-[#111827]">
                      {formatINR(
                        data.annualIncome
                      )}
                      /yr
                    </span>

                  </div>

                </div>

              </div>

              {/* REVIEW NOTE */}

              <div className="border-l-4 border-[#0F5FC5] bg-[#EFF6FF] px-4 py-3">

                <p className="text-xs font-semibold leading-5 text-[#174A83]">
                  Review your information carefully
                  before generating your scheme
                  recommendation.
                </p>

              </div>

            </div>
          )}

          {/* =================================================
              NAVIGATION
              ================================================= */}

          <div className="flex flex-col-reverse gap-3 border-t border-[#D7DEE8] bg-[#F8FAFC] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

            {step > 0 ? (
              <button
                type="button"
                onClick={prevStep}
                disabled={submitting}
                className="min-h-11 border border-[#B9C4D1] bg-white px-6 text-xs font-semibold text-[#374151] transition-colors hover:border-[#0F5FC5] hover:bg-[#EFF6FF] hover:text-[#0F5FC5] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
              >
                {t(
                  "wiz_btn_back"
                )}
              </button>
            ) : (
              <div />
            )}

            {step <
            steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="min-h-11 border border-[#0F5FC5] bg-[#0F5FC5] px-7 text-xs font-bold text-white transition-colors hover:bg-[#0B4FA7] sm:text-sm"
              >
                {t(
                  "wiz_btn_continue"
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={onSubmit}
                disabled={submitting}
                className="min-h-11 border border-[#0F5FC5] bg-[#0F5FC5] px-7 text-xs font-bold text-white transition-colors hover:bg-[#0B4FA7] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
              >
                {submitting
                  ? t(
                      "wiz_btn_analyzing"
                    )
                  : t(
                      "wiz_btn_submit"
                    )}
              </button>
            )}

          </div>

        </section>

        {/* =================================================
            FOOTNOTE
            ================================================= */}

        <p className="px-2 py-5 text-center text-[10px] leading-4 text-[#8A96A6]">
          NIRVAAN uses the information you provide to
          identify potentially relevant government
          schemes. Final eligibility is determined by
          the applicable authority and lending
          institution.
        </p>

      </div>

    </main>
  );
    }
