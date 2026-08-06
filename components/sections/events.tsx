"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon } from "@/components/feature-icons"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

function CurvedContainer() {
  return (
    <svg
      viewBox="0 0 2482 2320"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[140%] max-w-[1920px] max-[1199px]:w-[1680px] aspect-[2482/2320] translate-x-[calc(-50%+40px)] -translate-y-1/2"
    >
      <defs>
        <filter id="events-blob-shadow" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="5" dy="5" stdDeviation="7" floodColor="#000000" floodOpacity="0.68" result="drop1" />
          <feDropShadow in="drop1" dx="-4" dy="-4" stdDeviation="5" floodColor="#ffffff" floodOpacity="0.04" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlphaInner1" />
          <feOffset dx="-1" dy="-1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlphaInner1" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
          <feBlend in2="shape" mode="normal" result="withInner1" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlphaInner2" />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlphaInner2" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0" />
          <feBlend in2="withInner1" mode="normal" />
        </filter>
        <linearGradient id="events-grad-vec1" x1="1502.32" y1="1752.88" x2="733.569" y2="710.056" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9728" />
          <stop offset="0.5" stopColor="#FF3121" />
          <stop offset="1" stopColor="#9E1FD0" />
        </linearGradient>
        <linearGradient id="events-grad-vec2" x1="969.904" y1="1892.65" x2="1001.6" y2="545.058" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9728" />
          <stop offset="0.5" stopColor="#FF3121" />
          <stop offset="1" stopColor="#9E1FD0" />
        </linearGradient>
      </defs>

      <path d="M1514.39 1052.2C1562.5 1147.91 1436.62 1271.93 1330.24 1318.47C1099.48 1475.25 618.817 1267.63 501.151 1151.52C460.889 1111.8 466.27 1030.88 347.949 874.303C229.627 717.726 507.12 699.248 694.254 585.249C881.388 471.249 1111.99 645.258 1237.63 689.765C1363.27 734.273 1424.29 811.327 1459.19 876.839C1494.1 942.351 1466.28 956.477 1514.39 1052.2Z" fill="#B57FE0" />
      <path d="M1525.72 1052.65C1575.61 1146.84 1454.69 1266.62 1351.01 1310.85C1127.54 1461.42 568.305 1184.94 529.286 1144.46C421.754 1032.89 491.858 1019.23 371.185 864.681C250.512 710.131 523.609 695.389 705.169 586.145C886.73 476.9 1118.54 649.845 1243.55 694.88C1368.56 739.915 1430.7 816.005 1466.79 880.494C1502.89 944.982 1475.83 958.464 1525.72 1052.65Z" fill="#212325" />
      <path d="M601.638 1828.73C421.025 1800.3 330.852 1492.6 342.226 1292.03C282.971 799.958 770.124 824.665 903.333 616.704C1104.51 302.64 1503.93 564.598 1829.66 554.081C2155.39 543.565 1964.68 901.915 1930.16 1124.9C1869.43 1517.3 1558.27 1695.35 1395.36 1830.75C1232.46 1966.15 1032.48 1944.83 907.351 1928.22C782.221 1911.61 782.252 1857.17 601.638 1828.73Z" fill="url(#events-grad-vec1)" />
      <path d="M2217.82 1116.92C2336.76 1269.24 2184.22 1571.79 2030.62 1718.37C1721.08 2140.88 1602.81 1890.73 1349.79 1955.06C967.685 2052.2 501.151 1662.82 242.032 1435.8C-17.0865 1208.79 524.315 893.475 780.895 575.449C1037.48 257.424 1333.22 587.827 1556.78 600.934C1780.33 614.04 1968.95 716.322 2053.58 819.465C2138.22 922.608 2098.88 964.604 2217.82 1116.92Z" fill="#212325" />
      <path d="M395.664 1299.17C355.738 1138.38 455.811 1041.52 571.116 898.397C796.188 497.148 1149.75 501.552 1300.77 609.461C1570.96 802.525 1571.08 574.025 1792.76 753.473C2014.43 932.92 1766.81 1451.88 1578.39 1755.91C1389.98 2059.93 1125.14 1792.3 944.355 1799.66C763.572 1807.03 615.949 1726.86 541.886 1642.51C467.823 1558.17 437.407 1467.27 395.664 1299.17Z" fill="url(#events-grad-vec2)" />
      <path filter="url(#events-blob-shadow)" d="M1945.72 1092.36C2037.76 1223.33 1909.23 1486.56 1783.13 1614.72C1526.35 1983.09 1223.77 1776.82 1019.8 1834.54C711.751 1921.71 559.474 1578.76 356.75 1384.21C154.026 1189.65 563.541 952.769 775.717 675.309C987.892 397.849 1293.92 633.886 1472.67 643.462C1651.42 653.038 1754.86 747.394 1820.46 836.049C1886.06 924.703 1853.68 961.386 1945.72 1092.36Z" fill="#212325" />
    </svg>
  )
}

export default function Events() {
  return (
    <section
      id="events"
      className="relative isolate z-30 flex flex-col justify-center py-38 my-20"
    >
      <CurvedContainer />

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={stagger}
        className="relative z-10 mx-auto w-full max-w-[720px] md:py-16"
      >
        <div className="flex flex-col items-center gap-10 md:gap-12 pt-20">
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center gap-2 text-center"
          >
            <h2 className="font-display text-h1 font-bold">
              <span className="inline-block rounded-[4px] bg-gradient-warm px-3 py-1 text-(--color-text-primary-dark)">
                EVENTOS
              </span>
            </h2>
            <p className="font-display text-h3 font-medium text-(--color-text-secondary-dark)">
              Lo que se viene y lo que hicimos
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="w-full max-w-3xl"
          >
            <iframe
              src="https://luma.com/embed/calendar/cal-7uziZDmq9SFGggQ/events?lt=dark"
              height="500"
              width="100%"
              aria-hidden="false"
              tabIndex={0}
              className="overflow-hidden"
              style={{ overflow: "hidden" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
