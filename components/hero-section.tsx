"use client";
import { motion } from "framer-motion";
import FloatingLogo from "./FloatingLogo";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col layer2 neumorphism-shadow neumorphism-border" id="hero">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0" />
        <div className="absolute top-0 left-[50%] w-96 h-96 bg-violet-500/20 rounded-full filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-[50%] w-96 h-96 bg-violet-500/20 rounded-full filter blur-[128px] animate-pulse" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col items-center justify-end text-center px-4 py-8 md:py-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FloatingLogo width={120} top={40} />
        <div className="max-w-4xl mx-auto -mt-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-center drop-shadow-lg mb-4">
            Nodo Serrano
          </h1>
          <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto text-center drop-shadow leading-relaxed">
            <span className="block sm:inline">
              Hackerspace y Semillero.
            </span>
            <span className="block sm:inline">
              Investigación y educación con foco en Ethereum Ecosystem
            </span>
            <span className="block sm:inline">en la ciudad de Tandil.</span>
          </p>
        </div>
      </motion.div>
    </section>
  )
}
