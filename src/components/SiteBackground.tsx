"use client";

export interface SiteBackgroundProps {
  interactive?: boolean;
  opacity?: number;
  className?: string;
}

export default function SiteBackground({
  className = "",
}: SiteBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 bg-white ${className}`.trim()}
    />
  );
}
