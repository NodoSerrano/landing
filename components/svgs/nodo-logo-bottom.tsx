import type React from "react";

interface IconProps {
  className?: string;
}

export default function NodoLogoBottom({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg
      id="bottom_logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 260 495 540"
      className={className}
    >
      <defs>
        <style>
          {`.cls-1, .cls-2 {
            fill: #1a3f6b;
          }

          .cls-3 {
            fill: #b285c1;
          }

          .cls-3, .cls-2, .cls-4 {
            fill-rule: evenodd;
          }

          .cls-4 {
            fill: #2684c4;
          }
          `}
        </style>
      </defs>
      <polygon
        className="cls-2"
        points="247.56 261.71 2.31 383.84 247.7 513.91 492.73 383.85 247.56 261.71"
      />
      <path
        className="cls-4"
        d="M480.21,419.1c4.09-5.48,6.34-12.28,6.34-19.13v-5.85l-235.98,124.9v260.6l229.64-360.51Z"
      />
      <path
        className="cls-3"
        d="M16.77,426.14c1.34,2.05,190.25,293.92,227.58,351.6v-259.12L8.47,394.1v14.94c0,4.35,5.19,12.33,8.29,17.1Z"
      />
      <path
        className="cls-1"
        d="M247.83,513.42L2.24,383.77v25.27c0,5.72,4.4,12.96,9.3,20.49,1.47,2.26,231.62,357.85,233.95,361.44l2.64,4.07,237.14-372.31c4.84-6.53,7.5-14.61,7.5-22.76v-16.2l-244.94,129.65ZM8.47,409.04v-14.94l235.87,124.51v259.12c-37.33-57.67-226.24-349.54-227.58-351.6-3.1-4.77-8.29-12.75-8.29-17.1ZM486.54,399.96c0,6.86-2.25,13.65-6.34,19.13l-229.64,360.51v-260.6l235.98-124.9v5.85Z"
      />
    </svg>
  );
}
