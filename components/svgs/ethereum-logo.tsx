import type React from "react";

interface IconProps {
  className?: string;
}

export default function EthereumLogo({ className = "h-32 w-auto" }: IconProps) {
  return (
    <svg height="128" viewBox="0 0 256 417" className={className} preserveAspectRatio="xMidYMid meet">
      <path
        d="m127.961 0-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
        fill="#343434"
      />
      <path
        d="m127.962 0-127.962 212.32 127.962 75.639V154.158z"
        fill="#8C8C8C"
      />
      <path
        d="m127.961 312.187-1.575 1.92v98.199l1.575 4.6L256 236.587z"
        fill="#3C3C3B"
      />
      <path
        d="m127.962 416.905v-104.72L0 236.585z"
        fill="#8C8C8C"
      />
      <path
        d="m127.961 287.958 127.96-75.637-127.96-58.162z"
        fill="#141414"
      />
      <path d="m0 212.32 127.96 75.638v-133.8z" fill="#393939" />
    </svg>
  );
}
