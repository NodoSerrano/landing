"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  delay: number
  size: number
  color: string
}

export default function ConfettiEffect() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    // Colores para el confeti
    const colors = ["#67e8f9", "#22d3ee", "#06b6d4", "#0891b2", "#3b82f6", "#2563eb", "#1d4ed8"]

    // Crear piezas de confeti
    const pieces: ConfettiPiece[] = []
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100, // Posición horizontal aleatoria (0-100%)
        delay: Math.random() * 0.5, // Retraso aleatorio para la animación
        size: Math.random() * 10 + 5, // Tamaño aleatorio entre 5 y 15px
        color: colors[Math.floor(Math.random() * colors.length)], // Color aleatorio del array
      })
    }

    setConfetti(pieces)

    // Limpiar el confeti después de 5 segundos
    const timer = setTimeout(() => {
      setConfetti([])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute top-0"
          style={{
            left: `${piece.x}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: "2px",
          }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0vh", "100vh"],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 5,
            delay: piece.delay,
            ease: [0.1, 0.4, 0.8, 0.9],
          }}
        />
      ))}
    </div>
  )
}
