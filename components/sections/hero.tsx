"use client"

import { useRef, useEffect } from "react"
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
      {/* Preload the mobile hero crop only — it's the LCP element on phones and
          this is the throttled-mobile metric Lighthouse scores. Desktop gets
          its crop from <picture> without a competing preload. */}
      <link
        rel="preload"
        as="image"
        href="/downloads/hero-image-1080.webp"
        imageSrcSet="/downloads/hero-image-640.webp 640w, /downloads/hero-image-828.webp 828w, /downloads/hero-image-1080.webp 1080w"
        imageSizes="100vw"
        media="(max-width: 767px)"
        fetchPriority="high"
      />

      {/* Background Image — native <picture> for art direction. A hand-rolled
          <img> (not next/image) so we control fetchpriority and emit exactly
          one preload. The crops are pre-resized WebP; they sit under a dark
          gradient + blur so quality 78 is plenty. */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(min-width: 768px)"
            type="image/webp"
            srcSet="/downloads/hero-desktop-1280.webp 1280w, /downloads/hero-desktop-1920.webp 1920w"
            sizes="100vw"
          />
          <img
            src="/downloads/hero-image-1080.webp"
            srcSet="/downloads/hero-image-640.webp 640w, /downloads/hero-image-828.webp 828w, /downloads/hero-image-1080.webp 1080w"
            sizes="100vw"
            alt="Nodo Serrano background"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
      </div>

      {/* Gradient Overlay. The linear gradients carry the dark tint on every
          screen; the huge blur circles + infinite animate-pulse are desktop
          only — on mobile they were continuous compositor work that starved
          the scroll-reveal animations on iOS. */}
      <div className="absolute inset-0 z-1 md:backdrop-blur-[6px]">
        <div className="absolute inset-0 bg-linear-to-br from-(--color-bg-elev-dark)/85 via-violet-900/40 to-(--color-bg-elev-dark)/85" />
        <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/10 via-transparent to-blue-500/10" />
        <div className="hidden md:block absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full filter blur-[128px] animate-pulse" />
        <div className="hidden md:block absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[128px] animate-pulse animation-delay-2000" />
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full filter blur-[200px]" />
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
