import type React from "react";

interface IconProps {
  className?: string;
}

// Figma (node 84:237, boxicons:location) is a "current location" pin: an
// OUTLINED teardrop (outer boundary + a second inner boundary, not a solid
// fill) with a small target ring floating in the hollow middle. Pulled from
// the live Figma asset (not the codegen summary, which flattened away the
// inner boundary subpath and made it look like a solid blob). All 4 loops
// combined into one evenodd path reproduces: filled border, hollow
// interior, filled target ring, hollow ring center.
export default function MapPinIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 31 31.0129" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.751 28.1842C14.9705 28.3392 15.2418 28.4296 15.5001 28.4296C15.7585 28.4296 16.0297 28.3521 16.2493 28.1842C16.6368 27.9 25.8722 21.2479 25.8335 12.9167C25.8335 7.22042 21.1964 2.58334 15.5001 2.58334C9.80387 2.58334 5.16679 7.22042 5.16679 12.9167C5.12804 21.235 14.3635 27.9 14.751 28.1842ZM15.5001 5.17959C19.7755 5.17959 23.2501 8.65417 23.2501 12.9296C23.276 18.6646 17.5797 23.8183 15.5001 25.5104C13.4205 23.8183 7.72429 18.6775 7.75012 12.9296C7.75012 8.65417 11.2247 5.17959 15.5001 5.17959ZM20.6667 12.9289C20.6667 10.0731 18.3546 7.7601 15.5 7.7601C12.6454 7.7601 10.3333 10.0731 10.3333 12.9289C10.3333 15.7847 12.6454 18.0977 15.5 18.0977C18.3546 18.0977 20.6667 15.7847 20.6667 12.9289ZM12.9167 12.9289C12.9167 11.5075 14.0792 10.3445 15.5 10.3445C16.9208 10.3445 18.0833 11.5075 18.0833 12.9289C18.0833 14.3503 16.9208 15.5133 15.5 15.5133C14.0792 15.5133 12.9167 14.3503 12.9167 12.9289Z"
        fill="url(#map-pin-icon-gradient)"
      />
      <defs>
        <linearGradient
          id="map-pin-icon-gradient"
          x1="5.16667"
          y1="15.5065"
          x2="25.8336"
          y2="15.5065"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF9728" />
          <stop offset="0.5" stopColor="#FF3121" />
          <stop offset="1" stopColor="#9E1FD0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
