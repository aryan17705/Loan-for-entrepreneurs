"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { useJourney } from "@/context/JourneyContext";
import { useTranslation } from "@/context/LanguageContext";
import { DISTRICT_COORDS, LOCATIONS } from "@/lib/locations";
import type {
  PartnerType,
  PartnerWithMeta,
  SchemeId,
} from "@/lib/types";

const MapClient = dynamic(
  () => import("@/components/MapClient"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-[#F8FAFC] text-xs font-semibold text-[#687587]">
        Loading interactive map...
      </div>
    ),
  }
);

const SCHEME_LABELS: Record<SchemeId, string> = {
  "micro-finance": "Micro Finance",
  "term-loan": "Term Loan",
  "education-loan": "Education Loan",
};

const TYPE_LABELS: Record<PartnerType, string> = {
  "public-sector-bank": "PSU Bank",
  "private-bank": "Private Bank",
  nbfc: "NBFC",
  "regional-agency": "Govt. Agency",
  cooperative: "Co-op Bank",
};

function LocatorDropdown({
  label,
  value,
  items,
  onSelect,
}: {
  label: string;
  value: string;
  items: string[];
  onSelect: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] =
    useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef =
    useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
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

  const filtered = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      if (
        a === "All" ||
        a === "All Schemes" ||
        a === "All Types"
      )
        return -1;

      if (
        b === "All" ||
        b === "All Schemes" ||
        b === "All Types"
      )
        return 1;

      return a.localeCompare(b);
    });

    if (!search.trim()) return sorted;

    const q = search.trim().toLowerCase();

    const starts = sorted.filter((item) =>
      item.toLowerCase().startsWith(q)
    );

    const contains = sorted.filter(
      (item) =>
        !item.toLowerCase().startsWith(q) &&
        item.toLowerCase().includes(q)
    );

    return [...starts, ...contains];
  }, [items, search]);

  useEffect(() => {
    if (!open) return;

    setSearch("");

    const index = filtered.indexOf(value);

    setHighlightedIndex(
      index >= 0 ? index : 0
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

    const el =
      listRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      ) as HTMLElement | null;

    el?.scrollIntoView({
      block: "nearest",
    });
  }, [highlightedIndex, open]);

  const selectItem = (item: string) => {
    onSelect(item);
    setOpen(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();

      setHighlightedIndex((prev) =>
        prev < filtered.length - 1
          ? prev + 1
          : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setHighlightedIndex((prev) =>
        prev > 0
          ? prev - 1
          : filtered.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (filtered[highlightedIndex]) {
        selectItem(filtered[highlightedIndex]);
      }
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`relative ${
        open ? "z-[99999]" : "z-20"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 items-center gap-2 border border-[#B9C4D1] bg-white px-3.5 text-xs font-semibold text-[#111827] outline-none transition-colors hover:border-[#0F5FC5] focus:border-[#0F5FC5] focus:ring-2 focus:ring-[#0F5FC5]/15 sm:text-sm"
      >
        <span className="font-bold text-[#0F5FC5]">
          {label}:
        </span>

        <span className="max-w-[150px] truncate">
          {value}
        </span>

        <span
          className={`text-[9px] text-[#0F5FC5] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-[99999] mt-1 w-[260px] border border-[#B9C4D1] bg-white p-2 shadow-[0_18px_45px_rgba(17,24,39,0.16)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-2 flex items-center border border-[#D7DEE8] bg-[#F8FAFC] px-3 py-2">
            <span className="mr-2 text-[10px] font-bold text-[#0F5FC5]">
              SEARCH
            </span>

            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Type to search..."
              className="min-w-0 flex-1 bg-transparent text-xs font-medium text-[#111827] outline-none placeholder:text-[#8A96A6]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="px-1 text-xs font-bold text-[#687587] hover:text-[#0F5FC5]"
              >
                ×
              </button>
            )}
          </div>

          <div
            ref={listRef}
            className="max-h-60 overflow-y-auto"
          >
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-xs font-medium text-[#687587]">
                No matching results
              </div>
            ) : (
              filtered.map((item, index) => {
                const selected =
                  value === item;

                const highlighted =
                  highlightedIndex === index;

                return (
                  <button
                    key={item}
                    type="button"
                    data-index={index}
                    onMouseEnter={() =>
                      setHighlightedIndex(index)
                    }
                    onClick={() =>
                      selectItem(item)
                    }
                    className={`flex w-full items-center justify-between border-b border-[#E9EDF2] px-3 py-3 text-left text-xs font-semibold last:border-b-0 sm:text-sm ${
                      highlighted
                        ? "bg-[#EFF6FF] text-[#0F5FC5]"
                        : selected
                        ? "bg-[#F8FAFC] text-[#111827]"
                        : "bg-white text-[#374151] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <span className="truncate">
                      {item}
                    </span>

                    {selected && (
                      <span className="ml-2 text-[#0F5FC5]">
                        ✓
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

export default function LocatorPage() {
  const { profile, recommendation } =
    useJourney();

  const { t } = useTranslation();

  const [partners, setPartners] = useState<
    PartnerWithMeta[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [schemeFilter, setSchemeFilter] =
    useState<SchemeId | "all">(
      recommendation?.schemeId ?? "all"
    );

  const [typeFilter, setTypeFilter] =
    useState<PartnerType | "all">("all");

  const [districtFilter, setDistrictFilter] =
    useState<string>(
      profile?.district || "Nandurbar"
    );

  const [includeHighNpa, setIncludeHighNpa] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [geoLocating, setGeoLocating] =
    useState(false);

  const [userLocation, setUserLocation] =
    useState<{
      lat: number;
      lng: number;
    } | null>(null);

  const cardRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  const allDistricts = useMemo(() => {
    const list =
      Object.values(LOCATIONS).flat();

    return Array.from(new Set(list));
  }, []);

  const schemeOptions = [
    "All Schemes",
    "Micro Finance",
    "Term Loan",
    "Education Loan",
  ];

  const typeOptions = [
    "All Types",
    "PSU Bank",
    "Private Bank",
    "NBFC",
    "Govt. Agency",
    "Co-op Bank",
  ];

  const requestLocation = () => {
    if (!navigator.geolocation) return;

    setGeoLocating(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

        setGeoLocating(false);
      },
      () => setGeoLocating(false),
      {
        enableHighAccuracy: true,
        timeout: 8000,
      }
    );
  };

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const query =
          new URLSearchParams();

        if (schemeFilter !== "all") {
          query.set(
            "scheme",
            schemeFilter
          );
        }

        if (typeFilter !== "all") {
          query.set(
            "type",
            typeFilter
          );
        }

        if (
          districtFilter &&
          districtFilter !== "All"
        ) {
          query.set(
            "district",
            districtFilter
          );
        }

        if (includeHighNpa) {
          query.set(
            "includeHighNpa",
            "true"
          );
        }

        if (userLocation) {
          query.set(
            "userLat",
            String(userLocation.lat)
          );

          query.set(
            "userLng",
            String(userLocation.lng)
          );
        } else if (
          districtFilter &&
          DISTRICT_COORDS[districtFilter]
        ) {
          const c =
            DISTRICT_COORDS[
              districtFilter
            ];

          query.set(
            "userLat",
            String(c.lat)
          );

          query.set(
            "userLng",
            String(c.lng)
          );
        }

        const res = await fetch(
          `/api/partners?${query.toString()}`
        );

        if (!res.ok) {
          throw new Error(
            "Failed to load partners"
          );
        }

        const json = await res.json();

        const list =
          (json.partners ||
            []) as PartnerWithMeta[];

        list.sort((a, b) => {
          if (
            a.distanceKm >= 0 &&
            b.distanceKm >= 0
          ) {
            return (
              a.distanceKm -
              b.distanceKm
            );
          }

          if (a.distanceKm >= 0)
            return -1;

          if (b.distanceKm >= 0)
            return 1;

          return (
            a.npaPercent -
            b.npaPercent
          );
        });

        setPartners(list);

        if (
          list.length > 0 &&
          !selectedId
        ) {
          setSelectedId(list[0].id);
        }
      } catch {
        setPartners([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [
    schemeFilter,
    typeFilter,
    districtFilter,
    includeHighNpa,
    userLocation,
  ]);

  const displayList = useMemo(() => {
    const nearby =
      partners.filter(
        (p) =>
          p.distanceKm >= 0 &&
          p.distanceKm <= 500
      );

    if (nearby.length > 0) {
      if (
        selectedId &&
        !nearby.some(
          (p) =>
            p.id === selectedId
        )
      ) {
        const found =
          partners.find(
            (p) =>
              p.id === selectedId
          );

        if (found) {
          return [
            found,
            ...nearby,
          ];
        }
      }

      return nearby;
    }

    return partners.slice(0, 30);
  }, [partners, selectedId]);

  const mapCenter = useMemo(() => {
    if (selectedId) {
      const found =
        partners.find(
          (p) =>
            p.id === selectedId
        );

      if (found) {
        return [
          found.lat,
          found.lng,
        ] as [number, number];
      }
    }

    if (userLocation) {
      return [
        userLocation.lat,
        userLocation.lng,
      ] as [number, number];
    }

    if (
      districtFilter &&
      DISTRICT_COORDS[
        districtFilter
      ]
    ) {
      const c =
        DISTRICT_COORDS[
          districtFilter
        ];

      return [
        c.lat,
        c.lng,
      ] as [number, number];
    }

    return [
      20.5937,
      78.9629,
    ] as [number, number];
  }, [
    selectedId,
    userLocation,
    districtFilter,
    partners,
  ]);

  const handleSelectPartner = (
    id: string | null
  ) => {
    setSelectedId(id);

    if (
      id &&
      cardRefs.current[id]
    ) {
      cardRefs.current[
        id
      ]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F9FC] text-[#111827]">

      <section className="border-b border-[#D7DEE8] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0F5FC5]">
            NIRVAAN
          </p>

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
            {t("loc_title")}
          </h1>

          <p className="mt-2 max-w-3xl text-xs font-medium leading-5 text-[#687587] sm:text-sm">
            {t("loc_sub")}
          </p>

        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">

        <section className="relative z-40 border border-[#CBD5E1] bg-white">

          <div className="border-b border-[#D7DEE8] bg-[#F8FAFC] px-4 py-4 sm:px-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0F5FC5]">
              Search & filters
            </p>
          </div>

          <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-wrap gap-2">

              <LocatorDropdown
                label="Scheme"
                value={
                  schemeFilter === "all"
                    ? "All Schemes"
                    : SCHEME_LABELS[
                        schemeFilter
                      ]
                }
                items={schemeOptions}
                onSelect={(val) => {
                  if (
                    val ===
                    "Micro Finance"
                  ) {
                    setSchemeFilter(
                      "micro-finance"
                    );
                  } else if (
                    val ===
                    "Term Loan"
                  ) {
                    setSchemeFilter(
                      "term-loan"
                    );
                  } else if (
                    val ===
                    "Education Loan"
                  ) {
                    setSchemeFilter(
                      "education-loan"
                    );
                  } else {
                    setSchemeFilter(
                      "all"
                    );
                  }
                }}
              />

              <LocatorDropdown
                label={t(
                  "loc_type_lbl"
                )}
                value={
                  typeFilter === "all"
                    ? "All Types"
                    : TYPE_LABELS[
                        typeFilter
                      ]
                }
                items={typeOptions}
                onSelect={(val) => {
                  if (
                    val ===
                    "PSU Bank"
                  ) {
                    setTypeFilter(
                      "public-sector-bank"
                    );
                  } else if (
                    val ===
                    "Private Bank"
                  ) {
                    setTypeFilter(
                      "private-bank"
                    );
                  } else if (
                    val === "NBFC"
                  ) {
                    setTypeFilter(
                      "nbfc"
                    );
                  } else if (
                    val ===
                    "Govt. Agency"
                  ) {
                    setTypeFilter(
                      "regional-agency"
                    );
                  } else if (
                    val ===
                    "Co-op Bank"
                  ) {
                    setTypeFilter(
                      "cooperative"
                    );
                  } else {
                    setTypeFilter(
                      "all"
                    );
                  }
                }}
              />

              <LocatorDropdown
                label={t(
                  "loc_dist_lbl"
                )}
                value={
                  districtFilter ||
                  "All"
                }
                items={[
                  "All",
                  ...allDistricts,
                ]}
                onSelect={(val) =>
                  setDistrictFilter(
                    val === "All"
                      ? ""
                      : val
                  )
                }
              />

            </div>
            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                onClick={requestLocation}
                disabled={geoLocating}
                className="min-h-11 border border-[#E87512] bg-[#E87512] px-4 text-xs font-bold text-white transition-colors hover:bg-[#C95F0A] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {geoLocating
                  ? "Locating..."
                  : "Use my location"}
              </button>

              <label className="flex min-h-11 cursor-pointer items-center gap-2 border border-[#B9C4D1] bg-white px-4 text-xs font-semibold text-[#374151]">

                <input
                  type="checkbox"
                  checked={includeHighNpa}
                  onChange={(e) =>
                    setIncludeHighNpa(
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-[#0F5FC5]"
                />

                <span>
                  {t("loc_show_npa")}
                </span>

              </label>

            </div>

          </div>

        </section>

        {/* STATUS */}

        <div className="flex flex-col gap-2 border-x border-b border-[#CBD5E1] bg-white px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-5">

          <p className="font-semibold text-[#526071]">
            <span className="text-[#0F5FC5]">
              {displayList.length}
            </span>{" "}
            nearby branches within 500 km
          </p>

          <p className="font-medium text-[#687587]">
            <span className="font-bold text-[#111827]">
              {partners.length}
            </span>{" "}
            offices available on the India map
          </p>

        </div>

        {/* CONTENT */}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr]">

          {/* PARTNER LIST */}

          <section className="border border-[#CBD5E1] bg-white">

            <div className="border-b border-[#D7DEE8] bg-[#F8FAFC] px-5 py-4">

              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0F5FC5]">
                Partner network
              </p>

              <h2 className="mt-1 text-base font-bold text-[#111827]">
                Nearby application offices
              </h2>

            </div>

            <div className="max-h-[620px] overflow-y-auto p-3">

              {loading ? (
                <div className="flex h-64 items-center justify-center border border-[#E5EAF0] bg-[#F8FAFC]">

                  <div className="text-center">

                    <div className="mx-auto h-7 w-7 animate-spin border-2 border-[#D7DEE8] border-t-[#0F5FC5]" />

                    <p className="mt-4 text-xs font-semibold text-[#687587]">
                      Finding partner branches...
                    </p>

                  </div>

                </div>
              ) : displayList.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center border border-[#E5EAF0] bg-[#F8FAFC] p-6 text-center">

                  <p className="text-sm font-bold text-[#111827]">
                    No partner branches found.
                  </p>

                  <p className="mt-2 text-xs font-medium leading-5 text-[#687587]">
                    Try changing the scheme, partner
                    type, or district filter.
                  </p>

                </div>
              ) : (
                <div className="space-y-3">

                  {displayList.map((p, idx) => {

                    const selected =
                      selectedId === p.id;

                    return (
                      <article
                        key={p.id}
                        ref={(el) => {
                          cardRefs.current[p.id] = el;
                        }}
                        onClick={() =>
                          handleSelectPartner(p.id)
                        }
                        className={`cursor-pointer border p-4 transition-colors ${
                          selected
                            ? "border-[#E87512] bg-[#FFF7ED]"
                            : "border-[#D7DEE8] bg-white hover:border-[#0F5FC5] hover:bg-[#F8FAFC]"
                        }`}
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                              {idx === 0 && (
                                <span className="border border-[#0F5FC5] bg-[#EFF6FF] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#0F5FC5]">
                                  {t(
                                    "loc_nearest_badge"
                                  )}
                                </span>
                              )}

                              <h3 className="text-sm font-extrabold leading-tight text-[#111827] sm:text-base">
                                {p.name}
                              </h3>

                            </div>

                            <p className="mt-1 text-xs font-medium text-[#687587]">
                              {p.city} ·{" "}
                              <span className="font-semibold text-[#374151]">
                                {p.district},{" "}
                                {p.state}
                              </span>
                            </p>

                          </div>

                          <span
                            className={`flex-none border px-2 py-1 text-[9px] font-bold uppercase ${
                              p.healthStatus === "green"
                                ? "border-[#86BFA0] bg-[#EEF8F2] text-[#287548]"
                                : p.healthStatus === "yellow"
                                ? "border-[#D6B66A] bg-[#FFF8E7] text-[#8A6200]"
                                : "border-[#D99A9A] bg-[#FEF2F2] text-[#A52A2A]"
                            }`}
                          >
                            {p.healthStatus === "green"
                              ? "Healthy"
                              : p.healthStatus === "yellow"
                              ? "Watchlist"
                              : "High NPA"}
                          </span>

                        </div>

                        <p className="mt-3 text-xs font-medium leading-5 text-[#526071]">
                          {p.address}{" "}
                          {p.pincode &&
                            `— ${p.pincode}`}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5EAF0] pt-3">

                          <div className="flex flex-wrap items-center gap-2">

                            <span className="border border-[#D7DEE8] bg-[#F8FAFC] px-2.5 py-1 text-[10px] font-bold text-[#526071]">
                              {TYPE_LABELS[p.type]}
                            </span>

                            {typeof p.distanceKm ===
                              "number" &&
                              p.distanceKm >= 0 && (
                                <span className="text-[10px] font-bold text-[#0F5FC5]">
                                  {p.distanceKm.toFixed(1)}{" "}
                                  km away
                                </span>
                              )}

                          </div>

                          <div className="flex gap-2">

                            {p.phone && (
                              <a
                                href={`tel:${p.phone}`}
                                onClick={(e) =>
                                  e.stopPropagation()
                                }
                                className="border border-[#B9C4D1] bg-white px-3 py-1.5 text-[10px] font-bold text-[#0F5FC5] hover:bg-[#EFF6FF]"
                              >
                                {t("loc_call")}
                              </a>
                            )}

                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                              className="border border-[#0F5FC5] bg-[#0F5FC5] px-3 py-1.5 text-[10px] font-bold text-white hover:bg-[#0B4FA7]"
                            >
                              {t("loc_directions")}
                            </a>

                          </div>

                        </div>

                      </article>
                    );
                  })}

                </div>
              )}

            </div>

          </section>

          {/* MAP */}

          <section className="border border-[#CBD5E1] bg-white">

            <div className="border-b border-[#D7DEE8] bg-[#F8FAFC] px-5 py-4">

              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0F5FC5]">
                Location map
              </p>

              <h2 className="mt-1 text-base font-bold text-[#111827]">
                Partner network across India
              </h2>

            </div>

            <div className="h-[480px] overflow-hidden sm:h-[620px]">

              <MapClient
                partners={partners}
                center={mapCenter}
                zoom={selectedId ? 14 : 7}
                selectedId={selectedId}
                userLocation={userLocation}
                onSelect={handleSelectPartner}
              />

            </div>

          </section>

        </div>

        {/* FOOTER ACTIONS */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">

          <Link
            href="/wizard"
            className="inline-flex min-h-11 items-center justify-center border border-[#B9C4D1] bg-white px-6 text-xs font-semibold text-[#374151] hover:border-[#0F5FC5] hover:bg-[#F8FAFC] hover:text-[#0F5FC5] sm:text-sm"
          >
            ← Reassess eligibility
          </Link>

          <Link
            href="/checklist"
            className="inline-flex min-h-11 items-center justify-center border border-[#0F5FC5] bg-[#0F5FC5] px-6 text-xs font-bold text-white hover:bg-[#0B4FA7] sm:text-sm"
          >
            View document checklist →
          </Link>

        </div>

      </div>
    </main>
  );
}
