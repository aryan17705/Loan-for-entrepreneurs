"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { useJourney } from "@/context/JourneyContext";
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
      <div className="flex h-full items-center justify-center bg-[#F8FAFC] text-sm font-bold text-[#0F5FC5]">
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

const HEALTH_STYLES: Record<
  PartnerWithMeta["healthStatus"],
  string
> = {
  green:
    "border-[#B7D8C0] bg-[#F0FDF4] text-[#166534]",
  yellow:
    "border-[#F1D39B] bg-[#FFFBEB] text-[#92400E]",
  red:
    "border-[#E5B7B7] bg-[#FEF2F2] text-[#991B1B]",
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
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const special = [
        "All",
        "All Schemes",
        "All Types",
      ];

      if (special.includes(a)) return -1;
      if (special.includes(b)) return 1;

      return a.localeCompare(b);
    });

    if (!search.trim()) {
      return sorted;
    }

    const query = search.trim().toLowerCase();

    return sorted.filter((item) =>
      item.toLowerCase().includes(query)
    );
  }, [items, search]);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-30"
    >
      <button
        type="button"
        onClick={() =>
          setOpen((current) => !current)
        }
        className="flex min-h-10 items-center gap-2 border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-bold text-[#111827] transition-colors hover:border-[#0F5FC5] focus:border-[#0F5FC5] focus:outline-none"
        aria-expanded={open}
      >
        <span className="text-[#0F5FC5]">
          {label}
        </span>

        <span className="max-w-[150px] truncate text-[#334155]">
          {value}
        </span>

        <span className="ml-1 text-[#E87512]">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 min-w-[240px] border border-[#CBD5E1] bg-white p-2 shadow-xl">
          <div className="mb-2 border border-[#D7DEE8] bg-[#F8FAFC]">
            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search..."
              className="w-full bg-transparent px-3 py-2 text-xs font-medium text-[#111827] outline-none placeholder:text-[#94A3B8]"
            />
          </div>

          <div className="max-h-56 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs font-medium text-[#64748B]">
                No results found.
              </div>
            ) : (
              filteredItems.map((item) => {
                const selected =
                  item === value;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      onSelect(item);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`flex w-full items-center justify-between border-b border-[#F1F5F9] px-3 py-2 text-left text-xs font-bold last:border-b-0 ${
                      selected
                        ? "bg-[#EFF6FF] text-[#0F5FC5]"
                        : "text-[#334155] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <span>{item}</span>

                    {selected && (
                      <span className="text-[#E87512]">
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
  const {
    profile,
    recommendation,
  } = useJourney();

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

  const [
    districtFilter,
    setDistrictFilter,
  ] = useState(
    profile?.district || "Nandurbar"
  );

  const [
    includeHighNpa,
    setIncludeHighNpa,
  ] = useState(false);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [
    geoLocating,
    setGeoLocating,
  ] = useState(false);

  const [
    userLocation,
    setUserLocation,
  ] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const cardRefs = useRef<
    Record<string, HTMLElement | null>
  >({});

  const allDistricts = useMemo(() => {
    const locations =
      Object.values(LOCATIONS).flat();

    return Array.from(
      new Set(locations)
    ).sort((a, b) =>
      a.localeCompare(b)
    );
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
    if (!navigator.geolocation) {
      return;
    }

    setGeoLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        setGeoLocating(false);
      },
      () => {
        setGeoLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
      }
    );
  };

  useEffect(() => {
    let cancelled = false;

    async function loadPartners() {
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
          DISTRICT_COORDS[
            districtFilter
          ]
        ) {
          const coordinates =
            DISTRICT_COORDS[
              districtFilter
            ];

          query.set(
            "userLat",
            String(coordinates.lat)
          );

          query.set(
            "userLng",
            String(coordinates.lng)
          );
        }

        const response = await fetch(
          `/api/partners?${query.toString()}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load partners"
          );
        }

        const json =
          await response.json();

        const list = (
          json.partners || []
        ) as PartnerWithMeta[];

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

          if (a.distanceKm >= 0) {
            return -1;
          }

          if (b.distanceKm >= 0) {
            return 1;
          }

          return (
            a.npaPercent -
            b.npaPercent
          );
        });

        if (cancelled) {
          return;
        }

        setPartners(list);

        setSelectedId((current) => {
          if (
            current &&
            list.some(
              (partner) =>
                partner.id === current
            )
          ) {
            return current;
          }

          return list.length > 0
            ? list[0].id
            : null;
        });
      } catch {
        if (!cancelled) {
          setPartners([]);
          setSelectedId(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPartners();

    return () => {
      cancelled = true;
    };
  }, [
    schemeFilter,
    typeFilter,
    districtFilter,
    includeHighNpa,
    userLocation,
  ]);

  const displayList = useMemo(() => {
    const nearby = partners.filter(
      (partner) =>
        partner.distanceKm >= 0 &&
        partner.distanceKm <= 500
    );

    if (nearby.length > 0) {
      if (
        selectedId &&
        !nearby.some(
          (partner) =>
            partner.id === selectedId
        )
      ) {
        const selected =
          partners.find(
            (partner) =>
              partner.id === selectedId
          );

        if (selected) {
          return [
            selected,
            ...nearby,
          ];
        }
      }

      return nearby;
    }

    return partners.slice(0, 30);
  }, [partners, selectedId]);
    const mapCenter = useMemo(() => {
    if (userLocation) {
      return [
        userLocation.lat,
        userLocation.lng,
      ] as [number, number];
    }

    if (
      districtFilter &&
      DISTRICT_COORDS[districtFilter]
    ) {
      const coordinates =
        DISTRICT_COORDS[districtFilter];

      return [
        coordinates.lat,
        coordinates.lng,
      ] as [number, number];
    }

    return [20.5937, 78.9629] as [
      number,
      number
    ];
  }, [districtFilter, userLocation]);

  const handleSelectPartner = (
  id: string | null
) => {
  setSelectedId(id);

  if (!id) {
    return;
  }

  window.setTimeout(() => {
    cardRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, 50);
};

  const selectedPartner = useMemo(
    () =>
      partners.find(
        (partner) =>
          partner.id === selectedId
      ) ?? null,
    [partners, selectedId]
  );

  const selectedSchemeLabel =
    schemeFilter === "all"
      ? "All Schemes"
      : SCHEME_LABELS[schemeFilter];

  const selectedTypeLabel =
    typeFilter === "all"
      ? "All Types"
      : TYPE_LABELS[typeFilter];

  const handleSchemeSelect = (
    value: string
  ) => {
    if (value === "All Schemes") {
      setSchemeFilter("all");
      return;
    }

    const scheme = (
      Object.keys(
        SCHEME_LABELS
      ) as SchemeId[]
    ).find(
      (id) =>
        SCHEME_LABELS[id] === value
    );

    if (scheme) {
      setSchemeFilter(scheme);
    }
  };

  const handleTypeSelect = (
    value: string
  ) => {
    if (value === "All Types") {
      setTypeFilter("all");
      return;
    }

    const type = (
      Object.keys(
        TYPE_LABELS
      ) as PartnerType[]
    ).find(
      (id) =>
        TYPE_LABELS[id] === value
    );

    if (type) {
      setTypeFilter(type);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-[#D7DEE8] bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center border border-[#CBD5E1] bg-white px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0F5FC5]">
                NIRVAAN • Partner Locator
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl">
                Find a nearby partner
              </h1>

              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#64748B]">
                Locate participating banks and
                financial institutions that can
                help you apply for eligible
                government-backed schemes.
              </p>
            </div>

            <button
              type="button"
              onClick={requestLocation}
              disabled={geoLocating}
              className="border border-[#0F5FC5] bg-white px-4 py-2.5 text-sm font-bold text-[#0F5FC5] transition-colors hover:bg-[#EFF6FF] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {geoLocating
                ? "Finding location..."
                : "Use my location"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Filters */}
        <section className="border border-[#CBD5E1] bg-white">
          <div className="border-b border-[#D7DEE8] bg-[#F8FAFC] px-4 py-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-sm font-extrabold text-[#111827]">
                Search filters
              </h2>

              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#64748B]">
                {displayList.length} partners shown
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-3">
            <LocatorDropdown
              label="Scheme"
              value={selectedSchemeLabel}
              items={schemeOptions}
              onSelect={handleSchemeSelect}
            />

            <LocatorDropdown
              label="Type"
              value={selectedTypeLabel}
              items={typeOptions}
              onSelect={handleTypeSelect}
            />

            <LocatorDropdown
              label="District"
              value={districtFilter}
              items={[
                "All",
                ...allDistricts,
              ]}
              onSelect={(value) =>
                setDistrictFilter(value)
              }
            />

            <label className="flex min-h-10 cursor-pointer items-center gap-2 border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-bold text-[#334155]">
              <input
                type="checkbox"
                checked={includeHighNpa}
                onChange={(event) =>
                  setIncludeHighNpa(
                    event.target.checked
                  )
                }
                className="h-4 w-4 accent-[#0F5FC5]"
              />

              Include high-NPA partners
            </label>

            {(schemeFilter !== "all" ||
              typeFilter !== "all" ||
              districtFilter !==
                "Nandurbar" ||
              includeHighNpa) && (
              <button
                type="button"
                onClick={() => {
                  setSchemeFilter(
                    recommendation?.schemeId ??
                      "all"
                  );
                  setTypeFilter("all");
                  setDistrictFilter(
                    profile?.district ||
                      "Nandurbar"
                  );
                  setIncludeHighNpa(false);
                }}
                className="min-h-10 border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-bold text-[#64748B] transition-colors hover:border-[#0F5FC5] hover:text-[#0F5FC5]"
              >
                Reset filters
              </button>
            )}
          </div>
        </section>

        {selectedPartner && (
          <div className="mt-4 border border-[#BFD3EA] bg-[#EFF6FF] px-4 py-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0F5FC5]">
                  Selected partner
                </p>

                <p className="mt-1 text-sm font-extrabold text-[#111827]">
                  {selectedPartner.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedId(null)
                }
                className="self-start border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-bold text-[#334155] hover:bg-[#F8FAFC] sm:self-auto"
              >
                Clear selection
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.35fr)]">
          {/* Partner List */}
          <section className="min-w-0">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-extrabold text-[#111827]">
                Partner offices
              </h2>

              <span className="text-xs font-bold text-[#64748B]">
                {displayList.length} results
              </span>
            </div>

            {loading ? (
              <div className="border border-[#CBD5E1] bg-[#F8FAFC] px-5 py-10 text-center">
                <div className="text-sm font-bold text-[#0F5FC5]">
                  Loading partner network...
                </div>

                <div className="mt-2 text-xs font-medium text-[#64748B]">
                  Finding suitable offices near
                  your selected location.
                </div>
              </div>
            ) : displayList.length === 0 ? (
              <div className="border border-[#CBD5E1] bg-[#F8FAFC] px-5 py-10 text-center">
                <div className="text-sm font-extrabold text-[#111827]">
                  No partner offices found
                </div>

                <p className="mx-auto mt-2 max-w-sm text-xs font-medium leading-5 text-[#64748B]">
                  Try changing the district,
                  scheme, or partner type filters
                  to see more offices.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {displayList.map((partner) => {
                  const selected =
                    partner.id === selectedId;

                  const healthStyle =
                    HEALTH_STYLES[
                      partner.healthStatus
                    ];

                  return (
                    <article
                      key={partner.id}
                      ref={(element) => {
                        cardRefs.current[
                          partner.id
                        ] = element;
                      }}
                      className={`border bg-white transition-colors ${
                        selected
                          ? "border-[#0F5FC5] shadow-sm"
                          : "border-[#CBD5E1] hover:border-[#94A3B8]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectPartner(
                            partner.id
                          )
                        }
                        className="block w-full text-left"
                      >
                        <div className="border-b border-[#E2E8F0] px-4 py-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-extrabold text-[#111827]">
                                {partner.name}
                              </h3>

                              <p className="mt-1 text-[11px] font-bold text-[#64748B]">
                                {TYPE_LABELS[
                                  partner.type
                                ]}
                              </p>
                            </div>

                            <span
                              className={`shrink-0 border px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] ${healthStyle}`}
                            >
                              {partner.healthStatus ===
                              "green"
                                ? "Healthy"
                                : partner.healthStatus ===
                                    "yellow"
                                  ? "Watch"
                                  : "High NPA"}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-px bg-[#E2E8F0]">
                          <div className="bg-white px-4 py-3">
                            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                              Distance
                            </p>

                            <p className="mt-1 text-sm font-extrabold text-[#111827]">
                              {partner.distanceKm >=
                              0
                                ? `${partner.distanceKm.toFixed(
                                    1
                                  )} km`
                                : "N/A"}
                            </p>
                          </div>

                          <div className="bg-white px-4 py-3">
                            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                              NPA
                            </p>

                            <p className="mt-1 text-sm font-extrabold text-[#111827]">
                              {partner.npaPercent.toFixed(
                                1
                              )}
                              %
                            </p>
                          </div>
                        </div>

                        <div className="px-4 py-3">
                          <p className="text-[11px] font-medium leading-5 text-[#475569]">
                            {partner.address}
                          </p>

                          {partner.district && (
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                              {partner.district}
                            </p>
                          )}
                        </div>
                      </button>

                      <div className="grid grid-cols-2 border-t border-[#E2E8F0]">
                        <a
                          href={`tel:${partner.phone}`}
                          className="border-r border-[#E2E8F0] px-3 py-2.5 text-center text-xs font-extrabold text-[#0F5FC5] transition-colors hover:bg-[#EFF6FF]"
                        >
                          Call
                        </a>

                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${partner.lat},${partner.lng}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2.5 text-center text-xs font-extrabold text-[#E87512] transition-colors hover:bg-[#FFF7ED]"
                        >
                          Directions
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
                    {/* Map */}
          <section className="min-w-0">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-extrabold text-[#111827]">
                Partner Network Map
              </h2>

              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#64748B]">
                India
              </span>
            </div>

            <div className="relative h-[480px] overflow-hidden border border-[#CBD5E1] bg-[#F8FAFC] lg:h-[620px]">
              <MapClient
                partners={partners}
                center={mapCenter}
                zoom={selectedId ? 14 : 7}
                selectedId={selectedId}
                userLocation={userLocation}
                onSelect={handleSelectPartner}
              />
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="border border-[#CBD5E1] bg-white px-3 py-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#94A3B8]">
                  Partners
                </p>

                <p className="mt-1 text-lg font-extrabold text-[#111827]">
                  {partners.length}
                </p>
              </div>

              <div className="border border-[#CBD5E1] bg-white px-3 py-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#94A3B8]">
                  Showing
                </p>

                <p className="mt-1 text-lg font-extrabold text-[#111827]">
                  {displayList.length}
                </p>
              </div>

              <div className="border border-[#CBD5E1] bg-white px-3 py-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#94A3B8]">
                  Area
                </p>

                <p className="mt-1 truncate text-sm font-extrabold text-[#111827]">
                  {districtFilter === "All"
                    ? "India"
                    : districtFilter}
                </p>
              </div>
            </div>

            <div className="mt-3 border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold text-[#111827]">
                    Map guidance
                  </p>

                  <p className="mt-1 text-[11px] font-medium leading-5 text-[#64748B]">
                    Select a partner card or map
                    marker to view the office
                    location and get directions.
                  </p>
                </div>

                {userLocation && (
                  <span className="border border-[#B7D8C0] bg-[#F0FDF4] px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#166534]">
                    Location enabled
                  </span>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Bottom navigation */}
        <div className="mt-8 grid grid-cols-1 gap-3 border-t border-[#D7DEE8] pt-6 sm:grid-cols-2">
                    <Link
            href="/checklist"
            className="border border-[#CBD5E1] bg-white px-5 py-3 text-center text-sm font-bold text-[#334155] transition-colors hover:bg-[#F8FAFC]"
          >
            ← Document Checklist
          </Link>

          <Link
            href="/calculator"
            className="border border-[#0F5FC5] bg-[#0F5FC5] px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#0B4FA7]"
          >
            Loan Calculator →
          </Link>
        </div>
      </div>
    </div>
  );
}
