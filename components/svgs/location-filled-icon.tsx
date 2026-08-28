import type React from "react";

interface IconProps {
  className?: string;
}

const GRADIENT_ID = "location-filled-icon-gradient";

export default function LocationFilledIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill={`url(#${GRADIENT_ID})`}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      />
      <defs>
        <linearGradient
          id={GRADIENT_ID}
          x1="24"
          y1="0"
          x2="0"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-brand-mint)" />
          <stop offset="0.466597" stopColor="var(--color-brand-blue)" />
          <stop offset="0.932457" stopColor="var(--color-brand-violet)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
