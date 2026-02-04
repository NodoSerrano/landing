"use client";

import { motion } from 'framer-motion'
import NodoLogoTop from './svgs/nodo-logo-top'
import NodoLogoBottom from './svgs/nodo-logo-bottom'

export default function FloatingLogo({ width = 120, top = 40 }: { width?: number, top?: number }) {
  // Power scaling: larger logos move more, smaller logos move less
  // Reference: width 30px ≈ 1px, width 120px = 2px movement
  const yMovement = 3 * Math.pow(width / 120, 0.7);

  // Non-linear scaling for spacing: smaller widths have proportionally less spacing
  // Reference: width 120 = spacing 50
  const calculatedSpacing = 53 * Math.pow(width / 120, 1.05);

  return (
    <motion.div
      style={{ width: `${width}px`, top: `${top}%` }}
      className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center `}
    >
      <motion.div
        animate={{
          y: [0, -yMovement, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="z-10"
      >
        <NodoLogoTop style={{ width: `${width}px` }} className='h-full' />
      </motion.div>
      <motion.div
        animate={{
          y: [0, yMovement, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <NodoLogoBottom style={{ width: `${width}px`, transform: `translateY(-${calculatedSpacing}px)` }} className="h-full" />
      </motion.div>
    </motion.div>
  )
}
