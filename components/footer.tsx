"use client"

import { motion } from "framer-motion"
import MailIcon from "./svgs/mail-icon"
import TwitterIcon from "./svgs/twitter-icon"
import InstagramIcon from "./svgs/instagram-icon"
import MessageIcon from "./svgs/message-icon"
import MapPinIcon from "./svgs/map-pin-icon"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const SOCIAL_LINKS = [
  {
    href: "mailto:hey@nodoserrano.org",
    icon: MailIcon,
    label: "Email",
  },
  {
    href: "https://twitter.com/NodoSerrano",
    icon: TwitterIcon,
    label: "Twitter",
  },
  {
    href: "https://instagram.com/nodoserrano",
    icon: InstagramIcon,
    label: "Instagram",
  },
  {
    href: "https://whatsapp.com/channel/0029VbAvlX0Gk1FnUUeDII3g",
    icon: MessageIcon,
    label: "WhatsApp",
  },
]

// Figma container (node 402:35, exported as footer-container.svg): a shared
// crop of the site's background curves, cropped to this section's slice.
// Width/height are decoupled on purpose (per spec): fixed below lg, 100vw
// above it, while the height never changes — so preserveAspectRatio="none"
// stretches horizontally instead of the usual "slice" crop used elsewhere.
// Shadow: reuses the exact feDropShadow recipe from blog.tsx's
// blog-blob-shadow (hand-tuned intensity), not the raw dd_ filter values
// from the Figma export, so the two sections read as the same depth.
function CurvedContainer() {
  return (
    <svg
      viewBox="0 260 1280 1147"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute left-[calc(50%-512px)] top-0 -z-10 h-[1147px] w-[1024px] lg:left-[calc(50%-50vw)] lg:w-screen"
    >
      <defs>
        <filter
          id="footer-blob-shadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow dx="7" dy="7" stdDeviation="7" floodColor="#070F22" floodOpacity="0.2" />
          <feDropShadow dx="-6" dy="-6" stdDeviation="6" floodColor="#393B5B" floodOpacity="0.2" />
        </filter>
        <linearGradient
          id="footer-grad-line"
          x1="-47.4596"
          y1="1132.98"
          x2="1114.71"
          y2="429.726"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF9728" />
          <stop offset="0.5" stopColor="#FF3121" />
          <stop offset="1" stopColor="#9E1FD0" />
        </linearGradient>
      </defs>
      <path
        d="M138.886 368.266C-63.0322 348.036 187.197 580.518 148.18 627.108C129.397 659.312 107.797 848.554 120.277 887.654C190.927 1109.02 -30.3463 1235.05 73.9575 1324.19C213.39 1443.36 564.714 1394.37 1030.76 1298.03C1498.66 1201.31 1090.84 663.946 1122.2 501.347C1153.55 338.748 917.447 345.009 639.807 429.179C362.166 513.348 391.284 393.554 138.886 368.266Z"
        stroke="url(#footer-grad-line)"
        strokeWidth="3"
      />
      <path
        filter="url(#footer-blob-shadow)"
        d="M-242.4 2263.85C-398.493 2008.55 -343.723 1417.34 -242.4 1113.67C-75.3545 267.163 864 314.655 1047.42 527.834C1261.99 777.22 1208.99 885.249 1518.43 1248.04C1827.88 1610.83 1466.4 2056.93 1318.52 2699.2C1170.65 3341.47 691.416 3075.42 477.816 3099.61C264.216 3123.8 108.124 2949.12 -1.4147 2777.13C-110.953 2605.14 -86.3078 2519.15 -242.4 2263.85Z"
        fill="#F8F4ED"
      />
      <path
        filter="url(#footer-blob-shadow)"
        d="M-217.344 2322.9C-367.129 2067.62 -314.573 1476.44 -217.343 1172.79C-57.0472 326.326 844.354 373.815 1020.36 586.982C1226.26 836.354 1175.4 944.377 1472.34 1307.15C1769.29 1669.92 1422.42 2115.99 1280.51 2758.22C1138.61 3400.46 678.743 3134.43 473.773 3158.61C268.803 3182.8 119.018 3008.13 13.9051 2836.15C-91.2076 2664.17 -67.558 2578.18 -217.344 2322.9Z"
        stroke="#FF4D21"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    // overflow-clip is required (not just body's overflow-x-hidden) — mobile
    // viewport-meta negotiation gets hijacked by CurvedContainer's fixed
    // width otherwise (see events.tsx for the full explanation). Unlike the
    // other sections, footer doesn't grow to contain its curve's bottom
    // bleed: it's the last thing on the page, nothing below it to blend
    // into, so letting the clip cut the curve's tail flush at the bottom
    // just means the page ends cleanly instead of trailing off into extra
    // scroll space.
    <footer
      id="footer"
      className="relative isolate z-10 overflow-clip pt-64 pb-8"
    >
      <CurvedContainer />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="relative z-10 mx-auto flex w-full max-w-[520px] flex-col items-center gap-12 px-5 text-center"
      >
        <motion.div variants={fadeInUp} className="flex w-full flex-col items-center gap-9">
          <div className="flex flex-col items-center gap-1">
            <h2 className="font-display text-h2 font-medium text-(--color-warm-violet)">
              Vení a conocer tu
            </h2>
            <p className="bg-gradient-warm bg-clip-text font-display text-[45px] font-bold leading-[61.6px] tracking-[-1.12px] text-transparent">
              COMUNIDAD
            </p>
          </div>

          <div className="flex flex-col items-center gap-1 text-(--color-text-primary-light)">
            <p className="font-display text-h4 font-normal">LUNES A VIERNES</p>
            <p className="font-display text-h3 font-medium">10 a 18hs</p>
          </div>

          <div className="relative h-[159px] w-full max-w-[480px] overflow-hidden border border-(--color-warm-yellow)">
            <iframe
              src="https://www.google.com/maps?q=San+Martin+864,+Tandil,+Buenos+Aires,+Argentina&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Nodo Serrano"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-warm mix-blend-overlay" />
          </div>

          <a
            href="https://www.google.com/maps/place/San%20Martin%20864%2C%20Tandil%2C%20Buenos%20Aires%2C%20Argentina"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 text-(--color-text-primary-light) transition-opacity hover:opacity-80"
          >
            <MapPinIcon className="h-[31px] w-[31px] shrink-0" />
            <span className="text-left">
              <span className="block font-inter text-body">San Martin 864,Tandil</span>
              <span className="block font-display text-[11px] font-medium leading-[12.1px]">
                Buenos Aires, Argentina.
              </span>
            </span>
          </a>
        </motion.div>

        <motion.div variants={fadeInUp} className="h-[2px] w-[308px] bg-gradient-warm" />

        <motion.div variants={fadeInUp} className="flex w-full flex-col items-center gap-6">
          <p className="font-display text-h3 font-medium text-(--color-text-primary-light)">
            Podés contactarnos y seguirnos por aquí
          </p>
          <div className="flex items-center gap-[42px]">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Icon className="h-9 w-9" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="font-inter text-body-sm text-(--color-text-secondary-dark)"
        >
          © {new Date().getFullYear()} Nodo Serrano. Todos los derechos reservados.
        </motion.p>
      </motion.div>
    </footer>
  )
}
