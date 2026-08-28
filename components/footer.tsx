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

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative isolate z-10 overflow-clip pt-24 pb-8"
    >
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
