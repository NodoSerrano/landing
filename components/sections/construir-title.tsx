"use client"

import { motion } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function ConstruirTitle() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="relative z-10 mx-auto w-full max-w-[720px] px-5 py-8"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-display text-h1 font-bold text-(--color-text-primary-light)">
          Que tenés ganas de
        </h2>
        <h2 className="bg-gradient-warm bg-clip-text font-display text-h1 font-bold text-transparent">
          CONSTRUIR?
        </h2>
      </div>
    </motion.div>
  )
}
