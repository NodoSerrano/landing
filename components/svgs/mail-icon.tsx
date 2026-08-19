import type React from "react";

interface IconProps {
  className?: string;
}

export default function MailIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M6 30C5.175 30 4.469 29.7065 3.882 29.1195C3.295 28.5325 3.001 27.826 3 27V9C3 8.175 3.294 7.469 3.882 6.882C4.47 6.295 5.176 6.001 6 6H30C30.825 6 31.5315 6.294 32.1195 6.882C32.7075 7.47 33.001 8.176 33 9V27C33 27.825 32.7065 28.5315 32.1195 29.1195C31.5325 29.7075 30.826 30.001 30 30H6ZM30 12L18.7875 19.0125C18.6625 19.0875 18.5315 19.144 18.3945 19.182C18.2575 19.22 18.126 19.2385 18 19.2375C17.874 19.2365 17.743 19.218 17.607 19.182C17.471 19.146 17.3395 19.0895 17.2125 19.0125L6 12V27H30V12ZM18 16.5L30 9H6L18 16.5ZM6 12.375V10.1625V10.2V10.182V12.375Z"
        fill="url(#mail-icon-gradient)"
      />
      <defs>
        <linearGradient
          id="mail-icon-gradient"
          x1="3"
          y1="18"
          x2="33"
          y2="18"
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
