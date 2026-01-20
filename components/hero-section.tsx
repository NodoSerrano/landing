import NodoLogoTop from "@/components/svgs/nodo-logo-top";
import NodoLogoBottom from "@/components/svgs/nodo-logo-bottom";
import { motion } from "framer-motion";

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
      className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-8 md:py-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto -mt-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center py-8 h-[260px]">
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="z-10"
            >
              <NodoLogoTop className="w-28" />
            </motion.div>
            <motion.div
              animate={{
                y: [0, 6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <NodoLogoBottom className="w-28 translate-y-[-48px]" />
            </motion.div>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-center drop-shadow-lg mb-4">
            Nodo Serrano
          </h1>
        </div>
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
