"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"
import Header from "@/components/layout/header"
import LocationFilledIcon from "@/components/svgs/location-filled-icon"

export default function Hero() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [controls, inView])

  return (
    <section
      className="font-inter relative w-full min-h-[80vh] md:min-h-[85vh] flex flex-col overflow-hidden"
    >
      {/* Background layers */}
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/downloads/hero-image.webp"
          alt="Nodo Serrano background"
          fill
          sizes="100vw"
          className="object-cover object-center md:hidden"
          priority
        />
        <Image
          src="/downloads/hero-desktop.webp"
          alt="Nodo Serrano background"
          fill
          sizes="100vw"
          className="hidden object-cover object-center md:block"
          priority
        />
      </div>

      {/* Gradient Overlay — small desktop-only backdrop blur softens the low-res bg image */}
      <div className="absolute inset-0 z-1 md:backdrop-blur-[6px]">
        <div className="absolute inset-0 bg-linear-to-br from-(--color-bg-elev-dark)/85 via-violet-900/40 to-(--color-bg-elev-dark)/85" />
        <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/10 via-transparent to-blue-500/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[128px] animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full filter blur-[200px]" />
      </div>

      {/* Header — sits inside Hero, fixed position, shares the hero background */}
      <Header />

      {/* Content */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
        }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-left px-4 md:px-12 pt-20 pb-48 md:pt-8 md:pb-40"
      >
        <div className="max-w-3xl md:max-w-[654px] space-y-8 md:space-y-9">
          {/* Headings */}
          <div className="space-y-3 md:space-y-9">
            <motion.h1
              className="font-display text-mob-display-xl md:text-display-lg text-(--color-text-primary-dark)"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } },
              }}
            >
              Hackerspace y Semillero
            </motion.h1>

            <motion.div
              className="h-[3px] w-full max-w-[330px] md:max-w-none rounded-full bg-gradient-brand"
              variants={{
                hidden: { opacity: 0, scaleX: 0 },
                visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6, delay: 0.5 } },
              }}
              style={{ transformOrigin: "left" }}
            />

            <motion.h2
              className="font-display text-mob-h2 md:text-h2 text-(--color-text-primary-dark) max-w-2xl sm:mx-auto md:max-w-none md:mx-0 leading-relaxed"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } },
              }}
            >
              Investigación y educación con foco en Ethereum Ecosystem
            </motion.h2>
          </div>

          {/* Location */}
          <motion.div
            className="flex items-end justify-start gap-2 text-(--color-text-primary-dark)"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.4, delay: 0.8 } },
            }}
          >
            <LocationFilledIcon className="h-3.5 w-3.5 md:h-[25px] md:w-[25px] mb-0.5 md:mb-0" />
            <span className="text-body-lg md:text-h3 font-normal">Tandil</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
