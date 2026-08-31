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

// Figma container (node 445:27, exported as footer-container.svg): the cream
// panel that curves in from the top of the footer, flat-bottomed so the page
// ends clean. Same technique as blog.tsx / events.tsx — a blob the exact
// colour of the page (#F8F4ED) that only reads through its shadow.
//
// viewBox is cropped to the path's own bounds (x 17→1425, y 0→939 = the flat
// bottom) so preserveAspectRatio="none" can stretch the curve edge-to-edge
// with no dead air. The <svg> then fills the footer box exactly and overflows
// ~60px each side, so the curve spans the full viewport width and its soft
// shadow feathers past the edges (clipped by the footer's overflow-clip)
// instead of fading in short of them. bottom-0 pins the flat bottom flush to
// the footer's bottom line; top-[120px] pulls the dome's top edge down to a
// small gap above the heading (rather than stretching it across all of pt-64).
//
// Below 1199px the width stops tracking the viewport and locks to 1200px,
// centred so it spills off both edges (same trick as blog.tsx / events.tsx's
// max-[1199px]:w-[…]) — otherwise preserveAspectRatio="none" squashes the
// dome into a tall narrow arch on phones.
//
// Shadow: reuses the feDropShadow recipe from blog.tsx's blog-blob-shadow
// (hand-tuned intensity), not the raw ddii filter values from the Figma
// export, so the two sections read as the same depth.
function CurvedContainer() {
  return (
    // Shadow via CSS filter on a wrapping <div>, not an SVG <filter> on the
    // path — Safari CPU-rasterises the filter region on every scrolled frame.
    // The <div> (not the <svg>) carries it: <svg> has overflow:hidden by
    // default, which clips a drop-shadow cast off a cream-on-cream blob whose
    // only visible feature IS that shadow. See blog.tsx for the measurement.
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[120px] bottom-0 -left-[60px] -right-[60px] -z-10 max-[1199px]:left-1/2 max-[1199px]:right-auto max-[1199px]:w-[1200px] max-[1199px]:-translate-x-1/2"
      style={{ filter: "drop-shadow(6px 6px 8px rgba(7,15,34,0.14))" }}
    >
      <svg
        viewBox="17 0 1408 939"
        preserveAspectRatio="none"
        fill="none"
        className="h-full w-full overflow-visible"
      >
        <path
          d="M1312.45 681.904C1250.94 612.423 1187.6 508.951 1154.79 406.48C1120.17 298.358 1058.19 153.049 877.292 57.0759C696.394 -38.8976 415.705 60.1888 307.713 118.559C199.721 176.929 55.2757 337.499 159.623 538.943C263.969 740.388 21.4526 911.626 17 939L1425 939C1415.43 875.851 1373.97 751.385 1312.45 681.904Z"
          fill="#F8F4ED"
        />
      </svg>
    </div>
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
              Vení a conocer la
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
              allow="fullscreen"
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
