"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useJourney } from "@/context/JourneyContext";
import { DISTRICT_COORDS, LOCATIONS } from "@/lib/locations";
import type { PartnerType, PartnerWithMeta, SchemeId } from "@/lib/types";

const MapClient = dynamic(() => import("@/components/MapClient"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#F8FAFC] text-sm font-bold text-[#0F5FC5]">
      Loading interactive map...
    </div>
  ),
});

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
  green: "border-[#B7D8C0] bg-[#F0FDF4] text-[#166534]",
  yellow: "border-[#F1D39B] bg-[#FFFBEB] text-[#92400E]",
  red: "border-[#E5B7B7] bg-[#FEF2F2] text-[#991B1B]",
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
      const special = ["All", "All Schemes", "All Types"];

      if (special.includes(a)) return -1;
      if (special.includes(b)) return 1;

      return a.localeCompare(b);
    });

    if (!search.trim()) return sorted;

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

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative z-30">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-10 items-center gap-2 border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-bold text-[#111827] transition-colors hover:border-[#0F5FC5] focus:border-[#0F5FC5] focus:outline-none"
        aria-expanded={open}
      >
        <span className="text-[#0F5FC5]">{label}</span>
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
              onChange={(event) => setSearch(event.target.value)}
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
                const selected = item === value;

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
                      <span className="text-[#E87512]">✓</span>
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
  const { profile, recommendation } = useJourney();

  const [partners, setPartners] = useState<PartnerWithMeta[]>([]);
  const [loading, setLoading] = useState(true);

  const [schemeFilter, setSchemeFilter] = useState<
    SchemeId | "all"
  >(recommendation?.schemeId ?? "all");

  const [typeFilter, setTypeFilter] = useState<
    PartnerType | "all"
  >("all");

  const [districtFilter, setDistrictFilter] = useState(
    profile?.district || "Nandurbar"
  );

  const [includeHighNpa, setIncludeHighNpa] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [geoLocating, setGeoLocating] = useState(false);

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const cardRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  const allDistricts = useMemo(() => {
    const locations = Object.values(LOCATIONS).flat();

    return Array.from(new Set(locations)).sort((a, b) =>
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
    if (!navigator.geolocation) return;

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
        const query = new URLSearchParams();

        if (schemeFilter !== "all") {
          query.set("scheme", schemeFilter);
        }

        if (typeFilter !== "all") {
          query.set("type", typeFilter);
        }

        if (
          districtFilter &&
          districtFilter !== "All"
        ) {
          query.set("district", districtFilter);
        }

        if (includeHighNpa) {
          query.set("includeHighNpa", "true");
        }

        if (userLocation) {
          query.set("userLat", String(userLocation.lat));
          query.set("userLng", String(userLocation.lng));
        } else if (
          districtFilter &&
          DISTRICT_COORDS[districtFilter]
        ) {
          const coordinates =
            DISTRICT_COORDS[districtFilter];

          query.set("userLat", String(coordinates.lat));
          query.set("userLng", String(coordinates.lng));
        }

        const response = await fetch(
          `/api/partners?${query.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to load partners");
        }

        const json = await response.json();

        const list = (json.partners || []) as PartnerWithMeta[];

        list.sort((a, b) => {
          if (
            a.distanceKm >= 0 &&
            b.distanceKm >= 0
          ) {
            return a.distanceKm - b.distanceKm;
          }

          if (a.distanceKm >= 0) return -1;
          if (b.distanceKm >= 0) return 1;

          return a.npaPercent - b.npaPercent;
        });

        if (cancelled) return;

        setPartners(list);

        setSelectedId((current) => {
          if (
            current &&
            list.some((partner) => partner.id === current)
          ) {
            return current;
          }

          return list.length > 0 ? list[0].id : null;
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
          (partner) => partner.id === selectedId
        )
      ) {
        const selected = partners.find(
          (partner) => partner.id === selectedId
        );

        if (selected) {
          return [selected, ...nearby];
        }
      }

      return nearby;
    }

    return partners.slice(0, 30);
  }, [partners, selectedId]);

  const mapCenter = useMemo(() => {
    if (selectedId) {
      const selected = partners.find(
        (partner) => partner.id === selectedId
      );

      if (selected) {
        return [
          selected.lat,
          selected.lng,
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
      DISTRICT_COORDS[districtFilter]
    ) {
      const coordinates =
        DISTRICT_COORDS[districtFilter];

      return [
        coordinates.lat,
        coordinates.lng,
      ] as [number, number];
    }

    return [20.5937, 78.9629] as [number, number];
  }, [
    selectedId,
    userLocation,
    districtFilter,
    partners,
  ]);

  const handleSelectPartner = (id: string | null) => {
    setSelectedId(id);

    if (id && cardRefs.current[id]) {
      cardRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const getHealthLabel = (
    status: PartnerWithMeta["healthStatus"]
  ) => {
    if (status === "green") return "Healthy";
    if (status === "yellow") return "Watchlist";
    return "High NPA";
  };   return (
    <div className="min-h-screen bg-white px-4 py-8 text-[#111827] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <header className="border-b border-[#D7DEE8] pb-7">
          <div className="border-l-4 border-[#0F5FC5] pl-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0F5FC5]">
              NIRVAAN
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
              Partner Locator
            </h1>

            <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-[#64748B]">
              Find eligible channel partners, banks and agencies
              supporting government scheme applications.
            </p>
          </div>
        </header>

        {/* Filters */}
        <section className="relative z-40 mt-6 border border-[#D7DEE8] bg-[#F8FAFC] p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2">
              <LocatorDropdown
                label="Scheme"
                value={
                  schemeFilter === "all"
                    ? "All Schemes"
                    : SCHEME_LABELS[schemeFilter]
                }
                items={schemeOptions}
                onSelect={(value) => {
                  if (value === "Micro Finance") {
                    setSchemeFilter("micro-finance");
                  } else if (value === "Term Loan") {
                    setSchemeFilter("term-loan");
                  } else if (value === "Education Loan") {
                    setSchemeFilter("education-loan");
                  } else {
                    setSchemeFilter("all");
                  }
                }}
              />

              <LocatorDropdown
                label="Type"
                value={
                  typeFilter === "all"
                    ? "All Types"
                    : TYPE_LABELS[typeFilter]
                }
                items={typeOptions}
                onSelect={(value) => {
                  if (value === "PSU Bank") {
                    setTypeFilter("public-sector-bank");
                  } else if (value === "Private Bank") {
                    setTypeFilter("private-bank");
                  } else if (value === "NBFC") {
                    setTypeFilter("nbfc");
                  } else if (value === "Govt. Agency") {
                    setTypeFilter("regional-agency");
                  } else if (value === "Co-op Bank") {
                    setTypeFilter("cooperative");
                  } else {
                    setTypeFilter("all");
                  }
                }}
              />

              <LocatorDropdown
                label="District"
                value={districtFilter || "All"}
                items={["All", ...allDistricts]}
                onSelect={(value) =>
                  setDistrictFilter(
                    value === "All" ? "" : value
                  )
                }
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={requestLocation}
                disabled={geoLocating}
                className="border border-[#E87512] bg-[#E87512] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#C95F08] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {geoLocating
                  ? "Locating..."
                  : "Use My Location"}
              </button>

              <label className="flex cursor-pointer items-center gap-2 border border-[#CBD5E1] bg-white px-3 py-2.5 text-xs font-bold text-[#334155]">
                <input
                  type="checkbox"
                  checked={includeHighNpa}
                  onChange={(event) =>
                    setIncludeHighNpa(event.target.checked)
                  }
                  className="h-4 w-4 cursor-pointer accent-[#0F5FC5]"
                />
                <span>Show high NPA</span>
              </label>
            </div>
          </div>
        </section>

        {/* Results Summary */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="border-l-4 border-[#0F5FC5] bg-[#F8FAFC] px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748B]">
              Nearby branches
            </p>
            <p className="mt-1 text-xl font-extrabold text-[#111827]">
              {displayList.length}
            </p>
            <p className="text-xs font-medium text-[#64748B]">
              Within 500 km
            </p>
          </div>

          <div className="border-l-4 border-[#E87512] bg-[#FFF7ED] px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9A5B20]">
              India network
            </p>
            <p className="mt-1 text-xl font-extrabold text-[#111827]">
              {partners.length}
            </p>
            <p className="text-xs font-medium text-[#64748B]">
              Offices shown on map
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Partner List */}
          <section className="min-w-0">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-extrabold text-[#111827]">
                Nearby Partners
              </h2>

              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#64748B]">
                Nearest first
              </span>
            </div>

            <div className="max-h-[620px] space-y-3 overflow-y-auto pr-1">
              {loading ? (
                <div className="flex h-64 items-center justify-center border border-[#D7DEE8] bg-[#F8FAFC]">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin border-4 border-[#D7DEE8] border-t-[#0F5FC5]" />
                    <p className="text-sm font-bold text-[#0F5FC5]">
                      Finding partner branches...
                    </p>
                  </div>
                </div>
              ) : displayList.length === 0 ? (
                <div className="border border-[#D7DEE8] bg-[#F8FAFC] p-8 text-center">
                  <p className="text-base font-extrabold text-[#111827]">
                    No matching partner branches found.
                  </p>

                  <p className="mt-2 text-xs font-medium leading-5 text-[#64748B]">
                    Try changing the district, scheme or partner
                    type filter.
                  </p>
                </div>
              ) : (
                displayList.map((partner, index) => {
                  const selected =
                    selectedId === partner.id;

                  return (
                    <article
                      key={partner.id}
                      ref={(element) => {
                        cardRefs.current[partner.id] = element;
                      }}
                      onClick={() =>
                        handleSelectPartner(partner.id)
                      }
                      className={`cursor-pointer border bg-white p-5 transition-colors ${
                        selected
                          ? "border-[#0F5FC5] border-l-4 bg-[#F8FBFF]"
                          : "border-[#D7DEE8] hover:border-[#94A3B8]"
                      }`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            {index === 0 && (
                              <span className="border border-[#0F5FC5] bg-[#EFF6FF] px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#0F5FC5]">
                                Nearest
                              </span>
                            )}

                            <h3 className="text-base font-extrabold leading-5 text-[#111827]">
                              {partner.name}
                            </h3>
                          </div>

                          <p className="mt-2 text-xs font-medium text-[#64748B]">
                            {partner.city} ·{" "}
                            <span className="font-bold text-[#334155]">
                              {partner.district},{" "}
                              {partner.state}
                            </span>
                          </p>
                        </div>

                        <span
                          className={`shrink-0 border px-2.5 py-1 text-[10px] font-extrabold uppercase ${HEALTH_STYLES[partner.healthStatus]}`}
                        >
                          {getHealthLabel(
                            partner.healthStatus
                          )}{" "}
                          ({partner.npaPercent}% NPA)
                        </span>
                      </div>

                      <p className="mt-3 text-xs font-medium leading-5 text-[#475569]">
                        {partner.address}
                        {partner.pincode
                          ? ` - ${partner.pincode}`
                          : ""}
                      </p>

                      <div className="mt-4 flex flex-col gap-3 border-t border-[#E5E7EB] pt-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="border border-[#CBD5E1] bg-[#F8FAFC] px-2.5 py-1 text-[10px] font-bold text-[#475569]">
                            {TYPE_LABELS[partner.type]}
                          </span>

                          {typeof partner.distanceKm ===
                            "number" &&
                            partner.distanceKm >= 0 && (
                              <span className="text-[11px] font-bold text-[#0F5FC5]">
                                {partner.distanceKm.toFixed(1)} km
                                away
                              </span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {partner.phone && (
                            <a
                              href={`tel:${partner.phone}`}
                              onClick={(event) =>
                                event.stopPropagation()
                              }
                              className="border border-[#0F5FC5] bg-white px-3 py-1.5 text-[11px] font-bold text-[#0F5FC5] transition-colors hover:bg-[#EFF6FF]"
                            >
                              Call
                            </a>
                          )}

                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${partner.lat},${partner.lng}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                            className="border border-[#E87512] bg-[#E87512] px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-[#C95F08]"
                          >
                            Directions
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
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
