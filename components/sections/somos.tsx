"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

// Card data (Figma frame 225:65 — Frame 32). Order top→bottom as in the design.
const CARDS = [
  {
    title: "Hub",
    desc: "Un espacio físico para compartir y crear el nuevo mundo digital abierto.",
  },
  {
    title: "Hackerspace",
    desc: "Un espacio equipado con recursos de hardware, herramientas de hacking y tecnología.",
  },
  {
    title: "Educación",
    desc: "Desde talleres prácticos de Ethereum y seguridad operacional hasta charlas espontáneas.",
  },
  {
    title: "Eventos",
    desc: "Actividades e instituciones privadas serán parte de nuestros encuentros.",
  },
  {
    title: "Comunidad",
    desc: "Juntos podemos construir más. Queremos conectar la comunidad local con el mundo.",
  },
  {
    title: "Arte",
    desc: "Un espacio creativo transversal donde la tecnología y el arte convergen.",
  },
]

// Small blue diamond/chevron lockup mark before the tagline (Figma "EthDiamond").
function TaglineMark() {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M8 0L15.5 9L8 18L0.5 9L8 0Z"
        fill="url(#somos-tagline-grad)"
      />
      <defs>
        <linearGradient id="somos-tagline-grad" x1="0" y1="0" x2="16" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-brand-blue)" />
          <stop offset="1" stopColor="var(--color-brand-violet)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Decorative background: brand-gradient organic accents that bleed from the
// section edges (green slivers near the cards, flowing wires at the bottom).
// Hand-authored to match the Figma capture; clipped by the section's overflow.
// TODO(desktop): distinct decoration layer for lg breakpoint.
function Decorations() {
  return (
    <svg
      viewBox="0 0 390 1400"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    >
      <defs>
        <linearGradient id="somos-green" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--color-logo-mint)" />
          <stop offset="1" stopColor="var(--color-accent-teal)" />
        </linearGradient>
        <linearGradient id="somos-wire-violet" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="var(--color-warm-red)" />
          <stop offset="1" stopColor="var(--color-warm-violet)" />
        </linearGradient>
      </defs>

      {/* Green sliver — left, near the Hackerspace card */}
      <path
        d="M-10 360 C 40 340 70 360 74 400 C 60 384 30 380 -10 396 Z"
        fill="url(#somos-green)"
      />
      {/* Green sliver — right, near the Eventos card */}
      <path
        d="M400 800 C 350 792 320 812 316 852 C 334 832 366 828 400 842 Z"
        fill="url(#somos-green)"
      />

      {/* Bottom flowing wires */}
      <path
        d="M60 1300 C 180 1210 250 1250 320 1120 C 350 1060 380 1050 410 1070"
        stroke="var(--color-warm-violet)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M40 1360 C 200 1300 280 1330 340 1210 C 380 1130 400 1120 420 1140"
        stroke="url(#somos-wire-violet)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M300 1080 C 320 1160 300 1220 360 1320"
        stroke="var(--color-brand-blue)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Somos() {
  return (
    <section
      id="about"
      className="font-inter relative isolate z-20 overflow-hidden bg-(--color-bg-light) py-16 md:py-20"
    >
      <Decorations />

      <Container>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="relative mx-auto flex w-full max-w-[340px] flex-col gap-9 md:max-w-none"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <TaglineMark />
            <span className="text-body-lg text-(--color-accent-violet)">
              Educación·Comunidad·Ethereum
            </span>
          </div>
          <h2 className="font-display text-[3.5rem] font-bold leading-none">
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              SOMOS
            </span>
          </h2>
        </motion.div>

        {/* Photo collage */}
        <motion.div variants={fadeInUp} className="grid grid-cols-2 grid-rows-2 gap-2">
          <div className="relative row-span-2 aspect-[180/244] overflow-hidden rounded-[8px]">
            <Image src="/somos/hackerspace.jpg" alt="Hackerspace Nodo Serrano" fill className="object-cover" />
          </div>
          <div className="relative aspect-[180/120] overflow-hidden rounded-[8px]">
            <Image src="/somos/hub.jpg" alt="Hub Nodo Serrano" fill className="object-cover" />
          </div>
          <div className="relative aspect-[180/120] overflow-hidden rounded-[8px]">
            <Image src="/somos/comunidad.jpg" alt="Comunidad Nodo Serrano" fill className="object-cover" />
          </div>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {CARDS.map((card) => (
            <motion.article
              key={card.title}
              variants={fadeInUp}
              className="rounded-[8px] bg-(--color-bg-warm-white) p-3"
              style={{ boxShadow: "var(--shadow-neumorphic-light)" }}
            >
              <div className="w-fit">
                <h3 className="font-display text-mob-h2 font-medium text-(--color-text-primary-light)">
                  {card.title}
                </h3>
                <div className="mt-1 h-[5px] w-full rounded-full bg-gradient-brand" />
              </div>
              <p className="mt-2 max-w-[301px] text-body text-(--color-text-primary-light)">
                {card.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
      </Container>
    </section>
  )
}
