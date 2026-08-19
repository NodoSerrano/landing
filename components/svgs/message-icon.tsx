import type React from "react";

interface IconProps {
  className?: string;
}

export default function MessageIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M31.8752 18C31.8775 19.8217 31.5203 21.626 30.8241 23.3093C30.1278 24.9927 29.1062 26.5222 27.8177 27.81C26.5286 29.0994 24.9981 30.122 23.3135 30.8195C21.629 31.517 19.8235 31.8757 18.0002 31.875C16.0379 31.8793 14.0973 31.4651 12.3077 30.66L6.50722 31.518C6.21922 31.565 5.92409 31.541 5.64747 31.4481C5.37085 31.3552 5.12111 31.1961 4.91993 30.9847C4.71875 30.7733 4.57222 30.516 4.49306 30.2352C4.4139 29.9543 4.40452 29.6583 4.46572 29.373L5.27122 23.4885C4.50501 21.7608 4.11439 19.89 4.12522 18C4.12289 16.1783 4.48009 14.374 5.17636 12.6907C5.87263 11.0073 6.89426 9.47782 8.18272 8.19C9.4718 6.90063 11.0024 5.87796 12.6869 5.18046C14.3715 4.48296 16.177 4.12431 18.0002 4.125C21.6821 4.12525 25.2133 5.58736 27.8177 8.19C29.1055 9.47832 30.1267 11.0078 30.8229 12.6911C31.5192 14.3744 31.8767 16.1784 31.8752 18Z"
        stroke="url(#message-icon-gradient)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="message-icon-gradient"
          x1="4.125"
          y1="18"
          x2="31.8752"
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
