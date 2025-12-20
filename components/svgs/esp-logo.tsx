import type React from "react";

interface IconProps {
  className?: string;
}

export default function ESPLogo({ className = "h-32 w-auto" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 93.231 158.588"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id="esp-gradient-1"
          x1="-1.041"
          y1="74.024"
          x2="56.307"
          y2="16.676"
          gradientTransform="matrix(1, 0, 0, -1, 0, 165.733)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f47d51" />
          <stop offset="0.96" stopColor="#df72ac" />
        </linearGradient>
        <linearGradient
          id="esp-gradient-2"
          x1="56.17"
          y1="54.938"
          x2="75.388"
          y2="35.72"
          gradientTransform="matrix(1, 0, 0, -1, 0, 165.733)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f15d4c" />
          <stop offset="1" stopColor="#c36ca1" />
        </linearGradient>
        <linearGradient
          id="esp-gradient-3"
          x1="70.463"
          y1="104.612"
          x2="27.115"
          y2="47.264"
          gradientTransform="matrix(1, 0, 0, -1, 0, 165.733)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f47d51" />
          <stop offset="0.96" stopColor="#df72ac" />
        </linearGradient>
        <linearGradient
          id="esp-gradient-4"
          x1="70.463"
          y1="137.557"
          x2="27.115"
          y2="80.209"
          gradientTransform="matrix(1, 0, 0, -1, 0, 165.733)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f47d51" />
          <stop offset="0.96" stopColor="#df72ac" />
        </linearGradient>
        <linearGradient
          id="esp-gradient-5"
          x1="-1.041"
          y1="137.557"
          x2="41.307"
          y2="80.209"
          gradientTransform="matrix(1, 0, 0, -1, 0, 165.733)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f47d51" />
          <stop offset="0.96" stopColor="#df72ac" />
        </linearGradient>
        <linearGradient
          id="esp-gradient-6"
          x1="-1.041"
          y1="104.612"
          x2="41.307"
          y2="47.264"
          gradientTransform="matrix(1, 0, 0, -1, 0, 165.733)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f47d51" />
          <stop offset="0.96" stopColor="#df72ac" />
        </linearGradient>
      </defs>
      <polygon
        fill="url(#esp-gradient-1)"
        points="46.775 120.463 46.775 158.588 0 90.668 46.775 120.463"
      />
      <polygon
        fill="url(#esp-gradient-2)"
        points="93.231 90.668 46.775 158.588 46.775 120.463 93.231 90.668"
      />
      <polygon
        fill="url(#esp-gradient-3)"
        points="93.231 81.056 46.775 54.465 46.775 110.851 93.231 81.056"
      />
      <polygon
        fill="url(#esp-gradient-4)"
        points="93.231 81.056 46.775 0 46.775 54.465 93.231 81.056"
      />
      <polygon
        fill="url(#esp-gradient-5)"
        points="46.775 0 46.775 54.465 0 81.056 46.775 0"
      />
      <polygon
        fill="url(#esp-gradient-6)"
        points="46.775 54.465 46.775 110.851 0 81.056 46.775 54.465"
      />
    </svg>
  );
}
