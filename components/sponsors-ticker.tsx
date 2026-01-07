"use client";

import React from "react";
import Image from "next/image";
import EthereumLogo from "@/components/svgs/ethereum-logo";
import ESPLogo from "@/components/svgs/esp-logo";

interface Sponsor {
  name: string;
  logo: React.ReactNode;
  url: string;
  alt: string;
}

const sponsors: Sponsor[] = [
  {
    name: "Ethereum Foundation",
    logo: <EthereumLogo className="h-20 md:h-32 w-auto" />,
    url: "https://ethereum.org/",
    alt: "Ethereum",
  },
  {
    name: "Ethereum Support Program",
    logo: <ESPLogo className="h-20 md:h-32 w-auto" />,
    url: "https://esp.ethereum.foundation/",
    alt: "Ethereum Support Program",
  },
  {
    name: "DevConnect",
    logo: (
      <Image
        src="https://devconnect.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcube-logo.6e90fa94.png&w=384&q=75"
        alt="DevConnect"
        width={128}
        height={128}
        className="h-20 md:h-32 w-auto object-contain"
      />
    ),
    url: "https://devconnect.org/",
    alt: "DevConnect",
  },
  {
    name: "The Red Guild",
    logo: (
      <Image
        src="https://theredguild.org/assets/navbar-logo.svg"
        alt="The Red Guild"
        width={200}
        height={128}
        className="h-20 md:h-32 w-auto object-contain"
      />
    ),
    url: "https://theredguild.org/",
    alt: "The Red Guild",
  },
];

export default function SponsorsTicker() {
  // Create multiple copies for seamless infinite scroll
  const duplicatedSponsors = [
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
  ];

  return (
    <div className="w-full overflow-hidden py-4 md:py-8 relative">
      <div className="flex items-center gap-12 md:gap-20 animate-marquee hover:pause-marquee">
        {duplicatedSponsors.map((sponsor, index) => (
          <div
            key={`${sponsor.name}-${index}`}
            className="flex-shrink-0 flex flex-col items-center md:flex-row md:items-center gap-3 md:gap-6 group cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() =>
              window.open(sponsor.url, "_blank", "noopener,noreferrer")
            }
          >
            <div className="transition-all duration-300 group-hover:brightness-110 flex-shrink-0">
              {sponsor.logo}
            </div>
            <span className="text-sm md:text-lg font-bold text-center md:text-left text-slate-300 group-hover:text-white transition-colors duration-300 max-w-[120px] md:max-w-[160px] leading-tight">
              {sponsor.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
