"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import type { PartnerWithMeta } from "@/lib/types";

type MapClientProps = {
  partners: PartnerWithMeta[];
  center: [number, number];
  zoom: number;
  selectedId: string | null;
  userLocation: {
    lat: number;
    lng: number;
  } | null;
  onSelect: (id: string | null) => void;
};

const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function getHealthColor(
  status: PartnerWithMeta["healthStatus"]
) {
  if (status === "green") {
    return "#16A34A";
  }

  if (status === "yellow") {
    return "#D97706";
  }

  return "#DC2626";
}

function getHealthLabel(
  status: PartnerWithMeta["healthStatus"]
) {
  if (status === "green") {
    return "Healthy";
  }

  if (status === "yellow") {
    return "Watchlist";
  }

  return "High NPA";
}

function getTypeLabel(
  type: PartnerWithMeta["type"]
) {
  if (type === "public-sector-bank") {
    return "PSU Bank";
  }

  if (type === "private-bank") {
    return "Private Bank";
  }

  if (type === "nbfc") {
    return "NBFC";
  }

  if (type === "regional-agency") {
    return "Govt. Agency";
  }

  return "Co-op Bank";
}

export default function MapClient({
  partners,
  center,
  zoom,
  selectedId,
  userLocation,
  onSelect,
}: MapClientProps) {
  const mapContainerRef =
    useRef<HTMLDivElement | null>(null);

  const mapRef =
    useRef<mapboxgl.Map | null>(null);

  const markersRef =
    useRef<
      Record<
        string,
        mapboxgl.Marker
      >
    >({});

  const userMarkerRef =
    useRef<mapboxgl.Marker | null>(
      null
    );

  const initializedRef =
    useRef(false);

  /*
   * Keep the latest selection callback
   * available to marker click handlers.
   */
  const onSelectRef =
    useRef(onSelect);

  useEffect(() => {
    onSelectRef.current =
      onSelect;
  }, [onSelect]);

  /*
   * Create the Mapbox map once.
   */
  useEffect(() => {
    if (
      !mapContainerRef.current ||
      mapRef.current
    ) {
      return;
    }

    if (!MAPBOX_TOKEN) {
      return;
    }

    mapboxgl.accessToken =
      MAPBOX_TOKEN;

    const map =
      new mapboxgl.Map({
        container:
          mapContainerRef.current,
        style:
          "mapbox://styles/mapbox/satellite-streets-v12",
        center: [
          center[1],
          center[0],
        ],
        zoom,
        attributionControl: true,
      });

    map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
      }),
      "top-right"
    );

    mapRef.current = map;

    map.on("load", () => {
      initializedRef.current =
        true;
    });

    return () => {
      initializedRef.current =
        false;

      Object.values(
        markersRef.current
      ).forEach((marker) => {
        marker.remove();
      });

      markersRef.current = {};

      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current =
          null;
      }

      map.remove();
      mapRef.current = null;
    };
  }, []);

  /*
   * Update map camera when the locator
   * changes district, user location or
   * selected partner.
   */
  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    if (selectedId) {
      const selected =
        partners.find(
          (partner) =>
            partner.id === selectedId
        );

      if (selected) {
        map.flyTo({
          center: [
            selected.lng,
            selected.lat,
          ],
          zoom: 14,
          duration: 900,
          essential: true,
        });

        return;
      }
    }

    map.flyTo({
      center: [
        center[1],
        center[0],
      ],
      zoom,
      duration: 700,
      essential: true,
    });
  }, [
    center,
    zoom,
    selectedId,
    partners,
  ]);

  /*
   * Render all partner markers.
   */
  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    /*
     * Remove markers that no longer exist
     * in the current partner response.
     */
    const currentIds =
      new Set(
        partners.map(
          (partner) => partner.id
        )
      );

    Object.entries(
      markersRef.current
    ).forEach(([id, marker]) => {
      if (!currentIds.has(id)) {
        marker.remove();
        delete markersRef.current[id];
      }
    });

    partners.forEach((partner) => {
      const existing =
        markersRef.current[
          partner.id
        ];

      const isSelected =
        partner.id === selectedId;

      const healthColor =
        getHealthColor(
          partner.healthStatus
        );

      /*
       * Update an existing marker.
       */
      if (existing) {
        const element =
          existing.getElement();

        element.style.width =
          isSelected
            ? "34px"
            : "26px";

        element.style.height =
          isSelected
            ? "34px"
            : "26px";

        element.style.background =
          isSelected
            ? "#E87512"
            : healthColor;

        element.style.borderColor =
          isSelected
            ? "#FFFFFF"
            : "#FFFFFF";

        element.style.boxShadow =
          isSelected
            ? "0 0 0 3px rgba(232,117,18,0.35), 0 4px 12px rgba(0,0,0,0.35)"
            : "0 2px 8px rgba(0,0,0,0.35)";

        existing.setLngLat([
          partner.lng,
          partner.lat,
        ]);

        const popup =
          existing.getPopup();

        if (popup) {
          popup.setHTML(
            createPopupHtml(
              partner
            )
          );
        }

        return;
      }

      /*
       * Create a new rectangular marker
       * container with a circular location
       * point inside it.
       *
       * The marker itself is intentionally
       * circular because it is a geographic
       * map-location symbol, not UI chrome.
       */
      const markerElement =
        document.createElement(
          "button"
        );

      markerElement.type =
        "button";

      markerElement.setAttribute(
        "aria-label",
        `Select ${partner.name}`
      );

      markerElement.style.width =
        isSelected
          ? "34px"
          : "26px";

      markerElement.style.height =
        isSelected
          ? "34px"
          : "26px";

      markerElement.style.borderRadius =
        "50%";

      markerElement.style.border =
        "3px solid #FFFFFF";

      markerElement.style.background =
        isSelected
          ? "#E87512"
          : healthColor;

      markerElement.style.boxShadow =
        isSelected
          ? "0 0 0 3px rgba(232,117,18,0.35), 0 4px 12px rgba(0,0,0,0.35)"
          : "0 2px 8px rgba(0,0,0,0.35)";

      markerElement.style.cursor =
        "pointer";

      markerElement.style.padding =
        "0";

      markerElement.style.margin =
        "0";

      markerElement.style.display =
        "block";

      markerElement.style.transition =
        "all 160ms ease";

      markerElement.addEventListener(
        "click",
        (event) => {
          event.stopPropagation();

          onSelectRef.current(
            partner.id
          );
        }
      );

      const popup =
        new mapboxgl.Popup({
          offset: 18,
          closeButton: true,
          closeOnClick: false,
          maxWidth: "320px",
        }).setHTML(
          createPopupHtml(
            partner
          )
        );

      const marker =
        new mapboxgl.Marker({
          element: markerElement,
          anchor: "center",
        })
          .setLngLat([
            partner.lng,
            partner.lat,
          ])
          .setPopup(popup)
          .addTo(map);

      markersRef.current[
        partner.id
      ] = marker;
    });
  }, [partners, selectedId]);

  /*
   * Show the user's current location.
   */
  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    if (!userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current =
          null;
      }

      return;
    }

    if (userMarkerRef.current) {
      userMarkerRef.current.setLngLat([
        userLocation.lng,
        userLocation.lat,
      ]);

      return;
    }

    const userElement =
      document.createElement(
        "div"
      );

    userElement.style.width =
      "18px";

    userElement.style.height =
      "18px";

    userElement.style.borderRadius =
      "50%";

    userElement.style.background =
      "#2563EB";

    userElement.style.border =
      "3px solid #FFFFFF";

    userElement.style.boxShadow =
      "0 0 0 5px rgba(37,99,235,0.25), 0 2px 8px rgba(0,0,0,0.35)";

    userMarkerRef.current =
      new mapboxgl.Marker({
        element: userElement,
        anchor: "center",
      })
        .setLngLat([
          userLocation.lng,
          userLocation.lat,
        ])
        .setPopup(
          new mapboxgl.Popup({
            offset: 12,
            closeButton: true,
          }).setHTML(
            `
              <div style="font-family: Arial, sans-serif; padding: 2px;">
                <div style="font-size:12px; font-weight:700; color:#111827;">
                  Your location
                </div>
              </div>
            `
          )
        )
        .addTo(map);
  }, [userLocation]);

  if (!MAPBOX_TOKEN) {
    return (
      <div
        ref={mapContainerRef}
        className="flex h-full items-center justify-center bg-[#F8FAFC] p-6"
      >
        <div className="w-full max-w-md border border-[#CBD5E1] bg-white p-6 text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#E87512]">
            Map configuration required
          </p>

          <h3 className="mt-2 text-lg font-extrabold text-[#111827]">
            Satellite map is not configured
          </h3>

          <p className="mt-2 text-xs font-medium leading-5 text-[#64748B]">
            Add your Mapbox public access token
            as NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
            in the local environment and Vercel
            project settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapContainerRef}
      className="h-full w-full"
    />
  );
}

