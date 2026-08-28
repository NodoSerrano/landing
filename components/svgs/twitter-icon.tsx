import type React from "react";

interface IconProps {
  className?: string;
}

export default function TwitterIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M29.8354 11.0128C29.7004 11.5078 29.1004 12.7528 28.0804 13.9378C27.4054 26.9578 14.7754 31.1878 6.12036 26.8228C4.93536 25.2478 10.3954 25.8928 12.3904 22.8778C4.84536 19.0228 5.44536 8.71776 6.96036 9.13776C10.5154 13.9228 16.2454 14.3578 17.1754 13.9228C17.1754 12.8278 16.7104 10.4428 19.2904 8.44776C20.7754 7.38276 23.8804 6.43776 26.6854 9.48276C27.1654 9.79776 27.8554 9.93276 28.8904 9.70776C29.5054 9.39276 30.3154 9.60276 29.8954 10.6978L29.8354 11.0128Z"
        stroke="url(#twitter-icon-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="twitter-icon-gradient"
          x1="5.95386"
          y1="17.953"
          x2="30.0113"
          y2="17.953"
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
