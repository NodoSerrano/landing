"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"
import { MapPin } from "lucide-react"
import Header from "@/components/layout/header"

export default function Hero() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [controls, inView])

  return (
    <section
      className="font-inter relative w-full min-h-[80vh] md:min-h-[60vh] flex flex-col overflow-hidden"
    >
      {/* Background layers */}
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/downloads/hero-image.png"
          alt="Nodo Serrano background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-violet-900/40 to-slate-900/85" />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10" />
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
        className="relative z-10 flex-1 flex flex-col items-start justify-center text-left px-4 pt-20 pb-6 md:py-8 md:items-center md:text-center"
      >
        <div className="max-w-3xl sm:mx-auto space-y-8">
          {/* Logo */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } },
            }}
          >
            <Image
              src="/imagotipo-color.svg"
              alt="Nodo Serrano"
              width={120}
              height={192}
              className="h-28 md:h-36 w-auto sm:mx-auto drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Headings */}
          <div className="space-y-4">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } },
              }}
            >
              Hackerspace y Semillero
            </motion.h1>

            <motion.h2
              className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl sm:mx-auto leading-relaxed"
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
            className="flex items-center justify-start sm:justify-center gap-2 text-slate-400"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.4, delay: 0.8 } },
            }}
          >
            <MapPin className="h-5 w-5 text-violet-400" />
            <span className="text-base md:text-lg font-medium">Tandil</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