function createPopupHtml(
  partner: PartnerWithMeta
) {
  const healthLabel =
    getHealthLabel(
      partner.healthStatus
    );

  const healthColor =
    getHealthColor(
      partner.healthStatus
    );

  const typeLabel =
    getTypeLabel(
      partner.type
    );

  const distance =
    typeof partner.distanceKm ===
      "number" &&
    partner.distanceKm >= 0
      ? `${partner.distanceKm.toFixed(
          1
        )} km away`
      : "Distance unavailable";

  const directionsUrl =
    `https://www.google.com/maps/dir/?api=1&destination=${partner.lat},${partner.lng}`;

  const phoneHtml =
    partner.phone
      ? `
          <a
            href="tel:${escapeHtml(
              partner.phone
            )}"
            style="
              display:inline-block;
              padding:7px 10px;
              border:1px solid #0F5FC5;
              color:#0F5FC5;
              background:#FFFFFF;
              text-decoration:none;
              font-size:11px;
              font-weight:700;
            "
          >
            Call
          </a>
        `
      : "";

  return `
    <div
      style="
        width:100%;
        font-family:Arial,sans-serif;
        color:#111827;
        padding:2px;
      "
    >
      <div
        style="
          font-size:15px;
          line-height:20px;
          font-weight:800;
          margin-bottom:6px;
        "
      >
        ${escapeHtml(
          partner.name
        )}
      </div>

      <div
        style="
          font-size:11px;
          line-height:17px;
          color:#64748B;
          font-weight:600;
          margin-bottom:9px;
        "
      >
        ${escapeHtml(
          partner.city
        )}, ${escapeHtml(
          partner.district
        )}, ${escapeHtml(
          partner.state
        )}
      </div>

      <div
        style="
          display:inline-block;
          border:1px solid ${healthColor};
          color:${healthColor};
          padding:4px 7px;
          font-size:10px;
          font-weight:800;
          margin-bottom:9px;
        "
      >
        ${healthLabel} · ${
          partner.npaPercent
        }% NPA
      </div>

      <div
        style="
          font-size:11px;
          line-height:17px;
          color:#475569;
          margin-bottom:8px;
        "
      >
        ${escapeHtml(
          partner.address
        )}
        ${
          partner.pincode
            ? ` - ${escapeHtml(
                partner.pincode
              )}`
            : ""
        }
      </div>

      <div
        style="
          font-size:10px;
          color:#64748B;
          font-weight:700;
          margin-bottom:10px;
        "
      >
        ${escapeHtml(
          typeLabel
        )} · ${distance}
      </div>

      <div
        style="
          display:flex;
          gap:7px;
          align-items:center;
        "
      >
        ${phoneHtml}

        <a
          href="${directionsUrl}"
          target="_blank"
          rel="noreferrer"
          style="
            display:inline-block;
            padding:7px 10px;
            border:1px solid #E87512;
            color:#FFFFFF;
            background:#E87512;
            text-decoration:none;
            font-size:11px;
            font-weight:700;
          "
        >
          Directions
        </a>
      </div>
    </div>
  `;
}

function escapeHtml(
  value: string
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
