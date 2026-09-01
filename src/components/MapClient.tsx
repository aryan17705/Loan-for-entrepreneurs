"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import type { PartnerWithMeta } from "@/lib/types";

const COLORS: Record<PartnerWithMeta["healthStatus"], string> = {
  green: "#16A34A",
  yellow: "#D97706",
  red: "#DC2626",
};

interface Props {
  partners: PartnerWithMeta[];
  center: [number, number];
  zoom?: number;
  selectedId?: string | null;
  userLocation?: { lat: number; lng: number } | null;
  onSelect: (id: string | null) => void;
}

function getHealthLabel(status: PartnerWithMeta["healthStatus"]) {
  if (status === "green") return "Healthy";
  if (status === "yellow") return "Watchlist";
  return "High NPA";
}

export default function MapClient({
  partners,
  center,
  zoom = 5,
  selectedId,
  userLocation,
  onSelect,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const initializedRef = useRef(false);

  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!containerRef.current || !token || mapRef.current) {
      return;
    }

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center,
      zoom,
      attributionControl: true,
      cooperativeGestures: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      maxZoom: 18,
      minZoom: 3,
    });

    map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
        visualizePitch: false,
      }),
      "top-right"
    );

    map.on("load", () => {
      initializedRef.current = true;
    });

    mapRef.current = map;

    return () => {
      initializedRef.current = false;

      Object.values(markersRef.current).forEach((marker) => {
        marker.remove();
      });

      markersRef.current = {};

      userMarkerRef.current?.remove();
      userMarkerRef.current = null;

      map.remove();
      mapRef.current = null;
    };
  }, [token]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !initializedRef.current) {
      return;
    }

    const existingIds = new Set(partners.map((partner) => partner.id));

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      if (!existingIds.has(id)) {
        marker.remove();
        delete markersRef.current[id];
      }
    });

    partners.forEach((partner) => {
      const isSelected = selectedId === partner.id;
      const color = COLORS[partner.healthStatus];

      let marker = markersRef.current[partner.id];

      if (!marker) {
        const element = document.createElement("button");

        element.type = "button";
        element.setAttribute(
          "aria-label",
          `Select ${partner.name}`
        );

        marker = new mapboxgl.Marker({
          element,
          anchor: "center",
        })
          .setLngLat([partner.lng, partner.lat])
          .addTo(map);

        element.addEventListener("click", (event) => {
          event.stopPropagation();
          onSelect(partner.id);
        });

        markersRef.current[partner.id] = marker;
      }

      const element = marker.getElement();

      element.style.width = isSelected ? "28px" : "18px";
      element.style.height = isSelected ? "28px" : "18px";
      element.style.borderRadius = "50%";
      element.style.border = isSelected
        ? "4px solid #FFFFFF"
        : "3px solid #FFFFFF";
      element.style.backgroundColor = isSelected
        ? "#F97316"
        : color;
      element.style.boxShadow = isSelected
        ? "0 0 0 5px rgba(249,115,22,0.35), 0 3px 12px rgba(0,0,0,0.55)"
        : "0 2px 8px rgba(0,0,0,0.55)";
      element.style.cursor = "pointer";
      element.style.padding = "0";
      element.style.margin = "0";
      element.style.transition =
        "width 160ms ease, height 160ms ease, background-color 160ms ease, box-shadow 160ms ease";

      marker
        .setLngLat([partner.lng, partner.lat])
        .addTo(map);

      const popup = new mapboxgl.Popup({
        offset: 18,
        closeButton: true,
        closeOnClick: false,
        maxWidth: "320px",
        className: "nirvaan-map-popup",
      }).setHTML(`
        <div style="
          width: 270px;
          padding: 2px;
          font-family: Arial, sans-serif;
          color: #111827;
        ">
          <div style="
            border-bottom: 1px solid #D7DEE8;
            padding-bottom: 10px;
            margin-bottom: 10px;
          ">
            <div style="
              font-size: 14px;
              line-height: 1.35;
              font-weight: 800;
              color: #111827;
            ">
              ${partner.name}
            </div>
          </div>

          <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            margin-bottom: 10px;
          ">
            <span style="
              display: inline-block;
              padding: 4px 7px;
              border: 1px solid ${color};
              background: #FFFFFF;
              color: ${color};
              font-size: 10px;
              line-height: 1;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.04em;
            ">
              ${getHealthLabel(partner.healthStatus)}
            </span>

            ${
              partner.distanceKm >= 0
                ? `
                  <span style="
                    font-size: 11px;
                    font-weight: 700;
                    color: #475569;
                    white-space: nowrap;
                  ">
                    ${partner.distanceKm.toFixed(1)} km
                  </span>
                `
                : ""
            }
          </div>

          <div style="
            font-size: 11px;
            line-height: 1.55;
            color: #475569;
            margin-bottom: 12px;
          ">
            ${partner.address}, ${partner.city}<br />
            ${partner.district}, ${partner.state}
            ${
              partner.pincode
                ? `<br />PIN ${partner.pincode}`
                : ""
            }
          </div>

          <div style="
            display: flex;
            gap: 6px;
            border-top: 1px solid #E2E8F0;
            padding-top: 10px;
          ">
            ${
              partner.phone
                ? `
                  <a
                    href="tel:${partner.phone}"
                    style="
                      flex: 1;
                      display: block;
                      padding: 8px 6px;
                      border: 1px solid #CBD5E1;
                      background: #FFFFFF;
                      color: #0F5FC5;
                      text-align: center;
                      text-decoration: none;
                      font-size: 11px;
                      font-weight: 800;
                    "
                  >
                    Call
                  </a>
                `
                : ""
            }

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=${partner.lat},${partner.lng}"
              target="_blank"
              rel="noreferrer"
              style="
                flex: 1;
                display: block;
                padding: 8px 6px;
                border: 1px solid #0F5FC5;
                background: #0F5FC5;
                color: #FFFFFF;
                text-align: center;
                text-decoration: none;
                font-size: 11px;
                font-weight: 800;
              "
            >
              Directions
            </a>
          </div>
        </div>
      `);

      marker.setPopup(popup);

      if (isSelected && !marker.getPopup()?.isOpen()) {
        popup.addTo(map);
      }

      if (!isSelected && marker.getPopup()?.isOpen()) {
        marker.togglePopup();
      }
    });
  }, [partners, selectedId, onSelect]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !initializedRef.current) {
      return;
    }

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (!userLocation) {
      return;
    }

    const element = document.createElement("div");

    element.style.width = "18px";
    element.style.height = "18px";
    element.style.borderRadius = "50%";
    element.style.background = "#0F5FC5";
    element.style.border = "4px solid #FFFFFF";
    element.style.boxShadow =
      "0 0 0 8px rgba(15,95,197,0.25), 0 3px 12px rgba(0,0,0,0.45)";

    userMarkerRef.current = new mapboxgl.Marker({
      element,
    })
      .setLngLat([userLocation.lng, userLocation.lat])
      .setPopup(
        new mapboxgl.Popup({
          offset: 14,
          closeButton: false,
        }).setHTML(`
          <div style="
            padding: 2px 4px;
            font-family: Arial, sans-serif;
            font-size: 11px;
            font-weight: 800;
            color: #111827;
          ">
            Your current location
          </div>
        `)
      )
      .addTo(map);
  }, [userLocation]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !initializedRef.current) {
      return;
    }

    if (selectedId) {
      const selected = partners.find(
        (partner) => partner.id === selectedId
      );

      if (selected) {
        map.flyTo({
          center: [selected.lng, selected.lat],
          zoom: 14,
          speed: 0.8,
          curve: 1.2,
          essential: true,
        });

        return;
      }
    }

    map.flyTo({
      center,
      zoom,
      speed: 0.7,
      curve: 1.1,
      essential: true,
    });
  }, [center, zoom, selectedId, partners]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      style={{
        minHeight: "100%",
        background: "#DDE5EC",
      }}
    >
      {!token && (
        <div className="flex h-full items-center justify-center bg-[#F8FAFC] p-6 text-center">
          <div className="max-w-md border border-[#CBD5E1] bg-white p-6">
            <div className="mb-2 text-sm font-extrabold text-[#111827]">
              Satellite map configuration required
            </div>

            <p className="text-xs leading-5 text-[#64748B]">
              Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to the
              environment variables before deploying.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
