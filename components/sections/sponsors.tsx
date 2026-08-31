"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import EthereumLogo from "@/components/svgs/ethereum-logo"
import ESPLogo from "@/components/svgs/esp-logo"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

interface Sponsor {
  name: string
  logo: React.ReactNode
  url: string
}

const sponsors: Sponsor[] = [
  {
    name: "Ethereum Foundation",
    logo: <EthereumLogo className="h-20 w-auto md:h-24" />,
    url: "https://ethereum.org/",
  },
  {
    name: "Ethereum Support Program",
    logo: <ESPLogo className="h-20 w-auto md:h-24" />,
    url: "https://esp.ethereum.foundation/",
  },
  {
    name: "DevConnect",
    logo: (
      <Image
        src="/devconnect-logo.png"
        alt=""
        width={163}
        height={185}
        className="h-20 w-auto object-contain md:h-24"
      />
    ),
    url: "https://devconnect.org/",
  },
  {
    name: "The Red Guild",
    logo: (
      <Image
        src="/red-guild-logo.svg"
        alt=""
        width={200}
        height={128}
        className="h-20 w-auto object-contain md:h-24"
      />
    ),
    url: "https://theredguild.org/",
  },
]

function CurvedContainer() {
  return (
    <svg
      viewBox="-25 275 2010 1400"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      // Shadow via CSS filter on the <svg>, not an SVG <filter> on each path —
      // Safari CPU-rasterises a filter region this large every scrolled frame.
      // See blog.tsx for the measurement.
      style={{ filter: "drop-shadow(6px 6px 8px rgba(7,15,34,0.28))" }}
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[140%] max-w-[1720px] max-[1199px]:w-[1680px] aspect-[2010/1400] -translate-x-1/2 -translate-y-1/2"
    >
      <defs>
        <linearGradient id="sponsors-grad-outline" x1="349.237" y1="1120.54" x2="1473.8" y2="440.041" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9728" />
          <stop offset="0.5" stopColor="#FF3121" />
          <stop offset="1" stopColor="#9E1FD0" />
        </linearGradient>
        <linearGradient id="sponsors-grad-fill1" x1="57.8352" y1="848.019" x2="1835.95" y2="832.403" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9728" />
          <stop offset="0.5" stopColor="#FF3121" />
          <stop offset="1" stopColor="#9E1FD0" />
        </linearGradient>
        <linearGradient id="sponsors-grad-fill2" x1="57.9006" y1="841.834" x2="1836.46" y2="826.215" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9728" />
          <stop offset="0.5" stopColor="#FF3121" />
          <stop offset="1" stopColor="#9E1FD0" />
        </linearGradient>
      </defs>

      <path d="M1579.94 1260.38C1774.96 1214.47 1774.16 1093.53 1773.28 1038.4C1765.4 1002.92 1661.23 879.334 1627.62 904.411C1545.98 965.32 1415.27 850.259 1293.56 914.715C1171.84 979.171 1139.61 867.941 669.917 941.044C200.224 1014.15 358.156 1315.06 454.428 1473.98C550.701 1632.91 755.905 1551.82 938.556 1386.13C1121.21 1220.44 1336.16 1317.77 1579.94 1260.38Z" fill="#F8F4ED" />
      <path d="M507.263 363.654C306.64 329.602 334.274 705.605 299.374 753.341C283.322 786.836 513.383 878.355 528.68 921.17C615.282 1163.57 406.775 1285.65 516.435 1387.89C663.027 1524.56 965.036 1367.25 1417.14 1292C1871.04 1216.45 1532.91 792.823 1551.37 619.841C1569.84 446.86 1273.07 386.037 1005.79 459.667C738.504 533.296 758.041 406.219 507.263 363.654Z" stroke="url(#sponsors-grad-outline)" strokeWidth="3" />
      <path d="M612.772 440.324C394.778 317.65 225.829 382.352 149.23 412.225C105.681 436.978 14.453 580.992 76.0892 593.037C225.795 622.291 167.419 781.795 353.671 839.382C539.922 896.969 153.067 1202.96 727.798 1284.03C1171.7 1346.64 1651.82 1332.29 1798.82 1175.5C1945.83 1018.71 1657.84 535.354 1281.64 485.49C905.439 435.625 885.265 593.666 612.772 440.324Z" fill="url(#sponsors-grad-fill1)" />
      <path d="M612.942 446.006C394.971 326.016 226.01 389.341 149.405 418.579C105.851 442.801 14.5966 583.713 76.2304 595.488C225.93 624.089 148.633 864.771 334.873 921.087C521.114 977.403 297.412 1222.52 704.496 1276.55C1006.62 1316.65 1651.81 1318.54 1798.85 1165.12C1945.89 1011.7 1663.14 563.431 1286.95 514.696C910.763 465.961 885.405 595.994 612.942 446.006Z" fill="#1A1614" stroke="url(#sponsors-grad-fill2)" strokeWidth="3" />
    </svg>
  )
}

const CAROUSEL_GAP_PX = 24

// Glow via CSS `filter` on the <svg>, not an SVG <filter> on the path — same
// reason as CurvedContainer above: iOS Safari CPU-rasterises SVG filter regions.
// Offsets/blur are the old user-space values scaled by 42/69 (render px per
// viewBox unit). overflow-visible so the glow isn't clipped at the 42px box.
const ARROW_GLOW =
  "drop-shadow(0.6px 1.8px 3.7px #D93188) drop-shadow(-2.4px -2.4px 3px rgba(255,98,0,0.4))"

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 69 70"
      width="42"
      height="42"
      aria-hidden="true"
      style={{ filter: ARROW_GLOW }}
      className={`overflow-visible${direction === "left" ? " rotate-180" : ""}`}
    >
      <defs>
        <linearGradient id={`sponsors-arrow-grad-${direction}`} x1="14" y1="34.5" x2="56" y2="34.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9728" />
          <stop offset="0.5" stopColor="#FF3121" />
          <stop offset="1" stopColor="#9E1FD0" />
        </linearGradient>
      </defs>
      <path
        d="M23.5 14L56 16V55H14L23.5 14Z"
        fill={`url(#sponsors-arrow-grad-${direction})`}
      />
      <g transform="translate(28.5, 26.06)">
        <path d="M4.44603 8.4726L0 0.0000118241H0.671125L14.4286 8.4726H4.44603Z" fill="#F8F4ED" />
        <path d="M4.44603 8.47459L0 16.9472H0.671125L14.4286 8.47459H4.44603Z" fill="#F8F4ED" />
      </g>
    </svg>
  )
}

function SponsorsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const itemStepRef = useRef(0)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const update = () => {
      const firstItem = el.children[0] as HTMLElement | undefined
      if (!firstItem) return
      const itemStep = firstItem.getBoundingClientRect().width + CAROUSEL_GAP_PX
      itemStepRef.current = itemStep
      const itemsPerView = Math.max(1, Math.round(el.clientWidth / itemStep))
      const nextPageCount = Math.max(1, sponsors.length - itemsPerView + 1)
      setPageCount(nextPageCount)
      setPage((p) => Math.min(p, nextPageCount - 1))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: index * itemStepRef.current, behavior: "smooth" })
  }

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el || !itemStepRef.current) return
    setPage(Math.round(el.scrollLeft / itemStepRef.current))
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex w-full items-center gap-6">
        {pageCount > 1 && (
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => scrollToIndex(Math.max(0, page - 1))}
            disabled={page === 0}
            className="hidden shrink-0 items-center justify-center transition-opacity disabled:opacity-30 sm:flex md:hidden"
          >
            <ArrowIcon direction="left" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-1 snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 basis-[calc(50%-12px)] snap-start flex-col items-center justify-center gap-3 sm:basis-[calc(33.333%-16px)] md:basis-[calc(25%-18px)]"
            >
              <div className="flex h-24 items-center justify-center md:h-28">{sponsor.logo}</div>
              <span className="text-center text-h4 font-normal text-(--color-text-primary-dark)">
                {sponsor.name}
              </span>
            </a>
          ))}
        </div>

        {pageCount > 1 && (
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => scrollToIndex(Math.min(pageCount - 1, page + 1))}
            disabled={page === pageCount - 1}
            className="hidden shrink-0 items-center justify-center transition-opacity disabled:opacity-30 sm:flex md:hidden"
          >
            <ArrowIcon direction="right" />
          </button>
        )}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center gap-[18px] md:hidden">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir a la página ${index + 1}`}
              onClick={() => scrollToIndex(index)}
              className={`size-3.5 rounded-[3px] transition-colors ${index === page ? "bg-gradient-warm" : "bg-(--color-text-primary-dark)"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Sponsors() {
  return (
    // overflow-clip + padding/negative-margin: same technique as events.tsx —
    // required to keep mobile's viewport-meta negotiation from being hijacked
    // by CurvedContainer's fixed width, while growing the box enough to fully
    // contain the curve's bleed (worst case ~57px) so the y-clip never
    // actually cuts anything. No pre-existing mb, so -mb is added fresh.
    <section
      id="sponsors"
      className="relative isolate z-30 flex flex-col justify-center overflow-clip pt-[345px] pb-[345px] -mt-[25px] -mb-[65px]"
    >
      <CurvedContainer />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="relative z-10 mx-auto w-full max-w-[900px] mb-56"
      >
        <div className="flex flex-col items-center gap-10 px-6 md:gap-12">
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center gap-2 text-center"
          >
            <h2 className="flex items-center gap-2 font-display text-h1 font-bold">
              <span className="text-(--color-text-primary-dark)">Nos</span>
              <span className="inline-block rounded-[4px] bg-gradient-warm px-3 py-1 text-(--color-text-primary-dark)">
                BANCAN
              </span>
            </h2>
            <p className="font-display text-h3 font-medium text-(--color-text-secondary-dark)">
              Aliados y comunidad
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="w-full">
            <SponsorsCarousel />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
